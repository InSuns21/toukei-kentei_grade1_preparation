# KAH1-15 Kähler–Einstein・Ricci平坦への入口

<!-- definition-example-audit: strict -->

## 1. 計量の曲率を、計量自身と比べる

[Kähler形式](../KAH1-02/index.md#thm-kah1-02-local-closedness)は複素構造と正値計量を結び、[Ricci形式](../KAH1-11/index.md#thm-kah1-11-local-ricci)は計量の曲率を実閉 $(1,1)$ 形式として記述する。これまで二つの形式を別々に計算してきたが、同じ型の2形式なので比較できる。**Ricci形式が元のKähler形式の定数倍になったら、どんな幾何と位相的制約が現れるだろうか。**

本章では複素次元 $n\ge1$ の滑らかなKähler多様体 $(X,\omega)$ を扱う。コンパクト性を使う段階では、空でなく、境界がなく、コンパクトであることを明記する。正則座標では

$$
\omega=i\sum_{j,k=1}^{n}g_{j\bar k}\,dz^j\wedge d\bar z^k,\qquad
\rho=-i\partial\bar\partial\log\det(g_{j\bar k}).
$$

この規約における曲率縮約は $\rho=iR_{j\bar k}\,dz^j\wedge d\bar z^k$ であり、$R_{j\bar k}=-\partial_j\partial_{\bar k}\log\det g$ である。[曲率縮約の定義](../KAH1-10/index.md#def-kah1-10-ricci-contraction)と一致する。別の規約の $1/2$ や符号を混入させない。

平坦な $\mathbb C^n$ の標準計量では $g_{j\bar k}=\delta_{jk}$、したがって $\det g=1$、$\rho=-i\partial\bar\partial 0=0$ である。これはRicci形式がゼロとなる最小の例だが、曲率がゼロでない計量でもRicci形式だけはゼロになりうることを、一般の存在定理を学ぶ前に区別したい。

## 2. Kähler–Einstein条件とRicci平坦条件

Ricci形式とKähler形式の等号は、単なる実数の等号でなく、各点のあらゆる接方向での2形式の等号を意味する。既習の正則座標式を用いると、同じ基底 $i\,dz^j\wedge d\bar z^k$ に展開して係数を比較できる。

<a id="def-kah1-15-ke"></a>

<!-- formal-statement-start -->
> **定義（Kähler–Einstein計量）**  
> 複素次元 $n\ge1$ のKähler多様体 $(X,\omega)$ の計量が **Kähler–Einstein** であるとは、ある実定数 $\lambda$ が存在し、$X$ 全体で次が成り立つことをいう。

$$
\rho=\lambda\omega.
$$

> $\lambda$ をこの等式のEinstein定数とする。連結性を仮定しなくても、ここでは全成分で同一の定数を要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-15-ke -->
**定義の確認**（平坦模型）。 $\mathbb C^n$ の座標計量 $g_{j\bar k}=\delta_{jk}$ は正値で、対応する $\omega_0=i\sum_j dz^j\wedge d\bar z^j$ は係数一定だから $d\omega_0=0$。上の行列式計算により $\rho_0=0=0\cdot\omega_0$。正値性・閉性・定数倍の等式のすべてを確認したので、Einstein定数 $0$ のKähler–Einstein計量である。
<!-- definition-example-end -->

<a id="def-kah1-15-ricci-flat"></a>

<!-- formal-statement-start -->
> **定義（Ricci平坦Kähler計量）**  
> Kähler多様体 $(X,\omega)$ が **Ricci平坦** であるとは、計量のRicci形式が恒等的に零、すなわち次を満たすことをいう。

$$
\rho=0.
$$

> これはEinstein定数が $0$ のKähler–Einstein条件と同値であり、Riemann曲率テンソル全体が零となることとは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-15-ricci-flat -->
**定義の確認**（複素トーラス）。実階数 $2n$ の格子 $\Lambda\subset\mathbb C^n$ による商を $T=\mathbb C^n/\Lambda$ とする。標準計量の基本形式は

$$
\omega_0=i\sum_jdz^j\wedge d\bar z^j
$$

である。[平坦トーラスの曲率計算](../KAH1-10/index.md#prop-kah1-10-flat-torus)により、格子の平行移動でこの形式と正値性は変わらず、$T$ 上へ降りる。係数一定なので閉じた実 $(1,1)$ 形式である。

各商チャートでの計量行列は単位行列だから

$$
\det g=1,\qquad
\rho=-i\partial\bar\partial\log1=0.
$$

したがってRicci平坦の定義を直接満たす。この例は全曲率も零だが、Ricci平坦の定義が要求するのはRicci形式の消失だけである。
<!-- definition-example-end -->

行列で検算すると、$\rho=\lambda\omega$ は次の成分ごとの関係と同値になる。

$$
-\partial_j\partial_{\bar k}\log\det(g_{a\bar b})
=\lambda g_{j\bar k}
\quad(1\le j,k\le n).
$$

ここで左辺の偏微分は $\log\det g$ に、右辺は計量係数に作用する。単に行列式が一定ならRicci平坦になるが、逆向きに **任意の正則座標で行列式が一定**と断定してはいけない。座標変換で $\det g$ 自体は変わる一方、[Ricci形式の座標不変性](../KAH1-11/index.md#prop-kah1-11-transition)により $\rho$ は変わらない。

## 3. 等式からコホモロジーに移す

[Ricci形式と第一Chern類](../KAH1-12/index.md#thm-kah1-12-ricci-chern)は、既に次の等式を保証する。

$$
[\rho]=2\pi c_1(X)_{\mathbb R}
\quad\text{in }H^2_{\mathrm{dR}}(X;\mathbb R).
$$

ここで $c_1(X)_{\mathbb R}$ は反標準束 $K_X^{-1}$ の**整数係数**第一Chern類を実係数へ写したものを指す。$[\omega]$ は[Kähler類](../KAH1-13/index.md#def-kah1-13-class)である。二つの閉形式の等号をde Rham類に送ると、右辺の $\lambda$ は定数なので外へ出せる。この一歩は形式の等号から得る必要条件であって、逆向きに計量の存在を構成する操作ではない。

<a id="thm-kah1-15-cohomology"></a>

<!-- formal-statement-start -->
> **定理（Kähler–Einstein計量の第一Chern類制約）**  
> 複素次元 $n\ge1$ のKähler多様体 $(X,\omega)$ が定数 $\lambda\in\mathbb R$ に対して $\rho=\lambda\omega$ を満たすなら、次のde Rham類の等式が成り立つ。

$$
2\pi c_1(X)_{\mathbb R}=\lambda[\omega].
$$

> 特に $\rho=0$ なら $c_1(X)_{\mathbb R}=0$。さらに $X$ が空でないコンパクト・境界なしのKähler多様体なら、$c_1(X)_{\mathbb R}=0$ とKähler–Einstein条件から $\lambda=0$ が従う。
<!-- formal-statement-end -->

### 証明の見取り図

第一の主張は閉形式の類を取る操作そのもの。最後の主張では、コンパクトな正次元Kähler多様体の $[\omega]$ が零でないことを使う。**類が等しいだけで形式が等しいとは限らない**という向きの違いも確かめる。

<!-- proof-start -->
### 証明

[Ricci形式の閉性](../KAH1-11/index.md#thm-kah1-11-closed)と[Kähler形式の閉性](../KAH1-02/index.md#thm-kah1-02-local-closedness)により、$\rho,\omega$ はともに閉2形式である。したがってde Rham類を取れて、形式の等式 $\rho=\lambda\omega$ から

$$
[\rho]=[\lambda\omega]=\lambda[\omega].
$$

一方、[Ricci–Chern対応](../KAH1-12/index.md#thm-kah1-12-ricci-chern)の左辺を代入すれば $2\pi c_1(X)_{\mathbb R}=\lambda[\omega]$。

$\rho=0$ なら左辺が零なので $2\pi c_1(X)_{\mathbb R}=0$。$2\pi\ne0$ より $c_1(X)_{\mathbb R}=0$。

最後に $X$ がコンパクトで空でなく複素次元 $n\ge1$ なら、[コンパクトKähler多様体での非零性](../KAH1-13/index.md#thm-kah1-13-compact-nonzero)より $[\omega]\ne0$。$c_1(X)_{\mathbb R}=0$ の下で先ほどの等式は $\lambda[\omega]=0$ となるから、実ベクトル空間上の非零ベクトル $[\omega]$ を用いて $\lambda=0$ を得る。$\square$
<!-- proof-end -->

**量化の向きに注意。** 定理は「既に与えられた計量がEinsteinなら、そのKähler類は制約を満たす」と述べるだけである。$c_1(X)_{\mathbb R}=0$ のとき特定の任意のKähler計量がRicci平坦だとは述べていないし、そこから存在を自力で導いたわけでもない。

## 4. コンパクト性が与える数値的な判定

コンパクトなKähler多様体では、$\omega^n$ は正の体積形式で、その積分は正である。[Kähler類の非零性の証明](../KAH1-13/index.md#thm-kah1-13-compact-nonzero)と同じく、閉形式の類と積分を組み合わせて $\lambda$ を取り出せる。

<a id="prop-kah1-15-lambda"></a>

<!-- formal-statement-start -->
> **命題（Einstein定数の積分公式）**  
> $X$ を空でないコンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とする。Kähler–Einstein計量 $\omega$ が $\rho=\lambda\omega$ を満たすなら

$$
\lambda=
\frac{\displaystyle\int_X\rho\wedge\omega^{n-1}}
{\displaystyle\int_X\omega^n}
=
2\pi\,\frac{\displaystyle\langle c_1(X)_{\mathbb R}\smile[\omega]^{n-1},[X]\rangle}
{\displaystyle\langle[\omega]^n,[X]\rangle}.
$$

> $\smile$ はコホモロジーの積、$\langle\cdot,[X]\rangle$ は基本類への評価であり、後者は閉形式の楔積を積分する値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\rho=\lambda\omega$ の両辺に $\omega^{n-1}$ を楔積し、積分する。分母の正値性を確認して初めて割れる。de Rham類は積と積分に整合する。

<!-- proof-start -->
### 証明

$\rho=\lambda\omega$ に右から $\omega^{n-1}$ を楔積すると

$$
\rho\wedge\omega^{n-1}
=\lambda\omega\wedge\omega^{n-1}
=\lambda\omega^n.
$$

両辺を積分すると $\int_X\rho\wedge\omega^{n-1}=\lambda\int_X\omega^n$。正値Kähler計量により $\omega^n/n!$ は全点で正の体積形式であるから、$X$ は空でなくコンパクトなので $\int_X\omega^n>0$。ゆえに第一の比が得られる。

また $\rho$ と $\omega$ は閉形式なので、それらの楔積は類の積を代表する。[Ricci–Chern対応](../KAH1-12/index.md#thm-kah1-12-ricci-chern)を代入して

$$
\int_X\rho\wedge\omega^{n-1}
=\left\langle[\rho]\smile[\omega]^{n-1},[X]\right\rangle
=2\pi\left\langle c_1(X)_{\mathbb R}\smile[\omega]^{n-1},[X]\right\rangle.
$$

分母も同様に $[\omega]^n$ の評価である。$\square$
<!-- proof-end -->

この比は**所与のKähler類がもしKähler–Einstein計量を含むなら**その定数がどう定まるかを表す。例えば $c_1(X)_{\mathbb R}=0$ なら分子は零となり、候補となる $\lambda$ は零以外ありえない。

さらに $\lambda>0$ なら $c_1(X)_{\mathbb R}=(\lambda/2\pi)[\omega]$ 自身がKähler類となり、$\lambda<0$ なら $-c_1(X)_{\mathbb R}$ がKähler類となる。いずれも必要条件であって、その符号だけから与えた計量のEinstein性は得られない。

## 5. Fubini–Study計量を自分で確かめる

抽象的な条件が本当に成り立つ例として、$\mathbb{CP}^n$ の[Fubini–Study計量](../KAH1-06/index.md#def-kah1-06-local-fs)を用いる。$Z_0\ne0$ のチャートで $r^2=\sum_j|z^j|^2$、局所ポテンシャル $\varphi=\log(1+r^2)$ と置く。二度微分すると

$$
g_{j\bar k}
=\frac{\delta_{jk}}{1+r^2}
-\frac{\bar z^j z^k}{(1+r^2)^2}.
$$

このHermite行列の行列式は、$z=0$ では $1$ である。$z\ne0$ では ベクトル $(\overline{z^1},\ldots,\overline{z^n})$ の張る一次元方向とその直交補空間へ分け、前者の固有値が $(1+r^2)^{-2}$、後者の $n-1$ 個の固有値が $(1+r^2)^{-1}$ となる。よって

$$
\det g
=(1+r^2)^{-2}(1+r^2)^{-(n-1)}
=(1+r^2)^{-(n+1)}.
$$

この分解を確かめるには $u=(\overline{z^1},\ldots,\overline{z^n})^T$ と置く。$z^T u=r^2$ なので $gu=((1+r^2)^{-1}-r^2(1+r^2)^{-2})u=(1+r^2)^{-2}u$。また $z^Tv=0$ となる $v$ では階数1項が消えて $gv=(1+r^2)^{-1}v$。二種類の固有空間の次元はそれぞれ1と $n-1$ である。座標 $z=0$ においても同じ式に連続的に一致する。

<a id="thm-kah1-15-fs"></a>

<!-- formal-statement-start -->
> **定理（Fubini–Study計量のKähler–Einstein性）**  
> 複素射影空間 $\mathbb{CP}^n$、$n\ge1$ に、規格化

$$
\omega_{\mathrm{FS}}
=i\partial\bar\partial\log(1+\sum_j|z^j|^2)
$$

> で与えられる大域Fubini–Study形式を入れる。このとき

$$
\rho_{\mathrm{FS}}=(n+1)\omega_{\mathrm{FS}}.
$$

> 従ってEinstein定数は $n+1$ であり、$c_1(\mathbb{CP}^n)_{\mathbb R}=(n+1)[\omega_{\mathrm{FS}}/(2\pi)]$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

先に行列式を求めたので、Ricciの局所行列式公式へ代入する。Fubini–Study形式もRicci形式も大域的に定義済みであるため、各標準チャートでの一致が大域的な一致になる。

<!-- proof-start -->
### 証明

[Ricci形式の局所行列式公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)に、上で計算した行列式を代入する。

$$
\begin{aligned}
\rho_{\mathrm{FS}}
&=-i\partial\bar\partial\log\det g\\
&=-i\partial\bar\partial\bigl(-(n+1)\log(1+r^2)\bigr)\\
&=(n+1)i\partial\bar\partial\log(1+r^2)\\
&=(n+1)\omega_{\mathrm{FS}}.
\end{aligned}
$$

各標準チャートでは同じポテンシャルの形が使える。[Fubini–Study形式の貼り合わせ](../KAH1-07/index.md#thm-kah1-07-global-fs)および[Ricci形式の座標不変性](../KAH1-11/index.md#prop-kah1-11-transition)により、この局所等号が全体へ貼り合う。

最後に[第一Chern類制約](#thm-kah1-15-cohomology)を $\lambda=n+1$ に適用して $2\pi c_1=(n+1)[\omega_{\mathrm{FS}}]$、両辺を $2\pi$ で割る。$\square$
<!-- proof-end -->

$n=1$ では $\rho_{\mathrm{FS}}=2\omega_{\mathrm{FS}}$。一方、[面積の規格化](../KAH1-07/index.md#thm-kah1-07-area)は $\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$。したがって $\int_{\mathbb{CP}^1}\rho_{\mathrm{FS}}=4\pi$ となり、第一Chern数 $\int\rho/(2\pi)=2$ が得られる。**Einstein定数の2と面積の $2\pi$ は別の量**である。

## 6. 計量のスケールを変えてもRicci形式は変わらない

$a>0$ を**定数**とし、$\omega'=a\omega$ とする。対応する局所係数は $g'_{j\bar k}=a g_{j\bar k}$ だから、複素次元 $n$ の行列式に関して

$$
\det g'=a^n\det g,\qquad
\log\det g'=n\log a+\log\det g.
$$

$a$ は座標に依存しないため $\partial\bar\partial(n\log a)=0$。ここでも「関数倍」でなく**定数倍**という仮定が決定的になる。

<a id="prop-kah1-15-scaling"></a>

<!-- formal-statement-start -->
> **命題（定数倍によるEinstein定数の変化）**  
> $(X,\omega)$ を複素次元 $n\ge1$ のKähler多様体とし、$a>0$ を定数とする。このとき $\omega'=a\omega$ はKähler形式であり

$$
\rho_{\omega'}=\rho_\omega.
$$

> もし $\rho_\omega=\lambda\omega$ なら、$\omega'$ はEinstein定数 $\lambda/a$ のKähler–Einstein計量となる。Ricci平坦性は正の定数倍で保存される。
<!-- formal-statement-end -->

### 証明の見取り図

行列式の定数因子が対数微分で消えるのが核心。Einstein定数は元の $\omega=\omega'/a$ を代入して求める。

<!-- proof-start -->
### 証明

$a>0$ だから $ag$ は正値である。また $d(a\omega)=a\,d\omega=0$ であり、実性と $(1,1)$ 型も保つ。従ってKähler形式。前段の行列式計算を[局所Ricci公式](../KAH1-11/index.md#thm-kah1-11-local-ricci)へ代入すると

$$
\begin{aligned}
\rho_{\omega'}
&=-i\partial\bar\partial\log\det(ag)\\
&=-i\partial\bar\partial(n\log a+\log\det g)\\
&=-i\partial\bar\partial\log\det g=\rho_\omega.
\end{aligned}
$$

したがって元がKähler–Einsteinなら

$$
\rho_{\omega'}=\rho_\omega=\lambda\omega
=\frac{\lambda}{a}\omega',
$$

なのでEinstein定数は $\lambda/a$。$\lambda=0$ なら引き続き零である。$\square$
<!-- proof-end -->

例えば $a\omega_{\mathrm{FS}}$ はEinstein定数 $(n+1)/a$ を持つ。コホモロジー条件も $\frac{n+1}{a}[a\omega_{\mathrm{FS}}]=(n+1)[\omega_{\mathrm{FS}}]$ と一致する。

## 7. Ricci平坦という結論から、何が言えて何は言えないか

標準束 $K_X=\det(T^{*1,0}X)$ と反標準束 $K_X^{-1}$ は[既習の定義](../KAH1-12/index.md#def-kah1-12-canonical)である。Ricci形式は反標準束の曲率の実形式なので、Ricci平坦ならその実係数第一Chern類が零になる。しかし「実係数で零」と「整数係数で零」と「正則線束が自明」は別々の性質である。

まず整数係数類に捩れ（零でない有限位数元）があると、それは実係数への写像で消える。したがって $c_1(X)_{\mathbb R}=0$ から、$c_1(X)\in H^2(X;\mathbb Z)$ の零は一般には言えない。さらに $c_1(K_X)=0$ が整数係数で成り立っても、これは線束の位相的条件であって、非零の**大域正則**切断が存在して $K_X\simeq\mathcal O_X$ になるという解析的条件の証明ではない。

「Ricci平坦なら標準束が正則自明」との飛躍も避ける。$\rho=0$ は標準束の誘導接続の曲率零を表すが、平坦接続にも閉路に沿った非自明な平行移動（モノドロミー）がありうる。全域で非零の平行正則枠があることとは区別する。この問題は次章のホロノミーでもう一段詳しく扱う。

もう一つの重要な境界は、**必要な類の等式は計量を作らない**ことである。次は後続のYAU1で学ぶ結果の予告であり、本章の既証明結果としては使わない。

> **後続で扱う存在問題。** コンパクトKähler多様体で $c_1(X)_{\mathbb R}=0$ のとき、各Kähler類にRicci平坦Kähler計量が存在する、という一般結果はCalabi予想の解決に属する。必要条件だけではその存在を導けず、複素Monge–Ampère方程式などの解析が必要である。

一般の存在定理を仮定しない範囲でも、元々与えられた平坦トーラスや射影空間では条件を直接計算できる。次章では接続の平行移動を調べ、Ricci形式の消失と制限ホロノミーとの関係へ進む。

## 8. 演習：必要条件・具体計算・逆の誤用

### Level A

<a id="ex-kah1-15-a01"></a>
#### KAH1-15-A01 対角計量のRicci形式
- Level: A

$\mathbb C^2$ の標準座標に $g_{j\bar k}=\operatorname{diag}(2,3)$ を与える。Kähler条件、Ricci形式、Einstein定数を調べよ。

<!-- solution-start -->
**詳細解答。** 対角成分 $2,3$ は正なので、任意の非零 $v=(v^1,v^2)$ に対し $2|v^1|^2+3|v^2|^2>0$。$\omega=i(2dz^1\wedge d\bar z^1+3dz^2\wedge d\bar z^2)$ は実 $(1,1)$ 形式で、係数一定なので $d\omega=0$。従ってKähler形式である。$\det g=6$ より

$$
\rho=-i\partial\bar\partial\log6=0.
$$

$\omega$ は正値なので非零である。$\rho=\lambda\omega$ は $\lambda=0$ の場合に限り成立する。よってRicci平坦でEinstein定数は零。
<!-- solution-end -->

<a id="ex-kah1-15-a02"></a>
#### KAH1-15-A02 射影直線の定数
- Level: A

$\mathbb{CP}^1$ の局所係数 $g_{z\bar z}=(1+|z|^2)^{-2}$ から $\rho$ を直接求め、$\int_{\mathbb{CP}^1}\rho/(2\pi)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\log\det g=-2\log(1+z\bar z)$ なので、まず

$$
\partial_z\log(1+z\bar z)=\frac{\bar z}{1+|z|^2},
\quad
\partial_{\bar z}\frac{\bar z}{1+|z|^2}
=\frac{1}{(1+|z|^2)^2}.
$$

よって

$$
\rho=-i\partial\bar\partial(-2\log(1+|z|^2))
=\frac{2i\,dz\wedge d\bar z}{(1+|z|^2)^2}
=2\omega_{\mathrm{FS}}.
$$

[射影直線の面積積分](../KAH1-07/index.md#thm-kah1-07-area)を用いて $\int\rho/(2\pi)=2(2\pi)/(2\pi)=2$。
<!-- solution-end -->

<a id="ex-kah1-15-a03"></a>
#### KAH1-15-A03 定数倍で何が変化するか
- Level: A

$\mathbb{CP}^2$ で $\omega'=3\omega_{\mathrm{FS}}$ とする。Ricci形式、Einstein定数、$[\rho']$ を $[\omega_{\mathrm{FS}}]$ で表せ。

<!-- solution-start -->
**詳細解答。** [射影空間の計算](#thm-kah1-15-fs)より $\rho_{\mathrm{FS}}=3\omega_{\mathrm{FS}}$。定数倍の[不変性](#prop-kah1-15-scaling)を $a=3$ に適用すると

$$
\rho'=\rho_{\mathrm{FS}}=3\omega_{\mathrm{FS}}
=1\cdot(3\omega_{\mathrm{FS}})=\omega'.
$$

ゆえにEinstein定数は $1$、また $[\rho']=3[\omega_{\mathrm{FS}}]$。Einstein定数を $3$ のままと誤らない。
<!-- solution-end -->

<a id="ex-kah1-15-a04"></a>
#### KAH1-15-A04 零の意味を分ける
- Level: A

次の推論のうち、本章の結果だけで正しいものを理由付きで選べ。(i) $\rho=0\Rightarrow c_1(X)_{\mathbb R}=0$。(ii) $c_1(X)_{\mathbb R}=0\Rightarrow$ 手元の任意のKähler計量の $\rho=0$。(iii) $c_1(X)_{\mathbb R}=0\Rightarrow c_1(X)=0$（整数係数）。(iv) $\rho=0\Rightarrow K_X$ の大域非零正則枠が存在する。

<!-- solution-start -->
**詳細解答。** (i) のみが無条件に正しい。[Ricci–Chern対応](../KAH1-12/index.md#thm-kah1-12-ricci-chern)から $2\pi c_1(X)_{\mathbb R}=[\rho]=0$。

(ii) は類の消滅を**与えた代表の消滅**と取り違えている。局所で計量を変えると $\rho$ の代表は変わりうる。(iii) は整数係数から実係数への写像で捩れが失われうるため、逆推論ができない。(iv) は曲率零を平坦接続の大域平行枠の存在と取り違えている。閉路に沿う平行移動や正則線束としての大域的な貼り合わせを別に確認する必要がある。
<!-- solution-end -->

### Level B

<a id="ex-kah1-15-b01"></a>
#### KAH1-15-B01 Einstein定数の積分による再導出
- Level: B

$X$ を空でないコンパクト・境界なしの複素次元 $2$ のKähler多様体とし、$\rho=\lambda\omega$ とする。$\lambda$ の積分表示を求め、$c_1(X)_{\mathbb R}=0$ なら $\lambda=0$ を積分だけで示せ。

<!-- solution-start -->
**詳細解答。** 複素次元が $2$ なので $\rho\wedge\omega$ は最高次の実4形式。仮定に $\omega$ を楔積すると

$$
\rho\wedge\omega=\lambda\omega^2,\qquad
\int_X\rho\wedge\omega=\lambda\int_X\omega^2.
$$

正値Kähler形式の $\omega^2/2$ は正の体積形式であり、空でないコンパクト性から分母は正。従って

$$
\lambda=\frac{\int_X\rho\wedge\omega}{\int_X\omega^2}
=2\pi\frac{\langle c_1(X)_{\mathbb R}\smile[\omega],[X]\rangle}
{\langle[\omega]^2,[X]\rangle}.
$$

$c_1(X)_{\mathbb R}=0$ なら分子が零となり $\lambda=0$。この計算はRicci平坦計量の**存在**を示していない。
<!-- solution-end -->

<a id="ex-kah1-15-b02"></a>
#### KAH1-15-B02 非定数係数ならRicci形式も変わる
- Level: B

$\mathbb C$ 上で $\omega=e^{|z|^2}i\,dz\wedge d\bar z$ とする。Kählerであることを確かめ、Ricci形式を求めよ。$\rho=\lambda\omega$ を満たす定数 $\lambda$ は存在するか。

<!-- solution-start -->
**詳細解答。** 係数 $e^{|z|^2}$ は正である。複素次元1では3形式が零なので、2形式 $\omega$ に対して $d\omega=0$。また実 $(1,1)$ 形式であり、Kählerである。行列式は一次元行列の係数そのものなので

$$
\log\det g=\log(e^{z\bar z})=z\bar z,\qquad
\partial_z(z\bar z)=\bar z,\qquad
\partial_{\bar z}\bar z=1.
$$

ゆえに $\rho=-i\,dz\wedge d\bar z$。等式 $\rho=\lambda\omega$ が成り立つなら各点で $\lambda e^{|z|^2}=-1$、すなわち $\lambda=-e^{-|z|^2}$ となるが、これは定数でない。Kähler–Einsteinではない。正の**定数倍**と非定数倍を混同しない。
<!-- solution-end -->

<a id="ex-kah1-15-b03"></a>
#### KAH1-15-B03 負のEinstein定数の局所例
- Level: B

単位円板 $D=\{z\in\mathbb C:|z|<1\}$ 上で $\omega_D=i\,dz\wedge d\bar z/(1-|z|^2)^2$ とする。Kähler–Einstein性と定数 $\lambda$ を局所公式で確かめよ。さらに $a\omega_D$、$a>0$ の定数を求めよ。

<!-- solution-start -->
**詳細解答。** 分母は $D$ で正なので正値の実 $(1,1)$ 形式。複素次元1より閉形式でKählerである。係数の対数は $-2\log(1-z\bar z)$。偏微分を順に計算すると

$$
\partial_z\log(1-z\bar z)=-\frac{\bar z}{1-|z|^2},\qquad
\partial_{\bar z}\left(-\frac{\bar z}{1-|z|^2}\right)
=-\frac{1}{(1-|z|^2)^2}.
$$

したがって

$$
\begin{aligned}
\rho_D
&=-i\partial\bar\partial[-2\log(1-|z|^2)]\\
&=-\frac{2i\,dz\wedge d\bar z}{(1-|z|^2)^2}
=-2\omega_D.
\end{aligned}
$$

Einstein定数は $-2$。[定数倍公式](#prop-kah1-15-scaling)により $\rho_{a\omega_D}=\rho_D=(-2/a)(a\omega_D)$、従って定数は $-2/a$。
<!-- solution-end -->

### Level C

<a id="ex-kah1-15-c01"></a>
#### KAH1-15-C01 積多様体における類の不整合
- Level: C

$X=\mathbb{CP}^1\times T$、$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、射影 $p_1,p_2$ を使って $\alpha=p_1^*\omega_{\mathrm{FS}}$、$\beta=p_2^*(i\,dz\wedge d\bar z)$ と置く。$a,b>0$ に対し $\omega_{a,b}=a\alpha+b\beta$ を考える。

1. $\omega_{a,b}$ がKähler形式であることを示せ。
2. 積計量のRicci形式が $\rho_{a,b}=2\alpha$ となることを局所行列式から証明せよ。
3. 定数 $\lambda$ が $\rho_{a,b}=\lambda\omega_{a,b}$ を満たせないことを、二つの因子曲線へ制限して示せ。
4. $[\rho_{a,b}]=2\pi c_1(X)_{\mathbb R}$ との整合を確認し、「正値なKähler形式を持つ」と「その形式がKähler–Einsteinである」の相違を説明せよ。

<!-- solution-start -->
**詳細解答。** 第1問。積の正則局所座標を $(z,w)$ とする。$\alpha,\beta$ はそれぞれの因子から引き戻された実閉 $(1,1)$ 形式。接ベクトル $v=(v_z,v_w)\ne0$ に対して

$$
-i\omega_{a,b}(v,\bar v)
=a\frac{|v_z|^2}{(1+|z|^2)^2}+b|v_w|^2>0.
$$

$a,b>0$ と $v$ の少なくとも一成分が非零であることを使った。従ってKähler形式である。

第2問。局所計量行列とその行列式は

$$
(g_{j\bar k})=
\begin{pmatrix}
a(1+|z|^2)^{-2}&0\\
0&b
\end{pmatrix},
\qquad
\det g=ab(1+|z|^2)^{-2}.
$$

従って

$$
\begin{aligned}
\rho_{a,b}
&=-i\partial\bar\partial
\{\log(ab)-2\log(1+|z|^2)\}\\
&=2i\partial\bar\partial\log(1+|z|^2)
=2\alpha.
\end{aligned}
$$

最後の等号は $\alpha$ の局所ポテンシャル式から従い、両辺は大域形式なのでこの計算を各チャートで照合できる。

第3問。$C_1=\mathbb{CP}^1\times\{t_0\}$ に制限すると $\beta=0$ であり、$\alpha$ は非零なので

$$
2\alpha=\lambda a\alpha
\quad\Longrightarrow\quad \lambda a=2.
$$

一方、$C_2=\{p_0\}\times T$ に制限すると $\alpha=0$ であり、$\beta$ は非零なので

$$
0=\lambda b\beta
\quad\Longrightarrow\quad \lambda b=0
\quad\Longrightarrow\quad \lambda=0
$$

となる。最後は $b>0$ を使った。すると $\lambda a=2$ に矛盾するから、どの $a,b>0$ に対してもこの積計量はEinsteinではない。

第4問。[Ricci–Chern対応](../KAH1-12/index.md#thm-kah1-12-ricci-chern)を既に構成した計量に適用すると $2\pi c_1(X)_{\mathbb R}=[2\alpha]$。$C_1$ 上の周期は

$$
\int_{C_1}\frac{\rho}{2\pi}
=\frac{2}{2\pi}\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2,
$$

$C_2$ 上では $\rho$ が零なので周期 $0$。これは第3問の相異なる因子方向の比率が一致しないことと整合する。$X$ は確かに正値Kähler形式を持つが、今回の積形式に対して $\rho$ がその定数倍になることはない。なおこの必要条件の計算だけで、**$X$ 上のあらゆる別のKähler計量**について同じ結論を無条件に述べたわけではない。
<!-- solution-end -->

## 9. 次章への橋

Kähler–Einstein計量は $\rho=\lambda\omega$ を満たし、特にRicci平坦なら実係数第一Chern類は零となる。$\mathbb{CP}^n$ や円板では定数を局所的に計算できた。しかし第一Chern類の制約は**存在定理の代用品ではない**。

次章KAH1-16では、[Kähler条件と平行な複素構造](../KAH1-03/index.md#thm-kah1-03-main-equivalence)を出発点として、平行移動が複素構造を保存することを調べる。曲率が零という局所情報と、閉路に沿う平行移動という大域情報の差が焦点になる。
