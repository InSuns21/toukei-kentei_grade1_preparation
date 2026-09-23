# FEM4 楕円型 FEM の誤差解析

<!-- definition-example-audit: strict -->

FEM1 では [Céa の補題](../FEM1/index.md#thm-fem1-cea)によって

$$
\text{Galerkin 誤差}
\le
\text{定数}
\times
\text{有限要素空間での最良近似誤差}
$$

という骨格を得ました。

FEM3 では [形状正則メッシュ上の大域一次補間誤差評価](../FEM3/index.md#thm-fem3-global-error)によって、滑らかな関数に対して

$$
|u-I_hu|_{H^1(\Omega)}
\le
C h|u|_{H^2(\Omega)}
$$

および

$$
\|u-I_hu\|_{L^2(\Omega)}
\le
C h^2|u|_{H^2(\Omega)}
$$

を得ました。

本章は、この二つを有限要素解そのものの誤差へ接続します。

中心となる問いは二つです。

> **一次有限要素解の勾配誤差は、なぜメッシュ幅に比例して減るのか。**

そして

> **関数値そのものの $L^2$ 誤差は、なぜさらに一段速く減ることがあるのか。**

前半は

$$
\boxed{
\text{Céa}
+
\text{補間誤差}
}
$$

で閉じます。

後半では、誤差自身を右辺に持つ補助的な楕円型問題を導入し、

$$
\boxed{
\|e\|_{L^2}^2
\longrightarrow
a(e,z)
\longrightarrow
a(e,z-I_hz)
}
$$

と変形します。

最後の変形で [Galerkin 直交性](../FEM1/index.md#thm-fem1-galerkin-orthogonality)が働き、補間誤差から追加の $h$ を一つ取り出せます。

ただし、その一段改善には **境界まで含む大域的な $H^2$ 正則性**が必要です。[GPDE9 の Poisson 方程式の interior $H^2$ regularity](../GPDE9/index.md#thm-gpde9-poisson-interior-h2)だけでは境界角の特異性を排除できません。

この「どの仮定が、誤差評価のどの段で効くか」を追うのが本章の主目的です。

> **この章の停止線**
>
> 本章では適合一次三角形有限要素法の標準的な事前誤差評価を扱います。鞍点問題・混合有限要素法・inf-sup 条件は FEM5、時間依存問題は FEM6、移流卓越時の安定化は FEM7 へ送ります。

---

## 0. 設定：何を固定して誤差を見るか

$\Omega\subset\mathbb R^2$ を有界多角形領域とし、

$$
V=H_0^1(\Omega)
$$

とします。

$V$ では

$$
|v|_{H^1(\Omega)}
=
\|\nabla v\|_{L^2(\Omega)}
$$

をノルムとして使います。零境界条件の下では Poincaré の不等式により、これは通常の $H^1$ ノルムと同値です。

双線形形式

$$
a:V\times V\to\mathbb R
$$

が、ある定数

$$
M>0,
\qquad
\alpha>0
$$

に対して

$$
|a(w,v)|
\le
M
|w|_{H^1}
|v|_{H^1}
\qquad
(\forall w,v\in V),
$$

$$
a(v,v)
\ge
\alpha
|v|_{H^1}^2
\qquad
(\forall v\in V)
$$

を満たすとします。

連続問題は

$$
a(u,v)=F(v)
\qquad
(\forall v\in V)
$$

です。

FEM2 の適合一次三角形有限要素空間を

$$
V_h\subset V
$$

とし、離散解 $u_h\in V_h$ を

$$
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h)
$$

で定めます。

メッシュ族は FEM3 の意味で形状正則とし、

$$
h
=
\max_{K\in\mathcal T_h}h_K
$$

とします。

この設定だけなら [Céa の補題](../FEM1/index.md#thm-fem1-cea)から

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
|u-v_h|_{H^1}
$$

です。

ここでまだ右辺は抽象的です。

FEM3 で構成した節点補間 $I_hu$ を比較対象に選ぶと、初めて $h$ が現れます。

---

## 1. $H^1$ 誤差：Céa と補間評価を接続する

<a id="thm-fem4-h1-error"></a>

<!-- formal-statement-start -->
### 定理（一次有限要素解の H1 誤差評価）

$\Omega\subset\mathbb R^2$ を有界多角形領域、$V=H_0^1(\Omega)$ とする。

双線形形式 $a$ が

$$
|a(w,v)|
\le
M|w|_{H^1(\Omega)}|v|_{H^1(\Omega)}
$$

および

$$
a(v,v)
\ge
\alpha|v|_{H^1(\Omega)}^2
$$

を満たすとする。

$\{\mathcal T_h\}$ を形状正則な適合三角形分割族、$V_h\subset V$ をその連続一次有限要素空間とする。

連続解 $u$ が

$$
u\in H^2(\Omega)\cap H_0^1(\Omega)
$$

を満たし、$u_h\in V_h$ を適合 Galerkin 解とする。

このとき、メッシュ族の形状正則性と領域にのみ依存する定数 $C$ が存在して

$$
\boxed{
|u-u_h|_{H^1(\Omega)}
\le
C
\frac{M}{\alpha}
h
|u|_{H^2(\Omega)}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

使うものは二つだけです。

1. [Céa の補題](../FEM1/index.md#thm-fem1-cea)で有限要素解の誤差を任意の $v_h\in V_h$ との近似誤差へ落とす。
2. $v_h=I_hu$ とし、[FEM3 の大域補間誤差評価](../FEM3/index.md#thm-fem3-global-error)を使う。

重要なのは、各仮定の役割が分かれていることです。

- $V_h\subset V$：Galerkin 直交性と Céa を使うため。
- 有界性・強圧性：Céa の定数 $M/\alpha$ を作るため。
- $u\in H^2$：一次補間の $H^1$ 誤差を $h|u|_{H^2}$ で評価するため。
- 形状正則性：補間定数を全要素で一様にするため。

<!-- proof-start -->
### 証明

[Céa の補題](../FEM1/index.md#thm-fem1-cea)から

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
|u-v_h|_{H^1}.
$$

$u\in H^2(\Omega)\cap H_0^1(\Omega)$ なので、FEM3 の大域節点補間 $I_hu$ を取れます。

境界上では $u=0$ なので境界節点でも

$$
(I_hu)(z)=u(z)=0.
$$

したがって

$$
I_hu\in V_h.
$$

よって最良近似の下から特定の候補 $I_hu$ を選んで

$$
\inf_{v_h\in V_h}
|u-v_h|_{H^1}
\le
|u-I_hu|_{H^1}.
$$

[FEM3 の大域一次補間誤差評価](../FEM3/index.md#thm-fem3-global-error)から

$$
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}.
$$

以上を連結すると

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
Ch|u|_{H^2}.
$$

従って

$$
\boxed{
|u-u_h|_{H^1}
\le
C
\frac{M}{\alpha}
h|u|_{H^2}
}.
$$
<!-- proof-end -->

### 何が起きているか

この定理は新しい近似関数を作っていません。

有限要素解 $u_h$ は Galerkin 方程式によって決まり、節点補間 $I_hu$ とは一般に別物です。

しかし Céa が

$$
u_h
\text{ は }V_h\text{ の最良近似と同程度によい}
$$

と保証するため、

$$
I_hu
\text{ という一つの良い近似が存在する}
$$

ことだけで、$u_h$ 自身の誤差を評価できます。

これは有限要素誤差解析の基本分業です。

$$
\boxed{
\text{安定性・直交性}
\quad\text{は Galerkin 理論}
}
$$

$$
\boxed{
\text{近似次数}
\quad\text{は補間理論}
}
$$

です。

---

## 2. Poisson 問題では定数 $M/\alpha$ が消える

Poisson 問題では

$$
a(w,v)
=
\int_\Omega
\nabla w\cdot\nabla v\,dx.
$$

従って

$$
|a(w,v)|
\le
|w|_{H^1}|v|_{H^1}
$$

で $M=1$ です。

また

$$
a(v,v)
=
|v|_{H^1}^2
$$

なので $\alpha=1$ です。

さらに FEM1 の [対称 Galerkin 法のエネルギーノルム最良近似性](../FEM1/index.md#thm-fem1-best-approximation)から

$$
|u-u_h|_{H^1}
=
\inf_{v_h\in V_h}
|u-v_h|_{H^1}.
$$

したがって $v_h=I_hu$ を選べば

$$
\boxed{
|u-u_h|_{H^1}
\le
Ch|u|_{H^2}
}.
$$

### 具体例：滑らかな零境界関数なら何が言えるか

$\Omega=(0,1)^2$ で

$$
u(x,y)=x(1-x)y(1-y)
$$

とします。

FEM3 で計算したように

$$
|u|_{H^2(\Omega)}^2
=
\frac{17}{45}.
$$

従って Poisson 型の適合一次有限要素解について

$$
|u-u_h|_{H^1(\Omega)}
\le
C
\sqrt{\frac{17}{45}}
\,h.
$$

つまりメッシュ幅を半分にすると、理論上の $H^1$ 誤差上界は半分になります。

ここでは $C$ の具体値ではなく、

$$
\boxed{
h^1
}
$$

という指数が重要です。

---

## 3. なぜ $L^2$ 誤差は Céa だけでは評価しにくいのか

Céa が直接制御するのは、双線形形式の強圧性が働く $H^1$ 型ノルムです。

一方、欲しい量が

$$
\|u-u_h\|_{L^2}
$$

なら、単純に

$$
\|u-u_h\|_{L^2}
\le
C|u-u_h|_{H^1}
$$

と Poincaré の不等式を使うことはできます。

しかしこれでは

$$
\|u-u_h\|_{L^2}
\le
Ch|u|_{H^2}
$$

までしか得られません。

FEM3 の補間関数そのものは

$$
\|u-I_hu\|_{L^2}
\le
Ch^2|u|_{H^2}
$$

と一段速く近似できました。

では有限要素解 $u_h$ でも $h^2$ を回収できるでしょうか。

鍵は、$L^2$ 誤差をそのまま評価せず、**誤差を右辺とする補助変分問題を一度解くこと**です。

---

## 4. $L^2$ 誤差を双線形形式へ持ち上げる

誤差を

$$
e=u-u_h
$$

とします。

<a id="def-fem4-l2-dual-problem"></a>

<!-- formal-statement-start -->
### 定義（L2 誤差に対する楕円型双対問題）

$V=H_0^1(\Omega)$ とし、$a:V\times V\to\mathbb R$ を有界かつ強圧的な双線形形式とする。

与えられた

$$
e\in L^2(\Omega)
$$

に対し、

$$
\boxed{
a(v,z)
=
(e,v)_{L^2(\Omega)}
\qquad
(\forall v\in V)
}
$$

を満たす

$$
z\in V
$$

を求める問題を、$e$ に対する **楕円型双対問題**と呼ぶ。
<!-- formal-statement-end -->

$a$ が対称なら

$$
a(v,z)=a(z,v)
$$

なので、これは元の楕円型問題と同じ作用素に右辺 $e$ を入れた問題です。

$a$ が非対称なら、引数の順序を反転した随伴側の問題になっています。

<!-- definition-example-start: def-fem4-l2-dual-problem -->
**定義の確認**

### 例：一次元 Poisson 問題で双対解を直接作る

$\Omega=(0,1)$ とし、

$$
a(v,z)
=
\int_0^1v'(x)z'(x)\,dx
$$

とします。

右辺を

$$
e(x)=x(1-x)=x-x^2
$$

とします。

双対問題は

$$
\int_0^1v'z'\,dx
=
\int_0^1ev\,dx
\qquad
(\forall v\in H_0^1(0,1))
$$

です。

これは弱い意味で

$$
-z''=e,
\qquad
z(0)=z(1)=0
$$

に対応します。

実際

$$
z''=-x+x^2
$$

を二回積分すると

$$
z'
=
-\frac{x^2}{2}
+
\frac{x^3}{3}
+
C_1,
$$

$$
z
=
-\frac{x^3}{6}
+
\frac{x^4}{12}
+
C_1x
+
C_2.
$$

境界条件から

$$
C_2=0,
$$

$$
-\frac16+\frac1{12}+C_1=0
$$

なので

$$
C_1=\frac1{12}.
$$

従って

$$
\boxed{
z(x)
=
\frac{x}{12}
-
\frac{x^3}{6}
+
\frac{x^4}{12}
}.
$$

部分積分すると、任意の $v\in H_0^1(0,1)$ に対して境界項が消え、

$$
\int_0^1v'z'\,dx
=
-\int_0^1vz''\,dx
=
\int_0^1ev\,dx.
$$

したがって定義の等式を実際に満たしています。
<!-- definition-example-end -->

---

## 5. 双対問題は本当に解けるのか

<a id="lem-fem4-dual-wellposedness"></a>

<!-- formal-statement-start -->
### 補題（楕円型双対問題の存在一意性）

$V=H_0^1(\Omega)$ とし、$a:V\times V\to\mathbb R$ が

$$
|a(w,v)|
\le
M|w|_{H^1}|v|_{H^1},
$$

$$
a(v,v)
\ge
\alpha|v|_{H^1}^2
$$

を満たすとする。

このとき任意の $e\in L^2(\Omega)$ に対し、一意な $z\in V$ が存在して

$$
a(v,z)
=
(e,v)_{L^2}
\qquad
(\forall v\in V)
$$

を満たす。

さらに Poincaré 定数を $C_P$ とすると

$$
\boxed{
|z|_{H^1}
\le
\frac{C_P}{\alpha}
\|e\|_{L^2}
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

引数を入れ替えた双線形形式

$$
a^*(z,v)=a(v,z)
$$

を考えます。

有界性はそのまま、

$$
|a^*(z,v)|
=
|a(v,z)|
\le
M|z|_{H^1}|v|_{H^1}.
$$

強圧性も

$$
a^*(v,v)=a(v,v)
$$

なので同じ $\alpha$ を持ちます。

右辺 $v\mapsto(e,v)_{L^2}$ は Poincaré の不等式で $V^*$ の元になります。

従って [Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)を適用できます。

<!-- proof-start -->
### 証明

$$
a^*(z,v)
:=
a(v,z)
$$

と定めます。

任意の $z,v\in V$ に対して

$$
|a^*(z,v)|
=
|a(v,z)|
\le
M|v|_{H^1}|z|_{H^1}.
$$

従って $a^*$ は有界です。

また任意の $v\in V$ に対して

$$
a^*(v,v)
=
a(v,v)
\ge
\alpha|v|_{H^1}^2.
$$

従って $a^*$ は同じ強圧性定数 $\alpha$ を持ちます。

次に

$$
G(v)
=
(e,v)_{L^2}
$$

と置きます。

Cauchy--Schwarz と Poincaré の不等式から

$$
|G(v)|
\le
\|e\|_{L^2}\|v\|_{L^2}
\le
C_P
\|e\|_{L^2}
|v|_{H^1}.
$$

したがって

$$
G\in V^*,
\qquad
\|G\|_{V^*}
\le
C_P\|e\|_{L^2}.
$$

[Lax--Milgram 定理](../GPDE7/index.md#thm-gpde7-lax-milgram)を $a^*$ と $G$ に適用すると、一意な $z\in V$ が存在して

$$
a^*(z,v)=G(v)
\qquad
(\forall v\in V)
$$

を満たします。

これは

$$
a(v,z)
=
(e,v)_{L^2}
$$

そのものです。

さらに Lax--Milgram の安定性評価から

$$
|z|_{H^1}
\le
\frac1\alpha
\|G\|_{V^*}
\le
\frac{C_P}{\alpha}
\|e\|_{L^2}.
$$
<!-- proof-end -->

ここまでで必要なのは $H^1$ レベルの理論だけです。

しかし $L^2$ 誤差を一段改善するには、双対解 $z$ がさらに

$$
z\in H^2(\Omega)
$$

まで正則になる必要があります。

---

## 6. 大域 $H^2$ 正則性は追加仮定である

双対論法で必要なのは、ある $C_{\mathrm{reg}}>0$ が存在して

$$
\boxed{
\|z\|_{H^2(\Omega)}
\le
C_{\mathrm{reg}}
\|e\|_{L^2(\Omega)}
}
$$

と評価できることです。

これは Lax--Milgram からは出ません。

Lax--Milgram が与えるのは

$$
z\in H_0^1(\Omega)
$$

までです。

また [GPDE9 の Poisson 方程式の interior $H^2$ regularity](../GPDE9/index.md#thm-gpde9-poisson-interior-h2)が与えるのは

$$
z\in H^2_{\mathrm{loc}}(\Omega)
$$

です。

本章で必要なのは境界まで含む

$$
z\in H^2(\Omega)
$$

です。

Poisson の零 Dirichlet 問題では、例えば有界 $C^{1,1}$ 級領域では標準的な大域楕円型正則性定理によりこの評価が成り立ちます。二次元の凸多角形領域でも同様の $H^2$ 正則性が成り立つのが標準的な結果です。

一方、内角が $\pi$ を超える再入角（reentrant corner）を持つ多角形では、一般には $H^2$ 正則性が失われます。

したがって

$$
\boxed{
\text{双対問題が解ける}
}
$$

ことと

$$
\boxed{
\text{双対解が }H^2\text{ まで滑らか}
}
$$

であることは別の主張です。

> **本章での扱い**
>
> 大域 $H^2$ 正則性定理そのものの境界平坦化を含む完全証明は GPDE9 でも意図的黒箱として位置付けられています。本章でも同じく、誤差解析へ必要な仮定として明示し、その仮定をどこで使用するかを完全に追います。

---

## 7. $L^2$ 誤差を一段改善する

<a id="thm-fem4-aubin-nitsche"></a>

<!-- formal-statement-start -->
### 定理（Aubin--Nitsche 型 L2 誤差評価）

第0節の設定を仮定し、連続解を $u$、適合 Galerkin 解を $u_h$ とする。

$$
e=u-u_h
$$

に対する [L2 誤差に対する楕円型双対問題](#def-fem4-l2-dual-problem)の解 $z\in H_0^1(\Omega)$ が

$$
z\in H^2(\Omega)
$$

を満たし、ある $C_{\mathrm{reg}}>0$ に対して

$$
\|z\|_{H^2(\Omega)}
\le
C_{\mathrm{reg}}
\|e\|_{L^2(\Omega)}
$$

と評価できるとする。ここで $C_{\mathrm{reg}}$ は $e$ と $h$ に依存しないものとする。

さらに $\{\mathcal T_h\}$ を形状正則な一次三角形メッシュ族とする。

このとき、形状正則性と領域にのみ依存する定数 $C$ が存在して

$$
\boxed{
\|u-u_h\|_{L^2(\Omega)}
\le
C
M
C_{\mathrm{reg}}
h
|u-u_h|_{H^1(\Omega)}
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

ここが本章の核心です。

双対問題へ $v=e$ を入れると

$$
\|e\|_{L^2}^2
=
a(e,z)
$$

になります。

しかしこのままでは $z$ の $H^1$ ノルムしか出ず、追加の $h$ は得られません。

そこで

$$
z
=
(z-I_hz)+I_hz
$$

と分解します。

$I_hz\in V_h$ なので Galerkin 直交性により

$$
a(e,I_hz)=0.
$$

したがって

$$
\|e\|_{L^2}^2
=
a(e,z-I_hz).
$$

右辺には FEM3 の $H^1$ 補間誤差

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}
$$

を使えます。

最後に双対正則性で

$$
|z|_{H^2}
\le
C_{\mathrm{reg}}\|e\|_{L^2}
$$

と戻せば、両辺から $\|e\|_{L^2}$ を一つ消せます。

<!-- proof-start -->
### 証明

誤差を

$$
e=u-u_h
$$

と置きます。

双対問題の定義から、任意の $v\in V$ に対して

$$
a(v,z)
=
(e,v)_{L^2}.
$$

$e\in V$ なので $v=e$ を代入でき、

$$
a(e,z)
=
(e,e)_{L^2}
=
\|e\|_{L^2}^2.
$$

従って

$$
\|e\|_{L^2}^2
=
a(e,z).
$$

仮定より $z\in H^2(\Omega)\cap H_0^1(\Omega)$ です。

FEM3 の大域節点補間 $I_hz$ は

$$
I_hz\in V_h
$$

を満たします。

そこで

$$
z
=
(z-I_hz)+I_hz
$$

と分解すると

$$
a(e,z)
=
a(e,z-I_hz)
+
a(e,I_hz).
$$

[Galerkin 直交性](../FEM1/index.md#thm-fem1-galerkin-orthogonality)から

$$
a(e,v_h)=0
\qquad
(\forall v_h\in V_h)
$$

です。

特に $I_hz\in V_h$ なので

$$
a(e,I_hz)=0.
$$

従って

$$
\boxed{
\|e\|_{L^2}^2
=
a(e,z-I_hz)
}.
$$

双線形形式の有界性から

$$
\|e\|_{L^2}^2
\le
M
|e|_{H^1}
|z-I_hz|_{H^1}.
$$

[FEM3 の大域一次補間誤差評価](../FEM3/index.md#thm-fem3-global-error)を $z$ に適用して

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}.
$$

したがって

$$
\|e\|_{L^2}^2
\le
CMh
|e|_{H^1}
|z|_{H^2}.
$$

双対正則性の仮定

$$
\|z\|_{H^2}
\le
C_{\mathrm{reg}}
\|e\|_{L^2}
$$

を使うと

$$
\|e\|_{L^2}^2
\le
CM
C_{\mathrm{reg}}
h
|e|_{H^1}
\|e\|_{L^2}.
$$

$\|e\|_{L^2}=0$ なら結論は自明です。

$\|e\|_{L^2}\ne0$ なら両辺を $\|e\|_{L^2}$ で割って

$$
\boxed{
\|e\|_{L^2}
\le
CM
C_{\mathrm{reg}}
h
|e|_{H^1}
}.
$$
<!-- proof-end -->

### 追加の $h$ はどこから来たか

証明を一行ずつ追うと、

$$
\|e\|_0^2
=
a(e,z)
$$

ではまだ $h$ はありません。

Galerkin 直交性により

$$
a(e,z)
=
a(e,z-I_hz)
$$

へ変えた瞬間に、補間誤差

$$
|z-I_hz|_1
\le
Ch|z|_2
$$

を差し込めます。

つまり追加の $h$ は

$$
\boxed{
\text{双対問題}
+
\text{Galerkin 直交性}
+
\text{双対解の補間}
}
$$

の三点セットから出ています。

単に「$L^2$ の方が弱いノルムだから速い」のではありません。

---

## 8. $H^1$ の $h$ と双対論法の $h$ を掛ける

<a id="cor-fem4-standard-rates"></a>

<!-- formal-statement-start -->
### 系（一次有限要素法の標準 H1・L2 収束次数）

[一次有限要素解の H1 誤差評価](#thm-fem4-h1-error)の仮定を満たし、さらに [Aubin--Nitsche 型 L2 誤差評価](#thm-fem4-aubin-nitsche)の双対正則性を仮定する。

このとき

$$
\boxed{
|u-u_h|_{H^1(\Omega)}
\le
C_1
h
|u|_{H^2(\Omega)}
}
$$

および

$$
\boxed{
\|u-u_h\|_{L^2(\Omega)}
\le
C_2
h^2
|u|_{H^2(\Omega)}
}
$$

が成り立つ。

定数 $C_1,C_2$ は $h$ に依存しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[一次有限要素解の H1 誤差評価](#thm-fem4-h1-error)から

$$
|u-u_h|_{H^1}
\le
C_1h|u|_{H^2}.
$$

一方 [Aubin--Nitsche 型 L2 誤差評価](#thm-fem4-aubin-nitsche)から

$$
\|u-u_h\|_{L^2}
\le
C'h|u-u_h|_{H^1}.
$$

第一式を第二式へ代入して

$$
\|u-u_h\|_{L^2}
\le
C'h
\left(
C_1h|u|_{H^2}
\right).
$$

したがって

$$
\|u-u_h\|_{L^2}
\le
C_2h^2|u|_{H^2}.
$$
<!-- proof-end -->

一次三角形要素の標準的な収束次数は

| 誤差 | 上界 | メッシュ幅 $h\to h/2$ |
|---|---|---:|
| $H^1$ 半ノルム | $O(h)$ | 約 $1/2$ |
| $L^2$ ノルム | $O(h^2)$ | 約 $1/4$ |

です。

ここで「約」と書くのは、これは漸近的な上界の次数であり、有限の $h$ で誤差比が必ず正確に $1/2$ や $1/4$ になるという意味ではないからです。

---

## 9. 仮定を一つずつ外すと何が壊れるか

### 9.1 $u\in H^2$ を失う

前半の証明は

$$
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}
$$

を使っています。

従って $u\notin H^2$ なら、この評価をそのまま使えません。

Céa 自体は壊れません。

壊れるのは

$$
\boxed{
\text{最良近似誤差を }Ch|u|_{H^2}\text{ と具体化する段階}
}
$$

です。

### 9.2 形状正則性を失う

FEM3 で見たように、細長くつぶれた三角形では

$$
\|B_K^{-1}\|
$$

が増大し、$H^1$ 補間誤差の定数が一様でなくなります。

この場合も Céa 自体は正しいままです。

しかし良い近似 $I_hu$ を一様定数で保証できなくなるため、$h$ だけで収束次数を記述できません。

### 9.3 双対解の大域 $H^2$ 正則性を失う

後半では

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}
$$

を使います。

双対解が $H^2$ に入らなければ、この追加の $h$ を取り出せません。

したがって $L^2$ 誤差の一段改善は、

$$
\boxed{
\text{元の解の正則性}
}
$$

だけでなく

$$
\boxed{
\text{双対問題の正則性}
}
$$

にも依存します。

これは重要な点です。

---

## 10. 再入角：正則性仮定は飾りではない

角度

$$
\omega>\pi
$$

の扇形領域を考え、

$$
\beta
=
\frac{\pi}{\omega}
\in(0,1)
$$

とします。

GPDE9 と同じく

$$
s(r,\theta)
=
r^\beta\sin(\beta\theta)
$$

を考えます。

この関数は角の内部で調和関数です。

原点近くで

$$
|\nabla s|
\asymp
r^{\beta-1}.
$$

従って

$$
\int_0^\varepsilon
|\nabla s|^2
r\,dr
\asymp
\int_0^\varepsilon
r^{2\beta-1}\,dr.
$$

$\beta>0$ なのでこれは収束します。

したがって

$$
s\in H^1
$$

です。

一方

$$
|D^2s|
\asymp
r^{\beta-2},
$$

なので

$$
\int_0^\varepsilon
|D^2s|^2r\,dr
\asymp
\int_0^\varepsilon
r^{2\beta-3}\,dr.
$$

収束には

$$
2\beta-3>-1
$$

すなわち

$$
\beta>1
$$

が必要です。

しかし 再入角では $\beta<1$ です。

従って

$$
\boxed{
s\notin H^2
}
$$

です。

### 何が壊れたか

この例では弱解の存在理論そのものが壊れたわけではありません。

失われたのは境界近傍の $H^2$ 正則性です。

すると前半では

$$
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}
$$

という標準評価をそのまま使えません。

後半では双対解にも同じ角特異性が現れ得るため

$$
\|z\|_{H^2}
\le
C_{\mathrm{reg}}\|e\|_{L^2}
$$

も一般には成立しません。

つまり角特異性は

$$
\boxed{
H^1\text{ の標準次数}
}
$$

と

$$
\boxed{
L^2\text{ の追加一段改善}
}
$$

の両方の証明機構へ影響します。

「FEM は一次要素だから必ず $H^1$ で一次、$L^2$ で二次収束する」という理解は誤りです。

次数は

$$
\boxed{
\text{要素次数}
+
\text{解・双対解の正則性}
+
\text{メッシュ幾何}
}
$$

の組合せで決まります。

---

## 11. 誤差解析を一本道にまとめる

一次有限要素法の標準的な事前誤差解析は、次の一本道として整理できます。

### Step 1：連続問題と離散問題を同じ双線形形式で書く

$$
a(u,v)=F(v)
\qquad
(\forall v\in V),
$$

$$
a(u_h,v_h)=F(v_h)
\qquad
(\forall v_h\in V_h).
$$

### Step 2：Galerkin 直交性

$$
a(u-u_h,v_h)=0
\qquad
(\forall v_h\in V_h).
$$

### Step 3：Céa

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
|u-v_h|_{H^1}.
$$

### Step 4：補間関数を比較対象にする

$$
v_h=I_hu.
$$

### Step 5：形状正則性と $u\in H^2$

$$
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}.
$$

従って

$$
|u-u_h|_{H^1}
\le
Ch|u|_{H^2}.
$$

### Step 6：$L^2$ 誤差なら補助問題を解く

$$
a(v,z)
=
(e,v)_{L^2}.
$$

### Step 7：誤差の二乗を双線形形式へ移す

$$
\|e\|_{L^2}^2
=
a(e,z).
$$

### Step 8：Galerkin 直交性で離散成分を消す

$$
\|e\|_{L^2}^2
=
a(e,z-I_hz).
$$

### Step 9：双対解の補間と大域正則性

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}
\le
ChC_{\mathrm{reg}}\|e\|_{L^2}.
$$

従って

$$
\|e\|_{L^2}
\le
Ch|e|_{H^1}.
$$

### Step 10：前半の $H^1$ 誤差を代入

$$
\boxed{
\|u-u_h\|_{L^2}
\le
Ch^2|u|_{H^2}
}.
$$

この十段を自力で再構成できれば、適合楕円型 FEM の標準誤差解析の骨格は身についています。

---

## 12. 演習

### Level A

<a id="ex-fem4-a01"></a>
### FEM4-A01 Céa と補間評価を接続する
- Level: A

次を仮定する。

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
\inf_{v_h\in V_h}
|u-v_h|_{H^1},
$$

$$
I_hu\in V_h,
$$

$$
|u-I_hu|_{H^1}
\le
C_Ih|u|_{H^2}.
$$

これらから

$$
|u-u_h|_{H^1}
\le
C_I\frac{M}{\alpha}h|u|_{H^2}
$$

を導け。

<!-- solution-start -->
**詳細解答**

Céa の補題の右辺には

$$
\inf_{v_h\in V_h}
|u-v_h|_{H^1}
$$

があります。

$I_hu\in V_h$ なので、最小値は特定の候補 $I_hu$ を選んだ値以下です。

従って

$$
\inf_{v_h\in V_h}
|u-v_h|_{H^1}
\le
|u-I_hu|_{H^1}.
$$

これを Céa の評価へ代入して

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
|u-I_hu|_{H^1}.
$$

さらに補間誤差評価

$$
|u-I_hu|_{H^1}
\le
C_Ih|u|_{H^2}
$$

を代入すると

$$
|u-u_h|_{H^1}
\le
\frac{M}{\alpha}
C_Ih|u|_{H^2}.
$$

したがって

$$
\boxed{
|u-u_h|_{H^1}
\le
C_I\frac{M}{\alpha}h|u|_{H^2}
}.
$$

この導出で Céa は「離散解から最良近似へ」、補間評価は「最良近似から $h$ へ」という別々の役割を持っています。
<!-- solution-end -->

<a id="ex-fem4-a02"></a>
### FEM4-A02 Poisson 問題で $M=\alpha=1$ を確認する
- Level: A

$$
a(w,v)
=
\int_\Omega
\nabla w\cdot\nabla v\,dx
$$

とする。

1. $M=1$ と取れることを示せ。
2. $\alpha=1$ と取れることを示せ。
3. Poisson の適合 Galerkin 解について

$$
|u-u_h|_{H^1}
\le
Ch|u|_{H^2}
$$

を導け。

<!-- solution-start -->
**詳細解答**

Cauchy--Schwarz の不等式から

$$
\left|
\int_\Omega
\nabla w\cdot\nabla v\,dx
\right|
\le
\|\nabla w\|_{L^2}
\|\nabla v\|_{L^2}.
$$

従って

$$
|a(w,v)|
\le
|w|_{H^1}|v|_{H^1}.
$$

よって

$$
\boxed{M=1}
$$

と取れます。

次に

$$
a(v,v)
=
\int_\Omega|\nabla v|^2\,dx
=
|v|_{H^1}^2.
$$

したがって

$$
a(v,v)
\ge
1\cdot |v|_{H^1}^2
$$

であり

$$
\boxed{\alpha=1}
$$

と取れます。

[一次有限要素解の H1 誤差評価](#thm-fem4-h1-error)へ $M/\alpha=1$ を代入すれば

$$
\boxed{
|u-u_h|_{H^1}
\le
Ch|u|_{H^2}
}.
$$
<!-- solution-end -->

<a id="ex-fem4-a03"></a>
### FEM4-A03 双対問題の右辺が $H^{-1}$ に入ることを示す
- Level: A

$e\in L^2(\Omega)$ とし、

$$
G(v)
=
(e,v)_{L^2}
$$

と置く。

Poincaré の不等式

$$
\|v\|_{L^2}
\le
C_P|v|_{H^1}
$$

を使って

$$
G\in(H_0^1(\Omega))^*
$$

および

$$
\|G\|_{(H_0^1)^*}
\le
C_P\|e\|_{L^2}
$$

を示せ。

<!-- solution-start -->
**詳細解答**

任意の $v\in H_0^1(\Omega)$ に対し、Cauchy--Schwarz の不等式から

$$
|G(v)|
=
\left|
\int_\Omega ev\,dx
\right|
\le
\|e\|_{L^2}\|v\|_{L^2}.
$$

Poincaré の不等式を使うと

$$
\|v\|_{L^2}
\le
C_P|v|_{H^1}.
$$

従って

$$
|G(v)|
\le
C_P
\|e\|_{L^2}
|v|_{H^1}.
$$

これは $G$ が $H_0^1(\Omega)$ 上の連続線形汎関数であることを示します。

さらに双対ノルムの定義から

$$
\begin{aligned}
\|G\|_{(H_0^1)^*}
&=
\sup_{v\ne0}
\frac{|G(v)|}{|v|_{H^1}}
\\
&\le
C_P\|e\|_{L^2}.
\end{aligned}
$$

よって

$$
\boxed{
\|G\|_{(H_0^1)^*}
\le
C_P\|e\|_{L^2}
}.
$$
<!-- solution-end -->

<a id="ex-fem4-a04"></a>
### FEM4-A04 メッシュ幅を半分にしたときの理論誤差比
- Level: A

誤差上界が

$$
E_1(h)\le C_1h,
$$

$$
E_0(h)\le C_0h^2
$$

であるとする。

1. $h$ を $h/2$ にしたとき、各上界は何倍になるか。
2. $h$ を $h/4$ にしたときは何倍になるか。
3. この計算だけから実測誤差が正確に同じ比率になると言えるか。

<!-- solution-start -->
**詳細解答**

まず一次の上界では

$$
C_1\frac h2
=
\frac12C_1h.
$$

従って $h\to h/2$ で

$$
\boxed{\frac12}
$$

倍です。

二次の上界では

$$
C_0\left(\frac h2\right)^2
=
\frac14C_0h^2.
$$

従って

$$
\boxed{\frac14}
$$

倍です。

次に $h\to h/4$ なら

$$
C_1\frac h4
=
\frac14C_1h
$$

なので一次誤差上界は

$$
\boxed{\frac14}
$$

倍です。

二次誤差上界は

$$
C_0\left(\frac h4\right)^2
=
\frac1{16}C_0h^2
$$

なので

$$
\boxed{\frac1{16}}
$$

倍です。

ただし、ここで比較しているのは理論上界の $h$ 依存です。

実際の誤差には高次項や定数があり、粗いメッシュでは漸近領域に入っていないこともあります。

したがって

$$
\boxed{
\text{実測誤差が必ず正確に }1/2,\ 1/4\text{ になるとは限らない}
}
$$

です。
<!-- solution-end -->

### Level B

<a id="ex-fem4-b01"></a>
### FEM4-B01 Galerkin 直交性で双対誤差を一段縮める
- Level: B

$e=u-u_h$ とし、$z$ が

$$
a(v,z)=(e,v)_{L^2}
\qquad
(\forall v\in V)
$$

を満たすとする。

また $I_hz\in V_h$ とする。

1. 
   $$
   \|e\|_{L^2}^2=a(e,z)
   $$
   を示せ。
2. Galerkin 直交性から
   $$
   a(e,I_hz)=0
   $$
   を示せ。
3. 
   $$
   \|e\|_{L^2}^2
   =
   a(e,z-I_hz)
   $$
   を導け。
4. 双線形形式の有界性と
   $$
   |z-I_hz|_{H^1}
   \le
   Ch|z|_{H^2}
   $$
   を使って
   $$
   \|e\|_{L^2}^2
   \le
   CMh|e|_{H^1}|z|_{H^2}
   $$
   を示せ。

<!-- solution-start -->
**詳細解答**

双対問題へ $v=e$ を代入します。

$e=u-u_h\in V$ なので代入可能です。

すると

$$
a(e,z)
=
(e,e)_{L^2}
=
\|e\|_{L^2}^2.
$$

従って

$$
\boxed{
\|e\|_{L^2}^2=a(e,z)
}.
$$

次に $I_hz\in V_h$ です。

[Galerkin 直交性](../FEM1/index.md#thm-fem1-galerkin-orthogonality)から

$$
a(e,v_h)=0
\qquad
(\forall v_h\in V_h)
$$

なので

$$
\boxed{
a(e,I_hz)=0
}.
$$

ここで

$$
z
=
(z-I_hz)+I_hz
$$

と書けば

$$
\begin{aligned}
a(e,z)
&=
a(e,z-I_hz)
+
a(e,I_hz)
\\
&=
a(e,z-I_hz).
\end{aligned}
$$

従って

$$
\boxed{
\|e\|_{L^2}^2
=
a(e,z-I_hz)
}.
$$

双線形形式の有界性から

$$
|a(e,z-I_hz)|
\le
M
|e|_{H^1}
|z-I_hz|_{H^1}.
$$

さらに補間評価から

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}.
$$

したがって

$$
\boxed{
\|e\|_{L^2}^2
\le
CMh|e|_{H^1}|z|_{H^2}
}.
$$

この式までが Galerkin 直交性と補間理論だけで得られる部分です。

ここから $|z|_{H^2}$ を $\|e\|_{L^2}$ で戻すために、双対問題の大域 $H^2$ 正則性が必要になります。
<!-- solution-end -->

<a id="ex-fem4-b02"></a>
### FEM4-B02 一次元 Poisson 双対問題を最後まで解く
- Level: B

$\Omega=(0,1)$ とし、

$$
e(x)=x(1-x).
$$

双対問題

$$
-z''=e,
\qquad
z(0)=z(1)=0
$$

を考える。

1. $z$ を求めよ。
2. $z''$ を使って
   $$
   |z|_{H^2(0,1)}
   =
   \|e\|_{L^2(0,1)}
   $$
   がこの例では成り立つことを示せ。
3. $\|e\|_{L^2(0,1)}^2$ を具体的に求めよ。

ただし一次元の $H^2$ 半ノルムを

$$
|z|_{H^2}=\|z''\|_{L^2}
$$

とする。

<!-- solution-start -->
**詳細解答**

方程式は

$$
z''
=
-e
=
-x+x^2.
$$

一回積分して

$$
z'
=
-\frac{x^2}{2}
+
\frac{x^3}{3}
+
C_1.
$$

さらに積分して

$$
z
=
-\frac{x^3}{6}
+
\frac{x^4}{12}
+
C_1x
+
C_2.
$$

境界条件 $z(0)=0$ から

$$
C_2=0.
$$

$z(1)=0$ から

$$
-\frac16+\frac1{12}+C_1=0.
$$

従って

$$
C_1=\frac1{12}.
$$

よって

$$
\boxed{
z(x)
=
\frac{x}{12}
-
\frac{x^3}{6}
+
\frac{x^4}{12}
}.
$$

次に

$$
z''=-e.
$$

したがって

$$
|z|_{H^2}
=
\|z''\|_{L^2}
=
\|-e\|_{L^2}
=
\boxed{
\|e\|_{L^2}
}.
$$

最後に

$$
e(x)=x-x^2
$$

なので

$$
\|e\|_{L^2}^2
=
\int_0^1
(x-x^2)^2\,dx.
$$

展開すると

$$
(x-x^2)^2
=
x^2-2x^3+x^4.
$$

従って

$$
\begin{aligned}
\|e\|_{L^2}^2
&=
\int_0^1
(x^2-2x^3+x^4)\,dx
\\
&=
\frac13
-
\frac12
+
\frac15
\\
&=
\frac{10-15+6}{30}
\\
&=
\boxed{
\frac1{30}
}.
\end{aligned}
$$

したがって

$$
\boxed{
\|e\|_{L^2}
=
\frac1{\sqrt{30}}
}
$$

であり、この例では

$$
|z|_{H^2}
=
\frac1{\sqrt{30}}
$$

です。
<!-- solution-end -->

<a id="ex-fem4-b03"></a>
### FEM4-B03 再入角で標準証明のどこが壊れるか
- Level: B

$\omega>\pi$ とし、

$$
\beta=\frac{\pi}{\omega}\in(0,1).
$$

角の近くで

$$
s(r,\theta)
=
r^\beta\sin(\beta\theta)
$$

とする。

1. 
   $$
   |\nabla s|\asymp r^{\beta-1}
   $$
   を用いて $s\in H^1$ であることを確認せよ。
2.
   $$
   |D^2s|\asymp r^{\beta-2}
   $$
   を用いて $s\notin H^2$ であることを確認せよ。
3. [一次有限要素解の H1 誤差評価](#thm-fem4-h1-error)の証明で使えなくなる式を答えよ。
4. [Aubin--Nitsche 型 L2 誤差評価](#thm-fem4-aubin-nitsche)で失われ得る仮定を答えよ。

<!-- solution-start -->
**詳細解答**

極座標の面積要素は

$$
r\,dr\,d\theta
$$

です。

まず

$$
|\nabla s|
\asymp
r^{\beta-1}
$$

なので、角近傍の勾配二乗積分は定数因子を除いて

$$
\int_0^\varepsilon
r^{2\beta-2}r\,dr
=
\int_0^\varepsilon
r^{2\beta-1}\,dr.
$$

この積分は指数が $-1$ より大きいとき収束します。

$$
2\beta-1>-1
\iff
2\beta>0
\iff
\beta>0.
$$

実際 $\beta\in(0,1)$ なので収束します。

また
$$
|s|^2
\asymp
r^{2\beta}
$$
なので
$$
\int_0^\varepsilon |s|^2r\,dr
\asymp
\int_0^\varepsilon r^{2\beta+1}\,dr
<\infty.
$$
したがって
$$
\boxed{s\in H^1}
$$
です。

次に

$$
|D^2s|
\asymp
r^{\beta-2}
$$

なので

$$
\int_0^\varepsilon
|D^2s|^2r\,dr
\asymp
\int_0^\varepsilon
r^{2\beta-4}r\,dr
=
\int_0^\varepsilon
r^{2\beta-3}\,dr.
$$

収束条件は

$$
2\beta-3>-1
\iff
\beta>1.
$$

しかし $\beta<1$ なので発散します。

従って

$$
\boxed{s\notin H^2}
$$

です。

前半の標準証明では

$$
|u-I_hu|_{H^1}
\le
Ch|u|_{H^2}
$$

を使います。

$u\notin H^2$ なら右辺が有限量として使えず、ここで標準的一次収束の証明が止まります。

後半では双対解 $z$ に対する

$$
\boxed{
\|z\|_{H^2}
\le
C_{\mathrm{reg}}\|e\|_{L^2}
}
$$

という大域正則性が失われ得ます。

この仮定がなければ

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}
$$

から追加の $h$ を取り出す標準的な双対論法を閉じられません。
<!-- solution-end -->

### Level C

<a id="ex-fem4-c01"></a>
### FEM4-C01 $H^1$ 一次・$L^2$ 二次収束を一つの証明で閉じる
- Level: C

$\Omega=(0,1)^2$ とし、

$$
u(x,y)
=
x(1-x)y(1-y)
$$

とし、

$$
f=-\Delta u
$$

で定める零 Dirichlet Poisson 問題を考える。このとき $u$ はその厳密解である。

$\{\mathcal T_h\}$ を形状正則な適合三角形分割族、$V_h$ を連続一次有限要素空間、$u_h\in V_h$ を Galerkin 解とする。

さらに任意の $g\in L^2(\Omega)$ に対し、双対 Poisson 問題

$$
\int_\Omega
\nabla v\cdot\nabla z\,dx
=
\int_\Omega gv\,dx
\qquad
(\forall v\in H_0^1(\Omega))
$$

の解が

$$
\|z\|_{H^2(\Omega)}
\le
C_{\mathrm{reg}}
\|g\|_{L^2(\Omega)}
$$

を満たすと仮定する。

FEM3 で得た

$$
|u|_{H^2(\Omega)}^2
=
\frac{17}{45}
$$

を使って、次を示せ。

1. 
   $$
   |u-u_h|_{H^1}
   \le
   C
   \sqrt{\frac{17}{45}}
   h.
   $$
2. $e=u-u_h$ と置き、双対問題の右辺に $g=e$ を入れて
   $$
   \|e\|_{L^2}^2
   =
   \int_\Omega
   \nabla e\cdot\nabla(z-I_hz)\,dx
   $$
   を示せ。
3. 
   $$
   \|e\|_{L^2}
   \le
   C
   C_{\mathrm{reg}}
   h
   |e|_{H^1}
   $$
   を導け。
4. 
   $$
   \|u-u_h\|_{L^2}
   \le
   C
   C_{\mathrm{reg}}
   \sqrt{\frac{17}{45}}
   h^2
   $$
   を導け。
5. $h\to h/2$ で二つの理論上界が何倍になるか答えよ。
6. この問題で双対正則性を仮定から外した場合、1 と 4 のどちらが直ちに証明不能になるか説明せよ。

<!-- solution-start -->
**詳細解答**

Poisson form は

$$
a(w,v)
=
\int_\Omega
\nabla w\cdot\nabla v\,dx
$$

です。

前節で確認したように

$$
M=1,
\qquad
\alpha=1.
$$

従って [一次有限要素解の H1 誤差評価](#thm-fem4-h1-error)から

$$
|u-u_h|_{H^1}
\le
Ch|u|_{H^2}.
$$

仮定

$$
|u|_{H^2}^2
=
\frac{17}{45}
$$

から

$$
|u|_{H^2}
=
\sqrt{\frac{17}{45}}.
$$

したがって

$$
\boxed{
|u-u_h|_{H^1}
\le
C
\sqrt{\frac{17}{45}}
h
}.
$$

次に

$$
e=u-u_h
$$

と置きます。

双対問題の右辺に

$$
g=e
$$

を入れ、解を $z$ とします。

定義から

$$
\int_\Omega
\nabla v\cdot\nabla z\,dx
=
\int_\Omega
ev\,dx
$$

が全ての $v\in H_0^1(\Omega)$ で成り立ちます。

$v=e$ とすると

$$
\int_\Omega
\nabla e\cdot\nabla z\,dx
=
\int_\Omega e^2\,dx
=
\|e\|_{L^2}^2.
$$

一方 $I_hz\in V_h$ です。

Galerkin 直交性から

$$
\int_\Omega
\nabla e\cdot\nabla I_hz\,dx
=
0.
$$

従って

$$
\begin{aligned}
\|e\|_{L^2}^2
&=
\int_\Omega
\nabla e\cdot\nabla z\,dx
\\
&=
\int_\Omega
\nabla e\cdot
\nabla(z-I_hz)\,dx.
\end{aligned}
$$

よって

$$
\boxed{
\|e\|_{L^2}^2
=
\int_\Omega
\nabla e\cdot
\nabla(z-I_hz)\,dx
}.
$$

Cauchy--Schwarz から

$$
\|e\|_{L^2}^2
\le
|e|_{H^1}
|z-I_hz|_{H^1}.
$$

FEM3 の補間誤差評価により

$$
|z-I_hz|_{H^1}
\le
Ch|z|_{H^2}.
$$

さらに問題文の双対正則性から

$$
|z|_{H^2}
\le
\|z\|_{H^2}
\le
C_{\mathrm{reg}}
\|e\|_{L^2}.
$$

従って

$$
\|e\|_{L^2}^2
\le
C
C_{\mathrm{reg}}
h
|e|_{H^1}
\|e\|_{L^2}.
$$

$\|e\|_{L^2}=0$ なら結論は自明です。

そうでなければ割って

$$
\boxed{
\|e\|_{L^2}
\le
C
C_{\mathrm{reg}}
h
|e|_{H^1}
}.
$$

ここへ最初に得た

$$
|e|_{H^1}
\le
C
\sqrt{\frac{17}{45}}
h
$$

を代入すると

$$
\|e\|_{L^2}
\le
C
C_{\mathrm{reg}}
h
\left(
\sqrt{\frac{17}{45}}
h
\right).
$$

定数をまとめて

$$
\boxed{
\|u-u_h\|_{L^2}
\le
C
C_{\mathrm{reg}}
\sqrt{\frac{17}{45}}
h^2
}.
$$

次に $h\to h/2$ とします。

$H^1$ 誤差上界は $h$ に比例するので

$$
\boxed{\frac12}
$$

倍です。

$L^2$ 誤差上界は $h^2$ に比例するので

$$
\boxed{\frac14}
$$

倍です。

最後に双対正則性を外した場合を考えます。

$H^1$ 評価は Céa と $u$ 自身の補間誤差だけから出ており、双対問題を使っていません。

したがって 1 はそのまま残ります。

一方 4 では

$$
|z|_{H^2}
\le
C_{\mathrm{reg}}\|e\|_{L^2}
$$

が必要です。

これを失うと追加の $h$ を誤差自身へ戻せません。

従って直ちに閉じなくなるのは

$$
\boxed{
4\text{ の }L^2\text{ 二次誤差評価}
}
$$

です。
<!-- solution-end -->

---

## 13. まとめ

本章では FEM1 と FEM3 を接続し、適合一次有限要素法の標準的な事前誤差評価を完成させました。

前半は

$$
\boxed{
\text{Céa}
+
\text{一次補間}
\Longrightarrow
|u-u_h|_{H^1}
\le
Ch|u|_{H^2}
}
$$

です。

ここで

- 適合性が Galerkin 直交性を支える。
- 有界性と強圧性が Céa を支える。
- $u\in H^2$ が一次補間の $O(h)$ を支える。
- 形状正則性が補間定数を一様にする。

後半は

$$
\boxed{
\text{双対問題}
+
\text{Galerkin 直交性}
+
\text{双対正則性}
\Longrightarrow
\|u-u_h\|_{L^2}
\le
Ch|u-u_h|_{H^1}
}
$$

です。

そこへ前半の $H^1$ 誤差を代入して

$$
\boxed{
\|u-u_h\|_{L^2}
\le
Ch^2|u|_{H^2}
}
$$

を得ました。

一次三角形要素では標準的に

$$
\boxed{
H^1:\ O(h),
\qquad
L^2:\ O(h^2)
}
$$

となりますが、これは要素次数だけで自動的に決まる数字ではありません。

再入角の例が示したように、解や双対解の大域正則性が落ちれば、標準次数を導く証明機構も失われます。

したがって有限要素誤差解析では

$$
\boxed{
\text{離散化の次数}
\text{ と }
\text{PDE の正則性}
}
$$

を常にセットで読む必要があります。

次の FEM5 では、強圧性だけでは閉じない鞍点問題へ進みます。そこで Galerkin 法の安定性を支える役割は、強圧性から inf-sup 条件へ移ります。
