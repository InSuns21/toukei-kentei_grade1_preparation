# SLT2-17 情報量と圧縮の汎化界

<!-- definition-example-audit: strict -->

経験リスクを小さくする学習算法でも、見ていないデータで同じ性能を発揮するとは限らない。これまでの[有限仮説クラスの同時汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)は、候補の個数を数えることで、標本を見てからの選択を保証した。しかし、巨大なクラスからでも「実際に出力した予測器が標本についてほとんど情報を明かさない」なら、別の方法で汎化を評価できないだろうか。

この章では、二つの異なる情報の測り方を使う。

1. **情報量**：学習標本 $S$ を観測すると算法の出力 $W$ の分布がどれだけ変わるか。これにより、**期待汎化ギャップ**を評価する。
2. **圧縮・記述長**：予測器を事前固定の符号で何ビットで指定できるか、あるいは標本の一部から再構成できるか。これにより、**高確率の同時保証**を得る。

情報量の式にある期待値を、そのまま高確率主張へ読み替えることはできない。また、「短い符号」を訓練標本に合わせて後から設計してよいわけでもない。これらの違いが本講義の中心である。

前提講座： [SLT1-03 有限仮説クラス](../SLT1-03/index.md)、[SLT1-15 PAC-Bayes](../SLT1-15/index.md)、[INFO1 相互情報量](../../INFO/INFO1/index.md#def-info1-mutual-information)、[INFO2 相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)、[INFO4 接頭語符号](../../INFO/INFO4/index.md#def-info4-prefix-code)。

## 1. 学習標本の情報をどれだけ出力したか

標本を固定した予測器に対しては、独立標本平均の集中不等式が使える。しかし学習後の予測器は標本を見て選ばれている。例えば一つの公平なラベル $Y_1$ を見て、いつもそのラベルを予測する定数分類器 $W=Y_1$ を選ぶと、訓練誤りは必ず零になる。それでも未知の公平なラベルに対する誤り確率は $1/2$ のままである。

そこで、標本と出力がどれだけ結び付いたかを測る。以下では計算を最後まで確かめるために、観測空間 $\mathcal Z$ と仮説集合 $\mathcal H$ を有限とする。$n\ge1$、$S=(Z_1,\ldots,Z_n)\sim P^n$、$0\le\ell(w,z)\le1$ とし、算法は条件付き確率 $Q(w\mid s)$ に従って $W\in\mathcal H$ を出す。学習算法自身の乱数もこの条件付き確率に含める。

$S\sim P^n$ は、各 $Z_i$ が互いに独立で同じ分布 $P$ に従う**独立同分布（independent and identically distributed; iid）**標本という意味である。この仮定は後の集中不等式と、保存していない標本の独立性の両方に使う。

母集団リスク $R_P(w)=\mathbb E_{Z\sim P}\ell(w,Z)$ と経験リスク $\widehat R_S(w)=n^{-1}\sum_i\ell(w,Z_i)$ は、[既習の母集団・経験リスクの定義](../../ML/ML1-01/index.md#def-ml1-01-risks)の一般化である。分類の場合は $Z=(X,Y)$、$\ell(w,Z)=\ell(w(X),Y)$ と置けば既習の式と一致する。差 $R_P(W)-\widehat R_S(W)$ は標本と算法乱数で変動する確率変数である。

[INFO1の相互情報量の定義](../../INFO/INFO1/index.md#def-info1-mutual-information)と[INFO2の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)は底2の対数を使うため単位はビットである。本章では指数モーメントと単位を揃えて**自然対数（nat）**に換算する。両者の関係は

$$
I_{\mathrm{nat}}(S;W)=(\ln2)\,I_{\mathrm{bit}}(S;W),\qquad
D_{\mathrm{nat}}(P\|Q)=(\ln2)\,D_{\mathrm{bit}}(P\|Q)
$$

である。添字は対数の底だけの違いを表し、以下の $I(S;W)$ は $I_{\mathrm{nat}}(S;W)$ を意味する。[SLT1-15のKL](../SLT1-15/index.md#def-slt1-15-kl)も自然対数版である。

<a id="def-slt2-17-information"></a>

<!-- formal-statement-start -->
> **定義（学習算法出力の情報量と期待汎化ギャップ）**  
> 有限集合 $\mathcal Z,\mathcal H$、$S\sim P^n$、条件付き算法分布 $Q(w\mid s)$、$W\sim Q(\cdot\mid S)$ に対して、周辺分布 $P_W(w)=\sum_sP_S(s)Q(w\mid s)$ とする。[相互情報量の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)を自然対数へ換算した算法出力の情報量と、期待汎化ギャップを

$$
I(S;W)=\sum_{s,w}P_{S,W}(s,w)
 \ln\frac{P_{S,W}(s,w)}{P_S(s)P_W(w)},
\qquad
\operatorname{gen}(Q,P,n)
=\mathbb E_{S,W}[R_P(W)-\widehat R_S(W)]
$$

> と定める。和は結合確率が正の項に限る。対数は自然対数とし、情報量の単位は nat とする。
<!-- formal-statement-end -->

$I(S;W)$ は $P_{S,W}$ と $P_S\otimes P_W$ の**自然対数版**の相対エントロピーなので非負であり、零であることと $S,W$ の独立性は同値である（[INFO2の定理](../../INFO/INFO2/index.md#thm-info2-mutual-kl)の両辺に正の $\ln2$ を掛けたもの）。$W$ の取り得る値が少ないことだけでなく、**それが標本にどの程度依存するか**を測る点が特徴である。

<!-- definition-example-start: def-slt2-17-information -->
### 直接例：公平な1ビットの丸暗記

$n=1$、$\mathcal Z=\{0,1\}$、$Z_1$ は公平、$\mathcal H=\{h_0,h_1\}$、$h_w$ は常に $w$ を予測し、$\ell(h_w,z)=\mathbf1\{w\ne z\}$ とする。算法が $W=Z_1$ を出力するなら、結合確率の正の項は $(S,W)=(0,0),(1,1)$ の二つで、各確率は $1/2$。周辺確率はどちらも $1/2$ なので

$$
I(S;W)=2\cdot\frac12\ln\frac{1/2}{(1/2)(1/2)}
=\ln2.
$$

各 $w$ について $R_P(h_w)=1/2$、選ばれた $W$ では $\widehat R_S(h_W)=0$。従って $\operatorname{gen}=1/2$。一方、訓練標本を無視して独立な公平ビット $W$ を出せば $I(S;W)=0$、$\mathbb E\widehat R_S(h_W)=1/2$ なので期待ギャップは零になる。

**定義の確認**：どちらも有限集合・確率算法の条件を満たし、前者では結合分布と周辺分布の積が違うため情報量が $\ln2$、後者では一致するため零である。リスク差も定義の期待値を実際に計算した。**分布・予測器の集合・損失が同じでも、選び方で情報量と汎化が変わる。**
<!-- definition-example-end -->

## 2. 相互情報量から期待汎化界を導く

必要なのは次の二つである。第一に、固定した $w$ について $X_i=R_P(w)-\ell(w,Z_i)$ と置けば、$X_i$ は独立で平均零、値の範囲の幅は1である。[Hoeffding補題](../../../解析系/HDP/HDP1/index.md#lem-hdp1-hoeffding)を各 $X_i$ に指数パラメータ $\lambda/n$ で適用すると、全ての $\lambda\in\mathbb R$ に対し

$$
\begin{aligned}
\mathbb E_S\exp\{\lambda(R_P(w)-\widehat R_S(w))\}
&=\prod_{i=1}^{n}\mathbb E_S e^{(\lambda/n)X_i}\\
&\le\prod_{i=1}^{n}e^{\lambda^2/(8n^2)}
=\exp\left(\frac{\lambda^2}{8n}\right)
\end{aligned}
$$

が成立する。第二に、分布を変えて平均を取るときは[有限仮説上の分布変更不等式](../SLT1-15/index.md#lem-slt1-15-change-measure)が使える。ここでの参照定理は固定した $w$ に適用するのであって、選択後の $W$ に無条件に集中不等式を代入しているのではない。

<a id="thm-slt2-17-information-bound"></a>

<!-- formal-statement-start -->
> **定理（相互情報量による期待汎化界）**  
> 有限集合 $\mathcal Z,\mathcal H$、$S\sim P^n$（$n\ge1$）、$[0,1]$ 値損失 $\ell$、任意の確率的算法 $Q(W\mid S)$ を考える。$I(S;W)$ を[学習算法出力の情報量](#def-slt2-17-information)とすると、

$$
\left|\mathbb E_{S,W}
\big[R_P(W)-\widehat R_S(W)\big]\right|
\le\sqrt{\frac{I(S;W)}{2n}}.
$$

> この界は期待値についての主張であり、標本ごとの高確率界や $\mathbb E|R_P(W)-\widehat R_S(W)|$ の界を主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

各標本 $s$ で算法が実際に使う分布 $Q(\cdot\mid s)$ と、標本を見ない周辺分布 $P_W$ を比較する。分布変更の費用を[自然対数版のKL](../SLT1-15/index.md#def-slt1-15-kl)である $\mathrm{KL}(Q(\cdot\mid s)\Vert P_W)$ で払えば、固定された予測器の指数モーメントを利用できる。最後に $s$ について平均するとKL費用は $I(S;W)$ になる。

<!-- proof-start -->
### 証明

$g(w,s)=R_P(w)-\widehat R_s(w)$ と置く。$P_S(s)>0$ の任意の $s$ について、$Q(w\mid s)>0$ なら必ず $P_W(w)>0$ である。従って[分布変更不等式](../SLT1-15/index.md#lem-slt1-15-change-measure)を $Q_s=Q(\cdot\mid s)$、基準分布 $P_W$、関数 $f(w)=\lambda g(w,s)$ に適用できる。$\lambda>0$ とすれば

$$
\lambda\mathbb E_{W\mid s}g(W,s)
\le \mathrm{KL}(Q_s\Vert P_W)
 +\ln\mathbb E_{W'\sim P_W}e^{\lambda g(W',s)}.
$$

ここで $W'$ は標本を見ずに周辺分布 $P_W$ から独立に引いた別の変数である。$s$ について $P_S$ で平均すると、定義により $\mathbb E_S\mathrm{KL}(Q_s\Vert P_W)=I(S;W)$ であり、

$$
\lambda\operatorname{gen}(Q,P,n)
\le I(S;W)
+\mathbb E_S\ln\mathbb E_{W'}e^{\lambda g(W',S)}.
$$

自然対数の凹性によるJensen不等式、有限和の交換、そして $W'$ が $S$ と独立であることを順に使うと

$$
\begin{aligned}
\mathbb E_S\ln\mathbb E_{W'}e^{\lambda g(W',S)}
&\le\ln\mathbb E_S\mathbb E_{W'}e^{\lambda g(W',S)}\\
&=\ln\mathbb E_{W'}\mathbb E_Se^{\lambda g(W',S)}\\
&\le\frac{\lambda^2}{8n}.
\end{aligned}
$$

最後の行は、$W'=w$ を固定してから $Z_i$ の独立性と損失の有界性に基づく指数モーメント評価を適用したものである。従って

$$
\operatorname{gen}(Q,P,n)
\le\frac{I(S;W)}{\lambda}+\frac{\lambda}{8n}.
$$

$I(S;W)>0$ なら右辺が最小になる $\lambda=\sqrt{8nI(S;W)}$ を選び、

$$
\frac{I}{\sqrt{8nI}}+\frac{\sqrt{8nI}}{8n}
=\sqrt{\frac{I}{2n}}
$$

を得る。$I=0$ の場合は $\lambda\downarrow0$ として期待ギャップが非正と分かる。同じ手順を $-g$ に適用すれば逆向きの不等式が得られ、絶対値の形が従う。$\square$
<!-- proof-end -->

先ほどの丸暗記例では右辺は $\sqrt{\ln2/2}\simeq0.589$ となり、実際の期待ギャップ $1/2$ を上から抑える。情報量が $o(n)$ なら、この**期待ギャップ**の上界は零へ向かう。ただし学習誤差が小さいことや、個々の実行でギャップが小さいことまで自動的には保証しない。

## 3. 予測器を短く書けるなら全候補を同時に守れる

情報量の定理は算法の結合分布を必要とする。それを知らなくても、あらかじめ固定した辞書を使って予測器を指定できるなら、別の保証が得られる。

[既習の接頭語符号](../../INFO/INFO4/index.md#def-info4-prefix-code)を予測器の選択へ使おう。一つの語が別の語の先頭部分（接頭語）にならないため、先頭から読んで符号語の終わりを判別できる。例えば $0,10,110,111$ はすべて接頭語が重ならない。今回は符号語だけでなく、それを受け取って予測器を返す辞書も標本から独立に固定する。

<a id="def-slt2-17-prefix-code"></a>

<!-- formal-statement-start -->
> **定義（固定接頭語符号による予測器の記述）**  
> 標本を見る前に固定された[接頭語自由](../../INFO/INFO4/index.md#def-info4-prefix-code)な有限の二進符号語集合 $\mathcal C$ と復号写像 $d:\mathcal C\to\mathcal H$ を考える。符号語 $c$ のビット長を $L(c)$ とする。学習算法は標本 $S$ を見た後に任意の $C(S)\in\mathcal C$ を選んでよいが、集合 $\mathcal C$ と写像 $d$ は $S$ に依存してはならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-17-prefix-code -->
この定義の直接例は $\mathcal C=\{0,10,110,111\}$、$d(c)=h_c$ という四つの予測器である。語の長さは $(1,2,3,3)$。短い語 $0$ は残りと最初のビットが異なり、$10$ は残りの二語の先頭二ビット $11$ と異なり、末尾の二語も互いに接頭語でない。

**定義の確認**：$\mathcal C$ は有限かつ接頭語自由で、$L$ は各語のビット数を正しく返す。$h_0,h_{10},h_{110},h_{111}$ を標本を見る前に指定した関数とすれば復号器 $d$ は固定であり、$S$ によって選ぶ符号語だけが変わる。
<!-- definition-example-end -->

[Kraft不等式の必要性](../../INFO/INFO4/index.md#thm-info4-kraft-necessity)は、接頭語自由な有限二進符号について $\sum_{c\in\mathcal C}2^{-L(c)}\le1$ を保証する。そこでは最大符号長 $m$ まで伸ばした二進列を数える。符号語 $c$ を先頭に持つ長さ $m$ の列は $2^{m-L(c)}$ 個であり、異なる符号語の延長集合は重ならない、というのが証明の核心である。

四語の例では $2^{-1}+2^{-2}+2^{-3}+2^{-3}=1$。この和の制約が、候補ごとの許容失敗確率 $\delta2^{-L(c)}$ を割り振る根拠になる。

<a id="thm-slt2-17-description-bound"></a>

<!-- formal-statement-start -->
> **定理（記述長による全符号同時汎化界）**  
> $S\sim P^n$ はiid、$n\ge1$、全ての $h,z$ で $\ell(h,z)\in[0,1]$ とする。有限の接頭語自由符号集合 $\mathcal C$ と復号器 $d:\mathcal C\to\mathcal H$ は $S$ から独立に固定されている。このとき任意の $0<\delta<1$ に対し、確率 $1-\delta$ 以上で全ての $c\in\mathcal C$ について同時に

$$
\left|R_P(d(c))-\widehat R_S(d(c))\right|
\le\sqrt{\frac{L(c)\ln2+\ln(2/\delta)}{2n}}
$$

> が成立する。この同時事象の上では、$S$ を見て選んだ符号語 $C(S)$ にも同じ式を代入できる。
<!-- formal-statement-end -->

### 証明の見取り図

一語 $c$ を固定すれば予測器 $d(c)$ も固定される。Hoeffdingの二側確率を $\delta2^{-L(c)}$ 以下に調整し、[Kraft不等式の必要性](../../INFO/INFO4/index.md#thm-info4-kraft-necessity)で全候補の失敗確率を足す。

<!-- proof-start -->
### 証明

$c$ を固定すると $d(c)$ は標本に依存しない。従って[固定仮説のリスク偏差界](../SLT1-03/index.md#thm-slt1-03-fixed-risk)の二側形により、任意の $t>0$ で

$$
\Pr\left(\left|R_P(d(c))-\widehat R_S(d(c))\right|>t\right)
\le2e^{-2nt^2}.
$$

$t_c^2=\{L(c)\ln2+\ln(2/\delta)\}/(2n)$ と置くと

$$
2e^{-2nt_c^2}
=2e^{-L(c)\ln2-\ln(2/\delta)}
=\delta\,2^{-L(c)}.
$$

一つでも失敗する事象は各語の失敗事象の和集合である。失敗確率を足し、[Kraft不等式の必要性](../../INFO/INFO4/index.md#thm-info4-kraft-necessity)を適用すれば

$$
\Pr(\exists c\in\mathcal C:\text{その語の偏差界が失敗})
\le\sum_c\delta2^{-L(c)}\le\delta.
$$

補集合では全語に同時に成り立つので、その後で選んだ $C(S)$ にも適用できる。$\square$
<!-- proof-end -->

### 直接例：短い候補ほど狭い半径

$n=100,\delta=0.05$ とし、四語 $0,10,110,111$ の長さはそれぞれ $1,2,3,3$。同時保証の半径は

$$
t_0=\sqrt{\frac{\ln2+\ln40}{200}},\quad
t_{10}=\sqrt{\frac{2\ln2+\ln40}{200}},\quad
t_{110}=t_{111}=\sqrt{\frac{3\ln2+\ln40}{200}}.
$$

同じ標本から選んでも、**事前に短く記述できる候補**には小さい複雑度罰則が付く。比較対象の辞書をデータに合わせて作り直すなら、その辞書を記述する費用を無視できない。

## 4. 標本の一部を残して予測器を再構成する

いまの符号は予測器自体を固定辞書で指定した。一方、実際の算法には、$n$ 個の訓練例のうち $k$ 個だけを保存して予測器を再構成するものがある。保存する例は標本依存だが、どの位置を保存するかを**固定した場合**、残りの標本は保存例と独立である。この独立性を活用する。

<a id="def-slt2-17-sample-compression"></a>

<!-- formal-statement-start -->
> **定義（固定サイズ標本圧縮復元器）**  
> $S=(Z_1,\ldots,Z_n)\in\mathcal Z^n$、$0\le k<n$ を固定する。学習前に決めた決定的写像 $d_k:\mathcal Z^k\to\mathcal H$ を復元器とする。$k$ 個の異なる添字の集合 $I=\{i_1<\cdots<i_k\}\subseteq\{1,\ldots,n\}$ に対し、

$$
S_I=(Z_{i_1},\ldots,Z_{i_k}),\qquad
h_I=d_k(S_I)
$$

> とする。圧縮算法は $S$ を見てから $I(S)$ を選んでよいが、$d_k$ は標本から独立に固定される。補集合の評価値を次で表す。

$$
\widehat R_{S_{I^c}}(h_I)
=\frac1{n-k}\sum_{j\notin I}\ell(h_I,Z_j).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-17-sample-compression -->
例えば $n=3,k=1$、二値ラベルだけを観測し、$d_1((y))$ を「常に $y$ を予測する分類器」と固定すれば、$I=\{2\}$ から $h_I$ を再構成できる。

**定義の確認**：$0\le1<3$ で、$I$ は1要素の添字集合、$S_I=(Z_2)$ である。復元器は学習前に固定され、$h_I$ は $Z_2$ のラベルだけで定まる。評価集合は $I^c=\{1,3\}$ なので $\widehat R_{S_{I^c}}(h_I)=\{\ell(h_I,Z_1)+\ell(h_I,Z_3)\}/2$。$I=\{2\}$ を固定した上で $Z_2$ を観測しても、$Z_1,Z_3$ はiidという仮定から独立のままである。後から $I(S)$ を選ぶ場合はこの独立性を直接は言えないので、**全ての添字集合を同時に守る**必要がある。
<!-- definition-example-end -->

<a id="thm-slt2-17-sample-compression-bound"></a>

<!-- formal-statement-start -->
> **定理（標本圧縮の補集合評価界）**  
> $S\sim P^n$ はiid、$\ell\in[0,1]$、$0\le k<n$ とする。標本を見ずに固定した決定的復元器 $d_k:\mathcal Z^k\to\mathcal H$ に対し、任意の $0<\delta<1$ について確率 $1-\delta$ 以上で、全ての大きさ $k$ の添字集合 $I$ に同時に

$$
R_P(h_I)\le\widehat R_{S_{I^c}}(h_I)
+\sqrt{\frac{\ln\binom nk+\ln(1/\delta)}{2(n-k)}}
$$

> が成り立つ。従って $S$ を見てから選んだ $I(S)$ にも適用できる。ただし右辺は**保持しなかった $n-k$ 個の標本での平均損失**であって、全訓練標本での経験リスクではない。
<!-- formal-statement-end -->

### 証明の見取り図

添字 $I$ を先に固定する。$S_I$ で予測器を復元してから、独立な補集合の損失平均へ片側Hoeffdingを適用する。候補の添字集合は $\binom nk$ 個あるので、最後に和事象で同時化する。

<!-- proof-start -->
### 証明

一つの $I$ を固定し、$S_I=s_I$ で条件付ける。iid性から $S_{I^c}$ の $n-k$ 個の要素は依然として $P$ に独立に従い、$h_I=d_k(s_I)$ は固定された予測器である。従って[固定仮説に対するHoeffding評価](../SLT1-03/index.md#thm-slt1-03-fixed-risk)の片側形から

$$
\Pr\!\left(R_P(h_I)-\widehat R_{S_{I^c}}(h_I)>t\mid S_I=s_I\right)
\le e^{-2(n-k)t^2}.
$$

右辺は $s_I$ に依存しないから、$S_I$ について平均した無条件の失敗確率にも同じ上界が成り立つ。$t=\sqrt{\{\ln\binom nk+\ln(1/\delta)\}/\{2(n-k)\}}$ と選ぶと

$$
e^{-2(n-k)t^2}=\frac{\delta}{\binom nk}.
$$

添字集合は全部で $\binom nk$ 通りなので、和事象の上界により、少なくとも確率 $1-\delta$ で全ての $I$ の片側評価が同時に成立する。この事象の上なら算法が標本依存で選んだ $I(S)$ にも適用できる。$\square$
<!-- proof-end -->

$n=50,k=2,\delta=0.05$ では選択肢は $\binom{50}{2}=1225$、評価に使える標本は48個で、上界は

$$
R_P(h_{I(S)})\le\widehat R_{S_{I(S)^c}}(h_{I(S)})
+\sqrt{\frac{\ln1225+\ln20}{96}}.
$$

この結果は「$k$ 例に圧縮したから全標本での訓練誤りも同じ半径で抑えられる」という主張ではない。元の $k$ 例でうまく当てられることは、そこから再構成した予測器のテスト性能の独立評価にはならない。補集合の損失平均を使うことが証明の要点である。

## 5. 標本依存の辞書という落とし穴

短い記号一つで予測器を指定できる、と言うだけなら、標本に合わせて辞書を作ってしまえばどんな予測器でも短く書ける。辞書そのものが標本を暗記していれば、符号長は汎化の費用を測らない。

<a id="prop-slt2-17-adaptive-decoder-counterexample"></a>

<!-- formal-statement-start -->
> **命題（標本依存復元器の短符号による反例）**  
> 入力 $X$ は $\{1,\ldots,10^6\}$ 上一様、ラベル $Y$ は $X$ と独立な公平な二値変数とする。
>
> 標本数は $n=100$ とし、iid標本 $S=((X_i,Y_i))_{i=1}^{100}$ を使う。損失は0–1損失とする。
>
> 標本に依存する復号器 $d_S(0)$ が、訓練入力に一致すれば最初に一致した観測ラベルを返し、それ以外には0を返す関数を出力するようにする。
>
> このとき確率少なくとも $0.995$ で訓練誤りは零だが、任意の標本について母集団リスクは $1/2$ である。従って、この標本依存辞書の符号長1を[固定辞書の記述長界](#thm-slt2-17-description-bound)に代入してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

訓練入力が全て異なれば、辞書に訓練ラベルをすべて隠せる。ところが新しいラベルは入力とも標本とも独立な公平ビットなので、どの予測規則も誤り確率 $1/2$ になる。

<!-- proof-start -->
### 証明

二つの添字 $i<j$ で入力が一致する確率は $\Pr(X_i=X_j)=10^{-6}$。和事象の上界から、100個の入力に衝突が起きる確率は

$$
\Pr(\exists i<j:X_i=X_j)
\le\binom{100}{2}10^{-6}
=0.00495.
$$

従って確率少なくとも $1-0.00495=0.99505$ で全入力が異なる。この事象上では $d_S(0)$ が各 $X_i$ に $Y_i$ を返すため $\widehat R_S(d_S(0))=0$ である。

新しい $(X,Y)\sim P$ を $S$ と独立に引く。$S,X$ を固定したとき $d_S(0)(X)$ は0か1の定数であり、$Y$ は独立な公平ビットなので

$$
\Pr(d_S(0)(X)\ne Y\mid S,X)=\frac12.
$$

$S,X$ について平均しても $R_P(d_S(0))=1/2$。例えば $\delta=0.1$ として、固定辞書だと誤認して長さ1を[定理](#thm-slt2-17-description-bound)へ代入すると、誤った半径は $\sqrt{\ln40/200}<0.14$ で、実際のギャップ $1/2$ と矛盾する。固定辞書という仮定が失われ、固定 $c$ でも $d_S(c)$ が $S$ に依存するため、証明の最初のHoeffding適用が壊れる。$\square$
<!-- proof-end -->

この現象は、[標本依存priorを使ったPAC-Bayesの反例](../SLT1-15/index.md#prop-slt1-15-dependent-prior-counterexample)と同じ構造である。標本依存の事前分布を $\delta_{h_S}$ と置き、同じ $\delta_{h_S}$ を事後分布にすれば形式上KLが零になるが、PAC-Bayes定理の「事前分布を先に固定する」という仮定を失う。追加情報を記述する費用や独立なデータ分割なしに罰則を消すことはできない。

## 6. 三種類の保証を混同しない

| 保証 | 何を小さく抑えるか | 必須の独立性・情報 | 標本での評価量 |
| --- | --- | --- | --- |
| 相互情報量 | $\lvert\mathbb E(R-\widehat R)\rvert$ | iid・有界損失、$I(S;W)$ | 全標本の経験リスクの**期待差** |
| 固定符号 | 全符号同時に $\lvert R-\widehat R\rvert$ | iid・有界損失、固定接頭語辞書 | 全標本の経験リスク |
| 標本圧縮 | 全添字集合同時に $R-\widehat R_{I^c}$ | iid・有界損失、固定復元器、$k<n$ | 保存しなかった標本での経験リスク |

情報量は算法の分布を含めた**平均的な依存性**を評価し、符号長は**事前固定された仮説の集合を同時に守るための費用**を評価する。標本圧縮では候補関数自体がデータに依存していても、保存した標本と評価用標本の独立性を条件付けで回復する。いずれも、高次元ニューラルネットの一般的な汎化を「パラメータ数が大きいほど悪い」「flatならよい」と結論する定理ではない。

## 演習

### SLT2-17-A01 一つのラベルを出力する情報量
- Level: A
- 目安時間: 13分

$S=Y_1$ は公平な二値変数、$W=Y_1$ とする。$P_{S,W}$、$P_S\otimes P_W$、$I(S;W)$ を定義から求めよ。自然対数を使うこと。

<!-- solution-start -->
#### 詳細解答

結合分布は $P_{S,W}(0,0)=P_{S,W}(1,1)=1/2$、非対角は零である。一方、両周辺は公平なので積分布は四点すべてに $1/4$ を置く。[相互情報量の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)に代入すると、結合確率が正の二点だけの和になり

$$
I(S;W)=\frac12\ln\frac{1/2}{1/4}
+\frac12\ln\frac{1/2}{1/4}=\ln2.
$$

単位は nat であり、ビット単位なら1ビットに相当する。零確率の項に $0\ln0$ を無理に代入しない。
<!-- solution-end -->

### SLT2-17-A02 標本を見ない算法
- Level: A
- 目安時間: 12分

$S=Y_1$ は公平な二値標本、$W$ も公平な二値変数で $S$ から独立とする。$h_w$ は常に $w$ を予測し、損失は0–1とする。$I(S;W)$、$\mathbb E\widehat R_S(h_W)$、$\mathbb ER_P(h_W)$、期待汎化ギャップを計算せよ。

<!-- solution-start -->
#### 詳細解答

独立性より四つのセル $(s,w)\in\{0,1\}^2$ の全てで $P_{S,W}(s,w)=P_S(s)P_W(w)=1/4$ となる。よって[情報量の定義](#def-slt2-17-information)の対数比は全て $\ln1=0$ であり、$I(S;W)=0$。

$W,Y_1$ は独立な公平ビットだから、訓練損失の期待値は $\Pr(W\ne Y_1)=1/2$。母集団リスクは新しい独立な公平ラベル $Y$ で評価するので

$$
\begin{aligned}
\mathbb E\widehat R_S(h_W)&=\Pr(W\ne Y_1)=\frac12,\\
\mathbb E R_P(h_W)&=\Pr(W\ne Y)=\frac12,\\
\operatorname{gen}&=\frac12-\frac12=0.
\end{aligned}
$$

したがって[期待汎化界](#thm-slt2-17-information-bound)の右辺 $\sqrt{0/(2\cdot1)}=0$ と一致する。
<!-- solution-end -->

### SLT2-17-A03 四語の符号長
- Level: A
- 目安時間: 15分

固定辞書の符号語が $0,10,110,111$、標本数が $n=100$、失敗確率が $\delta=0.05$ とする。接頭語自由性とKraft和を確認し、符号語 $0$ と $111$ の二側汎化半径を式で比較せよ。

<!-- solution-start -->
#### 詳細解答

$0$ は残りの先頭ビット $1$ と異なり、$10$ は残りの先頭2ビット $11$ と異なる。$110$ と $111$ は長さが等しい別の語だから接頭語ではない。従って接頭語自由。長さは $1,2,3,3$ で、Kraft和は

$$
2^{-1}+2^{-2}+2^{-3}+2^{-3}
=\frac12+\frac14+\frac18+\frac18=1.
$$

[記述長界](#thm-slt2-17-description-bound)でそれぞれの半径は

$$
t_0=\sqrt{\frac{\ln2+\ln40}{200}}
=\sqrt{\frac{\ln80}{200}},\qquad
t_{111}=\sqrt{\frac{3\ln2+\ln40}{200}}
=\sqrt{\frac{\ln320}{200}}.
$$

$\ln320>\ln80$ より $t_{111}>t_0$。これは実際のリスクではなく、同時保証の複雑度罰則の比較である。
<!-- solution-end -->

### SLT2-17-A04 保存標本と評価標本
- Level: A
- 目安時間: 14分

iidな $n=50$ 標本のうち $k=2$ 個を保存する固定復元器を考える。可能な添字集合の数、独立評価に残る標本数、$\delta=0.05$ での片側信頼半径を計算せよ。全標本平均を右辺に代入できるか答えよ。

<!-- solution-start -->
#### 詳細解答

異なる二添字を選ぶ方法は $\binom{50}{2}=50\cdot49/2=1225$。残る標本数は $50-2=48$。従って[標本圧縮界](#thm-slt2-17-sample-compression-bound)の半径は

$$
\sqrt{\frac{\ln1225+\ln(1/0.05)}{2\cdot48}}
=\sqrt{\frac{\ln24500}{96}}.
$$

評価に使うのは $S_{I^c}$ の48標本である。保存した2標本は復元器の入力であり、その2標本での損失が復元器から独立な固定予測器の損失とは限らない。したがって全50標本の経験リスクへ無断で置換できない。
<!-- solution-end -->

### SLT2-17-A05 期待差と絶対差は異なる
- Level: A
- 目安時間: 14分

$n=1$、$Y_1$ は公平な二値ラベル、予測器は標本を見ず常に0を返すとする。0–1損失で $G=R_P(h)-\widehat R_S(h)$ の分布、$\mathbb EG$、$\mathbb E|G|$、$I(S;W)$ を求め、どの値が[相互情報量の定理](#thm-slt2-17-information-bound)で抑えられるか説明せよ。

<!-- solution-start -->
#### 詳細解答

$R_P(h)=1/2$、$\widehat R_S(h)=\mathbf1\{Y_1=1\}$。従って $Y_1=0$ なら $G=1/2$、$Y_1=1$ なら $G=-1/2$ であり、各確率は $1/2$。よって

$$
\mathbb EG=\frac12\cdot\frac12+\frac12\cdot\left(-\frac12\right)=0,
\qquad
\mathbb E|G|=\frac12.
$$

$W$ は固定なので $P_{S,W}=P_S\otimes P_W$、ゆえに $I(S;W)=0$。[定理](#thm-slt2-17-information-bound)が零と抑えるのは $|\mathbb EG|$ であって $\mathbb E|G|$ ではない。絶対値と期待値の順序を交換すると偽の主張になる。
<!-- solution-end -->

### SLT2-17-B01 確率的な情報漏洩
- Level: B
- 目安時間: 28分

$S=Y_1$ は公平ビットで、算法は確率 $p\in[0,1]$ で $W=Y_1$ を出し、確率 $1-p$ では特別な値 $W=\bot$ を出す。$\bot$ の場合には常に0を予測し、$W=0,1$ の場合にはその値を常に予測する。0–1損失とする。

1. $P_W$ と $I(S;W)$ を求めよ。
2. 期待汎化ギャップを計算せよ。
3. [期待汎化界](#thm-slt2-17-information-bound)と比較し、$p\downarrow0$ の意味を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. 条件付き確率は $Q(y\mid S=y)=p$、$Q(\bot\mid S=y)=1-p$。従って $P_W(0)=P_W(1)=p/2$、$P_W(\bot)=1-p$。$p=0,1$ は零確率項を除いて読む。$0<p<1$ では、$W=\bot$ の結合確率は $P_S(y)(1-p)$ で、積分布と同じなので対数比0。$W=y\in\{0,1\}$ の結合確率は $p/2$、積分布は $p/4$、対数比は $\ln2$。二点を加えると

$$
I(S;W)=2\cdot\frac p2\ln2=p\ln2.
$$

2. どの定数予測器も未知の公平ラベルに対するリスクは $1/2$。$W=Y_1$ として出力した場合の訓練損失は0。$\bot$ の場合は常に0を出すため、訓練損失の条件付き期待は $1/2$。従って

$$
\mathbb E\widehat R_S(h_W)
=p\cdot0+(1-p)\cdot\frac12
=\frac{1-p}{2},\qquad
\operatorname{gen}=\frac12-\frac{1-p}{2}=\frac p2.
$$

3. [定理](#thm-slt2-17-information-bound)は $n=1$ だから $p/2\le\sqrt{p\ln2/2}$ と与える。$0\le p\le1$ では両辺非負で、二乗後に $p^2/4\le p\ln2/2$、つまり $p\le2\ln2$ を確認すればよい。$p\downarrow0$ では漏洩確率、情報量、期待ギャップとも零に向かうが、実行ごとの失敗可能性まで消えたとは言っていない。
<!-- solution-end -->

### SLT2-17-B02 出力候補数と情報量
- Level: B
- 目安時間: 26分

標本 $S$ と算法出力 $W$ は有限値で、$W$ の取り得る値が高々 $m\ge2$ 個とする。自然対数で定義したエントロピー $H_{\mathrm{nat}}(W)=-\sum_wP_W(w)\ln P_W(w)$ を使い、

$$
I(S;W)\le H_{\mathrm{nat}}(W)\le\ln m
$$

を導き、有界損失・iid標本数 $n$ について期待汎化界を与えよ。$I(S;W)$ 自体が $\ln m$ より小さくなる状況も説明せよ。

<!-- solution-start -->
#### 詳細解答

まず、[INFO1の条件付きエントロピー](../../INFO/INFO1/index.md#def-info1-conditional-entropy)を自然対数に換算して

$$
H_{\mathrm{nat}}(W\mid S)
=-\sum_{s:P_S(s)>0}P_S(s)\sum_{w:Q(w\mid s)>0}
Q(w\mid s)\ln Q(w\mid s)
$$

と置く。零確率の項は零と解釈する。[INFO2の相互情報量表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)も同様に自然対数へ換算して展開すると

$$
\begin{aligned}
I(S;W)
&=\sum_{s,w:P_{S,W}(s,w)>0}P_{S,W}(s,w)\ln\frac{Q(w\mid s)}{P_W(w)}\\
&=-\sum_wP_W(w)\ln P_W(w)
 +\sum_sP_S(s)\sum_wQ(w\mid s)\ln Q(w\mid s)\\
&=H_{\mathrm{nat}}(W)-H_{\mathrm{nat}}(W\mid S).
\end{aligned}
$$

有限分布のエントロピーは非負なので $I\le H_{\mathrm{nat}}(W)$。また $W$ の候補を必要なら零確率の記号で補って $m$ 個にし、各値へ確率 $1/m$ を置く分布 $U$ を考える。$P_W$ と $U$ に[相対エントロピーの非負性](../../INFO/INFO2/index.md#thm-info2-gibbs)を適用すると

$$
0\le\mathrm{KL}(P_W\Vert U)
=\sum_wP_W(w)\ln P_W(w)+\ln m
=\ln m-H_{\mathrm{nat}}(W).
$$

従って $I\le\ln m$。[期待汎化界](#thm-slt2-17-information-bound)に代入すれば

$$
|\operatorname{gen}|\le\sqrt{\frac{I(S;W)}{2n}}
\le\sqrt{\frac{\ln m}{2n}}.
$$

例えば算法が標本を無視して出力を一様選択するなら $H_{\mathrm{nat}}(W)=\ln m$ でも $I=0$ である。候補数だけを見る界より、実際の情報量を調べる方が鋭いことがある。
<!-- solution-end -->

### SLT2-17-B03 記述長の配分と有限クラス界
- Level: B
- 目安時間: 24分

$n\ge1$、$\delta\in(0,1)$、固定された四つの仮説を二通りで保証する。

1. 接頭語符号を $0,10,110,111$ とし、長さ1の仮説と長さ3の仮説の二側半径を導け。
2. 四仮説の[有限クラス同時界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)を同じ失敗確率で適用し、半径を求めよ。
3. どの候補が符号長の恩恵を受けるか、また保証の同時性が失われない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. [記述長界](#thm-slt2-17-description-bound)より長さ1、長さ3の半径は順に

$$
t_1=\sqrt{\frac{\ln2+\ln(2/\delta)}{2n}}
=\sqrt{\frac{\ln(4/\delta)}{2n}},\quad
t_3=\sqrt{\frac{3\ln2+\ln(2/\delta)}{2n}}
=\sqrt{\frac{\ln(16/\delta)}{2n}}.
$$

2. 四候補それぞれの二側Hoeffdingの失敗確率を $\delta/4$ 以下に割り当てると、$2e^{-2nt^2}=\delta/4$ を解き

$$
t_{\mathrm{uniform}}=\sqrt{\frac{\ln(8/\delta)}{2n}}
$$

となる。

3. $\ln(4/\delta)<\ln(8/\delta)<\ln(16/\delta)$ だから長さ1の候補だけは一様配分より狭く、長さ3の候補は広くなる。[Kraft不等式の必要性](../../INFO/INFO4/index.md#thm-info4-kraft-necessity)に対応する和が1なので、各語への失敗確率割当 $\delta/2,\delta/4,\delta/8,\delta/8$ の合計は $\delta$。従って最初から全語を同時に守り、選択後にも適用できる。
<!-- solution-end -->

### SLT2-17-B04 圧縮した位置で評価してはいけない
- Level: B
- 目安時間: 26分

$n=3,k=1$、ラベル $Y_1,Y_2,Y_3$ はiidな公平ビット、入力は使わない。復元器 $d_1((Y_i))$ が常に $Y_i$ を予測する分類器を返す。$I=\{1\}$ に固定する。

1. $R_P(h_I)$、保持した位置での損失、補集合2点の経験損失の期待値を求めよ。
2. 全3点の経験損失の期待値を求め、保持した1点を評価に混ぜることの問題を述べよ。
3. $I$ を後から選ぶ場合に何を同時化すればよいか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $h_I$ は常に $Y_1$ を出す。新しい独立な公平ラベル $Y$ と一致しない確率は $1/2$ なので $R_P(h_I)=1/2$。保持した第1点では $\ell(h_I,Y_1)=0$。一方、$Y_2,Y_3$ は $Y_1$ と独立で、各損失の期待値は $1/2$。よって

$$
\mathbb E\widehat R_{S_{I^c}}(h_I)
=\frac12\left(\frac12+\frac12\right)=\frac12.
$$

2. 全標本平均の期待値は

$$
\mathbb E\widehat R_S(h_I)
=\frac13\left(0+\frac12+\frac12\right)=\frac13.
$$

全標本評価では復元に使った点の誤り零を混ぜるため、母集団リスク $1/2$ に対する評価が楽観的になる。補集合の独立性を前提とした[標本圧縮界](#thm-slt2-17-sample-compression-bound)の証明をそのまま使えない。

3. $I(S)$ は残りのラベルを見て位置を選び得るため、選択した $I$ のみを先に固定した条件付き独立性を主張できない。$I=\{1\},\{2\},\{3\}$ の三通り全部に同時成立する事象を和事象で作れば、その後の選択にも保証を渡せる。
<!-- solution-end -->

### SLT2-17-C01 情報量・固定符号・標本圧縮を比較する
- Level: C
- 目安時間: 42分

$n=400$ のiid標本、$[0,1]$ 値損失を考える。学習算法の出力 $W$ は事前固定された8仮説のいずれかで、全仮説には長さ3の二進接頭語符号が与えられている。$\delta=0.05$ とする。

1. 算法の詳細な条件付き分布が未知でも言える期待汎化ギャップ界を求めよ。
2. 実行後に選ばれた $W$ の全標本経験リスクが $0.08$ だった場合、固定符号の同時界から母集団リスクの上界を求めよ。
3. 追加条件として、$W=d_1(S_{I(S)})$ を満たす事前固定の決定的復元器が存在し、選ばれた添字集合の補集合399点での経験リスクが $0.09$ だったとする。標本圧縮の片側界から母集団リスクの上界を求めよ。
4. 1で得た期待界を単一の実行で観測した $0.08$ に足して高確率界と呼んではいけない理由と、2・3の評価対象の相違を述べよ。

<!-- solution-start -->
#### 詳細解答

1. [相互情報量の相対エントロピー表示](../../INFO/INFO2/index.md#thm-info2-mutual-kl)と[有限離散エントロピーの上界](../../INFO/INFO1/index.md#thm-info1-entropy-bounds)を自然対数に換算する。出力は高々8値で、条件付きエントロピーが非負だから $I(S;W)\le H_{\mathrm{nat}}(W)\le\ln8$ である。[期待汎化界](#thm-slt2-17-information-bound)より

$$
|\operatorname{gen}|
\le\sqrt{\frac{I(S;W)}{800}}
\le\sqrt{\frac{\ln8}{800}}
\simeq0.051.
$$

実際の $I$ が分かればさらに鋭くなる。これは $\mathbb E(R-\widehat R)$ の絶対値に関する保証である。

2. 長さ3の接頭語コードは8種類の二進列を全て使うから、Kraft和は $8\cdot2^{-3}=1$。[記述長の同時界](#thm-slt2-17-description-bound)を選択後の語へ適用でき、確率少なくとも0.95で

$$
R_P(W)\le\widehat R_S(W)
+\sqrt{\frac{3\ln2+\ln40}{800}}
=0.08+\sqrt{\frac{\ln320}{800}}
\simeq0.165.
$$

3. $k=1$ で添字の選択肢は $\binom{400}{1}=400$、保持しなかった標本は399個。[標本圧縮の補集合評価界](#thm-slt2-17-sample-compression-bound)から、確率少なくとも0.95で

$$
R_P(W)\le0.09+\sqrt{\frac{\ln400+\ln20}{798}}
=0.09+\sqrt{\frac{\ln8000}{798}}
\simeq0.196.
$$

この保証は追加の固定復元器条件が実際に成立する場合に限る。任意の8値出力算法に当然備わる条件ではない。

4. 1は乱数と標本について平均した**符号付きギャップ**の界なので、ある観測標本で $R-\widehat R\le0.051$ を意味しない。2は事前固定した8仮説に対する**全標本経験リスク**の同時評価、3は保存した標本を取り除いた**399点の損失平均**の評価である。2と3の各0.95事象を同時に保証したい場合には、失敗確率をそれぞれ0.025に割り当て直して和事象を抑える必要がある。単独の0.95保証を二本並べるだけでは、共通成功確率0.95を主張できない。
<!-- solution-end -->

## まとめ

- 算法出力と標本の相互情報量は、標本をどれだけ出力へ漏らしたかを測り、iid・有界損失の下で **期待汎化ギャップ**を抑える。
- 学習前に固定した接頭語辞書なら、記述長に応じて**全候補同時**の高確率界を作れる。標本を見て辞書を変えると、この証明は成立しない。
- 固定復元器による $k$ 例の標本圧縮は、保存しなかった $n-k$ 例の独立評価と $\binom nk$ 個の同時化で保証する。全標本の経験リスクと混同しない。
- いずれの定理もiid・有界損失・固定された仕組みなどの仮定を使う。次章では、そもそも訓練時とテスト時の分布が違うと何が破綻するかを調べる。
