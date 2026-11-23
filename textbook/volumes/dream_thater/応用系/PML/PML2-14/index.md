# PML2-14 単一のPDE解と「解作用素」の学習は何が違うか

## 1. 解を一つ当てることから、問題の族を解くことへ

これまでの[Poisson境界値問題の古典解](../PML2-01/index.md#def-pml2-01-classical)と[強残差による誤差評価](../PML2-11/index.md#thm-pml2-11-energy-error)では、右辺 $f$ を一つ固定して近似関数 $v(x)$ を調べた。有限個の学習点と連続残差の違いも[前講](../PML2-13/index.md#thm-pml2-13-midpoint)で扱った。

同じ装置で荷重、初期温度、材料係数を何度も変えるときは、毎回一つの $v$ を学習する代わりに、**入力された関数 $f$ に応じて解の関数 $u_f$ を返す規則**を学習したい。入力が数値一個とは限らず、場所 $x$ ごとに異なる値を持つ関数である点が転換点になる。

本講ではまず、長さ1の区間の零Dirichlet問題

$$
-u_f''(x)=f(x)\quad(0<x<1),\qquad u_f(0)=u_f(1)=0
$$

を一貫して使う。$x$ は空間位置、添字 $f$ は「入力 $f$ に対する解」を表し、微分する変数ではない。境界条件と方程式の形は固定し、連続な右辺 $f$ だけを変える。これにより「学習入力の違い」と「同じ入力に対する解の誤差」を別々に測れる。

## 2. 入力も出力も関数である写像

$C([0,1])$ は区間上の実数値連続関数の集合である。関数同士の距離は、まず全点での最大差を測る一様ノルムで表す。

$$
\|f\|_\infty=\max_{0\le x\le1}|f(x)|,\qquad
\|f-g\|_\infty=\max_{0\le x\le1}|f(x)-g(x)|.
$$

連続関数が閉区間上で最大値を取るため、この量は有限である。例えば $f(x)=x$、$g(x)=1-x$ なら $|f(x)-g(x)|=|2x-1|$ は両端で1となり、$\|f-g\|_\infty=1$。入力の集合 $\mathcal F\subset C([0,1])$ を指定してから、その入力に対する出力を比べる。

<a id="def-pml2-14-operator"></a>

<!-- formal-statement-start -->
> **定義（Poisson解作用素と入力関数族）**  
> $C([0,1])$ に一様ノルムを入れ、非空の入力集合 $\mathcal F\subset C([0,1])$ を固定する。各 $f\in\mathcal F$ に対し、零Dirichlet問題 $-u_f''=f$、$u_f(0)=u_f(1)=0$ の唯一の古典解を対応させる写像

$$
\mathcal G:\mathcal F\longrightarrow C([0,1]),\qquad
\mathcal G(f)=u_f
$$

> をこの入力族の **解作用素** と呼ぶ。$\mathcal G(f)$ は関数であり、$\mathcal G(f)(x)$ はその位置 $x$ における値である。
<!-- formal-statement-end -->

唯一の解が存在することは、$f\in C([0,1])\subset L^2(0,1)$ に対する既習の[解の構成定理](../PML2-01/index.md#thm-pml2-01-construction)と[一意性定理](../PML2-01/index.md#thm-pml2-01-energy)で保証される。したがって、この定義は入力ごとに矛盾なく一つの出力を対応させている。

この対応はすべての $f\in C([0,1])$ について定まる。入力族を $\mathcal F$ に制限した第2節の作用素と、全体 $C([0,1])$ 上で定めた作用素を、以下では同じ $\mathcal G$ と書く。$\mathcal Gf$ は $\mathcal G(f)$ の略記で、$(\mathcal Gf)(x)$ は出力関数を空間位置 $x$ で評価した値である。$f$ は入力関数であり、$\mathcal Gf$ は $f$ の微分を表さない。

<!-- definition-example-start: def-pml2-14-operator -->
**定義の確認**。 この例では $u_a$ を $u_{f_a}$ の略記とする。$\mathcal F=\{f_a:f_a(x)=a,\ -1\le a\le1\}$ とする。$f_a$ は全点で定数なので連続であり、$\|f_a-f_b\|_\infty=|a-b|$。$u_a(x)=a x(1-x)/2$ と置けば、$u_a''=-a$、$u_a(0)=u_a(1)=0$。よってすべての $a\in[-1,1]$ について $\mathcal G(f_a)=u_a$ である。入力の定数 $a$ が変わると、**出力の関数全体**が変わることを直接確かめた。
<!-- definition-example-end -->

同じ入力関数でも $x$ を変えるのと、同じ $x$ で入力関数 $f$ を変えるのは異なる操作である。従来の単一解のモデルは $v_\theta(x)$、作用素近似モデルは $\widehat{\mathcal G}_\theta(f)(x)$ と書き分ける。$\theta$ は学習で決まる共通のパラメータである。

## 3. 具体的な解作用素と、その安定性

抽象的な「関数を返す規則」を計算できる形にする。$f$ が与えられたとき、既習の[Poisson解の積分構成](../PML2-01/index.md#thm-pml2-01-construction)を変形すると、解は重み付き積分で表せる。

$x$ と $t$ はともに $[0,1]$ にあるが、$x$ は解を評価する位置、$t$ は積分変数である。各 $x$ に対して $t\le x$ と $t\ge x$ に分けると、重みは次のようになる。

$$
K(x,t)=
\begin{cases}
t(1-x)&0\le t\le x\le1,\\
x(1-t)&0\le x\le t\le1.
\end{cases}
$$

この $K$ を用いると、入力 $f$ の値を区間全体から集めて $\mathcal G(f)(x)$ を計算できる。積分式の導出と、入力誤差が出力へどれほど伝わるかを一つの定理で確かめる。

<a id="thm-pml2-14-green"></a>

<!-- formal-statement-start -->
> **定理（Poisson解作用素の積分表示・線形性・一様安定性）**  
> 実数値の $f\in C([0,1])$ を入力とし、$K$ を上の区分式で定める。零Dirichlet問題 $-u''=f$ の唯一の古典解は

$$
(\mathcal Gf)(x)=\int_0^1 K(x,t)f(t)\,dt
=(1-x)\int_0^x t f(t)\,dt
+x\int_x^1(1-t)f(t)\,dt
$$

> である。$\mathcal G:C([0,1])\to C^2([0,1])$ は線形であり、任意の $f,g\in C([0,1])$ について

$$
\|\mathcal Gf-\mathcal Gg\|_\infty
\le\frac18\|f-g\|_\infty.
$$

> 定数 $1/8$ はこの一様ノルム評価で最良である。
<!-- formal-statement-end -->

**証明の見取り図。** 二つの積分をそれぞれ $A(x)$、$B(x)$ と書くと、微分したときの端点由来の項が相殺する。核 $K$ は非負なので、入力差の最大値を積分の外に出して出力差を評価できる。

<!-- proof-start -->
### 証明

$f\in C([0,1])$ に対し $A(x)=\int_0^xtf(t)\,dt$、$B(x)=\int_x^1(1-t)f(t)\,dt$ と置く。被積分関数 $tf(t)$ と $(1-t)f(t)$ は連続である。$0<x<1$ とし、$h\to0$ のとき差商を取ると、

$$
\frac{A(x+h)-A(x)}h
=\frac1h\int_x^{x+h}tf(t)\,dt\longrightarrow xf(x),
$$

$$
\frac{B(x+h)-B(x)}h
=-\frac1h\int_x^{x+h}(1-t)f(t)\,dt
\longrightarrow -(1-x)f(x).
$$

ここで連続関数の区間平均が区間の縮小先の値に収束することを用いた。端点では片側差商を取ればよい。従って

$$
A'(x)=xf(x),\qquad B'(x)=-(1-x)f(x).
$$

$u(x)=(1-x)A(x)+xB(x)$ を微分すると

$$
\begin{aligned}
u'(x)
&=-A(x)+(1-x)A'(x)+B(x)+xB'(x)\\
&=-A(x)+(1-x)xf(x)+B(x)-x(1-x)f(x)\\
&=-A(x)+B(x).
\end{aligned}
$$

さらに $u''(x)=-A'(x)+B'(x)=-xf(x)-(1-x)f(x)=-f(x)$。$u(0)=B(0)\cdot0=0$、$u(1)=A(1)\cdot0=0$ であり、$f$ の連続性から $u\in C^2([0,1])$。したがって[古典解の定義](../PML2-01/index.md#def-pml2-01-classical)を満たす。[一意性](../PML2-01/index.md#thm-pml2-01-energy)によって $u=\mathcal Gf$ となる。

積分の線形性により、実数 $\alpha,\beta$ と連続関数 $f,g$ について $\mathcal G(\alpha f+\beta g)=\alpha\mathcal Gf+\beta\mathcal Gg$。

次に $h=f-g$ と置く。$K(x,t)\ge0$ で、$|h(t)|\le\|h\|_\infty$ だから

$$
\begin{aligned}
|(\mathcal Gf)(x)-(\mathcal Gg)(x)|
&=\left|\int_0^1K(x,t)h(t)\,dt\right|\\
&\le\|h\|_\infty\int_0^1K(x,t)\,dt\\
&=\|h\|_\infty
\left[(1-x)\frac{x^2}{2}+x\frac{(1-x)^2}{2}\right]\\
&=\frac{x(1-x)}2\|h\|_\infty
\le\frac18\|h\|_\infty.
\end{aligned}
$$

最後の不等式では $x(1-x)=1/4-(x-1/2)^2\le1/4$ を用いた。全 $x$ で最大を取れば主張の評価となる。$h\equiv1$ のとき $\mathcal Gh=x(1-x)/2$、その最大値は $x=1/2$ で $1/8$。したがって係数を $1/8$ より小さくできない。
<!-- proof-end -->

**使い方。** 入力を $f$ から $g$ へ変えても、出力関数の最大差は入力最大差の $1/8$ 以下である。この安定性は**Poisson解作用素 $\mathcal G$**についての性質であり、学習器 $\widehat{\mathcal G}_\theta$ が自動的に同じ定数で安定になるという意味ではない。

具体的に $f(x)=x$ なら $-u''=x$ を二回積分し、零端点条件を課すと

$$
\mathcal Gf(x)=\frac{x-x^3}{6}.
$$

$f\equiv1$ の解 $x(1-x)/2$ とは形が異なる。両方を同じルールから出力することが、作用素学習で目指す仕事である。

## 4. 一つの学習入力に適合しても、別入力は未検証

入力関数 $f$ の族を学習するとは、何を小さくすることなのか。真の解作用素 $\mathcal G$ と、候補 $\widehat{\mathcal G}$ を比較する。一つの $f$ における出力誤差と、入力族全体で最も大きい誤差を区別する必要がある。

<a id="def-pml2-14-errors"></a>

<!-- formal-statement-start -->
> **定義（作用素近似の個別・訓練・一様誤差）**  
> 非空の $\mathcal F\subset C([0,1])$、真の解作用素 $\mathcal G:\mathcal F\to C([0,1])$、候補 $\widehat{\mathcal G}:\mathcal F\to C([0,1])$ を取る。各 $f\in\mathcal F$ の個別誤差を

$$
e(f)=\|\widehat{\mathcal G}(f)-\mathcal G(f)\|_\infty
$$

> とする。訓練入力 $f_1,\ldots,f_n\in\mathcal F$ の最大誤差、および $\mathcal F$ 上の一様誤差を

$$
E_{\mathrm{train}}=\max_{1\le i\le n}e(f_i),
\qquad E_{\mathcal F}=\sup_{f\in\mathcal F}e(f)
$$

> とする。$E_{\mathcal F}$ は有限とは限らない。ここでの訓練誤差は解関数との比較であり、PDEの点上の残差や確率的な汎化誤差とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-14-errors -->
**定義の確認**。 第2節の定数入力族 $\mathcal F=\{f_a:-1\le a\le1\}$ に対し、候補を $\widehat{\mathcal G}(f_a)=0$（零関数）と置く。$f_0$ だけを訓練したなら $E_{\mathrm{train}}=0$。しかし真解は $\mathcal G(f_a)(x)=a x(1-x)/2$ であるから、全 $a$ の個別誤差は $e(f_a)=|a|/8$、一様誤差は $E_{\mathcal F}=1/8$。関数出力、出力ノルム、入力集合上の上限を順番に計算して、二つの誤差が異なることを確かめた。
<!-- definition-example-end -->

実際の学習では真解データがすべて手に入るとは限らない。[PINNの強形式残差](../PML2-06/index.md#def-pml2-06-strong-residual)などを使う場合も、**入力ごとのPDE残差**、**入力族にわたる被覆**、**未見入力の解誤差**は別々の検査項目である。

## 5. 有限センサだけでは区別できない入力がある

関数 $f$ をモデルへ渡すとき、実装では有限個の位置 $\xi_1,\ldots,\xi_m$ で測った数値 $(f(\xi_1),\ldots,f(\xi_m))$ を渡すことが多い。これを**センサ観測**とする。どの位置で測るかを固定すると、異なる入力関数でもセンサ値が一致する場合がある。

<a id="def-pml2-14-sensors"></a>

<!-- formal-statement-start -->
> **定義（有限センサ観測とセンサ依存の作用素近似）**  
> 整数 $m\ge1$ と相異なる点 $\xi_1,\ldots,\xi_m\in[0,1]$ を固定する。観測写像を

$$
S(f)=(f(\xi_1),\ldots,f(\xi_m))\in\mathbb R^m
$$

> とする。写像 $A:\mathbb R^m\to C([0,1])$ によって $\widehat{\mathcal G}(f)=A(S(f))$ と書けるモデルを、ここでは**センサ依存の作用素近似**と呼ぶ。同じ観測ベクトルには必ず同じ出力関数を返す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-14-sensors -->
**定義の確認**。 センサを $\xi_1=0,\xi_2=1$ とし、$f_0(x)=0$ と $h(x)=x(1-x)$ を考える。二つとも連続で、$S(f_0)=(0,0)=S(h)$。一方 $h(1/2)=1/4$ なので異なる入力である。例えば $A(y_0,y_1)(x)=y_0x(1-x)/2$ と定めると、任意の $(y_0,y_1)\in\mathbb R^2$ に連続な出力関数を対応させるため、$A\circ S$ は定義どおりのセンサ依存モデルである。このモデルでは $A(S(f_0))=A(S(h))=0$ となる。一般にも、モデル $A$ がどれほど複雑でも、二つの観測ベクトルは完全に同じだから出力は同じになる。
<!-- definition-example-end -->

この現象は、学習の最適化を失敗したからではなく、入力の情報を有限個の数に落とすときに起こる。

<a id="thm-pml2-14-sensor-limit"></a>

<!-- formal-statement-start -->
> **定理（有限センサでの区別不能性と一様誤差下界）**  
> 任意の整数 $m\ge1$ と相異なる $\xi_1,\ldots,\xi_m\in[0,1]$ に対し、

$$
h(x)=\prod_{j=1}^m(x-\xi_j)^2
$$

> と定める。入力集合 $\mathcal F\subset C([0,1])$ が零関数 $0$ と $h$ の両方を含むなら、任意のセンサ依存モデル $\widehat{\mathcal G}=A\circ S$ について

$$
E_{\mathcal F}\ge\frac12\|\mathcal Gh\|_\infty>0.
$$

> ここで $\mathcal G$ は第3節の零Dirichlet Poisson解作用素である。
<!-- formal-statement-end -->

**証明の見取り図。** $h$ は全センサ位置で零だが、区間の内部のほとんどの点で正である。正の積分核はそれを非零の解へ移す。二つの入力に同じ近似出力を返すモデルには、少なくとも片方で一定以上の誤差が残る。

<!-- proof-start -->
### 証明

$h$ は多項式なので連続で、各 $\xi_j$ では因子 $(\xi_j-\xi_j)^2=0$ により $h(\xi_j)=0$。$S(h)=S(0)=(0,\ldots,0)$ だから $q=A(S(0))$ と置くと $\widehat{\mathcal G}(0)=\widehat{\mathcal G}(h)=q$。

次に $0<x<1$ を任意に固定する。第3節の核 $K(x,t)$ は $0<t<1$ で厳密に正、$h(t)$ は非負で有限個の点を除き正である。従って

$$
(\mathcal Gh)(x)=\int_0^1K(x,t)h(t)\,dt>0.
$$

ゆえに $\|\mathcal Gh\|_\infty>0$。積分表示から $\mathcal G0=0$ でもある。ノルムの三角不等式を $q$ と $\mathcal Gh$ に適用すると

$$
\begin{aligned}
\|\mathcal Gh\|_\infty
&=\|(\mathcal Gh-q)+(q-\mathcal G0)\|_\infty\\
&\le\|\mathcal Gh-q\|_\infty+\|q-\mathcal G0\|_\infty\\
&=e(h)+e(0)
\le2E_{\mathcal F}.
\end{aligned}
$$

したがって下界を得る。有限センサ値が入力関数を一意に決めるような**制限された入力族**では、そもそも $0,h$ の組が族に入らない場合があり、この下界はその族については主張していない。
<!-- proof-end -->

重要なのは、**有限センサで動くモデルは一切使えない**という結論ではない。例えば定数入力族では一点のセンサだけで $a$ を正確に知ることができる。入力が多項式の有限次元族か、それとも広い連続関数族かにより必要なセンサ数が変わる。

## 6. 学習入力の間を埋めるには何が要るか

有限個の訓練関数で誤差が小さかったとしても、まだ見ていない関数をどう扱うかが問題になる。入力集合 $\mathcal F$ の任意の $f$ が、いずれかの訓練入力 $f_i$ に一様ノルムで $\delta$ 以内なら、訓練集合は $\mathcal F$ を距離 $\delta$ で**被覆**している。モデル自身も入力に対して急変しないなら、解作用素 $\mathcal G$ の安定性と合わせて誤差を伝播できる。

<a id="thm-pml2-14-cover"></a>

<!-- formal-statement-start -->
> **定理（入力被覆とLipschitz条件による一様誤差評価）**  
> 非空の $\mathcal F\subset C([0,1])$ と有限個の訓練入力 $f_1,\ldots,f_n\in\mathcal F$ を取る。$\delta\ge0$ に対し、すべての $f\in\mathcal F$ がある $i$ について $\|f-f_i\|_\infty\le\delta$ を満たすとする。候補 $\widehat{\mathcal G}:\mathcal F\to C([0,1])$ が定数 $L\ge0$ に対し

$$
\|\widehat{\mathcal G}(f)-\widehat{\mathcal G}(g)\|_\infty
\le L\|f-g\|_\infty\qquad(f,g\in\mathcal F)
$$

> を満たすなら、第4節の誤差について

$$
E_{\mathcal F}\le E_{\mathrm{train}}+
\left(L+\frac18\right)\delta.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 未見の $f$ と近い訓練入力 $f_i$ を選び、モデル出力の移動、訓練時の誤差、真解の移動という三つに差を分解する。最後の移動には[Poisson解作用素の安定性](#thm-pml2-14-green)を使う。

<!-- proof-start -->
### 証明

任意の $f\in\mathcal F$ を固定し、仮定により $\|f-f_i\|_\infty\le\delta$ となる訓練入力 $f_i$ を選ぶ。出力差に二つの項を足して引き、

$$
\begin{aligned}
\widehat{\mathcal G}(f)-\mathcal G(f)
={}&[\widehat{\mathcal G}(f)-\widehat{\mathcal G}(f_i)]\\
&+[\widehat{\mathcal G}(f_i)-\mathcal G(f_i)]\\
&+[\mathcal G(f_i)-\mathcal G(f)].
\end{aligned}
$$

三角不等式、モデルのLipschitz仮定、[解作用素 $\mathcal G$ の $1/8$ 安定性](#thm-pml2-14-green)、誤差定義を順に用いると

$$
\begin{aligned}
e(f)
&\le L\|f-f_i\|_\infty+e(f_i)
+\frac18\|f_i-f\|_\infty\\
&\le L\delta+E_{\mathrm{train}}+\frac18\delta.
\end{aligned}
$$

右辺は $f$ に依存しないので、$\mathcal F$ 上の上限を取って結論を得る。
<!-- proof-end -->

**被覆の具体例。** 定数入力 $f_a(x)=a$、$a\in[-1,1]$ について訓練入力を $f_{-1},f_0,f_1$ とすると、任意の $a$ は $-1,0,1$ のいずれかから距離 $1/2$ 以内にある。したがって $\delta=1/2$。訓練関数の**位置**と、モデルの入力に対する変化率 $L$ の両方が必要になる。

逆に、出力が訓練入力では完全一致しても中間で大きく振動する候補なら、Lipschitz定数が大きくなり上界は弱い。有限の訓練関数を見ただけで、未知の入力族全体の誤差を証明したことにはならない。また、無限次元の広い入力集合に対し、有限の $\delta$-被覆を小さな $\delta$ で作れるかどうかは別途確認を要する。

## 7. 何を固定し、何を分けて報告するか

単一解近似は、固定した $f$ と空間点 $x$ について $\widehat u_f(x)$ を調べる。作用素近似は、入力 $f$ も変わるため、**訓練入力の数・範囲、各入力の観測センサ、出力を評価する格子、真解または独立数値解との比較**が必要になる。

例えば入力 $f_a=a$ の3種類を訓練し、未見の $a=1/2$ をテストする場合、入力の分割と、出力関数を評価する空間格子は別の軸である。テストで空間格子だけを変えても、未見の入力関数への性能を測定したことにはならない。

ここで得た[積分表示と安定性](#thm-pml2-14-green)、[有限センサの限界](#thm-pml2-14-sensor-limit)、[被覆による保証](#thm-pml2-14-cover)を判断基準とし、次講では実際に学習可能な積分核型の Neural Operator 層を構成する。

## 8. 演習と詳細解答

### Level A：対象と尺度を確かめる

<a id="ex-pml2-14-a01"></a>

### PML2-14-A01：入力関数間の距離
- Level: A

$f(x)=x$、$g(x)=1-x$ が $C([0,1])$ に属することを確かめ、$\|f\|_\infty$、$\|g\|_\infty$、$\|f-g\|_\infty$ を求めよ。

<!-- solution-start -->
**詳細解答。** $f,g$ は一次多項式なので閉区間で連続である。$0\le x\le1$ では $|f(x)|=x$ の最大が $x=1$ で1、$|g(x)|=1-x$ の最大が $x=0$ で1。差は $f(x)-g(x)=2x-1$ なので、その絶対値は $x=0$ または $1$ で1、途中では1以下。よって

$$
\|f\|_\infty=\|g\|_\infty=\|f-g\|_\infty=1.
$$

これは[解作用素の入力空間](#def-pml2-14-operator)で測る距離である。
<!-- solution-end -->

<a id="ex-pml2-14-a02"></a>

### PML2-14-A02：定数入力に対する出力
- Level: A

$f_a(x)=a$、$a\in[-1,1]$ の解作用素を求め、$\|\mathcal Gf_a\|_\infty$ と $\|\mathcal Gf_a-\mathcal Gf_b\|_\infty$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $u''=-a$ を二回積分すると、積分定数 $c,d$ により

$$
u'(x)=-ax+c,\qquad u(x)=-\frac a2x^2+cx+d.
$$

$u(0)=0$ で $d=0$、$u(1)=0$ で $c=a/2$。従って

$$
(\mathcal Gf_a)(x)=\frac a2x(1-x).
$$

$x(1-x)=1/4-(x-1/2)^2$ の最大は $1/4$。よって $\|\mathcal Gf_a\|_\infty=|a|/8$。差も $(a-b)x(1-x)/2$ なので $\|\mathcal Gf_a-\mathcal Gf_b\|_\infty=|a-b|/8$。入力差 $\|f_a-f_b\|_\infty=|a-b|$ に対して[安定性定理](#thm-pml2-14-green)の等号が成り立つ。
<!-- solution-end -->

<a id="ex-pml2-14-a03"></a>

### PML2-14-A03：線形の右辺から解を構成する
- Level: A

$f(x)=x$ に対し $-u''=f$、$u(0)=u(1)=0$ を解き、$u(1/2)$ および $\|u\|_\infty$ を求めよ。

<!-- solution-start -->
**詳細解答。** $u''=-x$ を二回積分すると

$$
u'(x)=-\frac{x^2}{2}+c,\qquad
u(x)=-\frac{x^3}{6}+cx+d.
$$

左端の $u(0)=0$ から $d=0$、右端の $u(1)=0$ から $-1/6+c=0$、すなわち $c=1/6$。したがって

$$
u(x)=\frac{x-x^3}{6},\qquad u(1/2)=\frac{1/2-1/8}{6}=\frac1{16}.
$$

$u'(x)=(1-3x^2)/6$ は $x=1/\sqrt3$ で符号が正から負へ変わり、$u(0)=u(1)=0$。最大値は

$$
u(1/\sqrt3)=\frac{1/\sqrt3-1/(3\sqrt3)}6
=\frac1{9\sqrt3}.
$$

$u$ は非負なので $\|u\|_\infty=1/(9\sqrt3)$。
<!-- solution-end -->

<a id="ex-pml2-14-a04"></a>

### PML2-14-A04：訓練関数一つの落とし穴
- Level: A

$\mathcal F=\{f_a:a\in[-1,1]\}$、$\widehat{\mathcal G}(f_a)=0$、訓練入力は $f_0$ のみとする。[誤差の定義](#def-pml2-14-errors)から $E_{\mathrm{train}}$、$E_\mathcal F$ を求めよ。

<!-- solution-start -->
**詳細解答。** $f_0=0$ なので $\mathcal G(f_0)=0$、候補も零関数を返し $E_{\mathrm{train}}=0$。[定数入力の解](#def-pml2-14-operator)より $e(f_a)=\|-a x(1-x)/2\|_\infty=|a|/8$。$|a|\le1$ の最大は1であるから

$$
E_\mathcal F=\sup_{-1\le a\le1}\frac{|a|}{8}=\frac18.
$$

訓練時の零誤差は他の $a$ への精度を保証しない。
<!-- solution-end -->

<a id="ex-pml2-14-a05"></a>

### PML2-14-A05：端点センサの同値入力
- Level: A

$\xi_1=0,\xi_2=1$ とし、$f_0=0$、$h(x)=x^2(1-x)^2$ とする。$S(f_0)$、$S(h)$ を求め、$h$ の非零性と $\mathcal Gh(1/2)>0$ を示せ。

<!-- solution-start -->
**詳細解答。** $h$ は多項式で連続、$h(0)=h(1)=0$。ゆえに両方のセンサ観測は $(0,0)$ である。一方 $h(1/2)=(1/2)^4=1/16>0$。核は $x=1/2$ で $K(1/2,t)=t/2$（左半分）、$K(1/2,t)=(1-t)/2$（右半分）。$h(t)=h(1-t)$ を使って対称にまとめると

$$
\begin{aligned}
(\mathcal Gh)(1/2)
&=2\int_0^{1/2}\frac t2\,t^2(1-t)^2\,dt\\
&=\int_0^{1/2}(t^3-2t^4+t^5)\,dt\\
&=\left[\frac{t^4}{4}-\frac{2t^5}{5}+\frac{t^6}{6}\right]_0^{1/2}\\
&=\frac1{64}-\frac1{80}+\frac1{384}=\frac{11}{1920}>0.
\end{aligned}
$$

[有限センサの定義](#def-pml2-14-sensors)では同じ観測でも、真解は異なる。
<!-- solution-end -->

### Level B：導出・仮定・反例

<a id="ex-pml2-14-b01"></a>

### PML2-14-B01：積分表示の検算
- Level: B

連続関数 $f$ に対し $A(x)=\int_0^xtf(t)dt$、$B(x)=\int_x^1(1-t)f(t)dt$、$u=(1-x)A+xB$ とする。$u\in C^2$、$-u''=f$、$u(0)=u(1)=0$ を途中式付きで示せ。

<!-- solution-start -->
**詳細解答。** $f$ が連続なので、$A$ の差商 $h^{-1}\int_x^{x+h}tf(t)dt$ は $xf(x)$ に収束する。$B$ の差商は $-h^{-1}\int_x^{x+h}(1-t)f(t)dt$ なので $-(1-x)f(x)$ に収束する。従って $A'=xf(x)$、$B'=-(1-x)f(x)$。積の微分を使うと

$$
\begin{aligned}
u'&=-A+(1-x)xf+B-x(1-x)f=-A+B,\\
u''&=-A'+B'=-xf-(1-x)f=-f.
\end{aligned}
$$

$f$ が連続なので $A',B'$ も連続、したがって $u''$ まで連続。$u(0)=(1-0)A(0)+0B(0)=0$、$u(1)=0A(1)+1B(1)=0$。よって[古典解の定義](../PML2-01/index.md#def-pml2-01-classical)を満たし、[一意性](../PML2-01/index.md#thm-pml2-01-energy)から $u=\mathcal Gf$ となる。
<!-- solution-end -->

<a id="ex-pml2-14-b02"></a>

### PML2-14-B02：安定性定数は改良できるか
- Level: B

任意の連続関数 $f,g$ に対して $\|\mathcal Gf-\mathcal Gg\|_\infty\le\|f-g\|_\infty/8$ を積分核から導き、$1/8$ より小さい共通係数を使えない反例を示せ。

<!-- solution-start -->
**詳細解答。** $h=f-g$ とすると[積分表示](#thm-pml2-14-green)と $K(x,t)\ge0$ より

$$
|(\mathcal Gh)(x)|
\le\|h\|_\infty\int_0^1K(x,t)\,dt.
$$

重みを左右に分けて積分すれば

$$
\int_0^1K(x,t)\,dt
=(1-x)\frac{x^2}2+x\frac{(1-x)^2}2
=\frac{x(1-x)}2\le\frac18.
$$

よって全点で上界が成立する。$f\equiv1$、$g\equiv0$ では $\|f-g\|_\infty=1$、$\mathcal Gf-\mathcal Gg=x(1-x)/2$ で $\|\mathcal Gf-\mathcal Gg\|_\infty=1/8$。したがって係数 $c<1/8$ を用いるとこの組で $1/8\le c$ に反する。
<!-- solution-end -->

<a id="ex-pml2-14-b03"></a>

### PML2-14-B03：同じ観測から生じる誤差下界
- Level: B

端点二点センサ $S(f)=(f(0),f(1))$、入力 $0$ と $h(x)=x(1-x)$ を含む入力族を考える。任意のセンサ依存モデルに対し $E_\mathcal F\ge5/384$ を示せ。

<!-- solution-start -->
**詳細解答。** $h(0)=h(1)=0$ より $S(h)=S(0)$ だから、両入力に対するモデル出力は同じ関数 $q$ である。[積分核](#thm-pml2-14-green)と $h(1-t)=h(t)$ の対称性より

$$
\begin{aligned}
(\mathcal Gh)(1/2)
&=2\int_0^{1/2}\frac t2\,t(1-t)\,dt\\
&=\int_0^{1/2}(t^2-t^3)\,dt\\
&=\left[\frac{t^3}3-\frac{t^4}4\right]_0^{1/2}
=\frac1{24}-\frac1{64}=\frac5{192}.
\end{aligned}
$$

従って $\|\mathcal Gh\|_\infty\ge5/192$。$\mathcal Gh-\mathcal G0=(\mathcal Gh-q)+(q-\mathcal G0)$ と二つの差に分け、ノルムを評価すると

$$
2E_\mathcal F\ge
\|q-\mathcal G0\|_\infty+\|q-\mathcal Gh\|_\infty
\ge\|\mathcal Gh-\mathcal G0\|_\infty
\ge\frac5{192}.
$$

よって $E_\mathcal F\ge5/384$。
<!-- solution-end -->

<a id="ex-pml2-14-b04"></a>

### PML2-14-B04：訓練点の被覆と中間の誤差
- Level: B

定数入力 $f_a(x)=a$、$a\in[-1,1]$ と、候補

$$
\widehat{\mathcal G}(f_a)(x)
=\frac{a+a(1-a^2)}2\,x(1-x)
$$

を考える。訓練入力を $a=-1,0,1$ として、被覆半径 $\delta$ と $E_{\mathrm{train}}$ を求めよ。さらに、モデルのLipschitz定数として $L=3/8$ が許されることを示し、$a=1/\sqrt3$ での誤差を計算して[被覆定理](#thm-pml2-14-cover)の上界と比較せよ。

<!-- solution-start -->
**詳細解答。** 入力距離は $\|f_a-f_b\|_\infty=|a-b|$ なので、各区間 $[-1,0]$、$[0,1]$ の中央が訓練点から最も遠く、$\delta=1/2$。補正項 $a(1-a^2)$ は $a=-1,0,1$ で零なので $E_{\mathrm{train}}=0$。

候補の係数を $p(a)=a+a(1-a^2)=2a-a^3$ と置くと、$p'(a)=2-3a^2$ であり $a\in[-1,1]$ では $|p'(a)|\le2\le3$。平均値の定理により $|p(a)-p(b)|\le3|a-b|$。出力の $x(1-x)/2$ の最大は $1/8$ だから

$$
\|\widehat{\mathcal G}(f_a)-\widehat{\mathcal G}(f_b)\|_\infty
=\frac{|p(a)-p(b)|}{8}\le\frac38|a-b|.
$$

従って $L=3/8$ は有効な上界である。[被覆定理](#thm-pml2-14-cover)は $E_\mathcal F\le0+(3/8+1/8)(1/2)=1/4$ を与える。一方、個別誤差は $|a(1-a^2)|/8$ なので $a=1/\sqrt3$ では

$$
e(f_{1/\sqrt3})
=\frac{(1/\sqrt3)(1-1/3)}8=\frac1{12\sqrt3}>0.
$$

訓練点で厳密一致しても中間に誤差が残り、定理の上界はその可能性を覆うが等号の必要はない。
<!-- solution-end -->

### Level C：入力族・センサ・検証の統合

<a id="ex-pml2-14-c01"></a>

### PML2-14-C01：有限次元の入力族と、その外側
- Level: C

$\mathcal F_2=\{f_{a,b}(x)=a+bx:-1\le a,b\le1\}$ を入力族とし、零Dirichlet Poisson解作用素を考える。

1. $\mathcal G(f_{a,b})$ を求め、境界条件と方程式を直接確認せよ。
2. $S(f)=(f(0),f(1))$ から $a,b$ を復元し、二つのセンサ値だけを使うモデルで $\mathcal F_2$ 上の作用素を厳密に表せることを示せ。
3. 入力族を $0$ と $h(x)=x(1-x)$ も含むよう拡張したとき、同じ二センサで一様誤差零が不可能な理由と、具体的な下界を示せ。
4. 未見の入力 $f_{1/2,-1/2}$ を評価する場合、「未知の入力を評価した」と言うためにどの軸を訓練と分離すべきか述べよ。

<!-- solution-start -->
**詳細解答。**

**(1) 解の導出。** [積分表示の線形性](#thm-pml2-14-green)を $f_{a,b}=a\cdot1+b\cdot x$ に適用する。定数入力と一次入力の解をそれぞれ求めると

$$
u_{a,b}(x)=a\frac{x(1-x)}2+b\frac{x-x^3}{6}.
$$

この式は多項式なので $C^2$ に属する。微分して

$$
u_{a,b}''(x)=-a-bx,\qquad
u_{a,b}(0)=0,\quad u_{a,b}(1)=0
$$

となる。従って $-u_{a,b}''=a+bx=f_{a,b}$ であり、[古典解](../PML2-01/index.md#def-pml2-01-classical)の全条件を満たす。

**(2) センサからの再構成。** $y_0=f_{a,b}(0)=a$、$y_1=f_{a,b}(1)=a+b$。ここから $a=y_0$、$b=y_1-y_0$ を一意に復元できる。従って

$$
A(y_0,y_1)(x)
=y_0\frac{x(1-x)}2+(y_1-y_0)\frac{x-x^3}{6}
$$

と定めれば、全 $f_{a,b}\in\mathcal F_2$ で $A(S(f_{a,b}))=\mathcal G(f_{a,b})$。この族では二点観測が入力を完全に定める。

**(3) 入力族を広げた場合。** $h(0)=h(1)=0$ だから $S(h)=S(0)$ となる。一方[積分核](#thm-pml2-14-green)で中央の値を求めると

$$
\mathcal Gh(1/2)
=2\int_0^{1/2}\frac t2\,t(1-t)\,dt
=\left[\frac{t^3}3-\frac{t^4}4\right]_0^{1/2}
=\frac5{192}.
$$

同じ出力 $q$ を二つの入力に返すモデルでは

$$
\max\{\|q-\mathcal G0\|_\infty,\|q-\mathcal Gh\|_\infty\}
\ge\frac12\|\mathcal Gh\|_\infty\ge\frac5{384}.
$$

よって拡張された入力族で一様誤差零は不可能。壊れた条件は、二センサで入力族を一意に復元できる性質である。

**(4) 評価の分離。** 訓練に使用する $(a,b)$ の組から $(1/2,-1/2)$ を外し、モデル選択・重み調整にもこのテスト入力を用いない。出力の空間格子数を変更することは別の実験であり、未見入力への一般化とは区別する。テスト入力に対する真解 $u_{1/2,-1/2}$ を(1)の式で計算し、共通の空間評価点または明示した関数ノルムで近似解と比較する。比較では入力分割、センサ位置、評価点数、数値解の誤差と計算資源も記録する。
<!-- solution-end -->
