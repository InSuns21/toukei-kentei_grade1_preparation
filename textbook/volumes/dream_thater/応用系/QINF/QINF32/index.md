# QINF32 Page型エントロピー評価

## 1. purityの平均から、エントロピーの平均は分かるか

前講では、全系 $H_A\otimes H_B$ の[Haarランダム純粋状態](../QINF31/index.md#def-qinf31-haar)から部分系を取り出し、その[平均purity](../QINF31/index.md#thm-qinf31-average-purity)を厳密に求めました。しかし求めたい量が「部分系のエントロピー」であるとき、平均purityの対数を取るだけでは答えになりません。対数は非線形で、一般に「対数の平均」と「平均の対数」は異なるからです。

本講の目標は、計算済みのpurityから**証明できるエントロピーの範囲**をまず確定し、その後、より精密なPageの厳密平均式を文献上の結果として比較することです。数値実験でも平均と標本ごとの揺らぎを分けます。

以下、$H_A,H_B$ は次元 $d_A,d_B\ge1$ の有限次元複素Hilbert空間、$|\psi\rangle$ は全系のHaarランダム単位ベクトルとします。両側の縮約状態を

$$
\rho_A=\operatorname{Tr}_B|\psi\rangle\langle\psi|,
\qquad \rho_B=\operatorname{Tr}_A|\psi\rangle\langle\psi|
$$

と書きます。[Schmidt分解と縮約スペクトルの一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)から両者の非零固有値は一致するので、エントロピー評価では小さい側の次元を

$$
m=\min(d_A,d_B),\qquad n=\max(d_A,d_B),\qquad 1\le m\le n
$$

と書き、$m$ 次元側の縮約状態を $\rho$ とします。$n$ 次元側の縮約状態も零固有値を除けば同じスペクトルです。対数の底は明示しない限り2で、$\ln$ は自然対数です。

## 2. 二種類のエントロピーを見分ける

既習の[von Neumannエントロピー](../QINF17/index.md#def-qinf17-entropy)は固有値 $\lambda_i$ を使うと $S(\rho)=-\sum_i\lambda_i\log_2\lambda_i$ です。一方、前講で平均を求めたpurityは $P(\rho)=\operatorname{Tr}\rho^2=\sum_i\lambda_i^2$ でした。そこで、**purityの負の二進対数**をもう一つのエントロピーとして導入します。これなら前講の二次モーメントと直接結び付けられます。

<a id="def-qinf32-renyi2"></a>

<!-- formal-statement-start -->
> **定義（Rényi-2エントロピー）**
>
> 次元 $m\ge1$ の有限次元密度演算子 $\rho$ に対し、$P(\rho)=\operatorname{Tr}\rho^2>0$ を用いて

$$
S_2(\rho)=-\log_2 P(\rho)
$$

> を**Rényi-2エントロピー**という。対比するvon Neumannエントロピーは $S(\rho)=-\operatorname{Tr}(\rho\log_2\rho)$ で、零固有値の寄与は $0\log_2 0=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf32-renyi2 -->
**定義の確認**。正規直交基底 $|0\rangle,|1\rangle$ で

$$
\rho=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|
=\operatorname{diag}(3/4,1/4)
$$

と表します。この対角行列の成分は基底ベクトルに対する固有値です。また、任意の $v=v_0|0\rangle+v_1|1\rangle$ に対して $\rho^\dagger=\rho$、

$$
\langle v,\rho v\rangle=\frac34|v_0|^2+\frac14|v_1|^2\ge0,
\qquad \operatorname{Tr}\rho=\frac34+\frac14=1
$$

なので、[密度演算子の三条件](../QINF2/index.md#def-qinf2-ensemble-density)をすべて満たします。対角表示から $\rho^2=\operatorname{diag}(9/16,1/16)$ となるため、トレースを取って

$$
P(\rho)=\frac9{16}+\frac1{16}=\frac58,\qquad
S_2(\rho)=\log_2\frac85.
$$

これに対し $S(\rho)=-(3/4)\log_2(3/4)-(1/4)\log_2(1/4)$ で、両者は等しくありません。$\rho=I_2/2$ なら両者とも1、$\rho=|0\rangle\langle0|$ ならともに0です。
<!-- definition-example-end -->

エントロピーが最大値 $\log_2 m$ からどれだけ不足しているかを示すため、次の非負量も使います。基準次元 $m$ は状態が作用するHilbert空間の次元です。状態のrankとは区別します。

<a id="def-qinf32-deficit"></a>

<!-- formal-statement-start -->
> **定義（エントロピー欠損）**
>
> $m$ 次元密度演算子 $\rho$ に対し

$$
\Delta_m(\rho)=\log_2 m-S(\rho)
$$

> を最大混合状態に対する**エントロピー欠損**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf32-deficit -->
**定義の確認**。$m=2$ で最大混合状態 $I_2/2$ の固有値は $(1/2,1/2)$、純粋状態 $|0\rangle\langle0|$ の固有値は $(1,0)$ です。したがって

$$
\begin{aligned}
S(I_2/2)&=-2\cdot\frac12\log_2\frac12=1,
&\Delta_2(I_2/2)&=1-1=0,\\
S(|0\rangle\langle0|)&=0,
&\Delta_2(|0\rangle\langle0|)&=1-0=1.
\end{aligned}
$$

これは[エントロピーの最大値と等号条件](../QINF17/index.md#thm-qinf17-entropy-bounds)とも整合し、欠損は確かに非負です。
<!-- definition-example-end -->

## 3. purityと二種類のエントロピーを挟む

非零固有値 $\lambda_1,\ldots,\lambda_r$ は正、総和1です。$S$ はこの $\lambda_i$ を確率の重みとして平均した $-\log_2\lambda_i$、$S_2$ は重み付き平均 $\sum_i\lambda_i\lambda_i$ の負の対数です。両者の大小は、基本不等式 $\ln t\le t-1$ だけで比べられます。

<a id="lem-qinf32-entropy-sandwich"></a>

<!-- formal-statement-start -->
> **補題（purityとエントロピーの挟み撃ち）**
>
> $m\ge1$ 次元の任意の密度演算子 $\rho$ に対し、

$$
0\le S_2(\rho)\le S(\rho)\le\log_2 m.
$$

> $S_2=S$ となる必要十分条件は、$\rho$ の非零固有値がすべて等しいことである。$S=\log_2 m$ となる必要十分条件は $\rho=I_m/m$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正の固有値を確率の重みとして用い、$\ln t\le t-1$ を各項へ適用して和を取ります。最大値とその等号条件は、既習の[von Neumannエントロピーの上界](../QINF17/index.md#thm-qinf17-entropy-bounds)を使います。最初の不等式は $P\le1$ から従います。

<!-- proof-start -->
### 証明

$\lambda_i>0$、$\sum_{i=1}^r\lambda_i=1$ とします。各 $\lambda_i\le1$ なので $P=\sum_i\lambda_i^2\le\sum_i\lambda_i=1$、また $P>0$。よって $S_2=-\log_2P\ge0$。

$g(t)=t-1-\ln t$ は $t>0$ で $g'(t)=1-1/t$ だから、$t=1$ で唯一の最小値 $g(1)=0$ を取ります。これで $\ln t\le t-1$（等号は $t=1$ のみ）が証明されました。これを $t=\lambda_i/P$ に適用し、正の重み $\lambda_i$ を掛けて合計すると

$$
\sum_{i=1}^r\lambda_i\ln\frac{\lambda_i}{P}
\le\sum_{i=1}^r\lambda_i\left(\frac{\lambda_i}{P}-1\right)
=\frac{\sum_i\lambda_i^2}{P}-1=0.
$$

左辺を $\sum_i\lambda_i\ln\lambda_i-\ln P$ と書き直し、負号を付けて $\ln2$ で割れば $S\ge S_2$ です。等号は各 $\lambda_i/P=1$ のときだけなので、正の固有値がすべて等しいことと同値です。

最後に[既習のエントロピー上界](../QINF17/index.md#thm-qinf17-entropy-bounds)へ次元 $m$ の $\rho$ を代入すると $S(\rho)\le\log_2m$、等号は $I_m/m$ のときだけです。
<!-- proof-end -->

注意すべきは、$\operatorname{rank}\rho=r<m$ で非零固有値が $1/r$ に揃っている場合、$S_2=S=\log_2r$ ですが、$\log_2m$ には届かないことです。二つの等号条件を混同しないでください。

## 4. 最大混合からの偏差もpurityで抑えられる

「エントロピーが最大に近い」を直接数値化するのが $\Delta_m$ です。$P-1/m$ は最大混合からの二乗Hilbert–Schmidt偏差であり、[前講の確率評価](../QINF31/index.md#prop-qinf31-typicality)にも登場しました。対数の基本不等式 $\ln t\le t-1$ を各固有値へ適用すると、欠損も同じ偏差で抑えられます。

<a id="prop-qinf32-deficit-purity"></a>

<!-- formal-statement-start -->
> **命題（エントロピー欠損の二次偏差界）**
>
> $m$ 次元の任意の密度演算子 $\rho$ に対し、

$$
0\le\Delta_m(\rho)
\le\frac{mP(\rho)-1}{\ln2}
=\frac{m}{\ln2}\operatorname{Tr}
\left(\rho-\frac{I_m}{m}\right)^2.
$$

> 等号 $\Delta_m=0$ は $\rho=I_m/m$ のときだけであり、右側の不等式もそのとき等号となる。
<!-- formal-statement-end -->

### 証明の見取り図

$\Delta_m$ を固有値ごとの相対エントロピー型の和に直し、$\ln t\le t-1$ を使います。偏差の式は二乗を展開すれば得られます。

<!-- proof-start -->
### 証明

$\rho$ の固有値を零も含めて $\lambda_1,\ldots,\lambda_m$ とします。$S$ の定義から

$$
\Delta_m=\log_2m+\sum_i\lambda_i\log_2\lambda_i
=\frac1{\ln2}\sum_{\lambda_i>0}\lambda_i\ln(m\lambda_i).
$$

$t=m\lambda_i>0$ に $\ln t\le t-1$ を適用し、$\lambda_i$ を掛けて合計すると

$$
\Delta_m
\le\frac1{\ln2}\sum_i\lambda_i(m\lambda_i-1)
=\frac{m\sum_i\lambda_i^2-1}{\ln2}.
$$

零固有値の項は両辺とも0として扱っています。一方

$$
\operatorname{Tr}\left(\rho-\frac{I_m}{m}\right)^2
=\operatorname{Tr}\rho^2-\frac2m\operatorname{Tr}\rho
+\frac1{m^2}\operatorname{Tr}I_m
=P-\frac1m.
$$

非負性と左側の等号条件は[エントロピー最大値](../QINF17/index.md#thm-qinf17-entropy-bounds)で確定します。$\ln t=t-1$ は $t=1$ のときだけなので、右辺でも等号となるのはすべての正の固有値が $1/m$ で、正規化からそれが $m$ 個ある場合、すなわち $\rho=I_m/m$ です。
<!-- proof-end -->

## 5. Haar平均に適用する：Page型の上下界

前講で出発点から証明した[二部系の平均purity](../QINF31/index.md#thm-qinf31-average-purity)は、$m\le n$ と書き直すと

$$
\mathbb E P(\rho)=\frac{m+n}{mn+1}.
$$

各状態で成り立つ[挟み撃ち補題](#lem-qinf32-entropy-sandwich)は平均しても使えます。ただし $S_2=-\log_2P$ の期待値を $-\log_2\mathbb EP$ と**等置してはいけません**。第3節と同じ $\ln t\le t-1$ を確率変数 $P$ に適用すると、平均と対数の正しい不等号の向きが求まります。

<a id="thm-qinf32-page-type-mean"></a>

<!-- formal-statement-start -->
> **定理（Haar部分系のPage型平均評価）**
>
> $m,n$ を整数 $1\le m\le n$ とし、$\mathbb C^m\otimes\mathbb C^n$ のHaarランダム純粋状態の$m$ 次元側縮約状態を $\rho$ とする。このとき

$$
\boxed{\log_2\frac{mn+1}{m+n}
\ \le\ \mathbb E S_2(\rho)
\ \le\ \mathbb E S(\rho)
\ \le\ \log_2m}.
$$

> さらに平均エントロピー欠損は

$$
0\le\mathbb E\Delta_m(\rho)
\le\log_2\frac{m(m+n)}{mn+1}
\le\frac{m^2-1}{(mn+1)\ln2}.
$$

> 特に $m$ を固定して $n\to\infty$ とすると $\mathbb ES(\rho)\to\log_2m$。
<!-- formal-statement-end -->

### 証明の見取り図

標本ごとの $S\ge S_2$ に加えて、対数の接線不等式 $\ln t\le t-1$ を平均purityで規格化して使います。欠損界は引き算と $\log_2(1+x)\le x/\ln2$ の二段で得ます。ここで示すのは平均エントロピーの**評価**で、厳密な平均値そのものではありません。

<!-- proof-start -->
### 証明

$P=P(\rho)\in[1/m,1]$ なので $-\log_2P$ は可積分です。$a=\mathbb EP>0$ とおき、$\ln(P/a)\le P/a-1$ を標本ごとに用いて期待値を取ると

$$
\mathbb E\ln(P/a)
\le\mathbb E(P/a-1)
=\frac{\mathbb EP}{a}-1=0.
$$

従って、$a=\mathbb EP=(m+n)/(mn+1)$ を戻せば

$$
\mathbb ES_2=-\frac{\mathbb E\ln P}{\ln2}
\ge-\frac{\ln a}{\ln2}
=\log_2\frac{mn+1}{m+n}.
$$

各標本で[補題](#lem-qinf32-entropy-sandwich)の $S_2\le S\le\log_2m$ が成り立つため、期待値を取って最初の鎖を得ます。$\Delta_m=\log_2m-S$ の定義から

$$
\mathbb E\Delta_m
=\log_2m-\mathbb ES
\le\log_2m-\log_2\frac{mn+1}{m+n}
=\log_2\frac{m(m+n)}{mn+1}.
$$

分子を分母に揃えると

$$
\frac{m(m+n)}{mn+1}
=1+\frac{m^2-1}{mn+1}.
$$

$x\ge0$ に対する $\ln(1+x)\le x$ を使って右の欠損界が従います。この線形の界は、[偏差界](#prop-qinf32-deficit-purity)を平均して $\mathbb E P=(m+n)/(mn+1)$ を代入しても得られます。

$m$ 固定なら右辺 $(m^2-1)/[(mn+1)\ln2]\to0$。欠損は非負なので平均欠損も0へ収束し、平均エントロピーは $\log_2m$ に収束します。
<!-- proof-end -->

**手計算できる例**。$m=n=2$ では $\mathbb EP=4/5$ なので

$$
\log_2\frac54\le\mathbb ES(\rho)\le1.
$$

$m=2,n=8$ なら $\mathbb EP=10/17$ なので $\log_2(17/10)\le\mathbb ES(\rho)\le1$ です。環境側が大きくなるほど下界が上がります。ただし、これらは平均値の挟み撃ちであって、すべての標本がその範囲内に入るという主張ではありません。

## 6. 平均だけでなく「多くの状態」を評価する

平均が大きいだけでは、例外的な低エントロピー状態がどれくらいあるのか分かりません。欠損がしきい値 $\varepsilon>0$ 以上になる確率を考えます。前講の[Markov不等式による偏差評価](../QINF31/index.md#prop-qinf31-typicality)を、エントロピーの条件へ変換するのが次の結果です。

<a id="thm-qinf32-entropy-tail"></a>

<!-- formal-statement-start -->
> **定理（エントロピー欠損の確率評価）**
>
> 前定理と同じHaar模型で、任意の $\varepsilon>0$ に対して

$$
\Pr\{\Delta_m(\rho)\ge\varepsilon\}
\le\min\left\{1,\frac{m^2-1}{(mn+1)(2^\varepsilon-1)}\right\}.
$$

> とくに固定 $m$ と固定 $\varepsilon>0$ に対し、$n\to\infty$ では右辺は0へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

$S\ge S_2$ のため、エントロピーが小さいならpurityは一定以上に大きいはずです。その事象を非負確率変数 $P-1/m$ の超過事象に変え、平均purityへMarkov不等式を適用します。

<!-- proof-start -->
### 証明

$\Delta_m\ge\varepsilon$ なら $S\le\log_2m-\varepsilon$。[挟み撃ち補題](#lem-qinf32-entropy-sandwich)で $S_2\le S$ なので

$$
-\log_2P=S_2
\le\log_2m-\varepsilon
\quad\Longrightarrow\quad
P\ge\frac{2^\varepsilon}{m}.
$$

従って $X=P-1/m\ge0$ は、この事象上で $X\ge(2^\varepsilon-1)/m$ を満たします。[前講の平均purity](../QINF31/index.md#thm-qinf31-average-purity)により

$$
\mathbb EX
=\frac{m+n}{mn+1}-\frac1m
=\frac{m^2-1}{m(mn+1)}.
$$

非負で有界な確率変数 $X$ と $t>0$ には[Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)が適用でき、$\mathbb EX\ge t\Pr(X\ge t)$ です。$t=(2^\varepsilon-1)/m>0$ を代入して

$$
\Pr(\Delta_m\ge\varepsilon)
\le\frac{\mathbb EX}{t}
=\frac{m^2-1}{(mn+1)(2^\varepsilon-1)}.
$$

確率は常に1以下なので $\min$ を付けられます。固定 $m,\varepsilon$ では分母が $n$ とともに増加し、結論が従います。
<!-- proof-end -->

この界は安全な**上界**であり、実際の低エントロピー状態の頻度そのものではありません。特に $m=n\to\infty$ では上界が0になるとは限りません。固定した小さな部分系に対して環境を大きくする極限と、両方の系を大きくする極限は分ける必要があります。

## 7. Pageの厳密平均式と、ここまでの証明範囲

もっと精密な基準があります。自然対数で平均エントロピーを表したPageの1993年の予想は、その後厳密に証明されました。$H_k=\sum_{j=1}^k1/j$ を第 $k$ 調和数とすると、$1\le m\le n$ のHaar純粋状態に対し、**文献上の厳密な平均式**は

$$
\boxed{\mathbb ES(\rho)
=\frac{H_{mn}-H_n-\dfrac{m-1}{2n}}{\ln2}}
\qquad\text{（bit単位）}.
$$

出典は [D. N. Page, *Average Entropy of a Subsystem* (1993)](https://arxiv.org/abs/gr-qc/9305007) と、証明を与えた [S. Sen, *Average Entropy of a Subsystem* (1996)](https://arxiv.org/abs/hep-th/9601132) です。Page原論文の記述は**予想**であって原論文単独の定理ではないことに注意してください。

**本講で証明した範囲**は、purityとエントロピーの関係、平均の上下界、欠損の上界・確率界までです。上の調和数の等式を導くには、誘導された縮約状態の固有値の同時分布など追加の積分計算が必要であり、本講ではそれを証明したとは扱いません。以下ではこの式を**外部の証明済み結果による数値検算の基準**として使います。

$m=n=2$ の式は手で確認できます。$H_4-H_2=1/3+1/4=7/12$ なので

$$
\mathbb ES(\rho)
=\frac{7/12-1/4}{\ln2}
=\frac1{3\ln2}
\simeq0.480898\ \text{bit}.
$$

前節までに自分で証明した下界 $\log_2(5/4)\simeq0.321928$ と上界1の間に確かに入ります。

また調和数の漸近展開 $H_k=\ln k+\gamma+1/(2k)+O(k^{-2})$ にこの文献式を代入すると、$1\ll m\le n$ の範囲で

$$
\mathbb ES(\rho)
=\log_2m-\frac{m}{2n\ln2}
+O\!\left(\frac1{mn}+\frac1{n^2}\right)
$$

となります。等次元 $m=n\to\infty$ では平均欠損が約 $1/(2\ln2)\simeq0.7213$ bitで、固定 $m$ で $n\to\infty$ のときの欠損0とは異なります。この漸近式も引用した厳密式に依存した帰結で、purityの平均だけから得た結論ではありません。

## 8. 数値実験：標本平均・標準誤差・厳密式

前講と同じく、独立な複素標準Gaussian係数 $g_{ia}$ を $mn$ 個生成します。添字 $1\le i\le m$ は小さい部分系、$1\le a\le n$ は環境側の正規直交基底を走ります。全系の振幅は

$$
Z=\sum_{k=1}^m\sum_{b=1}^n|g_{kb}|^2,
\qquad \psi_{ia}=\frac{g_{ia}}{\sqrt Z}
$$

と正規化します。全係数が同時に0となる確率は0なので、$Z>0$ がほとんど確実に成り立ちます。これでHaar純粋状態を得ます。

[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)で環境側の同じ添字 $a$ を足すと、縮約状態の行列成分は

$$
\rho_{ij}=\sum_{a=1}^n\psi_{ia}\overline{\psi_{ja}}
=\sum_{a=1}^n\frac{g_{ia}\overline{g_{ja}}}{Z}
$$

です。これを対角化し、各標本の $P$、$S_2$、$S$ を求めます。付属の [page-entropy-sampling.mjs](assets/page-entropy-sampling.mjs) は標本数・乱数種を固定し、平均・標本標準誤差・理論値をJSONで出力します。

実行例（リポジトリのルートから）：

~~~sh
node textbook/volumes/dream_thater/応用系/QINF/QINF32/assets/page-entropy-sampling.mjs 2 8 10000 314159
~~~

出力の $S$ の標準誤差は、独立標本の不偏標本分散 $s_S^2$ から $\mathrm{SE}=s_S/\sqrt N$ と推定したものです。これは標本平均の揺らぎの**推定尺度**であって、$2\mathrm{SE}$ 以内に真値が必ず入るという保証ではありません。固有値の数値誤差と標本誤差も異なります。出力の $S$ の理論基準は第7節の文献式、$P$ の理論基準は前講で証明した式です。

比較するときは、$m=2$ のまま $n=2,8,32$ と増やす場合と、$m=n=2,4,8$ と同時に増やす場合を分けてください。前者の平均エントロピーは1 bitへ近づき、後者では**最大値からの差**がゼロへ消えるとは限りません。

## 9. 演習と詳細解答

<a id="ex-qinf32-a01"></a>

### 演習 A1：二種類のエントロピーを計算する

- Level: A
- 問題: $\rho=\operatorname{diag}(3/4,1/4)$ についてpurity、Rényi-2エントロピー、von Neumannエントロピーを求め、大小関係を確認してください。

<!-- solution-start -->
**詳細解答**。$\rho$ は非負固有値 $3/4,1/4$ を持ち和が1なので密度演算子です。

$$
P=(3/4)^2+(1/4)^2=5/8,\qquad
S_2=-\log_2(5/8)=\log_2(8/5).
$$

一方

$$
S=-\frac34\log_2\frac34-\frac14\log_2\frac14
=2-\frac34\log_2 3.
$$

$S_2\simeq0.678072$、$S\simeq0.811278$ なので $S_2<S<1$ です。固有値が等しくないので[挟み撃ち補題](#lem-qinf32-entropy-sandwich)の等号は成立しません。
<!-- solution-end -->

<a id="ex-qinf32-a02"></a>

### 演習 A2：等号がいつ成り立つか

- Level: A
- 問題: $m=3$ の最大混合状態 $I_3/3$ と純粋状態 $\operatorname{diag}(1,0,0)$ に対し、$S_2,S,\Delta_3$ を計算してください。

<!-- solution-start -->
**詳細解答**。最大混合の固有値は3個とも $1/3$。従って $P=3(1/3)^2=1/3$、

$$
S_2=\log_23,\qquad
S=-3\cdot\frac13\log_2\frac13=\log_23,\qquad
\Delta_3=0.
$$

純粋状態の固有値は $(1,0,0)$ で、$P=1$、$S_2=0$、$S=0$、$\Delta_3=\log_23$ です。後者は $S_2=S$ ですが、$S=\log_23$ ではありません。非零固有値が等しいことと、全3次元で最大混合であることは異なります。
<!-- solution-end -->

<a id="ex-qinf32-a03"></a>

### 演習 A3：2×2の平均界

- Level: A
- 問題: $m=n=2$ のHaar二部純粋状態に対し、平均purityと平均エントロピーの上下界を導いてください。

<!-- solution-start -->
**詳細解答**。[前講の平均purity](../QINF31/index.md#thm-qinf31-average-purity)へ $m=n=2$ を代入すると

$$
\mathbb EP=\frac{2+2}{2\cdot2+1}=\frac45.
$$

[purityとエントロピーの挟み撃ち](#lem-qinf32-entropy-sandwich)により、各状態で $S\ge-\log_2P$ です。$a=\mathbb EP=4/5$ とおき、$\ln(P/a)\le P/a-1$ を平均すると $\mathbb E\ln P\le\ln a$ なので、

$$
\mathbb ES\ge-\log_2\mathbb EP
=-\log_2(4/5)=\log_2(5/4).
$$

上界は次元2の[エントロピー上界](../QINF17/index.md#thm-qinf17-entropy-bounds)の平均から1です。従って $\log_2(5/4)\le\mathbb ES\le1$ です。
<!-- solution-end -->

<a id="ex-qinf32-a04"></a>

### 演習 A4：次元1の境界を忘れない

- Level: A
- 問題: $m=1,n\ge1$ のHaar模型で $\rho$、$P$、$S_2$、$S$、欠損界、確率界をすべて確かめてください。

<!-- solution-start -->
**詳細解答**。一次元の密度演算子は $\rho=(1)$ のみです。固有値は1なので

$$
P=1,\qquad S_2=-\log_2 1=0,\qquad
S=0,\qquad \Delta_1=\log_2 1-S=0.
$$

[平均評価](#thm-qinf32-page-type-mean)の上下界と欠損の上界はそれぞれ

$$
\log_2\frac{n+1}{n+1}=0\le\mathbb ES\le\log_2 1=0,
\qquad
0\le\mathbb E\Delta_1\le\frac{1^2-1}{(n+1)\ln2}=0.
$$

任意の $\varepsilon>0$ で $\Delta_1=0$ だから $\Pr(\Delta_1\ge\varepsilon)=0$ です。[確率界](#thm-qinf32-entropy-tail)の右辺も分子が $1^2-1=0$ なので0になります。境界の場合にもすべての式は整合しています。
<!-- solution-end -->

<a id="ex-qinf32-b01"></a>

### 演習 B1：非一様な三値スペクトル

- Level: B
- 問題: $m=3$、固有値 $(1/2,1/4,1/4)$ の状態で $S_2,S,\Delta_3$ と[二次偏差界](#prop-qinf32-deficit-purity)の右辺を計算し、等号条件を調べてください。

<!-- solution-start -->
**詳細解答**。固有値は非負、和は1です。purityとRényi-2エントロピーは

$$
P=\frac14+\frac1{16}+\frac1{16}=\frac38,\qquad
S_2=\log_2\frac83.
$$

von Neumannエントロピーは

$$
S=-\frac12\log_2\frac12
-2\cdot\frac14\log_2\frac14
=\frac12+1=\frac32.
$$

従って $\Delta_3=\log_23-3/2$ です。偏差界の右辺は

$$
\frac{mP-1}{\ln2}
=\frac{3\cdot3/8-1}{\ln2}
=\frac1{8\ln2}.
$$

$S_2=\log_2(8/3)\simeq1.4150<3/2$ です。また $\Delta_3\simeq0.0850$ に対し二次偏差界は $1/(8\ln2)\simeq0.1803$ なので、$0<\Delta_3<1/(8\ln2)$ を数値でも確認できます。固有値が全て等しくないので前者の等号は成立せず、状態が $I_3/3$ でないので後者の等号も成立しません。
<!-- solution-end -->

<a id="ex-qinf32-b02"></a>

### 演習 B2：低エントロピーの確率はどこまで小さいか

- Level: B
- 問題: $m=2,n=20$ で、エントロピーが最大値から少なくとも $1/2$ bit不足する確率を[確率界](#thm-qinf32-entropy-tail)から求めてください。上界と実際の確率の違いも説明してください。

<!-- solution-start -->
**詳細解答**。$\varepsilon=1/2$ だから $2^\varepsilon-1=\sqrt2-1$ です。公式に代入すると

$$
\Pr(\Delta_2\ge1/2)
\le\frac{2^2-1}{(2\cdot20+1)(\sqrt2-1)}
=\frac{3}{41(\sqrt2-1)}
\simeq0.1766.
$$

これは全体の約17.7%以下という**保証**であり、17.7%の標本が必ず不足する意味ではありません。[証明](#thm-qinf32-entropy-tail)は事象をpurityの大きさで覆い、さらにMarkov不等式で評価しているため、両段階で余裕が生じ得ます。
<!-- solution-end -->

<a id="ex-qinf32-b03"></a>

### 演習 B3：文献式と自力で証明した界を区別する

- Level: B
- 問題: $m=n=2$ でPageの厳密平均式を調和数から求め、purity由来の下界と上界の間に入ることを検算してください。また、なぜ同じ方法で等式までは証明できないか説明してください。

<!-- solution-start -->
**詳細解答**。第7節で紹介した文献式は

$$
\mathbb ES=\frac{H_4-H_2-(2-1)/(2\cdot2)}{\ln2}.
$$

$H_4-H_2=1/3+1/4=7/12$ を代入して

$$
\mathbb ES=\frac{7/12-1/4}{\ln2}
=\frac1{3\ln2}\simeq0.480898.
$$

一方、[本講で証明した平均評価](#thm-qinf32-page-type-mean)は

$$
\log_2\frac54\simeq0.321928
\le0.480898\le1.
$$

[第5節で証明した評価](#thm-qinf32-page-type-mean)から分かるのは $\mathbb E[-\log_2P]\ge-\log_2(\mathbb EP)$ という向きだけです。加えて $S(\rho)$ は一般にはpurityだけで一意には決まりません。実際、3次元の二つのスペクトル

$$
\left(\frac12,\frac12,0\right),\qquad
\left(\frac23,\frac16,\frac16\right)
$$

はどちらもpurity $1/2$ ですが、前者のエントロピーは1 bit、後者は

$$
-\frac23\log_2\frac23-\frac13\log_2\frac16
=\frac13\log_2\frac{27}{2}\simeq1.2516>1
$$

となり、1 bitを上回ります。従って平均purity一つから文献式の等号は導けず、縮約状態の固有値分布について追加情報が必要です。
<!-- solution-end -->

<a id="ex-qinf32-b04"></a>

### 演習 B4：固定した部分系で環境を大きくする

- Level: B
- 問題: 整数 $m\ge1$ を固定し、$n\ge m$ が増えるとき、[平均評価](#thm-qinf32-page-type-mean)の下界 $L_m(n)=\log_2[(mn+1)/(m+n)]$ が単調非減少であることを示してください。さらに確率界の $n$ 依存性を求めてください。

<!-- solution-start -->
**詳細解答**。まず対数内の比を $f_m(n)=(mn+1)/(m+n)$ とおき、$n$ を正の実変数に拡張して微分します。

$$
f_m'(n)
=\frac{m(m+n)-(mn+1)}{(m+n)^2}
=\frac{m^2-1}{(m+n)^2}\ge0.
$$

$\log_2$ は増加関数なので $L_m(n)$ も単調非減少です。$m=1$ では定数0、$m>1$ では狭義増加です。また $f_m(n)\to m$ より $L_m(n)\to\log_2m$。

欠損 $\varepsilon>0$ を固定した[確率界](#thm-qinf32-entropy-tail)の非自明な側は $(m^2-1)/[(mn+1)(2^\varepsilon-1)]$ で、$m>1$ なら $n$ の増加に対し $O(1/n)$ です。$m=1$ では恒等的に0。これは固定部分系の極限であり、$m=n$ と増える場合には同じ結論を流用できません。
<!-- solution-end -->

<a id="ex-qinf32-c01"></a>

### 演習 C1：総次元16で分割を入れ替える

- Level: C
- 問題: 全系の次元を16に固定し、Haar純粋状態の二部系分割を $(d_A,d_B)=(1,16),(2,8),(4,4),(8,2)$ とします。

1. 各分割の平均purityと平均エントロピーの厳密な上下界を求めてください。
2. 第7節のPageの文献式から得る平均値を調和数で表し、入れ替え対称性を確かめてください。
3. この比較が、具体的な量子時間発展におけるエントロピーの時間曲線を証明するわけではない理由を述べてください。

<!-- solution-start -->
**詳細解答**。$m=\min(d_A,d_B)$、$n=\max(d_A,d_B)$ とすると $mn=16$ は共通です。[平均purity](../QINF31/index.md#thm-qinf31-average-purity)と[平均評価](#thm-qinf32-page-type-mean)から

$$
\mathbb EP=\frac{m+n}{17},\qquad
\log_2\frac{17}{m+n}\le\mathbb ES\le\log_2m.
$$

各分割の結果は次の通りです。

| 分割 | $(m,n)$ | $\mathbb EP$ | $\mathbb ES$ の下界 | 上界 |
|---|---|---|---|---|
| $1\times16$ | $(1,16)$ | $1$ | $0$ | $0$ |
| $2\times8$ | $(2,8)$ | $10/17$ | $\log_2(17/10)$ | $1$ |
| $4\times4$ | $(4,4)$ | $8/17$ | $\log_2(17/8)$ | $2$ |
| $8\times2$ | $(2,8)$ | $10/17$ | $\log_2(17/10)$ | $1$ |

Pageの文献式（本講の証明済み界とは区別する）によれば、それぞれの平均値は

$$
\begin{aligned}
E_{1,16}&=0,\\
E_{2,8}&=\frac{H_{16}-H_8-1/16}{\ln2},\\
E_{4,4}&=\frac{H_{16}-H_4-3/8}{\ln2},\\
E_{8,2}&=E_{2,8}.
\end{aligned}
$$

最後の等号は、[Schmidt分解による非零固有値の一致](../QINF6/index.md#thm-qinf6-reduced-spectrum)により、各Haar標本の $S(\rho_A)=S(\rho_B)$ が成り立つためです。これは平均を取る前から成立します。

最後に、ここで変えているのは**同じ総次元のHilbert空間の分割**であって時刻ではありません。与えられたHamiltonianと初期状態がHaar分布の標本を生成することも、分割が時間とともに変わることも示していません。可逆発展と情報収支の模型を作るには、別途その物理的・動力学的仮定が必要です。
<!-- solution-end -->

## 10. 次講への橋

本講で得た、証明済みの中心結果は「Haarランダム純粋状態の小さい部分系の平均エントロピーには具体的な上下界があり、固定した部分系に対して環境が大きくなると、最大混合に近い状態が高確率で現れる」ということです。より精密なPageの厳密平均式は、証明を明示した文献に基づく比較基準として使いました。

次のQINF33では、**分割の次元を変える図**と**時間とともに状態が変わる物理模型**を混同せず、全体の可逆性と部分系のエントロピー増加・情報の移動を有限次元で追います。
