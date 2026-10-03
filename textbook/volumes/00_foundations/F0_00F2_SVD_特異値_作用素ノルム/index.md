# F0-00F2 特異値分解・作用素ノルム

F0-00F1で得た実対称行列の直交対角化を $A^{\mathsf T}A$ に適用し、任意の長方形行列を方向別の伸縮へ分解します。

```text
A^T A
 ↓
特異値
 ↓
SVD
 ↓
階数・核・像
 ↓
最大伸長率
 ↓
有限次元線形代数から関数解析へ
```

---

## 1. 一般の行列は固有値だけでは足りない

F0-00Fでは一般の自己写像について固有空間と対角化を扱いました。

しかし一般の行列は

- 実数上で固有値を持たないことがある
- 十分な本数の固有ベクトルを持たず対角化できないことがある
- 長方形行列ではそもそも通常の固有値を定義できない

という問題があります。

一方

$$
A\in\mathbb R^{m\times n}
$$

なら

$$
A^{\mathsf T}A
$$

は必ず $n\times n$ の実対称行列で、しかも

$$
x^{\mathsf T}A^{\mathsf T}Ax
=\|Ax\|^2
\ge0
$$

なので半正定値です。

従ってF0-00F1で得た実対称行列の直交対角化を適用できます。

---

## 2. 特異値と右特異ベクトル

[実対称行列の直交対角化](../F0_00F1_固有空間_スペクトル定理_PSD/index.md#thm-real-symmetric-spectral)を $A^{\mathsf T}A$ に適用します。$A^{\mathsf T}A$ は実対称半正定値なので、正規直交固有基底 $v_1,\dots,v_n$ と固有値 $\lambda_i\ge0$ を取れます。

<a id="def-f0-00f2-singular-values-right-vectors"></a>

<!-- formal-statement-start -->
> **定義（特異値・右特異ベクトル）**  
> $A\in\mathbb R^{m\times n}$ とし、$v_i$ を $A^{\mathsf T}A$ の単位固有ベクトル、

$$
A^{\mathsf T}Av_i=\lambda_i v_i,
\qquad
\lambda_i\ge0
$$

> とする。このとき

$$
\sigma_i=\sqrt{\lambda_i}
$$

> を $A$ の **特異値**、$v_i$ を対応する **右特異ベクトル** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f2-singular-values-right-vectors -->
### 2.1 例：対角行列の特異値

**定義の確認**：上の定義条件をこの具体例で直接確認します。


$$
A=
\begin{pmatrix}
3&0\\
0&2
\end{pmatrix}
$$

なら

$$
A^{\mathsf T}A=
\begin{pmatrix}
9&0\\
0&4
\end{pmatrix}.
$$

従って $\lambda_1=9,\lambda_2=4$ で、

$$
\sigma_1=3,
\qquad
\sigma_2=2.
$$

対応する右特異ベクトルは $v_1=e_1,v_2=e_2$ と取れます。
<!-- definition-example-end -->

---

## 3. 左特異ベクトル

右特異ベクトル $v_i$ は入力側の特別な方向です。SVDを作るには、その方向を $A$ で送った先に対応する出力側の単位方向も必要になります。そこで $Av_i$ を特異値で割り、長さ1にそろえた方向を導入します。

$\sigma_i>0$ なら

$$
u_i=\frac{Av_i}{\sigma_i}
$$

と置きます。すると

$$
\|u_i\|^2
=
\frac{v_i^{\mathsf T}A^{\mathsf T}Av_i}{\sigma_i^2}
=
1.
$$

また $i\ne j$ なら

$$
\begin{aligned}
\langle u_i,u_j\rangle
&=
\frac{1}{\sigma_i\sigma_j}
v_i^{\mathsf T}A^{\mathsf T}Av_j\\
&=
\frac{\lambda_j}{\sigma_i\sigma_j}
v_i^{\mathsf T}v_j
=0.
\end{aligned}
$$

<a id="def-f0-00f2-left-singular-vectors"></a>

<!-- formal-statement-start -->
> **定義（左特異ベクトル）**  
> $\sigma_i>0$ に対応する右特異ベクトル $v_i$ に対して

$$
u_i=\frac{Av_i}{\sigma_i}
$$

> と定めた単位ベクトル $u_i$ を、$\sigma_i$ に対応する **左特異ベクトル** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f2-left-singular-vectors -->
### 3.1 例：左特異ベクトルを作る

**定義の確認**：上の定義条件をこの具体例で直接確認します。


前節の

$$
A=\operatorname{diag}(3,2)
$$

では

$$
u_1=\frac{Ae_1}{3}=e_1,
\qquad
u_2=\frac{Ae_2}{2}=e_2.
$$

従って左特異ベクトルも標準基底になります。
<!-- definition-example-end -->

---

## 4. SVDを構成する

右特異ベクトルは入力側の正規直交基底を与え、正の特異値に対応するものは $A$ によって左特異ベクトルへ送られます。一方、特異値0の方向は $A$ で0へ潰れます。したがって、入力を右特異ベクトル基底へ分解すれば、$A$ の作用全体を「各方向を $\sigma_i$ 倍して左特異ベクトル方向へ送る」という形で再構成できそうです。

正の特異値を

$$
\sigma_1\ge\cdots\ge\sigma_r>0
$$

とし、対応する右・左特異ベクトルを列に並べて

$$
V_r=(v_1\ \cdots\ v_r),
\qquad
U_r=(u_1\ \cdots\ u_r),
\qquad
\Sigma_r=\operatorname{diag}(\sigma_1,\dots,\sigma_r)
$$

とします。

<a id="thm-f0-00f2-svd"></a>

<!-- formal-statement-start -->
> **定理（特異値分解）**  
> 任意の実行列 $A\in\mathbb R^{m\times n}$ は、正の特異値の個数を $r$ とすると

$$
A=U_r\Sigma_rV_r^{\mathsf T}
$$

> と表せる。$U_r,V_r$ の列はそれぞれ正規直交し、$\Sigma_r$ は正の特異値を並べた対角行列である。
<!-- formal-statement-end -->

### 証明の見取り図

右特異ベクトルは $\mathbb R^n$ の正規直交基底を作ります。正の特異値方向では $Av_i=\sigma_i u_i$、特異値0の方向では $\|Av_i\|^2=0$ なので $Av_i=0$ です。従って任意のベクトルへの作用を正の特異値方向だけで再構成できます。

<!-- proof-start -->
### 証明

$v_1,\dots,v_n$ を $A^{\mathsf T}A$ の正規直交固有基底とし、$\sigma_1,\dots,\sigma_r>0$、$\sigma_{r+1}=\cdots=\sigma_n=0$ とします。

$i\le r$ では定義から

$$
Av_i=\sigma_i u_i.
$$

$i>r$ では

$$
\|Av_i\|^2
=
v_i^{\mathsf T}A^{\mathsf T}Av_i
=
\lambda_i
=
\sigma_i^2
=0,
$$

なので $Av_i=0$ です。

任意の $x\in\mathbb R^n$ を

$$
x=\sum_{i=1}^n\langle x,v_i\rangle v_i
$$

と展開すると

$$
Ax
=
\sum_{i=1}^r
\sigma_i\langle x,v_i\rangle u_i
=
U_r\Sigma_rV_r^{\mathsf T}x.
$$

全ての $x$ に対して作用が一致するので

$$
A=U_r\Sigma_rV_r^{\mathsf T}.
$$
<!-- proof-end -->

薄い形では、像に実際に寄与する $r$ 本だけを残しています。完全形が必要なら、まず [基底延長定理](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#thm-basis-extension)で $U_r,V_r$ の列をそれぞれ $\mathbb R^m,\mathbb R^n$ の基底へ延長します。その基底に [Gram--Schmidt 直交化法](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md#thm-f0-00e1-gram-schmidt)を先頭から適用します。最初の $r$ 本は既に正規直交しているため、その段階では前の方向への射影係数が0で、ノルムも1なので、元の列は変化しません。

こうして $U_r,V_r$ の列を保ったまま正規直交基底へ補えます。残りの対角成分を0とした矩形対角行列 $\Sigma$ を置けば
$$
A=U\Sigma V^{\mathsf T}
$$
という完全形を得ます。

---

## 5. SVDは「基底を変えて対角的に見る」分解

F0-00Fでは自己写像の対角化

$$
A=PDP^{-1}
$$

を扱いました。

SVDは一般の写像

$$
A:\mathbb R^n\to\mathbb R^m
$$

について、入力側と出力側で別々の正規直交基底を選び

$$
A=U\Sigma V^{\mathsf T}
$$

とするものです。

3段階に分けると

1. $V^{\mathsf T}$：入力を右特異ベクトル基底へ座標変換
2. $\Sigma$：各方向を $\sigma_i$ 倍
3. $U$：出力側の標準座標へ戻す

となります。

したがってSVDは

> **一般の線形写像を、適切な入力基底と出力基底で見れば方向別の伸縮になる**

という定理です。

---

## 6. 固有値分解との違い

| | 一般の対角化 | 実対称の直交対角化 | SVD |
|---|---|---|---|
| 対象 | 正方行列の一部 | 実対称正方行列 | 任意の長方形行列 |
| 形 | $A=PDP^{-1}$ | $A=Q\Lambda Q^{\mathsf T}$ | $A=U\Sigma V^{\mathsf T}$ |
| 基底 | 固有基底 | 正規直交固有基底 | 入力・出力で別の正規直交基底 |
| 対角成分 | 固有値 | 実固有値 | 非負の特異値 |
| 常に可能か | いいえ | はい | はい |

特に「SVDはいつでも存在する」が重要です。

---

## 7. 階数と特異値

SVDでは、正の特異値に対応する方向だけが $A$ によって非零方向へ送られ、特異値0の方向は核へ入ります。したがって、正の特異値の本数は像の次元、すなわち階数を数えているはずです。

<a id="prop-f0-00f2-rank-singular-values"></a>

<!-- formal-statement-start -->
> **命題（階数と非零特異値）**  
> $A\in\mathbb R^{m\times n}$ の正の特異値の個数を $r$ とする。このとき

$$
\operatorname{rank}(A)=r,
$$

> また

$$
\operatorname{Im}A
=
\operatorname{span}(u_1,\dots,u_r),
$$

$$
\ker A
=
\operatorname{span}(v_{r+1},\dots,v_n)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

像については、SVD の展開式から全ての出力が $u_1,\dots,u_r$ の張る空間へ入ることを示し、逆に各 $u_i$ が実際に像へ入ることを示します。核については、右特異ベクトル基底で係数比較します。

<!-- proof-start -->
### 証明

[SVD](#thm-f0-00f2-svd)から、任意の $x$ に対して

$$
Ax
=
\sum_{i=1}^r
\sigma_i\langle x,v_i\rangle u_i
$$

です。したがって
$$
\operatorname{Im}A
\subset
\operatorname{span}(u_1,\dots,u_r).
$$
逆に $i\le r$ では
$$
Av_i=\sigma_i u_i,
\qquad
\sigma_i>0
$$
なので
$$
u_i=A\left(\frac1{\sigma_i}v_i\right)
\in\operatorname{Im}A.
$$
よって逆包含も成り立ち、
$$
\operatorname{Im}A
=
\operatorname{span}(u_1,\dots,u_r).
$$
$u_1,\dots,u_r$ は正規直交系なので一次独立です。従って
$$
\operatorname{rank}(A)
=
\dim\operatorname{Im}A
=
r.
$$

次に任意の $x$ を右特異ベクトル基底で
$$
x=\sum_{i=1}^n c_i v_i
$$
と書きます。すると
$$
Ax
=
\sum_{i=1}^r c_i\sigma_i u_i.
$$
$u_1,\dots,u_r$ は一次独立で各 $\sigma_i>0$ だから
$$
Ax=0
\iff
c_1=\cdots=c_r=0.
$$
したがって
$$
\ker A
=
\operatorname{span}(v_{r+1},\dots,v_n).
$$
<!-- proof-end -->

---

## 8. 行列の最大伸長率

SVDは、各入力方向がどれだけ伸びるかを特異値として分解しました。では行列全体として「最も大きく伸びる割合」はいくつでしょうか。これを一つの量として測れるようにします。

<a id="def-f0-00f2-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（2-作用素ノルム）**  
> 線形写像 $A:\mathbb R^n\to\mathbb R^m$ のEuclidノルムに関する **2-作用素ノルム** を

$$
\|A\|_{\mathrm{op}}
=
\sup_{x\ne0}\frac{\|Ax\|}{\|x\|}
=
\sup_{\|x\|=1}\|Ax\|
$$

> と定めます。
<!-- formal-statement-end -->

二つの上限表示が一致することも確認しておきます。$x\ne0$ に対して
$$
y=\frac{x}{\|x\|}
$$
と置けば $\|y\|=1$ で
$$
\frac{\|Ax\|}{\|x\|}
=
\|Ay\|.
$$
逆に単位ベクトル $y$ は $x=y$ と取れば左側の集合にも現れるので、両者は同じ値の集合上で上限を取っています。

<!-- definition-example-start: def-f0-00f2-operator-norm -->
### 8.1 例：対角行列の最大伸長

**定義の確認**：上の定義条件をこの具体例で直接確認します。


$A=\operatorname{diag}(3,2)$ とし、$\|x\|=1$ とします。すると

$$
\|Ax\|^2
=
9x_1^2+4x_2^2
\le
9(x_1^2+x_2^2)
=9.
$$

従って $\|Ax\|\le3$ で、$x=e_1$ なら等号です。よって $\|A\|_{\mathrm{op}}=3$ です。
<!-- definition-example-end -->

<a id="thm-f0-00f2-operator-norm-largest-singular"></a>

<!-- formal-statement-start -->
> **定理（2-作用素ノルムと最大特異値）**  
> 実行列 $A$ の最大特異値を $\sigma_1$ とすると

$$
\|A\|_{\mathrm{op}}=\sigma_1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

任意の入力を右特異ベクトル基底へ展開すると、出力の各成分は $\sigma_i$ 倍されます。全ての $\sigma_i$ を最大値 $\sigma_1$ で上から押さえて上界を出し、最後に $v_1$ を入力してその上界が実現することを示します。

<!-- proof-start -->
### 証明

任意の $x$ を右特異ベクトル基底で

$$
x=\sum_i c_iv_i
$$

と書くと

$$
Ax=\sum_i c_i\sigma_i u_i.
$$

$u_i$ の正規直交性から

$$
\|Ax\|^2
=
\sum_i\sigma_i^2|c_i|^2.
$$
各 $\sigma_i\le\sigma_1$ なので
$$
\sum_i\sigma_i^2|c_i|^2
\le
\sigma_1^2\sum_i|c_i|^2.
$$
また $v_i$ の正規直交性から
$$
\sum_i|c_i|^2=\|x\|^2.
$$
したがって
$$
\|Ax\|^2
\le
\sigma_1^2\|x\|^2.
$$
両辺は非負なので平方根を取り、
$$
\|Ax\|
\le
\sigma_1\|x\|.
$$
$x\ne0$ について比を取れば
$$
\frac{\|Ax\|}{\|x\|}
\le\sigma_1,
$$
従って $\|A\|_{\mathrm{op}}\le\sigma_1$ です。

一方、単位右特異ベクトル $v_1$ を入れると
$$
\|Av_1\|
=
\|\sigma_1u_1\|
=
\sigma_1.
$$
よって定義中の上限は $x=v_1$ で実現し、
$$
\|A\|_{\mathrm{op}}=\sigma_1.
$$
<!-- proof-end -->

---

## 9. 線形汎関数の有限次元版

固定した $a\in\mathbb R^n$ に対して

$$
\ell_a(x)
=a^{\mathsf T}x
$$

と置きます。

[Cauchy--Schwarz不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|\ell_a(x)|
\le
\|a\|\|x\|
$$

なので

$$
\|\ell_a\|_{\mathrm{op}}
\le
\|a\|.
$$

$x=a/\|a\|$ を取れば等号なので

$$
\boxed{
\|\ell_a\|_{\mathrm{op}}
=
\|a\|
}
$$

です。

後のRiesz表現定理では、この有限次元で自然な事実をHilbert空間へ一般化します。

---

## 10. 低ランク近似への入口

SVDを

$$
A
=
\sum_{i=1}^r
\sigma_i u_iv_i^{\mathsf T}
$$

と書くこともできます。

大きい特異値に対応する項だけ残せば

$$
A_k
=
\sum_{i=1}^k
\sigma_i u_iv_i^{\mathsf T}
$$

という低ランク近似が得られます。

統計では

- PCA
- 次元削減
- 低ランク回帰
- 数値安定性

などへつながります。

ここでは最良近似定理そのものは後続へ譲り、SVD が階数を方向別に分解していることだけ押さえます。

---

## 11. 関数解析への橋

ここまでで有限次元線形代数について

- ベクトル空間・基底・次元
- 線形写像・核・像
- 表現行列・基底変換
- 相似・一般の対角化
- 内積・正規直交基底
- 射影・QR
- 実対称行列の直交対角化
- SVD
- 2-作用素ノルム

まで揃いました。

関数解析では次のように一般化されます。

| 有限次元 | 関数解析 |
|---|---|
| $\mathbb R^n$ | ノルム空間・Banach空間・Hilbert空間 |
| 行列 $A$ | 線形作用素 $T$ |
| 表現行列 | 基底や座標表示が存在しない場合もある作用素そのもの |
| $A^{\mathsf T}$ | 随伴作用素 $T^*$ |
| $a^{\mathsf T}x$ | 連続線形汎関数 |
| 正規直交基底 | 正規直交系・完全性 |
| 最大特異値 | 2-作用素ノルム |

ただし無限次元では、有限次元で自動だった性質が次々に壊れます。その一般化へ進む前に、有限次元側で複素内積・Hermitian作用素・極分解・複素特異値分解までをつなぎ、線形代数のスペクトル構造を閉じます。

---

## 12. 演習

### F0-00F2-A01 特異値と2-作用素ノルム

- Level: A
- 目安時間: 10分

$$
A=\operatorname{diag}(3,1)
$$

の特異値と2-作用素ノルムを求めよ。

<!-- solution-start -->
#### 詳細解答

$$
A^{\mathsf T}A
=
\operatorname{diag}(9,1)
$$

なので固有値は $9,1$。従って特異値は

$$
\sigma_1=3,
\qquad
\sigma_2=1.
$$

2-作用素ノルムは最大特異値に等しいので

$$
\|A\|_{\mathrm{op}}=3.
$$
<!-- solution-end -->

### F0-00F2-A02 右・左特異ベクトル

- Level: A
- 目安時間: 12分

$$
A=
\begin{pmatrix}
2&0\\
0&1\\
0&0
\end{pmatrix}
$$

について特異値、右特異ベクトル、左特異ベクトルを求めよ。

<!-- solution-start -->
#### 詳細解答

$$
A^{\mathsf T}A
=
\begin{pmatrix}
4&0\\
0&1
\end{pmatrix}.
$$

従って特異値は $2,1$、右特異ベクトルは

$$
v_1=e_1,
\qquad
v_2=e_2
$$

と取れます。

左特異ベクトルは

$$
u_1=\frac{Av_1}{2}
=
\begin{pmatrix}
1\\0\\0
\end{pmatrix},
\qquad
u_2=Av_2
=
\begin{pmatrix}
0\\1\\0
\end{pmatrix}.
$$

どちらも単位ベクトルで互いに直交します。
<!-- solution-end -->

### F0-00F2-A03 核・像と特異値

- Level: A
- 目安時間: 10分

薄いSVD $A=U_r\Sigma_rV_r^{\mathsf T}$ を持つ行列について、なぜ $\operatorname{Im}A=\operatorname{span}(u_1,\dots,u_r)$ となるか説明せよ。

<!-- solution-start -->
#### 詳細解答

任意の $x$ に対して

$$
Ax
=
\sum_{i=1}^r
\sigma_i\langle x,v_i\rangle u_i
$$

なので、像は $u_1,\dots,u_r$ の張る空間に含まれます。

逆に各 $i\le r$ について

$$
Av_i=\sigma_i u_i
$$

で、$\sigma_i>0$ だから

$$
u_i=A\left(\frac1{\sigma_i}v_i\right)
$$

と書けます。従って各 $u_i$ は像に属し、像はちょうどその span です。
<!-- solution-end -->

### F0-00F2-A04

- Level: A
- 目安時間: 10分

固定した $a\in\mathbb R^n$ に対して $\ell_a(x)=a^{\mathsf T}x$ とする。$\|\ell_a\|_{\mathrm{op}}=\|a\|$ を示せ。

<!-- solution-start -->
#### 詳細解答

[Cauchy--Schwarz不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
|\ell_a(x)|
=
|a^{\mathsf T}x|
\le
\|a\|\|x\|.
$$

従って $\|x\|=1$ 上で

$$
|\ell_a(x)|\le\|a\|,
$$

なので $\|\ell_a\|_{\mathrm{op}}\le\|a\|$ です。

$a\ne0$ なら $x=a/\|a\|$ と取ると $\|x\|=1$ かつ

$$
|\ell_a(x)|
=
\frac{a^{\mathsf T}a}{\|a\|}
=
\|a\|.
$$

従って等号です。$a=0$ の場合も両辺0です。
<!-- solution-end -->

### F0-00F2-B01 特異値分解と階数

- Level: B
- 目安時間: 12分

薄いSVD

$$
A=U_r\Sigma_rV_r^{\mathsf T}
$$

で $\Sigma_r$ の対角成分が全て正とする。$\operatorname{rank}(A)=r$ を示せ。

<!-- solution-start -->
#### 詳細解答

[SVD](#thm-f0-00f2-svd)から

$$
\operatorname{Im}A
=
\operatorname{span}(u_1,\dots,u_r).
$$

$u_1,\dots,u_r$ は正規直交系なので一次独立で、この span の次元は $r$ です。従って

$$
\operatorname{rank}(A)
=
\dim\operatorname{Im}A
=r.
$$
<!-- solution-end -->

### F0-00F2-B02 薄い特異値分解を構成する

- Level: B
- 目安時間: 18分

$$
A=
\begin{pmatrix}
2&0\\
0&1\\
0&0
\end{pmatrix}
$$

の薄い特異値分解 $A=U\Sigma V^{\mathsf T}$ を明示し、行列積で確認せよ。

<!-- solution-start -->
#### 詳細解答

A02より特異値は $2,1$、右特異ベクトルは $e_1,e_2$、左特異ベクトルは $e_1,e_2$ を $\mathbb R^3$ に埋め込んだものです。従って

$$
U=
\begin{pmatrix}
1&0\\
0&1\\
0&0
\end{pmatrix},
\qquad
\Sigma=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix},
\qquad
V=I_2.
$$

よって

$$
U\Sigma V^{\mathsf T}
=
\begin{pmatrix}
1&0\\
0&1\\
0&0
\end{pmatrix}
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix}
=
\begin{pmatrix}
2&0\\
0&1\\
0&0
\end{pmatrix}
=A.
$$
<!-- solution-end -->

### F0-00F2-B03 作用素ノルムと最大特異値

- Level: B
- 目安時間: 15分

[特異値分解](#thm-f0-00f2-svd)を用いて

$$
\|A\|_{\mathrm{op}}=\sigma_1
$$

を証明せよ。

<!-- solution-start -->
#### 詳細解答

右特異ベクトル基底で

$$
x=\sum_i c_iv_i
$$

と書くと

$$
Ax=\sum_i\sigma_i c_i u_i.
$$

左特異ベクトルの正規直交性より

$$
\|Ax\|^2
=
\sum_i\sigma_i^2|c_i|^2
\le
\sigma_1^2\sum_i|c_i|^2
=
\sigma_1^2\|x\|^2.
$$

従って $x\ne0$ について

$$
\frac{\|Ax\|}{\|x\|}
\le
\sigma_1,
$$

なので $\|A\|_{\mathrm{op}}\le\sigma_1$ です。

一方、単位右特異ベクトル $v_1$ に対して

$$
\|Av_1\|
=
\|\sigma_1u_1\|
=
\sigma_1.
$$

従って $x=v_1$ で値 $\sigma_1$ が実現し、$\|A\|_{\mathrm{op}}=\sigma_1$ です。
<!-- solution-end -->

### F0-00F2-C01

- Level: C
- 目安時間: 30分

$$
A=
\begin{pmatrix}
1&1\\
1&-1\\
1&1
\end{pmatrix}
$$

について次を行え。

1. $A^{\mathsf T}A$ の固有値・正規直交固有ベクトルを求め、特異値と右特異ベクトルを得よ。
2. 左特異ベクトルを構成し、薄いSVDを与えよ。
3. $\operatorname{rank}(A)$ と $\|A\|_{\mathrm{op}}$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
A^{\mathsf T}A
=
\begin{pmatrix}
3&1\\
1&3
\end{pmatrix}.
$$

特性方程式は
$$
\det
\begin{pmatrix}
3-\lambda&1\\
1&3-\lambda
\end{pmatrix}
=
(3-\lambda)^2-1
=
(\lambda-4)(\lambda-2)
=0
$$
なので、固有値は $4,2$ です。対応する正規直交固有ベクトルを

$$
v_1=\frac1{\sqrt2}(1,1)^{\mathsf T},
\qquad
v_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}
$$

と取れます。従って特異値は

$$
\sigma_1=2,
\qquad
\sigma_2=\sqrt2.
$$

左特異ベクトルは

$$
u_1
=
\frac{Av_1}{2}
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\0\\1
\end{pmatrix},
$$

また

$$
u_2
=
\frac{Av_2}{\sqrt2}
=
\begin{pmatrix}
0\\1\\0
\end{pmatrix}.
$$

従って

$$
U=
\begin{pmatrix}
1/\sqrt2&0\\
0&1\\
1/\sqrt2&0
\end{pmatrix},
\qquad
\Sigma=
\begin{pmatrix}
2&0\\
0&\sqrt2
\end{pmatrix},
$$

$$
V=
\frac1{\sqrt2}
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix},
$$

で

$$
A=U\Sigma V^{\mathsf T}.
$$

正の特異値が2個あるので

$$
\operatorname{rank}(A)=2.
$$

また最大特異値は2だから

$$
\|A\|_{\mathrm{op}}=2.
$$
<!-- solution-end -->
---

## 13. 次に進む

これで、実線形代数では基底・表現行列・対角化・直交化・SVDまで構造としてつながりました。

次は、すでに学んだ複素内積と有限次元随伴を使い、Hermitian二次形式・極分解・複素特異値分解へ進みます。

**次：[LA6 スペクトル・二次形式・極分解・複素特異値分解](../LA6/index.md)**
