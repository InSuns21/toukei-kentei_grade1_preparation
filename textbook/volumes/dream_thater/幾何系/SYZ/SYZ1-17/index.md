# SYZ1-17 Gross–Siebertとトロピカル退化

<!-- definition-example-audit: strict -->

## 1. 滑らかな双対トーラス束が壊れた先で、何を記録するか

[二重整数アフィン構造](../SYZ1-08/index.md#thm-syz1-08-two-integral-affine)から[semi-flat鏡像](../SYZ1-10/index.md#thm-syz1-10-complex-gluing)を作るには、滑らかなトーラス束を仮定した。[節点モノドロミー](../SYZ1-14/index.md#thm-syz1-14-picard-lefschetz)は、この束の周期格子を特異点の周囲で一定の基底に戻せないことを示した。[壁の経路整合性](../SYZ1-16/index.md#def-syz1-16-path-consistency)は、単項式でない補正を貼り合わせる際にも障害が生じることを明らかにした。

そこで別の入口を使う。まず代数多様体を単純な成分へ**退化**させ、その成分がどのように接するかを整数アフィンな胞体で記録する。胞体ごとの線形データを折れ線状の関数にまとめ、壁に沿う代数的な補正を整合的にしたうえで、逆向きに退化族を組み立てる。これがGross–Siebert計画の組合せ的な発想である。

この講では、読者の手で検算できる局所構成を順に完成させる。Gross–Siebertの大域再構成定理は、専門的な追加条件を明示した外部結果として紹介する。組合せ的な退化データから、任意のCalabi–Yau多様体の特殊Lagrangeトーラス束の存在まで導くわけではない。

## 2. 特異整数アフィン空間と胞体

整数アフィン座標とは、重なりで線形部分が整数行列となる座標である。[整数アフィン構造の定義](../SYZ1-08/index.md#def-syz1-08-integral-affine)を、特異点を除いた集合だけに与える。

次元 $n$ の位相空間 $B$ の閉部分集合 $\Delta$ を**判別集合**と呼び、$B_0=B\setminus\Delta$ に整数アフィン座標を入れる。重なりでの座標変換は $u'=Au+b$、$A\in GL(n,\mathbb Z)$、$b\in\mathbb R^n$ とする。$B$ 全体が滑らかなアフィン多様体であるとは仮定しない。特異性の手掛かりは $\Delta$ を回るときの整数接格子のモノドロミーである。

<a id="def-syz1-17-affine-singular"></a>

<!-- formal-statement-start -->
> **定義（特異整数アフィン多様体）**  
> $B$ を $n$ 次元位相多様体、$\Delta\subset B$ を閉集合とする。$B_0=B\setminus\Delta$ 上に、重なりの遷移が $u'=Au+b$（$A\in GL(n,\mathbb Z)$、$b\in\mathbb R^n$）となる座標系があるとき、$(B,\Delta)$ を特異整数アフィン多様体と呼ぶ。各座標の整数ベクトルが張る局所格子を $\Lambda\subset TB_0$ と書く。$\Delta$ の点でのアフィン座標や $\Lambda$ の延長は定義に含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-17-affine-singular -->
### 直接例：正則な平面と節点型の障害

$B=\mathbb R^2$、$\Delta=\varnothing$、標準座標 $u=(u_1,u_2)$ なら、遷移は恒等行列であり $\Lambda=\mathbb Ze_1\oplus\mathbb Ze_2$ と直接確認できる。$\Delta=\{0\}$ としても、単に標準座標を $B_0$ へ制限しただけなら周回モノドロミーは恒等である。**穴があることと、非自明な特異アフィン構造を持つことは別**である。

これに対して、[節点型モノドロミーの模型](../SYZ1-14/index.md#thm-syz1-14-picard-lefschetz)では、適切な格子基底に関する周回行列が

$$
T=\begin{pmatrix}1&1\\0&1\end{pmatrix}
$$

となる。$T\in SL(2,\mathbb Z)$ だが $T\ne I$ なので、同じ平行移動不変基底で格子を円板全体へ延長できない。ここでは既習の局所系の模型を使っており、任意の $\Delta$ にこの行列を指定できるという意味ではない。

**定義の確認**：正則部の座標遷移は整数可逆行列を持ち、格子はそこに定まる。一方、後者の非自明な周回は特異点を跨ぐ一つの大域座標による延長と両立しない。
<!-- definition-example-end -->

格子の各座標で、整数格子点を頂点とする凸多角形やその面を考える。複数の凸多角形が**共通の面でのみ交わり**、合わせて領域を覆うなら、各面を**胞体（cell）**とする多面体分割である。高次元でも凸多面体とその面で同様に定義する。非コンパクトな例では非有界の多面体を許し、局所有限性（任意のコンパクト集合が有限個の胞体としか交わらない）を要求する。

<a id="def-syz1-17-polyhedral"></a>

<!-- formal-statement-start -->
> **定義（整数多面体分割）**  
> $B=\mathbb R^n$ に標準整数アフィン構造を与える。$\mathscr P$ が整数多面体分割であるとは、整数格子点を頂点に持つ有理的な閉凸多面体とその全ての面からなる局所有限な集まりで、和集合が $B$、二つの胞体の共通部分が空集合または双方の面であることをいう。特異アフィン空間では、各正則部の整数アフィン座標と整合する対応する分割を考えるが、特異点近傍での追加の適合条件が必要になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-17-polyhedral -->
### 直接例：三つの扇形

$\mathbb R^2$ の関数 $\varphi(u,v)=\max(0,u,v)$ を考える。$0$、$u$、$v$ のどれが最大かに応じた三つの閉領域

$$
\begin{aligned}
\sigma_0&=\{(u,v):u\le0,\ v\le0\},\\
\sigma_u&=\{(u,v):u\ge0,\ u\ge v\},\\
\sigma_v&=\{(u,v):v\ge0,\ v\ge u\}
\end{aligned}
$$

と、それらの面を $\mathscr P$ とする。各領域は整数係数の不等式で表される有理凸多面錐であり、頂点は原点、二つの閉領域の交わりは共通の境界半直線または原点である。三領域は平面を覆い、有限集合なので局所有限である。

**定義の確認**：被覆・共通面・整数性・局所有限性を個別に確認した。これは特異点を持たない $\mathbb R^2$ 上の分割例である。
<!-- definition-example-end -->

## 3. 折れ線の傾きから双対な多面体へ

[滑らかなLegendre双対](../SYZ1-09/index.md#thm-syz1-09-legendre-duality)では微分可能な凸ポテンシャルの勾配を使った。しかし、胞体の上で線形な関数の勾配は境界で跳ぶ。跳んだ傾きそのものを双対側の辺として記録すればよい。

整数アフィン座標 $u\in\mathbb R^n$ で、胞体ごとに $\varphi(u)=\langle m_\sigma,u\rangle+c_\sigma$、$m_\sigma\in\mathbb Z^n$ と書ける連続関数を考える。各胞体では傾きが一定だが、隣接胞体の境界で跳び得る。次の定義では、その差を法線の向きとともに測る。特異アフィン多様体では大域的な一つの関数でなく、局所関数どうしの差が整数アフィン関数になるように貼る場合もある。この種の局所ポテンシャルのデータを**多価の区分線形ポテンシャル**と呼ぶ。

<a id="def-syz1-17-integral-pl"></a>

<!-- formal-statement-start -->
> **定義（整数区分線形関数と折れ目）**  
> $\mathscr P$ を $\mathbb R^n$ の整数多面体分割とする。連続関数 $\varphi:\mathbb R^n\to\mathbb R$ が各最大次元胞体 $\sigma$ 上で $\langle m_\sigma,u\rangle+c_\sigma$（$m_\sigma\in\mathbb Z^n$）となるとき、$\varphi$ を $\mathscr P$ 上の整数区分線形関数という。二胞体に接する余次元1の面で、指定した正の法線方向の傾きの差を折れ目という。$\varphi$ が凸なら、法線の向きを凸性と整合させた折れ目は非負である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-17-integral-pl -->
### 直接例：折れ目が2である直線

$\mathbb R$ を $(-\infty,0]$ と $[0,\infty)$ で分割し、

$$
\varphi(u)=\max(0,2u)
=\begin{cases}0&u\le0,\\2u&u\ge0\end{cases}
$$

とする。両側の値は $u=0$ で一致し、傾きは整数 $0,2$、正方向への傾きの跳びは $2-0=2$ である。$u\le0$ における傾き $0$ と $u\ge0$ における傾き $2$ は単調増加するので $\varphi$ は凸である。

**定義の確認**：連続性・各胞体上の整数アフィン性・折れ目の符号を別々に計算した。
<!-- definition-example-end -->

次に、凸関数の各傾きを整数線形汎関数の格子 $M=\operatorname{Hom}(\mathbb Z^n,\mathbb Z)$ の点と考え、その凸包を作る。これは全平面の有限凸区分線形関数に対する**局所離散Legendre模型**である。一般のGross–Siebertの離散Legendre変換は、胞体とその双対胞体、局所的な多価ポテンシャル、特異アフィン構造の貼り合わせも交換するため、傾きの凸包だけに還元されない。

<a id="def-syz1-17-discrete-legendre"></a>

<!-- formal-statement-start -->
> **定義（凸区分線形関数の局所離散Legendre双対）**  
> $\varphi(u)=\max_{1\le i\le r}(\langle m_i,u\rangle+c_i)$ を $\mathbb R^n$ 上の有限な凸整数区分線形関数とする。$m_i\in M=\mathbb Z^n$ を各線形部分の傾きとして、双対多面体を

$$
\Delta_\varphi=\operatorname{conv}\{m_1,\ldots,m_r\}\subset M_{\mathbb R}
$$

> と定める。併せて凸共役を $\varphi^*(p)=\sup_{u\in\mathbb R^n}(\langle p,u\rangle-\varphi(u))$ と置く。$c_i=0$ の同次模型では、$\varphi$ は $\Delta_\varphi$ の支持関数となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-17-discrete-legendre -->
### 直接例：一つの折れ目の双対区間

$\varphi(u)=\max(0,2u)$ の線形部分の傾きは $0,2$ なので $\Delta_\varphi=[0,2]$ となる。$0\le p\le2$ なら、$u\le0$ では $pu\le0=\varphi(u)$、$u\ge0$ では $pu\le2u=\varphi(u)$ である。$u=0$ で差が0になるため $\varphi^*(p)=0$。$p<0$ なら $u\to-\infty$、$p>2$ なら $u\to+\infty$ で差が無限大になる。

$$
\varphi^*(p)=\begin{cases}0&0\le p\le2,\\+\infty&\text{それ以外}.\end{cases}
$$

**定義の確認**：傾きの整数性、凸包、双対区間の内部・外部での上限を全て確認した。凸共役は区間外で無限大を取るので、滑らかなLegendreポテンシャルと同じ実数値関数ではない。
<!-- definition-example-end -->

<a id="prop-syz1-17-triangle-dual"></a>

<!-- formal-statement-start -->
> **命題（三扇形の離散双対三角形）**  
> $\varphi(u,v)=\max(0,u,v)$ を $\mathbb R^2$ 上の凸関数とする。その傾きの凸包は

$$
\Delta=\{(p,q)\in\mathbb R^2:p\ge0,\ q\ge0,\ p+q\le1\}
$$

> であり、凸共役は $\Delta$ 上で0、$\mathbb R^2\setminus\Delta$ 上で $+\infty$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

各扇形の傾きを列挙し、三点の凸包を不等式で書く。内側では凸結合を用いて上限が0以下であることを示す。外側では破れた不等式に対応する方向へ変数を伸ばす。

<!-- proof-start -->
### 証明

三つの最大次元胞体での傾きは、それぞれ $(0,0)$、$(1,0)$、$(0,1)$ である。三点の凸結合は

$$
(p,q)=a(1,0)+b(0,1)+(1-a-b)(0,0)
$$

で、$a,b\ge0$、$a+b\le1$。よって凸包は指定した $\Delta$ に等しい。

$(p,q)\in\Delta$ のとき、$p,q,1-p-q$ は非負で総和が1なので、任意の $(u,v)$ に対して

$$
pu+qv=p\,u+q\,v+(1-p-q)0\le\max(0,u,v)=\varphi(u,v).
$$

従って $\langle(p,q),(u,v)\rangle-\varphi(u,v)\le0$、一方 $(u,v)=(0,0)$ で0に達するので $\varphi^*(p,q)=0$。

$(p,q)\notin\Delta$ なら、少なくとも $p<0$、$q<0$、$p+q>1$ のどれかが成立する。$p<0$ なら $(u,v)=(-s,0)$、$q<0$ なら $(u,v)=(0,-s)$、$p+q>1$ なら $(u,v)=(s,s)$ とし、$s>0$ を大きくする。最初の二場合は $\varphi=0$ で差がそれぞれ $-ps$、$-qs$、最後は $\varphi=s$ で差が $(p+q-1)s$ になる。いずれも $s\to\infty$ で $+\infty$ に発散する。従って領域外の凸共役は $+\infty$ である。
<!-- proof-end -->

定数項を付け足して $\varphi$ を整数アフィン関数 $\ell(u)=\langle k,u\rangle+c$ だけ変えると、傾きは全て $k$ だけ平行移動し、双対多面体も $\Delta_{\varphi+\ell}=\Delta_\varphi+k$ となる。従って局所ポテンシャルの貼り合わせを「整数アフィン関数の差まで」としたとき、双対胞体を比較するにはこの平行移動も追う。

<a id="prop-syz1-17-affine-shift"></a>

<!-- formal-statement-start -->
> **命題（整数アフィン項の追加と双対多面体）**  
> 有限凸整数区分線形関数 $\varphi$ と $\ell(u)=\langle k,u\rangle+c$（$k\in M,c\in\mathbb R$）に対して

$$
\Delta_{\varphi+\ell}=\Delta_\varphi+k,\qquad
(\varphi+\ell)^*(p)=\varphi^*(p-k)-c
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

区分ごとの傾きが $k$ だけ変わることと、凸共役の上限で $\ell$ を引くことを別々に確認する。

<!-- proof-start -->
### 証明

$\varphi=\max_i(\langle m_i,u\rangle+c_i)$ なら $\varphi+\ell=\max_i(\langle m_i+k,u\rangle+c_i+c)$。傾きの凸包は $\operatorname{conv}\{m_i+k\}=\operatorname{conv}\{m_i\}+k$ となる。

任意の $p$ について

$$
\begin{aligned}
(\varphi+\ell)^*(p)
&=\sup_u\bigl(\langle p,u\rangle-\varphi(u)-\langle k,u\rangle-c\bigr)\\
&=\sup_u\bigl(\langle p-k,u\rangle-\varphi(u)\bigr)-c\\
&=\varphi^*(p-k)-c.
\end{aligned}
$$

上限が $+\infty$ であっても有限定数の加減はこの等式と両立する。
<!-- proof-end -->

## 4. 退化族の最小模型：$xy=t$

**退化族**とはパラメータ $t$ が0で特異な中心ファイバーを持ち、$t\ne0$ では形が変わる多様体の族である。代数幾何では平坦性が「突然余分な成分だけが増える」ような不適切な変形を排除する基本条件になる。ここでは中心ファイバーが二つのトーリック成分へ分かれる例を実際に計算する。

<a id="def-syz1-17-toric-local-degeneration"></a>

<!-- formal-statement-start -->
> **定義（局所トーリック退化模型）**  
> アフィン空間内の次の部分多様体と射影を考える。

$$
\mathcal X=\{(x,y,t)\in\mathbb A^2_{\mathbb C}\times\mathbb A^1_{\mathbb C}:xy=t\},
\qquad f:\mathcal X\longrightarrow\mathbb A^1_{\mathbb C},\quad f(x,y,t)=t.
$$

> $X_t=f^{-1}(t)$ をファイバーと呼ぶ。中心ファイバー $X_0=\{xy=0\}$ は二つの座標直線の和である。この族を局所トーリック退化模型と呼ぶ。非コンパクトな局所例であり、偏極された射影的なトーリック退化の全条件は備えていない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-17-toric-local-degeneration -->
### 直接例：一般ファイバーと中心ファイバー

$t\ne0$ なら $x\ne0$ かつ $y=t/x$ なので、$x$ を座標として $X_t\simeq\mathbb C^*$ である。$t=0$ では $xy=0$ だから $X_0=\{x=0\}\cup\{y=0\}$。各成分は $\mathbb A^1$ というトーリック曲線で、交点は原点である。

**定義の確認**：全空間・射影・中心ファイバーを実際に示した。一般ファイバーは滑らかで中心だけが二成分の交叉となる。
<!-- definition-example-end -->

<a id="prop-syz1-17-flat-local-family"></a>

<!-- formal-statement-start -->
> **命題（交叉退化模型の平坦性と局所的な交叉）**  
> 上の族の座標環 $A=\mathbb C[x,y,t]/(xy-t)\simeq\mathbb C[x,y]$ は $\mathbb C[t]$ 上自由加群であり、特に平坦である。また $t\ne0$ のファイバーは滑らかで、中心ファイバー $X_0$ は原点で横断する二本の直線からなる。
<!-- formal-statement-end -->

### 証明の見取り図

単項式を $xy=t$ で整理すると、$1,x^k,y^k$ に $t$ の冪を掛けたものへ一意に分解できる。自由加群なので平坦性が従う。滑らかさは勾配で確認する。

<!-- proof-start -->
### 証明

$A\simeq\mathbb C[x,y]$ では $\mathbb C[t]$ の作用を $t\cdot f=(xy)f$ とみなす。単項式 $x^a y^b$（$a,b\ge0$）について $a=b$ なら $t^a$、$a>b$ なら $t^b x^{a-b}$、$b>a$ なら $t^a y^{b-a}$ である。従って

$$
A=\mathbb C[t]\cdot1\ \oplus\
\bigoplus_{k\ge1}\mathbb C[t]\cdot x^k\ \oplus\
\bigoplus_{k\ge1}\mathbb C[t]\cdot y^k.
$$

この和が直和なのは、各生成元に $t^j$ を掛けた単項式が、指数対 $(a,b)$ によって一意に区別されるからである。よって $A$ は自由 $\mathbb C[t]$ 加群であり、自由加群は平坦なので $f$ は平坦である。

$t\ne0$ では $\partial(xy-t)/\partial x=y$ と $\partial(xy-t)/\partial y=x$ が同時に0にならない。実際 $xy=t\ne0$ なら両者非零なので滑らかな複素曲線である。$t=0$ では $xy=0$ であり、二つの直線の接方向はそれぞれ座標軸だから、交点の接線は異なり横断している。
<!-- proof-end -->

この計算は「退化」を手で理解する模型となる。ただし大域的なGross–Siebert構成には、これに加え各トーリック成分の接着、偏極（相対的に豊富な直線束に相当するデータ）、log構造、局所的な高次補正が必要になる。

## 5. 散乱図式を $t$ の次数で整合させる

トロピカル側でいう**壁**は、整数アフィン空間内の余次元1の多面体片に、文字を変換する関数を付けたものである。複数の壁の周りを回って戻るとき、座標変換の積が恒等になることを要求する。[前講の壁越え変換](../SYZ1-16/index.md#def-syz1-16-wall-automorphism)と[三次の補正例](../SYZ1-16/index.md#prop-syz1-16-first-scattering)を、退化パラメータ $t$ で整理し直す。

ここでは $R=\mathbb C[x^{\pm1},y^{\pm1}][[t]]$ を使う。これは $x,y$ のLaurent多項式を係数とする**形式的 $t$ 冪級数環**である。$t^N R$ は $t$ の $N$ 次以上の項からなるイデアルであり、$F\equiv G\pmod{t^N}$ とは $F-G\in t^N R$ を意味する。$1+tH$ は幾何級数で逆元を持つため、壁を越す写像を $t$ に関して次数ごとに逆転できる。

<a id="def-syz1-17-tadic-consistency"></a>

<!-- formal-statement-start -->
> **定義（形式的な壁の次数別整合性）**  
> 形式級数環 $R=\mathbb C[x^{\pm1},y^{\pm1}][[t]]$ で $t$ を固定する。$x,y$ を定数項がそれぞれ $x,y$ となる可逆な形式級数へ送る変換を考える。二経路での合成を $G,H$ とするとき、次の二条件が成り立つ場合を「$t^N$ を法として整合的」という。

$$
G(x)-H(x)\in t^N R,\qquad G(y)-H(y)\in t^N R.
$$

> 全ての正整数 $N$ で整合するとき、形式的に整合的という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-17-tadic-consistency -->
### 直接例：一次では同じ、二次では違う経路

$$
A_t(x,y)=(x(1+ty),y),\qquad
B_t(x,y)=(x,y(1+tx))
$$

とすると、代入により

$$
\begin{aligned}
(A_t\circ B_t)(x,y)&=(x+txy+t^2x^2y,\ y+txy),\\
(B_t\circ A_t)(x,y)&=(x+txy,\ y+txy+t^2xy^2).
\end{aligned}
$$

従って両経路は $t^2$ を法としては一致するが、差 $(t^2x^2y,-t^2xy^2)$ は $t^3R$ に入らないため、$t^3$ を法としては一致しない。

**定義の確認**：両座標の差の最初の $t$ 次数が2であることを確認した。係数の $x,y$ は単元なのでこの差は消えない。
<!-- definition-example-end -->

<a id="prop-syz1-17-scattering-t2"></a>

<!-- formal-statement-start -->
> **命題（二次の散乱壁による整合）**  
> $R=\mathbb C[x^{\pm1},y^{\pm1}][[t]]$ 上で $A_t,B_t$ を上記の変換とし、

$$
C_t(x,y)=\left(x(1+t^2xy),\frac{y}{1+t^2xy}\right)
$$

> と定める。$C_t$ は形式的に可逆であり、$C_t\circ B_t\circ A_t\equiv A_t\circ B_t\pmod{t^3}$ である。さらに $C_t$ は形式的対数2形式 $dx/x\wedge dy/y$ を保つ。
<!-- formal-statement-end -->

### 証明の見取り図

二経路の差が二次なので、補正 $C_t$ の最初の項が $t^2(x^2y,-xy^2)$ となるように取る。$xy$ の不変性を使えば逆写像と対数2形式の保存も確かめられる。

<!-- proof-start -->
### 証明

$(u,v)=(B_t\circ A_t)(x,y)$ と置くと、上の計算から

$$
u=x+txy,\quad v=y+txy+t^2xy^2,\quad uv=xy+O(t).
$$

よって $t^2uv=t^2xy+O(t^3)$。$1/(1+t^2uv)=1-t^2uv+O(t^4)$ を使って

$$
\begin{aligned}
C_{t,1}(u,v)&=u(1+t^2uv)
=x+txy+t^2x^2y+O(t^3),\\
C_{t,2}(u,v)&=v(1-t^2uv+O(t^4))\\
&=y+txy+t^2xy^2-t^2xy^2+O(t^3)\\
&=y+txy+O(t^3).
\end{aligned}
$$

一方 $(A_t\circ B_t)(x,y)=(x+txy+t^2x^2y,\ y+txy)$ だから、各座標は $t^3$ を法として一致する。

$C_t$ の二座標の積は厳密に $xy$ である。従って $X=C_{t,1}(x,y),Y=C_{t,2}(x,y)$ とすると $XY=xy$ で、逆写像は

$$
C_t^{-1}(X,Y)=\left(\frac{X}{1+t^2XY},Y(1+t^2XY)\right)
$$

である。$s=xy$、$\eta=d\log(1+t^2s)$ とおけば、$t$ は固定パラメータなので $\eta=t^2s(d\log x+d\log y)/(1+t^2s)$。従って

$$
\begin{aligned}
d\log C_{t,1}\wedge d\log C_{t,2}
&=(d\log x+\eta)\wedge(d\log y-\eta)\\
&=d\log x\wedge d\log y+
\eta\wedge(d\log x+d\log y)\\
&=d\log x\wedge d\log y.
\end{aligned}
$$

最後の項は同じ1形式どうしの外積なので零になる。$d\log x=dx/x$ 等はLaurent変数上の形式微分である。
<!-- proof-end -->

ここで証明したのは**二次の補正**である。$t^3,t^4,\ldots$ の各次数で新しい壁や補正が必要になるかは別の問題となる。Gross–Siebertの散乱図式はこの次数別整合を体系化する。前講の $x,y$ の全次数による近似とは、今回の $t$ 進次数が異なる点にも注意する。

## 6. 何を足すと再構成定理が適用できるか

胞体分割 $\mathscr P$ は中心ファイバーの成分や交叉の配置を、区分線形データ $\varphi$ は偏極と関係する離散的な曲率情報を記録する。しかし $(B,\Delta,\mathscr P,\varphi)$ の記号を書いただけでは、多様体を一意に再構成できない。

トーリックな**中心ファイバー**とは、複数のトーリック多様体をトーリック部分多様体に沿って接着した退化極限である。これを変形させるには、局所方程式・接着係数だけでなく、特異な中心ファイバーの上で微分や変形を管理する**log構造**、さらに散乱壁の整合性が必要となる。log構造は、おおまかには境界因子で消える関数の乗法的情報を、単なる零点集合以上に記録する仕組みである。本講はその完全な層論的定義と一般的な変形理論を前提にしない。

Gross–Siebertの再構成結果を、この講で使う範囲に限定して述べる。ここで **positive** は特異アフィン構造のモノドロミーと偏極データに課される正性条件、**simple** は特異性の局所組合せ型に課される制限を表す原論文の専門的な条件名である。本章で計算した折れ目の非負性だけでは、これらの大域条件を検証したことにはならない。

<a id="thm-syz1-17-gross-siebert-scope"></a>

<!-- formal-statement-start -->
> **定理（Gross–Siebert再構成定理の適用範囲・外部入力）**  
> コンパクトで偏極された整数アフィン多様体の特異性データ $(B,\Delta,\mathscr P,\varphi)$ が、Gross–Siebertの意味での **positive** および **simple** なモノドロミー等の再構成仮定を満たすとする。この場合、同理論のlog幾何と整合的な壁構造による構成を通じて、与えたデータを双対交叉複体として持つトーリック退化を再構成できる。
>
> **外部入力の境界**：positive/simpleの詳細条件、log構造の存在と接着、全次数の散乱整合性を与える一般定理の証明はこの講には含めない。結論はその仮定下の代数的な退化の構成であり、任意のCalabi–Yau上の大域的な特殊Lagrangeファイブレーションの存在や、その退化との同一視ではない。
<!-- formal-statement-end -->

出典：[Gross–Siebert, *From Real Affine Geometry to Complex Geometry*, Annals of Mathematics 174 (2011)](https://annals.math.princeton.edu/2011/174-3/p01)。この節の定理は原論文の技術的な定理文を全て再現したものではなく、適用に必要な主要な制限と得られる結論を示した学習用の射程図である。

整理すると、幾何的SYZは特殊Lagrangeファイバーの**存在を仮定**して双対化し、Gross–Siebertは特異整数アフィン・トーリック退化の**入力を仮定**して代数的再構成を行う。離散Legendre双対は二つの入口をつなぐ強力な道具だが、二つの存在問題を自動的に同一にする定理ではない。

## 7. 演習：離散データから補正まで

### Level A：定義と局所計算

<a id="ex-syz1-17-a01"></a>
#### SYZ1-17-A01 整数アフィン遷移と格子
- Level: A

$u'=Au+(1,0)^T$、$A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ を考える。$A$ が整数アフィン座標変換を定めること、$(1,0)^T$ と $(0,1)^T$ の像を示せ。

<!-- solution-start -->
### 詳細解答

$\det A=1$ なので $A^{-1}=\begin{pmatrix}1&-2\\0&1\end{pmatrix}$ は整数成分を持ち、$A\in GL(2,\mathbb Z)$ である。格子ベクトルは平行移動項には依存せず、$Ae_1=(1,0)^T$、$Ae_2=(2,1)^T$ となる。これは整数格子の基底であり、$u'$ は整数アフィン座標である。
<!-- solution-end -->

<a id="ex-syz1-17-a02"></a>
#### SYZ1-17-A02 折れ目の符号
- Level: A

$\varphi(u)=\max(-u,2u)$ の二つの線形部分と折れ目を求め、凸性を検査せよ。

<!-- solution-start -->
### 詳細解答

$-u\ge2u$ は $u\le0$ と同値なので、$\varphi=-u$（$u\le0$）、$\varphi=2u$（$u\ge0$）。$u=0$ で両者は0になり連続である。左傾きは $-1$、右傾きは $2$、正方向の折れ目は $2-(-1)=3>0$。傾きが減少しないため凸であり、両傾きは整数である。
<!-- solution-end -->

<a id="ex-syz1-17-a03"></a>
#### SYZ1-17-A03 一次元双対区間
- Level: A

$\varphi(u)=\max(0,3u)$ の $\Delta_\varphi$ と $\varphi^*(p)$ を全ての $p$ について求めよ。

<!-- solution-start -->
### 詳細解答

傾きは $0,3$ なので $\Delta_\varphi=[0,3]$。$0\le p\le3$ なら $u\le0$ では $pu\le0$、$u\ge0$ では $pu\le3u$、従って $pu-\varphi(u)\le0$。$u=0$ で等号が成立する。$p<0$ なら $u=-s$ で差が $-ps\to+\infty$、$p>3$ なら $u=s$ で差が $(p-3)s\to+\infty$。ゆえに $\varphi^*(p)=0$（$0\le p\le3$）、それ以外は $+\infty$。
<!-- solution-end -->

<a id="ex-syz1-17-a04"></a>
#### SYZ1-17-A04 退化族の二つのファイバー
- Level: A

$xy=t$ の $t=0$ と $t=2$ のファイバーを記述し、後者が滑らかなことを検査せよ。

<!-- solution-start -->
### 詳細解答

$X_0=\{x=0\}\cup\{y=0\}$ で、原点で二直線が交わる。$X_2=\{(x,2/x):x\in\mathbb C^*\}$ であり、$x\mapsto(x,2/x)$ は $\mathbb C^*$ からの正則なパラメータ付けで逆写像は第一座標の射影である。$xy-2$ の勾配は $(y,x)$ で、$xy=2$ 上では双方とも非零なので特異点がない。
<!-- solution-end -->

<a id="ex-syz1-17-a05"></a>
#### SYZ1-17-A05 $t$ 進整合の次数
- Level: A

二経路の差が $(t^4x^2y,-t^4xy^2)$ であるとする。$t^N$ を法とした整合性が成り立つ $N=4,5$ を判定せよ。

<!-- solution-start -->
### 詳細解答

両成分は $t^4R$ に含まれるから $N=4$ では整合する。しかし $x^2y$ と $xy^2$ は $R$ の零でないLaurent単項式であり、どちらも $t$ を因子に含まない。従って差は $t^5R$ に入らず、$N=5$ では整合しない。判定は両座標の最初の非零 $t$ 次数を見る。
<!-- solution-end -->

### Level B：二つの構成を結ぶ

<a id="ex-syz1-17-b01"></a>
#### SYZ1-17-B01 三角形の斜めの辺
- Level: B

$\psi(u,v)=\max(0,2u,v)$ の傾きの凸包を不等式で表し、凸共役がその内部で0、外部で無限大であることを証明せよ。

<!-- solution-start -->
### 詳細解答

傾きは $(0,0),(2,0),(0,1)$。凸結合は $(p,q)=(2a,b)$、$a,b\ge0,a+b\le1$ なので

$$
\Delta_\psi=\{(p,q):p\ge0,\ q\ge0,\ p/2+q\le1\}.
$$

内側では $p/2=a$、$q=b$、$1-a-b\ge0$ として $pu+qv=a(2u)+b v+(1-a-b)0\le\psi(u,v)$。原点で等号を得るため $\psi^*=0$。外側は $p<0$ なら $(u,v)=(-s,0)$、$q<0$ なら $(u,v)=(0,-s)$、$p/2+q>1$ なら $(u,v)=(s/2,s)$ と選ぶ。最後は $\psi(s/2,s)=s$ に対して $pu+qv=(p/2+q)s>s$。いずれも差は $s\to\infty$ で発散するので $\psi^*=+\infty$ である。
<!-- solution-end -->

<a id="ex-syz1-17-b02"></a>
#### SYZ1-17-B02 アフィン項を加えるとどう変わるか
- Level: B

$\varphi(u)=\max(0,2u)$ に $\ell(u)=-u+3$ を加える。傾きの凸包と凸共役を求め、[整数アフィン項の命題](#prop-syz1-17-affine-shift)に一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

$\varphi+\ell=\max(-u+3,u+3)$ の傾きは $-1,1$ なので双対区間は $[-1,1]=[0,2]-1$。命題の $k=-1,c=3$ に代入すると

$$
(\varphi+\ell)^*(p)=\varphi^*(p+1)-3
=\begin{cases}-3&-1\le p\le1,\\+\infty&\text{それ以外}.\end{cases}
$$

直接にも、$|p|\le1$ なら $pu-\max(-u+3,u+3)\le-3$、$u=0$ で等号となる。$p>1$ なら $u\to+\infty$、$p<-1$ なら $u\to-\infty$ で差が発散する。従って両方の計算は一致する。
<!-- solution-end -->

<a id="ex-syz1-17-b03"></a>
#### SYZ1-17-B03 散乱補正の逆写像
- Level: B

$C_t(x,y)=\bigl(x(1+t^2xy),y/(1+t^2xy)\bigr)$ について、積 $xy$ の保存から逆写像を作り、両向きの合成が恒等であることを確かめよ。

<!-- solution-start -->
### 詳細解答

$X=x(1+t^2xy)$、$Y=y/(1+t^2xy)$ とすると $XY=xy=s$。従って元の $x,y$ は $x=X/(1+t^2XY)$、$y=Y(1+t^2XY)$ と復元できる。逆向きにも $x=X/(1+t^2XY)$、$y=Y(1+t^2XY)$ の積は $XY$ なので、$C_t(x,y)=(X,Y)$ に戻る。元の座標から出発して逆式を適用しても同じ $s$ により $(x,y)$ に戻る。$1+t^2XY$ の定数項は1で、$R$ に逆元が存在することも確認した。
<!-- solution-end -->

<a id="ex-syz1-17-b04"></a>
#### SYZ1-17-B04 退化族と再構成定理の境界
- Level: B

$xy=t$ 模型が満たす「中心のトーリック成分」「一般ファイバーの滑らかさ」「平坦性」を具体的に確認し、それだけではコンパクトな偏極トーリック退化の再構成結果を適用できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$X_0$ は二本の座標直線の和、$t\ne0$ の $X_t$ は $\mathbb C^*$ なので滑らかである。[自由加群による平坦性の証明](#prop-syz1-17-flat-local-family)で $A$ の $\mathbb C[t]$ 基底 $1,x^k,y^k$ を得たから平坦性もある。一方 $X_t\simeq\mathbb C^*$ はコンパクトではなく、この例に相対的に豊富な直線束やコンパクトなアフィン基底、positive/simpleの大域データ、log接着・整合的壁構造を与えていない。従ってこの三性質だけで[再構成定理の射程](#thm-syz1-17-gross-siebert-scope)の仮定を満たしたことにはならない。
<!-- solution-end -->

### Level C：一つの模型を最後まで検算する

<a id="ex-syz1-17-c01"></a>
#### SYZ1-17-C01 双対多面体・壁・退化の三層
- Level: C

$\psi(u,v)=\max(0,u,2v)$ と $R=\mathbb C[x^{\pm1},y^{\pm1}][[t]]$ を考える。

1. 傾きの双対三角形を不等式で求め、凸共役を完全に求めよ。
2. $A_t(x,y)=(x(1+ty),y)$、$B_t(x,y)=(x,y(1+tx))$ の二経路を $t^3$ を法として比較せよ。
3. $C_t(x,y)=(x(1+t^2xy),y/(1+t^2xy))$ を追加し、二次までの整合性を計算せよ。
4. これらの局所計算だけで何が証明でき、何はGross–Siebert再構成定理の外部入力として残るかを述べよ。

<!-- solution-start -->
### 詳細解答

**1. 双対三角形。** 傾きは $(0,0),(1,0),(0,2)$。凸結合 $(p,q)=(a,2b)$ に $a,b\ge0,a+b\le1$ を課すので

$$
\Delta_\psi=\{(p,q):p\ge0,\ q\ge0,\ p+q/2\le1\}.
$$

内部では $pu+qv=p\,u+(q/2)(2v)+(1-p-q/2)0\le\psi(u,v)$、原点で等号。外側では $p<0$ に対し $(u,v)=(-s,0)$、$q<0$ に対し $(0,-s)$、$p+q/2>1$ に対し $(s,s/2)$ を選ぶと差が正の定数倍の $s$ へ増大する。よって $\psi^*=0$（$\Delta_\psi$ 上）、$+\infty$（領域外）。

**2. 二経路。** $B_t$ の後に $A_t$ を代入すると

$$
(A_t\circ B_t)(x,y)=(x+txy+t^2x^2y,\ y+txy),
$$

逆順なら

$$
(B_t\circ A_t)(x,y)=(x+txy,\ y+txy+t^2xy^2).
$$

従って差は $(t^2x^2y,-t^2xy^2)$ で、$t^2$ を法として一致するが $t^3$ を法としては不一致である。

**3. 新壁。** $(u,v)=(B_t\circ A_t)(x,y)$ と置くと $uv=xy+O(t)$ だから

$$
\begin{aligned}
C_{t,1}(u,v)&=u+t^2u^2v=x+txy+t^2x^2y+O(t^3),\\
C_{t,2}(u,v)&=v-t^2uv^2+O(t^4)
=y+txy+t^2xy^2-t^2xy^2+O(t^3).
\end{aligned}
$$

二成分は $A_t\circ B_t$ に $t^3$ を法として一致する。$1+t^2xy$ は形式冪級数の単元なので、途中の分母も意味を持つ。

**4. 論理の境界。** 第1問は局所的な双対胞体、第2〜3問は指定した二壁の二次整合性を証明した。これらはあるコンパクトな $(B,\Delta,\mathscr P,\varphi)$ のpositive/simple条件、log構造の存在、全次数の壁整合、大域的な退化の再構成、ましてSLagトーラス束の存在を証明しない。[本章で掲げた再構成結果の仮定](#thm-syz1-17-gross-siebert-scope)を使うには、それぞれの仮定を別に確認する必要がある。
<!-- solution-end -->

## 8. 次講への接続

この講では、特異整数アフィン空間、胞体、整数区分線形ポテンシャル、局所離散Legendre双対、トーリック退化、次数別散乱整合をそれぞれ計算した。次のSYZ1-18では、[較正](../SYZ1-03/index.md)からMcLean変形、双対アフィン構造、semi-flat鏡像、特異性、補正、代数的再構成までの論理を、「証明済み」「追加条件下の構成」「一般的予想」に分類し直す。
