# HOD1-13 Hodge–Riemann双線形関係とHodge指数定理

<!-- definition-example-audit: strict -->

## 1. 原始成分は「存在する」だけでなく符号を持つ

[前章のLefschetz分解](../HOD1-12/index.md#thm-hod1-12-lefschetz-decomposition)により、コンパクトKähler多様体のコホモロジーは、基本形式を掛けて得る列とその出発点である原始部分へ分かれた。ところが、それだけでは原始類どうしの外積を積分した値が正か負か分からない。

まず複素曲面 $Q=\mathbb{CP}^1\times\mathbb{CP}^1$ を考えよう。[前章の原始類の例](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)で使った二次類 $u,v$ は

$$
u^2=v^2=0,\quad \int_Q u\smile v=1,\quad
[\omega]_d=2\pi(u+v)
$$

を満たす。$u+v$ と $u-v$ はどちらも零ではないが、積分すると

$$
\int_Q(u+v)^2=2,\qquad \int_Q(u-v)^2=-2.
$$

同じ二次コホモロジーに正方向と負方向がある。Kähler計量の正定値内積と、この符号を持つ交叉積分とを結び付けるのが本章の中心問題である。

以下では $X$ を複素次元 $n\ge1$ の滑らか・コンパクト・境界なしのKähler多様体、$\omega$ を実基本 $(1,1)$ 形式とする。連結性を使う箇所でのみ連結と仮定する。複素係数形式の内積は[第1変数共役線形の規約](../HOD1-01/index.md#def-hod1-01-complex-inner-product)、Hodge星 $*$ は実Hodge星の**複素線形拡張**である。実次元は $2n$、向きと体積は

$$
dV_g=\frac{\omega^n}{n!}>0
$$

で固定する。基本形式との積 $L\alpha=\omega\wedge\alpha$ と随伴 $\Lambda$ は[既習のLefschetz作用素](../HOD1-02/index.md#def-hod1-02-lambda)である。以下で $k=p+q\le n$、$m=n-k$ と書くとき $m$ は非負整数である。

## 2. 原始形式のHodge星を点ごとに計算する

正値内積は $\overline\alpha\wedge *\alpha$ を積分して得る。したがって、原始形式 $\alpha$ に対して $*\alpha$ が $\omega^{n-k}\wedge\alpha$ の何倍かを確かめれば、交叉積分の符号が定まる。ここで複素型 $(p,q)$ による $i$ の冪と、外積の並べ替えによる符号を同時に追う。

<a id="thm-hod1-13-primitive-star"></a>

<!-- formal-statement-start -->
> **定理（原始形式のHodge星公式）**
> 複素次元 $n$ のHermiteベクトル空間に、計量・複素構造と両立する向き、基本2形式 $\omega$、複素線形Hodge星 $*$ を入れる。$0\le p,q\le n$、$k=p+q\le n$ とし、$(p,q)$ 型の $k$ 形式 $\alpha$ が $\Lambda\alpha=0$ を満たすとする。このとき

$$
*\alpha=(-1)^{k(k+1)/2}i^{p-q}
\frac{\omega^{n-k}}{(n-k)!}\wedge\alpha.
$$

> 特に $k=n$ では階乗因子もLefschetz作用も $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一点で実正規直交対ごとに $1,\theta,\bar\theta,\omega_j$ を並べると、Hodge星は「使っていない二次元の組を補う」操作になる。一方、$\omega^{n-k}$ を掛けると、同じ補集合が組合せの和として現れる。[原始条件](../HOD1-03/index.md#def-hod1-03-primitive) $\Lambda\alpha=0$ が、この和を補集合の係数へ変換する鍵である。

<!-- proof-start -->
### 証明

**（1）一組での星と正規化。** 点で $J$ 適合実正規直交余標構 $(e^1,f^1,\ldots,e^n,f^n)$ を選び、

$$
\theta^j=\frac{e^j+i f^j}{\sqrt2},\qquad
\bar\theta^j=\frac{e^j-i f^j}{\sqrt2},\qquad
\omega_j=e^j\wedge f^j=i\theta^j\wedge\bar\theta^j
$$

とおく。[型直交性](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)により外積単項式は正規直交基底となる。一つの実二次元の組では、星の定義から

$$
*_j1=\omega_j,\quad *_j\omega_j=1,\quad
*_j\theta^j=-i\theta^j,\quad
*_j\bar\theta^j=i\bar\theta^j.
$$

例えば $*_je^j=f^j$、$*_jf^j=-e^j$ に $\theta^j$ の定義を代入すれば $*_j\theta^j=(f^j-i e^j)/\sqrt2=-i\theta^j$ となる。$\omega=\sum_j\omega_j$ で、異なる $\omega_j$ は可換かつ $\omega_j^2=0$ だから

$$
\frac{\omega^n}{n!}=\omega_1\wedge\cdots\wedge\omega_n=dV_g.
$$

**（2）外積基底を組に分ける。** $(p,q)$ 型の基底単項式に含まれる $\theta^j$ と $\bar\theta^j$ の添字を比較する。$\theta$ だけの添字集合を $A$、$\bar\theta$ だけを $B$、両方を持つ集合を $C$ とし、残りを $D$ とする。$A,B,C,D$ は互いに交わらない。$a=|A|$、$b=|B|$、$c=|C|$ とすれば

$$
p=a+c,\quad q=b+c,\quad k=a+b+2c,\quad
|D|=n-a-b-c.
$$

同じ $A,B$ の単項式をまとめ、$R=\{1,\ldots,n\}\setminus(A\cup B)$、$|R|=N$ と置く。$\eta_{A,B}$ を各 $j\in A$ で $\theta^j$、各 $j\in B$ で $\bar\theta^j$ を使う、添字の昇順の外積とする。$\omega_C=\bigwedge_{j\in C}\omega_j$ と書き、順序は常に組 $j$ の昇順に固定する。各成分は

$$
\alpha_{A,B}=\sum_{\substack{C\subset R\\|C|=c}}
t_C\,\eta_{A,B}\wedge\omega_C
$$

となる。係数 $t_C$ は外積を組順へ並べ替えた符号も含む。異なる $(A,B)$ は $\Lambda$ で混ざらない。[随伴の外積・収縮表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)を使うと、$\Lambda$ はこの式の各 $\omega_j$ を一つずつ取り除く。$\eta_{A,B}$ を通る際の符号は、収縮を二度通すので正である。ゆえに原始条件は、$c\ge1$ ならすべての $|T|=c-1$ について

$$
\sum_{j\in R\setminus T}t_{T\cup\{j\}}=0.
$$

**（3）原始条件を補集合の恒等式に直す。** この条件を一つ小さい集合へ順に足し合わせると、すべての $T\subset R$、$|T|<c$ に対し

$$
\sum_{\substack{C\supset T\\|C|=c}}t_C=0.
$$

実際、$|T|=c-1$ は直前の原始条件そのものであり、$|T|=r<c-1$ では $T\cup\{j\}$ に対する既知の式を $j\notin T$ で足すと各 $C\supset T$ が $c-r$ 回現れる。$c-r>0$ なので主張が従う。

$m=n-k=N-2c\ge0$、$S\subset R$、$|S|=c+m=N-c$ とする。$\mathbf 1_{C\cap(R\setminus S)=\varnothing}$ を包含排除で展開すれば、

$$
\begin{aligned}
\sum_{\substack{C\subset S\\|C|=c}}t_C
&=\sum_{|C|=c}t_C
\sum_{T\subset C\cap(R\setminus S)}(-1)^{|T|}\\
&=\sum_{T\subset R\setminus S}(-1)^{|T|}
\sum_{\substack{C\supset T\\|C|=c}}t_C
=(-1)^c t_{R\setminus S}.
\end{aligned}
$$

上の最初の行で $\sum_{T\subset C\cap(R\setminus S)}(-1)^{|T|}$ は、共通部分が空なら1、そうでなければ0である。最後の等号では先ほどの和の消滅により $|T|<c$ の項が消え、$|R\setminus S|=c$ なので $T=R\setminus S$ だけが残る。$c=0$ でも空集合を用いて同じ式が成立する。

**（4）二つの側を照合する。** 各 $\omega_j$ は偶次数だから、$\omega^m$ の展開に余計な交換符号はない。よって $\omega^m\alpha_{A,B}/m!$ で $\eta_{A,B}\wedge\omega_S$ の係数は

$$
\sum_{\substack{C\subset S\\|C|=c}}t_C=(-1)^c t_{R\setminus S}.
$$

一方、星は単項式の未使用の組を補集合へ移す。一形式が入る組は $a+b$ 個あり、各組の星を組み合わせるとき異なる奇次数因子の入れ替えが $(a+b)(a+b-1)/2$ 回起こる。したがって

$$
*(\eta_{A,B}\wedge\omega_C)
=(-1)^{(a+b)(a+b-1)/2}(-i)^a i^b\,
\eta_{A,B}\wedge\omega_{R\setminus C}.
$$

二つの係数の比は

$$
\begin{aligned}
&(-1)^c(-1)^{(a+b)(a+b-1)/2}(-i)^a i^b\\
&\quad=(-1)^{(a+b)(a+b+1)/2+c}i^{a-b}\\
&\quad=(-1)^{k(k+1)/2}i^{p-q},
\end{aligned}
$$

ここで $k=a+b+2c$、$p-q=a-b$ を代入した。したがって各 $(A,B)$ 成分に所望の公式が成立する。すべてを足せば $\alpha$ に対する公式を得る。$\square$
<!-- proof-end -->

**直接例：複素曲面の反自己双対形式。** $n=2$ で $\omega_1=e^1\wedge f^1$、$\omega_2=e^2\wedge f^2$ とする。実 $(1,1)$ 形式 $\alpha=\omega_1-\omega_2$ は、[原始条件の収縮表示](../HOD1-03/index.md#def-hod1-03-primitive)より $\Lambda\omega_1=\Lambda\omega_2=1$、従って $\Lambda\alpha=0$ である。実正規直交基底で直接星を取ると

$$
*\omega_1=\omega_2,\quad *\omega_2=\omega_1,\quad
*\alpha=-\alpha.
$$

$k=2,p=q=1,n-k=0$ を定理へ代入しても $(-1)^3i^0=-1$ となる。さらに

$$
\alpha\wedge\alpha
=(\omega_1-\omega_2)^2=-2\,dV_g,\qquad
\langle\alpha,\alpha\rangle=2.
$$

負の交叉積と正のノルムが同じ点で現れることを、符号まで確認できた。

## 3. 交叉形式を正値内積へ変換する

複素係数コホモロジー類の外積積分は**複素双線形**であり、正定値内積ではない。そこで複素共役と位相因子を加え、原始な同じHodge型の上で正値となる形を考える。先に何を積分するかと、どちらの変数を共役するかを定義する。

<a id="def-hod1-13-primitive-pairing"></a>

<!-- formal-statement-start -->
> **定義（原始交叉形式と符号付きHermite形式）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体、$0\le k\le n$、$m=n-k$ とする。$H^k=H_{\mathrm{dR}}^k(X;\mathbb C)$ について、二つの $k$ 次類 $a,b$ の交叉形式を

$$
Q_k(a,b)=\int_X a\smile b\smile[\omega]_d^m
$$

> と定める。$p+q=k$ とし、[原始Hodge型部分空間](../HOD1-12/index.md#def-hod1-12-primitive-hodge) $P_H^{p,q}$ 上では

$$
\mathscr H_{p,q}(a,b)=
(-1)^{k(k-1)/2}i^{q-p}Q_k(\overline a,b)
$$

> と定める。$\mathscr H_{p,q}$ は第1変数が共役線形、第2変数が線形である。積分はde Rham類の任意の滑らかな閉代表で計算してよい。
<!-- formal-statement-end -->

最後の well-defined 性は[de Rham類の積の定義](../HOD1-10/index.md#def-hod1-10-de-rham-product)から従う。例えば $a$ の代表を $\alpha+d\eta$ に替えると、$b$ と $\omega$ の代表が閉じているため、

$$
d\eta\wedge\beta\wedge\omega^m
=d(\eta\wedge\beta\wedge\omega^m)
$$

となり、境界のないコンパクト $X$ 上で積分は0である。$b$ の代表についても同様である。外積の次数がともに $k$ なので $Q_k(b,a)=(-1)^kQ_k(a,b)$。特に奇数 $k$ では $Q_k(a,a)=0$ であり、$Q_k$ 自体に「正」を期待してはいけない。

<!-- definition-example-start: def-hod1-13-primitive-pairing -->
**定義の確認**。上節の複素曲面の実原始 $(1,1)$ 形式 $\alpha=\omega_1-\omega_2$ を、コンパクト平坦複素二次元トーラス上に定数係数形式として取る。[定数係数形式の調和性](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)から $[\alpha]_d\in P_H^{1,1}$ である。$k=2$ だから $m=0$、共役は $\overline\alpha=\alpha$、位相因子は $(-1)^1i^0=-1$。従って

$$
Q_2([\alpha],[\alpha])=-2\operatorname{Vol}(X),\qquad
\mathscr H_{1,1}([\alpha],[\alpha])=2\operatorname{Vol}(X)>0.
$$

双線形形式の負値を符号付きHermite形式の正値へ移せた。また $\mathscr H(a,b)$ では $a$ だけを共役するため、$\mathscr H(ia,b)=-i\mathscr H(a,b)$ となり、定義した線形性とも一致する。
<!-- definition-example-end -->

<a id="thm-hod1-13-hodge-riemann"></a>

<!-- formal-statement-start -->
> **定理（Hodge–Riemann双線形関係）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とし、$p,q\ge0$、$k=p+q\le n$ とする。原始Hodge型部分空間 $P_H^{p,q}$ の任意の $a,b$ に対して、唯一の調和 $(p,q)$ 代表を $\alpha,\beta$ とすれば

$$
\mathscr H_{p,q}(a,b)=(n-k)!(\alpha,\beta)_2.
$$

> 従って $\mathscr H_{p,q}$ は正定値Hermite形式である。特に $a\ne0$ に対し

$$
(-1)^{k(k-1)/2}i^{p-q}
\int_X\alpha\wedge\overline\alpha\wedge\omega^{n-k}
=(n-k)!\|\alpha\|_2^2>0.
$$

> なお異なる $(p,q)$ 型の原始調和代表 $\alpha,\beta$ に対しては $\int_X\overline\alpha\wedge\beta\wedge\omega^{n-k}=0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

[原始類と調和原始形式の対応](../HOD1-12/index.md#thm-hod1-12-harmonic-primitive)により $\Lambda\alpha=\Lambda\beta=0$。二つに[原始Hodge星公式](#thm-hod1-13-primitive-star)を適用し、[複素形式の内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)の積分へ置き換える。正値性を得る最後の一歩は、調和代表の一意性である。

<!-- proof-start -->
### 証明

$a,b$ は原始Hodge型にあるので、[型別原始分解](../HOD1-12/index.md#prop-hod1-12-type-decomposition)と[調和代表による判定](../HOD1-12/index.md#thm-hod1-12-harmonic-primitive)から、$\alpha,\beta$ は滑らかな調和 $(p,q)$ 形式で、$\Lambda\alpha=\Lambda\beta=0$ を満たす。$m=n-k$ とおく。

[星公式](#thm-hod1-13-primitive-star)を $\beta$ に適用すると、

$$
*\beta=c_{p,q,k}\frac{\omega^m}{m!}\wedge\beta,\qquad
c_{p,q,k}=(-1)^{k(k+1)/2}i^{p-q}.
$$

これを内積の定義へ代入する。$\omega$ は実であり、偶次数なので並べ替えに符号を生まない。

$$
\begin{aligned}
(\alpha,\beta)_2
&=\int_X\overline\alpha\wedge *\beta\\
&=\frac{(-1)^{k(k+1)/2}i^{p-q}}{m!}
\int_X\overline\alpha\wedge\beta\wedge\omega^m.
\end{aligned}
$$

この式に $m!$ を掛け、$i$ の冪の逆数が $i^{q-p}$、$(-1)^{k(k+1)/2}=(-1)^{k(k-1)/2}(-1)^k$ であることを用いると

$$
\begin{aligned}
\mathscr H_{p,q}(a,b)
&=(-1)^{k(k-1)/2}i^{q-p}
\int_X\overline\alpha\wedge\beta\wedge\omega^m\\
&=m!(\alpha,\beta)_2.
\end{aligned}
$$

ここで一見 $(-1)^k$ が余るように見えるが、位相因子の逆元に注意する。上の内積式の係数を $c$ と書けば、$\int\overline\alpha\wedge\beta\wedge\omega^m=m!c^{-1}(\alpha,\beta)_2$ であり、

$$
(-1)^{k(k-1)/2}i^{q-p}c^{-1}
=(-1)^{k^2}i^{2(q-p)}
=(-1)^k(-1)^{q-p}=1
$$

である。最後の等号は $k=p+q$ による。第1変数共役線形性、共役対称性、正値性は右辺の内積から従う。$a\ne0$ なら調和代表 $\alpha\ne0$ であり、積分ノルムは正である。

もう一つの表示では $\overline\alpha\wedge\alpha=(-1)^k\alpha\wedge\overline\alpha$ と $i^{q-p}(-1)^k=i^{p-q}$ を使う。異なる型の直交性は、$\overline\alpha\wedge\beta\wedge\omega^m$ が $(n,n)$ 型になるには $\alpha,\beta$ の型が同じでなければならないこと（または[型直交性](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)）から従う。$\square$
<!-- proof-end -->

**符号の検算。** $n=1,k=1,(p,q)=(1,0)$ では $i^{p-q}=i$、$(-1)^0=1$。局所的に $\alpha=\theta=(e+if)/\sqrt2$ とすると $\alpha\wedge\bar\alpha=-i\,dV_g$ なので $i\alpha\wedge\bar\alpha=dV_g>0$。$n=2,k=2,(p,q)=(1,1)$ では因子は $-1$、すなわち実原始 $(1,1)$ 形式の自己交叉は負である。一方 $(2,0)$ では $(-1)^1i^2=+1$ となる。

## 4. 複素曲面で正方向はただ一つ

実係数の二次類については、自己交叉 $I(a,a)=\int_Xa\smile a$ の正負を数えられる。ただし二次類すべてが $(1,1)$ 型ではない。まず実 $(1,1)$ 型の中で判定し、そのあと複素型 $(2,0),(0,2)$ を加えた全体と比較する。

<a id="thm-hod1-13-hodge-index"></a>

<!-- formal-statement-start -->
> **定理（複素曲面のHodge指数定理）**
> $X$ を**連結**な滑らか・コンパクト・境界なしの複素次元2のKähler多様体とし、$\omega$ を実基本 $(1,1)$ 形式とする。実ベクトル空間

$$
H_{\mathbb R}^{1,1}
=H_{\mathrm{dR}}^2(X;\mathbb R)\cap H^{1,1}(X)
$$

> 上の実対称双線形形式を $I(a,b)=\int_Xa\smile b$ とする。このとき $I$ は非退化で、その符号数（正固有値数、負固有値数）は

$$
\operatorname{sign}(I|_{H_{\mathbb R}^{1,1}})
=(1,h^{1,1}-1).
$$

> 正方向は $\mathbb R[\omega]_d$、その $I$ 直交補空間は

$$
P_{\mathbb R}^{1,1}
=\left\{a\in H_{\mathbb R}^{1,1}:
\int_Xa\smile[\omega]_d=0\right\}
$$

> であり、$I$ はこの原始部分上で負定値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\int_X\omega^2>0$ なのでKähler類は正方向を一つ作る。任意の実 $(1,1)$ 類からこの方向を引き、$\omega$ と交叉して0になるようにすれば原始成分が残る。[Hodge–Riemann関係](#thm-hod1-13-hodge-riemann)はその実原始成分の自己交叉を厳密に負にする。

<!-- proof-start -->
### 証明

$X$ は連結なコンパクトKähler曲面なので、[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)から $H^{1,1}(X)$ は複素共役で不変、実固定部分 $H_{\mathbb R}^{1,1}$ は実次元 $h^{1,1}$ である。$[\omega]_d$ は実 $(1,1)$ 類で、

$$
I([\omega]_d,[\omega]_d)=\int_X\omega^2
=2\operatorname{Vol}(X)>0.
$$

任意の $a\in H_{\mathbb R}^{1,1}$ について実数

$$
c=\frac{I(a,[\omega]_d)}{I([\omega]_d,[\omega]_d)}
$$

を定め、$v=a-c[\omega]_d$ とする。分母は正なので定義でき、

$$
I(v,[\omega]_d)=I(a,[\omega]_d)-cI([\omega]_d,[\omega]_d)=0.
$$

$n=k=2$ に対する[原始類の核条件](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)は

$$
[\omega]_d\smile v=0\in H^4
$$

である。[Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)によれば、最上次数の類は調和4形式で表せる。任意の4形式は $f\,dV_g$ と書け、その余微分はHodge星を通じて $df$ に対応する。従って調和なら $df=0$、連結性から $f$ は定数である。

これで実4次コホモロジーは体積類の一次元空間となり、積分によって $\mathbb R$ と同型になる。したがって

$$
\int_X\omega\wedge v=0\quad\Longleftrightarrow\quad
[\omega]_d\smile v=0
$$

である。よって $v\in P_{\mathbb R}^{1,1}$。これで

$$
H_{\mathbb R}^{1,1}
=\mathbb R[\omega]_d\oplus P_{\mathbb R}^{1,1}
$$

が $I$ 直交直和になる。$v$ が実 $(1,1)$ 型で原始なら、[調和原始代表の判定](../HOD1-12/index.md#thm-hod1-12-harmonic-primitive)で得る実調和代表 $\nu$ に対し、[Hodge–Riemann関係](#thm-hod1-13-hodge-riemann)の $p=q=1,k=2$ を代入して

$$
I(v,v)=\int_X\nu\wedge\nu=-\|\nu\|_2^2.
$$

$v\ne0$ なら $\nu\ne0$ で、右辺は厳密に負である。したがって正の一次元直和と負の $(h^{1,1}-1)$ 次元直和を得る。両方で非退化なので全体でも非退化である。$\square$
<!-- proof-end -->

**交叉行列を実際に対角化する。** $Q=\mathbb{CP}^1\times\mathbb{CP}^1$ では $(u,v)$ 基底に関する $I$ の行列は

$$
\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

基底を $u+v,u-v$ に替えると、

$$
I(u+v,u-v)=0,\quad
I(u+v,u+v)=2,\quad I(u-v,u-v)=-2,
$$

ゆえに行列は $\operatorname{diag}(2,-2)$ となる。[原始核](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)は $\mathbb R(u-v)$、Kähler類は $2\pi(u+v)$ なので、定理の正負方向と一致する。

<a id="cor-hod1-13-full-signature"></a>

<!-- formal-statement-start -->
> **系（実二次コホモロジー全体の符号）**
> $X$ を連結な滑らか・コンパクト・境界なしの複素次元2のKähler多様体とする。実二次コホモロジー $H_{\mathrm{dR}}^2(X;\mathbb R)$ 全体の交叉形式 $I$ の符号数は

$$
(b_2^+,b_2^-)=(1+2h^{2,0},h^{1,1}-1).
$$

> この主張と、実 $(1,1)$ 部分で正方向が一つだけというHodge指数定理は、対象の実ベクトル空間が異なる。
<!-- formal-statement-end -->

### 証明の見取り図

実 $(1,1)$ 成分のほかに、互いに複素共役な $(2,0)$ と $(0,2)$ を合わせた実成分がある。この実成分は二次元ずつ正方向を増やす。両部分の交叉は型の次数から0になる。

<!-- proof-start -->
### 証明

[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と複素共役の型交換から

$$
H_{\mathrm{dR}}^2(X;\mathbb R)
=H_{\mathbb R}^{1,1}\oplus
\{\gamma+\overline\gamma:\gamma\in H^{2,0}(X)\}
$$

が実直和となる。後者の実次元は $2h^{2,0}$。$(1,1)$ と $(2,0),(0,2)$ の外積は複素次元2では $(3,1)$ または $(1,3)$ 型になるので零であり、二つの実部分空間は $I$ 直交する。

後者の $x=\gamma+\overline\gamma\ne0$ については $(2,0)$ 調和代表を $\zeta$ とする。型によって $\zeta^2=\overline\zeta^2=0$、2形式の外積は可換なので

$$
\begin{aligned}
I(x,x)
&=\int_X(\zeta+\overline\zeta)^2\\
&=2\int_X\zeta\wedge\overline\zeta
=2\|\zeta\|_2^2>0.
\end{aligned}
$$

最後は[Hodge–Riemann関係](#thm-hod1-13-hodge-riemann)の $(p,q)=(2,0),k=2$ の符号が $+1$ であることによる。ここへ[実 $(1,1)$ 部分の符号数](#thm-hod1-13-hodge-index)を足せば結論を得る。$\square$
<!-- proof-end -->

この定理はコンパクトKähler曲面の交叉形式についてのもので、任意のコンパクト複素曲面に無条件で適用できるわけではない。また代数的サイクルがどの $(p,p)$ 類を表すかというHodge予想の主張とも異なる。

## 5. 演習：符号を自分で作り直す

### Level A：局所星と交叉の符号

<a id="ex-hod1-13-a01"></a>
#### HOD1-13-A01 複素次元1の星
- Level: A

実正規直交余標構 $e,f$、$\theta=(e+if)/\sqrt2$、$\omega=e\wedge f$ を持つ複素次元1のHermiteベクトル空間で、$*\theta$、$\theta\wedge\bar\theta$、$i\theta\wedge\bar\theta$ を求め、[原始Hodge星公式](#thm-hod1-13-primitive-star)と正値性を確認せよ。

<!-- solution-start -->
### 詳細解答

星の定義から $*e=f$、$*f=-e$ なので、複素線形性によって

$$
*\theta=\frac{f-i e}{\sqrt2}=-i\theta.
$$

一方、外積の同じ因子は消えるから

$$
\theta\wedge\bar\theta
=\frac{(e+if)\wedge(e-if)}2=-i\,e\wedge f.
$$

したがって $i\theta\wedge\bar\theta=\omega>0$（向き付き体積の意味で）。$k=1,p=1,q=0,n-k=0$ を[星公式](#thm-hod1-13-primitive-star)に代入すると係数は $(-1)^1i^1=-i$。これは直接の星計算と一致し、$\|\theta\|^2=1$ にも一致する。
<!-- solution-end -->

<a id="ex-hod1-13-a02"></a>
#### HOD1-13-A02 二次元の反自己双対
- Level: A

複素次元2のHermiteベクトル空間で $\omega_j=e^j\wedge f^j$、$\omega=\omega_1+\omega_2$ とし、$\alpha=\omega_1-\omega_2$ を取る。$\Lambda\alpha=0$、$*\alpha=-\alpha$、$\alpha^2=-2dV_g$ をそれぞれ直接確認せよ。

<!-- solution-start -->
### 詳細解答

[随伴の収縮表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)から $\Lambda\omega_j=1$ なので $\Lambda\alpha=1-1=0$。向き $(e^1,f^1,e^2,f^2)$ に関する星は $*\omega_1=\omega_2$、$*\omega_2=\omega_1$ だから $*\alpha=-\alpha$。偶次数の外積は可換で $\omega_j^2=0$ より

$$
\alpha^2=\omega_1^2-2\omega_1\omega_2+\omega_2^2
=-2\omega_1\omega_2=-2dV_g.
$$

局所ノルムは $\|\alpha\|^2=\|\omega_1\|^2+\|\omega_2\|^2=2$ だから、$\alpha^2=-\|\alpha\|^2dV_g$ の符号も一致する。
<!-- solution-end -->

<a id="ex-hod1-13-a03"></a>
#### HOD1-13-A03 複素双線形の交叉形式
- Level: A

コンパクトKähler多様体 $X$（複素次元 $n$）で、$0\le k\le n$ とする。[原始交叉形式](#def-hod1-13-primitive-pairing) $Q_k$ が偶数 $k$ では対称、奇数 $k$ では交代的であることを示せ。複素双線形の $Q_1(a,a)$ を正ノルムと呼べない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

次数 $k$ の閉形式 $\alpha,\beta$ は、外積の符号則により $\beta\wedge\alpha=(-1)^{k^2}\alpha\wedge\beta=(-1)^k\alpha\wedge\beta$ を満たす。$\omega^{n-k}$ は偶次数なので積分の順序を変えず、

$$
Q_k(b,a)=(-1)^kQ_k(a,b).
$$

奇数 $k$ で $a=b$ とすると $2Q_k(a,a)=0$ となる。値は複素数なので $2$ で割れて $Q_k(a,a)=0$ である。$a\ne0$ でも零となるため正定値ではない。[符号付きHermite形式](#def-hod1-13-primitive-pairing)では第一変数を共役することが本質的である。
<!-- solution-end -->

<a id="ex-hod1-13-a04"></a>
#### HOD1-13-A04 曲面の原始射影
- Level: A

連結コンパクトKähler曲面 $X$ で、実 $(1,1)$ 類 $a$ と基本類 $w=[\omega]_d$ がある。$I(a,w)=s$、$I(w,w)=t>0$ とする。$a=cw+v$、$I(v,w)=0$ となる実数 $c$ を求め、分解が一意であることを示せ。

<!-- solution-start -->
### 詳細解答

$I(a-cw,w)=s-ct=0$ を解いて $c=s/t$ となる。分母 $t$ は正なので割れる。$v=a-(s/t)w$ と置けば直接代入して $I(v,w)=0$。別の分解 $a=c'w+v'$ があれば、$w$ との交叉から $s=c't$、従って $c'=s/t=c$、さらに $v'=a-c'w=v$。この分解は[Hodge指数定理](#thm-hod1-13-hodge-index)の直交分解そのものである。
<!-- solution-end -->

### Level B：具体例とHermite形式をつなぐ

<a id="ex-hod1-13-b01"></a>
#### HOD1-13-B01 射影直線の積の交叉行列
- Level: B

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ で $H^2(Q;\mathbb R)=\mathbb Ru\oplus\mathbb Rv$、$u^2=v^2=0$、$\int_Q uv=1$、$w=2\pi(u+v)$ とする。$a=xu+yv$ に対して $I(a,a)$ と $I(a,w)$ を求め、原始条件と符号数を直接示せ。

<!-- solution-start -->
### 詳細解答

偶次数ゆえ $uv=vu$ なので、

$$
a^2=(xu+yv)^2=2xy\,uv,\qquad
a\,w=2\pi(x+y)\,uv.
$$

積分して $I(a,a)=2xy$、$I(a,w)=2\pi(x+y)$。$I(a,w)=0$ は $y=-x$ と同値であり、原始部分は $a=x(u-v)$。このとき $I(a,a)=-2x^2<0$（$x\ne0$）。一方 $w$ 方向は

$$
I(w,w)=(2\pi)^2I(u+v,u+v)=8\pi^2>0.
$$

二つの独立方向は直交する。従って行列は正負各1方向に対角化され、符号数は $(1,1)$。これは[Hodge指数定理](#thm-hod1-13-hodge-index)の $h^{1,1}=2$ と一致する。
<!-- solution-end -->

<a id="ex-hod1-13-b02"></a>
#### HOD1-13-B02 三次元で残る基本形式
- Level: B

複素次元3のHermiteベクトル空間で $\omega_j=e^j\wedge f^j$、$\omega=\omega_1+\omega_2+\omega_3$、$\alpha=\omega_1-\omega_2$ とする。$\alpha$ が原始 $(1,1)$ 形式であることを確かめ、$*\alpha$、$\alpha^2\wedge\omega$、$\|\alpha\|^2dV_g$ を求めて[星公式](#thm-hod1-13-primitive-star)を検算せよ。

<!-- solution-start -->
### 詳細解答

$\Lambda\omega_1=\Lambda\omega_2=1$ より $\Lambda\alpha=0$。$p=q=1,k=2,n-k=1$ を代入すると星公式は $*\alpha=-\omega\wedge\alpha$ である。実際、

$$
\omega\wedge\alpha
=(\omega_1+\omega_2+\omega_3)(\omega_1-\omega_2)
=\omega_3(\omega_1-\omega_2).
$$

三組の星の補集合計算も $*\omega_1=\omega_2\omega_3$、$*\omega_2=\omega_1\omega_3$ を与えるので $*\alpha=-\omega_3(\omega_1-\omega_2)$ で一致する。また

$$
\alpha^2\wedge\omega
=(-2\omega_1\omega_2)\wedge\omega_3=-2dV_g,
$$

なぜなら $\omega_1,\omega_2$ をもう一度掛ける項は消えるからである。$\alpha$ は直交する二つの単位2形式の差なので $\|\alpha\|^2=2$。したがって $-\alpha^2\omega=\|\alpha\|^2dV_g$ となり、$m!=(3-2)!=1$ も一致する。
<!-- solution-end -->

<a id="ex-hod1-13-b03"></a>
#### HOD1-13-B03 $(2,0)$ 型の正方向
- Level: B

連結コンパクトKähler曲面 $X$ の非零調和 $(2,0)$ 形式 $\zeta$ を取る。$x=[\zeta+\bar\zeta]_d\in H^2(X;\mathbb R)$ について $I(x,x)>0$ を示せ。また $x$ が $H_{\mathbb R}^{1,1}$ に属さないことを示し、「曲面の正方向は一つ」の適用範囲を説明せよ。

<!-- solution-start -->
### 詳細解答

複素次元2では $(4,0)$、$(0,4)$ 形式は零なので $\zeta^2=\bar\zeta^2=0$。2形式の外積は可換であるから

$$
I(x,x)=\int_X(\zeta+\bar\zeta)^2
=2\int_X\zeta\wedge\bar\zeta.
$$

[Hodge–Riemann関係](#thm-hod1-13-hodge-riemann)で $p=2,q=0,k=2$ を入れると、符号は $(-1)^{1}i^2=1$ となる。従って

$$
\int_X\zeta\wedge\bar\zeta=\|\zeta\|_2^2>0,\qquad
I(x,x)=2\|\zeta\|_2^2>0.
$$

一方、[Hodge型の直和分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)で $x$ は $(2,0)+(0,2)$ 成分のみを持ち、$\zeta\ne0$ なので $(1,1)$ 成分だけの実部分空間には属さない。[Hodge指数定理](#thm-hod1-13-hodge-index)が正方向を一つとするのは実 $(1,1)$ 部分であり、全実 $H^2$ ではない。
<!-- solution-end -->

<a id="ex-hod1-13-b04"></a>
#### HOD1-13-B04 原始条件の係数和
- Level: B

複素次元3の点で $\omega_j=e^j\wedge f^j$ とし、$(1,1)$ 形式 $\alpha=t_1\omega_1+t_2\omega_2+t_3\omega_3$ を考える。$\Lambda\alpha=0$ の条件を求める。これを使い、$\alpha\wedge\omega$ における $\omega_1\omega_2$ の係数が $-t_3$ となることを示し、$*\alpha=-\alpha\wedge\omega$ の当該係数を直接検算せよ。

<!-- solution-start -->
### 詳細解答

[随伴の収縮表示](../HOD1-02/index.md#prop-hod1-02-frame-adjoint)より $\Lambda\omega_j=1$。したがって

$$
\Lambda\alpha=t_1+t_2+t_3,
$$

原始条件は $t_1+t_2+t_3=0$。$\omega=\omega_1+\omega_2+\omega_3$ を掛け、$\omega_j^2=0$ を用いると

$$
\alpha\wedge\omega
=(t_1+t_2)\omega_1\omega_2+
(t_1+t_3)\omega_1\omega_3+
(t_2+t_3)\omega_2\omega_3.
$$

最初の係数は $t_1+t_2=-t_3$。一方 $*\omega_3=\omega_1\omega_2$ なので $*\alpha$ における同じ係数は $t_3$。従って $*\alpha=-\alpha\wedge\omega$ の $\omega_1\omega_2$ 係数は左右とも $t_3$ となる。他の2係数も原始条件を循環的に使って一致する。
<!-- solution-end -->

### Level C：曲面の符号を全体で再構成する

<a id="ex-hod1-13-c01"></a>
#### HOD1-13-C01 Hodge指数不等式
- Level: C

連結コンパクトKähler曲面 $X$ の実 $(1,1)$ 類 $a$ と $w=[\omega]_d$ について、[Hodge指数定理](#thm-hod1-13-hodge-index)から次を示せ。

$$
I(a,a)I(w,w)\le I(a,w)^2.
$$

等号成立条件を決定し、$Q=\mathbb{CP}^1\times\mathbb{CP}^1$ の $a=xu+yv$、$w=2\pi(u+v)$ で差を直接計算して確かめよ。

<!-- solution-start -->
### 詳細解答

$t=I(w,w)>0$、$s=I(a,w)$ とし、$v=a-(s/t)w$ と置く。[Hodge指数定理](#thm-hod1-13-hodge-index)より $v$ は実原始 $(1,1)$ 類であり、

$$
I(v,v)\le0,\qquad I(v,v)=0\Longleftrightarrow v=0.
$$

直交性 $I(v,w)=0$ を使って $a=(s/t)w+v$ の平方を展開すると

$$
I(a,a)=\frac{s^2}{t}+I(v,v)\le \frac{s^2}{t}.
$$

$t>0$ を掛けて要求された不等式を得る。等号は $v=0$、すなわち $a\in\mathbb Rw$ と同値である。

$Q$ の場合、[射影直線の積の交叉式](#ex-hod1-13-b01)から

$$
I(a,a)=2xy,\quad I(w,w)=8\pi^2,\quad
I(a,w)=2\pi(x+y).
$$

したがって

$$
I(a,w)^2-I(a,a)I(w,w)
=4\pi^2(x+y)^2-16\pi^2xy
=4\pi^2(x-y)^2\ge0.
$$

等号は $x=y$ で、$a=x(u+v)$ は確かに $w$ の実数倍である。
<!-- solution-end -->

<a id="ex-hod1-13-c02"></a>
#### HOD1-13-C02 複素二次元トーラスの六つの符号
- Level: C

平坦複素二次元トーラス $T=\mathbb C^2/(\mathbb Z+i\mathbb Z)^2$ 上に $z_j=x_j+iy_j$、$e_j=dx_j$、$f_j=dy_j$、$\omega=e_1f_1+e_2f_2$ を取る（隣接積は外積）。次の6個の実二次類の交叉積分を直接計算し、実 $(1,1)$ 部分と実 $H^2$ 全体の符号数を求めよ。

$$
\begin{aligned}
A&=e_1f_1+e_2f_2,&B&=e_1f_1-e_2f_2,\\
C&=e_1e_2+f_1f_2,&D&=f_1e_2-e_1f_2,\\
E&=e_1e_2-f_1f_2,&F&=f_1e_2+e_1f_2.
\end{aligned}
$$

<!-- solution-start -->
### 詳細解答

実座標の平坦計量で $\operatorname{Vol}(T)=1$、体積の向きは $e_1f_1e_2f_2$ とする。例えば $e_1e_2f_1f_2=-e_1f_1e_2f_2$、2形式どうしは可換なので

$$
\begin{aligned}
\int_T A^2&=2,&\int_T B^2&=-2,\\
\int_T C^2&=2\int_T e_1e_2f_1f_2=-2,&
\int_T E^2&=-2\int_T e_1e_2f_1f_2=2.
\end{aligned}
$$

$U=f_1e_2$、$V=e_1f_2$ と置く。$U^2=V^2=0$、$UV=e_1f_1e_2f_2$ となる（$f_1e_2e_1f_2$ で $e_1$ を先頭へ二回交換する）。ゆえに

$$
\int_T D^2=\int_T(U-V)^2=-2,\qquad
\int_T F^2=\int_T(U+V)^2=2.
$$

異なる二つの間の積はすべて0である。例えば $A B=(e_1f_1)^2-(e_2f_2)^2=0$、$C E=(e_1e_2)^2-(f_1f_2)^2=0$、$D F=U^2-V^2=0$。他の組は同じ実1形式が重複するため零である。従って基底 $(A,B,C,D,E,F)$ での行列は

$$
\operatorname{diag}(2,-2,-2,-2,2,2).
$$

$A,B,C,D$ は実 $(1,1)$ 型である。実際 $A=\omega$、$B$ は $(1,1)$ 型の差であり、

$$
dz_1\wedge d\bar z_2=C+iD
$$

から $C,D$ も実 $(1,1)$ 型と分かる。一方

$$
dz_1\wedge dz_2=E+iF
$$

だから $E,F$ は実 $(2,0)+(0,2)$ 部分を張る。四次元の実 $(1,1)$ 部分には正1、負3、全六次元には正3、負3がある。これは $h^{1,1}=4,h^{2,0}=1$ を[実二次交叉形式の符号公式](#cor-hod1-13-full-signature)へ代入した $(3,3)$ と一致する。
<!-- solution-end -->

## 6. 次へ：符号からHodge数の制約へ

原始形式はLefschetz列の出発点であるだけでなく、複素型に応じた**正値の交叉積分**を持つ。曲面の実 $(1,1)$ 成分ではKähler類だけが正方向で、その直交補は負定値となった。次章では、射影空間・積・複素トーラスのHodgeダイヤモンドと、これまでの定理から導かれる大域的な制約を比較する。
