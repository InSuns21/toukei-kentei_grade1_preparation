# F0-02C2 関数解析II：線形汎関数・双対空間・Riesz表現

有限次元では、超平面の法線も勾配も

$$
a\in\mathbb R^p
$$

というベクトルで表していました。

例えば

$$
\ell(x)=a^{\mathsf T}x
$$

は、ベクトル $x$ を実数へ写す線形写像です。

無限次元では「ベクトルを実数へ測る線形写像」を独立した対象として扱う必要があります。

それが **線形汎関数** と **双対空間** です。

---

## 1. 線形汎関数

<a id="def-f0-02c2-linear-functional"></a>

<!-- formal-statement-start -->
> **定義（線形汎関数）**  
> ベクトル空間 $X$ から実数への写像 $\ell:X\to\mathbb R$ が、任意の $x,y\in X$ とスカラー $a,b$ に対して

$$
\ell(ax+by)=a\ell(x)+b\ell(y)
$$

> を満たすとき、$\ell$ を **線形汎関数** といいます。
<!-- formal-statement-end -->

「functional」という名前は、入力がベクトルや関数で、出力がスカラーであることを強調しています。

<!-- definition-example-start: def-f0-02c2-linear-functional -->
**定義の確認：線形汎関数と、線形でないスカラー値写像**

まず $X=\mathbb R^2$ で

$$
\ell(x_1,x_2)=2x_1-x_2
$$

と置くと、

$$
\ell(a x+b y)
=a\ell(x)+b\ell(y)
$$

なので線形汎関数です。

入力が関数でも同じです。2次以下の多項式全体を $P_2$ とし、

$$
p(t)=c_0+c_1t+c_2t^2
$$

に対して

$$
L(p)=p'(0)=c_1
$$

と置けば、微分の線形性から $L(ap+bq)=aL(p)+bL(q)$ なので $L$ も線形汎関数です。

一方、

$$
F(x)=\|x\|
$$

はスカラー値写像ですが、一般に $F(-x)=F(x)\ne-F(x)$ なので線形汎関数ではありません。「スカラーを返す」だけでは足りず、線形性が必要です。
<!-- definition-example-end -->

---

## 2. 有限次元では線形汎関数は行ベクトルだった

$X=\mathbb R^p$ とします。

標準基底 $e_1,\dots,e_p$ に対し

$$
a_j=\ell(e_j)
$$

と置けば、

$$
x=\sum_{j=1}^p x_je_j
$$

なので

$$
\ell(x)
=\sum_{j=1}^p x_j\ell(e_j)
=\sum_{j=1}^p a_jx_j
=a^{\mathsf T}x.
$$

したがって有限次元では

$$
\boxed{
\text{線形汎関数}
\longleftrightarrow
\text{係数ベクトル }a
}
$$

と考えてよかったのです。

この同一視が無限次元では自動ではありません。

---

## 3. なぜ「連続」線形汎関数だけを集めるのか

ノルム空間 $X$ 上で、線形汎関数 $\ell$ が連続であるとは、$x_n\to x$ なら

$$
\ell(x_n)\to\ell(x)
$$

となることです。

線形写像では、連続性は次の **有界性** と同値です。

> ある $M<\infty$ が存在して
>
$$
|\ell(x)|\le M\|x\|
\qquad(\forall x\in X)
$$
>
> となる。

つまり、入力のノルムが小さいのに出力だけが無制限に大きくなることを禁止します。

---

## 4. 有界なら連続

$$
|\ell(x)|\le M\|x\|
$$

とします。

すると

$$
|\ell(x)-\ell(y)|
=|\ell(x-y)|
\le M\|x-y\|.
$$

したがって $x\to y$ なら $\ell(x)\to\ell(y)$ です。

実際、Lipschitz連続になっています。

---

## 5. 0で連続なら有界

逆に、線形汎関数が0で連続だとします。

$\varepsilon=1$ に対し、ある $\delta>0$ が存在して

$$
\|x\|<\delta
\Longrightarrow
|\ell(x)|<1
$$

です。

$x\ne0$ に対して

$$
y=\frac{\delta}{2\|x\|}x
$$

と置けば $\|y\|=\delta/2<\delta$ なので $|\ell(y)|<1$ です。

線形性から

$$
\frac{\delta}{2\|x\|}|\ell(x)|<1
$$

したがって

$$
|\ell(x)|<\frac{2}{\delta}\|x\|.
$$

よって有界です。

つまり

$$
\boxed{
\text{線形汎関数では}
\quad
\text{連続}\Longleftrightarrow\text{有界}
}
$$

です。

---

## 6. 双対空間

<a id="def-f0-02c2-dual-space"></a>

<!-- formal-statement-start -->
> **定義（双対空間）**  
> ノルム空間 $X$ 上の連続線形汎関数全体を

$$
X^*
$$

> と書き、$X$ の **双対空間** といいます。
<!-- formal-statement-end -->

### 6.1 なぜ $X^*$ 自体がベクトル空間なのか

$\ell,m\in X^*$、$a,b\in\mathbb R$ とします。汎関数の和とスカラー倍を、各 $x\in X$ に対して

$$
(a\ell+bm)(x):=a\ell(x)+bm(x)
$$

と **点ごとに** 定めます。

まず $\ell,m$ は線形なので、任意の $x,y\in X$ と $\alpha,\beta\in\mathbb R$ に対して

$$
\begin{aligned}
(a\ell+bm)(\alpha x+\beta y)
&=a\ell(\alpha x+\beta y)+bm(\alpha x+\beta y)\\
&=\alpha(a\ell+bm)(x)+\beta(a\ell+bm)(y).
\end{aligned}
$$

したがって $a\ell+bm$ も線形です。

さらに $\ell,m$ は連続線形汎関数なので、ある有限な $M,N$ が存在して

$$
|\ell(x)|\le M\|x\|,
\qquad
|m(x)|\le N\|x\|
$$

がすべての $x$ で成り立ちます。よって

$$
\begin{aligned}
|(a\ell+bm)(x)|
&\le |a|\,|\ell(x)|+|b|\,|m(x)|\\
&\le (|a|M+|b|N)\|x\|.
\end{aligned}
$$

したがって $a\ell+bm$ も連続です。つまり

$$
\ell,m\in X^*,\ a,b\in\mathbb R
\Longrightarrow
a\ell+bm\in X^*.
$$

零汎関数 $0(x)=0$ も $X^*$ に入り、$\ell$ の加法逆元は $-\ell$ です。残りのベクトル空間の公理は実数の演算から点ごとに従います。したがって

$$
\boxed{X^*\text{ はベクトル空間}}
$$

です。

<!-- definition-example-start: def-f0-02c2-dual-space -->
**定義の確認：$X^*$ の中で足し算する**

$X=\mathbb R^2$ にEuclidノルムを入れ、

$$
\ell_1(x_1,x_2)=x_1,
\qquad
\ell_2(x_1,x_2)=x_1-3x_2
$$

とします。どちらも連続線形汎関数なので $\ell_1,\ell_2\in X^*$ です。そして

$$
(2\ell_1-\ell_2)(x_1,x_2)=x_1+3x_2
$$

も連続線形汎関数です。$X^*$ の「ベクトル」は数の組ではなく **汎関数そのもの** で、和やスカラー倍は入力 $x$ ごとに値を足したり掛けたりして作ります。
<!-- definition-example-end -->

### 6.2 双対ノルム

$\ell\in X^*$ に対して

$$
\boxed{
\|\ell\|_{X^*}
=\sup_{\|x\|\le1}|\ell(x)|
}
$$

と定めます。

$\ell$ は有界なので、ある $M<\infty$ が存在して $|\ell(x)|\le M\|x\|$ です。特に $\|x\|\le1$ なら $|\ell(x)|\le M$ なので、上のsupremumは有限です。

これが本当にノルムであることも確認できます。

- $\|\ell\|_{X^*}\ge0$ は絶対値から明らかです。
- $\|c\ell\|_{X^*}=|c|\,\|\ell\|_{X^*}$ は絶対値の斉次性から従います。
- $|(\ell+m)(x)|\le|\ell(x)|+|m(x)|$ を $\|x\|\le1$ 上でsupremumに取れば

$$
\|\ell+m\|_{X^*}
\le\|\ell\|_{X^*}+\|m\|_{X^*}.
$$

- $\|\ell\|_{X^*}=0$ なら、任意の $x\ne0$ に対して $u=x/\|x\|$ と置くと $\|u\|=1$ なので $|\ell(u)|=0$ です。従って $\ell(x)=\|x\|\ell(u)=0$。$x=0$ でも $\ell(0)=0$ なので $\ell$ は零汎関数です。

よって双対ノルムは確かに $X^*$ 上のノルムです。

### 6.3 なぜ $|\ell(x)|\le\|\ell\|_{X^*}\|x\|$ なのか

$x=0$ なら両辺とも0なので明らかです。

$x\ne0$ とします。このとき

$$
u=\frac{x}{\|x\|}
$$

と置けば $\|u\|=1$ です。双対ノルムの定義は「単位球上の $|\ell|$ の上限」なので

$$
|\ell(u)|\le\|\ell\|_{X^*}.
$$

一方、$x=\|x\|u$ と線形性から

$$
|\ell(x)|
=\|x\|\,|\ell(u)|.
$$

従って

$$
\boxed{
|\ell(x)|\le\|\ell\|_{X^*}\|x\|
}
$$

です。

つまり単位球上で得た上界を、任意の $x$ を単位ベクトルへ正規化することで全空間へ拡大しています。逆に、ある $M$ が

$$
|\ell(x)|\le M\|x\|
$$

をすべての $x$ で満たすなら、$\|x\|\le1$ 上で $|\ell(x)|\le M$ なので $\|\ell\|_{X^*}\le M$ です。従って $\|\ell\|_{X^*}$ はこの種の評価に使える **最小の定数** です。

---

## 7. 有限次元の双対ノルム

$X=\mathbb R^p$ にEuclidノルムを入れ、

$$
\ell_a(x)=a^{\mathsf T}x
$$

とします。

Cauchy--Schwarzより

$$
|a^{\mathsf T}x|
\le\|a\|_2\|x\|_2.
$$

$x=a/\|a\|_2$ を選べば等号を達成するので

$$
\boxed{
\|\ell_a\|_{(\mathbb R^p)^*}=\|a\|_2
}
$$

です。

ここでも「汎関数の長さ」と「係数ベクトルの長さ」が一致しています。

---

## 8. 関数空間上の具体例：積分汎関数

$X=C([0,1])$ にsupノルムを入れ、

$$
\ell(f)=\int_0^1f(t)\,dt
$$

とします。

線形性は積分の線形性から明らかです。

また

$$
|\ell(f)|
\le\int_0^1|f(t)|\,dt
\le\|f\|_\infty
$$

なので連続です。

したがって

$$
\ell\in C([0,1])^*.
$$

さらに $f\equiv1$ なら $\|f\|_\infty=1$ かつ $\ell(f)=1$ なので、前節の双対ノルムの定義から

$$
\|\ell\|_{C([0,1])^*}=1
$$

です。

---

## 9. 評価汎関数

<a id="def-f0-02c2-evaluation-functional"></a>

<!-- formal-statement-start -->
> **定義（評価汎関数）**  
> 関数空間上で点 $x$ を固定し、各関数 $f$ にその点での値を対応させる汎関数

$$
\delta_x(f)=f(x)
$$

> を **評価汎関数** といいます。
<!-- formal-statement-end -->

$C([0,1])$ にsupノルムを入れた場合

$$
|\delta_x(f)|=|f(x)|\le\|f\|_\infty
$$

なので連続です。

定数関数 $f\equiv1$ で等号を達成するため

$$
\|\delta_x\|=1.
$$

<!-- definition-example-start: def-f0-02c2-linear-functional, def-f0-02c2-dual-space, def-f0-02c2-evaluation-functional -->
**定義の確認：積分と点評価は双対空間の元になる**

ここまでの三つの定義を同じ関数空間でまとめて確認します。$X=C([0,1])$ にsupノルムを入れ、

$$
\ell(f)=\int_0^1f(t)\,dt
$$

とします。積分の線形性から $\ell(af+bg)=a\ell(f)+b\ell(g)$ で、さらに

$$
|\ell(f)|\le\|f\|_\infty
$$

なので $\ell$ は連続線形汎関数、すなわち $\ell\in X^*$ です。

また $x=1/2$ を固定した評価汎関数

$$
\delta_{1/2}(f)=f(1/2)
$$

も

$$
|\delta_{1/2}(f)|\le\|f\|_\infty
$$

を満たすため連続で、$\delta_{1/2}\in X^*$ です。

さらに

$$
(\ell+2\delta_{1/2})(f)
=\int_0^1f(t)\,dt+2f(1/2)
$$

も $X^*$ の元です。これは6.1で示した「双対空間はベクトル空間」という事実の具体例にもなっています。
<!-- definition-example-end -->

---

## 10. $L^2$ では一点評価がうまくいかない

$L^2([0,1])$ では、測度0の集合上だけ異なる関数を同じ元として扱います。

したがって「$f(x)$ を取り出す」という操作は、そもそも同値類の代表元の選び方で変わります。

さらに代表元を固定しても、$L^2$ ノルムだけから一点の値を制御することはできません。

例えば幅 $1/n$、高さ $\sqrt n$ 程度の細い山を $x$ の周辺に作れば、$L^2$ ノルムを一定程度に保ったまま点 $x$ の値を大きくできます。

したがって一般の $L^2$ では

$$
\boxed{
\text{点評価 }f\mapsto f(x)
\text{ は連続線形汎関数ではない}
}
$$

と考える必要があります。

後でRKHSを定義するとき、「点評価が連続であるHilbert関数空間」という条件がまさにここを修復します。

---

<a id="ref-riesz-representation"></a>

## 11. Hilbert空間では双対を元の空間のベクトルで表せる

Hilbert空間 $H$ では、驚くほど有限次元に近い状況が戻ってきます。

**Riesz表現定理** は次を述べます。

> 任意の $\ell\in H^*$ に対し、一意な $g\in H$ が存在して
>
$$
\boxed{\ell(x)=\langle g,x\rangle_H}
\qquad(\forall x\in H)
$$
>
> と書ける。

さらに

$$
\boxed{
\|\ell\|_{H^*}=\|g\|_H
}
$$

です。

つまりHilbert空間では

$$
\boxed{
H^*\cong H
}
$$

という等長同型があります。

ただし「同じ集合」という意味ではなく、**内積を使って自然に対応付けられる**という意味です。

---

<!-- round3-hidden-proof-fixed -->
## 12. 証明の見取り図：kernelの直交方向が代表ベクトルになる

$0\ne\ell\in H^*$ に対して

```text
M = ker ell を取る
  ↓
閉部分空間 M へ射影し、M^perp の非零方向 u を1本得る
  ↓
任意の x から ell(x)/ell(u) 倍の u を引くと M に入る
  ↓
u ⟂ M を使って ell(x)=<g,x> の形を得る
  ↓
Cauchy--Schwarzで ||ell||=||g||、内積の正定値性で一意性
```

つまり「汎関数が0になる超平面」と、その超平面に直交する1本の方向を作れば、汎関数全体を一つのベクトルで表せます。

<!-- proof-start -->
## 12. Riesz表現定理の証明：0汎関数の場合

$\ell=0$ なら $g=0$ とすれば終わりです。

以下 $\ell\ne0$ とします。

---

## 13. kernelを取る

$$
M=\ker\ell
=\{x\in H:\ell(x)=0\}
$$

と置きます。

$\ell$ は連続なので $M$ は閉集合です。さらに線形汎関数のkernelなので閉線形部分空間です。

$\ell\ne0$ なので、$y\in H$ を

$$
\ell(y)\ne0
$$

となるように取れます。

[F0-02C1AのHilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)から

$$
y=P_My+u,
\qquad
u:=y-P_My\in M^\perp.
$$

$y\notin M$ なので $u\ne0$ です。

---

## 14. 直交方向は1本で十分

任意の $x\in H$ に対して

$$
\alpha=\frac{\ell(x)}{\ell(u)}
$$

と置きます。

すると

$$
\ell(x-\alpha u)=0
$$

なので

$$
x-\alpha u\in M.
$$

$u\in M^\perp$ だから

$$
\langle u,x-\alpha u\rangle=0.
$$

したがって

$$
\langle u,x\rangle
=\alpha\|u\|^2
=\frac{\ell(x)}{\ell(u)}\|u\|^2.
$$

よって

$$
\ell(x)
=\left\langle
\frac{\ell(u)}{\|u\|^2}u,
 x
\right\rangle.
$$

したがって

$$
\boxed{
g=\frac{\ell(u)}{\|u\|^2}u}
$$

と取れます。

---

## 15. 一意性

もし $g_1,g_2$ がともに

$$
\ell(x)=\langle g_i,x\rangle
$$

を満たすなら

$$
\langle g_1-g_2,x\rangle=0
\qquad(\forall x\in H).
$$

$x=g_1-g_2$ と置けば

$$
\|g_1-g_2\|^2=0
$$

なので $g_1=g_2$ です。

---

## 16. ノルムも一致する

Cauchy--Schwarzから

$$
|\ell(x)|
=|\langle g,x\rangle|
\le\|g\|\|x\|
$$

なので

$$
\|\ell\|\le\|g\|.
$$

$g\ne0$ なら $x=g/\|g\|$ を選ぶと

$$
|\ell(x)|=\|g\|
$$

なので

$$
\boxed{\|\ell\|=\|g\|}.
$$
<!-- proof-end -->

---

## 17. なぜRiesz表現が重要なのか

一般のBanach空間では、微分

$$
Df(x)
$$

はまず $X^*$ の元として現れます。

ところがHilbert空間ならRiesz表現により

$$
Df(x)[h]
=\langle \nabla_Hf(x),h\rangle_H
$$

とベクトル表示できます。

つまり有限次元で「微分」と「勾配」をほぼ同じものとして扱えた背景には

$$
\boxed{
\text{内積}
+\text{Riesz表現}
}
$$

があります。

---

## 18. 次の講義

[F0-02C3 Fréchet微分・線形作用素・随伴](../F0_02C3_Frechet微分_線形作用素_随伴/index.md) では、関数そのものを微分します。

有限次元の

$$
\nabla f,
\qquad
J_G,
\qquad
J_G^{\mathsf T}
$$

が、

$$
Df,
\qquad
DG,
\qquad
DG^*
$$

へどう変わるかを追います。

---

## 演習

### F0-02C2-A01 積分汎関数の双対ノルム

- Level: A
- 目安時間: 10分

$X=C([0,1])$ にsupノルムを入れ、

$$
\ell(f)=\int_0^1 f(t)\,dt
$$

とする。$\|\ell\|_{X^*}$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$|\ell(f)|\le\int_0^1|f(t)|\,dt\le\|f\|_\infty$ より、$\|f\|_\infty\le1$ なら $|\ell(f)|\le1$。従って $\|\ell\|\le1$ です。

一方、定数関数 $f\equiv1$ は $\|f\|_\infty=1$ で

$$
\ell(f)=\int_0^1 1\,dt=1
$$

なので、supremumは少なくとも1です。従って

$$
\boxed{\|\ell\|_{X^*}=1}.
$$

#### 本番答案
$|\ell(f)|\le\|f\|_\infty$ から $\|\ell\|\le1$。$f\equiv1$ で $\|f\|_\infty=1$ かつ $\ell(f)=1$ なので等号が達成され、$\|\ell\|=1$。

#### 採点基準（20点）
- 上界 $\|\ell\|\le1$: 8点
- 達成例 $f\equiv1$: 7点
- 結論: 5点
<!-- solution-end -->

### F0-02C2-A02 双対空間がベクトル空間であることの確認

- Level: A
- 目安時間: 10分

$\ell,m\in X^*$ と $a,b\in\mathbb R$ に対し

$$
T=a\ell+bm
$$

と定める。$T\in X^*$ を示せ。また

$$
\|a\ell+bm\|_{X^*}
\le |a|\|\ell\|_{X^*}+|b|\|m\|_{X^*}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$\ell,m$ の線形性から $T$ も線形です。さらに任意の $x\in X$ に対して

$$
\begin{aligned}
|T(x)|
&=|a\ell(x)+bm(x)|\\
&\le |a|\,|\ell(x)|+|b|\,|m(x)|\\
&\le\bigl(|a|\|\ell\|_{X^*}+|b|\|m\|_{X^*}\bigr)\|x\|.
\end{aligned}
$$

従って $T$ は有界、したがって連続なので $T\in X^*$ です。$\|x\|\le1$ として上式のsupremumを取れば、求めるノルム不等式も得られます。

#### 本番答案
$T$ は $\ell,m$ の線形性から線形で、

$$
|T(x)|\le\bigl(|a|\|\ell\|+|b|\|m\|\bigr)\|x\|
$$

より有界、従って $T\in X^*$。単位球上でsupremumを取れば

$$
\|T\|\le|a|\|\ell\|+|b|\|m\|.
$$

#### 採点基準（20点）
- 線形性: 5点
- 有界性評価: 8点
- $T\in X^*$ の結論: 3点
- ノルム不等式: 4点
<!-- solution-end -->

### F0-02C2-A03 評価汎関数のノルム

- Level: A
- 目安時間: 10分

$x_0\in[0,1]$ を固定し、$X=C([0,1])$ にsupノルムを入れる。評価汎関数

$$
\delta_{x_0}(f)=f(x_0)
$$

について $\delta_{x_0}\in X^*$ と $\|\delta_{x_0}\|_{X^*}=1$ を示せ。

<!-- solution-start -->
#### 詳細解答
評価は線形なので $\delta_{x_0}$ は線形です。また

$$
|\delta_{x_0}(f)|=|f(x_0)|\le\sup_{t\in[0,1]}|f(t)|=\|f\|_\infty
$$

より有界で、従って $\delta_{x_0}\in X^*$ かつ $\|\delta_{x_0}\|\le1$ です。定数関数 $f\equiv1$ に対して $\|f\|_\infty=1$ かつ $|\delta_{x_0}(f)|=1$ なので、逆向きの不等式も成り立ちます。従って

$$
\boxed{\|\delta_{x_0}\|_{X^*}=1}.
$$

#### 本番答案
$|\delta_{x_0}(f)|\le\|f\|_\infty$ より連続で $\|\delta_{x_0}\|\le1$。$f\equiv1$ で値1を達成するので $\|\delta_{x_0}\|=1$。

#### 採点基準（20点）
- 線形性: 4点
- 連続性の評価: 7点
- 上界: 4点
- 達成例と結論: 5点
<!-- solution-end -->

### F0-02C2-A04 重み付き積分汎関数

- Level: A
- 目安時間: 12分

$X=C([0,1])$ にsupノルムを入れ、

$$
\ell(f)=\int_0^1 t f(t)\,dt
$$

とする。$\ell\in X^*$ を示し、$\|\ell\|_{X^*}$ を求めよ。

<!-- solution-start -->
#### 詳細解答
積分の線形性から $\ell$ は線形です。また

$$
|\ell(f)|
\le\int_0^1 t|f(t)|\,dt
\le\|f\|_\infty\int_0^1t\,dt
=\frac12\|f\|_\infty.
$$

従って $\ell$ は連続で、$\|\ell\|\le1/2$ です。一方 $f\equiv1$ なら $\|f\|_\infty=1$ かつ

$$
\ell(f)=\int_0^1t\,dt=\frac12.
$$

従って

$$
\boxed{\|\ell\|_{X^*}=\frac12}.
$$

#### 本番答案

$$
|\ell(f)|\le\|f\|_\infty\int_0^1t\,dt=\frac12\|f\|_\infty
$$

より $\ell\in X^*$、$\|\ell\|\le1/2$。$f\equiv1$ で等号を達成するので $\|\ell\|=1/2$。

#### 採点基準（20点）
- 線形性: 3点
- 上界評価: 8点
- 連続性: 3点
- 達成例と結論: 6点
<!-- solution-end -->

### F0-02C2-B01 Riesz表現でkernelへの射影を使う

- Level: B
- 目安時間: 15分

$0\ne\ell\in H^*$ とし $M=\ker\ell$ とする。$y\notin M$ を取り、$u=y-P_My$ と置く。任意の $x\in H$ に対し

$$
\ell(x)=\left\langle \frac{\ell(u)}{\|u\|^2}u,x\right\rangle
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$u\in M^\perp$ です。また $P_My\in M$ なので

$$
\ell(u)=\ell(y-P_My)=\ell(y)\ne0.
$$

任意の $x\in H$ に対して

$$
\alpha=\frac{\ell(x)}{\ell(u)}
$$

と置けば

$$
\ell(x-\alpha u)=\ell(x)-\alpha\ell(u)=0
$$

なので $x-\alpha u\in M$ です。$u\perp M$ より

$$
0=\langle u,x-\alpha u\rangle
=\langle u,x\rangle-\alpha\|u\|^2.
$$

従って

$$
\langle u,x\rangle
=\frac{\ell(x)}{\ell(u)}\|u\|^2,
$$

これを整理すると所望の表示を得ます。

#### 本番答案
$u\in M^\perp$ かつ $\ell(u)=\ell(y)\ne0$。$\alpha=\ell(x)/\ell(u)$ とすると $x-\alpha u\in M$。従って $u\perp M$ より

$$
\langle u,x\rangle=\alpha\|u\|^2
$$

であり、整理して表示式を得る。

#### 採点基準（20点）
- $u\in M^\perp$ と $\ell(u)\ne0$: 4点
- $x-\alpha u\in M$: 6点
- 直交性の利用: 6点
- 表示式: 4点
<!-- solution-end -->

### F0-02C2-B02 $L^2$ の一点評価が双対空間の元にならない理由

- Level: B
- 目安時間: 15分

$L^2([0,1])$ 上で形式的に

$$
T(f)=f(1/2)
$$

と書いたとする。

1. なぜこれは $L^2$ の元に対する写像としてwell-definedでないのか。
2. 代表元を連続関数に限定して考えても、$L^2$ ノルムに関して一点評価を一様に制御できないことを、具体的な連続関数列を作って示せ。

<!-- solution-start -->
#### 詳細解答
1. $L^2$ の元は関数そのものではなく、a.e.一致で割った同値類です。例えば0関数と、$t=1/2$ でだけ値1を取りそれ以外で0となる関数はa.e.一致するので同じ $L^2$ 元ですが、点 $1/2$ での値は0と1で異なります。従って同値類から一点の値は決まりません。

2. 例えば

$$
f_n(t)=\sqrt n\,\max\{1-n|t-1/2|,0\}
$$

と置きます。これは $1/2$ を頂点とする幅 $2/n$ の三角形で、

$$
f_n(1/2)=\sqrt n\to\infty.
$$

一方、変数変換 $s=n(t-1/2)$ により

$$
\begin{aligned}
\|f_n\|_2^2
&=n\int_{1/2-1/n}^{1/2+1/n}(1-n|t-1/2|)^2\,dt\\
&=\int_{-1}^{1}(1-|s|)^2\,ds
=\frac23.
\end{aligned}
$$

従って $\|f_n\|_2$ は一定なのに点評価は無限大へ発散します。よって有限な $C$ で

$$
|f(1/2)|\le C\|f\|_2
$$

をすべての連続関数に対して満たすことはできません。

#### 本番答案
$L^2$ はa.e.同値類なので一点の値は代表元で変わり、点評価はwell-definedでない。さらに

$$
f_n(t)=\sqrt n\max\{1-n|t-1/2|,0\}
$$

なら $f_n(1/2)=\sqrt n\to\infty$ だが $\|f_n\|_2^2=2/3$。従って $L^2$ ノルムでは一点評価を有界にできない。

#### 採点基準（20点）
- a.e.同値類の指摘: 6点
- well-definedでない具体例: 4点
- 連続関数列の構成: 5点
- $L^2$ ノルム評価と結論: 5点
<!-- solution-end -->

### F0-02C2-B03 $\ell^1$ 型ノルムに対する双対ノルム

- Level: B
- 目安時間: 18分

$X=\mathbb R^p$ に

$$
\|x\|_1=\sum_{j=1}^p|x_j|
$$

を入れ、$a\in\mathbb R^p$ に対して

$$
\ell_a(x)=a^{\mathsf T}x
$$

とする。双対ノルムが

$$
\boxed{
\|\ell_a\|_{X^*}=\|a\|_\infty:=\max_j|a_j|
}
$$

であることを示せ。

<!-- solution-start -->
#### 詳細解答
任意の $x$ に対して

$$
|a^{\mathsf T}x|
\le\sum_{j=1}^p|a_j||x_j|
\le\|a\|_\infty\sum_{j=1}^p|x_j|
=\|a\|_\infty\|x\|_1.
$$

従って $\|\ell_a\|_{X^*}\le\|a\|_\infty$ です。

次に $k$ を $|a_k|=\|a\|_\infty$ となる添字とし、$a_k\ne0$ なら

$$
x=\operatorname{sgn}(a_k)e_k
$$

と取ります。このとき $\|x\|_1=1$ で

$$
|\ell_a(x)|=|a_k|=\|a\|_\infty.
$$

$a=0$ の場合は両辺0です。従って等号が成り立ちます。

#### 本番答案

$$
|a^Tx|\le\|a\|_\infty\|x\|_1
$$

より $\|\ell_a\|\le\|a\|_\infty$。$|a_k|=\|a\|_\infty$ を満たす $k$ を取り、$x=\operatorname{sgn}(a_k)e_k$ とすれば $\|x\|_1=1$ かつ $|\ell_a(x)|=\|a\|_\infty$。従って等号。

#### 採点基準（20点）
- 上界評価: 8点
- 最大成分の選択: 4点
- 等号達成ベクトル: 5点
- 結論: 3点
<!-- solution-end -->

### F0-02C2-C01 同じ積分汎関数でもノルム空間が変わると双対ノルムが変わる

- Level: C
- 目安時間: 25分

同じ式

$$
\ell(f)=\int_0^1 t f(t)\,dt
$$

を考える。

1. $X=C([0,1])$ にsupノルムを入れたとき、$\|\ell\|_{X^*}=1/2$ を示せ。
2. $H=L^2([0,1])$ としたとき、Riesz表現定理における代表元 $g$ を求め、$\|\ell\|_{H^*}$ を求めよ。
3. 1と2のノルムが異なる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
1. A04と同様に

$$
|\ell(f)|\le\|f\|_\infty\int_0^1t\,dt
=\frac12\|f\|_\infty
$$

で、$f\equiv1$ が等号を達成するため

$$
\|\ell\|_{C([0,1])^*}=\frac12.
$$

2. $L^2$ の標準内積を

$$
\langle g,f\rangle=\int_0^1g(t)f(t)\,dt
$$

とすれば

$$
\ell(f)=\langle g,f\rangle
$$

となる代表元は

$$
g(t)=t
$$

です。Riesz表現定理より

$$
\|\ell\|_{H^*}=\|g\|_2
=\left(\int_0^1t^2\,dt\right)^{1/2}
=\frac1{\sqrt3}.
$$

3. 双対ノルムは単に写像の式だけで決まるのではなく、定義域に入れたノルムを使って

$$
\sup_{\|f\|\le1}|\ell(f)|
$$

を取って決まります。supノルムの単位球と $L^2$ ノルムの単位球は異なるため、同じ積分式でも双対ノルムは異なります。

#### 本番答案
$C([0,1])$ では $|\ell(f)|\le(1/2)\|f\|_\infty$、$f\equiv1$ で達成するので $\|\ell\|=1/2$。$L^2$ では $g(t)=t$ がRiesz代表元で、

$$
\|\ell\|=\|g\|_2=(\int_0^1t^2dt)^{1/2}=1/\sqrt3.
$$

両者が違うのは、双対ノルムが定義域のノルム、すなわち単位球に依存するからである。

#### 採点基準（30点）
- supノルム側の上界と達成: 8点
- Riesz代表元 $g=t$: 7点
- $L^2$ 側のノルム計算: 8点
- 定義域のノルム依存の説明: 7点
<!-- solution-end -->

---

## 章末チェック

- 線形汎関数を定義し、スカラー値だが線形でない写像と区別できる。
- 線形汎関数の連続性と有界性が同値であることを説明できる。
- $X^*$ が点ごとの和・スカラー倍でベクトル空間になる理由を示せる。
- 双対ノルムが有限でノルム公理を満たすことを説明できる。
- $x/\|x\|$ への正規化から $|\ell(x)|\le\|\ell\|_{X^*}\|x\|$ を導ける。
- $C([0,1])$ の積分汎関数と点評価が双対空間の元になることを示せる。
- $L^2$ では一点評価が一般に使えない理由を、well-defined性と有界性の両面から説明できる。
- Riesz表現定理の主張と、射影定理を使った証明の流れを説明できる。
- 双対ノルムが定義域のノルムに依存することを具体例で確認できる。
