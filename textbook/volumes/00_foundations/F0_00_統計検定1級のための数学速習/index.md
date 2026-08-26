# F0-00 統計検定1級のための数学速習

この章は、**統計学の章ではありません**。統計検定1級の問題を解く途中で必要になる微積分・多変数解析・線形代数を、試験で使う範囲に絞って短時間で補修するための数学速習です。

確率密度関数、尤度、推定量、検定などの統計用語はここでは原則として導入しません。まず数学そのものを整理し、最後の「統計でどこに出るか」で接続先だけを示します。

> **この章の使い方**
>
> 1. 「最重要公式一覧」で抜けを確認する。
> 2. 抜けている節だけ本文を読む。
> 3. 例題を紙で再現する。
> 4. 最後の確認問題で、公式を見ずに立式できるか確かめる。
>
> 公式の丸暗記ではなく、**試験中に再現できる短い導出**を持つことを目標にします。

---

# 1. 1級合格のための数学ロードマップ

優先度を3段階に分けます。

| 優先度 | 内容 | 到達目標 |
|---|---|---|
| S | 微分、部分積分、置換積分、広義積分、ガウス積分、ガンマ関数、ベータ関数、重積分、ヤコビアン、行列式、逆行列、階数、固有値、二次形式、正定値性 | 公式を見ずに計算できる |
| A | テイラー展開、勾配・ヘッセ行列、ラグランジュ未定乗数法、直交行列、射影、シュール補、行列微分 | 標準問題で使える |
| B | 積分記号下の微分、スターリング公式、多変量ガウス積分、ブロック逆行列 | 出たときに導出を追える |

**Sだけは必須**です。Aは1級の数理問題で頻出、Bは発展問題・証明問題で差がつきます。

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

積・商・合成関数は

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
\qquad(a\ne-1),
$$

$$
\int \frac{dx}{x}=\log|x|+C,
$$

$$
\int e^{ax}\,dx=\frac1a e^{ax}+C
\qquad(a\ne0).
$$

部分積分は

$$
\int u\,dv=uv-\int v\,du.
$$

置換積分は $u=g(x)$ として

$$
\int f(g(x))g'(x)\,dx=\int f(u)\,du.
$$

## 2.3 広義積分の基本判定

$$
\int_0^1x^a\,dx<\infty
\Longleftrightarrow a>-1,
$$

$$
\int_1^\infty x^{-p}\,dx<\infty
\Longleftrightarrow p>1.
$$

この2本は、端点付近の積分可能性を判定する基準として非常に重要です。

## 2.4 ガウス積分

$$
\boxed{\int_{-\infty}^{\infty}e^{-x^2}\,dx=\sqrt\pi}
$$

したがって $a>0$ なら

$$
\boxed{\int_{-\infty}^{\infty}e^{-ax^2}\,dx=\sqrt{\frac\pi a}}.
$$

さらに平行移動して

$$
\int_{-\infty}^{\infty}e^{-a(x-b)^2}\,dx
=\sqrt{\frac\pi a}.
$$

## 2.5 ガンマ関数

$$
\boxed{\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}\,dx}
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

尺度を変えると $\beta>0$ に対して

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

また

$$
B(a,b)=B(b,a),
$$

$$
B(a+1,b)=\frac{a}{a+b}B(a,b).
$$

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

積分の変数変換では絶対値を用いて

$$
\boxed{
dx\,dy
=
\left|\frac{\partial(x,y)}{\partial(u,v)}\right|
\,du\,dv
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

であり、逆行列が存在するための必要十分条件は

$$
\det A\ne0
$$

です。

固有値は

$$
\boxed{\det(A-\lambda I)=0}
$$

から求めます。

実対称行列なら

$$
\boxed{A=Q\Lambda Q^{\mathsf T}},
\qquad
Q^{\mathsf T}Q=I,
$$

と直交対角化できます。

---

# 3. 微分速習

## 3.1 対数微分で積を和へ変える

積が大量にある式は、対数を取ると微分しやすくなります。例えば

$$
y=x^a(1-x)^b
$$

なら

$$
\log y=a\log x+b\log(1-x).
$$

したがって

$$
\frac{y'}y
=\frac ax-\frac b{1-x}.
$$

積を直接展開するより短くなります。

## 3.2 停留点と最大・最小

内部点 $x_0$ で極値を取るなら、微分可能な場合

$$
f'(x_0)=0
$$

が必要です。ただしこれは必要条件であり、最大・最小を保証しません。

二階微分を使えば

$$
f'(x_0)=0,\quad f''(x_0)>0
$$

なら狭義局所最小、

$$
f'(x_0)=0,\quad f''(x_0)<0
$$

なら狭義局所最大です。

## 3.3 偏微分・勾配・ヘッセ行列

$g:\mathbb R^p\to\mathbb R$ に対し

$$
\nabla g(\boldsymbol x)
=
\begin{pmatrix}
\partial g/\partial x_1\\
\vdots\\
\partial g/\partial x_p
\end{pmatrix},
$$

$$
\nabla^2g(\boldsymbol x)
=\left(
\frac{\partial^2g}{\partial x_i\partial x_j}
\right)_{i,j}
$$

をそれぞれ勾配、ヘッセ行列と呼びます。

内部停留点でヘッセ行列が正定値なら狭義局所最小、負定値なら狭義局所最大です。

## 3.4 テイラー展開

1級で頻繁に使う基本形は

$$
e^x=1+x+\frac{x^2}{2}+O(x^3),
$$

$$
\log(1+x)=x-\frac{x^2}{2}+O(x^3),
$$

$$
(1+x)^a
=1+ax+\frac{a(a-1)}2x^2+O(x^3)
$$

です。

一般に

$$
f(x+h)
=f(x)+f'(x)h+\frac12f''(x)h^2+o(h^2).
$$

多変数では

$$
g(\boldsymbol x+\boldsymbol h)
=g(\boldsymbol x)
+\nabla g(\boldsymbol x)^{\mathsf T}\boldsymbol h
+\frac12\boldsymbol h^{\mathsf T}
\nabla^2g(\boldsymbol x)\boldsymbol h
+o(\|\boldsymbol h\|^2).
$$

## 3.5 ラグランジュ未定乗数法

制約

$$
g(\boldsymbol x)=c
$$

の下で $f(\boldsymbol x)$ を極値化するとき、正則な点では

$$
\nabla f(\boldsymbol x)=\lambda\nabla g(\boldsymbol x)
$$

を解きます。

典型例として、$\|\boldsymbol x\|^2=1$ の下で $\boldsymbol x^{\mathsf T}A\boldsymbol x$ を極値化すると

$$
2A\boldsymbol x=2\lambda\boldsymbol x,
$$

すなわち

$$
A\boldsymbol x=\lambda\boldsymbol x.
$$

よって固有値問題が自然に現れます。

---

# 4. 積分速習

## 4.1 部分積分

$$
\int u\,dv=uv-\int v\,du
$$

を使います。多項式と指数関数の積では、多項式を微分する側に置くのが基本です。

例えば $a>0$ なら

$$
\begin{aligned}
\int_0^\infty xe^{-ax}\,dx
&=\left[-\frac{x}{a}e^{-ax}\right]_0^\infty
+\frac1a\int_0^\infty e^{-ax}\,dx\\
&=\frac1{a^2}.
\end{aligned}
$$

境界項

$$
xe^{-ax}\to0\qquad(x\to\infty)
$$

を確認します。

## 4.2 置換積分

$$
\int_0^\infty x^m e^{-\beta x}\,dx
$$

で $t=\beta x$ と置けば

$$
x=\frac t\beta,
\qquad dx=\frac{dt}{\beta},
$$

なので

$$
\int_0^\infty x^m e^{-\beta x}\,dx
=\frac1{\beta^{m+1}}
\int_0^\infty t^m e^{-t}\,dt.
$$

「変数だけでなく $dx$ も変える」ことを忘れません。

## 4.3 広義積分

端点が無限大、または被積分関数が発散する場合は極限で定義します。

例えば

$$
\int_0^1x^a\,dx
=
\lim_{\varepsilon\downarrow0}
\int_\varepsilon^1x^a\,dx.
$$

$a\ne-1$ なら

$$
\int_\varepsilon^1x^a\,dx
=\frac{1-\varepsilon^{a+1}}{a+1}.
$$

したがって

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

ただし「微分できるから交換できる」わけではありません。区間が有限なら連続性条件で扱いやすく、無限区間では微分後の被積分関数を一様に支配する可積分関数があるか、などの条件確認が必要です。1級答案では、交換が自明でない場合は条件に言及します。

---

# 5. ガウス積分

## 5.1 基本ガウス積分の導出

$$
I=\int_{-\infty}^{\infty}e^{-x^2}\,dx
$$

と置きます。正の積分なので

$$
I^2
=\int_{-\infty}^{\infty}
\int_{-\infty}^{\infty}
 e^{-(x^2+y^2)}\,dx\,dy.
$$

ここで極座標

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

この導出で、**重積分・極座標・ヤコビアン**が一度に出てきます。

## 5.2 係数付きガウス積分

$a>0$ とし、$u=\sqrt a\,x$ と置けば

$$
\begin{aligned}
\int_{-\infty}^{\infty}e^{-ax^2}\,dx
&=\frac1{\sqrt a}
\int_{-\infty}^{\infty}e^{-u^2}\,du\\
&=\boxed{\sqrt{\frac\pi a}}.
\end{aligned}
$$

平方完成できれば

$$
ax^2+bx+c
=a\left(x+\frac b{2a}\right)^2
+c-\frac{b^2}{4a}
$$

なので、指数二次式の積分へ応用できます。

## 5.3 偶数次モーメント型積分

$a>0$ なら

$$
\int_{-\infty}^{\infty}x^2e^{-ax^2}\,dx
=\frac{\sqrt\pi}{2a^{3/2}}.
$$

これは

$$
F(a)=\int_{-\infty}^{\infty}e^{-ax^2}\,dx
=\sqrt\pi a^{-1/2}
$$

を $a$ で微分して

$$
F'(a)
=-\int_{-\infty}^{\infty}x^2e^{-ax^2}\,dx
=-\frac{\sqrt\pi}{2}a^{-3/2}
$$

とすれば得られます。

---

# 6. 重積分とヤコビアン

## 6.1 反復積分

長方形領域

$$
D=[a,b]\times[c,d]
$$

なら、十分よい関数について

$$
\iint_D f(x,y)\,dx\,dy
=
\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx.
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

**最初に領域を不等式で書く**ことが重要です。

## 6.2 フビニの定理とトネリの定理

絶対可積分

$$
\iint |f(x,y)|\,dx\,dy<\infty
$$

なら、積分順序を交換できます。

一方 $f\ge0$ なら、積分値が無限大になる可能性を含めて反復積分を扱えます。ガウス積分で $I^2$ を二重積分へ移すときは被積分関数が非負なので安全です。

## 6.3 一般の変数変換

一対一の滑らかな変換

$$
T:(u,v)\mapsto(x(u,v),y(u,v))
$$

でヤコビアンが0でないとき、

$$
\iint_{T(D)}f(x,y)\,dx\,dy
=
\iint_D
f(x(u,v),y(u,v))
\left|
\frac{\partial(x,y)}{\partial(u,v)}
\right|du\,dv.
$$

絶対値が必要なのは、行列式の符号は向きの反転を表す一方、面積倍率は非負だからです。

## 6.4 極座標のヤコビアン

$$
x=r\cos\theta,
\qquad y=r\sin\theta
$$

では

$$
\left|
\frac{\partial(x,y)}{\partial(r,\theta)}
\right|
=r.
$$

よって

$$
dx\,dy=r\,dr\,d\theta.
$$

円板

$$
x^2+y^2\le R^2
$$

は

$$
0\le r\le R,
\qquad 0\le\theta<2\pi
$$

という長方形領域へ変わります。

## 6.5 和と比の変換で頻出するヤコビアン

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

したがって面積倍率は

$$
\boxed{u}.
$$

$x>0,y>0$ なら像は

$$
u>0,
\qquad 0<v<1.
$$

ヤコビアンだけでなく、**逆変換と像の範囲**までセットで求めます。

---

# 7. ガンマ関数

## 7.1 定義と収束範囲

$$
\Gamma(s)
=\int_0^\infty x^{s-1}e^{-x}\,dx.
$$

$x\to0$ では $x^{s-1}$ 型なので収束には $s>0$ が必要です。$x\to\infty$ では指数減衰 $e^{-x}$ が任意の多項式より速く0へ行くため収束します。

したがって実数範囲では

$$
\boxed{s>0}
$$

で上の積分表示をそのまま使えます。

## 7.2 漸化式

部分積分で

$$
u=x^s,
\qquad dv=e^{-x}dx
$$

とすると

$$
\begin{aligned}
\Gamma(s+1)
&=\int_0^\infty x^s e^{-x}\,dx\\
&=\left[-x^se^{-x}\right]_0^\infty
+s\int_0^\infty x^{s-1}e^{-x}\,dx\\
&=s\Gamma(s).
\end{aligned}
$$

よって

$$
\boxed{\Gamma(s+1)=s\Gamma(s)}.
$$

$\Gamma(1)=1$ から

$$
\Gamma(n)=(n-1)!.
$$

## 7.3 半整数値

ガウス積分から

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

したがって

$$
\Gamma\left(\frac32\right)
=\frac12\sqrt\pi,
$$

$$
\Gamma\left(\frac52\right)
=\frac34\sqrt\pi.
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

したがって

$$
\boxed{
\int_0^\infty x^{s-1}e^{-\beta x}\,dx
=\frac{\Gamma(s)}{\beta^s}
}.
$$

この形は1級で非常によく使います。

---

# 8. ベータ関数

## 8.1 定義

$a,b>0$ に対し

$$
B(a,b)
=\int_0^1x^{a-1}(1-x)^{b-1}\,dx.
$$

$x=0$ 付近では $x^{a-1}$、$x=1$ 付近では $(1-x)^{b-1}$ なので、両端で収束する条件は

$$
\boxed{a>0,\quad b>0}.
$$

$x\mapsto1-x$ と置換すれば

$$
B(a,b)=B(b,a).
$$

## 8.2 ガンマ関数との関係を重積分から導く

積

$$
\Gamma(a)\Gamma(b)
$$

を二重積分にすると

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

領域は

$$
r>0,
\qquad 0<u<1.
$$

ヤコビアンの絶対値は $r$ です。したがって

$$
\begin{aligned}
\Gamma(a)\Gamma(b)
&=\int_0^1\int_0^\infty
(ru)^{a-1}[r(1-u)]^{b-1}e^{-r}r\,dr\,du\\
&=\left[\int_0^1u^{a-1}(1-u)^{b-1}\,du\right]
\left[\int_0^\infty r^{a+b-1}e^{-r}\,dr\right]\\
&=B(a,b)\Gamma(a+b).
\end{aligned}
$$

よって

$$
\boxed{
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
}.
$$

この導出は、**ガンマ関数・ベータ関数・重積分・ヤコビアン**を一つの流れとして理解できる重要例です。

## 8.3 整数値

正整数 $m,n$ なら

$$
B(m,n)
=\frac{(m-1)!(n-1)!}{(m+n-1)!}.
$$

例えば

$$
B(2,3)
=\frac{1!2!}{4!}
=\frac1{12}.
$$

---

# 9. 線形代数速習

## 9.1 ベクトル・内積・ノルム

列ベクトル

$$
\boldsymbol x=(x_1,\ldots,x_p)^{\mathsf T}
$$

に対し

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

直交とは

$$
\boldsymbol x^{\mathsf T}\boldsymbol y=0
$$

です。

コーシー・シュワルツの不等式は

$$
|\boldsymbol x^{\mathsf T}\boldsymbol y|
\le \|\boldsymbol x\|\,\|\boldsymbol y\|.
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

内側の次元 $n$ が一致しなければ積は定義できません。

答案で迷ったら、式の各行列の次元を書きます。

## 9.3 転置

$$
(A+B)^{\mathsf T}=A^{\mathsf T}+B^{\mathsf T},
$$

$$
(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}.
$$

積の順序が逆になる点が重要です。

## 9.4 行列式

2次なら

$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}
=ad-bc.
$$

基本性質は

$$
\det(AB)=\det A\det B,
$$

$$
\det(A^{\mathsf T})=\det A,
$$

$$
\det(A^{-1})=\frac1{\det A}.
$$

三角行列では行列式は対角成分の積です。

## 9.5 逆行列

正方行列 $A$ について

$$
A^{-1}A=AA^{-1}=I.
$$

逆行列が存在することと

$$
\det A\ne0
$$

は同値です。

2次なら

$$
A^{-1}
=\frac1{ad-bc}
\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.
$$

## 9.6 階数と列フルランク

$A\in\mathbb R^{n\times p}$ の列が一次独立なら

$$
\operatorname{rank}(A)=p
$$

で、列フルランクといいます。

列フルランクなら $A^{\mathsf T}A$ は正定値です。実際、$\boldsymbol z\ne0$ に対して

$$
\boldsymbol z^{\mathsf T}A^{\mathsf T}A\boldsymbol z
=\|A\boldsymbol z\|^2.
$$

列フルランクなら $A\boldsymbol z\ne0$ なので

$$
\|A\boldsymbol z\|^2>0.
$$

したがって $A^{\mathsf T}A$ は正定値で、特に可逆です。

## 9.7 固有値・固有ベクトル

$\boldsymbol v\ne0$ が

$$
A\boldsymbol v=\lambda\boldsymbol v
$$

を満たすとき、$\lambda$ が固有値、$\boldsymbol v$ が固有ベクトルです。

固有値は

$$
\det(A-\lambda I)=0
$$

を解いて求めます。

2次行列では、固有値 $\lambda_1,\lambda_2$ に対し

$$
\lambda_1+\lambda_2=\operatorname{tr}(A),
$$

$$
\lambda_1\lambda_2=\det A
$$

が検算に使えます。

## 9.8 実対称行列と直交対角化

$A^{\mathsf T}=A$ なら、実固有値を持ち、互いに直交する単位固有ベクトルから基底を作れます。

つまり直交行列 $Q$ と対角行列

$$
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p)
$$

を使って

$$
\boxed{A=Q\Lambda Q^{\mathsf T}}
$$

と書けます。

直交行列は

$$
Q^{\mathsf T}Q=QQ^{\mathsf T}=I
$$

を満たし、

$$
Q^{-1}=Q^{\mathsf T}
$$

です。またノルムを保存します。

## 9.9 二次形式

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
$$

を二次形式と呼びます。

$A$ が実対称なら $A=Q\Lambda Q^{\mathsf T}$、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ として

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_{i=1}^p\lambda_i z_i^2.
$$

したがって二次形式の符号は固有値の符号に帰着します。

## 9.10 正定値・半正定値

実対称行列 $A$ が正定値とは

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x>0
\qquad(\boldsymbol x\ne0)
$$

となることです。

半正定値とは

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x\ge0
$$

です。

実対称行列では

$$
A\text{ が正定値}
\Longleftrightarrow
\text{全固有値が正}.
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

一般には、実対称行列の左上からの主座小行列式がすべて正なら正定値です。

## 9.11 射影行列

列フルランクな

$$
A\in\mathbb R^{n\times p}
$$

に対し

$$
P=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
$$

と置くと

$$
P^{\mathsf T}=P,
$$

$$
P^2=P.
$$

よって $P$ は $\operatorname{col}(A)$ への直交射影行列です。

また

$$
(I-P)P=0
$$

なので、射影成分と残差成分は直交します。

## 9.12 シュール補

ブロック行列

$$
M=\begin{pmatrix}A&B\\C&D\end{pmatrix}
$$

で $D$ が可逆なとき

$$
S=A-BD^{-1}C
$$

を $D$ に関するシュール補と呼びます。

行基本変形に対応するブロック行列を掛けると

$$
\begin{pmatrix}
I&-BD^{-1}\\
0&I
\end{pmatrix}
\begin{pmatrix}A&B\\C&D\end{pmatrix}
=
\begin{pmatrix}
A-BD^{-1}C&0\\
C&D
\end{pmatrix}.
$$

よって

$$
\boxed{
\det M
=\det D\,\det(A-BD^{-1}C)
}.
$$

多変量問題では条件付き量を整理するときに頻出します。

---

# 10. 行列微分の最小公式集

列ベクトル $\boldsymbol x$ を変数とすると

$$
\nabla_{\boldsymbol x}
(\boldsymbol a^{\mathsf T}\boldsymbol x)
=\boldsymbol a,
$$

$$
\boxed{
\nabla_{\boldsymbol x}
(\boldsymbol x^{\mathsf T}A\boldsymbol x)
=(A+A^{\mathsf T})\boldsymbol x
}.
$$

特に $A$ が対称なら

$$
\nabla_{\boldsymbol x}
(\boldsymbol x^{\mathsf T}A\boldsymbol x)
=2A\boldsymbol x.
$$

また

$$
\|\boldsymbol y-A\boldsymbol x\|^2
=(\boldsymbol y-A\boldsymbol x)^{\mathsf T}
(\boldsymbol y-A\boldsymbol x)
$$

なので

$$
\boxed{
\nabla_{\boldsymbol x}
\|\boldsymbol y-A\boldsymbol x\|^2
=-2A^{\mathsf T}\boldsymbol y
+2A^{\mathsf T}A\boldsymbol x
}.
$$

発展公式として、可逆な行列 $A(\theta)$ が微分可能なら

$$
\boxed{
\frac{d}{d\theta}\log\det A(\theta)
=\operatorname{tr}\left(
A(\theta)^{-1}A'(\theta)
\right)
}
$$

があります。これは多変量正規分布の微分などで現れますが、最初から暗記するより必要時に参照できれば十分です。

---

# 11. 多変量ガウス積分

$A$ を $p\times p$ 実対称正定値行列とします。直交対角化して

$$
A=Q\Lambda Q^{\mathsf T},
$$

$$
\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_p),
\qquad \lambda_i>0.
$$

$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と変換します。直交行列なので

$$
|\det Q|=1,
$$

従って体積要素は変わりません。また

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_{i=1}^p\lambda_i z_i^2.
$$

よって

$$
\begin{aligned}
&\int_{\mathbb R^p}
\exp\left(-\frac12\boldsymbol x^{\mathsf T}A\boldsymbol x\right)
d\boldsymbol x\\
&=\prod_{i=1}^p
\int_{-\infty}^{\infty}
\exp\left(-\frac{\lambda_i z_i^2}{2}\right)dz_i\\
&=\prod_{i=1}^p\sqrt{\frac{2\pi}{\lambda_i}}\\
&=(2\pi)^{p/2}
\left(\prod_{i=1}^p\lambda_i\right)^{-1/2}.
\end{aligned}
$$

$\prod_i\lambda_i=\det A$ なので

$$
\boxed{
\int_{\mathbb R^p}
\exp\left(-\frac12\boldsymbol x^{\mathsf T}A\boldsymbol x\right)
d\boldsymbol x
=\frac{(2\pi)^{p/2}}{\sqrt{\det A}}
}.
$$

これは「ガウス積分 + 固有値分解 + ヤコビアン」の総合例です。

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
\lim_{n\to\infty}\left(1+\frac xn\right)^n=e^x.
$$

## 12.2 ランダウ記号

$$
f(x)=O(g(x))
$$

は、比 $|f(x)/g(x)|$ が近傍で有界という意味です。

$$
f(x)=o(g(x))
$$

は

$$
\frac{f(x)}{g(x)}\to0
$$

という意味です。

例えば

$$
\log(1+x)=x-\frac{x^2}{2}+o(x^2).
$$

## 12.3 スターリング公式

大きな $n$ では

$$
\boxed{
n!\sim\sqrt{2\pi n}\left(\frac ne\right)^n
}
$$

です。ガンマ関数では

$$
\Gamma(x+1)
\sim\sqrt{2\pi x}\left(\frac xe\right)^x.
$$

組合せ数や分布の近似で出ます。証明を常に再現する必要はありませんが、式の意味と使いどころは知っておきます。

---

# 13. 何を暗記し、何をその場で導出するか

## 暗記してよい

- $x^a,e^{ax},\log x$ の微分積分。
- 積・商・合成関数の微分。
- 部分積分・置換積分。
- $\int_0^1x^a dx$ と $\int_1^\infty x^{-p}dx$ の収束条件。
- ガウス積分 $\int e^{-x^2}dx=\sqrt\pi$ の値。
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
\qquad(a\ne-1).
$$

よって $a>-1$ なら $1/(a+1)$ に収束し、$a<-1$ なら発散します。$a=-1$ では $-\log\varepsilon\to\infty$。したがって

$$
\boxed{a>-1}
$$

が必要十分条件で、値は

$$
\boxed{\frac1{a+1}}.
$$

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
=\frac52\Gamma\left(\frac52\right)
=\frac52\frac32\Gamma\left(\frac32\right)
=\frac52\frac32\frac12\Gamma\left(\frac12\right).
$$

$\Gamma(1/2)=\sqrt\pi$ より

$$
\boxed{\Gamma(7/2)=\frac{15}{8}\sqrt\pi}.
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

極座標では

$$
0\le r\le R,
\qquad 0\le\theta<2\pi,
$$

かつ $dxdy=r\,drd\theta$。したがって

$$
\begin{aligned}
\operatorname{Area}(D)
&=\int_0^{2\pi}\int_0^R r\,dr\,d\theta\\
&=2\pi\frac{R^2}{2}\\
&=\boxed{\pi R^2}.
\end{aligned}
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
\begin{aligned}
\frac{\partial(x,y)}{\partial(u,v)}
&=
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}\\
&=-uv-u(1-v)\\
&=-u.
\end{aligned}
$$

したがって面積倍率は

$$
\boxed{|u|}.
$$

$u>0$ の領域なら $u$ です。

<!-- solution-end -->

## F0M-A06 行列式・逆行列

$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix}
$$

の行列式と逆行列を求めよ。

<!-- solution-start -->

### 解答

$$
\det A=2\cdot3-1\cdot1=5.
$$

したがって

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
=-\int_{-\infty}^{\infty}x^2e^{-ax^2}dx.
$$

一方

$$
F'(a)
=-\frac{\sqrt\pi}{2}a^{-3/2}.
$$

よって

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

逆変換は

$$
x=ru,
\qquad y=r(1-u).
$$

領域は

$$
r>0,
\qquad0<u<1.
$$

ヤコビアンは

$$
\det
\begin{pmatrix}
u&r\\
1-u&-r
\end{pmatrix}
=-r,
$$

したがって

$$
\boxed{
\left|\frac{\partial(x,y)}{\partial(r,u)}\right|=r
}.
$$

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

固有値は

$$
6,\quad2.
$$

$A$ は実対称で全固有値が正なので

$$
\boxed{A\text{ は正定値}}.
$$

<!-- solution-end -->

## F0M-B04 二次形式の最大化

実対称行列 $A$ の最大固有値を $\lambda_{\max}$ とする。

$$
\|\boldsymbol x\|=1
$$

の下で

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
$$

の最大値を求めよ。

<!-- solution-start -->

### 解答

直交対角化

$$
A=Q\Lambda Q^{\mathsf T}
$$

を使い、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と置きます。直交行列はノルムを保存するので

$$
\sum_i z_i^2=1.
$$

したがって

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
=\sum_i\lambda_i z_i^2
\le\lambda_{\max}\sum_i z_i^2
=\lambda_{\max}.
$$

最大固有値に対応する単位固有ベクトルで等号が成立します。よって

$$
\boxed{\max_{\|\boldsymbol x\|=1}\boldsymbol x^{\mathsf T}A\boldsymbol x
=\lambda_{\max}}.
$$

<!-- solution-end -->

## F0M-B05 射影行列

列フルランクな $A\in\mathbb R^{n\times p}$ に対して

$$
P=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
$$

が対称かつ冪等であることを示せ。

<!-- solution-start -->

### 解答

$A^{\mathsf T}A$ は対称なので、その逆行列も対称です。したがって

$$
P^{\mathsf T}=P.
$$

また

$$
\begin{aligned}
P^2
&=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=P.
\end{aligned}
$$

よって直交射影行列です。

<!-- solution-end -->

## F0M-B06 多変量ガウス積分

$A$ を $p\times p$ 実対称正定値行列とする。次を求めよ。

$$
\int_{\mathbb R^p}
\exp\left(-\frac12\boldsymbol x^{\mathsf T}A\boldsymbol x\right)
d\boldsymbol x.
$$

<!-- solution-start -->

### 解答

$A=Q\Lambda Q^{\mathsf T}$ と直交対角化し、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と置きます。$|\det Q|=1$ なので

$$
\begin{aligned}
\int_{\mathbb R^p}e^{-\boldsymbol x^{\mathsf T}A\boldsymbol x/2}d\boldsymbol x
&=\prod_{i=1}^p\int_{-\infty}^{\infty}e^{-\lambda_i z_i^2/2}dz_i\\
&=\prod_{i=1}^p\sqrt{\frac{2\pi}{\lambda_i}}\\
&=\boxed{\frac{(2\pi)^{p/2}}{\sqrt{\det A}}}.
\end{aligned}
$$

<!-- solution-end -->

---

# 15. 25分数学ドリル

## F0M-DRILL-01 数学基礎総合

次を公式表を見ずに解いてください。

1. $\Gamma(5/2)$ を求める。
2. $B(2,3)$ を求める。
3. $\int_{-\infty}^{\infty}e^{-2x^2}\,dx$ を求める。
4. $x=uv,y=u(1-v)$ のヤコビアンを求める。
5. $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$ の固有値と正定値性を判定する。
6. $\|\boldsymbol x\|=1$ の下で $\boldsymbol x^{\mathsf T}A\boldsymbol x$ の最大値を求める。

<!-- solution-start -->

### 解答

1. $\Gamma(5/2)=(3/2)(1/2)\sqrt\pi=3\sqrt\pi/4$。
2. $B(2,3)=\Gamma(2)\Gamma(3)/\Gamma(5)=1!2!/4!=1/12$。
3. ガウス積分の尺度変換から $\sqrt{\pi/2}$。
4. 行列式は $-u$、絶対値は $|u|$。$u>0$ なら $u$。
5. 特性多項式 $(\lambda-2)(\lambda-4)$、固有値 $2,4$。実対称かつ全固有値正なので正定値。
6. 最大固有値に等しいので $4$。

### 採点基準

各問10点、合計60点。50点以上なら数学基礎はひとまず合格、40点未満なら該当節へ戻ります。特に3・4・5を落とす場合は、ガウス積分・ヤコビアン・固有値を優先して復習します。

<!-- solution-end -->

---

# 16. 統計でどこに使うか

ここだけが統計への接続表です。統計の内容そのものは後続章で扱います。

| 数学 | 主な接続先 |
|---|---|
| 広義積分 | 期待値の存在、コーシー分布、裾の評価 |
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

F0-01 以降では、この章の数学を既知として統計問題へ接続します。

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
- [ ] $B(a,b)=\Gamma(a)\Gamma(b)/\Gamma(a+b)$ を重積分から追える。
- [ ] 2次行列の行列式・逆行列・固有値を計算できる。
- [ ] 列フルランクなら $A^{\mathsf T}A$ が可逆な理由を説明できる。
- [ ] 実対称行列を直交対角化し、二次形式へ使える。
- [ ] 正定値性を固有値または主座小行列式で判定できる。
- [ ] 射影行列の対称性・冪等性を確認できる。
- [ ] テイラー展開を2次まで書ける。
- [ ] ラグランジュ未定乗数法から固有値問題が出る流れを説明できる。
