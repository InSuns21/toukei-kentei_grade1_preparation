from pathlib import Path

p = Path('textbook/volumes/00_foundations/CA2/index.md')
s = p.read_text(encoding='utf-8')

# 1. Insert polygonal-connectivity lemma before path-independence theorem.
marker = '<a id="thm-ca2-path-independence"></a>\n'
lemma = r'''<a id="lem-ca2-open-connected-polygonal"></a>
<!-- formal-statement-start -->
### 補題（複素平面の開連結集合は折れ線連結）

$\Omega\subset\mathbb C$ が空でない開連結集合なら、任意の $p,q\in\Omega$ は、有限本の線分をつないだ区分的 $C^1$ 曲線で $\Omega$ 内に結べる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$p\in\Omega$ を固定し、$p$ から $\Omega$ 内の有限折れ線で到達できる点全体を

$$
A:=\{z\in\Omega: p\text{ から }z\text{ へ }\Omega\text{ 内の有限折れ線で到達できる}\}
$$

と置きます。$p\in A$ なので $A$ は空でありません。

$z\in A$ を取ります。$\Omega$ は開なので、ある $r>0$ があって $D(z,r)\subset\Omega$ です。任意の $w\in D(z,r)$ について、既にある $p$ から $z$ への折れ線の最後に線分 $[z,w]$ を付け足せます。円板は凸なのでこの線分は $D(z,r)$ 内にあります。従って

$$
D(z,r)\subset A,
$$

よって $A$ は $\Omega$ で開です。

次に $z\in\Omega\setminus A$ を取ります。同様に $D(z,r)\subset\Omega$ を取ります。もし $w\in D(z,r)\cap A$ が存在すれば、$p$ から $w$ への折れ線に線分 $[w,z]$ を付け足して $z\in A$ となり矛盾します。従って

$$
D(z,r)\subset\Omega\setminus A,
$$

なので $\Omega\setminus A$ も $\Omega$ で開です。

したがって $A$ は $\Omega$ の空でない開閉集合です。[TOP3 の連結性と非自明な開閉集合の特徴付け](../TOP3/index.md)から、$\Omega$ の連結性により $A=\Omega$ です。任意の $q\in\Omega$ が有限折れ線で $p$ と結ばれます。$\square$
<!-- proof-end -->

'''
if marker not in s:
    raise SystemExit('path-independence marker missing')
s = s.replace(marker, lemma + marker, 1)

# Make theorem assumption connected open, not merely path-connected.
s = s.replace('$\\Omega$ を経路連結な開集合、$f:\\Omega\\to\\mathbb C$ を連続関数とする。次は同値である。',
              '$\\Omega$ を空でない連結開集合、$f:\\Omega\\to\\mathbb C$ を連続関数とする。次は同値である。', 1)
s = s.replace('経路連結性により、各 $z\\in\\Omega$ へ区分的 $C^1$ 曲線を取れるものとし',
              '[複素平面の開連結集合は折れ線連結](#lem-ca2-open-connected-polygonal)により、各 $z\\in\\Omega$ へ有限折れ線、したがって区分的 $C^1$ 曲線を取り', 1)

# 2. Make Goursat remainder epsilon defined at the center.
old = r'''$f$ は $z_*$ で複素微分可能なので

$$
f(z)
=f(z_*)+f'(z_*)(z-z_*)+(z-z_*)\varepsilon(z),
$$

ただし $z\to z_*$ で $\varepsilon(z)\to0$ と書けます。'''
new = r'''$f$ は $z_*$ で複素微分可能なので、$z\ne z_*$ に対して

$$
\varepsilon(z)
:=
\frac{f(z)-f(z_*)-f'(z_*)(z-z_*)}{z-z_*}
$$

と置けば $z\to z_*$ で $\varepsilon(z)\to0$ です。さらに

$$
\varepsilon(z_*):=0
$$

と定めます。すると $z_*$ を含めて

$$
f(z)
=f(z_*)+f'(z_*)(z-z_*)+(z-z_*)\varepsilon(z)
$$

と書け、$\varepsilon$ は $z_*$ で連続です。'''
if old not in s:
    raise SystemExit('Goursat epsilon block missing')
s = s.replace(old, new, 1)

# 3. Add an explicit compactness proof of the parameter square, then use exact TOP5 link.
old = r'''**Step 1：homotopy の像を有限個の局所原始関数領域で覆う。**

$$
K:=H([0,1]^2)
$$

と置きます。$[0,1]^2$ はコンパクトで $H$ は連続なので、[TOP5 で示した連続像によるコンパクト性の保存](../TOP5/index.md)から $K$ はコンパクトです。'''
new = r'''**Step 1：パラメータ正方形のコンパクト性を確認し、homotopy の像を有限個の局所原始関数領域で覆う。**

まず $[0,1]^2$ のコンパクト性を、この証明で必要な開被覆の形から直接確認します。もし $[0,1]^2$ のある開被覆が有限部分被覆を持たないと仮定すると、正方形を4等分した4つの閉正方形のうち少なくとも1つは有限部分被覆を持ちません。その正方形をさらに4等分し、同じ性質を持つ小正方形を選ぶ操作を繰り返して

$$
Q_0\supset Q_1\supset Q_2\supset\cdots
$$

を作れます。$Q_n$ の一辺は $2^{-n}$ です。各 $Q_n$ の中心を $c_n$ とすると、$m\ge n$ で $c_m,c_n\in Q_n$ だから

$$
|c_m-c_n|\le \sqrt2\,2^{-n}.
$$

従って $(c_n)$ は Cauchy 列です。実部・虚部を別々に見れば実数の完備性から $c_n\to c_*$ となる $c_*\in\mathbb C$ が存在します。各 $Q_n$ は閉で、十分後の中心は全て $Q_n$ に入るので $c_*\in Q_n$ です。

開被覆のある要素 $U$ が $c_*$ を含みます。$U$ は開なので、ある $\rho>0$ があって $D(c_*,\rho)\subset U$ です。$n$ を十分大きくすれば $Q_n$ の直径 $\sqrt2\,2^{-n}$ は $\rho$ 未満で、$c_*\in Q_n$ だから $Q_n\subset U$ となります。すると $Q_n$ は1個の被覆要素で覆われ、有限部分被覆を持たないという選び方に矛盾します。従って $[0,1]^2$ はコンパクトです。

いま

$$
K:=H([0,1]^2)
$$

と置きます。$H$ は連続なので、[TOP5 のコンパクト空間の連続像はコンパクト](../TOP5/index.md#thm-top5-continuous-image-compact)から $K$ はコンパクトです。'''
if old not in s:
    raise SystemExit('homotopy Step 1 block missing')
s = s.replace(old, new, 1)

# 4. Fix the boundary orientation language in the grid cancellation step.
old = r'''**Step 4：全小長方形を足して内部辺を消す。**

各格子頂点 $(s_i,t_k)$ の像

$$
z_{ik}:=H(s_i,t_k)
$$

を隣接格子点同士で直線接続します。全小長方形の境界積分0を足すと、内部の各辺は逆向きに二度現れて相殺します。残るのは最下段・最上段・左右端だけです。

端点固定条件から

$$
H(s,0)=p,
\qquad
H(s,1)=q
$$

なので左右端に対応する格子辺は全て定値で積分0です。従って、下側の格子折れ線 $P_0$ と上側の格子折れ線 $P_1$ について

$$
\int_{P_0}f(z)dz
=
\int_{P_1}f(z)dz.
$$

**Step 5：格子折れ線を元の曲線へ戻す。**

下辺の各小区間 $[t_k,t_{k+1}]$ の像 $\gamma_0([t_k,t_{k+1}])$ も Step 3 と同じ円板 $D(w_j,r_j)$ に含まれます。'''
new = r'''**Step 4：全小長方形を足して内部辺を消す。**

各格子頂点 $(s_i,t_k)$ の像

$$
z_{ik}:=H(s_i,t_k)
$$

を隣接格子点同士で直線接続します。全小長方形の境界積分0を足すと、内部の各辺は逆向きに二度現れて相殺します。残るのはパラメータ正方形の4辺、すなわち $s=0$, $s=1$, $t=0$, $t=1$ に対応する格子折れ線だけです。

端点固定条件

$$
H(s,0)=p,
\qquad
H(s,1)=q
$$

により、$t=0$ と $t=1$ に対応する格子辺は全て定値で積分0です。一方 $s=0$ と $s=1$ はそれぞれ $\gamma_0$ と $\gamma_1$ に沿う境界です。それらの格子折れ線を $P_0,P_1$ と書けば、境界の向きを追って

$$
\int_{P_0}f(z)dz
=
\int_{P_1}f(z)dz.
$$

**Step 5：格子折れ線を元の曲線へ戻す。**

$s=0$ 側の各小区間 $[t_k,t_{k+1}]$ の像 $\gamma_0([t_k,t_{k+1}])$ も Step 3 と同じ円板 $D(w_j,r_j)$ に含まれます。'''
if old not in s:
    raise SystemExit('homotopy Step 4/5 block missing')
s = s.replace(old, new, 1)

# 5. Make connectedness explicit before using path-independence in simply-connected theorem.
s = s.replace('$\\Omega$ は経路連結なので、[原始関数・経路独立性・閉曲線積分0の同値](#thm-ca2-path-independence)から原始関数の存在が従います。',
              '単連結性の定義より $\\Omega$ は弧状連結です。[TOP3 の弧状連結なら連結](../TOP3/index.md#thm-top3-path-implies-connected)から $\\Omega$ は連結なので、[原始関数・経路独立性・閉曲線積分0の同値](#thm-ca2-path-independence)から原始関数の存在が従います。', 1)

# 6. Remove circularity in principal-log exercise: prove only continuity of the explicit formula first.
old = r'''一方任意の $z\in\Omega$ は一意に

$$
z=re^{i\theta},
\qquad r>0,\quad -\pi<\theta<\pi
$$

と書けます。そこで

$$
P(z)=\log r+i\theta
$$

と置けば $e^{P(z)}=z$ かつ $P(1)=0$ です。連結領域上で二つの対数の枝の差は $2\pi i$ の整数倍の定数ですが、1で差が0なので

$$
G=P.
$$

従って

$$
G(z)=\log|z|+i\operatorname{Arg}z
$$

であり、これが主値対数です。'''
new = r'''一方任意の $z\in\Omega$ は一意に

$$
z=re^{i\theta},
\qquad r>0,\quad -\pi<\theta<\pi
$$

と書けます。ここで $\operatorname{Arg}z:=\theta$ と置き

$$
P(z):=\log|z|+i\operatorname{Arg}z
$$

と定めます。まずこの段階では $P$ の正則性を仮定しません。

$|z|$ は連続で、$\Omega$ の各点の十分小さい円板は切断 $(-\infty,0]$ を横切らないため、その円板上では角度を $(-\pi,\pi)$ 内で連続に選べます。したがって $\operatorname{Arg}$、ひいては $P$ は $\Omega$ 上連続です。また定義から

$$
e^{P(z)}=z,
\qquad
P(1)=0.
$$

すでに構成した正則な枝 $G$ についても $e^{G(z)}=z$ なので

$$
e^{G(z)-P(z)}=1.
$$

従って各 $z$ で

$$
G(z)-P(z)\in2\pi i\mathbb Z.
$$

左辺は連続です。$\Omega$ は連結で、$2\pi i\mathbb Z$ は離散集合なので、$G-P$ は一つの $2\pi ik$ に等しい定数です。$z=1$ では $G(1)=P(1)=0$ だから $k=0$、従って

$$
G=P.
$$

よって

$$
G(z)=\log|z|+i\operatorname{Arg}z.
$$

右辺 $P$ の正則性は、正則関数 $G$ と一致したことの**結論**として得られます。これが主値対数です。'''
if old not in s:
    raise SystemExit('principal log block missing')
s = s.replace(old, new, 1)

p.write_text(s, encoding='utf-8')
