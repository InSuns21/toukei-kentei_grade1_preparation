# F0-00P4 limsup・Borel–Cantelli・確率収束：無限回起こる事象を制御する

確率論では点列の極限だけでなく「悪い事象が無限回起こるか」を集合のlimsupで追います。

$$\boxed{\limsup_nA_n=\{A_n\text{ が無限回起こる}\}}$$

Borel--Cantelliを軸に、a.s.収束・確率収束・$L^p$収束の関係までを一講義にまとめます。期待値まで極限交換するための条件はP4Aへ分離します。

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

---

## 演習

### F0-00P4-A01 第一Borel–Cantelliを使う

- Level: A
- 目安時間: 10分

$P(A_n)\le 2^{-n}$ とする。$A_n$ が無限回起こる確率を求めよ。

<!-- solution-start -->
#### 詳細解答
$\sum_nP(A_n)\le\sum_n2^{-n}<\infty$。第一Borel--Cantelliより $P(A_n\ i.o.)=0$。独立性は不要。

#### 本番答案
$\sum P(A_n)<\infty$ なので第一Borel--Cantelliより $P(\limsup A_n)=0$。

#### 採点基準（20点）
- 級数収束: 6点
- BC適用: 8点
- limsup/i.o.解釈: 6点
<!-- solution-end -->

### F0-00P4-B01 確率収束からa.s.収束部分列を取る

- Level: B
- 目安時間: 15分

$X_n\to X$ in probability とする。$P(|X_{n_k}-X|>2^{-k})\le2^{-k}$ を満たす部分列を選び、$X_{n_k}\to X$ a.s.を示せ。

<!-- solution-start -->
#### 詳細解答
確率収束により各kでそのような $n_k$ を帰納的に選べる。確率の和が有限なので第一Borel--Cantelliより $|X_{n_k}-X|>2^{-k}$ は有限回しか起こらない。従って差はa.s.0へ行く。

#### 本番答案
部分列を $P(|X_{n_k}-X|>2^{-k})\le2^{-k}$ と取る。確率和が有限なのでBCより超過は有限回、よってa.s.収束。

#### 採点基準（20点）
- 部分列選択: 6点
- BC: 7点
- a.s.収束結論: 7点
<!-- solution-end -->

---

## 次に進む

確率収束だけでは期待値収束は保証されません。その不足を埋める [F0-00P4A 一様可積分性・Vitali](../F0_00P4A_一様可積分性_Vitali/index.md) へ進みます。
