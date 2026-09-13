# F0-00D0 Cauchy完備化：有理数から実数を作る

[F0-00D](../F0_00D_Cauchy列_完備性_無限次元/index.md) では、$\mathbb Q$ には Cauchy 列の着地点が足りないことを確認しました。本章では、「穴を埋める」という比喩を実際の構成にします。

中心となる発想は次です。

```text
有理数の Cauchy 列を全部集める
        ↓
差が 0 へ行く列どうしを同一視する
        ↓
同値類を新しい数とみなす
        ↓
四則演算・順序・距離を入れる
        ↓
本当に完備であることを証明する
```

ここで特に重要なのが **well-defined 性** です。同値類の代表元を取り替えても演算結果が変わらないことを示さなければ、「同値類上の演算」は定義できていません。

---

## 1. 同じ極限を指す近似列を同一視する

$\mathcal C_{\mathbb Q}$ を、通常の絶対値に関する有理数 Cauchy 列全体とします。

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
> **命題（有理Cauchy列上の関係は同値関係）**  
> $\mathcal C_{\mathbb Q}$ 上の関係 $\sim$ は反射律・対称律・推移律を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

反射律と対称律は絶対値から直ちに従います。推移律では

$$
|a_n-c_n|
\le |a_n-b_n|+|b_n-c_n|
$$

と二つの誤差を足します。

<!-- proof-start -->
### 証明

任意の $(a_n)$ について $|a_n-a_n|=0$ なので $(a_n)\sim(a_n)$ です。

$(a_n)\sim(b_n)$ なら

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
> 有理 Cauchy 列全体 $\mathcal C_{\mathbb Q}$ を上の同値関係で割った商集合
$$
\mathbb R_C:=\mathcal C_{\mathbb Q}/\sim
$$
> の元を **Cauchy実数** と呼ぶ。$(a_n)$ の同値類を $[(a_n)]$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0-cauchy-real -->
### 1.2 同値類は一つの代表列ではない

$[(1/n)]$ には $(1/n)$ だけでなく $(1/(n+1))$ や $(1/n+1/n^2)$ も入ります。新しい数は特定の列ではなく、**差が0へ行く近似列を全部まとめた集合**です。
<!-- definition-example-end -->

---

## 2. Cauchy列は有界である

乗法や逆数を扱うとき、誤差へ掛かる係数を固定定数で抑える必要があります。

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

後半は互いに距離1未満なので、一つの基準点 $a_N$ の近くに全部入ります。残る有限個の初項は最大値でまとめます。

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

有限個の $|a_1|,\ldots,|a_{N-1}|$ と $1+|a_N|$ の最大値以上の有理数 $M$ を取れば、全ての $n$ で $|a_n|\le M$ です。$\square$
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
> したがって上の加法・乗法は $\mathbb R_C$ 上で well-defined である。
<!-- formal-statement-end -->

### 証明の見取り図

加法は誤差を足すだけです。乗法は

$$
a_nb_n-a'_nb'_n
=a_n(b_n-b'_n)+b'_n(a_n-a'_n)
$$

と分け、Cauchy 列の有界性を使います。

<!-- proof-start -->
### 証明

加法について

$$
|(a_n+b_n)-(a'_n+b'_n)|
\le |a_n-a'_n|+|b_n-b'_n|\to0.
$$

よって $(a_n+b_n)\sim(a'_n+b'_n)$ です。

乗法について、Cauchy 列の有界性から、ある $M>0$ が存在して

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
&\le M|b_n-b'_n|+M|a_n-a'_n|\to0.
\end{aligned}
$$

したがって積も同値です。$\square$
<!-- proof-end -->

零元と単位元はそれぞれ定数列 $(0,0,\ldots)$、$(1,1,\ldots)$ の同値類です。加法逆元は

$$
-[(a_n)]=[(-a_n)]
$$

で定めます。

---

## 4. 順序を入れる

極限という未構成の対象を使わず、**有理数幅だけ0から離れているか**で正値性を定めます。

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
### 4.1 正の項が並ぶだけでは「正の実数」とは限らない

$a_n=2+1/n$ なら全ての $n$ で $a_n\ge2$ なので $[(a_n)]>0$ です。

一方 $a_n=1/n$ は全項が正ですが、どんな固定 $r>0$ よりも eventually 小さくなります。そして $(1/n)\sim(0)$ なので

$$
[(1/n)]=0.
$$

「各項が正」と「同値類が0から正の距離だけ離れる」は別です。
<!-- definition-example-end -->

代表元を同値な列へ取り替えても正値性は変わりません。実際 $a_n\ge r$ が eventually 成立し $|a_n-b_n|\to0$ なら、十分後ろで $|a_n-b_n|<r/2$ なので

$$
b_n\ge a_n-|a_n-b_n|>\frac r2.
$$

したがって順序も well-defined です。

<a id="thm-f0-00d0-ordered-field"></a>
<!-- formal-statement-start -->
> **定理（Cauchy実数は順序体）**  
> 上で定めた加法・乗法・順序により $\mathbb R_C$ は順序体になる。特に $x\ne0$ なら乗法逆元 $x^{-1}$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

体の結合則・交換則・分配則は有理数列の各項で成立する恒等式を同値類へ降ろします。非自明なのは逆数です。

$x=[(a_n)]\ne0$ なら $(a_n)$ は0列と同値ではありません。Cauchy性と合わせると、十分後ろでは $|a_n|$ がある正数より小さくならないことを示せます。そこで後半の項ごとに $1/a_n$ を取ります。

<!-- proof-start -->
### 証明

加法・乗法の結合則、交換則、分配則、零元・単位元・加法逆元の公理は、各代表列の成分ごとに有理数の対応する恒等式が成立し、前節で演算の well-defined 性を確認したことから従います。

$x=[(a_n)]\ne0$ とします。$(a_n)\not\sim(0)$ なので、ある $\varepsilon_0>0$ が存在して、任意の $N$ に対しある $m\ge N$ で

$$
|a_m|\ge\varepsilon_0
$$

となります。

一方 $(a_n)$ は Cauchy なので、ある $N_0$ が存在して $m,n\ge N_0$ なら

$$
|a_m-a_n|<\frac{\varepsilon_0}{2}.
$$

上の非同値性から $m\ge N_0$ で $|a_m|\ge\varepsilon_0$ となるものを一つ選びます。すると任意の $n\ge N_0$ について

$$
|a_n|
\ge |a_m|-|a_n-a_m|
>\frac{\varepsilon_0}{2}.
$$

したがって後半では $a_n\ne0$ です。$n\ge N_0$ で $b_n=1/a_n$ とし、有限個の初項 $b_1,\ldots,b_{N_0-1}$ は任意の有理数、例えば1にします。

$m,n\ge N_0$ なら

$$
\begin{aligned}
|b_n-b_m|
&=\left|\frac1{a_n}-\frac1{a_m}\right|\\
&=\frac{|a_m-a_n|}{|a_na_m|}\\
&\le \frac{4}{\varepsilon_0^2}|a_m-a_n|.
\end{aligned}
$$

よって $(b_n)$ も Cauchy 列です。また十分後ろでは $a_nb_n=1$ なので

$$
[(a_n)][(b_n)]=1.
$$

したがって $[(b_n)]$ が $x^{-1}$ です。

さらに非零 $x$ では上の議論から $|a_n|\ge c>0$ が eventually 成立します。Cauchy性により十分後ろで正負を行き来することはできません。したがって $x>0$ または $-x>0$ のどちらか一方が成立し、順序は全順序になります。

次に演算と順序の両立を確認します。$x<y$ なら $y-x>0$ であり、任意の $z$ について

$$
(y+z)-(x+z)=y-x>0,
$$

従って $x+z<y+z$ です。また $0<x$、$0<y$ とし、それぞれ代表列を $(a_n),(b_n)$ とします。正値性の定義から、ある有理数 $r,s>0$ と十分大きい $N$ が存在して

$$
a_n\ge r,
\qquad
b_n\ge s
\qquad(n\ge N)
$$

となります。従って

$$
a_nb_n\ge rs>0
\qquad(n\ge N),
$$

なので $xy>0$ です。これで順序と加法・乗法の両立も確認できました。よって $\mathbb R_C$ は順序体です。$\square$
<!-- proof-end -->

<a id="def-f0-00d0-metric"></a>
<!-- formal-statement-start -->
> **定義（Cauchy実数の絶対値と距離）**  
> $x\in\mathbb R_C$ に対し
$$
|x|_C=
\begin{cases}
x,&x\ge0,\\
-x,&x<0,
\end{cases}
$$
> と定め、
$$
d_C(x,y):=|x-y|_C
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0-metric -->
### 4.2 有理数上では元の距離に戻る

後で定義する埋め込み $\iota$ を使うと

$$
d_C(\iota(p),\iota(q))=\iota(|p-q|).
$$

したがって有理数どうしの距離は変わりません。以後、文脈上明らかなときは $d_C(x,y)$ を $|x-y|$ とも書きます。
<!-- definition-example-end -->

順序体の絶対値について

$$
|x+y|_C\le |x|_C+|y|_C
$$

が成り立つので、$d_C$ は通常の三角不等式を満たす距離です。これで「$\mathbb R_C$ が Cauchy 完備である」という文が正式に意味を持ちます。

---

## 5. 有理数は定数列として入る

<a id="thm-f0-00d0-embedding"></a>
<!-- formal-statement-start -->
> **定理（有理数の定数列埋め込み）**  
> 写像
$$
\iota:\mathbb Q\to\mathbb R_C,
\qquad
\iota(q)=[(q,q,q,\ldots)]
$$
> は単射で、加法・乗法・順序を保つ。さらに
$$
d_C(\iota(p),\iota(q))=\iota(|p-q|)
$$
> なので等長である。
<!-- formal-statement-end -->

### 証明の見取り図

定数列同士の差が0へ行くのは定数差そのものが0のときだけです。演算は成分ごとなのでそのまま保存されます。

<!-- proof-start -->
### 証明

$\iota(q)=\iota(r)$ なら定数列 $(q)$ と $(r)$ が同値なので

$$
|q-r|=0.
$$

従って $q=r$ で単射です。また

$$
\iota(q+r)
=[(q+r)]
=[(q)]+[(r)]
=\iota(q)+\iota(r),
$$

積も同様です。$q<r$ なら定数差 $r-q>0$ が正の幅のまま残るので順序も保存します。絶対値の定義から

$$
d_C(\iota(p),\iota(q))
=|\iota(p-q)|_C
=\iota(|p-q|).
$$

よって等長です。$\square$
<!-- proof-end -->

以後、$\iota(q)$ を単に $q$ と書き、$\mathbb Q\subset\mathbb R_C$ とみなして構いません。

<a id="thm-f0-00d0-dense"></a>
<!-- formal-statement-start -->
> **定理（Cauchy実数内の有理数稠密性）**  
> 任意の $x\in\mathbb R_C$ と任意の有理数 $\varepsilon>0$ に対し、ある $q\in\mathbb Q$ が存在して
$$
d_C(x,q)<\varepsilon
$$
> となる。
<!-- formal-statement-end -->

### 証明の見取り図

$x=[(a_n)]$ とします。代表列自身が Cauchy なので、十分後ろの一項 $a_N$ を定数列として固定すれば、元の同値類へ好きなだけ近づきます。

<!-- proof-start -->
### 証明

$(a_n)$ が Cauchy なので、ある $N$ が存在し $m,n\ge N$ なら

$$
|a_m-a_n|<\frac\varepsilon2.
$$

$q=a_N\in\mathbb Q$ と置きます。$m\ge N$ なら

$$
|a_m-q|<\frac\varepsilon2.
$$

従って $\varepsilon-d_C(x,q)$ は、十分後ろで $\varepsilon/2$ より大きい有理数列によって表される正の Cauchy 実数です。ゆえに

$$
d_C(x,q)<\varepsilon.
$$

$\square$
<!-- proof-end -->

---

## 6. 完成した空間は本当に完備である

<a id="thm-f0-00d0-complete"></a>
<!-- formal-statement-start -->
> **定理（Cauchy実数の完備性）**  
> 距離 $d_C$ に関する $\mathbb R_C$ の任意の Cauchy 列は $\mathbb R_C$ の元へ収束する。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathbb R_C$ の Cauchy 列 $(x_k)$ を取り、各 $x_k$ を有理数 $q_k$ で精度 $2^{-k}$ まで近似します。

```text
x_1  ≈ q_1
x_2  ≈ q_2
x_3  ≈ q_3
     ⋮
```

$(x_k)$ が Cauchy なので、$(q_k)$ も有理 Cauchy 列です。その同値類

$$
x=[(q_k)]
$$

を極限候補にします。

<!-- proof-start -->
### 証明

$(x_k)$ を $\mathbb R_C$ の Cauchy 列とします。[Cauchy実数内の有理数稠密性](#thm-f0-00d0-dense)から各 $k$ に対して $q_k\in\mathbb Q$ を取り

$$
d_C(x_k,q_k)<2^{-k}
$$

とできます。

任意の有理数 $\varepsilon>0$ を取ります。$(x_k)$ が Cauchy なので、十分大きい $k,\ell$ では

$$
d_C(x_k,x_\ell)<\frac\varepsilon3.
$$

さらに $2^{-k},2^{-\ell}<\varepsilon/3$ とできます。三角不等式と $\mathbb Q$ の等長埋め込みから

$$
\begin{aligned}
|q_k-q_\ell|
&=d_C(q_k,q_\ell)\\
&\le d_C(q_k,x_k)+d_C(x_k,x_\ell)+d_C(x_\ell,q_\ell)\\
&<\varepsilon.
\end{aligned}
$$

よって $(q_k)$ は有理 Cauchy 列です。そこで

$$
x=[(q_k)]\in\mathbb R_C
$$

と置きます。

再び任意の有理数 $\varepsilon>0$ を取ります。$(q_k)$ の Cauchy性から、十分大きい $k$ では

$$
d_C(q_k,x)<\frac\varepsilon2
$$

となります。実際、十分後ろの全ての $j$ で $|q_j-q_k|<\varepsilon/4$ としておけば、$\varepsilon/2-d_C(q_k,x)$ は正の幅 $\varepsilon/4$ を eventually 持ちます。

また $2^{-k}<\varepsilon/2$ とすれば

$$
\begin{aligned}
d_C(x_k,x)
&\le d_C(x_k,q_k)+d_C(q_k,x)\\
&<\frac\varepsilon2+\frac\varepsilon2\\
&=\varepsilon.
\end{aligned}
$$

従って $x_k\to x$ です。$\square$
<!-- proof-end -->

これで

$$
\boxed{
\mathbb Q\hookrightarrow\mathbb R_C
\text{ は等長かつ稠密},
\qquad
\mathbb R_C\text{ は完備}
}
$$

が得られました。これが「$\mathbb Q$ を Cauchy 完備化する」の具体的な意味です。

---

## 7. 例：$\sqrt2$ を先に仮定せず作る

「$\sqrt2$ の小数展開を取る」と言うだけでは、まだ実数を作っていない段階では循環します。そこで有理数だけで二分法を行います。

初期区間を

$$
q_0=1,
\qquad
r_0=2
$$

とし、常に

$$
q_n^2<2<r_n^2
$$

を保ちながら中点を調べ、区間幅を半分にします。すると

$$
0<r_n-q_n=2^{-n}
$$

であり、$(q_n)$ は有理 Cauchy 列です。

そこで

$$
x=[(q_n)]
$$

と置きます。さらに $1\le q_n<r_n\le2$ なので

$$
0<2-q_n^2
<r_n^2-q_n^2
=(r_n-q_n)(r_n+q_n)
\le4(r_n-q_n)\to0.
$$

従って

$$
x^2=[(q_n^2)]=[(2,2,\ldots)]=2.
$$

$x>0$ なので、この $x$ を $\sqrt2$ と呼べます。

つまり

> **先に $\sqrt2$ があるから近似するのではなく、有理近似列の同値類を作った結果として $\sqrt2$ が生まれる。**

という順序です。

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
従って $|a_n-c_n|\to0$、すなわち $(a_n)\sim(c_n)$。

##### 本番答案
三角不等式
$$
|a_n-c_n|\le|a_n-b_n|+|b_n-c_n|
$$
と両項の0への収束から従う。

##### 採点基準
- $\varepsilon/2$ の分割：8点
- 三角不等式：8点
- 結論：4点
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
奇数 $n$ では一般に $a_n\ne b_n$ なので同じ列ではない。一方
$$
|a_n-b_n|
=\left|\frac{1-(-1)^n}{n}\right|
\le\frac2n\to0.
$$
従って $(a_n)\sim(b_n)$。

##### 本番答案
$|a_n-b_n|\le2/n\to0$ なので同値である。

##### 採点基準
- 異なる列である確認：5点
- 差の評価：10点
- 結論：5点
<!-- solution-end -->

### F0-00D0-A03 Cauchy列の和もCauchy

- Level: A
- 目安時間: 8分
- 主題: 演算の閉性
- 使用技術: 三角不等式

$(a_n),(b_n)$ が有理 Cauchy 列なら $(a_n+b_n)$ も Cauchy 列であることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
任意の $\varepsilon>0$ を取る。両列が Cauchy なので、十分大きい $m,n$ では
$$
|a_m-a_n|<\varepsilon/2,
\qquad
|b_m-b_n|<\varepsilon/2.
$$
従って
$$
|(a_m+b_m)-(a_n+b_n)|
\le|a_m-a_n|+|b_m-b_n|
<\varepsilon.
$$
よって和も Cauchy。

##### 本番答案
両列へ $\varepsilon/2$ を割り当て、三角不等式で和の差を抑える。

##### 採点基準
- Cauchy条件の適用：8点
- 三角不等式：8点
- 結論：4点
<!-- solution-end -->

### F0-00D0-A04 定数列埋め込みは積を保つ

- Level: A
- 目安時間: 7分
- 主題: 有理数の埋め込み
- 使用技術: 定義への代入

$p,q\in\mathbb Q$ に対して
$$
\iota(pq)=\iota(p)\iota(q)
$$
を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$\iota(p)$ と $\iota(q)$ はそれぞれ定数列 $(p,p,\ldots)$ と $(q,q,\ldots)$ の同値類である。積は成分ごとに定義したので
$$
\iota(p)\iota(q)
=[(pq,pq,\ldots)]
=\iota(pq).
$$

##### 本番答案
定数列の積は定数列 $(pq,pq,\ldots)$ だから定義から従う。

##### 採点基準
- 定数列埋め込みの展開：8点
- 同値類上の積の適用：8点
- 結論：4点
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
|a_n|\le M,
\qquad
|b'_n|\le M
$$
としてよい。差を
$$
a_nb_n-a'_nb'_n
=a_n(b_n-b'_n)+b'_n(a_n-a'_n)
$$
と分解する。従って
$$
|a_nb_n-a'_nb'_n|
\le M|b_n-b'_n|+M|a_n-a'_n|\to0.
$$
よって積は代表元によらない。

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

$x=[(a_n)]\in\mathbb R_C$、有理数 $\varepsilon>0$ とする。代表列の一項を用いて $d_C(x,q)<\varepsilon$ となる $q\in\mathbb Q$ を構成せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$(a_n)$ が Cauchy なので、ある $N$ が存在し $m,n\ge N$ なら
$$
|a_m-a_n|<\varepsilon/2.
$$
$q=a_N$ と取る。すると $m\ge N$ で $|a_m-q|<\varepsilon/2$。従って $\varepsilon-d_C(x,q)$ は eventually $\varepsilon/2$ より大きい列で表される正の Cauchy 実数なので、$d_C(x,q)<\varepsilon$。

##### 本番答案
Cauchy条件から $|a_m-a_N|<\varepsilon/2$ となる $N$ を取り $q=a_N$ とすればよい。

##### 採点基準
- Cauchy条件の使用：8点
- $q=a_N$ の選択：6点
- 距離不等式の結論：6点
<!-- solution-end -->

### F0-00D0-B03 非零元は0から離れる

- Level: B
- 目安時間: 18分
- 主題: 逆元の構成
- 使用技術: Cauchy性と背理法

$(a_n)$ を有理 Cauchy 列とし $[(a_n)]\ne0$ とする。ある $c>0$ と $N$ が存在して
$$
|a_n|\ge c\qquad(n\ge N)
$$
となることを示し、$(1/a_n)$ を十分後ろで定義すれば Cauchy 列になることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$[(a_n)]\ne0$ なので $|a_n|\to0$ ではない。従ってある $\varepsilon_0>0$ が存在し、どれだけ後ろへ行っても $|a_m|\ge\varepsilon_0$ となる項がある。

Cauchy性から、ある $N$ 以降では
$$
|a_n-a_m|<\varepsilon_0/2.
$$
この尾部から $|a_m|\ge\varepsilon_0$ となる $m$ を一つ選ぶと、全ての $n\ge N$ について
$$
|a_n|
\ge|a_m|-|a_n-a_m|
>\varepsilon_0/2.
$$
従って $c=\varepsilon_0/2$ と取れる。

$m,n\ge N$ なら
$$
\left|\frac1{a_n}-\frac1{a_m}\right|
=\frac{|a_m-a_n|}{|a_na_m|}
\le\frac1{c^2}|a_m-a_n|.
$$
右辺は任意に小さくなるので逆数列も Cauchy。

##### 本番答案
非零性から尾部に $|a_m|\ge\varepsilon_0$ の項が必ずある。Cauchy性を $\varepsilon_0/2$ で使えば尾部全体で $|a_n|>\varepsilon_0/2$。従って逆数差は
$$
|1/a_n-1/a_m|\le c^{-2}|a_n-a_m|\to0.
$$

##### 採点基準
- 非零性の量化：6点
- 0から離れる評価：8点
- 逆数列のCauchy性：6点
<!-- solution-end -->

### F0-00D0-C01 完備性の対角近似

- Level: C
- 目安時間: 25分
- 主題: Cauchy完備化
- 使用技術: 稠密近似と三角不等式

$\mathbb R_C$ の Cauchy 列 $(x_k)$ に対し、各 $k$ で $q_k\in\mathbb Q$ を
$$
d_C(x_k,q_k)<2^{-k}
$$
となるように取る。

1. $(q_k)$ が有理 Cauchy 列であることを示せ。
2. $x=[(q_k)]$ と置いたとき $x_k\to x$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
1. 任意の $\varepsilon>0$ を取る。$(x_k)$ が Cauchy なので十分大きい $k,\ell$ で $d_C(x_k,x_\ell)<\varepsilon/3$。さらに $2^{-k},2^{-\ell}<\varepsilon/3$ とする。すると
$$
|q_k-q_\ell|
\le d_C(q_k,x_k)+d_C(x_k,x_\ell)+d_C(x_\ell,q_\ell)
<\varepsilon.
$$
よって $(q_k)$ は Cauchy。

2. $x=[(q_k)]$ とする。十分大きい $k$ では $d_C(x_k,q_k)<\varepsilon/2$。また $(q_k)$ の Cauchy性から、十分大きい $k$ で $d_C(q_k,x)<\varepsilon/2$。従って
$$
d_C(x_k,x)
\le d_C(x_k,q_k)+d_C(q_k,x)
<\varepsilon.
$$
よって $x_k\to x$。

##### 本番答案
$$
|q_k-q_\ell|
\le2^{-k}+d_C(x_k,x_\ell)+2^{-\ell}\to0,
$$
ゆえに $(q_k)$ は有理 Cauchy 列。$x=[(q_k)]$ と置けば
$$
d_C(x_k,x)\le2^{-k}+d_C(q_k,x)\to0.
$$

##### 採点基準
- 有理近似の三角不等式：8点
- $(q_k)$ のCauchy性：4点
- 極限候補の構成：4点
- $x_k\to x$ の評価：4点
<!-- solution-end -->

---

## 9. 章末チェック

- Cauchy列そのものではなく同値類を新しい数にする理由を説明できる。
- $(a_n)\sim(b_n)$ が同値関係であることを証明できる。
- 商集合上の演算では well-defined 性が必要だと説明できる。
- 乗法の well-defined 性で Cauchy 列の有界性が必要になる理由を説明できる。
- 非零元の代表列が eventually 0 から離れることを示し、逆数を構成できる。
- $\mathbb R_C$ が順序体であり、絶対値距離 $d_C$ を持つことを説明できる。
- $\mathbb Q$ の等長埋め込みと稠密性を示せる。
- 対角近似で $\mathbb R_C$ の完備性を再構成できる。

次章では、この構成を $\mathbb Q$ 固有の話から任意の距離空間へ一般化します。
