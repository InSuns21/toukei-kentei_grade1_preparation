# CA5 winding number・解析接続・monodromy

> **標準複素解析コア V**。CA4 では単純閉曲線の内部を一度だけ数える留数定理・偏角原理までを証明した。本章では、自己交差や複数周回を許す閉曲線に対して **winding number（巻き数・指数）** を導入し、留数を index で重み付けする一般形へ拡張する。後半では局所正則関数の芽を経路に沿ってつなぐ解析接続を定式化し、単連結性が終点の芽を経路独立にする monodromy theorem を、有限分割と恒等定理の伝播まで展開して証明する。

<!-- definition-example-audit: strict -->

## 0. この章で何が新しくなるか

CA4 の単純閉曲線版では、正向きの境界の内部にある点は一度だけ数えられた。しかし一般の閉曲線は、同じ領域を二周したり、逆向きに回ったり、自己交差によって領域ごとに異なる回数を持ったりする。その符号付き周回数を積分で読み取るのが winding number である。

```text
winding number
  ↓ 大域的な偏角の枝を仮定せず整数値性を証明
局所定数性・非有界成分で0
  ↓
多角形化 → 有限平面グラフ → 面のindexによる境界chain
  ↓
一般閉曲線版留数定理 → 一般閉曲線版偏角原理
  ↓
正則関数の芽・経路に沿う解析接続
  ↓ 恒等定理を有限個の重なりへ逐次適用
固定経路での一意性
  ↓ ホモトピーを有限個の近い経路へ分割
monodromy theorem
```

既知とするのは、[CA2 の曲線・ホモトピー・単連結性](../CA2/index.md)、[CA3 の恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity)、[CA4 の留数・単純閉曲線版留数定理・対数微分](../CA4/index.md)までである。CA4 の Rouché の定理は再証明しない。

---

## 1. winding number

<a id="def-ca5-winding-number"></a>
<!-- formal-statement-start -->
### 定義（winding number）

$\gamma:[\alpha,\beta]\to\mathbb C$ を閉じた区分的 $C^1$ 曲線、$a\notin\gamma([\alpha,\beta])$ とする。$a$ に関する $\gamma$ の **winding number** を

$$
\boxed{
\operatorname{Ind}(\gamma,a)
=\frac1{2\pi i}\int_\gamma\frac{dz}{z-a}
}
$$

で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca5-winding-number -->
**定義の確認**：$\gamma_m(t)=Re^{imt}$、$0\le t\le2\pi$、$m\in\mathbb Z$ なら

$$
\frac{\gamma_m'(t)}{\gamma_m(t)}=im,
\qquad
\operatorname{Ind}(\gamma_m,0)=m.
$$

$m<0$ は時計回り、$|m|>1$ は複数周回を表す。
<!-- definition-example-end -->

線積分の加法性と向きの反転から

$$
\operatorname{Ind}(\gamma_1*\gamma_2,a)
=\operatorname{Ind}(\gamma_1,a)+\operatorname{Ind}(\gamma_2,a),
\qquad
\operatorname{Ind}(\gamma^{-},a)=-\operatorname{Ind}(\gamma,a)
$$

が従う。

<a id="thm-ca5-winding-integer-local-constant"></a>
<!-- formal-statement-start -->
### 定理（winding number の整数値性・局所定数性）

閉じた区分的 $C^1$ 曲線 $\gamma$ と $a\notin\gamma$ に対して

$$
\operatorname{Ind}(\gamma,a)\in\mathbb Z.
$$

さらに $a\mapsto\operatorname{Ind}(\gamma,a)$ は $\mathbb C\setminus\gamma$ 上で局所定数である。従って補集合の各連結成分上で一定であり、非有界成分では0である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. 整数値性：大域的な偏角の枝を使わない

区分的 $C^1$ の分割点を含めて

$$
I(t)=\int_\alpha^t\frac{\gamma'(s)}{\gamma(s)-a}\,ds,
\qquad
F(t)=(\gamma(t)-a)e^{-I(t)}
$$

と置く。$\gamma$ が $C^1$ である各開区間では

$$
I'(t)=\frac{\gamma'(t)}{\gamma(t)-a}
$$

なので

$$
F'(t)
=\gamma'(t)e^{-I(t)}-(\gamma(t)-a)e^{-I(t)}I'(t)=0.
$$

$I$ と $\gamma$ は分割点でも連続だから $F$ は全区間で同じ定数である。従って

$$
F(\beta)=F(\alpha).
$$

閉曲線性 $\gamma(\beta)=\gamma(\alpha)$ と $\gamma(\alpha)-a\ne0$ から

$$
e^{I(\beta)}=1.
$$

$I(\beta)=x+iy$ と書けば、絶対値から $e^x=1$、従って $x=0$。さらに $\cos y+i\sin y=1$ だから $y\in2\pi\mathbb Z$。よって

$$
I(\beta)\in2\pi i\mathbb Z,
\qquad
\operatorname{Ind}(\gamma,a)=\frac{I(\beta)}{2\pi i}\in\mathbb Z.
$$

ここでは $\mathbb C\setminus\{a\}$ 上の大域的な偏角の枝を一度も仮定していない。

#### 2. 局所定数性

$a_0\notin\gamma$ を固定し

$$
d=\operatorname{dist}(a_0,\gamma)>0
$$

とする。$|a-a_0|<d/2$ なら曲線上で

$$
|z-a_0|\ge d,
\qquad
|z-a|\ge d/2,
$$

従って

$$
\left|\frac1{z-a}-\frac1{z-a_0}\right|
\le\frac{2|a-a_0|}{d^2}.
$$

[ML評価](../CA2/index.md#thm-ca2-reparam-ml) により

$$
\left|
\operatorname{Ind}(\gamma,a)-\operatorname{Ind}(\gamma,a_0)
\right|
\le
\frac{L(\gamma)|a-a_0|}{\pi d^2}
\longrightarrow0.
$$

従って index は連続である。しかも整数値なので十分小さい近傍では値が変わらず、局所定数である。連結成分上の局所定数関数は定数である。

#### 3. 非有界成分では0

曲線像が $|z|\le M$ に入るとする。$|a|>M$ なら

$$
|\operatorname{Ind}(\gamma,a)|
\le\frac{L(\gamma)}{2\pi(|a|-M)}.
$$

$|a|$ が十分大きければ右辺は1未満で、左辺は整数の絶対値だから0である。非有界成分上では index は一定なので、その成分全体で0である。$\square$
<!-- proof-end -->

<a id="cor-ca5-winding-homotopy"></a>
<!-- formal-statement-start -->
### 系（winding number のホモトピー不変性）

$a$ を避ける二つの閉じた区分的 $C^1$ 曲線 $\gamma_0,\gamma_1$ が $\mathbb C\setminus\{a\}$ 内で閉曲線としてホモトピックなら

$$
\operatorname{Ind}(\gamma_0,a)=\operatorname{Ind}(\gamma_1,a).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$1/(z-a)$ は $\mathbb C\setminus\{a\}$ 上正則である。[正則線積分のホモトピー不変性](../CA2/index.md#thm-ca2-homotopy-invariance) から二積分は等しく、$2\pi i$ で割ればよい。$\square$
<!-- proof-end -->

---

## 2. 一般閉曲線へ留数定理を拡張する

<a id="def-ca5-null-homologous-cycle"></a>
<!-- formal-statement-start -->
### 定義（領域内で null-homologous な閉曲線）

領域 $\Omega\subset\mathbb C$ 内の閉曲線 $\gamma$ が **$\Omega$ 内で null-homologous** であるとは

$$
\operatorname{Ind}(\gamma,w)=0
\qquad(w\in\mathbb C\setminus\Omega)
$$

が成り立つことをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca5-null-homologous-cycle -->
**定義の確認**：$\Omega$ が単連結なら任意の閉曲線は $\Omega$ 内で null-homologous である。$w\notin\Omega$ を固定すると、$\gamma$ を $\Omega$ 内で定値曲線へ縮める間に $w$ を通らず、[ホモトピー不変性](#cor-ca5-winding-homotopy) から index は0のままである。
<!-- definition-example-end -->

この条件は「$\gamma$ が単純」より一般的であり、一般留数定理では曲線が $\Omega$ の外側の穴を正味で巻かないことを保証する。

<a id="lem-ca5-index-support-compact"></a>
<!-- formal-statement-start -->
### 補題（非零 index の支持は $\Omega$ 内でコンパクト）

$\gamma\subset\Omega$ が $\Omega$ 内で null-homologous とする。このとき

$$
K_\gamma
=
\gamma([\alpha,\beta])
\cup
\{w\notin\gamma:\operatorname{Ind}(\gamma,w)\ne0\}
$$

の閉包は $\Omega$ にコンパクトに含まれる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節の非有界成分で0という結果から $K_\gamma$ は有界である。曲線像は $\Omega$ 内のコンパクト集合なので

$$
d=\operatorname{dist}(\gamma,\mathbb C\setminus\Omega)>0.
$$

$w$ が $\mathbb C\setminus\Omega$ から距離 $d/2$ 未満にあるとし、$u\notin\Omega$ を $|w-u|<d/2$ となるよう取る。線分 $[u,w]$ の各点 $v$ では

$$
\operatorname{dist}(v,\gamma)
\ge d-|v-u|>d/2,
$$

従って線分は曲線像と交わらない。$u,w$ は $\mathbb C\setminus\gamma$ の同じ連結成分に属し、局所定数性と null-homologous 条件から

$$
\operatorname{Ind}(\gamma,w)=\operatorname{Ind}(\gamma,u)=0.
$$

従って非零 index の集合は $\mathbb C\setminus\Omega$ から少なくとも $d/2$ 離れる。$K_\gamma$ の閉包は有界閉集合で、しかも $\Omega$ に正の距離をもって含まれるからコンパクトである。$\square$
<!-- proof-end -->

$f$ が $\Omega$ 上 meromorphic なら、このコンパクト集合に入る極は有限個である。無限個あれば $\Omega$ 内に集積点を持ち、極の孤立性に反する。

<a id="lem-ca5-polygonal-face-chain"></a>
<!-- formal-statement-start -->
### 補題（多角形曲線の面境界分解）

$P$ を閉多角形曲線とする。指定された有限個の点を横切らない範囲で必要なら頂点を微小摂動し、辺を一般位置に置く。全交点で辺を細分して有限平面グラフを作る。各面 $F$ から $w_F$ を取り

$$
n_F=\operatorname{Ind}(P,w_F)
$$

とする。各面境界を面を左に見る向きに取れば、向き付き1-chainとして

$$
\boxed{P=\sum_{F\text{ bounded}}n_F\partial F}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

有限グラフの開辺 $e$ を固定し、$P$ がその向きに正味 $m_e$ 回通るとする。左面を $F_L$、右面を $F_R$ とする。示すべき関係は

$$
n_{F_L}-n_{F_R}=m_e.
$$

まず右向き線分を一回通る場合を考える。辺の内部点を原点へ移し、その近傍では曲線が実軸上 $[-r,r]$ だけになるようにする。上下の点 $a_+=i\varepsilon$, $a_-=-i\varepsilon$ を取る。局所線分以外の曲線部分が二点の index 差に与える寄与は $\varepsilon\downarrow0$ で0へ行く。一方、局所線分の寄与の差は

$$
\begin{aligned}
&\frac1{2\pi i}\int_{-r}^{r}
\left(\frac1{x-i\varepsilon}-\frac1{x+i\varepsilon}\right)dx\\
&=\frac1{2\pi i}\int_{-r}^{r}\frac{2i\varepsilon}{x^2+\varepsilon^2}dx
=\frac{2}{\pi}\arctan\frac r\varepsilon
\longrightarrow1.
\end{aligned}
$$

$a_+,a_-$ がそれぞれ同じ二面に留まる間、両 index は整数で一定である。従って十分小さい $\varepsilon$ では差は厳密に1である。向きを逆にすれば $-1$、正味 $m_e$ 回なら加法性から $m_e$ となる。

一方 $\sum_F n_F\partial F$ における $e$ の係数は、左面から $+n_{F_L}$、右面から $-n_{F_R}$ が来るので $m_e$ に一致する。全開辺で係数が一致するから1-chainとして等しい。非有界面の index は0であり、橋は同じ面の境界に逆向きで二度現れて相殺する。$\square$
<!-- proof-end -->

ここが一般曲線の有限化の要点である。元の区分的 $C^1$ 曲線に「自己交差は有限個」と仮定してはいけない。正則性を使える局所円板内で先に有限多角形へ移し、その有限グラフにだけ上の補題を適用する。

<a id="thm-ca5-general-residue"></a>
<!-- formal-statement-start -->
### 定理（一般閉曲線版留数定理）

$\Omega$ を領域、$\gamma$ を $\Omega$ 内で null-homologous な閉じた区分的 $C^1$ 曲線とする。$f$ を $\Omega$ 上 meromorphic とし、$\gamma$ 上に極を持たないとする。このとき

$$
\boxed{
\int_\gamma f(z)\,dz
=2\pi i\sum_a
\operatorname{Ind}(\gamma,a)\operatorname{Res}(f,a)
}
$$

が成り立つ。和は非零 index を持つ極について取り、有限和である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[非零 index の支持のコンパクト性](#lem-ca5-index-support-compact) から、関係する極は有限個 $a_1,\dots,a_m$ である。

#### 1. 一般曲線を極を避けた有限多角形へ移す

$\gamma$ の像はコンパクトで極を含まない。各曲線点のまわりに $\Omega$ に含まれ、極を含まない小円板を取り、有限部分被覆を選ぶ。[曲線の多角形化](../CA2/index.md#lem-ca2-polygonal-replacement) の分割を十分細かくし、各小弧と弦が一つの円板内に入るようにする。得られた閉多角形曲線を $P$ とする。

各小弧から弦への変形は極を避けて $\Omega$ 内にあるので

$$
\int_\gamma f\,dz=\int_Pf\,dz,
\qquad
\operatorname{Ind}(\gamma,a_j)=\operatorname{Ind}(P,a_j).
$$

また $w\notin\Omega$ に対しても変形は $w$ を通らないので $\operatorname{Ind}(P,w)=0$。従って $P$ も null-homologous である。

必要なら有限個の頂点を上の極なし円板内で微小に動かす。変更前後の二折れ線が張る小三角形内で $f$ は正則だから三角形版 Cauchy–Goursat により積分は変わらず、極も領域外の点も横切らない。有限回の摂動で重なる辺を除き、異なる辺の交差を有限個の横断交差だけにできる。

#### 2. 面境界へ分解して CA4 を適用する

$P$ の有限面 $F$ に $n_F=\operatorname{Ind}(P,w_F)$ を付ける。[面境界分解](#lem-ca5-polygonal-face-chain) から

$$
\int_P f\,dz=\sum_Fn_F\int_{\partial F}f\,dz.
$$

$n_F\ne0$ の面は $\Omega$ の外へ出られない。もし $w\in F\setminus\Omega$ なら null-homologous 条件から $n_F=\operatorname{Ind}(P,w)=0$ だからである。またその閉包は前のコンパクト支持に含まれ、$\Omega$ にコンパクトに含まれる。

各非零面の境界は有限平面グラフの有限境界歩道である。橋の往復を消し、必要なら有限本の切れ目を入れると単純多角形の外側・内側境界へ分けられる。面内の極を互いに素な小円で除けば、CA4 の [有限個の穴を持つ領域の境界相殺](../CA4/index.md#lem-ca4-multiply-connected-boundary) が適用できる。小円積分は [留数の係数積分公式](../CA4/index.md#def-ca4-residue) により $2\pi i$ 倍の留数だから

$$
\int_{\partial F}f(z)\,dz
=2\pi i\sum_{a_j\in F}\operatorname{Res}(f,a_j).
$$

従って

$$
\begin{aligned}
\int_Pf\,dz
&=2\pi i\sum_Fn_F\sum_{a_j\in F}\operatorname{Res}(f,a_j)\\
&=2\pi i\sum_{j=1}^m\operatorname{Ind}(P,a_j)\operatorname{Res}(f,a_j).
\end{aligned}
$$

$P$ から $\gamma$ へ戻せば主張を得る。$\square$
<!-- proof-end -->

この証明では、元の曲線に有限自己交差を仮定していない。有限性が現れるのは、極を避ける局所円板で多角形化した後だけである。

### 例：二つのループを逆向きに回る

$\operatorname{Ind}(\gamma,-1)=1$、$\operatorname{Ind}(\gamma,1)=-1$ とし

$$
f(z)=\frac1{z+1}+\frac2{z-1}
$$

とする。留数は1と2なので

$$
\int_\gamma f(z)\,dz
=2\pi i(1-2)=-2\pi i.
$$

単純閉曲線の「内部なら1」ではなく、向きと周回数がそのまま係数になる。

---

## 3. 一般閉曲線版の偏角原理

<a id="thm-ca5-general-argument-principle"></a>
<!-- formal-statement-start -->
### 定理（一般閉曲線版偏角原理）

$\gamma$ を $\Omega$ 内で null-homologous な閉じた区分的 $C^1$ 曲線とする。$f$ は $\Omega$ 上 meromorphic で恒等的に0ではなく、$\gamma$ 上に零点も極も持たないとする。零点 $z_j$ の位数を $m_j$、極 $p_k$ の位数を $n_k$ とすると

$$
\boxed{
\frac1{2\pi i}\int_\gamma\frac{f'(z)}{f(z)}\,dz
=
\sum_jm_j\operatorname{Ind}(\gamma,z_j)
-
\sum_kn_k\operatorname{Ind}(\gamma,p_k)
}
$$

が成り立つ。非零 index の項だけを残せば有限和である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f'/f$ は零点・極を除いて正則であり、CA4 の [対数微分の留数](../CA4/index.md#lem-ca4-log-derivative-residue) から

$$
\operatorname{Res}(f'/f,z_j)=m_j,
\qquad
\operatorname{Res}(f'/f,p_k)=-n_k.
$$

[一般閉曲線版留数定理](#thm-ca5-general-residue) を $f'/f$ に適用して $2\pi i$ で割ればよい。$\square$
<!-- proof-end -->

反時計回りの単純閉曲線なら内部点で index は1、外部点で0だから、CA4 の単純閉曲線版偏角原理を回収する。

---

## 4. 芽と解析接続

<a id="def-ca5-germ"></a>
<!-- formal-statement-start -->
### 定義（正則関数の芽）

$a\in\Omega$ とする。$a$ の近傍 $U,V$ 上の正則関数 $f,g$ が、ある $a$ の近傍 $W\subset U\cap V$ で

$$
f|_W=g|_W
$$

を満たすとき、$(U,f)$ と $(V,g)$ は $a$ で同じ **芽（germ）** を定めるという。その同値類を $[f]_a$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca5-germ -->
**定義の確認**：$U,V$ 全体で一致する必要はない。点 $a$ の十分小さい近傍で一致すれば同じ芽である。
<!-- definition-example-end -->

<a id="def-ca5-continuation-chain"></a>
<!-- formal-statement-start -->
### 定義（経路に沿う解析接続）

$\gamma:[0,1]\to\Omega$ と初期芽 $\mathfrak f_0$ を取る。$\mathfrak f_0$ の **$\gamma$ に沿う解析接続** とは、有限分割

$$
0=t_0<t_1<\cdots<t_N=1
$$

と開円板 $D_1,\dots,D_N\subset\Omega$、各 $D_j$ 上の正則関数 $f_j$ で

1. $\gamma([t_{j-1},t_j])\subset D_j$、
2. $[f_1]_{\gamma(0)}=\mathfrak f_0$、
3. $D_j\cap D_{j+1}\ne\varnothing$ かつ $f_j=f_{j+1}$ on $D_j\cap D_{j+1}$、

を満たすものをいう。最後の芽 $[f_N]_{\gamma(1)}$ を終点芽という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ca5-continuation-chain -->
**定義の確認**：二円板の交わりは凸なので連結である。代表関数が重なりの非空開部分で一致すれば [恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity) により重なり全体で一致する。従って局所的一致を次の円板へ伝播できる。
<!-- definition-example-end -->

<a id="thm-ca5-continuation-uniqueness"></a>
<!-- formal-statement-start -->
### 定理（固定経路に沿う解析接続の一意性）

同じ初期芽を同じ経路 $\gamma$ に沿って解析接続したとき、終点で得られる芽は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

二つの解析接続鎖 $(D_j,f_j)$、$(E_k,g_k)$ を取る。両方の分割点を合わせて細分する。各時刻 $t$ では $\gamma(t)$ を含む $D_j$ と $E_k$ があり、開集合性から $t$ の小区間 $I_t$ を選んで

$$
\gamma(I_t)\subset D_j\cap E_k
$$

とできる。$[0,1]$ のコンパクト性から有限部分被覆を取り、Lebesgue数を使って

$$
0=s_0<s_1<\cdots<s_M=1
$$

を十分細かくし、各 $[s_{\ell-1},s_\ell]$ が一つの $I_t$ に入るようにする。

最初は初期芽が同じなので、対応する二代表は始点近傍で一致する。両者は連結な $D_j\cap E_k$ 上正則だから恒等定理により共通部分全体で一致し、$\gamma(s_1)$ の芽が一致する。これを $\ell=2,\dots,M$ と有限回繰り返すと、一致が隣接区間へ順に伝わり、終点芽が一致する。$\square$
<!-- proof-end -->

---

## 5. 経路を少し動かしても終点芽は変わらない

<a id="lem-ca5-path-stability"></a>
<!-- formal-statement-start -->
### 補題（解析接続の経路安定性）

同じ始点・終点を持つ経路 $\alpha,\beta$ を考える。$\alpha$ に沿う初期芽の解析接続が存在し終点芽を $\mathfrak f_1$ とする。このときある $\varepsilon>0$ が存在して

$$
\sup_t|\alpha(t)-\beta(t)|<\varepsilon
$$

かつ $\beta$ に沿う解析接続が存在すれば、その終点芽も $\mathfrak f_1$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\alpha$ に沿う有限鎖

$$
0=t_0<\cdots<t_N=1,
\qquad(D_j,f_j)
$$

を固定する。各コンパクト集合 $\alpha([t_{j-1},t_j])$ は開円板 $D_j$ に含まれるので

$$
\delta_j=
\operatorname{dist}(\alpha([t_{j-1},t_j]),\mathbb C\setminus D_j)>0.
$$

有限個だから

$$
0<\varepsilon<\frac12\min_j\delta_j
$$

を取れる。$\sup_t|\alpha(t)-\beta(t)|<\varepsilon$ なら各部分弧 $\beta([t_{j-1},t_j])$ も $D_j$ に入る。従って同じ局所関数列 $f_1,\dots,f_N$ がそのまま $\beta$ に沿う解析接続となり、終点芽は $\mathfrak f_1$ である。別の解析接続を選んでも [固定経路での一意性](#thm-ca5-continuation-uniqueness) により同じ終点芽を与える。$\square$
<!-- proof-end -->

---

## 6. monodromy theorem

<a id="thm-ca5-monodromy"></a>
<!-- formal-statement-start -->
### 定理（monodromy theorem）

$\Omega$ を単連結領域、$z_0\in\Omega$ とし、$\mathfrak f_0$ を $z_0$ での正則関数の芽とする。$\mathfrak f_0$ が $z_0$ から始まる $\Omega$ 内の任意の経路に沿って解析接続できると仮定する。

このとき終点で得られる芽は経路に依存しない。従って $\Omega$ 上に一意な正則関数 $F$ が存在し、その $z_0$ での芽は $\mathfrak f_0$ であり、各経路に沿う解析接続で得られる芽は $[F]_z$ である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 1. 端点固定ホモトピー内で終点芽は一定

同じ始点 $z_0$ と終点 $z_1$ を持つ二経路 $\gamma_0,\gamma_1$ が端点固定ホモトピー

$$
H:[0,1]^2\to\Omega
$$

で結ばれているとする。$\gamma_s(t)=H(s,t)$ と置き、その終点芽を $T(s)$ と書く。

固定した $s$ に [経路安定性](#lem-ca5-path-stability) を適用して許容誤差 $\varepsilon_s>0$ を取る。$H$ はコンパクトな正方形上で一様連続なので、ある $\eta_s>0$ があり

$$
|r-s|<\eta_s
\Longrightarrow
\sup_t|H(r,t)-H(s,t)|<\varepsilon_s.
$$

従って $|r-s|<\eta_s$ なら $T(r)=T(s)$。つまり $T$ は局所定数である。

ここで「区間は連結だから一定」とだけ済ませず有限伝播を書く。区間

$$
I_s=(s-\eta_s/2,s+\eta_s/2)\cap[0,1]
$$

は $[0,1]$ を覆う。コンパクト性から有限部分被覆とその Lebesgue 数 $\lambda>0$ を取り、各幅が $\lambda$ 未満の有限分割

$$
0=s_0<s_1<\cdots<s_M=1
$$

を取る。各 $[s_{j-1},s_j]$ は一つの $I_s$ に含まれるので

$$
T(s_{j-1})=T(s_j).
$$

有限回つなげて $T(0)=T(1)$ を得る。

#### 2. 単連結性を使う場所

[CA2 の単連結性](../CA2/index.md#def-ca2-simply-connected) により、同じ始点・終点を持つ二経路 $\alpha,\beta$ は端点を固定してホモトピックである。その機構は、閉曲線 $\alpha*\beta^{-}$ を定値曲線へ縮め、必要なら縮約中の基点が描く道を往復する「ひげ」を付けて基点固定の縮約へ直し、それを $\alpha$ から $\beta$ への端点固定ホモトピーへ読み替えることである。従って1の結論が任意の二経路に適用でき、終点芽は経路に依存しない。

#### 3. 芽を一つの正則関数へ貼り合わせる

各 $z\in\Omega$ で一意に定まる終点芽を $\mathfrak f_z$ とし、その値を

$$
F(z)=\mathfrak f_z(z)
$$

とする。$z$ へのある経路に沿う解析接続の最後の代表を $g$、その定義円板を $D$ とする。$D$ を少し縮めれば、近い $w\in D$ へ $z$ から短い線分を付け足せる。その経路では最後の局所代表として同じ $g$ が使える。経路独立性から

$$
F(w)=g(w)
$$

であり、$F$ は $z$ の近傍で正則関数 $g$ と一致する。従って $F$ は $\Omega$ 上正則である。

別の大域正則関数が同じ初期芽を持てば $z_0$ の近傍で $F$ と一致し、[恒等定理](../CA3/index.md#thm-ca3-isolated-zeros-identity) により連結な $\Omega$ 全体で一致する。$\square$
<!-- proof-end -->

monodromy の「単連結だから一価」の中身は、**一本の経路の有限局所鎖 → 近い経路への安定性 → ホモトピー区間の有限分割 → 隣接経路間の一致の有限伝播** である。

### 例：$\mathbb C\setminus\{0\}$ で対数が一周するとずれる

$z=1$ の近傍で $L(1)=0$ となる局所対数を、単位円

$$
\gamma(t)=e^{2\pi it},\qquad0\le t\le1
$$

に沿って解析接続する。各局所対数は $L'(z)=1/z$ を満たすので、経路上の連続した値 $\ell(t)$ は

$$
\ell'(t)=\frac{\gamma'(t)}{\gamma(t)}=2\pi i.
$$

従って

$$
\ell(t)=2\pi it,
\qquad
\ell(1)=2\pi i.
$$

終点は再び1だが芽は $2\pi i$ ずれる。$\mathbb C\setminus\{0\}$ は単連結でなく、$\operatorname{Ind}(\gamma,0)=1$ がその障害を検出する。

---

## 7. 演習

### Level A

<a id="ex-ca5-a01"></a>
#### CA5-A01 複数周回の winding number
- Level: A

$$
\gamma(t)=2e^{-3it},\qquad0\le t\le2\pi
$$

とする。$\operatorname{Ind}(\gamma,0)$ を積分から求め、$|a|>2$ なら $\operatorname{Ind}(\gamma,a)=0$ である理由も述べよ。

<!-- solution-start -->
**解答**：$\gamma'(t)/\gamma(t)=-3i$ なので

$$
\operatorname{Ind}(\gamma,0)
=\frac1{2\pi i}\int_0^{2\pi}(-3i)dt
=\boxed{-3}.
$$

時計回りに3周するため負になる。$|a|>2$ は補集合の非有界成分にあるので、整数値性・局所定数性から index は0である。
<!-- solution-end -->

<a id="ex-ca5-a02"></a>
#### CA5-A02 index の局所不変性を評価で確認する
- Level: A

$L=L(\gamma)$、$a_0\notin\gamma$、$d=\operatorname{dist}(a_0,\gamma)$ とする。$|a-a_0|<d/2$ のとき

$$
\left|\operatorname{Ind}(\gamma,a)-\operatorname{Ind}(\gamma,a_0)\right|
\le\frac{L|a-a_0|}{\pi d^2}
$$

を示し、右辺が1未満なら二つの index が等しいことを示せ。

<!-- solution-start -->
**解答**：曲線上で $|z-a_0|\ge d$、$|z-a|\ge d/2$ だから

$$
\left|\frac1{z-a}-\frac1{z-a_0}\right|
\le\frac{2|a-a_0|}{d^2}.
$$

ML評価を $1/(2\pi)$ 倍すれば所望の不等式を得る。両 index の差は整数なので、その絶対値が1未満なら0である。
<!-- solution-end -->

<a id="ex-ca5-a03"></a>
#### CA5-A03 index 付き留数計算
- Level: A

$\operatorname{Ind}(\gamma,-1)=2$、$\operatorname{Ind}(\gamma,1)=-1$ とし

$$
f(z)=\frac3{z+1}+\frac5{z-1}
$$

とする。$\int_\gamma f(z)dz$ を求めよ。

<!-- solution-start -->
**解答**：留数は3と5なので一般留数定理から

$$
\int_\gamma fdz
=2\pi i(2\cdot3-1\cdot5)
=\boxed{2\pi i}.
$$

各極を「内側か外側か」で二値化せず、向き付き周回数を係数として使う。
<!-- solution-end -->

<a id="ex-ca5-a04"></a>
#### CA5-A04 重なりから解析接続の一致を伝える
- Level: A

円板 $D_1,D_2,D_3$ が順に重なり、$f_j$ が $D_j$ 上正則とする。$f_1=f_2$ が $D_1\cap D_2$ の非空開部分で、$f_2=f_3$ が $D_2\cap D_3$ の非空開部分で成り立つとき、各重なり全体で一致することを示せ。

<!-- solution-start -->
**解答**：二円板の共通部分は凸、従って連結である。$f_1-f_2$ は $D_1\cap D_2$ 上正則で非空開集合上0だから、恒等定理により共通部分全体で0。同様に $f_2=f_3$ も共通部分全体へ広がる。これが解析接続の一意性を有限個の重なりへ伝える局所機構である。
<!-- solution-end -->

### Level B

<a id="ex-ca5-b01"></a>
#### CA5-B01 winding number のホモトピー不変性
- Level: B

$a\notin H([0,1]^2)$ とし、$H(0,\cdot)=\gamma_0$、$H(1,\cdot)=\gamma_1$ が閉曲線であるとする。適切な区分的 $C^1$ 条件の下で二曲線の $a$ に関する index が等しいことを示せ。

<!-- solution-start -->
**解答**：$1/(z-a)$ はホモトピー像を含む $\mathbb C\setminus\{a\}$ 上正則である。CA2 の正則線積分のホモトピー不変性から

$$
\int_{\gamma_0}\frac{dz}{z-a}
=\int_{\gamma_1}\frac{dz}{z-a}.
$$

$2\pi i$ で割れば index が等しい。途中で $a$ を踏まないことが不可欠な仮定である。
<!-- solution-end -->

<a id="ex-ca5-b02"></a>
#### CA5-B02 一般偏角原理で符号付き零点数を数える
- Level: B

$\operatorname{Ind}(\gamma,-1)=1$、$\operatorname{Ind}(\gamma,1)=-1$ とし

$$
p(z)=(z+1)^2(z-1)^3
$$

とする。$(2\pi i)^{-1}\int_\gamma p'/p\,dz$ を求めよ。

<!-- solution-start -->
**解答**：$-1$ は位数2、$1$ は位数3の零点で極はない。従って一般偏角原理から

$$
\frac1{2\pi i}\int_\gamma\frac{p'}p dz
=2\cdot1+3\cdot(-1)
=\boxed{-1}.
$$

これは通常の非負な零点総数ではなく index で重み付けした符号付き零点数である。
<!-- solution-end -->

<a id="ex-ca5-b03"></a>
#### CA5-B03 対数の monodromy
- Level: B

$z=1$ で値0を取る局所対数を単位円に沿って反時計回りに一周して解析接続する。終点で値が $2\pi i$ 増えることを示し、monodromy theorem と矛盾しない理由を述べよ。

<!-- solution-start -->
**解答**：局所対数は $L'=1/z$。$\gamma(t)=e^{2\pi it}$ なら

$$
\ell'(t)=L'(\gamma(t))\gamma'(t)=2\pi i,
$$

従って $\ell(0)=0$ から $\ell(1)=2\pi i$。終点の点は1でも芽は異なる。$\mathbb C\setminus\{0\}$ は単連結でなく、単位円を0を避けたまま定値曲線へ縮められないため monodromy theorem の仮定を満たさない。
<!-- solution-end -->

### Level C

<a id="ex-ca5-c01"></a>
#### CA5-C01 零点を持たない正則関数の大域対数
- Level: C

$\Omega$ を単連結領域、$f$ を $\Omega$ 上の零点を持たない正則関数とする。$z_0\in\Omega$ と $e^{w_0}=f(z_0)$ を満たす $w_0$ を固定する。局所対数の芽を作り、任意の経路に沿って解析接続し、monodromy theorem から $e^{L}=f$ を満たす大域正則関数 $L$ を得よ。

<!-- solution-start -->
**解答**：

**局所存在。** $f(z_0)\ne0$ だから、十分小さい円板 $D\ni z_0$ を取り $f(D)$ が0を避ける小円板 $B$ に入るようにできる。$B$ は凸で単連結なので [CA2 の正則対数](../CA2/index.md#thm-ca2-holomorphic-log-branch) を取り、定数 $2\pi ik$ を調整して $L(z_0)=w_0$ とする。

**経路に沿う継続。** 任意の経路 $\gamma$ の像はコンパクトで、$f(\gamma)$ は0を含まない。各像点のまわりに0を避ける小円板を取り、有限部分被覆と十分細かい分割で各部分弧を一つの円板に入れる。隣接する局所対数の差 $h$ は重なり上で $e^h=1$ を満たすから $h\in2\pi i\mathbb Z$。連結な重なり上で連続な整数値は一定なので、$2\pi ik$ を調整して前の枝と一致させる。有限回繰り返せば全経路に沿って継続できる。

**大域化。** [monodromy theorem](#thm-ca5-monodromy) により単連結な $\Omega$ では終点芽が経路に依存せず、一つの正則関数 $L$ に貼り合わさる。各局所枝で $e^L=f$ だから全域で

$$
\boxed{e^{L(z)}=f(z)}.
$$

ここでは「単連結だから対数がある」と一行で呼ばず、局所枝→有限解析接続→ホモトピーによる経路独立性の三段階を確認した。
<!-- solution-end -->

---

## 8. 章末チェック

- winding number の整数値性では大域的な偏角の枝を仮定せず、$I(t)$ と $(\gamma(t)-a)e^{-I(t)}$ の定数性から整数性を得る。
- index は Cauchy 核の一様評価から連続で、整数値性により局所定数になる。
- 一般留数定理では元の曲線に有限自己交差を仮定せず、極を避ける局所円板内で先に有限多角形化してから面境界へ分解する。
- null-homologous 条件は領域外で index が0であることを保証し、非零 index の面を正則性の使える領域内へ閉じ込める。
- 一般偏角原理は CA4 の $f'/f$ の局所留数を一般留数定理へ代入して得る。
- 解析接続の一意性は有限個の重なりで恒等定理を順に適用して一致を伝播させる。
- monodromy theorem は一本の経路の有限局所鎖から経路安定性を得て、ホモトピーを有限分割し隣接経路の終点芽の一致を有限回つなぐ。
