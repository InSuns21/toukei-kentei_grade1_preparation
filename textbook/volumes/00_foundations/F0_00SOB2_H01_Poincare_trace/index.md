# F0-00SOB2 Encore III：$H_0^1$・Poincaré不等式・trace・境界条件

Sobolev空間では関数を a.e. 一致で同一視します。したがってPDEの境界条件

$$
u=0\quad\text{on }\partial\Omega
$$

を、古典解のように境界点ごとの値だけで定義するのは危険です。

この章では

```text
境界近くで0の滑らかな関数
 ↓ H1閉包
H0^1
 ↓
Poincaré不等式
 ↓
勾配だけでH0^1ノルムを制御
 ↓
Poisson弱形式のcoercivity
 ↓
Lax--Milgram
```

という依存鎖を証明します。

重要なのは、ここで必要な Poincaré 不等式は **trace定理を先に仮定しなくても証明できる**ことです。

---

## 1. $H_0^1(\Omega)$

<a id="def-f0-00sob2-h01"></a>

<!-- formal-statement-start -->
> **定義（$H_0^1(\Omega)$）**  
> $\Omega\subset\mathbb R^d$ を開集合とします。$C_c^\infty(\Omega)$ の $H^1(\Omega)$ ノルムによる閉包を

$$
H_0^1(\Omega)
:=\overline{C_c^\infty(\Omega)}^{\|\cdot\|_{H^1(\Omega)}}
$$

> と定義します。
<!-- formal-statement-end -->

つまり $u\in H_0^1(\Omega)$ とは、ある $u_n\in C_c^\infty(\Omega)$ が存在して

$$
\|u_n-u\|_{H^1(\Omega)}\to0
$$

となることです。

### 1.1 例：コンパクト台の滑らかな関数

$\Omega=(0,1)$ とし

$$
u(x)=
\begin{cases}
\exp\!\left(-\dfrac1{1-16(x-1/2)^2}\right),&|x-1/2|<1/4,\\
0,&|x-1/2|\ge1/4
\end{cases}
$$

とします。

<!-- definition-example-start: def-f0-00sob2-h01 -->
**定義の確認**  
この $u$ は $(1/4,3/4)$ に台を持つ $C^\infty$ 関数なので

$$
u\in C_c^\infty(0,1).
$$

近似列を $u_n=u$ と一定に取れば

$$
\|u_n-u\|_{H^1}=0
$$

です。従って定義から確かに $u\in H_0^1(0,1)$ です。
<!-- definition-example-end -->

$H_0^1$ は「境界値0」を点ごとの値ではなく、**境界近くで0の滑らかな関数からの $H^1$ 近似可能性**として組み込みます。

---

## 2. traceは何をするのか

一般の $u\in H^1(\Omega)$ は a.e. 同値類なので、境界上の一点の値を変更しても同じSobolev関数を表すことがあります。そのため

$$
u\mapsto u|_{\partial\Omega}
$$

をそのまま点wiseに定義することはできません。

十分良い領域、たとえば有界Lipschitz領域では、滑らかな関数の境界制限を連続作用素

$$
\operatorname{Tr}:H^1(\Omega)\to L^2(\partial\Omega)
$$

などへ延長できます。これがtrace作用素です。

この条件の下では

$$
H_0^1(\Omega)
=
\{u\in H^1(\Omega):\operatorname{Tr}u=0\}
$$

と同定できます。

ただし **一般trace定理の証明はこの系列ではP3の黒箱**とします。以下のPoincaré不等式は、このtrace同定を使わず $H_0^1$ の閉包定義だけから証明します。

---

## 3. 有界領域版Poincaré不等式

<a id="thm-f0-00sob2-poincare"></a>

<!-- formal-statement-start -->
> **定理（$H_0^1$ のPoincaré不等式）**  
> $\Omega\subset\mathbb R^d$ を有界開集合とします。このとき定数 $C_P>0$ が存在し、任意の $u\in H_0^1(\Omega)$ に対して

$$
\boxed{
\|u\|_{L^2(\Omega)}
\le C_P\|\nabla u\|_{L^2(\Omega)}
}
$$

> が成り立ちます。特に $\Omega\subset(a,b)\times\mathbb R^{d-1}$ なら $C_P=b-a$ と取れます。
<!-- formal-statement-end -->

領域の滑らかさは仮定していません。**有界性と $H_0^1$ の閉包定義だけ**で十分です。

<!-- proof-start -->
### 証明：一方向へ積分してから全断面を足す

まず $u\in C_c^\infty(\Omega)$ とします。$\Omega$ は有界なので、ある $a<b$ を取って

$$
\Omega\subset(a,b)\times\mathbb R^{d-1}
$$

とできます。$u$ を $\Omega$ の外で0と延長します。$u$ は $\Omega$ の内部にコンパクト台を持つので、この零延長は依然として滑らかです。

$x=(x_1,x')$、$x'\in\mathbb R^{d-1}$ と書きます。固定した $x'$ に対して

$$
u(x_1,x')
=\int_a^{x_1}\partial_1u(s,x')\,ds.
$$

Cauchy--Schwarzから

$$
|u(x_1,x')|^2
\le(x_1-a)
\int_a^{x_1}|\partial_1u(s,x')|^2ds
\le(b-a)
\int_a^b|\partial_1u(s,x')|^2ds.
$$

これを $x_1\in(a,b)$ で積分すると

$$
\int_a^b|u(x_1,x')|^2dx_1
\le(b-a)^2
\int_a^b|\partial_1u(s,x')|^2ds.
$$

さらに $x'\in\mathbb R^{d-1}$ で積分して

$$
\|u\|_{L^2(\Omega)}^2
\le(b-a)^2\|\partial_1u\|_{L^2(\Omega)}^2
\le(b-a)^2\|\nabla u\|_{L^2(\Omega)}^2.
$$

従って

$$
\|u\|_2\le(b-a)\|\nabla u\|_2
$$

が $C_c^\infty(\Omega)$ 上で成り立ちます。

次に $u\in H_0^1(\Omega)$ とします。定義から $u_n\in C_c^\infty(\Omega)$ を

$$
u_n\to u\quad\text{in }H^1(\Omega)
$$

となるよう取れます。各 $n$ について

$$
\|u_n\|_2\le(b-a)\|\nabla u_n\|_2.
$$

$H^1$ 収束から $u_n\to u$ in $L^2$ かつ $\nabla u_n\to\nabla u$ in $L^2$ なので、極限を取れば

$$
\boxed{\|u\|_2\le(b-a)\|\nabla u\|_2}.
$$

これで一般の $H_0^1$ まで証明できました。
<!-- proof-end -->

### 3.1 一次元版はこの証明の断面そのもの

$\Omega=(0,L)$ なら $a=0,b=L$ として

$$
\boxed{\|u\|_{L^2(0,L)}\le L\|u'\|_{L^2(0,L)}}.
$$

一次元の議論を各 $x'$ 断面について実行して積分したものが、上の多次元証明です。

---

## 4. なぜ境界条件が必要なのか

Poincaré不等式を全 $H^1(\Omega)$ に対して期待することはできません。定数関数 $u\equiv1$ なら

$$
\|u\|_2>0,
\qquad
\|\nabla u\|_2=0
$$

だからです。

$H_0^1$ は定数方向を排除し、勾配だけで関数全体を制御できるようにしています。

境界値0の代わりに平均0

$$
\int_\Omega u=0
$$

を課す別版のPoincaré不等式もありますが、Poissonの零Dirichlet問題では $H_0^1$ 版が直接使えます。

---

## 5. 勾配ノルムが $H_0^1$ の同値ノルムになる

通常

$$
\|u\|_{H^1}^2
=\|u\|_2^2+\|\nabla u\|_2^2.
$$

[Poincaré不等式](#thm-f0-00sob2-poincare)から

$$
\|u\|_{H^1}^2
\le(C_P^2+1)\|\nabla u\|_2^2.
$$

逆向き

$$
\|\nabla u\|_2\le\|u\|_{H^1}
$$

は自明です。従って

$$
\boxed{
\|u\|_{H_0^1}:=\|\nabla u\|_2
}
$$

は $H_0^1(\Omega)$ 上で $H^1$ ノルムと同値です。

特に $H_0^1$ はこの勾配ノルムでも完備です。

---

## 6. Poisson弱形式のcoercivity

Poisson方程式の零Dirichlet問題では

$$
a(u,v)
:=\int_\Omega\nabla u\cdot\nabla v\,dx,
\qquad
u,v\in H_0^1(\Omega)
$$

を考えます。

まず Cauchy--Schwarz から

$$
|a(u,v)|
\le\|\nabla u\|_2\|\nabla v\|_2
\le\|u\|_{H^1}\|v\|_{H^1},
$$

したがって $a$ は連続です。

さらに

$$
a(u,u)=\|\nabla u\|_2^2.
$$

Poincaré不等式から

$$
\|u\|_{H^1}^2
\le(1+C_P^2)\|\nabla u\|_2^2,
$$

よって

$$
\boxed{
a(u,u)
\ge\frac1{1+C_P^2}\|u\|_{H^1}^2.
}
$$

これが [Lax--Milgram定理](../F0_00WK2_Lax_Milgram_存在一意性/index.md#thm-f0-00wk2-lax-milgram) の coercivity 条件です。

つまり

```text
零Dirichlet境界条件
 ↓ H0^1
Poincaré
 ↓
勾配エネルギーがH1ノルム全体を制御
 ↓
coercivity
 ↓
Lax--Milgramで存在一意性
```

と一本につながります。

---

## 7. trace定理・Sobolev embedding・Rellichの位置付け

この章で完全証明したのは、後続の線形楕円型PDEに直接必要な $H_0^1$ 版Poincaré不等式です。

一方、次の一般定理はこの段階では黒箱にします。

- **trace定理**：$H^1$ の内部情報から境界値を連続に取り出す。
- **Sobolev embedding**：弱微分の積分制御から $L^q$ や連続性などを導く。
- **Rellich--Kondrachov**：Sobolev有界列から強収束部分列を取り出す。

Lax--Milgram自体には一般trace theoremもRellich compactnessも不要です。

---

# 演習

## F0-00SOB2-A01 区間でPoincaréを示す

- Level: A
- 目安時間: 10分

$u\in C_c^\infty(0,L)$ に対して

$$
\|u\|_{L^2(0,L)}\le L\|u'\|_{L^2(0,L)}
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$$
u(x)=\int_0^xu'(s)ds
$$

なので Cauchy--Schwarz から

$$
|u(x)|^2
\le x\int_0^x|u'(s)|^2ds
\le L\|u'\|_2^2.
$$

$x\in(0,L)$ で積分すれば

$$
\|u\|_2^2\le L^2\|u'\|_2^2.
$$

### 本番答案

基本定理とCauchy--Schwarzで $|u(x)|^2\le L\|u'\|_2^2$。$x$ で積分して平方根を取る。

### 採点基準（20点）

- 積分表示: 6点
- Cauchy--Schwarz: 7点
- 積分と結論: 7点
<!-- solution-end -->

## F0-00SOB2-A02 なぜ定数関数が邪魔か

- Level: A
- 目安時間: 6分

全 $H^1(\Omega)$ に対して $\|u\|_2\le C\|\nabla u\|_2$ が成り立たないことを反例で示せ。

<!-- solution-start -->
### 詳細解答

$u\equiv1$ とすれば $\nabla u=0$ ですが、有界領域で $\lambda(\Omega)>0$ なら

$$
\|u\|_2=\sqrt{\lambda(\Omega)}>0.
$$

従ってどんな有限 $C$ に対しても不等式は成立しません。

### 本番答案

定数関数 $u=1$ では左辺は正、右辺は0。

### 採点基準（20点）

- 反例選択: 8点
- 両辺評価: 8点
- 結論: 4点
<!-- solution-end -->

## F0-00SOB2-B01 多次元Poincaréを断面積分で証明する

- Level: B
- 目安時間: 18分

$\Omega\subset(a,b)\times\mathbb R^{d-1}$、$u\in C_c^\infty(\Omega)$ とする。$x'\in\mathbb R^{d-1}$ を固定して一次元評価を行い

$$
\|u\|_2\le(b-a)\|\partial_1u\|_2
$$

を示せ。

<!-- solution-start -->
### 詳細解答

零延長した $u$ に対して

$$
u(x_1,x')=\int_a^{x_1}\partial_1u(s,x')ds.
$$

Cauchy--Schwarzから

$$
|u(x_1,x')|^2
\le(b-a)\int_a^b|\partial_1u(s,x')|^2ds.
$$

$x_1$ で積分すると係数がもう一つ $b-a$ 出るので

$$
\int_a^b|u|^2dx_1
\le(b-a)^2\int_a^b|\partial_1u|^2dx_1.
$$

最後に $x'$ で積分して平方根を取ります。

### 本番答案

各断面で基本定理+Cauchy--Schwarz、その後Fubiniで $x'$ まで積分する。

### 採点基準（20点）

- 断面積分表示: 6点
- Cauchy--Schwarz: 6点
- 二段階積分: 5点
- 結論: 3点
<!-- solution-end -->

## F0-00SOB2-B02 Poisson形式のcoercivity定数

- Level: B
- 目安時間: 12分

Poincaré定数を $C_P$ とし

$$
a(u,v)=\int_\Omega\nabla u\cdot\nabla v
$$

とする。$H^1$ ノルムを用いた coercivity 定数として

$$
\alpha=\frac1{1+C_P^2}
$$

が使えることを示せ。

<!-- solution-start -->
### 詳細解答

Poincaréから

$$
\|u\|_{H^1}^2
=\|u\|_2^2+\|\nabla u\|_2^2
\le(C_P^2+1)\|\nabla u\|_2^2.
$$

従って

$$
a(u,u)=\|\nabla u\|_2^2
\ge\frac1{1+C_P^2}\|u\|_{H^1}^2.
$$

### 本番答案

Poincaréを $H^1$ ノルムへ代入し、$a(u,u)=\|\nabla u\|_2^2$ を使う。

### 採点基準（20点）

- Poincaré代入: 8点
- $a(u,u)$ の評価: 6点
- 定数整理: 6点
<!-- solution-end -->

---

## 章末チェック

- $H_0^1$ を $C_c^\infty$ の $H^1$ 閉包として定義できる。
- $H_0^1$ の具体例で定義条件を確認できる。
- traceが必要になる理由と、Poincaré証明にはtrace定理が不要な理由を区別できる。
- 任意の有界開集合について $H_0^1$ 版Poincaré不等式を断面積分で証明できる。
- 勾配ノルムと $H^1$ ノルムの同値性を示せる。
- Poisson弱形式のcoercivityをPoincaréから導ける。
