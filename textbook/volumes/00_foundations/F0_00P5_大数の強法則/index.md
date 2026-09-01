# F0-00P5 大数の強法則：なぜ「確率1」で平均へ行くのか

通常教材P4-02では、独立同分布で

$$
E|X_1|<\infty
$$

なら

$$
\overline X_n\xrightarrow{a.s.}E[X_1]
$$

という強大数則を使います。

この章ではまず有限分散の場合を完全に証明し、その後で一般の有限平均版へどう拡張するかを見ます。

---

## 1. 弱大数則との違い

$X_1,X_2,\dots$ を独立同分布とし

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2<\infty
$$

とします。

標本平均

$$
\overline X_n
=\frac1n\sum_{i=1}^nX_i
$$

についてChebyshev不等式から

$$
P(|\overline X_n-\mu|>\varepsilon)
\le
\frac{\sigma^2}{n\varepsilon^2}
\to0.
$$

したがって

$$
\overline X_n\xrightarrow{p}\mu.
$$

これが有限分散版の弱大数則です。

しかし

$$
\sum_{n=1}^{\infty}
\frac{\sigma^2}{n\varepsilon^2}
=\infty
$$

なので、この評価をそのままBorel--Cantelli第1補題へ入れることはできません。

ここが強法則の最初の壁です。

---

## 2. 中心化する

$$
Y_i=X_i-\mu
$$

と置き

$$
S_n=\sum_{i=1}^nY_i
$$

とします。

すると

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=\sigma^2
$$

であり、示したいことは

$$
\boxed{
\frac{S_n}{n}\to0
\quad\text{a.s.}
}
$$

です。

---

## 3. Kolmogorov最大不等式

$Y_1,\dots,Y_n$ を独立、平均0、有限分散とし

$$
S_k=Y_1+\cdots+Y_k
$$

とします。

任意の $\lambda>0$ に対して

$$
\boxed{
P\left(
\max_{1\le k\le n}|S_k|\ge\lambda
\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
}
$$

です。

Chebyshev不等式が最後の時点 $S_n$ だけを見るのに対し、この不等式は途中の部分和すべてを一度に制御します。

---

## 4. 最大不等式の証明

初めて $\lambda$ を越える時刻で事象を分割します。

$$
A_k
=
\left\{
|S_1|<\lambda,\dots,|S_{k-1}|<\lambda,
|S_k|\ge\lambda
\right\}.
$$

$A_1,\dots,A_n$ は互いに排反で

$$
\bigcup_{k=1}^nA_k
=
\left\{\max_{j\le n}|S_j|\ge\lambda\right\}.
$$

$A_k$ は $Y_1,\dots,Y_k$ だけで決まり、未来の和

$$
S_n-S_k
$$

とは独立です。

さらに

$$
E[S_n-S_k]=0.
$$

したがって

$$
E[S_k(S_n-S_k)1_{A_k}]=0.
$$

よって

$$
\begin{aligned}
E[S_n^2 1_{A_k}]
&=E[(S_k+S_n-S_k)^2 1_{A_k}]\\
&\ge E[S_k^2 1_{A_k}]\\
&\ge \lambda^2P(A_k).
\end{aligned}
$$

$A_k$ は互いに排反なので足し合わせると

$$
E[S_n^2]
\ge
\lambda^2
P\left(\max_{k\le n}|S_k|\ge\lambda\right).
$$

$E[S_n]=0$ なので

$$
E[S_n^2]=\operatorname{Var}(S_n).
$$

これで最大不等式が出ました。

---

## 5. dyadic時点だけを見る

$n=2^m$ を考えます。

最大不等式に

$$
\lambda=\varepsilon 2^m
$$

を入れると

$$
\begin{aligned}
P\left(
\max_{k\le2^m}|S_k|
\ge\varepsilon2^m
\right)
&\le
\frac{\operatorname{Var}(S_{2^m})}
{\varepsilon^2 2^{2m}}\\
&=
\frac{2^m\sigma^2}
{\varepsilon^2 2^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^2 2^m}.
\end{aligned}
$$

右辺は $m$ について可算和可能です。

$$
\sum_{m=1}^{\infty}
\frac{\sigma^2}{\varepsilon^2 2^m}<\infty.
$$

---

## 6. Borel--Cantelliを使う

前章のBorel--Cantelli第1補題から

$$
\max_{k\le2^m}|S_k|
\ge\varepsilon2^m
$$

という事象はa.s.有限回しか起こりません。

したがって確率1で、十分大きな $m$ について

$$
\boxed{
\max_{k\le2^m}|S_k|
<\varepsilon2^m
}
$$

です。

ここでChebyshevだけでは発散した $1/n$ が、dyadic列 $2^m$ へまとめることで $2^{-m}$ になりました。

---

## 7. dyadicの間を埋める

任意の十分大きい $n$ に対して

$$
2^{m-1}<n\le2^m
$$

となる $m$ を取ります。

すると

$$
\frac{|S_n|}{n}
\le
\frac{\max_{k\le2^m}|S_k|}{2^{m-1}}.
$$

前節の評価から

$$
\frac{|S_n|}{n}
<
\frac{\varepsilon2^m}{2^{m-1}}
=2\varepsilon
$$

です。

$\varepsilon>0$ は任意なので

$$
\boxed{
\frac{S_n}{n}\to0
\quad\text{a.s.}
}
$$

を得ます。

したがって

$$
\boxed{
\overline X_n\to\mu
\quad\text{a.s.}
}
$$

です。

これが有限分散版の強大数則です。

---

## 8. 証明の構造

証明全体は

$$
\boxed{
\text{独立性}
\to
\text{最大不等式}
\to
\text{dyadic化}
\to
\text{確率の可算和可能性}
\to
\text{Borel--Cantelli}
\to
\text{a.s.収束}
}
$$

です。

「分散が $1/n$ で小さくなる」だけではなく、**逸脱が無限回起こらないことまで示した**ので確率収束より強くなっています。

---

## 9. 一般の強大数則

実は独立同分布なら有限分散は不要です。

$$
\boxed{
E|X_1|<\infty
\Longrightarrow
\overline X_n\to E[X_1]
\quad\text{a.s.}
}
$$

です。

これが通常教材P4-02で使うKolmogorovの強大数則です。

有限平均だけでは $\operatorname{Var}(X_1)$ が無限大かもしれないので、前節までの最大不等式をそのまま適用できません。

そこで大きすぎる値を一度切り落とします。

---

## 10. truncationの考え方

例えば

$$
Y_n
=X_n1_{\{|X_n|\le n\}}
$$

とします。

$E|X_1|<\infty$ ならtail sumの評価から

$$
\sum_{n=1}^{\infty}
P(|X_n|>n)<\infty.
$$

Borel--Cantelli第1補題より

$$
X_n=Y_n
$$

がa.s.十分大きな $n$ で成立します。

つまり巨大値を切り落としても、長期的には元の列とほとんど同じです。

---

## 11. 一般版の証明地図

一般版ではおおむね次の流れを使います。

1. $Y_n=X_n1_{\{|X_n|\le n\}}$ と切断する。
2. Borel--Cantelliで $X_n=Y_n$ がeventually a.s.となることを示す。
3. 中心化した $Y_n-E[Y_n]$ について
   $$
   \sum_n\frac{\operatorname{Var}(Y_n)}{n^2}<\infty
   $$
   を示す。
4. Kolmogorovの収束定理から
   $$
   \sum_n\frac{Y_n-E[Y_n]}{n}
   $$
   のa.s.収束を得る。
5. Kroneckerの補題から
   $$
   \frac1n\sum_{k=1}^n(Y_k-E[Y_k])\to0
   $$
   a.s.を得る。
6. $E[Y_n]\to E[X_1]$ を使って元の標本平均へ戻す。

完全証明には補助定理が増えるので、この補講では有限分散版を主証明とし、一般版はこの地図までを必須理解とします。

---

## 12. なぜ有限平均が自然な境界なのか

標本平均が

$$
\frac1n\sum_{i=1}^nX_i
$$

で母平均へ近づくという主張には、そもそも

$$
E[X_1]
$$

が有限な値として存在する必要があります。

有限分散は証明を簡単にする強い条件ですが、強大数則そのものの自然な仮定は有限一次モーメントです。

---

## 13. 統計学への接続

強大数則によって、有限平均を持つ独立同分布標本なら

$$
\overline X_n\to\mu
\quad\text{a.s.}
$$

です。

したがって標本平均の一致性は単なる「分散が小さい」という話を超えて、ほぼすべての無限標本列に対するpathwiseな収束として保証されます。

さらに可測関数 $g$ に対し $E|g(X)|<\infty$ なら

$$
\frac1n\sum_{i=1}^ng(X_i)
\to
E[g(X)]
\quad\text{a.s.}
$$

です。

モーメント推定、経験リスク、対数尤度の平均など、多くの統計量がこの形です。

---

## 章末チェック

- 弱大数則のChebyshev証明ではなぜ強法則まで出ないか説明できる。
- Kolmogorov最大不等式を証明できる。
- dyadic列を使う理由を説明できる。
- Borel--Cantelliから有限分散版強大数則を導ける。
- 有限分散版と $E|X|<\infty$ の一般版を区別できる。
- 一般版でtruncation・Kolmogorov収束定理・Kronecker補題がどう使われるか説明できる。
