# INFO3 典型列と大数の法則による情報源の特徴付け

[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)は、情報源から一度だけ記号を読むときの自己情報量の平均です。しかし、長さ $n$ の記号列を実際に保存しようとすると、可能な列の総数 $|\mathcal X|^n$ だけを数えるのでは、出現確率の偏りを反映できません。公平なコインならどの列も同じ確率ですが、表が四分の一しか出ないコインでは、表ばかりの列は可能であってもめったに現れません。

そこで、**長い列の対数確率は1記号当たりのエントロピーの近くに集中するか**、さらに**高い確率を持つ列だけを集めると何通りあるか**を調べます。前者には独立性と大数の法則、後者には確率の和の上下評価を使います。接頭語符号や最適符号化の議論に進む前に、典型列がなぜ $2^{nH}$ 個程度となるのかを、有限模型で根拠から理解します。

本章の対数は底 $2$、単位はビットです。$\mathcal X$ は有限集合、分布 $p$ は時間によらず一定とし、特に断らない限り各時刻は**独立同分布**です。零確率の記号は対数へ代入しません。大数の「弱法則」に相当する確率収束までを証明し、概収束の主張は行いません。

## 1. 一つの分布から長い列を作る

[独立な確率変数の定義](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-independent-random-variables)によれば、複数の時刻の同時確率が各時刻の確率の積になります。これにより、長さ $n$ の列 $x^n=(x_1,\ldots,x_n)$ について、確率を手で計算できます。

<a id="def-info3-iid-source"></a>

<!-- formal-statement-start -->
> **定義（有限独立同分布情報源とブロック確率）**  
> 有限集合 $\mathcal X$ 上の確率質量関数 $p$ を取り、確率変数列 $X_1,X_2,\ldots$ が相互独立で、すべて $P(X_i=x)=p(x)$ を満たすとする。この列を有限独立同分布情報源と呼ぶ。長さ $n\ge1$ のブロック $X^n=(X_1,\ldots,X_n)$ の確率質量関数は

$$
p^{\otimes n}(x^n)=\prod_{i=1}^{n}p(x_i)
$$

> である。$S=\{x\in\mathcal X:p(x)>0\}$ を正の台とすると、正確率のブロック全体は $S^n$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info3-iid-source -->
### 例：偏ったコインを2回投げる

**定義の確認**：$\mathcal X=\{0,1\}$、$p(0)=3/4$、$p(1)=1/4$ は非負で和が1です。独立に2回観測すれば、定義の積から

$$
\begin{aligned}
P(X^2=00)&=(3/4)^2=9/16,\\
P(X^2=01)&=(3/4)(1/4)=3/16,\\
P(X^2=10)&=(1/4)(3/4)=3/16,\\
P(X^2=11)&=(1/4)^2=1/16.
\end{aligned}
$$

4項の合計は $(9+3+3+1)/16=1$ です。4通りの列はあっても、出現確率は等しくありません。
<!-- definition-example-end -->

正確率の列 $x^n\in S^n$ では、[自己情報量](../INFO1/index.md#def-info1-self-information)の対数を積へ適用して

$$
\begin{aligned}
-\log_2 p^{\otimes n}(x^n)
&=-\log_2\left(\prod_{i=1}^{n}p(x_i)\right)\\
&=\sum_{i=1}^{n}[-\log_2 p(x_i)]
\end{aligned}
$$

となります。各記号の情報量を加えればブロックの情報量になるのが、独立同分布情報源の出発点です。

## 2. 典型列を定義して手で判定する

1記号のエントロピー $H(p)$ と、実際に観測した列の「1記号当たりの自己情報量」を比べます。その差が小さい列を集めれば、長い列の確率をおおよそ共通の指数で表せるはずです。

<a id="def-info3-weak-typical"></a>

<!-- formal-statement-start -->
> **定義（弱典型集合）**  
> 上の有限独立同分布情報源に対し、$n\ge1$、$\varepsilon>0$ とする。$H(p)=-\sum_{x\in S}p(x)\log_2p(x)$ と置き、弱典型集合を

$$
T_{n,\varepsilon}(p)
=\left\{x^n\in S^n:
\left|-\frac1n\log_2p^{\otimes n}(x^n)-H(p)\right|
\le\varepsilon\right\}
$$

> と定める。$S^n$ の外の確率零の列は典型集合に含めない。
<!-- formal-statement-end -->

これは「出現頻度が各記号について $p(x)$ に近い」という**強典型性**の定義ではありません。測っているのは、あくまで列全体の平均対数確率です。特に異なる記号に同じ確率が付いていると、頻度の違いをこの尺度が区別できない場合があります。

<!-- definition-example-start: def-info3-weak-typical -->
### 例：4回の偏ったコイン

**定義の確認**：$p(0)=3/4$、$p(1)=1/4$ として $n=4$、$\varepsilon=1/5$ とします。1が $k$ 回現れた正確率の列の確率は

$$
p^{\otimes4}(x^4)=(3/4)^{4-k}(1/4)^k.
$$

この列の1記号当たりの対数確率と、エントロピーはそれぞれ

$$
\begin{aligned}
-\tfrac14\log_2p^{\otimes4}(x^4)
&=\tfrac{4-k}{4}\log_2(4/3)+\tfrac{k}{4}\log_2 4,\\
H(p)&=\tfrac34\log_2(4/3)+\tfrac14\log_2 4.
\end{aligned}
$$

差は

$$
\left|\frac{k-1}{4}\right|\log_2 3.
$$

$k=1$ なら差は零、$k=0$ または $2$ なら $(1/4)\log_2 3>1/5$、$k=3,4$ はさらに大きくなります。したがって $T_{4,1/5}(p)$ は1がちょうど1回の4列であり、その合計確率は

$$
P(X^4\in T_{4,1/5}(p))
=4(1/4)(3/4)^3=\frac{27}{64}.
$$

**有限の $n$ で典型列の確率が必ず高いわけではありません。** この後の定理は $n\to\infty$ で初めて高確率になると述べます。
<!-- definition-example-end -->

零確率の記号がある場合にも、先に $S^n$ へ制限してから対数を取ることで、$-\log_2 0$ を実数と誤認しません。これは[INFO1のエントロピーの零項規約](../INFO1/index.md#def-info1-entropy)と整合します。

## 3. なぜ平均対数確率がエントロピーへ集まるのか

ここでは大数の法則を名前だけで呼ばず、有限分布なら分散が有限であることと、独立な和の分散の計算から確率評価を導きます。

<a id="lem-info3-log-moments"></a>

<!-- formal-statement-start -->
> **補題（対数確率の平均と分散）**  
> 有限独立同分布情報源の正の台 $S$ 上で $Z_i=-\log_2p(X_i)$ とする。このとき $Z_i$ は有限な期待値・分散を持ち、

$$
E[Z_i]=H(p),\qquad
V(p):=\operatorname{Var}(Z_i)
=\sum_{x\in S}p(x)\bigl[-\log_2p(x)-H(p)\bigr]^2
$$

> である。また $\overline Z_n=n^{-1}\sum_{i=1}^nZ_i$ に対し

$$
E[\overline Z_n]=H(p),\qquad
\operatorname{Var}(\overline Z_n)=\frac{V(p)}n
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限個の正確率記号について $-\log_2p(x)$ は有限です。したがって二乗の期待値も有限です。独立性を使うのは、平均の分散を計算するときの交差項が零になる箇所です。

<!-- proof-start -->
### 証明

$S$ は有限集合で、各 $x\in S$ について $0<p(x)\le1$ なので、$z(x):=-\log_2p(x)$ は有限実数です。$X_i\in S$ は確率1ですから

$$
E[Z_i]=\sum_{x\in S}p(x)z(x)
=-\sum_{x\in S}p(x)\log_2p(x)=H(p)
$$

となり、$E[(Z_i-H(p))^2]$ は有限和で上記の $V(p)$ です。

さらに $X_i$ が相互独立であるため、その関数 $Z_i$ も相互独立です。[独立な確率変数の期待値因数分解](../../../解析系/F0/F0-00P3/index.md#thm-f0-00p3-expectation-factorization)を $Z_i-H(p)$、$Z_j-H(p)$ に適用すると、$i\ne j$ では

$$
E[(Z_i-H(p))(Z_j-H(p))]
=E[Z_i-H(p)]E[Z_j-H(p)]=0.
$$

従って二乗を展開した際の交差項は消え、

$$
\begin{aligned}
\operatorname{Var}(\overline Z_n)
&=E\left[\left(\frac1n\sum_{i=1}^n(Z_i-H(p))\right)^2\right]\\
&=\frac1{n^2}\sum_{i=1}^n E[(Z_i-H(p))^2]\\
&\quad+\frac2{n^2}\sum_{1\le i<j\le n}
E[(Z_i-H(p))(Z_j-H(p))]\\
&=\frac{nV(p)}{n^2}=\frac{V(p)}n.
\end{aligned}
$$

期待値は線形性により $E[\overline Z_n]=(1/n)\sum_iH(p)=H(p)$ です。
<!-- proof-end -->

<a id="thm-info3-aep"></a>

<!-- formal-statement-start -->
> **定理（有限独立同分布情報源の漸近等分割性）**  
> 有限アルファベット上の独立同分布情報源 $X_1,X_2,\ldots$ と、任意の固定した $\varepsilon>0$ に対し、

$$
P(X^n\notin T_{n,\varepsilon}(p))
\le\frac{V(p)}{n\varepsilon^2}
$$

> が成り立つ。特に

$$
-\frac1n\log_2p^{\otimes n}(X^n)
\xrightarrow{P}H(p),\qquad
P(X^n\in T_{n,\varepsilon}(p))\longrightarrow1.
$$

> ここで確率変数の対数は確率1で $X^n\in S^n$ となる集合上で定める。
<!-- formal-statement-end -->

### 証明の見取り図

典型集合に入らないことは、$\overline Z_n$ と $H(p)$ の差が $\varepsilon$ より大きいことと同じです。その大きい差の事象では、二乗の差は必ず $\varepsilon^2$ を上回ります。二乗の平均で確率を抑えると、直前の分散計算がそのまま使えます。

<!-- proof-start -->
### 証明

[ブロック確率の定義](#def-info3-iid-source)から、確率1で

$$
-\frac1n\log_2p^{\otimes n}(X^n)
=\frac1n\sum_{i=1}^n[-\log_2p(X_i)]
=\overline Z_n
$$

です。$A_n=\{|\overline Z_n-H(p)|>\varepsilon\}$ とすると、$A_n$ 上では $(\overline Z_n-H(p))^2>\varepsilon^2$ です。非負確率変数の期待値を $A_n$ とその補集合で分ければ

$$
\begin{aligned}
E[(\overline Z_n-H(p))^2]
&\ge E[(\overline Z_n-H(p))^2\mathbf1_{A_n}]\\
&\ge\varepsilon^2P(A_n).
\end{aligned}
$$

[対数確率の平均と分散の補題](#lem-info3-log-moments)によって左辺は $V(p)/n$ です。よって

$$
P(A_n)\le \frac{V(p)}{n\varepsilon^2}.
$$

[弱典型集合の定義](#def-info3-weak-typical)から $A_n=\{X^n\notin T_{n,\varepsilon}(p)\}$ が確率1で成り立ちます。$V(p)$、$\varepsilon$ を固定すれば右辺は $n\to\infty$ で零になるため、確率収束と典型集合の確率が1に近づくという二つの結論を得ます。
<!-- proof-end -->

**仮定の役割**：有限アルファベットは $V(p)<\infty$ を保証し、同一分布はすべての平均が同じ $H(p)$ になることを保証し、独立性は分散の交差項を消します。独立性を省くと分散が $V(p)/n$ に減る保証はありません。なお $V(p)=0$ なら、補題の分散式から $\overline Z_n=H(p)$ が確率1で成り立ちます。

## 4. 典型列は何個あるのか

典型列を定義しただけでは、その個数は分かりません。ここで重要なのは、典型列の**それぞれの確率**が一定の範囲に入ることです。この事実と「確率の総和は1以下」を組み合わせます。

任意の $x^n\in T_{n,\varepsilon}(p)$ について[弱典型集合の定義](#def-info3-weak-typical)を移項すると

$$
H(p)-\varepsilon
\le-\frac1n\log_2p^{\otimes n}(x^n)
\le H(p)+\varepsilon.
$$

両辺を $-n$ 倍すると不等号の向きが逆になり、$2$ のべき乗を取れば

$$
2^{-n(H(p)+\varepsilon)}
\le p^{\otimes n}(x^n)
\le2^{-n(H(p)-\varepsilon)}.
$$

例えば個々の確率が約 $2^{-nH}$ なら、全体の確率を1程度にするには約 $2^{nH}$ 個必要そうです。この直感を上下界へ変えます。

<a id="thm-info3-typical-cardinality"></a>

<!-- formal-statement-start -->
> **定理（典型集合の要素数の上下界）**  
> 有限独立同分布情報源と $n\ge1,\varepsilon>0$ に対し、$\eta_n:=P(X^n\notin T_{n,\varepsilon}(p))$ と置く。このとき

$$
(1-\eta_n)2^{n(H(p)-\varepsilon)}
\le |T_{n,\varepsilon}(p)|
\le 2^{n(H(p)+\varepsilon)}
$$

> が成立する。加えて $\eta_n\le V(p)/(n\varepsilon^2)$ であり、任意に固定した $\varepsilon>0$ に対して $\eta_n\to0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

**上界**には各列確率の下界を足して全確率が1以下であることを使い、**下界**には各列確率の上界を足して典型集合の確率が $1-\eta_n$ であることを使います。確率の大小を逆向きに利用する点に注意してください。

<!-- proof-start -->
### 証明

$T=T_{n,\varepsilon}(p)$ と略記します。$T\subseteq S^n$ であり、各列は正確率です。各列確率の下界から

$$
\begin{aligned}
1
&\ge P(X^n\in T)
=\sum_{x^n\in T}p^{\otimes n}(x^n)\\
&\ge\sum_{x^n\in T}2^{-n(H(p)+\varepsilon)}
=|T|2^{-n(H(p)+\varepsilon)}.
\end{aligned}
$$

正の数 $2^{-n(H(p)+\varepsilon)}$ で割り、$|T|\le2^{n(H(p)+\varepsilon)}$ です。

反対に各列確率の上界を用いれば

$$
\begin{aligned}
1-\eta_n
&=P(X^n\in T)
=\sum_{x^n\in T}p^{\otimes n}(x^n)\\
&\le\sum_{x^n\in T}2^{-n(H(p)-\varepsilon)}
=|T|2^{-n(H(p)-\varepsilon)}.
\end{aligned}
$$

したがって $(1-\eta_n)2^{n(H(p)-\varepsilon)}\le|T|$ です。$\eta_n$ の評価と極限は[漸近等分割性の定理](#thm-info3-aep)から従います。
<!-- proof-end -->

$\eta_n<1$ のとき、要素数に対数を取って $n$ で割れば

$$
H(p)-\varepsilon+\frac1n\log_2(1-\eta_n)
\le\frac1n\log_2|T_{n,\varepsilon}(p)|
\le H(p)+\varepsilon.
$$

$n\to\infty$ とすると左端の補正項は零になります。ただし固定した $\varepsilon$ のままで**必ず極限が $H(p)$ と等しい**とは、この挟み撃ちだけでは言えません。任意の $\varepsilon>0$ に対して評価が成り立つことを用いて、誤差幅を最後に零へ近づけると

$$
\lim_{n\to\infty}\frac1n\log_2|T_{n,\varepsilon}(p)|=H(p)
$$

と固定 $\varepsilon$ について断言するのは一般に誤りです。正しくは、例えば $\varepsilon\downarrow0$ と $n\to\infty$ の関係を明示して $H(p)$ に近い指数規模の集合を構成できる、という結論です。後の符号化では、先に任意の小さい $\varepsilon$ を固定して $n$ を大きくします。

## 5. 高い確率を捉える集合は小さすぎてはいけない

典型集合を使えば、高確率の列を少数の候補へ絞れます。逆に、確率の大部分をカバーする別の集合を考えても、典型集合と交わらざるを得ません。その交わりに含まれる各列の確率は小さいため、一定数以上の候補が必要です。

<a id="prop-info3-high-mass-count"></a>

<!-- formal-statement-start -->
> **命題（高確率集合の要素数下界）**  
> 有限独立同分布情報源において $n\ge1$、$\varepsilon>0$ とし、$\eta_n=P(X^n\notin T_{n,\varepsilon}(p))$ とする。任意の集合 $B_n\subseteq\mathcal X^n$ が $P(X^n\in B_n)\ge1-\delta$（$0\le\delta<1$）を満たすなら

$$
|B_n|\ge(1-\delta-\eta_n)_+\,2^{n(H(p)-\varepsilon)}
$$

> が成り立つ。ただし $(t)_+=\max(t,0)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$B_n$ に入る確率が $1-\delta$ 以上で、典型集合から外れる確率が $\eta_n$ しかなければ、二集合の共通部分には少なくとも $1-\delta-\eta_n$ の確率が残ります。共通部分の各列は典型列なので、確率の上界を足して個数の下界に直します。

<!-- proof-start -->
### 証明

$T=T_{n,\varepsilon}(p)$ とすると、$B_n$ に入り $T$ から外れる事象は $T^c$ に含まれます。よって

$$
\begin{aligned}
P(X^n\in B_n\cap T)
&=P(X^n\in B_n)-P(X^n\in B_n\cap T^c)\\
&\ge (1-\delta)-P(X^n\in T^c)\\
&=1-\delta-\eta_n.
\end{aligned}
$$

一方、[典型列ごとの確率上界](#thm-info3-typical-cardinality)の証明で使用した評価を $B_n\cap T$ の各列へ適用すると

$$
\begin{aligned}
P(X^n\in B_n\cap T)
&=\sum_{x^n\in B_n\cap T}p^{\otimes n}(x^n)\\
&\le|B_n\cap T|2^{-n(H(p)-\varepsilon)}\\
&\le|B_n|2^{-n(H(p)-\varepsilon)}.
\end{aligned}
$$

二つを比較して、$1-\delta-\eta_n>0$ のときの下界を得ます。右辺が零以下の場合は単に $|B_n|\ge0$ を使えばよく、まとめて正部分の式になります。
<!-- proof-end -->

例えば $B_n$ に含まれる列だけを区別して記録したいとすると、候補数は指数的に増えるので、その番号の2進表現には概ね $nH(p)$ ビット規模が必要になります。ただし、ここでは**具体的な符号方式や復号器をまだ定義していない**ため、符号化定理の証明が済んだわけではありません。

## 6. どの仮定が欠けると壊れるか

### 一様分布は分散が零になる境界例

$S$ の大きさを $m\ge1$ とし、$p(x)=1/m$（$x\in S$）とします。[Shannonエントロピーの定義](../INFO1/index.md#def-info1-entropy)を直接計算すると

$$
H(p)=-m\frac1m\log_2(1/m)=\log_2m.
$$

すべての $x^n\in S^n$ について $p^{\otimes n}(x^n)=m^{-n}$ なので、$-n^{-1}\log_2p^{\otimes n}(x^n)=\log_2m=H(p)$ です。よって $V(p)=0$ で、どんな $\varepsilon>0$ でも $T_{n,\varepsilon}(p)=S^n$ です。極限を待つ必要はありません。

### 独立性を落とすと1記号のエントロピーへ集まらない

$X_1$ を公平な二値変数とし、すべての $i\ge2$ について $X_i=X_1$ とします。各 $X_i$ の周辺分布は同じで、その[エントロピー](../INFO1/index.md#def-info1-entropy)は1ビットです。しかし、長さ $n$ のブロックは $0^n$ と $1^n$ の二通りしか生じず、各確率は $1/2$ です。したがって

$$
-\frac1n\log_2P(X^n)=\frac1n\longrightarrow0
$$

が確率1で成り立ち、1には近づきません。独立でなければブロック確率を各時刻の周辺確率の積として書けず、証明の冒頭の $\overline Z_n$ への置換が壊れます。各時刻の分布が同じという条件だけでは不十分です。

---

## 7. 演習：対数確率・集中・個数を再現する

### Level A：定義を手で扱う

#### A1. 公平な二値情報源

公平な独立二値情報源について、任意の長さ $n$ の正確率列の確率、1記号当たりの対数確率、$H(p)$、$V(p)$、$T_{n,\varepsilon}(p)$ を求めよ（$\varepsilon>0$）。

- Level: A
- ID: INFO3-A1

<!-- solution-start -->
**詳細解答**　$p(0)=p(1)=1/2$ なので、[ブロック確率の定義](#def-info3-iid-source)から各列 $x^n\in\{0,1\}^n$ の確率は $(1/2)^n=2^{-n}$ です。従って

$$
-\frac1n\log_2p^{\otimes n}(x^n)=1,\qquad
H(p)=-2\cdot\frac12\log_2\frac12=1.
$$

$Z_i=-\log_2p(X_i)=1$ が確率1で成り立つので $V(p)=E[(Z_i-1)^2]=0$ です。[弱典型集合の定義](#def-info3-weak-typical)の差はどの列でも零になり、$T_{n,\varepsilon}(p)=\{0,1\}^n$、その確率は1、個数は $2^n$ です。
<!-- solution-end -->

#### A2. 四つの記号のうち一つだけ1

$p(0)=3/4$、$p(1)=1/4$ の独立同分布情報源について、長さ4の列で1がちょうど1回現れるときの1記号当たりの対数確率を求め、$H(p)$ と比較せよ。またそのような列全体の確率を計算せよ。

- Level: A
- ID: INFO3-A2

<!-- solution-start -->
**詳細解答**　列確率は $(3/4)^3(1/4)=27/256$ ですから

$$
-\frac14\log_2(27/256)
=\frac34\log_2(4/3)+\frac14\log_2 4.
$$

[エントロピーの定義](../INFO1/index.md#def-info1-entropy)から $H(p)$ も右辺と一致します。1の位置の選び方は4通りで互いに排反なので、合計確率は $4\cdot27/256=27/64$ です。列の数を先に数えただけでは合計確率にならず、1列の確率を掛ける必要があります。
<!-- solution-end -->

#### A3. 零確率の記号

$\mathcal X=\{a,b,c\}$、$p(a)=p(b)=1/2$、$p(c)=0$ とする。$H(p)$ と $T_{n,\varepsilon}(p)$（$n\ge1$、$\varepsilon>0$）を求め、列 $ac$（$n=2$）が典型かどうか説明せよ。

- Level: A
- ID: INFO3-A3

<!-- solution-start -->
**詳細解答**　正の台は $S=\{a,b\}$ です。[Shannonエントロピーの零項規約](../INFO1/index.md#def-info1-entropy)を用いると

$$
H(p)=-\frac12\log_2\frac12-\frac12\log_2\frac12=1.
$$

$S^n$ の列はすべて確率 $2^{-n}$ で1記号当たりの対数確率が1です。従って $T_{n,\varepsilon}(p)=S^n$ です。$ac\notin S^2$ は確率零なので、$-\log_2p^{\otimes2}(ac)$ を実数として計算する前に典型集合から除外します。
<!-- solution-end -->

#### A4. 分散から外れる確率の上界

有限独立同分布情報源で $V(p)=1/4$ とする。$n=400$、$\varepsilon=1/5$ のとき、典型集合から外れる確率を本章の定理で評価せよ。

- Level: A
- ID: INFO3-A4

<!-- solution-start -->
**詳細解答**　有限独立同分布なので[漸近等分割性の定理](#thm-info3-aep)を適用できます。$n\varepsilon^2=400(1/25)=16$ だから

$$
P(X^{400}\notin T_{400,1/5}(p))
\le\frac{1/4}{16}=\frac1{64}.
$$

よって典型集合に入る確率は少なくとも $63/64$ です。この値は**上界・下界**であって、実際の確率が $1/64$ や $63/64$ と等しいと主張してはいません。
<!-- solution-end -->

### Level B：主要結果を組み合わせる

#### B1. 典型集合の挟み撃ちを自力で導く

$P(X^n\in T_{n,\varepsilon})\ge1-\eta$ とする。ただし各典型列の確率が $2^{-n(H+\varepsilon)}$ 以上、$2^{-n(H-\varepsilon)}$ 以下であることだけを用いて、典型集合の個数の上下界を証明せよ。

- Level: B
- ID: INFO3-B1

<!-- solution-start -->
**詳細解答**　$T=T_{n,\varepsilon}$ とおき、各列確率の下界を足します。

$$
1\ge P(X^n\in T)
=\sum_{x^n\in T}P(X^n=x^n)
\ge |T|2^{-n(H+\varepsilon)}.
$$

従って $|T|\le 2^{n(H+\varepsilon)}$ です。上界を足す方向では

$$
1-\eta\le P(X^n\in T)
=\sum_{x^n\in T}P(X^n=x^n)
\le |T|2^{-n(H-\varepsilon)}.
$$

よって $|T|\ge(1-\eta)2^{n(H-\varepsilon)}$ です。各列確率の**下界から個数の上界**、各列確率の**上界から個数の下界**を得る向きに注意します。典型性の定義だけから総確率が $1-\eta$ 以上とは言えず、その条件は別に必要です。
<!-- solution-end -->

#### B2. 一様な3記号情報源

$p(a)=p(b)=p(c)=1/3$ の独立同分布情報源について $H(p)$、$V(p)$、典型集合の個数を厳密に求めよ。さらに[典型集合の要素数の上下界](#thm-info3-typical-cardinality)と矛盾しないことを確認せよ。

- Level: B
- ID: INFO3-B2

<!-- solution-start -->
**詳細解答**　各記号の自己情報量は $\log_2 3$ です。従って

$$
H(p)=3(1/3)\log_2 3=\log_2 3,\qquad V(p)=0.
$$

各 $x^n\in\{a,b,c\}^n$ の確率は $3^{-n}$ なので $-n^{-1}\log_2p^{\otimes n}(x^n)=\log_2 3$ です。[弱典型集合の定義](#def-info3-weak-typical)よりすべての $3^n$ 列が典型、$\eta_n=0$ です。定理の上下界は

$$
2^{n(\log_23-\varepsilon)}
\le3^n\le
2^{n(\log_23+\varepsilon)}
$$

となります。両端は $3^n2^{-n\varepsilon}$ と $3^n2^{n\varepsilon}$ なので、$\varepsilon>0$ に対し確かに成立します。
<!-- solution-end -->

#### B3. 時間依存が作る反例

公平な $X_1\in\{0,1\}$ に対し、すべての $i$ で $X_i=X_1$ とする。$X^n$ が取り得る値と確率、$-n^{-1}\log_2P(X^n)$ の値を求め、独立同分布の結論と比較せよ。

- Level: B
- ID: INFO3-B3

<!-- solution-start -->
**詳細解答**　$X^n$ が取るのは $0^n$ と $1^n$ だけです。$P(X^n=0^n)=P(X_1=0)=1/2$、$P(X^n=1^n)=1/2$ で、他の列の確率は零です。従って確率1で

$$
-\frac1n\log_2P(X^n)= -\frac1n\log_2(1/2)=\frac1n\to0.
$$

一方、各時刻の周辺分布だけで計算したエントロピーは $H(X_i)=1$ です。例えば $n=2$ で $P(X_1=0,X_2=0)=1/2$ ですが $P(X_1=0)P(X_2=0)=1/4$ なので、[独立性の定義](../../../解析系/F0/F0-00P3/index.md#def-f0-00p3-independent-random-variables)を満たしません。従って[漸近等分割性](#thm-info3-aep)のブロック確率の積表示を利用できず、結論を流用できません。
<!-- solution-end -->

#### B4. どんな高確率集合にも一定の大きさが要る

ある $\varepsilon>0$ について $\eta_n=P(X^n\notin T_{n,\varepsilon})\le0.03$ とする。$P(X^n\in B_n)\ge0.98$ を満たす任意の $B_n\subseteq\mathcal X^n$ の個数に、$H(p)$、$\varepsilon$、$n$ を使った下界を与えよ。

- Level: B
- ID: INFO3-B4

<!-- solution-start -->
**詳細解答**　$P(X^n\in B_n^c)\le0.02$、$P(X^n\in T_{n,\varepsilon}^c)\le0.03$ です。補集合の和事象を使えば

$$
\begin{aligned}
P(X^n\in B_n\cap T_{n,\varepsilon})
&=1-P(X^n\in B_n^c\cup T_{n,\varepsilon}^c)\\
&\ge1-0.02-0.03=0.95.
\end{aligned}
$$

[典型列の確率上界](#thm-info3-typical-cardinality)から各共通列の確率は $2^{-n(H(p)-\varepsilon)}$ 以下なので

$$
0.95\le |B_n\cap T_{n,\varepsilon}|2^{-n(H(p)-\varepsilon)}
\le|B_n|2^{-n(H(p)-\varepsilon)}.
$$

よって $|B_n|\ge0.95\,2^{n(H(p)-\varepsilon)}$ です。$B_n$ 自体の各列が典型であるとは仮定していないため、共通部分へ制限するのが重要です。
<!-- solution-end -->

### Level C：具体分布で集中・個数・下界を結ぶ

#### C1. 三記号情報源の総合評価

$\mathcal X=\{a,b,c\}$、$p(a)=1/2$、$p(b)=p(c)=1/4$ とし、$X_i$ は独立同分布とする。

1. $H(p)$ と $V(p)$ を求めよ。
2. $\varepsilon=1/4$、$n=1000$ のとき、典型集合の確率と個数の上下界を与えよ。
3. 同じ $n$ で確率を少なくとも $0.99$ 覆う任意の集合 $B_n$ の個数の下界を求めよ。
4. 列中の $a$ の個数を $k$ としたとき、弱典型性の条件を $k/n$ の不等式に書き換えよ。

- Level: C
- ID: INFO3-C1

<!-- solution-start -->
**詳細解答**

**(1)** 一記号当たりの情報量は、$a$ なら $-\log_2(1/2)=1$、$b,c$ なら $-\log_2(1/4)=2$ です。その確率はそれぞれ合計 $1/2$、$1/2$ なので、[Shannonエントロピーの定義](../INFO1/index.md#def-info1-entropy)を代入して

$$
H(p)=\frac12\cdot1+\frac14\cdot2+\frac14\cdot2=\frac32.
$$

[対数確率の平均と分散の補題](#lem-info3-log-moments)の式から

$$
\begin{aligned}
V(p)
&=\frac12(1-\tfrac32)^2
+\frac14(2-\tfrac32)^2
+\frac14(2-\tfrac32)^2\\
&=\frac12\cdot\frac14+\frac12\cdot\frac14
=\frac14.
\end{aligned}
$$

**(2)** $n\varepsilon^2=1000/16=62.5$ なので、[漸近等分割性の定理](#thm-info3-aep)から

$$
\eta_n\le\frac{1/4}{1000/16}=\frac4{1000}=0.004.
$$

従って $P(X^{1000}\in T_{1000,1/4})\ge0.996$ です。[典型集合の要素数の上下界](#thm-info3-typical-cardinality)へ $H(p)=3/2$ を代入すると

$$
0.996\,2^{1250}
\le |T_{1000,1/4}(p)|
\le2^{1750}.
$$

これは非常に緩い評価ですが、指数の主要部分を厳密に囲む役割があります。

**(3)** $P(X^{1000}\in B_{1000})\ge0.99$ なので $\delta=0.01$ と置きます。[高確率集合の要素数下界](#prop-info3-high-mass-count)に $\eta_n\le0.004$ を使うと

$$
|B_{1000}|
\ge(1-0.01-0.004)2^{1000(3/2-1/4)}
=0.986\,2^{1250}.
$$

$B_{1000}$ が典型集合そのものかどうかは問いません。

**(4)** $a$ が $k$ 回、残りが $n-k$ 回なら[ブロック確率の定義](#def-info3-iid-source)から

$$
p^{\otimes n}(x^n)
=(1/2)^k(1/4)^{n-k}=2^{-2n+k}.
$$

従って

$$
-\frac1n\log_2p^{\otimes n}(x^n)=2-\frac{k}{n}.
$$

[弱典型集合の定義](#def-info3-weak-typical)に $H(p)=3/2$、$\varepsilon=1/4$ を代入し、

$$
\left|2-\frac{k}{n}-\frac32\right|
=\left|\frac12-\frac{k}{n}\right|
\le\frac14
$$

です。すなわち $1/4\le k/n\le3/4$ です。なおこの条件は $b$ と $c$ の個別頻度を指定していません。同じ確率を持つ二記号を入れ替えても列の確率が変わらない、弱典型性の特徴を示しています。
<!-- solution-end -->

---

本章では、長い独立同分布情報源の確率が一部の列へ集中し、その列の個数がエントロピーの指数によって支配される理由を導きました。次は、こうした候補を実際のビット列へ対応させるときに、**どの長さの符号が実現可能か**を接頭語符号とKraft不等式から調べます。
