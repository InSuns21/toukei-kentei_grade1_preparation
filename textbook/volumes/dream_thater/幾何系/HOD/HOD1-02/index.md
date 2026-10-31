# HOD1-02 Lefschetz作用素とその随伴

<!-- definition-example-audit: strict -->

## 1. 基本2形式を掛けると次数はどう変わるか

前章では、[複素形式のHermite内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)を作り、型ごとの形式的随伴を調べた。ここでは微分せずに、[基本2形式](../../KAH/KAH1-01/index.md#def-kah1-01-fundamental-form)を外積する操作を考える。これは $k$ 形式を $k+2$ 形式にするが、内積の反対側へ移したとき何が起きるだろうか。

以下、$X$ は複素次元 $n\ge1$ の滑らかなHermite多様体、$g_{\mathbb R}$ は対応する実計量、$J$ は複素構造とする。各点の計算を行うので **コンパクト性もKähler条件 $d\omega=0$ も仮定しない**。$\Omega^{p,q}(X)$ のうち $p,q$ が $0,\ldots,n$ の範囲外なら零と約束する。交換子は $[A,B]=AB-BA$ の順序を用いる。

Hermite計量と $J$ により決まる基本2形式は、実接ベクトル $u,v$ に対して $\omega(u,v)=g_{\mathbb R}(Ju,v)$ である。[正の基本形式とHermite行列の対応](../../KAH/KAH1-02/index.md#prop-kah1-02-matrix-criterion)では、局所座標で $\omega=i g_{j\bar k}\,dz^j\wedge d\bar z^k$ と書く際の正規化を確定した。この $\omega$ を何度も外積する操作が、後にコホモロジーを比較するための出発点となる。

<a id="def-hod1-02-lefschetz"></a>

<!-- formal-statement-start -->
> **定義（Lefschetz作用素）**  
> 複素次元 $n$ のHermite多様体 $(X,J,g_{\mathbb R})$ の基本2形式を $\omega$ とする。滑らかな複素 $k$ 形式 $\alpha$ に対し、**Lefschetz作用素** $L$ を次で定める。

$$
L:\Omega^k(X;\mathbb C)\longrightarrow\Omega^{k+2}(X;\mathbb C),\qquad L\alpha=\omega\wedge\alpha.
$$

> なお $k>2n$ または $k+2>2n$ では出力を零とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hod1-02-lefschetz -->
**定義の確認**（複素次元1）。$\mathbb C$ に計量 $dx^2+dy^2$ を入れると、$z=x+iy$ に対して $\omega=dx\wedge dy=(i/2)dz\wedge d\bar z$ である。したがって

$$
L1=dx\wedge dy,\quad L(dx)=dx\wedge dy\wedge dx=0,\quad L(dy)=0.
$$

最初は次数0から2へ移り、後の二式は外積に同じ1形式が二度現れるため零である。**$L$ は微分作用素でなく、各点の外積代数だけで決まる。**
<!-- definition-example-end -->

## 2. 随伴を点ごとに定義し、unitary余標構へ移る

前章の $\partial^*$ は微分作用素の形式的随伴だった。一方、$L$ は各点の有限次元Hermite空間の線形写像なので、同じ[Hermite内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)に関する**点ごとの随伴**をとれる。$L$ 自身は滑らかな係数を持つ次数2の外積作用であり、境界項は出現しない。

<a id="def-hod1-02-lambda"></a>

<!-- formal-statement-start -->
> **定義（Lefschetz随伴作用素）**  
> 複素次元 $n$ のHermite多様体 $X$ 上の基本形式 $\omega$ に対する $L\alpha=\omega\wedge\alpha$ の、点ごとのHermite内積の随伴を $\Lambda$ と書く。各点 $x\in X$ で任意の $\alpha\in\Lambda^kT_x^*X\otimes\mathbb C$、$\beta\in\Lambda^{k+2}T_x^*X\otimes\mathbb C$ に対し

$$
\langle L\alpha,\beta\rangle_x=\langle\alpha,\Lambda\beta\rangle_x
$$

> を満たす一意な複素線形写像 $\Lambda:\Lambda^{k+2}T_x^*X\otimes\mathbb C\to\Lambda^kT_x^*X\otimes\mathbb C$ を定める。次数0、1上では $\Lambda=0$ とする。
<!-- formal-statement-end -->

存在と一意性は、各次数の外積空間が有限次元の正定値Hermite空間であることから従う。$X$ がコンパクトなら $L$ は $L^2$ 上でも有界で、点ごとの $\Lambda$ はその $L^2$ 随伴と一致する。非コンパクトな場合、計量により $\omega$ の点ごとのノルムは一定 $\sqrt n$ なので、この場合も $L$ は $L^2$ 上有界である。ただし本章の主張は $L^2$ 理論を必要としない。

<!-- definition-example-start: def-hod1-02-lambda -->
**定義の確認**（複素次元1）。前節の実正規直交余標構で $\langle dx\wedge dy,dx\wedge dy\rangle=1$、$\langle1,1\rangle=1$ である。$L1=dx\wedge dy$ なので、随伴等式に $\alpha=1,\beta=dx\wedge dy$ を代入すると

$$
1=\langle L1,dx\wedge dy\rangle
=\langle1,\Lambda(dx\wedge dy)\rangle.
$$

2形式の空間は1次元だから $\Lambda(dx\wedge dy)=1$。0形式や1形式には次数を2下げた非零の行き先がなく、定義どおり $\Lambda=0$ である。
<!-- definition-example-end -->

計算を一般の $n$ 次元へ広げるため、点 $x$ で $J$ と両立する実正規直交余標構 $e^1,f^1,\ldots,e^n,f^n$ をとる。$f^j$ は、$J$ に対応した正規直交ベクトル $Ju_j$ の双対である。$\theta^j=(e^j+i f^j)/\sqrt2$、$\bar\theta^j=(e^j-i f^j)/\sqrt2$ とおくと、[型直交性](../HOD1-01/index.md#prop-hod1-01-type-orthogonality)の証明と同じく、これらは複素余接空間の正規直交基底になる。

1組の $j$ について直接計算すれば

$$
\theta^j\wedge\bar\theta^j
=\frac12(e^j+i f^j)\wedge(e^j-i f^j)=-i\,e^j\wedge f^j.
$$

したがって基本形式の正規化は

$$
\omega=\sum_{j=1}^n e^j\wedge f^j
=i\sum_{j=1}^n\theta^j\wedge\bar\theta^j.
$$

ここで $i$ を落とすと随伴の符号が変わる。係数 $1/2$ を使う座標 $dz^j$ と、ノルム1に正規化した $\theta^j$ も混同しない。

## 3. 外積と収縮で一組ずつ計算する

外積は特定の1形式を「付け加える」操作であり、その随伴はその基底因子を「取り除く」操作になる。この二つを区別するため、$j$ 番目の $(1,0)$ と $(0,1)$ の因子に専用の記号を付ける。

<a id="def-hod1-02-creation-annihilation"></a>

<!-- formal-statement-start -->
> **定義（収縮作用素）**  
> 複素次元 $n$ のHermiteベクトル空間に正規直交複素余標構 $\theta^1,\ldots,\theta^n,\bar\theta^1,\ldots,\bar\theta^n$ を固定する。外積代数全体に作用する複素線形写像を

$$
E_j\alpha=\theta^j\wedge\alpha,\qquad
\bar E_j\alpha=\bar\theta^j\wedge\alpha
$$

> で定め、これらの点ごとのHermite随伴をそれぞれ $I_j=E_j^*$、$\bar I_j=\bar E_j^*$ とする。$I_j,\bar I_j$ を収縮作用素と呼ぶ。外積因子を消すときの符号は、因子を先頭へ移すための交換回数で決まる。
<!-- formal-statement-end -->

単純な外積基底 $\eta_1\wedge\cdots\wedge\eta_k$ に対し、$I_j$ は因子 $\theta^j$ が存在すればそれを消し、先頭から $r$ 番目なら $(-1)^{r-1}$ を掛ける。存在しなければ零とする。$\bar I_j$ も $\bar\theta^j$ に対して同じ規則である。これは外積基底が正規直交であることから、随伴の定義式を各基底対へ代入して確かめられる。

<!-- definition-example-start: def-hod1-02-creation-annihilation -->
**定義の確認**（1組の4状態）。$\xi=\theta\wedge\bar\theta$ とし、$1,\theta,\bar\theta,\xi$ の順に正規直交基底を並べる。

$$
\begin{aligned}
E1&=\theta,&E\bar\theta&=\xi,&E\theta&=E\xi=0,\\
I\theta&=1,&I\xi&=\bar\theta,&I1&=I\bar\theta=0,\\
\bar E\theta&=-\xi,&\bar I\xi&=-\theta,&\bar I\bar\theta&=1.
\end{aligned}
$$

たとえば $\bar I\xi=-\theta$ は $\xi=-\bar\theta\wedge\theta$ の先頭の $\bar\theta$ を消す操作である。$\langle\bar E\theta,\xi\rangle=-1=\langle\theta,\bar I\xi\rangle$ が随伴関係を直接確認する。
<!-- definition-example-end -->

<a id="prop-hod1-02-frame-adjoint"></a>

<!-- formal-statement-start -->
> **命題（随伴のunitary余標構表示）**  
> 複素次元 $n$ の任意のHermiteベクトル空間に、上記の正規直交複素余標構と外積・収縮作用素をとる。基本2形式 $\omega=i\sum_j\theta^j\wedge\bar\theta^j$ の外積作用 $L$ と、そのHermite随伴 $\Lambda$ は

$$
L=i\sum_{j=1}^n E_j\bar E_j,\qquad
\Lambda=-i\sum_{j=1}^n\bar I_j I_j
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

外積を二つに分ければ $\theta^j\wedge\bar\theta^j\wedge\alpha=E_j\bar E_j\alpha$。随伴を取る際は作用順序が逆転し、複素数 $i$ が共役して $-i$ になる。

<!-- proof-start -->
### 証明

前節の基本形式表示より、任意の $\alpha$ に対して

$$
L\alpha=i\sum_j\theta^j\wedge\bar\theta^j\wedge\alpha
=i\sum_j E_j\bar E_j\alpha.
$$

有限次元Hermite内積では、$\langle AB\alpha,\beta\rangle=\langle B\alpha,A^*\beta\rangle=\langle\alpha,B^*A^*\beta\rangle$ なので $(AB)^*=B^*A^*$。また第1変数が共役線形であるため、$(iA)^*=-iA^*$。これらを各項に適用すると

$$
(iE_j\bar E_j)^*=\overline i\,(\bar E_j)^*(E_j)^*
=-i\bar I_jI_j.
$$

有限和の随伴は随伴の和なので、$\Lambda$ の式を得る。$\square$
<!-- proof-end -->

**符号の小さな検算**。上の1組で $L1=i\xi$、$\Lambda\xi=-i$、$\Lambda(i\xi)=1$。とくに $\Lambda\xi=+i$ ではない。二回出てくる $i$ がそれぞれ外積と随伴に由来する。

## 4. Lefschetz交換子が次数だけを見る理由

$L$ と $\Lambda$ の順序を交換すると、どの基底因子が既に存在するかが残る。複数組の外積因子は次数2で偶数なので、異なる組 $j\ne\ell$ の操作同士は互いに可換になる。残るのは各組の4状態の計算だけである。

一組について、$L_j=iE_j\bar E_j$、$\Lambda_j=-i\bar I_jI_j$ とする。$1,\theta^j,\bar\theta^j,\xi_j=\theta^j\wedge\bar\theta^j$ の順に作用させると次の表になる。

| 状態 $v$ | $L_jv$ | $\Lambda_jv$ | $[\Lambda_j,L_j]v$ |
|---|---|---|---|
| $1$ | $i\xi_j$ | $0$ | $1$ |
| $\theta^j$ | $0$ | $0$ | $0$ |
| $\bar\theta^j$ | $0$ | $0$ | $0$ |
| $\xi_j$ | $0$ | $-i$ | $-\xi_j$ |

この最終列は「まだ因子がない組には $+1$、片方ある組には0、両方ある組には $-1$」という数え上げになっている。

<a id="thm-hod1-02-commutator"></a>

<!-- formal-statement-start -->
> **定理（Lefschetz交換子の次数公式）**  
> 複素次元 $n$ の滑らかなHermite多様体 $X$ に基本2形式 $\omega$ と $L\alpha=\omega\wedge\alpha$、その点ごとの随伴 $\Lambda$ をとる。任意の $0\le k\le2n$ と任意の滑らかな複素 $k$ 形式 $\alpha$ に対し

$$
[\Lambda,L]\alpha=(\Lambda L-L\Lambda)\alpha=(n-k)\alpha
$$

> が各点で成り立つ。$d\omega=0$、コンパクト性、境界条件を仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

単項式基底では各組に0個・1個・2個の因子が入り、それぞれの寄与は $1,0,-1$。$r_j$ を $j$ 番目の組に入る因子の個数とすれば寄与は $1-r_j$、全組で $\sum_j(1-r_j)=n-k$ となる。

<!-- proof-start -->
### 証明

点 $x$ にunitary余標構をとり、[随伴の表示](#prop-hod1-02-frame-adjoint)を $L=\sum_jL_j$、$\Lambda=\sum_j\Lambda_j$ と分ける。外積の基本反交換関係から、異なる組の外積または収縮を交差させる際には因子を2個ずつ移動する。符号は $(-1)^2=+1$ なので

$$
[\Lambda_j,L_\ell]=0\quad(j\ne\ell),\qquad
[\Lambda,L]=\sum_{j=1}^n[\Lambda_j,L_j].
$$

同じ組については先ほどの表で四つの基底要素をすべて計算した。$N_j=E_jI_j+\bar E_j\bar I_j$ をその組の因子個数作用素とすると、$N_j$ の固有値は順に $0,1,1,2$。表の最後の列と比較すれば、各基底要素上で

$$
[\Lambda_j,L_j]=\mathrm{id}-N_j
$$

となる。これは一組の基底を尽くしているので作用素等式である。各外積単項式 $v$ にはちょうど $k$ 個の1形式因子があり、$\sum_jN_jv=kv$。よって

$$
[\Lambda,L]v
=\sum_j(\mathrm{id}-N_j)v
=(n-k)v.
$$

外積単項式が $k$ 形式全体を張るので線形性から任意の $\alpha$ に成立する。計算は点 $x$ ごとに行い、$x$ は任意だから多様体全体で成立する。$\square$
<!-- proof-end -->

定理の右辺が次数 $k$ だけで決まる点が重要である。$k<n$ なら正、$k=n$ なら零、$k>n$ なら負となる。ただしこれは **交換子の固有値** についての話で、$L$ や $\Lambda$ 個々の固有値の公式ではない。

## 5. 型と低次元の例で検算する

外積で $(1,1)$ 型の $\omega$ を掛けると $(p,q)$ は $(p+1,q+1)$ へ移る。その随伴は型直交性を保ちながら逆へ移るはずである。これを先ほどの式に照合する。

<a id="prop-hod1-02-bidegree"></a>

<!-- formal-statement-start -->
> **命題（複素型と随伴の作用次数）**  
> 複素次元 $n$ のHermite多様体 $X$ 上の基本2形式 $\omega$ とそのLefschetz作用素 $L$、点ごとの随伴 $\Lambda$ について、$0\le p,q\le n$ で

$$
L:\Omega^{p,q}\to\Omega^{p+1,q+1},\qquad
\Lambda:\Omega^{p,q}\to\Omega^{p-1,q-1}
$$

> が成立する。存在しない型への像は零とする。
<!-- formal-statement-end -->

### 証明の見取り図

$L$ の型は $\omega$ が $(1,1)$ 型であることから決まり、$\Lambda$ は [unitary余標構表示](#prop-hod1-02-frame-adjoint)の $I_j,\bar I_j$ が一つずつ因子を消すことから分かる。

<!-- proof-start -->
### 証明

[複素形式の型分解](../../CM/CM2-01/index.md#thm-cm2-01-type-decomposition)により、$\theta^I\wedge\bar\theta^J$ は型 $(|I|,|J|)$ を持つ。

$L$ の項 $iE_j\bar E_j$ は $\theta^j$ と $\bar\theta^j$ を各1個付け加える。外積が零でない場合、型は $(|I|+1,|J|+1)$ に変わる。

$\Lambda$ の項 $-i\bar I_jI_j$ では二つの因子を各1個消すため、零でない項は型 $(|I|-1,|J|-1)$ になる。単項式で示したので、線形結合である一般の形式にも成立する。$\square$
<!-- proof-end -->

**複素次元1の全表**。$\xi=\theta\wedge\bar\theta$ とすると、$L1=i\xi$、$\Lambda\xi=-i$、他の基底要素への両作用は零である。したがって交換子は次数 $0,1,2$ でそれぞれ $+1,0,-1$。$\omega=i\xi$ を代入すれば $\Lambda\omega=1$ となる。

**複素次元2の全体像**。$\xi_j=\theta^j\wedge\bar\theta^j$ とおけば

$$
\omega=i(\xi_1+\xi_2),\qquad
L1=\omega,\qquad
\Lambda\omega=2.
$$

さらに $\xi_1\wedge\xi_2=\xi_2\wedge\xi_1$（両者とも次数2）だから

$$
L\omega=\omega^2=-2\xi_1\wedge\xi_2,\qquad
\Lambda(\omega^2)=2\omega.
$$

最後の等式は $\Lambda L\omega=L\Lambda\omega$（$k=2=n$）と $\Lambda\omega=2$ からも得られる。直接検算では $\Lambda(-2\xi_1\wedge\xi_2)=2i(\xi_1+\xi_2)$ である。

対角の $(1,1)$ 形式と異なる添字の $(1,1)$ 形式には重要な違いがある。

$$
\begin{aligned}
\Lambda\xi_1&=-i,&\Lambda\xi_2&=-i,\\
\Lambda(\xi_1-\xi_2)&=0,&
\Lambda(\theta^1\wedge\bar\theta^2)&=0.
\end{aligned}
$$

最後の式で $I_1$ は $\theta^1$ を消せるが、その直後の $\bar I_1$ が $\bar\theta^2$ を消せない。$j=2$ の項では最初の $I_2$ が零である。こうして各項を零と確認できる。これらの $\Lambda$ の核とその意味は次章で体系化する。

**閉性を失っても線形代数は残る**。$\mathbb C^2$ で $\omega_0=dx_1\wedge dy_1+dx_2\wedge dy_2$ とし、実計量を $g=e^{2x_1}g_0$ に変えると $\omega=e^{2x_1}\omega_0$ は正の基本形式である。しかし[外微分の次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)から

$$
d\omega=2e^{2x_1}\,dx_1\wedge dx_2\wedge dy_2\ne0.
$$

したがってKähler計量ではない。それでも各点で正規直交余標構を選べるため、上の交換子定理は成立する。**線形代数の交換子公式だけから、微分作用素とのKähler恒等式やHard Lefschetz定理を導いてはいけない。**

## 6. 演習：次数・符号・型・計量への依存を使い分ける

### Level A：基本操作を手で再現する

<a id="ex-hod1-02-a01"></a>
#### HOD1-02-A01 一組の4状態
- Level: A

複素次元1の点で、正規直交余標構 $\theta,\bar\theta$、$\xi=\theta\wedge\bar\theta$、$\omega=i\xi$ をとる。基底 $1,\theta,\bar\theta,\xi$ の各元に $L$、$\Lambda$ と $[\Lambda,L]$ を作用させよ。

<!-- solution-start -->
### 詳細解答

外積の定義から $L1=i\xi$、$L\theta=L\bar\theta=L\xi=0$。$\Lambda=-i\bar I I$ を使うと $I\xi=\bar\theta$、$\bar I\bar\theta=1$ なので $\Lambda\xi=-i$、他は零。したがって

$$
\begin{aligned}
[\Lambda,L]1&=\Lambda(i\xi)=1,\\
[\Lambda,L]\theta&=[\Lambda,L]\bar\theta=0,\\
[\Lambda,L]\xi&=-L(-i)=-\xi.
\end{aligned}
$$

各状態の次数は $0,1,1,2$ であり、$n-k=1,0,0,-1$ に一致する。
<!-- solution-end -->

<a id="ex-hod1-02-a02"></a>
#### HOD1-02-A02 複素次元2の基本形式
- Level: A

正規直交余標構 $\theta^1,\theta^2$ に対し $\xi_j=\theta^j\wedge\bar\theta^j$、$\omega=i(\xi_1+\xi_2)$ とする。$\Lambda\xi_1$、$\Lambda\omega$、$L\omega$ を求めよ。

<!-- solution-start -->
### 詳細解答

[随伴の表示](#prop-hod1-02-frame-adjoint)の $j=1$ 項は $\Lambda\xi_1=-i\bar I_1I_1\xi_1=-i$ を与え、$j=2$ 項は零である。$\xi_2$ も同じ値なので

$$
\Lambda\omega=i(-i-i)=2.
$$

$\xi_j\wedge\xi_j=0$、偶次数同士の交換で $\xi_1\wedge\xi_2=\xi_2\wedge\xi_1$ だから

$$
L\omega=\omega\wedge\omega
=-(\xi_1+\xi_2)^2=-2\xi_1\wedge\xi_2.
$$
<!-- solution-end -->

<a id="ex-hod1-02-a03"></a>
#### HOD1-02-A03 型次数の移動
- Level: A

複素次元3のHermiteベクトル空間で、$\alpha$ は $(1,2)$ 型、$\beta$ は $(0,2)$ 型とする。$L\alpha$、$\Lambda\alpha$、$L\beta$、$\Lambda\beta$ の型と、必ず零になるものを答えよ。

<!-- solution-start -->
### 詳細解答

[作用次数の命題](#prop-hod1-02-bidegree)から、$\alpha$ については $L\alpha$ が $(2,3)$ 型、$\Lambda\alpha$ が $(0,1)$ 型となり、いずれも型だけでは零と決まらない。

$\beta$ については $L\beta$ が $(1,3)$ 型で零とは限らない。一方 $\Lambda\beta$ の形式上の型は $(-1,1)$ で、負の次数の型空間は零だから $\Lambda\beta=0$。判定に使うのは総次数だけでなく各型次数である。
<!-- solution-end -->

<a id="ex-hod1-02-a04"></a>
#### HOD1-02-A04 $i$ の随伴
- Level: A

第1変数共役線形のHermite内積を持つ有限次元空間上で、$A$ の随伴を $A^*$ とする。任意の複素数 $c$ に対し $(cA)^*=\bar c A^*$ を証明し、$c=i$ に適用せよ。

<!-- solution-start -->
### 詳細解答

任意の $u,v$ について第1変数の共役線形性より

$$
\langle(cA)u,v\rangle
=\bar c\langle Au,v\rangle
=\bar c\langle u,A^*v\rangle
=\langle u,\bar c A^*v\rangle.
$$

最後の等号では第2変数の複素線形性を使った。随伴の一意性から $(cA)^*=\bar c A^*$、特に $(iA)^*=-iA^*$ である。
<!-- solution-end -->

### Level B：二つ以上の道具を接続する

<a id="ex-hod1-02-b01"></a>
#### HOD1-02-B01 跡零の$(1,1)$形式
- Level: B

複素次元2の正規直交余標構で $\xi_j=\theta^j\wedge\bar\theta^j$ とする。$\alpha=\xi_1-\xi_2$、$\beta=\theta^1\wedge\bar\theta^2$ について、$\Lambda\alpha=\Lambda\beta=0$ および $L\alpha=L\beta=0$ を定義から示せ。

<!-- solution-start -->
### 詳細解答

[随伴表示](#prop-hod1-02-frame-adjoint)により $\Lambda\xi_1=\Lambda\xi_2=-i$ なので $\Lambda\alpha=-i-(-i)=0$。$\beta$ では、$j=1$ 項は $I_1\beta=\bar\theta^2$ の後に $\bar I_1\bar\theta^2=0$、$j=2$ 項は $I_2\beta=0$ である。従って $\Lambda\beta=0$。

$L\alpha=i(\xi_1+\xi_2)\wedge(\xi_1-\xi_2)$ を展開すると、二乗項は零、交差項は偶次数の交換則で相殺される。$L\beta$ の $\xi_1$ 項には $\theta^1$ が重なり、$\xi_2$ 項には $\bar\theta^2$ が重なるのでどちらも零である。
<!-- solution-end -->

<a id="ex-hod1-02-b02"></a>
#### HOD1-02-B02 基本形式の冪と階乗
- Level: B

複素次元 $n$ のHermiteベクトル空間で $\omega=i\sum_{j=1}^n\xi_j$、$\xi_j=\theta^j\wedge\bar\theta^j$ とする。$1\le r\le n$ に対し $\Lambda(\omega^r)=r(n-r+1)\omega^{r-1}$ を[交換子定理](#thm-hod1-02-commutator)から帰納的に導き、$\omega^n=i^n n!\xi_1\wedge\cdots\wedge\xi_n$ も示せ。

<!-- solution-start -->
### 詳細解答

$r=1$ では $\Lambda\omega=\Lambda L1=(n-0)1=n$（$\Lambda1=0$）だから成立する。$r-1$ の式を仮定し、$\omega^{r-1}$ が次数 $2r-2$ の形式であることに注目する。交換子公式をこの形式に代入すると

$$
\begin{aligned}
\Lambda\omega^r
&=\Lambda L\omega^{r-1}\\
&=L\Lambda\omega^{r-1}+(n-2r+2)\omega^{r-1}\\
&=\{(r-1)(n-r+2)+n-2r+2\}\omega^{r-1}\\
&=r(n-r+1)\omega^{r-1}.
\end{aligned}
$$

最後に $\omega^n=i^n(\sum_j\xi_j)^n$ を展開する。同じ $\xi_j$ が2回入る項は $\xi_j^2=0$ で消え、全 $n$ 個が1回ずつ現れる項だけが残る。$\xi_j$ 同士は偶次数で可換なので、$n!$ 通りの順列がすべて同符号であり

$$
\omega^n=i^n n!\xi_1\wedge\cdots\wedge\xi_n.
$$

この式は $r=n$ で $\Lambda\omega^n=n\omega^{n-1}$ とも整合する。
<!-- solution-end -->

<a id="ex-hod1-02-b03"></a>
#### HOD1-02-B03 非Kählerでも成り立つ式
- Level: B

$\mathbb C^2$ の標準複素構造と実Euclid計量 $g_0$ に対し、$g=e^{2x_1}g_0$ とする。その基本形式 $\omega$ が閉じていないことを示し、この計量でも $[\Lambda,L]|_{\Omega^1}=1$ が成立する根拠を説明せよ。

<!-- solution-start -->
### 詳細解答

標準基本形式は $\omega_0=dx_1\wedge dy_1+dx_2\wedge dy_2$ なので $\omega=e^{2x_1}\omega_0$。[外微分の次数付きLeibniz則](../../GEO/GEO7/index.md#thm-geo7-graded-leibniz)を0形式 $e^{2x_1}$ と2形式 $\omega_0$ に適用すると

$$
\begin{aligned}
d\omega&=2e^{2x_1}dx_1\wedge\omega_0+e^{2x_1}d\omega_0\\
&=2e^{2x_1}dx_1\wedge dx_2\wedge dy_2\ne0.
\end{aligned}
$$

従ってKähler条件を満たさない。しかし各点で $g$ の正規直交余標構を選べば $\omega=i\sum_{j=1}^2\theta^j\wedge\bar\theta^j$ と表せる。[交換子定理](#thm-hod1-02-commutator)はこの点ごとの表示だけを使い、$d\omega$ を使わない。$n=2,k=1$ を代入すると $[\Lambda,L]\alpha=(2-1)\alpha=\alpha$ である。
<!-- solution-end -->

<a id="ex-hod1-02-b04"></a>
#### HOD1-02-B04 点ごとの随伴と積分内積
- Level: B

コンパクト境界なしHermite多様体 $X$ 上で滑らかな $k$ 形式 $\alpha$ と $(k+2)$ 形式 $\beta$ をとる。$\Lambda$ の点ごとの定義から $(L\alpha,\beta)_2=(\alpha,\Lambda\beta)_2$ を導き、ここで微分作用素の部分積分が不要な理由を述べよ。

<!-- solution-start -->
### 詳細解答

各点 $x$ で [随伴の定義](#def-hod1-02-lambda)は $\langle L\alpha(x),\beta(x)\rangle_x=\langle\alpha(x),\Lambda\beta(x)\rangle_x$ を与える。$X$ はコンパクトで両辺が滑らかだから積分でき、[複素形式の $L^2$ 内積](../HOD1-01/index.md#def-hod1-01-complex-inner-product)より

$$
\begin{aligned}
(L\alpha,\beta)_2
&=\int_X\langle L\alpha(x),\beta(x)\rangle_x\,dV_g\\
&=\int_X\langle\alpha(x),\Lambda\beta(x)\rangle_x\,dV_g
=(\alpha,\Lambda\beta)_2.
\end{aligned}
$$

$L$ は $\omega(x)$ を掛ける0階の作用であり、座標微分を他方へ移す手順がない。したがって境界項は発生せず、境界なしの仮定はこの随伴恒等式自体には不要である。
<!-- solution-end -->

### Level C：複素次元2の$(1,1)$形式を分ける

<a id="ex-hod1-02-c01"></a>
#### HOD1-02-C01 基本形式方向と直交成分
- Level: C

複素次元2のHermiteベクトル空間で $\xi_j=\theta^j\wedge\bar\theta^j$、$\omega=i(\xi_1+\xi_2)$ とする。任意の $(1,1)$ 形式

$$
\alpha=a\xi_1+b\xi_2+c\theta^1\wedge\bar\theta^2+d\theta^2\wedge\bar\theta^1
$$

（$a,b,c,d\in\mathbb C$）について、$\alpha=t\omega+\alpha_0$、$\Lambda\alpha_0=0$ となる $t$ と $\alpha_0$ を一意に求め、両成分が直交し、$L\alpha_0=0$ となることを証明せよ。最後に $\|\alpha\|^2$ を二成分のノルムで検算せよ。

<!-- solution-start -->
### 詳細解答

[随伴表示](#prop-hod1-02-frame-adjoint)から $\Lambda\xi_j=-i$、交差項二つの $\Lambda$ 像は零なので

$$
\Lambda\alpha=-i(a+b).
$$

$\Lambda\omega=2$ だから、$\Lambda(\alpha-t\omega)=0$ の必要十分条件は $-i(a+b)-2t=0$。従って

$$
t=-\frac{i(a+b)}2,\qquad
\alpha_0=\frac{a-b}{2}(\xi_1-\xi_2)
+c\theta^1\wedge\bar\theta^2+d\theta^2\wedge\bar\theta^1.
$$

$\Lambda\omega=2\ne0$ なので分解は一意である。点ごとの随伴関係を $1$ と $\alpha_0$ に適用すると、

$$
\langle\omega,\alpha_0\rangle
=\langle L1,\alpha_0\rangle
=\langle1,\Lambda\alpha_0\rangle=0.
$$

複素次元2では $\alpha_0$ が次数2のため [交換子定理](#thm-hod1-02-commutator)から $\Lambda L\alpha_0=L\Lambda\alpha_0=0$。ただしこの等式だけで $L\alpha_0=0$ とは言えない。$L\alpha_0$ は次数4、かつ $L\alpha_0=s\xi_1\wedge\xi_2$ と書ける。ここへ $\Lambda=-i\sum_j\bar I_j I_j$ を適用すると

$$
\Lambda(s\xi_1\wedge\xi_2)=-is(\xi_1+\xi_2).
$$

右辺が零になるのは $s=0$ のときだけなので、$L\alpha_0=0$。

四つの $(1,1)$ 外積単項式は正規直交なので $\|\alpha\|^2=|a|^2+|b|^2+|c|^2+|d|^2$。また $\|\omega\|^2=2$ で、

$$
\begin{aligned}
\|t\omega\|^2&=\frac{|a+b|^2}{2},\\
\|\alpha_0\|^2&=\frac{|a-b|^2}{2}+|c|^2+|d|^2.
\end{aligned}
$$

和は $\{|a+b|^2+|a-b|^2\}/2=|a|^2+|b|^2$ を用いて $\|\alpha\|^2$ に一致する。$\square$
<!-- solution-end -->

## 7. 次へ：点ごとの交換子から分解へ

本章では、滑らかなHermite計量さえあれば $L$ と $\Lambda$ の交換子が次数を数えることを証明した。次章ではこの有限次元作用から $\mathfrak{sl}_2$ の交換関係、原始形式とLefschetz分解を導く。その後にKähler条件を微分作用素との関係へ使う。**点ごとの分解と大域コホモロジーの定理は、まだ同一視しない。**
