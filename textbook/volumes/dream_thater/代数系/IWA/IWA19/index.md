# IWA19 CM楕円曲線・Hecke指標のp進算術

前講では楕円曲線の点の割り算をSelmer群にまとめ、その双対を岩澤加群として扱いました。しかし曲線によってGalois作用の複雑さは異なります。今回は、整数倍以外にも点を移す対称性がある曲線を選びます。その対称性が二次体の素イデアルと結び付き、複素L関数の局所因子を一次式へ分けること、さらに素数の分裂がp進側の構成を変えることを確かめます。

## 1. 複素乗法を座標と格子から見る

[格子表示における複素乗法](../../EC/EC3/index.md#def-ec3-complex-multiplication) では、格子を保つ複素スカラーが整数以外にも存在することを条件としました。[楕円曲線の自己準同型環](../../EC/EC4/index.md#def-ec4-endo-ring) の言葉では、標数0の代数閉体上で整数倍写像の環より大きい環を持つ場合です。CMは complex multiplication の略です。

例えば $E:y^2=x^3-x$ を考えます。[判別式による非特異性判定](../../EC/EC1/index.md#thm-ec1-discriminant-criterion) で係数 $A=-1,B=0$ を代入すると、

$$
\Delta=-16(4A^3+27B^2)=64\ne0.
$$

従って非特異です。$O$ は群の単位元である無限遠点であり、座標 $(0,0)$ ではありません。写像

$$
j(x,y)=(-x,iy),\qquad j(O)=O
$$

を考えます。方程式の両辺を変換すると

$$
(iy)^2=-y^2,\qquad (-x)^3-(-x)=-x^3+x
$$

なので曲線を保ちます。射影座標では

$$
[x:y:z]\longmapsto[-x:iy:z]
$$

という可逆な線形変換であり、無限遠点 $O=[0:1:0]$ を固定する全域の射です。[原点を保つ非定数射は準同型](../../EC/EC4/index.md#thm-ec4-morphism-hom) により自己準同型です。

二度適用すると

$$
j^2(x,y)=(x,-y),\qquad j^2=[-1].
$$

仮に $j=[m]$（$m\in\mathbb Z$）なら

$$
[m^2]=[-1],\qquad [m^2+1]=[0]
$$

となります。しかし標数0では [倍数写像の次数](../../EC/EC4/index.md#thm-ec4-multiplication-degree) が正整数 $d$ に対し $d^2$ となり、$d=m^2+1>0$ の写像は定数ではありません。従って不可能です。

この追加作用は $\mathbb Q(i)$ 上で定義されています。複素共役は $j$ を $-j$ に移すので、$\mathbb Q$ 上のGalois作用が個々のCM作用と常に可換であるわけではありません。

対照として、上半平面内の超越数 $\tau$ に対する格子 $\mathbb Z+\mathbb Z\tau$ を取ります。これを保つスカラー $u$ は $u=m+n\tau$ と書け、$u\tau=r+s\tau$ でもあります。従って

$$
n\tau^2+(m-s)\tau-r=0.
$$

超越性から $n=r=0$、$m=s$ なので $u=m$ です。この格子はCMを持ちません。楕円曲線が複素数上で定義されることだけでは追加作用は得られません。

## 2. 素イデアルに複素数を割り当てる

虚二次体（有理数体に負の平方自由整数の平方根を添加した二次拡大）$K$ を固定し、複素数への埋め込みを一つ選びます。$\bar\alpha$ はその複素共役です。整数環を $\mathcal O_K$ と書きます。非零整イデアル $\mathfrak a$ のノルムは有限商の位数 $N\mathfrak a=|\mathcal O_K/\mathfrak a|$ です。分数イデアルでは乗法的に拡張します。非零整イデアル $\mathfrak f$ を固定し、それを割る素イデアルを因子に持たない分数イデアル全体を乗法群 $I(\mathfrak f)$ とします。

分数イデアルの素イデアル分解では負の指数も許します。$\mathfrak q^e$ が法 $\mathfrak f$ の素イデアル因子であるとき、$\mathcal O_{K,\mathfrak q}$ は $\mathfrak q$ に属さない元を分母に許す局所環です。$\alpha\equiv1\bmod\mathfrak f$ は各因子で $\alpha-1\in\mathfrak q^e\mathcal O_{K,\mathfrak q}$ を意味します。従って $\alpha$ は各 $\mathfrak q$ で単数であり、主分数イデアル $(\alpha)=\alpha\mathcal O_K$ は $I(\mathfrak f)$ に属します。

各素イデアルの情報を積で組み合わせるには、この群上の乗法的な関数が必要です。さらに、元で生成されるイデアルについてはその元の複素数としての値を指定したいので、合同条件で単数による曖昧さを制御します。

<a id="def-iwa19-hecke"></a>

<!-- formal-statement-start -->
> **定義（代数的Hecke指標）**
> 虚二次体 $K\subset\mathbb C$、非零整イデアル $\mathfrak f$、整数 $a,b$ を取る。群準同型
$$
\psi:I(\mathfrak f)\longrightarrow\mathbb C^\times
$$
> が、$\alpha\in K^\times$ で $\alpha\equiv1\bmod\mathfrak f$ を満たす全ての元について
$$
\psi((\alpha))=\alpha^a\bar\alpha^b
$$
> を満たすとき、無限型 $(a,b)$ の代数的Hecke指標という。合同は $\mathfrak f$ の各素イデアル因子 $\mathfrak q^e$ で $\alpha-1\in\mathfrak q^e\mathcal O_{K,\mathfrak q}$ と判定する。指標が定義できる最小の法（イデアルの可除性に関して）を導手とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa19-hecke -->
**定義の確認**。 $\mathfrak f=(1)$ とし $\psi(\mathfrak a)=N\mathfrak a$ と置くと、ノルムの乗法性から群準同型です。主イデアルの条件は、非零整数元 $\alpha$ による乗法写像 $m_\alpha:\mathcal O_K\to\mathcal O_K$ から確認できます。その像は $\alpha\mathcal O_K$ なので、商の位数は整数基底で表した行列の行列式の絶対値です。

実際 $K=\mathbb Q(\sqrt{-d})$（$d>0$ は平方自由整数）で $\alpha=c+e\sqrt{-d}$ と書き、まず有理基底 $(1,\sqrt{-d})$ を使うと、二つの基底ベクトルの像は $c+e\sqrt{-d}$ と $-de+c\sqrt{-d}$ です。従って行列と行列式は

$$
M=\begin{pmatrix}c&-de\\ e&c\end{pmatrix},
\qquad \det M=c^2+de^2=\alpha\bar\alpha.
$$

整数環の整数基底に替えても同じ線形写像の行列なので行列式は変わりません。非零整数元ではこの行列式が正で、格子の指数（商の位数）に一致します。分数 $\alpha=\beta/\delta$ ではノルムの乗法性から

$$
N((\alpha))=\frac{\beta\bar\beta}{\delta\bar\delta}
=\alpha\bar\alpha.
$$

法 $(1)$ では合同条件は空です。よって無限型 $(1,1)$ の条件を全ての非零 $\alpha$ で満たします。これは $(1,0)$ 型とは異なります。
<!-- definition-example-end -->

次は $(1,0)$ 型を手で作ります。$K=\mathbb Q(i)$ では $\mathcal O_K=\mathbb Z[i]$ です。ノルム $N(a+bi)=a^2+b^2$ に関する除法は複素数の実部・虚部を最寄りの整数に丸めれば、余りのノルムが除数のノルムの半分以下になります。非零イデアルからノルム最小の非零元 $\beta$ を選び、任意の元を $\beta$ で割ると余りも同じイデアルに入ります。余りが非零なら最小性に反するので、イデアルは $(\beta)$ です。単数はノルム1の元、すなわち $\{1,-1,i,-i\}$ です。

<a id="thm-iwa19-gaussian"></a>

<!-- formal-statement-start -->
> **定理（Gauss整数の主生成元指標）**
> $K=\mathbb Q(i)$、$\mathfrak f=(2+2i)$ とする。$\mathfrak f$ と互いに素な各整イデアルは、$1$ と法 $\mathfrak f$ で合同な生成元をただ一つ持つ。この生成元を割り当て、分数イデアルへ比で拡張すると、無限型 $(1,0)$ の代数的Hecke指標が得られる。
<!-- formal-statement-end -->

生成元を選ぶとき、4個の単数がちょうど4個の可逆剰余類を動かします。

<!-- proof-start -->
### 証明

$\mathfrak f$ は単数倍を除いて $(1+i)^3$ です。商の位数は $N(2+2i)=8$ です。$1+i$ はノルム2の素元なので、法 $(1+i)^3$ の可逆類は $1+i$ で割れない類です。実際、互除法で逆元を構成でき、割れる元は積を取っても1になりません。非可逆類の個数は

$$
|(1+i)/(1+i)^3|=8/2=4
$$

です。従って可逆類は4個です。相異なる二つの単数の差のノルムは2または4であり、ノルム8の $2+2i$ で割り切れません。従って4単数が可逆類全体を一度ずつ代表します。

整イデアル $(\alpha)$ が $\mathfrak f$ と互いに素なら $\alpha$ は可逆類です。その逆元の類を表す単数 $u$ を唯一選べば $u\alpha\equiv1$ となります。選んだ二生成元の積も1と合同なので、積イデアルに選ぶ生成元と一致します。

分数イデアル $\mathfrak a/\mathfrak b$ に値 $\psi(\mathfrak a)/\psi(\mathfrak b)$ を割り当てます。別の表示なら $\mathfrak a\mathfrak b'=\mathfrak a'\mathfrak b$ なので乗法性により比は同じです。$\alpha\equiv1$ のとき、主イデアルに選んだ生成元の比も1と合同で、$\alpha$ と同じ主分数イデアルを生成するので、その商は整数環の単数です。両方が局所的に1と合同であるため商も1と合同です。1と合同な単数は1だけなので比は $\alpha$ です。これで [代数的Hecke指標](#def-iwa19-hecke) の条件が成立します。
<!-- proof-end -->

例えば5は $(2+i)(2-i)$ と分裂します。法 $2+2i$ で1と合同な生成元は $-1+2i$ と $-1-2i$ です。前者から1を引くと $-2+2i=i(2+2i)$、後者から1を引くと $-(2+2i)$ です。二つの値の積は5、和は $-2$ です。

## 3. 曲線のL関数と指標のL関数

[良い素数の局所係数とEuler多項式](../../EC/EC10/index.md#def-ec10-good-local-polynomial) に従い、良い還元素数 $\ell$ では $a_\ell=\ell+1-\#E(\mathbb F_\ell)$ とし、$P_\ell(E,X)=1-a_\ell X+\ell X^2$ を考えます。ここで $X=\ell^{-s}$ を代入した逆数が局所Euler因子です。

[Hasse–Weil L関数](../../EC/EC10/index.md#def-ec10-hasse-weil-l) と比較するため、導手を法とするHecke指標 $\psi$ の複素L関数を、絶対収束する右半平面で次のEuler積として定めます。

$$
L(\psi,s)=\prod_{\mathfrak l\nmid\mathfrak f}
(1-\psi(\mathfrak l)(N\mathfrak l)^{-s})^{-1}.
$$

CM曲線については次の深い対応を使います。これは前節の例だけから証明できる結果ではありません。

<a id="thm-iwa19-deuring"></a>

<!-- formal-statement-start -->
> **定理（Hecke–DeuringのCM対応）**
> $\mathbb Q$ 上の楕円曲線 $E$ が、$\overline{\mathbb Q}$ 上で自己準同型環が虚二次体 $K$ の整数環と同型となる複素乗法を持つとする。適切な無限型 $(1,0)$ の代数的Hecke指標 $\psi_E$ が存在し、複素L関数について
$$
L(E/\mathbb Q,s)=L(\psi_E,s)
$$
> が成立する。左右は対応する導手で局所因子を含めて定める。ここでは算術的な変数 $s$ を用いる。
<!-- formal-statement-end -->

この定理は Hecke–Deuring の定理を引用しています（末尾文献）。一般の証明は複素乗法の基本定理を必要とするためここでは扱いません。代わりにEuler因子の照合を行います。

ここで良い素数 $\ell$ のうち $K$ で分岐せず導手にも素なものを考えます。$\ell\mathcal O_K=\mathfrak l\bar{\mathfrak l}$ と異なる二素イデアルに分かれる場合を分裂といい、各剰余体は $\mathbb F_\ell$ なので各ノルムは $\ell$ です。指標値を $u,v$ と書けば分母は

$$
(1-uX)(1-vX)=1-(u+v)X+uvX^2.
$$

[Hecke–DeuringのCM対応](#thm-iwa19-deuring) と曲線側の多項式の一致から $u+v=a_\ell$、$uv=\ell$ です。一方、惰性とは $(\ell)$ 自体が素イデアルで剰余体が $\mathbb F_{\ell^2}$ となる場合です。そのノルムが $\ell^2$ なので分母は $1-\psi_E((\ell))X^2$ です。係数比較で $a_\ell=0$、$\psi_E((\ell))=-\ell$ となります。

具体的に $E:y^2=x^3-x$ の5での点を数えます。$x=0,1,2,3,4$ の右辺は法5で $0,0,1,4,0$。それぞれの $y$ の個数は $1,1,2,2,1$ なので、無限遠点 $O$ を加えると

$$
\#E(\mathbb F_5)=1+1+2+2+1+1=8,
\qquad a_5=6-8=-2.
$$

前節の指標値 $-1\pm2i$ の和と積から得る多項式も

$$
(1-(-1+2i)X)(1-(-1-2i)X)=1+2X+5X^2
$$

です。

3では全ての $x$ で右辺が0なのでアフィン点3個と無限遠点1個の計4点、$a_3=0$。前節の指標では $-3\equiv1\bmod(2+2i)$ なので分母は $1+3X^2$ となります。これらは局所的な一致の確認であり、有限個の一致だけから指標の全体的な同定を証明したわけではありません。

## 4. p進側で分裂する二つの方向

奇素数 $p$ と正方格子 $L=\mathbb Z[i]$ を取ります。[複素一様化の群同型](../../EC/EC3/index.md#thm-ec3-group-uniformization) で曲線を $\mathbb C/L$ と表示します。

[n-torsion](../../EC/EC4/index.md#def-ec4-torsion) の定義によれば、$n\ge1$ に対し $E[p^n]$ は $p^n$ 倍で消える点の群です。トーラスでは

$$
p^n[z]=[0]\iff p^nz\in L\iff z\in p^{-n}L
$$

となるので、その群は $p^{-n}L/L$ です。整数環 $\mathbb Z[i]$ の作用を保ったまま

$$
E[p^n]\simeq\mathbb Z[i]/p^n\mathbb Z[i]
$$

と表示できます。実際 $z$ の類を $p^nz$ の類へ送る写像は、格子の代表を変えても法 $p^n$ で変わらず、逆写像は $w\mapsto w/p^n$ です。倍数写像 $[p]:E[p^{n+1}]\to E[p^n]$ はこの表示で還元に対応します。逆極限を $T_pE$（p進Tate加群）と書くと、$\mathbb Z_p[i]=\mathbb Z_p[X]/(X^2+1)$ 上の自由階数1の加群になります。これは正方格子の場合の直接計算です。

<a id="thm-iwa19-split"></a>

<!-- formal-statement-start -->
> **定理（分裂素数でのCM係数分解）**
> $p$ を奇素数、$R=\mathbb Z_p[X]/(X^2+1)$ とする。法 $p$ の根 $r_1\in\mathbb F_p$（$r_1^2=-1$）を一つ固定できるとき、$r\equiv r_1\bmod p$ を満たす根 $r\in\mathbb Z_p$ がただ一つ存在し、$r^2=-1$ となる。環同型
$$
R\simeq\mathbb Z_p\times\mathbb Z_p,\qquad
f\longmapsto(f(r),f(-r))
$$
> が成立し、$R$ 上の自由階数1の加群は二つの $\mathbb Z_p$ 自由階数1の加群に分かれる。法 $p$ に根がなければ $R/pR$ は二次拡大体であり、そのような環分解は存在しない。
<!-- formal-statement-end -->

根が分かれていると、根の差が単数であることを使って二つの成分を取り出せます。

<!-- proof-start -->
### 証明

法 $p^n$ の根の整数代表を $r_n$ とします。$r_n^2+1=p^n c_n$ と書き、次の代表を $r_{n+1}=r_n+kp^n$（$0\le k<p$）とすると

$$
r_{n+1}^2+1\equiv r_n^2+1+2r_nkp^n\pmod{p^{n+1}}.
$$

従って次の根の条件は

$$
c_n+2r_n k\equiv0\pmod p.
$$

$p$ は奇素数で $r_n^2\equiv-1\bmod p$ だから $2r_n$ は法 $p$ で非零です。その逆元を掛けて $k\equiv-c_n(2r_n)^{-1}\bmod p$ が唯一決まります。各段階で同じ剰余類を持つ唯一の持ち上げが決まり、整合列は $\mathbb Z_p$ の元 $r$ を定めます。任意の $n$ で $r^2+1\equiv0\bmod p^n$ なので $r^2+1=0$。別の根が同じ $r_1$ から始まれば全ての段階の剰余類が一致し、同じ元になります。

$2r$ が単数なので、$u,v\in\mathbb Z_p$ に対し

$$
f(X)=\frac{u+v}{2}+\frac{u-v}{2r}X
$$

は $f(r)=u,f(-r)=v$ を満たします。逆に一次式 $a+bX$ が両根で零なら、差から $2rb=0$、和から $2a=0$ となり $a=b=0$ です。従ってこの二点で値を取る環準同型は全単射です。$R$ 上の自由階数1の加群 $M$ の基底を $m$ とすると、$fm\mapsto(f(r),f(-r))$ は $\mathbb Z_p$ 加群としての同型です。各座標に片方だけ非零の組を取ると、それぞれ自由階数1の直和成分が得られます。

根がないときは二次式が法 $p$ で既約なので剰余環は体です。もし環が二つの $\mathbb Z_p$ の積なら法 $p$ で二つの $\mathbb F_p$ の積となり、非零の零因子を持つので矛盾します。
<!-- proof-end -->

$p=5$ では $r_1=2$ が根です。法25で $r=2+5k$ とすると $r^2+1\equiv5+20k$。従って $1+4k\equiv0\bmod5$ から $k=1$、$r=7\bmod25$ です。

二成分への射影は

$$
e_+=\frac{1+X/r}{2},\qquad e_-=\frac{1-X/r}{2}
$$

です。ここで $X$ は多項式の剰余類を表します。$(X/r)^2=1$ なので

$$
e_+^2=\frac{1+2X/r+1}{4}=e_+,
\qquad e_-^2=\frac{1-2X/r+1}{4}=e_-.
$$

また $e_+e_-=(1-(X/r)^2)/4=0$、$e_++e_-=1$。評価すると $e_+$ は $(1,0)$、$e_-$ は $(0,1)$ に移るので、これらを掛ける操作が各成分への射影です。CM作用が定義されている体のGalois群はこの作用と可換なので、各射影の像を保ちます。複素共役のように $X$ を $-X$ へ移す作用は二つを交換します。$p=3$ では平方は0または1なので $-1$ に等しい平方がなく、同じ分解はできません。

## 5. 複素特殊値をp進的に補間する

良い還元の判定は [良い還元・悪い還元](../../EC/EC9/index.md#def-ec9-good-reduction) に従います。良い還元素数 $p$ における [点数差 $a_p$](../../EC/EC10/index.md#def-ec10-good-local-polynomial) が $p$ で割り切れないときを通常還元（普通還元）、割り切れるときを超特異還元といいます。この判定は楕円曲線の標準的な還元判定です。

$\mathbb Z_p^\times$ は $p$ で割れないp進整数の群です。Euler多項式の変数とは別に、根を求める変数 $Y$ を使います。次の展開で得る多項式の根を考えます。

$$
Y^2P_p(E,1/Y)=Y^2-a_pY+p.
$$

<a id="def-iwa19-ordinary"></a>

<!-- formal-statement-start -->
> **定義（通常還元の単数根）**
> $E/\mathbb Q$ が奇素数 $p$ で良い通常還元を持つとする。多項式
$$
Y^2-a_pY+p
$$
> の $\mathbb Z_p^\times$ に属する根を単数根 $\alpha_p$ とする。他の根は $p/\alpha_p$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-iwa19-ordinary -->
**定義の確認**。 $E:y^2=x^3-x$、$p=5$ では判別式64が5で割れず、第3節の点数計算から $a_5=-2$ は5で割れません。従って良い通常還元です。$F(Y)=Y^2+2Y+5$ は法5で $Y(Y+2)$、非零根は3です。$F'(Y)=dF/dY=2Y+2$ は $Y$ についての多項式の形式微分で、根3で法5では3です。持ち上げでは微小量の近似でなく整数の展開を使います。

$$
F(3+5k)=20+40k+25k^2.
$$

25で割り切れる条件は $4+8k\equiv0\bmod5$、すなわち $k=2\bmod5$ で、単数根は法25で13です。以後も [根の持ち上げ](#thm-iwa19-split) の一次合同と同じように、法 $5^n$ で根 $y_n$ が決まれば $F(y_n)/5^n+kF'(y_n)\equiv0\bmod5$ によって次の桁が一意に決まります。非零剰余類3を保つため根は単数です。根0も導関数2が非零なので持ち上がり、二根の積が5であるため他方の付値は1です。
<!-- definition-example-end -->

一般にも $F(Y)=Y^2-a_pY+p$ の法 $p$ での根は $0,a_p$ で相異なり、$F'(0)=-a_p$、$F'(a_p)=a_p$ がともに非零です。展開

$$
F(y_n+kp^n)=F(y_n)+kp^nF'(y_n)+k^2p^{2n}
$$

から同じ一次合同が得られます。従って持ち上げの存在・一意性と二根の積の関係が確認できます。3では $a_3=0$ なので多項式は $Y^2+3$。法3で唯一の根が0であり、単数根が存在しません。

[IWA15のKubota–Leopoldt補間公式](../IWA15/index.md#thm-iwa15-interpolation) ではDirichlet L関数の特殊値をp進測度へ移しました。CMの場合はHecke指標の特殊値が入力となります。ただし複素数値をそのままp進体へ埋め込むのではありません。複素周期（楕円曲線の不変微分の積分から得る数）で割って代数的な値とし、選んだp進埋め込み・局所Euler因子を通して補間する必要があります。

通常還元の場合、円分方向の楕円曲線のp進L関数を $\mathcal L_{E,p}$ と書きます。

円分 $\mathbb Z_p$ 拡大のGalois群 $\Gamma$ の位相的生成元 $\gamma$ を選びます。[岩澤代数と冪級数環の同型](../IWA3/index.md#thm-iwa3-power-series-isomorphism) で $T=\gamma-1$ とすると、[Mellin変換の評価公式](../IWA13/index.md#thm-iwa13-mellin-evaluation) における有限位数指標 $\chi$ に対応する評価点は $\chi(\gamma)-1$ です。

<a id="eq-iwa19-trivial-interpolation"></a>

自明指標は $\chi(\gamma)=1$ なので $T=0$ です。大域最小Weierstrass模型のNéron微分（不変微分を整数模型に合わせて正規化したもの）を実周期格子の正の生成元に沿って積分した周期を $\Omega_E^+$ と書きます。その周期による正規化で、自明指標の補間式は

$$
\mathcal L_{E,p}(0)
=(1-\alpha_p^{-1})^2\,\frac{L(E,1)}{\Omega_E^+}.
$$

この式は通常還元のp進L関数の補間定理からの引用です（末尾文献）。非自明な指標では導手に応じたGauss和と単数根の冪も現れます。ここでは一般の補間定理の構成は行いません。虚二次体上では分裂素数を選び、Hecke指標の変動を補間するKatzのp進L関数が構成されます。円分方向の関数との比較には指標の特殊化と周期・Euler因子の照合が必要で、二変数関数をそのまま一変数関数と同一視できません。

## 6. 算術側との比較

[IWA18の円分塔のp無限Selmer群](../IWA18/index.md#def-iwa18-tower-selmer) の体を $\mathbb Q_\infty$ とし、[Pontryagin双対](../IWA18/index.md#def-iwa18-pontryagin) を取ります。これが代数側の加群です。一方、前節で見たp進L関数が解析側です。両者を同じ環で比較することができます。[有限生成ねじれ加群](../IWA5/index.md#def-iwa5-fg-torsion) とは有限個の生成元を持ち、各元がある非零の環の元で消える加群です。その素因子の重複度を [特徴イデアル](../IWA6/index.md#def-iwa6-characteristic) で記録します。

<a id="thm-iwa19-main"></a>

<!-- formal-statement-start -->
> **定理（CM楕円曲線の円分主予想）**
> $\mathbb Q$ 上の楕円曲線 $E$ が虚二次体の整数環によるCMを持ち、$p>3$ が良い通常還元素数とする。$\mathbb Q_\infty/\mathbb Q$ を円分 $\mathbb Z_p$ 拡大、$\Gamma=\operatorname{Gal}(\mathbb Q_\infty/\mathbb Q)$、$\Lambda=\mathbb Z_p[[\Gamma]]$ とし、
$$
X_E=\operatorname{Sel}_{p^\infty}(E/\mathbb Q_\infty)^\vee
$$
> と置く。$X_E$ は有限生成ねじれ $\Lambda$ 加群であり、通常還元の円分p進L関数 $\mathcal L_{E,p}\in\Lambda$（標準周期による正規化）に対して
$$
\operatorname{char}_{\Lambda}(X_E)=(\mathcal L_{E,p})
$$
> が成立する。
<!-- formal-statement-end -->

これは通常還元の場合のCM主予想の定理（Rubinの結果）を引用したものです。証明には楕円単数（CMの類体の単数をノルム整合的に構成したもの）とEuler systemの深い理論が必要です。ここで証明するのは前節までの分解と、この等式を与えられたときの代数的帰結です。

例えば模型として $X=\Lambda/(5(T-5))$、$p=5$ を考えると、[特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic) により特徴イデアルは $(5(T-5))$ です。対応する解析側の冪級数が $5(T-5)U(T)$ で $U$ が単数なら、$\mu=1,\lambda=1$ が一致します。これは模型の計算で、上の具体的楕円曲線の不変量の計算ではありません。

超特異還元では単数根がないため、この通常還元の補間式をそのまま使えません。Pollack–Rubin の定理では特定の超特異素数において符号付きp進L関数と対応する修正Selmer群を比較します。普通のSelmer群と符号付きSelmer群を取り違えないことが重要です。また非CM曲線についてはCM固有のHecke指標と二つの射影による議論は使えません。個別の非CM主予想には別の定理・仮定が必要です。

## 7. 演習

<a id="ex-iwa19-a1"></a>

### A1. 自己準同型の合成
- Level: A
- ID: IWA19-A1

$E:y^2=x^3-x$ の $j(x,y)=(-x,iy)$ について $j^3,j^4$ を求め、$\mathbb Q$ 上で定義される整数倍写像との違いを述べよ。

<!-- solution-start -->
**詳細解答。** 第1節の合成をもう一度行うと、

$$
j^3(x,y)=j(x,-y)=(-x,-iy),
\qquad j^4(x,y)=j(-x,-iy)=(x,y).
$$

無限遠点 $O$ は全てで固定します。複素共役で $j$ は $-j$ に変わりますが、整数倍写像は群法則を有理数体上で繰り返して作るため共役で不変です。例えば $x=2,y=\sqrt6$ の点では $j$ と $-j$ の $y$ 座標が異なり、共役で不変ではありません。
<!-- solution-end -->

<a id="ex-iwa19-a2"></a>

### A2. 単数と主生成元
- Level: A
- ID: IWA19-A2

$\mathbb Z[i]$ のイデアル $(3+2i)$ と $(3-2i)$ について、法 $2+2i$ で1と合同な生成元を求めよ。

<!-- solution-start -->
**詳細解答。** [Gauss整数の主生成元指標](#thm-iwa19-gaussian) を使います。ノルムが13なので法の素因子 $1+i$ と互いに素です。さらに

$$
(3+2i)-1=2+2i,\qquad
(3-2i)-1=-i(2+2i)
$$

なので既に合同条件を満たします。一意性から指標値は $3+2i,3-2i$。和は6、積は $9+4=13$ です。
<!-- solution-end -->

<a id="ex-iwa19-a3"></a>

### A3. 惰性素数の点数
- Level: A
- ID: IWA19-A3

$E:y^2=x^3-x$ を法7で還元して点数と $a_7$ を求めよ。

<!-- solution-start -->
**詳細解答。** 判別式64は7で割れず良い還元です。右辺を $x=0,1,\ldots,6$ の順に計算すると $0,0,6,3,4,1,0$ です。法7の平方は $0,1,2,4$ なので $y$ の個数は $1,1,0,0,2,2,1$。無限遠点 $O$ を足して $1+1+0+0+2+2+1+1=8$ 点、[良い素数の局所係数](../../EC/EC10/index.md#def-ec10-good-local-polynomial) により $a_7=7+1-8=0$。分母は $1+7X^2$ です。
<!-- solution-end -->

<a id="ex-iwa19-a4"></a>

### A4. 単数根の持ち上げ
- Level: A
- ID: IWA19-A4

$p=5,a_p=-2$ の場合、単数根を法25で求めよ。

<!-- solution-start -->
**詳細解答。** [単数根](#def-iwa19-ordinary) は法5で3です。$Y=3+5k$ を代入すると

$$
Y^2+2Y+5=20+40k+25k^2.
$$

25で割り切れる条件を5で割って $4+8k\equiv0\bmod5$、従って $3k\equiv1$ で $k=2$。根は13です。実際 $13^2+2\cdot13+5=200$ は25の倍数です。
<!-- solution-end -->

<a id="ex-iwa19-b1"></a>

### B1. 非CMの反例と二次方程式
- Level: B
- ID: IWA19-B1

$\tau=i\sqrt[3]{2}$ とする。$\mathbb Z+\mathbb Z\tau$ を保つスカラーが整数のみであることを示せ。

<!-- solution-start -->
**詳細解答。** [格子表示における複素乗法](../../EC/EC3/index.md#def-ec3-complex-multiplication) の条件から $u=m+n\tau$、$u\tau=r+s\tau$ と書きます。

両式をつなぐと $n\tau^2+(m-s)\tau-r=0$ です。$\tau^2=-\sqrt[3]{4}$ を代入し、虚部と実部をそれぞれ比較すると

$$
(m-s)\sqrt[3]{2}=0,\qquad -n\sqrt[3]{4}-r=0.
$$

$\sqrt[3]{4}$ が有理数 $a/b$ なら $a^3=4b^3$ となり、2の付値を取ると左辺は3の倍数、右辺は2を法3の余りに持つので矛盾です。

従って $n=r=0,m=s$、$u=m$。整数は全て格子を保つので環はちょうど $\mathbb Z$ です。
<!-- solution-end -->

<a id="ex-iwa19-b2"></a>

### B2. 射影と整数格子
- Level: B
- ID: IWA19-B2

$R_{25}=(\mathbb Z/25)[X]/(X^2+1)$ で根 $r=7$ を用い、二射影を一次式で計算し、それらの積と和を確かめよ。

<!-- solution-start -->
**詳細解答。** [分裂素数でのCM係数分解](#thm-iwa19-split) の式を法25で使います。$2^{-1}=13,7^{-1}=18$ なので $1/(2r)\equiv13\cdot18\equiv9$。従って $e_+=13+9X,e_-=13-9X$。和は26で1、積は $169-81X^2=250$ で0です。$e_+^2-e_+=e_+(e_+-1)=-e_+e_-=0$、$e_-$ も同じ理由で冪等です。評価点7と $-7$ の両方で

$$
(e_+(7),e_+(-7))=(1,0),\qquad
(e_-(7),e_-(-7))=(0,1)
$$

となります（法25で $13+63\equiv1$、$13-63\equiv0$）。従って二成分を選別します。
<!-- solution-end -->

<a id="ex-iwa19-b3"></a>

### B3. Hecke因子を二通りに計算
- Level: B
- ID: IWA19-B3

$E:y^2=x^3-x$ の13における点数を求め、A2の指標値から得られるEuler多項式と照合せよ。

<!-- solution-start -->
**詳細解答。** 判別式64は13で割れず良い還元です。法13の非零平方は $1,3,4,9,10,12$ です。$x=0,1,\ldots,12$ の右辺は順に $0,0,6,11,8,3,2,11,10,5,2,7,0$。零は3個、非零平方は3と10の2個なのでアフィン点は $3+2\cdot2=7$。無限遠点込み8点で、[良い素数の局所係数](../../EC/EC10/index.md#def-ec10-good-local-polynomial) により $a_{13}=14-8=6$ です。[A2](#ex-iwa19-a2) の指標値の積が13、和が6なので $(1-(3+2i)X)(1-(3-2i)X)=1-6X+13X^2$。曲線側の多項式と一致します。
<!-- solution-end -->

<a id="ex-iwa19-b4"></a>

### B4. 補間の自明指標と付値
- Level: B
- ID: IWA19-B4

$p=5$、$a_p=-2$ とし、模型として $L(E,1)/\Omega_E^+=5^2u$（$u\in\mathbb Z_5^\times$）と仮定する。自明指標でのp進L関数値の付値を求めよ。

<!-- solution-start -->
**詳細解答。** [単数根](#def-iwa19-ordinary) は法5で3なのでその逆元は2です。$1-\alpha_p^{-1}\equiv-1\bmod5$ は単数で、二乗しても付値0です。[自明指標の補間式](#eq-iwa19-trivial-interpolation) に代入すると $\mathcal L_{E,5}(0)=5^2u(1-\alpha_p^{-1})^2$ なので付値は2です。これは特殊値の仮定からの計算であって、曲線の実際の特殊値を求めたものではありません。
<!-- solution-end -->

<a id="ex-iwa19-c1"></a>

### C1. 主予想の仮定と代数的帰結
- Level: C
- ID: IWA19-C1

$p=5$ とし、ある有限生成ねじれ $\Lambda=\mathbb Z_5[[T]]$ 加群について解析側との特徴イデアルの等式が成立し、解析側が $5^2(T^2+5T+5)U(T)$（$U$ は単数）と仮定する。$\mu,\lambda$ を求めよ。さらに同じ式を $p=3$ の $y^2=x^3-x$ に通常還元の定理から適用できるか説明せよ。

<!-- solution-start -->
**詳細解答。** [特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic) で単数はイデアルを変えません。$T^2+5T+5$ は最高次係数1で、それ以外の係数が5の倍数なので [distinguished多項式](../IWA6/index.md#def-iwa6-distinguished)、次数2です。単数 $U$ を除いた生成元は

$$
5^2(T^2+5T+5)=25T^2+125T+125.
$$

[積に対する係数付値とWeierstrass次数の公式](../IWA6/index.md#prop-iwa6-order-additivity) によれば、積の係数付値は各因子の係数付値の和です。単数 $U$ の係数付値は0なので、積でも最小付値2は変わりません。従って $\mu=2,\lambda=2$。一方3では第3節で点数4、$a_3=0$ となり、良い還元でも通常還元ではありません。[CM楕円曲線の円分主予想](#thm-iwa19-main) は $p>3$ かつ通常還元を要求しているので、いずれの条件も満たしません。別の局所条件と別の比較定理が必要で、模型の数値を曲線の不変量として移すことはできません。
<!-- solution-end -->

## 8. 次章へ

CMの場合には楕円曲線の対称性が素イデアルの指標へ結び付き、その指標の複素特殊値からp進L関数へ進む道があります。次講では、より一般の保型形式で現れるHecke作用とGalois表現、円分塔の算術との関係を学びます。岩澤主予想の等式と複素L関数の零点の位置を決める命題は異なるので、前者からRHやGRHを直接導くことはできません。

## 参考文献

- Karl Rubin, [Elliptic Curves with Complex Multiplication and the Conjecture of Birch and Swinnerton-Dyer](https://swc-math.github.io/aws/1999/99RubinCM.pdf), CM、Hecke指標、岩澤理論と主予想。
- Karl Rubin, [The one-variable main conjecture for elliptic curves with complex multiplication](https://www.cambridge.org/core/books/abs/lfunctions-and-arithmetic/onevariable-main-conjecture-for-elliptic-curves-with-complex-multiplication/58848581663E1D54A747951F3034421F), 分裂した良い還元素数の場合。
- Robert Pollack and Karl Rubin, [The main conjecture for CM elliptic curves at supersingular primes](https://annals.math.princeton.edu/2004/159-1/p11), 序論の通常還元の定式化と超特異の場合の修正。
- Massimo Bertolini, Henri Darmon and Kartik Prasanna, [Chow-Heegner points on CM elliptic curves and values of p-adic L-functions](https://www.math.mcgill.ca/darmon/pub/Articles/Research/52.BDP2/long-paper.pdf), Katzの補間と周期。
