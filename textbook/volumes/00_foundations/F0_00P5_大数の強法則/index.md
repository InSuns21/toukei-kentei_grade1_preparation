# F0-00P5 Kolmogorov最大不等式・有限分散版強大数則

強大数則の有限分散版を、Chebyshevだけで無理に全nへ適用せず

$$\boxed{\text{最大不等式}\to\text{dyadic subsequence}\to\text{Borel--Cantelli}\to\text{gap filling}}$$

という標準的な証明で閉じます。$E|X|<\infty$ だけを仮定する一般独立同分布版はP5Aへ分離します。

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

についてチェビシェフの不等式から

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

<a id="thm-kolmogorov-maximal"></a>

## 3. Kolmogorov最大不等式

<!-- formal-statement-start -->
> **定理（Kolmogorov最大不等式）**  
> $Y_1,\ldots,Y_n$ を独立で $E[Y_j]=0$、$\operatorname{Var}(Y_j)<\infty$ を満たす確率変数とし、$S_k=\sum_{j=1}^kY_j$ とします。このとき任意の $\lambda>0$ に対して

$
\boxed{
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
}
$

> が成り立ちます。
<!-- formal-statement-end -->

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

チェビシェフの不等式が最後の時点 $S_n$ だけを見るのに対し、この不等式は途中の部分和すべてを一度に制御します。

---

<!-- round3-hidden-proof-fixed -->
## 4. 完全証明を読む前の地図

章冒頭の

```text
最大不等式 → dyadic subsequence → Borel--Cantelli → gap filling
```

がそのまま完全証明の目次です。ポイントは、Chebyshevの $1/n$ では総和が発散するため、$n=2^m$ に束ねて $2^{-m}$ へ変え、Borel--Cantelliが使える形にすることです。

以下では最大不等式そのものの証明から、dyadic間の隙間を埋めて全ての $n$ へ戻すところまでを一続きの完全証明として折りたたみます。

<!-- proof-start -->
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

[前章のBorel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-borel-cantelli-1)から

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
<!-- proof-end -->

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

## 演習

### F0-00P5-A01 dyadic subsequenceでBCを使う

- Level: A
- 目安時間: 12分

独立同分布、$E[X_i]=0$, $\operatorname{Var}(X_i)=\sigma^2<\infty$ とする。Chebyshevで $P(|S_{2^k}|>\varepsilon2^k)$ を評価し、その和が有限であることを示せ。

<!-- solution-start -->
#### 詳細解答
$\operatorname{Var}(S_{2^k})=2^k\sigma^2$ なので確率は $\sigma^2/(\varepsilon^22^k)$ 以下。kについて幾何級数となり有限。BCより $S_{2^k}/2^k\to0$ a.s.。

#### 本番答案
$P(|S_{2^k}|>\varepsilon2^k)\le\sigma^2/(\varepsilon^22^k)$。総和有限ゆえBCでdyadic上a.s.収束。

#### 採点基準（20点）
- 分散: 5点
- Chebyshev: 7点
- 和の収束: 4点
- BC: 4点
<!-- solution-end -->

### F0-00P5-B01 最大不等式で隙間を埋める

- Level: B
- 目安時間: 18分

Kolmogorov最大不等式を用いて、$2^k<n\le2^{k+1}$ の区間内変動を $2^k$ で割った量がa.s.0へ行くことを示す方針を書け。

<!-- solution-start -->
#### 詳細解答
区間内の増分 $S_n-S_{2^k}$ に最大不等式を適用すると、最大値が $\varepsilon2^k$ を超える確率は区間の分散和 $2^k\sigma^2$ を $\varepsilon^22^{2k}$ で割った $O(2^{-k})$。総和可能なのでBCで区間最大増分/2^k→0 a.s.。

#### 本番答案
最大不等式で $P(\max_{2^k<n\le2^{k+1}}|S_n-S_{2^k}|>\varepsilon2^k)\le C2^{-k}$。総和有限→BC。

#### 採点基準（20点）
- 増分列の設定: 5点
- 最大不等式: 7点
- $O(2^{-k})$: 4点
- BC: 4点
<!-- solution-end -->

---

## 次に進む

有限分散を外し、独立同分布かつ $E|X|<\infty$ だけで強大数則を証明するなら [F0-00P5Aの一般独立同分布強大数則の証明](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) へ進みます。中心極限定理へ先に進むだけならP5Aは必須ではありません。
