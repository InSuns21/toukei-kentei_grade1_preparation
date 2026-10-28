# QINF22 量子典型部分空間とSchumacher圧縮

## 1. なぜ混合状態のエントロピーが必要qubit数になるのか

[QINF17のvon Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)は密度演算子の固有値から計算できました。しかし、エントロピー $S(\rho)=0.81$ と言われても、**一つのqubitを0.81個のqubitに切って保存することはできません**。多数の状態をまとめ、もとの系との量子相関をほとんど失わずに記録する方法が必要です。

例えば $\rho=\operatorname{diag}(3/4,1/4)$ が各時刻に独立に現れるなら、$n$ 個の系には $2^n$ 個の計算基底ベクトルがあります。しかしそのすべてが同程度の確率で現れるわけではありません。高確率なスペクトル成分を集めた空間が、元の $2^n$ 次元よりずっと小さくなります。

これは[INFO3の古典的な典型列](../../INFO/INFO3/index.md#def-info3-weak-typical)を、**密度演算子の固有ベクトルが張る部分空間**へ置き換える考え方です。ただし古典ラベルだけを記録するのでは不十分です。入力が外部の参照系とエンタングルしていても相関を保持することを、符号の品質基準にします。

以下では有限次元複素Hilbert空間 $H$ を固定し、対数は底2、情報量はビットとします。$n$ 個の量子系を保管する元の空間を $H^{\otimes n}$ と書きます。零固有値は確率0のスペクトル成分として除き、$0\log_2 0=0$ と約束します。

## 2. 固有値列から典型部分空間を作る

単一状態の行列 $\rho$ と、$n$ 個の入力を記述する行列を区別します。異なる時刻が独立・同分布であることを**状態のテンソル積**として指定するのが重要です。

<a id="def-qinf22-iid-source"></a>

<!-- formal-statement-start -->
> **定義（独立同分布量子情報源）**
> 有限次元Hilbert空間 $H$ 上の密度演算子 $\rho$ を一つ固定する。長さ $n\ge1$ のブロック状態が $\rho_n=\rho^{\otimes n}$ で与えられる情報源を**独立同分布量子情報源**とする。$\rho$ の正の固有値を $r_i>0$（$i\in\mathcal I$）、対応する正規直交固有ベクトルを $|i\rangle$ とし、

$$
\rho=\sum_{i\in\mathcal I}r_i|i\rangle\langle i|,
\qquad \sum_{i\in\mathcal I}r_i=1
$$

> と書く。零固有値に対応するベクトルは必要に応じて基底へ補う。
<!-- formal-statement-end -->

この定義から、文字列 $i^n=(i_1,\ldots,i_n)\in\mathcal I^n$ に対応する積ベクトルと固有値は

$$
|i^n\rangle=|i_1\rangle\otimes\cdots\otimes|i_n\rangle,
\qquad r_{i^n}=\prod_{k=1}^n r_{i_k}
$$

です。なぜなら各因子に $\rho|i_k\rangle=r_{i_k}|i_k\rangle$ を作用させると

$$
\rho^{\otimes n}|i^n\rangle
=\bigotimes_{k=1}^n(\rho|i_k\rangle)
=r_{i^n}|i^n\rangle
$$

となるからです。積固有ベクトルは $\rho_n$ の正のスペクトルに対応する正規直交基底を与えます。

全固有値のうちどれを保存するかは、列の自己情報量 $-\log_2 r_{i^n}$ を $n$ で割って判定します。[古典情報源の典型集合](../../INFO/INFO3/index.md#def-info3-weak-typical)と同じ条件ですが、典型なベクトルの**線形結合も一緒に**保存する点が量子圧縮の核心です。

<a id="def-qinf22-typical"></a>

<!-- formal-statement-start -->
> **定義（量子弱典型部分空間と典型射影）**
> 有限次元密度演算子 $\rho=\sum_{i\in\mathcal I}r_i|i\rangle\langle i|$ の独立同分布情報源と、$n\ge1$、$\delta>0$ に対し、典型添字集合を

$$
T_{n,\delta}=
\left\{i^n\in\mathcal I^n:
\left|-\frac1n\log_2r_{i^n}-S(\rho)\right|\le\delta\right\}
$$

> とする。この添字集合の固有ベクトルが張る空間を $\mathcal T_{n,\delta}=\operatorname{span}\{|i^n\rangle:i^n\in T_{n,\delta}\}$ とし、その空間への直交射影を

$$
P_{n,\delta}=\sum_{i^n\in T_{n,\delta}}|i^n\rangle\langle i^n|
$$

> と定義する。空集合の場合は零射影とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf22-iid-source, def-qinf22-typical -->
### 定義の確認：偏ったqubitを4個まとめる

**定義の確認**として $\rho=\operatorname{diag}(3/4,1/4)$ を取り、$|0\rangle,|1\rangle$ を固有ベクトルとします。$\rho\ge0$、$\operatorname{Tr}\rho=3/4+1/4=1$、独立な4個の状態は $\rho^{\otimes4}$ です。$1$ の個数が $k$ の基底文字列は

$$
r_{i^4}=(3/4)^{4-k}(1/4)^k,
\quad
-\frac14\log_2r_{i^4}
=-\log_2(3/4)+\frac{k}{4}\log_2 3.
$$

一文字のエントロピーは

$$
S(\rho)=h_2(1/4)
=-\tfrac34\log_2\tfrac34-\tfrac14\log_2\tfrac14
=2-\tfrac34\log_2 3.
$$

したがって $k=1$ の列では自己情報量の平均がちょうど $S(\rho)$ です。$\delta=0.1$ とすれば $k=0,2$ は $S(\rho)$ からそれぞれ $(\log_2 3)/4>0.1$ 離れるため、

$$
T_{4,0.1}=\{0001,0010,0100,1000\},
\quad
P_{4,0.1}=\sum_{i^4\in T_{4,0.1}}|i^4\rangle\langle i^4|.
$$

4本のベクトルは直交するので $P^\dagger=P$、$P^2=P$、$\operatorname{rank}P=4$ です。その確率は

$$
\operatorname{Tr}(P\rho^{\otimes4})
=4(3/4)^3(1/4)=27/64.
$$

これはまだ1に近くありません。**固定した短いブロックでの典型性と、$n\to\infty$ での高確率性は別物**です。反対に、射影が選ぶ4本の任意の重ね合わせは、典型部分空間のベクトルとして保存対象になります。
<!-- definition-example-end -->

## 3. 高確率なのに次元は約 $2^{nS(\rho)}$

典型射影の役割は三つあります。元の状態の重みの大部分を拾い、各典型固有値を同程度にそろえ、そのrankをエントロピーで制御することです。

<a id="lem-qinf22-typical-bounds"></a>

<!-- formal-statement-start -->
> **補題（量子典型射影の確率・固有値・次元評価）**
> 有限次元の独立同分布量子情報源 $\rho_n=\rho^{\otimes n}$ に対し、$S=S(\rho)$、$V=\sum_{i:r_i>0}r_i(-\log_2r_i-S)^2$ と置く。任意の $n\ge1,\delta>0$ で、典型射影 $P=P_{n,\delta}$ と $p_n=\operatorname{Tr}(P\rho_n)$ は

$$
p_n\ge1-\frac{V}{n\delta^2},\qquad
2^{-n(S+\delta)}P\le P\rho_nP\le2^{-n(S-\delta)}P
$$

> を満たす。さらに

$$
p_n\,2^{n(S-\delta)}
\le\operatorname{rank}P
\le2^{n(S+\delta)}.
$$

> 特に $\delta$ を固定すれば $p_n\to1$ である。零固有値は定義中の $V$ に寄与しない。
<!-- formal-statement-end -->

### 証明の見取り図

$r_i$ を有限確率分布と考え、独立な添字 $I_k$ を確率 $r_i$ で引くと、$Z_k=-\log_2r_{I_k}$ の平均は $S$、分散は $V$ です。[INFO3の漸近等分割性](../../INFO/INFO3/index.md#thm-info3-aep)はこの分布に適用でき、$P$ が拾う確率は古典的な典型集合の確率に一致します。典型列の固有値は上・下から挟まれます。それらの総和が高々1というだけでrankの上界が出ます。

<!-- proof-start -->
### 証明

スペクトル確率 $r_i$ に従う独立同分布の添字 $I_1,\ldots,I_n$ を考えます。有限集合 $\mathcal I$ 上で各 $r_i$ は正なので $Z_k=-\log_2r_{I_k}$ の二次モーメントは有限です。[INFO3の対数確率の平均・分散](../../INFO/INFO3/index.md#lem-info3-log-moments)に $p(i)=r_i$ を代入すると

$$
E[Z_k]=-\sum_i r_i\log_2r_i=S,\quad
\operatorname{Var}(Z_k)=V,\quad
\operatorname{Var}\left(\frac1n\sum_{k=1}^n Z_k\right)=\frac Vn.
$$

積固有値の対数は $-\log_2r_{I^n}=\sum_k Z_k$ です。よって[INFO3の漸近等分割性](../../INFO/INFO3/index.md#thm-info3-aep)で

$$
\begin{aligned}
p_n
&=\sum_{i^n\in T_{n,\delta}}r_{i^n}\\
&=P\left(\left|\frac1n\sum_{k=1}^nZ_k-S\right|\le\delta\right)\\
&\ge 1-\frac V{n\delta^2}.
\end{aligned}
$$

定義中の不等式を $2$ の指数へ戻すと、各 $i^n\in T_{n,\delta}$ について

$$
2^{-n(S+\delta)}\le r_{i^n}\le2^{-n(S-\delta)}.
$$

$P$ と $\rho_n$ は共通の積固有基底で対角なので、この固有値ごとの評価が表示した作用素不等式になります。次に $D=\operatorname{rank}P=|T_{n,\delta}|$ と置けば

$$
D\,2^{-n(S+\delta)}
\le\sum_{i^n\in T_{n,\delta}}r_{i^n}=p_n\le1
$$

から $D\le2^{n(S+\delta)}$ です。反対側の固有値上界から

$$
p_n=\sum_{i^n\in T_{n,\delta}}r_{i^n}
\le D\,2^{-n(S-\delta)}
$$

なので $D\ge p_n2^{n(S-\delta)}$ が従います。$V$ は有限であるため固定 $\delta>0$ に対し $V/(n\delta^2)\to0$。また $0\le p_n\le1$ より $p_n\to1$ です。$\square$
<!-- proof-end -->

この補題は $P\rho_nP$ を**対角固有値の範囲**で比較したものです。一般の非可換な作用素との積を勝手に並べ替えてはいません。また $V=0$（純粋状態や正の固有値が一様な状態）でも上記の計算はそのまま成り立ち、典型確率は1です。

## 4. 何を保存できたら「量子圧縮に成功」か

典型固有ベクトルの名前だけを古典ビットで送ると、その重ね合わせの相対位相や外部系との相関を消す可能性があります。[QINF4の精製](../QINF4/index.md#def-qinf4-purification)を使い、参照系 $R$ まで含めた純粋状態の重なりで成功を測ります。

<a id="def-qinf22-code-fidelity"></a>

<!-- formal-statement-start -->
> **定義（量子情報源符号とエンタングルメント忠実度）**
> 有限次元密度演算子 $\rho$ に対する長さ $n$ の**量子情報源符号**とは、$H^{\otimes n}$ から $D_n$ 次元符号空間 $B_n$ への量子チャネル $\mathcal E_n$（符号化）と、$B_n$ から $H^{\otimes n}$ への量子チャネル $\mathcal D_n$（復号）の組である。合成 $\mathcal N_n=\mathcal D_n\circ\mathcal E_n$ とする。$\rho_n=\rho^{\otimes n}$ の任意の精製 $|\Psi_n\rangle_{RA}$ に対し、**エンタングルメント忠実度**を

$$
F_e(\rho_n,\mathcal N_n)
=\langle\Psi_n|
(\operatorname{id}_R\otimes\mathcal N_n)
(|\Psi_n\rangle\langle\Psi_n|)
|\Psi_n\rangle
$$

> と定義する。符号率を $(\log_2D_n)/n$（qubit/入力系）とする。物理的なqubitレジスタに収めるには $\lceil\log_2D_n\rceil$ 個を使う。
<!-- formal-statement-end -->

[精製の等長写像による一意性](../QINF4/index.md#thm-qinf4-isometric-freedom)から、どの精製を使っても $F_e$ は同じです。定義中の $\mathcal E_n,\mathcal D_n$ は[量子チャネル](../QINF7/index.md#def-qinf7-channel)であり、測定後の条件付き状態のような非線形な操作ではありません。$F_e$ は純粋な射影状態の期待値なので $0\le F_e\le1$ です。

<!-- definition-example-start: def-qinf22-code-fidelity -->
### 定義の確認：何もせず保存する場合と、測定してしまう場合

**定義の確認**として、精製・チャネル・忠実度の条件を直接確かめます。

二次元状態 $\rho=I_2/2$ の精製を $|\Phi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とします。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で $\operatorname{Tr}_R|\Phi\rangle\langle\Phi|=I_2/2$ を確かめられます。恒等チャネルなら出力も $|\Phi\rangle\langle\Phi|$ で $F_e=1$。

計算基底を非選択的に測る位相消失チャネル $\mathcal M(\tau)=\sum_{i=0}^1|i\rangle\langle i|\tau|i\rangle\langle i|$ は[Krausの条件](../QINF7/index.md#thm-qinf7-kraus-cptp)を満たします。しかし参照系を含めた出力は

$$
(\operatorname{id}\otimes\mathcal M)(|\Phi\rangle\langle\Phi|)
=\tfrac12|00\rangle\langle00|+\tfrac12|11\rangle\langle11|.
$$

従って $F_e=\tfrac12|\langle\Phi|00\rangle|^2+\tfrac12|\langle\Phi|11\rangle|^2=1/2$ です。$\rho$ 自体は測定前後とも $I_2/2$ なのに $F_e<1$。**平均状態だけが一致しても量子情報の保存とは言えない**ことが分かります。
<!-- definition-example-end -->

計算の際に精製を毎回展開せずに済む公式を用意します。

<a id="lem-qinf22-fidelity-kraus"></a>

<!-- formal-statement-start -->
> **補題（エンタングルメント忠実度のKraus表示）**
> 有限次元空間上の密度演算子 $\sigma$ と、$\mathcal N(\tau)=\sum_a K_a\tau K_a^\dagger$、$\sum_a K_a^\dagger K_a=I$ で与えられる量子チャネルについて

$$
F_e(\sigma,\mathcal N)
=\sum_a|\operatorname{Tr}(\sigma K_a)|^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

精製に各Kraus作用素を一つずつ作用させると、$F_e$ はその出力ベクトルと元の精製との内積の絶対値二乗の和になります。各内積は $\sigma$ によるKraus作用素の平均値です。

<!-- proof-start -->
### 証明

$\sigma=\sum_i\lambda_i|i\rangle\langle i|$ と直交固有分解し、[精製の構成](../QINF4/index.md#thm-qinf4-existence)に従って $|\Psi\rangle=\sum_i\sqrt{\lambda_i}|i\rangle_R|i\rangle_A$ を取ります。[Kraus表示](../QINF7/index.md#def-qinf7-kraus)を参照系に恒等写像として作用させると

$$
(\operatorname{id}\otimes\mathcal N)(|\Psi\rangle\langle\Psi|)
=\sum_a(I\otimes K_a)|\Psi\rangle\langle\Psi|(I\otimes K_a^\dagger).
$$

左・右から $|\Psi\rangle$ を挟み、参照系の基底の直交性 $\langle i|j\rangle_R=\delta_{ij}$ を使うと

$$
\begin{aligned}
F_e(\sigma,\mathcal N)
&=\sum_a|\langle\Psi|(I\otimes K_a)|\Psi\rangle|^2\\
&=\sum_a\left|\sum_i\lambda_i\langle i|K_a|i\rangle\right|^2
=\sum_a|\operatorname{Tr}(\sigma K_a)|^2.
\end{aligned}
$$

零固有値はどの項にも寄与せず、異なるKraus表示でも左辺が同じなので右辺も不変です。$\square$
<!-- proof-end -->

## 5. Schumacher圧縮：達成可能性

典型部分空間 $\mathcal T_{n,\delta}$ を小さな符号空間へ**等長に**移すことを考えます。射影に失敗したときもチャネルが必ず出力を返すよう、既知の一つの符号状態を準備します。

<a id="thm-qinf22-achievability"></a>

<!-- formal-statement-start -->
> **定理（Schumacher圧縮の達成可能性）**
> 有限次元密度演算子 $\rho$ の独立同分布情報源 $\rho^{\otimes n}$ に対し、任意の実数 $R>S(\rho)$ について、十分大きい $n$ ごとに符号空間次元 $D_n\le2^{nR}$ のCPTP符号化・復号 $\mathcal E_n,\mathcal D_n$ が存在し、

$$
\lim_{n\to\infty}F_e(\rho^{\otimes n},
\mathcal D_n\circ\mathcal E_n)=1
$$

> が成り立つ。物理的な符号長 $\lceil\log_2D_n\rceil$ を用いても漸近率は $R$ 以下にできる（例えば任意の $R'>S(\rho)$ に対し十分大きい $n$ で $nR'$ qubit以下）。
<!-- formal-statement-end -->

### 証明の見取り図

$0<\delta<R-S(\rho)$ と固定します。[量子典型射影の確率・固有値・次元評価](#lem-qinf22-typical-bounds)で $\dim\mathcal T_{n,\delta}\le2^{n(S+\delta)}<2^{nR}$。典型部分空間のベクトルを符号空間へ等長に写せば、その部分で重ね合わせを壊しません。射影の失敗確率は $1-p_n\to0$ で、[エンタングルメント忠実度のKraus表示](#lem-qinf22-fidelity-kraus)により少なくとも $p_n^2$ の忠実度を保証します。

<!-- proof-start -->
### 証明

$S=S(\rho)$ とし、$0<\delta<R-S$ を選びます。[典型射影補題](#lem-qinf22-typical-bounds)から $p_n=\operatorname{Tr}(P_{n,\delta}\rho_n)\to1$ です。従って十分大きな $n$ で $D_n=\operatorname{rank}P_{n,\delta}\ge1$。以下そのような $n$ を固定し、$P=P_{n,\delta}$、$Q=I-P$ とします。

$\operatorname{ran}P$ から $D_n$ 次元空間 $B_n$ への等長同型 $V$ を選びます。つまり $V^\dagger V=P$（$V$ を $H^{\otimes n}$ 全体上では $Q$ を零に写す写像として延長）、$VV^\dagger=I_{B_n}$ です。$\operatorname{ran}P$ に単位ベクトル $|\phi\rangle$ を一つ選び $|b\rangle=V|\phi\rangle$ と置きます。符号化と復号を

$$
\begin{aligned}
\mathcal E_n(\tau)&=VP\tau PV^\dagger
+\operatorname{Tr}(Q\tau)|b\rangle\langle b|,\\
\mathcal D_n(\omega)&=V^\dagger\omega V
\end{aligned}
$$

と定めます。ここでは $VP=V$ ですが、射影される場所を示すため $P$ を書きました。

$Q$ の正規直交基底を $|j\rangle$ とすると符号化のKraus作用素は $V$ と $|b\rangle\langle j|$ であり、

$$
V^\dagger V+\sum_{j\in Q}|j\rangle\langle b|b\rangle\langle j|
=P+Q=I_{H^{\otimes n}}.
$$

よって[QINF7のKraus条件](../QINF7/index.md#thm-qinf7-kraus-cptp)から $\mathcal E_n$ はCPTPです。復号のKraus作用素 $V^\dagger:B_n\to H^{\otimes n}$ は $VV^\dagger=I_{B_n}$ を満たすためCPTPです。合成は

$$
\mathcal N_n(\tau)
=P\tau P+\operatorname{Tr}(Q\tau)|\phi\rangle\langle\phi|,
$$

そのKraus作用素は $K_0=P$ と $K_j=|\phi\rangle\langle j|$ です。したがって[忠実度公式](#lem-qinf22-fidelity-kraus)と、$P$ が $\rho_n$ のスペクトル射影であることから

$$
\begin{aligned}
F_e(\rho_n,\mathcal N_n)
&=|\operatorname{Tr}(\rho_nP)|^2
+\sum_{j\in Q}|\langle j|\rho_n|\phi\rangle|^2\\
&=p_n^2.
\end{aligned}
$$

最後の和は $Q\rho_nP=0$ により零です。ゆえに $1\ge F_e=p_n^2\to1$。符号次元は

$$
D_n=\operatorname{rank}P
\le2^{n(S+\delta)}<2^{nR}.
$$

整数qubitを使う場合は $m_n=\lceil\log_2D_n\rceil$ とし、符号空間を $2^{m_n}$ 次元レジスタへ等長に埋め込み、未使用の直交補空間を固定した復号出力へ送ることでCPTP復号を拡張できます。$m_n/n\le S+\delta+1/n$ なので、任意に指定した $R'>S$ に対し $\delta<R'-S$ を取れば十分大きい $n$ で $m_n/n<R'$ となります。$\square$
<!-- proof-end -->

この構成では典型射影の結果を古典的に記録して再送する必要はありません。成功した部分に対しては等長写像 $V$ が位相と線形結合を保持します。失敗部分の置換だけが誤差となり、その全確率は漸近的に零です。

## 6. これ以上は圧縮できない：強い逆向き限界

逆向きでは典型射影を使った特定の符号だけを評価しても不十分です。**任意の符号化チャネルと任意の復号チャネル**が、$D$ 次元の中間空間を通るなら、保存できる情報量に上限があることを証明します。

<a id="lem-qinf22-bottleneck"></a>

<!-- formal-statement-start -->
> **補題（中間次元による忠実度の固有値上界）**
> 有限次元状態 $\sigma$ の固有値を重複度込みで $\lambda_1\ge\cdots\ge\lambda_d\ge0$ とする。$\sigma$ の空間から $D$ 次元空間 $B$ への任意のCPTP写像 $\mathcal E$ と、$B$ から元の空間への任意のCPTP写像 $\mathcal D$ について

$$
F_e(\sigma,\mathcal D\circ\mathcal E)
\le\sum_{i=1}^{\min(D,d)}\lambda_i.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固有基底ベクトル $|i\rangle$ を確率 $\lambda_i$ で入力したとき、復号後に元の $i$ と判定できる平均確率は $F_e$ 以上です。中間空間での測定演算子のトレースの和が $D$ なので、元の固有ラベルについて合計で高々 $D$ 個分の「正解枠」しか持てません。高い確率のラベルからこの枠を埋める場合が最大です。

<!-- proof-start -->
### 証明

$\sigma=\sum_i\lambda_i|i\rangle\langle i|$ と置き、$\mathcal N=\mathcal D\circ\mathcal E$ のKraus表示を $\mathcal N(\tau)=\sum_aK_a\tau K_a^\dagger$ とします。[エンタングルメント忠実度のKraus表示](#lem-qinf22-fidelity-kraus)と、複素数列 $z_{ai}=\langle i|K_a|i\rangle$ に対する重み付き[Cauchy–Schwarzの不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\begin{aligned}
F_e(\sigma,\mathcal N)
&=\sum_a\left|\sum_i\lambda_i z_{ai}\right|^2\\
&\le\sum_a\left(\sum_i\lambda_i\right)
\left(\sum_i\lambda_i|z_{ai}|^2\right)\\
&=\sum_i\lambda_i
\sum_a|\langle i|K_a|i\rangle|^2\\
&=\sum_i\lambda_i
\langle i|\mathcal N(|i\rangle\langle i|)|i\rangle.
\end{aligned}
$$

中間空間の状態を $\tau_i=\mathcal E(|i\rangle\langle i|)$、復号後に $i$ と判定する効果を $M_i=\mathcal D^*(|i\rangle\langle i|)$ とします。$\tau_i$ は密度演算子なので $0\le\tau_i\le I_B$、$M_i\ge0$、また復号がトレース保存なので

$$
\sum_iM_i=\mathcal D^*(I)=I_B.
$$

ここで $q_i=\operatorname{Tr}(M_i\tau_i)$ は正しく $i$ と判定する確率です。$0\le q_i\le1$ かつ $\tau_i\le I_B$ から

$$
\sum_iq_i
=\sum_i\operatorname{Tr}(M_i\tau_i)
\le\sum_i\operatorname{Tr}M_i
=\operatorname{Tr}I_B=D.
$$

最初の評価は $F_e\le\sum_i\lambda_iq_i$ となります。$0\le q_i\le1$、$\sum_iq_i\le D$ の下で、$\lambda_1\ge\cdots\ge\lambda_d$ を大きい方から使うと和が最大になります。実際 $D<d$ なら

$$
\begin{aligned}
\sum_i\lambda_iq_i
&\le\sum_{i\le D}\lambda_iq_i
+\lambda_D\sum_{i>D}q_i\\
&\le\sum_{i\le D}\lambda_iq_i
+\lambda_D\sum_{i\le D}(1-q_i)\\
&\le\sum_{i\le D}\lambda_i.
\end{aligned}
$$

$D\ge d$ の場合は $F_e\le1=\sum_{i\le d}\lambda_i$。従って任意のCPTP符号化・復号について主張が成立します。$\square$
<!-- proof-end -->

この補題は「固有ベクトルを古典的に識別すれば十分」と言っているわけではありません。まず**エンタングルメント忠実度が固有基底の正解率以下**であると証明し、その正解率へ次元上界を適用しました。したがってコヒーレンスを保つ必要がある、より厳しい量子保存の基準にも有効です。

<a id="thm-qinf22-converse"></a>

<!-- formal-statement-start -->
> **定理（Schumacher圧縮の強い逆向き限界）**
> 有限次元独立同分布量子情報源 $\rho^{\otimes n}$ について $S=S(\rho)>0$ とする。実数 $0\le R<S$ に対し、符号空間次元 $D_n\le2^{nR}$ の任意のCPTP符号化・復号列は

$$
\lim_{n\to\infty}F_e(\rho^{\otimes n},
\mathcal D_n\circ\mathcal E_n)=0
$$

> を満たす。従って忠実度が1へ収束する量子情報源符号の漸近必要率は $S(\rho)$ 以上である。
<!-- formal-statement-end -->

### 証明の見取り図

$R<S$ の隙間に $0<\delta<S-R$ を置きます。典型でない固有値の総和は零へ向かいます。典型な固有値一つは高々 $2^{-n(S-\delta)}$ です。$D_n$ 個まで選んでも総和は $D_n2^{-n(S-\delta)}\to0$ になります。[中間次元の補題](#lem-qinf22-bottleneck)により、どの量子符号もその総和を超えられません。

<!-- proof-start -->
### 証明

$0<\delta<S-R$ を固定し、$P=P_{n,\delta}$ とします。$\rho_n$ のすべての固有値を大きい順に並べ、上位 $D_n$ 個の添字集合を $J_n$ とします（$D_n$ が全次元以上なら全添字）。$J_n$ に属する典型・非典型の固有値を別々に足すと

$$
\begin{aligned}
\sum_{i^n\in J_n}r_{i^n}
&=\sum_{i^n\in J_n\cap T_{n,\delta}}r_{i^n}
+\sum_{i^n\in J_n\setminus T_{n,\delta}}r_{i^n}\\
&\le D_n\,2^{-n(S-\delta)}+(1-p_n).
\end{aligned}
$$

零固有値が $J_n$ にあっても寄与は0です。[典型射影補題](#lem-qinf22-typical-bounds)と $D_n\le2^{nR}$ によって

$$
\sum_{i^n\in J_n}r_{i^n}
\le2^{-n(S-\delta-R)}+\frac{V}{n\delta^2}
\longrightarrow0.
$$

[中間次元による忠実度上界](#lem-qinf22-bottleneck)を任意の $\mathcal E_n,\mathcal D_n$ に適用すれば

$$
0\le F_e(\rho_n,\mathcal D_n\circ\mathcal E_n)
\le2^{-n(S-\delta-R)}+\frac{V}{n\delta^2}\to0.
$$

ここで $S-\delta-R>0$ を使いました。$\square$
<!-- proof-end -->

[達成可能性](#thm-qinf22-achievability)と[逆向き限界](#thm-qinf22-converse)を合わせると、**忠実度が1へ近づく圧縮率の下限（infimum）は $S(\rho)$ qubit/入力系**です。ただし定理は $R>S$ と $R<S$ を扱います。厳密に $D_n=2^{nS}$ と固定した境界率そのものの忠実度を、両定理だけから決めたわけではありません。例えば $S=1$ の一様qubit源では全次元が必要です。

## 7. 端の例と、独立同分布を外した場合

**純粋状態。** $\rho=|\phi\rangle\langle\phi|$ は正の固有値が1つだけで $S=V=0$ です。$\rho^{\otimes n}$ の台は $|\phi\rangle^{\otimes n}$ の一次元空間だから $D_n=1$ で $F_e=1$。入力が既知の一つの純粋状態なら、保存に実質的な量子記憶を使いません。

**最大混合状態。** $\rho=I_d/d$ では正の固有値が全て $1/d$、$S=\log_2d$、$V=0$ です。$d^n$ 個の正の固有値はいずれも $d^{-n}$ で、典型射影は台全体の恒等射影です。[中間次元の補題](#lem-qinf22-bottleneck)で任意の符号の忠実度は

$$
F_e\le\min(1,D_n/d^n).
$$

この模型では全固有方向が等しく重要なので、典型性からの削減はありません。

**独立性を外すとどうなるか。** $0<p<1$ とし、全ブロックに同じビットを複製した相関状態

$$
\omega_n=p|0^n\rangle\langle0^n|
+(1-p)|1^n\rangle\langle1^n|
$$

を考えます。どの一箇所の周辺状態も $\rho=\operatorname{diag}(p,1-p)$ で $S(\rho)=h_2(p)>0$ ですが、$\omega_n$ 自体の台は二次元で、$n$ に依らず1 qubitへ**完全に**等長符号化できます。よって $\log_2D_n/n=1/n\to0$ です。ここで壊れたのは、固有列確率が $\prod_kr_{i_k}$ と因子化されるという[独立同分布の仮定](#def-qinf22-iid-source)です。単一時刻の周辺エントロピーだけを一般の相関源に適用してはいけません。

## 8. 演習：スペクトル・忠実度・圧縮率を再構成する

以下は有限次元・底2の対数とし、演習ごとに必要な状態・空間を指定します。量子チャネルのCPTP性はKrausの完全性関係まで確認してください。

### Level A：典型射影を直接計算する

<a id="ex-qinf22-a01"></a>
### QINF22-A01 偏った二値源の2ブロック

- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$ を $\mathbb C^2$ 上の状態とし、$n=2,\delta=1/2$ とする。$S(\rho)$、$T_{2,\delta}$、$\operatorname{rank}P_{2,\delta}$、$\operatorname{Tr}(P_{2,\delta}\rho^{\otimes2})$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\rho$ は非負の対角成分を持ち、トレース1です。[von Neumannエントロピーの定義](../QINF17/index.md#def-qinf17-entropy)より

$$
S(\rho)=-\tfrac34\log_2\tfrac34-\tfrac14\log_2\tfrac14
=2-\tfrac34\log_2 3.
$$

文字列中の $1$ の個数が $k=0,1,2$ のとき、固有値は $(3/4)^{2-k}(1/4)^k$、自己情報量の平均は

$$
-\tfrac12\log_2[(3/4)^{2-k}(1/4)^k]
=2-\log_2 3+\tfrac{k}{2}\log_2 3.
$$

これと $S$ の差は $(k/2-1/4)\log_2 3$ です。$k=0,1$ の絶対値は $(\log_2 3)/4\approx0.396<1/2$、$k=2$ は $3\log_2 3/4>1/2$。従って

$$
T_{2,1/2}=\{00,01,10\},
\qquad \operatorname{rank}P_{2,1/2}=3.
$$

各固有値は順に $9/16,3/16,3/16$ なので、確率は $(9+3+3)/16=15/16$ です。
<!-- solution-end -->

<a id="ex-qinf22-a02"></a>
### QINF22-A02 一様な三次元源

- Level: A

$H=\mathbb C^3$、$\rho=I_3/3$、$n=3$ とする。任意の $\delta>0$ に対して $S,V,P_{n,\delta}$、そのrankと典型確率を求めよ。中間符号空間次元 $D=9$ の任意の量子符号の忠実度上界も求めよ。

<!-- solution-start -->
### 詳細解答

正の固有値は $1/3$ が3個で、$S=-3(1/3)\log_2(1/3)=\log_2 3$、$V=3(1/3)(\log_2 3-S)^2=0$ です。各3文字列の固有値は $3^{-3}$ だから

$$
-\frac13\log_2(3^{-3})=\log_2 3=S.
$$

すべての27文字列が典型で $P_{3,\delta}=I_{27}$、rank27、確率1です。[中間次元の忠実度上界](#lem-qinf22-bottleneck)では最大固有値9個の和が $9/27=1/3$。従ってどんなCPTP符号・復号でも $F_e\le1/3$ です。
<!-- solution-end -->

<a id="ex-qinf22-a03"></a>
### QINF22-A03 零固有値と純粋源

- Level: A

$H=\mathbb C^3$、$\rho=\operatorname{diag}(1,0,0)$ とし、$n\ge1,\delta>0$ を任意に取る。正のスペクトル、$S,V$、典型射影のrankを求め、一次元符号空間へ忠実度1で符号化できる理由を述べよ。

<!-- solution-start -->
### 詳細解答

正の固有値は $r_0=1$ だけで、零固有値は $S$ に寄与しません。従って $S=-1\log_2 1=0$、$V=1(-\log_2 1-0)^2=0$ です。正の固有値を持つ積ベクトルは $|0\rangle^{\otimes n}$ ただ一つで、その自己情報量平均は0。よって

$$
P_{n,\delta}=|0^n\rangle\langle0^n|,
\quad \operatorname{rank}P_{n,\delta}=1,\quad
\operatorname{Tr}(P_{n,\delta}\rho^{\otimes n})=1.
$$

この一次元部分空間を $\mathbb C$ へ等長に移し、復号で $|0^n\rangle$ を準備すれば、[Schumacher圧縮の達成可能性](#thm-qinf22-achievability)で構成したチャネルと[エンタングルメント忠実度のKraus表示](#lem-qinf22-fidelity-kraus)から $F_e=1^2=1$ です。独立で既知の純粋源だから成立します。
<!-- solution-end -->

<a id="ex-qinf22-a04"></a>
### QINF22-A04 平均状態を変えない測定の損失

- Level: A

$\sigma=\operatorname{diag}(3/4,1/4)$ とし、$K_0=|0\rangle\langle0|$、$K_1=|1\rangle\langle1|$ による $\mathcal M(\tau)=\sum_jK_j\tau K_j^\dagger$ を考える。CPTP性、$\mathcal M(\sigma)=\sigma$、$F_e(\sigma,\mathcal M)$ をそれぞれ確認せよ。

<!-- solution-start -->
### 詳細解答

$K_j^\dagger K_j=K_j$、$K_0+K_1=I_2$ なので[Krausの完全性条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPです。$\sigma$ は対角なので

$$
\mathcal M(\sigma)=\tfrac34|0\rangle\langle0|
+\tfrac14|1\rangle\langle1|=\sigma.
$$

一方、[エンタングルメント忠実度のKraus表示](#lem-qinf22-fidelity-kraus)を使うと

$$
F_e=|\operatorname{Tr}(\sigma K_0)|^2+
|\operatorname{Tr}(\sigma K_1)|^2
=(3/4)^2+(1/4)^2=5/8.
$$

精製中の $|00\rangle$ と $|11\rangle$ の交差項が測定で消えるため、平均状態が不変でも完全保存ではありません。
<!-- solution-end -->

<a id="ex-qinf22-a05"></a>
### QINF22-A05 4個の偏ったqubitを3qubitへ

- Level: A

$\rho=\operatorname{diag}(3/4,1/4)$ を独立に4個入力する。計算基底文字列で $1$ が高々1個の部分空間への射影を $P$ とする。$D=\operatorname{rank}P$、$p=\operatorname{Tr}(P\rho^{\otimes4})$ と、[達成可能性の構成](#thm-qinf22-achievability)をこの $P$ に使ったときの $F_e$、必要な整数qubit数を求めよ。

<!-- solution-start -->
### 詳細解答

$1$ が0個の文字列は1本、1個の文字列は4本あり、互いに直交するため $D=1+4=5$ です。それぞれの確率は $(3/4)^4=81/256$、$(3/4)^3(1/4)=27/256$ なので

$$
p=81/256+4\cdot27/256=189/256.
$$

$P$ は $\rho^{\otimes4}$ のスペクトル射影だから $Q\rho^{\otimes4}P=0$。合成チャネルのKraus作用素を $P,|\phi\rangle\langle j|$ とすれば

$$
F_e=p^2=(189/256)^2=35721/65536.
$$

次元5の格納には $\lceil\log_25\rceil=3$ qubitが必要です。これは有限長での試作であり、$F_e\approx0.545$ なので、長いブロックでの高忠実度を直ちに意味しません。
<!-- solution-end -->

### Level B：構成と上界の仕組みを使う

<a id="ex-qinf22-b01"></a>
### QINF22-B01 自己情報量分散からの有限長保証

- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$ の独立同分布情報源について、$Z=-\log_2r_I$（$P(I=0)=3/4$、$P(I=1)=1/4$）とする。

1. $E[Z]=S(\rho)$、$V=\operatorname{Var}(Z)$ を求めよ。
2. $n=1000,\delta=0.1$ として典型射影の成功確率・rankの数式上界を求めよ。
3. この有限長評価と $n\to\infty$ の結論が異なる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 平均と分散。** $Z$ は値 $a=-\log_2(3/4)=2-\log_2 3$ を確率3/4、値 $b=2$ を確率1/4で取ります。

$$
E[Z]=\tfrac34a+\tfrac14b
=2-\tfrac34\log_2 3=S.
$$

二値分布の分散を直接展開すると $a-S=(a-b)/4$、$b-S=3(b-a)/4$ なので

$$
\begin{aligned}
V&=\tfrac34(a-S)^2+\tfrac14(b-S)^2\\
&=\tfrac34\frac{(b-a)^2}{16}
+\tfrac14\frac{9(b-a)^2}{16}
=\tfrac3{16}(\log_2 3)^2.
\end{aligned}
$$

**2. 具体的評価。** 有限正のスペクトルで分散が有限なので[典型射影補題](#lem-qinf22-typical-bounds)を $n=1000,\delta=1/10$ へ適用できます。

$$
p_{1000}\ge1-\frac{(3/16)(\log_2 3)^2}{1000(1/10)^2}
=1-\frac3{160}(\log_2 3)^2
\approx0.9529.
$$

また $S\approx0.811278$ より

$$
\operatorname{rank}P_{1000,0.1}
\le2^{1000(S+0.1)}\approx2^{911.278}.
$$

**3. 意味。** これは一つの特定の $n$ についての保守的な保証で、必要十分な最小rankを与えてはいません。$\delta$ を固定すれば、$V/(n\delta^2)$ は $n$ とともに零へ向かいます。同時に $\log_2D_n/n\le S+\delta$ が続くので、目標率へ近づけるには $\delta$ を先に好きなだけ小さく固定し、その後 $n$ を十分大きくします。
<!-- solution-end -->

<a id="ex-qinf22-b02"></a>
### QINF22-B02 具体的なCPTP圧縮器と忠実度

- Level: B

$H=\mathbb C^2$、$\sigma=\operatorname{diag}(p,1-p)$（$0<p<1$）とする。$P=|0\rangle\langle0|$ を一次元符号空間へ写し、失敗時も $|0\rangle$ を準備する復号済みチャネル $\mathcal N(\tau)=P\tau P+\operatorname{Tr}((I-P)\tau)P$ を考える。

1. このチャネルのKraus作用素を示し、CPTP性を証明せよ。
2. $F_e(\sigma,\mathcal N)$ と、固有基底の平均正解確率を求めて比較せよ。
3. $p=3/4$ で、なぜ平均状態が保存されないのか確認せよ。

<!-- solution-start -->
### 詳細解答

**1. 作用素。** $K_0=|0\rangle\langle0|$、$K_1=|0\rangle\langle1|$ とすれば

$$
\sum_jK_j\tau K_j^\dagger
=\langle0|\tau|0\rangle P+\langle1|\tau|1\rangle P
=\operatorname{Tr}(\tau)P.
$$

また $K_0^\dagger K_0=|0\rangle\langle0|$、$K_1^\dagger K_1=|1\rangle\langle1|$ で和は $I_2$。よって[Krausの条件](../QINF7/index.md#thm-qinf7-kraus-cptp)からCPTPです。

**2. 二種類の成功率。** [忠実度公式](#lem-qinf22-fidelity-kraus)を用いると $\operatorname{Tr}(\sigma K_0)=p$、$\operatorname{Tr}(\sigma K_1)=\langle1|\sigma|0\rangle=0$ なので

$$
F_e(\sigma,\mathcal N)=p^2.
$$

固有基底 $|0\rangle,|1\rangle$ を送信した後で同じ基底を測る正解確率はそれぞれ1、0です。従って平均正解率は $p\cdot1+(1-p)\cdot0=p\ge p^2$。これは[中間次元補題](#lem-qinf22-bottleneck)の最初のCauchy–Schwarz評価を具体的に確認しています。

**3. 平均状態。** $p=3/4$ では入力 $\sigma=\operatorname{diag}(3/4,1/4)$ に対し出力は $P=\operatorname{diag}(1,0)$。固有値1/4の成分を置換したため平均状態も変わり、$F_e=9/16$ です。
<!-- solution-end -->

<a id="ex-qinf22-b03"></a>
### QINF22-B03 任意の1qubit圧縮器への上界

- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$ の独立な2個を、任意のCPTP符号化で1qubit（$D=2$）へ圧縮し、任意に復号する。

1. $\rho^{\otimes2}$ の固有値を大きい順に求め、どんな符号にも共通する忠実度上界を示せ。
2. $P=\operatorname{span}\{|00\rangle,|01\rangle\}$ への射影を用いる符号の忠実度を求めよ。
3. その符号が必ず上界を達成すると言えない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**1. 任意符号の限界。** 積固有値は $00$ で $9/16$、$01,10$ で $3/16$、$11$ で $1/16$ です。2個の最大固有値の和は

$$
\lambda_1+\lambda_2=9/16+3/16=3/4.
$$

入力は有限次元の密度演算子、符号・復号はCPTP、符号空間は次元2なので[中間次元補題](#lem-qinf22-bottleneck)により $F_e\le3/4$ です。

**2. 具体的符号。** $P=|00\rangle\langle00|+|01\rangle\langle01|$ はrank2のスペクトル射影で、$\operatorname{Tr}(P\rho^{\otimes2})=12/16=3/4$。$P$ の中の一つの単位ベクトルを失敗時の置換先に取れば[圧縮定理の構成](#thm-qinf22-achievability)より

$$
F_e=(3/4)^2=9/16.
$$

**3. 上界と構成。** $3/4$ は「この値を超えられない」という普遍上界で、ここで作ったチャネルの値 $9/16$ より大きいです。エンタングルメント忠実度から固有基底の正解率へ移る不等式は一般には等号ではないため、両者を同一視できません。
<!-- solution-end -->

<a id="ex-qinf22-b04"></a>
### QINF22-B04 境界率へ近づくだけでは足りない

- Level: B

独立同分布の一様qubit源 $\rho=I_2/2$ のブロックに対し、$D_n=2^{n-1}$ の符号空間を用いる任意のCPTP符号化・復号列を考える。

1. 符号率の極限を求めよ。
2. エンタングルメント忠実度の一様上界を求めよ。
3. なぜ「符号率が $S(\rho)$ へ収束する」ことだけでは高忠実度を結論できないか説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 率。** $S(\rho)=1$ で、符号率は

$$
R_n=\frac{\log_2(2^{n-1})}{n}=1-\frac1n\longrightarrow1=S(\rho).
$$

**2. 上界。** $\rho^{\otimes n}=I_{2^n}/2^n$ には等しい固有値 $2^{-n}$ が $2^n$ 個あるので、[中間次元の上界](#lem-qinf22-bottleneck)を用いると

$$
F_e\le D_n2^{-n}=2^{n-1}2^{-n}=1/2
$$

であり、どんな $n$ でも1へは近づきません。

**3. 量化の違い。** [達成可能性定理](#thm-qinf22-achievability)は任意に固定した $R>S$ で良い符号を**構成できる**という存在主張です。ここでの $R_n\to S$ は、与えられた任意の符号列が良いことを意味しません。同じ源で $D_n=2^n$ の恒等符号なら $F_e=1$ です。境界近傍では次元の微細な違いが効きます。
<!-- solution-end -->

### Level C：非直交アンサンブルから源符号化まで

<a id="ex-qinf22-c01"></a>
### QINF22-C01 非直交な二状態源の量子圧縮と相関源との比較

- Level: C

量子状態 $|0\rangle$ と $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を各時刻に独立に確率1/2ずつ選ぶ。受け手が保持する一系の平均状態を $\rho$ とし、長さ $n$ のブロック状態を $\rho^{\otimes n}$ とする。

1. $\rho$ の行列・固有値・エントロピー $S$・情報分散 $V$ を求め、$S$ が送信ラベルのエントロピー $1$ ビットと異なることを確認せよ。
2. $R_+=0.7$、$\delta=0.04$ として、典型射影に基づく符号化・復号の次元上界と忠実度の下界を導け。
3. $R_-=0.5$ の任意の量子符号について、$F_e\to0$ を示す具体的上界を導け。
4. 代わりに同じ古典ラベルをブロック中で一度だけ選んで全 $n$ 系へ繰り返すとき、1qubitで完全圧縮できる理由と、前の結論を適用できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**1. スペクトル。** $|+\rangle\langle+|=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ なので

$$
\rho=\frac12|0\rangle\langle0|+\frac12|+\rangle\langle+|
=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix}.
$$

トレース1、行列式 $3/16-1/16=1/8$ から特性方程式 $\lambda^2-\lambda+1/8=0$ を得ます。固有値は

$$
\lambda_\pm=\frac{1\pm1/\sqrt2}{2},\qquad
\lambda_+\lambda_-=\frac18.
$$

両方正なので密度演算子の正のスペクトルは2点、$S=h_2(\lambda_-)\approx0.600876$ です。$Z=-\log_2\lambda_I$ は確率 $\lambda_\pm$ で二つの値を取り、二値分散の恒等式から

$$
V=\lambda_+\lambda_-
\left(\log_2\frac{\lambda_+}{\lambda_-}\right)^2
=\frac18\left[\log_2(3+2\sqrt2)\right]^2.
$$

送信ラベル自体のShannonエントロピーは1ですが、圧縮対象は測定済みのラベルではなく、非直交純粋状態の**平均密度演算子**です。量子源の限界率は $S$ になります。

**2. 符号の構成。** $\delta=0.04$ は $0<\delta<0.7-S$ を満たします。従って[典型射影補題](#lem-qinf22-typical-bounds)と[達成可能性の構成](#thm-qinf22-achievability)から、十分大きい $n$ で

$$
D_n\le2^{n(S+0.04)}<2^{0.7n},
\quad
p_n\ge1-\frac{V}{0.04^2n},
\quad F_e=p_n^2.
$$

特に $n$ が十分大きく右辺が非負になれば

$$
F_e\ge\left(1-\frac{V}{0.0016n}\right)^2\longrightarrow1.
$$

これは等長写像で典型空間の重ね合わせを保存する符号です。単一状態を測定して $0$ / $+$ のラベルを推定する符号ではありません。

**3. 任意符号の逆向き。** $0.5<S$ なので $\delta'=0.04<S-0.5$ です。$D_n\le2^{0.5n}$ のどんなCPTP符号にも、[次元上界](#lem-qinf22-bottleneck)と[典型固有値評価](#lem-qinf22-typical-bounds)から

$$
F_e\le2^{-n(S-0.04-0.5)}+\frac{V}{0.04^2n}.
$$

$S-0.54>0$、$V<\infty$ であるため、右辺の両項は零へ向かいます。これは特定の符号に限らない強い逆向き限界です。

**4. 相関源。** ラベルをブロック全体で一度だけ選べば入力状態は

$$
\omega_n=\tfrac12|0\rangle^{\otimes n}\langle0|^{\otimes n}
+\tfrac12|+\rangle^{\otimes n}\langle+|^{\otimes n}.
$$

その台は高々 $\operatorname{span}\{|0^n\rangle,|+^n\rangle\}$ の二次元です。$n\ge1$ でこの二つは線形独立なので台のrankは2、台を1qubitへ等長に写し逆写像で復号すれば $F_e=1$ です。一方、$\rho$ は二つの正の固有値を持ち $\rho^{\otimes n}$ のrankは $2^n$。$n>1$ では $\omega_n\ne\rho^{\otimes n}$ です。前半の定理が使った固有列の積確率と独立性が失われるため、単一系の $S$ をこの相関源の圧縮限界にしてはいけません。
<!-- solution-end -->

## 9. まとめと次の問い

- [量子弱典型部分空間と典型射影](#def-qinf22-typical)は有限確率分布の典型列を固有ベクトルの空間へ移したもので、[量子典型射影の確率・固有値・次元評価](#lem-qinf22-typical-bounds)により重みは1へ、必要次元はおよそ $2^{nS(\rho)}$ になります。
- [エンタングルメント忠実度](#def-qinf22-code-fidelity)は参照系とのコヒーレンスも判定します。[Schumacher圧縮の達成可能性](#thm-qinf22-achievability)は典型空間を等長に記録し、CPTPな失敗処理を入れて $F_e\to1$ を示しました。
- [中間次元の上界](#lem-qinf22-bottleneck)は任意の符号に使え、[強い逆向き限界](#thm-qinf22-converse)により $R<S(\rho)$ では $F_e\to0$。両方向を合わせた最適漸近率の下限は $S(\rho)$ です。

この章では**量子状態そのものの圧縮**を扱いました。次のQINF23では古典メッセージを量子チャネルの**多数回使用**で伝える符号を考えます。前章の[Holevo界](../QINF21/index.md#thm-qinf21-holevo-bound)と、ここで使った典型性がそこで別の形で結びつきます。
