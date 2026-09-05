# F0-02C4A 凸解析：tangent cone・polar cone・dual cone

<!-- definition-example-audit: strict -->

実行可能な一次方向と、それを支える双対側の法線・錐を整理します。C4 の normal cone を、接方向と双対錐の言葉で読み直す章です。

---

## 1. tangent cone

集合 $C$ と $x\in C$ に対し、「実際に集合内から近づける一次方向」を集めたものが tangent cone です。

<a id="def-f0-02c4a-tangent-cone"></a>

<!-- formal-statement-start -->
> **定義（Bouligand tangent cone）**  
> 集合 $C$ と $x\in C$ に対し、次の集合を $C$ の $x$ における **Bouligand tangent cone** といいます。

$$
T_C(x)
=
\left\{
 h:
 \exists t_n\downarrow0,
 \ \exists x_n\in C,
 \ \frac{x_n-x}{t_n}\to h
\right\}.
$$
<!-- formal-statement-end -->

凸集合では、直感的には

$$
y-x
\qquad(y\in C)
$$

の非負倍を集めて閉じた錐と一致します。この等式自体は次の C4B で証明します。

---

## 2. polar cone

<a id="def-f0-02c4a-polar-cone"></a>

<!-- formal-statement-start -->
> **定義（polar cone）**  
> 錐 $K\subset X$ に対し、次の集合を $K$ の **polar cone** といいます。

$$
K^\circ
=
\{x^*\in X^*:x^*(k)\le0\ \forall k\in K\}.
$$
<!-- formal-statement-end -->

normal cone の定義と比べると、凸集合について

$$
\boxed{N_C(x)=T_C(x)^\circ}
$$

という関係が期待されます。

つまり normal cone は「実行可能な接方向すべてに非正に作用する汎関数」の集合です。C4B ではこの等式を定義から証明します。

---

## 3. dual cone

<a id="def-f0-02c4a-dual-cone"></a>

<!-- formal-statement-start -->
> **定義（dual cone）**  
> 錐 $K\subset Y$ に対し、次の集合を $K$ の **dual cone** といいます。

$$
K^*
=
\{\lambda\in Y^*:\lambda(k)\ge0\ \forall k\in K\}.
$$
<!-- formal-statement-end -->

本教材では polar cone を $\le0$、dual cone を $\ge0$ で定義しているため

$$
\boxed{K^\circ=-K^*}.
$$

文献によって符号規約が異なるので、名前だけでなく不等号を確認することが重要です。

<!-- definition-example-start: def-f0-02c4a-tangent-cone, def-f0-02c4a-polar-cone, def-f0-02c4a-dual-cone -->
### 3.1 例：半直線で3つの定義を同時に検算

**定義の確認**

$C=[0,\infty)$、$x=0$ とします。$x_n=t_n h\in C$ を取れるのは $h\ge0$ のときなので、Bouligand の定義から

$$
T_C(0)=[0,\infty).
$$

この錐を $K=[0,\infty)$ と書くと、polar の定義は

$$
pk\le0\qquad(\forall k\ge0)
$$

なので

$$
K^\circ=(-\infty,0].
$$

一方 dual cone の定義は

$$
\lambda k\ge0\qquad(\forall k\ge0)
$$

なので

$$
K^*=[0,\infty).
$$

従ってこの具体例でも $K^\circ=-K^*$ が確認できます。
<!-- definition-example-end -->

---

## 4. 非負直交錐は自己双対

有限次元で

$$
K=\mathbb R_+^m
$$

とします。$\lambda\in K^*$ である条件は

$$
\lambda^{\mathsf T}k\ge0
\qquad(\forall k\ge0).
$$

各標準基底 $e_i\ge0$ を入れると

$$
\lambda_i\ge0.
$$

逆に $\lambda\ge0$ なら $k\ge0$ に対して内積は非負です。したがって

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$

有限次元 KKT の

$$
\lambda_i\ge0
$$

は、一般には

$$
\boxed{\lambda\in K^*}
$$

という双対錐条件です。

---

## 5. KKTへの伏線

ここまでで

$$
\boxed{
\text{実行可能方向 }T_C(x)
\xrightarrow{\text{polar}}
\text{法線 }N_C(x)
}
$$

と

$$
\boxed{
\lambda_i\ge0
\xrightarrow{\text{一般化}}
\lambda\in K^*
}
$$

を用意しました。

ただし標準通読では、ここからすぐ KKT へ飛びません。まず C4B で

$$
N_C(x)=T_C(x)^\circ
$$

を完全に証明し、その後 G2 で Fenchel 共役・双対を入れてから有限次元 KKT へ進みます。

---

## 演習

### F0-02C4A-A01 非負直交錐の双対

- Level: A
- 目安時間: 10分

$K=\mathbb R_+^m$ について $K^*=K$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\lambda\in K^*$ なら標準基底 $e_i\in K$ により $\lambda_i\ge0$。逆に $\lambda,k\ge0$ なら $\lambda^{\mathsf T}k\ge0$。したがって $K^*=K$ である。

#### 本番答案
$\lambda\in K^*$ なら $e_i\in K$ を代入して $\lambda_i\ge0$。逆向きは非負ベクトル同士の内積が非負であることから従う。

#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C4A-B01 半空間の tangent と polar

- Level: B
- 目安時間: 15分

$C=\{x:a^{\mathsf T}x\le b\}$ の境界点 $x$ で $T_C(x)$ とその polar を求めよ。

<!-- solution-start -->
#### 詳細解答
境界では $a^{\mathsf T}x=b$ なので、一次的に実行可能な方向は

$$
T_C(x)=\{d:a^{\mathsf T}d\le0\}.
$$

この半空間錐の polar は

$$
T_C(x)^\circ
=
\{\lambda a:\lambda\ge0\},
$$

であり、これは $N_C(x)$ に一致する。

#### 本番答案
$T_C(x)=\{d:a^{\mathsf T}d\le0\}$、したがって $T_C(x)^\circ=\{\lambda a:\lambda\ge0\}=N_C(x)$。

#### 採点基準（20点）
- 方針: 5点
- tangent cone: 7点
- polar cone: 4点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C4B tangent cone と normal cone の polar 双対](../F0_02C4B_tangent_normal_polar_proof/index.md)**
