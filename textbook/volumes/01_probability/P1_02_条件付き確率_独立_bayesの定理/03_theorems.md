# 基本命題と主要定理

## P1-THM-05 乗法公式と連鎖律

$P(B)>0$ なら、条件付き確率の定義を変形して

$$
P(A\cap B)=P(A\mid B)P(B)
$$

を得ます。また $P(A_1\cap\cdots\cap A_{k-1})>0$ が $k=2,\ldots,n$ で成り立つなら

$$
P\left(\bigcap_{i=1}^nA_i\right)
=P(A_1)\prod_{k=2}^n
P\left(A_k\mathrel{\middle|}\bigcap_{i=1}^{k-1}A_i\right).
$$

### 証明

$C_k=\bigcap_{i=1}^kA_i$ とおきます。$C_k=C_{k-1}\cap A_k$ なので、二事象の乗法公式から

$$
P(C_k)=P(A_k\mid C_{k-1})P(C_{k-1}).
$$

$k=n,n-1,\ldots,2$ と順に代入すると

$$
P(C_n)=P(A_n\mid C_{n-1})\cdots P(A_2\mid C_1)P(A_1),
$$

となり、連鎖律を得ます。

## P1-THM-06 全確率公式

$H_1,\ldots,H_m$ を $\Omega$ の分割とし、各 $P(H_i)>0$ とします。任意の事象 $B$ について

$$
P(B)=\sum_{i=1}^mP(B\mid H_i)P(H_i)
$$

です。

### 証明

$H_i$ が全体を尽くすので

$$
B=B\cap\Omega
=B\cap\left(\bigcup_{i=1}^mH_i\right)
=\bigcup_{i=1}^m(B\cap H_i).
$$

$H_i$ が互いに排反だから $B\cap H_i$ も互いに排反です。有限加法性と乗法公式により

$$
P(B)=\sum_{i=1}^mP(B\cap H_i)
=\sum_{i=1}^mP(B\mid H_i)P(H_i).
$$

## P1-THM-07 Bayesの定理

P1-THM-06と同じ仮定の下で、さらに $P(B)>0$ とします。このとき

$$
P(H_j\mid B)
=\frac{P(B\mid H_j)P(H_j)}
{\sum_{i=1}^mP(B\mid H_i)P(H_i)}.
$$

### 証明

条件付き確率と乗法公式から

$$
P(H_j\mid B)
=\frac{P(H_j\cap B)}{P(B)}
=\frac{P(B\mid H_j)P(H_j)}{P(B)}.
$$

分母 $P(B)$ に全確率公式を代入すれば結論を得ます。分子は「経路 $H_j$ を通って観測 $B$ が生じる同時確率」、分母は「全経路から観測 $B$ が生じる周辺確率」です。

## P1-THM-06A 条件付き全確率公式

$P(C)>0$ とし、$H_1,\ldots,H_m$ を分割とします。各 $P(C\cap H_i)>0$ なら

$$
P(B\mid C)=\sum_{i=1}^mP(B\mid C,H_i)P(H_i\mid C)
$$

です。$B\cap C$ は互いに排反な $B\cap C\cap H_i$ の和なので

$$
\begin{aligned}
P(B\mid C)
&=\sum_{i=1}^m\frac{P(B\cap C\cap H_i)}{P(C)}\\
&=\sum_{i=1}^m
\frac{P(B\cap C\cap H_i)}{P(C\cap H_i)}
\frac{P(C\cap H_i)}{P(C)}\\
&=\sum_{i=1}^mP(B\mid C,H_i)P(H_i\mid C).
\end{aligned}
$$

これは観測 $C$ の後で、$H_i$ の重みを事前確率から事後確率へ更新した全確率公式です。

## P1-THM-08 独立性と補事象

$A$ と $B$ が独立なら、$A^c$ と $B$、$A$ と $B^c$、$A^c$ と $B^c$ もそれぞれ独立です。

### 証明

$B=(A\cap B)\sqcup(A^c\cap B)$ なので

$$
\begin{aligned}
P(A^c\cap B)
&=P(B)-P(A\cap B)\\
&=P(B)-P(A)P(B)\\
&=\{1-P(A)\}P(B)\\
&=P(A^c)P(B).
\end{aligned}
$$

よって $A^c$ と $B$ は独立です。同じ議論で $A$ と $B^c$ が独立です。最後に、その結果を $A^c$ と $B$ へ適用すれば $A^c$ と $B^c$ も独立です。
