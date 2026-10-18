# GR11 境界条件とGibbons–Hawking–York項

<!-- definition-example-audit: strict -->

[GR10のEinstein–Hilbert作用の変分](../GR10/index.md#thm-gr10-eh-variation)では、計量の変分を領域の内部にコンパクトな台を持つものに限れば、余分な発散項が積分から消えました。しかし、有限の時空領域を考えると、境界上の幾何を固定しつつ、境界のすぐ内側では計量を動かすことが自然です。境界で計量の値が動かなくても、その**法線方向の微分**が動かないとは限りません。

この違いを無視すると、「境界で計量を固定すればEinstein–Hilbert作用は停留条件を与える」という誤った結論になります。そこで、法線の向きを定め、境界の計量と曲がり具合を測り、境界で残る法線微分を打ち消す作用を作ります。これがGibbons–Hawking–York（GHY）項です。本章ではEinstein方程式の物質との結合を先取りせず、**どの境界条件で重力の変分原理が成立するか**を証明します。

以下、$M$ は向きと時間向きを持つ滑らかな4次元Lorentz多様体、$U\subset M$ は滑らかな境界 $\Sigma=\partial U$ を持つ領域とします。$g$ の符号は $(-,+,+,+)$、$x^0=ct$ とし、$G>0,c>0,\Lambda\in\mathbb R$ を固定します。$\Sigma$ はすべての点で**非光的**、すなわちその法線が零でない長さの二乗を持つと仮定します。$U$ と $\Sigma$ はコンパクトとし、境界に角・稜線がないものとします。複数の連結成分は許します。計量族も十分小さな変分に対してこの非光的性質を保ちます。

記号を簡潔にするため、

$$
C:=\frac{c^3}{16\pi G},\qquad
S_{\mathrm{EH}}=C\int_U(\mathcal R-2\Lambda)\sqrt{-g}\,d^4x
$$

と置きます。[GR10の体積密度](../GR10/index.md#def-gr10-lorentz-density)、[Lorentz計量のLevi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)および[GR10のPalatini恒等式](../GR10/index.md#lem-gr10-palatini)を使用します。

## 1. 境界では「どの成分を固定する」か

境界 $\Sigma$ の接ベクトルに計量を制限すると、境界上だけで測れる内積ができます。例えば時刻一定の面では空間の長さ、位置一定の壁では壁上の時間と空間の間隔を与えます。これを固定することは、4次元計量の全成分の微分まで固定することではありません。

$\Sigma$ に沿う座標 $y^a$（$a,b=1,2,3$）を取り、埋め込みを $X^\mu(y)$、接ベクトルを $e_a^\mu=\partial X^\mu/\partial y^a$ と書きます。非光的な面なら、境界に直交する単位法線 $n^\mu$ を外向きに選べます。$g(n,n)$ の符号を

$$
\varepsilon:=g_{\mu\nu}n^\mu n^\nu\in\{+1,-1\}
$$

と置きます。**時間的な境界面**の法線は空間的なので $\varepsilon=+1$、**空間的な境界面**の法線は時間的なので $\varepsilon=-1$ です。

<a id="def-gr11-boundary-geometry"></a>

<!-- formal-statement-start -->
> **定義（非光的境界の単位法線と誘導計量）**  
> 滑らかな4次元Lorentz多様体 $(M,g)$ の滑らかな非光的境界 $\Sigma=\partial U$ に対し、$n$ を外向き単位法線、$\varepsilon=g(n,n)=\pm1$ とする。境界への計量の制限を誘導計量 $\gamma$ と呼び、その成分および法線と直交する射影テンソルを

$$
\gamma_{ab}=g_{\mu\nu}e_a^\mu e_b^\nu,
\qquad
P_{\mu\nu}=g_{\mu\nu}-\varepsilon n_\mu n_\nu
$$

> と定める。$\gamma$ の行列式を $\det\gamma$ とし、境界の正の体積密度を $\sqrt{|\det\gamma|}\,d^3y$ とする。
<!-- formal-statement-end -->

なぜこの射影が元の定義と一致するのでしょうか。$g(n,e_a)=0$ なので

$$
P_{\mu\nu}e_a^\mu e_b^\nu
=g_{\mu\nu}e_a^\mu e_b^\nu
-\varepsilon(n_\mu e_a^\mu)(n_\nu e_b^\nu)
=\gamma_{ab}.
$$

また $P_{\mu\nu}n^\nu=n_\mu-\varepsilon n_\mu g(n,n)=0$ です。従って接方向だけを測り、法線方向を消します。$\Sigma$ が非光的なら接空間上の $\gamma$ は非退化であり、逆行列 $\gamma^{ab}$ を使えます。

<!-- definition-example-start: def-gr11-boundary-geometry -->
**定義の確認**：Minkowski計量 $ds^2=-(dx^0)^2+dx^2+dy^2+dz^2$ で領域 $x\le R$ の壁 $x=R$ を取ります。外向き法線は $n=\partial_x$ で $g(n,n)=1$、壁の接方向は $\partial_{x^0},\partial_y,\partial_z$ です。従って

$$
\varepsilon=+1,\qquad
(\gamma_{ab})=\operatorname{diag}(-1,1,1),\qquad
\det\gamma=-1.
$$

$\gamma$ は非退化でLorentz符号、$\sqrt{|\det\gamma|}=1$ です。$P_{xx}=g_{xx}-n_x^2=0$ で、それ以外の接方向の成分は $\gamma$ と一致します。反対に時刻一定の面 $x^0=T$ では法線が時間的で $\varepsilon=-1$、$\gamma=\operatorname{diag}(1,1,1)$ です。**同じ4次元計量でも境界の種類によって符号が反転する**ことを全条件で確認できます。
<!-- definition-example-end -->

## 2. 境界が時空の中でどう曲がるか

誘導計量だけでは境界に隣接する計量の変化を表せません。法線 $n$ を接方向に運んだときにどれだけ変わるかを測ると、ちょうど法線微分を含む量が得られます。接続には前述の[Levi-Civita接続](../../../幾何系/LORG/LORG4/index.md#thm-lorg4-lorentz-levi-civita)を使います。

<a id="def-gr11-extrinsic-curvature"></a>

<!-- formal-statement-start -->
> **定義（境界の第二基本形式と平均曲率の跡）**  
> 上の非光的境界と外向き単位法線 $n$ に対し、第二基本形式 $K_{ab}$ とその誘導計量による跡 $K$ を

$$
K_{ab}:=e_a^\mu e_b^\nu\nabla_\mu n_\nu,
\qquad
K:=\gamma^{ab}K_{ab}
$$

> と定める。ここではこの符号を固定する。$K$ は $\gamma$ の符号にかかわらず定義できるが、正定値空間における曲率の直感をそのまま適用しない。
<!-- formal-statement-end -->

法線の規格化を接方向に微分すると、$\nabla_\mu[g(n,n)]=2n^\nu\nabla_\mu n_\nu=0$ です。従って $\nabla_{e_a}n$ は接方向にあり、$K_{ab}$ は接ベクトルのみに依存します。さらに$g(n,e_b)=0$ を微分すれば

$$
0=e_a[g(n,e_b)]
=g(\nabla_{e_a}n,e_b)+g(n,\nabla_{e_a}e_b)
$$

となり、捩率零より $K_{ab}=K_{ba}$ が従います。接空間が非退化なため、接方向成分を縮約すると

$$
K=P^{\mu\nu}\nabla_\mu n_\nu
=\nabla_\mu n^\mu-\varepsilon n^\mu n^\nu\nabla_\mu n_\nu
=\nabla_\mu n^\mu.
$$

最後の項は規格化条件によって零です。これが境界の「法線の発散」という表示です。

<!-- definition-example-start: def-gr11-extrinsic-curvature -->
**定義の確認**：先ほどのMinkowskiの平面 $x=R$ では、直交座標で接続係数はすべて零、$n_\mu$ は定数です。よって $K_{ab}=0$、$K=0$ です。対照例として、$N(x)=1+\alpha x>0$ の範囲の計量

$$
ds^2=dx^2-N(x)^2(dx^0)^2+dy^2+dz^2
$$

の $x=R$ を領域 $x\le R$ の境界とします。法線は再び $n=\partial_x$、$\varepsilon=1$、誘導計量は $\gamma=\operatorname{diag}(-N(R)^2,1,1)$ です。$\Gamma^x_{00}=NN'$ なので

$$
K_{00}=\nabla_0 n_0=-\Gamma^x_{00}n_x=-NN',
\qquad K_{yy}=K_{zz}=0,
$$

したがって $\gamma^{00}=-N^{-2}$ を使って $K=N'/N$ です。法線規格化、誘導計量の非退化性、接方向の二次形式、跡の四条件を計算で確認しました。$N'=0$ なら最初の平面の値へ戻ります。
<!-- definition-example-end -->

## 3. Einstein–Hilbert作用で何が境界に残るか

[GR10の計量変分公式](../GR10/index.md#thm-gr10-eh-variation)では、逆計量変分 $h^{\mu\nu}=\delta g^{\mu\nu}$ とその跡 $h=g_{\mu\nu}h^{\mu\nu}$ を用いて

$$
V^\rho=\nabla^\rho h-\nabla_\mu h^{\rho\mu},
\qquad
\delta S_{\mathrm{EH}}
=C\int_U\sqrt{-g}(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}\,d^4x
+C\int_U\sqrt{-g}\,\nabla_\rho V^\rho\,d^4x
$$

と表されました。非光的な境界では、発散の積分を境界に移す際に $\varepsilon$ が入ります。

<a id="prop-gr11-boundary-flux"></a>

<!-- formal-statement-start -->
> **命題（Einstein–Hilbert変分の境界流束）**  
> 滑らかで角のないコンパクトな非光的境界 $\Sigma=\partial U$ のもとで、上記の滑らかな変分の一次変化は

$$
\delta S_{\mathrm{EH}}
=C\int_U\sqrt{-g}(G_{\mu\nu}+\Lambda g_{\mu\nu})h^{\mu\nu}\,d^4x
+C\int_\Sigma\varepsilon\sqrt{|\gamma|}\,n_\rho V^\rho\,d^3y
$$

> を満たす。ここで $\sqrt{|\gamma|}:=\sqrt{|\det\gamma|}$、$n$ は外向き法線とする。
<!-- formal-statement-end -->

### 証明の見取り図

境界近傍で法線に沿う座標を取ります。非光的なので、[測地線の局所存在](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-lorentz-exponential)を使って、境界から単位法線の方向に伸びる曲線を局所的に構成できます。そこで体積密度の発散を通常の微分に直すと境界流束が現れます。

<!-- proof-start -->
### 証明

境界の小領域で、境界を $r=0$、領域を $r\le0$、外向き法線を $n=\partial_r$ とするGaussian法線座標を取ります。この座標では

$$
ds^2=\varepsilon\,dr^2+\gamma_{ab}(r,y)\,dy^a dy^b,
\qquad
\sqrt{-g}=\sqrt{|\gamma|},
\qquad n_r=\varepsilon.
$$

[GR10の発散の座標式](../GR10/index.md#thm-gr10-eh-variation)を使うと

$$
\sqrt{-g}\,\nabla_\rho V^\rho
=\partial_r(\sqrt{|\gamma|}V^r)
+\partial_a(\sqrt{|\gamma|}V^a).
$$

境界の小領域内で台を持つ分割で局所化すれば、接方向の全微分は隣の領域と打ち消し合い、外向き方向の積分は $\sqrt{|\gamma|}V^r$ です。一方

$$
\varepsilon n_\rho V^\rho
=\varepsilon(\varepsilon V^r)=V^r.
$$

従って各境界領域で主張の流束が得られ、分割を足し合わせて全境界の式になります。内部の項は[Einstein–Hilbert作用の計量変分](../GR10/index.md#thm-gr10-eh-variation)のままです。$\square$
<!-- proof-end -->

**計量を固定しても流束が残る例。** $U=[0,T]\times\mathbb T^3$ に平坦計量 $ds^2=-(dx^0)^2+\sum_i(dx^i)^2$ を置きます。$\mathbb T^3$ は周期座標を持つ平坦な空間3トーラスで、時刻 $0,T$ の二つの面だけが境界です。$a_s(x^0)=1+s f(x^0)$ として

$$
g_s=-(dx^0)^2+a_s(x^0)^2\sum_{i=1}^3(dx^i)^2,
\qquad f(0)=f(T)=0
$$

とすると、境界の誘導計量は $s$ に依存しません。しかし $s=0$ で

$$
h^{ij}=-2f\,\delta^{ij},
\quad h=-6f,
\quad V^0=-\partial_0h=6f',
\quad V^i=0.
$$

二つの境界では $\varepsilon=-1$。未来側で $n=+\partial_0$、過去側で $n=-\partial_0$ だから、

$$
\delta S_{\mathrm{EH}}\big|_{\partial U}
=6C\,\operatorname{Vol}(\mathbb T^3)
\bigl(f'(T)-f'(0)\bigr).
$$

$f(x^0)=x^0(T-x^0)$ を選べば $f'(T)-f'(0)=-2T\ne0$。固定した誘導計量と、固定していない法線微分との違いが積分値に現れました。

## 4. GHY項は何を打ち消すか

GHY項は、境界の第二基本形式の跡を積分する項です。なぜ $K$ かといえば、法線座標では $K$ が誘導計量の一階法線微分になるからです。Einstein–Hilbert作用の境界流束にも同じ微分が含まれます。

<a id="def-gr11-ghy-action"></a>

<!-- formal-statement-start -->
> **定義（Gibbons–Hawking–York境界作用）**  
> 境界が滑らかで非光的、外向き法線 $n$、$\varepsilon=g(n,n)$、誘導計量 $\gamma$、第二基本形式の跡 $K$ が上記の符号規約で与えられているとき、GHY作用と全重力作用を

$$
\boxed{
S_{\mathrm{GHY}}[g;U]
=2C\int_\Sigma\varepsilon K\sqrt{|\gamma|}\,d^3y,
\qquad
S_{\mathrm{grav}}:=S_{\mathrm{EH}}+S_{\mathrm{GHY}}
}
$$

> と定める。$C=c^3/(16\pi G)$ とする。非光的境界を持たない場合や角を持つ境界には、この式を無条件に適用しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr11-ghy-action -->
**定義の確認**：$U=[0,T]\times\mathbb T^3$ にMinkowski計量を置くと、二つの境界面は空間的で $\varepsilon=-1$、体積密度は $1$、法線は $\pm\partial_0$ です。接続係数が零、法線が定数なので、両面とも $K=0$。よって $S_{\mathrm{GHY}}=0$ です。$\Lambda=0$ なら曲率も零で、$S_{\mathrm{grav}}=0$ です。この値の検査だけでは停留性は分からないので、次に先ほどの変分を実際に代入します。
<!-- definition-example-end -->

<a id="thm-gr11-dirichlet-variation"></a>

<!-- formal-statement-start -->
> **定理（GHY項を加えたDirichlet型計量変分）**  
> $U$ を滑らかなコンパクト4次元Lorentz領域とし、$\Sigma=\partial U$ は角のない非光的境界、$n$ は外向き単位法線とする。滑らかな計量族の各元で $\Sigma$ が非光的であるとき、$q_{ab}:=\delta\gamma_{ab}$ と書けば、

$$
\boxed{
\begin{aligned}
\delta S_{\mathrm{grav}}
={}&C\int_U\sqrt{-g}(G_{\mu\nu}+\Lambda g_{\mu\nu})
\,\delta g^{\mu\nu}\,d^4x\\
&+C\int_\Sigma\varepsilon\sqrt{|\gamma|}
(K\gamma^{ab}-K^{ab})\,q_{ab}\,d^3y
\end{aligned}
}
$$

> が成り立つ。特に誘導計量を固定するDirichlet条件 $q_{ab}=0$ のもとでは、境界に微分を含む変分が残らず、内部の停留条件だけが残る。これは光的境界・角を持つ境界・追加の物質境界作用を含まない主張である。
<!-- formal-statement-end -->

### 証明の見取り図

境界を $r=0$ とするGaussian法線座標では $K_{ab}=\frac12\partial_r\gamma_{ab}$ です。$\delta\gamma_{ab}=q_{ab}$ を代入し、$\delta K$ に含まれる $\partial_rq$ が[境界流束](#prop-gr11-boundary-flux)の $-\partial_rq$ と逆符号になることを明示します。最終的に誘導計量の値の変分だけが残ります。

<!-- proof-start -->
### 証明

非光的境界では各計量に対し、境界の法線測地線によるGaussian座標を局所的に取れます。[Lorentz指数写像の局所可逆性](../../../幾何系/LORG/LORG4/index.md#prop-lorg4-lorentz-exponential)を用い、各計量の座標を境界上で恒等写像となる微分同相で同定します。作用および境界の誘導計量はその境界固定の座標変更で不変なので、計量族を

$$
g_s=\varepsilon dr^2+\gamma_{ab}(s,r,y)\,dy^a dy^b
$$

として一次変分を計算してよいのです。$\varepsilon$ は変分の近傍で一定であり、$q_{ab}=\delta\gamma_{ab}$ と置きます。

まず $\Gamma^r_{ab}=-\frac{\varepsilon}{2}\partial_r\gamma_{ab}$、$n_r=\varepsilon$ なので

$$
K_{ab}=\nabla_a n_b
=-\Gamma^r_{ab}n_r
=\frac12\partial_r\gamma_{ab},
\qquad K=\frac12\gamma^{ab}\partial_r\gamma_{ab}.
$$

逆計量変分は $h^{ab}=-\gamma^{ac}\gamma^{bd}q_{cd}$、$h^{r\mu}=0$ です。$q:=\gamma^{ab}q_{ab}$ と置くと $h=-q$ です。法線微分の流束には、$h^{r\mu}=0$ だから共変微分まで零だと早合点してはいけません。実際、

$$
\begin{aligned}
\nabla_\mu h^{r\mu}
&=\partial_\mu h^{r\mu}
+\Gamma^r_{\mu\nu}h^{\nu\mu}
+\Gamma^\mu_{\mu\nu}h^{r\nu}\\
&=\Gamma^r_{ab}h^{ab}
=(-\varepsilon K_{ab})(-q^{ab})
=\varepsilon K_{ab}q^{ab},\\
\nabla^r h&=\varepsilon\partial_r(-q)
=-\varepsilon\partial_rq.
\end{aligned}
$$

よって $\varepsilon n_\rho V^\rho=V^r$ であることに注意すれば、[Einstein–Hilbert作用の境界流束](#prop-gr11-boundary-flux)は

$$
\varepsilon n_\rho V^\rho
=-\varepsilon\bigl(\partial_rq+K^{ab}q_{ab}\bigr)
$$

となります。次に、$\partial_r\gamma^{ab}=-2K^{ab}$ と[計量と逆計量の変分](../GR10/index.md#prop-gr10-inverse-identity)を使い、

$$
\begin{aligned}
\delta K
&=\frac12\delta\gamma^{ab}\partial_r\gamma_{ab}
+\frac12\gamma^{ab}\partial_rq_{ab}\\
&=-K^{ab}q_{ab}
+\frac12\gamma^{ab}\partial_rq_{ab}\\
&=\frac12\partial_r(\gamma^{ab}q_{ab})
=\frac12\partial_rq.
\end{aligned}
$$

また、誘導計量が空間的でも時間的でも[行列式の変分](../GR10/index.md#prop-gr10-volume-variation)と同じ計算から

$$
\delta\sqrt{|\gamma|}
=\frac12\sqrt{|\gamma|}\,\gamma^{ab}q_{ab}
=\frac12\sqrt{|\gamma|}\,q.
$$

従ってGHY作用の変分は

$$
\begin{aligned}
\delta S_{\mathrm{GHY}}
&=2C\int_\Sigma\varepsilon\,
\delta(K\sqrt{|\gamma|})\,d^3y\\
&=C\int_\Sigma\varepsilon\sqrt{|\gamma|}
(\partial_rq+Kq)\,d^3y.
\end{aligned}
$$

これとEinstein–Hilbert作用の境界流束を足すと、**$\partial_rq$ が相殺**され、

$$
\begin{aligned}
\delta S_{\mathrm{grav}}\big|_{\Sigma}
&=C\int_\Sigma\varepsilon\sqrt{|\gamma|}
\bigl(Kq-K^{ab}q_{ab}\bigr)\,d^3y\\
&=C\int_\Sigma\varepsilon\sqrt{|\gamma|}
(K\gamma^{ab}-K^{ab})q_{ab}\,d^3y.
\end{aligned}
$$

共変計量変分に対する境界係数は $(K\gamma^{ab}-K^{ab})$ であると分かります。$q_{ab}=0$ なら積分は消えます。$\square$
<!-- proof-end -->

上の計算の符号を曖昧なままにしないため、境界で動かす独立変数を揃えます。境界逆計量の変分を $u^{ab}:=\delta\gamma^{ab}=-\gamma^{ac}\gamma^{bd}q_{cd}$ とすれば、

$$
(K\gamma^{ab}-K^{ab})q_{ab}
=(K_{ab}-K\gamma_{ab})u^{ab}.
$$

**従って定理の境界項は、共変変分 $q_{ab}$ では $(K\gamma^{ab}-K^{ab})q_{ab}$、逆計量変分 $u^{ab}$ では $(K_{ab}-K\gamma_{ab})u^{ab}$ が正しい組です。** この違いを取り違えないようにします。

### 直接検算：値は固定しても法線微分は固定しない

前節の $g_s=-(dx^0)^2+a_s^2\sum_i(dx^i)^2$、$a_s=1+sf$ をもう一度使います。時刻 $T$ 側の法線は $+\partial_0$、$0$ 側では $-\partial_0$ で、両面の $\varepsilon=-1$ です。誘導計量は $a_s^2\delta_{ij}$ だから

$$
K_{ij}\big|_T=a_s a_s'\delta_{ij},\quad
K\big|_T=3\frac{a_s'}{a_s},\qquad
K\big|_0=-3\frac{a_s'}{a_s}.
$$

境界で $f=0$ なので $\delta\sqrt{|\gamma|}=0$、従って

$$
\delta S_{\mathrm{GHY}}
=-6C\,\operatorname{Vol}(\mathbb T^3)
\bigl(f'(T)-f'(0)\bigr).
$$

これは計算済みの $\delta S_{\mathrm{EH}}|_\Sigma$ と厳密に逆符号です。どちらも $f'(0),f'(T)$ を零と仮定していません。定理が「法線微分まで固定したから成功した」という循環論法ではないことが確認できます。

## 5. どこまでがこの定理の射程か

固定したのは境界の**誘導計量**です。外向き法線の選び方、$K_{ab}$ の符号規約、境界の因果型を入れ替えると中間式の符号も変わります。逆向き法線に交換すれば $K$ も逆符号となるため、元の領域の外向き法線という約束を忘れて一方だけ変えてはいけません。

光的境界では法線自身が接方向にも入るため、$\gamma$ が退化します。$\gamma^{ab}$ で跡を取る今回の構成はそのまま使えません。また境界が交わる角・稜線には接合部分の寄与があり、上のGHY積分だけで任意の変分問題が完成するとは限りません。非コンパクト領域では無限遠境界の扱いも別途必要です。これらを証明済みの定理に含めません。

誘導計量のDirichlet条件を外すと、境界に残る

$$
\varepsilon\sqrt{|\gamma|}(K\gamma^{ab}-K^{ab})
$$

に相当する量が、境界データに共役な情報を与えます。ただしここでは境界運動量の独立な理論を定義せず、まず境界項が**何を消し、何を残すか**を確定しました。GR12では物質作用を合わせて内部の場の方程式を扱います。

## 6. 演習：法線・誘導計量・法線微分を検算する

### Level A

<a id="ex-gr11-a01"></a>
#### GR11-A01 境界の因果型と法線
- Level: A

Minkowski計量 $ds^2=-(dx^0)^2+dx^2+dy^2+dz^2$ に対し、領域 $x\le R$ の境界 $x=R$ と領域 $x^0\le T$ の境界 $x^0=T$ について、外向き $n$、$\varepsilon$、誘導計量の符号数を求めよ。

<!-- solution-start -->
**詳細解答。** $x=R$ では外向き $n=\partial_x$、$g(n,n)=+1$ です。接方向の基底 $(\partial_{x^0},\partial_y,\partial_z)$ で $\gamma=\mathrm{diag}(-1,1,1)$ となり、負の固有値が1個です。$x^0=T$ では外向き $n=\partial_0$、$g(n,n)=-1$。接方向 $(\partial_x,\partial_y,\partial_z)$ で $\gamma=\mathrm{diag}(1,1,1)$ となり、すべて正です。[境界幾何の定義](#def-gr11-boundary-geometry)を各面に適用しました。
<!-- solution-end -->

<a id="ex-gr11-a02"></a>
#### GR11-A02 平坦な時刻面の第二基本形式
- Level: A

$U=[0,T]\times\mathbb T^3$ の平坦計量について、二つの時刻面の $K_{ij}$、$K$ とGHY作用を計算せよ。

<!-- solution-start -->
**詳細解答。** 過去側では $n=-\partial_0$、未来側では $n=+\partial_0$ で、どちらも $g(n,n)=-1$ です。直交座標において $\Gamma^\rho_{\mu\nu}=0$、各法線の成分は定数だから $\nabla_i n_j=0$。よって[第二基本形式](#def-gr11-extrinsic-curvature)から各面で $K_{ij}=0$、$\gamma^{ij}K_{ij}=K=0$。$\sqrt{|\gamma|}=1$ なので[GHY作用](#def-gr11-ghy-action)の二つの積分はともに零です。
<!-- solution-end -->

<a id="ex-gr11-a03"></a>
#### GR11-A03 Dirichlet条件は法線微分を殺すか
- Level: A

上の平坦な時空で $g_s=-(dx^0)^2+(1+sf(x^0))^2\sum_i(dx^i)^2$、$f(0)=f(T)=0$ とする。$q_{ij}$ と $\partial_0q_{ij}$ を $s=0$ で求め、$f(x^0)=x^0(T-x^0)$ に対して端点での値を比較せよ。

<!-- solution-start -->
**詳細解答。** 誘導計量は $\gamma_{ij}(s)=(1+sf)^2\delta_{ij}$ なので $q_{ij}=\delta\gamma_{ij}=2f\delta_{ij}$、$\partial_0q_{ij}=2f'\delta_{ij}$ です。両端で $f=0$ のため $q_{ij}=0$ ですが、$f'(0)=T$、$f'(T)=-T$ なので法線微分の大きさはそれぞれ $2T$ です。値を固定しても導関数は自由です。
<!-- solution-end -->

<a id="ex-gr11-a04"></a>
#### GR11-A04 境界密度と第二基本形式の跡
- Level: A

時間的境界の一点で $\gamma=\mathrm{diag}(-4,9,16)$、$K_{ab}=\mathrm{diag}(0,3,4)$ とする。$\sqrt{|\gamma|}$、$K$、無次元化した境界密度 $2\varepsilon K\sqrt{|\gamma|}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\det\gamma=-4\cdot9\cdot16=-576$ より $\sqrt{|\gamma|}=24$。時間的境界では $\varepsilon=+1$ です。逆行列 $\gamma^{-1}=\mathrm{diag}(-1/4,1/9,1/16)$ を用い、

$$
K=\gamma^{ab}K_{ab}
=0+\frac{3}{9}+\frac{4}{16}
=\frac13+\frac14=\frac7{12}.
$$

従って $2\varepsilon K\sqrt{|\gamma|}=2\cdot1\cdot(7/12)\cdot24=28$ です。誘導計量の行列式が負でも絶対値を付けた正の密度を使います。
<!-- solution-end -->

### Level B

<a id="ex-gr11-b01"></a>
#### GR11-B01 法線座標での跡の変分
- Level: B

$ds^2=\varepsilon dr^2+\gamma_{ab}(r,y)dy^ady^b$、$K_{ab}=\frac12\partial_r\gamma_{ab}$ とする。$\delta\gamma_{ab}=q_{ab}$ のとき、$\delta K=\frac12\partial_rq$（$q=\gamma^{ab}q_{ab}$）を逆行列の微分から示せ。

<!-- solution-start -->
**詳細解答。** $K=\frac12\gamma^{ab}\partial_r\gamma_{ab}$ を変分すると、

$$
\delta K
=\frac12(-\gamma^{ac}\gamma^{bd}q_{cd})\partial_r\gamma_{ab}
+\frac12\gamma^{ab}\partial_rq_{ab}
=-K^{cd}q_{cd}+\frac12\gamma^{ab}\partial_rq_{ab}.
$$

一方 $\partial_r\gamma^{ab}=-\gamma^{ac}\gamma^{bd}\partial_r\gamma_{cd}=-2K^{ab}$ なので

$$
\partial_rq
=(\partial_r\gamma^{ab})q_{ab}+\gamma^{ab}\partial_rq_{ab}
=-2K^{ab}q_{ab}+\gamma^{ab}\partial_rq_{ab}.
$$

従って前式は $\delta K=\frac12\partial_rq$ と一致します。[GHY変分定理](#thm-gr11-dirichlet-variation)で最も見落としやすい逆行列の符号です。
<!-- solution-end -->

<a id="ex-gr11-b02"></a>
#### GR11-B02 有限時間スラブの相殺
- Level: B

$U=[0,T]\times\mathbb T^3$ に $a_s=1+sf(x^0)$、$f(0)=f(T)=0$ とする。$\Lambda=0$ として、$\delta S_{\mathrm{EH}}$ と $\delta S_{\mathrm{GHY}}$ を独立に求め、両者が打ち消すことを示せ。

<!-- solution-start -->
**詳細解答。** $s=0$ は平坦だから内部のEinsteinテンソルは零です。計量変分は $h^{ij}=-2f\delta^{ij}$、跡 $h=-6f$、$h^{0\mu}=0$ なので、[GR10の変分公式](../GR10/index.md#thm-gr10-eh-variation)から $V^0=6f'$ です。[境界流束](#prop-gr11-boundary-flux)では未来から過去を差し引くため

$$
\delta S_{\mathrm{EH}}
=6C\,\operatorname{Vol}(\mathbb T^3)
[f'(T)-f'(0)].
$$

次に未来の外向き法線は $+\partial_0$、過去は $-\partial_0$ です。[第二基本形式](#def-gr11-extrinsic-curvature)から

$$
K_T=3a_s'/a_s,\qquad K_0=-3a_s'/a_s,\qquad
\sqrt{|\gamma|}=a_s^3.
$$

$\varepsilon=-1$ に注意して

$$
S_{\mathrm{GHY}}
=-6C\,\operatorname{Vol}(\mathbb T^3)
[a_s^2a_s']_0^T.
$$

$a_s(0)=a_s(T)=1$ なので $s=0$ での微分は $-6C\operatorname{Vol}(\mathbb T^3)[f'(T)-f'(0)]$。和は零で、法線微分 $f'$ を境界で固定していません。
<!-- solution-end -->

<a id="ex-gr11-b03"></a>
#### GR11-B03 時間的な壁の法線を反転すると
- Level: B

$ds^2=dx^2-N(x)^2(dx^0)^2+dy^2+dz^2$、$N(x)=1+\alpha x>0$ とし、$x=R$ での法線を $n=\partial_x$ と $n=-\partial_x$ の二通りで仮に計算する。$K$ と $2\varepsilon K\sqrt{|\gamma|}$ を比較し、どちらが領域 $x\le R$ のGHY積分に使えるか説明せよ。

<!-- solution-start -->
**詳細解答。** $\gamma=\mathrm{diag}(-N(R)^2,1,1)$ なので $\sqrt{|\gamma|}=N(R)$、法線はいずれも空間的で $\varepsilon=+1$ です。$n=\partial_x$ の場合 $\Gamma^x_{00}=NN'$、$K_{00}=-NN'$ で $K=(-1/N^2)(-NN')=N'/N=\alpha/N$。従って $2\varepsilon K\sqrt{|\gamma|}=2\alpha$。$n=-\partial_x$ の場合は $K_{00}=+NN'$、$K=-\alpha/N$、密度は $-2\alpha$。領域 $x\le R$ に対して外へ進むのは正の $x$ 方向だから、使用するのは $n=\partial_x$ です。法線を反転して符号を変えた式を同じ領域に無断で代入してはいけません。
<!-- solution-end -->

### Level C

<a id="ex-gr11-c01"></a>
#### GR11-C01 作用全体を境界まで積分して照合する
- Level: C

$U=[0,T]\times\mathbb T^3$、$ds^2=-(dx^0)^2+a(x^0)^2\sum_i(dx^i)^2$ とする。$a>0$ は滑らかで、$T^3$ の座標体積を $V_3$ とする。$\mathcal R=6(a''/a+(a'/a)^2)$ を与える。(i) $S_{\mathrm{EH}}+S_{\mathrm{GHY}}$ を $a,a'$ のみの積分に直せ。(ii) 任意の $\delta a$ の一次変分で境界に残る量を求め、$\delta a(0)=\delta a(T)=0$ なら消えることを示せ。(iii) なぜこの模型だけの停留性から4次元の全方程式を証明したことにはならないか説明せよ。

<!-- solution-start -->
**詳細解答。** 時間断面の体積密度は $a^3$ なので、与えられたスカラー曲率から

$$
\begin{aligned}
S_{\mathrm{EH}}
&=CV_3\int_0^T[6(a^2a''+a(a')^2)-2\Lambda a^3]\,dx^0\\
&=CV_3\left(6[a^2a']_0^T
-\int_0^T[6a(a')^2+2\Lambda a^3]\,dx^0\right).
\end{aligned}
$$

二行目では $(a^2a')'=2a(a')^2+a^2a''$ を用いました。両断面では $\varepsilon=-1$ で、[第二基本形式の定義](#def-gr11-extrinsic-curvature)より $K_T=3a'/a$、$K_0=-3a'/a$ です。従って

$$
S_{\mathrm{GHY}}
=-6CV_3[a^2a']_0^T,\qquad
\boxed{S_{\mathrm{grav}}
=-CV_3\int_0^T[6a(a')^2+2\Lambda a^3]\,dx^0.}
$$

次に $\delta a=b$ とすると、直接の積の微分から

$$
\delta S_{\mathrm{grav}}
=-CV_3\int_0^T
[6b(a')^2+12aa'b'+6\Lambda a^2b]\,dx^0.
$$

$(aa')'=(a')^2+aa''$ なので、$12aa'b'$ を部分積分すると

$$
\begin{aligned}
\delta S_{\mathrm{grav}}
={}&CV_3\int_0^T6[(a')^2+2aa''-\Lambda a^2]b\,dx^0\\
&-12CV_3[aa'b]_0^T.
\end{aligned}
$$

最後の項は $b(0)=b(T)=0$ なら零です。ここに $b'$ の境界値は現れません。(iii) この計算では初めから空間一様・等方な $g$ と時間成分 $g_{00}=-1$ を仮定し、$a$ だけを動かしました。一般の逆計量10成分を任意に動かしていないため、特に時間成分に関する独立の制約をこの制限変分だけから結論できません。全成分の停留条件は[GR11の変分定理](#thm-gr11-dirichlet-variation)で任意の内部変分を考えて初めて議論できます。
<!-- solution-end -->
