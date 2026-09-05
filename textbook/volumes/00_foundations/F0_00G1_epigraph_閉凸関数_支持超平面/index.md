# F0-00G1 epigraph・閉凸関数・支持超平面

<!-- definition-example-audit: strict -->

F0-00G では凸集合・凸関数を「線分を保つ」という定義から学びました。この講義では一段抽象化して、**関数をその上側の集合 epigraph として見る**ことで、位相・分離定理・劣勾配が一本につながることを確認します。

```text
凸関数
  ↓ epigraph
凸集合
  ↓ 閉性
下半連続・閉凸関数
  ↓ 境界で支持
支持超平面
  ↓
劣勾配
```

この見方を入れておくと、後の Fenchel 共役・双対が「突然出てくる公式」ではなく、支持超平面の言葉として読めるようになります。

---

## 1. 拡張実数値関数と effective domain

凸解析では制約を関数へ埋め込むため、値として $+\infty$ を許します。

<a id="def-f0-00g1-effective-domain"></a>

<!-- formal-statement-start -->
> **定義（effective domain）**  
> 関数 $f:\mathbb R^n\to(-\infty,+\infty]$ に対し、有限値を取る点全体を $f$ の **effective domain（有効定義域）** といいます。

$$
\operatorname{dom}f
=
\{x:f(x)<+\infty\}.
$$
<!-- formal-statement-end -->

<a id="def-f0-00g1-proper"></a>

<!-- formal-statement-start -->
> **定義（proper）**  
> 拡張実数値関数 $f$ が **proper** であるとは、有効定義域が空でなく、かつ $-\infty$ を値に取らないことをいいます。

$$
\operatorname{dom}f\neq\varnothing.
$$
<!-- formal-statement-end -->

例えば集合 $C$ の indicator 関数

$$
\delta_C(x)
=
\begin{cases}
0,&x\in C,\\
+\infty,&x\notin C
\end{cases}
$$

では

$$
\operatorname{dom}\delta_C=C.
$$

したがって「$x\in C$ の下で最小化する」は

$$
\min_{x\in C}f(x)
=
\min_{x\in\mathbb R^n}
\{f(x)+\delta_C(x)\}
$$

と、一つの拡張実数値関数の最小化へ書き換えられます。

---

## 2. epigraph

<a id="def-f0-00g1-epigraph"></a>

<!-- formal-statement-start -->
> **定義（epigraph）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ に対し、グラフ以上の点をすべて集めた集合を $f$ の **epigraph** といいます。

$$
\operatorname{epi}f
=
\{(x,t)\in\mathbb R^n\times\mathbb R:f(x)\le t\}.
$$
<!-- formal-statement-end -->

グラフそのものではなく、グラフの**上側全部**を取るのがポイントです。

### 2.1 例：$f(x)=x^2$

$$
\operatorname{epi}f
=
\{(x,t):x^2\le t\},
$$

つまり放物線より上の領域です。

---

## 3. 凸関数と epigraph の凸性は同値

<a id="thm-f0-00g1-epi-convex"></a>

<!-- formal-statement-start -->
> **定理（epigraph による凸性判定）**  
> proper な拡張実数値関数 $f:\mathbb R^n\to(-\infty,+\infty]$ について、$f$ の凸性と epigraph の凸性は同値です。

$$
\boxed{
f\text{ が凸}
\iff
\operatorname{epi}f\text{ が凸集合}
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f$ が凸とします。$(x,s),(y,t)\in\operatorname{epi}f$ なら

$$
f(x)\le s,
\qquad
f(y)\le t.
$$

$0\le\lambda\le1$ に対して

$$
\begin{aligned}
f((1-\lambda)x+\lambda y)
&\le(1-\lambda)f(x)+\lambda f(y)\\
&\le(1-\lambda)s+\lambda t.
\end{aligned}
$$

よって

$$
((1-\lambda)x+\lambda y,(1-\lambda)s+\lambda t)
\in\operatorname{epi}f,
$$

なので epigraph は凸です。

逆に $\operatorname{epi}f$ が凸とします。$x,y\in\operatorname{dom}f$ なら

$$
(x,f(x)),(y,f(y))\in\operatorname{epi}f.
$$

凸性から

$$
((1-\lambda)x+\lambda y,(1-\lambda)f(x)+\lambda f(y))
\in\operatorname{epi}f,
$$

したがって

$$
f((1-\lambda)x+\lambda y)
\le
(1-\lambda)f(x)+\lambda f(y).
$$

よって $f$ は凸です。$\square$
<!-- proof-end -->

ここで「関数の凸性」という不等式が、$n+1$ 次元の集合の凸性へ変換されました。これ以降、分離定理を関数へ適用できます。

---

## 4. 下半連続と閉 epigraph

極限で突然値が下へ落ちる関数は、最小化では扱いにくくなります。それを排除する条件が下半連続性です。

<a id="def-f0-00g1-lsc"></a>

<!-- formal-statement-start -->
> **定義（下半連続）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ が点 $x$ で **下半連続** であるとは、任意の点列 $x_k\to x$ に対して次が成り立つことです。

$$
f(x)
\le
\liminf_{k\to\infty}f(x_k).
$$
<!-- formal-statement-end -->

<a id="thm-f0-00g1-lsc-closed-epi"></a>

<!-- formal-statement-start -->
> **定理（下半連続性と閉 epigraph）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ について、下半連続性と epigraph の閉性は同値です。

$$
\boxed{
f\text{ が下半連続}
\iff
\operatorname{epi}f\text{ が閉集合}
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $f$ が下半連続とします。$(x_k,t_k)\in\operatorname{epi}f$ かつ

$$
(x_k,t_k)\to(x,t)
$$

とします。$f(x_k)\le t_k$ なので

$$
f(x)
\le
\liminf f(x_k)
\le
\lim t_k
=t.
$$

従って $(x,t)\in\operatorname{epi}f$ で、epigraph は閉です。

逆に epigraph が閉とします。$x_k\to x$ とし

$$
\alpha=\liminf f(x_k)
$$

と置きます。

$\alpha\in\mathbb R$ の場合は部分列を取り直して $f(x_{k_j})\to\alpha$ とできます。このとき

$$
(x_{k_j},f(x_{k_j}))
\in
\operatorname{epi}f
$$

で、その極限は $(x,\alpha)$ です。閉性から $(x,\alpha)\in\operatorname{epi}f$、すなわち

$$
f(x)\le\alpha.
$$

$\alpha=+\infty$ の場合は自明です。

最後に $\alpha=-\infty$ は起こり得ません。もしそうなら任意の $M\in\mathbb R$ に対して部分列を取り

$$
f(x_{k_j})\le M
$$

とできます。従って $(x_{k_j},M)\in\operatorname{epi}f$ であり、閉性から $(x,M)\in\operatorname{epi}f$。つまり $f(x)\le M$ が全ての実数 $M$ で成り立つことになり、値域 $(-\infty,+\infty]$ に矛盾します。

従って常に

$$
f(x)
\le
\liminf f(x_k),
$$

すなわち $f$ は下半連続です。$\square$
<!-- proof-end -->

<a id="def-f0-00g1-closed-convex"></a>

<!-- formal-statement-start -->
> **定義（閉凸関数）**  
> proper・凸・下半連続な拡張実数値関数を、本教材では **proper closed convex function** と呼びます。
<!-- formal-statement-end -->

有限次元では

$$
\boxed{
\text{proper closed convex}
\iff
\operatorname{epi}f\text{ が非空閉凸集合}
}
$$

と読めます。

---

## 5. sublevel set

<a id="def-f0-00g1-sublevel"></a>

<!-- formal-statement-start -->
> **定義（sublevel set）**  
> $\alpha\in\mathbb R$ に対して、関数値が $\alpha$ 以下になる点全体を $\alpha$-sublevel set といいます。

$$
L_\alpha(f)
=
\{x:f(x)\le\alpha\}.
$$
<!-- formal-statement-end -->

### 5.1 凸関数の sublevel set は凸

$x,y\in L_\alpha(f)$ なら

$$
f(x),f(y)\le\alpha.
$$

したがって

$$
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y)
\le
\alpha.
$$

よって $L_\alpha(f)$ は凸です。さらに $f$ が下半連続なら $L_\alpha(f)$ は閉です。

> **注意**  
> 逆に「全ての sublevel set が凸」から得られるのは quasiconvexity であり、通常の凸性より弱い条件です。

---

## 6. 支持超平面

<a id="def-f0-00g1-supporting-hyperplane"></a>

<!-- formal-statement-start -->
> **定義（支持超平面）**  
> 凸集合 $C\subset\mathbb R^n$ と境界点 $x_0\in\partial C$ に対し、$a\neq0$ と $b\in\mathbb R$ が $C$ を一方の半空間に入れ、$x_0$ で等号を満たすとき、$\{x:a^{\mathsf T}x=b\}$ を $C$ の $x_0$ における **支持超平面** といいます。

$$
a^{\mathsf T}x\le b
\qquad(\forall x\in C),
$$

$$
a^{\mathsf T}x_0=b.
$$
<!-- formal-statement-end -->

<a id="thm-f0-00g1-supporting-hyperplane"></a>

<!-- formal-statement-start -->
> **定理（有限次元の支持超平面定理）**  
> $C\subset\mathbb R^n$ を非空閉凸集合、$x_0\in\partial C$ とします。このとき $C$ は $x_0$ で支持超平面を持ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$x_0$ は境界点なので、$C$ の外側から $x_0$ へ収束する点列 $z_k\notin C$ を取れます。閉凸集合への射影を

$$
p_k=P_C(z_k)
$$

とし、

$$
a_k
=
\frac{z_k-p_k}{\|z_k-p_k\|}
$$

と置きます。[C1A の射影の特徴付け](../F0_02C1A_Hilbert射影定理_直交分解/index.md)から、任意の $x\in C$ に対して

$$
a_k^{\mathsf T}(x-p_k)\le0.
$$

また $x_0\in C$ なので

$$
\|z_k-p_k\|
\le
\|z_k-x_0\|
\to0,
$$

従って $p_k\to x_0$ です。単位球面のコンパクト性から部分列を取り $a_k\to a$ とでき、$\|a\|=1$ です。上の不等式で極限を取ると

$$
a^{\mathsf T}(x-x_0)\le0
\qquad(\forall x\in C).
$$

よって

$$
\{x:a^{\mathsf T}x=a^{\mathsf T}x_0\}
$$

は $x_0$ における支持超平面です。$\square$
<!-- proof-end -->

---

## 7. epigraph の支持超平面が劣勾配になる

$f$ の epigraph の境界点 $(x,f(x))$ を支持する超平面を考えます。

劣勾配 $p\in\partial f(x)$ の条件は

$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x)
\qquad(\forall y)
$$

です。これは

$$
p^{\mathsf T}y-t
\le
p^{\mathsf T}x-f(x)
\qquad((y,t)\in\operatorname{epi}f)
$$

と同値です。

つまり **劣勾配とは、epigraph を下側から支える超平面の傾き**です。

<a id="thm-f0-00g1-subgradient-existence"></a>

<!-- formal-statement-start -->
> **定理（relative interior での劣勾配の存在）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ を proper convex function とし、$x$ が有効定義域の relative interior に属するとします。このとき $x$ では劣勾配が少なくとも一つ存在します。

$$
x\in\operatorname{ri}(\operatorname{dom}f)
\quad\Longrightarrow\quad
\boxed{\partial f(x)\neq\varnothing}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\operatorname{aff}(\operatorname{dom}f)$ を座標空間とみなしてよいので、$x$ が $\operatorname{dom}f$ の通常の内部点である場合へ還元します。

$(x,f(x))$ は凸集合 $\operatorname{epi}f$ の境界点です。[支持超平面定理](#thm-f0-00g1-supporting-hyperplane)により、ある $(p,\beta)\neq0$ が存在して

$$
p^{\mathsf T}y+\beta t
\le
p^{\mathsf T}x+\beta f(x)
\qquad((y,t)\in\operatorname{epi}f)
$$

となります。

epigraph は鉛直上方へ無限に伸びるので $\beta\le0$ です。もし $\beta=0$ なら

$$
p^{\mathsf T}(y-x)\le0
\qquad(\forall y\in\operatorname{dom}f)
$$

となります。しかし $x$ は定義域の内部点なので、十分小さい $h$ について $x\pm h\in\operatorname{dom}f$。従って $p^{\mathsf T}h=0$ が全方向で成り立ち、$p=0$ となって $(p,\beta)\neq0$ に矛盾します。ゆえに $\beta<0$ です。

$-\beta$ で割って $\beta=-1$ と正規化すると

$$
f(y)
\ge
f(x)+p^{\mathsf T}(y-x)
\qquad(\forall y),
$$

となるように $p$ を取り直せます。これは $p\in\partial f(x)$ そのものです。$\square$
<!-- proof-end -->

ここで $\operatorname{ri}$ は affine hull の中で取った内部、relative interior です。定義域が低次元 affine subspace 上にある場合にも「内部点」を扱うために使います。

---

## 8. 「閉」が最小値存在へどう効くか

凸性だけでは最小値の**存在**までは保証しません。例えば

$$
f(x)=e^x
$$

は凸ですが

$$
\inf_{x\in\mathbb R}e^x=0
$$

であり、最小値0を達成する点はありません。

存在を保証する典型形は

- 下半連続性：極限で値が下へ抜け落ちない
- coercivity：$\|x\|\to\infty$ で $f(x)\to+\infty$

の組合せです。

<a id="thm-f0-00g1-coercive-minimum"></a>

<!-- formal-statement-start -->
> **定理（有限次元の直接法）**  
> $f:\mathbb R^n\to(-\infty,+\infty]$ を proper・下半連続とし、$\|x\|\to\infty$ なら $f(x)\to+\infty$ とします。このとき $f$ は最小値を達成します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

適当な $x_0\in\operatorname{dom}f$ を一つ取り、

$$
L
=
\{x:f(x)\le f(x_0)\}
$$

と置きます。coercivity により $L$ は有界です。下半連続性から $L$ は閉なので、有限次元では compact です。

最小化列 $(x_k)$ を取り、必要なら最初の有限個を除けば $x_k\in L$ とできます。compact 性から部分列 $x_{k_j}\to x^*\in L$ があり、下半連続性より

$$
f(x^*)
\le
\liminf_{j\to\infty}f(x_{k_j})
=
\inf_x f(x).
$$

逆向きは定義から自明なので等号となり、$x^*$ が最小値を達成します。$\square$
<!-- proof-end -->

ここは後の「変分法の直接法」の有限次元版です。

---

## 9. 定義を具体例で検算する

<!-- definition-example-start: def-f0-00g1-effective-domain, def-f0-00g1-proper, def-f0-00g1-epigraph, def-f0-00g1-lsc, def-f0-00g1-closed-convex, def-f0-00g1-sublevel -->
### 9.1 $f(x)=x^2$ で6つの定義をまとめて確認

**定義の確認**

$f(x)=x^2$ は全ての実数で有限なので

$$
\operatorname{dom}f=\mathbb R\neq\varnothing,
$$

かつ $-\infty$ を取らず proper です。epigraph は

$$
\operatorname{epi}f
=
\{(x,t):t\ge x^2\}.
$$

点列 $x_k\to x$ に対して $x_k^2\to x^2$ なので

$$
f(x)
=
\lim f(x_k)
\le
\liminf f(x_k),
$$

従って下半連続です。さらに $x^2$ は凸なので、proper・凸・下半連続の三条件を満たし proper closed convex function です。

また $\alpha\ge0$ なら sublevel set は

$$
L_\alpha(f)
=
[-\sqrt\alpha,\sqrt\alpha],
$$

$\alpha<0$ なら空集合です。これで effective domain、proper、epigraph、下半連続、closed convex、sublevel set の各定義を具体的に確認できました。
<!-- definition-example-end -->

<!-- definition-example-start: def-f0-00g1-supporting-hyperplane -->
### 9.2 epigraph を原点で支える直線

**定義の確認**

$$
C=\operatorname{epi}(x^2)
=
\{(x,t):t\ge x^2\}
$$

とします。境界点 $(0,0)$ で直線 $t=0$ を考えます。$C$ の全ての点で $t\ge x^2\ge0$ なので、$C$ は直線 $t=0$ の片側にあり、$(0,0)$ で等号になります。従って $t=0$ は定義どおり $(0,0)$ における支持超平面です。
<!-- definition-example-end -->

---

## 10. 演習 Level A

### F0-00G1-A01 epigraph を書く

- Level: A
- 目安時間: 8分

$f(x)=|x|$ の epigraph を不等式で表し、凸集合であることを示せ。

<!-- solution-start -->
#### 詳細解答

$$
\operatorname{epi}f
=
\{(x,t):|x|\le t\}
=
\{(x,t):x\le t\}
\cap
\{(x,t):-x\le t\}.
$$

二つの半空間の共通部分なので凸です。

#### 本番答案
$\operatorname{epi}|\cdot|=\{(x,t):x\le t,-x\le t\}$ は半空間2個の共通部分なので凸。

#### 採点基準（20点）
- epigraph の式: 10点
- 半空間表示: 6点
- 凸性結論: 4点
<!-- solution-end -->

### F0-00G1-A02 indicator 関数

- Level: A
- 目安時間: 8分

$C$ が凸集合なら $\delta_C$ が凸関数であることを示せ。

<!-- solution-start -->
#### 詳細解答
$x,y\in C$ なら凸結合も $C$ に入り、凸不等式の両辺は0です。少なくとも一方が $C$ の外なら右辺に $+\infty$ が現れるため凸不等式は自動的に成立します。従って $\delta_C$ は凸です。

#### 本番答案
$C$ 内の2点では凸性で0、外点を含む場合は右辺が $+\infty$ なので自明。

#### 採点基準（20点）
- 場合分け: 8点
- $C$ の凸性利用: 8点
- 結論: 4点
<!-- solution-end -->

---

## 11. 演習 Level B

### F0-00G1-B01 lsc と閉 epigraph

- Level: B
- 目安時間: 15分

$$
f(x)
=
\begin{cases}
0,&x>0,\\
1,&x=0,\\
+\infty,&x<0
\end{cases}
$$

は $x=0$ で下半連続か。epigraph の閉性と対応させて説明せよ。

<!-- solution-start -->
#### 詳細解答
$x_k\downarrow0$ とすると $f(x_k)=0$ なので

$$
\liminf f(x_k)=0<1=f(0).
$$

従って下半連続でない。実際 $(x_k,0)\in\operatorname{epi}f$ だが $(0,0)\notin\operatorname{epi}f$ なので epigraph は閉でない。

#### 本番答案
$x_k>0,x_k\to0$ で $\liminf f(x_k)=0<f(0)=1$。対応して $(x_k,0)\to(0,0)$ だが極限点が epigraph に入らない。

#### 採点基準（20点）
- 点列構成: 6点
- lsc 判定: 6点
- epigraph の極限: 6点
- 対応説明: 2点
<!-- solution-end -->

### F0-00G1-B02 coercivity と最小値存在

- Level: B
- 目安時間: 15分

proper lsc 関数 $f:\mathbb R^n\to(-\infty,+\infty]$ が coercive なら最小値を達成することを、sublevel set の compact 性から示せ。

<!-- solution-start -->
#### 詳細解答
$x_0\in\operatorname{dom}f$ を取り

$$
L=\{x:f(x)\le f(x_0)\}
$$

とする。coercivity から $L$ は有界、lsc から閉。有限次元なので compact。最小化列の収束部分列と lsc から下限を達成する。

#### 本番答案
有限 sublevel set は coercivity で有界、lsc で閉、従って compact。最小化列の収束部分列と lsc から最小値を達成する。

#### 採点基準（20点）
- sublevel set: 5点
- 有界性: 5点
- 閉性と compact 性: 5点
- 極限での達成: 5点
<!-- solution-end -->

---

## 12. 次に進む

次の [F0-02C4 凸解析・劣勾配・normal cone](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md) では、ここで見た「epigraph を支える超平面の傾き」を $\partial f(x)$ として計算し、非微分可能な最適性条件へ進みます。
