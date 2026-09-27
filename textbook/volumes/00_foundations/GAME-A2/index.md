# GAME-A2 混合戦略・ゼロ和ゲーム・ミニマックス

<!-- definition-example-audit: strict -->

[GAME-A1](../GAME-A1/index.md) の表裏合わせゲームでは、どの純粋戦略の組にも「自分だけ変えれば得をする」プレイヤーが残りました。

けれども、毎回必ず表、毎回必ず裏、と固定する必要はありません。

例えばプレイヤー1が

- 表を確率 $1/2$
- 裏を確率 $1/2$

で選ぶなら、相手は「次にどちらが出るか」を読んで確実に利用できません。

この章で加えるのは、戦略を曖昧にすることではなく、**純粋戦略を選ぶ確率そのものを新しい戦略として扱う**という考え方です。

そして、一方の得と他方の損がちょうど打ち消し合う二人ゲームでは、この確率選択が線形計画とぴったりつながります。

$$
\text{混合戦略}
\longrightarrow
\text{期待利得}
\longrightarrow
\text{自分が保証できる利得}
\longrightarrow
\text{線形計画}
\longrightarrow
\text{双対性}
\longrightarrow
\text{ミニマックス}
$$

特に重要なのは、線形計画の双対が「証明のために後から付け足した別問題」ではないことです。

一方のプレイヤーが自分の最低利得を最大にする問題を作ると、その双対問題が、もう一方のプレイヤーが相手の最高利得を最小にする問題として現れます。

---

## 1. 表か裏かを固定せず、確率で選ぶ

GAME-A1 と同じ表裏合わせゲームを考えます。

プレイヤー1は一致を好み、プレイヤー2は不一致を好むとします。

| プレイヤー1＼プレイヤー2 | $H$ | $T$ |
|---|---:|---:|
| $H$ | $(1,-1)$ | $(-1,1)$ |
| $T$ | $(-1,1)$ | $(1,-1)$ |

プレイヤー1が必ず $H$ を出すなら、プレイヤー2は $T$ を出せば利得 $1$ を得られます。

逆にプレイヤー1が必ず $T$ を出すなら、プレイヤー2は $H$ を出せばよいです。

固定した選択は読まれると弱い。

そこでプレイヤー1が

$$
P(H)=r,
\qquad
P(T)=1-r
$$

として選ぶことを考えます。

ここで $r$ は「表が出た後に決まる量」ではありません。プレイの前に選ぶ **確率の割り当て** です。

---

## 2. 混合戦略は純粋戦略上の確率分布である

プレイヤー $i$ の有限純粋戦略集合を

$$
S_i=\{s_{i1},\dots,s_{ik_i}\}
$$

とします。

各純粋戦略に割り当てる確率を

$$
p_{i1},\dots,p_{ik_i}
$$

と書きます。

確率なので

$$
p_{i\ell}\ge0,
\qquad
\sum_{\ell=1}^{k_i}p_{i\ell}=1
$$

を満たします。

この確率ベクトル全体は単体を作ります。

<a id="def-game-a2-mixed-strategy"></a>

<!-- formal-statement-start -->
> **定義（混合戦略・台）**  
> 有限戦略形ゲームで、プレイヤー $i$ の純粋戦略集合を
>
$$
S_i=\{s_{i1},\dots,s_{ik_i}\}
$$
>
> とする。
>
> ベクトル
>
$$
p_i=(p_{i1},\dots,p_{ik_i})
$$
>
> が
>
$$
p_{i\ell}\ge0
\quad(\ell=1,\dots,k_i),
\qquad
\sum_{\ell=1}^{k_i}p_{i\ell}=1
$$
>
> を満たすとき、$p_i$ をプレイヤー $i$ の **混合戦略** という。
>
> 混合戦略全体を
>
$$
\Delta(S_i)
=
\left\{
p_i\in\mathbb R_+^{k_i}:
\sum_{\ell=1}^{k_i}p_{i\ell}=1
\right\}
$$
>
> と書く。
>
> また
>
$$
\operatorname{supp}(p_i)
=
\{s_{i\ell}\in S_i:p_{i\ell}>0\}
$$
>
> を $p_i$ の **台** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a2-mixed-strategy -->
**定義の確認**：表を $1/3$、裏を $2/3$ で選ぶ

純粋戦略集合が

$$
S_1=\{H,T\}
$$

なら、

$$
p=
\left(
\frac13,\frac23
\right)
$$

は

$$
\frac13\ge0,
\qquad
\frac23\ge0,
\qquad
\frac13+\frac23=1
$$

を満たすので混合戦略です。

両方の確率が正なので

$$
\operatorname{supp}(p)=\{H,T\}.
$$

一方

$$
p=(1,0)
$$

も混合戦略です。

これは確率1で $H$ を選ぶので、実質的には純粋戦略 $H$ と同じです。

したがって純粋戦略は、混合戦略の特別な場合として単体の頂点に埋め込まれています。
<!-- definition-example-end -->

二戦略なら

$$
p=(r,1-r),
\qquad
0\le r\le1
$$

なので、混合戦略集合は線分です。

三戦略なら

$$
p_1+p_2+p_3=1,
\qquad
p_1,p_2,p_3\ge0
$$

となり、三角形の領域になります。

混合戦略を入れると、有限個しかなかった純粋戦略の間を連続的に動けるようになります。

---

## 3. 混合したときの利得は期待利得で読む

二人ゲームで、プレイヤー1の純粋戦略を

$$
R_1,\dots,R_m,
$$

プレイヤー2の純粋戦略を

$$
C_1,\dots,C_n
$$

とします。

プレイヤー1の混合戦略を

$$
p=(p_1,\dots,p_m)\in\Delta_m,
$$

プレイヤー2の混合戦略を

$$
q=(q_1,\dots,q_n)\in\Delta_n
$$

と書きます。ここで

$$
\Delta_m
=
\left\{
p\in\mathbb R_+^m:
\sum_{i=1}^m p_i=1
\right\}
$$

です。

プレイヤー1が $R_i$、プレイヤー2が $C_j$ を選んだときのプレイヤー1の利得を

$$
a_{ij}
$$

とします。

両者が互いに独立に確率選択すると、組 $(R_i,C_j)$ が起こる確率は

$$
p_iq_j
$$

です。

したがってプレイヤー1の期待利得は

$$
\sum_{i=1}^m\sum_{j=1}^n
p_iq_j a_{ij}.
$$

行列

$$
A=(a_{ij})\in\mathbb R^{m\times n}
$$

を使えば

$$
p^{\mathsf T}Aq
$$

と短く書けます。

例えば

$$
A=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix},
\qquad
p=
\begin{pmatrix}
1/3\\
2/3
\end{pmatrix},
\qquad
q=
\begin{pmatrix}
1/4\\
3/4
\end{pmatrix}
$$

なら

$$
Aq
=
\begin{pmatrix}
1/2\\
3/4
\end{pmatrix}
$$

なので

$$
p^{\mathsf T}Aq
=
\frac13\cdot\frac12
+
\frac23\cdot\frac34
=
\frac16+\frac12
=
\frac23.
$$

期待利得は「平均を取ってからゲームを解く」ための飾りではありません。

混合戦略を一つ選ぶたびに、それ自体が新しい戦略であり、その戦略の評価値が期待利得です。

---

## 4. 元のゲームを混合戦略まで広げる

一般の有限戦略形ゲームでも、各プレイヤーが独立に混合戦略を選ぶと考えられます。

純粋戦略プロファイル

$$
s=(s_1,\dots,s_n)
$$

でのプレイヤー $i$ の利得を $u_i(s)$ とします。

混合戦略プロファイルを

$$
p=(p_1,\dots,p_n)
$$

とすると、純粋戦略プロファイル $s$ が実現する確率は各プレイヤーの選択確率の積です。

<a id="def-game-a2-mixed-extension"></a>

<!-- formal-statement-start -->
> **定義（混合拡張と混合戦略 Nash 均衡）**  
> 有限戦略形ゲーム
>
$$
G=
\left(
N,\{S_i\}_{i\in N},\{u_i\}_{i\in N}
\right)
$$
>
> を考える。
>
> 各プレイヤー $i$ の混合戦略集合を $\Delta(S_i)$ とする。
>
> 混合戦略プロファイル
>
$$
p=(p_1,\dots,p_n)
\in
\prod_{i\in N}\Delta(S_i)
$$
>
> に対するプレイヤー $i$ の期待利得を
>
$$
U_i(p)
=
\sum_{s\in\prod_j S_j}
u_i(s)
\prod_{j\in N}p_j(s_j)
$$
>
> と定める。これを元のゲームの **混合拡張** という。
>
> 混合戦略プロファイル $p^*$ が **混合戦略 Nash 均衡** であるとは、すべてのプレイヤー $i$ とすべての混合戦略 $r_i\in\Delta(S_i)$ について
>
$$
U_i(p_i^*,p_{-i}^*)
\ge
U_i(r_i,p_{-i}^*)
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a2-mixed-extension -->
**定義の確認**：表裏合わせゲームで半々に混ぜる

プレイヤー1の利得行列を

$$
A=
\begin{pmatrix}
1&-1\\
-1&1
\end{pmatrix}
$$

とします。

両者が

$$
p=q=
\begin{pmatrix}
1/2\\
1/2
\end{pmatrix}
$$

を選ぶと、

$$
Aq
=
\begin{pmatrix}
0\\
0
\end{pmatrix}.
$$

したがってプレイヤー1が $H$ を純粋に選んでも $T$ を純粋に選んでも期待利得は $0$ です。

どの混合戦略へ変更しても、$0$ と $0$ の加重平均なので期待利得は $0$ のままです。

プレイヤー2についても同様です。

従って半々の組は混合戦略 Nash 均衡です。
<!-- definition-example-end -->

純粋戦略 Nash 均衡は、各 $p_i$ が単体の頂点にある混合戦略 Nash 均衡の特別な場合です。

---

## 5. 均衡で実際に使う純粋戦略は、全部同じ最高利得を与える

混合戦略の台に入る純粋戦略には重要な条件があります。

例えば相手の混合戦略に対して

- $H$ の期待利得が $3$
- $T$ の期待利得が $1$

なら、自分が $T$ に正の確率を置く理由はありません。

$T$ に置いていた確率を $H$ へ移せば期待利得が上がるからです。

<a id="prop-game-a2-support-best-response"></a>

<!-- formal-statement-start -->
> **命題（均衡で正の確率を与える純粋戦略は最適反応）**  
> 有限戦略形ゲームの混合拡張で $p^*$ が混合戦略 Nash 均衡であるとする。
>
> プレイヤー $i$ の純粋戦略 $s_i\in S_i$ が
>
$$
p_i^*(s_i)>0
$$
>
> を満たすなら、$s_i$ は相手側混合戦略 $p_{-i}^*$ に対する純粋戦略の最適反応である。
>
> 従って $\operatorname{supp}(p_i^*)$ に入る全ての純粋戦略は同じ最大期待利得を与える。
<!-- formal-statement-end -->

### 証明の見取り図

もし台の中に最大期待利得より低い純粋戦略があれば、その戦略に置いている正の確率を、より高い利得を与える純粋戦略へ少し移せます。

すると期待利得が厳密に増え、Nash 均衡の条件に反します。

<!-- proof-start -->
### 証明

相手側混合戦略 $p_{-i}^*$ を固定します。

純粋戦略 $t_i\in S_i$ を選んだときの期待利得を

$$
g(t_i)
=
U_i(t_i,p_{-i}^*)
$$

と書きます。

$s_i\in\operatorname{supp}(p_i^*)$ が最適反応でないと仮定します。

するとある純粋戦略 $t_i$ が存在して

$$
g(t_i)>g(s_i)
$$

です。

$p_i^*(s_i)>0$ なので、

$$
0<\varepsilon\le p_i^*(s_i)
$$

を一つ取り、$s_i$ から確率 $\varepsilon$ を減らして $t_i$ へ移した混合戦略 $r_i$ を作れます。

期待利得の線形性から

$$
U_i(r_i,p_{-i}^*)
-
U_i(p_i^*,p_{-i}^*)
=
\varepsilon
\bigl(
g(t_i)-g(s_i)
\bigr)
>0.
$$

これは $p^*$ が Nash 均衡であることに反します。

従って台に入る各純粋戦略は最適反応です。

また全てが同じ最大値を達成するので、台に入る純粋戦略同士の期待利得は等しくなります。$\square$
<!-- proof-end -->

二戦略ゲームで両方を正の確率で混ぜる均衡を探すとき、

$$
\boxed{
\text{相手が二つの純粋戦略の期待利得を等しくする}
}
$$

という「二つの期待利得を等しくする条件」が現れるのは、この命題のためです。

---

## 6. ゼロ和ゲームでは、一枚の利得行列だけ見ればよい

ここから二人ゲームに絞ります。

プレイヤー1の利得を $u_1$、プレイヤー2の利得を $u_2$ とします。

全ての戦略の組で

$$
u_1+u_2=0
$$

なら、一方が $3$ 得ると他方は $-3$ です。

このときプレイヤー1の利得だけ分かれば、プレイヤー2の利得はその符号を反転したものです。

<a id="def-game-a2-zero-sum"></a>

<!-- formal-statement-start -->
> **定義（二人ゼロ和ゲーム・利得行列）**  
> 二人有限戦略形ゲームで、全ての純粋戦略プロファイル $(R_i,C_j)$ について
>
$$
u_1(R_i,C_j)+u_2(R_i,C_j)=0
$$
>
> が成り立つとき、これを **二人ゼロ和ゲーム** という。
>
> プレイヤー1の利得を
>
$$
a_{ij}=u_1(R_i,C_j)
$$
>
> と置き、
>
$$
A=(a_{ij})\in\mathbb R^{m\times n}
$$
>
> を **利得行列** と呼ぶ。
>
> プレイヤー1を行プレイヤー、プレイヤー2を列プレイヤーと呼ぶことにすると、混合戦略
>
$$
p\in\Delta_m,
\qquad
q\in\Delta_n
$$
>
> の下で行プレイヤーの期待利得は
>
$$
p^{\mathsf T}Aq
$$
>
> であり、列プレイヤーの期待利得は
>
$$
-p^{\mathsf T}Aq
$$
>
> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a2-zero-sum -->
**定義の確認**：表裏合わせゲーム

表裏合わせゲームでは行プレイヤーの利得行列は

$$
A=
\begin{pmatrix}
1&-1\\
-1&1
\end{pmatrix}.
$$

列プレイヤーの各セルの利得は $-A$ です。

例えば $(H,T)$ では

$$
u_1(H,T)=-1,
\qquad
u_2(H,T)=1
$$

なので和は0です。

従ってこれは二人ゼロ和ゲームです。
<!-- definition-example-end -->

ゼロ和ゲームでは、行プレイヤーは

$$
p^{\mathsf T}Aq
$$

を大きくしたく、列プレイヤーは同じ量を小さくしたいと考えます。

目的関数が完全に同じで、向きだけが反対です。

---

## 7. 相手が最悪の手を選んでも、どこまで保証できるか

行プレイヤーが混合戦略 $p$ を先に固定したとします。

列プレイヤーが行の利得を最小にしようとするなら、行プレイヤーが確実に期待できる利得は

$$
\min_{q\in\Delta_n}p^{\mathsf T}Aq
$$

です。

行プレイヤーは、この最悪時利得をできるだけ大きくしたいので

$$
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
$$

を考えます。

逆に列プレイヤーは、自分が $q$ を固定した後に行プレイヤーが最善を尽くしても、その利得をできるだけ小さくしたいので

$$
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq
$$

を考えます。

<a id="def-game-a2-security-values"></a>

<!-- formal-statement-start -->
> **定義（下側保証値・上側保証値）**  
> 利得行列 $A\in\mathbb R^{m\times n}$ を持つ有限二人ゼロ和ゲームに対し、
>
$$
\underline v
=
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
$$
>
> を行プレイヤーの **下側保証値**、
>
$$
\overline v
=
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq
$$
>
> を列プレイヤーが課せる **上側保証値** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-a2-security-values -->
**定義の確認**：表裏合わせゲームで純粋戦略は保証値が低い

行プレイヤーが必ず $H$ を出すとします。

列プレイヤーは $T$ を選べるので、行プレイヤーの利得は $-1$ まで下げられます。

従って純粋戦略 $H$ の最悪時利得は

$$
-1.
$$

必ず $T$ を出しても同様に $-1$ です。

一方、半々

$$
p=
\left(
\frac12,\frac12
\right)
$$

なら、列プレイヤーが $H$ を選んでも $T$ を選んでも期待利得は0です。

従って半々に混ぜることで、行プレイヤーは少なくとも0を保証できます。
<!-- definition-example-end -->

ここで内側の最小化・最大化は、実は純粋戦略だけ見れば十分です。

固定した $p$ に対して

$$
p^{\mathsf T}Aq
=
\sum_{j=1}^n
q_j
(p^{\mathsf T}Ae_j)
$$

は各列に対する利得の加重平均です。

加重平均は最小成分より小さくならないので

$$
\min_{q\in\Delta_n}p^{\mathsf T}Aq
=
\min_{1\le j\le n}
p^{\mathsf T}Ae_j.
$$

同様に固定した $q$ に対して

$$
\max_{p\in\Delta_m}p^{\mathsf T}Aq
=
\max_{1\le i\le m}
e_i^{\mathsf T}Aq.
$$

したがって「相手が混合してくる全場合」を無限に調べる必要はありません。

---

## 8. まず弱い不等式はいつでも成り立つ

行プレイヤーの保証値が、列プレイヤーの上側保証値を上回ることはありません。

<a id="prop-game-a2-weak-minimax"></a>

<!-- formal-statement-start -->
> **命題（maximin と minimax の弱不等式）**  
> 任意の有限二人ゼロ和ゲームの利得行列 $A$ に対して
>
$$
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
\le
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

任意の $p,q$ を固定すれば、

- $q$ を最悪に選んだ値は、特定の $q$ での値以下
- $p$ を最善に選んだ値は、特定の $p$ での値以上

です。

従って、どの $p,q$ に対しても

$$
\min_{\tilde q}p^{\mathsf T}A\tilde q
\le
p^{\mathsf T}Aq
\le
\max_{\tilde p}\tilde p^{\mathsf T}Aq.
$$

<!-- proof-start -->
### 証明

任意の $p\in\Delta_m$ と $q\in\Delta_n$ を取ります。

$q$ は最小化候補の一つなので

$$
\min_{\tilde q\in\Delta_n}
p^{\mathsf T}A\tilde q
\le
p^{\mathsf T}Aq.
$$

同様に $p$ は最大化候補の一つなので

$$
p^{\mathsf T}Aq
\le
\max_{\tilde p\in\Delta_m}
\tilde p^{\mathsf T}Aq.
$$

従って任意の $p,q$ について

$$
\min_{\tilde q}
p^{\mathsf T}A\tilde q
\le
\max_{\tilde p}
\tilde p^{\mathsf T}Aq.
$$

左辺を $p$ について最大化しても、右辺はこの固定した $q$ に対する上界なので

$$
\max_{p}
\min_{\tilde q}
p^{\mathsf T}A\tilde q
\le
\max_{\tilde p}
\tilde p^{\mathsf T}Aq.
$$

これは全ての $q$ について成り立つから、右辺を $q$ について最小化して

$$
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
\le
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq.
$$

を得ます。$\square$
<!-- proof-end -->

弱不等式だけでは、二つの値の間に隙間がある可能性が残ります。

有限ゼロ和ゲームで驚くべきことは、その隙間が必ず閉じることです。

---

## 9. 行プレイヤーの問題は線形計画になる

固定した混合戦略 $p$ に対して、列 $j$ が選ばれたときの行プレイヤーの期待利得は

$$
(A^{\mathsf T}p)_j.
$$

行プレイヤーが「どの列を選ばれても少なくとも $v$ を得る」と保証する条件は

$$
A^{\mathsf T}p
\ge
v\mathbf 1_n.
$$

ここで $\mathbf 1_n$ は全成分が1の $n$ 次元ベクトルです。

従って行プレイヤーの安全化問題は

$$
\begin{aligned}
\text{maximize}\quad & v\\
\text{subject to}\quad
&A^{\mathsf T}p\ge v\mathbf 1_n,\\
&\mathbf 1_m^{\mathsf T}p=1,\\
&p\ge0
\end{aligned}
\tag{R}
$$

という線形計画です。

この問題の最適値が $\underline v$ です。

同様に列プレイヤーが「どの行を選ばれても行プレイヤーの利得を $w$ 以下に抑える」条件は

$$
Aq
\le
w\mathbf 1_m.
$$

従って列プレイヤーの問題は

$$
\begin{aligned}
\text{minimize}\quad & w\\
\text{subject to}\quad
&Aq\le w\mathbf 1_m,\\
&\mathbf 1_n^{\mathsf T}q=1,\\
&q\ge0
\end{aligned}
\tag{C}
$$

です。

この問題の最適値が $\overline v$ です。

ここまでは「似た形の二つの LP」が出ただけです。

次に、これらが本当に主問題と双対問題の関係になっていることを確認します。

---

## 10. 列プレイヤーの LP を標準形へ直すと、双対が行プレイヤーになる

[OPT10 の線形計画双対](../OPT10/index.md#def-opt10-lp-dual)をそのまま適用するため、列プレイヤーの問題 (C) を標準形へ直します。

変数 $w$ は自由変数なので

$$
w=w^+-w^-,
\qquad
w^+,w^-\ge0
$$

と分解します。

また

$$
Aq-w\mathbf 1_m\le0
$$

へ非負の補助変数

$$
s\in\mathbb R_+^m
$$

を加えると

$$
Aq-w^+\mathbf 1_m+w^-\mathbf 1_m+s=0.
$$

従って (C) は、非負変数

$$
x=(q,w^+,w^-,s)
$$

を使う標準形最小化問題

$$
\begin{aligned}
\text{minimize}\quad
&w^+-w^-\\
\text{subject to}\quad
&Aq-w^+\mathbf 1_m+w^-\mathbf 1_m+s=0,\\
&\mathbf 1_n^{\mathsf T}q=1,\\
&q,w^+,w^-,s\ge0
\end{aligned}
\tag{C-std}
$$

になります。

最初の $m$ 本の等式制約に付ける双対変数を

$$
y\in\mathbb R^m,
$$

最後の確率和制約に付ける双対変数を

$$
\alpha\in\mathbb R
$$

とします。

OPT10 の標準形

$$
\min c^{\mathsf T}x
\quad\text{subject to}\quad
Mx=b,\ x\ge0
$$

の双対は

$$
\max b^{\mathsf T}z
\quad\text{subject to}\quad
M^{\mathsf T}z\le c
$$

でした。

各変数の列ごとに双対制約を読むと、

$q$ の変数列から

$$
A^{\mathsf T}y+\alpha\mathbf 1_n\le0,
$$

$w^+$ の変数列から

$$
-\mathbf 1_m^{\mathsf T}y\le1,
$$

$w^-$ の変数列から

$$
\mathbf 1_m^{\mathsf T}y\le-1,
$$

$s$ の変数列から

$$
y\le0.
$$

$w^+$ と $w^-$ の二つの不等式を合わせると

$$
\mathbf 1_m^{\mathsf T}y=-1.
$$

ここで

$$
p=-y
$$

と置きます。

$y\le0$ なので

$$
p\ge0,
$$

さらに

$$
\mathbf 1_m^{\mathsf T}p=1.
$$

つまり

$$
p\in\Delta_m.
$$

また

$$
A^{\mathsf T}y+\alpha\mathbf 1_n\le0
$$

は

$$
-A^{\mathsf T}p+\alpha\mathbf 1_n\le0,
$$

すなわち

$$
A^{\mathsf T}p\ge\alpha\mathbf 1_n
$$

となります。

双対目的関数は、右辺が最初の $m$ 成分で0、最後の成分で1なので

$$
\max \alpha.
$$

従って (C-std) の双対問題は

$$
\begin{aligned}
\text{maximize}\quad &\alpha\\
\text{subject to}\quad
&A^{\mathsf T}p\ge\alpha\mathbf 1_n,\\
&\mathbf 1_m^{\mathsf T}p=1,\\
&p\ge0,
\end{aligned}
$$

となります。

これは変数名 $\alpha$ を $v$ に変えれば、行プレイヤーの問題 (R) そのものです。

$$
\boxed{
\text{列プレイヤーの安全化 LP の双対}
=
\text{行プレイヤーの安全化 LP}
}
$$

ここがこの章の中心です。

---

## 11. 強双対性がミニマックスの等号を作る

二つの安全化 LP はどちらも実行可能です。

例えば任意の

$$
p\in\Delta_m
$$

を取れば、有限個の列利得

$$
(A^{\mathsf T}p)_1,\dots,(A^{\mathsf T}p)_n
$$

の最小値を $v$ とすれば (R) は実行可能です。

同様に任意の $q\in\Delta_n$ に対し

$$
w=
\max_i(Aq)_i
$$

とすれば (C) は実行可能です。

また $A$ の成分は有限実数なので、期待利得は

$$
\min_{i,j}a_{ij}
\le
p^{\mathsf T}Aq
\le
\max_{i,j}a_{ij}
$$

の間にあります。

従って両 LP の最適値は有限です。

ここで [OPT10 の線形計画の強双対性](../OPT10/index.md#thm-opt10-strong-duality)を使えます。

<a id="thm-game-a2-minimax"></a>

<!-- formal-statement-start -->
> **定理（von Neumann のミニマックス定理）**  
> $A\in\mathbb R^{m\times n}$ を有限二人ゼロ和ゲームの利得行列とする。
>
> このとき
>
$$
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
=
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq.
$$
>
> この共通値をゲームの値 $v^*$ と呼ぶ。
>
> さらに両側の最適値は実際に達成される。すなわち、ある
>
$$
p^*\in\Delta_m,
\qquad
q^*\in\Delta_n
$$
>
> が存在して
>
$$
A^{\mathsf T}p^*
\ge
v^*\mathbf 1_n,
$$
>
$$
Aq^*
\le
v^*\mathbf 1_m
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

1. 行プレイヤーの maximin 問題を LP (R) にする。
2. 列プレイヤーの minimax 問題を LP (C) にする。
3. (C) を標準形へ変換すると、その双対が (R) になる。
4. 両問題は実行可能で有限最適値を持つ。
5. OPT10 の強双対性により最適値が一致する。

つまりミニマックスの等号は、有限ゲームでは **LP 強双対そのもの** です。

<!-- proof-start -->
### 証明

固定した $p\in\Delta_m$ に対して

$$
\min_{q\in\Delta_n}p^{\mathsf T}Aq
=
\min_j(A^{\mathsf T}p)_j.
$$

従って

$$
\underline v
=
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
$$

は LP (R)

$$
\begin{aligned}
\text{maximize}\quad &v\\
\text{subject to}\quad
&A^{\mathsf T}p\ge v\mathbf 1_n,\\
&\mathbf 1_m^{\mathsf T}p=1,\\
&p\ge0
\end{aligned}
$$

の最適値です。

同様に

$$
\max_{p\in\Delta_m}p^{\mathsf T}Aq
=
\max_i(Aq)_i
$$

なので

$$
\overline v
=
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq
$$

は LP (C)

$$
\begin{aligned}
\text{minimize}\quad &w\\
\text{subject to}\quad
&Aq\le w\mathbf 1_m,\\
&\mathbf 1_n^{\mathsf T}q=1,\\
&q\ge0
\end{aligned}
$$

の最適値です。

前節で (C) を標準形へ変換し、OPT10 の双対を取ると (R) になることを導出しました。

両問題は実行可能であり、さらに任意の混合戦略対 $(p,q)$ に対する期待利得は $A$ の最小成分と最大成分の間にあるため、最適値は有限です。

従って [線形計画の強双対性](../OPT10/index.md#thm-opt10-strong-duality)を適用でき、

$$
\underline v=\overline v.
$$

これを $v^*$ と書けば

$$
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
=
v^*
=
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq.
$$

また OPT10 の強双対性は最適解の存在も与えるので、最適な $p^*,q^*$ が存在します。

(R) の実行可能性から

$$
A^{\mathsf T}p^*\ge v^*\mathbf 1_n,
$$

(C) の実行可能性から

$$
Aq^*\le v^*\mathbf 1_m
$$

です。$\square$
<!-- proof-end -->

ここで使ったのは「単体がコンパクトだから何となく等号になる」という議論ではありません。

コンパクト性は最大値・最小値の存在には役立ちますが、

$$
\max\min=\min\max
$$

という **二つの最適化順序の交換** を単独では保証しません。

等号を作っている核心は LP の双対性です。

---

## 12. 最適保証戦略の組は混合戦略 Nash 均衡になる

ミニマックス定理で得た $p^*,q^*$ は、単に二つの別々の最適化問題の解ではありません。

互いに向き合うと Nash 均衡になります。

<a id="prop-game-a2-zero-sum-equilibrium"></a>

<!-- formal-statement-start -->
> **命題（ゼロ和ゲームの均衡と最適保証戦略）**  
> 利得行列 $A$ を持つ有限二人ゼロ和ゲームの値を $v^*$ とする。
>
> 混合戦略 $p^*\in\Delta_m$ と $q^*\in\Delta_n$ について、次は同値である。
>
> 1. $(p^*,q^*)$ は混合戦略 Nash 均衡である。
> 2. $p^*$ は行プレイヤーの maximin 問題の最適解であり、$q^*$ は列プレイヤーの minimax 問題の最適解である。
>
> このとき
>
$$
(p^*)^{\mathsf T}Aq^*=v^*.
$$
<!-- formal-statement-end -->

### 証明の見取り図

最適保証戦略なら

$$
(p^*)^{\mathsf T}Aq
\ge v^*
\qquad(\forall q)
$$

かつ

$$
p^{\mathsf T}Aq^*
\le v^*
\qquad(\forall p)
$$

です。

特に $p=p^*,q=q^*$ を代入すると中央の値は $v^*$ に挟まれます。

そのため、行プレイヤーは $p^*$ から変えても $v^*$ を超えられず、列プレイヤーも $q^*$ から変えて行利得を $v^*$ 未満へ下げられません。

<!-- proof-start -->
### 証明

まず 2 を仮定します。

$p^*$ が maximin 最適なので、任意の $q\in\Delta_n$ に対して

$$
(p^*)^{\mathsf T}Aq
\ge
v^*.
$$

$q^*$ が minimax 最適なので、任意の $p\in\Delta_m$ に対して

$$
p^{\mathsf T}Aq^*
\le
v^*.
$$

$p=p^*$ と $q=q^*$ を入れると

$$
v^*
\le
(p^*)^{\mathsf T}Aq^*
\le
v^*,
$$

従って

$$
(p^*)^{\mathsf T}Aq^*=v^*.
$$

行プレイヤーが $p^*$ から任意の $p$ へ変えても

$$
p^{\mathsf T}Aq^*
\le
v^*
=
(p^*)^{\mathsf T}Aq^*,
$$

なので利得を増やせません。

列プレイヤーは自分の利得が行プレイヤー利得の負号なので、任意の $q$ へ変えたとき

$$
-(p^*)^{\mathsf T}Aq
\le
-v^*
=
-(p^*)^{\mathsf T}Aq^*.
$$

従って列プレイヤーも利得を増やせません。

よって $(p^*,q^*)$ は混合戦略 Nash 均衡です。

逆に $(p^*,q^*)$ が混合戦略 Nash 均衡だとします。

行プレイヤーは一方的変更で改善できないので

$$
(p^*)^{\mathsf T}Aq^*
\ge
p^{\mathsf T}Aq^*
\qquad
(\forall p\in\Delta_m).
$$

従って

$$
(p^*)^{\mathsf T}Aq^*
=
\max_{p\in\Delta_m}
p^{\mathsf T}Aq^*.
$$

列プレイヤーも一方的変更で改善できないことは、行プレイヤーの利得をこれ以上下げられないことと同値なので

$$
(p^*)^{\mathsf T}Aq^*
\le
(p^*)^{\mathsf T}Aq
\qquad
(\forall q\in\Delta_n).
$$

従って

$$
(p^*)^{\mathsf T}Aq^*
=
\min_{q\in\Delta_n}
(p^*)^{\mathsf T}Aq.
$$

よって

$$
\overline v
=
\min_q\max_p p^{\mathsf T}Aq
\le
\max_p p^{\mathsf T}Aq^*
=
(p^*)^{\mathsf T}Aq^*,
$$

また

$$
\underline v
=
\max_p\min_q p^{\mathsf T}Aq
\ge
\min_q (p^*)^{\mathsf T}Aq
=
(p^*)^{\mathsf T}Aq^*.
$$

[ミニマックス定理](#thm-game-a2-minimax)より

$$
\underline v=\overline v=v^*
$$

なので、全て等号になり

$$
(p^*)^{\mathsf T}Aq^*=v^*.
$$

従って $p^*$ は maximin 最適、$q^*$ は minimax 最適です。$\square$
<!-- proof-end -->

有限ゼロ和ゲームでは、混合戦略 Nash 均衡の存在までこの章で得られました。

一般の有限ゲームでは利得が完全に反対向きとは限らないので、同じ LP 双対一本では処理できません。

それが次章 GAME-A3 で FIX3 の方法を使う理由です。

---

## 13. 表裏合わせゲームを最後まで解く

行プレイヤーが $H$ を確率 $r$、$T$ を確率 $1-r$ で選ぶとします。

列プレイヤーが $H$ を純粋に選んだとき、行プレイヤーの期待利得は

$$
r\cdot1+(1-r)(-1)
=
2r-1.
$$

列プレイヤーが $T$ を純粋に選んだときは

$$
r(-1)+(1-r)1
=
1-2r.
$$

従って行プレイヤーが保証できる利得は

$$
\min\{2r-1,\ 1-2r\}.
$$

この二本の直線の低い方を最大にしたいので、交点

$$
2r-1=1-2r
$$

を取ります。

よって

$$
r=\frac12.
$$

このとき両方の値は

$$
0.
$$

したがって

$$
p^*=
\left(
\frac12,\frac12
\right),
\qquad
v^*=0.
$$

列プレイヤーも対称に

$$
q^*=
\left(
\frac12,\frac12
\right)
$$

です。

純粋戦略では均衡が一つもなかったゲームが、混合戦略へ広げると

$$
\boxed{
\left(
(1/2,1/2),
(1/2,1/2)
\right)
}
$$

という均衡を持ちました。

---

## 14. 非対称な2×2ゲームでは混合比も半々とは限らない

利得行列

$$
A=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix}
$$

を考えます。

行プレイヤーが第1行を確率 $r$、第2行を確率 $1-r$ で選ぶとします。

列1に対する期待利得は

$$
2r,
$$

列2に対しては

$$
1-r.
$$

従って保証利得は

$$
\min\{2r,\ 1-r\}.
$$

最適点では二つを等しくして

$$
2r=1-r.
$$

よって

$$
r=\frac13.
$$

ゲームの値は

$$
v^*=2r=\frac23.
$$

列プレイヤーが列1を確率 $s$、列2を確率 $1-s$ で選ぶとき、行1の期待利得は

$$
2s,
$$

行2は

$$
1-s.
$$

列プレイヤーは高い方を最小にするので

$$
2s=1-s
$$

から

$$
s=\frac13.
$$

従って

$$
p^*=q^*
=
\left(
\frac13,\frac23
\right),
\qquad
v^*=\frac23.
$$

「混合戦略なら半々」という規則はありません。

相手の二つの純粋戦略から得る期待利得を等しくする確率が、利得の大きさによって決まります。

---

## 15. 純粋鞍点があるなら混合は必要ない

利得行列

$$
A=
\begin{pmatrix}
2&1\\
3&0
\end{pmatrix}
$$

を考えます。

各行の最小値は

$$
\min\{2,1\}=1,
\qquad
\min\{3,0\}=0.
$$

行プレイヤーは第1行を選べば少なくとも1を保証できます。

各列の最大値は

$$
\max\{2,3\}=3,
\qquad
\max\{1,0\}=1.
$$

列プレイヤーは第2列を選べば行利得を1以下に抑えられます。

従って

$$
\max_i\min_j a_{ij}
=
1
=
\min_j\max_i a_{ij}.
$$

セル $(R_1,C_2)$ の利得1は、

- その列の中では行プレイヤーにとって最大
- その行の中では列プレイヤーにとって最小

です。

このようなセルを純粋鞍点と呼びます。

この場合

$$
p^*=e_1,
\qquad
q^*=e_2,
\qquad
v^*=1
$$

で、最適混合戦略は純粋戦略です。

混合戦略は常にランダム化を強制するものではありません。

---

# 演習

## Level A

<a id="ex-game-a2-a01"></a>

### GAME-A2-A01 混合戦略と台を読む

- Level: A
- 目安時間: 15分

純粋戦略集合を

$$
S=\{A,B,C\}
$$

とする。

1. $p=(1/2,1/3,1/6)$ が混合戦略であることを確認せよ。
2. $\operatorname{supp}(p)$ を求めよ。
3. $q=(0,1,0)$ の台を求め、この混合戦略がどの純粋戦略を確率1で選ぶものか答えよ。
4. $r=(1/2,1/2,1/2)$ が混合戦略でない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

混合戦略であるためには、各成分が非負で、成分和が1である必要があります。

$p$ について

$$
\frac12+\frac13+\frac16
=
\frac{3+2+1}{6}
=
1
$$

であり、全成分が正です。

従って

$$
\boxed{p\in\Delta(S)}.
$$

また全ての成分が正なので

$$
\boxed{\operatorname{supp}(p)=\{A,B,C\}}.
$$

$q=(0,1,0)$ では正の確率を持つのは $B$ だけなので

$$
\boxed{\operatorname{supp}(q)=\{B\}}.
$$

確率1で $B$ を選ぶため、$q$ は純粋戦略 $B$ を混合戦略として埋め込んだものです。

最後に $r$ は各成分こそ非負ですが、

$$
\frac12+\frac12+\frac12
=
\frac32
\ne1.
$$

従って確率分布になっておらず、混合戦略ではありません。
<!-- solution-end -->

<a id="ex-game-a2-a02"></a>

### GAME-A2-A02 混合戦略の期待利得を計算する

- Level: A
- 目安時間: 20分

行プレイヤーの利得行列を

$$
A=
\begin{pmatrix}
3&-1\\
1&2
\end{pmatrix}
$$

とする。

混合戦略

$$
p=
\begin{pmatrix}
1/4\\
3/4
\end{pmatrix},
\qquad
q=
\begin{pmatrix}
2/5\\
3/5
\end{pmatrix}
$$

について、行プレイヤーの期待利得 $p^{\mathsf T}Aq$ を求めよ。

<!-- solution-start -->
#### 詳細解答

まず $Aq$ を計算します。

$$
Aq
=
\begin{pmatrix}
3&-1\\
1&2
\end{pmatrix}
\begin{pmatrix}
2/5\\
3/5
\end{pmatrix}
=
\begin{pmatrix}
6/5-3/5\\
2/5+6/5
\end{pmatrix}
=
\begin{pmatrix}
3/5\\
8/5
\end{pmatrix}.
$$

これは、列プレイヤーが $q$ を使ったとき、

- 行1を純粋に選ぶ期待利得が $3/5$
- 行2を純粋に選ぶ期待利得が $8/5$

であることを表します。

次に $p$ で平均すると

$$
p^{\mathsf T}Aq
=
\frac14\cdot\frac35
+
\frac34\cdot\frac85.
$$

従って

$$
p^{\mathsf T}Aq
=
\frac{3}{20}
+
\frac{24}{20}
=
\boxed{\frac{27}{20}}.
$$
<!-- solution-end -->

<a id="ex-game-a2-a03"></a>

### GAME-A2-A03 表裏合わせゲームで二つの期待利得を等しくする

- Level: A
- 目安時間: 20分

表裏合わせゲームの行プレイヤーの利得行列を

$$
A=
\begin{pmatrix}
1&-1\\
-1&1
\end{pmatrix}
$$

とする。

列プレイヤーが第1列を確率 $s$、第2列を確率 $1-s$ で選ぶ。

1. 行1を選んだときの期待利得を求めよ。
2. 行2を選んだときの期待利得を求めよ。
3. 行プレイヤーが両行を正の確率で混ぜる均衡では、なぜ二つの期待利得が等しくなければならないか説明せよ。
4. $s$ を求めよ。

<!-- solution-start -->
#### 詳細解答

列プレイヤーの混合戦略は

$$
q=(s,1-s).
$$

行1の期待利得は

$$
1\cdot s+(-1)(1-s)
=
2s-1.
$$

行2の期待利得は

$$
(-1)s+1(1-s)
=
1-2s.
$$

行プレイヤーが両方の行へ正の確率を置くなら、本文の「均衡で正の確率を与える純粋戦略は最適反応」という命題から、両行は同じ最大期待利得を与えなければなりません。

従って

$$
2s-1=1-2s.
$$

これを解くと

$$
4s=2,
$$

よって

$$
\boxed{s=\frac12}.
$$
<!-- solution-end -->

<a id="ex-game-a2-a04"></a>

### GAME-A2-A04 純粋鞍点を探す

- Level: A
- 目安時間: 20分

利得行列

$$
A=
\begin{pmatrix}
2&1\\
3&0
\end{pmatrix}
$$

を考える。

1. 各行の最小値を求め、その最大値を求めよ。
2. 各列の最大値を求め、その最小値を求めよ。
3. 純粋鞍点とゲームの値を求めよ。
4. 最適混合戦略を答えよ。

<!-- solution-start -->
#### 詳細解答

各行の最小値は

$$
\min\{2,1\}=1,
$$

$$
\min\{3,0\}=0.
$$

従って純粋戦略だけで見た行プレイヤーの maximin 値は

$$
\max\{1,0\}=1.
$$

各列の最大値は

$$
\max\{2,3\}=3,
$$

$$
\max\{1,0\}=1.
$$

従って列プレイヤーの minimax 値は

$$
\min\{3,1\}=1.
$$

両者が一致し、その値を作るセルは第1行・第2列です。

従って純粋鞍点は

$$
\boxed{(R_1,C_2)}
$$

で、ゲームの値は

$$
\boxed{v^*=1}.
$$

最適混合戦略は純粋戦略を確率1で選ぶ

$$
\boxed{
p^*=(1,0),
\qquad
q^*=(0,1)
}
$$

です。
<!-- solution-end -->

---

## Level B

<a id="ex-game-a2-b01"></a>

### GAME-A2-B01 非対称2×2ゼロ和ゲームを解く

- Level: B
- 目安時間: 30分

利得行列

$$
A=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix}
$$

について、次を求めよ。

1. 行プレイヤーの最適混合戦略。
2. 列プレイヤーの最適混合戦略。
3. ゲームの値。
4. 得られた混合戦略の組が Nash 均衡であることを、各純粋戦略の期待利得から確認せよ。

<!-- solution-start -->
#### 詳細解答

行プレイヤーが第1行を確率 $r$、第2行を確率 $1-r$ で選びます。

列1に対する期待利得は

$$
2r,
$$

列2に対しては

$$
1-r.
$$

行プレイヤーは小さい方を最大にしたいので、内部解では

$$
2r=1-r.
$$

従って

$$
r=\frac13.
$$

よって

$$
\boxed{
p^*=
\left(
\frac13,\frac23
\right)
}.
$$

このとき保証利得は

$$
v^*
=
2\cdot\frac13
=
\boxed{\frac23}.
$$

次に列プレイヤーが第1列を確率 $s$、第2列を確率 $1-s$ で選びます。

行1の期待利得は

$$
2s,
$$

行2は

$$
1-s.
$$

列プレイヤーは大きい方を最小にするので

$$
2s=1-s.
$$

従って

$$
s=\frac13
$$

であり、

$$
\boxed{
q^*=
\left(
\frac13,\frac23
\right)
}.
$$

$q^*$ に対して行1・行2の期待利得はともに

$$
\frac23.
$$

従って行プレイヤーはどちらの純粋戦略へ変更しても $\frac23$ を超えません。

$p^*$ に対して列1・列2を選んだときの行プレイヤーの期待利得もともに

$$
\frac23.
$$

従って列プレイヤーはどちらの純粋戦略へ変更しても行利得を $\frac23$ 未満へ下げられません。

よって

$$
\boxed{(p^*,q^*)\text{ は混合戦略 Nash 均衡}}
$$

です。
<!-- solution-end -->

<a id="ex-game-a2-b02"></a>

### GAME-A2-B02 安全化問題を LP とその双対として書く

- Level: B
- 目安時間: 35分

行プレイヤーの利得行列を

$$
A=
\begin{pmatrix}
1&-1&2\\
0&3&-2
\end{pmatrix}
$$

とする。

1. 行プレイヤーの混合戦略を $p=(p_1,p_2)$、保証値を $v$ として、maximin 問題を線形計画で書け。
2. 列プレイヤーの混合戦略を $q=(q_1,q_2,q_3)$、上側保証値を $w$ として、minimax 問題を線形計画で書け。
3. 1 の三本の保証制約が各列に対する期待利得の下界になっていることを確認せよ。
4. 2 の二本の制約が各行に対する期待利得の上界になっていることを確認せよ。

<!-- solution-start -->
#### 詳細解答

まず

$$
A^{\mathsf T}p
=
\begin{pmatrix}
1&0\\
-1&3\\
2&-2
\end{pmatrix}
\begin{pmatrix}
p_1\\
p_2
\end{pmatrix}
=
\begin{pmatrix}
p_1\\
-p_1+3p_2\\
2p_1-2p_2
\end{pmatrix}.
$$

行プレイヤーがどの列を選ばれても少なくとも $v$ を得る条件は

$$
A^{\mathsf T}p\ge v\mathbf1_3.
$$

従って maximin LP は

$$
\begin{aligned}
\text{maximize}\quad &v\\
\text{subject to}\quad
&p_1\ge v,\\
&-p_1+3p_2\ge v,\\
&2p_1-2p_2\ge v,\\
&p_1+p_2=1,\\
&p_1,p_2\ge0.
\end{aligned}
$$

です。

各不等式の左辺は、それぞれ列1、列2、列3が純粋に選ばれたときの行プレイヤーの期待利得です。

次に

$$
Aq
=
\begin{pmatrix}
q_1-q_2+2q_3\\
3q_2-2q_3
\end{pmatrix}.
$$

列プレイヤーが、行プレイヤーがどちらの行を選んでも利得を $w$ 以下に抑える条件は

$$
Aq\le w\mathbf1_2.
$$

従って minimax LP は

$$
\begin{aligned}
\text{minimize}\quad &w\\
\text{subject to}\quad
&q_1-q_2+2q_3\le w,\\
&3q_2-2q_3\le w,\\
&q_1+q_2+q_3=1,\\
&q_1,q_2,q_3\ge0.
\end{aligned}
$$

です。

最初の不等式は行1の期待利得、二本目は行2の期待利得を $w$ 以下に抑える条件です。

従って二つの LP はそれぞれ

$$
\max_p\min_j (A^{\mathsf T}p)_j
$$

と

$$
\min_q\max_i(Aq)_i
$$

を、補助変数 $v,w$ を導入して線形計画として書き直したものになっています。
<!-- solution-end -->

<a id="ex-game-a2-b03"></a>

### GAME-A2-B03 ゼロ和 Nash 均衡と保証戦略の同値性を使う

- Level: B
- 目安時間: 35分

有限二人ゼロ和ゲームの値を $v^*$ とする。

混合戦略 $p^*,q^*$ が

$$
A^{\mathsf T}p^*\ge v^*\mathbf1_n
$$

および

$$
Aq^*\le v^*\mathbf1_m
$$

を満たすとする。

1. $(p^*)^{\mathsf T}Aq^*=v^*$ を示せ。
2. 行プレイヤーが $p^*$ から一方的に変更しても利得を増やせないことを示せ。
3. 列プレイヤーが $q^*$ から一方的に変更しても自分の利得を増やせないことを示せ。
4. $(p^*,q^*)$ が混合戦略 Nash 均衡であると結論せよ。

<!-- solution-start -->
#### 詳細解答

$q^*\in\Delta_n$ なので、$A^{\mathsf T}p^*\ge v^*\mathbf1_n$ の両辺と $q^*$ の内積を取ると

$$
(p^*)^{\mathsf T}Aq^*
\ge
v^*\mathbf1_n^{\mathsf T}q^*
=
v^*.
$$

一方 $p^*\in\Delta_m$ なので、$Aq^*\le v^*\mathbf1_m$ の両辺と $p^*$ の内積を取ると

$$
(p^*)^{\mathsf T}Aq^*
\le
v^*(p^*)^{\mathsf T}\mathbf1_m
=
v^*.
$$

従って

$$
\boxed{
(p^*)^{\mathsf T}Aq^*=v^*
}.
$$

次に任意の行プレイヤーの混合戦略 $p\in\Delta_m$ に対して

$$
p^{\mathsf T}Aq^*
\le
p^{\mathsf T}(v^*\mathbf1_m)
=
v^*.
$$

従って $p^*$ からどの $p$ へ変更しても、行プレイヤーは $v^*$ を超えられません。

列プレイヤーについては、自分の利得が

$$
-p^{\mathsf T}Aq
$$

であることを使います。

任意の $q\in\Delta_n$ に対して

$$
(p^*)^{\mathsf T}Aq
\ge
v^*,
$$

したがって

$$
-(p^*)^{\mathsf T}Aq
\le
-v^*.
$$

$q^*$ では列プレイヤーの利得がちょうど $-v^*$ なので、どの $q$ へ変更してもそれを超えられません。

よって両プレイヤーに利益を増やす一方的変更がなく、

$$
\boxed{
(p^*,q^*)\text{ は混合戦略 Nash 均衡}
}
$$

です。
<!-- solution-end -->

---

## Level C

<a id="ex-game-a2-c01"></a>

### GAME-A2-C01 パラメータで純粋鞍点から完全混合均衡へ移る境界を分類する

- Level: C
- 目安時間: 50分

実数パラメータ $a$ を持つゼロ和ゲーム

$$
A(a)
=
\begin{pmatrix}
a&0\\
0&1
\end{pmatrix}
$$

を考える。

$a<0$、$a=0$、$a>0$ に分けて次を調べよ。

1. 純粋鞍点の有無。
2. ゲームの値。
3. 行プレイヤーと列プレイヤーの最適混合戦略。
4. $a>0$ では両者が同じ確率
   $$
   \left(\frac{1}{a+1},\frac{a}{a+1}\right)
   $$
   を使うことを導け。
5. $a=0$ で最適戦略が一意でなくなる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

行プレイヤーが第1行を確率 $r$、第2行を確率 $1-r$ で選びます。

列1に対する期待利得は

$$
ar,
$$

列2に対する期待利得は

$$
1-r.
$$

従って行プレイヤーの保証利得は

$$
\min\{ar,\ 1-r\}.
$$

列プレイヤーが第1列を確率 $s$、第2列を確率 $1-s$ で選ぶと、行1の期待利得は

$$
as,
$$

行2は

$$
1-s.
$$

列プレイヤーは

$$
\max\{as,\ 1-s\}
$$

を最小にします。

### 1. $a<0$

第2行・第1列のセルの利得は0です。

第1列で行プレイヤーが得る利得は

$$
a<0,\quad 0
$$

なので、行プレイヤーは第2行を選びます。

第2行で列プレイヤーが見ている行利得は

$$
0,\quad1
$$

なので、列プレイヤーは第1列を選びます。

従って

$$
(R_2,C_1)
$$

が純粋鞍点です。

しかも両方の最適反応が厳密なので、

$$
\boxed{
p^*=(0,1),\qquad q^*=(1,0),\qquad v^*=0
}
$$

が一意な均衡です。

### 2. $a=0$

利得行列は

$$
A(0)
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
$$

列プレイヤーが第1列を選べば、どちらの行に対しても行利得は0です。

従って

$$
q^*=(1,0)
$$

は最適です。

この $q^*$ に対して行1と行2の利得はともに0なので、行プレイヤーはどの混合戦略

$$
p=(r,1-r),
\qquad
0\le r\le1
$$

を使っても最適です。

従って

$$
\boxed{
v^*=0,\qquad
q^*=(1,0),\qquad
p^*\in\Delta_2\text{ は任意}
}
$$

です。

$a<0$ では第1列に対して第2行が厳密に優れていましたが、$a=0$ では

$$
a=0
$$

となって行1も行2も同じ利得0を与えます。

この同点が最適戦略の非一意性を生みます。

### 3. $a>0$

この場合、内部で二つの保証利得を等しくする点を考えます。

$$
ar=1-r.
$$

従って

$$
(a+1)r=1,
$$

よって

$$
r=\frac{1}{a+1}.
$$

残りの確率は

$$
1-r
=
\frac{a}{a+1}.
$$

ゲームの値は

$$
v^*
=
ar
=
\boxed{\frac{a}{a+1}}.
$$

列プレイヤーも同様に

$$
as=1-s
$$

から

$$
s=\frac{1}{a+1}.
$$

従って

$$
\boxed{
p^*=q^*
=
\left(
\frac{1}{a+1},
\frac{a}{a+1}
\right)
}
$$

です。

$a>0$ では両成分が正なので完全混合です。

まとめると、

$$
\boxed{
\begin{array}{c|c|c|c}
&v^*&p^*&q^*\\
\hline
a<0&0&(0,1)&(1,0)\\
a=0&0&\text{任意の }\Delta_2&(1,0)\\
a>0&\dfrac{a}{a+1}
&
\left(\dfrac1{a+1},\dfrac a{a+1}\right)
&
\left(\dfrac1{a+1},\dfrac a{a+1}\right)
\end{array}
}
$$

となります。

境界 $a=0$ では純粋戦略間の厳密な優劣が同点へ変わり、その結果として最適戦略集合が一点から線分へ広がります。
<!-- solution-end -->

---

## 16. まとめと次章への接続

この章では、GAME-A1 の純粋戦略を確率分布へ広げ、

$$
p_i\in\Delta(S_i)
$$

を混合戦略としました。

二人ゼロ和ゲームでは、行プレイヤーの期待利得を

$$
p^{\mathsf T}Aq
$$

と書くと、二人の安全化問題は

$$
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
$$

と

$$
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq
$$

になります。

そして列プレイヤーの線形計画を標準形へ直して双対を取ると、行プレイヤーの線形計画がそのまま現れました。

従って OPT10 の強双対性から

$$
\boxed{
\max_{p\in\Delta_m}
\min_{q\in\Delta_n}
p^{\mathsf T}Aq
=
\min_{q\in\Delta_n}
\max_{p\in\Delta_m}
p^{\mathsf T}Aq
}
$$

が得られます。

ゼロ和ゲームでは、この最適保証戦略の組が混合戦略 Nash 均衡です。

ただし一般の有限ゲームでは、全員の利得を一つの主問題と双対問題へ押し込めることはできません。

次章では各プレイヤーの混合戦略集合が単体であることと、最適反応が集合値写像になることを使います。

そこで FIX3 の Kakutani 不動点定理が合流し、有限ゲーム一般で混合戦略 Nash 均衡が存在することを示します。
