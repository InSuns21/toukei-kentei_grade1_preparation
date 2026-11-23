# GBG18 U(1)の非自明束はどう見えるか

[GBG3 の大域sectionと自明性の同値](../GBG3/index.md#thm-gbg3-global-section-trivial)によれば、主束が積束なら基底のすべての点で一つの滑らかな基準点を選べる。しかし[GBG2 のHopf主束](../GBG2/index.md#thm-gbg2-hopf-principal)では、北極付近と南極付近の局所sectionは作れても、全体のsectionが作れるかはまだ判定していなかった。

本講では球面を南北から覆い、赤道上でファイバーの位相を何回回すかによって **大域sectionの存在を判定する**。局所的にはどの束も積に見える。その局所的な見た目からは読み取れない差が、貼り合わせの回転数に現れる。

**設定と向き**：基底は標準的な向きを持つ単位球面
$$
S^2=\{(X,Y,Z)\in\mathbb R^3:X^2+Y^2+Z^2=1\}
$$
で、構造群は $U(1)=\{\lambda\in\mathbb C:|\lambda|=1\}$ とする。群の作用は右乗法 $p\cdot\lambda$ とし、重なり上の遷移関数は **$s_S=s_Ng_{NS}$** と定める。赤道を北極側から見て $(X,Y)=(\cos\theta,\sin\theta)$、$\theta$ の増加方向に一周させる。ここで $\theta$ は赤道の周回に沿う局所角度であり、球面全体で定義された実数値関数ではない。

## 1. 南北の積束を回転して貼り合わせる

球面から南極を除いた領域を $U_N$、北極を除いた領域を $U_S$ と置く。
$$
U_N=S^2\setminus\{(0,0,-1)\},\qquad
U_S=S^2\setminus\{(0,0,1)\}.
$$
どちらも平面と微分同相で、特に円板へ縮められる。重なりは両極を除いた帯状領域であり、そこで
$$
u(X,Y,Z)=\frac{X+iY}{\sqrt{X^2+Y^2}}\in U(1)
$$
と定める。分母は重なりでは零でない。赤道上で $u=e^{i\theta}$ である。

北・南の両方で積 $U_N\times U(1)$、$U_S\times U(1)$ を用意し、重なりにおける群座標を $g_{NS}(x)$ 倍して同一視する。この「境界付近で指定した関数を使って二つの自明束を接続する操作」が **clutching（貼り合わせ）** である。前講までの [cocycle による主束構成](../GBG1/index.md#thm-gbg1-gluing)を二つの開集合に適用したものになる。

<a id="def-gbg18-clutching"></a>

<!-- formal-statement-start -->
> **定義（球面上のU(1)クラッチング束）**  
> 整数 $n\in\mathbb Z$ に対し、重なり $U_N\cap U_S$ 上で
$$
g_{NS}^{(n)}(X,Y,Z)=u(X,Y,Z)^n
$$
> と置く。二つの積束に
$$
(x,\lambda)_S\sim(x,g_{NS}^{(n)}(x)\lambda)_N
$$
> という同値関係を入れた商を $P_n$ と書き、射影は $\pi([x,\lambda]_i)=x$、右作用は $[x,\lambda]_i\cdot a=[x,\lambda a]_i$ とする。局所sectionは $s_i(x)=[x,1]_i$ とし、$s_S=s_Ng_{NS}^{(n)}$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg18-clutching -->
**定義の確認**。$n=1$ なら赤道上で $g_{NS}^{(1)}(\theta)=e^{i\theta}$。例えば $\theta=0,\pi/2,\pi,3\pi/2$ で順に $1,i,-1,-i$ となり、一周すると位相は一回転する。二つの局所座標の関係を
$$
[x,\lambda]_S=[x,e^{i\theta}\lambda]_N
$$
と書けば、$[x,1]_S=[x,e^{i\theta}]_N=s_N(x)e^{i\theta}$ であり、宣言した右作用の規約と一致する。$n=0$ では $g=1$ で貼り合わせるので、$P_0$ は明示的に $S^2\times U(1)$ と同型である。
<!-- definition-example-end -->

<a id="prop-gbg18-principal"></a>

<!-- formal-statement-start -->
> **命題（貼り合わせで得られる球面主束）**  
> 各 $n\in\mathbb Z$ に対して、上で定めた $P_n\to S^2$ は滑らかな右主 $U(1)$ 束である。その南北sectionの遷移関数は $g_{NS}^{(n)}$ である。
<!-- formal-statement-end -->

**証明の見取り図**。重なりでの写像 $(x,\lambda)\mapsto(x,g_{NS}^{(n)}(x)\lambda)$ は滑らかな同変微分同相であり、二つの局所積座標はこの写像で接続される。

<!-- proof-start -->
### 証明

$u$ は $U_N\cap U_S$ 上で滑らかで $U(1)$ に値を取るので、$g_{NS}^{(n)}=u^n$ は負の $n$ も含めて滑らかである。座標変更
$$
T_{NS}(x,\lambda)=(x,g_{NS}^{(n)}(x)\lambda)
$$
の逆は $(x,\mu)\mapsto(x,g_{NS}^{(n)}(x)^{-1}\mu)$ であり、両方滑らかである。ここで $T_{NS}(x,\lambda a)=T_{NS}(x,\lambda)\cdot a$ だから右作用にも同変である。

$g_{SN}=(g_{NS}^{(n)})^{-1}$、$g_{NN}=g_{SS}=1$ とすれば、重なりの全ての cocycle 条件が成立する。[滑らかなcocycleからの貼り合わせ](../GBG1/index.md#thm-gbg1-gluing)により滑らかな主束と局所自明化が得られる。具体的にも各 $\pi^{-1}(U_i)$ は $U_i\times U(1)$ に同変に写り、右乗法は局所座標で自由かつ推移的である。射影は第一成分への射影だから滑らかである。

最後に $s_S(x)=[x,1]_S=[x,g_{NS}^{(n)}(x)]_N=s_N(x)g_{NS}^{(n)}(x)$ となる。
<!-- proof-end -->

ここまででは **どの $n$ も局所的には全く同じ積束**である。区別するには $S^1$ 上の位相の総回転数が必要になる。

## 2. 一周した位相の増分を整数にする

円周上の連続関数 $c:S^1\to U(1)$ を、$\theta\in[0,2\pi]$ に沿う関数 $c(e^{i\theta})$ として読む。各短い区間で連続な偏角を選び、区間の境目で $2\pi$ の整数倍を足してつなぐと、実数値の連続関数 $\varphi:[0,2\pi]\to\mathbb R$ を
$$
c(e^{i\theta})=e^{i\varphi(\theta)}
$$
と取れる。これは**位相の持ち上げ**である。始点と終点は円周の同じ点なので、$\varphi(2\pi)-\varphi(0)$ は $2\pi$ の整数倍となる。

<a id="def-gbg18-winding"></a>

<!-- formal-statement-start -->
> **定義（円周写像の巻き数）**  
> 連続写像 $c:S^1\to U(1)$ に対し、連続な位相持ち上げ $\varphi:[0,2\pi]\to\mathbb R$ を一つ取り、
$$
\operatorname{wind}(c)=
\frac{\varphi(2\pi)-\varphi(0)}{2\pi}\in\mathbb Z
$$
> を $c$ の **巻き数**と呼ぶ。始点の角度 $\theta=0$ は $(1,0)\in S^1$ に対応し、赤道を $\theta$ 増加方向に一周する。持ち上げの選択によらないことは次の命題で示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg18-winding -->
**定義の確認**。$c_n(e^{i\theta})=e^{in\theta}$ は整数 $n$ に対して始点と終点が一致する連続写像である。$\varphi_n(\theta)=n\theta$ を取れば
$$
\operatorname{wind}(c_n)
=\frac{2\pi n-0}{2\pi}=n.
$$
例えば $n=-2$ は逆向きに二回転する。$c(\theta)=e^{i(n\theta+\frac12\sin\theta)}$ のように途中で回転速度が変わっても、終点で $\sin2\pi=\sin0=0$ だから巻き数は $n$ のままである。
<!-- definition-example-end -->

<a id="lem-gbg18-winding-homotopy"></a>

<!-- formal-statement-start -->
> **補題（巻き数の選択独立性と変形不変性）**  
> 任意の連続写像 $c:S^1\to U(1)$ には連続な位相持ち上げが存在する。二つの持ち上げから得る巻き数は同じである。また、連続写像 $C:[0,1]\times S^1\to U(1)$ によって $c_0$ を $c_1$ に変形できるとき、
$$
\operatorname{wind}(c_0)=\operatorname{wind}(c_1)
$$
> が成り立つ。特に円板 $D^2$ 上に連続に延長できる $c$ は巻き数 $0$ である。
<!-- formal-statement-end -->

**証明の見取り図**。位相の持ち上げを局所的につなぎ、一周で増えた角度を記録する。連続変形で整数値が連続に変わることはできない。円板まで延長できる円周写像は、円板の中心まで縮めて定数写像に変形できる。

<!-- proof-start -->
### 証明

任意の点 $c(e^{i\theta_0})$ の近くには、値が長さ $2\pi$ 未満の円弧に収まる角度の連続な枝がある。区間 $[0,2\pi]$ の各点でその枝が使える小区間を選ぶ。コンパクト性により有限個の小区間に分割でき、隣り合う区間の角度は重なりで $2\pi k$（整数 $k$）だけ違う。後の枝にその整数倍を加えて合わせれば区間全体の連続な $\varphi$ が得られる。

$\varphi,\psi$ が二つの持ち上げなら $e^{i(\varphi-\psi)}=1$ なので、連続関数 $(\varphi-\psi)/(2\pi)$ は連結区間 $[0,2\pi]$ 上で整数値を取り、定数である。従って両者の始終点差は等しい。

変形 $C$ に対しても、長方形 $[0,1]\times[0,2\pi]$ を十分小さい長方形に分割して上の局所的な偏角の枝を合わせられる。二方向の重なりでの差は $2\pi$ の整数倍なので、小長方形を順に進めても閉じた小周回の差は $0$ となり、一つの連続な持ち上げ $\Phi(t,\theta)$ が得られる。ここで $\Phi(t,2\pi)-\Phi(t,0)$ は各 $t$ で $2\pi$ の整数倍であり、$t$ に連続に依存する。従ってその整数は一定である。

最後に $c$ が $F:D^2\to U(1)$ に延長できるなら、
$$
C(t,e^{i\theta})=F(te^{i\theta})
$$
は $t=1$ の $c$ と $t=0$ の定数 $F(0)$ を結ぶ連続変形である。定数写像の位相増分は $0$ だから $\operatorname{wind}(c)=0$。
<!-- proof-end -->

巻き数は積とも相性がよい。$c=e^{i\varphi}$、$d=e^{i\psi}$ なら $cd=e^{i(\varphi+\psi)}$、$c^{-1}=e^{-i\varphi}$ なので
$$
\operatorname{wind}(cd)=\operatorname{wind}(c)+\operatorname{wind}(d),
\qquad
\operatorname{wind}(c^{-1})=-\operatorname{wind}(c).
$$
これが section を変えても非自明性を見失わない理由になる。

## 3. なぜ一回でも回転すると大域sectionがないか

局所section $s_N,s_S$ の間の $g_{NS}$ は、各点での選択を変えると変化する。[局所section変更則](../GBG3/index.md#thm-gbg3-transition-change)により、$s'_i=s_i h_i$ とすれば
$$
g'_{NS}=h_N^{-1}g_{NS}h_S.
$$
しかし $h_N$ は北半球まで、$h_S$ は南半球まで滑らかに定義されている。各半球は円板なので、その赤道制限の巻き数は $0$ である。従って赤道上で $\operatorname{wind}(g'_{NS})=\operatorname{wind}(g_{NS})$ となる。

<a id="thm-gbg18-obstruction"></a>

<!-- formal-statement-start -->
> **定理（巻き数による球面主束の非自明性）**  
> 第1節の滑らかな右主 $U(1)$ 束 $P_n\to S^2$ について、次の三条件は同値である。
>
> 1. $P_n$ に滑らかな大域sectionが存在する。
> 2. $P_n$ は積主束 $S^2\times U(1)$ と同型である。
> 3. $n=0$。
>
> 特に $n\ne0$ の $P_n$ は、二つの自明な局所束から作ったにもかかわらず非自明である。
<!-- formal-statement-end -->

**証明の見取り図**。大域sectionが存在したと仮定すると、南北の局所sectionからのずれ $h_N,h_S$ ができる。赤道上で $g_{NS}=h_Nh_S^{-1}$ となるが、右辺の各因子は半球へ延長できて巻き数が零。よって $n$ は零でなければならない。

<!-- proof-start -->
### 証明

**(1) $\Longleftrightarrow$ (2)** は[大域sectionと積束の同値定理](../GBG3/index.md#thm-gbg3-global-section-trivial)による。ここで $P_n$ は前節で滑らかな主束と証明済みなので、その定理を適用できる。

**(1) $\Longrightarrow$ (3)**。大域section $\sigma$ があると仮定する。$U_i$ 上で $\sigma=s_i h_i$ と一意に書けるのは[sectionと局所自明化の対応](../GBG3/index.md#thm-gbg3-section-trivialization)による。重なりでは
$$
s_Nh_N=\sigma=s_Sh_S=s_Ng_{NS}^{(n)}h_S
$$
なので、右作用の自由性から
$$
g_{NS}^{(n)}=h_Nh_S^{-1}.
$$
赤道 $E=\{Z=0\}$ に制限する。$h_N$ は閉じた北半球 $D_N=\{Z\ge0\}$ 上で定義され、$h_S$ は閉じた南半球 $D_S=\{Z\le0\}$ 上で定義される。それぞれの円板への延長に対し[巻き数補題](#lem-gbg18-winding-homotopy)を用いると
$$
\operatorname{wind}(h_N|_E)=0,\qquad
\operatorname{wind}(h_S|_E)=0.
$$
従って
$$
n=\operatorname{wind}(g_{NS}^{(n)}|_E)
=0-0=0.
$$

**(3) $\Longrightarrow$ (1)**。$n=0$ では $g_{NS}^{(0)}=1$。$s_N$ と $s_S$ は重なりで一致するので、一つの滑らかな大域sectionに貼り合わさる。
<!-- proof-end -->

この証明は「球面の各点でファイバーが円だから非自明」という議論ではない。**ファイバーは全て同じ円**であり、障害は局所的に選んだ「基準点どうしの関係」が赤道を一周すると巻いてしまうことである。

さらに違う $n$ 同士も区別できる。

<a id="thm-gbg18-distinct"></a>

<!-- formal-statement-start -->
> **定理（巻き数が異なる球面主束の非同型性）**  
> 整数 $m,n$ に対し、基底 $S^2$ の恒等写像を覆う右 $U(1)$ 同変な滑らかな主束同型 $P_n\to P_m$ が存在するための必要十分条件は $n=m$ である。
<!-- formal-statement-end -->

**証明の見取り図**。同型があれば両側の局所sectionが滑らかな群値関数 $h_N,h_S$ で関係づく。貼り合わせの互換式を赤道へ制限し、巻き数を比べる。

<!-- proof-start -->
### 証明

$F:P_n\to P_m$ を主束同型とし、$P_n$ の局所sectionを $s_i^{(n)}$、$P_m$ のものを $s_i^{(m)}$ とする。同じ基底点でのファイバーの自由・推移性より
$$
F(s_i^{(n)}(x))=s_i^{(m)}(x)h_i(x)
$$
を満たす滑らかな $h_i:U_i\to U(1)$ が一意にある。重なりで $s_S^{(n)}=s_N^{(n)}g_{NS}^{(n)}$ を用い、$F$ の右同変性を適用すると
$$
s_S^{(m)}h_S
=F(s_S^{(n)})
=F(s_N^{(n)})g_{NS}^{(n)}
=s_N^{(m)}h_Ng_{NS}^{(n)}.
$$
$s_S^{(m)}=s_N^{(m)}g_{NS}^{(m)}$ と右作用の自由性から
$$
g_{NS}^{(m)}h_S=h_Ng_{NS}^{(n)}.
$$
$U(1)$ は可換であるから、赤道上での巻き数は
$$
m+\operatorname{wind}(h_S|_E)
=\operatorname{wind}(h_N|_E)+n.
$$
両半球まで延長する $h_N,h_S$ の巻き数は $0$ なので $m=n$。逆に $m=n$ なら、同じ貼り合わせ商を恒等写像で同型にできる。
<!-- proof-end -->

ここでの同型は**基底を固定**する。基底の向きを反転する写像まで許せば、赤道の向きも反転するため $n$ と $-n$ を対応させることがある。したがって「どの向きを固定した分類か」を明示する必要がある。

## 4. GBG2 の Hopf 主束は $n=1$ の具体例

[Hopf写像の定義](../GBG2/index.md#def-gbg2-hopf-map)は
$$
H(z,w)=\bigl(2\operatorname{Re}(z\overline w),
2\operatorname{Im}(z\overline w),|z|^2-|w|^2\bigr)
$$
であり、$S^3=\{(z,w)\in\mathbb C^2:|z|^2+|w|^2=1\}$ に右作用 $(z,w)\cdot\lambda=(z\lambda,w\lambda)$ を入れていた。これと**同じ符号規約**で局所sectionを具体的に書こう。

北極側 $U_N$ では $z$ を非負実数に、南極側 $U_S$ では $w$ を非負実数に選ぶ。各点 $x=(X,Y,Z)$ で
$$
s_N(x)=
\left(\sqrt{\frac{1+Z}{2}},
\frac{X-iY}{\sqrt{2(1+Z)}}\right),
$$
$$
s_S(x)=
\left(\frac{X+iY}{\sqrt{2(1-Z)}},
\sqrt{\frac{1-Z}{2}}\right)
$$
と置く。分母は指定した領域で正である。この表示は[Hopf主束の局所自明化](../GBG2/index.md#thm-gbg2-hopf-principal)の各群座標を $1$ にしたものである。

<a id="prop-gbg18-hopf-transition"></a>

<!-- formal-statement-start -->
> **命題（Hopf束の遷移関数の巻き数）**  
> 上の $H:S^3\to S^2$、右 $U(1)$ 作用、南北sectionに対し、重なりで
$$
s_S(x)=s_N(x)\,u(x),\qquad
u(x)=\frac{X+iY}{\sqrt{X^2+Y^2}}.
$$
> 従って赤道上の遷移関数は $e^{i\theta}$、巻き数は $+1$ である。この Hopf 主束は $P_1$ と同型で、大域sectionを持たない。
<!-- formal-statement-end -->

**証明の見取り図**。Hopf写像の二成分を代入し、両局所sectionが確かに同じ $(X,Y,Z)$ を覆うことを検算する。両者の第一成分の比を取ると位相 $u$ が現れ、第二成分でも同じ位相になる。

<!-- proof-start -->
### 証明

北側で $a=\sqrt{(1+Z)/2}$、$b=(X-iY)/\sqrt{2(1+Z)}$ と置く。球面条件 $X^2+Y^2=1-Z^2$ により
$$
|a|^2+|b|^2=\frac{1+Z}{2}+\frac{1-Z^2}{2(1+Z)}
=\frac{1+Z+1-Z}{2}=1.
$$
また
$$
2a\overline b=X+iY,\qquad
|a|^2-|b|^2=Z
$$
だから $H(s_N(x))=x$ である。南側も $a'=(X+iY)/\sqrt{2(1-Z)}$、$b'=\sqrt{(1-Z)/2}$ に対し
$$
|a'|^2=\frac{1+Z}{2},\quad |b'|^2=\frac{1-Z}{2},
\quad 2a'\overline{b'}=X+iY
$$
となり $H(s_S(x))=x$ が成立する。

重なりで $X+iY=r e^{i\theta}$、$r=\sqrt{1-Z^2}$ と書くと、
$$
s_N=\left(\sqrt{\frac{1+Z}{2}},
\sqrt{\frac{1-Z}{2}}e^{-i\theta}\right),\qquad
s_S=\left(\sqrt{\frac{1+Z}{2}}e^{i\theta},
\sqrt{\frac{1-Z}{2}}\right).
$$
従って二成分とも $s_S=s_Ne^{i\theta}$。これは重なり全域で $s_S=s_Nu$ を意味する。赤道では $u=e^{i\theta}$ なので[巻き数の定義](#def-gbg18-winding)から $+1$ である。[貼り合わせ構成](#prop-gbg18-principal)の局所自明化とこの二つのsectionを対応させると $P_1$ から Hopf束への同型が得られる。最後に[非自明性定理](#thm-gbg18-obstruction)を $n=1$ へ適用する。
<!-- proof-end -->

したがって Hopf 束は「非自明な束が存在する」という抽象的な主張だけでなく、**同じ球面を二つの自明な部分で覆っているのに、一周の位相のずれが打ち消せない**という計算可能な例になった。赤道の向きまたは $s_N,s_S$ の順序を逆にすれば巻き数は $-1$ になるので、符号は図の見かけだけでは決まらない。

## 5. 大域的な位相と局所的な接続を混同しない

[GBG16 の円周上の平坦接続](../GBG16/index.md#prop-gbg16-circle-holonomy)は、**自明な主束の上でも**非自明なホロノミーを持ち得る。他方、ここでの $P_n$ の非自明性は接続を選ぶ前に定まる。両者は異なる不変量である。

非自明な $P_n$ の上にも接続は存在する（[主束接続の存在](../GBG12/index.md#thm-gbg12-connection-exists)）。しかし大域sectionがないので、基底 $S^2$ 全体で一つの section から得る大域ポテンシャル $A=s^*\omega$ を使うことはできない。局所ポテンシャル $A_N,A_S$ は[ゲージポテンシャルの変換則](../GBG8/index.md#thm-gbg8-local-transform)に従って貼り合わされる。これを曲率積分と結び付け、整数電荷として回収するのが次講 **GBG19** である。

---

## 6. 演習と詳細解答

### Level A：群座標・巻き数・Hopf表示を確かめる

<a id="ex-gbg18-a01"></a>
#### GBG18-A01 二つの群座標と右作用
- Level: A

$P_2$ の赤道上で $\theta=\pi/2$ とする。南側表示 $[x,-i]_S$ を北側表示に書き換えよ。また右から $a=i$ を掛けた点について、どちらの局所表示を使っても同じ点になることを確かめよ。

<!-- solution-start -->
**詳細解答**。[球面上のU(1)クラッチング束](#def-gbg18-clutching)より $g_{NS}^{(2)}=e^{2i\theta}=e^{i\pi}=-1$。したがって
$$
[x,-i]_S=[x,(-1)(-i)]_N=[x,i]_N.
$$
右から $i$ を掛けると、南側では $[x,(-i)i]_S=[x,1]_S$、北側では $[x,i\,i]_N=[x,-1]_N$。$[x,1]_S=[x,g_{NS}^{(2)}]_N=[x,-1]_N$ で一致する。貼り合わせ写像が右作用と可換であることを具体的に確認した。
<!-- solution-end -->

<a id="ex-gbg18-a02"></a>
#### GBG18-A02 回転速度が一定でない写像の巻き数
- Level: A

$c(e^{i\theta})=\exp(i(3\theta+2\sin\theta))$ が円周から $U(1)$ への写像であることを確認し、その巻き数と逆写像 $c^{-1}$ の巻き数を求めよ。

<!-- solution-start -->
**詳細解答**。$\theta$ を $2\pi$ 増すと指数の実数部分は $6\pi$ 増えるので、$c(\theta+2\pi)=c(\theta)$。よって円周上で一価な連続写像である。位相持ち上げ $\varphi(\theta)=3\theta+2\sin\theta$ の端点差は
$$
\varphi(2\pi)-\varphi(0)=6\pi+0=6\pi
$$
だから[巻き数](#def-gbg18-winding)は $3$。逆写像には持ち上げ $-\varphi$ を使えるので $\operatorname{wind}(c^{-1})=-3$ である。
<!-- solution-end -->

<a id="ex-gbg18-a03"></a>
#### GBG18-A03 Hopf束の赤道上の局所section
- Level: A

$H(z,w)=(2\operatorname{Re}(z\overline w),2\operatorname{Im}(z\overline w),|z|^2-|w|^2)$ とし、赤道の $(X,Y,Z)=(0,1,0)$ で第4節の $s_N,s_S$ を計算せよ。$s_S=s_N\lambda$ となる $\lambda\in U(1)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$X=0,Y=1,Z=0$ を代入すると
$$
s_N=\frac{1}{\sqrt2}(1,-i),\qquad
s_S=\frac{1}{\sqrt2}(i,1).
$$
$s_N i=\frac1{\sqrt2}(i,(-i)i)=\frac1{\sqrt2}(i,1)=s_S$ より $\lambda=i$。この点の赤道角は $\theta=\pi/2$ なので $e^{i\theta}=i$ とも一致する。これは[Hopf遷移関数の命題](#prop-gbg18-hopf-transition)の一点での検算である。
<!-- solution-end -->

<a id="ex-gbg18-a04"></a>
#### GBG18-A04 sectionの位相変更が巻き数を変えない
- Level: A

$P_1$ で $h_N(X,Y,Z)=e^{iZ}$、$h_S(X,Y,Z)=e^{-2iZ}$ とし、$s'_i=s_i h_i$ とする。赤道上の新しい遷移関数を求め、巻き数を計算せよ。

<!-- solution-start -->
**詳細解答**。どちらの $h_i$ も対応する開集合で滑らかな $U(1)$ 値写像である。赤道では $Z=0$ なので $h_N=h_S=1$。[section変更則](../GBG3/index.md#thm-gbg3-transition-change)より
$$
g'_{NS}=h_N^{-1}g_{NS}^{(1)}h_S
=e^{-iZ}u\,e^{-2iZ}=u\,e^{-3iZ}.
$$
赤道へ制限すれば $g'_{NS}|_E=u|_E=e^{i\theta}$ だから巻き数は $1$。帯状領域の途中では関数値が変わっても、大域的な障害は変わらない。
<!-- solution-end -->

### Level B：延長障害・束同型・結合線束をつなぐ

<a id="ex-gbg18-b01"></a>
#### GBG18-B01 円板へ延長できる回転の巻き数は零
- Level: B

$c(e^{i\theta})=\exp(i(2\sin\theta+\cos\theta))$ について、円板全体への滑らかな延長 $F:D^2\to U(1)$ を一つ構成し、巻き数が零であることを直接計算せよ。

<!-- solution-start -->
**詳細解答**。円板を $(x,y)$、$x^2+y^2\le1$ とし
$$
F(x,y)=\exp(i(2y+x))
$$
と置く。実数値関数 $2y+x$ は円板の全域で滑らかなので $F$ も滑らかで $|F|=1$。境界 $(x,y)=(\cos\theta,\sin\theta)$ では $F=c$ となる。偏角持ち上げ $\varphi(\theta)=2\sin\theta+\cos\theta$ は $\varphi(0)=1$、$\varphi(2\pi)=1$ を満たし
$$
\operatorname{wind}(c)=\frac{1-1}{2\pi}=0.
$$
[延長障害の補題](#lem-gbg18-winding-homotopy)とも整合する。なお偏角が途中で増減することと、始終点の総増分が非零であることは違う。
<!-- solution-end -->

<a id="ex-gbg18-b02"></a>
#### GBG18-B02 $P_{-2}$ と $P_2$ を区別する
- Level: B

$P_{-2}$ と $P_2$ が基底の恒等写像を覆う主束同型で結べないことを、北・南局所sectionの変換関数を仮定して証明せよ。また赤道の向きを逆にしたとき、両者の表示上の巻き数を説明せよ。

<!-- solution-start -->
**詳細解答**。同型 $F:P_{-2}\to P_2$ があるとすると、両領域で $F(s_i^{(-2)})=s_i^{(2)}h_i$ と書ける。$g_2h_S=h_Ng_{-2}$ を赤道上で比較する。[円周写像の巻き数](#def-gbg18-winding)は積で加法的になるので、その公式を適用する。$h_N,h_S$ は各半球へ延長できるので、それぞれ巻き数は零。従って
$$
2+0=0+(-2)
$$
となり矛盾する。よって同型は存在しない。これは[相互非同型性定理](#thm-gbg18-distinct)の具体的再証明である。赤道の周回パラメータを $\theta'=-\theta$ に替えると $e^{2i\theta}=e^{-2i\theta'}$ となり、同じ写像に割り当てる巻き数の**符号表示**が逆転する。向きを固定した上での二束の区別は変わらない。
<!-- solution-end -->

<a id="ex-gbg18-b03"></a>
#### GBG18-B03 表現の整数指数 $q$ と結合線束
- Level: B

$P_n$ と整数 $q$ に対し、$U(1)$ の一次元複素表現 $\rho_q(\lambda)=\lambda^q$ を使って結合線束 $L_q=P_n\times_{\rho_q}\mathbb C$ を作る。南北局所成分 $v_N,v_S$ の関係を導き、$n=2,q=-3$ のとき赤道で何周するか答えよ。

<!-- solution-start -->
**詳細解答**。[結合束の局所成分変換](../GBG4/index.md#thm-gbg4-component-transformation)では、$s_S=s_Ng_{NS}$ に対して
$$
v_S=\rho_q(g_{NS}^{-1})v_N=(g_{NS}^{(n)})^{-q}v_N.
$$
赤道上では $g_{NS}^{(n)}=e^{in\theta}$ なので $v_S=e^{-iqn\theta}v_N$。一方、結合線束の**枠そのもの**の遷移は $\rho_q(g_{NS}^{(n)})=e^{iqn\theta}$ で巻き数は $qn$ である。$n=2,q=-3$ では枠の巻き数は $-6$、成分を南側に移す係数 $e^{6i\theta}$ の巻き数は $+6$。両者を混同しないことが重要である。
<!-- solution-end -->

<a id="ex-gbg18-b04"></a>
#### GBG18-B04 二つの貼り合わせを掛ける
- Level: B

赤道上で $g_n=e^{in\theta}$、$g_m=e^{im\theta}$ とする。積 $g_ng_m$ を遷移関数とする束 $P$ について、対応する整数を求め、$m=-n$ の場合に大域sectionを具体的に与えよ。

<!-- solution-start -->
**詳細解答**。$U(1)$ の乗法は可換で
$$
g_ng_m=e^{in\theta}e^{im\theta}=e^{i(n+m)\theta}=g_{n+m}.
$$
従って貼り合わせでできる束は定義により $P_{n+m}$。$m=-n$ では $g_0=1$ となるため、各局所積の単位元 section $s_N(x)=[x,1]_N$ と $s_S(x)=[x,1]_S$ は重なりで一致し、全球面の滑らかな section $\sigma$ を定める。[非自明性定理](#thm-gbg18-obstruction)でも $n+m=0$ と一致する。
<!-- solution-end -->

### Level C：Hopf束と貼り合わせ障害を一つの証明で扱う

<a id="ex-gbg18-c01"></a>
#### GBG18-C01 Hopf束を局所表示から構成し非自明性を証明する
- Level: C

$S^3\subset\mathbb C^2$ 上の右 $U(1)$ 作用 $(z,w)\lambda=(z\lambda,w\lambda)$ と $H(z,w)=(2\operatorname{Re}(z\overline w),2\operatorname{Im}(z\overline w),|z|^2-|w|^2)$ を用いる。$U_N=S^2\setminus\{\text{南極}\}$、$U_S=S^2\setminus\{\text{北極}\}$ とする。

1. 第4節の $s_N,s_S$ が各領域で滑らかな $S^3$ 値の局所sectionであることを確認せよ。
2. 重なりの遷移関数を $s_S=s_Ng_{NS}$ の規約で求め、赤道を正の $\theta$ 方向に一周させて巻き数を出せ。
3. Hopf主束に大域sectionが存在すると仮定し、南北での変換関数 $h_N,h_S$ を使って矛盾を導け。
4. 右作用の規約を維持したまま南北sectionの順序を逆にして $s_N=s_Sg_{SN}$ と書くと、巻き数はいくつになるか。元の束と別物になるか。

<!-- solution-start -->
**詳細解答**。

**1.** 北側で $a=\sqrt{(1+Z)/2}$、$b=(X-iY)/\sqrt{2(1+Z)}$ とすると、
$$
|a|^2+|b|^2
=\frac{1+Z}{2}+\frac{X^2+Y^2}{2(1+Z)}
=\frac{1+Z}{2}+\frac{1-Z}{2}=1.
$$
さらに $2a\overline b=X+iY$、$|a|^2-|b|^2=Z$ だから $H(s_N(x))=x$。$Z>-1$ で分母は正なので $s_N$ は滑らかである。南側は $a'=(X+iY)/\sqrt{2(1-Z)}$、$b'=\sqrt{(1-Z)/2}$ と置くと
$$
|a'|^2=\frac{1+Z}{2},\quad
|b'|^2=\frac{1-Z}{2},\quad
2a'\overline{b'}=X+iY.
$$
従って $|a'|^2+|b'|^2=1$、$H(s_S)=x$。$Z<1$ で滑らかである。

**2.** 重なりでは $r=\sqrt{X^2+Y^2}=\sqrt{1-Z^2}>0$ とし、$u=(X+iY)/r$ と置ける。$u=e^{i\theta}$ と書くと
$$
s_N=\left(\sqrt{\frac{1+Z}{2}},\sqrt{\frac{1-Z}{2}}u^{-1}\right),
\qquad
s_S=\left(\sqrt{\frac{1+Z}{2}}u,\sqrt{\frac{1-Z}{2}}\right).
$$
両成分に $u$ を掛けた $s_Nu$ は $s_S$ に等しいので $g_{NS}=u$。赤道では $u=e^{i\theta}$、位相持ち上げは $\varphi(\theta)=\theta$ で
$$
\operatorname{wind}(g_{NS}|_E)=\frac{2\pi-0}{2\pi}=1.
$$

**3.** 大域section $\sigma$ を仮定すると、[主束のsection表示](../GBG3/index.md#thm-gbg3-section-trivialization)から $\sigma=s_Nh_N=s_Sh_S$。$s_S=s_Ng_{NS}$ より
$$
g_{NS}=h_Nh_S^{-1}.
$$
各 $h_i$ の赤道制限は、それぞれ閉北半球・閉南半球へ連続に延長できる。巻き数補題から二つとも巻き数 $0$ であるため
$$
1=\operatorname{wind}(g_{NS}|_E)
=\operatorname{wind}(h_N|_E)-\operatorname{wind}(h_S|_E)
=0,
$$
という矛盾を得る。従って大域sectionは存在せず、[大域sectionと自明性の同値](../GBG3/index.md#thm-gbg3-global-section-trivial)から非自明である。

**4.** $s_S=s_Ng_{NS}$ の両辺に右から $g_{NS}^{-1}$ を掛けて $s_N=s_Sg_{NS}^{-1}$。従って $g_{SN}=u^{-1}=e^{-i\theta}$ で巻き数は $-1$。**同じ主束を逆向きの遷移で表しただけ**であり、束の総空間も右作用も変化しない。固定した南北のラベルを保持して別の貼り合わせ束 $P_{-1}$ を構成する操作とは区別する。
<!-- solution-end -->

---

## 7. 次講へ

球面上の $U(1)$ 束を赤道の位相関数から構成すると、巻き数によって大域sectionの有無を判定できる。特に Hopf束はここで固定した赤道の向きと遷移関数の規約で巻き数 $+1$ である。次の **GBG19** では、同じ南北パッチ上の局所接続 $A_N,A_S$ を実際に書き、曲率を積分した量がこの整数へ結び付くことを計算する。
