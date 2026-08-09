# 定義と記法

以下では $(\Omega,\mathcal F,P)$ を確率空間とし、現れる集合はすべて $\mathcal F$ に属する事象とします。

## P1-DEF-05 条件付き確率

$P(B)>0$ のとき、$B$ が起きたという条件の下での $A$ の条件付き確率を

$$
P(A\mid B)\coloneqq\frac{P(A\cap B)}{P(B)}
$$

と定義します。縦線の右側が条件です。$P(B)=0$ なら、この比による $P(A\mid B)$ は定義できません。

固定した $B$ に対し、$A\mapsto P(A\mid B)$ は確率測度です。実際、$P(\Omega\mid B)=P(B)/P(B)=1$ です。また、互いに排反な $(A_n)$ に対し $(A_n\cap B)$ も互いに排反なので

$$
\begin{aligned}
P\left(\bigcup_{n=1}^{\infty}A_n\mathrel{\middle|}B\right)
&=\frac{P\left(\left(\bigcup_{n=1}^{\infty}A_n\right)\cap B\right)}{P(B)}\\
&=\frac{P\left(\bigcup_{n=1}^{\infty}(A_n\cap B)\right)}{P(B)}\\
&=\frac{\sum_{n=1}^{\infty}P(A_n\cap B)}{P(B)}
=\sum_{n=1}^{\infty}P(A_n\mid B).
\end{aligned}
$$

複数の事象をカンマで条件に書く場合は、共通部分を条件とする略記

$$
P(A\mid B,C)\coloneqq P(A\mid B\cap C)
$$

を用います。この記法も $P(B\cap C)>0$ のときに限り定義します。

## P1-DEF-06 二事象の独立

$A$ と $B$ が独立であるとは

$$
P(A\cap B)=P(A)P(B)
$$

が成り立つことです。$P(B)>0$ なら、これは $P(A\mid B)=P(A)$ と同値です。独立は「一方を知っても他方の確率が変わらない」ことを表します。

排反は $A\cap B=\varnothing$、独立は積公式です。$P(A)>0$, $P(B)>0$ の排反事象は、$0=P(A\cap B)\neq P(A)P(B)$ なので独立ではありません。

## P1-DEF-07 相互独立と対独立

$A_1,\ldots,A_m$ が相互独立であるとは、任意の $r=2,\ldots,m$ と任意の相異なる添字 $i_1,\ldots,i_r$ に対して

$$
P(A_{i_1}\cap\cdots\cap A_{i_r})
=\prod_{j=1}^{r}P(A_{i_j})
$$

が成り立つことです。$r=2$ の条件だけを満たす場合を対独立といいます。三事象では、対独立の三式に加えて三重積の式も確認して初めて相互独立です。

## P1-DEF-08 事象の分割

$H_1,\ldots,H_m$ が互いに排反で、$\bigcup_{i=1}^mH_i=\Omega$ であるとき、これらを $\Omega$ の有限分割と呼びます。Bayes計算では $P(H_i)>0$ も仮定します。

「どの母集団から来たか」「どの箱を選んだか」のように、観測前には不明だが必ずどれか一つが成立する事象を分割に選びます。
