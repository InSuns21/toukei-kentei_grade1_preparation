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
