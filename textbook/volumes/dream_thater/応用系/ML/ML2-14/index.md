# ML2-14 逆伝播・自動微分・Jacobian

前講の[ReLU多層パーセプトロン](../ML2-13/index.md#def-ml2-13-mlp)は、重みを与えれば入力から予測値まで計算できた。しかし「予測値を目標値へ近づけるため、何千もの重みをそれぞれどちらへ動かすか」は、まだ分からない。重みを一つずつ少し変えて予測をやり直す方法もあるが、パラメータの数だけ網を再評価するのは高価である。

幸い、層の中間値を保存しておけば、**一つのスカラー損失から全重みへの微分を一度の逆向きの計算で得られる**。この計算が逆伝播であり、より一般には自動微分の逆モードである。本講では、行列の次元・分岐での加算・ReLUの折点を一つずつ検査し、数値の有限差分とは何が一致すべきかまで導く。

## 1. 計算の依存関係をグラフにする

まず実数 $x$ から $u=x^2$ と $v=3x$ を作り、$y=uv+u$ を返す計算を考える。$x=2$ なら $u=4$、$v=6$、$y=4\cdot6+4=28$ となる。$u$ は積と最後の和の**二か所で使われる**。この分岐が、逆伝播で寄与を足す理由になる。

計算を、各中間値を表す節点と、その節点の入力から出力へ向かう矢印で表す。元の入力値に至る依存関係を循環させず、先に必要な値から順に評価できるようにする。

<a id="def-ml2-14-computational-graph"></a>

<!-- formal-statement-start -->
> **定義（計算グラフ）**  
> 有限個の入力節点と計算節点からなる有向非巡回グラフを考える。各計算節点 $v_i\in\mathbb R^{d_i}$ は、直前の親節点の値を並べたベクトル $p_i\in\mathbb R^{m_i}$ に局所写像 $\phi_i:\mathbb R^{m_i}\to\mathbb R^{d_i}$ を適用して $v_i=\phi_i(p_i)$ と定める。矢印は値が依存する向きに置く。この構造を**計算グラフ**という。親が複数回使われる場合は、それぞれの使用位置を別の入力として数える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-14-computational-graph -->
**定義の確認**。上の例は入力 $x$ と計算節点 $u=x^2$、$v=3x$、$w=uv$、$y=w+u$ を持つ。評価順は $x\to(u,v)\to w\to y$ とできるので循環がない。節点 $w$ の局所写像は $\phi_w(u,v)=uv:\mathbb R^2\to\mathbb R$ であり、$y$ の二つの親は $w,u$ である。$u$ から $w$ と $y$ への二本の矢印を区別することが必要になる。
<!-- definition-example-end -->

この段階では計算グラフは「どの値を先に作るか」の記録でしかない。微分を求めるには、各矢印の周辺で小さな変化が何倍に伝わるかを調べる。

## 2. Jacobianの向きと層の連鎖律

[RA6で定義されたJacobian行列](../../../基礎科目/RA/RA6/index.md#def-ra6-jacobian)は、写像 $f:\mathbb R^n\to\mathbb R^m$ の各出力成分を各入力成分で微分した $m\times n$ 行列である。行が**出力**、列が**入力**である。RA6の[微分とJacobianの対応](../../../基礎科目/RA/RA6/index.md#prop-ra6-derivative-jacobian)によって、増分 $\Delta x\in\mathbb R^n$ の一次変化は $J_f(x)\Delta x\in\mathbb R^m$ と読める。

例えば $f(x_1,x_2)=(x_1+x_2,x_1-x_2)$ と $g(u_1,u_2)=(u_1^2,u_1u_2)$ を考える。$x=(2,1)$ なら $u=f(x)=(3,1)$ であり、

$$
J_f(x)=\begin{pmatrix}1&1\\1&-1\end{pmatrix},\qquad
J_g(u)=\begin{pmatrix}2u_1&0\\u_2&u_1\end{pmatrix}
=\begin{pmatrix}6&0\\1&3\end{pmatrix}.
$$

一つ目の写像で入力の増分を中間値の増分へ変え、二つ目でさらに出力へ変える。したがって行列の掛ける順序は $J_gJ_f$ であって $J_fJ_g$ ではない。

<a id="thm-ml2-14-layer-jacobian"></a>

<!-- formal-statement-start -->
> **定理（層のJacobian積）**  
> 開集合上の写像 $f_\ell:\mathbb R^{d_{\ell-1}}\to\mathbb R^{d_\ell}$（$\ell=1,\ldots,L$）が、入力 $h_0=x$ から順に $h_\ell=f_\ell(h_{\ell-1})$ と作る各評価点で微分可能であるとする。このとき $F=f_L\circ\cdots\circ f_1$ のJacobianは

$$
J_F(x)=J_{f_L}(h_{L-1})\cdots J_{f_2}(h_1)J_{f_1}(x)
\in\mathbb R^{d_L\times d_0}.
$$

> さらに微分可能なスカラー関数 $\ell:\mathbb R^{d_L}\to\mathbb R$ との合成損失 $E(x)=\ell(F(x))$ の列勾配は

$$
\nabla_x E(x)=J_F(x)^{\mathsf T}\nabla\ell(F(x)).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を隣接する層へ繰り返す。スカラー関数の微分は $1\times d_L$ の行ベクトルであり、列勾配として読み直すと行列積の順序が反転する。

<!-- proof-start -->
### 証明

$F_1=f_1$、$F_k=f_k\circ F_{k-1}$ と置く。$F_{k-1}$ は微分可能で $F_{k-1}(x)=h_{k-1}$ であると帰納的に仮定する。RA6の[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)へ内側 $F_{k-1}$ と外側 $f_k$ を代入すると

$$
J_{F_k}(x)=J_{f_k}(h_{k-1})J_{F_{k-1}}(x).
$$

左因子は $d_k\times d_{k-1}$、右因子は $d_{k-1}\times d_0$ であり積は $d_k\times d_0$ となる。$k=2,\ldots,L$ を繰り返して最初の式を得る。

$E=\ell\circ F$ にもう一度連鎖律を適用すると、$\ell$ の微分は行 $J_\ell(F(x))=(\nabla\ell(F(x)))^{\mathsf T}$ なので

$$
J_E(x)=(\nabla\ell(F(x)))^{\mathsf T}J_F(x).
$$

両辺を転置すると $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$ より列勾配の式になる。$\square$
<!-- proof-end -->

**数値で転置を検算する。** 上の $f,g$ について $J_{g\circ f}=J_gJ_f$ は

$$
\begin{pmatrix}6&0\\1&3\end{pmatrix}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
=\begin{pmatrix}6&6\\4&-2\end{pmatrix}.
$$

出力 $(s,t)=g(f(x))$ に対して $\ell(s,t)=s+2t$ と置くと $\nabla\ell=(1,2)^{\mathsf T}$ であり、

$$
\nabla_x E=
\begin{pmatrix}6&4\\6&-2\end{pmatrix}
\begin{pmatrix}1\\2\end{pmatrix}
=\begin{pmatrix}14\\2\end{pmatrix}.
$$

直接代入すると $E(x_1,x_2)=3x_1^2+2x_1x_2-x_2^2$ であり、勾配は $(6x_1+2x_2,\,2x_1-2x_2)^{\mathsf T}$。$(2,1)$ では同じ $(14,2)^{\mathsf T}$ になる。こうして、**値を前向きに送る行列 $J$ と勾配を後ろへ送る行列 $J^{\mathsf T}$** を区別できる。

## 3. 逆向きに微分の寄与を運ぶ

損失は最後に一つの実数として得られることが多い。最後の損失が微小に変化したとき、中間値 $v_i$ のどの成分がどれだけ効くかを、列ベクトルにして保持する。これを**随伴量**（逆伝播勾配）という。以下では各局所写像が計算時点で微分可能であるとする。

<a id="def-ml2-14-adjoint"></a>

<!-- formal-statement-start -->
> **定義（逆モードの随伴量）**  
> 有限の[計算グラフ](#def-ml2-14-computational-graph)が実数の損失 $E$ を出力し、各節点での局所写像が微分可能とする。節点 $v_i\in\mathbb R^{d_i}$ を一時的に独立な入力と見て、そこから下流の計算だけを行った損失の列勾配

$$
\bar v_i=\nabla_{v_i}E\in\mathbb R^{d_i}
$$

> を $v_i$ の**随伴量**という。最終損失節点では $\bar E=1$ と初期化する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-14-adjoint -->
**定義の確認**。第1節の $y=w+u$、$w=uv$ に戻る。$y$ を損失とすれば、その節点自身への微分は1である。$w$ だけを変えれば $y$ は同量増えるので、まず

$$
\bar y=\frac{\partial y}{\partial y}=1,\qquad \bar w=\frac{\partial y}{\partial w}=1
$$

となる。$u$ は $w$ を固定した直接経路では係数1、$w=uv$ の経路では係数 $v$ だから、二経路の寄与を足すと

$$
\bar u=1+v,\qquad \bar v=u.
$$

$x=2$ では $u=4,v=6$ なので、$\bar u=7,\bar v=4$。いずれも実数（1成分の列）である。
<!-- definition-example-end -->

節点が一つの親からだけ作られる場合は、親へ局所Jacobianの転置を掛ければよい。複数の子が同じ値を使っていれば、その子から来る勾配を**すべて加える**。

<a id="thm-ml2-14-reverse-chain"></a>

<!-- formal-statement-start -->
> **定理（逆モードの連鎖律と分岐和）**  
> 有限の有向非巡回[計算グラフ](#def-ml2-14-computational-graph)が、微分可能な局所写像と加算・変数の複製で定まる実数損失 $E$ を持つとする。節点 $u\in\mathbb R^n$ の値を用いる各子節点 $v_j=\phi_j(u,\ldots)\in\mathbb R^{m_j}$ について、他の入力を固定したJacobianを $J_{j,u}\in\mathbb R^{m_j\times n}$ と書く。このとき

$$
\bar u=\sum_{j:\,u\to v_j}J_{j,u}^{\mathsf T}\bar v_j
\in\mathbb R^n.
$$

> 一つの子の中で $u$ を複数回使うときは、それぞれの使用位置を独立した矢印として総和に含める。最終損失から逆トポロジカル順にこの計算を行えば、各入力への正しい全勾配を得る。
<!-- formal-statement-end -->

### 証明の見取り図

一つの値の摂動は、その値を使う子すべてへ届く。子 $v_j$ による損失の一次変化は $\bar v_j^{\mathsf T}J_{j,u}\Delta u$。これらを加えて $\Delta u$ の係数を取り出す。

<!-- proof-start -->
### 証明

$u$ の増分 $\Delta u$ を考え、下流の各子の他の親入力を一時的に独立な変数として固定する。局所微分の定義により、子 $v_j$ に直接届く一次増分は

$$
\Delta v_j=J_{j,u}\Delta u+o(\|\Delta u\|).
$$

下流の合成が微分可能だから、その子を通って生じる損失の一次増分は

$$
\bar v_j^{\mathsf T}\Delta v_j
=\bar v_j^{\mathsf T}J_{j,u}\Delta u+o(\|\Delta u\|)
=(J_{j,u}^{\mathsf T}\bar v_j)^{\mathsf T}\Delta u+o(\|\Delta u\|).
$$

異なる子への複製を考えると、下流がさらに合流していても、合流点における微分は各入力に関する線形な増分の和になる。したがって上式を有限個の矢印について足してよく、

$$
\Delta E=\left(\sum_j J_{j,u}^{\mathsf T}\bar v_j\right)^{\mathsf T}\Delta u
+o(\|\Delta u\|).
$$

微分を表す線形写像の一意性より、括弧内が $\bar u$ に等しい。グラフが有限で循環がないので、すべての子の随伴量を先に求める逆向き順序が存在する。損失節点で $\bar E=1$ とし、この式を順に適用すれば帰納法で各節点の真の勾配となる。$\square$
<!-- proof-end -->

第1節のグラフでは、$u=x^2$ と $v=3x$ への微分は $du/dx=2x=4$、$dv/dx=3$ である。[分岐和の定理](#thm-ml2-14-reverse-chain)によって

$$
\bar x=\bar u(2x)+\bar v(3)=7\cdot4+4\cdot3=40.
$$

直接 $y=x^2(3x)+x^2=3x^3+x^2$ を微分すると $9x^2+2x$ だから、$x=2$ で $36+4=40$ となる。一方の経路だけを残すとこの一致が壊れる。

## 4. 多層パーセプトロンを逆伝播する

ここからは、前講と同じ**列ベクトルの層表示**を使う。$L\ge2$、幅 $d_0,\ldots,d_L\ge1$ とし、隠れ層 $\ell<L$ において

$$
z_\ell=W_\ell h_{\ell-1}+b_\ell,\qquad
h_\ell=\phi_\ell(z_\ell),
$$

最終層では $z_L=W_Lh_{L-1}+b_L$、$h_L=z_L$ とする。ここで $W_\ell\in\mathbb R^{d_\ell\times d_{\ell-1}}$、$b_\ell,z_\ell,h_\ell\in\mathbb R^{d_\ell}$、$h_0=x$ である。$\phi_\ell$ は成分ごとに作用し、評価した $z_\ell$ で微分可能な活性化関数とする。ReLUなら折点 $z_{\ell,i}=0$ を除いた位置で条件を満たす。

損失 $\ell_{\mathrm{loss}}:\mathbb R^{d_L}\to\mathbb R$ は $h_L$ で微分可能とし、$E=\ell_{\mathrm{loss}}(h_L)$ と置く。$D_\ell=\operatorname{diag}(\phi_\ell'(z_{\ell,1}),\ldots,\phi_\ell'(z_{\ell,d_\ell}))$ は隠れ層の $d_\ell\times d_\ell$ 対角行列である。局所関係 $\Delta z_\ell=W_\ell\Delta h_{\ell-1}$、$\Delta h_\ell=D_\ell\Delta z_\ell$ によって、入力からのJacobianはそれぞれ $W_\ell,D_\ell$ になる。

重み行列の**勾配**は、各重みを独立に変えたときの損失の偏微分を同じ行・列へ並べた行列とする。すなわち $W_\ell$ が $d_\ell\times d_{\ell-1}$ のとき、$(\nabla_{W_\ell}E)_{ij}=\partial E/\partial(W_\ell)_{ij}$ と定める。この定義により、重みをどの成分から変えても対応する偏微分を取り出せる。

<a id="thm-ml2-14-backprop"></a>

<!-- formal-statement-start -->
> **定理（多層網の逆伝播とパラメータ勾配）**  
> 上の層数・次元を持つ有限の多層網において、各隠れ活性化 $\phi_\ell$ は評価点 $z_\ell$ の各成分で微分可能であり、実数損失 $\ell_{\mathrm{loss}}$ は出力 $h_L$ で微分可能とする。列ベクトル $\delta_\ell=\nabla_{z_\ell}E\in\mathbb R^{d_\ell}$ を置くと

$$
\begin{aligned}
\delta_L&=\nabla_{h_L}\ell_{\mathrm{loss}}(h_L),\\
\delta_\ell&=D_\ell W_{\ell+1}^{\mathsf T}\delta_{\ell+1}
\quad(\ell=L-1,\ldots,1),\\
\nabla_{W_\ell}E&=\delta_\ell h_{\ell-1}^{\mathsf T}
\in\mathbb R^{d_\ell\times d_{\ell-1}},\\
\nabla_{b_\ell}E&=\delta_\ell,\qquad
\nabla_x E=W_1^{\mathsf T}\delta_1.
\end{aligned}
$$

> これらの式は同じ層重みを別の場所で共有しない場合の式であり、共有する場合は使用ごとの寄与を加える。
<!-- formal-statement-end -->

### 証明の見取り図

損失から出力へ戻る勾配は列ベクトルである。次の層から $W_{\ell+1}^{\mathsf T}$ を掛けると前層の出力への勾配になり、さらに $D_\ell$ を掛けて活性化前へ戻る。重みの一成分は「現層の誤差信号 × 前層の入力成分」を生むので、列ベクトルと行ベクトルの積として全成分を並べられる。

<!-- proof-start -->
### 証明

$h_L=z_L$ なので $\delta_L=\nabla_{h_L}E=\nabla\ell_{\mathrm{loss}}(h_L)$。層 $\ell+1$ のアフィン写像では、$h_\ell$ の増分 $v\in\mathbb R^{d_\ell}$ に対し $\Delta z_{\ell+1}=W_{\ell+1}v$ である。[逆モードの連鎖律](#thm-ml2-14-reverse-chain)を使うと

$$
\nabla_{h_\ell}E=W_{\ell+1}^{\mathsf T}\delta_{\ell+1}
\in\mathbb R^{d_\ell}.
$$

続いて $h_\ell=\phi_\ell(z_\ell)$ のJacobianは成分ごとの微分を対角に並べた $D_\ell$ である。したがって

$$
\delta_\ell=D_\ell^{\mathsf T}\nabla_{h_\ell}E
=D_\ell W_{\ell+1}^{\mathsf T}\delta_{\ell+1}.
$$

前向きに $h_0,\ldots,h_L$ を求めておき、逆に $\ell=L-1,\ldots,1$ とこの計算を繰り返せる。

重みの偏微分では他の重みと入力値を固定し、$(W_\ell)_{ij}$ だけを $t$ 増やす。$z_{\ell,k}=\sum_j(W_\ell)_{kj}h_{\ell-1,j}+b_{\ell,k}$ より、$z_{\ell,i}$ だけが $t h_{\ell-1,j}$ 増える。連鎖律から

$$
\frac{\partial E}{\partial(W_\ell)_{ij}}
=\sum_{k=1}^{d_\ell}
\frac{\partial E}{\partial z_{\ell,k}}
\frac{\partial z_{\ell,k}}{\partial(W_\ell)_{ij}}
=\sum_{k=1}^{d_\ell}\delta_{\ell,k}\boldsymbol1_{\{k=i\}}h_{\ell-1,j}
=\delta_{\ell,i}h_{\ell-1,j}.
$$

したがって $(i,j)$ 成分を並べた行列は列と行の行列積 $\delta_\ell h_{\ell-1}^{\mathsf T}$ である。その次元は $(d_\ell\times1)(1\times d_{\ell-1})=d_\ell\times d_{\ell-1}$ で、元の重みと一致する。バイアスは $\partial z_{\ell,k}/\partial b_{\ell,i}=\boldsymbol1_{\{k=i\}}$ より $\nabla_{b_\ell}E=\delta_\ell$。最後に $z_1=W_1x+b_1$ のJacobian $W_1$ を用いると $\nabla_x E=W_1^{\mathsf T}\delta_1$ である。$\square$
<!-- proof-end -->

**列と行の対応を一度固定する。** $W_{\ell+1}^{\mathsf T}\delta_{\ell+1}$ の次元は $(d_\ell\times d_{\ell+1})(d_{\ell+1}\times1)=d_\ell\times1$。一方、勾配行列の式の $h_{\ell-1}$ には**転置**が必要である。この2つを混同すると数値以前に次元が合わなくなる。

### 具体例：一隠れ層の全勾配

入力 $x=1$、目標値 $t=1.3$ とし、幅2の隠れ層と実数出力について

$$
W_1=\begin{pmatrix}1\\-0.5\end{pmatrix},\quad
b_1=\begin{pmatrix}0.2\\0.7\end{pmatrix},\quad
W_2=\begin{pmatrix}2&-1\end{pmatrix},\quad b_2=0.1.
$$

隠れ活性化はReLU、損失は $E=\tfrac12(h_2-t)^2$ とする。$z_1=(1.2,0.2)^{\mathsf T}$ は両成分が正だから折点ではなく $D_1=I_2$。前向きには

$$
h_1=\begin{pmatrix}1.2\\0.2\end{pmatrix},\quad
h_2=2(1.2)-0.2+0.1=2.3,\quad
E=\tfrac12(2.3-1.3)^2=0.5.
$$

出力の誤差は $\delta_2=h_2-t=1$。逆向きには

$$
\delta_1=I_2\begin{pmatrix}2\\-1\end{pmatrix}(1)
=\begin{pmatrix}2\\-1\end{pmatrix}.
$$

重みの勾配・バイアスの勾配・入力の勾配はそれぞれ

$$
\begin{aligned}
\nabla_{W_2}E&=\begin{pmatrix}1.2&0.2\end{pmatrix},
&\nabla_{b_2}E&=1,\\
\nabla_{W_1}E&=\begin{pmatrix}2\\-1\end{pmatrix}(1)
=\begin{pmatrix}2\\-1\end{pmatrix},
&\nabla_{b_1}E&=\begin{pmatrix}2\\-1\end{pmatrix},\\
\nabla_x E&=\begin{pmatrix}1&-0.5\end{pmatrix}
\begin{pmatrix}2\\-1\end{pmatrix}=2.5.
\end{aligned}
$$

例えば $(W_1)_{21}=-0.5$ を $-0.5+s$ と微小に変えると、$z_{1,2}=0.2+s$ であり $|s|<0.2$ ならReLUの有効領域は変わらない。出力は $h_2=2.3-s$、損失は $\tfrac12(1-s)^2$ となる。$s=0$ での微分 $-1$ は $\nabla_{W_1}E$ の第二成分と一致する。

## 5. 分岐・共有パラメータ・ReLUの折点

同じ重みが複数の経路に現れる場合、前節の一経路分の行列積を計算して終わりにできない。例えば $y=\theta x+\theta^2$ では、$\theta$ は積 $\theta x$ と二乗 $\theta^2$ に入る。$dy/d\theta=x+2\theta$ であり、二乗側の $2\theta$ を捨てると誤る。[分岐和の定理](#thm-ml2-14-reverse-chain)が共有パラメータ勾配の加算を保証する。

さらに、ReLUの「微分」は必ずしも実在しない。[ReLU活性化関数](../ML2-13/index.md#def-ml2-13-relu)の定義から $z<0$ の導関数は0、$z>0$ では1だが、$z=0$ の左微分係数は0、右微分係数は1である。**$z=0$ では通常の意味の導関数が存在しない。**

実際の逆伝播算法は折点で便宜上0などの値を選ぶことがある。これは算法上の規則であり、[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を折点でも適用できることを意味しない。特に $r(x)=\max\{0,x\}$ について $x=0$ で規則 $r'(0):=0$ を選んでも、中心差分は

$$
\frac{r(h)-r(-h)}{2h}=\frac{h-0}{2h}=\frac12
\quad(h>0)
$$

となる。中心差分が0.5に収束しても、真の導関数が0.5だという結論は出ない。

**よくある誤解**：損失や網が非凸であることと、いま評価した点で微分できることは別問題である。逆伝播の式は微分可能な点で実際に存在する導関数を返すが、最適化が大域最小値を発見する保証までは含まない。

## 6. 前向きモードと逆向きモードの違い

局所微分を手で展開せず、計算グラフの演算を評価しながら機械的に連鎖律を適用する仕組みを考える。有限差分のように入力をわざと変えて関数を何度も評価するのではなく、演算ごとに**正確な微分の規則**を伝える。

<a id="def-ml2-14-ad-modes"></a>

<!-- formal-statement-start -->
> **定義（自動微分の前向き・逆モード）**  
> 微分可能な基本演算の有限の[計算グラフ](#def-ml2-14-computational-graph)において、その演算の値と局所微分を連鎖律で合成する方法を**自動微分**という。入力 $x\in\mathbb R^n$ の方向 $v\in\mathbb R^n$ に沿って節点値と方向微分を前から伝える方式を**前向きモード**、出力側の重み $w\in\mathbb R^m$ を種として各節点の随伴量を後ろへ伝える方式を**逆モード**という。微分可能な写像 $F:\mathbb R^n\to\mathbb R^m$ に対して、それぞれ $J_F(x)v$ と $J_F(x)^{\mathsf T}w$ を求める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-14-ad-modes -->
**定義の確認**。第2節の $F=g\circ f$ は $x=(2,1)$ で次のJacobianを持っていた。

$$
J_F(x)=\begin{pmatrix}6&6\\4&-2\end{pmatrix}.
$$

方向 $v=(1,0)^{\mathsf T}$ を前から送ると、まず $f$ の入力から中間値への局所Jacobian $J_f$ を掛け、次に評価点 $u=f(x)=(3,1)$ での $J_g(u)$ を掛ける。

$$
J_f(x)v=\begin{pmatrix}1\\1\end{pmatrix},\qquad
J_g(u)\begin{pmatrix}1\\1\end{pmatrix}
=\begin{pmatrix}6\\4\end{pmatrix}=J_F(x)v.
$$

逆モードでは出力種 $w=(1,2)^{\mathsf T}$ を最後の演算から戻す。まず $g$ の局所Jacobianの転置を掛け、その結果を $f$ の転置で戻す。

$$
J_g(u)^{\mathsf T}w=\begin{pmatrix}8\\6\end{pmatrix},\qquad
J_f(x)^{\mathsf T}\begin{pmatrix}8\\6\end{pmatrix}
=\begin{pmatrix}14\\2\end{pmatrix}=J_F(x)^{\mathsf T}w.
$$

前向きは各節点の方向微分を後続へ渡し、逆向きは各節点の随伴量を直前へ渡す。両者とも局所Jacobianの積だけで計算でき、ここでは出力次元2、入力次元2と両積の次元も一致する。
<!-- definition-example-end -->

各局所Jacobianを陽に巨大な行列として保存する必要はない。例えばアフィン演算では前向きは $Wv$、逆向きは $W^{\mathsf T}w$、成分ごとの活性化では成分積を取れば済む。[逆伝播の定理](#thm-ml2-14-backprop)は、まさにこれらを使った逆モードの具体化である。

入力次元 $n$、出力次元 $m$ の一般の写像でJacobian全体を求めるには、標準基底を方向として前向きモードを $n$ 回、または標準基底を出力種として逆モードを $m$ 回実行できる。基本演算あたりの局所計算量が適切に抑えられるグラフでは、**$m=1$ の損失は逆モード一回で入力勾配全体を得やすい**。ただし大規模な中間値の保持、疎性、並列化の費用があるため、あらゆる計算で逆モードが速いという主張ではない。

## 7. 有限差分で本当に検算する

解析的勾配や自動微分の実装ミスを検出するため、パラメータ $\theta_i$ を一つだけ前後にずらし、損失の差から勾配を推定する。ステップ幅 $h>0$ の**中心有限差分**を

$$
D_hE(\theta)_i=
\frac{E(\theta+h e_i)-E(\theta-h e_i)}{2h}
$$

とする。ここで $e_i$ は第 $i$ 成分だけ1の標準基底ベクトルである。両辺はスカラーで、全成分の推定にはパラメータ数だけ対の関数評価が必要になる。

<a id="prop-ml2-14-central-difference"></a>

<!-- formal-statement-start -->
> **命題（中心有限差分の打切り誤差）**  
> 実数関数 $q$ は区間 $[a-h,a+h]$ を含む開区間で3回連続微分可能で、$|q'''(s)|\le M$ がその区間で成り立つとする。$h>0$ に対し

$$
\left|\frac{q(a+h)-q(a-h)}{2h}-q'(a)\right|
\le\frac{Mh^2}{6}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

点 $a$ で左右のTaylor展開を三次の剰余まで書くと、偶数次の項が差で消える。残る剰余を $M$ で抑え、$2h$ で割る。

<!-- proof-start -->
### 証明

$q$ が3回連続微分可能なので、一変数の[Taylorの定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-taylor)を展開点 $a$、評価点 $a+h$ および $a-h$、二次までに適用できる。$\xi_+\in(a,a+h)$ と $\xi_-\in(a-h,a)$ が存在して

$$
\begin{aligned}
q(a+h)&=q(a)+hq'(a)+\frac{h^2}{2}q''(a)+\frac{h^3}{6}q'''(\xi_+),\\
q(a-h)&=q(a)-hq'(a)+\frac{h^2}{2}q''(a)-\frac{h^3}{6}q'''(\xi_-).
\end{aligned}
$$

上式を引き、$2h$ で割ると

$$
\frac{q(a+h)-q(a-h)}{2h}-q'(a)
=\frac{h^2}{12}\{q'''(\xi_+)+q'''(\xi_-)\}.
$$

三角不等式と $|q'''|\le M$ から絶対値は $h^2(2M)/12=Mh^2/6$ 以下である。$\square$
<!-- proof-end -->

例えば $q(s)=s^3$、$a=1$ なら $q'(1)=3$ であり、

$$
\frac{(1+h)^3-(1-h)^3}{2h}=3+h^2.
$$

$q'''(s)=6$ だから上界は $h^2$ となり、ここでは実際に等号である。なお、浮動小数点では $h$ を極端に小さくすると $E(\theta+h e_i)$ と $E(\theta-h e_i)$ が近すぎて、両者の減算で有効数字を失いやすい。理論の打切り誤差 $O(h^2)$ と丸め誤差（典型的には相対計算精度 $u$ に対し $O(u/h)$ の成分）との釣合いがある。有限差分は**数値的な照合手段であって導関数の定義そのものではない**。

[逆伝播と有限差分の対話ラボ](../../../../../../simulation/ml2-14.html)では、上の幅2の網について入力、重み、バイアス、目標値、摂動幅 $h$ を変え、そのたびに前向きの損失・逆向きの全勾配・各パラメータの中心有限差分を再計算する。最大絶対差と各成分の差を表示する。ReLUの折点を選ぶと、両者が一致しない場合も観察できる。滑らかな設定でも **$h$ は十分小さく、しかし丸めで差が消えない程度**に選ぶ必要がある。

## 8. 演習

### ML2-14-A01 二段写像のJacobian

- Level: A

$f(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$g(u_1,u_2)=(u_1^2,u_1u_2)$ について $x=(2,1)$ で $J_{g\circ f}$ を求め、各行列の次元も書け。

<!-- solution-start -->
### 詳細解答

$f:\mathbb R^2\to\mathbb R^2$、$g:\mathbb R^2\to\mathbb R^2$ だから各Jacobianは $2\times2$。$f(2,1)=(3,1)$ で

$$
J_f=\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad
J_g(3,1)=\begin{pmatrix}6&0\\1&3\end{pmatrix}.
$$

[層のJacobian積](#thm-ml2-14-layer-jacobian)へ内側 $f$ と外側 $g$ を代入して

$$
J_{g\circ f}=\begin{pmatrix}6&0\\1&3\end{pmatrix}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
=\begin{pmatrix}6&6\\4&-2\end{pmatrix}.
$$

出力に対応する行が2本、入力に対応する列が2本の行列になる。
<!-- solution-end -->

### ML2-14-A02 二経路の加算

- Level: A

$u=x^2$、$v=3x$、$y=uv+u$ を計算するグラフについて、$x=2$ で $u,v,y$ と $dy/dx$ を求めよ。逆モードでの $u$ への2経路を明示せよ。

<!-- solution-start -->
### 詳細解答

前向きには $u=4,v=6$、したがって $y=4\cdot6+4=28$ となる。最終節点から $\bar y=1$、積 $uv$ から $\bar u$ へ6、最後の加算 $+u$ からさらに1が届く。二経路の和ともう一方の随伴量は

$$
\bar u=6+1=7,\qquad \bar v=u=4.
$$

入力への局所微分は $du/dx=2x=4$、$dv/dx=3$ なので

$$
\bar x=7(4)+4(3)=28+12=40.
$$

直接 $y=3x^3+x^2$ として微分しても $9(2)^2+2(2)=40$ となる。
<!-- solution-end -->

### ML2-14-A03 単一アフィン層の損失

- Level: A

$y=wx+b$、$E=\tfrac12(y-t)^2$ に $w=2,x=3,b=-1,t=4$ を代入する。$E$ と $\partial E/\partial w$、$\partial E/\partial b$、$\partial E/\partial x$ を求めよ。

<!-- solution-start -->
### 詳細解答

前向きには $y=2\cdot3-1=5$、$y-t=1$、$E=1/2$。外側の平方損失の導関数は $dE/dy=y-t=1$。内側は $dy/dw=x=3$、$dy/db=1$、$dy/dx=w=2$ なので、[連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)で

$$
\frac{\partial E}{\partial w}=1\cdot3=3,\quad
\frac{\partial E}{\partial b}=1\cdot1=1,\quad
\frac{\partial E}{\partial x}=1\cdot2=2.
$$
<!-- solution-end -->

### ML2-14-A04 三次関数の差分誤差

- Level: A

$q(s)=s^3$ の $a=1$ での中心有限差分を、任意の $h>0$ について求めよ。真の導関数との誤差と、その次数を述べよ。

<!-- solution-start -->
### 詳細解答

二項展開で

$$
(1+h)^3=1+3h+3h^2+h^3,\quad
(1-h)^3=1-3h+3h^2-h^3.
$$

差は $6h+2h^3$ なので、$2h$ で割って $D_hq(1)=3+h^2$ を得る。直接微分は $q'(s)=3s^2$、したがって $q'(1)=3$。誤差は正確に $h^2$ であり、二次の打切り誤差である。[中心差分の命題](#prop-ml2-14-central-difference)では $M=6$ から上界 $h^2$ が得られ、等号となる。
<!-- solution-end -->

### ML2-14-B01 一隠れ層の全勾配

- Level: B

入力 $x=1$、幅2のReLU網 $z_1=W_1x+b_1$、$h_1=\sigma(z_1)$、$y=W_2h_1+b_2$ に

$$
W_1=(1,-0.5)^{\mathsf T},\quad b_1=(0.2,0.7)^{\mathsf T},
\quad W_2=(2,-1),\quad b_2=0.1
$$

を使う。目標値 $t=1.3$、損失 $E=(y-t)^2/2$ について $E,\delta_2,\delta_1$、各パラメータおよび入力の勾配を求め、微分可能性を確認せよ。

<!-- solution-start -->
### 詳細解答

$z_1=(1.2,0.2)^{\mathsf T}$ と各成分が0でないのでReLUはここで微分可能で $D_1=I_2$。$h_1=z_1$、$y=2(1.2)-1(0.2)+0.1=2.3$、$E=(2.3-1.3)^2/2=1/2$ である。

$$
\delta_2=y-t=1,\qquad
\delta_1=D_1W_2^{\mathsf T}\delta_2
=\begin{pmatrix}2\\-1\end{pmatrix}.
$$

[逆伝播公式](#thm-ml2-14-backprop)に $h_0=x=1$ と $h_1=(1.2,0.2)^{\mathsf T}$ を代入すると

$$
\begin{aligned}
\nabla_{W_2}E&=\delta_2h_1^{\mathsf T}=(1.2,0.2),&
\nabla_{b_2}E&=1,\\
\nabla_{W_1}E&=\delta_1x^{\mathsf T}=(2,-1)^{\mathsf T},&
\nabla_{b_1}E&=(2,-1)^{\mathsf T},\\
\nabla_xE&=W_1^{\mathsf T}\delta_1=1(2)+(-0.5)(-1)=2.5.
\end{aligned}
$$

$W_2$ の勾配は $1\times2$、$W_1$ の勾配は $2\times1$ で、元の行列と次元が同じである。
<!-- solution-end -->

### ML2-14-B02 共有パラメータの二つの経路

- Level: B

$y(\theta)=\theta x+\theta^2$、$E(\theta)=\tfrac12(y(\theta)-t)^2$ について $x=1,t=0,\theta=2$ とする。逆向きの二経路を区別して $dE/d\theta$ を求めよ。また、$\theta^2$ の経路を無視した場合の誤値を示せ。

<!-- solution-start -->
### 詳細解答

$y=2(1)+2^2=6$、$E=6^2/2=18$。最終損失から $\bar y=y-t=6$。$\theta x$ 経路の局所導関数は $x=1$、$\theta^2$ 経路は $2\theta=4$ なので、[分岐和](#thm-ml2-14-reverse-chain)から

$$
\frac{dE}{d\theta}=6(1)+6(4)=6+24=30.
$$

二乗経路を捨てた値は6であり、真値とは24異なる。直接 $y(\theta)=\theta+\theta^2$ と置いても $E'=(\theta+\theta^2)(1+2\theta)=6\cdot5=30$ と一致する。
<!-- solution-end -->

### ML2-14-B03 ReLUの折点

- Level: B

$r(x)=\max\{0,x\}$ を $x=0$ で考える。左右の微分係数、中心有限差分の $h>0$ での値、自動微分で折点微分を0と設定した際の出力をそれぞれ求め、互いの違いを説明せよ。

<!-- solution-start -->
### 詳細解答

$h>0$ のとき $(r(h)-r(0))/h=h/h=1$。左からは $(r(-h)-r(0))/(-h)=0/(-h)=0$。したがって通常の微分係数は存在しない。中心差分は

$$
\frac{r(h)-r(-h)}{2h}=\frac{h-0}{2h}=\frac12.
$$

算法上の微分を折点で0と設定すれば逆モードが返す値は0である。ただし、0も1/2もこの点で存在しない古典的導関数を表すものではない。[中心差分の打切り誤差命題](#prop-ml2-14-central-difference)の3回微分可能性が破れているので、そこから両者の一致を主張できない。
<!-- solution-end -->

### ML2-14-B04 前向き方向と逆向き勾配

- Level: B

$F:\mathbb R^3\to\mathbb R^2$ を $F(x_1,x_2,x_3)=(x_1x_2+x_3,\ x_1^2-x_2)$ とする。$x=(1,2,3)$ において $J_F$、方向 $v=(1,0,-1)^{\mathsf T}$ に対する前向き $J_Fv$、種 $w=(2,-1)^{\mathsf T}$ に対する逆向き $J_F^{\mathsf T}w$ を求めよ。

<!-- solution-start -->
### 詳細解答

成分を一つずつ偏微分すると

$$
J_F(x)=\begin{pmatrix}x_2&x_1&1\\2x_1&-1&0\end{pmatrix},
\qquad
J_F(1,2,3)=\begin{pmatrix}2&1&1\\2&-1&0\end{pmatrix}.
$$

前向きは $(2\cdot1+1\cdot0+1(-1),\,2\cdot1-1\cdot0)^{\mathsf T}=(1,2)^{\mathsf T}$。逆向きは各列と $w$ の内積で

$$
J_F^{\mathsf T}w=
\begin{pmatrix}2&2\\1&-1\\1&0\end{pmatrix}
\begin{pmatrix}2\\-1\end{pmatrix}
=\begin{pmatrix}2\\3\\2\end{pmatrix}.
$$

前向きは出力次元の2成分、逆向きは入力次元の3成分を返す。$J_F$ 自体は $2\times3$ である。
<!-- solution-end -->

### ML2-14-C01 行列勾配と有限差分の統合

- Level: C

二入力・二隠れユニット・一出力のReLU網を考える。入力 $x=(1,-1)^{\mathsf T}$、目標値 $t=1$ とし、

$$
W_1=\begin{pmatrix}1&1\\2&-1\end{pmatrix},\quad
b_1=\begin{pmatrix}1\\-1\end{pmatrix},\quad
W_2=\begin{pmatrix}2&-1\end{pmatrix},\quad b_2=0.
$$

$z_1=W_1x+b_1$、$h_1=\sigma(z_1)$、$y=W_2h_1+b_2$、$E=(y-t)^2/2$ とする。

1. $z_1,h_1,y,E$ を求め、ReLUの微分可能性を確認せよ。
2. $\delta_2,\delta_1$ を計算し、$\nabla_{W_1}E$、$\nabla_{b_1}E$、$\nabla_{W_2}E$、$\nabla_{b_2}E$、$\nabla_xE$ の次元と値を求めよ。
3. $(W_1)_{21}=2$ だけを $2+s$ へ変えたときの損失 $E(s)$ を $|s|$ が十分小さい範囲で書き、中心有限差分が前問の成分勾配に一致することを任意の十分小さい $h>0$ について示せ。
4. $(W_1)_{21}$ の微分だけを出力層の係数と直接掛け、損失の導関数を忘れたときの誤りを説明せよ。

<!-- solution-start -->
### 詳細解答

1. 行列積は

$$
W_1x=
\begin{pmatrix}1(1)+1(-1)\\2(1)+(-1)(-1)\end{pmatrix}
=\begin{pmatrix}0\\3\end{pmatrix}.
$$

したがって $z_1=(1,2)^{\mathsf T}$、$h_1=(1,2)^{\mathsf T}$ である。両成分が正なので、ReLUはこの点で微分可能で $D_1=I_2$。出力は $y=2(1)-1(2)+0=0$、損失は $E=(0-1)^2/2=1/2$。

2. 出力側の誤差は $\delta_2=y-t=-1$、隠れ層は

$$
\delta_1=D_1W_2^{\mathsf T}\delta_2
=\begin{pmatrix}2\\-1\end{pmatrix}(-1)
=\begin{pmatrix}-2\\1\end{pmatrix}.
$$

[逆伝播公式](#thm-ml2-14-backprop)で列と行の行列積を順に計算すると

$$
\begin{aligned}
\nabla_{W_1}E
&=\begin{pmatrix}-2\\1\end{pmatrix}\begin{pmatrix}1&-1\end{pmatrix}
=\begin{pmatrix}-2&2\\1&-1\end{pmatrix}\quad(2\times2),\\
\nabla_{b_1}E&=\begin{pmatrix}-2\\1\end{pmatrix}\quad(2\times1),\\
\nabla_{W_2}E
&=(-1)\begin{pmatrix}1&2\end{pmatrix}
=\begin{pmatrix}-1&-2\end{pmatrix}\quad(1\times2),\\
\nabla_{b_2}E&=-1\quad(1\times1).
\end{aligned}
$$

入力への勾配も積を省略せずに

$$
\nabla_xE=W_1^{\mathsf T}\delta_1
=\begin{pmatrix}1&2\\1&-1\end{pmatrix}
\begin{pmatrix}-2\\1\end{pmatrix}
=\begin{pmatrix}0\\-3\end{pmatrix}\quad(2\times1).
$$

3. $(W_1)_{21}$ のみを $2+s$ とすると、$z_{1,2}=2+s$ となり、$|s|<1$ なら二つの活性化は依然として正である。第一成分は1のままで、出力は $y(s)=2(1)-(2+s)=-s$。したがって

$$
E(s)=\frac12(-s-1)^2=\frac12+s+\frac{s^2}{2}.
$$

$0<h<1$ について $E(h)-E(-h)=2h$ なので中心差分は $2h/(2h)=1$。これは $(\nabla_{W_1}E)_{21}=1$ と厳密に一致する。二次関数なので三次導関数は0であり、打切り誤差も0である。

4. 重みから出力への局所微分は $\partial y/\partial(W_1)_{21}=W_{2,2}x_1=-1$ である。しかし損失の微分は $\partial E/\partial y=y-t=-1$ だから、両方を掛けなければならない。真の値は $(-1)(-1)=+1$ であり、局所微分 $-1$ だけを答えると符号まで逆になる。
<!-- solution-end -->

## 9. まとめと次への接続

Jacobianは前向きの一次変化 $Jv$ を表す。一方、スカラー損失の勾配は出力側から $J^{\mathsf T}w$ を繰り返して戻すことで得られる。各層の誤差信号 $\delta_\ell$ と保存した前向き出力 $h_{\ell-1}$ から列と行の行列積による重み勾配を作り、分岐や重み共有では寄与を加える。ReLUの折点では古典的微分がないため、算法上の選択と数値差分の一致を無条件には期待できない。

続く **ML2-15** では、ここで求めた勾配を使ってパラメータを実際に更新し、学習率・正則化・検証データの役割を分けて考える。
