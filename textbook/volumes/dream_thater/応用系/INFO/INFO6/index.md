# INFO6 離散無記憶通信路・通信路容量・Fano不等式

[INFO5の固定長情報源符号化](../INFO5/index.md#thm-info5-achievability)は、元の列を短い記録へ置き換えました。しかし記録したビットが伝送中に反転したら、単に短く表せるだけでは元の情報を復元できません。ここでは送信者があらかじめ選んだメッセージを、雑音のある通信路へ何回か入力し、受信者がどれだけ正しく識別できるかを調べます。

[相互情報量](../INFO1/index.md#def-info1-mutual-information)は入力を知ることによって出力の不確実性がどれだけ減るかを測る量です。通信路の入力分布を工夫すると、この量が変わります。その最大値が、伝送に利用できる一回当たりの情報量の候補です。ただし、その最大値を計算しただけでは、実際にその速度で誤りを小さくする符号が存在するとは証明されません。本章では模型と容量を具体化し、誤り事象から条件付きエントロピーを評価したうえで「容量を超える速度で誤りを消せない」ことまでを証明します。達成可能性の構成は次章に分けます。

すべてのアルファベットは有限かつ空でなく、対数は底2、情報の単位はビットです。確率零の項では $0\log_2 0=0$ とし、条件付き分布は条件の確率が正のところだけで評価します。

## 1. 一回の雑音模型から長さ $n$ の通信へ

[有限確率通信路](../INFO2/index.md#def-info2-channel)は、入力 $x$ ごとに出力 $y$ の条件付き確率 $W(y|x)$ を割り当てるものです。例えば、ビットが確率 $q$ で反転する装置なら、入力0の行は $(1-q,q)$、入力1の行は $(q,1-q)$ です。

同じ装置を $n$ 回使うとき、「装置が同じ」という条件と「各回の雑音が条件付きで独立」という条件は別です。後者まで仮定することで、ブロックの遷移確率が各回の積になります。

<a id="def-info6-dmc-block"></a>

<!-- formal-statement-start -->
> **定義（離散無記憶通信路のブロック遷移）**  
> 空でない有限入力集合 $\mathcal X$、出力集合 $\mathcal Y$ と、各 $x\in\mathcal X$ に対して $W(y|x)\ge0$、$\sum_{y\in\mathcal Y}W(y|x)=1$ を満たす配列 $W$ を固定する。離散無記憶通信路を $n\ge1$ 回使用する場合、任意の入力列 $x^n$ に対する出力列の条件付き分布を

$$
W^n(y^n|x^n)=\prod_{i=1}^n W(y_i|x_i)
\qquad(x^n\in\mathcal X^n,\ y^n\in\mathcal Y^n)
$$

> とする。入力列そのものは独立同分布である必要がない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info6-dmc-block -->
### 例：二回のビット反転

**定義の確認**：$q=1/4$、$\mathcal X=\mathcal Y=\{0,1\}$ とすると、各行の確率は $3/4+1/4=1$ で非負です。入力が $x^2=00$ の場合、

$$
W^2(10|00)=W(1|0)W(0|0)=\frac14\frac34=\frac3{16}.
$$

同じ入力に対する出力 $00,01,10,11$ の確率は順に $9/16,3/16,3/16,1/16$ で、和は1です。これは二回の雑音が入力を固定した下で独立であることも確認しています。
<!-- definition-example-end -->

各回で同一の乱数 $Z$ を使って $Y_i=X_i\oplus Z$ とする場合、各回の反転確率は同じでも無記憶ではありません。例えば $P(Z=1)=1/4$ なら $P(Y^2=00|X^2=00)=3/4$ であり、積模型の $9/16$ と異なります。破れているのは入力の独立性ではなく、**入力を固定した下での雑音の独立性**です。

## 2. メッセージを符号化して、受信側で判定する

情報源の圧縮と違い、通信路符号ではメッセージを区別しやすい入力列へ割り当てます。符号語間に冗長性を持たせることもできますが、その分、一回当たりに送れるメッセージのビット数は小さくなります。

<a id="def-info6-channel-code"></a>

<!-- formal-statement-start -->
> **定義（通信路符号と平均誤り確率）**  
> 有限離散無記憶通信路 $W:\mathcal X\to\mathcal Y$ と整数 $n\ge1$、$M\ge2$ に対し、メッセージ集合 $\mathcal M=\{1,\ldots,M\}$、符号器 $e:\mathcal M\to\mathcal X^n$、復号器 $d:\mathcal Y^n\to\mathcal M$ の組を $(n,M)$ 通信路符号という。$J$ が $\mathcal M$ 上一様であるとき、

$$
X^n=e(J),\qquad
\widehat J=d(Y^n),\qquad
P_{\mathrm e}=P(\widehat J\ne J),\qquad
R_n=\frac{\log_2 M}{n}
$$

> をそれぞれ入力列、復号結果、平均メッセージ誤り確率、伝送率とする。$Y^n$ の条件付き分布は $W^n(\cdot|X^n)$ である。伝送率は必ずしも整数ビット/回とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info6-channel-code -->
### 例：一回で二つのメッセージを送る

**定義の確認**：$\mathcal M=\{1,2\}$、$n=1$ とし、反転確率 $q=1/4$ の通信路で $e(1)=0,e(2)=1$、$d(0)=1,d(1)=2$ とします。符号器と復号器はそれぞれ指定された有限集合上の全域写像です。各メッセージについて誤る確率は $1/4$ なので、一様平均は

$$
P_{\mathrm e}=\frac12\cdot\frac14+\frac12\cdot\frac14
=\frac14,\qquad R_1=\log_2 2=1.
$$

「1ビット/回送った」と「その1ビットを必ず正しく受け取った」は違います。
<!-- definition-example-end -->

## 3. 入力分布を選んで得られる通信路容量

入力分布 $p(x)$ を選ぶと、結合分布は $p_{XY}(x,y)=p(x)W(y|x)$、出力分布は $p_Y(y)=\sum_xp(x)W(y|x)$ です。この結合分布に対して[相互情報量](../INFO1/index.md#def-info1-mutual-information)を計算します。確率通信路は固定しても、$p$ を変えると $I(X;Y)$ は変わります。

<a id="def-info6-capacity"></a>

<!-- formal-statement-start -->
> **定義（有限離散通信路の容量）**  
> 空でない有限集合 $\mathcal X,\mathcal Y$ と確率通信路 $W(y|x)$ に対して、通信路容量を

$$
C(W)=\sup_{p\text{ は }\mathcal X\text{ 上の確率分布}}
I_p(X;Y)
$$

> と定める。$I_p$ は $p_{XY}(x,y)=p(x)W(y|x)$ の下での相互情報量である。容量の単位はビット/通信路使用である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info6-capacity -->
### 例：入力をそのまま出力する装置

**定義の確認**：$\mathcal X=\mathcal Y=\{0,1\}$、$W(y|x)=1$（$y=x$ の場合）、それ以外は零なら各行の和は1です。$Y=X$ なので、[条件付きエントロピー](../INFO1/index.md#def-info1-conditional-entropy)は $H(Y|X)=0$ です。従って $I_p(X;Y)=H(Y)=H(X)\le1$。一様入力では $H(X)=1$ となり、上限と下限が一致して $C(W)=1$ です。
<!-- definition-example-end -->

### 二元対称通信路の容量

反転確率 $q\in[0,1]$ の二元対称通信路を考えます。二値分布の[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)を引数 $t$ の関数として

$$
h_2(t)=-t\log_2t-(1-t)\log_2(1-t),
\qquad 0\le t\le1
$$

と書き、端点では $0\log_2 0=0$ を用います。雑音が公平な $q=1/2$ では、出力を見ても入力が分かりません。一方、$q=1$ では必ず反転するので、受信者が反転し直せば完全に復元できます。

<a id="thm-info6-bsc-capacity"></a>

<!-- formal-statement-start -->
> **定理（二元対称通信路の容量）**  
> $\mathcal X=\mathcal Y=\{0,1\}$、$W(y|x)=1-q$（$y=x$）、$W(y|x)=q$（$y\ne x$）、$0\le q\le1$ の通信路では

$$
C(W)=1-h_2(q).
$$

> 容量は一様な入力分布 $P(X=0)=P(X=1)=1/2$ で達成される。
<!-- formal-statement-end -->

### 証明の見取り図

各入力で出力の反転確率は同じなので $H(Y|X)=h_2(q)$ です。一方、出力 $Y$ は二値ですから、その[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)は最大でも1です。一様入力によって出力も一様になることを確認し、上界を実現します。

<!-- proof-start -->
### 証明

入力確率を $P(X=0)=a$ とする。$X=0$ なら出力分布は $(1-q,q)$、$X=1$ なら $(q,1-q)$ だから、[条件付きエントロピーの定義](../INFO1/index.md#def-info1-conditional-entropy)から

$$
H(Y|X)=a\,h_2(q)+(1-a)\,h_2(q)=h_2(q).
$$

[相互情報量の定義](../INFO1/index.md#def-info1-mutual-information)と[二値エントロピーの上限](../INFO1/index.md#thm-info1-entropy-bounds)をこの出力 $Y$ に適用すると

$$
I(X;Y)=H(Y)-H(Y|X)\le1-h_2(q).
$$

$a=1/2$ を選ぶと

$$
P(Y=0)=\frac12(1-q)+\frac12q=\frac12,\qquad
P(Y=1)=\frac12q+\frac12(1-q)=\frac12.
$$

従って $H(Y)=1$ となり $I(X;Y)=1-h_2(q)$。全入力分布への上界に等しい値を実現したため、容量の定義の上限と一致する。端点 $q=0,1$ でも同じ計算が成立する。
<!-- proof-end -->

### 消失を知らせてくれる通信路

反転と違って、受信者が「今回は読めなかった」と分かる装置もあります。出力記号を $\{0,1,?\}$ とし、確率 $\varepsilon$ で消失記号 $?$ を返し、残りの確率では入力ビットをそのまま返す二元消失通信路を考えます。

<a id="thm-info6-bec-capacity"></a>

<!-- formal-statement-start -->
> **定理（二元消失通信路の容量）**  
> $\mathcal X=\{0,1\}$、$\mathcal Y=\{0,1,?\}$ とし、任意の $x\in\mathcal X$ について $W(x|x)=1-\varepsilon$、$W(?|x)=\varepsilon$、それ以外を零とする。ただし $0\le\varepsilon\le1$。この通信路の容量は

$$
C(W)=1-\varepsilon
$$

> で、一様入力により達成される。
<!-- formal-statement-end -->

### 証明の見取り図

$?$ を観測した場合の入力は元の分布のままで、$0$ または $1$ が観測された場合は入力が完全に決まります。そのため条件付きエントロピーの平均は $\varepsilon H(X)$ です。

<!-- proof-start -->
### 証明

入力分布を $P(X=1)=a$ とする。出力が $?$ となる確率は

$$
P(Y=?)=\sum_{x=0}^1P(X=x)\varepsilon=\varepsilon.
$$

$0<\varepsilon<1$ の場合、$P(X=x,Y=?)=\varepsilon P(X=x)$ だから $P(X=x|Y=?)=P(X=x)$。出力が $0,1$ の正確率の場合は $X=Y$ が確実であり、各条件付きエントロピーは零である。従って[条件付きエントロピー](../INFO1/index.md#def-info1-conditional-entropy)の和を直接計算して

$$
H(X|Y)=\varepsilon H(X)+(1-\varepsilon)\cdot0
=\varepsilon H(X).
$$

[相互情報量の対称表示](../INFO1/index.md#def-info1-mutual-information)から

$$
I(X;Y)=H(X)-H(X|Y)=(1-\varepsilon)H(X)
\le1-\varepsilon.
$$

最後の上界は[二値エントロピーの上限](../INFO1/index.md#thm-info1-entropy-bounds)による。一様入力 $a=1/2$ なら $H(X)=1$ で等号である。$\varepsilon=0$ では $Y=X$、$\varepsilon=1$ では $Y=?$ が確実であり、零確率の条件付けを使わず直接 $I(X;Y)=1,0$ を得るため、端点でも公式が成立する。
<!-- proof-end -->

## 4. 誤りが小さければ、観測後の曖昧さも小さい：Fano不等式

復号結果 $\widehat J$ がたまに外れるとき、送信メッセージ $J$ について受信後にどれくらい不確実性が残るでしょうか。誤ったかどうかを示す二値変数を挟めば、この量を誤り確率だけで評価できます。

<a id="thm-info6-fano"></a>

<!-- formal-statement-start -->
> **定理（Fano不等式）**  
> $M\ge2$ 個の値を取る任意の確率変数 $J$ と、同じ集合に値を取る任意の推定結果 $\widehat J$ について、$P_{\mathrm e}=P(\widehat J\ne J)$ と置けば

$$
H(J|\widehat J)
\le h_2(P_{\mathrm e})+P_{\mathrm e}\log_2(M-1)
\le1+P_{\mathrm e}\log_2 M.
$$

> $J$ が一様分布である必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

誤り指示変数 $E=\mathbf1_{\{J\ne\widehat J\}}$ を導入します。$E=0$ なら答えは一意で、$E=1$ なら正解の候補は推定値以外の高々 $M-1$ 個です。この場合分けを[エントロピーの連鎖律](../INFO1/index.md#thm-info1-chain-rule)へ代入します。

<!-- proof-start -->
### 証明

$E=\mathbf1_{\{J\ne\widehat J\}}$ は $J,\widehat J$ の関数だから $H(E|J,\widehat J)=0$。一方で[連鎖律](../INFO1/index.md#thm-info1-chain-rule)を条件付きで二通りに用いると

$$
\begin{aligned}
H(J,E|\widehat J)
&=H(J|\widehat J)+H(E|J,\widehat J)
=H(J|\widehat J),\\
H(J,E|\widehat J)
&=H(E|\widehat J)+H(J|E,\widehat J).
\end{aligned}
$$

従って

$$
H(J|\widehat J)=H(E|\widehat J)+H(J|E,\widehat J).
$$

最初の項は、[相互情報量の非負性](../INFO2/index.md#thm-info2-mutual-kl)を $E,\widehat J$ に使って

$$
H(E|\widehat J)=H(E)-I(E;\widehat J)
\le H(E)=h_2(P_{\mathrm e}).
$$

次に $E=0$ なら $J=\widehat J$ なので $H(J|E=0,\widehat J)=0$。$E=1$ では各推定値 $\widehat J=j$ の下で $J$ が取り得るのは $j$ を除いた高々 $M-1$ 通りである。確率が正の条件に限り[有限離散エントロピーの上限](../INFO1/index.md#thm-info1-entropy-bounds)を用いると

$$
\begin{aligned}
H(J|E,\widehat J)
&=(1-P_{\mathrm e})H(J|E=0,\widehat J)
 +P_{\mathrm e}H(J|E=1,\widehat J)\\
&\le (1-P_{\mathrm e})\cdot0
 +P_{\mathrm e}\log_2(M-1).
\end{aligned}
$$

$P_{\mathrm e}=0$ または $1$ なら確率零の条件付きエントロピー項を省いて解釈すれば同じ上界が成り立つ。これらを加えると第一の不等式を得る。最後に $h_2(P_{\mathrm e})\le1$、$\log_2(M-1)\le\log_2 M$ を使う。
<!-- proof-end -->

例えば3メッセージを一様に選び、復号器が常に1を出すと、誤り確率は $2/3$ であり、観測から何も分からないので $H(J|\widehat J)=\log_2 3$ です。この場合、Fano不等式の**最初の上界には等号**が成り立ちます。推定がほとんど当たらない場合に、必ずしも小さい条件付きエントロピーが得られるわけではありません。

## 5. $n$ 回の通信で取り出せる相互情報量の上限

Fano不等式を伝送率の制限へつなぐためには、長さ $n$ の出力が入力メッセージをどれだけ教えられるかも評価しなければなりません。ここで**無記憶性**が決定的に使われます。

<a id="thm-info6-block-mutual-bound"></a>

<!-- formal-statement-start -->
> **定理（無記憶通信路のブロック相互情報量上界）**  
> 有限離散無記憶通信路 $W$ を $n\ge1$ 回使う。任意の（独立性を仮定しない）入力列 $X^n$ と、その条件付き分布が $W^n$ である出力列 $Y^n$ に対し、

$$
I(X^n;Y^n)\le\sum_{i=1}^n I(X_i;Y_i)\le nC(W)
$$

> が成り立つ。さらに $J\to X^n\to Y^n$ がMarkov連鎖なら $I(J;Y^n)\le nC(W)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

出力同士が相関していれば $H(Y^n)$ は各 $H(Y_i)$ の和以下です。一方、入力列をすべて固定すると出力は各回独立なので、$H(Y^n|X^n)$ は各 $H(Y_i|X_i)$ の和に**等しく**なります。二つの事実を引き算します。

<!-- proof-start -->
### 証明

[エントロピーの連鎖律](../INFO1/index.md#thm-info1-chain-rule)を有限個の変数へ繰り返すと

$$
H(Y^n)=\sum_{i=1}^n H(Y_i|Y^{i-1}).
$$

$Y^{i-1}$ は前の $i-1$ 個の出力（$i=1$ では空）である。[相互情報量の非負性](../INFO2/index.md#thm-info2-mutual-kl)を $Y_i,Y^{i-1}$ に適用すれば

$$
H(Y_i|Y^{i-1})=H(Y_i)-I(Y_i;Y^{i-1})\le H(Y_i).
$$

よって $H(Y^n)\le\sum_iH(Y_i)$。

次に入力列 $x^n$ の確率が正なら、通信路の定義により $P(Y^n=y^n|X^n=x^n)=\prod_iW(y_i|x_i)$。各正確率出力列で対数を和へ展開し、他の座標について和を取ると

$$
\begin{aligned}
H(Y^n|X^n=x^n)
&=-\sum_{y^n} \left(\prod_{j=1}^n W(y_j|x_j)\right)
\log_2\left(\prod_{i=1}^nW(y_i|x_i)\right)\\
&=\sum_{i=1}^n\left[-\sum_{y_i}W(y_i|x_i)\log_2W(y_i|x_i)\right]
\prod_{j\ne i}\left(\sum_{y_j}W(y_j|x_j)\right)\\
&=\sum_{i=1}^n H(W(\cdot|x_i)).
\end{aligned}
$$

確率零の積には対数を取らず、和から除外している。最後の積は各行和が1なので1である。$X^n$ の確率で平均して有限和を入れ替えると

$$
\begin{aligned}
H(Y^n|X^n)
&=\sum_{x^n}P(X^n=x^n)\sum_{i=1}^nH(W(\cdot|x_i))\\
&=\sum_{i=1}^n\sum_{x_i}P(X_i=x_i)H(W(\cdot|x_i))\\
&=\sum_{i=1}^nH(Y_i|X_i).
\end{aligned}
$$

従って[相互情報量の定義](../INFO1/index.md#def-info1-mutual-information)を用い、

$$
\begin{aligned}
I(X^n;Y^n)
&=H(Y^n)-H(Y^n|X^n)\\
&\le\sum_{i=1}^n[H(Y_i)-H(Y_i|X_i)]\\
&=\sum_{i=1}^nI(X_i;Y_i)\le nC(W).
\end{aligned}
$$

最後の不等号は各 $X_i$ の周辺分布が容量の定義で許す入力分布だから成立する。$J\to X^n\to Y^n$ の場合は[相互情報量のデータ処理不等式](../INFO2/index.md#thm-info2-mutual-dpi)により $I(J;Y^n)\le I(X^n;Y^n)$ なので、先ほどの上界と結合できる。
<!-- proof-end -->

入力 $X_i$ が互いに独立であるとは一度も仮定していません。逆に、出力の条件付き独立性を外すと、途中の $H(Y^n|X^n)=\sum_iH(Y_i|X_i)$ は保証されません。先ほどの共通雑音の例は、証明のどこが使えなくなるかを示します。

## 6. 容量を超えて誤りを消すことはできない

通信路符号では $J$ は一様なので $H(J)=\log_2 M$ です。誤りが小さければ[Fano不等式](#thm-info6-fano)により、受信後の $H(J|\widehat J)$ も小さくなるはずです。しかし復号器の出力 $\widehat J$ は $Y^n$ の関数なので、通信路から得られる情報は $nC$ を超えません。この両側の評価を突き合わせます。

<a id="thm-info6-weak-converse"></a>

<!-- formal-statement-start -->
> **定理（離散無記憶通信路符号化の弱逆定理）**  
> 有限離散無記憶通信路 $W$ の容量を $C=C(W)$ とする。任意の決定的 $(n,M_n)$ 通信路符号（$M_n\ge2$、メッセージ一様）の平均誤り確率を $P_{\mathrm e}^{(n)}$、伝送率を $R_n=\log_2M_n/n$ とすると

$$
(1-P_{\mathrm e}^{(n)})\log_2M_n\le nC+1.
$$

> 特に $R_n\to R>C$ なら

$$
\liminf_{n\to\infty}P_{\mathrm e}^{(n)}
\ge1-\frac{C}{R}>0.
$$

> 従って $R>C$ で平均誤り確率を0へ近づける符号列は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

入力列への符号化と、受信列からの復号はいずれも写像です。[Fano不等式](#thm-info6-fano)が $H(J|\widehat J)$ を抑え、[ブロック相互情報量上界](#thm-info6-block-mutual-bound)が $I(J;Y^n)$ を抑えます。両者が $H(J)$ を挟み込むことを使います。

<!-- proof-start -->
### 証明

$J$ は $\{1,\ldots,M_n\}$ 上一様だから $H(J)=\log_2M_n$ である。$J\to Y^n\to\widehat J$ は復号器が $Y^n$ の関数であることからMarkov連鎖となる。[相互情報量のデータ処理不等式](../INFO2/index.md#thm-info2-mutual-dpi)を適用して

$$
I(J;\widehat J)\le I(J;Y^n).
$$

さらに符号器が $X^n=e(J)$ を作り、通信路出力が入力列だけに依存するので $J\to X^n\to Y^n$ もMarkov連鎖である。[ブロック上界](#thm-info6-block-mutual-bound)より $I(J;Y^n)\le nC$。従って

$$
I(J;\widehat J)\le nC.
$$

一方、[Fano不等式](#thm-info6-fano)と $I(J;\widehat J)=H(J)-H(J|\widehat J)$ から

$$
\begin{aligned}
\log_2M_n
&=I(J;\widehat J)+H(J|\widehat J)\\
&\le nC+1+P_{\mathrm e}^{(n)}\log_2M_n.
\end{aligned}
$$

$M_n\ge2$ なので $\log_2M_n>0$ である。項を移項・除算して

$$
P_{\mathrm e}^{(n)}
\ge1-\frac{nC+1}{\log_2M_n}
=1-\frac{C+1/n}{R_n}.
$$

$R_n\to R>C\ge0$ なら $R>0$、十分大きい $n$ で $R_n>0$ なので右辺が $1-C/R$ へ収束する。この下界から $\liminf P_{\mathrm e}^{(n)}\ge1-C/R>0$ を得る。
<!-- proof-end -->

これは**弱逆定理**です。$R>C$ で誤り確率が0へ行かないことは示しましたが、一般の通信路について誤り確率が1へ行くという強逆定理までは、この証明からは出ません。また $R<C$ なら本当に誤りを0へ近づけられるか、という**達成可能性**もまだ証明していません。容量の定義、逆定理、達成可能性は区別する必要があります。

## 7. 演習：容量の計算から誤り確率の限界へ

### Level A：模型・定義・一段の評価

#### A1. 積通信路の確率

反転確率 $q=1/4$ の二元対称通信路を二回独立に使う。入力 $00$ に対して各出力 $00,01,10,11$ の条件付き確率を求め、和が1になることを確認せよ。

- Level: A
- ID: INFO6-A1

<!-- solution-start -->
**詳細解答**　[ブロック通信路の定義](#def-info6-dmc-block)に $x^2=00$、$q=1/4$ を代入する。

$$
\begin{aligned}
W^2(00|00)&=(3/4)^2=9/16,\\
W^2(01|00)&=(3/4)(1/4)=3/16,\\
W^2(10|00)&=(1/4)(3/4)=3/16,\\
W^2(11|00)&=(1/4)^2=1/16.
\end{aligned}
$$

$9/16+3/16+3/16+1/16=16/16=1$。各行の非負性と行和の条件も満たす。
<!-- solution-end -->

#### A2. 二元対称通信路の相互情報量

反転確率 $q=1/4$、一様入力の通信路について $H(Y)$、$H(Y|X)$、$I(X;Y)$ を厳密な対数式で求めよ。

- Level: A
- ID: INFO6-A2

<!-- solution-start -->
**詳細解答**　一様入力は[二元対称通信路の容量定理](#thm-info6-bsc-capacity)の証明と同じく一様出力を与えるから $H(Y)=1$。各入力について出力の分布は $(3/4,1/4)$ またはその順序を逆にしたものなので、

$$
H(Y|X)=h_2(1/4)
=-\frac14\log_2\frac14-\frac34\log_2\frac34
=2-\frac34\log_2 3.
$$

[相互情報量](../INFO1/index.md#def-info1-mutual-information)は

$$
I(X;Y)=1-\left(2-\frac34\log_2 3\right)
=\frac34\log_2 3-1
$$

ビットである。これは容量でもある。
<!-- solution-end -->

#### A3. 二元消失通信路の非一様入力

消失確率 $\varepsilon=1/3$、$P(X=1)=1/4$ の二元消失通信路について $H(X|Y)$ と $I(X;Y)$ を求め、容量と比較せよ。

- Level: A
- ID: INFO6-A3

<!-- solution-start -->
**詳細解答**　入力エントロピーは[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)より $H(X)=h_2(1/4)$。消失時だけ入力の分布が分からず、その確率は1/3なので、[二元消失通信路の容量定理](#thm-info6-bec-capacity)の条件付き分布の計算を適用し、

$$
H(X|Y)=\frac13 h_2(1/4),\qquad
I(X;Y)=H(X)-H(X|Y)=\frac23h_2(1/4).
$$

[有限離散エントロピーの上限](../INFO1/index.md#thm-info1-entropy-bounds)では非一様二値分布の $h_2(1/4)<1$ が成立する。よって $I(X;Y)<2/3=C(W)$ であり、この入力は容量達成入力ではない。
<!-- solution-end -->

#### A4. Fano不等式の数値上界

$M=4$、誤り確率 $P_{\mathrm e}=1/4$ の推定問題で、Fano不等式が与える $H(J|\widehat J)$ の上界を対数式で示せ。$J$ の一様性は必要か。

- Level: A
- ID: INFO6-A4

<!-- solution-start -->
**詳細解答**　[Fano不等式](#thm-info6-fano)に $M-1=3$ と $P_{\mathrm e}=1/4$ を代入する。

$$
\begin{aligned}
H(J|\widehat J)
&\le h_2(1/4)+\frac14\log_2 3\\
&=\left(2-\frac34\log_2 3\right)+\frac14\log_2 3\\
&=2-\frac12\log_2 3.
\end{aligned}
$$

この上界の導出に $J$ の一様分布は不要である。通信路符号の逆定理で $H(J)=\log_2 M$ と置く段階では一様性を使う。
<!-- solution-end -->

### Level B：証明の仮定と不等号

#### B1. Fano不等式の等号例

$J$ は $\{1,2,3\}$ 上一様、$\widehat J$ は常に1とする。誤り確率と $H(J|\widehat J)$ を求め、Fano不等式の最初の上界で等号になることを示せ。

- Level: B
- ID: INFO6-B1

<!-- solution-start -->
**詳細解答**　正解するのは $J=1$ の場合だけだから $P_{\mathrm e}=2/3$。$\widehat J$ は定数で情報を与えないので

$$
H(J|\widehat J)=H(J)=\log_2 3.
$$

[Fano不等式](#thm-info6-fano)の右辺は、$h_2(2/3)=\log_2 3-2/3$ を直接展開して

$$
\begin{aligned}
h_2(2/3)+\frac23\log_2 2
&=-\frac23\log_2\frac23-\frac13\log_2\frac13+\frac23\\
&=\log_2 3-\frac23+\frac23=\log_2 3.
\end{aligned}
$$

従って第一の上界に等号が成り立つ。誤り時には正解が残り2通りで一様、という証明中の上限も等号である。
<!-- solution-end -->

#### B2. 二つの雑音装置を直列に置く

反転確率が各 $1/4$ の独立な二元対称通信路を直列につなぐ。合成反転確率を求め、合成後の容量を式で書け。また初段の出力から最終出力へ相互情報量が増えない理由を述べよ。

- Level: B
- ID: INFO6-B2

<!-- solution-start -->
**詳細解答**　二回のうちちょうど一回反転すれば合成出力が元の入力と異なる。独立なので確率は

$$
q'=P(\text{初段だけ反転})+P(\text{後段だけ反転})
=\frac14\frac34+\frac34\frac14=\frac38.
$$

[二元対称通信路の容量](#thm-info6-bsc-capacity)から合成容量は $1-h_2(3/8)$。初段の入力を $X$、中間出力を $Y$、最終出力を $Z$ とすると、後段の雑音が初段と独立なので $X\to Y\to Z$ は[有限Markov連鎖](../INFO2/index.md#def-info2-markov)である。[相互情報量のデータ処理不等式](../INFO2/index.md#thm-info2-mutual-dpi)より、任意の入力分布で $I(X;Z)\le I(X;Y)$。両辺を全入力分布について上限評価すれば、合成容量は初段容量以下である。
<!-- solution-end -->

#### B3. 入力の独立性がなくてもブロック上界は成立する

雑音のない二値通信路を二回使い、入力列を $X^2=(Z,Z)$ とする。$Z$ は公平な二値変数である。$I(X^2;Y^2)$ と $\sum_{i=1}^2I(X_i;Y_i)$ を計算し、両者が等しくない理由を述べよ。

- Level: B
- ID: INFO6-B3

<!-- solution-start -->
**詳細解答**　通信路は雑音がないので $Y^2=X^2$。入力列は $00$ と $11$ を各確率1/2で取るから $H(X^2)=1$。したがって

$$
I(X^2;Y^2)=H(Y^2)-H(Y^2|X^2)=1-0=1.
$$

一方、各 $X_i=Z$ は一様で $Y_i=X_i$ なので $I(X_i;Y_i)=H(X_i)=1$。従って $\sum_{i=1}^2I(X_i;Y_i)=2$ である。[ブロック上界](#thm-info6-block-mutual-bound)は $1\le2$ として成立する。$Y_1,Y_2$ は完全に相関し、$H(Y^2)=1< H(Y_1)+H(Y_2)=2$ の箇所で不等号が厳密になる。
<!-- solution-end -->

#### B4. 容量を超えた符号率の誤り下界

消失確率1/2の二元消失通信路に、$M_n=2^{\lceil3n/4\rceil}$ 個の一様メッセージを長さ $n$ で符号化する。[Fano不等式](#thm-info6-fano)から有限長の誤り下界を求め、極限での下極限を示せ。

- Level: B
- ID: INFO6-B4

<!-- solution-start -->
**詳細解答**　[二元消失通信路の容量](#thm-info6-bec-capacity)は $C=1-1/2=1/2$。[弱逆定理](#thm-info6-weak-converse)では $\log_2M_n=\lceil3n/4\rceil>0$ なので、

$$
P_{\mathrm e}^{(n)}
\ge1-\frac{nC+1}{\log_2M_n}
=1-\frac{n/2+1}{\lceil3n/4\rceil}.
$$

右辺が負の小さい $n$ では、さらに自明な $P_{\mathrm e}^{(n)}\ge0$ と組み合わせればよい。$\lceil3n/4\rceil/n\to3/4$ より、

$$
\liminf_{n\to\infty}P_{\mathrm e}^{(n)}
\ge1-\frac{1/2}{3/4}
=\frac13.
$$

正の下界があるので、この伝送率で平均誤りを0にはできない。
<!-- solution-end -->

### Level C：通信模型・容量・逆定理を接続する

#### C1. 二元対称通信路の伝送限界と無記憶性

反転確率 $q=1/4$ の二元対称通信路を考える。

1. 容量 $C$ を対数式で表し、$0<C<2/5$ を示せ。
2. 一様メッセージ数 $M_n=2^{\lceil2n/5\rceil}$ の任意の $(n,M_n)$ 符号の誤り確率の有限長下界を求めよ。
3. 前問から $\liminf P_{\mathrm e}^{(n)}$ の下界を導け。
4. 反転確率を $q=1/2$ に変えたら、同じメッセージ数に対する誤り確率の極限はどうなるか。
5. 各時刻で同じ雑音ビット $Z$（$P(Z=1)=1/4$）を使い $Y_i=X_i\oplus Z$ とする装置では、本章の無記憶通信路の証明をそのまま使えるか。$X^2=00$ を使って理由を示せ。

- Level: C
- ID: INFO6-C1

<!-- solution-start -->
**詳細解答**

**(1)** [二元対称通信路の容量](#thm-info6-bsc-capacity)を $q=1/4$ に適用すると

$$
C=1-h_2(1/4)=\frac34\log_2 3-1.
$$

$3^2=9>8=2^3$ より $\log_2 3>3/2$ なので $C>9/8-1=1/8>0$。また $3^3=27<32=2^5$ から $\log_2 3<5/3$ となり、$C<(3/4)(5/3)-1=1/4<2/5$ である。

**(2)** $M_n=2^{\lceil2n/5\rceil}$ より $\log_2M_n=\lceil2n/5\rceil$。[弱逆定理](#thm-info6-weak-converse)を容量 $C$ とこのメッセージ数へ適用すると

$$
P_{\mathrm e}^{(n)}
\ge1-\frac{n((3/4)\log_2 3-1)+1}{\lceil2n/5\rceil}.
$$

右辺が負の $n$ では確率の非負性と併用する。例えば $n=100$ では $\lceil2n/5\rceil=40$ だから

$$
P_{\mathrm e}^{(100)}
\ge1-\frac{75\log_2 3-99}{40}
=\frac{139-75\log_2 3}{40}.
$$

**(3)** $\lceil2n/5\rceil/n\to2/5$ だから

$$
\liminf_{n\to\infty}P_{\mathrm e}^{(n)}
\ge1-\frac C{2/5}
=1-\frac52\left(\frac34\log_2 3-1\right)>0.
$$

最後の正値性は (1) の $C<2/5$ を用いた。符号器や復号器の選び方に依存しない下界である。

**(4)** $q=1/2$ では $h_2(1/2)=1$、容量 $C=0$。[弱逆定理](#thm-info6-weak-converse)の有限長下界は

$$
P_{\mathrm e}^{(n)}\ge1-\frac1{\lceil2n/5\rceil}\longrightarrow1.
$$

誤り確率自体は1以下なので、はさみうちから $P_{\mathrm e}^{(n)}\to1$ となる。この場合は弱逆定理の評価だけでも極限1まで言える。

**(5)** 共通雑音 $Z$ を使うと $X^2=00$ の下で出力 $00$ となるのは $Z=0$ のときだけなので

$$
P(Y^2=00|X^2=00)=P(Z=0)=\frac34.
$$

ところが無記憶模型の積なら $W^2(00|00)=(3/4)^2=9/16$。両者は一致せず、[ブロック通信路の定義](#def-info6-dmc-block)が満たされない。特に[ブロック相互情報量上界](#thm-info6-block-mutual-bound)の証明で使った $H(Y^n|X^n)=\sum_iH(Y_i|X_i)$ はこの模型には適用できず、同じ容量評価から逆定理を導くことはできない。
<!-- solution-end -->

---

本章で得たのは、有限離散無記憶通信路の容量の定義、二つの基本例での容量計算、誤りと条件付きエントロピーを結ぶFano不等式、そして容量超過を排除する弱逆定理です。次の課題は、**容量より小さい伝送率で、実際に誤りを小さくする符号を構成すること**です。