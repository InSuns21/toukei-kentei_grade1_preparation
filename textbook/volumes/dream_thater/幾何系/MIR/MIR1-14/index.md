# MIR1-14 conifold・orbifold点と積分構造

<!-- definition-example-audit: strict -->

## 1. 同じ微分方程式でも一周の仕方は三通り

[前講の最大単冪モノドロミー](../MIR1-13/index.md#thm-mir1-13-maximal-unipotence)は、$z=0$ で四本の周期解が一本の長い対数鎖を作ることを示した。しかし、**微分方程式の正則特異点がすべて最大単冪点になるわけではない**。滑らかなファイバーが節点へ退化する点と、滑らかなFermatファイバーを有限群で同一視した点では、一周の作用が違う。

[quinticのPicard–Fuchs作用素](../MIR1-10/index.md#thm-mir1-10-quintic-pf)と[族の座標・判別値](../MIR1-06/index.md#prop-mir1-06-z-discriminant)を用いる。

$$
\mathcal L=\theta^4-5z(5\theta+1)(5\theta+2)(5\theta+3)(5\theta+4),
\qquad \theta=z\frac{d}{dz}.
$$

計算を短くするため、$x=3125z$ と置く。$x$ は $z$ の非零定数倍なので $\theta=x\,d/dx$ は変わらず、

$$
\mathcal L=\theta^4-x\prod_{j=1}^{4}\left(\theta+\frac j5\right).
$$

この階数4の方程式の対象は、元のquinticの $H^3$ 全体（次元204）ではなく、**ミラー族で扱う四次元の周期部分**である。[群不変周期の階数の確認](../MIR1-08/index.md#prop-mir1-08-finite-ode)と混同しない。

| $x$ の点 | 幾何学的な意味 | 本講で確認する局所モノドロミー |
| --- | --- | --- |
| $0$ | 大複素構造極限 | 最大単冪、冪零指数4（前講） |
| $1$ | $z=1/3125$、節点を生むconifold | 非自明な階数1の単冪、$(M-I)^2=0$ |
| $\infty$ | $\psi=0$ のFermat点を五乗同一視したorbifold | 有限位数5、固有値は非自明な五乗根 |

最後の二行は単に名称から決めるのではない。微分方程式から指数を出し、**整数サイクルから出る行列**との違いまで確かめる。

## 2. conifold点の指標根を演算子から出す

conifold点に近づく変数を $s=1-x$ とする。$s=0$ が節点の値である。ここで $\partial_x=d/dx$ は正則な**一変数関数を $x$ で微分する演算子**の略記とし、$D=x\,d/dx=x\partial_x$ と置く。$D$ の冪を通常の微分へ展開すると

$$
\begin{aligned}
D^2&=x^2\partial_x^2+x\partial_x,\\
D^3&=x^3\partial_x^3+3x^2\partial_x^2+x\partial_x,\\
D^4&=x^4\partial_x^4+6x^3\partial_x^3
       +7x^2\partial_x^2+x\partial_x.
\end{aligned}
$$

また四因子の積は

$$
\prod_{j=1}^4(D+j/5)
=D^4+2D^3+\frac75D^2+\frac25D+\frac{24}{625}.
$$

これらを $\mathcal L$ に代入する。$y(x)=Y(s)$、$s=1-x$ と書くと、連鎖律により $dy/dx=-dY/ds$ であり、二階以上も反復して

$$
\frac{d^ky}{dx^k}=(-1)^k\frac{d^kY}{ds^k}\qquad(k=1,2,3,4)
$$

が成り立つ。以下では $Y(s)$ を再び $y(s)$ と書く。この置換により、方程式は

$$
\begin{aligned}
0={}&s(1-s)^4y^{(4)}
 +(2-8s)(1-s)^3y^{(3)}\\
 &+\left(-\frac{37}{5}+\frac{72}{5}s\right)(1-s)^2y''
 +\left(\frac{19}{5}-\frac{24}{5}s\right)(1-s)y'
 -\frac{24}{625}(1-s)y .
\end{aligned}
$$

ここで $y^{(k)}$ は $s$ による $k$ 階微分を表す。最高階係数は $s$ の一次零点を持ち、第三階係数は $s=0$ で $2$ である。

[既習のFrobenius型級数](../MIR1-12/index.md#def-mir1-12-frobenius-family)と同様に、先頭係数 $a_0\ne0$ の形

$$
y=s^\rho\sum_{n\ge0}a_ns^n
$$

を置く。[正則特異点の判定](../MIR1-10/index.md#prop-mir1-10-regular-singular)に沿って、先頭の $s^\rho$ を形式的に代入し、最も低い $s$ の次数を比べて指標多項式を求める。

<a id="prop-mir1-14-conifold-exponents"></a>

<!-- formal-statement-start -->
> **命題（conifold点の指標多項式）**
>
> $\theta=x\,d/dx$ とし、$\mathcal L=\theta^4-x\prod_{j=1}^4(\theta+j/5)$ を考える。$s=1-x$ による $s=0$ の正則特異点で、Frobenius形 $y=s^\rho\sum_{n\ge0}a_ns^n$（$a_0\ne0$）の指標多項式は次の式である。

$$
I_c(\rho)=\rho(\rho-1)^2(\rho-2).
$$

> 従って指標根は $0,1,1,2$（重複を込めて四個）である。
<!-- formal-statement-end -->

### 証明の見取り図

$s\,y^{(4)}$ と $2y^{(3)}$ が、ともに $s^{\rho-3}$ の項を作る。$y''$ 以下は $s^{\rho-2}$ 以降なので、指標式には入らない。

<!-- proof-start -->
### 証明

$s^\rho$ の四階微分と三階微分は、順に

$$
\begin{aligned}
\frac{d^4}{ds^4}s^\rho
 &=\rho(\rho-1)(\rho-2)(\rho-3)s^{\rho-4},\\
\frac{d^3}{ds^3}s^\rho
 &=\rho(\rho-1)(\rho-2)s^{\rho-3}.
\end{aligned}
$$

係数 $(1-s)^4$ と $(1-s)^3$ は定数項が1である。従って $s^{\rho-3}$ の係数は

$$
\begin{aligned}
&\rho(\rho-1)(\rho-2)(\rho-3)
 +2\rho(\rho-1)(\rho-2)\\
&=\rho(\rho-1)(\rho-2)\{(\rho-3)+2\}\\
&=\rho(\rho-1)^2(\rho-2).
\end{aligned}
$$

$y''$、$y'$、$y$ の項は係数が $s=0$ で有限なので、この最小次数に寄与しない。$a_0\ne0$ により先頭項の消滅条件は $I_c(\rho)=0$。$\square$
<!-- proof-end -->

根が $1$ で重なることは対数解の**可能性**を示すが、それだけから実際の対数の係数や整数モノドロミー行列は決まらない。そこで[一つの節点になる商の計算](../MIR1-06/index.md#prop-mir1-06-nodes)へ戻る。

## 3. 節点で縮む三次元球面と周期

特異値 $\psi^5=1$ において、元のDwork型quinticは125個の通常二重点を持つ。[群作用による一軌道への同一視](../MIR1-06/index.md#prop-mir1-06-nodes)の下で、ミラーの一パラメータ方向では一個の節点を横切る。節点とは、局所方程式の一次項が消え、二次部分が非退化な点であり、局所的には四変数の平方和の零点をモデルにできる。

次の模型は**複素三次元の滑らかな近傍が節点へ縮む**様子を表す。実数 $s>0$ に対し

$$
E_s=\left\{u=(u_1,\ldots,u_4)\in\mathbb C^4:
u_1^2+\cdots+u_4^2=s\right\}
$$

と置く。全 $u_i$ が実数の部分は $\sum u_i^2=s$、半径 $\sqrt s$ の三次元球面 $S^3_{\sqrt s}$ である。$s\downarrow0$ ではこの球面が原点へ縮む。これは複素三次元の**消滅サイクル**を考える最小例になる。

<a id="def-mir1-14-vanishing-cycle"></a>

<!-- formal-statement-start -->
> **定義（節点の消滅サイクルと消滅周期）**
>
> 複素三次元の滑らかなファイバー $Y_s$（$0<|s|<\varepsilon$）が $s=0$ で一個の通常二重点へ退化し、近傍が $\sum_{i=1}^4u_i^2=s$ と同じ局所型を持つとする。小さい正の実数 $s$ のファイバーにある、局所球面 $S^3_{\sqrt s}$ の向き付きホモロジー類の像を消滅サイクル $\delta_s\in H_3(Y_s,\mathbb Z)$ とする。$Y_s$ 上の正則3形式 $\Omega_s$ に対する積分

$$
\Pi_\delta(s)=\int_{\delta_s}\Omega_s
$$

> を消滅周期とする。全体の $H_3$ における $\delta_s$ が非零かどうかは、局所模型の存在と別に確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-14-vanishing-cycle -->

**定義の確認**：局所球面の周期を実際に積分する。 $E_s$ 上で $\Omega_s$ を

$$
\Omega_s=\operatorname{Res}_{E_s}
 \frac{du_1\wedge du_2\wedge du_3\wedge du_4}
 {\sum_{i=1}^4u_i^2-s}
$$

と置く。$u_4\ne0$ の座標領域では、分母の $u_4$ 微分が $2u_4$ なので

$$
\Omega_s=\frac{du_1\wedge du_2\wedge du_3}{2u_4}.
$$

この局所式は球面の上下の半球で向き付きに貼り合わさる。半径 $r=\sqrt s$ の実三次元球面で、向き付き面積形式を $dA$ とすれば $dA=(r/u_4)\,du_1\wedge du_2\wedge du_3$（上の半球で外向きに合わせ、下でも整合する）。従って

$$
\int_{S^3_r}\Omega_s
=\frac{1}{2r}\int_{S^3_r}dA
=\frac{1}{2r}(2\pi^2r^3)
=\pi^2s.
$$

球面の面積 $2\pi^2r^3$ と $r^2=s$ を代入した。$\pi^2s\to0$ は「サイクルが縮む」ことを周期で直接検出した例である。この非零周期を持つサイクルは少なくともこの局所模型の $H_3$ で非零である。

<!-- definition-example-end -->

実際のquinticミラー族では、節点の近くの正則な座標変更と正則3形式の非零倍によって、消滅周期は $s$ に関し

$$
\Pi_\delta(s)=c\,s+O(s^2),\qquad c\ne0
$$

という形になる（$s=1-3125z$）。ここで係数 $c$ は局所座標と形式の規格化に依存し、**普遍的な数 $\pi^2$ ではない**。非退化二次項を標準形へ移せること、平滑化パラメータが一次に非零な変換であることを用いる。局所模型の積分自体は上で計算したが、実際のファイバーへの同定には節点の局所正規形という幾何学的入力が要る。

## 4. Picard–Lefschetz作用が与える階数1の単冪性

滑らかなコンパクト複素三次元多様体 $Y$ の実次元は6である。三次元サイクル $\alpha,\beta$ を横断的に交わらせ、向きを付けて交点を数えると整数 $\langle\alpha,\beta\rangle$ を得る。真ん中の次元が奇数なので、順序を交換すると符号が反転する。この交叉形式は、[交代双線形形式の定義](../../SYM/SYM1/index.md#def-sym1-alternating-form)を満たす。

$$
\langle\alpha,\beta\rangle=-\langle\beta,\alpha\rangle,
\qquad \langle\alpha,\alpha\rangle=0.
$$

捩れを除いた $H_3(Y,\mathbb Z)$ の交叉形式は、Poincaré双対性により整数値・非退化・単模である。階数4なら整数基底を選んで、その交叉行列を標準形

$$
J=\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix}
$$

にできる。この基底を**整数シンプレクティック基底**と呼ぶ。[線形シンプレクティック基底の定義](../../SYM/SYM1/index.md#def-sym1-symplectic-basis)の整数格子版であり、実際の整数サイクル上の交叉数を条件として追加する。

なぜ交叉数を行列で検査できるのかを先に確かめる。基底を $(a_0,a_1,b_0,b_1)$ と書き、$\gamma=\sum_{i=0}^1(p_ia_i+q_ib_i)$、$\eta=\sum_{i=0}^1(p'_ia_i+q'_ib_i)$ の列座標をそれぞれ $v=(p_0,p_1,q_0,q_1)^{\mathsf T}$、$v'=(p'_0,p'_1,q'_0,q'_1)^{\mathsf T}$ とする。基底の交叉数と双線形性から

$$
\langle\gamma,\eta\rangle
=\sum_{i=0}^1(p_iq'_i-q_ip'_i)
=v^{\mathsf T}Jv'.
$$

サイクルの作用 $T$ の行列 $M$ は、各基底の像の座標を**列**に並べると定める。すると $T\gamma$ の座標は $Mv$ だから、すべての $\gamma,\eta$ の交叉数を保つ条件は

$$
\langle T\gamma,T\eta\rangle
=v^{\mathsf T}M^{\mathsf T}JMv'
=v^{\mathsf T}Jv'
\quad\Longleftrightarrow\quad M^{\mathsf T}JM=J.
$$

これは[線形シンプレクティック写像の行列条件](../../SYM/SYM1/index.md#thm-sym1-matrix-criterion)を、この整数基底で具体化したものである。さらに整数**格子の自己同型**とするには、$M$ と $M^{-1}$ の両方が整数行列、すなわち $M\in\operatorname{GL}_4(\mathbb Z)$ であることを要する。以下は、そのような幾何学的基底を最初から選んだ場合の計算である。

<a id="def-mir1-14-integral-symplectic-basis"></a>

<!-- formal-statement-start -->
> **定義（整数シンプレクティック基底とモノドロミー）**
>
> $Y$ を滑らかなコンパクト複素三次元多様体とし、$L=H_3(Y,\mathbb Z)/\mathrm{tors}$ が階数4とする。交叉形式 $\langle\cdot,\cdot\rangle$ に対し、整数基底 $(a_0,a_1,b_0,b_1)$ が

$$
\langle a_i,a_j\rangle=\langle b_i,b_j\rangle=0,\qquad
\langle a_i,b_j\rangle=\delta_{ij}
$$

> を満たすとき整数シンプレクティック基底とする。基底の列を像の座標として書く行列 $M$ が整数格子を保ち、交叉形式も保つ条件は

$$
M\in\operatorname{GL}_4(\mathbb Z),\qquad M^{\mathsf T}JM=J.
$$

> これを満たす行列の集合を $\operatorname{Sp}(4,\mathbb Z)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-14-integral-symplectic-basis -->

**定義の確認**。 $a_0,a_1,b_0,b_1$ の順に置くと、$\langle a_1,b_1\rangle=1$、$\langle b_1,a_1\rangle=-1$ であり、他の異なる添字の交叉は零である。よって交叉行列は上の $J$ となる。恒等変換なら $I_4^{\mathsf T}JI_4=J$ を直接満たす。次の例では恒等でない整数行列についても同じ条件を検算する。

**整数基底が取れる理由。** 整数交叉形式の行列式が $\pm1$ という単模性と、$\langle v,v\rangle=0$ という交代性から、標準形は整数係数の基底変換で構成できる。まず原始元 $a_0\in L$ を選ぶ。交叉形式から得る $L\to\operatorname{Hom}_{\mathbb Z}(L,\mathbb Z)$ は単模性により同型なので、$\langle a_0,b_0\rangle=1$ を満たす $b_0\in L$ が存在する。任意の $v\in L$ に対し

$$
v_\perp=v-\langle v,b_0\rangle a_0+\langle v,a_0\rangle b_0
$$

と置けば、交代性で $\langle v_\perp,a_0\rangle=\langle v,a_0\rangle-\langle v,a_0\rangle=0$、$\langle v_\perp,b_0\rangle=\langle v,b_0\rangle-\langle v,b_0\rangle=0$。従って

$$
L=\mathbb Za_0\oplus\mathbb Zb_0\oplus
\{v:\langle v,a_0\rangle=\langle v,b_0\rangle=0\}.
$$

残る直和因子は階数2で、交叉形式の制限も単模かつ交代である。同じ議論で $a_1,b_1$ を選ぶと、望んだ整数基底になる。これは[シンプレクティック標準形の構成](../../SYM/SYM1/index.md#thm-sym1-linear-normal-form)を整数格子へ適用する際に、各対を交叉数1で選べる根拠である。

<!-- definition-example-end -->

節点の一周作用は**Picard–Lefschetzの公式**によって決まる。これは局所Milnorファイバーの位相と交叉数から導く定理で、前提の微分方程式だけでは証明できない。ここでは幾何学的な外部定理として正確な仮定と結論を示し、その後の線形代数は証明する。サイクルの向きと周回方向を選び、符号を次式の規約に固定する。

<a id="thm-mir1-14-picard-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（Picard–Lefschetzの節点公式：幾何学的入力）**
>
> 滑らかなコンパクト複素三次元の一パラメータ族が、基底の $s=0$ でただ一個の通常二重点を持ち、$0<|s|<\varepsilon$ では滑らかであるとする。消滅サイクル $\delta\in H_3(Y_s,\mathbb Z)/\mathrm{tors}$ と交叉形式を上記の向き規約で取り、反時計回りの一周によるホモロジーの作用を $T_c$ とする。このとき

$$
T_c(\gamma)=\gamma+\langle\gamma,\delta\rangle\delta
\qquad(\gamma\in H_3(Y_s,\mathbb Z)/\mathrm{tors})
$$

> が成り立つ。サイクルや基底の向きの規約を逆に取った記述では、交叉数と一周作用の対応する符号を一緒に変更する。
<!-- formal-statement-end -->

**証明の位置付け。** この公式の幾何学的部分（節点の消滅球面を周回させたときに交叉数だけサイクルが加わること）はPicard–Lefschetz定理の入力である。ここでは全体のPicard–Lefschetz理論を新たに証明したとはしない。ただし、公式から導く単冪性とシンプレクティック性は以下で省略なく検算する。

<a id="prop-mir1-14-conifold-transvection"></a>

<!-- formal-statement-start -->
> **命題（節点の一周は階数1のシンプレクティック単冪変換）**
>
> $L$ を階数4の整数自由加群とし、$L$ 上の単模な交代双線形形式を $\langle\cdot,\cdot\rangle$ とする。$\delta\in L$ は非零かつ原始的（$\delta=m\eta$ と書ける整数 $m$ は $\pm1$ に限る）とする。写像を

$$
T(\gamma)=\gamma+\langle\gamma,\delta\rangle\delta
$$

> で定める。このとき $T$ は格子と交叉形式を保ち、$T-I$ は階数1で

$$
(T-I)^2=0,\qquad T-I\ne0.
$$

> したがって $T$ は単冪だが、[前講の階数4最大単冪](../MIR1-13/index.md#def-mir1-13-mum)ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$N=T-I$ は $\gamma$ の $\delta$ との交叉数を掛けて $\delta$ へ送る。$\delta$ 自身の自己交叉が零なので $N^2=0$。交叉形式の保存は二項展開で確認する。単模性と $\delta$ の原始性は非自明性を保証する。

<!-- proof-start -->
### 証明

定義から $N\gamma=\langle\gamma,\delta\rangle\delta$ である。交代性により $\langle\delta,\delta\rangle=0$ なので

$$
N^2\gamma
=N\{\langle\gamma,\delta\rangle\delta\}
=\langle\gamma,\delta\rangle\langle\delta,\delta\rangle\delta=0.
$$

よって $(I+N)(I-N)=I-N^2=I$ で、$T^{-1}=I-N$。全係数は整数だから、$T$ と逆写像はともに整数格子を保つ。

次に $\alpha,\beta\in L$ について双線形性を二回使うと

$$
\begin{aligned}
\langle T\alpha,T\beta\rangle
={}&\langle\alpha,\beta\rangle
 +\langle\alpha,\delta\rangle\langle\delta,\beta\rangle\\
 &+\langle\beta,\delta\rangle\langle\alpha,\delta\rangle
 +\langle\alpha,\delta\rangle\langle\beta,\delta\rangle
   \langle\delta,\delta\rangle.
\end{aligned}
$$

第二項と第三項は $\langle\delta,\beta\rangle=-\langle\beta,\delta\rangle$ により打ち消し、第四項は零である。従って $\langle T\alpha,T\beta\rangle=\langle\alpha,\beta\rangle$。

最後に、$\delta$ を整数基底の一元へ延長できるのは原始性による。単模な交叉形式の下では $\gamma\mapsto\langle\gamma,\delta\rangle$ が値1または-1を取る $\gamma$ が存在する。従って $N\gamma=\pm\delta\ne0$。像は常に $\mathbb Z\delta$ に含まれるので階数はちょうど1。$N^2=0$ かつ $N\ne0$ が得られた。$\square$
<!-- proof-end -->

**整数行列の直接例。** 上の整数シンプレクティック基底で $\delta=a_1$ と置く。$T_c(b_1)=b_1-a_1$、$T_c(a_0)=a_0$、$T_c(a_1)=a_1$、$T_c(b_0)=b_0$。従って列の規約で

$$
M_c=\begin{pmatrix}
1&0&0&0\\
0&1&0&-1\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

$M_c-I$ の唯一の非零成分は $(2,4)$ の $-1$ であり、その二乗は零。$M_c^{\mathsf T}JM_c=J$ は、[線形シンプレクティック写像の行列条件](../../SYM/SYM1/index.md#thm-sym1-matrix-criterion)をこの整数基底で用いた等式でもあり、上で示した交叉形式の保存と一致する。この行列は**消滅サイクルを $a_1$ に選べた模型での表示**であり、quinticの他の二点の整数行列も同時にこの表示で確定した、という意味ではない。

### 対数周期との整合

消滅周期を $f(s)=\Pi_\delta(s)=cs+O(s^2)$、それと交叉するサイクルの周期を $g(s)$ とする。$T_c(b_1)=b_1-a_1$ のため、反時計回り一周で $g\mapsto g-f$ である。[解析接続による対数の増分](../MIR1-13/index.md#thm-mir1-13-continuation)を使えば、局所的な表示

$$
g(s)=-\frac{f(s)}{2\pi i}\operatorname{Log}s+h(s)
$$

はこの変換と一致する。ただし $h$ が局所正則であることと実際の基底選択は、節点の局所周期理論を用いる。$\operatorname{Log}s\mapsto\operatorname{Log}s+2\pi i$ から

$$
g\longmapsto g-\frac{f}{2\pi i}(2\pi i)=g-f.
$$

一方 $f$ は一価であり、$s=0$ で一次の零点を持つ。「指標根 $1$ が二重」という解析的事実と「一つの消滅サイクルが作る階数1の単冪作用」という幾何的事実が、**対数を伴う解は一つ**という記述で接続される。

## 5. orbifold点では五回回すと戻る

今度は $x=\infty$ を調べる。[Dwork族の被覆座標](../MIR1-06/index.md#def-mir1-06-z-coordinate)は $z=(5\psi)^{-5}$ だったので、

$$
w=\frac1x=\frac1{3125z}=\psi^5.
$$

$\psi=0$ のFermatファイバー自体は滑らかであるが、$w$ は $\psi$ を五乗した座標である。$\psi\mapsto e^{2\pi i/5}\psi$ という五つの同一視が、商のパラメータ $w$ の一周に残る。これがここでいう有限位数のorbifold的な振る舞いの意味である。

<a id="def-mir1-14-orbifold-local-monodromy"></a>

<!-- formal-statement-start -->
> **定義（本講のorbifold点の局所モノドロミー）**
>
> $x=3125z$ とし、quinticのPicard–Fuchs方程式 $\mathcal Ly=0$ を $w=1/x$ の穿孔円板 $0<|w|<\varepsilon$ で考える。$w$ の反時計回り一周で解の芽を解析接続する作用を $T_\infty$ とする。$T_\infty$ が有限位数を持つとき、この局所系での有限位数モノドロミーと呼ぶ。ここでの「orbifold」は幾何的商の座標 $w=\psi^5$ と対応させた呼称であり、元のFermat超曲面が特異という主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-14-orbifold-local-monodromy -->

**定義の確認**。 $w=\psi^5$ で $w>0$ の五乗根の枝を一つ選ぶ。$w$ を反時計回り一周させると $\psi$ は $2\pi/5$ 回転して別の枝へ移る。五周で $\psi$ は $2\pi$ 回転し元に戻る。これは五乗被覆から有限位数を**予想**する例であり、四本の微分方程式の解で本当に位数5となることは次の定理で確かめる。

<!-- definition-example-end -->

<a id="thm-mir1-14-orbifold-exponents"></a>

<!-- formal-statement-start -->
> **定理（orbifold点の指標根と位数5の一周作用）**
>
> $\theta=x\,d/dx$、$\mathcal L=\theta^4-x\prod_{j=1}^4(\theta+j/5)$ とする。$w=1/x$ の $w=0$ は正則特異点で、その指標根は

$$
\frac15,\quad\frac25,\quad\frac35,\quad\frac45.
$$

> その局所解空間の反時計回り $w$ 一周作用 $T_\infty$ は対角化可能で、固有値が $e^{2\pi i j/5}$（$j=1,2,3,4$）である。したがって

$$
T_\infty^5=I,\qquad T_\infty\ne I,\qquad
\chi_{T_\infty}(\lambda)=\lambda^4+\lambda^3+\lambda^2+\lambda+1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$w=1/x$ では $\theta=-w\,d/dw$。元の方程式に $w$ を掛けると、$w=0$ で最高次数に残るのは四因子の積である。指標根の差は整数でないため、四本のFrobenius解は対数を伴わない。

<!-- proof-start -->
### 証明

$D_w=w\,d/dw$ とすると $\theta=-D_w$ であり、$x=1/w$。元の方程式を $w$ 倍して

$$
w(-D_w)^4y-\prod_{j=1}^4(-D_w+j/5)y=0
$$

を得る。各係数は $w$ の正則関数であり、Fuchs型の正則特異点をなす。$y=w^\rho$ を代入すると $D_ww^\rho=\rho w^\rho$。第一項は $w^{\rho+1}$ なので、$w^\rho$ の係数は

$$
-\prod_{j=1}^4\left(\frac j5-\rho\right).
$$

従って指標根は $j/5$（$1\le j\le4$）。どの二根の差も整数ではないため、通常のFrobenius構成で局所基底を

$$
f_j(w)=w^{j/5}h_j(w),\qquad h_j(0)=1
\quad(j=1,2,3,4)
$$

と取れる。ここで $h_j$ は原点近くで正則一価で、重なった対数項はない。$w$ を反時計回りに一周すると $w^{j/5}=\exp((j/5)\operatorname{Log}w)$ の対数が $2\pi i$ 増えるので

$$
T_\infty f_j=e^{2\pi i j/5}f_j.
$$

$\zeta=e^{2\pi i/5}$ と置けば、固有値は $\zeta,\zeta^2,\zeta^3,\zeta^4$。すべて異なり、五乗は1だがいずれも1ではない。ゆえに $T_\infty^5=I$、$T_\infty\ne I$。最後に

$$
\prod_{j=1}^4(\lambda-\zeta^j)
=\frac{\lambda^5-1}{\lambda-1}
=\lambda^4+\lambda^3+\lambda^2+\lambda+1.
$$

$\lambda^5-1=(\lambda-1)\prod_{j=1}^4(\lambda-\zeta^j)$ を使った。$\square$
<!-- proof-end -->

**基底の違いに注意。** この四解のFrobenius基底での行列は $\operatorname{diag}(\zeta,\zeta^2,\zeta^3,\zeta^4)$ となり、複素数成分を持つ。一方、特性多項式は整数係数である。これは「整数基底が存在し得る」ことと矛盾しないが、**この対角基底が整数サイクルであることは全く意味しない**。

また $w=\psi^5$ と $f_j=w^{j/5}h_j(w)$ から、選んだ枝では

$$
f_j(\psi^5)=\psi^j h_j(\psi^5).
$$

$\psi$ 平面に持ち上げれば右辺は $\psi=0$ で正則な式になる。$w$ 上の五周と $\psi$ 上の一周の対応が、指数 $j/5$ にも現れる。

## 6. Frobenius基底だけでは積分構造は分からない

[前講のFrobenius解](../MIR1-13/index.md#thm-mir1-13-continuation)の基底 $u_0,\ldots,u_3$ での原点一周行列は

$$
M_0^{\mathrm{Frob}}=
\begin{pmatrix}
1&1&1/2&1/6\\
0&1&1&1/2\\
0&0&1&1\\
0&0&0&1
\end{pmatrix}.
$$

この表示は局所解析のためには便利だが、$1/2$ や $1/6$ が現れるので、そのまま「整数サイクル基底での行列」とは読めない。整数格子を選ぶとは、単に四本の解をどれか選ぶことではない。

<a id="def-mir1-14-integral-period-lattice"></a>

<!-- formal-statement-start -->
> **定義（積分周期格子と基底の接続行列）**
>
> 滑らかなコンパクト複素三次元の一パラメータ族 $Y_z$ を、特異値を除いた連結な基底領域 $B$ 上で考える。基点 $b\in B$ で $L=H_3(Y_b,\mathbb Z)/\mathrm{tors}$ の整数格子を取り、[Gauss–Maninによるサイクルの平行移動](../MIR1-08/index.md#prop-mir1-08-period-connection)によって局所的に追跡する。各サイクル $\gamma$ の周期 $\Pi_\gamma(z)=\int_{\gamma(z)}\Omega_z$ が張る、整数サイクル由来の局所系を積分周期構造と呼ぶ。
>
> 局所Frobenius解の列ベクトルを $f$、整数シンプレクティック基底による周期の列ベクトルを $\Pi$ とする。両者が同じ四次元解空間を張る領域で、定数の可逆複素行列 $C\in\operatorname{GL}_4(\mathbb C)$ を用いて

$$
\Pi=Cf
$$

> と書くとき、$C$ をその二つの周期基底の接続行列とする。一般に $C$ が整数行列・有理行列・シンプレクティック行列になるとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-14-integral-period-lattice -->

**行列の置き方の注意。** [前講の列規約](../MIR1-13/index.md#def-mir1-13-monodromy)は、基底関数の各像の係数を行列の**列**に入れる規約だった。一方、ここで $f$ 自身を縦に並べて $f\mapsto Af$ と書くと、その $A$ は前講の列規約での行列の転置である。この節の $CMC^{-1}$ は後者の「周期列ベクトルに左から作用する行列」に対する相似式であって、二つの規約を無言で混在させない。

**定義の確認**：最小の二次元模型。 解の組 $f=(f_0,f_1)^{\mathsf T}$ が一周で $f\mapsto Mf$、$M=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ と変わるとする。$\Pi=Cf$、$C=\operatorname{diag}(2,1)$ に取り替えると

$$
\Pi\longmapsto CMC^{-1}\Pi
=\begin{pmatrix}1&2\\0&1\end{pmatrix}\Pi.
$$

同じ一周作用でも複素基底の規格化で成分が変わる。さらに $C=\operatorname{diag}(1,2)$ なら行列の右上成分は $1/2$ になり、整数行列ではない。**整数格子を本当に保つ基底だけ**が整数表示を保証するのである。なお、サイクルの列を右から変換する表記では相似式の行列の置き方が逆になる。ここでは周期の**列ベクトル**という規約に固定した。

<!-- definition-example-end -->

整数シンプレクティック基底なら、サイクルのモノドロミーは $\operatorname{Sp}(4,\mathbb Z)$ に入る。一方、局所解をどこかで解析接続して並べた $f$ について、$C$ の値を求めるには次が要る。

1. 滑らかなファイバーの整数三次元サイクルを選び、交叉形式の符号・基底を固定する。
2. そのサイクルが与える周期を、[留数の規格化](../MIR1-07/index.md#def-mir1-07-period)を含めて局所的に同定する。
3. $z=0$、conifold、orbifoldの各近傍から**同じ基点まで**解析接続し、接続行列を求める。
4. 一つの整数シンプレクティック格子上で、三点の一周行列が同時に整数・交叉形式保存となることを確かめる。

局所指数と固有値だけから $C$ の成分や一意な整数周期は得られない。特に、[前講の $e^{y_1/y_0}$](../MIR1-13/index.md#thm-mir1-13-maximal-unipotence)は局所一価座標の候補だが、A側と比較する平坦座標の**積分規格化**は後続のミラー写像の計算に先立って選ぶ必要がある。

**三点の比較。** 原点では長さ4の対数鎖、conifoldでは消滅サイクル一個と長さ2の対数鎖、orbifoldでは対数のない五つ目ではなく**四本の**五分数冪解が現れた。位数5の作用を持つのは $4$ 次元の解空間上であり、解の本数が5になるわけではない。三点の行列を同時に比較するには、局所基点とその間の経路を一つの選択に揃える必要がある。

## 7. 演習と詳細解答

### Level A：局所指数と定義を手で確かめる

<a id="ex-mir1-14-a01"></a>
#### MIR1-14-A01 conifoldの指標多項式
- Level: A

$s=0$ 近くの四階方程式の最高二項が $s(1+O(s))y^{(4)}+(2+O(s))y^{(3)}$ で、下位項の係数は $s=0$ で正則とする。$y=s^\rho$ を代入して指標多項式とその根を求めよ。

<!-- solution-start -->
**詳細解答。** $y^{(4)}=\rho(\rho-1)(\rho-2)(\rho-3)s^{\rho-4}$、$y^{(3)}=\rho(\rho-1)(\rho-2)s^{\rho-3}$。前者に $s$ を掛け、後者に2を掛けた $s^{\rho-3}$ の係数を足すと

$$
\rho(\rho-1)(\rho-2)[(\rho-3)+2]
=\rho(\rho-1)^2(\rho-2).
$$

下位の $y''$ 以下は $s^{\rho-2}$ 以降なので寄与しない。根は $0,1,1,2$。
<!-- solution-end -->

<a id="ex-mir1-14-a02"></a>
#### MIR1-14-A02 五乗根の特性多項式
- Level: A

$\zeta=e^{2\pi i/5}$ とし、四つの固有値 $\zeta,\zeta^2,\zeta^3,\zeta^4$ を持つ対角行列 $D$ を考える。$D^5$ と $\det D$、$\operatorname{tr}D$、特性多項式を求めよ。

<!-- solution-start -->
**詳細解答。** 各固有値の五乗は1なので $D^5=I_4$。行列式は固有値の積 $\zeta^{1+2+3+4}=\zeta^{10}=1$。$1+\sum_{j=1}^4\zeta^j=0$（五次の等比級数）より $\operatorname{tr}D=-1$。特性多項式は

$$
\prod_{j=1}^4(\lambda-\zeta^j)
=\frac{\lambda^5-1}{\lambda-1}
=\lambda^4+\lambda^3+\lambda^2+\lambda+1.
$$

固有値がすべて1ではないので $D\ne I_4$。
<!-- solution-end -->

<a id="ex-mir1-14-a03"></a>
#### MIR1-14-A03 消滅サイクルの行列
- Level: A

整数交叉基底 $(a_0,a_1,b_0,b_1)$ で $\langle a_i,b_j\rangle=\delta_{ij}$、$\langle b_i,a_j\rangle=-\delta_{ij}$ とする。$\delta=a_1$、$T\gamma=\gamma+\langle\gamma,\delta\rangle\delta$ のとき、四つの基底の像と $T-I$ の二乗を求めよ。

<!-- solution-start -->
**詳細解答。** $a_i$ と $\delta$ の交叉は零、$\langle b_0,a_1\rangle=0$、$\langle b_1,a_1\rangle=-1$。従って $Ta_0=a_0$、$Ta_1=a_1$、$Tb_0=b_0$、$Tb_1=b_1-a_1$。$N=T-I$ は $Nb_1=-a_1$ 以外の基底を零にする。さらに $Na_1=0$ だから $N^2b_1=-Na_1=0$ で、他の基底でも二乗は零。$N\ne0$ なので非自明な階数1の単冪変換である。
<!-- solution-end -->

<a id="ex-mir1-14-a04"></a>
#### MIR1-14-A04 局所の消滅周期
- Level: A

局所模型 $\sum_{i=1}^4u_i^2=s>0$ の実球面 $S^3_{\sqrt s}$ 上の留数形式が、向き付き面積形式 $dA$ を使って $\Omega_s=dA/(2\sqrt s)$ と書けるとする。球面の面積が $2\pi^2r^3$ であることを用い、周期と $s\downarrow0$ の振る舞いを求めよ。

<!-- solution-start -->
**詳細解答。** 半径 $r=\sqrt s$ だから、積分は

$$
\int_{S^3_r}\Omega_s
=\frac1{2r}\operatorname{Area}(S^3_r)
=\frac{2\pi^2r^3}{2r}
=\pi^2r^2=\pi^2s.
$$

従って周期は零へ一次の速さで収束する。サイクルの消滅が積分にも表れるが、全体の格子でどの基底ベクトルに対応するかはこの計算だけでは決まらない。
<!-- solution-end -->

### Level B：局所作用と整数格子の違いを証明する

<a id="ex-mir1-14-b01"></a>
#### MIR1-14-B01 対数解の符号を固定する
- Level: B

$s$ の反時計回りで $f(s)$ が一価とし、$g(s)=-f(s)\operatorname{Log}s/(2\pi i)+h(s)$ とする。$h$ も一価正則である。$f,g$ の一周行列を列の規約で求め、$(M-I)^2$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 一周の解析接続作用を $T$ と書く。$\operatorname{Log}s\mapsto\operatorname{Log}s+2\pi i$、$f,h$ は不変なので $Tf=f$、

$$
Tg=-\frac{f}{2\pi i}(\operatorname{Log}s+2\pi i)+h=g-f.
$$

基底 $(f,g)$ の各像の座標は $(1,0)^{\mathsf T}$、$(-1,1)^{\mathsf T}$。従って

$$
M=\begin{pmatrix}1&-1\\0&1\end{pmatrix},
\quad M-I=\begin{pmatrix}0&-1\\0&0\end{pmatrix},
\quad(M-I)^2=0.
$$

非零の対数係数があるため $M\ne I$。
<!-- solution-end -->

<a id="ex-mir1-14-b02"></a>
#### MIR1-14-B02 交叉形式の保存を一般に証明する
- Level: B

整数格子 $L$ に交代双線形形式 $\langle\cdot,\cdot\rangle$ があり、$\delta\in L$ とする。$T\gamma=\gamma+\langle\gamma,\delta\rangle\delta$ が $\langle T\alpha,T\beta\rangle=\langle\alpha,\beta\rangle$ を満たすことを示せ。さらに逆写像を求めよ。

<!-- solution-start -->
**詳細解答。** $A=\langle\alpha,\delta\rangle$、$B=\langle\beta,\delta\rangle$ と置く。双線形性から

$$
\langle\alpha+A\delta,\beta+B\delta\rangle
=\langle\alpha,\beta\rangle
+B\langle\alpha,\delta\rangle
+A\langle\delta,\beta\rangle+AB\langle\delta,\delta\rangle.
$$

右辺の追加三項は $BA+A(-B)+AB\cdot0=0$。よって保存する。$N\gamma=\langle\gamma,\delta\rangle\delta$ と置くと、$N^2\gamma=\langle\gamma,\delta\rangle\langle\delta,\delta\rangle\delta=0$ なので $(I+N)(I-N)=I$。従って $T^{-1}\gamma=\gamma-\langle\gamma,\delta\rangle\delta$。交叉数が整数なので両者は格子上に定義される。
<!-- solution-end -->

<a id="ex-mir1-14-b03"></a>
#### MIR1-14-B03 非整数の表示は作用素の非整数性か
- Level: B

基底上の二次元行列 $M=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ を、周期列 $\Pi=Cf$、$C=\operatorname{diag}(1,2)$ で表示し直せ。元の行列が整数でも新しい表示で非整数が現れる理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 周期列の規約では新行列は $CMC^{-1}$。$C^{-1}=\operatorname{diag}(1,1/2)$ だから

$$
MC^{-1}=\begin{pmatrix}1&1/2\\0&1/2\end{pmatrix},
\qquad
CMC^{-1}=\begin{pmatrix}1&1/2\\0&1\end{pmatrix}.
$$

これは有理数成分を持つが整数成分ではない。$C$ は逆行列が整数とは限らず、$C\notin\operatorname{GL}_2(\mathbb Z)$。したがって新しい基底は元の整数格子の基底であることを保証しない。**同じ作用素の基底表示の変化**と、**整数格子を保つという幾何学的性質**は区別する。
<!-- solution-end -->

<a id="ex-mir1-14-b04"></a>
#### MIR1-14-B04 Wronskianでconifoldの指数を点検する
- Level: B

$x$ で微分する四階方程式の $y^{(4)}$ と $y^{(3)}$ の係数がそれぞれ $x^4(1-x)$、$x^3(6-8x)$ である。四本の独立解のWronskian $W(x)$ は $W'=-p_3W$、$p_3=(6-8x)/(x(1-x))$ を満たすとして、$W(x)$ を求めよ。$x=1$ での極の次数と指標根 $0,1,1,2$ の整合を確かめよ。

<!-- solution-start -->
**詳細解答。** 部分分数分解は

$$
p_3=\frac6x-\frac2{1-x}.
$$

従って $-p_3=-6/x+2/(1-x)$。原始関数は $-6\operatorname{Log}x-2\operatorname{Log}(1-x)$ だから、単連結な切断領域では

$$
W(x)=C\,x^{-6}(1-x)^{-2},\qquad C\ne0.
$$

$x=1$ では二位の極となる。一方、根の和は $0+1+1+2=4$。四つのべき型解の導関数の行列式が支配する次数は、導関数の次数 $0+1+2+3=6$ を差し引いた $4-6=-2$ である。重根1に伴う対数があっても最高次数の極の整合は同じで、二位の極と一致する。$W$ の計算だけでは対数の係数や整数周期の同定はできない。
<!-- solution-end -->

<a id="ex-mir1-14-b05"></a>
#### MIR1-14-B05 五乗被覆と有限位数
- Level: B

$w=\psi^5$、$f_j(w)=w^{j/5}h_j(w)$（$j=1,2,3,4$）とし、$h_j$ は $w=0$ で正則一価、$h_j(0)=1$ とする。$\psi$ の局所枝に持ち上げた式を求め、$w$ の一周と五周が $f_j$ にどう作用するか説明せよ。

<!-- solution-start -->
**詳細解答。** 選んだ $\psi$ の枝では $(\psi^5)^{j/5}=\psi^j$ と解釈でき、

$$
f_j(\psi^5)=\psi^j h_j(\psi^5).
$$

$w$ の反時計回り一周では $\operatorname{Log}w$ が $2\pi i$ 増えるので $f_j\mapsto e^{2\pi ij/5}f_j$。五周なら係数が $e^{2\pi ij}=1$ となる。$\psi$ 平面では右辺が整数べきの正則関数であり、$\psi$ 一周で変化しない。$w$ の一周は $\psi$ の $1/5$ 周に対応するという被覆の違いによる。
<!-- solution-end -->

### Level C：三点の解析と幾何を接続する

<a id="ex-mir1-14-c01"></a>
#### MIR1-14-C01 三つの正則特異点と周期格子の統合
- Level: C

階数4のPicard–Fuchs作用素 $\mathcal L=\theta^4-x\prod_{j=1}^4(\theta+j/5)$、$\theta=x\,d/dx$ を考える。$x=0$ では最大単冪、$x=1$ では滑らかな三次元ファイバーが一個の通常二重点へ退化し、原始的な消滅サイクル $\delta$ を持つと仮定する。$x=\infty$ では $w=1/x=\psi^5$ とする。

1. $x=1$ と $x=\infty$ の指標根を求めよ。
2. $x=1$ で $T_c-I$ の階数と冪零指数、$x=\infty$ で $T_\infty$ の位数と特性多項式を求めよ。
3. $x=0$ の局所Frobenius行列が整数シンプレクティック行列であると無条件に断定できない理由を述べ、共通の整数周期基底を得るのに必要な情報を挙げよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $s=1-x$ とすると、通常微分へ展開した方程式の先頭項は $s(1+O(s))y^{(4)}+(2+O(s))y^{(3)}$。$y=s^\rho$ から $s^{\rho-3}$ を集めれば

$$
\rho(\rho-1)(\rho-2)\{(\rho-3)+2\}
=\rho(\rho-1)^2(\rho-2).
$$

従ってconifoldの根は $0,1,1,2$。一方 $w=1/x$、$\theta=-w\,d/dw$ として方程式を $w$ 倍すると

$$
w(-w\partial_w)^4y-\prod_{j=1}^4(-w\partial_w+j/5)y=0.
$$

$y=w^\rho$ の先頭係数を零と置いて $\prod_{j=1}^4(j/5-\rho)=0$。根は $1/5,2/5,3/5,4/5$。

**(2)** [Picard–Lefschetzの節点公式](#thm-mir1-14-picard-lefschetz)を、設問で与えた「一個の節点・原始的消滅サイクル」という仮定の下で使う。$N_c\gamma=\langle\gamma,\delta\rangle\delta$ とすれば $\langle\delta,\delta\rangle=0$ から $N_c^2=0$。交叉形式の単模性と $\delta$ の原始性から $\langle\gamma,\delta\rangle=\pm1$ となる $\gamma$ があるので $N_c\ne0$、階数1、冪零指数2。$T_c=I+N_c$ は最大単冪ではない。

無限遠では指標根の差が整数でないため、Frobenius解が $w^{j/5}h_j(w)$ と取れる。一周の固有値は $\zeta^j$（$\zeta=e^{2\pi i/5}$）なので、$T_\infty^5=I$、$T_\infty\ne I$。その特性多項式は

$$
\frac{\lambda^5-1}{\lambda-1}
=\lambda^4+\lambda^3+\lambda^2+\lambda+1.
$$

**(3)** [前講のFrobenius行列](../MIR1-13/index.md#thm-mir1-13-maximal-unipotence)には $1/2$、$1/6$ が入る。これは解析的解を微分・定数倍で作った基底の座標であって、整数ホモロジー格子の基底から導いた座標ではない。一般の接続行列 $C\in\mathrm{GL}_4(\mathbb C)$ による相似 $CMC^{-1}$ は整数成分を保存しない。

必要なのは、滑らかなファイバーの $H_3/\mathrm{tors}$ の整数サイクル、交叉形式と向き、正則3形式の規格化、共通基点と解析接続経路、各局所Frobenius解と整数周期の接続行列である。その上で三点の作用を**同じ格子**に表し、整数値と交叉保存を同時に検査する。局所指数だけではこれらを特定できない。
<!-- solution-end -->

## 8. 次に渡す問い

$z=0$ の周期比を指数にすれば一価な座標候補ができるが、**どの整数周期を選ぶか**は局所Frobenius法だけでは決まらない。conifoldの消滅周期と有限位数のorbifold作用は、局所的な解析接続を幾何的な格子へ結び付けるための情報になる。次講ではこの区別を保ち、原点近傍の規格化周期比からミラー写像と逆級数を具体的に計算する。

**参照文献（外部数学的入力の所在）**：Picard–Lefschetzの節点公式とquinticの整数周期の詳しい構成は、Cox–Katz, *Mirror Symmetry and Algebraic Geometry*（AMS）および Hori et al., *Mirror Symmetry*（Clay/AMS）のモノドロミー・周期の章に譲る。両文献の存在と今回の局所計算を混同しない。
