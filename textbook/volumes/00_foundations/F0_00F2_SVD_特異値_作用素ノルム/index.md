# F0-00F2 SVD・特異値・最大伸長率

F0-00F1で得た実対称行列の直交対角化を $A^{\mathsf T}A$ に適用し、任意の長方形行列を方向別の伸縮へ分解します。

```text
A^T A
 ↓
特異値
 ↓
SVD
 ↓
rank・kernel・image
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

必要なら $U_r,V_r$ を正規直交基底へ補って完全形 $A=U\Sigma V^{\mathsf T}$ を得ます。

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

## 7. rank と特異値

<a id="prop-f0-00f2-rank-singular-values"></a>

<!-- formal-statement-start -->
> **命題（rank と非零特異値）**  
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

[SVD](#thm-f0-00f2-svd)から

$$
Ax
=
\sum_{i=1}^r
\sigma_i\langle x,v_i\rangle u_i
$$

なので像は $u_1,\dots,u_r$ の span に含まれます。逆に

$$
Av_i=\sigma_i u_i
$$

かつ $\sigma_i>0$ なので各 $u_i$ は像に入り、像はちょうどその span です。従って次元は $r$ です。

また $x=\sum_i c_iv_i$ とすると

$$
Ax=0
\Longleftrightarrow
c_i=0\quad(i=1,\dots,r),
$$

なのでkernelは特異値0に対応する右特異ベクトルで張られます。

---

## 8. 行列の最大伸長率

<a id="def-f0-00f2-operator-norm"></a>

<!-- formal-statement-start -->
> **定義（作用素ノルム）**  
> 線形写像 $A:\mathbb R^n\to\mathbb R^m$ のEuclidノルムに関する **作用素ノルム** を

$$
\|A\|_{\mathrm{op}}
=
\sup_{x\ne0}\frac{\|Ax\|}{\|x\|}
=
\sup_{\|x\|=1}\|Ax\|
$$

> と定めます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00f2-operator-norm -->
### 8.1 例：対角行列の最大伸長

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

任意の $x$ を右特異ベクトル基底で

$$
x=\sum_i c_iv_i
$$

と書くと

$$
Ax=\sum_i c_i\sigma_i u_i.
$$

正規直交性から

$$
\|Ax\|^2
=
\sum_i\sigma_i^2|c_i|^2
\le
\sigma_1^2\sum_i|c_i|^2
=
\sigma_1^2\|x\|^2.
$$

従って $\|A\|_{\mathrm{op}}\le\sigma_1$ です。一方 $x=v_1$ なら

$$
\|Av_1\|=\sigma_1\|v_1\|=\sigma_1,
$$

なので上限が達成され、等号が従います。

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

## 10. 低rank近似への入口

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

という低rank近似が得られます。

統計では

- PCA
- 次元削減
- 低rank回帰
- 数値安定性

などへつながります。

ここでは最良近似定理そのものは後続へ譲り、SVDがrankを方向別に分解していることだけ押さえます。

---

## 11. 関数解析への橋

ここまでで有限次元線形代数について

- ベクトル空間・基底・次元
- 線形写像・kernel・image
- 表現行列・基底変換
- 相似・一般の対角化
- 内積・正規直交基底
- 射影・QR
- 実対称行列の直交対角化
- SVD
- 作用素ノルム

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
| 最大特異値 | 作用素ノルム |

ただし無限次元では、有限次元で自動だった性質が次々に壊れます。

そこで次は **ノルム空間・Banach空間・有限次元と無限次元の差** を整理します。

---

## 12. 演習

### F0-00F2-A01 特異値と作用素ノルム

- Level: A
- 目安時間: 10分

$$
A=\operatorname{diag}(3,1)
$$

の特異値と作用素ノルムを求めよ。

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

### F0-00F2-A03 kernel・image と特異値

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

なので、像は $u_1,\dots,u_r$ の span に含まれます。

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

### F0-00F2-A04 線形汎関数の作用素ノルム

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

### F0-00F2-B01 SVDとrank

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

### F0-00F2-B02 薄いSVDを構成する

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

の薄いSVD $A=U\Sigma V^{\mathsf T}$ を明示し、行列積で確認せよ。

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

### F0-00F2-B03 作用素ノルム＝最大特異値

- Level: B
- 目安時間: 15分

[SVD](#thm-f0-00f2-svd)を用いて

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

従って上限が達成され、$\|A\|_{\mathrm{op}}=\sigma_1$ です。
<!-- solution-end -->

### F0-00F2-C01 SVD・rank・作用素ノルムの統合

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

この行列の固有値は $4,2$ で、対応する正規直交固有ベクトルを

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

これで、有限次元線形代数を「計算できる」だけでなく、基底・表現行列・対角化・直交化・SVDまで構造として一度閉じました。

次はこの有限次元の常識が、無限次元ではどこまで壊れるかを見ます。

**次：[F0-00D1 ノルム空間・Banach・有限次元と無限次元](../F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)**
