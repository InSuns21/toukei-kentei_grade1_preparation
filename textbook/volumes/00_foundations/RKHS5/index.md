# RKHS5 ソフトマージン・ヒンジ損失・カーネル SVM

<!-- definition-example-audit: strict -->

[RKHS4 のハードマージン SVM](../RKHS4/index.md#def-rkhs4-hard-margin-svm)では、正例と負例が線形分離可能であることを仮定し、

$$
y_i(w^{\mathsf T}x_i+b)\ge 1
$$

を全訓練点で同時に満たしました。しかし、現実のデータでは

- 同じ説明変数に異なるラベルが付く
- 外れ値が一つだけ大きく離れる
- 入力空間では線形分離できない

といったことが普通に起きます。

この章では、ハードマージンの構造を壊さずに

$$
\boxed{
\text{制約違反を許す}
\Longrightarrow
\text{ヒンジ損失}
\Longrightarrow
\text{箱型制約つき双対}
\Longrightarrow
\text{KKT による点の分類}
\Longrightarrow
\text{カーネル化}
}
$$

へ進みます。

さらに [RKHS1 の標準特徴写像](../RKHS1/index.md#def-rkhs1-canonical-feature-map) と
[RKHS2 の表現定理](../RKHS2/index.md#thm-rkhs2-representer)を使い、

$$
\boxed{
f^*(x)
=
\sum_{i=1}^n \alpha_i y_i K(x_i,x)+b
}
$$

というカーネル SVM の有限和表示まで閉じます。

本章では二値ラベル

$$
y_i\in\{-1,+1\}
$$

を用い、正例・負例が少なくとも1点ずつ存在すると仮定します。また正則化係数は

$$
C>0
$$

とします。

---

## 1. ハードマージンが壊れる最小例

最も極端な例として、同じ入力

$$
x_1=x_2=0
$$

に

$$
y_1=+1,
\qquad
y_2=-1
$$

という相反するラベルが付いたとします。

ハードマージン制約は

$$
b\ge1,
\qquad
-b\ge1
$$

を同時に要求します。

これは

$$
b\ge1,
\qquad
b\le-1
$$

なので不可能です。

ここで重要なのは、最適化法が悪いのではなく、

$$
\boxed{
\text{実行可能点が存在しない}
}
$$

ことです。

そこで「全点を必ずマージン外へ置く」という制約そのものを緩めます。

---

## 2. スラック変数で違反量を測る

各訓練点に非負変数

$$
\xi_i\ge0
$$

を導入して、

$$
y_i(w^{\mathsf T}x_i+b)\ge1-\xi_i
$$

とします。

<a id="def-rkhs5-slack-variable"></a>

<!-- formal-statement-start -->
> **定義（スラック変数）**  
> 訓練点 $(x_i,y_i)$ と分類関数
>
$$
g(x)=w^{\mathsf T}x+b
$$
>
> に対し、制約
>
$$
y_i g(x_i)\ge1-\xi_i,
\qquad
\xi_i\ge0
$$
>
> に現れる $\xi_i$ を **スラック変数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs5-slack-variable -->
**定義の確認**：マージン値から最小スラックを読む

ある点で

$$
y_i g(x_i)=0.4
$$

なら、制約を満たすには

$$
0.4\ge1-\xi_i
$$

すなわち

$$
\xi_i\ge0.6
$$

が必要です。

目的関数が $\xi_i$ を正の係数で罰するなら、最適化では余分に大きい $\xi_i$ を選ぶ理由はないため

$$
\xi_i=0.6
$$

が選ばれます。

一方、

$$
y_i g(x_i)=1.3
$$

なら

$$
\xi_i=0
$$

で十分です。
<!-- definition-example-end -->

### 2.1 スラック値の幾何学的な意味

最小スラックは

$$
\xi_i
=
\max\{0,1-y_i g(x_i)\}
$$

です。

したがって、

$$
\xi_i=0
$$

なら点は正しく分類され、少なくともマージン境界上にあります。

$$
0<\xi_i<1
$$

なら正しく分類されているものの、支持超平面の内側です。

$$
\xi_i=1
$$

なら

$$
y_i g(x_i)=0
$$

で中央の分類境界上にあります。

$$
\xi_i>1
$$

なら

$$
y_i g(x_i)<0
$$

なので誤分類されています。

スラックは単なる「誤分類したかどうか」の0--1変数ではなく、

$$
\boxed{
\text{マージン制約をどれだけ破ったか}
}
$$

を連続量として測ります。

---

## 3. ソフトマージン SVM の主問題

<a id="def-rkhs5-soft-margin-primal"></a>

<!-- formal-statement-start -->
> **定義（ソフトマージン SVM）**  
> 二値訓練データ $(x_i,y_i)_{i=1}^n$ と $C>0$ に対し、
>
$$
\min_{w,b,\xi}
\frac12\|w\|_2^2
+
C\sum_{i=1}^n\xi_i
$$
>
> subject to
>
$$
y_i(w^{\mathsf T}x_i+b)\ge1-\xi_i,
\qquad
\xi_i\ge0
\qquad(i=1,\dots,n)
$$
>
> を **線形ソフトマージン SVM** の主問題という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs5-soft-margin-primal -->
**定義の確認**：相反する2点でも実行可能になる

先ほどの

$$
x_1=x_2=0,
\qquad
y_1=+1,
\quad
y_2=-1
$$

を考えます。

$$
w=0,
\qquad
b=0,
\qquad
\xi_1=\xi_2=1
$$

と置けば、

$$
0\ge1-1=0
$$

が両点で成立します。

従ってソフトマージン問題は実行可能です。

さらに2本の制約を足すと

$$
b+\xi_1\ge1,
$$

$$
-b+\xi_2\ge1
$$

なので

$$
\xi_1+\xi_2\ge2.
$$

従ってこの例では

$$
w=0,\quad b=0,\quad \xi_1=\xi_2=1
$$

はスラック総和を最小にしています。
<!-- definition-example-end -->

### 3.1 二つの項は何を競わせているか

目的関数

$$
\frac12\|w\|_2^2
+
C\sum_i\xi_i
$$

の第1項は、法線ベクトルを小さくしてマージンを広くしようとします。

第2項は、マージン違反を小さくしようとします。

したがって $C$ は

$$
\boxed{
\text{広いマージン}
\quad\text{対}\quad
\text{訓練点での違反抑制}
}
$$

の相対的な重みです。

$C$ が大きいほど違反を強く嫌い、$C$ が小さいほど大きなマージンを優先します。

ただし「$C$ が大きければ常に精度が上がる」という意味ではありません。ここで直接変わるのは訓練目的関数であり、未知データに対する性能は別途評価する必要があります。

---

## 4. スラックを消去するとヒンジ損失になる

<a id="def-rkhs5-hinge-loss"></a>

<!-- formal-statement-start -->
> **定義（ヒンジ損失）**  
> 実数 $t$ に対して
>
$$
\ell_{\mathrm{hinge}}(t)
=
\max\{0,1-t\}
$$
>
> を **ヒンジ損失**という。二値分類では
>
$$
t=y\,g(x)
$$
>
> として用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs5-hinge-loss -->
**定義の確認**：4つのマージン値

$$
t=2,\ 1,\ 0.4,\ -0.5
$$

に対して

$$
\ell_{\mathrm{hinge}}(2)=0,
$$

$$
\ell_{\mathrm{hinge}}(1)=0,
$$

$$
\ell_{\mathrm{hinge}}(0.4)=0.6,
$$

$$
\ell_{\mathrm{hinge}}(-0.5)=1.5.
$$

正しく分類されていても $0<t<1$ なら損失は正です。つまりヒンジ損失は誤分類だけでなく、マージン内部へ入った正分類点も罰します。
<!-- definition-example-end -->

<a id="thm-rkhs5-slack-hinge-equivalence"></a>

<!-- formal-statement-start -->
> **定理（スラック形式とヒンジ損失形式の同値性）**  
> $C>0$ とする。ソフトマージン SVM
>
$$
\min_{w,b,\xi}
\frac12\|w\|_2^2
+
C\sum_i\xi_i
$$
>
> subject to
>
$$
y_i(w^{\mathsf T}x_i+b)\ge1-\xi_i,
\qquad
\xi_i\ge0
$$
>
> は、
>
$$
\boxed{
\min_{w,b}
\frac12\|w\|_2^2
+
C\sum_{i=1}^n
\max\{0,1-y_i(w^{\mathsf T}x_i+b)\}
}
$$
>
> と同値である。最適なスラックは
>
$$
\xi_i^*
=
\max\{0,1-y_i(w^{\mathsf T}x_i+b)\}
$$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

$(w,b)$ を固定すると、各 $\xi_i$ は互いに独立です。

制約から

$$
\xi_i\ge0,
\qquad
\xi_i\ge1-y_i(w^{\mathsf T}x_i+b)
$$

なので、可能な最小値は二つの下界の最大値です。

<!-- proof-start -->
### 証明

$(w,b)$ を固定します。

$i$ 番目のスラック制約は

$$
y_i(w^{\mathsf T}x_i+b)\ge1-\xi_i
$$

です。

移項して

$$
\xi_i
\ge
1-y_i(w^{\mathsf T}x_i+b).
$$

さらに

$$
\xi_i\ge0.
$$

従って実行可能な $\xi_i$ は

$$
\xi_i
\ge
\max\{
0,\,
1-y_i(w^{\mathsf T}x_i+b)
\}
$$

を満たします。

目的関数では $C>0$ なので、$\xi_i$ を必要以上に増やすと目的値が真に大きくなります。

従って固定した $(w,b)$ に対して最適な値は

$$
\xi_i^*
=
\max\{
0,\,
1-y_i(w^{\mathsf T}x_i+b)
\}
$$

です。

これを主問題へ代入すると

$$
\min_{w,b}
\frac12\|w\|_2^2
+
C\sum_i
\max\{
0,\,
1-y_i(w^{\mathsf T}x_i+b)
\}
$$

を得ます。
<!-- proof-end -->

### 4.1 正則化付き経験損失として読む

別の流儀では

$$
\frac{\lambda}{2}\|w\|_2^2
+
\frac1n\sum_i
\ell_{\mathrm{hinge}}
\bigl(y_i(w^{\mathsf T}x_i+b)\bigr)
$$

と書きます。

この目的関数を正の定数 $1/\lambda$ 倍すると

$$
\frac12\|w\|_2^2
+
\frac{1}{\lambda n}
\sum_i
\ell_{\mathrm{hinge}}(\cdots)
$$

なので、本章の規約では

$$
C=\frac{1}{\lambda n}
$$

に対応します。

文献ごとに $n$ をどこへ吸収するかが異なるため、数値としての $C$ や $\lambda$ を比較するときは目的関数全体の規約を確認する必要があります。

---

## 5. ヒンジ損失はなぜ凸なのか

ヒンジ損失は

$$
\ell_{\mathrm{hinge}}(t)
=
\max\{0,1-t\}
$$

です。

$0$ も $1-t$ もアフィン関数なので凸です。凸関数の有限個の最大値は凸なので、

$$
t\longmapsto\ell_{\mathrm{hinge}}(t)
$$

は凸です。

さらに

$$
(w,b)
\longmapsto
y_i(w^{\mathsf T}x_i+b)
$$

はアフィン写像なので、その合成

$$
(w,b)
\longmapsto
\ell_{\mathrm{hinge}}
\bigl(y_i(w^{\mathsf T}x_i+b)\bigr)
$$

も凸です。

従ってソフトマージン SVM は凸最適化問題です。

### 5.1 微分できない点はあるが、凸性は失わない

$t=1$ では折れ曲がるため通常の意味では微分できません。

しかし [OPT3](../OPT3/index.md) で見た劣微分を使えば、

$$
\partial\ell_{\mathrm{hinge}}(t)
=
\begin{cases}
\{-1\}, & t<1,\\
[-1,0], & t=1,\\
\{0\}, & t>1
\end{cases}
$$

と書けます。

「微分できない」ことと「最適化できない」ことは同じではありません。むしろヒンジ損失は、非滑らかだが凸という典型例です。

---

## 6. ソフトマージン双対を Lagrangian から導く

主問題を

$$
\min_{w,b,\xi}
\frac12\|w\|_2^2
+
C\sum_i\xi_i
$$

subject to

$$
1-\xi_i-y_i(w^{\mathsf T}x_i+b)\le0,
$$

$$
-\xi_i\le0
$$

と書きます。

前者の乗数を

$$
\alpha_i\ge0,
$$

後者の乗数を

$$
\beta_i\ge0
$$

とします。

Lagrangian は

$$
\begin{aligned}
L
&=
\frac12\|w\|_2^2
+
C\sum_i\xi_i\\
&\quad+
\sum_i\alpha_i
\left[
1-\xi_i-y_i(w^{\mathsf T}x_i+b)
\right]
-
\sum_i\beta_i\xi_i.
\end{aligned}
$$

停留条件を順に計算します。

$w$ について

$$
w-\sum_i\alpha_i y_i x_i=0,
$$

従って

$$
\boxed{
w=\sum_i\alpha_i y_i x_i.
}
$$

$b$ について

$$
-\sum_i\alpha_i y_i=0,
$$

従って

$$
\boxed{
\sum_i\alpha_i y_i=0.
}
$$

$\xi_i$ について

$$
C-\alpha_i-\beta_i=0.
$$

$\beta_i\ge0$ なので

$$
\alpha_i\le C.
$$

もともと $\alpha_i\ge0$ なので、

$$
\boxed{
0\le\alpha_i\le C.
}
$$

ここがハードマージン双対との決定的な違いです。

<a id="thm-rkhs5-soft-margin-dual"></a>

<!-- formal-statement-start -->
> **定理（ソフトマージン SVM の Lagrange 双対）**  
> 二値訓練データが正例・負例を少なくとも1点ずつ含み、$C>0$ とする。線形ソフトマージン SVM の双対問題は
>
$$
\boxed{
\max_{\alpha\in\mathbb R^n}
\sum_{i=1}^n\alpha_i
-
\frac12
\sum_{i,j=1}^n
\alpha_i\alpha_jy_i y_j x_i^{\mathsf T}x_j
}
$$
>
> subject to
>
$$
0\le\alpha_i\le C,
\qquad
\sum_{i=1}^n\alpha_i y_i=0.
$$
>
> また主問題は Slater 条件を満たすため、主最適値と双対最適値は一致し、最適 KKT 組が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

停留条件で $w,b,\xi$ を消去すると、ハードマージン双対と同じ二次目的が残ります。ただし $\xi_i$ の停留条件から

$$
0\le\alpha_i\le C
$$

という上限制約が追加されます。

強双対性については、ソフトマージンでは厳密実行可能点を簡単に作れます。

<!-- proof-start -->
### 証明

上で導いた停留条件

$$
w=\sum_i\alpha_i y_i x_i,
$$

$$
\sum_i\alpha_i y_i=0,
$$

$$
C-\alpha_i-\beta_i=0
$$

を使います。

最後の式と

$$
\alpha_i\ge0,
\qquad
\beta_i\ge0
$$

から

$$
0\le\alpha_i\le C
$$

です。

Lagrangian の $b$ を含む項は

$$
-b\sum_i\alpha_i y_i=0
$$

になります。

$\xi_i$ を含む係数も

$$
C-\alpha_i-\beta_i=0
$$

なので消えます。

残るのは

$$
\frac12\|w\|_2^2
+
\sum_i\alpha_i
-
w^{\mathsf T}
\sum_i\alpha_i y_i x_i.
$$

停留条件から

$$
\sum_i\alpha_i y_i x_i=w
$$

なので

$$
L
=
\sum_i\alpha_i
-\frac12\|w\|_2^2.
$$

さらに

$$
\|w\|_2^2
=
\left\|
\sum_i\alpha_i y_i x_i
\right\|_2^2
=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j x_i^{\mathsf T}x_j.
$$

従って双対目的は

$$
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_j y_i y_j x_i^{\mathsf T}x_j
$$

です。

次に Slater 条件を確認します。

例えば

$$
w=0,
\qquad
b=0,
\qquad
\xi_i=2
$$

と置きます。

すると

$$
1-\xi_i-y_i(w^{\mathsf T}x_i+b)
=
1-2-0
=
-1<0,
$$

かつ

$$
-\xi_i=-2<0.
$$

従って全不等式制約を厳密に満たす点が存在します。

目的関数と制約は凸なので、
[Slater 条件による強双対性](../OPT5/index.md#thm-opt5-slater-strong-duality)が適用でき、主最適値と双対最適値は一致します。

また KKT 条件が最適性を特徴付けます。
<!-- proof-end -->

---

## 7. KKT 条件を全部並べる

<a id="thm-rkhs5-kkt"></a>

<!-- formal-statement-start -->
> **定理（ソフトマージン SVM の KKT 条件）**  
> 主変数 $(w,b,\xi)$ と双対変数 $(\alpha,\beta)$ が最適であるための必要十分条件は次である。
>
> **主実行可能性**
>
$$
y_i(w^{\mathsf T}x_i+b)\ge1-\xi_i,
\qquad
\xi_i\ge0.
$$
>
> **双対実行可能性**
>
$$
\alpha_i\ge0,
\qquad
\beta_i\ge0.
$$
>
> **停留条件**
>
$$
w=\sum_i\alpha_i y_i x_i,
$$
>
$$
\sum_i\alpha_i y_i=0,
$$
>
$$
C-\alpha_i-\beta_i=0.
$$
>
> **相補性**
>
$$
\alpha_i
\left[
1-\xi_i-y_i(w^{\mathsf T}x_i+b)
\right]
=0,
$$
>
$$
\beta_i\xi_i=0.
$$
>
> 特に
>
$$
0\le\alpha_i\le C
$$
>
> が成り立つ。
<!-- formal-statement-end -->

この式から、訓練点の位置と双対変数の関係を読みます。

---

## 8. KKT による訓練点の分類

<a id="def-rkhs5-kkt-point-classes"></a>

<!-- formal-statement-start -->
> **定義（自由サポートベクトルと上限制約サポートベクトル）**  
> 最適双対変数 $\alpha_i^*$ に対し、
>
$$
0<\alpha_i^*<C
$$
>
> を満たす訓練点を **自由サポートベクトル**、
>
$$
\alpha_i^*=C
$$
>
> を満たす訓練点を **上限制約サポートベクトル**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs5-kkt-point-classes -->
**定義の確認**：$\alpha_i$ からマージン値を逆算する

ある最適点で

$$
0<\alpha_i<C
$$

とします。

停留条件

$$
\beta_i=C-\alpha_i
$$

から

$$
\beta_i>0.
$$

相補性

$$
\beta_i\xi_i=0
$$

より

$$
\xi_i=0.
$$

さらに $\alpha_i>0$ なので

$$
1-\xi_i-y_i g(x_i)=0.
$$

従って

$$
y_i g(x_i)=1.
$$

つまり自由サポートベクトルは必ずマージン境界上です。
<!-- definition-example-end -->

<a id="prop-rkhs5-kkt-point-classification"></a>

<!-- formal-statement-start -->
> **命題（双対変数とマージン位置の対応）**  
> 最適 KKT 組について、次が成り立つ。
>
> 1. $\alpha_i=0$ なら
>
$$
y_i g(x_i)\ge1.
$$
>
> 2. $0<\alpha_i<C$ なら
>
$$
\xi_i=0,
\qquad
y_i g(x_i)=1.
$$
>
> 3. $\alpha_i=C$ なら
>
$$
y_i g(x_i)=1-\xi_i\le1.
$$
>
> 従って $\alpha_i=C$ の点は、マージン境界上、マージン内部、分類境界上、誤分類側のいずれにもなり得る。
<!-- formal-statement-end -->

### 証明の見取り図

鍵は

$$
\beta_i=C-\alpha_i
$$

と二つの相補性条件です。

$\alpha_i=0$ ではマージン制約が等号とは限りません。

$0<\alpha_i<C$ なら $\alpha_i,\beta_i$ がともに正なので、二つの制約がともに等号化します。

$\alpha_i=C$ では $\beta_i=0$ なので、$\xi_i$ は正でもよくなります。

<!-- proof-start -->
### 証明

まず

$$
\alpha_i=0
$$

とします。

もし $\xi_i>0$ なら、相補性

$$
\beta_i\xi_i=0
$$

から $\beta_i=0$ です。

しかし停留条件

$$
C-\alpha_i-\beta_i=0
$$

へ $\alpha_i=\beta_i=0$ を代入すると $C=0$ となり、$C>0$ に反します。

従って

$$
\xi_i=0.
$$

主実行可能性より

$$
y_i g(x_i)\ge1.
$$

次に

$$
0<\alpha_i<C
$$

とします。

$\alpha_i>0$ なので最初の相補性から

$$
1-\xi_i-y_i g(x_i)=0.
$$

また

$$
\beta_i=C-\alpha_i>0
$$

なので、二番目の相補性から

$$
\xi_i=0.
$$

従って

$$
y_i g(x_i)=1.
$$

最後に

$$
\alpha_i=C
$$

とします。

停留条件から

$$
\beta_i=0.
$$

$\alpha_i>0$ なので最初の相補性は

$$
1-\xi_i-y_i g(x_i)=0.
$$

従って

$$
y_i g(x_i)=1-\xi_i.
$$

$\xi_i\ge0$ だから

$$
y_i g(x_i)\le1.
$$

$\xi_i$ の値により、$y_i g(x_i)$ は $1$、$(0,1)$、$0$、負の値を取り得ます。
<!-- proof-end -->

### 8.1 逆向きは退化に注意する

例えば

$$
y_i g(x_i)=1
$$

だからといって必ず

$$
0<\alpha_i<C
$$

とは限りません。

退化した最適解では

$$
\alpha_i=0
$$

または

$$
\alpha_i=C
$$

でもマージン境界上にいることがあります。

従って安全なのは

$$
0<\alpha_i<C
\Longrightarrow
y_i g(x_i)=1
$$

という向きです。

[RKHS4](../RKHS4/index.md#def-rkhs4-support-vector)で見た「マージン点と正の双対係数を持つ点は退化時に一致しない」という注意は、ソフトマージンでも残ります。

---

## 9. 自由サポートベクトルから切片を求める

もし

$$
0<\alpha_j<C
$$

を満たす点 $j$ が存在すれば、

$$
y_j g(x_j)=1
$$

です。

線形 SVM では

$$
g(x)
=
\sum_i\alpha_i y_i x_i^{\mathsf T}x+b
$$

なので

$$
1
=
y_j
\left(
\sum_i\alpha_i y_i x_i^{\mathsf T}x_j+b
\right).
$$

$y_j^2=1$ を使うと

$$
\boxed{
b
=
y_j
-
\sum_i\alpha_i y_i x_i^{\mathsf T}x_j.
}
$$

となります。

自由サポートベクトルが複数ある場合、厳密な最適解ではどの点から計算しても同じ $b$ を与えます。

数値計算では丸め誤差があるため、複数点から得た値を平均する実装もよく使われます。

一方、自由サポートベクトルが存在しない退化ケースでは、この公式だけでは $b$ を決められません。その場合は

$$
\alpha_i=0
\Longrightarrow
y_i g(x_i)\ge1,
$$

$$
\alpha_i=C
\Longrightarrow
y_i g(x_i)\le1
$$

などから $b$ の許容区間を求めます。

---

## 10. 特徴写像へ持ち上げる

ここまでの導出で入力ベクトル $x_i$ が現れた場所を振り返ると、双対目的では

$$
x_i^{\mathsf T}x_j
$$

という内積だけが現れます。

そこで特徴写像

$$
\Phi:\mathcal X\to\mathcal H
$$

を Hilbert 空間 $\mathcal H$ へ取り、

$$
x_i^{\mathsf T}x_j
$$

を

$$
\langle\Phi(x_i),\Phi(x_j)\rangle_{\mathcal H}
$$

へ置き換えます。

<a id="def-rkhs5-kernel-trick"></a>

<!-- formal-statement-start -->
> **定義（カーネルトリック）**  
> 特徴写像 $\Phi:\mathcal X\to\mathcal H$ に対して
>
$$
K(x,z)
=
\langle\Phi(x),\Phi(z)\rangle_{\mathcal H}
$$
>
> を直接計算できるとき、特徴座標 $\Phi(x)$ を明示的に構成せず、必要な内積を $K(x,z)$ で置き換えて計算することを **カーネルトリック**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs5-kernel-trick -->
**定義の確認**：2次多項式カーネル

$x=(x_1,x_2)$ に対し

$$
\Phi(x)
=
(x_1^2,\sqrt2 x_1x_2,x_2^2)
$$

と置きます。

すると

$$
\begin{aligned}
\langle\Phi(x),\Phi(z)\rangle
&=
x_1^2z_1^2
+
2x_1x_2z_1z_2
+
x_2^2z_2^2\\
&=
(x_1z_1+x_2z_2)^2\\
&=
(x^{\mathsf T}z)^2.
\end{aligned}
$$

従って

$$
K(x,z)=(x^{\mathsf T}z)^2
$$

を評価すれば、3次元特徴ベクトルを明示的に作らなくても特徴空間内積が得られます。
<!-- definition-example-end -->

[RKHS1](../RKHS1/index.md#thm-rkhs1-moore-aronszajn)で見たように、正半定値核 $K$ には対応する RKHS が存在します。

したがって「高次元の特徴写像が先にあり、その内積をカーネルで近道する」という見方だけでなく、

$$
\boxed{
\text{正半定値核}
\Longrightarrow
\text{RKHS}
\Longrightarrow
\text{標準特徴写像 }x\mapsto K_x
}
$$

と核から出発することもできます。

---

## 11. カーネル SVM の主問題

$\mathcal H$ を再生核 $K$ を持つ RKHS とし、

$$
f\in\mathcal H,
\qquad
b\in\mathbb R
$$

で分類関数

$$
x\longmapsto f(x)+b
$$

を作ります。

<a id="def-rkhs5-kernel-svm"></a>

<!-- formal-statement-start -->
> **定義（カーネル SVM）**  
> RKHS $\mathcal H$、再生核 $K$、二値訓練データ $(x_i,y_i)$、$C>0$ に対し、
>
$$
\boxed{
\min_{f\in\mathcal H,\ b\in\mathbb R}
\frac12\|f\|_{\mathcal H}^2
+
C\sum_{i=1}^n
\max\{0,1-y_i(f(x_i)+b)\}
}
$$
>
> を **カーネル SVM** の主問題という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rkhs5-kernel-svm -->
**定義の確認**：線形核なら通常の線形 SVM に戻る

$\mathcal X=\mathbb R^p$ で

$$
K(x,z)=x^{\mathsf T}z
$$

とします。

対応する RKHS の関数は

$$
f_w(x)=w^{\mathsf T}x
$$

と書け、

$$
\|f_w\|_{\mathcal H}=\|w\|_2.
$$

従ってカーネル SVM の目的関数は

$$
\frac12\|w\|_2^2
+
C\sum_i
\max\{0,1-y_i(w^{\mathsf T}x_i+b)\},
$$

すなわち線形ソフトマージン SVM そのものです。
<!-- definition-example-end -->

### 11.1 表現定理から有限和へ落ちる

$b$ を固定して考えると、目的関数の $f$ 依存部分は

- 有限個の点評価 $f(x_i)$
- RKHS ノルム $\|f\|_{\mathcal H}$

だけです。

従って [RKHS2 の表現定理](../RKHS2/index.md#thm-rkhs2-representer)により、最小解は

$$
f^*(\cdot)
=
\sum_{i=1}^n c_i K(x_i,\cdot)
$$

の形に取れます。

さらに SVM の KKT 条件まで使うと、係数は

$$
c_i=\alpha_i y_i
$$

という特別な形になります。

---

## 12. カーネル SVM の双対

特徴空間で

$$
w
=
\sum_i\alpha_i y_i\Phi(x_i)
$$

となるので、

$$
\begin{aligned}
\|w\|_{\mathcal H}^2
&=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
\langle\Phi(x_i),\Phi(x_j)\rangle_{\mathcal H}\\
&=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
K(x_i,x_j).
\end{aligned}
$$

<a id="thm-rkhs5-kernel-dual"></a>

<!-- formal-statement-start -->
> **定理（カーネル SVM の双対と判別関数）**  
> 正半定値核 $K$ と $C>0$ に対するカーネル SVM の双対問題は
>
$$
\boxed{
\max_{\alpha}
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_j y_i y_j K(x_i,x_j)
}
$$
>
> subject to
>
$$
0\le\alpha_i\le C,
\qquad
\sum_i\alpha_i y_i=0.
$$
>
> 最適双対変数を $\alpha^*$ とすると、分類関数は
>
$$
\boxed{
g^*(x)
=
\sum_{i=1}^n
\alpha_i^* y_i K(x_i,x)
+
b^*
}
$$
>
> と書ける。
<!-- formal-statement-end -->

### 証明の見取り図

線形 SVM の双対導出で現れる内積

$$
x_i^{\mathsf T}x_j
$$

を特徴空間内積へ置き換えます。

その後

$$
\langle\Phi(x_i),\Phi(x_j)\rangle=K(x_i,x_j)
$$

を使うだけで、双対と予測式の両方から特徴座標が消えます。

<!-- proof-start -->
### 証明

特徴空間上のスラック形式

$$
\min_{w,b,\xi}
\frac12\|w\|_{\mathcal H}^2
+
C\sum_i\xi_i
$$

subject to

$$
y_i(
\langle w,\Phi(x_i)\rangle_{\mathcal H}+b
)
\ge1-\xi_i,
$$

$$
\xi_i\ge0
$$

を考えます。

Lagrangian の $w$ に関する停留条件は、任意の方向 $h\in\mathcal H$ に対して

$$
\left\langle
w-\sum_i\alpha_i y_i\Phi(x_i),
h
\right\rangle_{\mathcal H}
=0
$$

です。

内積の非退化性から

$$
w
=
\sum_i\alpha_i y_i\Phi(x_i).
$$

$b,\xi_i$ に関する停留条件は有限次元の場合と同じなので

$$
\sum_i\alpha_i y_i=0,
$$

$$
0\le\alpha_i\le C.
$$

また

$$
\begin{aligned}
\|w\|_{\mathcal H}^2
&=
\left\langle
\sum_i\alpha_i y_i\Phi(x_i),
\sum_j\alpha_j y_j\Phi(x_j)
\right\rangle_{\mathcal H}\\
&=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
K(x_i,x_j).
\end{aligned}
$$

従って双対目的関数は

$$
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_j y_i y_j K(x_i,x_j)
$$

です。

予測時には

$$
\begin{aligned}
g(x)
&=
\langle w,\Phi(x)\rangle_{\mathcal H}+b\\
&=
\sum_i\alpha_i y_i
\langle\Phi(x_i),\Phi(x)\rangle_{\mathcal H}
+b\\
&=
\sum_i\alpha_i y_i K(x_i,x)+b.
\end{aligned}
$$

従って特徴空間の座標を明示せずに学習・予測の両方を書けます。
<!-- proof-end -->

### 12.1 Gram 行列で見る

Gram 行列を

$$
G_{ij}=K(x_i,x_j)
$$

とし、

$$
Y=\operatorname{diag}(y_1,\dots,y_n)
$$

と置けば、双対目的は

$$
\mathbf 1^{\mathsf T}\alpha
-
\frac12
\alpha^{\mathsf T}YGY\alpha
$$

です。

$G\succeq0$ なので

$$
YGY\succeq0.
$$

従って負の二次項

$$
-\frac12\alpha^{\mathsf T}YGY\alpha
$$

は凹であり、双対問題は凸最適化の意味で扱いやすい凹最大化問題です。

---

## 13. XOR を多項式カーネルで分離する

入力を

$$
(1,1),\quad
(1,-1),\quad
(-1,1),\quad
(-1,-1)
$$

とし、ラベルを

$$
y=x_1x_2
$$

で定めます。

つまり

$$
(1,1),(-1,-1)
$$

は正例、

$$
(1,-1),(-1,1)
$$

は負例です。

入力平面では一本の直線で分離できません。

しかし

$$
K(x,z)=(x^{\mathsf T}z)^2
$$

に対応する特徴写像

$$
\Phi(x)
=
(x_1^2,\sqrt2x_1x_2,x_2^2)
$$

を考えると、

$$
w=
\left(
0,\frac1{\sqrt2},0
\right),
\qquad
b=0
$$

に対して

$$
\langle w,\Phi(x)\rangle
=
x_1x_2.
$$

従って全4点で

$$
y\langle w,\Phi(x)\rangle
=
(x_1x_2)^2
=
1.
$$

つまり特徴空間では完全に線形分離できます。

この例で起きているのは

$$
\boxed{
\text{入力空間で非線形な境界}
=
\text{特徴空間で線形な超平面}
}
$$

という変換です。

カーネル SVM は特徴空間で線形 SVM を解いています。非線形性は最適化問題の側ではなく、入力を比較する内積 $K(x,z)$ の側へ移っています。

---

## 14. カーネルを選ぶとは何を選ぶことか

カーネル

$$
K(x,z)
$$

を選ぶことは、単に「計算公式を選ぶ」ことではありません。

[Moore--Aronszajn の定理](../RKHS1/index.md#thm-rkhs1-moore-aronszajn)により、正半定値核は対応する RKHS を定めます。

従ってカーネルを選ぶことは、

$$
\boxed{
\text{どの関数空間で分類境界を探すか}
}
$$

を選ぶことです。

例えば線形核

$$
K(x,z)=x^{\mathsf T}z
$$

なら線形境界です。

2次多項式核

$$
K(x,z)=(x^{\mathsf T}z)^2
$$

なら2次特徴まで使えます。

Gaussian 核

$$
K(x,z)
=
\exp\left(
-\frac{\|x-z\|_2^2}{2\sigma^2}
\right)
$$

では、対応する RKHS は一般に無限次元です。

それでも双対問題と予測式は有限個の核評価だけで書けます。

---

## 15. $C$ とカーネルパラメータは別の役割を持つ

Gaussian 核を例にすると、少なくとも

$$
C
$$

と

$$
\sigma
$$

という二種類の量が現れます。

$C$ は

$$
\text{RKHS ノルムによる複雑さ}
\quad\text{対}\quad
\text{訓練ヒンジ損失}
$$

の重みを変えます。

一方 $\sigma$ は

$$
K(x,z)
=
\exp\left(
-\frac{\|x-z\|^2}{2\sigma^2}
\right)
$$

という核そのものを変えるので、探している関数空間の幾何を変えます。

従って

$$
\boxed{
C:\text{同じ空間内での正則化の強さ},
\qquad
\sigma:\text{空間自体の幾何}
}
$$

と区別すると整理しやすくなります。

---

## 16. ハードマージンとの接続

もしデータが特徴空間で線形分離可能なら、十分大きな $C$ に対してソフトマージン解がハードマージン解と一致する場合があります。

ただし

$$
C\to\infty
$$

とすれば無条件に「良い分類器へ収束する」と考えてはいけません。

線形分離不能なら、どれだけ $C$ を大きくしても

$$
\sum_i\xi_i=0
$$

にはできません。

さらにカーネルやデータが変われば、必要な $C$ のスケールも変わります。

本質は

$$
\boxed{
\text{ハードマージン}
=
\text{制約違反を一切許さないモデル},
}
$$

$$
\boxed{
\text{ソフトマージン}
=
\text{違反量を目的関数へ移して最適な妥協を選ぶモデル}
}
$$

という違いです。

---

## 17. RKHS1 から RKHS5 までを一本に戻す

ここまでをつなぐと、

$$
\boxed{
\begin{array}{c}
\text{正半定値核}\\
\Downarrow\\
\text{再生核 Hilbert 空間}\\
\Downarrow\\
\text{表現定理}\\
\Downarrow\\
\text{有限標本上の Gram 行列}\\
\Downarrow\\
\text{最大マージン凸最適化}\\
\Downarrow\\
\text{ソフトマージン・ヒンジ損失}\\
\Downarrow\\
\text{双対の内積を核で置換}\\
\Downarrow\\
\text{カーネル SVM}
\end{array}
}
$$

です。

「カーネルトリック」は最後に突然現れる裏技ではありません。

- RKHS1 が「核と内積空間」を作る
- RKHS2 が「有限標本なら有限和へ落ちる」と保証する
- RKHS4 が「最大マージンを凸 QP と KKT で解く」
- RKHS5 が「違反を許し、双対の内積を核へ置き換える」

という積み重ねの最後に現れます。

---

# 演習

## Level A

<a id="ex-rkhs5-a01"></a>

### RKHS5-A01 スラック値と点の位置

- Level: A
- 目安時間: 10分

ある訓練点について最適分類関数のマージン値

$$
m_i=y_i g(x_i)
$$

がそれぞれ

$$
1.4,\quad 1,\quad 0.3,\quad 0,\quad -0.8
$$

であるとする。

各場合について最小スラック

$$
\xi_i
$$

を求め、点が

1. マージン外
2. マージン境界
3. 正分類だがマージン内部
4. 分類境界
5. 誤分類

のどれに当たるか答えよ。

<!-- solution-start -->
#### 詳細解答

最小スラックは

$$
\xi_i
=
\max\{0,1-m_i\}
$$

です。

まず

$$
m_i=1.4
$$

なら

$$
\xi_i=\max\{0,-0.4\}=0.
$$

しかも $m_i>1$ なのでマージン外です。

次に

$$
m_i=1
$$

なら

$$
\xi_i=0.
$$

等号

$$
y_i g(x_i)=1
$$

なのでマージン境界です。

次に

$$
m_i=0.3
$$

なら

$$
\xi_i=1-0.3=0.7.
$$

$m_i>0$ なので分類自体は正しい一方、

$$
m_i<1
$$

なのでマージン内部です。

次に

$$
m_i=0
$$

なら

$$
\xi_i=1.
$$

これは

$$
g(x_i)=0
$$

を意味するので分類境界上です。

最後に

$$
m_i=-0.8
$$

なら

$$
\xi_i=1-(-0.8)=1.8.
$$

$m_i<0$ なのでラベルと判別関数の符号が逆で、誤分類です。

従って対応は

$$
\begin{array}{c|c|c}
m_i & \xi_i & \text{位置}\\
\hline
1.4 & 0 & \text{マージン外}\\
1 & 0 & \text{マージン境界}\\
0.3 & 0.7 & \text{正分類だがマージン内部}\\
0 & 1 & \text{分類境界}\\
-0.8 & 1.8 & \text{誤分類}
\end{array}
$$

です。
<!-- solution-end -->

<a id="ex-rkhs5-a02"></a>

### RKHS5-A02 スラック形式からヒンジ損失へ

- Level: A
- 目安時間: 10分

固定した $(w,b)$ に対し、

$$
m_i=y_i(w^{\mathsf T}x_i+b)
$$

と置く。

制約

$$
m_i\ge1-\xi_i,
\qquad
\xi_i\ge0
$$

の下で

$$
C\xi_i
$$

を最小化するとき、

$$
\xi_i^*=\max\{0,1-m_i\}
$$

になることを、$m_i\ge1$ と $m_i<1$ に場合分けして示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
m_i\ge1
$$

とします。

このとき

$$
1-m_i\le0.
$$

制約は

$$
\xi_i\ge1-m_i,
\qquad
\xi_i\ge0
$$

ですが、後者の方が強いので最小可能値は

$$
\xi_i^*=0.
$$

一方、

$$
m_i<1
$$

なら

$$
1-m_i>0.
$$

このとき

$$
\xi_i\ge1-m_i
$$

が非負制約より強いので、最小可能値は

$$
\xi_i^*=1-m_i.
$$

従って両場合をまとめると

$$
\xi_i^*
=
\max\{0,1-m_i\}.
$$

$C>0$ なので、実行可能な範囲で $\xi_i$ をこれより大きく取ると

$$
C\xi_i
$$

が増えるだけです。

したがってスラックを消去した損失は

$$
C\max\{0,1-m_i\}
$$

です。
<!-- solution-end -->

<a id="ex-rkhs5-a03"></a>

### RKHS5-A03 KKT から自由サポートベクトルを読む

- Level: A
- 目安時間: 12分

ソフトマージン SVM の最適 KKT 組で

$$
0<\alpha_i<C
$$

とする。

$$
\beta_i=C-\alpha_i
$$

および相補性

$$
\alpha_i[1-\xi_i-y_i g(x_i)]=0,
$$

$$
\beta_i\xi_i=0
$$

から

$$
\xi_i=0,
\qquad
y_i g(x_i)=1
$$

を導け。

<!-- solution-start -->
#### 詳細解答

仮定

$$
0<\alpha_i<C
$$

から

$$
\alpha_i>0.
$$

従って

$$
\alpha_i[1-\xi_i-y_i g(x_i)]=0
$$

では $\alpha_i$ が0でないので、

$$
1-\xi_i-y_i g(x_i)=0.
$$

また

$$
\beta_i=C-\alpha_i>0.
$$

従って

$$
\beta_i\xi_i=0
$$

では $\beta_i$ が0でないので、

$$
\xi_i=0.
$$

これを最初の等式へ代入すると

$$
1-y_i g(x_i)=0.
$$

従って

$$
y_i g(x_i)=1.
$$

つまり $0<\alpha_i<C$ の点は必ずスラック0のマージン境界上にあります。
<!-- solution-end -->

<a id="ex-rkhs5-a04"></a>

### RKHS5-A04 2次多項式カーネルの確認

- Level: A
- 目安時間: 12分

$$
\Phi(x_1,x_2)
=
(x_1^2,\sqrt2x_1x_2,x_2^2)
$$

とする。

1. $\langle\Phi(x),\Phi(z)\rangle=(x^{\mathsf T}z)^2$ を示せ。
2. XOR ラベル
   $$
   y=x_1x_2
   $$
   に対し
   $$
   w=(0,1/\sqrt2,0),
   \qquad
   b=0
   $$
   とすると
   $$
   \langle w,\Phi(x)\rangle=x_1x_2
   $$
   となることを示せ。
3. $x_1,x_2\in\{-1,+1\}$ なら全4点の関数マージンが1であることを示せ。

<!-- solution-start -->
#### 詳細解答

まず内積を展開します。

$$
\begin{aligned}
\langle\Phi(x),\Phi(z)\rangle
&=
x_1^2z_1^2
+
(\sqrt2x_1x_2)(\sqrt2z_1z_2)
+
x_2^2z_2^2\\
&=
x_1^2z_1^2
+
2x_1x_2z_1z_2
+
x_2^2z_2^2\\
&=
(x_1z_1+x_2z_2)^2\\
&=
(x^{\mathsf T}z)^2.
\end{aligned}
$$

次に

$$
w=(0,1/\sqrt2,0)
$$

なので

$$
\begin{aligned}
\langle w,\Phi(x)\rangle
&=
0\cdot x_1^2
+
\frac1{\sqrt2}\cdot\sqrt2x_1x_2
+
0\cdot x_2^2\\
&=
x_1x_2.
\end{aligned}
$$

$b=0$ だから判別値も

$$
g(x)=x_1x_2.
$$

ラベルは

$$
y=x_1x_2
$$

なので

$$
yg(x)
=
(x_1x_2)^2.
$$

$x_1,x_2\in\{-1,+1\}$ なら

$$
(x_1x_2)^2=1.
$$

従って全4点が

$$
yg(x)=1
$$

を満たし、特徴空間ではマージン境界上に線形分離されています。
<!-- solution-end -->

---

## Level B

<a id="ex-rkhs5-b01"></a>

### RKHS5-B01 ソフトマージン双対を最初から導出する

- Level: B
- 目安時間: 25分

主問題

$$
\min_{w,b,\xi}
\frac12\|w\|_2^2
+
C\sum_i\xi_i
$$

subject to

$$
1-\xi_i-y_i(w^{\mathsf T}x_i+b)\le0,
$$

$$
-\xi_i\le0
$$

から、双対問題

$$
\max_{\alpha}
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_i y_jx_i^{\mathsf T}x_j
$$

subject to

$$
0\le\alpha_i\le C,
\qquad
\sum_i\alpha_i y_i=0
$$

を導け。

特に $\alpha_i\le C$ がどこから出るかを明示せよ。

<!-- solution-start -->
#### 詳細解答

マージン制約の乗数を

$$
\alpha_i\ge0,
$$

非負スラック制約の乗数を

$$
\beta_i\ge0
$$

とします。

Lagrangian は

$$
\begin{aligned}
L
&=
\frac12\|w\|_2^2
+
C\sum_i\xi_i\\
&\quad+
\sum_i\alpha_i
[
1-\xi_i-y_i(w^{\mathsf T}x_i+b)
]
-
\sum_i\beta_i\xi_i.
\end{aligned}
$$

$w$ で微分して0と置くと

$$
w-\sum_i\alpha_i y_i x_i=0,
$$

従って

$$
w=\sum_i\alpha_i y_i x_i.
$$

$b$ で微分して0と置くと

$$
-\sum_i\alpha_i y_i=0,
$$

従って

$$
\sum_i\alpha_i y_i=0.
$$

$\xi_i$ で微分して0と置くと

$$
C-\alpha_i-\beta_i=0.
$$

ここで

$$
\beta_i\ge0
$$

なので

$$
C-\alpha_i\ge0,
$$

従って

$$
\alpha_i\le C.
$$

もともと

$$
\alpha_i\ge0
$$

だから

$$
0\le\alpha_i\le C.
$$

これが箱型制約の由来です。

停留条件を Lagrangian へ戻します。

$b$ の項は

$$
-b\sum_i\alpha_i y_i=0.
$$

$\xi_i$ の係数は

$$
C-\alpha_i-\beta_i=0
$$

なので消えます。

従って

$$
L
=
\frac12\|w\|_2^2
+
\sum_i\alpha_i
-
w^{\mathsf T}
\sum_i\alpha_i y_i x_i.
$$

しかし

$$
\sum_i\alpha_i y_i x_i=w
$$

なので

$$
L
=
\sum_i\alpha_i
-
\frac12\|w\|_2^2.
$$

さらに

$$
\begin{aligned}
\|w\|_2^2
&=
\left(
\sum_i\alpha_i y_i x_i
\right)^{\mathsf T}
\left(
\sum_j\alpha_j y_j x_j
\right)\\
&=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j x_i^{\mathsf T}x_j.
\end{aligned}
$$

従って双対関数は

$$
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_j y_i y_j x_i^{\mathsf T}x_j.
$$

制約は

$$
0\le\alpha_i\le C,
\qquad
\sum_i\alpha_i y_i=0.
$$

よって所望の双対問題が得られます。
<!-- solution-end -->

<a id="ex-rkhs5-b02"></a>

### RKHS5-B02 $\alpha_i$ の3領域と退化

- Level: B
- 目安時間: 20分

最適 KKT 組について、次を示せ。

1. $\alpha_i=0$ なら $\xi_i=0$ かつ $y_i g(x_i)\ge1$。
2. $0<\alpha_i<C$ なら $\xi_i=0$ かつ $y_i g(x_i)=1$。
3. $\alpha_i=C$ なら $y_i g(x_i)=1-\xi_i\le1$。
4. $y_i g(x_i)=1$ から $0<\alpha_i<C$ は一般には従わない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

停留条件

$$
C-\alpha_i-\beta_i=0
$$

から

$$
\beta_i=C-\alpha_i.
$$

まず

$$
\alpha_i=0
$$

とします。

すると

$$
\beta_i=C>0.
$$

相補性

$$
\beta_i\xi_i=0
$$

より

$$
\xi_i=0.
$$

主実行可能性から

$$
y_i g(x_i)\ge1-\xi_i=1.
$$

次に

$$
0<\alpha_i<C
$$

なら

$$
\beta_i=C-\alpha_i>0.
$$

従って

$$
\xi_i=0.
$$

さらに

$$
\alpha_i>0
$$

なので相補性

$$
\alpha_i[
1-\xi_i-y_i g(x_i)
]=0
$$

から

$$
1-\xi_i-y_i g(x_i)=0.
$$

$\xi_i=0$ を代入して

$$
y_i g(x_i)=1.
$$

次に

$$
\alpha_i=C
$$

なら

$$
\beta_i=0.
$$

$\alpha_i>0$ なので

$$
1-\xi_i-y_i g(x_i)=0.
$$

従って

$$
y_i g(x_i)=1-\xi_i.
$$

$\xi_i\ge0$ なので

$$
y_i g(x_i)\le1.
$$

最後に逆向きを考えます。

$$
y_i g(x_i)=1
$$

かつ

$$
\xi_i=0
$$

なら、最初の相補性は

$$
\alpha_i\cdot0=0
$$

となり、$\alpha_i$ の値を決めません。

二番目の相補性も

$$
\beta_i\cdot0=0
$$

で、$\beta_i$ を決めません。

従って停留条件

$$
\alpha_i+\beta_i=C
$$

の範囲で

$$
\alpha_i=0,
\qquad
0<\alpha_i<C,
\qquad
\alpha_i=C
$$

のいずれも排除されません。

実際にどの値になるかは他の訓練点との全体的な双対最適化で決まります。

従って

$$
y_i g(x_i)=1
\Longrightarrow
0<\alpha_i<C
$$

は一般には成り立ちません。
<!-- solution-end -->

<a id="ex-rkhs5-b03"></a>

### RKHS5-B03 カーネル双対と予測式

- Level: B
- 目安時間: 20分

特徴写像

$$
\Phi:\mathcal X\to\mathcal H
$$

と核

$$
K(x,z)=
\langle\Phi(x),\Phi(z)\rangle_{\mathcal H}
$$

を考える。

1. 特徴空間での停留条件
   $$
   w=\sum_i\alpha_i y_i\Phi(x_i)
   $$
   から
   $$
   \|w\|_{\mathcal H}^2
   =
   \sum_{i,j}
   \alpha_i\alpha_jy_i y_jK(x_i,x_j)
   $$
   を導け。
2. 新しい入力 $x$ に対する判別関数が
   $$
   g(x)
   =
   \sum_i\alpha_i y_iK(x_i,x)+b
   $$
   となることを示せ。
3. この二式のどこに「特徴座標を明示しなくてよい」という性質が現れているか説明せよ。

<!-- solution-start -->
#### 詳細解答

停留条件から

$$
w=\sum_i\alpha_i y_i\Phi(x_i).
$$

従って

$$
\begin{aligned}
\|w\|_{\mathcal H}^2
&=
\langle w,w\rangle_{\mathcal H}\\
&=
\left\langle
\sum_i\alpha_i y_i\Phi(x_i),
\sum_j\alpha_j y_j\Phi(x_j)
\right\rangle_{\mathcal H}\\
&=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
\langle\Phi(x_i),\Phi(x_j)\rangle_{\mathcal H}\\
&=
\sum_{i,j}
\alpha_i\alpha_j y_i y_j
K(x_i,x_j).
\end{aligned}
$$

次に判別関数は

$$
g(x)
=
\langle w,\Phi(x)\rangle_{\mathcal H}+b.
$$

$w$ の有限和表示を代入すると

$$
\begin{aligned}
g(x)
&=
\left\langle
\sum_i\alpha_i y_i\Phi(x_i),
\Phi(x)
\right\rangle_{\mathcal H}
+b\\
&=
\sum_i\alpha_i y_i
\langle\Phi(x_i),\Phi(x)\rangle_{\mathcal H}
+b\\
&=
\sum_i\alpha_i y_iK(x_i,x)+b.
\end{aligned}
$$

学習時の双対目的では必要な量が

$$
K(x_i,x_j)
$$

だけになっています。

予測時にも必要な量は

$$
K(x_i,x)
$$

だけです。

従って特徴ベクトル

$$
\Phi(x_i)
$$

や

$$
\Phi(x)
$$

の各座標を明示的に計算する必要がありません。

これがカーネルトリックの計算上の意味です。
<!-- solution-end -->

---

## Level C

<a id="ex-rkhs5-c01"></a>

### RKHS5-C01 相反するラベルを持つ2点の主双対解析

- Level: C
- 目安時間: 35分

1次元で

$$
x_1=x_2=0,
$$

$$
y_1=+1,
\qquad
y_2=-1
$$

とする。$C>0$ とする。

1. ソフトマージン主問題で
   $$
   \xi_1+\xi_2\ge2
   $$
   を示せ。
2. 主最適値が
   $$
   2C
   $$
   であることを示せ。
3. 双対問題を明示し、最適解
   $$
   \alpha_1=\alpha_2=C
   $$
   を求めよ。
4. 双対最適値も $2C$ であることを確認せよ。
5. KKT 条件から、両点が上限制約サポートベクトルになることを確認せよ。
6. この例で $b$ が一意でないことを示し、その許容範囲を求めよ。
7. 「$w$ が一意でも分類器全体 $(w,b)$ は一意とは限らない」理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

入力はどちらも

$$
x_1=x_2=0
$$

なので、判別値は両点で

$$
g(0)=b
$$

です。

正例の制約は

$$
b\ge1-\xi_1,
$$

従って

$$
\xi_1\ge1-b.
$$

負例の制約は

$$
-b\ge1-\xi_2,
$$

従って

$$
\xi_2\ge1+b.
$$

二式を足すと

$$
\xi_1+\xi_2\ge2.
$$

また

$$
\xi_1,\xi_2\ge0
$$

です。

主目的は

$$
\frac12 w^2+C(\xi_1+\xi_2).
$$

したがって

$$
\frac12 w^2+C(\xi_1+\xi_2)
\ge
0+2C
=
2C.
$$

一方、

$$
w=0,
\qquad
b=0,
\qquad
\xi_1=\xi_2=1
$$

は実行可能で、目的値は

$$
2C.
$$

従って主最適値は

$$
p^*=2C.
$$

次に双対問題を作ります。

一般形は

$$
\max_{\alpha_1,\alpha_2}
\alpha_1+\alpha_2
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_i y_jx_i x_j.
$$

しかし

$$
x_1=x_2=0
$$

なので二次項は全て0です。

従って

$$
\max
\alpha_1+\alpha_2
$$

subject to

$$
0\le\alpha_1,\alpha_2\le C,
$$

$$
\alpha_1-\alpha_2=0.
$$

等式制約から

$$
\alpha_1=\alpha_2=:a.
$$

目的関数は

$$
2a
$$

で、

$$
0\le a\le C.
$$

従って最大化するには

$$
a=C
$$

とすればよく、

$$
\alpha_1^*=\alpha_2^*=C.
$$

双対最適値は

$$
d^*=C+C=2C.
$$

主最適値と一致しています。

次に KKT を見ます。

両点で

$$
\alpha_i=C
$$

なので、定義上どちらも上限制約サポートベクトルです。

停留条件

$$
w=\sum_i\alpha_i y_i x_i
$$

では

$$
w
=
C(+1)\cdot0
+
C(-1)\cdot0
=
0.
$$

また

$$
\beta_i=C-\alpha_i=0.
$$

従って $\beta_i\xi_i=0$ は $\xi_i$ を制限しません。

$\alpha_i>0$ なのでマージン制約は等号になり、

正例では

$$
b=1-\xi_1,
$$

負例では

$$
-b=1-\xi_2.
$$

従って

$$
\xi_1=1-b,
\qquad
\xi_2=1+b.
$$

非負制約から

$$
1-b\ge0,
$$

$$
1+b\ge0.
$$

すなわち

$$
-1\le b\le1.
$$

この区間の任意の $b$ に対して

$$
\xi_1+\xi_2
=
(1-b)+(1+b)
=
2
$$

なので、主目的は常に

$$
2C
$$

です。

従って $b$ は一意ではありません。

一方、

$$
w^*=0
$$

は一意です。なぜなら目的関数の

$$
\frac12w^2
$$

は $w$ について狭義凸であり、二つの異なる最適 $w$ があればその中点でより小さい二次項を作れるからです。

しかし $b$ には二次正則化が掛かっておらず、このデータではヒンジ損失総和も

$$
-1\le b\le1
$$

の間で一定です。

従って

$$
\boxed{
\text{正則化される }w\text{ の一意性}
\not\Rightarrow
\text{切片 }b\text{ の一意性}
}
$$

です。

この例は、ハードマージンで得られた分類器一意性をソフトマージンへ無条件に持ち込めないことも示しています。
<!-- solution-end -->
