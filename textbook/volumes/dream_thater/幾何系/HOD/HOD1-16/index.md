# HOD1-16 楕円曲線の周期と総合演習

<!-- definition-example-audit: strict -->

前講義では、有理コホモロジーの複素化と[重さ付き純Hodge構造](../HOD1-15/index.md#def-hod1-15-pure-hodge)を学んだ。しかし $h^{1,0}=h^{0,1}=1$ という数字だけでは、複素直線 $H^{1,0}$ が有理格子に対してどちらへ傾いているか分からない。楕円曲線では、その傾きを二本の閉路に沿った積分で測れる。

この講義では[楕円曲線の周期の直接計算](../HOD1-09/index.md#prop-hod1-09-elliptic-periods)を出発点に、その値の**意味**を有理Hodge構造・正値性・基底変更から解き直す。最後に[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)からHard Lefschetzまでの証明の経路を一つの模型で再構成する。

## 1. 周期を測るための整数基底

$\tau=a+ib$、$b>0$ とし、$\Lambda_\tau=\mathbb Z+\tau\mathbb Z$、$E_\tau=\mathbb C/\Lambda_\tau$ とする。$b>0$ により $1,\tau$ は実線形独立で、商はコンパクトな実二次元トーラスとなる。

実数 $u,v$ を用いて $z=u+\tau v$ と書けば、$u,v$ の整数だけの変更は同じ点を表す。ここで微分 $d$ は**固定した $E_\tau$ 上の座標 $u,v$ に関する外微分**であって、曲線のパラメータ $\tau$ は動かさない。従って連鎖律（線形座標変換の微分）から

$$
dz=\frac{\partial z}{\partial u}du+\frac{\partial z}{\partial v}dv
=du+\tau\,dv,\qquad
d\bar z=du+\bar\tau\,dv
$$

となる。$du,dv$ は商上の大域的な実閉一次形式である。二本の向き付けられた基本閉路を

$$
\gamma_1(t)=[t],\qquad \gamma_2(t)=[\tau t]\quad (0\le t\le1)
$$

とする。$\gamma_1$ では $(u,v)=(t,0)$、$\gamma_2$ では $(u,v)=(0,t)$ である。複素一次形式を積分する際も、これらの実閉路を用いる。

<a id="def-hod1-16-dual-period-basis"></a>

<!-- formal-statement-start -->
> **定義（基本閉路に双対な周期基底）**
> $b=\operatorname{Im}\tau>0$ の楕円曲線 $E_\tau$ 上で、上の $\gamma_1,\gamma_2$ に対し、周期が

$$
\left(\int_{\gamma_j}e_i\right)_{i,j=1,2}
=\begin{pmatrix}1&0\\0&1\end{pmatrix}
$$

> となる整数係数一次コホモロジーの基底 $e_1=[du],e_2=[dv]$ を、基本閉路に双対な周期基底と呼ぶ。$[du]\smile[dv]$ が正の向きの基本二次類を表すように向きを固定する。
<!-- formal-statement-end -->

ここで「整数係数」とは係数が点ごとに整数という意味ではない。$du,dv$ の閉路周期が整数であることに対応し、実トーラス $(\mathbb R/\mathbb Z)^2$ の整数コホモロジー基底を与えるという意味である。実際、任意の整数一次ホモロジー類は $m\gamma_1+n\gamma_2$（$m,n\in\mathbb Z$）と書け、その上の $du,dv$ の周期はそれぞれ $m,n$ になる。[有理コホモロジーの複素化](../HOD1-15/index.md#def-hod1-15-rational-complexification)では、この基底を固定してから複素係数を使う。

<!-- definition-example-start: def-hod1-16-dual-period-basis -->
**定義の確認**：$E_i$。$z=u+iv$ だから $dz=du+i\,dv$。上で与えたパラメータ表示へ引き戻すと

$$
\int_{\gamma_1}du=\int_0^1dt=1,\quad
\int_{\gamma_1}dv=0,\quad
\int_{\gamma_2}du=0,\quad
\int_{\gamma_2}dv=\int_0^1dt=1.
$$

基本領域 $0\le u,v\le1$ の向き $du\wedge dv$ に対して $\int_{E_i}du\wedge dv=1$。これで定義の四つの周期条件と向きの条件を直接確かめた。
<!-- definition-example-end -->

## 2. 周期はHodge直線をどう記録するか

既に[平坦トーラスの調和形式の定数性](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)を証明しているため、$H^{1,0}(E_\tau)$ の生成元は定数係数の $dz$ である。$dz$ の周期 $1,\tau$ は前講義までに積分済みだが、それを実コホモロジー基底で書けば

$$
[dz]=e_1+\tau e_2,\qquad [d\bar z]=e_1+\bar\tau e_2.
$$

「一本の正則形式から二つの複素数が出る」のは、Hodge直線を有理二次元空間の複素化へ配置しているからである。

<a id="thm-hod1-16-period-hodge-line"></a>

<!-- formal-statement-start -->
> **定理（周期から得る重さ1のHodge直線）**
> $\tau=a+ib$、$b>0$、$E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ とし、$e_1=[du],e_2=[dv]$ を上の整数周期双対基底とする。重さ1の[Hodgeフィルトレーション](../HOD1-15/index.md#def-hod1-15-filtration)は

$$
F^1H^1(E_\tau;\mathbb C)
=H^{1,0}(E_\tau)=\mathbb C(e_1+\tau e_2)
$$

> であり、$F^0=H^1(E_\tau;\mathbb C)$、$F^2=0$ である。非零正則一次形式 $\eta=\lambda dz$ の二周期は $(\lambda,\lambda\tau)$ で、比 $\int_{\gamma_2}\eta/\int_{\gamma_1}\eta=\tau$ は $\lambda\ne0$ の選択によらない。さらに

$$
H^1(E_\tau;\mathbb C)=F^1\oplus\overline{F^1}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

正則調和形式の次元が1なので $dz$ で十分。積分の比では形式のスカラー倍が消える。直和性は二つの生成元を整数基底に並べた行列式の非零性で調べる。

<!-- proof-start -->
### 証明

[複素トーラスのHodge数](../HOD1-09/index.md#thm-hod1-09-torus-numbers)に複素次元 $n=1$ を代入すると $h^{1,0}=1$。$dz$ は定数係数の非零調和 $(1,0)$ 形式なので、[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を通じてその類が $H^{1,0}$ を生成する。$z=u+\tau v$ を微分すれば

$$
dz=du+\tau\,dv.
$$

双対基底の周期条件を一つずつ代入すると

$$
\int_{\gamma_1}(\lambda dz)
=\lambda(1+\tau\cdot0)=\lambda,\qquad
\int_{\gamma_2}(\lambda dz)
=\lambda(0+\tau\cdot1)=\lambda\tau.
$$

$\lambda\ne0$ なので第一周期は零でなく、比は $\tau$ となる。重さ1のフィルトレーションは第一添字1の成分だけを $F^1$ に残すため、表示式を得る。

有理基底を固定した複素共役は $e_j$ を固定する。二本の列 $e_1+\tau e_2$、$e_1+\bar\tau e_2$ の基底行列は

$$
\begin{pmatrix}1&1\\\tau&\bar\tau\end{pmatrix},
\qquad \det=\bar\tau-\tau=-2ib\ne0.
$$

従って二本は複素一次独立で、二次元全体を直和で張る。$\square$
<!-- proof-end -->

**見方の違い。** $E_i$ と $E_{2i}$ はいずれも $h^{1,0}=h^{0,1}=1$ である。一方、各々の基本閉路に双対な基底を同じ記号 $(e_1,e_2)$ で**標識付けして比較**すれば、Hodge直線は $\mathbb C(e_1+i e_2)$ と $\mathbb C(e_1+2i e_2)$ で異なる。Hodge数は次元を数え、周期は標識付き有理格子に対する直線の位置を測る。ただし標識を替えれば同じ曲線の周期も変わり得る。次節でその曖昧さを精確にする。

## 3. 閉路基底を替えると$\tau$はどう変わるか

整数コホモロジーを固定したまま閉路を選び直す。$\tau$ の実部と混同しないよう、閉路変換の整数行列の成分を $r,s,t,u$ と書く。列ベクトルで閉路を並べる約束なら

$$
\begin{pmatrix}\gamma'_1\\\gamma'_2\end{pmatrix}
=\underbrace{\begin{pmatrix}r&s\\t&u\end{pmatrix}}_{N}
\begin{pmatrix}\gamma_1\\\gamma_2\end{pmatrix}.
$$

新閉路に双対なコホモロジー基底 $e'_1,e'_2$ は $\int_{\gamma'_j}e'_i=\delta_{ij}$ で決まる。旧基底の周期行列が単位行列だから、$e'_i=\sum_k C_{ik}e_k$ と展開した新旧の係数行列 $C$ には $CN^{\mathsf T}=I$ が必要である。従って、$\det N=1$ なら

$$
\begin{pmatrix}e'_1\\e'_2\end{pmatrix}
=(N^{-1})^{\mathsf T}\begin{pmatrix}e_1\\e_2\end{pmatrix}
=\begin{pmatrix}u&-t\\-s&r\end{pmatrix}
\begin{pmatrix}e_1\\e_2\end{pmatrix}.
$$

この逆転置が「閉路を変えると双対基底も変わる」理由である。また[双線形形式の基底表示](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix)に従い $Q(e'_1,e'_2)=(ru-st)Q(e_1,e_2)$ となる。後の総合演習でも、この式で向きと正値性を検算する。

向きを保つ基底変更とは $ru-st=1$ の場合である。これは二本の新しい閉路が整数ホモロジー群の基底であり、基本交叉数の符号が保存される条件でもある。

<a id="thm-hod1-16-period-basis-change"></a>

<!-- formal-statement-start -->
> **定理（基底変更と周期パラメータの変換）**
> $\operatorname{Im}\tau>0$ とし、整数 $r,s,t,u$ が $ru-st=1$ を満たすとする。向きを保つ新しい閉路基底を

$$
\gamma'_1=r\gamma_1+s\gamma_2,\qquad
\gamma'_2=t\gamma_1+u\gamma_2
$$

> と選ぶ。$dz$ の第一周期で規格化した新しい周期パラメータは

$$
\tau'=\frac{t+u\tau}{r+s\tau},\qquad
\operatorname{Im}\tau'
=\frac{\operatorname{Im}\tau}{|r+s\tau|^2}>0.
$$

> また $z'=z/(r+s\tau)$ とすれば、格子 $\mathbb Z+\tau\mathbb Z$ を新しい基底で記述した商は $\mathbb C/(\mathbb Z+\tau'\mathbb Z)$ と正則同型である。
<!-- formal-statement-end -->

### 証明の見取り図

周期は閉路に関して整数線形である。$ru-st=1$ によって新しい格子生成元も同じ格子を張る。虚部は分母の共役を掛けて計算すれば符号が決まる。

<!-- proof-start -->
### 証明

前定理の周期 $(1,\tau)$ を線形結合すると

$$
A=\int_{\gamma'_1}dz=r+s\tau,\qquad
B=\int_{\gamma'_2}dz=t+u\tau.
$$

$A=0$ なら $\tau=-r/s$ は実数（$s=0$ なら $r=0$）となり、いずれも $\operatorname{Im}\tau>0$ または $ru-st=1$ に反する。よって $A\ne0$。$\eta'=dz/A$ の周期は $(1,B/A)$ となる。

整数行列の逆は $\left(\begin{smallmatrix}u&-s\\-t&r\end{smallmatrix}\right)$ であり、これも整数行列である。従って $A,B$ は $1,\tau$ と**同じ格子**を生成する。座標の複素線形変換 $z'=z/A$ はその格子を $\mathbb Z+(B/A)\mathbb Z$ に移し、商に正則同型を誘導する。

虚部について $\tau=x+iy$（$y>0$）と置き、分子と分母の積を展開すると

$$
\begin{aligned}
\operatorname{Im}\frac{t+u\tau}{r+s\tau}
&=\frac{\operatorname{Im}\{(t+u\tau)(r+s\bar\tau)\}}{|r+s\tau|^2}\\
&=\frac{\operatorname{Im}(ur\tau+ts\bar\tau)}{|r+s\tau|^2}\\
&=\frac{(ur-ts)y}{|r+s\tau|^2}
=\frac{y}{|r+s\tau|^2}>0.
\end{aligned}
$$

実数項 $tr+us|\tau|^2$ の虚部は零である。$\square$
<!-- proof-end -->

**二つの基底変更。**

- $\gamma'_1=\gamma_1$、$\gamma'_2=\gamma_1+\gamma_2$ なら $(r,s,t,u)=(1,0,1,1)$ で $\tau'=\tau+1$。格子そのものは変わらない。
- $\gamma'_1=-\gamma_2$、$\gamma'_2=\gamma_1$ なら $(r,s,t,u)=(0,-1,1,0)$ で $\tau'=-1/\tau$。$\tau=i$ なら再び $i$、$\tau=2i$ なら $i/2$ となる。

どちらも行列式が1で、虚部が正のままである。$\det=-1$ の単なる閉路交換では $\operatorname{Im}\tau'$ は負になり、**向きの固定**を失う。この違いは複素構造そのものが消えたという意味ではない。

## 4. 正値条件はなぜ上半平面を選ぶか

ここでいう複素数の**上半平面**は、単に虚部が正である集合 $\{z\in\mathbb C:\operatorname{Im}z>0\}$ のことである。モジュラー形式の理論を前提にするわけではない。

整数基底 $e_1,e_2$ の交叉形式は

$$
Q(\alpha,\beta)=\int_{E_\tau}\alpha\wedge\beta,\qquad
Q(e_1,e_2)=1,\quad Q(e_j,e_j)=0.
$$

重さ1の[polarizationの定義](../HOD1-15/index.md#def-hod1-15-polarization)では、$v\in H^{1,0}\setminus\{0\}$ に対して $i^{-1}Q(\bar v,v)=-iQ(\bar v,v)>0$ が必要である。ここから、楕円曲線を先に与えず「どの複素直線が許されるか」を調べられる。

この二次元の模型で $Q$ は複素双線形に延長した**交代**形式であり、一次元の $F=\mathbb Cv$ に対して $Q(F,F)=0$ は $Q(v,v)=0$ から従う。$\bar F$ でも同様なので、上記のpolarization条件P2は自動的に成立する。残る非自明な検査は、有理格子からの共役に関する直和性とP3の正値性である。ここでは第1変数を共役するHermite形式と、両変数で複素線形な $Q$ 自身を混同しない。

<a id="def-hod1-16-positive-hodge-line"></a>

<!-- formal-statement-start -->
> **定義（正の重さ1のHodge直線）**
> $V_{\mathbb Z}=\mathbb Ze_1\oplus\mathbb Ze_2$ に $Q(e_1,e_2)=1$ なる整数交代双線形形式 $Q$ を与える。複素直線 $F\subset V_{\mathbb C}$ が正の重さ1のHodge直線であるとは、

$$
V_{\mathbb C}=F\oplus\bar F,\qquad
-iQ(\bar v,v)>0\quad(0\ne v\in F)
$$

> を満たすことをいう。共役は $V_{\mathbb Z}$ の元を固定する。
<!-- formal-statement-end -->

<a id="thm-hod1-16-positive-line-half-plane"></a>

<!-- formal-statement-start -->
> **定理（正のHodge直線と上半平面）**
> 上の $V_{\mathbb Z},Q$ を固定する。正の重さ1のHodge直線は、ただ一つの $\operatorname{Im}\tau>0$ により

$$
F=\mathbb C(e_1+\tau e_2)
$$

> と表される。逆に任意の $\operatorname{Im}\tau>0$ からこのような正の直線が得られ、$E_\tau$ の $F^1H^1$ がその具体的実現となる。
<!-- formal-statement-end -->

### 証明の見取り図

$v=Ae_1+Be_2$ と書いて $Q(\bar v,v)$ を展開する。正値なら $A\ne0$ で、比 $\tau=B/A$ が上半平面に入る。逆方向には $F$ と $\bar F$ の行列式も確かめる。

<!-- proof-start -->
### 証明

$v=Ae_1+Be_2$ に対し、交代性と $Q(e_1,e_2)=1$ を使えば

$$
Q(\bar v,v)=\bar A B-\bar B A
=2i\,\operatorname{Im}(\bar A B).
$$

従って $-iQ(\bar v,v)=2\operatorname{Im}(\bar A B)>0$。$A=0$ なら左辺は零になるから $A\ne0$。$\tau=B/A$ として $v=A(e_1+\tau e_2)$ と書くと

$$
\operatorname{Im}(\bar A B)
=|A|^2\operatorname{Im}(B/A)
=|A|^2\operatorname{Im}\tau.
$$

正値から $\operatorname{Im}\tau>0$。この比は $v$ を非零複素数倍しても変わらないので一意である。

逆に $F=\mathbb C(e_1+\tau e_2)$、$\operatorname{Im}\tau>0$ とする。$v=A(e_1+\tau e_2)$ について $-iQ(\bar v,v)=2|A|^2\operatorname{Im}\tau>0$。さらに $F,\bar F$ の列行列式は $\bar\tau-\tau=-2i\operatorname{Im}\tau\ne0$ なので直和条件も成立する。[周期とHodge直線](#thm-hod1-16-period-hodge-line)より、この直線を $E_\tau$ が実現する。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-hod1-16-positive-hodge-line -->
**定義の確認**：数値による検算。$\tau=1+2i$、$v=e_1+(1+2i)e_2$ とすると $\bar v=e_1+(1-2i)e_2$、

$$
Q(\bar v,v)=(1+2i)-(1-2i)=4i,\qquad
-iQ(\bar v,v)=4>0.
$$

正の直線の定義のもう一つの条件も、二本の列の行列式 $\bar\tau-\tau=-4i\ne0$ によって確認できる。

一方 $\tau=1$ なら $v=\bar v$ となり、直和も正値性も壊れる。ここでの正値は単なる見た目の向きの約束でなく、[Hodge–Riemann関係](../HOD1-13/index.md#thm-hod1-13-hodge-riemann)が重さ1に与える符号の帰結である。
<!-- definition-example-end -->

## 5. 一次の周期から二次のHard Lefschetzへ

$E_\tau$ には平坦Kähler形式

$$
\omega=\frac{i}{2b}dz\wedge d\bar z=du\wedge dv,\qquad
\int_{E_\tau}\omega=1
$$

を入れる。$dz\wedge d\bar z=(\bar\tau-\tau)du\wedge dv=-2ib\,du\wedge dv$ なので、$i/(2b)$ を掛ければ正の体積形式になる。$b>0$ からHermite係数 $1/(2b)>0$、係数は定数だから $d\omega=0$ である。

次の主張はKähler恒等式を新たに証明し直すのでなく、**既に証明した各段階の入力と出力を途切れず接続する**ことが目的である。完全な演算子計算は総合演習C02で再導出する。

<a id="thm-hod1-16-elliptic-hodge-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（楕円曲線でのHodge–Lefschetz経路）**
> $\operatorname{Im}\tau>0$ の $E_\tau$ に上の $\omega=du\wedge dv$ を入れる。$\Delta_d$ を非負Hodge Laplacian とする。このとき $\Delta_d=2\Delta_{\bar\partial}$ であり、

$$
\begin{aligned}
H^0(E_\tau;\mathbb C)&=\mathbb C[1],\\
H^1(E_\tau;\mathbb C)&=\mathbb C[dz]\oplus\mathbb C[d\bar z],\\
H^2(E_\tau;\mathbb C)&=\mathbb C[\omega]
\end{aligned}
$$

> は調和代表によるHodge分解である。$L=[\omega]\smile(-)$ は $L:H^0\longrightarrow H^2$ を同型にし、$L^0=\mathrm{id}:H^1\longrightarrow H^1$ と合わせて複素次元1のHard Lefschetzを満たす。
<!-- formal-statement-end -->

### 証明の見取り図

平坦Kähler条件から局所恒等式を使える。Laplacian一致で調和形式が型保存され、平坦トーラスではそれが定数係数形式で尽くされる。$\omega$ が閉かつ調和なので、楔積をコホモロジーに移し、面積1が同型性を示す。

<!-- proof-start -->
### 証明

前段で $E_\tau$ が境界なしコンパクトKähler多様体であることを確認した。[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)の適用条件が成立するため、[Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)を用いて $\Delta_d=2\Delta_{\bar\partial}$ を得る。従って各調和代表の $(p,q)$ 成分も調和である。

[平坦トーラスの調和形式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)は定数係数で尽くされる。実二次元トーラスの次数0,1,2にはそれぞれ $1$、$du,dv$、$du\wedge dv$ が独立な調和代表を与える。一次では

$$
\begin{pmatrix}dz\\d\bar z\end{pmatrix}
=\begin{pmatrix}1&\tau\\1&\bar\tau\end{pmatrix}
\begin{pmatrix}du\\dv\end{pmatrix},
\qquad \det=\bar\tau-\tau\ne0,
$$

だから同じ二次元空間を $(1,0)$ と $(0,1)$ の直和で張る。[Kähler Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により、調和代表の直和はコホモロジーの表示となる。

$d\omega=0$ なので、[de Rham積の定義](../HOD1-10/index.md#def-hod1-10-de-rham-product)に従って $L$ は類上で定義される。また[調和形式上のLefschetz作用](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)により $[L,\Delta_d]=0$ であり、調和代表から離れない。具体的には

$$
L([1])=[\omega],\qquad
\int_{E_\tau}\omega=1\ne0.
$$

$H^0,H^2$ はともに一次元なのでこの写像は同型である。$k=1=n$ における $L^{n-k}=L^0$ は恒等写像。これらは[Hard Lefschetz定理](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)の $n=1$ の全次数を直接確認したものである。$\square$
<!-- proof-end -->

**どこまで分かったか。** 解析的な恒等式が調和形式の型を保ち、その型が有理格子との相対位置として周期に現れ、同じKähler形式の楔積がコホモロジーの同型を与えた。周期の変換則だけから一般の変動Hodge構造やGriffiths横断性まで証明したわけではない。それらにはさらにパラメータ族と接続の理論が必要になる。

## 6. 演習：周期、標識、正値性、解析から位相への経路

### Level A：基本式を一つずつ復元する

<a id="ex-hod1-16-a01"></a>
#### HOD1-16-A01 正則座標から整数周期基底へ
- Level: A

$\tau=1+2i$、$z=u+\tau v$ とする。$du,dv$ を $dz,d\bar z$ で表し、基本閉路 $\gamma_1,\gamma_2$ に対して $du,dv$ の四周期を求めよ。

<!-- solution-start -->
### 詳細解答

$dz=du+\tau dv$、$d\bar z=du+\bar\tau dv$ を差し引くと

$$
dv=\frac{dz-d\bar z}{\tau-\bar\tau}
=\frac{dz-d\bar z}{4i}.
$$

第一式へ戻して

$$
du=dz-\tau\,dv
=\frac{\tau\,d\bar z-\bar\tau\,dz}{\tau-\bar\tau}.
$$

閉路の持ち上げは $\gamma_1:(u,v)=(t,0)$、$\gamma_2:(u,v)=(0,t)$ である。よって $du,dv$ を引き戻して $t\in[0,1]$ で積分すれば

$$
\int_{\gamma_1}du=1,\quad\int_{\gamma_1}dv=0,\quad
\int_{\gamma_2}du=0,\quad\int_{\gamma_2}dv=1.
$$

これは[周期双対基底](#def-hod1-16-dual-period-basis)の四条件そのものである。分母 $4i\ne0$ は $\operatorname{Im}\tau>0$ によって保証される。
<!-- solution-end -->

<a id="ex-hod1-16-a02"></a>
#### HOD1-16-A02 Hodge直線と共役直線
- Level: A

$E_{2i}$ の $H^1$ で $F^1$ と $\overline{F^1}$ を整数周期基底 $e_1,e_2$ で書き、直和となることと $h^{1,0},h^{0,1}$ を求めよ。

<!-- solution-start -->
### 詳細解答

[周期とHodge直線](#thm-hod1-16-period-hodge-line)に $\tau=2i$ を入れると

$$
F^1=\mathbb C(e_1+2ie_2),\qquad
\overline{F^1}=\mathbb C(e_1-2ie_2).
$$

二列の基底行列式は

$$
\det\begin{pmatrix}1&1\\2i&-2i\end{pmatrix}
=-4i\ne0.
$$

従って $H^1=F^1\oplus\overline{F^1}$、両方とも一次元なので $h^{1,0}=h^{0,1}=1$。$E_i$ とのHodge数の一致は、直線の傾きが同じであることを意味しない。
<!-- solution-end -->

<a id="ex-hod1-16-a03"></a>
#### HOD1-16-A03 二つの基本的な基底変更
- Level: A

閉路変更 $(\gamma_1,\gamma_2)\mapsto(\gamma_1,\gamma_1+\gamma_2)$ と $(\gamma_1,\gamma_2)\mapsto(-\gamma_2,\gamma_1)$ について、各整数行列の行列式と $\tau'$ を求めよ。$\tau=2i$ で値を検算せよ。

<!-- solution-start -->
### 詳細解答

前者は $(r,s,t,u)=(1,0,1,1)$ で行列式 $1\cdot1-0\cdot1=1$。[基底変更定理](#thm-hod1-16-period-basis-change)から

$$
\tau'=\frac{1+\tau}{1}=\tau+1=1+2i.
$$

後者は $(r,s,t,u)=(0,-1,1,0)$ で行列式 $0-(-1)=1$。よって

$$
\tau'=\frac1{-\tau}=-\frac1\tau
=-\frac1{2i}=\frac i2.
$$

虚部はそれぞれ $2$、$1/2$ と正である。後者の虚部公式でも $2/|{-2i}|^2=1/2$ と一致する。
<!-- solution-end -->

<a id="ex-hod1-16-a04"></a>
#### HOD1-16-A04 交叉形式の符号と正値
- Level: A

$Q(e_1,e_2)=1$ とし、$v=3(e_1+i e_2)$ とする。$Q(\bar v,v)$、$-iQ(\bar v,v)$ を計算し、正のHodge直線の条件を確認せよ。

<!-- solution-start -->
### 詳細解答

$\bar v=3(e_1-i e_2)$。交代性 $Q(e_2,e_1)=-1$、$Q(e_j,e_j)=0$ から

$$
\begin{aligned}
Q(\bar v,v)
&=9\{iQ(e_1,e_2)-iQ(e_2,e_1)\}\\
&=9(i+i)=18i.
\end{aligned}
$$

したがって $-iQ(\bar v,v)=18>0$。また生成元 $e_1+i e_2,e_1-i e_2$ の行列式は $-2i\ne0$ なので、[正のHodge直線の定義](#def-hod1-16-positive-hodge-line)の直和条件も満たす。正値だけで片方の条件を確認したことにしない。
<!-- solution-end -->

### Level B：分類・向き・有理格子を組み合わせる

<a id="ex-hod1-16-b01"></a>
#### HOD1-16-B01 一般の複素一次類の周期
- Level: B

$E_{1+i}$ で $\alpha=2dz+3d\bar z$ とする。基本二閉路での周期を求め、$\alpha$ が $(1,0)$ 型、$(0,1)$ 型、どちらでもない、のどれに当たるか示せ。

<!-- solution-start -->
### 詳細解答

$dz$ の周期は $(1,1+i)$、$d\bar z$ の周期は $(1,1-i)$ であるから、線形性より

$$
\begin{aligned}
\int_{\gamma_1}\alpha&=2\cdot1+3\cdot1=5,\\
\int_{\gamma_2}\alpha&=2(1+i)+3(1-i)=5-i.
\end{aligned}
$$

[Hodge直和](#thm-hod1-16-period-hodge-line)で $dz$ と $d\bar z$ は一次独立かつ異なる型である。$(1,0)$ 型なら $d\bar z$ の係数が零、$(0,1)$ 型なら $dz$ の係数が零でなければならない。しかし $3\ne0$ かつ $2\ne0$ なので、$\alpha$ はどちらか一つの純型ではない。周期比 $(5-i)/5$ をそのまま $\tau$ と読めない理由もここにある。
<!-- solution-end -->

<a id="ex-hod1-16-b02"></a>
#### HOD1-16-B02 向きを反転した基底では何が壊れるか
- Level: B

$\gamma'_1=\gamma_2,\gamma'_2=\gamma_1$ という変更の行列式を計算し、規格化周期 $\tau'=1/\tau$ の虚部の符号を調べよ。$\tau=i$ を例とし、この操作が何を保ち何を保たないか説明せよ。

<!-- solution-start -->
### 詳細解答

行列は $\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ で行列式は $-1$。$\tau=x+iy$、$y>0$ とすると

$$
\frac1\tau=\frac{x-iy}{x^2+y^2},\qquad
\operatorname{Im}\frac1\tau=-\frac y{x^2+y^2}<0.
$$

$\tau=i$ なら $1/i=-i$ である。二閉路は整数ホモロジーの基底であり続けるが、向き付き交叉数の符号は反転する。従って[向きを保つ基底変更定理](#thm-hod1-16-period-basis-change)の仮定 $ru-st=1$ を失っており、その正虚部の結論は適用できない。元の楕円曲線や複素構造が消えたわけではなく、**選んだ標識の向き**が反対になった。
<!-- solution-end -->

<a id="ex-hod1-16-b03"></a>
#### HOD1-16-B03 正値条件からのパラメータ復元
- Level: B

$V_{\mathbb Z}=\mathbb Ze_1+\mathbb Ze_2$、$Q(e_1,e_2)=1$、$F=\mathbb C(e_1+(-1+i/2)e_2)$ とする。直和と正値条件を検査し、実現する楕円曲線のパラメータと面積1のKähler形式を $du,dv,dz,d\bar z$ で表せ。

<!-- solution-start -->
### 詳細解答

$\tau=-1+i/2$ なので

$$
\det\begin{pmatrix}1&1\\-1+i/2&-1-i/2\end{pmatrix}
=-i\ne0.
$$

直和が成立する。$v=e_1+\tau e_2$ とすると

$$
Q(\bar v,v)=\tau-\bar\tau=i,\qquad
-iQ(\bar v,v)=1>0.
$$

従って[正のHodge直線と上半平面](#thm-hod1-16-positive-line-half-plane)により $E_{-1+i/2}$ が実現する。$b=1/2$ として

$$
z=u+\tau v,\qquad
\omega=du\wedge dv=\frac{i}{2b}dz\wedge d\bar z
=i\,dz\wedge d\bar z.
$$

$\int\omega=1$。Hermite係数は $1/(2b)=1>0$、係数一定で $d\omega=0$ なのでKähler条件まで確認できる。
<!-- solution-end -->

<a id="ex-hod1-16-b04"></a>
#### HOD1-16-B04 Hodge数では区別できない周期
- Level: B

$E_i$ と $E_{2i}$ のHodge数が一致することを確認せよ。また[虚部の変換式](#thm-hod1-16-period-basis-change)を用いて、$E_i$ の規格化周期を向きを保つ整数基底変更だけでは $2i$ にできないことを示せ。この計算から結論できる範囲も述べよ。

<!-- solution-start -->
### 詳細解答

[複素トーラスのHodge数](../HOD1-09/index.md#thm-hod1-09-torus-numbers)は $n=1$ で四つとも $\binom10\binom11=1$（適切な $(p,q)$ ごとに各二項係数は1）だから、両曲線で一致する。

もし $\tau=i$ から行列式1の整数行列 $(r,s,t,u)$ によって $\tau'=2i$ になれば、[虚部公式](#thm-hod1-16-period-basis-change)で

$$
2=\operatorname{Im}\tau'
=\frac1{|r+si|^2}=\frac1{r^2+s^2}.
$$

$r,s$ は整数で、$ru-st=1$ から同時に零にはできない。従って $r^2+s^2$ は1以上の整数で、右辺は高々1。矛盾する。結論は「この二組の**規格化周期**は向きを保つ整数基底変更で互いに移らない」である。曲線の正則同型の完全な分類はここでは証明していないため、それだけを根拠に分類定理全体を主張しない。
<!-- solution-end -->

### Level C：複数の理論を出発点から組み立てる

<a id="ex-hod1-16-c01"></a>
#### HOD1-16-C01 標識変更、交叉形式、偏極を一度に検算
- Level: C

$E_i$ の基本閉路から $\gamma'_1=2\gamma_1+\gamma_2$、$\gamma'_2=\gamma_1+\gamma_2$ を作る。次を順に示せ。新座標を $z'=z/(2+i)$ としてよい。

1. 二閉路が向きを保つ整数基底か判定する。
2. 新しい規格化周期を求める。
3. その虚部が正であることを確認する。
4. 新しい標識での $F^1$ と偏極正値条件を検算する。

<!-- solution-start -->
### 詳細解答

(1) 閉路変換の整数行列は $M=\left(\begin{smallmatrix}2&1\\1&1\end{smallmatrix}\right)$、$\det M=2-1=1$。逆行列 $\left(\begin{smallmatrix}1&-1\\-1&2\end{smallmatrix}\right)$ も整数であるため、二閉路は同じホモロジー格子の向きを保つ基底となる。

(2) $dz$ の新周期は $A=2+i$、$B=1+i$ だから

$$
\tau'=\frac{1+i}{2+i}
=\frac{(1+i)(2-i)}{(2+i)(2-i)}
=\frac{3+i}{5}.
$$

新座標 $z'=z/A$ の微分 $dz'=dz/A$ の周期は $(1,\tau')$。

(3) 直接計算で $\operatorname{Im}\tau'=1/5$、[虚部変換定理](#thm-hod1-16-period-basis-change)でも $1/|2+i|^2=1/5$。二つは一致し、正である。

(4) [双対基底の変換式](#thm-hod1-16-period-basis-change)の直前の導出へ $r=2,s=t=u=1$ を代入すると、$e'_1=e_1-e_2$、$e'_2=-e_1+2e_2$ である。両者の新閉路上の周期は単位行列になる。また旧基底での $[dz]=e_1+ie_2$ を用いると

$$
[dz'] = \frac{e_1+ie_2}{2+i}
=e'_1+\frac{1+i}{2+i}e'_2=e'_1+\tau'e'_2.
$$

従って

$$
F^1=\mathbb C(e'_1+\tau'e'_2).
$$

$Q(e'_1,e'_2)=Q(e_1-e_2,-e_1+2e_2)=2-1=1$ は交代性と向き保存による。$v'=e'_1+\tau'e'_2$ について

$$
Q(\bar v',v')=\tau'-\bar\tau'=\frac{2i}{5},\qquad
-iQ(\bar v',v')=\frac25>0.
$$

実際、元の $dz$ なら値は $2$ だった。規格化による $dz'=dz/(2+i)$ のスカラー倍で $2/|2+i|^2=2/5$ になったので、偏極の正値性は変わらない。直和性も $\bar\tau'-\tau'=-2i/5\ne0$ から成立する。
<!-- solution-end -->

<a id="ex-hod1-16-c02"></a>
#### HOD1-16-C02 Kähler恒等式からHodge分解とHard Lefschetzまで
- Level: C

$E_\tau$（$\operatorname{Im}\tau=b>0$）に $\omega=du\wedge dv$ を入れ、次の記号を用いる。

$$
\begin{gathered}
A=\partial,\quad B=\bar\partial,\quad
\Delta_A=AA^*+A^*A,\quad \Delta_B=BB^*+B^*B,\\
L=\omega\wedge(-),\qquad \Lambda=L^*.
\end{gathered}
$$

次の三段階を示せ。

1. $[\Lambda,A]=iB^*$、$[\Lambda,B]=-iA^*$ と $A^2=B^2=AB+BA=0$ から混合随伴項の消滅と $\Delta_A=\Delta_B$ を計算し、$\Delta_d=2\Delta_B$ を導く。
2. 調和代表の型別分解から $H^1$ を具体的に求める。
3. $L:H^0\to H^2$ が同型であることを証明し、Kähler仮定・コンパクト仮定が働いた位置を説明する。

<!-- solution-start -->
### 詳細解答

(1) $A,B$ は次数1を上げ、$\Lambda$ は次数2を下げる。交換子は通常の $[S,T]=ST-TS$ とする。直接積を展開すれば $[\Lambda,ST]=[\Lambda,S]T+S[\Lambda,T]$ である。$A^2=0$ の両辺と $\Lambda$ の交換子をとると

$$
\begin{aligned}
0=[\Lambda,A^2]
&=[\Lambda,A]A+A[\Lambda,A]\\
&=i(B^*A+AB^*).
\end{aligned}
$$

従って $B^*A+AB^*=0$。同じく $B^2=0$ から

$$
0=[\Lambda,B^2]=-i(A^*B+BA^*)
$$

を得る。次に $AB+BA=0$ と交換子をとると

$$
\begin{aligned}
0&=[\Lambda,AB+BA]\\
&=[\Lambda,A]B+A[\Lambda,B]+[\Lambda,B]A+B[\Lambda,A]\\
&=i(B^*B+BB^*)-i(AA^*+A^*A)\\
&=i(\Delta_B-\Delta_A).
\end{aligned}
$$

よって $\Delta_A=\Delta_B$。$d=A+B$、$d^*=A^*+B^*$ を $dd^*+d^*d$ に展開すると

$$
\begin{aligned}
\Delta_d
&=\Delta_A+\Delta_B
+(AB^*+B^*A)+(BA^*+A^*B)\\
&=2\Delta_B.
\end{aligned}
$$

これは[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)から[Laplacian一致](../HOD1-05/index.md#thm-hod1-05-laplacian-equality)へ進む演算子計算の要点である。

(2) Kähler条件により $\Delta_d$ は型を保存する。$E_\tau$ はコンパクトで境界がないため[調和代表によるHodge同型](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を使える。平坦トーラスで定数係数が調和形式を尽くすことと、$\det\left(\begin{smallmatrix}1&1\\\tau&\bar\tau\end{smallmatrix}\right)=-2ib\ne0$ から

$$
H^1(E_\tau;\mathbb C)
=\mathbb C[dz]\oplus\mathbb C[d\bar z].
$$

(3) $d\omega=0$ より $L$ はde Rhamコホモロジーに作用し、[Laplacianとの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)で調和形式を保つ。基本領域における積分を計算すると

$$
\int_{E_\tau}\omega=\int_0^1\int_0^1du\,dv=1,\qquad
L[1]=[\omega]\ne0.
$$

$H^0$ と $H^2$ は定数係数調和形式で各一次元である。従って非零線形写像 $L$ は同型となる。残る次数 $k=n=1$ では

$$
L^{n-k}=L^0=\mathrm{id}:H^1(E_\tau;\mathbb C)\longrightarrow H^1(E_\tau;\mathbb C).
$$

これで[Hard Lefschetz](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)を全対象次数で再現した。

$d\omega=0$ と正定値Hermite計量は[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)を適用する入口で、コンパクト・境界なしは調和代表とコホモロジーの同型に必要だった。最後の $L[1]\ne0$ は規格化面積を実際に積分して確かめた。非Kähler多様体に演算子恒等式だけを移すことも、非コンパクトの場合に同じ調和代表論を無条件に使うこともできない。
<!-- solution-end -->

## 7. まとめ：数字でなく、直線の位置まで読む

楕円曲線では $H^{1,0}$ という一次元の空間の「大きさ」は常に1だが、その整数格子に対する位置は周期の比 $\tau$ が記録する。基底変更は行列式1の整数行列で制御され、偏極の正値性は $\operatorname{Im}\tau>0$ を選び出す。一方、[Kähler恒等式](../HOD1-04/index.md#thm-hod1-04-kahler-identities)からHodge分解、Hard Lefschetzまでの経路は、解析上の条件が位相・線形代数の制約へ移る理由を与えている。

より高次元の周期の変化を調べるには、単なる周期比に加え、コホモロジーの族、接続、フィルトレーションの変化を学ぶ必要がある。
