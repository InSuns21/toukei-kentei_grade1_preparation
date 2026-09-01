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

実数上の開集合全体から生成される最小のsigma代数を

$$
\mathcal B(\mathbb R)
$$

と書き、**Borel sigma代数** といいます。

生成を記号で

$$
\mathcal B(\mathbb R)
=
\sigma(\text{open sets})
$$

と書きます。

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

一般の測度空間

$$
(X,\mathcal F,\mu)
$$

が完全でないとします。

測度0集合 $N\in\mathcal F$ の全ての部分集合を新たに可測集合として加えた最小の拡張を、測度空間の **完備化** といいます。

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

集合族 $\mathcal A$ が

- 全体集合を含む
- 補集合で閉じる
- 有限和で閉じる

とき **algebra** といいます。

sigma代数との違いは

$$
\text{finite unions}
\quad\text{vs}\quad
\text{countable unions}
$$

です。

区間の有限和のような「単純な集合」には、まずalgebra上で長さや確率を定義するのが自然です。

---

## 12. premeasure

algebra $\mathcal A$ 上の集合関数

$$
\mu_0:\mathcal A\to[0,\infty]
$$

が **premeasure** であるとは、互いに素な $A_n\in\mathcal A$ について、その可算和が再び $\mathcal A$ に属するとき

$$
\mu_0\left(\bigcup_nA_n\right)
=
\sum_n\mu_0(A_n)
$$

を満たすことです。

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

## 14. Carathéodory拡張定理

Carathéodory拡張定理は、大まかに次を述べます。

> algebra上のpremeasureは、そのalgebraが生成するsigma代数上の測度へ拡張できる。

$$
\boxed{
\mu_0\text{ on }\mathcal A
\quad\Longrightarrow\quad
\mu\text{ on }\sigma(\mathcal A)
}
$$

です。

さらに適切なsigma有限性の下では、この拡張は一意です。

---

## 15. sigma有限性

測度空間が **sigma有限** であるとは

$$
X=\bigcup_{n=1}^{\infty}E_n
$$

かつ

$$
\mu(E_n)<\infty
$$

となる可測集合列が存在することです。

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

## 章末チェック

- 区間のLebesgue外測度が長さに一致することを説明できる。
- 開集合とBorel集合がLebesgue可測である理由を説明できる。
- Borel sigma代数とLebesgue sigma代数を区別できる。
- 完備化の意味を説明できる。
- Lebesgue測度の構成全体を外測度から説明できる。
- algebra・premeasure・Carathéodory拡張定理を説明できる。
- sigma有限性が何のために現れるか説明できる。
- 確率測度の構成と測度拡張の共通構造を説明できる。
