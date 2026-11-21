# GBG3 なぜゲージ選択は局所sectionの選択か

[GBG2の主束の定義](../GBG2/index.md#def-gbg2-principal-bundle)によって、局所積 $U\times G$ と右作用 $p\mapsto pg$ は理解できた。しかし積表示の「群座標の原点」は一意ではない。同じ点 $p$ でも、各ファイバーでどの点を基準にするかによって、群元による表示が変わる。

各ファイバーから基準点を滑らかに選び、座標を作るのが **局所section** である。本講では section と自明化が対応すること、section の変更から遷移関数がどう変化するか、大域sectionの存在が主束の自明性とどう結び付くかを証明する。「局所表示の取り替え」と「束を動かす自己同型」は区別し、後者は GBG5 で扱う。

以下 $M$ は Hausdorff・第二可算な有限次元滑らかな多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は右作用を備えた滑らかな主 $G$ 束とする。$G$ は可換とは仮定しない。$U_{ij}=U_i\cap U_j$ と書く。

<!-- definition-example-audit: strict -->

## 1. 局所sectionから局所座標を作る

積主束では $s(x)=(x,e)$ が基準点を選ぶ。一般の主束では積表示が大域的に存在するとは限らないため、まず基底の開集合 $U$ 上で基準点を選ぶ。

<a id="def-gbg3-local-section"></a>

<!-- formal-statement-start -->
> **定義（主束の局所sectionと大域section）**  
> $U\subset M$ を開集合とする。主 $G$ 束 $\pi:P\to M$ の **$U$ 上の局所section** は、滑らかな写像 $s:U\to P$ で
$$
\pi\circ s=\operatorname{id}_U
$$
> を満たすものである。$U=M$ の場合は **大域section** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg3-local-section -->
**定義の確認**。$P=\mathbb R\times U(1)$、$\pi(x,z)=x$ とする。$s_a(x)=(x,e^{ix})$ は二成分とも滑らかで、$\pi(s_a(x))=x$ だから大域sectionである。一方、$\widetilde s(x)=(x^2,1)$ は滑らかでも $\pi(\widetilde s(x))=x^2$ なので section ではない。必要なのは単に各点を $P$ に送ることではなく、同じ $x$ のファイバーから選ぶことである。
<!-- definition-example-end -->

基準点 $s(x)$ が決まると、任意の $p\in\pi^{-1}(U)$ は
$$
p=s(x)k,\qquad x=\pi(p)
$$
と一意に書ける。ここで $k\in G$ の存在と一意性は[GBG2の自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)による。この $k$ が $s$ を基準とする群座標である。滑らかさも確かめれば自明化になる。

<a id="thm-gbg3-section-trivialization"></a>

<!-- formal-statement-start -->
> **定理（局所sectionと同変自明化の対応）**  
> $\pi:P\to M$ を滑らかな主 $G$ 束、$U\subset M$ を開集合とする。$U$ 上の滑らかな局所sectionと $U$ 上の右作用に同変な自明化は一対一に対応し、その対応は
$$
\Phi_s:\pi^{-1}(U)\longrightarrow U\times G,\quad
\Phi_s(s(x)k)=(x,k)
$$
> および
$$
s(x)=\Phi_s^{-1}(x,e)
$$
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

[ファイバー内の一意な群元](../GBG2/index.md#prop-gbg2-free-transitive)で写像を定める。滑らかさの鍵は、既知の自明化 $\Psi(p)=(x,h)$ による $s(x)$ の群座標 $b(x)$ を用いて、新しい座標を $b(x)^{-1}h$ と書くことである。

<!-- proof-start -->
### 証明

$s$ を固定する。$p$ に対して $x=\pi(p)$ と置くと、[自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)から $p=s(x)k$ を満たす唯一の $k$ が存在する。従って $\Phi_s(p)=(x,k)$ は well-defined で全単射、その逆は $\Phi_s^{-1}(x,k)=s(x)k$ である。逆は $s$ と右作用の滑らかさから滑らかである。

$\Phi_s$ 自身が滑らかなことを示す。任意の $x_0\in U$ について、$x_0\in V\subset U$ で既存の[主束の局所自明化](../GBG2/index.md#def-gbg2-principal-bundle) $\Psi:\pi^{-1}(V)\to V\times G$ を取る。$\Psi(s(x))=(x,b(x))$ と書けば $b:V\to G$ は滑らか。$\Psi(p)=(x,h)$ で $p=s(x)k$ なら、$\Psi$ の同変性により $h=b(x)k$。従って
$$
\Phi_s(p)=(x,b(x)^{-1}h).
$$
積と逆元が滑らかな Lie 群の性質により $\Phi_s$ は $V$ 上で滑らかであり、$x_0$ は任意だから全域で滑らかである。さらに $\Phi_s(pg)=(x,kg)=\Phi_s(p)\cdot g$ で、第一成分は $\pi(p)$ である。

逆に同変自明化 $\Phi$ が与えられたら、$s(x)=\Phi^{-1}(x,e)$ は滑らかで、$\pi(s(x))=x$。同変性から $\Phi(s(x)k)=(x,k)$ なので $\Phi=\Phi_s$ である。二つの構成は互いに逆であり、一対一対応が成立する。
<!-- proof-end -->

**具体例：自明化の検算**。積主束 $M\times G$ で滑らかな $a:M\to G$ を取り、$s_a(x)=(x,a(x))$ とする。$(x,h)=s_a(x)k$ から $h=a(x)k$、従って
$$
\Phi_{s_a}(x,h)=(x,a(x)^{-1}h),\qquad
\Phi_{s_a}^{-1}(x,k)=(x,a(x)k).
$$
$\Phi_{s_a}((x,h)g)=(x,a(x)^{-1}hg)=\Phi_{s_a}(x,h)g$。$a$ は定数でなくてよい。

## 2. section変更と群座標の変換

[GBG2の遷移関数](../GBG2/index.md#prop-gbg2-transition)は局所section $s_i$ を使って $s_j=s_i g_{ij}$ と定められた。基準点を別の $s'_i$ に選べば、それぞれのファイバーで新旧の基準点を結ぶ群元が一意にある。

<a id="def-gbg3-section-change"></a>

<!-- formal-statement-start -->
> **定義（局所sectionの変更関数）**  
> $\pi:P\to M$ を滑らかな主 $G$ 束とし、$U\subset M$ 上の二つの滑らかな局所section $s,s'$ を取る。写像 $h:U\to G$ で
$$
s'(x)=s(x)h(x)
$$
> を満たすものを、$s$ から $s'$ への **局所sectionの変更関数** という。
<!-- formal-statement-end -->

[局所sectionと自明化の対応](#thm-gbg3-section-trivialization)により $\Phi_s(s'(x))=(x,h(x))$ なので $h$ は滑らかで、一意である。これは定義に存在を余分に仮定したのではなく、ファイバーでの自由・推移性から従う。

行列による例では、$GL(2,\mathbb R)$ は $\mathbb R^2$ の可逆な線形変換の行列群である。$2\times2$ 実正方行列がその元であることは、行列式が $0$ でないことと同値である（[GBG2での枠の行列表現](../GBG2/index.md#def-gbg2-frame-bundle)）。したがって、変更関数を行列で与える場合は、各点で行列式を検査して群値であることを確かめる。

<!-- definition-example-start: def-gbg3-section-change -->
**定義の確認**。$P=\mathbb R\times GL(2,\mathbb R)$、$s(x)=(x,I)$ とし、
$$
h(x)=\begin{pmatrix}1&x\\0&1\end{pmatrix},
\quad s'(x)=(x,h(x))
$$
とする。$\det h(x)=1$ なので全 $x$ で群元であり、成分は滑らかである。$\pi(s'(x))=x$ を満たし、右作用により $s(x)h(x)=s'(x)$ が成立する。束そのものは変更されない。
<!-- definition-example-end -->

<a id="thm-gbg3-transition-change"></a>

<!-- formal-statement-start -->
> **定理（局所section変更による遷移関数の変換則）**  
> $\pi:P\to M$ を滑らかな主 $G$ 束、$\{U_i\}$ を開被覆、$s_i:U_i\to P$ を滑らかな局所sectionとする。$U_{ij}$ 上で $s_j=s_i g_{ij}$ と書く。各 $U_i$ 上の滑らかな $h_i:U_i\to G$ を選び $s'_i=s_i h_i$ としたとき、新しい遷移関数は
$$
g'_{ij}=h_i^{-1}g_{ij}h_j
$$
> であり、三重重なりで $g'_{ij}g'_{jk}=g'_{ik}$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$s'_j$ をまず $s_i$ で、次に $s'_i$ で表す。$h_i^{-1}$ は左端、$h_j$ は右端に現れる。cocycle では中間の $h_jh_j^{-1}$ が消えるが、非可換群なので残った積の順番は替えない。

<!-- proof-start -->
### 証明

$x\in U_{ij}$ を固定する。$s'_i=s_i h_i$ から $s_i=s'_i h_i^{-1}$ である。従って
$$
\begin{aligned}
s'_j&=s_j h_j=(s_i g_{ij})h_j\\
&=(s'_i h_i^{-1})g_{ij}h_j
=s'_i(h_i^{-1}g_{ij}h_j).
\end{aligned}
$$
[自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)で群元は一意だから $g'_{ij}=h_i^{-1}g_{ij}h_j$。積と逆元の滑らかさにより $g'_{ij}$ は滑らか。

三重重なりで[GBG1のcocycle条件](../GBG1/index.md#def-gbg1-cocycle) $g_{ij}g_{jk}=g_{ik}$ を使うと
$$
\begin{aligned}
g'_{ij}g'_{jk}
&=(h_i^{-1}g_{ij}h_j)(h_j^{-1}g_{jk}h_k)\\
&=h_i^{-1}g_{ij}(h_jh_j^{-1})g_{jk}h_k\\
&=h_i^{-1}(g_{ij}g_{jk})h_k
=h_i^{-1}g_{ik}h_k=g'_{ik}.
\end{aligned}
$$
可換性は用いていない。
<!-- proof-end -->

点 $p$ の群座標も変わる。同じ $p$ を $p=s_i(x)k_i=s'_i(x)k'_i$ とすると、$s_i(x)k_i=s_i(x)h_i(x)k'_i$ である。自由性から $k_i=h_i k'_i$ なので
$$
k'_i=h_i^{-1}k_i.
$$
これが「基準点を変えると座標が逆向きに変わる」というゲージ表示の原理である。

### 非可換行列による検算

$G=GL(2,\mathbb R)$、$U_0=U_1=\mathbb R$ で旧 section を同じ $(x,I)$ に取り、$g_{01}=I$ とする。定数関数
$$
h_0=\begin{pmatrix}1&1\\0&1\end{pmatrix},
\qquad
h_1=\begin{pmatrix}1&0\\1&1\end{pmatrix}
$$
を選ぶと、両者の行列式は $1$ である。定理から
$$
g'_{01}=h_0^{-1}h_1
=\begin{pmatrix}0&-1\\1&1\end{pmatrix}.
$$
逆順の $h_1h_0^{-1}=\left(\begin{smallmatrix}1&-1\\1&0\end{smallmatrix}\right)$ とは異なる。新たな遷移関数は非恒等だが、束は以前と同じ積束である。従って非恒等な遷移関数だけで束が非自明とはいえない。

## 3. 大域sectionは束全体の原点を定める

局所sectionは[主束の同変局所自明化](../GBG2/index.md#def-gbg2-principal-bundle)で $(x,e)$ の逆像を取れば得られる。一方、すべてのファイバーで滑らかに基準点を一つずつ選べるかは別問題である。

<a id="thm-gbg3-global-section-trivial"></a>

<!-- formal-statement-start -->
> **定理（大域sectionと自明性の同値）**  
> $M$ を滑らかな多様体、$G$ を有限次元 Lie 群、$\pi:P\to M$ を滑らかな主 $G$ 束とする。$P$ に滑らかな大域sectionが存在することと、$P$ が積主束 $M\times G$ に[基底を固定した主束同型](../GBG2/index.md#def-gbg2-bundle-isomorphism)であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

大域section $s$ があれば $F(x,k)=s(x)k$ が積から $P$ への同型候補となる。逆の滑らかさには[局所sectionと自明化の対応](#thm-gbg3-section-trivialization)を $U=M$ に適用する。逆向きは積の標準section $(x,e)$ を同型で運ぶ。

<!-- proof-start -->
### 証明

**大域sectionから自明性**。滑らかな $s:M\to P$ を取り、
$$
F:M\times G\to P,\quad F(x,k)=s(x)k
$$
と定める。右作用の滑らかさにより $F$ は滑らかである。射影保存と右同変性は
$$
\pi(F(x,k))=\pi(s(x)k)=x,\qquad
F(x,kg)=s(x)(kg)=F(x,k)g
$$
から従う。

[ファイバー内の自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)により、各 $p\in P$ は $x=\pi(p)$ として一意な $k\in G$ を用いて $p=s(x)k$ と表せる。従って $F$ は全単射である。

[局所sectionの自明化](#thm-gbg3-section-trivialization)を $U=M$ に適用すれば $F^{-1}=\Phi_s$ は滑らかなので、$F$ は主束同型となる。

**自明性から大域section**。主束同型 $F:M\times G\to P$ があるなら $s(x)=F(x,e)$ と置く。$x\mapsto(x,e)$ と $F$ は滑らかなので $s$ も滑らかであり、同型が基底を保存することから
$$
\pi(s(x))=\pi(F(x,e))=\operatorname{pr}_1(x,e)=x.
$$
従って大域sectionである。
<!-- proof-end -->

<a id="prop-gbg3-cocycle-trivial"></a>

<!-- formal-statement-start -->
> **命題（遷移関数による自明性の判定）**  
> $P\to M$ を滑らかな主 $G$ 束、$\{U_i\}$ を開被覆、$s_i$ を各 $U_i$ 上の滑らかな局所section、$s_j=s_i g_{ij}$ を遷移関数とする。$P$ が自明であるための必要十分条件は、滑らかな関数 $a_i:U_i\to G$ が存在して各 $U_{ij}$ で
$$
g_{ij}=a_i a_j^{-1}
$$
> を満たすことである。
<!-- formal-statement-end -->

### 証明の見取り図

$s'_i=s_i a_i$ で全遷移関数が $e$ になることと、局所sectionが重なりで一致して一つの大域sectionになることが同値である。

<!-- proof-start -->
### 証明

**十分性**。$g_{ij}=a_i a_j^{-1}$ とし、$t_i=s_i a_i$ と置く。[遷移関数の変換則](#thm-gbg3-transition-change)を使えば
$$
g'_{ij}=a_i^{-1}g_{ij}a_j
=a_i^{-1}(a_i a_j^{-1})a_j=e.
$$
従って $U_{ij}$ 上で $t_i=t_j$。各 $x$ について $x\in U_i$ を選んで $t(x)=t_i(x)$ と定めると重なりで一致するため well-defined であり、各 $U_i$ への制限が滑らかだから $t$ は滑らか。$\pi(t(x))=x$ なので大域sectionとなり、[大域sectionと自明性の同値](#thm-gbg3-global-section-trivial)により $P$ は自明である。

**必要性**。$P$ が自明なら[大域sectionと自明性の同値](#thm-gbg3-global-section-trivial)から滑らかな大域section $t$ がある。各 $U_i$ において[局所sectionと自明化の対応](#thm-gbg3-section-trivialization)から唯一の滑らかな $a_i$ があり $t=s_i a_i$。重なりでは
$$
s_i a_i=t=s_j a_j=s_i(g_{ij}a_j)
$$
なので自由性から $a_i=g_{ij}a_j$。右から $a_j^{-1}$ を掛ければ $g_{ij}=a_i a_j^{-1}$。
<!-- proof-end -->

この命題は、初めの遷移関数が非恒等でも滑らかな局所基準の変更で消去できれば束は自明だ、と述べている。「各パッチで選べること」と「全体で選べること」の差がここにある。

## 4. 二つの幾何学的な例

### Hopf主束の局所section

[Hopf主束の構成](../GBG2/index.md#thm-gbg2-hopf-principal)では $S^3\to S^2$ に局所section
$$
s_w(t)=\frac{(t,1)}{\sqrt{1+|t|^2}},
\qquad
s_z(u)=\frac{(1,u)}{\sqrt{1+|u|^2}}
$$
があり、重なりでは $u=1/t$、$s_z=s_w g_{wz}$、$g_{wz}=|t|/t$ となる。特に $t=i$ なら $g_{wz}=-i$ で二つの基準点は一致しない。しかしこの不一致だけで大域sectionの不存在は証明できない。必要なのは、どんな滑らかな局所sectionの変更でも遷移関数を同時に消せないという論証であり、後の GBG18 では巻き数から示す。

### 枠束の局所section

[枠束の主束構造](../GBG2/index.md#thm-gbg2-frame-principal)で、$n$ 次元多様体上の局所座標から得る基底 $E(x)=(E_1(x),\ldots,E_n(x))$ は枠束の局所sectionである。同じ接空間の別の滑らかな基底 $E'(x)=(E'_1(x),\ldots,E'_n(x))$ を選ぶと、基底展開により各列について
$
E'_j(x)=\sum_{i=1}^n E_i(x)H^i{}_j(x),\qquad E'(x)=E(x)H(x)
$
と書ける。$E'$ も基底なので係数行列 $H(x)$ は可逆であり、$H(x)\in GL(n,\mathbb R)$ がsectionの変更関数となる。同じ枠を $v=E(x)K=E'(x)K'$ と表すと $K=HK'$ だから、群座標は $K'=H(x)^{-1}K$ と変わる。

たとえば $M=(0,\infty)$、$y=\log x$ とする。$E_x=\partial/\partial x$ と $E_y=\partial/\partial y$ は同じ点の接ベクトルを、座標関数への微分作用として記述する。任意の滑らかな関数 $f$ に対し、$x=e^y$ で一変数の連鎖律を使うと
$
\frac{d}{dy}f(e^y)=\frac{df}{dx}(x)\frac{dx}{dy}
=x\frac{df}{dx}(x).
$
左辺の $d/dy$ は合成された一変数関数の導関数であり、$\partial/\partial y$ は接ベクトルを表す作用素である。すべての $f$ に対する作用が一致するため、
$
E_y=\frac{\partial}{\partial y}
=\frac{dx}{dy}\frac{\partial}{\partial x}
=xE_x
$
を得る。$H(x)=x$ は $x>0$ で可逆なので、$v=3E_x$ は $v=(3/x)E_y$ と表示される。これが「基準を変えると座標が逆に変わる」ことの一次元版である。

---

## 5. 演習と詳細解答

### Level A：定義と局所計算

<a id="ex-gbg3-a01"></a>
#### GBG3-A01 積主束のsection
- Level: A

$P=\mathbb R\times U(1)$、$a(x)=e^{2ix}$ とする。$s_a(x)=(x,a(x))$ が section であることを示し、その自明化 $\Phi_{s_a}(x,e^{it})$ と逆写像を求めよ。

<!-- solution-start -->
**詳細解答**。$|e^{2ix}|=1$ であり $a$ は滑らか、$\pi(s_a(x))=x$ だから定義を満たす。$(x,e^{it})=s_a(x)k$ なら $e^{it}=e^{2ix}k$ より $k=e^{-2ix}e^{it}$。従って
$$
\Phi_{s_a}(x,e^{it})=(x,e^{i(t-2x)}),\qquad
\Phi_{s_a}^{-1}(x,k)=(x,e^{2ix}k).
$$
$\lambda\in U(1)$ に対して $\Phi_{s_a}((x,e^{it})\lambda)=(x,e^{-2ix}e^{it}\lambda)=\Phi_{s_a}(x,e^{it})\lambda$ で同変、両写像は滑らかである。
<!-- solution-end -->

<a id="ex-gbg3-a02"></a>
#### GBG3-A02 行列群でファイバー座標を変える
- Level: A

$P=\mathbb R\times GL(2,\mathbb R)$ の section を $s(x)=(x,I)$ から $s'(x)=(x,H(x))$、$H(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$ に変える。$p=(x,K)$、$K=\left(\begin{smallmatrix}2&0\\1&1\end{smallmatrix}\right)$ の新しい群座標を求めよ。

<!-- solution-start -->
**詳細解答**。$\det H=1$ だから $s'$ は群値関数による滑らかな section。$p=s(x)K=s'(x)K'=s(x)H(x)K'$ なので自由性から $K'=H^{-1}K$。すなわち
$$
H^{-1}=\begin{pmatrix}1&-x\\0&1\end{pmatrix},\qquad
K'=\begin{pmatrix}2-x&-x\\1&1\end{pmatrix}.
$$
$HK'=K$、$\det K'=2\ne0$ も確認できる。
<!-- solution-end -->

<a id="ex-gbg3-a03"></a>
#### GBG3-A03 可換群の遷移関数
- Level: A

$G=U(1)$、$U_0=U_1=\mathbb R$、$g_{01}=e^{ix}$、$h_0=e^{2ix}$、$h_1=e^{-ix}$ とする。$g'_{01}$ と $g'_{10}$ を求めよ。

<!-- solution-start -->
**詳細解答**。[変換則](#thm-gbg3-transition-change)により
$$
g'_{01}=h_0^{-1}g_{01}h_1
=e^{-2ix}e^{ix}e^{-ix}=e^{-2ix}.
$$
元の $g_{10}=e^{-ix}$ なので
$$
g'_{10}=h_1^{-1}g_{10}h_0
=e^{ix}e^{-ix}e^{2ix}=e^{2ix}.
$$
$g'_{01}g'_{10}=1$ で逆関係が保たれている。
<!-- solution-end -->

<a id="ex-gbg3-a04"></a>
#### GBG3-A04 枠束の座標変更
- Level: A

$(0,\infty)$ で $y=\log x$ とする。$E_x=\partial/\partial x$、$E_y=\partial/\partial y$ の変更関数を求め、枠 $v=5E_x$ を $E_y$ で表せ。

<!-- solution-start -->
**詳細解答**。$x=e^y$ から $dx/dy=x$。連鎖律で $E_y=xE_x$ となるため $H(x)=x\in GL(1,\mathbb R)$。$5E_x=E_y k'$ なら $5=xk'$ で $k'=5/x$。$E_y(5/x)=5E_x$ で正しい。
<!-- solution-end -->

### Level B：導出と非可換性

<a id="ex-gbg3-b01"></a>
#### GBG3-B01 変換の積順序
- Level: B

$G=GL(2,\mathbb R)$、$U_0=U_1=\mathbb R$ とし、$g_{01}=I$、$h_0=\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$、$h_1=\left(\begin{smallmatrix}1&0\\1&1\end{smallmatrix}\right)$ を定数関数とする。$g'_{01},g'_{10}$ を求め、互いに逆であることを行列積で確認せよ。

<!-- solution-start -->
**詳細解答**。$h_0^{-1}=\left(\begin{smallmatrix}1&-1\\0&1\end{smallmatrix}\right)$、$h_1^{-1}=\left(\begin{smallmatrix}1&0\\-1&1\end{smallmatrix}\right)$。右作用の[変換則](#thm-gbg3-transition-change)で
$$
g'_{01}=h_0^{-1}h_1=\begin{pmatrix}0&-1\\1&1\end{pmatrix},\qquad
g'_{10}=h_1^{-1}h_0=\begin{pmatrix}1&1\\-1&0\end{pmatrix}.
$$
実際、
$$
\begin{pmatrix}0&-1\\1&1\end{pmatrix}
\begin{pmatrix}1&1\\-1&0\end{pmatrix}
=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$
非可換群なので $h_1h_0^{-1}$ と順序を入れ替えられない。
<!-- solution-end -->

<a id="ex-gbg3-b02"></a>
#### GBG3-B02 大域sectionが作る同型
- Level: B

$P\to M$ の滑らかな大域section $s$ から $F(x,g)=s(x)g$ を作り、全単射性・逆の滑らかさ・右同変性を証明せよ。

<!-- solution-start -->
**詳細解答**。[自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)により、各 $p\in P$ について $x=\pi(p)$ を固定すれば、唯一の $g\in G$ が存在し $p=s(x)g$ となる。この表示の一意性から $F$ は全単射である。$s$ と右作用は滑らかなので $F$ も滑らかである。

逆写像の滑らかさは局所座標で確認する。$x$ の近傍の既知の自明化を $\Psi(p)=(x,h)$ と書き、$\Psi(s(x))=(x,b(x))$ と置く。[局所sectionの自明化定理](#thm-gbg3-section-trivialization)の構成により
$$
F^{-1}(p)=(x,b(x)^{-1}h)
$$
となる。$b$ と群の積・逆元が滑らかなので、逆写像も局所的に滑らかであり、従って全域で滑らかである。$\pi(F(x,g))=x$ で射影を保ち、
$$
F(x,gh)=s(x)(gh)=(s(x)g)h=F(x,g)h
$$
で右同変。従って[主束同型の定義](../GBG2/index.md#def-gbg2-bundle-isomorphism)を満たす。
<!-- solution-end -->

<a id="ex-gbg3-b03"></a>
#### GBG3-B03 Hopf局所sectionの位相変更
- Level: B

[Hopf主束](../GBG2/index.md#thm-gbg2-hopf-principal)において $g_{wz}(t)=|t|/t$、$h_w=e^{i\alpha}$、$h_z=e^{i\beta}$（実定数）とする。$g'_{wz}(t)$ を求め、$t=e^{i\theta}$ のときの値を表せ。

<!-- solution-start -->
**詳細解答**。各 $h$ は $U(1)$ の滑らかな定数関数なので section の変更として許される。[変換則](#thm-gbg3-transition-change)に代入すると
$$
g'_{wz}=e^{-i\alpha}\frac{|t|}{t}e^{i\beta}
=e^{i(\beta-\alpha)}\frac{|t|}{t}.
$$
$|t|=1$ で $t=e^{i\theta}$ なら $|t|/t=e^{-i\theta}$ だから
$$
g'_{wz}(e^{i\theta})=e^{i(\beta-\alpha-\theta)}.
$$
定数位相は変わるが $\theta$ による変化は残る。ただし、定数による変更しか検討していないので、これだけで非自明性の一般証明とはならない。
<!-- solution-end -->

<a id="ex-gbg3-b04"></a>
#### GBG3-B04 遷移関数を消す
- Level: B

$G=GL(2,\mathbb R)$、$U_0=U_1=\mathbb R$、$a_0=I$、$a_1(x)=\left(\begin{smallmatrix}1&x\\0&1\end{smallmatrix}\right)$、$g_{ij}=a_i a_j^{-1}$ とする。$g_{01}$ と $g_{10}$ を計算し、$s'_i=s_i a_i$ に変更すると遷移関数が恒等となることを示せ。

<!-- solution-start -->
**詳細解答**。$a_1^{-1}=\left(\begin{smallmatrix}1&-x\\0&1\end{smallmatrix}\right)$ なので
$$
g_{01}=\begin{pmatrix}1&-x\\0&1\end{pmatrix},\qquad
g_{10}=\begin{pmatrix}1&x\\0&1\end{pmatrix}.
$$
$g_{00}=g_{11}=I$ である。各行列は滑らかで行列式 $1$。[変換則](#thm-gbg3-transition-change)から $g'_{ij}=a_i^{-1}g_{ij}a_j=a_i^{-1}(a_i a_j^{-1})a_j=I$。従って $s'_i$ は重なりで一致して大域sectionを与え、[自明性判定](#prop-gbg3-cocycle-trivial)により束は自明。
<!-- solution-end -->

### Level C：局所表示から大域の幾何へ

<a id="ex-gbg3-c01"></a>
#### GBG3-C01 大域自明化の全工程
- Level: C

$P\to M$ を滑らかな主 $G$ 束、$s_i$ を開被覆 $\{U_i\}$ 上の局所sectionとし、$s_j=s_i g_{ij}$ とする。

1. 三重重なりの cocycle 条件を導け。
2. $s'_i=s_i h_i$ に変更したとき、$g'_{ij}$ を導け。また同じ点 $p\in\pi^{-1}(U_i)$ を $p=s_i(x)k_i=s'_i(x)k'_i$（$x=\pi(p)$）と表すとき、群座標 $k'_i$ を $k_i$ で表せ。
3. 滑らかな $a_i:U_i\to G$ があり $g_{ij}=a_i a_j^{-1}$ とする。局所sectionを貼り合わせて大域sectionを作り、$P$ と $M\times G$ の同型と逆写像を示せ。
4. 逆に束が自明なら、そのような $a_i$ を必ず作れることを証明せよ。

<!-- solution-start -->
**詳細解答**。

**第1問**。$U_{ijk}$ 上で $s_k=s_jg_{jk}=(s_i g_{ij})g_{jk}=s_i(g_{ij}g_{jk})$、同時に $s_k=s_i g_{ik}$。右作用の自由性から $g_{ij}g_{jk}=g_{ik}$。

**第2問**。$s'_i=s_i h_i$ なら $s_i=s'_i h_i^{-1}$。よって
$$
s'_j=s_jh_j=s_i g_{ij}h_j
=s'_i(h_i^{-1}g_{ij}h_j).
$$
群元の一意性から $g'_{ij}=h_i^{-1}g_{ij}h_j$。$p=s_i k_i=s'_i k'_i=s_i h_i k'_i$ と比べれば $k_i=h_i k'_i$、従って $k'_i=h_i^{-1}k_i$ である。

**第3問**。$t_i=s_i a_i$ と置く。重なりでは
$$
t_j=s_j a_j=s_i g_{ij}a_j
=s_i(a_i a_j^{-1})a_j=s_i a_i=t_i.
$$
従って $t(x)=t_i(x)$（$x\in U_i$）はどの $i$ を選んでも同じで、局所的に滑らかだから大域sectionになる。$F:M\times G\to P$ を $F(x,k)=t(x)k$ とすれば、右作用の滑らかさで $F$ は滑らか、[自由・推移性](../GBG2/index.md#prop-gbg2-free-transitive)で全単射、右作用にも同変である。$p=s_i(x)k_i$ のとき
$$
F^{-1}(p)=(x,a_i(x)^{-1}k_i)
$$
である。別表示 $p=s_j k_j=s_i g_{ij}k_j$ から $k_j=g_{ij}^{-1}k_i$ を得る。これを代入すると
$$
a_j^{-1}k_j=a_j^{-1}(a_i a_j^{-1})^{-1}k_i
=a_j^{-1}a_j a_i^{-1}k_i=a_i^{-1}k_i.
$$
逆写像の式は重なりで一致し、各 $U_i$ で滑らかなので全域で滑らか。よって $F$ は主束同型である。

**第4問**。$P$ が自明なら積主束からの同型 $F$ によって $t(x)=F(x,e)$ は大域sectionである。各局所section $s_i$ の[自明化](#thm-gbg3-section-trivialization)を使えば、唯一の滑らかな $a_i$ があり $t=s_i a_i$。重なりでは $s_i a_i=s_j a_j=s_i g_{ij}a_j$ なので自由性から $a_i=g_{ij}a_j$、右から $a_j^{-1}$ を掛けて $g_{ij}=a_i a_j^{-1}$。この $g_{ij}$ は非恒等でもよいので、非恒等というだけでは非自明性を判定できない。
<!-- solution-end -->

## 6. 次章へ

局所sectionの選択は、同じ主束をどの局所基準で記述するかという問題である。$s'_i=s_i h_i$ とすれば座標は $h_i^{-1}$、遷移関数は $h_i^{-1}g_{ij}h_j$ によって変わる。大域sectionの存在と自明性は同値である。

次の GBG4 では群の表現から結合ベクトル束を構成し、sectionの選び方に伴う物質場の局所成分の変換を考える。
