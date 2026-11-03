# CYG1-06 Hodgeダイヤモンドを何が制約するか

<!-- definition-example-audit: strict -->

## 1. 標準束が自明なら、ダイヤモンドは一つに決まるのか

[Fermat四次K3曲面](../CYG1-05/index.md#prop-cyg1-05-hodge)では $h^{2,0}=1$、$h^{1,1}=20$ だった。一方、[複素2次元トーラス](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)では $h^{2,0}=1$、$h^{1,1}=4$ である。どちらも標準束が正則自明で、コンパクトKählerだ。同じ標準束の情報から異なる「中央の数」が出る理由を整理したい。

そこで次の三種類の条件を分けて使う。

1. **複素構造・正則体積形式**：標準束 $K_X$ の自明性から何が分かるか。
2. **Kähler性**：[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)、対称性、[Hard Lefschetz定理](../../HOD/HOD1-11/index.md#thm-hod1-11-hard-lefschetz)が、どの型・次数を結ぶか。
3. **個別の位相・幾何**：Betti数、Euler標数、基本群など、対象を具体的に調べなければ得られないもの。

本章の舞台は、特記しない限り**連結でコンパクトな、複素次元 $n\ge1$ のKähler多様体** $X$ である。Hodge数は[既習の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)

$$
h^{p,q}(X)=\dim_{\mathbb C}H_{\bar\partial}^{p,q}(X),
\qquad 0\le p,q\le n
$$

であり、$h^{p,q}=0$ と書くときは、このDolbeaultコホモロジー群が零次元であることを意味する。特に $h^{p,0}$ は大域正則 $p$ 形式の空間の次元である。Hodgeダイヤモンドはこれらを次数 $p+q$ に従って並べたものだ。

## 2. 正則体積形式が決めるのは一番端の数

標準束 $K_X=\bigwedge^n\Omega_X^1$ が正則自明であることは、[正則体積形式による自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)によって、どの点でも零にならない大域正則 $n$ 形式 $\Omega$ を一つ選べることと同値である。

ここで「一つ選べる」と「正則 $n$ 形式の空間が一次元」との間には、まだ一手ある。ほかの正則 $n$ 形式を $\Omega$ で割って得る正則関数が、コンパクト性によって定数になることを示そう。

<a id="prop-cyg1-06-top-hodge"></a>

<!-- formal-statement-start -->
> **命題（正則体積形式と最高Hodge数）**
>
> $X$ を連結・コンパクトな複素次元 $n\ge1$ の複素多様体とする。標準束が正則線束として $K_X\simeq\mathcal O_X$ ならば

$$
h^{n,0}(X)=1.
$$

> この結論自体にKähler性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

零にならない $\Omega$ を局所正則枠に使うと、任意の大域正則 $n$ 形式は $f\Omega$ と一意に書ける。局所係数 $f$ が重なりで一致するので大域正則関数となり、連結・コンパクト性と[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)により定数になる。

<!-- proof-start -->
### 証明

[正則自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)から零にならない大域正則形式 $\Omega$ を取る。任意の $\eta\in H^0(X,K_X)$ に対し、正則座標近傍 $U$ では

$$
\Omega|_U=g_U\,dz^1\wedge\cdots\wedge dz^n,\qquad
\eta|_U=a_U\,dz^1\wedge\cdots\wedge dz^n
$$

と書ける。$g_U$ はどの点でも零でないので $f_U=a_U/g_U$ は正則関数である。重なり $U\cap V$ では $\eta=f_U\Omega=f_V\Omega$ であり、$\Omega$ は零にならないから $f_U=f_V$。よって $f_U$ は大域正則関数 $f$ に貼り合わされ、$\eta=f\Omega$ となる。

$X$ はコンパクトなので $|f|$ は最大値を取る。正則座標での一変数[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を各座標方向に適用すると、最大点の近傍で $f$ は局所定数である。[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)を座標ごとに使う解析接続と連結性から $f$ は全域で定数となる。逆に $\Omega\ne0$ だから $c\mapsto c\Omega$ は単射。したがって

$$
H^0(X,K_X)=\mathbb C\Omega,\qquad
\dim_{\mathbb C}H^0(X,K_X)=1.
$$

正則 $n$ 形式は局所係数が正則な $(n,0)$ 形式であり、これは $\bar\partial\eta=0$ と同値である。$(n,-1)$ 形式は存在しないため、この次数のDolbeault群では商で消える像もなく、

$$
H_{\bar\partial}^{n,0}(X)=H^0(X,K_X)=\mathbb C\Omega.
$$

したがって[Hodge数の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)から $h^{n,0}=1$ が従う。$\square$
<!-- proof-end -->

**直接例。** $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし $T=E^2$ とする。[トーラスの正則体積形式](../CYG1-04/index.md#prop-cyg1-04-volume-form)は $\Omega=dz^1\wedge dz^2$ で、格子による平行移動で変わらず、任意の点で零にならない。ゆえに $K_T$ は正則自明である。命題の証明をこの $\Omega$ へ適用すれば、正則2形式は $c\,dz^1\wedge dz^2$ の形に限られ、$h^{2,0}=1$ と実際に確認できる。

本章のコンパクトKähler仮定に戻れば、[Hodge数の共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)から $h^{0,n}=h^{n,0}=1$ にもなる。これは直前の命題とは異なり、ここではKähler性を用いた結論である。ただし「最高次の正則形式が一次元」から「低い次数の正則形式が零」とはまだ言っていない。

## 3. 三つの制約は何を写し、何を写さないか

まず既習の結果の**対象と写像**を並べて照合する。ここで記号を区別しておく。[de RhamコホモロジーのHodge型部分空間](../../HOD/HOD1-06/index.md#def-hod1-06-hodge-summand)は $H_{\mathrm{Hdg}}^{p,q}(X)\subset H_{\mathrm{dR}}^{p+q}(X;\mathbb C)$ であり、§1でHodge数を定めたDolbeault群 $H_{\bar\partial}^{p,q}(X)$ と最初から同一の集合ではない。[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)によってDolbeault類の一意な調和代表 $h$ を選び、de Rham類 $[h]_d$ へ写すと両者が同型になる。本節以下の $H^{p,q}$ は、型別Lefschetzを述べるときの略記 $H_{\mathrm{Hdg}}^{p,q}(X)$ とし、$\dim_{\mathbb C}H^{p,q}=h^{p,q}$ である。

Kähler形式 $\omega$ は $(1,1)$ 型だから、$H^{p,q}$ の類 $[\alpha]_d$ に対して $L([\alpha]_d)=[\omega\wedge\alpha]_d$ とすると、楔積の型が $(p+1,q+1)$ になる。以下の表で $L^{n-k}$ と書くときは、**同じ作用素を $n-k$ 回合成する**意味である。

| 入力 | 必要な条件 | 得られる関係 |
| --- | --- | --- |
| [Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition) | コンパクトKähler | $b_k=\sum_{p+q=k}h^{p,q}$ |
| [共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation) | コンパクトKählerとしての既習証明 | $h^{p,q}=h^{q,p}$ |
| [補次数対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-duality) | コンパクトKählerとしての既習証明 | $h^{p,q}=h^{n-p,n-q}$ |
| [型別Hard Lefschetz](../../HOD/HOD1-11/index.md#prop-hod1-11-type-refinement) | コンパクトKähler、$p+q=k\le n$ | $L^{n-k}:H^{p,q}\simeq H^{n-q,n-p}$ |

ここで $b_k=\dim_{\mathbb Q}H^k(X;\mathbb Q)$ はBetti数であり、[既習のde RhamによるBetti数の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)と同じ次元を数える。表の $L$ は $[\omega]$ とのカップ積を表し、上の楔積表示と一致する。

三番目の補次数対称性は、$(p,q)\mapsto(n-p,n-q)$ という**両添字の反転**である。これは[相補Hodge型の非退化積分対](../../HOD/HOD1-07/index.md#thm-hod1-07-perfect-pairing)によるSerre型双対と整合する。二番目の複素共役 $(p,q)\mapsto(q,p)$ とも、四番目の型別Lefschetz $(p,q)\mapsto(n-q,n-p)$ とも区別する。一般のコンパクト複素多様体にはSerre双対性が成り立つが、ここで使う**de Rhamの型別分解とHard Lefschetz**まで非Kählerの場合に引き延ばしてはいけない。

<a id="prop-cyg1-06-kahler-constraints"></a>

<!-- formal-statement-start -->
> **命題（Hodge対称性とKähler性の制約の適用）**
>
> $X$ を連結・コンパクトな複素次元 $n\ge1$ のKähler多様体、$\omega$ をそのKähler形式とする。このとき次が成り立つ。
>
> **（1）** $h^{p,q}=h^{q,p}=h^{n-p,n-q}$（$0\le p,q\le n$）、すべての奇数次Betti数は偶数である。
>
> **（2）** $1\le r\le n$ なら $h^{r,r}\ge1$。
>
> **（3）** $p,q\ge0$ かつ $p+q<n$ なら、$L:H^{p,q}\to H^{p+1,q+1}$ は単射であり $h^{p,q}\le h^{p+1,q+1}$。
<!-- formal-statement-end -->

### 証明の見取り図

（1）は既習の対称性とHodge分解を対象 $X$ に適用し、奇数次数で $(p,q)$ と $(q,p)$ を組にする。（2）はKähler類の冪の非零性。（3）は $L\alpha=0$ と仮定し、さらに $n-p-q-1$ 回 $L$ を掛けてHard Lefschetzの単射性に帰着する。

<!-- proof-start -->
### 証明

（1）$X$ はコンパクトKählerだから[共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)と[補次数対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-duality)を各Hodge型に適用できる。

$k$ が奇数なら $p+q=k$ で $p=q$ は不可能である。[Hodge分解によるBetti数の和](../../HOD/HOD1-07/index.md#thm-hod1-07-betti-constraints)で $(p,q)$ と $(q,p)$ の二項を組にすると、各組は $2h^{p,q}$ となる。従って

$$
b_k=\sum_{\substack{p+q=k\\p<q}}2h^{p,q}
$$

は偶数である。

（2）[Kähler類の冪の非零性](../../HOD/HOD1-14/index.md#cor-hod1-14-kahler-powers)を $r$ に適用する。$[\omega]^r$ は $(r,r)$ 型で非零だから $H^{r,r}(X)\ne0$。具体的には $[\omega]^r=0$ と仮定すると $[\omega]^n=[\omega]^{n-r}\smile[\omega]^r=0$ となるが、Kähler形式の体積積分 $\int_X\omega^n>0$ に反する。よって $h^{r,r}\ge1$。

（3）$k=p+q<n$ とする。[型別Hard Lefschetz同型](../../HOD/HOD1-11/index.md#prop-hod1-11-type-refinement)は

$$
L^{n-k}:H^{p,q}(X)\xrightarrow{\ \simeq\ }H^{n-q,n-p}(X)
$$

である。$\alpha\in H^{p,q}$ について $L\alpha=0$ ならば、$n-k-1\ge0$ なので

$$
L^{n-k}\alpha=L^{n-k-1}(L\alpha)=0.
$$

左辺の写像は同型、特に単射であるから $\alpha=0$。したがって $L:H^{p,q}\to H^{p+1,q+1}$ は単射であり、有限次元性から次元の不等式が従う。$\square$
<!-- proof-end -->

**次数の境界。** $p+q=n$ では $L^{n-(p+q)}=L^0=\operatorname{id}$ がHard Lefschetzの主張である。この事実から**一回の** $L:H^{p,q}\to H^{p+1,q+1}$ が単射とは言えない。例えば複素曲面の中央次数 $H^2$ がその境界である。さらに[弱Lefschetz超平面定理](../CYG1-05/index.md#thm-cyg1-05-lefschetz-input)は射影超曲面の包含 $X\hookrightarrow\mathbb P^m$ の誘導写像についての別の定理で、ここでのKähler類による $L$ の同型とは異なる。

## 4. 中間の正則形式が消える、という偽の推論

$K_X\simeq\mathcal O_X$ は $n$ 形式の空間を一次元にするが、$0<p<n$ の正則 $p$ 形式はどうか。標準束を自明化する $\Omega$ は楔積の**最高次数**にあるため、それだけで低次数の形式を零にする作用素は得られない。

<a id="prop-cyg1-06-torus-counterexample"></a>

<!-- formal-statement-start -->
> **命題（トーラスによる中間正則形式消滅の反例）**
>
> $n\ge2$ とし、楕円曲線 $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ の積 $T=E^n$ に積Kähler構造を入れる。$T$ は連結・コンパクトで $K_T\simeq\mathcal O_T$ だが、各 $0<p<n$ に対し

$$
h^{p,0}(T)=\binom np>0.
$$

> したがって標準束自明性だけから $h^{p,0}=0$（$0<p<n$）は導けない。
<!-- formal-statement-end -->

### 証明の見取り図

格子平行移動で不変な $dz^j$ がトーラスへ降り、異なる添字の楔積を数える。最高次では一つ、途中次数では $\binom np$ 個になる。

<!-- proof-start -->
### 証明

$E$ は楕円曲線なのでコンパクト・連結であり、積 $T=E^n$ も同様である。各因子の平坦Kähler形式を足せば正値閉 $(1,1)$ 形式になるので $T$ はKählerである。[トーラスの正則体積形式](../CYG1-04/index.md#prop-cyg1-04-volume-form)の構成から

$$
\Omega=dz^1\wedge\cdots\wedge dz^n
$$

は格子平行移動で不変で、すべての点で零にならない。ゆえに $K_T\simeq\mathcal O_T$。一方、昇順添字 $I=\{i_1<\cdots<i_p\}\subset\{1,\ldots,n\}$ に対する

$$
dz^I=dz^{i_1}\wedge\cdots\wedge dz^{i_p}
$$

は降下した大域正則 $p$ 形式である。これらはどの点の接空間でも $\bigwedge^p(\mathbb C^n)^*$ の標準基底なので一次独立である。従って少なくとも $\binom np$ 個ある。

逆に[複素トーラスのHodge数の計算](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)では平坦計量の調和代表が定数係数形式で尽くされ、

$$
h^{p,q}(T)=\binom np\binom nq.
$$

$q=0$ に代入すると $\binom n0=1$ より主張の等号を得る。$0<p<n$ では $\binom np\ge n>0$（端点に近い次数でも正）である。$\square$
<!-- proof-end -->

**条件をすべて満たす直接例。** $n=2$ なら $\Omega=dz^1\wedge dz^2$ は零にならず、$dz^1,dz^2$ は独立な正則1形式なので $h^{1,0}=2$。$n=3$ なら正則1形式 $dz^1,dz^2,dz^3$ の三つと、正則2形式 $dz^1\wedge dz^2,dz^1\wedge dz^3,dz^2\wedge dz^3$ の三つがある。いずれも「滑らか・連結・コンパクト・Kähler・標準束正則自明」の条件を満たす反例である。

この反例が壊すのは「正則体積形式がある $\Rightarrow$ 途中次数に正則形式がない」という**根拠のない含意**であり、[正則体積形式と最高Hodge数](#prop-cyg1-06-top-hodge)の結論ではない。追加の特殊ホロノミー条件のもとではRicci平坦計量とBochner型の議論による消滅が得られる場合があるが、その計量の存在もHolonomyの等号も本章では証明していない（後続CYG1-10/11で区別する）。

## 5. 複素曲面ではどこまで数が埋まるか

複素次元 $n=2$ に固定し、$K_X$ が正則自明と仮定する。[正則体積形式と最高Hodge数](#prop-cyg1-06-top-hodge)から $h^{2,0}=1$。Kähler性による対称性で $h^{0,2}=1$、$h^{0,0}=h^{2,2}=1$、一次の数と中央の数が残る。

<a id="prop-cyg1-06-surface-skeleton"></a>

<!-- formal-statement-start -->
> **命題（標準束自明な曲面のHodge数の数値骨格）**
>
> $X$ を連結・コンパクトな複素次元2のKähler多様体で $K_X\simeq\mathcal O_X$ とする。$a=h^{1,0}(X)$、$c=h^{1,1}(X)$ と置くと、行が $p$、列が $q$ のHodge数表は

$$
(h^{p,q})_{0\le p,q\le2}=
\begin{pmatrix}
1&a&1\\
a&c&a\\
1&a&1
\end{pmatrix},\qquad a\ge0,\quad c\ge1.
$$

> Betti数とEuler標数は

$$
(b_0,b_1,b_2,b_3,b_4)=(1,2a,c+2,2a,1),
\qquad \chi_{\mathrm{top}}=c+4-4a.
$$

> これらは必要な数値制約であり、任意の $a,c$ の組について実現可能性まで主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

端点の $1$ を標準束と連結性から、残りを共役・補次数対称性から配置する。Betti数は斜め $p+q=k$ の和で計算する。中央の $c\ge1$ はKähler類が零にならないことから得る。

<!-- proof-start -->
### 証明

$h^{0,0}=1$ は連結コンパクト上の正則関数が定数であること、$h^{2,0}=1$ は[正則体積形式と最高Hodge数](#prop-cyg1-06-top-hodge)から得る。[共役・補次数対称性](#prop-cyg1-06-kahler-constraints)を $n=2$ に適用すると

$$
h^{0,2}=h^{2,0}=1,\quad h^{2,2}=h^{0,0}=1,
\quad h^{0,1}=h^{1,0}=h^{1,2}=h^{2,1}=a.
$$

$h^{1,1}=c$ だけが中央で固定されず、[Kähler類の非零性](#prop-cyg1-06-kahler-constraints)の $r=1$ から $c\ge1$。斜め和を順に数えると

$$
\begin{aligned}
b_0&=h^{0,0}=1, & b_1&=h^{1,0}+h^{0,1}=2a,\\
b_2&=h^{2,0}+h^{1,1}+h^{0,2}=c+2,\\
b_3&=h^{2,1}+h^{1,2}=2a, & b_4&=h^{2,2}=1.
\end{aligned}
$$

よって交代和は $1-2a+(c+2)-2a+1=c+4-4a$。$\square$
<!-- proof-end -->

実際の二例に代入しよう。

| 連結コンパクトKähler曲面 | $K_X$ | $a=h^{1,0}$ | $c=h^{1,1}$ | $\chi_{\mathrm{top}}$ |
| --- | --- | ---: | ---: | ---: |
| [Fermat四次K3](../CYG1-05/index.md#prop-cyg1-05-hodge) | 正則自明 | 0 | 20 | $20+4=24$ |
| [二次元トーラス $E^2$](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers) | 正則自明 | 2 | 4 | $4+4-8=0$ |

K3側の $a=0,c=20$ は[弱Lefschetz・Chern・Eulerの個別計算](../CYG1-05/index.md#prop-cyg1-05-hodge)を使った結果であり、$K_X$ 自明だけからは出ない。トーラス側も基底となる定数係数形式を実際に数えた結果だ。対称性は**既に知っている一つの数を別の位置へ運ぶ**が、未知の中央数を創り出すものではない。

## 6. 複素三次元でも独立な数字が残る

次の五次三次元超曲面の計算に備え、複素次元 $n=3$ の数値骨格を作る。$K_X\simeq\mathcal O_X$ でも、ここではまだ $h^{1,0}$ や $h^{2,0}$ の消滅を仮定しない。

<a id="prop-cyg1-06-threefold-skeleton"></a>

<!-- formal-statement-start -->
> **命題（標準束自明な三次元多様体のBetti数とEuler標数）**
>
> $X$ を連結・コンパクトな複素次元3のKähler多様体で $K_X\simeq\mathcal O_X$ とする。

$$
a=h^{1,0},\quad b=h^{2,0},\quad
c=h^{1,1},\quad d=h^{2,1}
$$

> と置くと、行 $p$、列 $q$ のHodge数表は

$$
(h^{p,q})_{0\le p,q\le3}=
\begin{pmatrix}
1&a&b&1\\
a&c&d&b\\
b&d&c&a\\
1&b&a&1
\end{pmatrix}.
$$

> 特に $c\ge1$ であり、

$$
\begin{aligned}
(b_0,\ldots,b_6)
&=(1,\,2a,\,2b+c,\,2+2d,\,2b+c,\,2a,\,1),\\
\chi_{\mathrm{top}}(X)
&=2(c+2b-2a-d).
\end{aligned}
$$

> もし**追加条件として** $a=b=0$ が既に分かっているなら $\chi_{\mathrm{top}}=2(h^{1,1}-h^{2,1})$ となる。この追加条件は $K_X$ の自明性だけからは従わない。
<!-- formal-statement-end -->

### 証明の見取り図

最高Hodge数と端点の $1$ を置き、共役・補次数対称性で残りの欄を四つの代表値 $a,b,c,d$ へ帰着する。Betti数は斜め和、Euler標数は交代和を一段ずつ計算する。

<!-- proof-start -->
### 証明

[正則体積形式と最高Hodge数](#prop-cyg1-06-top-hodge)と連結性から $h^{0,0}=h^{3,0}=1$。[共役・補次数対称性](#prop-cyg1-06-kahler-constraints)から $h^{0,3}=h^{3,3}=1$。例えば $h^{1,3}=h^{3-1,3-3}=h^{2,0}=b$、$h^{2,3}=h^{1,0}=a$、$h^{2,2}=h^{1,1}=c$。残る対称欄も同様に上記の行列になる。

次数ごとの和を明示すると

$$
\begin{aligned}
b_0&=1,\quad b_1=h^{1,0}+h^{0,1}=2a,\\
b_2&=h^{2,0}+h^{1,1}+h^{0,2}=2b+c,\\
b_3&=h^{3,0}+h^{2,1}+h^{1,2}+h^{0,3}=2+2d.
\end{aligned}
$$

補次数対称性を各斜めに適用して $b_4=b_2$、$b_5=b_1$、$b_6=b_0$。その後、符号を保って交代和を取ると

$$
\begin{aligned}
\chi_{\mathrm{top}}
&=1-2a+(2b+c)-(2+2d)+(2b+c)-2a+1\\
&=2c+4b-4a-2d=2(c+2b-2a-d).
\end{aligned}
$$

$c\ge1$ は[非零Kähler類](#prop-cyg1-06-kahler-constraints)の $r=1$ から得る。最後に $a=b=0$ を**条件付きで**代入すると $\chi_{\mathrm{top}}=2(c-d)$ となる。$\square$
<!-- proof-end -->

**検算。** $T=E^3$ では[トーラスの公式](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)から $(a,b,c,d)=(3,3,9,9)$。上の式は

$$
(b_0,\ldots,b_6)=(1,6,15,20,15,6,1),\quad
\chi_{\mathrm{top}}=2(9+6-6-9)=0
$$

を返す。Kähler類が存在するだけでは $c=1$ とも、$d=101$ とも決まらない。後のquinticでは[弱Lefschetz入力](../CYG1-05/index.md#thm-cyg1-05-lefschetz-input)を**複素次元3に合う形で**改めて適用し、$b_1=0,b_2=1$ を得ることになる。さらに $h^{2,0}=0$ を位相とKähler型の情報から導く。これを待たずに本章の数表だけで $h^{2,1}$ を決めることはできない。

## 7. 演習：どの数を既知として使ったか

<a id="ex-cyg1-06-a01"></a>
#### CYG1-06-A01 対称性の添字
- Level: A

複素次元3のコンパクトKähler多様体で $h^{1,0}=r$ とする。共役対称性、補次数対称性、型別Hard Lefschetzがそれぞれ $(1,0)$ をどの型へ移すかを述べ、そのHodge数を求めよ。

<!-- solution-start -->
**詳細解答。** [共役対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-conjugation)では $(1,0)\mapsto(0,1)$ なので $h^{0,1}=r$。[補次数対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-duality)では $(1,0)\mapsto(2,3)$ なので $h^{2,3}=r$。[型別Hard Lefschetz](../../HOD/HOD1-11/index.md#prop-hod1-11-type-refinement)は $k=1,n=3$ だから $L^{3-1}=L^2:H^{1,0}\simeq H^{3,2}$ となり $h^{3,2}=r$。結論の数字は同じでも、写像は異なる。
<!-- solution-end -->

<a id="ex-cyg1-06-a02"></a>
#### CYG1-06-A02 正則体積形式の唯一性
- Level: A

連結・コンパクトな複素曲面 $Y$ で零にならない正則2形式 $\Omega$ があるとする。任意の正則2形式 $\eta$ が $\eta=c\Omega$ と書ける理由を、局所係数とコンパクト性を使って説明せよ。Kähler性は必要か。

<!-- solution-start -->
**詳細解答。** 局所座標で $\Omega=g\,dz^1\wedge dz^2$、$\eta=a\,dz^1\wedge dz^2$ と書く。$g$ は零にならないので $f=a/g$ は正則で、重なりでも $\eta=f\Omega$ による係数は一致し、大域正則関数となる。連結コンパクト上の正則関数は[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)により定数 $c$ なので $\eta=c\Omega$。[最高Hodge数の証明](#prop-cyg1-06-top-hodge)はKähler形式もHodge分解も用いていない。
<!-- solution-end -->

<a id="ex-cyg1-06-a03"></a>
#### CYG1-06-A03 三次元トーラスの正則形式を数える
- Level: A

$T=E^3$ で $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とする。大域正則1形式、2形式、3形式の定数係数基底を列挙し、$h^{1,0}$、$h^{2,0}$、$h^{3,0}$ を求めよ。

<!-- solution-start -->
**詳細解答。** 格子平行移動は $dz^j$ を変えない。1形式の基底は $dz^1,dz^2,dz^3$、2形式の基底は $dz^1\wedge dz^2,dz^1\wedge dz^3,dz^2\wedge dz^3$、3形式の基底は $dz^1\wedge dz^2\wedge dz^3$。各点で楔積基底として一次独立である。[複素トーラスのHodge数](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)は定数係数形式がすべてを尽くすことも与えるので $(h^{1,0},h^{2,0},h^{3,0})=(3,3,1)$。
<!-- solution-end -->

<a id="ex-cyg1-06-a04"></a>
#### CYG1-06-A04 Lefschetzの指数
- Level: A

連結・コンパクトKähler三次元多様体で $k=2$ と $k=3$ の[Hard Lefschetz同型](../../HOD/HOD1-11/index.md#thm-hod1-11-hard-lefschetz)を出発・到着次数とともに書け。$k=3$ の結果から $L:H^3\to H^5$ の単射性を断言できるか。

<!-- solution-start -->
**詳細解答。** $n=3$ なので $k=2$ では $n-k=1$、$L:H^2\to H^4$ が同型。$k=3$ では $n-k=0$、$L^0=\operatorname{id}:H^3\to H^3$ が同型である。後者には $H^5$ が現れず、一回の $L$ の単射性を保証しない。単射の導出には $n-k-1\ge0$、つまり $k<n$ が必要である。
<!-- solution-end -->

<a id="ex-cyg1-06-a05"></a>
#### CYG1-06-A05 零にできないKähler成分
- Level: A

連結・コンパクトKähler三次元多様体で $h^{1,1}=0$ と仮定すると矛盾する理由を示せ。また $h^{2,2}=0$ と仮定しても矛盾するか。

<!-- solution-start -->
**詳細解答。** Kähler形式の類 $[\omega]\in H^{1,1}$ が零ならその三乗も零だが、体積積分は正である。

$$
[\omega]=0\ \Rightarrow\ [\omega]^3=0,
\qquad \int_X\omega^3>0.
$$

従って $h^{1,1}\ge1$。[Kähler類の冪の非零性](../../HOD/HOD1-14/index.md#cor-hod1-14-kahler-powers)を $r=2$ に使うと $[\omega]^2\ne0$ は $(2,2)$ 型だから $h^{2,2}\ge1$。さらに[補次数対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-duality)から両次元は等しい。
<!-- solution-end -->

<a id="ex-cyg1-06-b01"></a>
#### CYG1-06-B01 曲面の斜め和を導く
- Level: B

連結・コンパクトKähler曲面 $X$ で $K_X\simeq\mathcal O_X$、$h^{1,0}=a$、$h^{1,1}=c$ とする。全Hodge数表、全Betti数、Euler標数を出発点から導け。

<!-- solution-start -->
**詳細解答。** [正則体積形式と最高Hodge数](#prop-cyg1-06-top-hodge)より $h^{2,0}=1$。[共役・補次数対称性](#prop-cyg1-06-kahler-constraints)で $h^{0,2}=h^{0,0}=h^{2,2}=1$、$h^{0,1}=h^{1,2}=h^{2,1}=a$。よって行を $p$ とすると

$$
(h^{p,q})=\begin{pmatrix}1&a&1\\a&c&a\\1&a&1\end{pmatrix}.
$$

[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)の $p+q=k$ に沿って足すと $b_0=1,b_1=2a,b_2=c+2,b_3=2a,b_4=1$。従って $\chi=1-2a+(c+2)-2a+1=c+4-4a$。非零Kähler類から $c\ge1$。
<!-- solution-end -->

<a id="ex-cyg1-06-b02"></a>
#### CYG1-06-B02 K3とトーラスで偽の消滅を検出する
- Level: B

Fermat四次K3 $X$ と $T=E^2$ はともに標準束自明である。それぞれの $(h^{1,0},h^{1,1},h^{2,0})$ とEuler標数を調べ、「$K$ が自明なら $h^{1,0}=0$」という主張のどの推論が壊れるか述べよ。

<!-- solution-start -->
**詳細解答。** [K3の計算](../CYG1-05/index.md#prop-cyg1-05-hodge)と[二次元トーラスのHodge数](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)の結果は、それぞれ

$$
\begin{array}{c|cc}
& (h^{1,0},h^{1,1},h^{2,0}) & \chi_{\mathrm{top}}\\
X & (0,20,1) & 24\\
T & (2,4,1) & 0
\end{array}
$$

である。両者は連結コンパクトKählerで、標準束自明性から最高次数の数 $1$ を共有する。しかし $T$ には零でない正則1形式 $dz^1,dz^2$ が実在する。

[正則体積形式と最高Hodge数](#prop-cyg1-06-top-hodge)が制約するのは $H^0(K)$ だけなのに、その証明を $H^0(\Omega^1)$ の消滅へ移すのが誤りである。K3の $h^{1,0}=0$ には別の位相的入力 $b_1=0$ が必要だった。
<!-- solution-end -->

<a id="ex-cyg1-06-b03"></a>
#### CYG1-06-B03 三次元の交代和
- Level: B

連結・コンパクトKähler三次元多様体 $Y$ で $K_Y\simeq\mathcal O_Y$ とする。$a=h^{1,0},b=h^{2,0},c=h^{1,1},d=h^{2,1}$ を用い $b_1,b_2,b_3,b_4,b_5$ とEuler標数を求めよ。$a=b=0$ は仮定しないこと。

<!-- solution-start -->
**詳細解答。** [最高Hodge数](#prop-cyg1-06-top-hodge)と[二つの対称性](#prop-cyg1-06-kahler-constraints)より $h^{3,0}=h^{0,3}=1$、$h^{0,1}=a$、$h^{0,2}=b$、$h^{1,2}=d$。次数別の和は

$$
b_1=a+a=2a,\quad
b_2=b+c+b=2b+c,\quad
b_3=1+d+d+1=2+2d.
$$

補次数対称性で $b_4=b_2=2b+c$、$b_5=b_1=2a$。$b_0=b_6=1$ を入れ、$1-2a+(2b+c)-(2+2d)+(2b+c)-2a+1=2(c+2b-2a-d)$ と計算する。$a=b=0$ を勝手に置くと中間正則形式の自由度を消してしまう。
<!-- solution-end -->

<a id="ex-cyg1-06-b04"></a>
#### CYG1-06-B04 対称でも存在しない数表
- Level: B

複素次元2の連結コンパクトKähler多様体のHodge数として、$h^{0,0}=h^{2,2}=1$、ほかはすべて零という表が提案された。共役対称性・補次数対称性は満たすか。そのうえでKähler性と矛盾する理由を二通り述べよ。

<!-- solution-start -->
**詳細解答。** 添字の交換 $(p,q)\mapsto(q,p)$ と補次数写像 $(p,q)\mapsto(2-p,2-q)$ は、非零の二つの端点 $1$ をそのまま、または互いに対応させる。従って二つの対称性だけなら満たす。

しかし非零Kähler類 $[\omega]\in H^{1,1}$ が必要なので $h^{1,1}=0$ と矛盾する。別の証明では[Hard Lefschetz同型](../../HOD/HOD1-11/index.md#thm-hod1-11-hard-lefschetz)に $n=2,k=0$ を代入する。

$$
L^2:H^0\longrightarrow H^4,\qquad
L^2(1)=[\omega]^2\ne0.
$$

仮定の表では $H^{1,1}=0$ なので $[\omega]=0$ となり、その二乗も零となる。これは上の同型の単射性に反する。
<!-- solution-end -->

<a id="ex-cyg1-06-c01"></a>
#### CYG1-06-C01 条件付きの三次元Hodgeダイヤモンド復元
- Level: C

連結・コンパクトな複素次元3のKähler多様体 $Y$ で、$K_Y\simeq\mathcal O_Y$、さらに**別の議論により** $h^{1,0}=h^{2,0}=0$、$b_2=2$、$\chi_{\mathrm{top}}=-100$ が分かったとする。$h^{1,1}$、$h^{2,1}$、全Hodge数表、Betti数列を求めよ。これらの数値が実在する多様体で実現できることまで示したかも答えよ。

<!-- solution-start -->
**詳細解答。** [三次元の数値骨格](#prop-cyg1-06-threefold-skeleton)に $a=b=0$ を代入する。$b_2=2b+c=c=2$ より $h^{1,1}=c=2$。Euler式

$$
-100=2(c+2b-2a-d)=2(2-d)
$$

を2で割ると $-50=2-d$、従って $d=h^{2,1}=52$。行 $p$、列 $q$ として

$$
(h^{p,q})=
\begin{pmatrix}
1&0&0&1\\
0&2&52&0\\
0&52&2&0\\
1&0&0&1
\end{pmatrix}.
$$

斜め和は $(b_0,\ldots,b_6)=(1,0,2,106,2,0,1)$。交代和 $1+2-106+2+1=-100$ で検算できる。ここで得たのは**仮定からの必要な数値**であり、実在する $Y$ の構成も実現可能性の証明も行っていない。
<!-- solution-end -->

<a id="ex-cyg1-06-c02"></a>
#### CYG1-06-C02 偽証明のどこを止めるか
- Level: C

「$K_X$ 自明なら $h^{n,0}=1$。Hodge対称性とHard Lefschetzによって、すべての $0<p<n$ で $h^{p,0}=0$。従ってCalabi–YauのHodgeダイヤモンドの端以外の第一行は零」という議論を検査せよ。条件がどこで足りないか、反例とともに修正し、次に必要になる幾何的入力の種類を述べよ。

<!-- solution-start -->
**詳細解答。** [正則体積形式の命題](#prop-cyg1-06-top-hodge)は正しく、$h^{n,0}=1$ とする。共役対称性は $h^{p,0}=h^{0,p}$ と言うだけで、これらを零とはしない。[型別Hard Lefschetz](../../HOD/HOD1-11/index.md#prop-hod1-11-type-refinement)では $p+0=p<n$ のとき

$$
L^{n-p}:H^{p,0}\xrightarrow{\simeq}H^{n,n-p}
$$

であり、こちらも零空間への写像とは言っていない。例えば $X=E^3$ は $K_X$ 自明な連結コンパクトKähler多様体だが、[トーラスの計算](#prop-cyg1-06-torus-counterexample)で $h^{1,0}=h^{2,0}=3$。従って第二文の「対称性とLefschetzによって零」が破綻点である。正しい主張は $h^{n,0}=h^{0,n}=1$ と対称性・不等式まで。中間正則形式の消滅をさらに得るには、対象固有の位相的情報（例えば $b_1=0$ なら $h^{1,0}=0$）や、後続で扱うRicci平坦計量・十分強いホロノミー仮定とBochner型議論が追加で要る。
<!-- solution-end -->

## 8. 次章以降への接続

本章では、正則体積形式から $h^{n,0}=1$ を証明し、Hodge分解・二つの対称性・Hard Lefschetzの**適用範囲**を固定した。複素次元2・3の数値骨格に残る自由変数は、単なる「計算忘れ」ではなく別の幾何・位相入力が必要であることを表す。

次のCYG1-07では法束列と全Chern類からEuler標数を求める方法を取り出す。その後のquinticでは弱Lefschetz、Kähler類、Euler標数を組み合わせて残る変数を決める。強いホロノミー仮定が中間正則形式の消滅にどう関与するかは、Ricci平坦計量の存在を区別した後に検討する。
