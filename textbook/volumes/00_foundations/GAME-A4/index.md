# GAME-A4 凹ゲーム・KKT・変分不等式

<!-- definition-example-audit: strict -->

前章では、有限ゲームを混合戦略へ拡張し、不動点定理から Nash 均衡の存在を示しました。

ここからは、戦略そのものが数量・価格・投資量・努力量のような連続変数であるゲームへ進みます。各プレイヤーの意思決定は「相手を固定した一つの制約付き最適化問題」になります。

本章の中心は

$$
\boxed{
\text{Nash 均衡}
\Longleftrightarrow
\text{各プレイヤーの一次最適性}
\Longleftrightarrow
\text{全員の一次条件を一つに集約}
}
$$

という接続です。

凸最適化側で学んだ [KKT 条件](../OPT5/index.md#thm-opt5-kkt)、[法錐](../OPT3/index.md#def-opt3-normal-cone)、[接方向条件](../OPT6/index.md#thm-opt6-local-tangent) が、ここではゲーム全体を一つの連立条件として読む道具になります。

---

## 1. 戦略が連続量になると、各人が一つの最適化問題を解く

有限ゲームでは、プレイヤー $i$ の戦略集合 $S_i$ は有限集合でした。

戦略集合が有限集合ではない場合、たとえば

$
X_i=[0,1],\qquad
X_i=\{x_i\in\mathbb R^d:x_i\ge0,\ a^{\mathsf T}x_i\le b\}
$$

のような集合から戦略を選びます。

<a id="def-game-a4-continuous-game"></a>
<!-- formal-statement-start -->
> **定義（連続戦略ゲーム・Nash 均衡）**  
> プレイヤー集合を $N=\{1,\dots,n\}$ とする。各プレイヤー $i$ が非空集合 $X_i\subset\mathbb R^{d_i}$ から戦略 $x_i$ を選び、戦略プロファイル
>
> $$
> x=(x_1,\dots,x_n)\in X:=\prod_{i=1}^nX_i
> $$
>
> に対して利得 $u_i(x)$ を得るとする。この組を本章では **連続戦略ゲーム**という。
>
> $x^*\in X$ が **Nash 均衡**であるとは、任意のプレイヤー $i$ と任意の $y_i\in X_i$ に対して
>
> $$
> u_i(x_i^*,x_{-i}^*)
> \ge
> u_i(y_i,x_{-i}^*)
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a4-continuous-game -->
### 1.1 定義の確認：二人の目標追従ゲーム

二人が $X_1=X_2=[0,1]$ から $x_1,x_2$ を選び、

$$
u_1(x_1,x_2)
=
-\left(x_1-\frac{x_2}{2}\right)^2,
$$

$$
u_2(x_1,x_2)
=
-\left(x_2-\frac{1+x_1}{3}\right)^2
$$

を得るとします。

相手を固定すると、各人は平方誤差を0に近づけたいので

$$
BR_1(x_2)=\frac{x_2}{2},
\qquad
BR_2(x_1)=\frac{1+x_1}{3}.
$$

どちらも $[0,1]$ の中に収まります。

したがって Nash 均衡は

$$
x_1=\frac{x_2}{2},
\qquad
x_2=\frac{1+x_1}{3}
$$

を同時に満たす点です。解くと

$$
\boxed{
x^*
=
\left(\frac15,\frac25\right).
}
$$

有限ゲームの「最適反応の交点」と同じ考え方ですが、最適反応が連続量になっています。
<!-- definition-example-end -->

---

## 2. 凹性は「一次条件で大域最適性まで言える」ために使う

相手の戦略 $x_{-i}$ を固定したとき、プレイヤー $i$ は

$$
\max_{x_i\in X_i}
u_i(x_i,x_{-i})
$$

を解きます。

この問題が凸最適化の形になるためには、最大化する関数が自分の変数について凹であることが重要です。

<a id="def-game-a4-concave-game"></a>
<!-- formal-statement-start -->
> **定義（凹ゲーム）**  
> 連続戦略ゲームで、各 $X_i$ が非空凸集合であり、任意の固定した $x_{-i}$ に対して
>
> $$
> x_i\longmapsto u_i(x_i,x_{-i})
> $$
>
> が $X_i$ 上の凹関数であるとき、このゲームを本章では **凹ゲーム（concave game）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a4-concave-game -->
### 2.1 定義の確認：二次利得の Hessian を見る

$$
u_i(x_i,x_{-i})
=
-2x_i^2+a_i(x_{-i})x_i+b_i(x_{-i})
$$

とします。

自分の戦略 $x_i$ について二階微分すると

$$
\frac{\partial^2u_i}{\partial x_i^2}
=
-4<0.
$$

したがって、相手の戦略が何であっても $u_i$ は $x_i$ について狭義凹です。

一方、相手の変数との交差項があっても、たとえば

$$
u_i(x_i,x_j)
=
-x_i^2+x_ix_j
$$

なら

$$
\frac{\partial^2u_i}{\partial x_i^2}=-2<0
$$

なので、自分の変数については凹です。

ゲーム全体の利得を一つの共同目的関数にまとめる必要はありません。必要なのは、**各プレイヤーが自分の変数を動かす方向で凹であること**です。
<!-- definition-example-end -->

---

## 3. 連続凹ゲームにも Nash 均衡は存在する

有限ゲームでは混合戦略単体のコンパクト性と凸性を使いました。

連続戦略ゲームでは、もともとの戦略集合 $X_i$ に同じ役割を担わせます。

<a id="thm-game-a4-existence"></a>
<!-- formal-statement-start -->
> **定理（連続凹ゲームの Nash 均衡存在）**  
> 各 $X_i\subset\mathbb R^{d_i}$ が非空コンパクト凸集合であり、各 $u_i$ が $X=\prod_iX_i$ 上で連続であるとする。さらに、任意の $x_{-i}$ に対して
>
> $$
> x_i\mapsto u_i(x_i,x_{-i})
> $$
>
> が凹であるとする。
>
> このとき Nash 均衡が少なくとも一つ存在する。
<!-- formal-statement-end -->

### 証明の見取り図

各プレイヤーの最適反応対応

$$
BR_i(x_{-i})
=
\operatorname*{arg\,max}_{y_i\in X_i}
u_i(y_i,x_{-i})
$$

を考えます。

コンパクト性と連続性から最大値は達成されます。[Berge 最大値定理](../FIX3/index.md#thm-fix3-berge)から最適反応対応は非空コンパクト値かつ上半連続です。

凹性は最大化点集合を凸にします。そこで積対応へ [Kakutani 不動点定理](../FIX3/index.md#thm-fix3-kakutani)を適用します。

<!-- proof-start -->
### 証明

$X=\prod_iX_i$ は有限個の非空コンパクト凸集合の直積なので、非空コンパクト凸です。

プレイヤー $i$ を固定します。可行対応

$$
F_i(x_{-i})=X_i
$$

は定数対応で、非空コンパクト値かつ連続です。目的関数 $u_i(y_i,x_{-i})$ は仮定より連続です。

従って Berge 最大値定理から

$$
BR_i(x_{-i})
=
\operatorname*{arg\,max}_{y_i\in X_i}
u_i(y_i,x_{-i})
$$

は非空コンパクト値かつ上半連続です。

さらに $p_i,q_i\in BR_i(x_{-i})$ とし、その最大値を $M$ とします。$0\le\lambda\le1$ に対し、$X_i$ の凸性から

$$
\lambda p_i+(1-\lambda)q_i\in X_i.
$$

利得の凹性より

$$
u_i(\lambda p_i+(1-\lambda)q_i,x_{-i})
\ge
\lambda M+(1-\lambda)M
=
M.
$$

$M$ は最大値なので等号であり、凸結合も最適反応です。従って $BR_i(x_{-i})$ は凸です。

積対応

$$
BR(x)=\prod_iBR_i(x_{-i})
$$

は $X$ から $X$ への非空コンパクト凸値・上半連続対応です。

Kakutani 不動点定理から

$$
x^*\in BR(x^*)
$$

となる $x^*\in X$ が存在します。

これは各 $i$ について

$$
x_i^*\in BR_i(x_{-i}^*)
$$

を意味するので、$x^*$ は Nash 均衡です。$\square$
<!-- proof-end -->

> **凹性は存在だけなら少し強い仮定です。**  
> 最適反応集合の凸性には準凹性でも足ります。本章ではこの後、勾配による一次条件だけから大域最適性まで戻したいので、凹性を主仮定にします。

### 3.1 コンパクト性を失うと最適反応そのものが消える

一人だけのゲームを考え、

$$
X_1=(0,1),
\qquad
u_1(x_1)=x_1
$$

とします。

上限は1ですが、1は戦略集合に含まれません。

したがって最大化点がなく、最適反応も Nash 均衡も存在しません。

ここで壊れたのは「連続だからよい」という部分ではなく、

$$
\boxed{
\text{コンパクト性}
\Longrightarrow
\text{最大値の達成}
}
$$

という機構です。

---

## 4. Nash 条件を各プレイヤーの KKT 条件へ展開する

各プレイヤーの戦略集合が

$$
X_i
=
\left\{
x_i:
g_{ik}(x_i)\le0\ (k=1,\dots,m_i),
\quad
A_ix_i=b_i
\right\}
$$

と書けるとします。

Nash 均衡 $x^*$ では、各プレイヤー $i$ が

$$
\max_{x_i\in X_i}
u_i(x_i,x_{-i}^*)
$$

を解いています。

最大化を [OPT5 の KKT 標準形](../OPT5/index.md#thm-opt5-kkt)へ合わせるため、

$$
f_i(x_i)
=
-u_i(x_i,x_{-i}^*)
$$

を最小化します。

<a id="thm-game-a4-player-kkt"></a>
<!-- formal-statement-start -->
> **定理（凹ゲームのプレイヤー別 KKT 特徴付け）**  
> プレイヤー $i$ の戦略集合が

$$
X_i
=
\left\{
x_i:
g_{ik}(x_i)\le0\ (k=1,\dots,m_i),
\quad
A_ix_i=b_i
\right\}
$$

> と表されるとする。各 $g_{ik}$ は微分可能な凸関数であり、$u_i(\cdot,x_{-i})$ は微分可能な凹関数とする。さらに各プレイヤーのこの制約系が Slater 条件を満たすとする。
>
> このとき実行可能な戦略プロファイル $x^*\in\prod_iX_i$ が Nash 均衡であることと、各プレイヤー $i$ について乗数 $\lambda_i^*\ge0,\nu_i^*$ が存在して、次を満たすことは同値である。
>
> 1. **KKT の勾配条件**

$$
-\nabla_{x_i}u_i(x^*)
+
\sum_{k=1}^{m_i}
\lambda_{ik}^*\nabla g_{ik}(x_i^*)
+
A_i^{\mathsf T}\nu_i^*
=
0.
$$

> 2. **主実行可能性**

$$
g_{ik}(x_i^*)\le0,
\qquad
A_ix_i^*=b_i.
$$

> 3. **双対実行可能性**

$$
\lambda_{ik}^*\ge0.
$$

> 4. **相補性**

$$
\lambda_{ik}^*g_{ik}(x_i^*)=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

相手の戦略を $x_{-i}^*$ に固定すると、各プレイヤーの問題は

$$
\min_{x_i\in X_i}
-u_i(x_i,x_{-i}^*)
$$

という一つの凸最適化問題です。

したがって [凸問題の KKT 条件](../OPT5/index.md#thm-opt5-kkt)をプレイヤーごとに適用すれば終わります。

<!-- proof-start -->
### 証明

$x^*$ が Nash 均衡なら、各 $i$ について $x_i^*$ は

$$
\min_{x_i}
-u_i(x_i,x_{-i}^*)
$$

の大域最適解です。

$u_i(\cdot,x_{-i}^*)$ は凹なので $-u_i(\cdot,x_{-i}^*)$ は凸です。$g_{ik}$ は凸、等式制約はアフィンで、Slater 条件も仮定されています。

従って OPT5 の KKT 必要性から、上の4条件を満たす乗数が存在します。

逆に各プレイヤーで KKT 条件が成立すると、OPT5 の KKT 十分性から $x_i^*$ は

$$
\min_{x_i\in X_i}
-u_i(x_i,x_{-i}^*)
$$

の大域最適解です。

すなわち任意の $y_i\in X_i$ に対して

$$
u_i(x_i^*,x_{-i}^*)
\ge
u_i(y_i,x_{-i}^*).
$$

全ての $i$ で成立するので $x^*$ は Nash 均衡です。$\square$
<!-- proof-end -->

### 4.1 境界均衡では KKT 乗数が「これ以上動けない」を表す

二人が $X_1=X_2=[0,1]$ から選び、

$$
u_i(x_i,x_j)
=
-\left(x_i-1-\frac{x_j}{4}\right)^2
$$

を得るとします。

相手が $x_j=1$ のとき、制約がなければプレイヤー $i$ は $x_i=5/4$ を選びたい。しかし上限1があるので最適解は $x_i^*=1$ です。

上限制約を

$$
g_i(x_i)=x_i-1\le0
$$

と書きます。

$x^*=(1,1)$ では

$$
\frac{\partial u_i}{\partial x_i}(1,1)
=
\frac12.
$$

最大化を最小化 $-u_i$ へ直すと、KKT の勾配条件は

$$
-\frac12+\lambda_i=0.
$$

従って

$$
\boxed{\lambda_i=\frac12.}
$$

この正の乗数は、「利得を増やす方向は右向きだが、上限制約がその方向を止めている」ことを表しています。

---

## 5. KKT は Nash 均衡の定義そのものではない

KKT 乗数の存在には制約想定が関わります。

一人ゲーム

$$
\max_x x
\quad\text{制約}\quad
x^2\le0
$$

を考えます。

実行可能集合は

$$
X=\{0\}
$$

だけなので $x^*=0$ は当然 Nash 均衡です。

しかし最大化を最小化へ直すと

$$
\min_x -x
\quad\text{制約}\quad
g(x)=x^2\le0.
$$

$x=0$ で

$$
g'(0)=0.
$$

KKT の勾配条件は

$$
-1+\lambda\cdot0=0
$$

となり、どんな $\lambda\ge0$ でも満たせません。

[OPT6](../OPT6/index.md)で見たのと同じく、制約勾配が退化しているため、一次近似から本当の可行集合の法線を復元できません。

したがって

$$
\boxed{
\text{Nash 均衡}
\not\equiv
\text{無条件の KKT 連立方程式}
}
$$

です。

KKT は、凹性・凸性・制約想定などの条件の下で Nash 条件を計算可能な形へ展開する道具です。

---

## 6. 制約の書き方を消すと法錐条件になる

凸集合 $X_i$ に対し、[法錐](../OPT3/index.md#def-opt3-normal-cone)は

$$
N_{X_i}(x_i)
=
\left\{
v:
v^{\mathsf T}(y_i-x_i)\le0
\quad
\forall y_i\in X_i
\right\}
$$

でした。

相手を固定し、$u_i$ が自分の戦略について微分可能かつ凹なら、$x_i^*$ が最適反応であることは

$$
\nabla_{x_i}u_i(x^*)^{\mathsf T}
(y_i-x_i^*)
\le0
\qquad
(\forall y_i\in X_i)
$$

と同値です。

これはそのまま

$$
\boxed{
\nabla_{x_i}u_i(x^*)
\in
N_{X_i}(x_i^*)
}
$$

です。

KKT は法錐を制約勾配と乗数へ分解した表示だと見ることができます。

先ほどの退化例 $X=\{0\}$ では

$$
N_X(0)=\mathbb R
$$

なので

$$
u'(0)=1\in N_X(0)
$$

は正しく成立します。

制約関数 $x^2\le0$ の勾配表示が壊れても、集合そのものの法錐は壊れていません。

---

## 7. 全プレイヤーの一次条件を一つに束ねる

プレイヤーごとの条件を縦に並べます。

<a id="def-game-a4-pseudogradient"></a>
<!-- formal-statement-start -->
> **定義（擬勾配写像）**  
> 各利得 $u_i$ が自分の戦略 $x_i$ について微分可能であるとし、積戦略集合を
>
> $X=\prod_iX_i$
>
> とする。このとき

$$
F(x)
=
\begin{pmatrix}
-\nabla_{x_1}u_1(x)\\
\vdots\\
-\nabla_{x_n}u_n(x)
\end{pmatrix}
$$

> で定める写像 $F:X\to\mathbb R^{\sum_i d_i}$ をゲームの **擬勾配写像（pseudo-gradient map）**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a4-pseudogradient -->
### 7.1 定義の確認：二人ゲームの擬勾配を作る

各 $X_i=[0,1]$ とし、

$$
u_1(x_1,x_2)=-x_1^2+x_1x_2,
\qquad
u_2(x_1,x_2)=-x_2^2+x_1x_2
$$

とします。

自分の変数で微分すると

$$
\nabla_{x_1}u_1=-2x_1+x_2,
\qquad
\nabla_{x_2}u_2=-2x_2+x_1.
$$

したがって擬勾配は

$$
F(x)
=
\begin{pmatrix}
2x_1-x_2\\
2x_2-x_1
\end{pmatrix}.
$$
<!-- definition-example-end -->

<a id="def-game-a4-vi"></a>
<!-- formal-statement-start -->
> **定義（変分不等式）**  
> 非空集合 $X\subset\mathbb R^d$ と写像 $F:X\to\mathbb R^d$ を考える。点 $x^*\in X$ が **変分不等式**
>
> $\operatorname{VI}(X,F)$
>
> の解であるとは、

$$
\boxed{
F(x^*)^{\mathsf T}(y-x^*)\ge0
\qquad
\forall y\in X
}
$$

> を満たすことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a4-vi -->
### 7.2 定義の確認：零点は変分不等式を満たす

直前の例の $F$ について $x^*=(0,0)$ とすると

$$
F(x^*)=0.
$$

したがって任意の $y\in[0,1]^2$ に対して

$$
F(x^*)^{\mathsf T}(y-x^*)=0\ge0.
$$

よって $(0,0)$ は $\operatorname{VI}([0,1]^2,F)$ の解です。

実際、相手が0なら各プレイヤーの利得は $-x_i^2$ なので、0が最適反応です。したがって $(0,0)$ は Nash 均衡でもあります。
<!-- definition-example-end -->

---

## 8. Nash 均衡と変分不等式は凹ゲームで同値になる

<a id="thm-game-a4-nash-vi"></a>
<!-- formal-statement-start -->
> **定理（Nash 均衡と変分不等式の同値）**  
> 各 $X_i\subset\mathbb R^{d_i}$ を非空凸集合とし、

$$
X=\prod_iX_i
$$

> とする。各 $u_i$ は自分の戦略について微分可能かつ凹であるとし、擬勾配写像 $F:X\to\mathbb R^{\sum_i d_i}$ を成分ごとに

$$
F_i(x)=-\nabla_{x_i}u_i(x)
$$

> で定める。このとき

$$
\boxed{
x^*\text{ が Nash 均衡}
\iff
x^*\text{ が }\operatorname{VI}(X,F)\text{ の解}
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

Nash 均衡なら、各人は自分の戦略集合上で大域最大です。任意の $y_i$ へ向かう線分を考えると、出発点での方向微分は非正です。

逆向きでは凹関数の一次支持不等式を使います。ここで凹性が「一次条件から大域最適性へ戻る」役割を担います。

<!-- proof-start -->
### 証明

まず $x^*$ を Nash 均衡とします。

任意のプレイヤー $i$ と $y_i\in X_i$ を取ります。$X_i$ は凸なので

$$
x_i(t)
=
x_i^*
+t(y_i-x_i^*)
\in X_i
\qquad(0\le t\le1).
$$

Nash 条件から $t=0$ は

$$
\phi_i(t)
=
u_i(x_i(t),x_{-i}^*)
$$

の $[0,1]$ 上の最大点です。従って右微分について

$$
\phi_i'(0+)
=
\nabla_{x_i}u_i(x^*)^{\mathsf T}
(y_i-x_i^*)
\le0.
$$

符号を反転すると

$$
F_i(x^*)^{\mathsf T}
(y_i-x_i^*)
\ge0.
$$

全プレイヤーについて足し合わせれば

$$
F(x^*)^{\mathsf T}(y-x^*)\ge0
\qquad
(\forall y\in X).
$$

従って $x^*$ は変分不等式の解です。

逆に $x^*$ が変分不等式の解とします。

$y$ のうち第 $i$ 成分だけを任意の $y_i\in X_i$ に変え、他の成分を $x_{-i}^*$ に固定すると、

$$
-\nabla_{x_i}u_i(x^*)^{\mathsf T}
(y_i-x_i^*)
\ge0.
$$

従って

$$
\nabla_{x_i}u_i(x^*)^{\mathsf T}
(y_i-x_i^*)
\le0.
$$

$u_i(\cdot,x_{-i}^*)$ は凹なので一次支持不等式から

$$
u_i(y_i,x_{-i}^*)
\le
u_i(x_i^*,x_{-i}^*)
+
\nabla_{x_i}u_i(x^*)^{\mathsf T}
(y_i-x_i^*).
$$

右辺第2項は0以下なので

$$
u_i(y_i,x_{-i}^*)
\le
u_i(x_i^*,x_{-i}^*).
$$

任意の $i,y_i$ で成立するので $x^*$ は Nash 均衡です。$\square$
<!-- proof-end -->

> **仮定が働いた場所**  
> Nash $\Rightarrow$ 変分不等式の向きでは、凸な戦略集合上で最適点から線分方向を見るだけなので、利得の凹性は使っていません。凹性が必要なのは、変分不等式の一次条件から大域的な最適反応へ戻る逆向きです。

---

## 9. 凹性を外すと「一次条件を満たすだけの偽物」が現れる

一人ゲーム

$$
X=[-1,1],
\qquad
u(x)=x^4
$$

を考えます。

$x^*=0$ では

$$
u'(0)=0.
$$

従って擬勾配 $F(0)=0$ であり、

$$
F(0)(y-0)=0
\qquad
(\forall y\in[-1,1]).
$$

つまり0は変分不等式の解です。

しかし

$$
u(0)=0,
\qquad
u(1)=u(-1)=1.
$$

0は最大点ではなく Nash 均衡でもありません。

失った仮定は自分の戦略についての凹性です。壊れた機構は

$$
\boxed{
\text{一次条件}
\Longrightarrow
\text{大域最大}
}
$$

という逆向きです。

---

## 10. 単調性は均衡の一意性へつながる

変分不等式の形にまとめると、ゲームの相互作用を擬勾配 $F$ の性質として調べられます。

<a id="def-game-a4-monotonicity"></a>
<!-- formal-statement-start -->
> **定義（単調写像・強単調写像）**  
> 集合 $X\subset\mathbb R^d$ 上の写像 $F:X\to\mathbb R^d$ が **単調**であるとは、

$$
(F(x)-F(y))^{\mathsf T}(x-y)
\ge0
\qquad
(\forall x,y\in X)
$$

> を満たすことをいう。さらに、ある $\mu>0$ が存在して

$$
(F(x)-F(y))^{\mathsf T}(x-y)
\ge
\mu\|x-y\|^2
\qquad
(\forall x,y\in X)
$$

> を満たすとき、$F$ を **強単調**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a4-monotonicity -->
### 10.1 定義の確認：線形写像では対称部分を見る

アフィン写像

$$
F(x)=Mx+q
$$

では

$$
F(x)-F(y)=M(x-y).
$$

従って $z=x-y$ と置けば

$$
(F(x)-F(y))^{\mathsf T}(x-y)
=
z^{\mathsf T}Mz.
$$

反対称部分は二次形式に寄与しないので

$$
z^{\mathsf T}Mz
=
z^{\mathsf T}
\frac{M+M^{\mathsf T}}2
z.
$$

したがって、対称部分が正半定値なら $F$ は単調です。さらに対称部分の最小固有値が $\mu>0$ なら

$$
z^{\mathsf T}Mz
\ge
\mu\|z\|^2
$$

となり、$F$ は強単調です。
<!-- definition-example-end -->

<a id="prop-game-a4-strong-monotone-unique"></a>
<!-- formal-statement-start -->
> **命題（強単調性による Nash 均衡の一意性）**  
> 凹ゲームの積戦略集合を $X=\prod_iX_i$、擬勾配を $F:X\to\mathbb R^{\sum_i d_i}$ とする。$F$ が $X$ 上で強単調なら、Nash 均衡は存在するとして高々一つである。
<!-- formal-statement-end -->

### 証明の見取り図

二つの変分不等式解 $x^*,y^*$ があると仮定し、一方の不等式へ他方を代入して足します。変分不等式からは単調性と逆向きの符号が出るため、強単調性と両立するには二点が一致するしかありません。

<!-- proof-start -->
### 証明

$x^*,y^*$ を二つの変分不等式解とします。

$x^*$ の条件へ $y^*$ を代入すると

$$
F(x^*)^{\mathsf T}(y^*-x^*)\ge0.
$$

$y^*$ の条件へ $x^*$ を代入すると

$$
F(y^*)^{\mathsf T}(x^*-y^*)\ge0.
$$

従って

$$
(F(x^*)-F(y^*))^{\mathsf T}(x^*-y^*)
\le0.
$$

一方、強単調性から

$$
(F(x^*)-F(y^*))^{\mathsf T}(x^*-y^*)
\ge
\mu\|x^*-y^*\|^2.
$$

よって

$$
\mu\|x^*-y^*\|^2\le0.
$$

$\mu>0$ なので

$$
x^*=y^*.
$$

凹ゲームでは変分不等式解と Nash 均衡が一致するため、Nash 均衡も高々一つです。$\square$
<!-- proof-end -->

---

## 11. Cournot 複占を一つの変分不等式として解く

二企業が生産量

$$
q_i\in[0,\bar q]
$$

を選ぶとします。

総生産量を

$$
Q=q_1+q_2
$$

とし、逆需要関数を

$$
P(Q)=a-bQ
$$

とします。考える戦略範囲では価格が非負になるとし、単位費用を $c$ とします。企業 $i$ の利潤は

$$
\pi_i(q_i,q_j)
=
q_i\bigl(a-b(q_i+q_j)\bigr)-cq_i.
$$

整理すると

$$
\pi_i
=
(a-c)q_i
-bq_i^2
-bq_iq_j.
$$

自分の生産量について

$$
\frac{\partial^2\pi_i}{\partial q_i^2}
=
-2b<0
$$

なので、$b>0$ なら凹ゲームです。

擬勾配は

$$
F(q)
=
\begin{pmatrix}
2bq_1+bq_2-(a-c)\\
bq_1+2bq_2-(a-c)
\end{pmatrix}.
$$

内点均衡なら法錐が $\{0\}$ なので

$$
F(q^*)=0.
$$

対称性から $q_1^*=q_2^*=q^*$ と置くと

$$
3bq^*=a-c.
$$

従って

$$
\boxed{
q_1^*=q_2^*
=
\frac{a-c}{3b}
}
$$

です。ただし、この値が $(0,\bar q)$ に入る場合です。

さらに線形部分の行列は

$$
M
=
b
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

固有値は

$$
b,\qquad3b
$$

でともに正です。

したがって $F$ は強単調で、この Nash 均衡は一意です。

境界に当たる場合でも、方程式 $F(q)=0$ を無理に使うのではなく、

$$
F(q^*)^{\mathsf T}(y-q^*)\ge0
\qquad
(\forall y\in[0,\bar q]^2)
$$

という変分不等式がそのまま使えます。ここが法錐・変分不等式表示の利点です。

---

## 12. KKT・法錐・変分不等式の役割分担

同じ Nash 条件を三つの解像度で見ると整理しやすくなります。

$$
\boxed{
\text{各人の大域最適反応}
}
$$

が定義そのものです。

凹性があれば、これを

$$
\boxed{
\nabla_{x_i}u_i(x^*)\in N_{X_i}(x_i^*)
}
$$

という法錐条件へ落とせます。

戦略集合を滑らかな不等式・等式制約で表し、Slater 条件や [MFCQ](../OPT6/index.md#def-opt6-mfcq) のような制約想定が使えるなら、法錐を制約勾配へ分解して

$$
\boxed{
\text{プレイヤー別 KKT 条件}
}
$$

を得ます。

そして全プレイヤーの法錐条件を積集合上で一つに束ねると

$$
\boxed{
\operatorname{VI}(X,F)
}
$$

になります。

したがって、KKT と変分不等式は競合する別手法ではありません。

$$
\text{KKT}
\longleftrightarrow
\text{法錐の制約表示},
\qquad
\text{VI}
\longleftrightarrow
\text{全プレイヤーの法錐条件の集約}
$$

という関係です。

---

# 演習

## Level A

<a id="ex-game-a4-a01"></a>

### GAME-A4-A01 二次凹ゲームの最適反応を求める

- Level: A
- 目安時間: 15分

$X_1=X_2=[0,1]$ とし、

$$
u_1
=
-\left(x_1-\frac{x_2}{2}\right)^2,
\qquad
u_2
=
-\left(x_2-\frac{1+x_1}{3}\right)^2
$$

とする。

1. 各利得が自分の戦略について狭義凹であることを確認せよ。
2. $BR_1(x_2),BR_2(x_1)$ を求めよ。
3. Nash 均衡を求めよ。

<!-- solution-start -->
#### 詳細解答

1. 二階微分は

$$
\frac{\partial^2u_1}{\partial x_1^2}=-2,
\qquad
\frac{\partial^2u_2}{\partial x_2^2}=-2.
$$

どちらも負なので、自分の戦略について狭義凹です。

2. 平方を0にすれば最大値0を得ます。候補は

$$
x_1=\frac{x_2}{2},
\qquad
x_2=\frac{1+x_1}{3}.
$$

$x_2\in[0,1]$ なら $x_2/2\in[0,1/2]$、$x_1\in[0,1]$ なら $(1+x_1)/3\in[1/3,2/3]$ なので制約内です。

従って

$$
BR_1(x_2)=\frac{x_2}{2},
\qquad
BR_2(x_1)=\frac{1+x_1}{3}.
$$

3. 連立すると

$$
x_1=\frac{x_2}{2},
$$

$$
x_2
=
\frac{1+x_2/2}{3}.
$$

よって

$$
3x_2=1+\frac{x_2}{2},
$$

$$
\frac52x_2=1,
$$

$$
x_2^*=\frac25.
$$

従って

$$
x_1^*=\frac15.
$$

したがって

$$
\boxed{
x^*=\left(\frac15,\frac25\right).
}
$$
<!-- solution-end -->

<a id="ex-game-a4-a02"></a>

### GAME-A4-A02 境界最適反応を KKT で確認する

- Level: A
- 目安時間: 15分

$x_j=1$ を固定し、

$$
\max_{0\le x_i\le1}
-\left(x_i-\frac54\right)^2
$$

を考える。

1. 最大化を最小化へ直せ。
2. 上限制約 $g(x_i)=x_i-1\le0$ の乗数を求めよ。
3. 下限制約が非活性であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

1.

$$
\min_{0\le x_i\le1}
\left(x_i-\frac54\right)^2.
$$

制約がなければ最小点は $5/4$ ですが、上限1を越えています。従って候補は $x_i^*=1$ です。

2. 上限制約の Lagrangian は

$$
L(x_i,\lambda)
=
\left(x_i-\frac54\right)^2
+
\lambda(x_i-1).
$$

KKT の勾配条件は

$$
2\left(x_i-\frac54\right)+\lambda=0.
$$

$x_i^*=1$ を代入すると

$$
-\frac12+\lambda=0.
$$

従って

$$
\boxed{\lambda^*=\frac12.}
$$

実行可能性、$\lambda^*\ge0$、相補性

$$
\lambda^*(x_i^*-1)=0
$$

も成立します。

3. 下限制約を $-x_i\le0$ と書くと、$x_i^*=1$ では

$$
-x_i^*=-1<0.
$$

非活性なので相補性からその乗数は0です。
<!-- solution-end -->

<a id="ex-game-a4-a03"></a>

### GAME-A4-A03 区間端点の法錐と一次条件

- Level: A
- 目安時間: 15分

$X=[0,1]$ とする。

1. $N_X(1)$ を求めよ。
2. 微分可能な凹関数 $u$ が $u'(1)=3$ を満たすとき、$x^*=1$ が最大点になり得ることを法錐条件で説明せよ。
3. $u'(1)=-3$ ならなぜ最大点ではあり得ないか。

<!-- solution-start -->
#### 詳細解答

1. 定義から

$$
N_X(1)
=
\{v:v(y-1)\le0\ \forall y\in[0,1]\}.
$$

$y-1\le0$ なので、条件は $v\ge0$ と同値です。

従って

$$
\boxed{
N_X(1)=[0,\infty).
}
$$

2.

$$
u'(1)=3\in N_X(1).
$$

凹関数の最大化では

$$
u'(x^*)\in N_X(x^*)
$$

が必要十分です。したがって $x^*=1$ は一次条件を満たします。

直感的には、利得は右へ動けば増えますが、右側は戦略集合の外です。

3.

$$
u'(1)=-3\notin N_X(1).
$$

左へ少し動く方向 $d<0$ に対して

$$
u'(1)d>0
$$

となり、利得を増やす可行方向があります。従って1は最大点ではありません。
<!-- solution-end -->

<a id="ex-game-a4-a04"></a>

### GAME-A4-A04 擬勾配の強単調性を判定する

- Level: A
- 目安時間: 15分

$$
u_1=-x_1^2+x_1x_2,
\qquad
u_2=-x_2^2+x_1x_2
$$

とする。

1. 擬勾配 $F$ を求めよ。
2. $F(x)=Mx$ の行列 $M$ を求めよ。
3. $M$ の固有値から強単調性を示せ。

<!-- solution-start -->
#### 詳細解答

1.

$$
-\frac{\partial u_1}{\partial x_1}
=
2x_1-x_2,
$$

$$
-\frac{\partial u_2}{\partial x_2}
=
2x_2-x_1.
$$

従って

$$
F(x)
=
\begin{pmatrix}
2x_1-x_2\\
2x_2-x_1
\end{pmatrix}.
$$

2.

$$
M
=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
$$

3. $M$ は対称で、固有値は

$$
1,\qquad3.
$$

最小固有値が1なので

$$
(x-y)^{\mathsf T}M(x-y)
\ge
\|x-y\|^2.
$$

従って

$$
\boxed{
F\text{ は }\mu=1\text{ で強単調}
}
$$

です。
<!-- solution-end -->

---

## Level B

<a id="ex-game-a4-b01"></a>

### GAME-A4-B01 Cournot 複占を KKT と変分不等式で解く

- Level: B
- 目安時間: 25分

企業 $i=1,2$ が $q_i\in[0,\bar q]$ を選び、

$$
\pi_i
=
(a-c)q_i
-bq_i^2
-bq_iq_j
$$

を得る。$a>c$, $b>0$ とする。

さらに

$$
0<
\frac{a-c}{3b}
<
\bar q
$$

を仮定する。

1. 各企業の利潤が自分の生産量について狭義凹であることを示せ。
2. 内点 KKT 条件から Nash 均衡を求めよ。
3. 擬勾配 $F$ を求めよ。
4. $F$ の強単調性から均衡の一意性を示せ。

<!-- solution-start -->
#### 詳細解答

1.

$$
\frac{\partial^2\pi_i}{\partial q_i^2}
=
-2b<0.
$$

従って各企業の利潤は自分の生産量について狭義凹です。

2. 仮定により均衡候補は内点にあります。内点では上下限制約の乗数は0なので、KKT の勾配条件は単に

$$
\frac{\partial\pi_i}{\partial q_i}=0
$$

です。

すなわち

$$
a-c-2bq_1-bq_2=0,
$$

$$
a-c-bq_1-2bq_2=0.
$$

差を取ると

$$
q_1=q_2.
$$

$q_1=q_2=q$ と置けば

$$
a-c-3bq=0.
$$

従って

$$
\boxed{
q_1^*=q_2^*
=
\frac{a-c}{3b}.
}
$$

3. 擬勾配は

$$
F(q)
=
\begin{pmatrix}
2bq_1+bq_2-(a-c)\\
bq_1+2bq_2-(a-c)
\end{pmatrix}.
$$

4. 線形部分は

$$
M
=
b
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

固有値は $b,3b$ で、$b>0$ です。

従って $F$ は $\mu=b$ で強単調です。

本章の命題から変分不等式解は高々一つであり、凹ゲームではそれが Nash 均衡に一致するので、上で求めた均衡は一意です。
<!-- solution-end -->

<a id="ex-game-a4-b02"></a>

### GAME-A4-B02 Nash 均衡と変分不等式の同値を再構成する

- Level: B
- 目安時間: 25分

各 $X_i$ は非空凸集合、各 $u_i$ は自分の戦略について微分可能かつ凹とする。

1. Nash 均衡 $x^*$ から
   $$
   \nabla_{x_i}u_i(x^*)^{\mathsf T}(y_i-x_i^*)\le0
   $$
   を導け。
2. 全プレイヤーについて足して変分不等式を得よ。
3. 逆に変分不等式から各プレイヤーの一次条件を取り出せ。
4. 凹性を使って大域最適反応へ戻せ。

<!-- solution-start -->
#### 詳細解答

1. 任意の $y_i\in X_i$ に対し

$$
x_i(t)=x_i^*+t(y_i-x_i^*)
$$

と置きます。凸性から $0\le t\le1$ で $x_i(t)\in X_i$ です。

Nash 条件により $t=0$ は

$$
\phi(t)=u_i(x_i(t),x_{-i}^*)
$$

の最大点なので

$$
\phi'(0+)
=
\nabla_{x_i}u_i(x^*)^{\mathsf T}(y_i-x_i^*)
\le0.
$$

2. 符号反転して

$$
F_i(x^*)^{\mathsf T}(y_i-x_i^*)\ge0.
$$

全 $i$ で足せば

$$
F(x^*)^{\mathsf T}(y-x^*)\ge0.
$$

3. 変分不等式で、第 $i$ 成分だけを $y_i$ に変え、他を $x_{-i}^*$ に固定します。

すると

$$
-\nabla_{x_i}u_i(x^*)^{\mathsf T}(y_i-x_i^*)\ge0,
$$

すなわち

$$
\nabla_{x_i}u_i(x^*)^{\mathsf T}(y_i-x_i^*)\le0.
$$

4. 凹性から

$$
u_i(y_i,x_{-i}^*)
\le
u_i(x_i^*,x_{-i}^*)
+
\nabla_{x_i}u_i(x^*)^{\mathsf T}(y_i-x_i^*).
$$

最後の項は0以下なので

$$
u_i(y_i,x_{-i}^*)
\le
u_i(x_i^*,x_{-i}^*).
$$

従って $x_i^*$ は最適反応です。全 $i$ で成立するので $x^*$ は Nash 均衡です。
<!-- solution-end -->

<a id="ex-game-a4-b03"></a>

### GAME-A4-B03 制約想定が壊れると KKT だけ失敗する

- Level: B
- 目安時間: 25分

一人ゲーム

$$
\max_x x
\quad\text{制約}\quad
x^2\le0
$$

を考える。

1. 実行可能集合と Nash 均衡を求めよ。
2. KKT の勾配条件を立て、乗数が存在しないことを示せ。
3. $X=\{0\}$ の法錐を求め、法錐条件は成立することを示せ。
4. 何が壊れたのか説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $x^2\le0$ を満たす実数は0だけです。

従って

$$
X=\{0\},
\qquad
\boxed{x^*=0}.
$$

唯一の可行戦略なので、当然 Nash 均衡です。

2. 最大化を

$$
\min_x -x
\quad\text{制約}\quad
g(x)=x^2\le0
$$

へ直します。

KKT の勾配条件は

$$
-1+\lambda g'(0)=0.
$$

ところが

$$
g'(0)=0.
$$

従って

$$
-1=0
$$

となり、どんな $\lambda\ge0$ でも成立しません。

3. 単集合 $X=\{0\}$ では、任意の $v\in\mathbb R$ について

$$
v(y-0)=v\cdot0=0
$$

です。

従って

$$
N_X(0)=\mathbb R.
$$

利得勾配は

$$
u'(0)=1
$$

なので

$$
1\in N_X(0)
$$

が成立します。

4. 壊れたのは Nash 条件でも法錐条件でもありません。

制約関数 $g(x)=x^2$ の勾配が可行点で0になり、一次近似した制約が本当の可行集合の局所幾何を表さなくなりました。

すなわち制約想定が失敗し、**法錐を制約勾配の非負結合として表す KKT の機構**だけが壊れています。
<!-- solution-end -->

---

## Level C

<a id="ex-game-a4-c01"></a>

### GAME-A4-C01 境界 Nash 均衡を KKT・法錐・変分不等式・単調性で統合する

- Level: C
- 目安時間: 50分

二人が

$$
X_1=X_2=[0,1]
$$

から戦略を選び、

$$
u_1(x_1,x_2)
=
4x_1-x_1^2-x_1x_2,
$$

$$
u_2(x_1,x_2)
=
3x_2-x_2^2-\frac12x_1x_2
$$

を得る。

1. 凹ゲームであることを示せ。
2. 擬勾配 $F$ を求めよ。
3. $x^*=(1,1)$ が変分不等式を満たすことを直接確認せよ。
4. 各プレイヤーの上限制約 $x_i-1\le0$ の KKT 乗数を求めよ。
5. 法錐条件を確認せよ。
6. $F$ が強単調であることを示し、Nash 均衡の一意性を結論せよ。

<!-- solution-start -->
#### 詳細解答

**1. 凹性**

自分の戦略について二階微分すると

$$
\frac{\partial^2u_1}{\partial x_1^2}
=
-2,
\qquad
\frac{\partial^2u_2}{\partial x_2^2}
=
-2.
$$

したがって両者とも自分の戦略について狭義凹で、戦略集合 $[0,1]$ も凸です。

よって凹ゲームです。

**2. 擬勾配**

$$
\frac{\partial u_1}{\partial x_1}
=
4-2x_1-x_2,
$$

$$
\frac{\partial u_2}{\partial x_2}
=
3-2x_2-\frac12x_1.
$$

従って

$$
F(x)
=
\begin{pmatrix}
2x_1+x_2-4\\
\frac12x_1+2x_2-3
\end{pmatrix}.
$$

**3. 変分不等式**

$x^*=(1,1)$ では

$$
F(x^*)
=
\begin{pmatrix}
-1\\
-\frac12
\end{pmatrix}.
$$

任意の $y=(y_1,y_2)\in[0,1]^2$ に対し

$$
y_1-1\le0,
\qquad
y_2-1\le0.
$$

従って

$$
\begin{aligned}
F(x^*)^{\mathsf T}(y-x^*)
&=
-(y_1-1)
-\frac12(y_2-1)\\
&=
(1-y_1)+\frac12(1-y_2)\\
&\ge0.
\end{aligned}
$$

よって $x^*$ は変分不等式の解です。

凹ゲームなので Nash 均衡でもあります。

**4. KKT 乗数**

プレイヤー1では

$$
\nabla_{x_1}u_1(1,1)=1.
$$

最大化を最小化 $-u_1$ に直し、上限制約

$$
g_1(x_1)=x_1-1\le0
$$

を使うとKKT の勾配条件は

$$
-1+\lambda_1=0.
$$

従って

$$
\boxed{\lambda_1=1.}
$$

プレイヤー2では

$$
\nabla_{x_2}u_2(1,1)
=
3-2-\frac12
=
\frac12.
$$

したがって

$$
-\frac12+\lambda_2=0,
$$

$$
\boxed{\lambda_2=\frac12.}
$$

両上限制約は活性で、下限制約は非活性です。

**5. 法錐**

$[0,1]$ の右端では

$$
N_{[0,1]}(1)=[0,\infty).
$$

プレイヤー1の利得勾配は1、プレイヤー2は $1/2$ なので

$$
1\in N_{[0,1]}(1),
\qquad
\frac12\in N_{[0,1]}(1).
$$

従って両プレイヤーの法錐条件が成立します。

**6. 強単調性**

$F$ の線形部分は

$$
M
=
\begin{pmatrix}
2&1\\
1/2&2
\end{pmatrix}.
$$

単調性を決める対称部分は

$$
\frac{M+M^{\mathsf T}}2
=
\begin{pmatrix}
2&3/4\\
3/4&2
\end{pmatrix}.
$$

この固有値は

$$
2-\frac34=\frac54,
\qquad
2+\frac34=\frac{11}{4}.
$$

最小固有値が $5/4>0$ なので

$$
(F(x)-F(y))^{\mathsf T}(x-y)
\ge
\frac54\|x-y\|^2.
$$

従って $F$ は強単調です。

変分不等式解は高々一つなので、既に見つけた

$$
\boxed{x^*=(1,1)}
$$

が一意な Nash 均衡です。

この問題では、同じ均衡を

$$
\text{最適反応}
\leftrightarrow
\text{KKT}
\leftrightarrow
\text{法錐}
\leftrightarrow
\text{変分不等式}
$$

の4つの表現で確認できました。
<!-- solution-end -->

---

## 13. 次へ：時間順序を持つゲームへ

本章では、同時手番の連続戦略ゲームについて

$$
\boxed{
\text{凹性}
+
\text{一次最適性}
+
\text{凸集合の法錐}
}
$$

を使い、Nash 均衡を KKT と変分不等式へ接続しました。

特に

$$
\text{各人の最適反応}
\longrightarrow
\text{法錐条件}
\longrightarrow
\operatorname{VI}(X,F)
$$

とまとめることで、均衡の存在だけでなく、一意性や数値計算へ進む入口も得ました。

次章ではゲーム木を導入し、「誰がいつ動き、何を観察したか」を戦略の中へ組み込みます。そこで中心になるのは展開形ゲーム、後ろ向き帰納法、部分ゲーム完全均衡です。
