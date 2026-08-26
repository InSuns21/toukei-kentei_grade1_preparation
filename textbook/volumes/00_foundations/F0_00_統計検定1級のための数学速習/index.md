# F0-00 統計検定1級のための数学速習

この章は、**統計学の章ではありません**。統計検定1級で必要になる微積分・多変数解析・線形代数を、試験で使う範囲に絞って補修するための章です。

確率密度関数、尤度、推定量、検定などの統計用語は原則として後続章へ送ります。本章では数学そのものを先に整理し、最後に「統計でどこに使うか」だけを対応表で示します。

> **目標**
>
> - 公式を「見たことがある」で終わらせず、短い導出を自力で再現できる。
> - 積分、ヤコビアン、固有値など、1級で計算ミスしやすい箇所を手順化する。
> - 「暗記する公式」と「その場で導出する式」を分ける。

---

# 1. 1級で必要な数学の優先度

| 優先度 | 内容 | 到達目標 |
|---|---|---|
| S | 基本微分、部分積分、置換積分、広義積分、ガウス積分、ガンマ関数、ベータ関数、重積分、ヤコビアン、行列式、逆行列、階数、固有値、二次形式、正定値性 | 公式を見ずに計算できる |
| A | テイラー展開、偏微分、勾配・ヘッセ行列、ラグランジュ未定乗数法、直交行列、射影、シュール補、行列微分 | 標準問題で使える |
| B | 積分記号下の微分、スターリング公式、多変量ガウス積分 | 出たときに導出を追える |

Sは必須です。Aは統計数理・理工学で頻出、Bは発展問題や証明問題で差がつく項目です。

---

# 2. 最重要公式一覧

## 2.1 微分

$$
\frac{d}{dx}x^a=ax^{a-1},
\qquad
\frac{d}{dx}e^{ax}=ae^{ax},
\qquad
\frac{d}{dx}\log x=\frac1x.
$$

$$
(uv)'=u'v+uv',
$$

$$
\left(\frac uv\right)'=\frac{u'v-uv'}{v^2},
$$

$$
\frac{d}{dx}f(g(x))=f'(g(x))g'(x).
$$

## 2.2 積分

$$
\int x^a\,dx=\frac{x^{a+1}}{a+1}+C
\qquad(a≠-1),
$$

$$
\int \frac{dx}{x}=\log|x|+C,
$$

$$
\int e^{ax}\,dx=\frac1a e^{ax}+C
\qquad(a≠0).
$$

部分積分は

$$
\boxed{\int u\,dv=uv-\int v\,du}.
$$

置換積分は $u=g(x)$ として

$$
\boxed{\int f(g(x))g'(x)\,dx=\int f(u)\,du}.
$$

## 2.3 広義積分の基本判定

$$
\boxed{
\int_0^1x^a\,dx<\infty
\Longleftrightarrow a>-1
},
$$

$$
\boxed{
\int_1^\infty x^{-p}\,dx<\infty
\Longleftrightarrow p>1
}.
$$

端点付近の積分可能性は、まずこの2本へ比較できないか考えます。

## 2.4 ガウス積分

$$
\boxed{
\int_{-\infty}^{\infty}e^{-x^2}\,dx=\sqrt\pi
}.
$$

$a>0$ なら尺度変換から

$$
\boxed{
\int_{-\infty}^{\infty}e^{-ax^2}\,dx
=\sqrt{\frac\pi a}
}.
$$

さらに $b\in\mathbb R$ なら平行移動して

$$
\int_{-\infty}^{\infty}e^{-a(x-b)^2}\,dx
=\sqrt{\frac\pi a}.
$$

## 2.5 ガンマ関数

$$
\boxed{
\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}\,dx
}
\qquad(s>0),
$$

$$
\boxed{\Gamma(s+1)=s\Gamma(s)},
$$

$$
\Gamma(n)=(n-1)!,
\qquad
\Gamma\left(\frac12\right)=\sqrt\pi.
$$

また $\beta>0$ なら

$$
\boxed{
\int_0^\infty x^{s-1}e^{-\beta x}\,dx
=\frac{\Gamma(s)}{\beta^s}
}.
$$

## 2.6 ベータ関数

$$
\boxed{
B(a,b)=\int_0^1x^{a-1}(1-x)^{b-1}\,dx
}
\qquad(a,b>0),
$$

$$
\boxed{
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
}.
$$

対称性

$$
B(a,b)=B(b,a)
$$

も頻繁に使います。

## 2.7 ヤコビアン

二変数変換

$$
(x,y)=(x(u,v),y(u,v))
$$

に対し

$$
\boxed{
\frac{\partial(x,y)}{\partial(u,v)}
=
\det
\begin{pmatrix}
\partial x/\partial u&\partial x/\partial v\\
\partial y/\partial u&\partial y/\partial v
\end{pmatrix}
}.
$$

積分の変数変換では

$$
\boxed{
dx\,dy
=
\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv
}.
$$

極座標

$$
x=r\cos\theta,
\qquad y=r\sin\theta
$$

では

$$
\boxed{dx\,dy=r\,dr\,d\theta}.
$$

## 2.8 線形代数

$$
(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T},
$$

$$
(AB)^{-1}=B^{-1}A^{-1},
$$

$$
\det(AB)=\det A\det B,
$$

$$
\det(A^{\mathsf T})=\det A.
$$

2次行列

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$

では

$$
\det A=ad-bc,
$$

$$
A^{-1}
=\frac1{ad-bc}
\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
$$

です。逆行列が存在するための必要十分条件は $\det A≠0$ です。

固有値は

$$
\boxed{\det(A-\lambda I)=0}
$$

から求めます。

実対称行列なら

$$
\boxed{A=Q\Lambda Q^{\mathsf T}},
\qquad
Q^{\mathsf T}Q=I
$$

と直交対角化できます。

---

# 3. 微分速習

## 3.1 停留点は極値の候補にすぎない

内部点 $x_0$ で極値を取るなら、微分可能な場合

$$
f'(x_0)=0
$$

が必要です。ただし、これだけでは最大・最小を保証しません。

$$
f'(x_0)=0,\quad f''(x_0)>0
$$

なら狭義局所最小、

$$
f'(x_0)=0,\quad f''(x_0)<0
$$

なら狭義局所最大です。

## 3.2 偏微分・勾配・ヘッセ行列

$g:\mathbb R^p\to\mathbb R$ に対し、勾配を成分表示で

$$
\operatorname{grad}g(\boldsymbol x)
=
\begin{pmatrix}
\partial g/\partial x_1\\
\vdots\\
\partial g/\partial x_p
\end{pmatrix}
$$

と書きます。ヘッセ行列は

$$
H_g(\boldsymbol x)
=
\left(
\frac{\partial^2g}{\partial x_i\partial x_j}
\right)_{i,j}
$$

です。

内部停留点で $H_g$ が正定値なら狭義局所最小、負定値なら狭義局所最大です。

## 3.3 テイラー展開

1級で特に重要なのは

$$
e^x=1+x+\frac{x^2}{2}+O(x^3),
$$

$$
\log(1+x)=x-\frac{x^2}{2}+O(x^3),
$$

$$
(1+x)^a
=1+ax+\frac{a(a-1)}2x^2+O(x^3).
$$

一般には

$$
f(x+h)
=f(x)+f'(x)h+\frac12f''(x)h^2+o(h^2).
$$

多変数では

$$
g(\boldsymbol x+\boldsymbol h)
=g(\boldsymbol x)
+\operatorname{grad}g(\boldsymbol x)^{\mathsf T}\boldsymbol h
+\frac12\boldsymbol h^{\mathsf T}H_g(\boldsymbol x)\boldsymbol h
+o(\|\boldsymbol h\|^2).
$$

## 3.4 ラグランジュ未定乗数法

制約 $g(\boldsymbol x)=c$ の下で $f(\boldsymbol x)$ を極値化するとき、正則な点では

$$
\operatorname{grad}f(\boldsymbol x)
=\lambda\operatorname{grad}g(\boldsymbol x)
$$

を解きます。

例えば $\|\boldsymbol x\|^2=1$ の下で

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
$$

を極値化すると、$A$ が対称なら

$$
2A\boldsymbol x=2\lambda\boldsymbol x,
$$

すなわち

$$
A\boldsymbol x=\lambda\boldsymbol x.
$$

固有値問題が自然に現れる理由です。

---

# 4. 積分速習

## 4.1 部分積分

$$
\int u\,dv=uv-\int v\,du.
$$

多項式と指数関数の積では、多項式を微分する側に置くのが基本です。$a>0$ なら

$$
\begin{aligned}
\int_0^\infty xe^{-ax}\,dx
&=\left[-\frac{x}{a}e^{-ax}\right]_0^\infty
+\frac1a\int_0^\infty e^{-ax}\,dx\\
&=\frac1{a^2}.
\end{aligned}
$$

境界項 $xe^{-ax}\to0$ も確認します。

## 4.2 置換積分

$$
\int_0^\infty x^m e^{-\beta x}\,dx
$$

で $t=\beta x$ と置けば

$$
x=\frac t\beta,
\qquad dx=\frac{dt}{\beta}
$$

なので

$$
\int_0^\infty x^m e^{-\beta x}\,dx
=\frac1{\beta^{m+1}}
\int_0^\infty t^m e^{-t}\,dt.
$$

変数だけでなく $dx$ も変えることが重要です。

## 4.3 広義積分

端点が無限大、または被積分関数が発散する場合は極限で定義します。

$$
\int_0^1x^a\,dx
=
\lim_{\varepsilon\downarrow0}
\int_\varepsilon^1x^a\,dx.
$$

$a≠-1$ なら

$$
\int_\varepsilon^1x^a\,dx
=\frac{1-\varepsilon^{a+1}}{a+1}.
$$

従って

$$
\int_0^1x^a\,dx<\infty
\Longleftrightarrow a>-1.
$$

無限遠では

$$
\int_1^R x^{-p}\,dx
=\frac{R^{1-p}-1}{1-p}
$$

から

$$
\int_1^\infty x^{-p}\,dx<\infty
\Longleftrightarrow p>1.
$$

## 4.4 積分記号下の微分

条件が満たされれば

$$
\frac{d}{d\theta}
\int f(x,\theta)\,dx
=
\int \frac{\partial}{\partial\theta}f(x,\theta)\,dx
$$

と微分と積分を交換できます。

ただし「微分できるから交換できる」わけではありません。無限区間では、微分後の被積分関数を可積分関数で一様に支配できるかなどの条件確認が必要です。

---

# 5. ガウス積分：重積分・極座標・ヤコビアンの総合例

## 5.1 基本ガウス積分

$$
I=\int_{-\infty}^{\infty}e^{-x^2}\,dx
$$

と置きます。被積分関数は非負なので

$$
I^2
=\int_{-\infty}^{\infty}
\int_{-\infty}^{\infty}
 e^{-(x^2+y^2)}\,dx\,dy.
$$

極座標

$$
x=r\cos\theta,
\qquad y=r\sin\theta
$$

へ変換します。ヤコビアンは

$$
\begin{aligned}
\frac{\partial(x,y)}{\partial(r,\theta)}
&=
\det
\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}\\
&=r(\cos^2\theta+\sin^2\theta)\\
&=r.
\end{aligned}
$$

したがって

$$
\begin{aligned}
I^2
&=\int_0^{2\pi}\int_0^\infty
 e^{-r^2}r\,dr\,d\theta\\
&=2\pi\left[-\frac12e^{-r^2}\right]_0^\infty\\
&=\pi.
\end{aligned}
$$

$I>0$ なので

$$
\boxed{I=\sqrt\pi}.
$$

この1本で、2重積分・極座標・ヤコビアンの意味が一度につながります。

## 5.2 係数付きガウス積分

$a>0$ とし $u=\sqrt a\,x$ と置けば

$$
\begin{aligned}
\int_{-\infty}^{\infty}e^{-ax^2}\,dx
&=\frac1{\sqrt a}
\int_{-\infty}^{\infty}e^{-u^2}\,du\\
&=\boxed{\sqrt{\frac\pi a}}.
\end{aligned}
$$

## 5.3 $x^2e^{-ax^2}$ 型

$$
F(a)=\int_{-\infty}^{\infty}e^{-ax^2}\,dx
=\sqrt\pi a^{-1/2}
$$

を $a$ で微分すると

$$
F'(a)
=-\int_{-\infty}^{\infty}x^2e^{-ax^2}\,dx
=-\frac{\sqrt\pi}{2}a^{-3/2}.
$$

従って

$$
\boxed{
\int_{-\infty}^{\infty}x^2e^{-ax^2}\,dx
=\frac{\sqrt\pi}{2a^{3/2}}
}.
$$

---

# 6. 重積分とヤコビアン

## 6.1 まず領域を書く

長方形領域

$$
D=[a,b]\times[c,d]
$$

なら

$$
\iint_D f(x,y)\,dx\,dy
=
\int_a^b\int_c^d f(x,y)\,dy\,dx.
$$

三角形領域

$$
D=\{(x,y):0<x<1,\ 0<y<1-x\}
$$

なら

$$
\iint_D f(x,y)\,dx\,dy
=
\int_0^1\int_0^{1-x}f(x,y)\,dy\,dx.
$$

積分計算より先に領域を不等式で書く習慣をつけます。

## 6.2 フビニの定理とトネリの定理

絶対可積分

$$
\iint |f(x,y)|\,dx\,dy<\infty
$$

なら積分順序を交換できます。

一方、$f(x,y)\ge0$ なら、積分値が無限大になる可能性を含めて反復積分を扱えます。ガウス積分では被積分関数が非負なので、この点が扱いやすくなっています。

## 6.3 一般の変数変換

滑らかな一対一変換

$$
T:(u,v)\mapsto(x(u,v),y(u,v))
$$

でヤコビアンが0でない領域では

$$
\iint_{T(D)}f(x,y)\,dx\,dy
=
\iint_D
f(x(u,v),y(u,v))
\left|
\frac{\partial(x,y)}{\partial(u,v)}
\right|du\,dv.
$$

絶対値が必要なのは、行列式の符号は向きの反転を表しますが、面積倍率は非負だからです。

## 6.4 極座標

$$
x=r\cos\theta,
\qquad y=r\sin\theta
$$

では

$$
\left|
\frac{\partial(x,y)}{\partial(r,\theta)}
\right|=r.
$$

従って

$$
dx\,dy=r\,dr\,d\theta.
$$

円板 $x^2+y^2\le R^2$ は

$$
0\le r\le R,
\qquad 0\le\theta<2\pi
$$

という長方形領域になります。

## 6.5 和と比の変換

$$
u=x+y,
\qquad
v=\frac{x}{x+y}
$$

なら逆変換は

$$
x=uv,
\qquad y=u(1-v).
$$

ヤコビアンは

$$
\begin{aligned}
\frac{\partial(x,y)}{\partial(u,v)}
&=
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}\\
&=-u.
\end{aligned}
$$

$x>0,y>0$ なら $u>0$ なので面積倍率は $u$、像は

$$
u>0,
\qquad 0<v<1.
$$

ヤコビアンだけでなく、**逆変換と像の範囲**を必ずセットで求めます。

---

# 7. ガンマ関数

## 7.1 定義と収束

$$
\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}\,dx.
$$

$x\to0$ では $x^{s-1}$ 型なので $s>0$ が必要です。$x\to\infty$ では指数関数 $e^{-x}$ が多項式より速く減衰するので収束します。

## 7.2 漸化式

部分積分で

$$
\begin{aligned}
\Gamma(s+1)
&=\int_0^\infty x^s e^{-x}\,dx\\
&=\left[-x^se^{-x}\right]_0^\infty
+s\int_0^\infty x^{s-1}e^{-x}\,dx\\
&=s\Gamma(s).
\end{aligned}
$$

従って

$$
\boxed{\Gamma(s+1)=s\Gamma(s)}.
$$

$\Gamma(1)=1$ から

$$
\Gamma(n)=(n-1)!.
$$

## 7.3 半整数値

$$
\Gamma\left(\frac12\right)
=\int_0^\infty x^{-1/2}e^{-x}\,dx.
$$

$x=t^2$ と置けば $dx=2t\,dt$ なので

$$
\begin{aligned}
\Gamma\left(\frac12\right)
&=2\int_0^\infty e^{-t^2}\,dt\\
&=\sqrt\pi.
\end{aligned}
$$

よって

$$
\Gamma\left(\frac32\right)=\frac12\sqrt\pi,
\qquad
\Gamma\left(\frac52\right)=\frac34\sqrt\pi.
$$

## 7.4 尺度付き積分

$t=\beta x$ と置けば

$$
\begin{aligned}
\int_0^\infty x^{s-1}e^{-\beta x}\,dx
&=\int_0^\infty
\left(\frac t\beta\right)^{s-1}e^{-t}\frac{dt}{\beta}\\
&=\beta^{-s}\Gamma(s).
\end{aligned}
$$

従って

$$
\boxed{
\int_0^\infty x^{s-1}e^{-\beta x}\,dx
=\frac{\Gamma(s)}{\beta^s}
}.
$$

---

# 8. ベータ関数

## 8.1 定義と収束条件

$$
B(a,b)=\int_0^1x^{a-1}(1-x)^{b-1}\,dx.
$$

$x=0$ 付近では $x^{a-1}$、$x=1$ 付近では $(1-x)^{b-1}$ なので

$$
\boxed{a>0,\quad b>0}
$$

が収束条件です。

$x\mapsto1-x$ と置換すれば

$$
B(a,b)=B(b,a).
$$

## 8.2 ベータ関数とガンマ関数の関係

積

$$
\Gamma(a)\Gamma(b)
$$

を2重積分にすると

$$
\Gamma(a)\Gamma(b)
=
\int_0^\infty\int_0^\infty
x^{a-1}y^{b-1}e^{-(x+y)}\,dx\,dy.
$$

ここで

$$
r=x+y,
\qquad u=\frac{x}{x+y}
$$

と置きます。逆変換は

$$
x=ru,
\qquad y=r(1-u),
$$

像は

$$
r>0,
\qquad0<u<1,
$$

ヤコビアンの絶対値は $r$ です。従って

$$
\begin{aligned}
\Gamma(a)\Gamma(b)
&=\int_0^1\int_0^\infty
(ru)^{a-1}[r(1-u)]^{b-1}e^{-r}r\,dr\,du\\
&=\left[
\int_0^1u^{a-1}(1-u)^{b-1}\,du
\right]
\left[
\int_0^\infty r^{a+b-1}e^{-r}\,dr
\right]\\
&=B(a,b)\Gamma(a+b).
\end{aligned}
$$

従って

$$
\boxed{
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
}.
$$

この導出は、**ガンマ関数・ベータ関数・重積分・ヤコビアン**を一本につなぐ重要例です。

## 8.3 整数値

正整数 $m,n$ なら

$$
B(m,n)
=\frac{(m-1)!(n-1)!}{(m+n-1)!}.
$$

例えば

$$
B(2,3)=\frac{1!2!}{4!}=\frac1{12}.
$$

---

# 9. 線形代数速習

## 9.1 ベクトル・内積・ノルム

列ベクトル $\boldsymbol x,\boldsymbol y\in\mathbb R^p$ に対し

$$
\boldsymbol x^{\mathsf T}\boldsymbol y
=\sum_{i=1}^p x_i y_i
$$

を内積、

$$
\|\boldsymbol x\|
=\sqrt{\boldsymbol x^{\mathsf T}\boldsymbol x}
$$

をユークリッドノルムと呼びます。

直交は

$$
\boldsymbol x^{\mathsf T}\boldsymbol y=0
$$

です。

コーシー・シュワルツの不等式は

$$
|\boldsymbol x^{\mathsf T}\boldsymbol y|
\le\|\boldsymbol x\|\,\|\boldsymbol y\|.
$$

## 9.2 行列積の次元

$$
A\in\mathbb R^{m\times n},
\qquad
B\in\mathbb R^{n\times p}
$$

なら

$$
AB\in\mathbb R^{m\times p}.
$$

内側の次元が一致しなければ積は定義できません。行列式で迷ったら最初に次元を書きます。

## 9.3 転置

$$
(A+B)^{\mathsf T}=A^{\mathsf T}+B^{\mathsf T},
$$

$$
(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}.
$$

積の順序が逆になる点が重要です。

## 9.4 行列式・逆行列

2次なら

$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc.
$$

$$
\det(AB)=\det A\det B,
\qquad
\det(A^{\mathsf T})=\det A.
$$

逆行列が存在することと $\det A≠0$ は同値です。

## 9.5 階数と列フルランク

$A\in\mathbb R^{n\times p}$ の列が一次独立なら

$$
\operatorname{rank}(A)=p
$$

で、列フルランクといいます。

列フルランクなら $A^{\mathsf T}A$ は正定値です。実際、$\boldsymbol z≠\boldsymbol0$ に対して

$$
\boldsymbol z^{\mathsf T}A^{\mathsf T}A\boldsymbol z
=\|A\boldsymbol z\|^2>0.
$$

従って $A^{\mathsf T}A$ は可逆です。

## 9.6 固有値・固有ベクトル

$\boldsymbol v≠\boldsymbol0$ が

$$
A\boldsymbol v=\lambda\boldsymbol v
$$

を満たすとき、$\lambda$ が固有値、$\boldsymbol v$ が固有ベクトルです。

固有値は

$$
\det(A-\lambda I)=0
$$

を解いて求めます。

2次行列なら検算として

$$
\lambda_1+\lambda_2=\operatorname{tr}(A),
\qquad
\lambda_1\lambda_2=\det A
$$

が使えます。

## 9.7 実対称行列と直交対角化

$A^{\mathsf T}=A$ なら、固有値は実数で、互いに直交する単位固有ベクトルから基底を作れます。従って

$$
\boxed{A=Q\Lambda Q^{\mathsf T}}
$$

と書けます。$Q$ は直交行列なので

$$
Q^{\mathsf T}Q=I,
\qquad Q^{-1}=Q^{\mathsf T}
$$

です。

## 9.8 二次形式

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
$$

を二次形式と呼びます。$A$ が実対称なら

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
\boldsymbol z=Q^{\mathsf T}\boldsymbol x
$$

として

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_{i=1}^p\lambda_i z_i^2.
$$

従って二次形式の符号や最大最小は固有値へ帰着します。

## 9.9 正定値・半正定値

実対称行列 $A$ が正定値とは

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x>0
\qquad(\boldsymbol x≠\boldsymbol0)
$$

となることです。

半正定値とは

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x\ge0
$$

です。

実対称行列では

$$
\boxed{
A\text{ が正定値}
\Longleftrightarrow
\text{全固有値が正}
}.
$$

2次対称行列

$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

なら

$$
\boxed{a>0,\qquad ac-b^2>0}
$$

が正定値の必要十分条件です。

## 9.10 射影行列

列フルランクな $A\in\mathbb R^{n\times p}$ に対し

$$
P=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
$$

と置くと

$$
P^{\mathsf T}=P,
\qquad P^2=P.
$$

従って $P$ は $\operatorname{col}(A)$ への直交射影行列です。

## 9.11 シュール補

ブロック行列

$$
M=\begin{pmatrix}A&B\\C&D\end{pmatrix}
$$

で $D$ が可逆なとき

$$
S=A-BD^{-1}C
$$

を $D$ に関するシュール補と呼びます。

ブロック消去から

$$
\boxed{
\det M
=\det D\,\det(A-BD^{-1}C)
}
$$

を得ます。

---

# 10. 行列微分の最小公式集

列ベクトル $\boldsymbol x$ を変数とすると

$$
\operatorname{grad}_{\boldsymbol x}
(\boldsymbol a^{\mathsf T}\boldsymbol x)
=\boldsymbol a,
$$

$$
\boxed{
\operatorname{grad}_{\boldsymbol x}
(\boldsymbol x^{\mathsf T}A\boldsymbol x)
=(A+A^{\mathsf T})\boldsymbol x
}.
$$

特に $A$ が対称なら

$$
\operatorname{grad}_{\boldsymbol x}
(\boldsymbol x^{\mathsf T}A\boldsymbol x)
=2A\boldsymbol x.
$$

また

$$
\boxed{
\operatorname{grad}_{\boldsymbol x}
\|\boldsymbol y-A\boldsymbol x\|^2
=-2A^{\mathsf T}\boldsymbol y
+2A^{\mathsf T}A\boldsymbol x
}.
$$

発展公式として、可逆な行列 $A(\theta)$ が微分可能なら

$$
\frac{d}{d\theta}\log\det A(\theta)
=\operatorname{tr}
\left(A(\theta)^{-1}A'(\theta)\right).
$$

---

# 11. 多変量ガウス積分

$A$ を $p\times p$ 実対称正定値行列とします。

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p)
$$

と直交対角化し、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と置きます。直交行列なので

$$
|\det Q|=1
$$

で体積要素は変わらず、

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_i\lambda_i z_i^2.
$$

従って

$$
\begin{aligned}
&\int_{\mathbb R^p}
\exp\left(-\frac12\boldsymbol x^{\mathsf T}A\boldsymbol x\right)d\boldsymbol x\\
&=\prod_{i=1}^p
\int_{-\infty}^{\infty}
\exp\left(-\frac{\lambda_i z_i^2}{2}\right)dz_i\\
&=\prod_{i=1}^p\sqrt{\frac{2\pi}{\lambda_i}}\\
&=\boxed{
\frac{(2\pi)^{p/2}}{\sqrt{\det A}}
}.
\end{aligned}
$$

ガウス積分、固有値分解、行列式が一つにつながる総合例です。

---

# 12. 極限・漸近展開の最小セット

## 12.1 基本極限

$$
\lim_{x\to0}\frac{e^x-1}{x}=1,
$$

$$
\lim_{x\to0}\frac{\log(1+x)}x=1,
$$

$$
\lim_{m\to\infty}\left(1+\frac xm\right)^m=e^x.
$$

## 12.2 ランダウ記号

$$
f(x)=O(g(x))
$$

は比 $|f(x)/g(x)|$ が近傍で有界という意味です。

$$
f(x)=o(g(x))
$$

は

$$
\frac{f(x)}{g(x)}\to0
$$

という意味です。

## 12.3 スターリング公式

大きな正整数 $m$ では

$$
\boxed{
m!\sim\sqrt{2\pi m}\left(\frac me\right)^m
}.
$$

組合せ数や分布の近似で使います。厳密証明を暗記する必要はありません。

---

# 13. 何を暗記し、何をその場で導出するか

## 暗記してよい

- $x^a,e^{ax},\log x$ の微分積分。
- 積・商・合成関数の微分。
- 部分積分・置換積分。
- $\int_0^1x^a dx$ と $\int_1^\infty x^{-p}dx$ の収束条件。
- ガウス積分 $\int_{-\infty}^{\infty}e^{-x^2}dx=\sqrt\pi$。
- ガンマ関数・ベータ関数の定義。
- $\Gamma(s+1)=s\Gamma(s)$。
- $B(a,b)=\Gamma(a)\Gamma(b)/\Gamma(a+b)$。
- 2次行列の行列式・逆行列。
- 実対称行列の直交対角化と正定値性の固有値判定。

## 試験中に導出できるようにする

- ガウス積分の極座標による証明。
- 実際のヤコビアン。
- 変換後の領域。
- ガンマ関数の半整数値。
- ベータ関数の具体値。
- 2次行列の固有値・固有ベクトル。
- 二次形式の最大最小。
- 射影行列の対称性・冪等性。

## 無理に暗記しなくてよい

- 複雑なブロック逆行列公式。
- 高階のガウス積分の全一般式。
- 行列微分公式の大全。
- スターリング公式の厳密証明。

---

# 14. 確認問題

## F0M-A01 広義積分

実数 $a$ に対し

$$
\int_0^1x^a\,dx
$$

が有限となる必要十分条件と値を求めよ。

<!-- solution-start -->

### 解答

$\varepsilon>0$ として

$$
\int_\varepsilon^1x^a dx
=\frac{1-\varepsilon^{a+1}}{a+1}
\qquad(a≠-1).
$$

$a>-1$ なら $1/(a+1)$ に収束し、$a<-1$ なら発散します。$a=-1$ では $-\log\varepsilon\to\infty$。従って必要十分条件は

$$
\boxed{a>-1},
$$

値は $1/(a+1)$ です。

<!-- solution-end -->

## F0M-A02 ガンマ関数

$$
\Gamma\left(\frac72\right)
$$

を求めよ。

<!-- solution-start -->

### 解答

$$
\Gamma\left(\frac72\right)
=\frac52\frac32\frac12\Gamma\left(\frac12\right)
=\boxed{\frac{15}{8}\sqrt\pi}.
$$

<!-- solution-end -->

## F0M-A03 ベータ関数

$$
B(3,4)
$$

を求めよ。

<!-- solution-start -->

### 解答

$$
B(3,4)
=\frac{\Gamma(3)\Gamma(4)}{\Gamma(7)}
=\frac{2!3!}{6!}
=\boxed{\frac1{60}}.
$$

<!-- solution-end -->

## F0M-A04 極座標

円板

$$
D=\{(x,y):x^2+y^2\le R^2\}
$$

の面積を極座標変換で求めよ。

<!-- solution-start -->

### 解答

$$
0\le r\le R,
\qquad0\le\theta<2\pi,
\qquad dxdy=r\,drd\theta.
$$

従って

$$
\operatorname{Area}(D)
=\int_0^{2\pi}\int_0^R r\,dr\,d\theta
=\boxed{\pi R^2}.
$$

<!-- solution-end -->

## F0M-A05 ヤコビアン

$$
x=uv,
\qquad y=u(1-v)
$$

のヤコビアンを求めよ。

<!-- solution-start -->

### 解答

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}
=-u.
$$

従って面積倍率は $|u|$、$u>0$ なら $u$ です。

<!-- solution-end -->

## F0M-A06 行列式・逆行列

$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix}
$$

の行列式と逆行列を求めよ。

<!-- solution-start -->

### 解答

$$
\det A=5,
$$

$$
\boxed{
A^{-1}=\frac15
\begin{pmatrix}3&-1\\-1&2\end{pmatrix}
}.
$$

<!-- solution-end -->

## F0M-B01 ガウス積分の変形

$a>0$ とする。

$$
\int_{-\infty}^{\infty}x^2e^{-ax^2}\,dx
$$

を求めよ。

<!-- solution-start -->

### 解答

$$
F(a)=\int_{-\infty}^{\infty}e^{-ax^2}dx
=\sqrt\pi a^{-1/2}
$$

と置きます。積分記号下の微分により

$$
F'(a)
=-\int_{-\infty}^{\infty}x^2e^{-ax^2}dx
=-\frac{\sqrt\pi}{2}a^{-3/2}.
$$

従って

$$
\boxed{
\int_{-\infty}^{\infty}x^2e^{-ax^2}dx
=\frac{\sqrt\pi}{2a^{3/2}}
}.
$$

<!-- solution-end -->

## F0M-B02 ベータ・ガンマ関係のヤコビアン

$$
r=x+y,
\qquad u=\frac{x}{x+y}
$$

の逆変換とヤコビアンの絶対値を求めよ。ただし $x,y>0$ とする。

<!-- solution-start -->

### 解答

$$
x=ru,
\qquad y=r(1-u),
$$

像は $r>0,0<u<1$。ヤコビアンは

$$
\det
\begin{pmatrix}
u&r\\
1-u&-r
\end{pmatrix}
=-r,
$$

従って絶対値は $r$ です。

<!-- solution-end -->

## F0M-B03 固有値と正定値性

$$
A=\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

の固有値を求め、正定値性を判定せよ。

<!-- solution-start -->

### 解答

$$
\det(A-\lambda I)
=(4-\lambda)^2-4
=(\lambda-6)(\lambda-2).
$$

固有値は $6,2$。実対称かつ全固有値が正なので正定値です。

<!-- solution-end -->

## F0M-B04 二次形式の最大化

実対称行列 $A$ の最大固有値を $\lambda_{\max}$ とする。$\|\boldsymbol x\|=1$ の下で

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
$$

の最大値を求めよ。

<!-- solution-start -->

### 解答

$A=Q\Lambda Q^{\mathsf T}$、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と置くと

$$
\sum_i z_i^2=1,
$$

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_i\lambda_i z_i^2
\le\lambda_{\max}.
$$

最大固有値に対応する単位固有ベクトルで等号が成立するので、最大値は $\lambda_{\max}$ です。

<!-- solution-end -->

## F0M-B05 射影行列

列フルランクな $A\in\mathbb R^{n\times p}$ に対して

$$
P=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
$$

が対称かつ冪等であることを示せ。

<!-- solution-start -->

### 解答

$A^{\mathsf T}A$ とその逆行列は対称なので $P^{\mathsf T}=P$。また

$$
\begin{aligned}
P^2
&=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=P.
\end{aligned}
$$

従って直交射影行列です。

<!-- solution-end -->

## F0M-B06 多変量ガウス積分

$A$ を $p\times p$ 実対称正定値行列とする。次を求めよ。

$$
\int_{\mathbb R^p}
\exp\left(-\frac12\boldsymbol x^{\mathsf T}A\boldsymbol x\right)d\boldsymbol x.
$$

<!-- solution-start -->

### 解答

$A=Q\Lambda Q^{\mathsf T}$ と直交対角化し、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と置きます。$|\det Q|=1$ なので

$$
\begin{aligned}
\int e^{-\boldsymbol x^{\mathsf T}A\boldsymbol x/2}d\boldsymbol x
&=\prod_i\int_{-\infty}^{\infty}e^{-\lambda_i z_i^2/2}dz_i\\
&=\prod_i\sqrt{\frac{2\pi}{\lambda_i}}\\
&=\boxed{\frac{(2\pi)^{p/2}}{\sqrt{\det A}}}.
\end{aligned}
$$

<!-- solution-end -->

## F0M-C01 ベータ・ガンマ関係を最初から導く

$a,b>0$ とする。$\Gamma(a)\Gamma(b)$ を2重積分として書き、

$$
r=x+y,
\qquad u=\frac{x}{x+y}
$$

を用いて

$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

を導け。

<!-- solution-start -->

### 解答

$$
\Gamma(a)\Gamma(b)
=
\int_0^\infty\int_0^\infty
x^{a-1}y^{b-1}e^{-(x+y)}dxdy.
$$

逆変換は $x=ru,y=r(1-u)$、像は $r>0,0<u<1$、ヤコビアン絶対値は $r$。従って

$$
\begin{aligned}
\Gamma(a)\Gamma(b)
&=\int_0^1\int_0^\infty
r^{a+b-1}u^{a-1}(1-u)^{b-1}e^{-r}\,dr\,du\\
&=B(a,b)\Gamma(a+b).
\end{aligned}
$$

両辺を $\Gamma(a+b)>0$ で割って結論を得ます。

<!-- solution-end -->

---

# 15. 25分数学ドリル

## F0M-DRILL-01 数学基礎総合

公式表を見ずに次を解いてください。

1. $\Gamma(5/2)$ を求める。
2. $B(2,3)$ を求める。
3. $\int_{-\infty}^{\infty}e^{-2x^2}\,dx$ を求める。
4. $x=uv,y=u(1-v)$ のヤコビアンを求める。
5. $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$ の固有値と正定値性を判定する。
6. $\|\boldsymbol x\|=1$ の下で $\boldsymbol x^{\mathsf T}A\boldsymbol x$ の最大値を求める。

<!-- solution-start -->

### 解答

1. $\Gamma(5/2)=(3/2)(1/2)\sqrt\pi=3\sqrt\pi/4$。
2. $B(2,3)=1!2!/4!=1/12$。
3. ガウス積分の尺度変換から $\sqrt{\pi/2}$。
4. 行列式は $-u$、絶対値は $|u|$。$u>0$ なら $u$。
5. 特性多項式 $(\lambda-2)(\lambda-4)$、固有値 $2,4$。実対称かつ全固有値正なので正定値。
6. 最大固有値に等しいので $4$。

### 採点基準

各問10点、合計60点。50点以上なら数学基礎はひとまず合格。40点未満なら該当節へ戻ります。特に3・4・5を落とす場合は、ガウス積分・ヤコビアン・固有値を優先して復習します。

<!-- solution-end -->

---

# 16. 統計でどこに使うか

ここだけが統計への接続表です。統計の内容そのものは後続章で扱います。

| 数学 | 主な接続先 |
|---|---|
| 広義積分 | 期待値の存在、裾の評価 |
| 部分積分 | ガンマ型積分、期待値、モーメント |
| ガウス積分 | 正規分布の正規化、多変量正規分布 |
| ガンマ関数 | ガンマ分布、カイ二乗分布、t分布、F分布 |
| ベータ関数 | ベータ分布、t分布、F分布、順序統計量 |
| 重積分 | 同時分布、周辺化、多変量分布 |
| ヤコビアン | 確率変数の変数変換、標本分布 |
| テイラー展開 | 漸近正規性、デルタ法、尤度比・ワルド・スコア |
| 固有値・二次形式 | 多変量正規分布、主成分分析、カイ二乗型統計量 |
| 射影行列 | 線形回帰、分散分析、一般線形仮説 |
| シュール補 | 多変量正規分布の条件付き分布 |

F0-01以降では、この章の数学を既知として統計問題へ接続します。

---

# 17. 最終チェックリスト

- [ ] 基本微分公式を見ずに書ける。
- [ ] 部分積分・置換積分を自力で起動できる。
- [ ] $\int_0^1x^a dx$ と $\int_1^\infty x^{-p}dx$ の収束条件を説明できる。
- [ ] ガウス積分を極座標から導出できる。
- [ ] 極座標のヤコビアンが $r$ になることを計算できる。
- [ ] 一般の2変数ヤコビアンを行列式から求められる。
- [ ] ガンマ関数の定義・漸化式・半整数値を使える。
- [ ] ベータ関数とガンマ関数の関係を使える。
- [ ] ベータ・ガンマ関係を2重積分から追える。
- [ ] 2次行列の行列式・逆行列・固有値を計算できる。
- [ ] 列フルランクなら $A^{\mathsf T}A$ が可逆な理由を説明できる。
- [ ] 実対称行列を直交対角化し、二次形式へ使える。
- [ ] 正定値性を固有値または主座小行列式で判定できる。
- [ ] 射影行列の対称性・冪等性を確認できる。
- [ ] テイラー展開を2次まで書ける。
- [ ] ラグランジュ未定乗数法から固有値問題が出る流れを説明できる。
