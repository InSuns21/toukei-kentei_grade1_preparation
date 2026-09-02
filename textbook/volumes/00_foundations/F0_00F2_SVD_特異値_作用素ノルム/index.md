# F0-00F2 SVD・特異値・作用素ノルム

F0-00F1のスペクトル定理を $A^{\mathsf T}A$ に適用し、任意の長方形行列を方向別の伸縮へ分解します。

```text
A^T A
 ↓
特異値
 ↓
SVD
 ↓
rank・kernel・image
 ↓
作用素ノルム
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

従ってF0-00F1のスペクトル定理を適用できます。

---

## 2. 特異値と右特異ベクトル

スペクトル定理により

$$
A^{\mathsf T}A v_i
=
\lambda_i v_i,
$$

$$
\lambda_i\ge0
$$

となる正規直交固有基底 $v_1,\dots,v_n$ を取れます。

$$
\boxed{
\sigma_i
=
\sqrt{\lambda_i}
}
$$

を $A$ の **特異値** といいます。

$v_i$ を **右特異ベクトル** といいます。

---

## 3. 左特異ベクトル

$\sigma_i>0$ なら

$$
\boxed{
u_i
=
\frac{Av_i}{\sigma_i}
}
$$

と置きます。

すると

$$
\|u_i\|^2
=
\frac{v_i^{\mathsf T}A^{\mathsf T}Av_i}{\sigma_i^2}
=
\frac{\lambda_i}{\sigma_i^2}
=1.
$$

また $i\ne j$ なら

$$
\begin{aligned}
\langle u_i,u_j\rangle
&=
\frac{1}{\sigma_i\sigma_j}
\langle Av_i,Av_j\rangle\\
&=
\frac{1}{\sigma_i\sigma_j}
v_i^{\mathsf T}A^{\mathsf T}Av_j\\
&=
\frac{\lambda_j}{\sigma_i\sigma_j}
v_i^{\mathsf T}v_j\\
&=0.
\end{aligned}
$$

したがって $u_i$ も正規直交系です。

これらを **左特異ベクトル** といいます。

---

## 4. SVDを構成する

正の特異値を

$$
\sigma_1\ge\cdots\ge\sigma_r>0
$$

とします。

対応する右特異ベクトルを列に並べて

$$
V_r
=
\begin{pmatrix}
v_1&\cdots&v_r
\end{pmatrix},
$$

左特異ベクトルを

$$
U_r
=
\begin{pmatrix}
u_1&\cdots&u_r
\end{pmatrix}
$$

とします。

また

$$
\Sigma_r
=
\operatorname{diag}(\sigma_1,\dots,\sigma_r).
$$

すると

$$
Av_i=\sigma_i u_i
$$

をまとめて

$$
\boxed{
A
=
U_r\Sigma_rV_r^{\mathsf T}
}
$$

と書けます。

これが薄い **特異値分解（SVD）** です。

必要なら $U_r,V_r$ を正規直交基底へ補って完全形

$$
A=U\Sigma V^{\mathsf T}
$$

を得ます。

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

| | 一般の対角化 | 実対称のスペクトル分解 | SVD |
|---|---|---|---|
| 対象 | 正方行列の一部 | 実対称正方行列 | 任意の長方形行列 |
| 形 | $A=PDP^{-1}$ | $A=Q\Lambda Q^{\mathsf T}$ | $A=U\Sigma V^{\mathsf T}$ |
| 基底 | 固有基底 | 正規直交固有基底 | 入力・出力で別の正規直交基底 |
| 対角成分 | 固有値 | 実固有値 | 非負の特異値 |
| 常に可能か | いいえ | はい | はい |

特に「SVDはいつでも存在する」が重要です。

---

## 7. rank と特異値

非零特異値の本数を $r$ とすると

$$
\boxed{
\operatorname{rank}(A)=r
}
$$

です。

実際

$$
A=U_r\Sigma_rV_r^{\mathsf T}
$$

で $\Sigma_r$ は正則な $r\times r$ 対角行列です。

したがって

$$
\operatorname{Im}A
=
\operatorname{span}(u_1,\dots,u_r)
$$

です。

また特異値0に対応する右特異ベクトルは

$$
Av_i=0
$$

を満たすので

$$
\ker A
$$

を張ります。

SVDはF0-00Fの kernel・image・rank を正規直交基底で可視化しています。

---

## 8. 作用素ノルム

線形写像

$$
A:\mathbb R^n\to\mathbb R^m
$$

のEuclidノルムに関する **作用素ノルム** を

$$
\boxed{
\|A\|_{\mathrm{op}}
=
\sup_{x\ne0}
\frac{\|Ax\|}{\|x\|}
=
\sup_{\|x\|=1}\|Ax\|
}
$$

と定義します。

これは

> 単位ベクトルを最大で何倍まで伸ばすか

を表します。

SVDを使うと

$$
x
=
\sum_i c_iv_i
$$

に対して

$$
Ax
=
\sum_i c_i\sigma_i u_i.
$$

正規直交性から

$$
\|Ax\|^2
=
\sum_i\sigma_i^2|c_i|^2
\le
\sigma_1^2
\sum_i|c_i|^2
=
\sigma_1^2\|x\|^2.
$$

したがって

$$
\|A\|_{\mathrm{op}}
\le
\sigma_1.
$$

$x=v_1$ とすれば

$$
\|Av_1\|=\sigma_1
$$

なので等号が達成されます。

よって

$$
\boxed{
\|A\|_{\mathrm{op}}
=
\sigma_{\max}(A)
}
$$

です。

---

## 9. 線形汎関数の有限次元版

固定した $a\in\mathbb R^n$ に対して

$$
\ell_a(x)
=a^{\mathsf T}x
$$

と置きます。

Cauchy--Schwarzから

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
- 実対称行列のスペクトル定理
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

### F0-00F2-A01 特異値

- Level: A
- 目安時間: 10分

$$
A
=
\operatorname{diag}(3,1)
$$

の特異値と作用素ノルムを求めよ。

<!-- solution-start -->
#### 詳細解答
$$
A^{\mathsf T}A
=
\operatorname{diag}(9,1)
$$
なので特異値は3,1。最大特異値より作用素ノルムは3。
#### 本番答案
$$
\sigma_1=3,
\quad
\sigma_2=1,
\quad
\|A\|_{\mathrm{op}}=3.
$$
#### 採点基準（20点）
- $A^{\mathsf T}A$: 6点
- 特異値: 8点
- 作用素ノルム: 6点
<!-- solution-end -->

### F0-00F2-B01 SVDとrank

- Level: B
- 目安時間: 12分

薄いSVD

$$
A=U_r\Sigma_rV_r^{\mathsf T}
$$

で $\Sigma_r$ の対角成分が全て正とする。

$$
\operatorname{rank}(A)=r
$$

を説明せよ。

<!-- solution-start -->
#### 詳細解答
$V_r$ の列空間上で $V_r^{\mathsf T}$ は座標を取り出し、$\Sigma_r$ は正則なので次元を潰さず、$U_r$ は $r$ 本の正規直交列へ写す。従って像は
$$
\operatorname{span}(u_1,\dots,u_r)
$$
で次元 $r$。
#### 本番答案
$\Sigma_r$ が正則なので、$A$ は右特異部分空間を左特異部分空間へ同型に写す。よってrankは $r$。
#### 採点基準（20点）
- $\Sigma_r$ の正則性: 6点
- 像の同定: 8点
- rank結論: 6点
<!-- solution-end -->

---

## 13. 次に進む

これで、有限次元線形代数を「計算できる」だけでなく、基底・表現行列・対角化・直交化・SVDまで構造として一度閉じました。

次はこの有限次元の常識が、無限次元ではどこまで壊れるかを見ます。

**次：[F0-00D1 ノルム空間・Banach・有限次元と無限次元](../F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)**
