# CM2-10 Chern接続の存在・一意性

<!-- definition-example-audit: strict -->

## 1. 計量を保ったまま切断を微分したい

前章では[Hermite計量とその局所行列](../CM2-09/index.md#def-cm2-09-metric-matrix)を構成し、正則枠 $\mathcal E_j=\mathcal E_iG_{ij}$ のもとで $H_j=G_{ij}^*H_iG_{ij}$ となることを確かめた。だが、切断 $s=\mathcal E_iv_i$ の係数をそのまま微分すると

$$
dv_i=d(G_{ij}v_j)=(dG_{ij})v_j+G_{ij}dv_j
$$

となる。余分な $(dG_{ij})v_j$ があるので、$dv_i$ だけでは束全体の微分にならない。そこで、**局所枠の変化を相殺する行列値1形式**を加えたい。

さらに、複素多様体の正則束には[正則切断の条件](../CM2-07/index.md#def-cm2-07-holomorphic-section)がある。これを壊さず、同時に内積を微分したときの積の法則も保つ微分を作れるだろうか。二つの条件が同時に接続を一意に決めるのが本章の要点である。

以下、$X$ は複素次元 $n\ge1$ の複素多様体、$E\to X$ は階数 $r\ge1$ の正則ベクトル束、$h$ は滑らかな正値Hermite計量とする。$h$ は**第一変数が共役線形、第二変数が線形**であり、係数ベクトルは列で書く。複素数値の滑らかな1形式は $(1,0)$ 型と $(0,1)$ 型に分かれ、外微分は[型別微分](../CM2-02/index.md#def-cm2-02-dolbeault-operators) $d=\partial+\bar\partial$ とする。

## 2. 接続は「微分＋補正項」である

複素数値関数 $f$ と滑らかな切断 $s$ について、微分に期待する積の法則は $D(fs)=df\otimes s+fDs$ である。単なる微分 $d$ と違い、$Ds$ は局所表示を超えて繊維 $E$ に値を持つ。

<a id="def-cm2-10-connection"></a>

<!-- formal-statement-start -->
> **定義（複素ベクトル束上の接続）**  
> 滑らかな複素ベクトル束 $E\to X$ の接続とは、複素数に線形な写像

$$
D:\Gamma^\infty(E)\longrightarrow\Omega^1(X,E)
$$

> であって、任意の $f\in C^\infty(X,\mathbb C)$ と $s\in\Gamma^\infty(E)$ に対し

$$
D(fs)=df\otimes s+fDs
$$

> を満たすものである。$\Omega^1(X,E)$ は複素数値1形式を係数とする $E$ 値1形式の空間である。局所的に

$$
Ds=\mathcal E_i(dv_i+A_iv_i),\qquad s=\mathcal E_iv_i
$$

> と書いたとき、$r\times r$ 行列値1形式 $A_i$ を局所接続行列と呼ぶ。式中の $\mathcal E_i$ は行列の列を切断として読む記法である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-10-connection -->
**定義の直接確認**。自明線束 $X\times\mathbb C$ の標準枠 $e$ に対し、任意の滑らかな複素1形式 $\alpha$ を取り、

$$
D(fe)=e(df+\alpha f)
$$

と置く。$g,f$ を滑らかな関数として

$$
D(gfe)=e\{d(gf)+\alpha gf\}
=e\{(dg)f+g(df+\alpha f)\}
=dg\otimes(fe)+gD(fe).
$$

よって接続の積の法則を満たす。$\alpha=0$ なら通常の外微分だが、$\alpha$ が非零でも接続になる。**積の法則だけでは一意に決まらない**ことが分かる。
<!-- definition-example-end -->

<a id="prop-cm2-10-connection-gauge"></a>

<!-- formal-statement-start -->
> **命題（接続行列の枠変更則）**  
> $E\to X$ の滑らかな二つの局所枠 $\mathcal E_j=\mathcal E_iG_{ij}$（$G_{ij}:U_i\cap U_j\to GL_r(\mathbb C)$ は滑らか）で、一つの接続 $D$ の局所接続行列がそれぞれ $A_i,A_j$ ならば

$$
A_j=G_{ij}^{-1}A_iG_{ij}+G_{ij}^{-1}dG_{ij}.
$$

> 逆に、被覆上の行列値1形式がこの法則を満たせば、局所公式 $Ds=\mathcal E_i(dv_i+A_iv_i)$ は貼り合わさって一意な接続を定める。
<!-- formal-statement-end -->

### 証明の見取り図

枠変更時には切断の係数が $v_i=G_{ij}v_j$ になる。[正則束の枠変更則](../CM2-07/index.md#prop-cm2-07-gauge-frame-change)と同じ向きの $G_{ij}$ を使うことが、逆行列の位置を間違えない鍵である。

<!-- proof-start -->
### 証明

重なり上で $s=\mathcal E_iv_i=\mathcal E_jv_j$、$v_i=G_{ij}v_j$ とする。$i$ 枠で計算すると

$$
\begin{aligned}
Ds
&=\mathcal E_i\{d(G_{ij}v_j)+A_iG_{ij}v_j\}\\
&=\mathcal E_i\{G_{ij}dv_j+(dG_{ij})v_j+A_iG_{ij}v_j\}\\
&=\mathcal E_j\{dv_j+
(G_{ij}^{-1}dG_{ij}+G_{ij}^{-1}A_iG_{ij})v_j\}.
\end{aligned}
$$

したがって $j$ 枠の補正行列は主張の $A_j$ でなければならない。逆にこの等式を仮定すれば、今の計算を逆順に辿って各局所公式が一致する。局所公式は線形であり、$d(fv)=df\,v+f\,dv$ によって積の法則を満たすので、大域的接続になる。$\square$
<!-- proof-end -->

正則枠を使う場合でも、$G_{ij}$ を**微分する項は消えない**。消えるのは $\bar\partial G_{ij}$ だけである。この違いを次節で利用する。

## 3. 正則構造と計量の二つの条件

接続は $(1,0)$ 部分 $D^{1,0}$ と $(0,1)$ 部分 $D^{0,1}$ に分解できる。正則束の各局所正則枠 $\mathcal E_i$ では、正則切断は $\bar\partial v_i=0$ を満たす。この構造を $D^{0,1}$ にそのまま反映させる。

内積との両立では、1形式を第一変数に入れる際に共役を取る。具体的には

$$
h(\omega\otimes s,t)=\overline\omega\,h(s,t),\qquad
h(s,\omega\otimes t)=\omega\,h(s,t)
$$

と延長する。ここで $\overline{a\,dz^k}=\overline a\,d\bar z^k$ とする。

<a id="def-cm2-10-compatible-conditions"></a>

<!-- formal-statement-start -->
> **定義（正則構造・Hermite計量と両立する接続）**  
> 正則ベクトル束 $E\to X$ に接続 $D$ があるとする。任意の正則局所枠 $\mathcal E_i$ で、滑らかな切断 $s=\mathcal E_iv_i$ に対して

$$
D^{0,1}s=\mathcal E_i\bar\partial v_i
$$

> が成立するとき、$D$ は正則構造と両立するという。また、任意の滑らかな切断 $s,t$ に対して

$$
d\bigl(h(s,t)\bigr)=h(Ds,t)+h(s,Dt)
$$

> が成立するとき、$D$ はHermite計量 $h$ と両立するという。両条件を満たす接続を **Chern接続**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cm2-10-compatible-conditions -->
**定義の直接確認**。$\mathbb C$ 上の自明線束に標準計量 $h(fe,ge)=\bar f g$、接続 $D(fe)=e\,df$ を取る。すると

$$
D^{0,1}(fe)=e\,\bar\partial f,
\qquad
\begin{aligned}
h(D(fe),ge)+h(fe,D(ge))
&=(d\bar f)g+\bar f\,dg\\
&=d(\bar f g).
\end{aligned}
$$

ゆえに二条件を満たす。これに対して同じ正則構造・標準計量でも $D_\alpha=d+\alpha$ は任意の $\alpha$ では両立しない。例えば $\alpha=dz$ は $(0,1)$ 部分を変えないが、計量両立条件の右辺に $(d\bar z+dz)\bar f g$ を余分に生じさせる。
<!-- definition-example-end -->

計量両立条件を局所行列で書き直そう。$s=\mathcal E_i v$、$t=\mathcal E_iw$ なら、$h(s,t)=v^*H_iw$ であり、$A_i^*$ は**行列要素の複素共役と転置に加え、微分形式の $dz^k$ を $d\bar z^k$ に換える**操作とする。

<a id="prop-cm2-10-metric-equation"></a>

<!-- formal-statement-start -->
> **命題（計量両立性の行列方程式）**  
> 上の仮定で、滑らかな局所枠のもとで $D=d+A_i$ と表示した接続が $h$ と両立するための必要十分条件は

$$
dH_i=A_i^*H_i+H_iA_i.
$$

> さらに枠が正則なら、正則構造との両立性は $A_i^{0,1}=0$ と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

長さ $v^*Hv$ の微分に二つの係数ベクトルを別々に入れる。計量は共役線形なので、最初の係数側の $A$ に随伴が付く。行列恒等式がどの切断に対して必要かも確かめる。

<!-- proof-start -->
### 証明

$h(s,t)=v^*Hw$ と書けば積の法則により

$$
d(v^*Hw)=(dv)^*Hw+v^*(dH)w+v^*H(dw).
$$

一方で $Ds=\mathcal E(dv+Av)$、$Dt=\mathcal E(dw+Aw)$ だから

$$
\begin{aligned}
h(Ds,t)+h(s,Dt)
&=(dv+Av)^*Hw+v^*H(dw+Aw)\\
&=(dv)^*Hw+v^*(A^*H+HA)w+v^*H(dw).
\end{aligned}
$$

両者の差は $v^*\{dH-A^*H-HA\}w$ である。全ての滑らかな $v,w$ について零になることと行列値1形式が零であることは、$v,w$ に定数の標準基底列を順に代入すれば同値になる。

次に正則枠では

$$
D^{0,1}(\mathcal E v)
=\mathcal E\{\bar\partial v+A^{0,1}v\}.
$$

従って $D^{0,1}=\bar\partial_E$ と $A^{0,1}v=0$（全ての $v$）は同値、すなわち $A^{0,1}=0$ である。$\square$
<!-- proof-end -->

ここまでで二つの条件が、局所的には $A^{0,1}=0$ と $dH=A^*H+HA$ になった。$H$ は正値なので各点で可逆である。これを使うと未知行列 $A$ を解ける。

## 4. Chern接続の存在・一意性

正則枠で $A$ が $(1,0)$ 型なら、$A^*H$ は $(0,1)$ 型、$HA$ は $(1,0)$ 型になる。したがって計量方程式の $(1,0)$ 成分だけを抜き出すと

$$
\partial H=HA
\quad\Longrightarrow\quad
A=H^{-1}\partial H.
$$

一見、局所枠ごとに作った行列のように見える。しかし前章の[計量の対数微分の変換則](../CM2-09/index.md#prop-cm2-09-log-derivative)は、まさに接続行列の枠変更則と一致する。これが存在証明の貼り合わせ部分である。

<a id="thm-cm2-10-chern-existence-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（Chern接続の存在・一意性）**  
> 任意の複素多様体 $X$ と、その上の階数 $r\ge1$ の正則ベクトル束 $E\to X$ および滑らかな正値Hermite計量 $h$ に対し、正則構造と $h$ の双方に両立する接続 $D$ がただ一つ存在する。任意の正則局所枠 $\mathcal E_i$ で計量行列を $H_i$ とすると、その接続行列は

$$
A_i=H_i^{-1}\partial H_i
$$

> であり、任意の滑らかな係数列 $v_i$ について

$$
D(\mathcal E_iv_i)=\mathcal E_i(dv_i+A_iv_i),
\qquad
D^{0,1}(\mathcal E_iv_i)=\mathcal E_i\bar\partial v_i.
$$

> この $D$ を $(E,h)$ のChern接続と呼ぶ。
<!-- formal-statement-end -->

### 証明の見取り図

まず正則枠で $A_i=H_i^{-1}\partial H_i$ を作る。第一の山は、正則な遷移行列で $A_j=G^{-1}A_iG+G^{-1}dG$ を示して接続を貼ること。第二の山は $A_i^*H_i=\bar\partial H_i$ を示して計量両立性を確かめること。最後に二つの条件から $A_i$ 以外は許されないと示す。

<!-- proof-start -->
### 証明

**局所構成**。滑らかな正値Hermite行列 $H_i$ は全点で可逆であり、逆行列 $H_i^{-1}$ も滑らかである。そこで $A_i=H_i^{-1}\partial H_i$ と定める。$\partial H_i$ は $(1,0)$ 型だから $A_i^{0,1}=0$。

**貼り合わせ**。正則枠 $\mathcal E_j=\mathcal E_iG$ における[Hermite行列の変換則](../CM2-09/index.md#prop-cm2-09-frame-transform)は $H_j=G^*H_iG$ である。$G$ が正則なので $\partial G^*=0$、従って

$$
\begin{aligned}
\partial H_j
&=\partial(G^*H_iG)\\
&=G^*(\partial H_i)G+G^*H_i(\partial G),\\
H_j^{-1}
&=G^{-1}H_i^{-1}(G^*)^{-1}.
\end{aligned}
$$

これらを掛けると

$$
\begin{aligned}
A_j
&=G^{-1}H_i^{-1}(G^*)^{-1}
\{G^*(\partial H_i)G+G^*H_i\partial G\}\\
&=G^{-1}(H_i^{-1}\partial H_i)G+G^{-1}\partial G\\
&=G^{-1}A_iG+G^{-1}dG.
\end{aligned}
$$

最終行は $\bar\partial G=0$ による。よって[接続行列の枠変更則](#prop-cm2-10-connection-gauge)から局所式は大域的接続 $D$ を定める。$A_i^{0,1}=0$ なので $D^{0,1}=\bar\partial_E$ である。

**計量両立性**。$H_i^*=H_i$ なので、複素共役・転置・微分形式の型交換を行うと

$$
\begin{aligned}
A_i^*H_i
&=(H_i^{-1}\partial H_i)^*H_i\\
&=(\partial H_i)^*(H_i^{-1})^*H_i\\
&=(\bar\partial H_i)\,H_i^{-1}H_i
=\bar\partial H_i,\\
H_iA_i&=\partial H_i.
\end{aligned}
$$

ゆえに $A_i^*H_i+H_iA_i=dH_i$。[計量両立性の行列方程式](#prop-cm2-10-metric-equation)により $D$ は $h$ と両立する。

**一意性**。別の両立接続 $\widetilde D$ を取り、任意の正則枠でその接続行列を $\widetilde A_i$ とする。正則構造との両立性により $\widetilde A_i^{0,1}=0$。したがって計量方程式の $(1,0)$ 部分は

$$
\partial H_i=H_i\widetilde A_i.
$$

各点で $H_i$ を左から逆行列で掛ければ $\widetilde A_i=H_i^{-1}\partial H_i=A_i$。局所表示が全て一致するため $\widetilde D=D$。$\square$
<!-- proof-end -->

この証明で必要なのは、$h$ の**滑らかさと正値性**、遷移行列の**正則性**である。計量 $H$ 自体が正則関数である必要はない。むしろ通常は $z$ と $\bar z$ の双方に依存する。接続を選ぶために局所で解いた方程式が、正則枠どうしで自動的に貼り合わさることが重要である。

## 5. 線束では対数微分、行列では積の順序

階数一では正値関数 $H=h>0$ の逆数と微分は可換なので、公式が一変数の対数微分と同じ形になる。

<a id="prop-cm2-10-line-formula"></a>

<!-- formal-statement-start -->
> **命題（正則線束のChern接続）**  
> 正則線束 $L\to X$ の滑らかなHermite計量を正則局所枠 $e_i$ で正値関数 $h_i$ と書く。対応するChern接続の接続1形式は

$$
A_i=h_i^{-1}\partial h_i=\partial\log h_i.
$$

> 重なりで $e_j=e_ig_{ij}$（$g_{ij}$ は非零正則関数）なら

$$
A_j=A_i+g_{ij}^{-1}\partial g_{ij}.
$$

> $\log g_{ij}$ の大域的な枝を仮定する必要はない。
<!-- formal-statement-end -->

### 証明の見取り図

局所では微分の連鎖律を使い、重なりでは $h_j=|g_{ij}|^2h_i$ の微分を使う。

<!-- proof-start -->
### 証明

$h_i>0$ より実数値関数 $\log h_i$ は滑らかで、

$$
\partial\log h_i=\frac{\partial h_i}{h_i}.
$$

重なりで $h_j=\bar g_{ij}g_{ij}h_i$ とし、$g_{ij}$ の正則性から $\partial\bar g_{ij}=0$ を用いると

$$
\begin{aligned}
\partial h_j
&=\bar g_{ij}\{(\partial g_{ij})h_i+g_{ij}\partial h_i\},\\
h_j^{-1}\partial h_j
&=(\bar g_{ij}g_{ij}h_i)^{-1}
\bar g_{ij}\{(\partial g_{ij})h_i+g_{ij}\partial h_i\}\\
&=g_{ij}^{-1}\partial g_{ij}+h_i^{-1}\partial h_i.
\end{aligned}
$$

$g_{ij}^{-1}\partial g_{ij}$ は枝を選ばず定義できる。$\square$
<!-- proof-end -->

階数二以上では $H^{-1}$ と $\partial H$ が一般に交換しない。したがって、$\partial(\log H)$ のような行列対数の微分を $H^{-1}\partial H$ と機械的に置き換えてはならない。証明で確定したのは **$H^{-1}\partial H$ という順序**である。

**行列の直接計算**。自明階数二束で、前章と同じ

$$
H(z)=
\begin{pmatrix}1+|z|^2&\bar z\\z&1\end{pmatrix}
=B(z)^*B(z),
\qquad
B(z)=\begin{pmatrix}1&0\\z&1\end{pmatrix}
$$

を用いる。$\det H=1$、$H$ は正値であり、

$$
H^{-1}=\begin{pmatrix}1&-\bar z\\-z&1+|z|^2\end{pmatrix},
\qquad
\partial H=\begin{pmatrix}\bar z&0\\1&0\end{pmatrix}dz.
$$

従って

$$
A=H^{-1}\partial H
=\begin{pmatrix}0&0\\1&0\end{pmatrix}dz.
$$

上三角・下三角の位置は積の順序と対応する。例えば定数切断 $s=e_1$ は $ds=0$ であっても $Ds=e_2\,dz$ となる。**係数が定数の切断でも、計量と整合させる補正が残る**のである。

## 6. 射影直線の $\mathcal O(-1)$ を二つの正則枠で追う

[射影直線の普遍線束](../CM2-06/index.md#def-cm2-06-tautological-bundle) $\mathcal O(-1)$ は、点 $[Z_0:Z_1]$ が表す直線そのものを繊維とする。標準チャート $U_0$ の座標を $z=Z_1/Z_0$、$U_\infty$ の座標を $w=Z_0/Z_1=1/z$ とし、局所正則枠を

$$
e_0=(1,z)^{\mathsf T},\qquad
e_\infty=(w,1)^{\mathsf T}=z^{-1}e_0
$$

と取る。$\mathbb C^2$ の標準内積から誘導した[自然Hermite計量](../CM2-09/index.md#def-cm2-09-hermitian-metric)では

$$
h_0=1+|z|^2,\qquad h_\infty=1+|w|^2.
$$

正則枠のもとで $h_0,h_\infty$ は単位計量とは限らない。これらの値から接続1形式を求める。

<a id="prop-cm2-10-tautological-connection"></a>

<!-- formal-statement-start -->
> **命題（普遍線束 $\mathcal O(-1)$ のChern接続）**  
> $X=\mathbb{CP}^1$ の $\mathcal O(-1)$ に、$\mathbb C^2$ の標準Hermite計量を制限する。上記の二つの正則枠ではChern接続の接続1形式は

$$
A_0=\frac{\bar z}{1+|z|^2}\,dz,\qquad
A_\infty=\frac{\bar w}{1+|w|^2}\,dw.
$$

> 重なり $z\ne0$ で、遷移関数 $g_{0\infty}=z^{-1}$ に対して

$$
A_\infty=A_0+g_{0\infty}^{-1}dg_{0\infty}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$A_0=\partial\log h_0$ と計算し、$w=1/z$ に代入して別チャート側の式へ直す。**1形式の変換では分母だけでなく $dw$ も変換する**必要がある。

<!-- proof-start -->
### 証明

$\partial |z|^2=\bar z\,dz$ なので、[線束の局所公式](#prop-cm2-10-line-formula)から

$$
A_0=h_0^{-1}\partial h_0
=\frac{\bar z}{1+z\bar z}\,dz.
$$

同じく $\partial |w|^2=\bar w\,dw$ より $A_\infty=\bar w(1+|w|^2)^{-1}dw$。$w=z^{-1}$ を使えば

$$
\begin{aligned}
\bar w&=\bar z^{-1},\\
1+|w|^2&=\frac{1+|z|^2}{|z|^2},\\
dw&=-z^{-2}dz.
\end{aligned}
$$

よって

$$
A_\infty
=\frac{\bar z^{-1}|z|^2}{1+|z|^2}
\left(-\frac{dz}{z^2}\right)
=-\frac{dz}{z(1+|z|^2)}.
$$

一方 $g_{0\infty}=z^{-1}$ で

$$
g_{0\infty}^{-1}dg_{0\infty}
=z\left(-z^{-2}dz\right)=-\frac{dz}{z},
$$

したがって

$$
A_0+g_{0\infty}^{-1}dg_{0\infty}
=\left(\frac{\bar z}{1+|z|^2}-\frac1z\right)dz
=-\frac{dz}{z(1+|z|^2)}
=A_\infty.
$$

両チャートの局所式が一つの大域的接続を与えることを、具体的に確かめた。$\square$
<!-- proof-end -->

複素座標に沿って $\partial h$ を計算するだけなら簡単だが、この例で重要なのは**両枠を接続変換則で照合したこと**である。接続は「接続1形式の組」であって、単一の数値関数ではない。

## 7. 単位枠は正則枠とは限らない

Chern接続の式 $A=H^{-1}\partial H$ は**正則枠**でのみ成立する。非正則な滑らかな枠を採用すると、接続自体は変わらないが、$(0,1)$ 成分も接続行列に現れる。

<a id="prop-cm2-10-smooth-unit-frame"></a>

<!-- formal-statement-start -->
> **命題（非正則単位枠での接続行列）**  
> 自明正則線束 $\mathbb C\times\mathbb C\to\mathbb C$ の正則標準枠 $e$ に、計量 $h(e,e)=e^{|z|^2}$ を入れる。このときChern接続は正則枠で

$$
A=\bar z\,dz
$$

> を持つ。一方、滑らかな単位枠 $u=e^{-|z|^2/2}e$ では

$$
A_u=\frac12(\bar z\,dz-z\,d\bar z).
$$

> これは $A_u^*=-A_u$ を満たし、$(0,1)$ 成分は一般に零ではない。
<!-- formal-statement-end -->

### 証明の見取り図

単位枠を作る係数 $g=e^{-|z|^2/2}$ は滑らかだが正則ではない。前節の正則枠公式を非正則枠へ使い回さず、**一般の接続行列の枠変更則**を用いる。

<!-- proof-start -->
### 証明

$H=e^{z\bar z}$ なので

$$
\partial H=\bar z e^{z\bar z}dz,\qquad
H^{-1}\partial H=\bar z\,dz.
$$

$u=eg$、$g=e^{-z\bar z/2}$ とすると

$$
h(u,u)=|g|^2e^{z\bar z}=e^{-z\bar z}e^{z\bar z}=1.
$$

[接続行列の枠変更則](#prop-cm2-10-connection-gauge)を**滑らかな** $g$ に適用し、

$$
\begin{aligned}
A_u
&=g^{-1}Ag+g^{-1}dg\\
&=\bar z\,dz+d(-z\bar z/2)\\
&=\bar z\,dz-\tfrac12(\bar z\,dz+z\,d\bar z)\\
&=\tfrac12(\bar z\,dz-z\,d\bar z).
\end{aligned}
$$

微分形式の共役では $\overline{\bar z\,dz}=z\,d\bar z$ なので、$\overline{A_u}=-A_u$ となる。単位枠では計量行列が $1$ だから、[計量両立性の行列方程式](#prop-cm2-10-metric-equation)は $0=A_u^*+A_u$ へ簡約する。この式を満たしている。さらに

$$
(A_u)^{0,1}=-\tfrac12z\,d\bar z,
$$

であって一般に零ではない。$u$ は正則枠でないため矛盾しない。$\square$
<!-- proof-end -->

この例は、計量行列が $1$ の枠だからといって接続行列が $0$ とは限らないことを示す。前章で証明した[正則な単位枠の障害](../CM2-09/index.md#prop-cm2-09-holomorphic-unit-obstruction)とも整合する。正則枠を選ぶと型 $(0,1)$ の情報が簡単になり、滑らかな単位枠を選ぶと計量の情報が簡単になる。通常は両方を同時には簡単にできない。

## 8. 束の演算とChern接続

[双対束・テンソル束・行列式束](../CM2-08/index.md#def-cm2-08-dual-bundle)を作ったとき、元の束の微分も自然に引き継ぐべきである。評価 $\lambda(s)$ の微分と、積 $s\otimes t$ の微分に積の法則を課すと、局所行列が決まる。

<a id="prop-cm2-10-induced-connections"></a>

<!-- formal-statement-start -->
> **命題（双対・テンソル積・行列式束のChern接続）**  
> 正則Hermite束 $(E,h)$、$(F,k)$ のChern接続を $D_E,D_F$、正則枠での接続行列を $A_E,A_F$ とする。前章の[誘導Hermite計量](../CM2-09/index.md#def-cm2-09-induced-metrics)を与えた各束では、対応するChern接続は次の局所行列を持つ。

$$
\begin{aligned}
A_{E^\vee}&=-A_E^{\mathsf T},\\
A_{E\otimes F}&=A_E\otimes I_{\operatorname{rank}F}
+I_{\operatorname{rank}E}\otimes A_F,\\
A_{\det E}&=\operatorname{tr}(A_E).
\end{aligned}
$$

> 行列 $\mathsf T$ は転置であって複素共役を含まない。双対接続では評価の積の法則、テンソル積では二つの因子の積の法則が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

双対では「評価を微分する」と逆符号・転置が現れる。テンソル積では各因子を一回ずつ微分する。計量との両立と $(0,1)$ 条件を確認すれば、[存在・一意性定理](#thm-cm2-10-chern-existence-uniqueness)でそれが誘導計量のChern接続と分かる。

<!-- proof-start -->
### 証明

**双対**。正則枠で $\lambda=\mathcal E^\vee\ell$、$s=\mathcal E v$ と書けば $\lambda(s)=\ell^{\mathsf T}v$ である。評価が接続で積の法則を満たすように $D_{E^\vee}\ell=d\ell+B\ell$ と置くと、

$$
\begin{aligned}
d(\ell^{\mathsf T}v)
&=(d\ell)^{\mathsf T}v+\ell^{\mathsf T}dv,\\
(D_{E^\vee}\ell)^{\mathsf T}v+\ell^{\mathsf T}D_Ev
&=(d\ell)^{\mathsf T}v+\ell^{\mathsf T}B^{\mathsf T}v
+\ell^{\mathsf T}dv+\ell^{\mathsf T}Av.
\end{aligned}
$$

全ての $\ell,v$ で一致するには $B^{\mathsf T}+A=0$、すなわち $B=-A^{\mathsf T}$ が必要十分である。正則双対枠で $B$ は $(1,0)$ 型である。

前章の[双対計量行列](../CM2-09/index.md#prop-cm2-09-induced-matrices)は $H^\vee=(H^{-1})^{\mathsf T}$。逆行列の微分より

$$
\partial H^{-1}=-H^{-1}(\partial H)H^{-1}
$$

となるので

$$
\begin{aligned}
(H^\vee)^{-1}\partial H^\vee
&=H^{\mathsf T}\bigl(\partial H^{-1}\bigr)^{\mathsf T}\\
&=-H^{\mathsf T}(H^{-1})^{\mathsf T}
(\partial H)^{\mathsf T}(H^{-1})^{\mathsf T}\\
&=-(H^{-1}\partial H)^{\mathsf T}=-A^{\mathsf T}.
\end{aligned}
$$

よって双対誘導接続は双対計量のChern接続と一致する。

**テンソル積**。切断 $s=\mathcal E v$、$t=\mathcal Fw$ に対し

$$
D_{E\otimes F}(s\otimes t)
=(D_Es)\otimes t+s\otimes(D_Ft)
$$

と定める。係数は $v\otimes w$、その微分は $dv\otimes w+v\otimes dw$。残りの項は

$$
(A_Ev)\otimes w+v\otimes(A_Fw)
=(A_E\otimes I+I\otimes A_F)(v\otimes w).
$$

ゆえに主張の行列になる。誘導計量行列は $H\otimes K$ で、積の微分から

$$
\begin{aligned}
(H\otimes K)^{-1}\partial(H\otimes K)
&=(H^{-1}\otimes K^{-1})
\{(\partial H)\otimes K+H\otimes(\partial K)\}\\
&=(H^{-1}\partial H)\otimes I+I\otimes(K^{-1}\partial K).
\end{aligned}
$$

よって正則構造・計量との両立性を満たす。

**行列式**。$e_1\wedge\cdots\wedge e_r$ を行列式束の正則枠とする。接続で各 $e_a$ を微分する積の法則を使うと

$$
\sum_{a=1}^r e_1\wedge\cdots\wedge
\Bigl(\sum_b e_b(A_E)_{ba}\Bigr)\wedge\cdots\wedge e_r
=\Bigl(\sum_a(A_E)_{aa}\Bigr)e_1\wedge\cdots\wedge e_r.
$$

$b\ne a$ の項には同じ基底が二回現れ外積が零になる。従って接続1形式は $\operatorname{tr}A_E$ である。誘導計量は $\det H$。各点で $H$ は可逆であり、

$$
\det(H+tK)=\det H\,\det(I+tH^{-1}K)
=\det H\{1+t\operatorname{tr}(H^{-1}K)+O(t^2)\}
$$

と展開できる。最後の一次項は行列式の列ごとの多重線形性による。$K=dH$ の各微分方向に適用すれば

$$
\partial\log\det H=\operatorname{tr}(H^{-1}\partial H)
=\operatorname{tr}A_E.
$$

したがって行列式束でも同じChern接続が得られる。$\square$
<!-- proof-end -->

三つの公式は、単に行列を操作して得られた偶然ではない。**双対では評価、テンソル積では積の法則、行列式では交代性**という操作が、接続と整合するように決まっている。

## 9. 何が一意性を生んでいるか

「計量を保つ」だけでは接続は一意ではない。例えば自明線束の定数計量 $h=1$ では、実数値1形式 $\beta$ に対して $D=d+i\beta$ とすれば

$$
A^*+A=(-i\beta)+(i\beta)=0.
$$

従って $D$ は計量と両立するが、$\beta\ne0$ のとき $D^{0,1}$ は通常の $\bar\partial$ と一致しない。反対に $D^{0,1}=\bar\partial$ だけを指定すれば、$D=d+\alpha$（$\alpha$ は任意の $(1,0)$ 形式）が全て許される。両方を課して初めて、一意な $A=H^{-1}\partial H$ が得られる。

## 10. 演習：局所行列から大域的な接続まで

単なる公式への代入だけでなく、どこで正則性・正値性・積の法則を使っているかも確認する。以下の接続行列は、特に断らない限り**正則局所枠**で表示する。

### Level A

<a id="ex-cm2-10-a01"></a>
#### CM2-10-A01 接続のLeibniz則を検算する
- Level: A

$\mathbb C$ 上の自明階数二束の標準枠で $A=\begin{pmatrix}0&dz\\0&0\end{pmatrix}$ とし、$D(v)=dv+Av$ と定める。$v=(z,\bar z)^{\mathsf T}$ と $f=z^2$ について $D(fv)=df\,v+fDv$ を両辺から具体計算して示せ。

<!-- solution-start -->
**詳細解答**。まず

$$
dv=\binom{dz}{d\bar z},\quad
Av=\binom{\bar z\,dz}{0},\quad
Dv=\binom{(1+\bar z)dz}{d\bar z}.
$$

$f=z^2$ より $df=2z\,dz$。従って

$$
df\,v+fDv
=\binom{2z^2dz+z^2(1+\bar z)dz}
{2z\bar z\,dz+z^2d\bar z}
=\binom{z^2(3+\bar z)dz}{2z\bar z\,dz+z^2d\bar z}.
$$

一方 $fv=(z^3,z^2\bar z)^{\mathsf T}$ で

$$
d(fv)=\binom{3z^2dz}{2z\bar z\,dz+z^2d\bar z},
\qquad
A(fv)=\binom{z^2\bar z\,dz}{0}.
$$

和は同じ列になる。したがって積の法則を具体的に確認できた。
<!-- solution-end -->

<a id="ex-cm2-10-a02"></a>
#### CM2-10-A02 正値関数から接続を求める
- Level: A

$\mathbb C$ 上の自明正則線束で $h(e,e)=e^{2|z|^2}$ とする。接続1形式 $A$ と $D(fe)$ の式を求め、$f=z$ について計算せよ。

<!-- solution-start -->
**詳細解答**。計量 $h_0=e^{2z\bar z}>0$ より

$$
\partial h_0=2\bar z e^{2z\bar z}dz,\qquad
A=h_0^{-1}\partial h_0=2\bar z\,dz.
$$

よって

$$
D(fe)=e(df+2\bar z f\,dz).
$$

$f=z$ を代入すると $df=dz$ だから

$$
D(ze)=e\{(1+2|z|^2)dz\}.
$$

零次の係数 $z$ は正則でも、計量が非定数なので補正項は消えない。
<!-- solution-end -->

<a id="ex-cm2-10-a03"></a>
#### CM2-10-A03 計量両立式の両辺を確かめる
- Level: A

自明階数二束で $H=\operatorname{diag}(e^{|z|^2},4)$ とする。$A=H^{-1}\partial H$ を求め、$dH=A^*H+HA$ を各成分で確かめよ。

<!-- solution-start -->
**詳細解答**。逆行列と型別微分は

$$
H^{-1}=\operatorname{diag}(e^{-|z|^2},1/4),
\quad
\partial H=\operatorname{diag}(\bar z e^{|z|^2}dz,0).
$$

従って $A=\operatorname{diag}(\bar z\,dz,0)$。その随伴は $A^*=\operatorname{diag}(z\,d\bar z,0)$ である。したがって

$$
\begin{aligned}
A^*H+HA
&=\operatorname{diag}\bigl(e^{|z|^2}(z\,d\bar z+\bar z\,dz),0\bigr),\\
dH
&=\operatorname{diag}\bigl(d(e^{z\bar z}),0\bigr)\\
&=\operatorname{diag}\bigl(e^{|z|^2}(\bar z\,dz+z\,d\bar z),0\bigr).
\end{aligned}
$$

一致した。特に $A^*$ では1形式の型も変わる。
<!-- solution-end -->

<a id="ex-cm2-10-a04"></a>
#### CM2-10-A04 正則枠変更は接続をどう変えるか
- Level: A

標準計量 $H_0=1$ の自明線束で、非零正則関数 $g(z)=e^z$ により枠を $e_1=e_0g$ と変える。$H_1$ と接続1形式 $A_0,A_1$ を求めよ。

<!-- solution-start -->
**詳細解答**。枠変更による計量は

$$
H_1=|g|^2H_0=e^{z+\bar z}.
$$

$A_0=H_0^{-1}\partial H_0=0$。一方

$$
A_1=H_1^{-1}\partial H_1
=e^{-z-\bar z}e^{z+\bar z}dz=dz.
$$

[枠変更公式](#prop-cm2-10-connection-gauge)によっても

$$
A_1=A_0+g^{-1}dg=0+e^{-z}e^z dz=dz
$$

と求まる。$A_1$ が零でなくても、接続 $D$ 自体は枠変更前と同一である。
<!-- solution-end -->

<a id="ex-cm2-10-a05"></a>
#### CM2-10-A05 行列値計量の積順序
- Level: A

$H=B^*B$、$B=\begin{pmatrix}1&0\\z&1\end{pmatrix}$ とする。$A=H^{-1}\partial H$ を計算し、$A=\partial H\,H^{-1}$ とは一般に一致しないことを $z=1$ で示せ。

<!-- solution-start -->
**詳細解答**。本文の計算を最初から行うと

$$
H=\begin{pmatrix}1+|z|^2&\bar z\\z&1\end{pmatrix},
\quad
H^{-1}=\begin{pmatrix}1&-\bar z\\-z&1+|z|^2\end{pmatrix},
\quad
\partial H=\begin{pmatrix}\bar z&0\\1&0\end{pmatrix}dz.
$$

左から $H^{-1}$ を掛ければ

$$
A=\begin{pmatrix}0&0\\1&0\end{pmatrix}dz.
$$

$z=1$ では $\partial H=\begin{pmatrix}1&0\\1&0\end{pmatrix}dz$、$H^{-1}=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$ だから

$$
(\partial H)H^{-1}=
\begin{pmatrix}1&-1\\1&-1\end{pmatrix}dz
\ne \begin{pmatrix}0&0\\1&0\end{pmatrix}dz.
$$

非可換な行列では積の順序を入れ替えられない。
<!-- solution-end -->

### Level B

<a id="ex-cm2-10-b01"></a>
#### CM2-10-B01 $\mathcal O(-1)$ の接続を二チャートで照合する
- Level: B

$\mathbb{CP}^1$ の $\mathcal O(-1)$ で $e_0=(1,z)$、$e_\infty=(w,1)$、$w=1/z$、標準計量を使う。$A_0,A_\infty$ を独立に求め、$A_\infty=A_0+g^{-1}dg$ を示せ。さらに $z=1$ で $A_0$ と変換後 $A_\infty$ の係数が等しくない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$h_0=1+|z|^2$、$h_\infty=1+|w|^2$ なので[線束の公式](#prop-cm2-10-line-formula)から

$$
A_0=\frac{\bar z}{1+|z|^2}dz,\quad
A_\infty=\frac{\bar w}{1+|w|^2}dw.
$$

$e_\infty=z^{-1}e_0$ より $g=z^{-1}$、従って

$$
g^{-1}dg=z(-z^{-2}dz)=-z^{-1}dz.
$$

$w=z^{-1}$、$dw=-z^{-2}dz$ を代入すると

$$
\begin{aligned}
A_\infty&=\frac{1/\bar z}{1+1/|z|^2}(-z^{-2}dz)\\
&=-\frac{dz}{z(1+|z|^2)},\\
A_0+g^{-1}dg&=
\frac{\bar z}{1+|z|^2}dz-\frac{dz}{z}
=-\frac{dz}{z(1+|z|^2)}.
\end{aligned}
$$

従って一致する。$z=1$ なら $A_0=\tfrac12dz$、$A_\infty=-\tfrac12dz$ である。同じ接続でも、異なる枠の接続1形式は一般に**同じ係数を持たない**。座標も $dw=-dz$ と変わることを忘れてはならない。
<!-- solution-end -->

<a id="ex-cm2-10-b02"></a>
#### CM2-10-B02 双対・テンソル積の符号と加法
- Level: B

自明な二つの正則線束 $L,M$ の正則標準枠で、$h_L=e^{|z|^2}$、$h_M=e^{2|z|^2}$ とする。$L^\vee$ と $L\otimes M$ の誘導Hermite計量から接続1形式を直接求め、元の接続の符号反転・和と一致することを示せ。

<!-- solution-start -->
**詳細解答**。まず

$$
A_L=\partial\log e^{|z|^2}=\bar z\,dz,\qquad
A_M=\partial\log e^{2|z|^2}=2\bar z\,dz.
$$

双対計量は逆数なので $h_{L^\vee}=e^{-|z|^2}$。よって

$$
A_{L^\vee}=\partial\log e^{-|z|^2}
=-\bar z\,dz=-A_L.
$$

テンソル積計量は積であり $h_{L\otimes M}=e^{3|z|^2}$、従って

$$
A_{L\otimes M}
=\partial\log e^{3|z|^2}
=3\bar z\,dz=A_L+A_M.
$$

これは[誘導接続の公式](#prop-cm2-10-induced-connections)と一致する。双対で複素共役を取るのではなく、正則双対枠における接続行列の負の転置を取る点にも注意する。
<!-- solution-end -->

<a id="ex-cm2-10-b03"></a>
#### CM2-10-B03 非正則単位枠での $(0,1)$ 成分
- Level: B

$\mathbb C$ 上の自明線束に計量 $h(e,e)=e^{2|z|^2}$ を入れる。$u=e^{-|z|^2}e$ が単位枠であること、そこでの接続1形式を求め、正則枠の式 $H_u^{-1}\partial H_u=0$ が使えない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$g=e^{-|z|^2}$ と置くと $|g|^2h(e,e)=e^{-2|z|^2}e^{2|z|^2}=1$ なので $u=eg$ は滑らかな単位枠である。正則枠 $e$ では

$$
A_e=\partial\log e^{2z\bar z}=2\bar z\,dz.
$$

一方 $dg/g=-d(z\bar z)=-(\bar z\,dz+z\,d\bar z)$。一般の[枠変更則](#prop-cm2-10-connection-gauge)を用いれば

$$
A_u=A_e+g^{-1}dg
=\bar z\,dz-z\,d\bar z.
$$

$A_u^*=-A_u$ により計量両立性が分かる。ところが $\bar\partial g=-zg\,d\bar z$ は一般に零ではなく、$u$ は正則枠でない。従って正則枠だけで成立する $A=H^{-1}\partial H$ を $H_u=1$ に適用してはいけない。$(A_u)^{0,1}=-z\,d\bar z$ は消えない。
<!-- solution-end -->

<a id="ex-cm2-10-b04"></a>
#### CM2-10-B04 片方の条件だけでは一意でない
- Level: B

$\mathbb C$ 上の自明正則線束に標準計量 $h(e,e)=1$ を入れる。$(i)$ $\beta=dx$ として $D_1=d+i\beta$ が計量両立だが正則構造両立でないことを示せ。$(ii)$ $D_2=d+dz$ が正則構造両立だが計量両立でないことを示せ。ここで $z=x+iy$ である。

<!-- solution-start -->
**詳細解答**。$(i)$ $A_1=i\,dx$ は実1形式 $dx$ の純虚数倍であり、$A_1^*=-i\,dx$。標準計量は $H=1$ で $dH=0$ だから

$$
A_1^*H+HA_1=-i\,dx+i\,dx=0.
$$

よって計量両立。しかし $dx=(dz+d\bar z)/2$ により

$$
(A_1)^{0,1}=\frac{i}{2}d\bar z\ne0,
$$

なので正則構造とは両立しない。

$(ii)$ $A_2=dz$ は $(1,0)$ 型なので $(A_2)^{0,1}=0$、従って正則構造と両立する。しかし

$$
A_2^*H+HA_2=d\bar z+dz=2dx\ne0=dH.
$$

ゆえに計量とは両立しない。二条件を合わせて初めてChern接続が一意になる。
<!-- solution-end -->

### Level C

<a id="ex-cm2-10-c01"></a>
#### CM2-10-C01 階数二の枠変更と誘導接続を総合する
- Level: C

$\mathbb C$ 上の階数二の自明正則束に、正則標準枠 $\mathcal E_0$ で

$$
B(z)=\begin{pmatrix}1&0\\z&1\end{pmatrix},
\quad H_0=B^*B,
\quad
G(z)=\begin{pmatrix}1&z\\0&1\end{pmatrix},
\quad \mathcal E_1=\mathcal E_0G
$$

を与える。$(1)$ $H_0$ の正値性を証明し $A_0$ を求めよ。$(2)$ $H_1=G^*H_0G$ と $A_1=H_1^{-1}\partial H_1$ を、$B,G$ の積を利用して求めよ。$(3)$ $A_1=G^{-1}A_0G+G^{-1}dG$ を行列で確認せよ。$(4)$ 双対束の正則枠における接続行列 $A_1^\vee$ を書き、評価の積の法則を説明せよ。

<!-- solution-start -->
**詳細解答**。$(1)$ $B$ は $\det B=1$ なので全ての $z$ で可逆である。従って非零列 $v$ に対し

$$
v^*H_0v=v^*B^*Bv=\|Bv\|^2>0.
$$

直接掛けると

$$
H_0=\begin{pmatrix}1+|z|^2&\bar z\\z&1\end{pmatrix},\quad
H_0^{-1}=\begin{pmatrix}1&-\bar z\\-z&1+|z|^2\end{pmatrix},\quad
\partial H_0=\begin{pmatrix}\bar z&0\\1&0\end{pmatrix}dz.
$$

このため

$$
A_0=H_0^{-1}\partial H_0
=\begin{pmatrix}0&0\\1&0\end{pmatrix}dz.
$$

$(2)$ $C=BG$ と置くと

$$
C=\begin{pmatrix}1&z\\z&1+z^2\end{pmatrix},
\quad \det C=1,\quad H_1=C^*C.
$$

$C$ は正則なので $\partial C^*=0$。よって

$$
\partial H_1=C^*(\partial C),\qquad
H_1^{-1}=C^{-1}(C^*)^{-1}
$$

から

$$
A_1=C^{-1}\partial C.
$$

ここで

$$
C^{-1}=\begin{pmatrix}1+z^2&-z\\-z&1\end{pmatrix},\qquad
\partial C=\begin{pmatrix}0&1\\1&2z\end{pmatrix}dz.
$$

行列積は

$$
A_1=
\begin{pmatrix}-z&1-z^2\\1&z\end{pmatrix}dz.
$$

$(3)$ $G^{-1}=\begin{pmatrix}1&-z\\0&1\end{pmatrix}$ であり、

$$
A_0G=\begin{pmatrix}0&0\\1&z\end{pmatrix}dz,\quad
G^{-1}A_0G=\begin{pmatrix}-z&-z^2\\1&z\end{pmatrix}dz.
$$

また

$$
dG=\begin{pmatrix}0&dz\\0&0\end{pmatrix},
\quad
G^{-1}dG=\begin{pmatrix}0&dz\\0&0\end{pmatrix}.
$$

加えると $(2)$ と一致する。特に $A_0$ と $A_1$ の係数は違うが、二つは**同一の大域的接続の局所表示**である。

$(4)$ [双対接続の公式](#prop-cm2-10-induced-connections)を適用すれば

$$
A_1^\vee=-A_1^{\mathsf T}
=\begin{pmatrix}z&-1\\z^2-1&-z\end{pmatrix}dz.
$$

正則双対枠の列係数を $\ell$、元の束の係数を $v$ とする。評価 $\ell^{\mathsf T}v$ に対し、

$$
\begin{aligned}
(D^\vee\ell)^{\mathsf T}v+\ell^{\mathsf T}Dv
&=(d\ell-A_1^{\mathsf T}\ell)^{\mathsf T}v
+\ell^{\mathsf T}(dv+A_1v)\\
&=(d\ell)^{\mathsf T}v-\ell^{\mathsf T}A_1v
+\ell^{\mathsf T}dv+\ell^{\mathsf T}A_1v\\
&=d(\ell^{\mathsf T}v).
\end{aligned}
$$

二つの補正項が打ち消し合う。$\square$
<!-- solution-end -->

## 11. 次章：接続から何を測るか

本章で構成した $D$ は、各正則局所枠で $A=H^{-1}\partial H$ と一意に書ける。しかし二回微分したときに $D$ が元へ戻るとは限らない。次章ではそのずれを**Chern曲率**として計算し、線束 $\mathcal O(\pm1)$ の具体例から大域的な束の情報へつなぐ。
