# F0-00D4 補講：Lebesgue測度・Borel集合・Carathéodory拡張定理

D3では外測度

$$
\lambda^*
$$

からCarathéodory可測集合を選ぶ方法を作りました。

この章では、その抽象的な装置を実数直線へ戻し、

$$
\boxed{
\text{区間の長さ}
\to
\text{Borel集合}
\to
\text{Lebesgue可測集合}
\to
\text{Lebesgue測度}
}
$$

を完成させます。

さらに最後に、より一般の確率測度でも使われる **Carathéodory拡張定理** を見ます。

---

## 1. まず区間の外測度が長さになること

目標は

$$
\boxed{
\lambda^*([a,b])=b-a
}
$$

です。

### 1.1 上からの評価

任意の $\varepsilon>0$ に対して

$$
[a,b]
\subset
(a-\varepsilon/2,b+\varepsilon/2)
$$

なので

$$
\lambda^*([a,b])
\le
b-a+\varepsilon.
$$

$\varepsilon\downarrow0$ とすれば

$$
\lambda^*([a,b])\le b-a.
$$

### 1.2 下からの評価

$[a,b]$ を開区間 $I_1,I_2,\dots$ が覆うとします。

$[a,b]$ はコンパクトなので、Heine--Borelから有限部分被覆

$$
I_{n_1},\dots,I_{n_m}
$$

を取れます。

有限個の区間で $[a,b]$ を覆うなら、その総延長は少なくとも $b-a$ です。

従って

$$
\sum_{k=1}^m|I_{n_k}|
\ge b-a.
$$

元の可算被覆についても

$$
\sum_n|I_n|\ge b-a
$$

なのでinfimumを取って

$$
\lambda^*([a,b])\ge b-a.
$$

以上から

$$
\boxed{
\lambda^*([a,b])=b-a
}.
$$

ここで、F0-00Cで学んだコンパクト性が測度構成に戻ってきます。

---

## 2. 平行移動不変性

$A\subset\mathbb R$ と $t\in\mathbb R$ に対して

$$
A+t=\{x+t:x\in A\}
$$

とします。

$A$ の区間被覆を全て $t$ だけ平行移動すると、各区間の長さは変わりません。

従って

$$
\lambda^*(A+t)\le\lambda^*(A).
$$

逆向きは $-t$ を使えばよいので

$$
\boxed{
\lambda^*(A+t)=\lambda^*(A)
}.
$$

Lebesgue測度の平行移動不変性は、この外測度の段階ですでに現れています。

---

## 3. 開区間がCarathéodory可測であること

開区間 $E=(a,b)$ を取ります。

任意の $T\subset\mathbb R$ に対して

$$
T=(T\cap E)\cup(T\setminus E)
$$

です。

外測度の劣加法性から

$$
\lambda^*(T)
\le
\lambda^*(T\cap E)+\lambda^*(T\setminus E)
$$

は自動的です。

逆向きは、$T$ のほぼ最適な開区間被覆を $E$ の境界 $a,b$ で切り分けます。

各区間を

- $E$ の内側
- $E$ の外側

へ分けても、分割後の総延長は元の区間長を超えません。

この操作を全被覆に適用しinfimumを取ると

$$
\lambda^*(T)
\ge
\lambda^*(T\cap E)+\lambda^*(T\setminus E)
$$

を得ます。

よって開区間はCarathéodory可測です。

---

## 4. 開集合は全部可測

実数上の任意の開集合 $G$ は、互いに素な可算個の開区間の和として表せます。

$$
G=\bigsqcup_{n=1}^{\infty}I_n.
$$

開区間は可測で、Carathéodory可測集合全体はsigma代数なので

$$
\boxed{
G\text{ は可測}
}
$$

です。

---

## 5. Borel sigma代数

<a id="def-borel-sigma-algebra"></a>

<!-- formal-statement-start -->
> **定義（Borel sigma代数）**  
> 実数上の開集合全体から生成される最小のsigma代数を **Borel sigma代数** といい、
$$
\mathcal B(\mathbb R)
=
\sigma(\text{open sets})
$$
> と書く。
<!-- formal-statement-end -->

開集合がすべてCarathéodory可測なので、可測集合族 $\mathcal L$ はそれらを含むsigma代数です。

したがって

$$
\boxed{
\mathcal B(\mathbb R)
\subset
\mathcal L
}
$$

です。

つまり全てのBorel集合はLebesgue可測です。

---

## 6. Borel集合には何が入るか

Borel sigma代数には

- 開集合
- 閉集合
- 開区間・閉区間・半開区間
- 可算集合
- 開集合の可算共通部分
- 閉集合の可算和

などが入ります。

たとえば一点集合は閉集合なのでBorel集合です。

従って有理数集合

$$
\mathbb Q
=
\bigcup_{q\in\mathbb Q}\{q\}
$$

もBorel集合です。

---

## 7. Lebesgue sigma代数はBorel sigma代数より大きい

Lebesgue測度は完全です。

したがって、Borel集合 $N$ が

$$
\lambda(N)=0
$$

なら、その任意の部分集合

$$
A\subset N
$$

もLebesgue可測です。

しかしその $A$ がBorel集合とは限りません。

従って一般に

$$
\boxed{
\mathcal B(\mathbb R)
\subsetneq
\mathcal L
}
$$

です。

Lebesgue sigma代数は、Borel sigma代数を測度0集合について**完備化**したものとみなせます。

---

## 8. 完備化

<a id="def-measure-completion"></a>

<!-- formal-statement-start -->
> **定義（測度空間の完備化）**  
> 測度空間 $(X,\mathcal F,\mu)$ に対し、$\mu(N)=0$ を満たす $N\in\mathcal F$ のすべての部分集合を可測集合として加えて得られる最小の完全な拡張測度空間を、$(X,\mathcal F,\mu)$ の **完備化** という。
<!-- formal-statement-end -->

Lebesgue測度は

> Borel測度を完備化したもの

という見方ができます。

この見方は確率論でも重要です。

---

## 9. 区間の種類によらず長さは同じ

一点集合のLebesgue測度は0です。

よって

$$
[a,b],\quad
(a,b),\quad
[a,b),\quad
(a,b]
$$

の違いは端点高々2点だけです。

したがって

$$
\boxed{
\lambda([a,b])
=
\lambda((a,b))
=
\lambda([a,b))
=
b-a
}
$$

です。

統計学で積分区間の端点をあまり気にしない理由の一つです。

---

## 10. Lebesgue測度が完成した

ここまでで

$$
(\mathbb R,\mathcal L,\lambda)
$$

という完全測度空間を得ました。

D2で使っていた

$$
\int f\,d\lambda
$$

は、この $\lambda$ に関する積分です。

つまり

$$
\boxed{
\text{区間の長さ}
\to
\text{外測度}
\to
\text{Carathéodory可測性}
\to
\text{Lebesgue測度}
\to
\text{Lebesgue積分}
}
$$

という全工程がつながりました。

---

# Part II：一般の測度をどう拡張するか

ここからはLebesgue測度の特殊な構成を一般化します。

---

## 11. algebraとsigma代数

<a id="def-set-algebra"></a>

<!-- formal-statement-start -->
> **定義（集合のalgebra）**  
> 集合 $X$ の部分集合族 $\mathcal A$ が、$X\in\mathcal A$、$A\in\mathcal A\Rightarrow A^c\in\mathcal A$、および $A,B\in\mathcal A\Rightarrow A\cup B\in\mathcal A$ を満たすとき、$\mathcal A$ を $X$ 上の **algebra** という。
<!-- formal-statement-end -->

sigma代数との違いは、**algebraは有限和で閉じ、sigma代数は可算和で閉じる**ことです。

区間の有限和のような「単純な集合」には、まずalgebra上で長さや確率を定義するのが自然です。

---

## 12. premeasure

<a id="def-premeasure"></a>

<!-- formal-statement-start -->
> **定義（premeasure）**  
> algebra $\mathcal A$ 上の集合関数 $\mu_0:\mathcal A\to[0,\infty]$ が **premeasure** であるとは、互いに素な $A_n\in\mathcal A$ について $\bigcup_n A_n\in\mathcal A$ なら
$$
\mu_0\left(\bigcup_nA_n\right)
=
\sum_n\mu_0(A_n)
$$
> が成り立つことをいう。
<!-- formal-statement-end -->

つまり、まだ小さな集合族上にしか定義されていませんが、そこで可算加法性を持っています。

---

## 13. premeasureから外測度を作る

任意の $E\subset X$ に対して

$$
\boxed{
\mu^*(E)
=
\inf\left\{
\sum_{n=1}^{\infty}\mu_0(A_n):
E\subset\bigcup_nA_n,
\ A_n\in\mathcal A
\right\}
}
$$

と定めます。

これはD3の区間被覆と同じ形です。

区間の長さを一般のpremeasureに置き換えただけです。

---

<a id="thm-caratheodory-extension"></a>

## 14. Carathéodory拡張定理

<!-- formal-statement-start -->
> **定理（Carathéodory拡張定理）**  
> 集合 $X$ 上のalgebra $\mathcal A$ と、その上のpremeasure $\mu_0$ に対して、$\mu_0$ と $\mathcal A$ 上で一致する測度 $\mu$ が生成sigma代数 $\sigma(\mathcal A)$ 上に存在する。さらに $\mu_0$ がsigma有限なら、この拡張は一意である。
<!-- formal-statement-end -->

$$
\boxed{
\mu_0\text{ on }\mathcal A
\quad\Longrightarrow\quad
\mu\text{ on }\sigma(\mathcal A)
}
$$

です。

---

## 15. sigma有限性

<a id="def-sigma-finite"></a>

<!-- formal-statement-start -->
> **定義（sigma有限）**  
> 測度空間 $(X,\mathcal F,\mu)$ が **sigma有限** であるとは、可測集合列 $(E_n)$ が存在して
$$
X=\bigcup_{n=1}^{\infty}E_n,
\qquad
\mu(E_n)<\infty\quad(n\ge1)
$$
> を満たすことをいう。
<!-- formal-statement-end -->

Lebesgue測度なら

$$
\mathbb R
=
\bigcup_{n=1}^{\infty}[-n,n]
$$

で

$$
\lambda([-n,n])=2n<\infty
$$

なのでsigma有限です。

sigma有限性は、拡張の一意性やFubini/Tonelliの使いやすい形で頻繁に現れます。

---

## 16. 確率論との接続

確率測度も同じです。

有限次元の単純な事象上で整合的に確率を定め、それを生成sigma代数へ拡張する、という発想が使われます。

確率論補講P1で触れたKolmogorov拡張定理は、さらに無限個の座標を持つ確率過程へこの発想を押し広げたものです。

つまり

$$
\boxed{
\text{simple events}
\to
\text{premeasure}
\to
\text{extension}
\to
\text{probability measure}
}
$$

という構図です。

---

## 17. なぜ「pdfから確率を作る」が正当なのか

非負可測関数 $f$ が

$$
\int_{\mathbb R}f(x)\,d\lambda(x)=1
$$

を満たすなら

$$
P(A)=\int_A f\,d\lambda
$$

と置くことで確率測度が得られます。

このとき

$$
P\ll\lambda
$$

で

$$
\frac{dP}{d\lambda}=f.
$$

P2で学んだRadon--Nikodym密度としてのpdfへつながります。

---

## 18. D5への接続

ここまでで

- 区間は測れる
- Borel集合は測れる
- 測度0集合の部分集合も測れる

ことが分かりました。

では

> 実数の部分集合は全部Lebesgue可測なのか？

答えは **いいえ** です。

D5では、選択公理を使ってVitali集合を作り、

$$
\boxed{
\text{全ての部分集合に長さを与えることはできない}
}
$$

ことを具体的に示します。

---

## 演習

### F0-00D4-A01 有理数集合はBorelだが測度0

- Level: A
- 目安時間: 10分

$A=\mathbb Q\cap[0,1]$ がBorel集合であることを示し、Lebesgue測度 $\lambda(A)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

一点集合 $\{q\}$ は閉集合なのでBorel集合。有理数は可算だから

$$
A=\bigcup_{q\in\mathbb Q\cap[0,1]}\{q\}
$$

は可算和としてBorel集合。各一点の測度は0なので可算加法性から $\lambda(A)=0$。

#### 本番答案

$A$ は一点Borel集合の可算和なのでBorel。各一点の測度が0だから $\lambda(A)=0$。

#### 採点基準（20点）
- 一点集合がBorel: 5点
- 可算和: 7点
- 測度0: 8点
<!-- solution-end -->

### F0-00D4-B01 完備化が何を追加するか

- Level: B
- 目安時間: 15分

$N$ をLebesgue測度0のBorel集合とし、$A\subset N$ とする。$A$ がLebesgue可測で $\lambda(A)=0$ である理由を説明せよ。また、この事実だけから $A$ がBorel集合とは結論できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

Lebesgue測度はBorel測度の完備化なので、零測度Borel集合 $N$ の任意の部分集合 $A$ もLebesgue可測として追加され、$\lambda(A)=0$ と定められる。一方、完備化はもとのBorel sigma代数に新しい集合を追加する操作なので、$A$ がもともとBorel集合であることまでは保証しない。

#### 本番答案

Lebesgue測度の完全性より $A\subset N$, $\lambda(N)=0$ なら $A$ はLebesgue可測かつ $\lambda(A)=0$。完備化はBorel sigma代数より大きいので、$A$ がBorelとは限らない。

#### 採点基準（20点）
- 完全性の適用: 8点
- $\lambda(A)=0$: 5点
- Borelとの区別: 7点
<!-- solution-end -->

---

## 章末チェック

- 区間のLebesgue外測度が長さに一致することを説明できる。
- 開集合とBorel集合がLebesgue可測である理由を説明できる。
- Borel sigma代数とLebesgue sigma代数を区別できる。
- 完備化の意味を説明できる。
- Lebesgue測度の構成全体を外測度から説明できる。
- algebra・premeasure・Carathéodory拡張定理を説明できる。
- sigma有限性が何のために現れるか説明できる。
- 確率測度の構成と測度拡張の共通構造を説明できる。
