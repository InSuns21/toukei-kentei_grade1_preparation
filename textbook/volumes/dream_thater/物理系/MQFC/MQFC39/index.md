# MQFC39 時間順序積と因果分解

[自由場のスター積](../MQFC38/index.md#def-mqfc38-star)では観測量を並べる順序が交換子を決めた。相互作用の摂動展開では、挿入の時間順に応じてこの積の順序を選びたい。しかし光円錐上には特異な分布があり、挿入点が一致したところでは積の延長も必要になる。本講では二つの挿入の時間順序積を収縮で作り、何が因果関係だけで決まるかを調べる。

## 1. 順序を選ぶ二点核

時空は $M=\mathbb R^{1+3}$、計量は $(-,+,+,+)$、配置は滑らかな実スカラー場とする。自由方程式の作用素は

$$
P=-\Box+m^2=\partial_t^2-\sum_{j=1}^3\partial_{x^j}^2+m^2,\qquad m\ge0
$$

とする。$x=(t_x,\boldsymbol x)$ は時空点であり、$\partial_t$ は空間座標を固定する時間偏微分である。$P_x,P_y$ は二点核の指定した変数だけに作用する記号である。具体的な局所核の計算では $m=0$ を選ぶ。場に方程式はまだ課さない。以下の双線形な核の対には複素共役を入れない。

$W$ を前講の [自由場のスター積](../MQFC38/index.md#def-mqfc38-star) に用いた真空二点分布とする。二点核 $H$ の作用を $H(f,g)=\langle H,f\otimes g\rangle$ と略記する。転置 $H^T$ は $H^T(f,g)=H(g,f)$ を満たす核であり、複素共役とは異なる。特に $W^T(x,y)=W(y,x)$ と書く。対称な核とは $H^T=H$ を満たすものをいう。[Peierls括弧](../MQFC38/index.md#def-mqfc38-peierls)で用いた符号は

$$
K=G_{\mathrm{adv}}-G_{\mathrm{ret}},
\qquad W-W^T=iK.
$$

$G_{\mathrm{adv}}$ と $G_{\mathrm{ret}}$ は [先進・遅延Green作用素](../../../解析系/HPDE/HPDE18/index.md#def-hpde18-green-operators) の分布核である。作用素にも同じ記号を使い、$H(f,g)=\int f(x)(Hg)(x)\,d^4x$ が核との対応である。[Green作用素の因果的支持と基本解性](../../../解析系/HPDE/HPDE18/index.md#thm-hpde18-green-existence) により、それぞれ $x$ が $y$ の因果的過去・未来に入るときにだけ支持を持つ。$P_x$ を作用させると両者とも恒等作用素の核 $\delta_{\mathrm{diag}}$ になる。これは [Diracのデルタ分布](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) を差変数で使ったもので、試験関数 $\psi$ には

$$
\langle\delta_{\mathrm{diag}},\psi\rangle=\int_M\psi(y,y)\,d^4y
$$

と作用する。$W$ は両変数で自由方程式を満たす。

[二点時間順序核の非対角構成](../MQFC31/index.md#prop-mqfc31-two-point-order)では、後の点を左に並べ、空間的分離で二つの順序が一致することを確認した。この核を、対角も含めた分布として書く便利な方法がある。以下では [Feynman二点分布](../../QFT/QFT6/index.md#def-qft6-feynman-two-point) の真空期待値の規格化を用い、追加の $i$ を掛けない。

<a id="prop-mqfc39-feynman-green"></a>

<!-- formal-statement-start -->
> **命題（時間順序核のGreen作用素表示）**
> 上記のMinkowski真空二点分布 $W$ と先進・遅延核を用いて $D$ を

$$
D=W-iG_{\mathrm{adv}}
$$

> と置く。$D$ は対称分布であり、両変数において $PD=-i\delta_{\mathrm{diag}}$ を満たす。
> $U_+$ は $x$ が $y$ の因果的過去に入らない点対、$U_-$ は $y$ が $x$ の因果的過去に入らない点対の開集合とする。このとき

$$
D|_{U_+}=W|_{U_+},\qquad
D|_{U_-}=W^T|_{U_-}.
$$

> ここで $\delta_{\mathrm{diag}}(x,y)=\delta^{(4)}(x-y)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

先進核を引けば、その支持の外では真空二点分布を変えない。交換子の式で先進核を遅延核に取り替えると、逆の時間順序も得られる。

<!-- proof-start -->
### 証明

$P$ は実定数係数であり、コンパクト支持試験関数の間で二階偏微分を二回部分積分すると符号が戻るため形式的自己随伴である。この性質と [Green作用素の転置と時間方向の反転](../../../解析系/HPDE/HPDE19/index.md#thm-hpde19-green-transpose-pairing) から先進核の転置は遅延核である。交換子の式を変形すると

$$
W-iG_{\mathrm{adv}}
=W^T-iG_{\mathrm{ret}}.
$$

一方、左辺の転置も右辺に等しいので $D^T=D$ である。Green作用素の基本解性から

$$
P_xD=P_xW-iP_xG_{\mathrm{adv}}
=0-i\delta_{\mathrm{diag}}.
$$

対称性を使えば $P_yD=(P_xD)^T=-i\delta_{\mathrm{diag}}$ となる。

[Green作用素の因果的支持](../../../解析系/HPDE/HPDE18/index.md#thm-hpde18-green-existence) により先進核は $U_+$ で零である。遅延核は $U_-$ で零なので、二つの表示から結論が従う。Minkowski時空では因果的過去の条件は

$$
t_x-t_y\le-|\boldsymbol x-\boldsymbol y|
$$

であり、閉条件である。従って $U_+$ は開で、$U_-$ も開である。両方の閉条件が成り立つには時刻差と空間差がともに零でなければならない。従って $U_+\cup U_-$ は対角を除く全点対を覆う。
<!-- proof-end -->

例えば時刻差が正なら $U_+$、負なら $U_-$ に入る。時刻差が零で空間差が非零なら両方に入る。重なりでは両Green核が零なので $W=W^T$ となる。これは分布の制限についての等式であり、光円錐上で分布を点ごとに評価する操作ではない。

質量零の真空では、この $D$ の非対角部分は [質量ゼロ二線核の次数](../MQFC35/index.md#prop-mqfc35-fish-kernel) で使った核である。

$$
D(x,y)=\frac{1}{4\pi^2}
\bigl(|\boldsymbol x-\boldsymbol y|^2-(t_x-t_y)^2+i0\bigr)^{-1}.
$$

ここで $i0$ は正の虚部からの分布境界値を意味する。光円錐から離れた空間的分離では通常の正の関数になる。したがって因果応答が零でも時間順序の収縮は一般に零ではない。

## 2. 二つの観測量の時間順序積

まず円筒多項式、すなわち $L_f(\phi)=\int f\phi$ の有限個の積と複素係数の線形結合を扱う。複素係数を許すのは、収縮の係数が複素数になるためである。$f$ は滑らかなコンパクト支持試験関数である。[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) の記号 $F^{(n)}=F^{(n)}(\phi)$ は、場の方向を $n$ 回変化させた微分を表す分布核である。実部と虚部をそれぞれ微分して複素数値に拡張する。円筒多項式の各階の核は滑らかでコンパクト支持を持つため、[分布のテンソル積](../../../解析系/MICA/MICA6/index.md#def-mica6-tensor-product) をこれらの核に作用させることができる。

[自由場のスター積](../MQFC38/index.md#def-mqfc38-star) では $W$ で異なる因子間の微分を結んだ。時間順序積では同じ収縮操作の核を $D$ に替える。単独の因子の内部では収縮しないという規約を採る。これは自由Wick多項式を入力とする表示である。$\hbar$ は形式変数とし、[形式展開](../MQFC31/index.md#def-mqfc31-formal-coupling) と同様に係数ごとに計算する。$D^{\otimes n}$ は独立な変数対 $(x_j,y_j)$ に置く $n$ 個の核を表す。作用させる試験関数は

$$
F^{(n)}(\phi)(x_1,\ldots,x_n)G^{(n)}(\phi)(y_1,\ldots,y_n)
$$

であり、各核の第一・第二変数をそれぞれ対応する因子にそろえる。

<a id="def-mqfc39-time-product"></a>

<!-- formal-statement-start -->
> **定義（円筒多項式の時間順序積）**
> $D$ を [時間順序核のGreen作用素表示](#prop-mqfc39-feynman-green) で定めた対称分布とする。円筒多項式 $F,G$ に対し

$$
T_2(F,G)=
\sum_{n\ge0}\frac{\hbar^n}{n!}
\langle D^{\otimes n},F^{(n)}\otimes G^{(n)}\rangle
$$

> と定める。第零項は通常の積 $FG$ とし、各 $D$ は第一因子の変数と第二因子の変数を一つずつ結ぶ。多項式では有限和であり、形式冪級数には双線形に、各次数で有限個の項を足して拡張する。$T_1(F)=F$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc39-time-product -->
### 直接例：二つの平均値

**定義の確認**。$X=L_f,Y=L_g$ とする。[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) では、場を $\phi+sh$ に変えると $L_f(\phi+sh)=X+sL_f(h)$ だから、一次核は $f$ で二階以上は零である。$Y$ も同様に一次核は $g$ である。よって

$$
T_2(X,Y)=XY+\hbar D(f,g).
$$

$D(f,g)$ は滑らかなコンパクト支持関数 $f\otimes g$ への分布の作用なので有限である。零次と一次だけが残り、結果は円筒多項式の形式冪級数である。$D^T=D$ なので逆順も同じになる。定数 $1$ の微分は零だから $T_2(1,Y)=Y$ であり、一因子の規約にも整合する。
<!-- definition-example-end -->

一方、スター積では $X\star_W Y=XY+\hbar W(f,g)$ である。この二つを比較することで、量子の非可換な積と、時間順序を選んだ対称な積を区別できる。

<a id="thm-mqfc39-time-conjugation"></a>

<!-- formal-statement-start -->
> **定理（時間順序積と通常積の変換）**
> 円筒多項式の形式冪級数上で、対称分布 $D$ による二階微分作用素を

$$
\Gamma_D F=\frac12\langle D,F^{(2)}\rangle
$$

> とし、$\mathcal T=\exp(\hbar\Gamma_D)$ と置く。これは逆写像 $\mathcal T^{-1}=\exp(-\hbar\Gamma_D)$ を持ち、

$$
T_2(F,G)=\mathcal T\bigl((\mathcal T^{-1}F)
(\mathcal T^{-1}G)\bigr)
$$

> が成立する。従って $T_2$ は可換・結合的で単位元は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一つの積を二回微分すると、第一因子だけ、第二因子だけ、両者を一回ずつ微分する三種類の項が出る。逆写像は最初の二種類を取り消し、因子間の収縮だけを残す。

<!-- proof-start -->
### 証明

両汎関数で使う試験関数を $f_1,\ldots,f_N$ とし、座標 $z_j=L_{f_j}(\phi)$ を選ぶ。多項式表示を $p(z),q(z)$、$d_{ij}=D(f_i,f_j)$ とする。対称性より $d_{ij}=d_{ji}$ である。$\partial_i=\partial/\partial z_i$ は他の多項式変数を固定した偏微分であって、時空微分ではない。

[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) の定義に戻る。場を $\phi+sh+uk$ に変えると、第 $i$ 座標は $z_i+sL_{f_i}(h)+uL_{f_i}(k)$ になる。基点 $\phi$ と方向 $h,k$ を固定し、実パラメータ $s,u$ を一回ずつ微分して零に戻すと、連鎖律から

$$
\left.\partial_s\partial_u F(\phi+sh+uk)\right|_{s=u=0}
=\sum_{i,j=1}^N(\partial_i\partial_j p)(z)
L_{f_i}(h)L_{f_j}(k).
$$

従って二階の核は

$$
F^{(2)}(\phi)=\sum_{i,j=1}^N
(\partial_i\partial_j p)(z)f_i\otimes f_j.
$$

これに $D$ を作用させると $D(f_i,f_j)=d_{ij}$ なので

$$
\Gamma_D p=\frac12\sum_{i,j=1}^N
d_{ij}\partial_i\partial_j p.
$$

二つの独立座標 $z^{(1)},z^{(2)}$ を用意し、それぞれに作用する上の作用素を $\Gamma_1,\Gamma_2$ とする。因子間の作用素は

$$
B=\sum_{i,j=1}^N d_{ij}
\partial_{z_i^{(1)}}\partial_{z_j^{(2)}}.
$$

二座標を一致させる写像を $\mu H(z)=H(z,z)$ とする。連鎖律を二回適用すると

$$
\partial_i\partial_j(\mu H)=
\mu\bigl((\partial_{z_i^{(1)}}+\partial_{z_i^{(2)}})
(\partial_{z_j^{(1)}}+\partial_{z_j^{(2)}})H\bigr).
$$

同じ座標組への二階微分を $\Gamma_1,\Gamma_2$ にまとめ、異なる座標組への二項を $B$ にまとめると

$$
\Gamma_D\mu=\mu(\Gamma_1+\Gamma_2+B).
$$

混合項の係数は $d_{ij}/2$ と $d_{ji}/2$ の和であり、$d_{ij}$ となる。全作用素の係数は定数で、偏微分が可換なので $\Gamma_1,\Gamma_2,B$ は互いに可換である。上の式を繰り返し適用すれば

$$
e^{\hbar\Gamma_D}\mu
=\mu e^{\hbar(\Gamma_1+\Gamma_2+B)}.
$$

従って逆写像を両因子に作用させた式では

$$
\mathcal T\mu e^{-\hbar(\Gamma_1+\Gamma_2)}
=\mu e^{\hbar B}.
$$

右辺を指数の各次数に展開すると $n$ 個の $d_{ij}$ が二つの因子の $n$ 階微分を結ぶ。係数は $\hbar^n/n!$ なので [円筒多項式の時間順序積](#def-mqfc39-time-product) と一致する。

$\Gamma_D$ は多項式次数を二つ下げるから各多項式への指数作用は有限和である。形式冪級数の場合も各 $\hbar$ 次数に寄与する項は有限個である。二つの指数の合成の $\hbar^n\Gamma_D^n$ の係数は

$$
\sum_{k=0}^n\frac{(-1)^k}{k!(n-k)!}
=\frac{(1-1)^n}{n!}
$$

であり、$n\ge1$ で零、$n=0$ で1となるため恒等写像となる。座標が独立でない場合も、出発点が汎関数微分の核への作用なので表示に依存しない。

通常積は可換かつ結合的である。上の変換により、例えば三因子のどちらの括弧付けも

$$
\mathcal T\bigl((\mathcal T^{-1}F)
(\mathcal T^{-1}G)(\mathcal T^{-1}H)\bigr)
$$

に一致する。定数 $1$ には全ての正階微分が零なので単位元も保存される。
<!-- proof-end -->

この変換は円筒多項式での公式である。例えば $X=L_f$ なら

$$
\Gamma_D(X^2)=D(f,f),\qquad
\mathcal T(X^2)=X^2+\hbar D(f,f).
$$

二因子 $T_2(X,X)$ はこの結果と一致する。一方、一つの入力としての $T_1(X^2)$ は $X^2$ そのものである。単独のWick因子の内部を収縮しない規約と、二つの因子を時間順序付けする操作を混同しない。

## 3. 二因子を因果的に並べる

汎関数の台は [汎関数の台](../MQFC37/index.md#def-mqfc37-functional-support) に従う。ただし以下では微分核の支持を確実に制御するため、円筒多項式を構成する全試験関数の台の和を用いる。$F$ 側のそのコンパクト集合を $A$、$G$ 側を $B$ とする。

$A$ が $B$ の因果的過去に入らないとは、全ての $x\in A,y\in B$ が $U_+$ に入ることである。単に二つの台の中心時刻を比較する条件ではない。この条件の下で全ての因子間収縮が同じ時間順序を選ぶ。

<a id="thm-mqfc39-two-factor-causality"></a>

<!-- formal-statement-start -->
> **定理（二因子の因果因子化）**
> 円筒多項式 $F,G$ の構成試験関数の台の和をそれぞれ $A,B$ とする。$A\times B\subset U_+$ なら

$$
T_2(F,G)=F\star_W G.
$$

> $A\times B\subset U_-$ なら

$$
T_2(F,G)=G\star_W F.
$$

> 両条件を満たせば二つのスター積は一致する。
<!-- formal-statement-end -->

### 証明の見取り図

微分するたびに現れる試験関数は元の台の中にある。従って各収縮を、台の上で一致する核に置き換えられる。

<!-- proof-start -->
### 証明

$F=p(L_{f_1},\ldots,L_{f_N})$ と書く。$n$ 階の微分核は

$$
F^{(n)}=\sum_{i_1,\ldots,i_n}
(\partial_{i_1}\cdots\partial_{i_n}p)
f_{i_1}\otimes\cdots\otimes f_{i_n}.
$$

$G$ についても試験関数を $g_j$ として同じ展開をする。これらを [円筒多項式の時間順序積](#def-mqfc39-time-product) に代入すると、各収縮は $D(f_i,g_j)$ の積になる。$A\times B\subset U_+$ なら $f_i\otimes g_j$ の台は $U_+$ 内にコンパクトに含まれる。[時間順序核のGreen作用素表示](#prop-mqfc39-feynman-green) により

$$
D(f_i,g_j)=W(f_i,g_j).
$$

全ての階で収縮係数が同じだから [自由場のスター積](../MQFC38/index.md#def-mqfc38-star) の定義と一致する。逆の条件では

$$
D(f_i,g_j)=W^T(f_i,g_j)=W(g_j,f_i).
$$

微分係数は通常の複素数値の積なので順序を交換できる。全ての添字対を入れ替えれば $G\star_W F$ の各階の係数を得る。両条件が成り立つ場合には両方が $T_2(F,G)$ に等しい。
<!-- proof-end -->

例えば時刻 $2$ と時刻 $0$、空間座標はいずれも原点を中心とする半径 $1/4$ のEuclid時空球に試験関数を置く。第一球の任意の点から第二球の任意の点を引いた時刻差は少なくとも $3/2$、空間距離は高々 $1/2$ である。従って第一球が未来側となり第一の等式が適用できる。

空間的に離れた二つの台では順序をどちらにしてもよい。しかし時間が交錯する台では単一の順序を選べない。その場合も円筒多項式では分布 $D$ による積を定義できる。

## 4. 局所Wick多項式ではどこで延長が必要か

円筒多項式と異なり、同一点の場の冪を積分する局所観測量には微分核にデルタが現れる。例えば試験関数 $f$ に対して

$$
Q_f(\phi)=\frac12\int_M f(x)\phi(x)^2\,d^4x
$$

と置く。[局所微分核の対角表示](../MQFC37/index.md#prop-mqfc37-diagonal-derivatives) から

$$
Q_f^{(1)}=f\phi,\qquad
Q_f^{(2)}(x_1,x_2)=f(x_1)\delta^{(4)}(x_1-x_2).
$$

従って二次収縮では二点核を二乗しなければならない。まず対角を除く点対だけを扱う。ここで $m=0$ とする。

<a id="prop-mqfc39-local-quadratic"></a>

<!-- formal-statement-start -->
> **命題（局所二次挿入の非対角収縮）**
> 質量零の自由真空に対し、試験関数 $f,g$ の台が交わらないとする。このとき局所二次挿入の時間順序積は

$$
T_2(Q_f,Q_g)=Q_fQ_g
+\hbar D(f\phi,g\phi)
+\frac{\hbar^2}{2}\langle D^2,f\otimes g\rangle
$$

> で定まり、第三項は対角外の分布積への作用を表す。さらに台が因果的に順序付けられていれば、その順序の自由場スター積と一致する。
> 台の交わりを許して同じ式を使うには、対角外の $D^2$ を対角へ延長する必要がある。差変数 $z=x-y$ の原点への [スケーリング次数](../MQFC32/index.md#def-mqfc32-scaling-degree) 4を保つ二つの延長の差は $c\delta^{(4)}$ ($c\in\mathbb C$) である。
<!-- formal-statement-end -->

### 証明の見取り図

微分核のデルタは各挿入内の変数を同じ点に集める。二つの挿入点まで同じにするわけではない。二本の線を結ぶ分布積は対角外で存在するが、差変数の原点を含める段階で局所反項が現れる。

<!-- proof-start -->
### 証明

[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) の定義に従い、$\phi+sh_1+uh_2$ を $Q_f$ に代入する。一次の $s$ の係数は $\int f\phi h_1$、混合項 $su$ の係数は $\int fh_1h_2$ であり、三次以上の項はない。従って一次・二次核は節冒頭の式になり、三階以上は零である。従って形式的な収縮は零次、一次、二次の三項だけを持つ。一次核 $f\phi$ と $g\phi$ は試験関数なので一次の作用が存在する。

二次の係数は二つの独立な線を各挿入の対角に制限するものである。対角外では $U_+,U_-$ が被覆をなす。[時間順序核のGreen作用素表示](#prop-mqfc39-feynman-green) により、各開集合では二本とも $W$ または二本とも $W^T$ に置換できる。

[マイクロ因果条件による収縮の存在](../MQFC38/index.md#prop-mqfc38-microcausal-contraction) の後の局所二次の計算と同じく、各向きで二本の核の対角制限が存在する。具体的には [引き戻しの存在定理](../../../解析系/MICA/MICA7/index.md#thm-mica7-pullback) の仮定を対角写像 $\iota(x,y)=(x,x;y,y)$ で確認する。微分は $(h,j)\mapsto(h,h;j,j)$ なので、余ベクトル $(k_1,k_2;l_1,l_2)$ の引き戻しは $(k_1+k_2,l_1+l_2)$ である。[余法方向の定義](../../../解析系/MICA/MICA7/index.md#def-mica7-normal-set) から、禁止される非零方向は

$$
k_1+k_2=0,\qquad l_1+l_2=0
$$

を満たすものとなる。[テンソル積の波面集合の包含](../../../解析系/MICA/MICA6/index.md#prop-mica6-tensor-wavefront) と [質量零Minkowski真空の全波面方向](../../../解析系/MICA/MICA13/index.md#prop-mica13-flat-wavefront) によれば、各組 $(k_a,l_a)$ ($a=1,2$) は両方零か、第一成分が未来向き、第二成分が過去向きの非零光的余ベクトルである。計量符号のため第一成分は $k_{a0}\le-|\boldsymbol k_a|$ を満たす。

もし $k_1+k_2=0$ なら、非正の時間成分の和が零なので $k_{10}=k_{20}=0$ となり、上の不等式から空間成分も両方零となる。各組は両方零の場合にしか第一成分が零にならないので $l_1=l_2=0$ となる。これは波面集合の非零方向ではない。転置の場合は錐が逆になるだけで同じ非衝突条件を満たす。重なりでは $W=W^T$ だから分布積も一致する。このように得た積は [質量ゼロ二線核の次数](../MQFC35/index.md#prop-mqfc35-fish-kernel) で構成した差変数の二乗核である。

二次微分には $1/2$ が残らないので、二次収縮の係数は $1/2!$ のみである。$f\otimes g$ の台は対角外にあるため第三項は定義できる。台の全点対が $U_+$ に入れば各核を $W$ に、$U_-$ に入れば $W^T$ に置換でき、前講の局所二次スター積の式と一致する。

差変数 $z=x-y$ の原点を含む延長は [二線核の減算延長とcutoff反項](../MQFC35/index.md#thm-mqfc35-fish-extension) で構成できる。[局所反項の自由度](../MQFC34/index.md#thm-mqfc34-counterterm-freedom) が適用できる。差変数の次元が4、元のスケーリング次数も4だからである。許されるデルタの微分次数は $4-4=0$ 以下となる。

差変数の分布を点対に戻すには、座標 $(z,y)$ で第二変数について試験関数を積分する。具体的に第三項の作用は

$$
\langle D^2,\chi\rangle,\qquad
\chi(z)=\int_M f(z+y)g(y)\,d^4y
$$

である。$\chi$ の台は $\operatorname{supp}f-\operatorname{supp}g$ に含まれ、この差集合は二つのコンパクト集合の直積の連続像なのでコンパクトである。$z$ による微分は固定したコンパクトな $g$ の台上の積分の中で行え、全階の導関数が存在する。従って $\chi$ は試験関数である。$D^2$ の延長を $c\delta^{(4)}$ だけ変えると、時間順序積の変化は

$$
\frac{\hbar^2 c}{2}\chi(0)
=\frac{\hbar^2 c}{2}\int_M f(y)g(y)\,d^4y.
$$

台が交わらなければこの差は零となる。従って因果的に順序付けられた台での条件だけでは、この定数は決まらない。
<!-- proof-end -->

ここでの延長の比較は並進不変な差変数核について行った。一般の多点延長や、対称性・ユニタリ性を満たす反項の同時選択は別の条件を必要とする。

自由Wick積では一挿入内の自己収縮をあらかじめ取り除く。しかし二つの挿入間を結ぶ線までなくなるわけではない。時間順序付きの二本の線は対角延長を必要とする。この区別が次講の因果帰納構成の出発点となる。

## 5. 演習

### 演習 MQFC39-A1：核の転置と源
- Level: A

$D=W-iG_{\mathrm{adv}}$ とする。交換子の式から別表示を導き、$P_xD$ を求めよ。

<!-- solution-start -->
**詳細解答**

[時間順序核のGreen作用素表示](#prop-mqfc39-feynman-green) の仮定より

$$
W=W^T+iG_{\mathrm{adv}}-iG_{\mathrm{ret}}.
$$

これを代入すると $D=W^T-iG_{\mathrm{ret}}$。先進・遅延核は互いに転置であるため、右辺は $D^T$ に等しい。$P_xW=0$ と先進核の基本解性から

$$
P_xD=0-i\delta_{\mathrm{diag}}.
$$

従って真空期待値の規格化での源は $-i$ を伴う。
<!-- solution-end -->

### 演習 MQFC39-A2：二つの開集合
- Level: A

差変数を $(t,\boldsymbol z)$ とする。$(2,0,0,0)$、$(-2,0,0,0)$、$(0,1,0,0)$、$(0,0,0,0)$ が $U_+,U_-$ のどちらに入るか判定せよ。

<!-- solution-start -->
**詳細解答**

二つの条件はそれぞれ

$$
U_+:\ t>-|\boldsymbol z|,\qquad
U_-:\ t<|\boldsymbol z|
$$

である。第一の点では $2>0$ だが $2<0$ は偽なので $U_+$ のみ。

第二の点では $-2<0$ だが $-2>0$ は偽なので $U_-$ のみ。

第三では $0>-1$ と $0<1$ がともに成立する。原点では両方が等号になり、厳密不等式を満たさない。対角だけが被覆から外れる。
<!-- solution-end -->

### 演習 MQFC39-A3：線形と二次の収縮
- Level: A

$X=L_f,Y=L_g,d=D(f,g)$ として $T_2(X^2,Y)$ を求めよ。

<!-- solution-start -->
**詳細解答**

一次微分は $2Xf,g$、二次微分は $2f\otimes f,0$ である。[円筒多項式の時間順序積](#def-mqfc39-time-product) に代入すると零次は $X^2Y$、一次は $\hbar(2X)d$、二次以上は零である。

$$
T_2(X^2,Y)=X^2Y+2\hbar Xd.
$$

逆順でも $D(g,f)=d$ だから等しい。
<!-- solution-end -->

### 演習 MQFC39-A4：単独因子と二因子
- Level: A

$X=L_f,d=D(f,f)$ とする。$T_1(X^2)$、$T_2(X,X)$、$\mathcal T^{-1}(X^2)$ を比較せよ。

<!-- solution-start -->
**詳細解答**

定義により $T_1(X^2)=X^2$。二因子では一次の収縮が一つあり $T_2(X,X)=X^2+\hbar d$。二階微分の係数は $2$ なので

$$
\Gamma_D(X^2)=\frac12(2d)=d.
$$

さらに $\Gamma_D d=0$。従って [時間順序積と通常積の変換](#thm-mqfc39-time-conjugation) での逆指数は

$$
\mathcal T^{-1}(X^2)=X^2-\hbar d.
$$

一挿入内部と異なる挿入間の収縮は別である。
<!-- solution-end -->

### 演習 MQFC39-B1：二次同士の全収縮
- Level: B

$X=L_f,Y=L_g,d=D(f,g)$ とする。$T_2(X^2,Y^2)$ を全次数で求め、$A\times B\subset U_+$ の場合のスター積と比較せよ。

<!-- solution-start -->
**詳細解答**

一次核は $2Xf,2Yg$、二次核は $2f\otimes f,2g\otimes g$ であり、三次以上は零。[円筒多項式の時間順序積](#def-mqfc39-time-product) では一次の収縮は $(2X)(2Y)D(f,g)=4XYd$。二次の収縮は独立な二組への作用なので $(2)(2)D(f,g)^2=4d^2$。後者の係数に $1/2!$ を掛けるので

$$
T_2(X^2,Y^2)=X^2Y^2+4\hbar XYd+2\hbar^2d^2.
$$

指定の支持条件では [時間順序核のGreen作用素表示](#prop-mqfc39-feynman-green) から $d=W(f,g)$ となる。これを代入した全三項が [自由場のスター積](../MQFC38/index.md#def-mqfc38-star) の収縮係数と一致する。
<!-- solution-end -->

### 演習 MQFC39-B2：三因子の括弧付け
- Level: B

$X=L_f,Y=L_g,Z=L_h$ とし、$d_{fg}=D(f,g)$ 等とする。$T_2(T_2(X,Y),Z)$ と $T_2(X,T_2(Y,Z))$ を直接比較せよ。

<!-- solution-start -->
**詳細解答**

$T_2(X,Y)=XY+\hbar d_{fg}$。第一階の核は $Yf+Xg$ で、定数項の微分は零である。$Z$ の二階以上の微分も零だから

$$
T_2(T_2(X,Y),Z)
=XYZ+\hbar(d_{fg}Z+d_{fh}Y+d_{gh}X).
$$

逆順では $T_2(Y,Z)=YZ+\hbar d_{gh}$ で一次核は $Zg+Yh$。よって

$$
T_2(X,T_2(Y,Z))
=XYZ+\hbar(d_{gh}X+d_{fg}Z+d_{fh}Y).
$$

両者は等しい。これが [時間順序積と通常積の変換](#thm-mqfc39-time-conjugation) で得た結合性の三線形因子の場合である。
<!-- solution-end -->

### 演習 MQFC39-B3：中心時刻だけでは足りない
- Level: B

二つの台 $A,B$ がそれぞれ時刻 $1,0$ の点を中心に持つとする。さらに $A$ に時刻 $-1$ の空間原点、$B$ に時刻 $2$ の空間原点が含まれるとする。

この場合、$A\times B\subset U_+$ は成立するか。両台が空間的に分離している場合とも比較せよ。

<!-- solution-start -->
**詳細解答**

指定の点対では時刻差は $-1-2=-3$、空間差は零である。$-3>0$ は偽だから $U_+$ に入らず、全点対についての条件が破れる。従って中心時刻だけで [二因子の因果因子化](#thm-mqfc39-two-factor-causality) の第一の等式を適用できない。

一方、全点対が空間的分離なら $|t_x-t_y|<|\boldsymbol x-\boldsymbol y|$。これは $U_+,U_-$ の両条件を含む。そこで両スター積は同じ時間順序積に等しくなる。ただし核の値自体が零になるとは限らない。
<!-- solution-end -->

### 演習 MQFC39-C1：二次挿入と局所反項
- Level: C

$V_f=\int f\phi^3/3!$、$Q_g=\int g\phi^2/2$ とする。まず台が交わらないとして時間順序積の全収縮を求めよ。次に台の交わりを許し、差変数での二線核の延長を $c\delta^{(4)}$ だけ変えたときの差を求めよ。

<!-- solution-start -->
**詳細解答**

[汎関数微分](../MQFC37/index.md#def-mqfc37-functional-derivative) の定義で $\phi+sh_1+uh_2$ を代入すると、三乗の $s$ の係数は $3\phi^2h_1$、$su$ の係数は $6\phi h_1h_2$ である。規格化 $1/3!$ を掛けて一次核は $f\phi^2/2$、二方向微分は $\int f\phi h_1h_2$ となる。従って二次核は

$$
V_f^{(2)}(x_1,x_2)=
f(x_1)\phi(x_1)\delta^{(4)}(x_1-x_2).
$$

三次核も存在するが、$Q_g$ の三次以上の微分は零である。$Q_g$ の一次核は $g\phi$、二次核は $g(x_1)\delta^{(4)}(x_1-x_2)$。従って [局所二次挿入の非対角収縮](#prop-mqfc39-local-quadratic) と同じ二本の線の制限を使える。$f\phi$ も滑らかなコンパクト支持関数である。三項を並べると

$$
T_2(V_f,Q_g)=V_fQ_g
+\hbar D(f\phi^2/2,g\phi)
+\frac{\hbar^2}{2}\langle D^2,(f\phi)\otimes g\rangle.
$$

二次項は差変数の試験関数

$$
\chi(z)=\int f(z+y)\phi(z+y)g(y)\,d^4y
$$

への作用である。二つの試験関数の台はコンパクトなので、交わらなければ非空の場合の最小距離は正である。その距離より $|z|$ が小さければ $f(z+y)g(y)=0$ となるため、$\chi$ は原点の近傍で零である。片方が零関数の場合も同じ結論になる。台の交わりを許した場合、[二線核の減算延長とcutoff反項](../MQFC35/index.md#thm-mqfc35-fish-extension) に従って $D^2$ を延長する。延長差 $c\delta^{(4)}$ を代入すれば

$$
\Delta T_2(V_f,Q_g)
=\frac{\hbar^2c}{2}\int f(y)g(y)\phi(y)\,d^4y.
$$

これは一つの時空点の場だけを積分した局所汎関数となる。台が交わらない場合には $fg=0$ だから差も零である。従って非対角での因果因子化だけでは係数 $c$ は決まらない。
<!-- solution-end -->

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016（時間順序積と局所くりこみの構成）。
- [MQFC35 Feynman核の対角延長を計算する](../MQFC35/index.md)（質量零の二線核と延長）。
- [MQFC38 Peierls括弧と自由場の積](../MQFC38/index.md)（符号規約と自由Wick積）。
