# LA3 標準線形代数 III：分割案内

旧 LA3 は、代数的双対から一般の行列式・余因子・抽象行列式までを1ページに詰め込んでいたため、現在は4章へ分割しました。

数学的内容を削ったのではなく、**1章1テーマに戻し、具体的な問題から定義・定理へ進む学習導線へ組み替えています。**

## 推奨読順

1. **[LA3A 代数的双対](../LA3A/index.md)**  
   線形形式を「ベクトルを測る道具」として導入し、双対基底、annihilator、商空間の双対、双対写像、二重双対へ進みます。

2. **[LA3B 行列式の構成](../LA3B/index.md)**  
   面積・体積倍率に欲しい性質を先に考え、[置換の符号](../LA3B/index.md#def-la3b-permutation-sign)で向きを管理し、[Leibniz 公式による行列式](../LA3B/index.md#def-la3b-matrix-determinant)を構成します。

3. **[LA3C 行列式の計算・可逆性・乗法性](../LA3C/index.md)**  
   基本変形、三角行列、Laplace 展開、余因子、乗法性、可逆性、相似不変性を扱います。**LA4 の必須前提はここまで**です。

4. **[LA3D 抽象行列式](../LA3D/index.md)**  
   最高次交代形式を使い、行列式を「線形写像が符号付き体積を何倍するか」として座標なしに捉え直します。LA4 の必須前提ではありません。

```text
LA2 → LA3A → LA3B → LA3C → LA4
                         └→ LA3D
```

LA3A と行列式側は数学的にはかなり独立していますが、標準コアの読順としては上の順を推奨します。

---

## 旧アンカーから来た読者へ

<a id="def-la3-linear-form"></a>
<a id="def-la3-dual-space"></a>
<a id="def-la3-dual-basis"></a>
<a id="thm-la3-dual-basis"></a>
<a id="def-la3-annihilator"></a>
<a id="thm-la3-annihilator-dimension"></a>
<a id="thm-la3-quotient-dual-annihilator"></a>
<a id="def-la3-dual-map"></a>
<a id="thm-la3-double-dual"></a>
旧 §1–5 の内容は **[LA3A](../LA3A/index.md)** へ移動しました。

<a id="def-la3-permutation-sign"></a>
<a id="lem-la3-permutation-sign-product"></a>
<a id="def-la3-matrix-determinant"></a>
<a id="thm-la3-det-alternating-multilinear"></a>
<a id="thm-la3-det-uniqueness"></a>
<a id="thm-la3-det-transpose"></a>
旧 §6.1–6.4 の内容は **[LA3B](../LA3B/index.md)** へ移動しました。

<a id="thm-la3-det-elementary-operations"></a>
<a id="thm-la3-triangular-determinant"></a>
<a id="thm-la3-laplace-expansion"></a>
<a id="def-la3-adjugate"></a>
<a id="thm-la3-adjugate-identity"></a>
<a id="thm-la3-det-multiplicative"></a>
<a id="thm-la3-det-invertible"></a>
<a id="thm-la3-det-similarity-invariant"></a>
旧 §6.5–6.7 と計算・可逆性の内容は **[LA3C](../LA3C/index.md)** へ移動しました。

<a id="def-la3-alternating-form"></a>
<a id="thm-la3-top-alternating-one-dimensional"></a>
<a id="def-la3-abstract-determinant"></a>
<a id="thm-la3-abstract-matrix-det-agree"></a>
旧 §7–8 の抽象化は **[LA3D](../LA3D/index.md)** へ移動しました。

このページは旧 URL と旧 fragment を極力失効させないための案内ページとして残します。新しい数学的正本は LA3A–LA3D 側です。
