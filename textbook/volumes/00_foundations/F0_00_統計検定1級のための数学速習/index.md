# F0-00 統計検定1級のための数学速習

この章では、統計検定1級の各章で繰り返し使う微積分・多変数解析・線形代数をまとめます。確率や推測の公式を先に置くのではなく、広義積分、変数変換、ガンマ・ベータ関数、固有値、二次形式、射影などを数学の計算として確認し、後続章で再利用できる形にします。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md) に従います。

## この章で解けるようになる問題

- 広義積分の収束条件を端点ごとに判定し、部分積分・置換積分を使って値を求める。
- ガウス積分を重積分と極座標変換から導出し、係数付き積分へ拡張する。
- ガンマ関数・ベータ関数の基本関係を積分から導き、半整数値や具体値を計算する。
- 二変数変換の逆変換・変換後の領域・ヤコビアンを求める。
- 行列式・逆行列・階数・固有値・固有ベクトルを計算する。
- 実対称行列を直交対角化し、二次形式の最大最小と正定値性を判定する。
- 上限・下限、$\sup$・$\inf$ と最大・最小の違いを説明し、統計で現れる最悪値・最適値の式を読める。
- テイラー展開とランダウ記号を組み合わせ、統計で頻出する局所展開・漸近展開を処理する。
- スターリング公式がガンマ積分・テイラー展開・ガウス積分から現れる流れを説明する。
- 射影行列、シュール補、基本的な行列微分を後続の統計問題で使える形へ変形する。

## 公式出題範囲との対応

| 公式範囲 | 本章の対応箇所 |
|---|---|
| 変数変換 | 重積分、極座標、一般の二変数変換、ヤコビアン |
| 固有値 | 特性方程式、実対称行列の直交対角化、二次形式 |
| 固有ベクトル | 固有値方程式、直交基底、二次形式の最大最小 |
| 線形結合 | ベクトルの線形結合、行列積、射影 |

このほか、ガウス積分、ガンマ関数、ベータ関数、広義積分、テイラー展開、ランダウ記号、上限・下限は確率分布・標本分布・漸近推測の計算基礎として使います。

## 前提知識チェック

1. $x^3$、$e^{2x}$、$\log x$ を微分できる。
2. $2\times2$ 行列の積と行列式を計算できる。
3. $x^2+2bx=(x+b)^2-b^2$ と平方完成できる。
4. $\sum_{i=1}^n a_i$ の和記号を読み、定数倍と和を分配できる。
5. $\sin^2\theta+\cos^2\theta=1$ を使える。

---
## 1. この章で扱う数学

> **先取りラベルについて**  
> この節の一覧には、ヘッセ行列・ラグランジュ未定乗数法・正定値性・射影行列・Schur complementなど、**後続節や後続補講で定義する概念名**も含みます。ここでは「このあと何が出てくるか」を見渡すためのラベルであり、この時点で定義や性質を覚えている必要はありません。本文では、実際に使う前に順に定義します。

| 分野 | 主な内容 | 主な接続先 |
|---|---|---|
| 一変数微積分 | 微分、部分積分、置換積分、広義積分、積分記号下の微分 | 確率密度関数の正規化、期待値、尤度、漸近展開 |
| 特殊積分 | ガウス積分、ガンマ関数、ベータ関数 | 正規・ガンマ・ベータ・カイ二乗・t・F分布 |
| 多変数解析 | 偏微分、勾配、ヘッセ行列、重積分、ヤコビアン、ラグランジュ未定乗数法 | 多変量分布、変数変換、最尤推定、制約付き最適化 |
| 順序・極値 | 上界・下界、$\sup$・$\inf$、最大・最小 | 複合仮説、尤度比、最悪値評価、リスク |
| 線形代数 | 行列積、行列式、逆行列、階数、固有値、直交対角化、二次形式、正定値性 | 多変量正規、標本分布、回帰、主成分分析 |
| 線形代数の応用 | 射影行列、シュール補、行列微分 | 回帰、条件付き正規分布、一般線形仮説 |
| 極限計算 | テイラー展開、ランダウ記号、スターリング公式 | 中心極限定理、デルタ法、尤度比の漸近展開 |

各節では、後続章でそのまま使う式だけでなく、式がどの計算から出るかまで示します。

---

## 2. 最重要公式一覧

### 2.1 微分

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

### 2.2 積分

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

部分積分の一般形は、$f,g$ が $[a,b]$ で連続微分可能なとき

$$
\boxed{
\int_a^b f(x)g'(x)\,dx
=\left[f(x)g(x)\right]_a^b
-\int_a^b f'(x)g(x)\,dx
}.
$$

$u=f(x)$、$dv=g'(x)\,dx$ と書けば、よく使う略記

$$
\boxed{\int u\,dv=uv-\int v\,du}
$$

になります。こちらは上の一般形を不定積分の記号で書いた特殊な表現です。

置換積分は $u=g(x)$ として

$$
\boxed{\int f(g(x))g'(x)\,dx=\int f(u)\,du}.
$$

### 2.3 広義積分の基本判定

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

### 2.4 ガウス積分

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

### 2.5 ガンマ関数

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

### 2.6 ベータ関数

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

### 2.7 ヤコビアン

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

### 2.8 線形代数

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

## 3. 微分・極値速習

### 3.1 停留点は極値の候補にすぎない

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

### 3.2 偏微分・勾配・ヘッセ行列

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

内部停留点 $\boldsymbol x_0$ の近傍で $g$ が2回連続微分可能とします。$H_g(\boldsymbol x_0)$ が正定値なら $\boldsymbol x_0$ は狭義局所最小、負定値なら狭義局所最大です。

### 3.3 テイラー展開

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

3階微分まで連続であれば、より具体的に

$$
f(x+h)
=f(x)+f'(x)h+\frac12f''(x)h^2+O(h^3)
$$

と書けます。

多変数では

$$
g(\boldsymbol x+\boldsymbol h)
=g(\boldsymbol x)
+\operatorname{grad}g(\boldsymbol x)^{\mathsf T}\boldsymbol h
+\frac12\boldsymbol h^{\mathsf T}H_g(\boldsymbol x)\boldsymbol h
+o(\|\boldsymbol h\|^2).
$$

### 3.4 上界・下界、$\sup$・$\inf$

集合 $A\subset\mathbb R$ を考えます。実数 $M$ が

$$
x\le M\qquad(\forall x\in A)
$$

を満たすとき、$M$ を $A$ の**上界**といいます。上界のうち最小のものを**上限**といい

$$
\sup A
$$

と書きます。同様に、すべての $x\in A$ に対し $m\le x$ を満たす $m$ を下界といい、下界のうち最大のものを

$$
\inf A
$$

と書きます。

重要なのは、$\sup$・$\inf$ は集合の中に存在する必要がないことです。例えば

$$
A=(0,1)
$$

では

$$
\inf A=0,
\qquad
\sup A=1,
$$

ですが、$0,1\notin A$ なので最小値・最大値は存在しません。

一方

$$
B=\left\{\frac1n:n=1,2,\ldots\right\}
$$

では

$$
\sup B=1=\max B,
\qquad
\inf B=0,
$$

ですが $0\notin B$ なので $\min B$ は存在しません。

関数についても

$$
\sup_{\theta\in\Theta}f(\theta),
\qquad
\inf_{\theta\in\Theta}f(\theta)
$$

と書きます。統計では「母数の中で最も大きい値」「最悪の場合の確率」を表すため頻繁に現れます。例えば尤度比は

$$
\Lambda
=
\frac{\sup_{\theta\in\Theta_0}L(\theta)}
{\sup_{\theta\in\Theta}L(\theta)}
$$

と書けます。また複合帰無仮説に対する保守的な $p$ 値では

$$
p
=\sup_{\theta\in\Theta_0}
P_\theta(T\ge t_{\mathrm{obs}})
$$

のように、帰無仮説内で棄却確率が最も大きくなる母数を取ります。

### 3.5 ラグランジュ未定乗数法

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

## 4. 積分速習

### 4.1 部分積分

積の微分公式

$$
\{f(x)g(x)\}'=f'(x)g(x)+f(x)g'(x)
$$

を $a$ から $b$ まで積分すると

$$
f(b)g(b)-f(a)g(a)
=
\int_a^b f'(x)g(x)\,dx
+\int_a^b f(x)g'(x)\,dx.
$$

従って部分積分の一般形

$$
\boxed{
\int_a^b f(x)g'(x)\,dx
=\left[f(x)g(x)\right]_a^b
-\int_a^b f'(x)g(x)\,dx
}
$$

を得ます。

$u=f(x)$、$dv=g'(x)\,dx$ と略記すれば

$$
\int u\,dv=uv-\int v\,du
$$

です。つまり、こちらは一般形を計算用に短く書いた形です。

多項式と指数関数の積では、多項式を微分する側に置くのが基本です。$a>0$ なら、まず有限区間 $[0,R]$ で一般公式を使い

$$
\begin{aligned}
\int_0^R xe^{-ax}\,dx
&=\left[-\frac{x}{a}e^{-ax}\right]_0^R
+\frac1a\int_0^R e^{-ax}\,dx.
\end{aligned}
$$

最後に $R\to\infty$ とすれば、$Re^{-aR}\to0$ より

$$
\begin{aligned}
\int_0^\infty xe^{-ax}\,dx
&=\frac1a\int_0^\infty e^{-ax}\,dx\\
&=\frac1{a^2}.
\end{aligned}
$$

広義積分で部分積分するときは、最初から無限大を代入するのではなく、有限区間で計算してから極限を取るのが厳密な流れです。

### 4.2 置換積分

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

### 4.3 広義積分

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

### 4.4 積分記号下の微分

$\theta_0$ の近くで $\partial f(x,\theta)/\partial\theta$ が存在し、ある可積分関数 $g(x)$ があって

$$
\left|\frac{\partial}{\partial\theta}f(x,\theta)\right|\le g(x)
$$

がその近傍のすべての $\theta$ で成り立つとします。このように微分後の被積分関数を同じ可積分関数で抑えられる場合には

$$
\frac{d}{d\theta}
\int f(x,\theta)\,dx
=
\int \frac{\partial}{\partial\theta}f(x,\theta)\,dx
$$

と微分と積分を交換できます。実際の問題では、交換を書く前に、微分後の絶対値を積分可能な関数で抑えられることを確認します。

---

## 5. ガウス積分：重積分・極座標・ヤコビアンの総合例

### 5.1 基本ガウス積分

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

### 5.2 係数付きガウス積分

$a>0$ とし $u=\sqrt a\,x$ と置けば

$$
\begin{aligned}
\int_{-\infty}^{\infty}e^{-ax^2}\,dx
&=\frac1{\sqrt a}
\int_{-\infty}^{\infty}e^{-u^2}\,du\\
&=\boxed{\sqrt{\frac\pi a}}.
\end{aligned}
$$

### 5.3 $x^2e^{-ax^2}$ 型

$$
F(a)=\int_{-\infty}^{\infty}e^{-ax^2}\,dx
=\sqrt\pi a^{-1/2}
$$

とします。固定した $a_0>0$ の近くで $a\ge a_0/2$ とすれば

$$
\left|\frac{\partial}{\partial a}e^{-ax^2}\right|
=x^2e^{-ax^2}
\le x^2e^{-(a_0/2)x^2},
$$

右辺は実数全体で積分可能です。したがって積分記号下で微分でき、

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

## 6. 重積分とヤコビアン

### 6.1 まず領域を書く

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

### 6.2 フビニの定理とトネリの定理

絶対可積分

$$
\iint |f(x,y)|\,dx\,dy<\infty
$$

なら積分順序を交換できます。

一方、$f(x,y)\ge0$ なら、積分値が無限大になる可能性を含めて反復積分を扱えます。ガウス積分では被積分関数が非負なので、この点が扱いやすくなっています。

### 6.3 一般の変数変換

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

### 6.4 極座標

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

### 6.5 和と比の変換

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

$x>0,y>0$ なら $u>0$ なので面積倍率は $u$、変換後の領域は

$$
u>0,
\qquad 0<v<1.
$$

ヤコビアンだけでなく、**逆変換と変換後の範囲**を必ずセットで求めます。

---

## 7. ガンマ関数

### 7.1 定義と収束

$$
\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}\,dx.
$$

$x\to0$ では $x^{s-1}$ 型なので $s>0$ が必要です。$x\to\infty$ では指数関数 $e^{-x}$ が多項式より速く減衰するので収束します。

### 7.2 漸化式

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

### 7.3 半整数値

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

### 7.4 尺度付き積分

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

## 8. ベータ関数

### 8.1 定義と収束条件

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

### 8.2 ベータ関数とガンマ関数の関係

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

変換後の領域は

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

### 8.3 整数値

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

## 9. 線形代数速習

### 9.1 ベクトル・内積・ノルム

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

ベクトル $\boldsymbol v_1,\ldots,\boldsymbol v_k$ と実数 $c_1,\ldots,c_k$ に対し

$$
c_1\boldsymbol v_1+\cdots+c_k\boldsymbol v_k
$$

をこれらのベクトルの線形結合といいます。行列 $A=(\boldsymbol v_1,\ldots,\boldsymbol v_k)$ を使えば同じ式を $A\boldsymbol c$ とまとめて書けます。

コーシー・シュワルツの不等式は

$$
|\boldsymbol x^{\mathsf T}\boldsymbol y|
\le\|\boldsymbol x\|\,\|\boldsymbol y\|.
$$

### 9.2 行列積の次元

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

### 9.3 転置

$$
(A+B)^{\mathsf T}=A^{\mathsf T}+B^{\mathsf T},
$$

$$
(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}.
$$

積の順序が逆になる点が重要です。

### 9.4 行列式・逆行列

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

### 9.5 階数と列フルランク

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

### 9.6 固有値・固有ベクトル

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

### 9.7 実対称行列と直交対角化

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

### 9.8 二次形式

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

### 9.9 正定値・半正定値

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

$A$ の左上から取った $k\times k$ 部分行列を $A_k$ とし

$$
\Delta_k=\det A_k
$$

と置きます。$\Delta_k$ を首座小行列式といいます。実対称行列では

$$
\boxed{
A\text{ が正定値}
\Longleftrightarrow
\Delta_1>0,\ldots,\Delta_p>0
}
$$

が成り立ちます。これをシルベスターの判定法といいます。

特に2次対称行列

$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

では

$$
\Delta_1=a,\qquad \Delta_2=ac-b^2
$$

なので

$$
\boxed{a>0,\qquad ac-b^2>0}
$$

が正定値の必要十分条件です。

### 9.10 射影行列

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

### 9.11 シュール補

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

## 10. 行列微分の最小公式集

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

## 11. 多変量ガウス積分

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

## 12. 極限・漸近展開の最小セット

### 12.1 基本極限

$$
\lim_{x\to0}\frac{e^x-1}{x}=1,
$$

$$
\lim_{x\to0}\frac{\log(1+x)}x=1,
$$

$$
\lim_{m\to\infty}\left(1+\frac xm\right)^m=e^x.
$$

### 12.2 ランダウ記号

$x\to x_0$ を考えるとします。

$$
f(x)=O(g(x))\qquad(x\to x_0)
$$

とは、$x_0$ の十分近くで、ある定数 $C>0$ により

$$
|f(x)|\le C|g(x)|
$$

と抑えられることです。直感的には「$f$ は $g$ より大きい次数にはならない」という意味です。

$$
f(x)=o(g(x))\qquad(x\to x_0)
$$

とは

$$
\frac{f(x)}{g(x)}\to0
$$

という意味です。こちらは「$f$ は $g$ に比べて無視できるほど小さい」という、$O$ より強い主張です。

例えば $x\to0$ では

$$
x^3=O(x^2),
\qquad
x^3=o(x^2),
$$

ですが

$$
x^2\ne o(x^2)
$$

です。比を取れば最後だけ $1\to0$ にならないからです。

よく使う計算則は

$$
O(a)+O(a)=O(a),
$$

$$
O(a)O(b)=O(ab),
$$

$$
o(a)+o(a)=o(a).
$$

また $x\to0$ なら

$$
O(x^{k+1})=o(x^k)
$$

です。$n\to\infty$ の数列でも同じ形で使い、例えば

$$
O(n^{-1})=o(n^{-1/2}).
$$

### 12.3 テイラー展開とランダウ記号の典型形

ランダウ記号は、単独で暗記するよりテイラー展開の「捨てた項の大きさ」を表す記号として使うと理解しやすくなります。

#### 典型1：主要項を取り出す

$$
e^x=1+x+\frac{x^2}{2}+O(x^3)
$$

より

$$
e^x-1-x
=\frac{x^2}{2}+O(x^3).
$$

従って

$$
\frac{e^x-1-x}{x^2}
=\frac12+O(x)
\to\frac12.
$$

#### 典型2：1次項が消えると2次項が支配する

$$
\log(1+x)=x-\frac{x^2}{2}+O(x^3)
$$

なので

$$
\log(1+x)-x
=-\frac{x^2}{2}+O(x^3)
=o(x).
$$

ただし

$$
\log(1+x)-x\ne o(x^2)
$$

です。$x^2$ で割ると $-1/2$ に収束します。

#### 典型3：$n^{-1/2}$ スケールを代入する

固定した $h\in\mathbb R$ に対し

$$
x=\frac{h}{\sqrt n}
$$

を代入すると

$$
\log\left(1+\frac{h}{\sqrt n}\right)
=\frac{h}{\sqrt n}
-\frac{h^2}{2n}
+O(n^{-3/2}).
$$

両辺を $n$ 倍して

$$
\boxed{
n\log\left(1+\frac{h}{\sqrt n}\right)
=h\sqrt n-\frac{h^2}{2}+O(n^{-1/2})
}.
$$

尤度の局所展開では、このように「Taylor展開してから標本サイズ $n$ を掛ける」計算が何度も出ます。

### 12.4 スターリング公式と概略導出

大きな正整数 $n$ では

$$
\boxed{
n!\sim\sqrt{2\pi n}\left(\frac ne\right)^n
}.
$$

ここでは、すでに学んだガンマ関数・テイラー展開・ガウス積分だけで、なぜこの形になるかを概略的に導きます。

ガンマ関数から

$$
n!=\Gamma(n+1)
=\int_0^\infty x^n e^{-x}\,dx
=\int_0^\infty \exp\{n\log x-x\}\,dx.
$$

指数部

$$
\phi_n(x)=n\log x-x
$$

は

$$
\phi_n'(x)=\frac nx-1
$$

より $x=n$ で最大になります。したがって大きな $n$ では、積分の主要部分は $x=n$ の近くから来ると考えます。

そこで

$$
x=n+\sqrt n\,y
=n\left(1+\frac{y}{\sqrt n}\right)
$$

と置きます。すると $dx=\sqrt n\,dy$ であり

$$
\begin{aligned}
 n\log x-x
&=n\log n
+n\log\left(1+\frac{y}{\sqrt n}\right)
-n-\sqrt n\,y.
\end{aligned}
$$

$y$ を固定して $n\to\infty$ とすると

$$
\log\left(1+\frac{y}{\sqrt n}\right)
=\frac{y}{\sqrt n}
-\frac{y^2}{2n}
+O(n^{-3/2}),
$$

したがって

$$
 n\log\left(1+\frac{y}{\sqrt n}\right)
=\sqrt n\,y-\frac{y^2}{2}+O(n^{-1/2}).
$$

$\sqrt n\,y$ が打ち消し合い

$$
 n\log x-x
=n\log n-n-\frac{y^2}{2}+O(n^{-1/2}).
$$

よって積分の中心部分は

$$
\begin{aligned}
n!
&\approx n^n e^{-n}\sqrt n
\int_{-\infty}^{\infty}e^{-y^2/2}\,dy\\
&=n^n e^{-n}\sqrt n\,\sqrt{2\pi}\\
&=\sqrt{2\pi n}\left(\frac ne\right)^n.
\end{aligned}
$$

これがスターリング公式の形です。厳密な証明では、$x=n$ の近くでTaylor近似の誤差を一様に抑え、そこから遠い部分の積分が無視できることを別途示します。この考え方は**Laplace法**と呼ばれ、統計では積分の漸近評価やベイズ統計にも現れます。

スターリング公式は組合せ数や分布の漸近評価で使います。例えば

$$
\binom{2n}{n}
\sim\frac{4^n}{\sqrt{\pi n}}
$$

もスターリング公式から直ちに得られます。

---

## 13. 演習

### F0M-A01 広義積分

- Level: A
- 目安時間: 7分
- 主題: 広義積分

実数 $a$ に対し

$$
\int_0^1x^a\,dx
$$

が有限となる必要十分条件と値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

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

##### 本番答案

$\int_0^1x^a\,dx=\lim_{\varepsilon\downarrow0}(1-\varepsilon^{a+1})/(a+1)$。$a=-1$ は $-\log\varepsilon$。したがって有限となる必要十分条件は $a>-1$ で、その値は $1/(a+1)$。

##### 採点基準

広義積分を極限で置く4点、$a\ne-1$ の積分計算6点、$a=-1$ の確認4点、必要十分条件と値6点。計20点。

<!-- solution-end -->

### F0M-A02 ガンマ関数

- Level: A
- 目安時間: 5分
- 主題: ガンマ関数

$$
\Gamma\left(\frac72\right)
$$

を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

漸化式 $\Gamma(s+1)=s\Gamma(s)$ を3回使うと

$$
\Gamma\left(\frac72\right)
=\frac52\Gamma\left(\frac52\right)
=\frac52\frac32\Gamma\left(\frac32\right)
=\frac52\frac32\frac12\Gamma\left(\frac12\right).
$$

$\Gamma(1/2)=\sqrt\pi$ なので

$$
\boxed{\Gamma(7/2)=\frac{15}{8}\sqrt\pi}.
$$

##### 本番答案

$\Gamma(7/2)=(5/2)(3/2)(1/2)\Gamma(1/2)=\boxed{15\sqrt\pi/8}$。

##### 採点基準

ガンマ関数の漸化式12点、$\Gamma(1/2)=\sqrt\pi$ の使用4点、最終値4点。計20点。

<!-- solution-end -->

### F0M-A03 ベータ関数

- Level: A
- 目安時間: 5分
- 主題: ベータ関数

$$
B(3,4)
$$

を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

ベータ関数とガンマ関数の関係

$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

へ $a=3,b=4$ を代入する。正整数 $n$ では $\Gamma(n)=(n-1)!$ だから

$$
B(3,4)
=\frac{\Gamma(3)\Gamma(4)}{\Gamma(7)}
=\frac{2!\,3!}{6!}
=\frac{12}{720}
=\boxed{\frac1{60}}.
$$

##### 本番答案

$B(3,4)=\Gamma(3)\Gamma(4)/\Gamma(7)=2!3!/6!=\boxed{1/60}$。

##### 採点基準

ベータ・ガンマ関係8点、整数ガンマ値8点、最終値4点。計20点。

<!-- solution-end -->

### F0M-A04 極座標

- Level: A
- 目安時間: 7分
- 主題: 極座標と重積分

円板

$$
D=\{(x,y):x^2+y^2\le R^2\}
$$

の面積を極座標変換で求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

極座標

$$
x=r\cos\theta,\qquad y=r\sin\theta
$$

では、円板 $x^2+y^2\le R^2$ は

$$
0\le r\le R,\qquad 0\le\theta<2\pi
$$

となる。ヤコビアンの絶対値は $r$ なので

$$
\begin{aligned}
\operatorname{Area}(D)
&=\iint_D1\,dx\,dy\\
&=\int_0^{2\pi}\int_0^R r\,dr\,d\theta\\
&=\int_0^{2\pi}\frac{R^2}{2}\,d\theta
=\boxed{\pi R^2}.
\end{aligned}
$$

##### 本番答案

$0\le r\le R,0\le\theta<2\pi$, $dx\,dy=r\,dr\,d\theta$ より $\int_0^{2\pi}\int_0^Rr\,dr\,d\theta=\boxed{\pi R^2}$。

##### 採点基準

極座標の領域6点、ヤコビアン4点、重積分の立式6点、積分値4点。計20点。

<!-- solution-end -->

### F0M-A05 ヤコビアン

- Level: A
- 目安時間: 7分
- 主題: ヤコビアン

$$
x=uv,
\qquad y=u(1-v)
$$

のヤコビアンを求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

偏微分を並べると

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\det
\begin{pmatrix}
\partial x/\partial u&\partial x/\partial v\\
\partial y/\partial u&\partial y/\partial v
\end{pmatrix}
=
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}.
$$

したがって

$$
-vu-u(1-v)=-u.
$$

面積倍率は行列式の絶対値なので $|u|$、特に $u>0$ なら $u$ である。

##### 本番答案

ヤコビアンは $\det\begin{pmatrix}v&u\\1-v&-u\end{pmatrix}=-u$。したがって面積倍率は $|u|$、$u>0$ なら $u$。

##### 採点基準

偏微分行列8点、行列式の計算6点、絶対値を面積倍率とする説明6点。計20点。

<!-- solution-end -->

### F0M-A06 行列式・逆行列

- Level: A
- 目安時間: 7分
- 主題: 行列式と逆行列

$$
A=\begin{pmatrix}2&1\\1&3\end{pmatrix}
$$

の行列式と逆行列を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

まず

$$
\det A=2\cdot3-1\cdot1=5\ne0
$$

なので逆行列が存在する。2次行列の公式から

$$
A^{-1}
=\frac1{\det A}
\begin{pmatrix}3&-1\\-1&2\end{pmatrix}
=\boxed{\frac15
\begin{pmatrix}3&-1\\-1&2\end{pmatrix}}.
$$

実際に $AA^{-1}=I$ となるので検算できる。

##### 本番答案

$\det A=5$ より $A^{-1}=\boxed{\frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}}$。

##### 採点基準

行列式6点、可逆性の確認4点、逆行列8点、検算または結論2点。計20点。

<!-- solution-end -->

### F0M-A07 テイラー展開で主要項を読む

- Level: A
- 目安時間: 8分
- 主題: テイラー展開とランダウ記号

$x\to0$ とする。次の各式について、最初に0でない項まで求め、剰余を $O(\cdot)$ で表せ。

1. $e^x-1-x$
2. $\log(1+x)-x$
3. $\sqrt{1+x}-1-x/2$

<!-- solution-start -->

#### 解答

##### 詳細解答

1. 
   $$
   e^x=1+x+\frac{x^2}{2}+O(x^3)
   $$
   より
   $$
   \boxed{e^x-1-x=\frac{x^2}{2}+O(x^3)}.
   $$
2. 
   $$
   \log(1+x)=x-\frac{x^2}{2}+O(x^3)
   $$
   より
   $$
   \boxed{\log(1+x)-x=-\frac{x^2}{2}+O(x^3)}.
   $$
3. 二項展開 $(1+x)^{1/2}$ を使うと
   $$
   \sqrt{1+x}
   =1+\frac{x}{2}-\frac{x^2}{8}+O(x^3),
   $$
   したがって
   $$
   \boxed{\sqrt{1+x}-1-\frac{x}{2}
   =-\frac{x^2}{8}+O(x^3)}.
   $$

3問とも1次項まで差し引いたため、残りの主要項は2次になります。

##### 本番答案

$e^x-1-x=x^2/2+O(x^3)$、$\log(1+x)-x=-x^2/2+O(x^3)$、$\sqrt{1+x}-1-x/2=-x^2/8+O(x^3)$。

##### 採点基準

各小問についてTaylor展開4点、差し引きと主要項2点。3問18点、剰余次数の整合性2点。計20点。

<!-- solution-end -->

### F0M-A08 $O$ と $o$ の判定

- Level: A
- 目安時間: 8分
- 主題: ランダウ記号

$x\to0$ とする。次の主張の真偽を判定し、理由を述べよ。

1. $e^x-1-x=O(x^2)$
2. $e^x-1-x=o(x)$
3. $e^x-1-x=o(x^2)$

<!-- solution-start -->

#### 解答

##### 詳細解答

Taylor展開

$$
e^x-1-x=\frac{x^2}{2}+O(x^3)
$$

を使います。

1. $x^2$ と同じ次数なので真。
2. $x$ で割ると
   $$
   \frac{e^x-1-x}{x}
   =\frac{x}{2}+O(x^2)\to0,
   $$
   よって真。
3. $x^2$ で割ると
   $$
   \frac{e^x-1-x}{x^2}
   =\frac12+O(x)\to\frac12\ne0,
   $$
   よって偽。

$O(x^2)$ は「高々 $x^2$ 程度」、$o(x)$ は「$x$ より十分小さい」、$o(x^2)$ は「$x^2$ よりもさらに小さい」という違いです。

##### 本番答案

Taylor展開より $e^x-1-x=x^2/2+O(x^3)$。したがって (1) 真、(2) 真、(3) 偽。特に $x^2$ で割ると $1/2$ に収束するため $o(x^2)$ ではない。

##### 採点基準

Taylor展開6点、各判定4点×3、説明2点。計20点。

<!-- solution-end -->

### F0M-A09 $\sup$・$\inf$ と最大・最小

- Level: A
- 目安時間: 8分
- 主題: 上限・下限

次の集合について $\sup,\inf,\max,\min$ を求めよ。最大値・最小値が存在しない場合はその旨を述べよ。

1. $A=(0,1)$
2. $B=\{1/n:n=1,2,\ldots\}$

<!-- solution-start -->

#### 解答

##### 詳細解答

1. $A=(0,1)$ ではすべての要素が $0$ より大きく $1$ より小さい。0は最大の下界、1は最小の上界なので
   $$
   \inf A=0,\qquad \sup A=1.
   $$
   しかし $0,1\notin A$ なので $\min A,\max A$ は存在しない。
2. $B$ では最大要素は $1$ なので
   $$
   \sup B=\max B=1.
   $$
   また $1/n\downarrow0$ なので
   $$
   \inf B=0.
   $$
   ただし $1/n=0$ となる自然数 $n$ はないため $\min B$ は存在しない。

##### 本番答案

$A=(0,1)$ は $\inf A=0,\sup A=1$、最大・最小なし。$B=\{1/n\}$ は $\inf B=0$、$\sup B=\max B=1$、最小なし。

##### 採点基準

各集合について $\inf,\sup$ 各4点、最大・最小の存在判定各3点。説明2点。計20点。

<!-- solution-end -->

### F0M-B01 ガウス積分の変形

- Level: B
- 目安時間: 12分
- 主題: ガウス積分と積分記号下の微分

$a>0$ とする。

$$
\int_{-\infty}^{\infty}x^2e^{-ax^2}\,dx
$$

を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

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

##### 本番答案

$F(a)=\sqrt\pi a^{-1/2}$ と置くと $F'(a)=-\int x^2e^{-ax^2}dx=-(\sqrt\pi/2)a^{-3/2}$。よって積分値は $\boxed{\sqrt\pi/(2a^{3/2})}$。

##### 採点基準

$F(a)$ の設定4点、積分記号下の微分8点、$F'(a)$ の微分4点、最終値4点。計20点。

<!-- solution-end -->

### F0M-B02 ベータ・ガンマ関係のヤコビアン

- Level: B
- 目安時間: 10分
- 主題: 逆変換とヤコビアン

$$
r=x+y,
\qquad u=\frac{x}{x+y}
$$

の逆変換とヤコビアンの絶対値を求めよ。ただし $x,y>0$ とする。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
x=ru,
\qquad y=r(1-u),
$$

変換後の領域は $r>0,0<u<1$。ヤコビアンは

$$
\det
\begin{pmatrix}
u&r\\
1-u&-r
\end{pmatrix}
=-r,
$$

従って絶対値は $r$ です。

##### 本番答案

逆変換は $x=ru,y=r(1-u)$、変換後の領域は $r>0,0<u<1$。ヤコビアンは $-r$ なので絶対値は $r$。

##### 採点基準

逆変換6点、変換後の領域4点、ヤコビアン6点、絶対値4点。計20点。

<!-- solution-end -->

### F0M-B03 固有値と正定値性

- Level: B
- 目安時間: 10分
- 主題: 固有値と正定値性

$$
A=\begin{pmatrix}4&2\\2&4\end{pmatrix}
$$

の固有値を求め、正定値性を判定せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\det(A-\lambda I)
=(4-\lambda)^2-4
=(\lambda-6)(\lambda-2).
$$

固有値は $6,2$。実対称かつ全固有値が正なので正定値です。

##### 本番答案

$\det(A-\lambda I)=(4-\lambda)^2-4=(\lambda-6)(\lambda-2)$。固有値 $6,2$ はともに正なので $A$ は正定値。

##### 採点基準

特性方程式8点、固有値6点、正定値判定6点。計20点。

<!-- solution-end -->

### F0M-B04 二次形式の最大化

- Level: B
- 目安時間: 12分
- 主題: 二次形式と固有値

実対称行列 $A$ の最大固有値を $\lambda_{\max}$ とする。$\|\boldsymbol x\|=1$ の下で

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x
$$

の最大値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

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

##### 本番答案

$A=Q\Lambda Q^{\mathsf T}$、$z=Q^{\mathsf T}x$ とすれば $\sum z_i^2=1$ かつ $x^{\mathsf T}Ax=\sum\lambda_i z_i^2\le\lambda_{\max}$。最大値は $\boxed{\lambda_{\max}}$。

##### 採点基準

直交対角化5点、ノルム保存4点、上界評価7点、等号成立条件4点。計20点。

<!-- solution-end -->

### F0M-B05 射影行列

- Level: B
- 目安時間: 12分
- 主題: 射影行列

列フルランクな $A\in\mathbb R^{n\times p}$ に対して

$$
P=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
$$

が対称かつ冪等であることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$A^{\mathsf T}A$ は対称なので、その逆行列も対称である。したがって

$$
\begin{aligned}
P^{\mathsf T}
&=\left\{A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\right\}^{\mathsf T}\\
&=A\left\{(A^{\mathsf T}A)^{-1}\right\}^{\mathsf T}A^{\mathsf T}\\
&=P.
\end{aligned}
$$

また

$$
\begin{aligned}
P^2
&=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=A(A^{\mathsf T}A)^{-1}
(A^{\mathsf T}A)(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=P.
\end{aligned}
$$

よって $P$ は対称かつ冪等であり、$\operatorname{col}(A)$ への直交射影行列である。

##### 本番答案

$(A^{\mathsf T}A)^{-1}$ は対称なので $P^{\mathsf T}=P$。また $P^2=A(A^{\mathsf T}A)^{-1}(A^{\mathsf T}A)(A^{\mathsf T}A)^{-1}A^{\mathsf T}=P$。

##### 採点基準

対称性8点、冪等性8点、直交射影という結論4点。計20点。

<!-- solution-end -->

### F0M-B06 多変量ガウス積分

- Level: B
- 目安時間: 15分
- 主題: 多変量ガウス積分

$A$ を $p\times p$ 実対称正定値行列とする。次を求めよ。

$$
\int_{\mathbb R^p}
\exp\left(-\frac12\boldsymbol x^{\mathsf T}A\boldsymbol x\right)d\boldsymbol x.
$$

<!-- solution-start -->

#### 解答

##### 詳細解答

$A=Q\Lambda Q^{\mathsf T}$ と直交対角化し、$\boldsymbol z=Q^{\mathsf T}\boldsymbol x$ と置きます。$|\det Q|=1$ なので

$$
\begin{aligned}
\int e^{-\boldsymbol x^{\mathsf T}A\boldsymbol x/2}d\boldsymbol x
&=\prod_i\int_{-\infty}^{\infty}e^{-\lambda_i z_i^2/2}dz_i\\
&=\prod_i\sqrt{\frac{2\pi}{\lambda_i}}\\
&=\boxed{\frac{(2\pi)^{p/2}}{\sqrt{\det A}}}.
\end{aligned}
$$

##### 本番答案

$A=Q\Lambda Q^{\mathsf T}$ とし $z=Q^{\mathsf T}x$ と変換すると、積分は $\prod_i\sqrt{2\pi/\lambda_i}$。よって $\boxed{(2\pi)^{p/2}/\sqrt{\det A}}$。

##### 採点基準

直交対角化4点、変数変換と体積要素4点、積の分離6点、行列式を用いた最終式6点。計20点。

<!-- solution-end -->

### F0M-B07 $n^{-1/2}$ スケールの対数展開

- Level: B
- 目安時間: 10分
- 主題: テイラー展開と漸近評価

固定した $h\in\mathbb R$ に対し、$n\to\infty$ で

$$
n\left\{
\log\left(1+\frac{h}{\sqrt n}\right)
-\frac{h}{\sqrt n}
\right\}
$$

の極限を求めよ。また誤差項まで含めた展開を書け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$z\to0$ で

$$
\log(1+z)=z-\frac{z^2}{2}+O(z^3)
$$

なので $z=h/\sqrt n$ を代入すると

$$
\log\left(1+\frac{h}{\sqrt n}\right)
=\frac{h}{\sqrt n}
-\frac{h^2}{2n}
+O(n^{-3/2}).
$$

従って

$$
\begin{aligned}
n\left\{
\log\left(1+\frac{h}{\sqrt n}\right)
-\frac{h}{\sqrt n}
\right\}
&=-\frac{h^2}{2}+O(n^{-1/2}).
\end{aligned}
$$

よって

$$
\boxed{-\frac{h^2}{2}}
$$

に収束します。同値な形として

$$
\boxed{
n\log\left(1+\frac{h}{\sqrt n}\right)
=h\sqrt n-\frac{h^2}{2}+O(n^{-1/2})
}
$$

も重要です。

##### 本番答案

$\log(1+z)=z-z^2/2+O(z^3)$ に $z=h/\sqrt n$ を代入すると、対象は $-h^2/2+O(n^{-1/2})$。したがって極限は $\boxed{-h^2/2}$。

##### 採点基準

Taylor展開6点、$h/\sqrt n$ の代入5点、$n$ 倍後の誤差次数5点、極限4点。計20点。

<!-- solution-end -->

### F0M-C01 ベータ・ガンマ関係を最初から導く

- Level: C
- 目安時間: 20分
- 主題: ベータ関数とガンマ関数の関係

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

#### 解答

##### 詳細解答

$$
\Gamma(a)\Gamma(b)
=
\int_0^\infty\int_0^\infty
x^{a-1}y^{b-1}e^{-(x+y)}dxdy.
$$

逆変換は $x=ru,y=r(1-u)$、変換後の領域は $r>0,0<u<1$、ヤコビアン絶対値は $r$。従って

$$
\begin{aligned}
\Gamma(a)\Gamma(b)
&=\int_0^1\int_0^\infty
r^{a+b-1}u^{a-1}(1-u)^{b-1}e^{-r}\,dr\,du\\
&=B(a,b)\Gamma(a+b).
\end{aligned}
$$

両辺を $\Gamma(a+b)>0$ で割って結論を得ます。

##### 本番答案

$x=ru,y=r(1-u)$、$r>0,0<u<1$、ヤコビアン絶対値 $r$ を用いると $\Gamma(a)\Gamma(b)=B(a,b)\Gamma(a+b)$。従って $\boxed{B(a,b)=\Gamma(a)\Gamma(b)/\Gamma(a+b)}$。

##### 採点基準

ガンマ関数積の二重積分4点、逆変換3点、変換後の領域3点、ヤコビアン3点、積分の分離4点、最終式3点。計20点。

<!-- solution-end -->

---

## 14. 本番ドリル

### F0M-DRILL-01 数学基礎総合

- Level: C
- 目安時間: 25分
- 配点: 100点

次の6問を解け。

1. $\Gamma(5/2)$ を求める。
2. $B(2,3)$ を求める。
3. $\int_{-\infty}^{\infty}e^{-2x^2}\,dx$ を求める。
4. $x=uv,y=u(1-v)$ のヤコビアンを求める。
5. $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$ の固有値と正定値性を判定する。
6. $\|\boldsymbol x\|=1$ の下で $\boldsymbol x^{\mathsf T}A\boldsymbol x$ の最大値を求める。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. ガンマ関数の漸化式を使うと
   $$
   \Gamma\left(\frac52\right)
   =\frac32\Gamma\left(\frac32\right)
   =\frac32\frac12\Gamma\left(\frac12\right)
   =\frac{3\sqrt\pi}{4}.
   $$
2. ベータ・ガンマ関係から
   $$
   B(2,3)=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}
   =\frac{1!\,2!}{4!}=\frac1{12}.
   $$
3. $u=\sqrt2x$ と置けば $dx=du/\sqrt2$ なので
   $$
   \int_{-\infty}^{\infty}e^{-2x^2}\,dx
   =\frac1{\sqrt2}\int_{-\infty}^{\infty}e^{-u^2}\,du
   =\sqrt{\frac\pi2}.
   $$
4. 
   $$
   \frac{\partial(x,y)}{\partial(u,v)}
   =\det\begin{pmatrix}v&u\\1-v&-u\end{pmatrix}
   =-u.
   $$
   面積倍率は $|u|$ であり、$u>0$ なら $u$。
5. 
   $$
   \det(A-\lambda I)
   =(3-\lambda)^2-1
   =(\lambda-2)(\lambda-4).
   $$
   固有値は $2,4$。実対称行列で両方とも正なので正定値。
6. 実対称行列の二次形式は、単位ベクトル上で最大固有値を最大値に持つ。第5問より最大固有値は4なので
   $$
   \max_{\|\boldsymbol x\|=1}\boldsymbol x^{\mathsf T}A\boldsymbol x=4.
   $$

##### 本番答案

1. $\Gamma(5/2)=(3/2)(1/2)\sqrt\pi=3\sqrt\pi/4$。
2. $B(2,3)=1!2!/4!=1/12$。
3. $u=\sqrt2x$ より $\int e^{-2x^2}dx=\sqrt{\pi/2}$。
4. ヤコビアンは $-u$、面積倍率は $|u|$。
5. 特性多項式は $(\lambda-2)(\lambda-4)$、固有値は $2,4$。よって正定値。
6. 単位球面上の二次形式の最大値は最大固有値なので4。

##### 採点基準

第1問15点：漸化式10点、最終値5点。

第2問15点：ベータ・ガンマ関係8点、最終値7点。

第3問15点：尺度変換8点、ガウス積分の適用7点。

第4問15点：偏微分行列6点、行列式5点、絶対値4点。

第5問20点：特性方程式8点、固有値6点、正定値判定6点。

第6問20点：二次形式と最大固有値の関係12点、第5問との接続8点。合計100点。

<!-- solution-end -->

---

## 15. 統計でどこに使うか

各数学事項の主な接続先は次の通りです。

| 数学 | 主な接続先 |
|---|---|
| 広義積分 | 期待値の存在、裾の評価 |
| 部分積分 | ガンマ型積分、期待値、モーメント |
| ガウス積分 | 正規分布の正規化、多変量正規分布 |
| ガンマ関数 | ガンマ分布、カイ二乗分布、t分布、F分布 |
| ベータ関数 | ベータ分布、t分布、F分布、順序統計量 |
| 重積分 | 同時分布、周辺化、多変量分布 |
| ヤコビアン | 確率変数の変数変換、標本分布 |
| $\sup$・$\inf$ | 尤度比、複合帰無仮説の $p$ 値、最悪値評価、リスク |
| テイラー展開 | 漸近正規性、デルタ法、尤度比・ワルド・スコア |
| ランダウ記号 | 漸近展開の誤差評価、局所対立、尤度の2次近似 |
| スターリング公式 | 二項係数、離散分布の漸近近似、Laplace法 |
| 固有値・二次形式 | 多変量正規分布、主成分分析、カイ二乗型統計量 |
| 射影行列 | 線形回帰、分散分析、一般線形仮説 |
| シュール補 | 多変量正規分布の条件付き分布 |

---

## 16. 章末チェック

- [ ] 基本微分公式を見ずに書ける。
- [ ] 部分積分の一般形 $\int_a^b f g'= [fg]_a^b-\int_a^b f'g$ を書き、$\int u\,dv$ 形へ移せる。
- [ ] 広義積分で部分積分するとき、有限区間で計算してから極限を取れる。
- [ ] 部分積分・置換積分を自力で起動できる。
- [ ] $\int_0^1x^a dx$ と $\int_1^\infty x^{-p}dx$ の収束条件を説明できる。
- [ ] ガウス積分を極座標から導出できる。
- [ ] 極座標のヤコビアンが $r$ になることを計算できる。
- [ ] 一般の2変数ヤコビアンを行列式から求められる。
- [ ] ガンマ関数の定義・漸化式・半整数値を使える。
- [ ] ベータ関数とガンマ関数の関係を使える。
- [ ] ベータ・ガンマ関係を2重積分から追える。
- [ ] $\sup$・$\inf$ と $\max$・$\min$ の違いを例で説明できる。
- [ ] 尤度比や複合帰無仮説の式に現れる $\sup$ の意味を読める。
- [ ] 2次行列の行列式・逆行列・固有値を計算できる。
- [ ] 列フルランクなら $A^{\mathsf T}A$ が可逆な理由を説明できる。
- [ ] 実対称行列を直交対角化し、二次形式へ使える。
- [ ] 正定値性を固有値または首座小行列式で判定できる。
- [ ] 射影行列の対称性・冪等性を確認できる。
- [ ] テイラー展開を2次まで書き、残りを $O(\cdot)$ または $o(\cdot)$ で表せる。
- [ ] $O$ と $o$ の違いを比の極限で判定できる。
- [ ] $n^{-1/2}$ スケールをTaylor展開へ代入し、$n$ 倍後の誤差次数を追える。
- [ ] スターリング公式の概略導出を、ガンマ積分→$x=n$ 周りのTaylor展開→ガウス積分の順に説明できる。
- [ ] ラグランジュ未定乗数法から固有値問題が出る流れを説明できる。
