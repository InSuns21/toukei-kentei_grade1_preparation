# F0-00D Cauchy列・完備距離空間

[RA1 数列・級数](../RA1/index.md#def-ra1-cauchy)では、実数列について

$$
m,n\ge N
\Longrightarrow
|a_m-a_n|<\varepsilon
$$

という Cauchy 条件を導入し、さらに [実数の完備性](../RA1/index.md#thm-ra1-real-completeness)

$$
\boxed{
\text{実数列が Cauchy}
\Longleftrightarrow
\text{実数内で収束}
}
$$

を実数の上限性質から証明しました。

この講義で行うことは、その議論を最初からやり直すことではありません。**絶対値 \(|x-y|\) を一般の距離 \(d(x,y)\) に置き換えたとき、どこまで同じ論理が残り、どこから空間固有の問題になるか**を整理します。

実数では「Cauchy なら収束」が定理でした。一般の距離空間では、これは自動ではありません。そこで

> すべての Cauchy 列を空間内で収束させられるか

を空間そのものの性質として切り出します。それが**完備性**です。

---

## 0. 実数版から何を一般化するのか

[距離空間](../F0_00B_距離空間_開集合_閉集合_収束/index.md)では、二点 \(x,y\in X\) の隔たりを実数値 \(d(x,y)\) で測ります。

実数直線 \(\mathbb R\) で通常の距離

$$
d(x,y)=|x-y|
$$

を使えば、RA1 の式はそのまま距離空間の式になります。

| 実数列 | 距離空間の点列 |
|---|---|
| \(|a_m-a_n|\) | \(d(x_m,x_n)\) |
| \(|a_n-L|\) | \(d(x_n,x)\) |
| 実数の Cauchy 条件 | 距離空間の Cauchy 条件 |
| 実数の完備性 | 一般距離空間では追加条件 |

したがって、この章の中心問題は

$$
\boxed{
|a_m-a_n|
\quad\longrightarrow\quad
d(x_m,x_n)
}
$$

という置き換えによって、RA1 の考え方を一般の空間へ持ち上げることです。

### 0.1 低次元の例：\(\mathbb R^2\) では二座標を同時に近づける

\(\mathbb R^2\) に Euclid 距離

$$
d_2(x,y)
=
\sqrt{(x_1-y_1)^2+(x_2-y_2)^2}
$$

を入れ、

$$
x_n=
\left(\frac1n,\frac2n\right)
$$

とします。\(m,n\ge N\) なら

$$
\begin{aligned}
d_2(x_m,x_n)
&=
\sqrt{
\left(\frac1m-\frac1n\right)^2
+
4\left(\frac1m-\frac1n\right)^2
}\\
&=
\sqrt5\left|\frac1m-\frac1n\right|\\
&\le
\sqrt5\left(\frac1m+\frac1n\right)\\
&\le
\frac{2\sqrt5}{N}.
\end{aligned}
$$

したがって \(N>2\sqrt5/\varepsilon\) と取れば、列の後半同士を \(\varepsilon\) 未満まで近づけられます。

RA1 の \(1/n\) と本質は同じですが、今度は「実数の差」ではなく「点と点の距離」を測っています。

### 0.2 何が難しくなるのか：近づいていても着地点がないことがある

一方、\(\sqrt2\) の有限小数近似

$$
1.4,\ 1.41,\ 1.414,\ 1.4142,\ldots
$$

を有理数の列として見ると、後半同士は任意に近づきます。しかし着地点 \(\sqrt2\) は \(\mathbb Q\) にありません。

つまり

~~~text
列の後半同士が固まる
        ↓
      Cauchy
        ↓
空間内に着地点があるとは限らない
        ↓
    完備性が必要
~~~

という問題が、一般化した瞬間に現れます。

---

## 1. 距離空間の Cauchy 列

RA1 では絶対値で二項を比較しました。一般の距離空間では、その役目を距離 \(d\) に任せます。

<a id="def-f0-00d-01"></a>

<!-- formal-statement-start -->
> **定義（Cauchy列）**  
> 距離空間 \((X,d)\) の点列 \((x_n)_{n\ge1}\) が **Cauchy列** であるとは、任意の \(\varepsilon>0\) に対して、ある \(N\in\mathbb N\) が存在し
>
> $$
> m,n\ge N
> \Longrightarrow
> d(x_m,x_n)<\varepsilon
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

収束

$$
x_n\to x
$$

では、固定した候補 \(x\) との距離 \(d(x_n,x)\) を見ます。Cauchy 条件では極限候補を式に出さず、列の後半同士だけを比較します。

<!-- definition-example-start: def-f0-00d-01 -->
### 1.1 定義の確認：\(\mathbb R^2\) の列

先ほどの

$$
x_n=
\left(\frac1n,\frac2n\right)
$$

では

$$
d_2(x_m,x_n)
\le
\frac{2\sqrt5}{N}
\qquad(m,n\ge N)
$$

でした。任意の \(\varepsilon>0\) に対して

$$
N>\frac{2\sqrt5}{\varepsilon}
$$

と取れば

$$
m,n\ge N
\Longrightarrow
d_2(x_m,x_n)<\varepsilon.
$$

したがって \((x_n)\) は Cauchy 列です。極限 \((0,0)\) を先に使っていないことがポイントです。
<!-- definition-example-end -->

### 1.2 RA1 の定義はこの定義の特殊例

\(X=\mathbb R\)、\(d(x,y)=|x-y|\) とすれば

$$
d(a_m,a_n)<\varepsilon
$$

は

$$
|a_m-a_n|<\varepsilon
$$

そのものです。

したがって [RA1 の「実数列の Cauchy 条件」](../RA1/index.md#def-ra1-cauchy)は、一般距離空間の Cauchy 列を実数直線に特殊化した場合と完全に一致します。

---

<a id="thm-convergent-implies-cauchy"></a>

## 2. 収束列はどの距離空間でも Cauchy 列

実数で使った \(\varepsilon/2\) の議論は、絶対値の特殊性ではなく**三角不等式**だけに依存していました。したがって一般の距離空間でもそのまま通ります。

<!-- formal-statement-start -->
> **命題（収束列はCauchy列）**  
> 距離空間 \((X,d)\) の点列 \((x_n)\) がある \(x\in X\) に収束するなら、\((x_n)\) は Cauchy 列である。
<!-- formal-statement-end -->

### 2.1 どこに三角不等式を使うか

十分後ろの \(x_m,x_n\) を直接比べる代わりに、極限 \(x\) を中継します。

$$
x_m
\longrightarrow
x
\longleftarrow
x_n.
$$

したがって

$$
d(x_m,x_n)
\le
d(x_m,x)+d(x,x_n)
$$

です。両側を \(\varepsilon/2\) 未満にすれば終わります。

<!-- proof-start -->
### 証明

\(x_n\to x\) とします。任意の \(\varepsilon>0\) を取ります。

収束の定義より、ある \(N\) が存在して

$$
n\ge N
\Longrightarrow
d(x_n,x)<\frac\varepsilon2.
$$

したがって \(m,n\ge N\) なら三角不等式により

$$
\begin{aligned}
d(x_m,x_n)
&\le d(x_m,x)+d(x,x_n)\\
&<\frac\varepsilon2+\frac\varepsilon2\\
&=\varepsilon.
\end{aligned}
$$

よって \((x_n)\) は Cauchy 列です。\(\square\)
<!-- proof-end -->

ここまでは空間に追加条件を一切置いていません。

問題は逆向きです。

$$
\text{Cauchy}
\overset{?}{\Longrightarrow}
\text{収束}.
$$

RA1 では実数について成立しました。一般距離空間では、この矢印を保証する性質を名前で呼びます。

---

## 3. 完備距離空間

Cauchy 列は「極限候補を知らなくても、列の後半が内部的に固まっている」ことを表します。しかし、その固まり先が空間の外に落ちないとは限りません。

そこで、Cauchy 列をすべて受け止められる空間を区別します。

<a id="def-f0-00d-02"></a>

<!-- formal-statement-start -->
> **定義（完備距離空間）**  
> 距離空間 \((X,d)\) が **完備** であるとは、\(X\) の任意の Cauchy 列 \((x_n)\) に対して、ある \(x\in X\) が存在し
>
> $$
> x_n\to x
> $$
>
> となることをいう。
<!-- formal-statement-end -->

つまり

$$
\boxed{
\text{Cauchy列}
\Longrightarrow
\text{空間内で収束}
}
$$

を空間全体として保証する性質です。

<!-- definition-example-start: def-f0-00d-02 -->
### 3.1 定義の確認：\(\mathbb R\) は完備、\(\mathbb Q\) は完備でない

通常の距離 \(d(x,y)=|x-y|\) を入れた \(\mathbb R\) については、[RA1 の実数の完備性](../RA1/index.md#thm-ra1-real-completeness)が

$$
\text{実数列が Cauchy}
\Longrightarrow
\text{実数内で収束}
$$

をすでに証明しています。したがって

$$
\boxed{(\mathbb R,|\cdot|)\text{ は完備}}
$$

です。

一方、\(\sqrt2\) の有理近似列は \(\mathbb Q\) の Cauchy 列ですが、その極限は \(\mathbb Q\) にありません。したがって

$$
\boxed{(\mathbb Q,|\cdot|)\text{ は完備でない}}.
$$

同じ Cauchy 条件でも、空間が極限を収容できるかどうかが違います。
<!-- definition-example-end -->

### 3.2 完備性は「近似から存在を作る」ために使う

解析で典型的なのは次の使い方です。

~~~text
求めたい対象そのものはまだ分からない
        ↓
近似列 x_1,x_2,... を構成する
        ↓
評価から Cauchy と示す
        ↓
空間の完備性を使う
        ↓
空間内の極限 x の存在を得る
~~~

したがって完備性は、「極限を計算する定理」というより、**極限の存在場所を保証する定理**として働きます。

---

## 4. \(\mathbb R^p\) の完備性は座標ごとに RA1 へ戻せる

一般論を学んだ直後に、最も重要な有限次元例を自分で閉じておきます。

\(\mathbb R^p\) に Euclid 距離

$$
d_2(x,y)
=
\left(
\sum_{j=1}^p |x_j-y_j|^2
\right)^{1/2}
$$

を入れます。

<a id="thm-f0-00d-rp-complete"></a>

<!-- formal-statement-start -->
> **定理（Euclid 空間の完備性）**  
> 任意の正整数 \(p\) に対して、\((\mathbb R^p,d_2)\) は完備である。
<!-- formal-statement-end -->

### 4.1 証明の見取り図

\((x_n)\) を \(\mathbb R^p\) の Cauchy 列とし、

$$
x_n=(x_n^{(1)},\ldots,x_n^{(p)})
$$

と書きます。

各座標について

$$
|x_m^{(j)}-x_n^{(j)}|
\le
d_2(x_m,x_n)
$$

なので、\(\mathbb R^p\) で Cauchy なら**各座標列が実数の Cauchy 列**です。

そこで RA1 を座標ごとに適用して

$$
x_n^{(j)}\to x^{(j)}\in\mathbb R
$$

を得ます。最後に有限個の座標収束を Euclid 距離へ戻します。

<!-- proof-start -->
### 証明

\((x_n)\) を \((\mathbb R^p,d_2)\) の Cauchy 列とし、

$$
x_n=(x_n^{(1)},\ldots,x_n^{(p)})
$$

と書きます。

任意の座標 \(j\in\{1,\ldots,p\}\) について

$$
|x_m^{(j)}-x_n^{(j)}|
\le
\left(
\sum_{k=1}^p|x_m^{(k)}-x_n^{(k)}|^2
\right)^{1/2}
=
d_2(x_m,x_n).
$$

したがって各 \((x_n^{(j)})\) は実数の Cauchy 列です。[RA1 の実数の完備性](../RA1/index.md#thm-ra1-real-completeness)より、各 \(j\) についてある \(x^{(j)}\in\mathbb R\) が存在して

$$
x_n^{(j)}\to x^{(j)}.
$$

$$
x=(x^{(1)},\ldots,x^{(p)})\in\mathbb R^p
$$

と置きます。

任意の \(\varepsilon>0\) を取ります。各 \(j\) について、ある \(N_j\) が存在して

$$
n\ge N_j
\Longrightarrow
|x_n^{(j)}-x^{(j)}|
<
\frac{\varepsilon}{\sqrt p}.
$$

有限個の最大

$$
N=\max\{N_1,\ldots,N_p\}
$$

を取れば、\(n\ge N\) のとき全座標で上の評価が同時に成立します。よって

$$
\begin{aligned}
d_2(x_n,x)^2
&=
\sum_{j=1}^p
|x_n^{(j)}-x^{(j)}|^2\\
&<
\sum_{j=1}^p
\frac{\varepsilon^2}{p}\\
&=
\varepsilon^2.
\end{aligned}
$$

したがって

$$
d_2(x_n,x)<\varepsilon,
$$

すなわち \(x_n\to x\in\mathbb R^p\) です。

任意の Cauchy 列が \(\mathbb R^p\) 内で収束するので、\((\mathbb R^p,d_2)\) は完備です。\(\square\)
<!-- proof-end -->

この証明は「有限次元ノルム空間は完備」という後続理論を使っていません。**一般距離空間の問題を座標ごとの実数問題へ戻し、RA1 の完備性を適用した**だけです。

---

## 5. 完備な大空間の閉部分集合

\(\mathbb R\) が完備だとしても、その部分集合がすべて完備になるわけではありません。

例えば

$$
x_n=\frac1n
$$

は \((0,1)\) の Cauchy 列ですが、極限 \(0\) は \((0,1)\) に入りません。一方 \([0,1]\) なら境界点 \(0\) も含むので、この逃げ方は起こりません。

この差を一般化すると「閉部分集合」が現れます。

<a id="thm-f0-00d-01"></a>

<!-- formal-statement-start -->
> **定理（完備空間の閉部分集合は完備）**  
> 完備距離空間 \((X,d)\) と閉集合 \(F\subset X\) に対して、制限距離を入れた \(F\) は完備である。
<!-- formal-statement-end -->

### 5.1 役割分担を見る

\(F\) 内の Cauchy 列 \((x_n)\) に対して、

1. 大空間 \(X\) の完備性が極限 \(x\in X\) を作る。
2. \(F\) の閉性がその極限を \(F\) 内に留める。

という二段階です。

<!-- proof-start -->
### 証明

\(F\) 内の任意の Cauchy 列 \((x_n)\) を取ります。制限距離は \(X\) の距離と同じ値を使うので、\((x_n)\) は \(X\) の Cauchy 列でもあります。

\(X\) は完備だから、ある \(x\in X\) が存在して

$$
x_n\to x.
$$

各 \(x_n\in F\) であり、\(F\) は閉集合なので、[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)から

$$
x\in F.
$$

したがって \((x_n)\) は \(F\) 内で収束します。よって \(F\) は完備です。\(\square\)
<!-- proof-end -->

<a id="prop-f0-00d-01"></a>

<!-- formal-statement-start -->
> **命題（完備な部分空間は閉集合）**  
> 距離空間 \((X,d)\) の部分集合 \(F\subset X\) が制限距離について完備なら、\(F\) は \(X\) の閉集合である。
<!-- formal-statement-end -->

### 5.2 逆向きでは「極限の一意性」を使う

\(F\) の点列が大空間 \(X\) で \(x\) に収束したとします。

- 収束列だから Cauchy。
- \(F\) は完備だから、同じ列は \(F\) 内のある \(y\) に収束。
- 距離空間の極限は一意だから \(x=y\in F\)。

これで \(F\) の点列極限が外へ逃げないことが分かります。

<!-- proof-start -->
### 証明

\(F\) 内の点列 \((x_n)\) が \(X\) で

$$
x_n\to x\in X
$$

と収束したとします。[収束列は Cauchy 列](#thm-convergent-implies-cauchy)なので、\((x_n)\) は \(F\) の Cauchy 列です。

\(F\) は完備だから、ある \(y\in F\) が存在して

$$
x_n\to y.
$$

一方、\(X\) では \(x_n\to x\) です。[距離空間における極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)より

$$
x=y\in F.
$$

したがって \(F\) 内の収束列の極限はすべて \(F\) に属します。[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)から \(F\) は閉集合です。\(\square\)
<!-- proof-end -->

したがって、大空間 \(X\) が完備なら

$$
\boxed{
F\subset X:
\quad
F\text{ が完備}
\Longleftrightarrow
F\text{ が }X\text{ で閉}
}
$$

です。

ここで「大空間が完備」という仮定を落とすと、閉集合だから完備とは限りません。例えば \(\mathbb Q\) は自分自身の中では閉ですが、完備ではありません。

---

## 6. コンパクト距離空間は完備

完備性とコンパクト性は同じ概念ではありません。しかし距離空間では、コンパクト性から完備性を導けます。

鍵は [距離空間でのコンパクト性と点列コンパクト性の同値性](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-01)です。

Cauchy 列に**一つでも収束部分列**があれば、Cauchy 性が残りの項を同じ極限へ引き寄せます。

<a id="thm-f0-00d-02"></a>

<!-- formal-statement-start -->
> **定理（コンパクト距離空間は完備）**  
> コンパクト距離空間 \((K,d)\) は完備である。
<!-- formal-statement-end -->

### 6.1 部分列の極限から列全体へ戻す

\((x_n)\) を Cauchy 列とします。コンパクト性から

$$
x_{n_k}\to x\in K
$$

となる部分列を取れます。

あとは十分大きい \(n\) と、十分後ろの部分列項 \(x_{n_k}\) を一つ選び、

$$
d(x_n,x)
\le
d(x_n,x_{n_k})
+
d(x_{n_k},x)
$$

の二項を \(\varepsilon/2\) ずつにします。

<!-- proof-start -->
### 証明

\((x_n)\) を \(K\) の Cauchy 列とします。

\(K\) はコンパクトなので、[距離空間でのコンパクト性と点列コンパクト性の同値性](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-01)から、ある部分列 \((x_{n_k})\) と点 \(x\in K\) が存在して

$$
x_{n_k}\to x.
$$

任意の \(\varepsilon>0\) を取ります。

Cauchy 条件から、ある \(N_1\) が存在して

$$
m,n\ge N_1
\Longrightarrow
d(x_m,x_n)<\frac\varepsilon2.
$$

また部分列収束から、十分大きい \(k\) を選んで

$$
n_k\ge N_1,
\qquad
d(x_{n_k},x)<\frac\varepsilon2
$$

とできます。

任意の \(n\ge N_1\) に対して

$$
\begin{aligned}
d(x_n,x)
&\le d(x_n,x_{n_k})+d(x_{n_k},x)\\
&<\frac\varepsilon2+\frac\varepsilon2\\
&=\varepsilon.
\end{aligned}
$$

したがって \(x_n\to x\in K\) です。任意の Cauchy 列が \(K\) 内で収束するので、\(K\) は完備です。\(\square\)
<!-- proof-end -->

逆は一般には成り立ちません。\(\mathbb R\) は RA1 により完備ですが、コンパクトではありません。

---

## 7. complete と compact を混同しない

両者はどちらも「極限が逃げにくい」印象を持ちますが、制御している逃げ方が違います。

| 空間・集合 | 完備 | コンパクト | 失敗の仕方 |
|---|---:|---:|---|
| \([0,1]\) | ○ | ○ | 境界も無限遠も逃げ道がない |
| \((0,1)\) | × | × | \(1/n\to0\) が境界へ抜ける |
| \(\mathbb R\) | ○ | × | 穴はないが無限遠へ逃げられる |
| \(\mathbb Q\) | × | × | \(\sqrt2\) のような穴がある |

完備性が直接扱うのは**Cauchy 列が空間内に極限を持つか**です。コンパクト性はより強く、任意の点列から収束部分列を取り出せることまで保証します。

---

## 8. 完備性を使うと何ができるのか

この章で得た一般形は、後続で何度も同じ型として現れます。

### 8.1 完備化

非完備な距離空間でも、不足している Cauchy 列の極限を追加して完備空間へ埋め込むことができます。

有理数から実数を作る発想はその代表例です。一般の距離空間でこの構成を行うのが [F0-00D0A 一般距離空間の完備化](../F0_00D0A_一般距離空間の完備化/index.md) です。

### 8.2 Banach 空間

ベクトル空間にノルムから距離を入れたとき、その距離について完備なら Banach 空間になります。これは [F0-00D1](../F0_00D1_ノルム_Banach_有限次元_無限次元/index.md) で扱います。

### 8.3 近似列から解の存在へ

微分方程式・積分方程式・最適化・関数解析では、

1. 近似列を作る。
2. 評価によって Cauchy と示す。
3. 完備性で極限を確保する。
4. その極限が欲しい方程式を満たすことを示す。

という流れが繰り返し現れます。

RA1 で学んだ「実数の Cauchy 列に極限を与える」という一つの定理が、ここで**空間設計の原理**へ拡張されたわけです。

---

## 9. 演習

### F0-00D-A01 RA1 の Cauchy 条件を距離空間の定義として読み直す

- Level: A
- 目安時間: 8分
- 主題: 実数版から一般距離空間版への接続

\(\mathbb R\) に距離 \(d(x,y)=|x-y|\) を入れる。

1. 距離空間の Cauchy 列の定義を書け。
2. それが [RA1 の実数列の Cauchy 条件](../RA1/index.md#def-ra1-cauchy)と同じ式になることを確認せよ。
3. \(a_n=1/n\) が Cauchy 列であることを、極限 \(0\) を使わず示せ。

<!-- solution-start -->
#### 詳細解答

距離空間の定義では、任意の \(\varepsilon>0\) に対し、ある \(N\) が存在して

$$
m,n\ge N
\Longrightarrow
d(a_m,a_n)<\varepsilon
$$

を要求します。

ここで \(d(x,y)=|x-y|\) なので

$$
d(a_m,a_n)<\varepsilon
\iff
|a_m-a_n|<\varepsilon.
$$

これは RA1 の実数列の Cauchy 条件そのものです。

次に \(a_n=1/n\) とします。\(m,n\ge N\) なら

$$
\left|\frac1m-\frac1n\right|
\le
\frac1m+\frac1n
\le
\frac2N.
$$

したがって

$$
N>\frac2\varepsilon
$$

と取れば

$$
m,n\ge N
\Longrightarrow
\left|\frac1m-\frac1n\right|<\varepsilon.
$$

よって \((1/n)\) は Cauchy 列です。
<!-- solution-end -->

### F0-00D-A02 有理数の Cauchy 列が穴へ落ちる

- Level: A
- 目安時間: 10分
- 主題: 非完備性

$$
q_n
=
\frac{\lfloor10^n\sqrt2\rfloor}{10^n}
$$

とする。

1. \(q_n\in\mathbb Q\) を確認せよ。
2. \(q_n\to\sqrt2\) が \(\mathbb R\) で成り立つことを示せ。
3. \((q_n)\) が \(\mathbb Q\) の Cauchy 列だが \(\mathbb Q\) では収束しないことを示せ。

<!-- solution-start -->
#### 詳細解答

\(\lfloor10^n\sqrt2\rfloor\) は整数なので

$$
q_n\in\mathbb Q.
$$

床関数の定義から

$$
\lfloor10^n\sqrt2\rfloor
\le
10^n\sqrt2
<
\lfloor10^n\sqrt2\rfloor+1.
$$

両辺を \(10^n\) で割ると

$$
0
\le
\sqrt2-q_n
<
10^{-n}.
$$

したがって

$$
|q_n-\sqrt2|<10^{-n}\to0
$$

であり、\(\mathbb R\) では \(q_n\to\sqrt2\) です。

[収束列は Cauchy 列](#thm-convergent-implies-cauchy)なので \((q_n)\) は Cauchy 列です。\(\mathbb Q\) へ距離を制限しても二項間の距離は同じなので、\(\mathbb Q\) の Cauchy 列でもあります。

もし \(\mathbb Q\) 内のある \(q\) に収束するなら、同じ列は \(\mathbb R\) でも \(q\) に収束します。一方 \(\sqrt2\) にも収束しているので、[極限の一意性](../F0_00B_距離空間_開集合_閉集合_収束/index.md#prop-f0-00b-01)から

$$
q=\sqrt2.
$$

しかし \(\sqrt2\notin\mathbb Q\) なので矛盾です。したがって \(\mathbb Q\) は完備ではありません。
<!-- solution-end -->

### F0-00D-A03 Cauchy 列は有界

- Level: A
- 目安時間: 10分
- 主題: Cauchy 条件の基本帰結

距離空間 \((X,d)\) の Cauchy 列 \((x_n)\) が有界であることを示せ。

<!-- solution-start -->
#### 詳細解答

Cauchy 条件を \(\varepsilon=1\) に適用します。ある \(N\) が存在して

$$
m,n\ge N
\Longrightarrow
d(x_m,x_n)<1
$$

となります。

特に \(m=N\) とすれば、\(n\ge N\) に対して

$$
d(x_n,x_N)<1.
$$

したがって tail \(x_N,x_{N+1},\ldots\) はすべて中心 \(x_N\)、半径 \(1\) の球に入ります。

残る \(x_1,\ldots,x_{N-1}\) は有限個なので

$$
R
=
1+
\max_{1\le k<N}d(x_k,x_N)
$$

と取れば、すべての \(n\) について

$$
d(x_n,x_N)\le R.
$$

よって \((x_n)\) は有界です。
<!-- solution-end -->

### F0-00D-A04 complete と compact を区別する

- Level: A
- 目安時間: 10分
- 主題: 完備性とコンパクト性

\(\mathbb R\) に通常の距離を入れる。次の各集合について、完備か、コンパクトかを判定し、理由を述べよ。

1. \([0,1]\)
2. \((0,1)\)
3. \(\mathbb R\)

<!-- solution-start -->
#### 詳細解答

まず \(\mathbb R\) は [RA1 の実数の完備性](../RA1/index.md#thm-ra1-real-completeness)により完備です。

\([0,1]\) は \(\mathbb R\) の閉集合なので、[完備空間の閉部分集合は完備](#thm-f0-00d-01)より完備です。また閉かつ有界なので [Heine--Borel の定理](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)よりコンパクトです。

\((0,1)\) では

$$
x_n=\frac1n
$$

が Cauchy 列ですが、極限 \(0\) は \((0,1)\) に属しません。したがって完備ではありません。また \((0,1)\) は閉でないので Heine--Borel によりコンパクトでもありません。

\(\mathbb R\) は完備ですが、有界でないので Heine--Borel によりコンパクトではありません。

したがって

| 集合 | 完備 | コンパクト |
|---|---:|---:|
| \([0,1]\) | ○ | ○ |
| \((0,1)\) | × | × |
| \(\mathbb R\) | ○ | × |
<!-- solution-end -->

### F0-00D-B01 \(\mathbb R^p\) の完備性を座標から再構成する

- Level: B
- 目安時間: 15分
- 主題: 実数の完備性から有限次元へ

\(\mathbb R^p\) に Euclid 距離 \(d_2\) を入れる。\((x_n)\) が Cauchy 列なら各座標列が実数の Cauchy 列であることを示し、RA1 の実数の完備性を用いて \(\mathbb R^p\) が完備であることを証明せよ。

<!-- solution-start -->
#### 詳細解答

$$
x_n=(x_n^{(1)},\ldots,x_n^{(p)})
$$

と書きます。任意の座標 \(j\) について

$$
|x_m^{(j)}-x_n^{(j)}|
\le
d_2(x_m,x_n)
$$

なので、\((x_n)\) が \(\mathbb R^p\) で Cauchy なら、各 \((x_n^{(j)})\) は実数の Cauchy 列です。

[RA1 の実数の完備性](../RA1/index.md#thm-ra1-real-completeness)から

$$
x_n^{(j)}\to x^{(j)}\in\mathbb R
\qquad(j=1,\ldots,p)
$$

となる実数が存在します。

$$
x=(x^{(1)},\ldots,x^{(p)})
$$

と置きます。任意の \(\varepsilon>0\) に対し、各 \(j\) で十分大きい \(n\) なら

$$
|x_n^{(j)}-x^{(j)}|
<
\frac\varepsilon{\sqrt p}.
$$

有限個の条件を同時に満たすよう \(N\) を最大値で取れば、\(n\ge N\) で

$$
d_2(x_n,x)^2
=
\sum_{j=1}^p|x_n^{(j)}-x^{(j)}|^2
<
p\frac{\varepsilon^2}{p}
=
\varepsilon^2.
$$

よって \(d_2(x_n,x)<\varepsilon\) です。したがって \(x_n\to x\in\mathbb R^p\) であり、\(\mathbb R^p\) は完備です。
<!-- solution-end -->

### F0-00D-B02 完備な部分空間は閉集合

- Level: B
- 目安時間: 15分
- 主題: 完備性と閉性

距離空間 \((X,d)\) の部分集合 \(F\subset X\) が制限距離について完備であるとする。\(F\) が \(X\) で閉集合であることを示せ。

<!-- solution-start -->
#### 詳細解答

\(F\) 内の点列 \((x_n)\) が \(X\) で

$$
x_n\to x
$$

と収束したとします。

収束列は Cauchy 列なので、\((x_n)\) は \(F\) の Cauchy 列です。\(F\) は完備だから、ある \(y\in F\) が存在して

$$
x_n\to y
$$

となります。

一方、\(X\) では \(x_n\to x\) です。距離空間では極限が一意なので

$$
x=y\in F.
$$

したがって \(F\) の点列の極限は \(F\) から外へ出ません。[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より \(F\) は閉集合です。
<!-- solution-end -->

### F0-00D-B03 有限直積の完備性

- Level: B
- 目安時間: 15分
- 主題: 完備空間の構成

完備距離空間 \((X,d_X)\)、\((Y,d_Y)\) の直積 \(X\times Y\) に

$$
d((x,y),(x',y'))
=
\max\{d_X(x,x'),d_Y(y,y')\}
$$

を入れる。この距離について \(X\times Y\) が完備であることを示せ。

<!-- solution-start -->
#### 詳細解答

\(((x_n,y_n))\) を \(X\times Y\) の Cauchy 列とします。

任意の \(\varepsilon>0\) に対し、十分大きい \(m,n\) で

$$
\max\{
d_X(x_m,x_n),
d_Y(y_m,y_n)
\}
<
\varepsilon.
$$

したがって

$$
d_X(x_m,x_n)<\varepsilon,
\qquad
d_Y(y_m,y_n)<\varepsilon.
$$

よって \((x_n)\) は \(X\) の Cauchy 列、\((y_n)\) は \(Y\) の Cauchy 列です。

\(X,Y\) は完備なので、ある \(x\in X\)、\(y\in Y\) が存在して

$$
x_n\to x,
\qquad
y_n\to y.
$$

したがって

$$
d((x_n,y_n),(x,y))
=
\max\{
d_X(x_n,x),
d_Y(y_n,y)
\}
\to0.
$$

よって \(X\times Y\) は完備です。
<!-- solution-end -->

### F0-00D-C01 完備性から Cantor 型の交点を得る

- Level: C
- 目安時間: 22分
- 主題: 完備性の非自明な利用

完備距離空間 \((X,d)\) で、非空閉集合列

$$
F_1\supseteq F_2\supseteq\cdots
$$

が

$$
\operatorname{diam}(F_n)
:=
\sup\{d(x,y):x,y\in F_n\}
\to0
$$

を満たすとする。

1. \(\bigcap_{n=1}^{\infty}F_n\) が非空であることを示せ。
2. その共通部分が一点だけからなることを示せ。

<!-- solution-start -->
#### 詳細解答

各 \(n\) について \(x_n\in F_n\) を一つ取ります。

\(m\ge n\) なら入れ子性から

$$
x_m\in F_m\subseteq F_n.
$$

したがって \(x_n,x_m\in F_n\) であり

$$
d(x_n,x_m)
\le
\operatorname{diam}(F_n).
$$

右辺は \(n\to\infty\) で \(0\) へ収束するので、\((x_n)\) は Cauchy 列です。\(X\) は完備だから、ある \(x\in X\) が存在して

$$
x_n\to x.
$$

固定した \(N\) を考えます。\(n\ge N\) なら

$$
x_n\in F_n\subseteq F_N.
$$

\(F_N\) は閉集合なので、点列極限 \(x\) も \(F_N\) に属します。\(N\) は任意だから

$$
x\in\bigcap_{N=1}^{\infty}F_N.
$$

よって共通部分は非空です。

次に \(x,y\) がともにすべての \(F_n\) に属するとします。すると各 \(n\) について

$$
d(x,y)
\le
\operatorname{diam}(F_n).
$$

右辺を \(n\to\infty\) とすると

$$
d(x,y)=0.
$$

距離の正定値性から \(x=y\) です。したがって共通部分は一点だけからなります。
<!-- solution-end -->

---

## 10. 次に進む

この章では、RA1 の実数版を一般距離空間へ拡張し、

- Cauchy 列
- 完備距離空間
- \(\mathbb R^p\) の完備性
- 閉部分集合と完備性
- コンパクト距離空間から完備性

を整理しました。

次に「不足した極限そのものを空間へ追加する」と、完備化という構成に進みます。

**次：[F0-00D0A 一般距離空間の完備化](../F0_00D0A_一般距離空間の完備化/index.md)**

その後、ノルムから距離が入るベクトル空間へ進むと Banach 空間が現れます。
