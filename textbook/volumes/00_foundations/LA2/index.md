# LA2 標準線形代数 II：直和・補空間・商空間

[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#def-f0-00e-sum-direct-sum) で部分空間の和・直和を定義しました。この章ではそこから一歩進み、**空間を分ける**直和と、**不要な方向を潰す**商空間を対にして扱います。

---

## 1. 補空間

<a id="def-la2-complement"></a>
<!-- formal-statement-start -->
> **定義（補空間）**  
> ベクトル空間 $V$ の部分空間 $U,W$ が
$$
V=U\oplus W
$$
> を満たすとき、$W$ を $U$ の補空間という。
<!-- formal-statement-end -->

補空間を選ぶと、任意の $x\in V$ は一意に
$$
x=u+w,
\qquad u\in U,\ w\in W
$$
と分解できます。

<!-- definition-example-start: def-la2-complement -->
**定義の確認**：$V=\mathbb R^2$, $U=\operatorname{span}(e_1)$, $W=\operatorname{span}(e_2)$ なら $U\cap W=\{0\}$ かつ $U+W=V$ なので $W$ は $U$ の補空間です。ただし補空間は一般に一意ではありません。$\operatorname{span}(e_1+e_2)$ も $U$ の補空間です。
<!-- definition-example-end -->

<a id="thm-la2-complement-existence"></a>
<!-- formal-statement-start -->
> **定理（有限次元補空間の存在）**  
> 有限次元ベクトル空間 $V$ の任意の部分空間 $U$ に対して、ある部分空間 $W$ が存在して
$$
V=U\oplus W
$$
> となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$U$ の基底 $u_1,\dots,u_r$ を取り、[基底延長定理](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#thm-basis-extension) により
$$
u_1,\dots,u_r,w_1,\dots,w_s
$$
を $V$ の基底へ延長します。
$$
W=\operatorname{span}(w_1,\dots,w_s)
$$
と置けば、基底の一意表示から $V=U+W$ かつ $U\cap W=\{0\}$。したがって $V=U\oplus W$ です。$\square$
<!-- proof-end -->

内積空間では $U^\perp$ という自然な補空間がありますが、一般のベクトル空間では補空間の選び方に標準性はありません。

---

## 2. 商空間は「差が $W$ に入るものを同じとみなす」

部分空間 $W\subset V$ を固定します。$x,y\in V$ に対して
$$
x\sim y
\quad\Longleftrightarrow\quad
x-y\in W
$$
と定めます。

これは同値関係で、$x$ と同値な元全体は
$$
x+W=\{x+w:w\in W\}
$$
です。

<a id="def-la2-quotient"></a>
<!-- formal-statement-start -->
> **定義（商空間）**  
> 部分空間 $W\subset V$ に対し、剰余類 $x+W$ 全体の集合
$$
V/W=\{x+W:x\in V\}
$$
> に
$$
(x+W)+(y+W)=(x+y)+W,
$$
$$
\alpha(x+W)=(\alpha x)+W
$$
> と演算を定めたものを商空間という。
<!-- formal-statement-end -->

ここで重要なのは、代表元を変えても演算結果が変わらないことです。

<!-- proof-start -->
### 証明

演算がwell-defined、すなわち代表元の選び方によらないことを確認します。$x+W=x'+W$, $y+W=y'+W$ なら
$$
x-x'\in W,
\qquad y-y'\in W.
$$
したがって
$$
(x+y)-(x'+y')\in W
$$
なので $(x+y)+W=(x'+y')+W$。スカラー倍も
$$
\alpha x-\alpha x'=\alpha(x-x')\in W
$$
なので代表元によらず定まります。
<!-- proof-end -->

<!-- definition-example-start: def-la2-quotient -->
**定義の確認**：$V=\mathbb R^2$, $W=\operatorname{span}(e_1)$ とすると、$(x,y)+W$ は横方向の違いをすべて同一視します。したがって剰余類は実質的に $y$ 座標だけで区別され、$V/W\cong\mathbb R$ です。
<!-- definition-example-end -->

---

## 3. 標準射影

<a id="def-la2-canonical-projection"></a>
<!-- formal-statement-start -->
> **定義（標準射影）**  
> 商空間 $V/W$ に対し
$$
\pi:V\to V/W,
\qquad
\pi(x)=x+W
$$
> で定める線形写像を標準射影という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la2-canonical-projection -->
**定義の確認**：$\pi(x+y)=(x+y)+W=(x+W)+(y+W)$、$\pi(\alpha x)=\alpha x+W=\alpha(x+W)$ なので線形です。また
$$
\ker\pi=W.
$$
つまり商空間を作る操作は、ちょうど $W$ の方向を0へ潰します。
<!-- definition-example-end -->

---

## 4. 商空間の次元

<a id="thm-la2-quotient-dimension"></a>
<!-- formal-statement-start -->
> **定理（商空間の次元公式）**  
> $V$ を有限次元ベクトル空間、$W\subset V$ を部分空間とすると
$$
\dim(V/W)=\dim V-\dim W.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W$ の基底 $w_1,\dots,w_r$ を $V$ の基底
$$
w_1,\dots,w_r,v_1,\dots,v_s
$$
へ延長します。すると
$$
v_1+W,\dots,v_s+W
$$
が $V/W$ の基底になります。

実際、任意の $x\in V$ は $W$ 成分と $v_j$ 成分に分けられ、商空間では $W$ 成分が消えるので生成します。また
$$
\sum_j a_j(v_j+W)=W
$$
なら $\sum_j a_jv_j\in W$ であり、元の基底の一次独立性から $a_j=0$。よって一次独立です。したがって $\dim(V/W)=s=\dim V-r$。$\square$
<!-- proof-end -->

この公式は「$W$ の自由度を潰した残りが商空間」という直感そのものです。

---

## 5. 第一同型定理

線形写像 $T:V\to Z$ は $\ker T$ の中では何も区別できません。$x-y\in\ker T$ なら
$$
T(x)=T(y)
$$
だからです。

<a id="thm-la2-first-isomorphism"></a>
<!-- formal-statement-start -->
> **定理（第一同型定理）**  
> 線形写像 $T:V\to Z$ に対し
$$
\widetilde T:V/\ker T\to\operatorname{Im}T,
\qquad
\widetilde T(x+\ker T)=T(x)
$$
> はwell-definedな線形同型である。したがって
$$
V/\ker T\cong\operatorname{Im}T.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $x+\ker T=y+\ker T$ なら $x-y\in\ker T$ なので $T(x)=T(y)$。よってwell-definedです。線形性は $T$ の線形性から従います。

全射性は終域を $\operatorname{Im}T$ とした定義から明らかです。さらに
$$
\widetilde T(x+\ker T)=0
$$
なら $T(x)=0$、したがって $x\in\ker T$ で
$$
x+\ker T=\ker T
$$
は商空間の零元です。よって単射。したがって同型です。$\square$
<!-- proof-end -->

有限次元なら次元を取って
$$
\dim V-\dim\ker T=\dim\operatorname{Im}T
$$
となり、[rank-nullity theorem](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md#thm-f0-00f-01) が回収されます。

つまりrank-nullityは、第一同型定理の「次元だけを数えた影」です。

---

## 6. 直和と商空間は何が違うか

$V=U\oplus W$ と補空間 $W$ を**選べば**
$$
V/U\cong W
$$
です。しかし商空間 $V/U$ 自体は補空間を選ばなくても定義できます。

この違いは重要です。

- 直和分解：残す方向を具体的に選ぶ。
- 商空間：潰す方向だけ指定する。

補空間は一般に非一意ですが、商空間は $U$ を指定すれば標準的に決まります。

---

## 7. 演習

### Level A

<a id="ex-la2-a01"></a>
#### LA2-A01 補空間
- Level: A

$U=\operatorname{span}((1,1,0)^T)\subset\mathbb R^3$ の補空間を1つ与えよ。

<!-- solution-start -->
**解答**：例えば $W=\operatorname{span}(e_2,e_3)$ とすれば、$(1,1,0)^T,e_2,e_3$ は一次独立なので $\mathbb R^3=U\oplus W$。
<!-- solution-end -->

<a id="ex-la2-a02"></a>
#### LA2-A02 同じ剰余類
- Level: A

$W=\operatorname{span}((1,0)^T)\subset\mathbb R^2$ とする。$(2,3)^T+W$ と $(5,3)^T+W$ が同じ剰余類であることを示せ。

<!-- solution-start -->
**解答**：差は $(-3,0)^T\in W$ なので同じ剰余類。
<!-- solution-end -->

<a id="ex-la2-a03"></a>
#### LA2-A03 商空間の次元
- Level: A

$W=\{x\in\mathbb R^4:x_1+x_2+x_3+x_4=0\}$ とする。$\dim(\mathbb R^4/W)$ を求めよ。

<!-- solution-start -->
**解答**：$W$ は1本の独立な線形条件で定まるので $\dim W=3$。したがって商空間の次元は $4-3=1$。
<!-- solution-end -->

<a id="ex-la2-a04"></a>
#### LA2-A04 標準射影の核
- Level: A

$\pi:V\to V/W$ の核を求めよ。

<!-- solution-start -->
**解答**：$\pi(x)=W$ であることと $x\in W$ は同値なので $\ker\pi=W$。
<!-- solution-end -->

### Level B

<a id="ex-la2-b01"></a>
#### LA2-B01 第一同型定理を具体化する
- Level: B

$T:\mathbb R^3\to\mathbb R^2$, $T(x,y,z)=(x+y,y+z)$ とする。$\ker T$ を求め、$\mathbb R^3/\ker T\cong\mathbb R^2$ を確認せよ。

<!-- solution-start -->
**解答**：$x+y=0$, $y+z=0$ より $\ker T=\operatorname{span}((-1,1,-1)^T)$。行列のrankは2なので像は $\mathbb R^2$。第一同型定理より $\mathbb R^3/\ker T\cong\mathbb R^2$。次元も $3-1=2$ で一致する。
<!-- solution-end -->

<a id="ex-la2-b02"></a>
#### LA2-B02 商空間の基底
- Level: B

$W=\operatorname{span}(e_1,e_2)\subset\mathbb R^4$ とする。$\mathbb R^4/W$ の基底を1つ与えよ。

<!-- solution-start -->
**解答**：$e_3+W,e_4+W$ が基底。任意の剰余類は第1・第2成分を $W$ に吸収でき、残りはこの2本で表せる。
<!-- solution-end -->

<a id="ex-la2-b03"></a>
#### LA2-B03 補空間依存・商空間非依存
- Level: B

$U=\operatorname{span}(e_1)\subset\mathbb R^2$ に対し、異なる2つの補空間 $W_1,W_2$ を挙げ、それぞれが $\mathbb R^2/U$ と同型になることを説明せよ。

<!-- solution-start -->
**解答**：$W_1=\operatorname{span}(e_2)$、$W_2=\operatorname{span}(e_1+e_2)$ など。どちらも $U$ と交わりが0で和が全空間。標準射影を各 $W_i$ に制限すると $W_i\to\mathbb R^2/U$ は線形同型になる。
<!-- solution-end -->

### Level C

<a id="ex-la2-c01"></a>
#### LA2-C01 商を経由する写像
- Level: C

線形写像 $S:V\to Y$ が $W\subset\ker S$ を満たすとする。ある一意な線形写像 $\overline S:V/W\to Y$ が存在して
$$
S=\overline S\circ\pi
$$
となることを示せ。

<!-- solution-start -->
**解答**：$\overline S(x+W)=S(x)$ と定める。$x+W=y+W$ なら $x-y\in W\subset\ker S$ なので $S(x)=S(y)$、よってwell-defined。線形性は明らかで $\overline S(\pi(x))=S(x)$。$\pi$ は全射なので、この条件を満たす $\overline S$ は各剰余類上の値が強制され一意。
<!-- solution-end -->

---

## 8. 次に進む

次はベクトルそのものではなく、ベクトルをスカラーへ送る線形写像を集めた **代数的双対空間** を導入します。そこから双対基底・annihilator・双対写像、さらに抽象的な行列式へ進みます。
