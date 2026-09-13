# F0-00D0 Cauchy完備化：有理数から実数を作る

[F0-00D](../F0_00D_Cauchy列_完備性_無限次元/index.md) では、$\mathbb Q$ には Cauchy 列の着地点が足りず、$\mathbb R$ を「穴を埋めた空間」と見られることを確認しました。本章では、その比喩を実際の構成にします。

中心となる発想は単純です。

```text
有理数のCauchy列を全部集める
        ↓
同じ極限を指す列を同一視する
        ↓
同値類そのものを新しい数とみなす
```

ここで最重要なのが **well-defined性** です。同値類の代表元を取り替えても、加法・乗法の結果が変わらないことを確認しなければ、「同値類上の演算」を定義したことにはなりません。

---

## 1. 同じ実数を指す近似列を同一視する

$\mathcal C_{\mathbb Q}$ を、通常の絶対値に関する有理数 Cauchy 列全体の集合とします。

例えば

$$
a_n=1.4,1.41,1.414,\ldots
$$

と

$$
b_n=1.5,1.42,1.415,\ldots
$$

がともに同じ境界へ近づき、しかも

$$
|a_n-b_n|\to0
$$

であるなら、二つの列は同じ新しい数を表していると考えるのが自然です。

<a id="def-f0-00d0-equivalence"></a>
<!-- formal-statement-start -->
> **定義（有理Cauchy列の同値関係）**  
> $(a_n),(b_n)\in\mathcal C_{\mathbb Q}$ に対して
$$
(a_n)\sim(b_n)
\iff
|a_n-b_n|\to0
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0-equivalence -->
### 1.1 定義の確認

$a_n=1/n$, $b_n=1/(n+1)$ とすると

$$
|a_n-b_n|
=\frac1{n(n+1)}\to0
$$

なので $(a_n)\sim(b_n)$ です。一方 $a_n=0$, $b_n=1$ なら距離は常に1なので同値ではありません。
<!-- definition-example-end -->

<a id="prop-f0-00d0-equivalence"></a>
<!-- formal-statement-start -->
> **命題（$\sim$ は同値関係）**  
> $\mathcal C_{\mathbb Q}$ 上の関係 $\sim$ は反射律・対称律・推移律を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

反射律と対称律は絶対値から直ちに従います。推移律だけは

$$
|a_n-c_n|
\le |a_n-b_n|+|b_n-c_n|
$$

という三角不等式で二つの誤差を足します。

<!-- proof-start -->
### 証明

任意の $(a_n)\in\mathcal C_{\mathbb Q}$ について $|a_n-a_n|=0$ なので $(a_n)\sim(a_n)$ です。

また $(a_n)\sim(b_n)$ なら

$$
|b_n-a_n|=|a_n-b_n|\to0,
$$

よって $(b_n)\sim(a_n)$ です。

最後に $(a_n)\sim(b_n)$ かつ $(b_n)\sim(c_n)$ とします。任意の $\varepsilon>0$ に対し、十分大きい $n$ では

$$
|a_n-b_n|<\frac\varepsilon2,
\qquad
|b_n-c_n|<\frac\varepsilon2.
$$

したがって

$$
|a_n-c_n|
\le |a_n-b_n|+|b_n-c_n|
<\varepsilon.
$$

よって $(a_n)\sim(c_n)$ です。$\square$
<!-- proof-end -->

<a id="def-f0-00d0-cauchy-real"></a>
<!-- formal-statement-start -->
> **定義（Cauchy実数）**  
> 有理 Cauchy 列全体 $\mathcal C_{\mathbb Q}$ を上の同値関係 $\sim$ で割った商集合
$$
\mathbb R_C:=\mathcal C_{\mathbb Q}/\sim
$$
> の元を **Cauchy実数** と呼ぶ。$(a_n)$ の同値類を $[(a_n)]$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0-cauchy-real -->
### 1.2 同値類は「一つの代表列」ではない

$[(1/n)]$ には $(1/n)$ だけでなく $(1/(n+1))$ や $(1/n+1/n^2)$ も入ります。したがって、新しい数は特定の列そのものではなく、**誤差が0へ行く列を全部まとめた集合**です。
<!-- definition-example-end -->

---

## 2. Cauchy列は有界である

乗法の well-defined 性では、誤差へ掛かる係数を有界に抑える必要があります。そのため最初に Cauchy 列の有界性を確保します。

<a id="thm-f0-00d0-bounded"></a>
<!-- formal-statement-start -->
> **定理（Cauchy列は有界）**  
> 有理数列 $(a_n)$ が Cauchy 列なら、ある $M\in\mathbb Q_{>0}$ が存在して
$$
|a_n|\le M
$$
> がすべての $n$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

後半は互いに距離1未満なので、一つの基準点 $a_N$ の近くに全て入ります。残る有限個の初項は最大値を取れば一括して抑えられます。

<!-- proof-start -->
### 証明

Cauchy 条件を $\varepsilon=1$ に適用すると、ある $N$ が存在して $m,n\ge N$ なら

$$
|a_m-a_n|<1.
$$

特に $n\ge N$ なら

$$
|a_n|
\le |a_n-a_N|+|a_N|
<1+|a_N|.
$$

有限個の値 $|a_1|,\ldots,|a_{N-1}|$ と $1+|a_N|$ の最大値以上の有理数 $M$ を取れば、すべての $n$ で $|a_n|\le M$ です。$\square$
<!-- proof-end -->

---

## 3. 同値類上に四則演算を入れる

候補は成分ごとの演算です。

$$
[(a_n)]+[(b_n)]:=[(a_n+b_n)],
$$

$$
[(a_n)]\,[(b_n)]:=[(a_nb_n)].
$$

しかし右辺が代表元の選び方に依存しないことを示す必要があります。

<a id="thm-f0-00d0-well-defined"></a>
<!-- formal-statement-start -->
> **定理（加法・乗法のwell-defined性）**  
> $(a_n)\sim(a'_n)$、$(b_n)\sim(b'_n)$ なら
$$
(a_n+b_n)\sim(a'_n+b'_n),
$$
$$
(a_nb_n)\sim(a'_nb'_n).
$$
> したがって上の加法・乗法は $\mathbb R_C$ 上の演算として well-defined である。
<!-- formal-statement-end -->

### 証明の見取り図

加法は誤差を二つ足すだけです。乗法は

$$
a_nb_n-a'_nb'_n
=a_n(b_n-b'_n)+b'_n(a_n-a'_n)
$$

と分け、Cauchy 列の有界性で $a_n,b'_n$ を固定定数で抑えます。

<!-- proof-start -->
### 証明

加法について

$$
|(a_n+b_n)-(a'_n+b'_n)|
\le |a_n-a'_n|+|b_n-b'_n|\to0.
$$

よって $(a_n+b_n)\sim(a'_n+b'_n)$ です。

乗法について、前節よりある $M>0$ が存在してすべての $n$ で

$$
|a_n|\le M,
\qquad
|b'_n|\le M
$$

としてよいです。すると

$$
\begin{aligned}
|a_nb_n-a'_nb'_n|
&=|a_n(b_n-b'_n)+b'_n(a_n-a'_n)|\\
&\le M|b_n-b'_n|+M|a_n-a'_n|.
\end{aligned}
$$

右辺は $n\to\infty$ で0へ行くので、積も同値です。$\square$
<!-- proof-end -->

零元と単位元はそれぞれ定数列 $(0,0,\ldots)$、$(1,1,\ldots)$ の同値類です。加法逆元は

$$
-[(a_n)]=[(-a_n)]
$$

で定められます。

非零元の逆数については少し注意が必要です。$[(a_n)]\ne0$ なら $(a_n)$ は0列と同値ではありません。Cauchy性と合わせると、十分後ろではある $c>0$ に対して $|a_n|\ge c$ となります。したがって有限個の初項を適当に取り直して $1/a_n$ を定義でき、$(1/a_n)$ は再び Cauchy 列になります。これにより $\mathbb R_C$ は体になります。

---

## 4. 順序を入れる

実数として使うには「正・負」を定める必要があります。極限という未構成の対象を使わず、**有理数幅だけ0から離れているか**で正を定めます。

<a id="def-f0-00d0-order"></a>
<!-- formal-statement-start -->
> **定義（Cauchy実数の正値性と順序）**  
> $x=[(a_n)]\in\mathbb R_C$ に対し、ある $r\in\mathbb Q_{>0}$ と $N\in\mathbb N$ が存在して
$$
a_n\ge r\qquad(n\ge N)
$$
> となるとき $x>0$ と定める。また
$$
x<y\iff y-x>0
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0-order -->
### 4.1 定義の確認

$a_n=2+1/n$ なら全ての $n$ で $a_n\ge2$ なので $[(a_n)]>0$ です。$a_n=1/n$ では正の項が続きますが、どんな固定 $r>0$ よりも eventually 小さくなるため $[(1/n)]=0$ であり、正の Cauchy 実数ではありません。
<!-- definition-example-end -->

代表元を同値な列へ取り替えてもこの正値性は変わりません。例えば $a_n\ge r$ が eventually 成立し $|a_n-b_n|\to0$ なら、十分後ろでは $|a_n-b_n|<r/2$ なので

$$
b_n\ge a_n-|a_n-b_n|>\frac r2.
$$

したがって順序も well-defined です。

---

## 5. 有理数は定数列として入る

<a id="thm-f0-00d0-embedding"></a>
<!-- formal-statement-start -->
> **定理（有理数の標準埋め込み）**  
> 写像
$$
\iota:\mathbb Q\to\mathbb R_C,
\qquad
\iota(q)=[(q,q,q,\ldots)]
$$
> は単射で、加法・乗法・順序を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

定数列同士の差が0へ行くのは定数差そのものが0のときだけです。演算は成分ごとなのでそのまま保存されます。

<!-- proof-start -->
### 証明

$\iota(q)=\iota(r)$ なら定数列 $(q)$ と $(r)$ が同値なので

$$
|q-r|=\lim_{n\to\infty}|q-r|=0.
$$

したがって $q=r$ であり単射です。また

$$
\iota(q+r)
=[(q+r)]
=[(q)]+[(r)]
=\iota(q)+\iota(r),
$$

積も同様です。$q<r$ なら $r-q>0$ を固定したまま定数列に残るので順序も保存されます。$\square$
<!-- proof-end -->

以後、$\iota(q)$ を単に $q$ と書き、$\mathbb Q\subset\mathbb R_C$ とみなして構いません。

<a id="thm-f0-00d0-dense"></a>
<!-- formal-statement-start -->
> **定理（$\mathbb Q$ の稠密性）**  
> 任意の $x=[(a_n)]\in\mathbb R_C$ と任意の $\varepsilon\in\mathbb Q_{>0}$ に対して、ある $q\in\mathbb Q$ が存在して
$$
|x-q|<\varepsilon
$$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

代表列 $(a_n)$ 自身が Cauchy なので、十分後ろの一項 $a_N$ を定数列として固定すれば、元の同値類に好きなだけ近い有理数になります。

<!-- proof-start -->
### 証明

$(a_n)$ は Cauchy なので、ある $N$ が存在し $m,n\ge N$ なら

$$
|a_m-a_n|<\varepsilon.
$$

$q=a_N\in\mathbb Q$ と置きます。$m\ge N$ で

$$
|a_m-q|<\varepsilon
$$

なので、$x-q$ は絶対値が $\varepsilon$ 未満の元です。よって $|x-q|<\varepsilon$ です。$\square$
<!-- proof-end -->

---

## 6. なぜ完成した空間は本当に完備なのか

<a id="thm-f0-00d0-complete"></a>
<!-- formal-statement-start -->
> **定理（Cauchy実数の完備性）**  
> $\mathbb R_C$ の任意の Cauchy 列は $\mathbb R_C$ の元へ収束する。したがって $\mathbb R_C$ は完備である。
<!-- formal-statement-end -->

### 証明の見取り図

Cauchy実数の Cauchy 列 $(x_k)$ を取ります。各 $x_k$ を有理数 $q_k$ で精度 $2^{-k}$ まで近似します。

```text
x_1  ≈ q_1
x_2  ≈ q_2
x_3  ≈ q_3
     ⋮
```

$(x_k)$ 自身が Cauchy なので、近似誤差を足しても $(q_k)$ は有理 Cauchy 列です。そこで

$$
x=[(q_k)]
$$

と置けば、これが $(x_k)$ の極限になります。

<!-- proof-start -->
### 証明

$(x_k)$ を $\mathbb R_C$ の Cauchy 列とします。稠密性から各 $k$ に対して $q_k\in\mathbb Q$ を取り

$$
|x_k-q_k|<2^{-k}
$$

とできます。

任意の $\varepsilon>0$ を取ります。$(x_k)$ が Cauchy なので、十分大きい $k,\ell$ では

$$
|x_k-x_\ell|<\frac\varepsilon3.
$$

さらに $2^{-k},2^{-\ell}<\varepsilon/3$ とできます。したがって

$$
|q_k-q_\ell|
\le |q_k-x_k|+|x_k-x_\ell|+|x_\ell-q_\ell|
<\varepsilon.
$$

よって $(q_k)$ は有理 Cauchy 列です。そこで

$$
x=[(q_k)]\in\mathbb R_C
$$

と置きます。

$k$ を十分大きく取れば $|x_k-q_k|<\varepsilon/2$ であり、また $x=[(q_j)]$ の定義から十分後ろの $q_k$ は $x$ へ $\varepsilon/2$ 未満まで近づきます。したがって

$$
|x_k-x|
\le |x_k-q_k|+|q_k-x|
<\varepsilon.
$$

よって $x_k\to x$ です。$\square$
<!-- proof-end -->

これで

$$
\boxed{\mathbb Q\subset\mathbb R_C,\qquad \mathbb Q\text{ は稠密},\qquad \mathbb R_C\text{ は完備}}
$$

が得られました。これが「$\mathbb Q$ を Cauchy 完備化する」の具体的な意味です。

---

## 7. 例：$\sqrt2$ は「極限値を先に使わず」に作れる

各 $n$ に対して

$$
q_n=\frac{\lfloor10^n\sqrt2\rfloor}{10^n}
$$

と書くのは直感的ですが、$\sqrt2$ をまだ構成していない段階では循環します。そこで、例えば二分法で

$$
q_n^2<2<r_n^2,
\qquad
0<r_n-q_n<2^{-n}
$$

を満たす有理数 $q_n,r_n$ を作ります。

すると

$$
|q_m-q_n|
\le (r_N-q_N)<2^{-N}
$$

が十分大きい $m,n$ で成り立つので $(q_n)$ は Cauchy 列です。その同値類

$$
[(q_n)]
$$

を $\sqrt2$ と呼べます。

「先に $\sqrt2$ があるから近似する」のではなく、**近似列の同値類を作った結果として $\sqrt2$ が生まれる**わけです。

---

## 8. 演習

### F0-00D0-A01 同値関係の推移律

- Level: A
- 目安時間: 8分
- 主題: 商構成
- 使用技術: 三角不等式

有理 Cauchy 列 $(a_n),(b_n),(c_n)$ が $(a_n)\sim(b_n)$、$(b_n)\sim(c_n)$ を満たすとする。$(a_n)\sim(c_n)$ を $\varepsilon$ 論法で示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
任意の $\varepsilon>0$ を取る。同値性から十分大きい $n$ では
$$
|a_n-b_n|<\varepsilon/2,
\qquad
|b_n-c_n|<\varepsilon/2.
$$
三角不等式より
$$
|a_n-c_n|
\le |a_n-b_n|+|b_n-c_n|
<\varepsilon.
$$
したがって $|a_n-c_n|\to0$、すなわち $(a_n)\sim(c_n)$。

##### 本番答案
三角不等式
$$
|a_n-c_n|\le|a_n-b_n|+|b_n-c_n|
$$
と両項の0への収束から従う。

##### 採点基準
- $\varepsilon/2$ の分割：8点
- 三角不等式：8点
- 同値性の結論：4点
<!-- solution-end -->

### F0-00D0-A02 同値だが同じ列ではない例

- Level: A
- 目安時間: 8分
- 主題: 同値類
- 使用技術: 極限評価

$a_n=2+1/n$、$b_n=2+(-1)^n/n$ とする。二つが異なる列でありながら同値であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
奇数 $n$ では $a_n\ne b_n$ なので同じ列ではない。一方
$$
|a_n-b_n|
=\left|\frac{1-(-1)^n}{n}\right|
\le\frac2n\to0.
$$
したがって $(a_n)\sim(b_n)$。

##### 本番答案
$a_n-b_n=(1-(-1)^n)/n$ だから $|a_n-b_n|\le2/n\to0$。よって同値。

##### 採点基準
- 異なる列である確認：5点
- 差の評価：10点
- 同値の結論：5点
<!-- solution-end -->

### F0-00D0-B01 積のwell-defined性

- Level: B
- 目安時間: 15分
- 主題: well-defined性
- 使用技術: 有界性と誤差分解

$(a_n)\sim(a'_n)$、$(b_n)\sim(b'_n)$ とする。有理 Cauchy 列が有界であることを用い、$(a_nb_n)\sim(a'_nb'_n)$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
Cauchy 列は有界なので、ある $M>0$ を十分大きく取り
$$
|a_n|\le M,\qquad |b'_n|\le M
$$
としてよい。差を一度に扱わず
$$
a_nb_n-a'_nb'_n
=a_n(b_n-b'_n)+b'_n(a_n-a'_n)
$$
と分解する。したがって
$$
|a_nb_n-a'_nb'_n|
\le M|b_n-b'_n|+M|a_n-a'_n|.
$$
右辺の二項はともに0へ収束するので左辺も0へ収束する。よって積は代表元によらない。

##### 本番答案
有界性より $|a_n|,|b'_n|\le M$ として
$$
|a_nb_n-a'_nb'_n|
\le M|b_n-b'_n|+M|a_n-a'_n|\to0.
$$

##### 採点基準
- Cauchy列の有界性：5点
- 差の分解：8点
- 評価と極限：7点
<!-- solution-end -->

### F0-00D0-B02 有理数が稠密である理由

- Level: B
- 目安時間: 12分
- 主題: 稠密性
- 使用技術: Cauchy条件

$x=[(a_n)]\in\mathbb R_C$、$\varepsilon\in\mathbb Q_{>0}$ とする。代表列の一項を用いて $|x-q|<\varepsilon$ となる $q\in\mathbb Q$ を構成せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$(a_n)$ が Cauchy なので、ある $N$ が存在し $m,n\ge N$ なら $|a_m-a_n|<\varepsilon$。$q=a_N$ と取る。すると $m\ge N$ で $|a_m-q|<\varepsilon$ だから、同値類 $x-q$ も $\varepsilon$ 未満である。よって有理数だけで任意精度に近似できる。

##### 本番答案
Cauchy条件から $|a_m-a_N|<\varepsilon$ となる $N$ を取り $q=a_N$ とすればよい。

##### 採点基準
- Cauchy条件の使用：8点
- $q=a_N$ の選択：6点
- 稠密性の結論：6点
<!-- solution-end -->

### F0-00D0-C01 完備性の対角近似

- Level: C
- 目安時間: 25分
- 主題: Cauchy完備化
- 使用技術: 稠密近似と三角不等式

$\mathbb R_C$ の Cauchy 列 $(x_k)$ に対し、各 $k$ で $q_k\in\mathbb Q$ を
$$
|x_k-q_k|<2^{-k}
$$
となるように取る。

1. $(q_k)$ が有理 Cauchy 列であることを示せ。
2. $x=[(q_k)]$ と置いたとき $x_k\to x$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
1. 任意の $\varepsilon>0$ を取る。$(x_k)$ が Cauchy なので、十分大きい $k,\ell$ で $|x_k-x_\ell|<\varepsilon/3$。さらに $2^{-k},2^{-\ell}<\varepsilon/3$ とする。すると
$$
|q_k-q_\ell|
\le |q_k-x_k|+|x_k-x_\ell|+|x_\ell-q_\ell|
<\varepsilon.
$$
よって $(q_k)$ は Cauchy。

2. $x=[(q_k)]$ とする。十分大きい $k$ では $|x_k-q_k|<\varepsilon/2$。また $(q_k)$ が $x$ を表すので、十分大きい $k$ で $|q_k-x|<\varepsilon/2$。したがって
$$
|x_k-x|
\le |x_k-q_k|+|q_k-x|<\varepsilon.
$$
よって $x_k\to x$。

##### 本番答案
$q_k$ を $2^{-k}$ 精度で取ると
$$
|q_k-q_\ell|
\le2^{-k}+|x_k-x_\ell|+2^{-\ell}\to0,
$$
ゆえに $(q_k)$ は有理 Cauchy 列。$x=[(q_k)]$ と置けば
$$
|x_k-x|\le|x_k-q_k|+|q_k-x|\to0.
$$

##### 採点基準
- 有理近似の三角不等式：8点
- $(q_k)$ のCauchy性：4点
- 極限候補 $x=[(q_k)]$ の構成：4点
- $x_k\to x$ の評価：4点
<!-- solution-end -->

---

## 9. 章末チェック

- Cauchy列そのものではなく同値類を新しい数にする理由を説明できる。
- $(a_n)\sim(b_n)$ が同値関係であることを証明できる。
- 商集合上の演算では well-defined 性が必要だと説明できる。
- 乗法の well-defined 性で Cauchy 列の有界性が必要になる理由を説明できる。
- $\mathbb Q$ の埋め込みと稠密性を示せる。
- 対角近似で $\mathbb R_C$ の完備性を再構成できる。

次章では、この構成を $\mathbb Q$ 固有の話から任意の距離空間へ一般化します。
