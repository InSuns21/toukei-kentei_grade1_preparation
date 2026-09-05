# F0-02C4A 関数解析IV-A：tangent cone・polar cone・dual cone

<!-- definition-example-audit: strict -->

実行可能な一次方向と、それを支える双対側の法線・錐を整理します。凸集合では tangent cone を具体的な錐包で表し、normal cone がその polar と一致するところまで証明します。

## 1. tangent cone

集合 $C$ と $x\in C$ に対し、「実際に集合内から近づける一次方向」を集めたものが tangent cone です。

<a id="def-f0-02c4a-tangent-cone"></a>

<!-- formal-statement-start -->
> **定義（Bouligand tangent cone）**  
> 集合 $C\subset\mathbb R^n$ と $x\in C$ に対し

$$
T_C(x)=\left\{h:\exists t_n\downarrow0,\ \exists x_n\in C,\ \frac{x_n-x}{t_n}\to h\right\}
$$

> を $C$ の $x$ における **Bouligand tangent cone** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4a-tangent-cone -->
**定義の確認**  
$C=[0,\infty)$、$x=0$ とします。$h\ge0$ なら $t_n=1/n$、$x_n=t_nh\in C$ と取れば

$$
\frac{x_n-x}{t_n}=h,
$$

したがって $h\in T_C(0)$ です。逆に $x_n\ge0$、$t_n>0$ なので各 $x_n/t_n\ge0$ であり、その極限も非負です。従って

$$
\boxed{T_C(0)=[0,\infty)}.
$$
<!-- definition-example-end -->

凸集合なら「$y-x$ の非負倍を集めて閉じる」という直感を、そのまま定理にできます。

<a id="thm-f0-02c4a-convex-tangent-cone"></a>

<!-- formal-statement-start -->
> **定理（凸集合の tangent cone）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ に対して

$$
\boxed{
T_C(x)=\overline{\operatorname{cone}(C-x)}
}
$$

> が成り立ちます。ここで

$$
\operatorname{cone}(C-x)
=\{\alpha(y-x):\alpha\ge0,\ y\in C\}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：定義列と線分の凸性を往復する

まず $h\in T_C(x)$ とします。定義から $t_n\downarrow0$、$x_n\in C$ が存在して

$$
\frac{x_n-x}{t_n}\to h.
$$

各項は

$$
\frac{x_n-x}{t_n}=\frac1{t_n}(x_n-x)\in\operatorname{cone}(C-x)
$$

なので

$$
h\in\overline{\operatorname{cone}(C-x)}.
$$

逆にまず $h=\alpha(y-x)\in\operatorname{cone}(C-x)$ を取ります。$\alpha=0$ なら $x_n=x$ と取れば $0\in T_C(x)$ です。$\alpha>0$ なら $t_n\downarrow0$ を十分小さく取り $\alpha t_n\le1$ とし、

$$
x_n=x+\alpha t_n(y-x)
=(1-\alpha t_n)x+\alpha t_n y
$$

と置きます。凸性から $x_n\in C$ で、

$$
\frac{x_n-x}{t_n}=\alpha(y-x)=h.
$$

従って $\operatorname{cone}(C-x)\subset T_C(x)$ です。また最初の包含から $T_C(x)$ は閉包に含まれ、定義から極限方向について閉じているので閉集合です。よって閉包を取って

$$
\overline{\operatorname{cone}(C-x)}\subset T_C(x).
$$

両包含から結論を得ます。$\square$
<!-- proof-end -->

---

## 2. polar cone

<a id="def-f0-02c4a-polar-cone"></a>

<!-- formal-statement-start -->
> **定義（polar cone）**  
> 錐 $K\subset\mathbb R^n$ に対して

$$
K^\circ=\{v\in\mathbb R^n:v^{\mathsf T}k\le0\ \forall k\in K\}
$$

> を $K$ の **polar cone** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4a-polar-cone -->
**定義の確認**  
$K=[0,\infty)\subset\mathbb R$ とします。$v\in K^\circ$ なら $vk\le0$ が全ての $k\ge0$ で必要なので $v\le0$。逆に $v\le0$ なら確かに $vk\le0$ です。従って

$$
\boxed{K^\circ=(-\infty,0]}.
$$
<!-- definition-example-end -->

<a id="thm-f0-02c4a-normal-polar"></a>

<!-- formal-statement-start -->
> **定理（凸集合の normal cone は tangent cone の polar）**  
> 凸集合 $C\subset\mathbb R^n$ と $x\in C$ に対し、[normal cone](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md#def-f0-02c4-normal-cone) を

$$
N_C(x)=\{v:v^{\mathsf T}(y-x)\le0\ \forall y\in C\}
$$

> とすると

$$
\boxed{N_C(x)=T_C(x)^\circ}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：$C-x$ 上の不等式を錐包と閉包へ延長する

$v\in N_C(x)$ とします。任意の $y\in C$ で

$$
v^{\mathsf T}(y-x)\le0.
$$

従って任意の $\alpha\ge0$ に対して

$$
v^{\mathsf T}\{\alpha(y-x)\}\le0.
$$

つまり $v$ は $\operatorname{cone}(C-x)$ の全方向に非正です。内積は連続なので、その閉包にも同じ不等式が成立します。前節の定理から

$$
T_C(x)=\overline{\operatorname{cone}(C-x)}
$$

であるため $v\in T_C(x)^\circ$ です。

逆に $v\in T_C(x)^\circ$ とします。任意の $y\in C$ に対して $y-x\in\operatorname{cone}(C-x)\subset T_C(x)$ なので

$$
v^{\mathsf T}(y-x)\le0.
$$

従って $v\in N_C(x)$ です。$\square$
<!-- proof-end -->

つまりnormal coneは「実行可能な接方向すべてに非正に作用するベクトル」の集合です。

---

## 3. dual cone

<a id="def-f0-02c4a-dual-cone"></a>

<!-- formal-statement-start -->
> **定義（dual cone）**  
> 錐 $K\subset\mathbb R^m$ に対して

$$
K^*=\{\lambda\in\mathbb R^m:\lambda^{\mathsf T}k\ge0\ \forall k\in K\}
$$

> を $K$ の **dual cone** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-02c4a-dual-cone -->
**定義の確認**  
$K=\mathbb R_+^m$ とします。$\lambda\in K^*$ なら標準基底 $e_i\in K$ を入れて $\lambda_i\ge0$。逆に $\lambda\ge0$ なら任意の $k\ge0$ に対して $\lambda^{\mathsf T}k\ge0$ です。従って

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$
<!-- definition-example-end -->

本教材では polar cone を $\le0$、dual cone を $\ge0$ で定義しているため

$$
\boxed{K^\circ=-K^*}.
$$

文献によって符号規約が異なるので、名前だけでなく不等号を確認することが重要です。

---

## 4. 非負直交錐は自己双対

前節の定義確認で示した通り、有限次元で

$$
K=\mathbb R_+^m
$$

なら

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$

有限次元KKTの $\lambda_i\ge0$ は、一般には

$$
\boxed{\lambda\in K^*}
$$

という双対錐条件です。

---

## 5. KKTへの橋

ここまでで

$$
\boxed{\text{実行可能方向 }T_C(x)\xrightarrow{\text{polar}}\text{法線 }N_C(x)}
$$

と

$$
\boxed{\lambda_i\ge0\xrightarrow{\text{一般化}}\lambda\in K^*}
$$

を、定義だけでなく証明付きで用意しました。

次の [F0-02C5 一般化KKT・制約写像・制約想定](../F0_02C5_一般化KKT_制約写像_制約想定/index.md) では、制約を

$$
G(x)\in-K
$$

という一つの写像で書き、

$$
Df(x^*)+DG(x^*)^*\lambda=0
$$

を導入します。

---

## 演習

### F0-02C4A-A01 非負直交錐の双対

- Level: A
- 目安時間: 10分

$K=\mathbb R_+^m$ について $K^*=K$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\lambda\in K^*$ なら標準基底 $e_i\in K$ により $\lambda_i\ge0$。逆に $\lambda,k\ge0$ なら $\lambda^{\mathsf T}k\ge0$。
#### 本番答案
$\lambda\in K^*$ なら標準基底 $e_i\in K$ により $\lambda_i\ge0$。逆に $\lambda,k\ge0$ なら $\lambda^{\mathsf T}k\ge0$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C4A-B01 半空間のtangentとpolar

- Level: B
- 目安時間: 15分

$C=\{x:a^{\mathsf T}x\le b\}$ の境界点 $x$ で $T_C(x)=\{d:a^{\mathsf T}d\le0\}$ とそのpolarを求めよ。

<!-- solution-start -->
#### 詳細解答
一次的に実行可能なのは $a^{\mathsf T}d\le0$。この半空間錐のpolarは $\{\lambda a:\lambda\ge0\}$ で、これは $N_C(x)$ に一致する。
#### 本番答案
一次的に実行可能なのは $a^{\mathsf T}d\le0$。この半空間錐のpolarは $\{\lambda a:\lambda\ge0\}$ で、これは $N_C(x)$ に一致する。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C5 一般化KKT・錐制約・双対乗数](../F0_02C5_一般化KKT_制約写像_制約想定/index.md)**
