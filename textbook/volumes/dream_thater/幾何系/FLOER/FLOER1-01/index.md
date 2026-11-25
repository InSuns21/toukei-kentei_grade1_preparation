# FLOER1-01 Lagrange横断交叉と境界値問題

<!-- definition-example-audit: strict -->

## 1. 曲線を数えるための境界

[GW1-02の擬正則方程式](../../GW/GW1-02/index.md#def-gw1-02-j-holomorphic)では境界のない曲面を主に扱った。Floer理論では、二つの部分多様体を固定して、帯状の領域から両者へ境界を送る曲線を調べる。交点が曲線の両端の候補になる。交点を離散的に扱える条件と、曲線の境界で微分を制御できる条件は別々に必要である。

本講では滑らかな実 $2n$ 次元シンプレクティック多様体 $(X,\omega)$、その上の[適合概複素構造](../../SYM/SYM8/index.md#def-sym8-almost-complex) $J$、二つの埋め込まれた境界なしの[Lagrange部分多様体](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold) $L_0,L_1$ を固定する。

各 $L_j$ は実 $n$ 次元で、接空間に制限した $\omega$ は零である。計量には次の式を使う。

$$
g(v,w)=\omega(v,Jw).
$$

これが正定値である理由は[適合性と正定値内積の同値](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)で学んだ。

交差する二直線を思い浮かべよう。方向が異なれば交点は一つだが、同じ直線なら交点は直線全体になる。この差を接空間で測る。

<a id="def-floer1-01-transverse"></a>

<!-- formal-statement-start -->
> **定義（Lagrange横断交叉）**
> 実 $2n$ 次元シンプレクティック多様体の二つのLagrange部分多様体 $L_0,L_1$ と共通点 $p$ に対し、次の条件を満たすとき $p$ で横断的に交わるという。

$$
T_pL_0+T_pL_1=T_pX.
$$

> すべての共通点でこの条件を満たすとき、両者は横断的に交わるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-01-transverse -->
**定義の確認**。標準平面 $\mathbb C$ に $\omega=dx\wedge dy$ を入れ、実軸と虚軸を取る。どちらも埋め込まれた実一次元直線であり、各接空間の二ベクトルは比例するので $\omega$ は零である。共通点は原点で、接方向はそれぞれ $(1,0),(0,1)$。任意の $(a,b)$ はその線形結合だから接空間の和は平面全体となる。
<!-- definition-example-end -->

次に境界で許す方向を調べる。複素数の実軸を虚数単位で回転すると、元の方向とは重ならない。この性質を一般化すれば、境界に沿った自由度と境界に垂直な自由度を分離できる。

<a id="def-floer1-01-totally-real"></a>

<!-- formal-statement-start -->
> **定義（完全実部分空間）**
> 実 $2n$ 次元ベクトル空間 $V$ と線形複素構造 $J$（$J^2=-I$）に対し、実部分空間 $W$ が完全実であるとは

$$
W\cap JW=\{0\}
$$

> が成立することをいう。本講で必要なのは $\dim_{\mathbb R}W=n$ の場合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-01-totally-real -->
**定義の確認**。$\mathbb C^2$ に $J=i$ を作用させ、$W=\mathbb R^2$ を取る。$W$ の元は実成分だけ、$iW$ の元は虚成分だけをもつ。両方に属する元は成分ごとに零である。また実次元は2で、$W+iW=\mathbb C^2$。一方、$W'=\mathbb C\times\{0\}$ は実次元2だが $iW'=W'$ であり完全実ではない。
<!-- definition-example-end -->

<a id="prop-floer1-01-lagrangian-real"></a>

<!-- formal-statement-start -->
> **命題（適合構造に対するLagrange境界の完全実性）**
> 実 $2n$ 次元シンプレクティックベクトル空間 $V$ に適合複素構造 $J$ を固定する。任意のLagrange部分空間 $W$ は完全実であり、$V=W\oplus JW$ が成立する。
<!-- formal-statement-end -->

[Lagrange部分空間と計量直交補](../../SYM/SYM8/index.md#prop-sym8-lagrangian-orthogonal)の関係を完全実性の言葉に直す。計量で測れば $W$ と $JW$ は直交する。したがって境界の方向を基底に選ぶと、残り半分は $J$ を作用させて作れる。

<!-- proof-start -->
### 証明

$z\in W\cap JW$ とする。ある $w\in W$ に対して $z=Jw$。Lagrange性から $\omega(w,z)=0$ であり、

$$
0=\omega(w,Jw)=g(w,w).
$$

適合性により $g$ は正定値なので $w=0$、従って $z=0$。また $J$ は逆 $-J$ を持つため $\dim JW=\dim W=n$。交わりが零であるから和の次元は $2n$、すなわち直和は $V$ 全体である。さらに $a,b\in W$ では $g(a,Jb)=\omega(a,-b)=0$ となる。
<!-- proof-end -->

適合性を外すと結論は保証されない。標準 $\mathbb R^4$ の座標を $(q_1,q_2,p_1,p_2)$ として $J$ が $q$ 平面と $p$ 平面をそれぞれ内部で90度回すとする。$J^2=-I$ だが、$q$ 平面の非零ベクトル $v$ では $\omega(v,Jv)=0$。このLagrange平面は $J$ で不変であり、完全実ではない。

<a id="prop-floer1-01-isolated"></a>

<!-- formal-statement-start -->
> **命題（横断交叉点の孤立性）**
> 実 $2n$ 次元多様体の二つの埋め込み $n$ 次元部分多様体が共通点 $p$ で横断的なら、$p$ のある近傍における共通点は $p$ だけである。
<!-- formal-statement-end -->

接空間の条件を、局所座標の方程式の可逆性に移す。これで交点を生成元候補として離散的に扱える。

<!-- proof-start -->
### 証明

$p$ を原点とする座標を選び、$L_0,L_1$ の局所パラメータ表示を $f_0(a),f_1(b)$ と書く。ここで $a,b\in\mathbb R^n$、$f_j(0)=0$。埋め込みなので微分 $df_j(0)$ は単射で、その像は各接空間である。共通点を求める方程式は $F(a,b)=f_0(a)-f_1(b)=0$ となる。

$$
dF_{(0,0)}(h,k)=df_0(0)h-df_1(0)k.
$$

横断性からこの写像は全射である。定義域と値域はともに $2n$ 次元なので可逆。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $F$ は原点の近傍で一対一となり、零点は $(0,0)$ だけである。埋め込みの局所表示は十分小さい標的近傍で部分多様体全体を表すので、そこには他の交点がない。
<!-- proof-end -->

孤立性と有限性は区別する。両者がコンパクトなら交わりはコンパクトな離散集合なので有限である。非コンパクトな場合、例えば $\mathbb R$ と $y=\sin x$ のグラフは無限個の横断交叉点をもつ。

## 2. 有限の帯と二つの境界

端に関する条件は後で学ぶ。まず $R>0$ を固定し、有限の帯 $S_R=[-R,R]\times[0,1]$ を考える。変数は $s$ が長手方向、$t$ が横方向である。標準複素座標は $s+it$。$t=0$ と $t=1$ の辺をそれぞれ別の部分多様体に送る。

<a id="def-floer1-01-strip"></a>

<!-- formal-statement-start -->
> **定義（Lagrange境界条件付きstrip）**
> $R>0$ と有限帯 $S_R=[-R,R]\times[0,1]$ を取る。適合概複素構造 $J$ を持つシンプレクティック多様体 $X$ とLagrange部分多様体 $L_0,L_1$ に対し、滑らかな写像 $u:S_R\to X$ が次の方程式と条件を満たすとき、Lagrange境界条件付きの擬正則stripという。

$$
u_s+J(u)u_t=0,\qquad
u(s,0)\in L_0,\quad u(s,1)\in L_1.
$$

> 滑らかさは境界までを含む。縦の両辺 $s=\pm R$ には本定義では追加条件を課さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-floer1-01-strip -->
**定義の確認**。$X=\mathbb C$、$J=i$、$L_0=\mathbb R$、$L_1=e^{i\theta}\mathbb R$（$0<\theta<\pi$）を取る。標準形式 $\omega=dx\wedge dy$ に対し $J=i$ は適合し、$g$ は標準内積となる。両者は埋め込まれた一次元直線で $\omega$ の制限は零。$u(s,t)=e^{\theta(s+it)}$ とすると

$$
u_s=\theta u,\qquad u_t=i\theta u,\qquad
u_s+i u_t=\theta u-\theta u=0.
$$

下辺は正の実数、上辺は $e^{i\theta}$ の正の実数倍なので両条件を満たす。有限の $R$ では滑らかである。原点の定数写像も解である。この非定数例を無限帯へ延長すると $s\to+\infty$ で発散する。端での収束とエネルギーは次講で扱う。
<!-- definition-example-end -->

[局所Cauchy–Riemann方程式](../../GW/GW1-02/index.md#prop-gw1-02-local-cr)と方程式そのものは同じである。異なるのは境界での自由度である。解 $u$ を変分するとき、水平辺の像は対応する部分多様体に留める必要がある。

<a id="prop-floer1-01-linearization"></a>

<!-- formal-statement-start -->
> **命題（stripの境界条件の線形化）**
> 滑らかな擬正則strip $u$ と標的上の捩率零接続 $\nabla$ を固定する。境界条件を保つ滑らかな変分の速度 $\xi$ は $u^*TX$ の切断であり、

$$
\xi(s,j)\in T_{u(s,j)}L_j\qquad(j=0,1)
$$

> を満たす。方程式の左辺の変分は次の実線形作用素である。

$$
D\xi=\nabla_s\xi+J(u)\nabla_t\xi+(\nabla_\xi J)u_t.
$$
<!-- formal-statement-end -->

速度が境界の接空間に入るのは、変分の境界値が部分多様体の中を動くためである。作用素の最後の項は $J$ 自身の変化から生じる。

<!-- proof-start -->
### 証明

$U(\varepsilon,s,t)$ を変分、$U(0,s,t)=u(s,t)$、$\partial_\varepsilon U|_0=\xi$ とする。固定した $s,j$ について $\varepsilon\mapsto U(\varepsilon,s,j)$ は $L_j$ 内の曲線だから、その速度は $T_{u(s,j)}L_j$ に属する。

捩率零から $\nabla_\varepsilon U_s=\nabla_s U_\varepsilon$、$\nabla_\varepsilon U_t=\nabla_t U_\varepsilon$。積の微分を使うと

$$
\nabla_\varepsilon(J(U)U_t)
=(\nabla_{U_\varepsilon}J)U_t+J(U)\nabla_t U_\varepsilon.
$$

$\varepsilon=0$ に制限して最初の項 $\nabla_s\xi$ を加えると主張の式を得る。[局所線形化の公式](../../GW/GW1-03/index.md#prop-gw1-03-local-linearization)に現れる係数 $1/2$ がないのは、ここでは方程式の左辺全体を使っているためである。
<!-- proof-end -->

定数解 $u=p\in L_0\cap L_1$ なら束は固定された $T_pX$ であり、$u_t=0$。平坦な枠で $D=\partial_s+J_p\partial_t$、境界は二つの固定Lagrange平面となる。これが解析の最小モデルである。

## 3. 反射で境界を越える

まず境界を含む半平面 $H=\{(s,t):t\ge0\}$ で、複素ベクトル値関数 $v=a+ib$（$a,b$ は実 $n$ 成分）を考える。$t=0$ では $b=0$ とする。微分作用素 $P=\partial_s+i\partial_t$ を使い、$L^2$ ノルムは面積 $ds\,dt$ と標準Euclidノルムで測る。$H^1$ ノルムの二乗は関数と一階弱微分の二乗ノルムの和とする。[多様体Sobolev空間](../../GA/GA2/index.md#def-ga2-sobolev)の平坦な場合である。

<a id="thm-floer1-01-reflection"></a>

<!-- formal-statement-start -->
> **定理（平坦実境界での反射と一階評価）**
> 境界を含む半平面 $H=\{t\ge0\}$ と作用素 $P=\partial_s+i\partial_t$ を取る。境界まで滑らかなコンパクト台関数 $v:H\to\mathbb C^n$ が $v(s,0)\in\mathbb R^n$ を満たすとする。反対側の半平面へ $V(s,t)=\overline{v(s,-t)}$ と反射し、$t\ge0$ では $V=v$ とする。この関数は全平面の $H^1$ に属し、次が成立する。

$$
\|\partial_sv\|_2^2+\|\partial_tv\|_2^2
=\|Pv\|_2^2.
$$
<!-- formal-statement-end -->

反射の要点は境界値が一致することである。導関数が境界で古典的に連続であるとは仮定しない。弱微分であれば、値の跳びがないため一階微分に境界デルタ項が生じない。

<!-- proof-start -->
### 証明

$t=0$ で $v=\bar v$ なので両側の値は一致する。コンパクト台の試験関数を用い、二つの半平面で部分積分すると、$t$ 微分の境界項は上側で $-v(s,0)$、下側で $+\overline{v(s,0)}$ を係数にもつため相殺する。$s$ 微分には水平境界の項がない。従って $V$ の弱微分は各半平面での古典微分を貼ったものになる。これらと $V$ は二乗可積分なので $V\in H^1$。

$t<0$ では

$$
V_s=\overline{v_s(s,-t)},\qquad
V_t=-\overline{v_t(s,-t)}.
$$

従って

$$
PV(s,t)=\overline{v_s(s,-t)+iv_t(s,-t)}.
$$

全平面での三つの二乗ノルムはそれぞれ半平面での値の2倍である。

全平面の滑らかなコンパクト台関数 $w=a+ib$ に対して直接展開すると

$$
Pw=(a_s-b_t)+i(b_s+a_t).
$$

$$
|Pw|^2-|w_s|^2-|w_t|^2
=2(b_s\cdot a_t-a_s\cdot b_t).
$$

右辺の括弧は $\partial_s(b\cdot a_t)-\partial_t(b\cdot a_s)$ に等しい。全平面で積分すれば台の外で零なので積分は零。$V$ 自身は滑らかとは限らないが、滑らかなコンパクト台の近似を $H^1$ で取れる（[Sobolev空間の完備性と滑らかな関数の密度](../../GA/GA2/index.md#thm-ga2-complete-density)の局所平坦な場合）。両辺は一階微分の $L^2$ ノルムなので極限で等式を保つ。全平面の等式を2で割ると主張を得る。
<!-- proof-end -->

実境界条件を外した場合、例えば $v(s,0)=i\chi(s)$（$\chi$ は非零の実滑らかなコンパクト台関数）なら反射下側の値は $-i\chi(s)$ である。跳びが $2i\chi$ あるので弱 $t$ 微分に境界デルタ項が生じ、反射は一般に $H^1$ に入らない。

境界が $t=1$ の場合は座標を $t-1$ に平行移動し、上側へ反射する。積分領域の上下が交換されるだけで同じノルム等式が成立する。

## 4. 曲がった境界条件を平坦な枠へ移す

有限帯で $E=u^*TX$ を考える。境界の各点では $T_{u(s,j)}L_j$ が $E$ の半次元の完全実部分空間である。これを実軸へ移せば前節の評価を使える。ただし枠が場所ごとに変化すれば、その微分が作用素の係数に残る。

ここで必要なのは $H^1$ から $L^2$ への一階評価である。ノルムは固定された滑らかな束計量と接続で測り、縦の辺から離れた台を持つ切断を扱う。この制限により縦辺・角で別の境界条件を導入せずに済む。

<a id="thm-floer1-01-estimate"></a>

<!-- formal-statement-start -->
> **定理（有限stripの境界付き一階楕円型評価）**
> $R>0$、滑らかな擬正則strip $u:S_R\to X$、適合概複素構造 $J$、滑らかな捩率零接続を固定し、$D$ を前節の線形化とする。滑らかな切断 $\xi$ が下辺・上辺で対応するLagrange接空間に値を取り、縦辺の近傍で零であるとする。$u,J,R$ と選択したノルムに依存する定数 $C$ が存在して

$$
\|\xi\|_{H^1(S_R,E)}
\le C\bigl(\|D\xi\|_{L^2(S_R,E)}+\|\xi\|_{L^2(S_R,E)}\bigr).
$$

> 同じ評価はこれらの滑らかな切断の $H^1$ 閉包にも成立する。
<!-- formal-statement-end -->

証明の見取り図：境界に沿って実の基底を選び、$J$ で回転させて全体の枠を作る。係数関数をその枠で表すと主部は $P$ になり、枠の変化は零階項になる。最後に分割一で局所評価を足し合わせる。

<!-- proof-start -->
### 証明

**境界に沿う枠。** 境界点の小区間で接空間の滑らかな実基底 $e_1,\ldots,e_n$ を選ぶ。[Lagrange境界の完全実性](#prop-floer1-01-lagrangian-real)により $e_k,Je_k$ の計 $2n$ 本は実基底となる。局所束表示で各 $e_k$ の成分を境界から $t$ 方向へ滑らかに延長し、$Je_k$ は各点で $J(u)$ を作用させて作る。境界では基底の行列式が非零だから、近傍を縮めれば内部でも非零のままである。内部点では任意の複素基底を局所的に選んで同じ方法を使う。

枠を実線形同型 $T(s,t):\mathbb C^n\to E_{(s,t)}$ と書く。係数 $a+ib$ を $\sum_k(a_ke_k+b_kJe_k)$ に写すので

$$
J(u)T=Ti.
$$

境界では $Tv\in TL_j$ と $v\in\mathbb R^n$ は同値である。ここで基底の独立性により虚部が零でなければ $TL_j$ に入らないことも分かる。

**枠の微分。** 一つの近傍で $\xi=Tv$ と書く。積の微分から

$$
\nabla_s(Tv)=T v_s+(\nabla_sT)v,\qquad
\nabla_t(Tv)=T v_t+(\nabla_tT)v.
$$

$Qv=(\nabla_{Tv}J)u_t$ とおけば $Q$ は $v$ に実線形で、微分を含まない。従って

$$
T^{-1}D(Tv)=Pv+Bv,
$$

$$
Bv=T^{-1}\bigl((\nabla_sT)v+
J(\nabla_tT)v+Qv\bigr).
$$

小近傍のコンパクトな閉包では $B$ の作用素ノルムは有界である。$T,T^{-1}$ とその一階微分も有界であるから、係数の $H^1,L^2$ ノルムと束のノルムは定数倍で相互に評価できる。例えば $\nabla_s(Tv)=Tv_s+(\nabla_sT)v$ から一方向の評価が出て、$v=T^{-1}\xi$ に積の微分を使えば逆方向も出る。

**局所化。** 台が一つの近傍に含まれる切断を取る。境界の近傍なら係数 $v$ を対応する半平面へ、内部なら全平面へ、近傍の外で零として延長する。近傍の人工的な端に台が届かないため、この延長に跳びはない。縦辺の近くでも元の切断が零である。境界近傍では[平坦実境界での反射と一階評価](#thm-floer1-01-reflection)、内部ではその証明中の全平面等式により

$$
\|\nabla v\|_2=\|Pv\|_2
\le\|T^{-1}D(Tv)\|_2+\|Bv\|_2.
$$

よってある定数 $C_1$ について

$$
\|Tv\|_{H^1}\le
C_1(\|D(Tv)\|_2+\|Tv\|_2).
$$

**貼り合わせ。** コンパクトな有限帯を有限個のこうした近傍で覆い、実数値の滑らかな[1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity) $\rho_k$ を取る（開近傍を平面にも延ばしてから制限する）。各近傍は相対的な開集合とし、縦辺・角を含む場合も切断は縦辺近傍で零である。$\rho_k\xi$ は境界条件を保つ。

$$
D(\rho_k\xi)=\rho_k D\xi+
((\partial_s\rho_k)I+(\partial_t\rho_k)J)\xi.
$$

分割関数の微分は有界である。$\xi=\sum_k\rho_k\xi$ を $H^1$ の三角不等式に入れ、各局所評価の右辺を足すと、有限個の定数をまとめた $C$ による主張の評価を得る。

最後に滑らかな許容切断の列 $\xi_m$ が $H^1$ で $\xi$ に収束するなら、滑らかな係数の有界性から $D\xi_m\to D\xi$ が $L^2$ で成立する。両辺のノルムは連続だから評価は閉包にも延長される。境界値はこの閉包の中で[トレース](../../GA/GA2/index.md#prop-ga2-boundary-trace)として理解できる（ここでは水平辺の局所近傍で適用する）。
<!-- proof-end -->

$L^2$ 項を残したことには意味がある。局所枠の零階項や分割関数の微分を制御するためである。また $C$ は有限帯と固定した解に依存し、$R\to\infty$ に対して一様とはまだ言えない。無限帯では端での減衰やスペクトルの制御が必要となる。次講からそれを調べる。

## 5. 演習

### Level A

<a id="ex-floer1-01-a01"></a>
#### FLOER1-01-A01 二直線の交叉
- Level: A

$\mathbb C$ で $L_0=\mathbb R$、$L_1=(1+2i)\mathbb R$ とする。両者のLagrange性、共通点、横断性を確かめよ。

<!-- solution-start -->
**詳細解答**。両直線は一次元で、各接ベクトルは同じ方向の実数倍なので $\omega=dx\wedge dy$ は接空間上で零。従ってLagrangeである。共通点を $a=b(1+2i)$ と置くと虚部から $2b=0$、実部から $a=0$。接方向の列行列は

$$
\begin{pmatrix}1&1\\0&2\end{pmatrix}.
$$

行列式は2で、二列は平面の基底となる。[Lagrange横断交叉](#def-floer1-01-transverse)の条件を満たす。
<!-- solution-end -->

<a id="ex-floer1-01-a02"></a>
#### FLOER1-01-A02 完全実性の判定
- Level: A

$\mathbb C^2$ において $W=\{(a,ib):a,b\in\mathbb R\}$ が完全実であることと実次元を示せ。

<!-- solution-start -->
**詳細解答**。$W$ の実基底は $(1,0),(0,i)$ なので次元2。$iW=\{(ic,-d):c,d\in\mathbb R\}$。交わりの元は $a=ic$、$ib=-d$ を満たす。実部と虚部を比較して $a=c=b=d=0$。ゆえに[完全実部分空間](#def-floer1-01-totally-real)である。
<!-- solution-end -->

<a id="ex-floer1-01-a03"></a>
#### FLOER1-01-A03 非定数strip
- Level: A

$L_0=\mathbb R,L_1=i\mathbb R,J=i$ とし、$u(s,t)=e^{\pi(s+it)/2}$ が有限帯で擬正則stripになることを確かめよ。

<!-- solution-start -->
**詳細解答**。二直線は一次元で $\omega$ の制限が零。$u_s=(\pi/2)u$、$u_t=(i\pi/2)u$ だから $u_s+iu_t=0$。$u(s,0)=e^{\pi s/2}$ は実数、$u(s,1)=ie^{\pi s/2}$ は純虚数。有限帯上滑らかであり、[stripの定義](#def-floer1-01-strip)の各条件を満たす。
<!-- solution-end -->

<a id="ex-floer1-01-a04"></a>
#### FLOER1-01-A04 反射の符号
- Level: A

境界を含む半平面で $v=a+ib$、$a,b$ は滑らかな実関数、$b(s,0)=0$ とする。反射 $V(s,t)=\overline{v(s,-t)}$ の $PV$ を $t<0$ で計算せよ。

<!-- solution-start -->
**詳細解答**。連鎖律から $V_s=a_s(s,-t)-ib_s(s,-t)$、$V_t=-a_t(s,-t)+ib_t(s,-t)$。従って

$$
PV=(a_s-b_t)-i(b_s+a_t)
$$

（右辺は $(s,-t)$ で評価）。これは $\overline{Pv(s,-t)}$ である。値の一致には $b(s,0)=0$ が使われる。
<!-- solution-end -->

### Level B

<a id="ex-floer1-01-b01"></a>
#### FLOER1-01-B01 グラフの孤立交点
- Level: B

標準 $\mathbb C^2=\mathbb R^2_q\times\mathbb R^2_p$ において $L_0=\{p=0\}$、$L_1=\{p=Aq\}$、$A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ とする。Lagrange性と横断性を確かめ、$A$ を $\operatorname{diag}(1,0)$ に替えた場合の交わりを求めよ。

<!-- solution-start -->
**詳細解答**。両者は $q$ をパラメータとする埋め込まれた実二次元平面。$L_0$ の接ベクトルは $(h,0)$ で $\omega$ は零。$L_1$ の接ベクトル $(h,Ah),(k,Ak)$ では

$$
\omega((h,Ah),(k,Ak))=h^{\mathsf T}Ak-(Ah)^{\mathsf T}k
=h^{\mathsf T}(A-A^{\mathsf T})k=0.
$$

よってLagrange。共通点は $Aq=0$。$\det A=6-1=5$ なので $q=0$。任意の $(x,y)$ に対して $k=A^{-1}y$、$h=x-k$ と置くと $(x,y)=(h,0)+(k,Ak)$ となるので横断的である。新しい対角行列でも対称性は保たれるが、$Aq=0$ は $q_1=0$ のみを要求する。共通点は $(0,q_2,0,0)$ 全体となり、和の $p_2$ 成分は常に零なので横断性は失われる。
<!-- solution-end -->

<a id="ex-floer1-01-b02"></a>
#### FLOER1-01-B02 動く実直線と零階項
- Level: B

$P=\partial_s+i\partial_t$、$T(s,t)v=e^{i\phi(s,t)}v$ とし、$\phi$ は実滑らかな関数とする。境界で $\xi=Tv$ が $e^{i\phi(s,0)}\mathbb R$ に入る条件と、$T^{-1}P(Tv)$ の式を導け。

<!-- solution-start -->
**詳細解答**。境界で $\xi=e^{i\phi(s,0)}r$、$r\in\mathbb R$ と書けることは $v=r$ と同値である。微分すると

$$
\partial_s(Tv)=T(v_s+i\phi_sv),\qquad
\partial_t(Tv)=T(v_t+i\phi_tv).
$$

二式を $P$ の定義へ代入すると

$$
T^{-1}P(Tv)=Pv+(i\phi_s-\phi_t)v.
$$

従って枠の変化は零階項になる。$\phi=s+2t$ なら係数は $i-2$ で、その絶対値は $\sqrt5$。平坦な半平面で滑らかなコンパクト台かつ実境界を満たす $v$ なら[反射による一階評価](#thm-floer1-01-reflection)により

$$
\|\nabla v\|_2\le\|T^{-1}P(Tv)\|_2+\sqrt5\|v\|_2.
$$

$\phi$ が定数の場合だけこの例の補正項は零となる。
<!-- solution-end -->

<a id="ex-floer1-01-b03"></a>
#### FLOER1-01-B03 境界を失った反射
- Level: B

非零の実滑らかなコンパクト台関数 $\chi(s)$ と、$t\ge0$ で滑らか、コンパクト台かつ $\eta(0)=1$ の実関数 $\eta(t)$ を取り、$v(s,t)=i\chi(s)\eta(t)$ とする。共役反射した関数が $H^1(\mathbb R^2)$ に属さない理由を弱微分から説明せよ。

<!-- solution-start -->
**詳細解答**。上側の境界値は $i\chi(s)$、下側は $-i\chi(s)$。試験関数 $\psi$ に対する弱微分は $-\int V\partial_t\psi$ である。各半平面で部分積分すると古典微分の積分に

$$
\int_{\mathbb R} 2i\chi(s)\psi(s,0)\,ds
$$

が加わる。この項は $2i\chi(s)\delta_0(t)$ であって $L^2$ 関数ではない。実際、$\psi_\varepsilon(s,t)=\chi(s)\rho(t/\varepsilon)$、$\rho$ は滑らかなコンパクト台で $\rho(0)=1$ と取ると $\|\psi_\varepsilon\|_2^2=\varepsilon\|\chi\|_2^2\|\rho\|_2^2\to0$ だが境界項は $2i\|\chi\|_2^2$ のままである。もし $L^2$ 関数ならCauchy–Schwarz不等式により作用は零へ収束するはずで、矛盾する。
<!-- solution-end -->

<a id="ex-floer1-01-b04"></a>
#### FLOER1-01-B04 変化する概複素構造の線形化
- Level: B

標準平面 $(q,p)$ で $J(q,p)$ を行列
$$
J(q,p)=\begin{pmatrix}0&-e^{-q}\\ e^q&0\end{pmatrix}
$$
で定める。$S_1$ 上の $u(s,t)=(\log(s+2),t)$ と、境界 $L_0=\{p=0\},L_1=\{p=1\}$ を取る。$J$ の適合性とstripの方程式を確認し、平坦接続で変分 $\xi=(h,k)$ の線形化を求めよ。

<!-- solution-start -->
**詳細解答**。$J^2=-I$。標準形式の行列を $\Omega=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とすると $\Omega J=\operatorname{diag}(e^q,e^{-q})$ は対称正定値である。[適合性と正定値内積の同値](../../SYM/SYM8/index.md#thm-sym8-compatible-metric)から $J$ は適合する。両水平直線は実一次元で形式の制限は零なのでLagrangeである。$s+2\ge1$ だから $u$ は滑らかで、境界の $p$ 座標はそれぞれ0と1。さらに
$$
u_s=((s+2)^{-1},0),\qquad u_t=(0,1).
$$
$J(u)u_t=(-(s+2)^{-1},0)$ となり $u_s+J(u)u_t=0$。変分の境界条件は $k(s,0)=k(s,1)=0$ である。[stripの境界条件の線形化](#prop-floer1-01-linearization)の最後の項は $J$ の $q$ 微分だけを使うから
$$
(\nabla_\xi J)u_t
=h\begin{pmatrix}0&e^{-q}\\ e^q&0\end{pmatrix}_{q=\log(s+2)}
\begin{pmatrix}0\\1\end{pmatrix}
=\begin{pmatrix}h/(s+2)\\0\end{pmatrix}.
$$
他の二項 $\partial_s\xi$、$J(u)\partial_t\xi$ を加えると
$$
D\xi=
\begin{pmatrix}
h_s-k_t/(s+2)+h/(s+2)\\
k_s+(s+2)h_t
\end{pmatrix}.
$$
$h/(s+2)$ は変分の微分を含まないが、$J$ が変化するため必要な項である。
<!-- solution-end -->

### Level C

<a id="ex-floer1-01-c01"></a>
#### FLOER1-01-C01 二つの固定境界を持つ帯の評価
- Level: C

$S_R$ 上の $\mathbb C$ 値滑らかな関数 $\xi$ が縦辺近傍で零、$\xi(s,0)\in\mathbb R$、$\xi(s,1)\in e^{i\theta}\mathbb R$（$0<\theta<\pi$）を満たす。$v=e^{-i\theta t}\xi$ とおき、$v$ の境界条件を調べよ。全帯で $\|\nabla v\|_2=\|Pv\|_2$ を部分積分で示し、$\xi$ の $H^1$ 評価を導け。

<!-- solution-start -->
**詳細解答**。$t=0$ では $v=\xi$、$t=1$ では $v=e^{-i\theta}\xi$ なので両辺で実数値を取る。$v=a+ib$ とおくと水平辺では $b=0$、縦辺近傍でも $v=0$ である。展開すると

$$
|Pv|^2-|\nabla v|^2
=2\{\partial_s(ba_t)-\partial_t(ba_s)\}.
$$

これを帯で積分する。最初の項は $s=\pm R$ で $b=0$、後の項は $t=0,1$ で $b=0$ だから双方零。従って $\|\nabla v\|_2=\|Pv\|_2$。

次に $\xi=e^{i\theta t}v$ から

$$
\xi_s=e^{i\theta t}v_s,\qquad
\xi_t=e^{i\theta t}(v_t+i\theta v),
$$

$$
e^{-i\theta t}P\xi=Pv-\theta v.
$$

従って $\|Pv\|_2\le\|P\xi\|_2+\theta\|v\|_2$。また $\|\xi\|_2=\|v\|_2$、勾配を二成分の関数として扱うと、位相因子を除いた勾配は $(v_s,v_t)+(0,i\theta v)$ である。各項の $L^2$ ノルムはそれぞれ $\|\nabla v\|_2$ と $\theta\|v\|_2$。よって

$$
\|\nabla\xi\|_2
=\|(v_s,v_t)+(0,i\theta v)\|_2
\le\|\nabla v\|_2+\theta\|v\|_2.
$$

合わせて

$$
\|\xi\|_{H^1}\le
\|P\xi\|_2+(1+2\theta)\|\xi\|_2.
$$

これは[有限stripの境界付き一階楕円型評価](#thm-floer1-01-estimate)の具体例である。この特別な固定係数モデルでは定数が $R$ に依存しない形で得られたが、一般の変係数や無限帯のFredholm性まで結論したわけではない。
<!-- solution-end -->

## 6. 次講への接続

横断性は交点の孤立性を、完全実性は境界での微分評価を支える。両者を分離して理解すると、次に無限帯へ進むとき必要な課題が見えてくる。次講では作用差とエネルギーの関係を導き、端で何を仮定する必要があるかを調べる。

参考文献：P. Seidel, [Fukaya Categories and Picard–Lefschetz Theory](https://ems.press/books/zlam/2/contents)；D. McDuff / D. Salamon, [J-holomorphic Curves and Symplectic Topology](https://doi.org/10.1090/coll/052)。
