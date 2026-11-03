# CYG1-01 標準束、Chern類、ホロノミーは同じ定義か

<!-- definition-example-audit: strict -->

## 1. 「Calabi–Yau」と言う前に、何を仮定したのか

これまでに[標準束と第一Chern類](../../KAH/KAH1-12/index.md#def-kah1-12-canonical)、[Ricci形式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)、[全ホロノミーと制限ホロノミー](../../KAH/KAH1-16/index.md#def-kah1-16-restricted)をそれぞれ学んだ。一見すると「どれも曲率や体積を測る量だから、零になる条件は同じ」と考えたくなる。しかし、**束の正則な貼り合わせ、位相的な障害、ある計量の曲率、閉路の平行移動**は異なる情報である。

例えば平坦な複素トーラスでは、正則体積形式もRicci平坦計量もあるが、ホロノミーは $SU(n)$ 全体ではなく自明群になる。他方、局所平坦な計量であっても、非可縮な閉路を一周すると正則体積方向が反転する商空間がある。

この講義では条件を一度同じ表へ載せ、「その計量が」「ある計量が」「全閉路が」という量化を揃える。続く講義で具体的な超曲面やChern数を計算するための基準になる。

以下、断りのない限り $X$ は **連結、滑らか、コンパクト、複素次元 $n\ge1$ のKähler多様体**、$g$ はその上の**指定された**Kähler計量とする。$K_X=\bigwedge^nT^{*1,0}X$、$c_1(X):=c_1(T^{1,0}X)=-c_1(K_X)$ とする。後者の符号は[標準束の第一Chern類](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)に従う。正則局所座標 $z^1,\ldots,z^n$ で $G=(g_{j\bar k})$ は $g$ のHermite計量係数行列とし、以下の $j,k$ は $1,\ldots,n$ を動き、繰り返した添字について総和を取る。$\partial,\bar\partial$ はそれぞれ正則・反正則座標方向の型別微分である。基本形式・Ricci形式の規格化は

$$
\omega=i g_{j\bar k}\,dz^j\wedge d\bar z^k,\qquad
\rho=-i\partial\bar\partial\log\det(g_{j\bar k}),\qquad
[\rho/(2\pi)]=c_1(X)_{\mathbb R}
$$

で統一する。添字 $\mathbb Z$ は整係数類、$\mathbb R$ は係数変更後の実係数類を表す。

## 2. 同じ名前で呼ばれがちな六つの条件

正則線束 $K_X$ が **正則に自明**とは、$X\times\mathbb C$ と正則線束として同型なことをいう。この自明正則線束を $\mathcal O_X$ と書く。これは滑らかな複素線束として自明という主張より強い。[第一Chern類の整係数構成](../../KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)は位相的な貼り合わせを記録するが、正則な枠の存在を単独では保証しない。

また、[全ホロノミーの定義](../../KAH/KAH1-16/index.md#def-kah1-16-holonomy)ではすべての閉路を使う。一方、[制限ホロノミー](../../KAH/KAH1-16/index.md#def-kah1-16-restricted)では縮められる閉路だけを使う。$SU(n)$ は正規直交複素基底でユニタリかつ複素行列式が $1$ である行列の群であり、群が $SU(n)$ に**含まれる**ことと、群が **$SU(n)$ そのもの**であることは違う。

<a id="def-cyg1-01-criteria"></a>

<!-- formal-statement-start -->
> **定義（Calabi–Yau条件を比較するための記号）**  
> 上記のコンパクト連結Kähler多様体 $X$ と指定したKähler計量 $g$ に対し、次の記号を使う。
>
> - (K)：$K_X\simeq\mathcal O_X$（正則標準束が自明）。
> - (I)：$c_1(X)_{\mathbb Z}=0$（整係数の第一Chern類が零）。
> - (R)：$c_1(X)_{\mathbb R}=0$（実係数の第一Chern類が零）。
> - (F$_g$)：$\rho(g)=0$（**この計量**がRicci平坦）。
> - (S$^0_g$)：$\operatorname{Hol}^0(g)\subseteq SU(n)$（制限ホロノミーの包含）。
> - (S$_g$)：$\operatorname{Hol}(g)\subseteq SU(n)$（全ホロノミーの包含）。
>
> 正則自明型、実Chern型、Ricci平坦型、特殊ホロノミー型などの「Calabi–Yau」の用法は、これらのどれを指すか明記して区別する。特に (F$_g$) と「**ある**Ricci平坦Kähler計量が存在する」は別の命題である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cyg1-01-criteria -->
**定義の確認**（平坦な複素トーラス）。格子 $\Lambda\subset\mathbb C^n$ による商 $T=\mathbb C^n/\Lambda$ を考える。格子平行移動の微分は単位行列なので、

$$
\Omega=dz^1\wedge\cdots\wedge dz^n
$$

は非消滅の大域正則体積形式へ降り、(K) が成立する。正則座標枠 $dz^1,\ldots,dz^n$ に関する係数 $g_{j\bar k}=\delta_{jk}$ の平坦計量を選ぶと、その行列 $G=I_n$ も格子平行移動で不変だから降りる。この座標表示で $\det G=1$ をRicci形式へ代入して

$$
\rho=-i\partial\bar\partial\log1=0
$$

より (F$_g$) も成立する。閉路を被覆へ持ち上げたときの平行移動と、終点を格子平行移動で同一視する微分は、いずれも単位行列なので

$$
\operatorname{Hol}(g)=\operatorname{Hol}^0(g)=\{I_n\}.
$$

従って (S$_g$) も (S$^0_g$) も成立する。ただし $n\ge2$ では $SU(n)$ は非自明なので、**包含は真であって等号ではない**。(I)、(R) は次節の含意から確かめる。
<!-- definition-example-end -->

## 3. 正則自明性から二種類のChern類へ

まず計量を一切選ばずに成立する部分を確かめる。ここで群の元 $a$ が **torsion（有限位数元）** であるとは、ある正整数 $m$ に対し $ma=0$ となることをいう。例えば $\mathbb Z/2\mathbb Z$ の $[1]$ は $2[1]=0$ を満たす。整数で測ると残るこの情報が、実係数への変更で失われるかを調べる。

<a id="prop-cyg1-01-chern-chain"></a>

<!-- formal-statement-start -->
> **命題（標準束からChern類への含意）**  
> $X$ を滑らかな複素多様体とし、$K_X$ を正則標準線束とする。(K) が成立すれば (I) が成立し、(I) が成立すれば (R) が成立する。

$$
(\mathrm K)\ \Longrightarrow\ (\mathrm I)\ \Longrightarrow\ (\mathrm R).
$$

> さらに $X$ が有限CW複体のホモトピー型をもつとき、(R) は $c_1(X)_{\mathbb Z}$ が有限位数の元（torsion）であることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

大域正則枠があれば遷移関数をすべて $1$ にできる。整係数から実係数へ写すときには有限位数の情報が消える。後半は有限生成Abel群を自由部分と有限位数部分に分ければよい。

<!-- proof-start -->
### 証明

(K) の同型 $K_X\simeq\mathcal O_X$ から、零を持たない大域正則枠 $s$ が得られる。この同じ枠を各局所開集合へ制限すると遷移関数は $t_{\alpha\beta}=1$ である。[整係数第一Chern類の構成](../../KAH/KAH1-12/index.md#def-kah1-12-integral-first-chern)で対数を $\ell_{\alpha\beta}=0$ と取れば、三重交差上の整数コサイクルは

$$
m_{\alpha\beta\gamma}
=\frac{0+0+0}{2\pi i}=0.
$$

従って $c_1(K_X)_{\mathbb Z}=0$。線束の双対に関する[第一Chern類の符号](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)から $c_1(X)_{\mathbb Z}=-c_1(K_X)_{\mathbb Z}=0$ である。

係数変更 $H^2(X;\mathbb Z)\to H^2(X;\mathbb R)$ は群準同型だから、零は零に写る。これで (I)$\Rightarrow$(R) を得た。

有限CW型では $H^2(X;\mathbb Z)$ は有限生成Abel群であり、ある $r\ge0$ と有限群 $T$ により $\mathbb Z^r\oplus T$ と書ける。実係数への係数変更の核はちょうど $T$ である。実際、有限位数元 $t$ が $mt=0$ を満たせば、実ベクトル空間では $m\,\iota(t)=0$ より $\iota(t)=0$。自由部分は実係数へ単射になるので、それ以外は核に入らない。従って (R) と「整係数類がtorsion」は同値である。$\square$
<!-- proof-end -->

**ここで逆を作らない。** (R) から (I) への逆は、整数の位数情報が失われるため一般に誤りである。例えば $\mathbb Z/2\mathbb Z$ の非零元 $[1]$ は $2[1]=0$ だが、実係数へ移すと零になる。これは位相群の最小模型であって、多様体を構成したわけではない。幾何例のEnriques曲面では、非自明で2乗が自明な標準束が現れる（存在とその位相コホモロジーの計算は本章では外部の事実として使う）。従って実係数で $c_1=0$ という書き方だけでは、正則体積形式があるとは結論できない。

なお一般の正則線束では、$c_1(L)_{\mathbb Z}=0$ でも $L$ が正則自明とは限らない。第一Chern類は「**位相的に**自明な線束に正則枠があるか」までは判定しない。標準束 $K_X$ 固有の追加定理についても、この一般線束の注意だけで結論を出さない。

## 4. Ricci形式は類ではなく、選んだ計量の曲率

[Ricci形式と第一Chern形式の同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)は $[\rho(g)/(2\pi)]=c_1(X)_{\mathbb R}$ と述べる。左辺は **コホモロジー類**であり、$\rho(g)$ という2形式そのものではない。類が零でも指定した代表形式は零とは限らない。

<a id="prop-cyg1-01-ricci-holonomy"></a>

<!-- formal-statement-start -->
> **命題（指定したKähler計量でのRicci条件と制限ホロノミー）**  
> 複素次元 $n\ge1$ の連結Kähler多様体 $(X,g)$ では

$$
(\mathrm F_g)\ \Longleftrightarrow\ (\mathrm S_g^0),
\qquad (\mathrm F_g)\ \Longrightarrow\ (\mathrm R).
$$

> 逆に (R) から**指定した** $g$ の (F$_g$) は一般には従わない。
<!-- formal-statement-end -->

### 証明の見取り図

前半は既習の[Ricci平坦性と制限ホロノミー](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)を、該当する $(X,g)$ に適用する。次に実Chern類をRicci形式で表示する。逆向きの失敗は楕円曲線上の非定数Kähler計量を直接計算する。

<!-- proof-start -->
### 証明

$g$ はKähler計量なので、[Kählerホロノミーのユニタリ性](../../KAH/KAH1-16/index.md#thm-kah1-16-unitary)の適用条件を満たす。[Ricci平坦性と制限ホロノミー](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)によれば $\rho(g)=0$ と $\operatorname{Hol}^0(g)\subseteq SU(n)$ が同値である。さらに[Ricci形式と反標準束の第一Chern形式](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)の同定で

$$
c_1(X)_{\mathbb R}=[\rho(g)/(2\pi)]=[0]=0
$$

だから (F$_g$)$\Rightarrow$(R) が従う。最後の逆向きが偽であることは直後の直接計算で確かめる。$\square$
<!-- proof-end -->

<a id="ex-cyg1-01-nonflat-metric"></a>

**直接反例：楕円曲線上で曲率を変える。** $E=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$、$0<\varepsilon<1$ として、格子周期的な計量係数を

$$
g_{z\bar z}=q(x):=1+\varepsilon\cos(2\pi x)>0,
\qquad \omega=i q(x)\,dz\wedge d\bar z
$$

とする。複素次元1では実3形式が零だから $d\omega=0$、ゆえにこれはKähler計量である。$E$ の $dz$ は大域正則枠なので (K)、従って (R) が成立する。一方、$z=x+iy$ に対するWirtinger微分は

$$
\partial_z=\frac12(\partial_x-i\partial_y),\qquad
\partial_{\bar z}=\frac12(\partial_x+i\partial_y).
$$

$q$ は $x$ のみの関数なので、$\partial_{\bar z}\log q=\tfrac12(\log q)'(x)$、さらに $\partial_z\partial_{\bar z}\log q=\tfrac14(\log q)''(x)$ となる。ここでプライムは実変数 $x$ に関する常微分であり、$\partial_z,\partial_{\bar z}$ は $y$ を含む複素座標方向の偏微分である。$x=0$ では

$$
q(0)=1+\varepsilon,\quad q'(0)=0,\quad
(\log q)''(0)=\frac{q''(0)}{q(0)}
=-\frac{4\pi^2\varepsilon}{1+\varepsilon}.
$$

ゆえに

$$
\rho(g)|_{x=0}
=-\frac{i}{4}(\log q)''(0)\,dz\wedge d\bar z
=\frac{i\pi^2\varepsilon}{1+\varepsilon}\,dz\wedge d\bar z\ne0.
$$

この $g$ は (F$_g$) を満たさない。$c_1$ の零は「全計量のRicci形式が零」の意味ではない。

**存在量化について。** コンパクトKähler多様体の (R) から「各Kähler類内にRicci平坦計量が**存在する**」を導くのはYauの定理という深い外部入力である。ここでは完全証明しない。次章以降の計量比較では、指定した $g$ と存在する別の $g'$ を混同しない。

## 5. 全ホロノミーには、大域的な体積形式が要る

(S$^0_g$) は縮まる閉路だけの話である。閉路の平行移動が複素体積を保つためには、体積方向の平行な**大域枠**が役に立つ。標準束が正則自明であることとRicci平坦性の組合せが、まさにこれを与える。

<a id="thm-cyg1-01-parallel-volume"></a>

<!-- formal-statement-start -->
> **定理（平行正則体積形式と特殊ユニタリ全ホロノミー）**  
> $X$ を連結・コンパクトな複素次元 $n\ge1$ のKähler多様体、$g$ をRicci平坦Kähler計量とする。$K_X\simeq\mathcal O_X$ なら、消えない大域正則 $n$ 形式 $\Omega$ は $g$ の誘導接続に関して平行であり、

$$
\operatorname{Hol}(g)\subseteq SU(n)
$$

> が成立する。この結論は一般に $\operatorname{Hol}(g)=SU(n)$ を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

正則体積形式の計量に関するノルムを局所式で求める。Ricci形式が零ならその対数は実値の多重調和関数となり、コンパクト性から定数になる。すると標準束上のChern接続も $\Omega$ を動かさず、すべての閉路の複素行列式が $1$ となる。

<!-- proof-start -->
### 証明

(K) から大域で零を持たない正則 $n$ 形式 $\Omega$ を取る。座標 $z^1,\ldots,z^n$ 上で $\Omega=f(z)\,dz^1\wedge\cdots\wedge dz^n$、$f$ は零を持たない正則関数と書ける。$g$ の行列を $G=(g_{j\bar k})$ とする。[誘導Hermite計量の定義](../../CM/CM2-09/index.md#def-cm2-09-induced-metrics)をこの正則余接枠に適用すると、双対枠の計量行列は $(G^{-1})^{\mathsf T}$ である。最高外冪のノルム二乗はその行列式だから、局所枠 $\kappa=dz^1\wedge\cdots\wedge dz^n$ に対して

$$
\|\kappa\|_g^2=\det((G^{-1})^{\mathsf T})
=\frac1{\det G}.
$$

係数 $f$ を掛けた $\Omega=f\kappa$ のノルムは $|f|^2$ 倍になる。よって

$$
\|\Omega\|_g^2=\frac{|f|^2}{\det G},\qquad
u:=\log\|\Omega\|_g^2=\log|f|^2-\log\det G.
$$

この $u$ は枠の取り方によらず大域的に定義された滑らかな**実関数**である。$f\ne0$ の近傍では正則対数 $\log f$ を取れるので、$\partial\bar\partial\log|f|^2=0$。従って

$$
\partial\bar\partial u
=-\partial\bar\partial\log\det G
=-i\rho(g)=0.
$$

最後の符号は $\rho=-i\partial\bar\partial\log\det G$ から $\partial\bar\partial\log\det G=i\rho$、従って $-\partial\bar\partial\log\det G=-i\rho$ として得る。ここでは零性だけが必要である。Kähler計量のLaplacianは局所的に $g^{j\bar k}\partial_j\partial_{\bar k}u$ の非零定数倍なので、$u$ は調和関数である。

実Laplacianを $\Delta u=\operatorname{div}(\nabla u)$ と書く。実体積形式 $dV_g$ とベクトル場 $V=u\nabla u$ に対し、$\operatorname{div}V\,dV_g=d(\iota_VdV_g)$ である。[一般Stokes定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)をこの $(2n-1)$ 形式に、境界のないコンパクトな実 $2n$ 次元多様体 $X$ 上で適用すると

$$
0=\int_X\operatorname{div}(u\nabla u)\,dV_g
=\int_X\bigl(|\nabla u|^2+u\Delta u\bigr)\,dV_g
=\int_X|\nabla u|^2\,dV_g.
$$

積分される量は連続・非負だから $\nabla u=0$、連結性から $u$ は定数である。

正則線束 $K_X$ の正則枠 $\Omega$ におけるChern接続1形式は $\partial\log\|\Omega\|_g^2=\partial u$（[Chern接続の局所公式](../../KAH/KAH1-12/index.md#prop-kah1-12-determinant-curvature)と同じ線束の計算）であり、$\partial u=0$ だから $D\Omega=0$。Kähler計量では標準束の誘導接続はLevi–Civita接続から誘導されるので、$\Omega$ はすべての曲線で平行である。

最後に、$x$ のユニタリ基底 $e_1,\ldots,e_n$ で閉路の平行移動を行列 $P$ とする。[Kählerホロノミーのユニタリ性](../../KAH/KAH1-16/index.md#thm-kah1-16-unitary)から $P\in U(n)$。平行な $\Omega$ は閉路の前後で同じ値を返すため、

$$
\Omega_x(Pe_1,\ldots,Pe_n)=\Omega_x(e_1,\ldots,e_n).
$$

左辺は交代多重線形性により $\det(P)\,\Omega_x(e_1,\ldots,e_n)$ である。$\Omega_x$ は零でないので $\det(P)=1$、よって $P\in SU(n)$。閉路は任意なので全ホロノミーが $SU(n)$ に含まれる。$\square$
<!-- proof-end -->

**全ホロノミーの包含だけからも (K) が従う。** 実際、$\operatorname{Hol}(g)\subseteq SU(n)$ なら、基点で非零の最高次共変テンソルを選び、任意の経路に沿って平行移動して大域切断を作れる。別の経路を選んでも差は閉路の作用であり、その行列式は $1$ だから結果は一致する。得た平行切断はKähler接続の $(0,1)$ 部分にも平行であり、その部分は $\bar\partial$ なので正則である。従って (S$_g$)$\Rightarrow$(K) である。この向きはコンパクト性を必要としない。

## 6. 反例を一つずつ、失われた仮定と結び付ける

**平坦トーラス：包含は等号ではない。** 第2節の $T=\mathbb C^n/\Lambda$ は (K)、(I)、(R)、(F$_g$)、(S$^0_g$)、(S$_g$) をすべて満たすが、$n\ge2$ なら $\operatorname{Hol}(g)=\{I_n\}\subsetneq SU(n)$ である。追加の既約性などを証明しないまま等号へ強められない。

**平坦な有限商：制限と全ホロノミーがずれる。** $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、$Y=E\times E$ 上の写像

$$
\sigma(z,w)=(z+1/2,-w),\qquad X=Y/\langle\sigma\rangle
$$

を考える。$\sigma^2=\mathrm{id}$、$z+1/2=z$ は $E$ 上で起きないため作用は自由である。商は滑らか・コンパクト・連結で、積の平坦Kähler計量が降りる。詳しい商のホロノミー計算は[平坦商における非特殊ユニタリ全ホロノミー](../../KAH/KAH1-16/index.md#prop-kah1-16-flat-quotient)で行った。ここでは結論を条件の言葉に直す。

$$
\rho=0,\qquad \operatorname{Hol}^0(g)=\{I_2\},\qquad
\operatorname{diag}(1,-1)\in\operatorname{Hol}(g).
$$

最後の行列式は $-1$ だから (S$^0_g$) だが (S$_g$) ではない。さらに $Y$ の大域正則2形式は $dz\wedge dw$ の定数倍だけであり、$\sigma^*(dz\wedge dw)=-dz\wedge dw$。$X$ 上に非零正則2形式があれば引戻しは $\sigma$ 不変であるはずなので矛盾する。従って $K_X$ は正則自明ではないが、(R) は成立する。この例が壊すのは「Ricci平坦 $\Rightarrow$ 全ホロノミーが $SU(n)$ に入る」「実Chern類零 $\Rightarrow$ 正則自明」という二つの早合点である。

この例では $K_X^{\otimes2}$ は自明である。実際、$Y$ 上の $(dz\wedge dw)^{\otimes2}$ は $\sigma$ 不変なので商の非零正則切断へ降りる。これはtorsionの幾何的な現れだが、この情報だけでは $c_1(X)_{\mathbb Z}$ が零か非零かを決めない。整係数の計算は別に必要である。

## 7. 条件の関係を一枚にまとめる

| 成立する含意 | 根拠／必要な注意 |
|---|---|
| (K) $\Rightarrow$ (I) $\Rightarrow$ (R) | [第3節の命題](#prop-cyg1-01-chern-chain)。整係数のtorsionは実係数へ移すと消える。 |
| (F$_g$) $\Leftrightarrow$ (S$^0_g$) | [第4節の命題](#prop-cyg1-01-ricci-holonomy)。**指定した計量**に関する同値。 |
| (F$_g$) $\Rightarrow$ (R) | $[\rho/(2\pi)]=c_1(X)_{\mathbb R}$。逆は指定計量について偽。 |
| (S$_g$) $\Rightarrow$ (S$^0_g$)、(K)、(F$_g$) | 全閉路から縮む閉路へ制限でき、平行な正則体積形式ができる。 |
| (K) かつ (F$_g$) $\Rightarrow$ (S$_g$) | [平行体積形式の定理](#thm-cyg1-01-parallel-volume)。コンパクト性を使用。 |
| (R) $\Rightarrow$ **ある** (F$_{g'}$) | Yauの定理による外部入力。任意の指定計量 $g$ への結論ではない。 |
| (S$_g$) $\Rightarrow$ $\operatorname{Hol}(g)=SU(n)$ | **不成立**。平坦トーラスで真の包含となる。 |

まとめると「Calabi–Yau」という語だけでは、整係数なのか実係数なのか、計量を固定しているのか、全ホロノミーが**含まれる**のか**等しい**のかが分からない。以後は仮定を最初に列挙してから計算する。

## 8. 演習――含意の向きを自分の手で判定する

<a id="ex-cyg1-01-a01"></a>
#### CYG1-01-A01 係数変更とtorsion
- Level: A

$A=\mathbb Z\oplus\mathbb Z/6\mathbb Z$ の元 $a=(2,[3])$ と $b=(0,[2])$ を考える。実係数への写像でそれぞれどうなるかを求め、$a,b$ のうちtorsion元を判定せよ。

<!-- solution-start -->
**詳細解答。** 有限群から実ベクトル空間への準同型は零写像である。実際 $6t=0$ なら $6\iota(t)=0$、従って $\iota(t)=0$。そこで写像は $(m,[k])\mapsto m\in\mathbb R$、よって $\iota(a)=2$、$\iota(b)=0$。$a$ は自由部分が2なので、正整数 $r$ に対して $ra=(2r,[3r])$ の第一成分が零にならずtorsionでない。$b$ は $3b=(0,[6])=0$ なので位数3のtorsionである。実係数で零という条件は整係数で零と同じではない。
<!-- solution-end -->

<a id="ex-cyg1-01-a02"></a>
#### CYG1-01-A02 標準束の正則自明性
- Level: A

$T=\mathbb C^2/\Lambda$（$\Lambda$ は階数4の格子）で、$dz^1\wedge dz^2$ が商へ降りることを、遷移写像の微分を使って示せ。そこから (K)、(I) を判定せよ。

<!-- solution-start -->
**詳細解答。** 商の遷移写像は $z\mapsto z+\lambda$ であり、そのJacobianは $I_2$。よって $d(z^1+\lambda^1)\wedge d(z^2+\lambda^2)=dz^1\wedge dz^2$ で、最高次形式は重なりで一致する。各点で二本の独立な微分の外積なので零にならず、大域正則枠を与える。これが (K)。[標準束からChern類への含意](#prop-cyg1-01-chern-chain)により (I) も成立する。単に局所形式が存在するだけでなく、遷移で一致することが必要である。
<!-- solution-end -->

<a id="ex-cyg1-01-a03"></a>
#### CYG1-01-A03 群の包含と等号
- Level: A

$n=2$ で $H=\{I_2\}\subset U(2)$ とする。$H\subseteq SU(2)$ か、$H=SU(2)$ かを判定し、後者の反例行列を一つ書け。

<!-- solution-start -->
**詳細解答。** $I_2^*I_2=I_2$、$\det I_2=1$ なので $I_2\in SU(2)$、従って $H\subseteq SU(2)$。一方 $A=\operatorname{diag}(-1,-1)$ は $A^*A=I_2$、$\det A=(-1)^2=1$ なので $SU(2)$ の元だが $A\ne I_2$。従って $H\ne SU(2)$。包含を等号へ置き換えるには追加の証明が要る。
<!-- solution-end -->

<a id="ex-cyg1-01-a04"></a>
#### CYG1-01-A04 指定された計量のRicci形式
- Level: A

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上の $g_{z\bar z}=1+\varepsilon\cos(2\pi x)$（$0<\varepsilon<1$）について、$x=0$ で $\rho(g)$ が零でないことを直接計算せよ。ここで $z=x+iy$ とする。

<!-- solution-start -->
**詳細解答。** $q(x)=1+\varepsilon\cos(2\pi x)$ と置き、プライムを実変数 $x$ での微分とする。まず

$$
q(0)=1+\varepsilon>0,\quad q'(0)=0,\quad
q''(0)=-4\pi^2\varepsilon
$$

である。連鎖律から

$$
(\log q)''=\frac{q''}{q}-\left(\frac{q'}{q}\right)^2,\qquad
(\log q)''(0)=-\frac{4\pi^2\varepsilon}{1+\varepsilon}.
$$

$z=x+iy$ だから $\partial_z=\tfrac12(\partial_x-i\partial_y)$、$\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$。$q$ は $y$ に依存しないため $\partial_z\partial_{\bar z}\log q=\tfrac14(\log q)''$。よって指定計量のRicci形式は

$$
\rho(g)|_{x=0}
=-\frac{i}{4}(\log q)''(0)\,dz\wedge d\bar z
=\frac{i\pi^2\varepsilon}{1+\varepsilon}\,dz\wedge d\bar z\ne0.
$$

正則体積形式 $dz$ があっても、**この**計量はRicci平坦でない。
<!-- solution-end -->

<a id="ex-cyg1-01-b01"></a>
#### CYG1-01-B01 正則枠から実Chern類まで
- Level: B

連結コンパクトKähler多様体 $X$ の $K_X$ に非零の大域正則切断 $\Omega$ があるとする。遷移関数の整数コサイクルを具体的に選んで (K)$\Rightarrow$(I)$\Rightarrow$(R) を証明せよ。さらに、この議論から指定した任意のKähler計量のRicci形式が零だと結論できるか述べよ。

<!-- solution-start -->
**詳細解答。** 各開集合に $\Omega$ を枠として使えば遷移関数はすべて $1$。その対数を $0$ と取ると三重重なりの整数コサイクルは

$$
m_{\alpha\beta\gamma}=\frac{0+0+0}{2\pi i}=0.
$$

従って $c_1(K_X)_{\mathbb Z}=0$。[標準束のChern類の符号](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)と係数変更を順に使えば

$$
c_1(X)_{\mathbb Z}=-c_1(K_X)_{\mathbb Z}=0,
\qquad c_1(X)_{\mathbb R}=0.
$$

しかし第4節の[楕円曲線上の非定数計量](#ex-cyg1-01-nonflat-metric)の反例のように、同じ多様体にRicci形式が零でないKähler計量もありうる。得たのは $[\rho(g)/(2\pi)]=0$ という**類**の等式だけである。
<!-- solution-end -->

<a id="ex-cyg1-01-b02"></a>
#### CYG1-01-B02 平坦商の失われた体積形式
- Level: B

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$、$Y=E\times E$、$\sigma(z,w)=(z+1/2,-w)$、$X=Y/\langle\sigma\rangle$ とする。作用が自由であること、$dz\wedge dw$ が $X$ へ降りないこと、$X$ の平坦計量で (F$_g$)、(S$^0_g$) が成立するが (S$_g$) が成立しないことを説明せよ。

<!-- solution-start -->
**詳細解答。** 固定点があれば第一座標で $z+1/2=z$ in $E$、すなわち $1/2\in\mathbb Z+i\mathbb Z$ となるが不可能なので、作用は自由である。微分と最高外積への作用は

$$
d\sigma=\operatorname{diag}(1,-1),\qquad
\sigma^*(dz\wedge dw)=-dz\wedge dw.
$$

コンパクトトーラス上の正則関数は定数なので、大域正則2形式は $dz\wedge dw$ の定数倍だけであり、非零の不変形式はない。従って標準束の正則自明性は商へ降りない。

積の定数計量は $\sigma$ 不変で、商の曲率は局所的に零、従って $\rho=0$。縮む閉路の平行移動は $I_2$ だが、商で $z$ 方向に半周期進む閉路の平行移動は $d\sigma$（逆でも同じ）である。その複素行列式は

$$
\det(d\sigma)=1\cdot(-1)=-1.
$$

従って制限ホロノミーは $SU(2)$ に含まれるが、全ホロノミーは含まれない。これは非可縮閉路の作用を加えたためである。
<!-- solution-end -->

<a id="ex-cyg1-01-b03"></a>
#### CYG1-01-B03 体積形式を平行にする計算
- Level: B

連結コンパクトKähler $X$ に $\Omega=f(z)\,dz^1\wedge\cdots\wedge dz^n$ という非消滅大域正則体積形式があり、Ricci平坦Kähler計量 $g$ を選んだ。$u=\log\|\Omega\|_g^2$ が定数となるまでを局所式から導出し、全閉路の $\det P_\gamma=1$ を説明せよ。

<!-- solution-start -->
**詳細解答。** 誘導計量から、局所座標で

$$
\|\Omega\|^2=\frac{|f|^2}{\det G},\qquad
u=\log|f|^2-\log\det G.
$$

$f$ は零を持たず、局所的な正則対数を持つので $\partial\bar\partial\log|f|^2=0$。Ricci平坦性から $\partial\bar\partial\log\det G=0$、従って $\partial\bar\partial u=0$ である。よって実Laplacianについて $\Delta u=0$。

[一般Stokes定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を $u\nabla u$ に適用して

$$
0=\int_X\operatorname{div}(u\nabla u)\,dV_g
=\int_X(|\nabla u|^2+u\Delta u)\,dV_g
=\int_X|\nabla u|^2\,dV_g.
$$

非負・連続性より $\nabla u=0$、連結性より $u$ は定数。正則枠 $\Omega$ における標準束のChern接続形式は $\partial u=0$ なので $D\Omega=0$。任意の閉路の平行移動はユニタリで、$\Omega$ を保つため、その最高外冪の係数も $1$。従って $\det P_\gamma=1$、全ホロノミーが $SU(n)$ に含まれる。
<!-- solution-end -->

<a id="ex-cyg1-01-c01"></a>
#### CYG1-01-C01 六つの条件を論理的に仕分ける
- Level: C

次の三つの主張をそれぞれ真偽判定し、偽なら具体例と失われた仮定を示せ。

1. コンパクトKähler $X$ で (R) が成立するとき、**任意に指定した**Kähler計量 $g$ が (F$_g$) を満たす。
2. コンパクトKähler $(X,g)$ が (F$_g$) を満たせば、(S$_g$) を満たす。
3. コンパクトKähler $(X,g)$ が (K) と (F$_g$) を満たせば、$\operatorname{Hol}(g)=SU(n)$ である。

さらに 2 の反例で (K) が成立するかを判定し、(K) を追加すると結論がどう変わるか証明せよ。

<!-- solution-start -->
**詳細解答。**

1. **偽。** $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ は $dz$ により (K)、従って (R) を満たす。$g_{z\bar z}=1+\varepsilon\cos(2\pi x)$、$0<\varepsilon<1$ と指定すると、$\rho|_{x=0}=i\pi^2\varepsilon/(1+\varepsilon)\,dz\wedge d\bar z\ne0$。$c_1(X)_{\mathbb R}=0$ は曲率形式の**類**を零にするだけで、任意の代表を零にしない。
2. **偽。** 第6節の平坦商 $X=(E\times E)/\langle(z,w)\mapsto(z+1/2,-w)\rangle$ では、局所平坦ゆえ $\rho=0$、$\operatorname{Hol}^0=\{I_2\}$。だが $\operatorname{diag}(1,-1)$ の行列式は $-1$ なので全ホロノミーは $SU(2)$ に含まれない。非可縮閉路の作用を制限ホロノミーだけでは制御できない。この $X$ で (K) は**不成立**である。もし非零正則2形式があればその引戻しは $Y$ の定数倍 $dz\wedge dw$ だが、$\sigma^*$ により符号が反転するので矛盾する。
3. **偽。** 平坦な複素2トーラスでは (K)、(F$_g$) が成立するが、全ホロノミーは $\{I_2\}$ であり、$\operatorname{diag}(-1,-1)\in SU(2)$ は含まれないので $SU(2)$ と等しくない。ここで欠けているのはホロノミーを大きくする追加の幾何学的仮定である。

最後に 2 へ (K) を追加すると、[平行正則体積形式の定理](#thm-cyg1-01-parallel-volume)が適用できる。実際 $u=\log(|f|^2/\det G)$ はRicci平坦性から調和、コンパクト性から定数なので $D\Omega=0$、ゆえに全閉路で $\det P_\gamma=1$。従って (K) と (F$_g$) から (S$_g$) が成立する。ただし 3 のように等号までは従わない。
<!-- solution-end -->

## 次の講義へ

ここでは含意と量化を確定した。次は正則体積形式の**存在そのもの**を、随伴公式と局所Jacobianで判定する。三次曲線、四次曲面、五次三次元超曲面のどれが (K) を満たすか、具体式から確かめていく。
