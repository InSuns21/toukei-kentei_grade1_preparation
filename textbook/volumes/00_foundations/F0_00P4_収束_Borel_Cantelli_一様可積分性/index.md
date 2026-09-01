# F0-00P4 確率変数列の収束・Borel--Cantelli・一様可積分性

通常教材P4-02では、概収束・確率収束・分布収束を定義して使います。

この補講では、特に概収束を

> 悪い事象が無限回起こるか

という問題へ変換します。

その中心がBorel--Cantelliの補題です。

---

## 1. 事象のlimsup

事象列 $A_1,A_2,\dots$ に対して

$$
\limsup_{n\to\infty}A_n
=
\bigcap_{m=1}^{\infty}
\bigcup_{n\ge m}A_n
$$

と定義します。

これは

$$
\boxed{A_n\text{ が無限回起こる事象}}
$$

です。

英語では infinitely often、略して i.o. と書きます。

ある $\omega$ が $\limsup A_n$ に入るとは、どれだけ先へ進んでも、その後に $A_n$ がまた起こることを意味します。

---

## 2. liminf

同様に

$$
\liminf_{n\to\infty}A_n
=
\bigcup_{m=1}^{\infty}
\bigcap_{n\ge m}A_n
$$

です。

これは

> ある時点以降ずっと $A_n$ が起こる

という事象です。

P1-01で出てきた上極限・下極限事象が、ここで確率変数列の収束に直接使われます。

---

## 3. a.s.収束をlimsupで読む

$X_n\to X$ a.s. とは

$$
P\{\omega:X_n(\omega)\to X(\omega)\}=1
$$

でした。

固定した $\varepsilon>0$ に対して

$$
A_n^{(\varepsilon)}
=\{|X_n-X|>\varepsilon\}
$$

と置きます。

$X_n(\omega)\to X(\omega)$ なら、各 $\varepsilon>0$ について大きなずれは有限回しか起きません。

したがって

$$
\boxed{
X_n\to X\ \text{a.s.}
\Longleftrightarrow
P(A_n^{(1/k)}\ \text{i.o.})=0
\quad(k=1,2,\dots)
}
$$

です。

概収束は「各標本点で極限を取る」という定義ですが、確率論的には

> 誤差が一定以上になる事象が無限回起こらない

という形に翻訳できます。

---

## 4. Borel--Cantelli第1補題

事象列 $A_n$ が

$$
\sum_{n=1}^{\infty}P(A_n)<\infty
$$

を満たすなら

$$
\boxed{
P(A_n\ \text{i.o.})=0
}
$$

です。

独立性は不要です。

### 証明

任意の $m$ について

$$
\{A_n\ \text{i.o.}\}
\subset
\bigcup_{n\ge m}A_n.
$$

したがってunion boundから

$$
P(A_n\ \text{i.o.})
\le
\sum_{n\ge m}P(A_n).
$$

級数が収束するので右辺は $m\to\infty$ で0です。

よって結論が従います。

非常に短い証明ですが、強大数則などで中心的に使います。

---

## 5. 第1補題の典型的な使い方

もし

$$
\sum_n
P(|X_n-X|>\varepsilon)<\infty
$$

がすべての $\varepsilon>0$ について成り立てば、Borel--Cantelliから

$$
|X_n-X|>\varepsilon
$$

は有限回しか起こりません。

したがって

$$
\boxed{X_n\to X\quad\text{a.s.}}
$$

です。

確率収束では各確率が0へ行けば十分でしたが、a.s.収束を直接出すには**確率の総和が有限**という強い評価が役立ちます。

---

## 6. Borel--Cantelli第2補題

$A_n$ が独立で

$$
\sum_{n=1}^{\infty}P(A_n)=\infty
$$

なら

$$
\boxed{
P(A_n\ \text{i.o.})=1
}
$$

です。

第1補題と合わせると、独立な事象列では級数

$$
\sum P(A_n)
$$

の収束・発散が「無限回起こるか」をほぼ完全に決めます。

### 証明の骨格

独立性から

$$
P\left(\bigcap_{n=m}^{N}A_n^c\right)
=
\prod_{n=m}^{N}(1-P(A_n)).
$$

不等式

$$
1-x\le e^{-x}
$$

を使えば

$$
P\left(\bigcap_{n=m}^{N}A_n^c\right)
\le
\exp\left(-\sum_{n=m}^{N}P(A_n)\right).
$$

級数が発散するので $N\to\infty$ で0になります。

つまり、どの時点 $m$ 以降にも少なくとも一度は $A_n$ が起きる確率が1であり、結局無限回起きます。

---

## 7. a.s.収束なら確率収束

$X_n\to X$ a.s. とします。

固定した $\varepsilon>0$ について

$$
1_{\{|X_n-X|>\varepsilon\}}
\to0
\qquad\text{a.s.}
$$

です。

指示関数は常に1以下なので優収束定理から

$$
E[1_{\{|X_n-X|>\varepsilon\}}]
\to0.
$$

左辺は

$$
P(|X_n-X|>\varepsilon)
$$

です。

したがって

$$
\boxed{
X_n\xrightarrow{a.s.}X
\Longrightarrow
X_n\xrightarrow{p}X
}
$$

です。

ここでも測度論の収束定理が確率論の収束関係を支えています。

---

## 8. Lp収束なら確率収束

$p>0$ とし

$$
E|X_n-X|^p\to0
$$

とします。

Markov不等式から

$$
P(|X_n-X|>\varepsilon)
\le
\frac{E|X_n-X|^p}{\varepsilon^p}
\to0.
$$

よって

$$
\boxed{
X_n\xrightarrow{L^p}X
\Longrightarrow
X_n\xrightarrow{p}X
}
$$

です。

特に平均二乗収束 $L^2$ は確率収束を含意します。

---

## 9. 確率収束だけでは期待値は収束しない

例として

$$
X_n=
\begin{cases}
n,&\text{確率 }1/n,\\
0,&\text{確率 }1-1/n
\end{cases}
$$

とします。

任意の $\varepsilon>0$ について

$$
P(|X_n|>\varepsilon)=\frac1n\to0
$$

なので

$$
X_n\xrightarrow{p}0.
$$

しかし

$$
E[X_n]=1
$$

なので

$$
E[X_n]\not\to0.
$$

「まれだが巨大な値」が期待値を持ち続けています。

---

## 10. 一様可積分性

確率変数族 $\{X_n\}$ が一様可積分であるとは

$$
\boxed{
\lim_{K\to\infty}
\sup_n
E\left[|X_n|1_{\{|X_n|>K\}}\right]
=0
}
$$

となることです。

直感的には

> どの $n$ でも、極端に大きい値が期待値へ寄与する量を一様に小さくできる

という条件です。

前節の反例は一様可積分ではありません。

---

## 11. Vitali型の収束定理

$X_n\to X$ in probability かつ $\{X_n\}$ が一様可積分なら

$$
\boxed{
E|X_n-X|\to0
}
$$

です。

したがって

$$
E[X_n]\to E[X]
$$

も従います。

この結果は、確率収束と期待値収束の間に何が不足していたかを明確にします。

不足していたのは「尾部を一様に制御する条件」です。

---

## 12. 一様可積分性の便利な十分条件

ある $\delta>0$ について

$$
\sup_n E|X_n|^{1+\delta}<\infty
$$

なら $\{X_n\}$ は一様可積分です。

実際 $|X_n|>K$ 上では

$$
|X_n|
\le
\frac{|X_n|^{1+\delta}}{K^\delta}
$$

なので

$$
E[|X_n|1_{\{|X_n|>K\}}]
\le
\frac{E|X_n|^{1+\delta}}{K^\delta}.
$$

右辺を $n$ について一様に抑えられます。

---

## 13. 優収束定理との関係

もし

$$
|X_n|\le Y,
\qquad E|Y|<\infty
$$

なら $\{X_n\}$ は一様可積分です。

したがって優収束定理は、尾部を一つの可積分関数 $Y$ で非常に強く制御している場合とみなせます。

一様可積分性はそれより柔軟です。

漸近統計では「各 $X_n$ を同じ $Y$ で点ごとに支配する」のが難しくても、一様可積分性なら期待値交換を示せる場面があります。

---

## 14. 収束概念の地図

一般に

$$
X_n\xrightarrow{a.s.}X
\Longrightarrow
X_n\xrightarrow{p}X
\Longrightarrow
X_n\xrightarrow{d}X.
$$

また

$$
X_n\xrightarrow{L^p}X
\Longrightarrow
X_n\xrightarrow{p}X.
$$

一方、期待値の収束には

$$
\text{確率収束}
+\text{一様可積分性}
$$

のような追加条件が必要です。

次章ではBorel--Cantelliと最大不等式を使って、大数の強法則を証明します。

---

## 章末チェック

- limsup事象を「無限回起こる」と読める。
- a.s.収束を誤差事象のlimsupで表せる。
- Borel--Cantelli第1・第2補題の違いを説明できる。
- 第1補題をunion boundから証明できる。
- a.s.収束から確率収束を優収束定理で導ける。
- Lp収束から確率収束をMarkov不等式で導ける。
- 確率収束しても期待値が収束しない例を説明できる。
- 一様可積分性の意味とVitali型定理の役割を説明できる。
