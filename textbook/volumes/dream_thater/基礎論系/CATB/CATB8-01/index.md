# CATB8-01 次数付きテンソル積とKoszul符号

## 1. 二つの複体を一つにするには

[余鎖複体](../CATB7-01/index.md#def-catb7-01-cochain-complex)では微分を二回施すと零になる。二つの複体をテンソル積で組み合わせ、それぞれの微分を使って新しい複体を作りたい。しかし単純に二つの微分を足すと、異なる側を一回ずつ微分する項が二重に現れる。本講では、その相殺に必要な符号を導く。次講で多入力の演算や微分付き代数を扱うための準備でもある。

係数は単位元を持つ可換環 $R$ とする。体 $k$ もこの場合に含まれる。全て[左加群](../../../代数系/MOD/MOD1/index.md#def-mod1-module)で、可換性により右作用も $xr=rx$ として使う。テンソル積は $R$ 上で取り、添字 $R$ を省く。次数は整数、合成は右から左とする。

線形写像とは、加法とスカラー作用を保つ[加群準同型](../../../代数系/MOD/MOD1/index.md#def-mod1-homomorphism)を指す。余鎖複体 $C$ の微分は $d_C^p:C^p\to C^{p+1}$ であり、$x\in C^p$ について $d_Cx=d_C^p(x)$ と略す。以下では直和全体に作用する写像を $d_C$ とし、$(d_C)^2$ はその自己合成を表す。成分 $C^p$ の元 $x$ について

$$
(d_C)^2(x)=d_C^{p+1}(d_C^p(x)).
$$

第2成分の微分 $d_C^2:C^2\to C^3$ との区別のため、自己合成には括弧を付ける。実変数についての微分ではない。

体の場合の[テンソル積の定義](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)を環へ拡張するには、対 $(x,y)$ を基底記号とする[自由加群](../../../代数系/MOD/MOD1/index.md#def-mod1-free-module-basis)を、次の関係で生成される[部分加群](../../../代数系/MOD/MOD1/index.md#def-mod1-submodule)で割る。

$$
[x+x',y]-[x,y]-[x',y],
$$

$$
[x,y+y']-[x,y]-[x,y'],
$$

$$
[rx,y]-r[x,y],\qquad [x,ry]-r[x,y].
$$

[商加群](../../../代数系/MOD/MOD1/index.md#def-mod1-quotient-module)での像を $x\otimes y$ と書き、純テンソル（[単純テンソル](../../../基礎科目/LA/LA3E/index.md#def-la3e-simple-tensor)の加群版）と呼ぶ。双線形とは各変数について他方を固定すると $R$ 線形であることをいう。任意の双線形写像は基底記号の像を指定して[自由加群の普遍性](../../../代数系/MOD/MOD1/index.md#thm-mod1-free-universal-property)により線形写像を作り、上の関係を零に送るので商へ降りる。商は純テンソルの有限和で生成されるため、この延長は一意である。以下ではこの普遍性を利用して純テンソル上の式から線形写像を作る。

自由加群 $R^a,R^b$ の場合は基底の組のテンソルが基底になる。体上の[テンソル積の基底](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)と同じ構成で、基底を $e_i,v_j$ とすると $x=\sum_i x_i e_i$、$y=\sum_j y_j v_j$ に対し

$$
x\otimes y=\sum_{i,j}x_i y_j(e_i\otimes v_j).
$$

よって基底候補は全体を生成する。双線形写像 $(x,y)\mapsto (x_i y_j)_{i,j}$ は $R^{ab}$ への線形写像を誘導し、$e_i\otimes v_j$ を添字 $(i,j)$ の標準基底に送る。逆写像は各標準基底を対応する純テンソルに送る。両合成は生成元上で恒等写像になるので、座標は一意である。

## 2. 位置の番号を足す

複体から微分を一旦忘れ、次数ごとの加群だけを考える。二つの次数 $p,q$ の入力を組み合わせるとき、出力の次数を $p+q$ にする。負の次数があっても同じ規則を採用する。次数付き加群とは、このように番号を付けた成分を持つ加群である。直和 $\bigoplus_p V^p$ は有限個の成分だけが非零である族 $(x_p)_p$ の加群で、加法・スカラー作用は成分ごとに行う。上付きの $p$ は累乗ではなく成分番号を表す。

<a id="def-catb8-01-graded-module"></a>

<!-- formal-statement-start -->
> **定義（次数付き加群）**
>
> 可換環 $R$ 上の整数次数付き加群 $V$ は、$R$ 加群の直和

$$
V=\bigoplus_{p\in\mathbb Z}V^p
$$

> である。$V^p$ の元を次数 $p$ の斉次元といい、非零の斉次元 $x$ の次数を $|x|=p$ と記す。各元は有限個の成分の和として一意に表される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb8-01-graded-module -->
**定義の確認**。非零の係数環 $R$ 上で $V^{-1}=Re$、$V^2=Ru$ とし他を零とする。$ae+bu$ の分解は自由加群の座標の一意性による。$e$ は次数 $-1$、$u$ は次数2であり、両係数が非零なら和は斉次ではない。零元はどの成分にも属するので、以下の符号式では零元の所属次数を入力の成分から指定する。
<!-- definition-example-end -->

同じ合計次数へ到達する組は一つに潰さず、その組ごとのテンソル積を直和として保持する。

<a id="def-catb8-01-graded-tensor"></a>

<!-- formal-statement-start -->
> **定義（次数付きテンソル積）**
>
> 可換環 $R$ 上の整数次数付き加群 $V,W$ に対し、その次数付きテンソル積の次数 $n$ の成分は

$$
(V\otimes W)^n=\bigoplus_{p+q=n}V^p\otimes_R W^q
$$

> とする。$V\otimes W$ はこれら全次数の直和である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb8-01-graded-tensor -->
**定義の確認**。非零の係数環 $R$ 上で $V^{-1}=Re,V^2=Ru,W^0=Rv,W^3=Rw$ とし他を零とする。各成分のテンソル積は自由階数1で、次数 $-1,2,5$ の基底は順に $e\otimes v$、$(e\otimes w,u\otimes v)$、$u\otimes w$ になる。同じ次数2に由来の異なる二つの直和成分がある。どの元もこれらの有限線形結合で、次数別の分解は一意である。
<!-- definition-example-end -->

一般の無限個の非零成分がある場合でも、直和を取るため各元の計算は有限回で終わる。微分も有限和を有限和へ送る。直積を用いる別の全複体と混同しない。

## 3. 写像が次数を動かすときの規則

通常の線形写像は次数を混ぜることがある。ここでは全ての成分を一定量だけ移す次数付き写像を使う。微分はその量が1の例である。

<a id="def-catb8-01-graded-map"></a>

<!-- formal-statement-start -->
> **定義（次数付き写像）**
>
> 整数次数付き $R$ 加群 $V,U$ の間の次数 $a$ の斉次写像 $f$ は、各整数 $p$ について線形写像

$$
f^p:V^p\longrightarrow U^{p+a}
$$

> を与えたものとする。$|f|=a$ と書く。全直和上の線形写像は成分ごとの有限和で定まる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb8-01-graded-map -->
**定義の確認**。$R=\mathbb Z$、$V^0=Re,V^1=Ru$ とし、$f:V\to V$ を $f(e)=2u,f(u)=0$ から線形に延長する。他の成分を零とすれば、次数0から1、次数1から零の次数2への線形写像で、次数1の条件を全成分で満たす。恒等写像は次数0であり、零写像は指定した任意の次数で扱える。
<!-- definition-example-end -->

二つの写像を同時に施す際、右の写像 $g$ を左の元 $x$ の向こうへ移すという順序を記録する。そこで $g$ の次数と $x$ の次数の積の偶奇を符号にする。この規則をKoszul符号付きテンソル写像と呼ぶ。整数 $m$ に対する $(-1)^m$ は、負の整数も含め、$m$ が偶数なら $1_R$、奇数なら $-1_R$ を表す。

<a id="def-catb8-01-koszul-tensor-map"></a>

<!-- formal-statement-start -->
> **定義（Koszul符号付きテンソル写像）**
>
> 可換環上の整数次数付き加群の間の斉次写像 $f:V\to U$、$g:W\to T$ の次数をそれぞれ $a,b$ とする。$x\in V^p,y\in W^q$ に対し

$$
(f\otimes g)(x\otimes y)=(-1)^{bp}f(x)\otimes g(y)
$$

> で定まる線形写像 $f\otimes g:V\otimes W\to U\otimes T$ を符号付きテンソル写像とする。次数は $a+b$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb8-01-koszul-tensor-map -->
**定義の確認**。$R=\mathbb Z$ とし、次数1の基底 $e$ と次数0の基底 $v$ を取る。始域・終域はそれぞれ指定した基底だけを持つ自由階数1の次数付き加群（他の成分は零）とし、$f(e)=u$（次数2）、$g(v)=w$（次数1）から線形に延長する。両写像は次数1であり、式は $e\otimes v$ を $-u\otimes w$ に移す。入力の次数1から出力の次数3へ2増える。整数倍した入力にも同じ整数倍の出力が得られ、各成分で双線形、他の成分は零である。
<!-- definition-example-end -->

固定した $p,q$ 上で符号は定数なので、[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)の式は双線形である。第1節の普遍性から各成分の線形写像を得る。出力の次数は $(p+a)+(q+b)=p+q+a+b$ なので、直和上で次数 $a+b$ の線形写像になる。斉次でない入力は次数別に分けてから計算する。

<a id="thm-catb8-01-interchange"></a>

<!-- formal-statement-start -->
> **定理（符号付き交換則）**
>
> 可換環上の整数次数付き加群の斉次写像 $f:V\to U$、$g:W\to T$、$h:U\to U'$、$k:T\to T'$ を取る。第1、第2の入力に作用する写像の合成について

$$
(h\otimes k)(f\otimes g)
=(-1)^{|k||f|}(hf\otimes kg)
$$

> が成り立つ。
<!-- formal-statement-end -->

見取り図：2回目の右側の写像は、元の次数 $p$ ではなく $f$ で移動した次数 $p+a$ を越える。その差が交換の符号になる。

<!-- proof-start -->
### 証明

$|f|=a,|g|=b,|k|=d$ と置く。斉次元 $x\in V^p,y\in W^q$ 上でまず

$$
(f\otimes g)(x\otimes y)=(-1)^{bp}f(x)\otimes g(y).
$$

$f(x)$ の所属次数は $p+a$ だから、再度[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)を適用すると

$$
(h\otimes k)(f\otimes g)(x\otimes y)
=(-1)^{bp+d(p+a)}hf(x)\otimes kg(y).
$$

一方 $kg$ の次数は $b+d$ なので

$$
(hf\otimes kg)(x\otimes y)
=(-1)^{(b+d)p}hf(x)\otimes kg(y).
$$

指数の差は $bp+d(p+a)-(b+d)p=da$ である。純テンソルが各直和成分を生成するので、線形性から全元について成立する。
<!-- proof-end -->

特に別々の因子に作用する二つの奇数次数写像は、順序を入れ替えると符号が反転する。例えば次数1の $f,g$ に[符号付き交換則](#thm-catb8-01-interchange)を適用する。各 $1$ はその位置の加群の恒等写像（次数0）である。

$$
(1\otimes g)(f\otimes1)=-(f\otimes g),
$$

$$
(f\otimes1)(1\otimes g)=f\otimes g.
$$

これは同じ因子に作用する写像一般が反可換だという主張ではない。

## 4. 二乗が零になる微分

二つの[余鎖複体](../CATB7-01/index.md#def-catb7-01-cochain-complex)の微分は次数1である。左側を微分する操作と右側を微分する操作を足す。[符号付き交換則](#thm-catb8-01-interchange)により、交差項を相殺する形にできる。

<a id="thm-catb8-01-tensor-differential"></a>

<!-- formal-statement-start -->
> **定理（テンソル積複体の微分）**
>
> 可換環 $R$ 上の余鎖複体 $C,D$ について、次数付きテンソル積に次数1の線形写像 $\partial$ を

$$
\partial(x\otimes y)=d_Cx\otimes y+(-1)^p x\otimes d_Dy
\qquad(x\in C^p,\ y\in D^q)
$$

> で入れると $\partial^2=0$ となり、余鎖複体をなす。ここで $\partial$ は直和全体の写像、$\partial^2$ はその自己合成を指す。次数 $n$ の成分から次数 $n+1$ の成分への制限を取れば余鎖複体の各微分となる。
<!-- formal-statement-end -->

見取り図：同じ側を二回微分する項は元の複体の条件から零になる。異なる側を微分する二項は、左の次数が一つ進むことによって反対の符号を持つ。

<!-- proof-start -->
### 証明

[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)により $\partial=d_C\otimes1+1\otimes d_D$ は線形である。各項は次数 $p+q+1$ に属する。第1項へ再び微分を作用させると

$$
\partial(d_Cx\otimes y)=(d_C)^2x\otimes y
+(-1)^{p+1}d_Cx\otimes d_Dy.
$$

第2項への作用は

$$
\partial((-1)^p x\otimes d_Dy)
=(-1)^p d_Cx\otimes d_Dy
+(-1)^{2p}x\otimes (d_D)^2y.
$$

$(d_C)^2=(d_D)^2=0$ であり、残りの係数は $(-1)^{p+1}+(-1)^p=0$ になる。純テンソル上で二乗が零になったため全体でも零である。
<!-- proof-end -->

具体例として整数上で $C^0=\mathbb Ze,C^1=\mathbb Zu,d_Ce=2u$、$D^0=\mathbb Zv,D^1=\mathbb Zw,d_Dv=3w$ とする。その他の次数と微分は零である。次数0,1,2の基底はそれぞれ $e\otimes v$、$(u\otimes v,e\otimes w)$、$u\otimes w$ である。

$$
\partial(e\otimes v)=2u\otimes v+3e\otimes w,
$$

$$
\partial(u\otimes v)=-3u\otimes w,\qquad
\partial(e\otimes w)=2u\otimes w.
$$

次数0の基底 $e\otimes v$、次数1の順序付き基底 $(u\otimes v,e\otimes w)$、次数2の基底 $u\otimes w$ に関する微分の行列を考える。各列は始域基底の像の終域基底における座標である。第1の微分の列は $(2,3)$、第2の微分では二つの像の係数が順に $-3,2$ だから、行列は

$$
\begin{pmatrix}2\\3\end{pmatrix},\qquad
\begin{pmatrix}-3&2\end{pmatrix}
$$

であり、合成は $-6+6=0$ となる。右側の微分を常に正符号にすると第2の行列は $(3,2)$ となり、合成は12で零ではない。係数環が $1_R+1_R=0$ を満たす場合には $-1_R=1_R$ であり、交差項の二つの係数の和も $1_R+1_R=0$ となる。この場合も同じ微分公式が使える。

次に、微分と可換な次数0の[余鎖写像](../CATB7-01/index.md#def-catb7-01-cochain-map)を組み合わせる。

<a id="prop-catb8-01-tensor-cochain-map"></a>

<!-- formal-statement-start -->
> **命題（余鎖写像のテンソル積）**
>
> 可換環上の余鎖複体の余鎖写像 $f:C\to C',g:D\to D'$ に対して $f\otimes g:C\otimes D\to C'\otimes D'$ は余鎖写像になる。
<!-- formal-statement-end -->

見取り図：次数0の写像は左の元の次数を変えないので、微分の符号を保つ。

<!-- proof-start -->
### 証明

[余鎖写像](../CATB7-01/index.md#def-catb7-01-cochain-map)の条件から $d_{C'}f=fd_C$ と $d_{D'}g=gd_D$ であり、両写像の次数は0である。斉次元 $x\in C^p,y\in D^q$ 上で

$$
\partial'(f(x)\otimes g(y))
=d_{C'}f(x)\otimes g(y)+(-1)^pf(x)\otimes d_{D'}g(y)
$$

$$
=f(d_Cx)\otimes g(y)+(-1)^pf(x)\otimes g(d_Dy).
$$

逆順では、[テンソル積複体の微分](#thm-catb8-01-tensor-differential)と $|g|=0$ を[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)に代入して

$$
(f\otimes g)\partial(x\otimes y)
=f(d_Cx)\otimes g(y)+(-1)^p f(x)\otimes g(d_Dy).
$$

従って両者は一致する。生成元上での一致から全体で余鎖写像条件が成立する。
<!-- proof-end -->

この命題は通常のテンソル積が複体の射にも作用できることを意味する。テンソル積が擬同型を常に保つとまでは主張していない。

## 5. 元を交換する場合にも符号が付く

体上の[通常のテンソル積の対称性](../../CAT/CAT4-03/index.md#thm-cat4-03-tensor)では純テンソルの二因子を交換した。ここでは可換環上の加群へ交換の構成を拡張する。複体の微分と両立させるには、二つの元の次数を掛け合わせた符号を付ける。

<a id="def-catb8-01-graded-flip"></a>

<!-- formal-statement-start -->
> **定義（次数付き交換写像）**
>
> 可換環上の整数次数付き加群 $V,W$ の交換写像は

$$
\tau_{V,W}(x\otimes y)=(-1)^{pq}y\otimes x
\qquad(x\in V^p,\ y\in W^q)
$$

> で定まる次数0の線形写像 $\tau_{V,W}:V\otimes W\to W\otimes V$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb8-01-graded-flip -->
**定義の確認**。整数上の自由階数1の成分 $V^{-1}=\mathbb Ze,W^3=\mathbb Zw$ だけを取る。$e\otimes w$ は $-w\otimes e$ に移り、前後の次数はともに2である。固定成分上で式は双線形であり整数倍を保つ。他の成分は零である。
<!-- definition-example-end -->

<a id="thm-catb8-01-flip-cochain"></a>

<!-- formal-statement-start -->
> **定理（次数付き交換の対称性と微分との両立）**
>
> 可換環上の整数次数付き加群 $V,W$ では

$$
\tau_{W,V}\tau_{V,W}=1_{V\otimes W}.
$$

> $V,W$ が余鎖複体である場合、交換写像は余鎖写像である。さらに三つの整数次数付き加群の斉次元 $x,y,z$ の次数を $p,q,r$ とすると、括弧の結び直しの下で、左端または右端の一因子を他の二因子の向こうへ順に交換した結果はそれぞれ

$$
(-1)^{p(q+r)}y\otimes z\otimes x,
$$

$$
(-1)^{(p+q)r}z\otimes x\otimes y
$$

> であり、ブロックとの一度の交換に一致する。
<!-- formal-statement-end -->

見取り図：交換の往復は指数を二倍するので符号が消える。微分との両立では微分前後で片方の次数が1だけ増えることを追う。

<!-- proof-start -->
### 証明

固定した $p,q$ の成分では[次数付き交換写像](#def-catb8-01-graded-flip)の交換式は双線形なので第1節の普遍性から線形写像を与える。総次数を保ち、二度交換した符号は $(-1)^{pq+qp}=1$ だから逆写像を持つ。

複体の場合、$\partial_{W,V}$ を交換後のテンソル積の微分とする。[テンソル積複体の微分](#thm-catb8-01-tensor-differential)から

$$
\partial_{W,V}\tau(x\otimes y)
=(-1)^{pq}d_Wy\otimes x
+(-1)^{pq+q}y\otimes d_Vx.
$$

逆順に作用させると

$$
\tau\partial_{V,W}(x\otimes y)
=(-1)^{(p+1)q}y\otimes d_Vx
+(-1)^{p+p(q+1)}d_Wy\otimes x.
$$

$(p+1)q=pq+q$ かつ $p+p(q+1)=pq+2p$ であり、$2p$ は偶数なので係数が一致する。純テンソルが直和成分を生成するので全元について微分と可換である。

三重テンソルの括弧は純テンソルを結び直す同型で省略する。固定した次数 $p,q,r$ で $z$ を固定すると、$(x,y)\mapsto x\otimes(y\otimes z)$ は双線形なので第1節の普遍性により $x\otimes y$ 上の線形写像になる。その値は $z$ についても線形である（純テンソル上の線形性が有限線形結合へ延びる）。再び普遍性を使うと

$$
(x\otimes y)\otimes z\longmapsto x\otimes(y\otimes z)
$$

が線形写像として定まる。逆向きは $x$ を固定して $(y,z)\mapsto (x\otimes y)\otimes z$ に同じ普遍性を適用して作る。純テンソル上で両合成が恒等となり、双方とも総次数 $p+q+r$ を保つので、直和上で次数0の線形同型となる。次数 $p,q,r$ の因子について、左端を右端へ運ぶ符号は $(-1)^{pq}(-1)^{pr}=(-1)^{p(q+r)}$。右端を左端へ運ぶ符号は $(-1)^{qr}(-1)^{pr}=(-1)^{(p+q)r}$。いずれもブロックとの交換の符号と等しい。各式は純テンソルを生成元として全体へ延びる。
<!-- proof-end -->

例えば次数1の $x$ と次数0の $y$ の交換は正符号である。しかし $d_Wy$ は次数1なので、$x$ と交換すると負符号になる。これが微分の交換を補正する仕組みである。

## 6. 演習

### CATB8-01-A01 次数と直和

- Level: A

整数上で $V^{-2}=\mathbb Ze,V^1=\mathbb Zu,W^1=\mathbb Zv,W^4=\mathbb Zw$、他は零とする。テンソル積の全非零次数と各基底を求めよ。

<!-- solution-start -->
[次数付きテンソル積](#def-catb8-01-graded-tensor)で次数の組を足す。$-2+1=-1,-2+4=2,1+1=2,1+4=5$ である。次数 $-1$ は $e\otimes v$、次数2は $e\otimes w,u\otimes v$、次数5は $u\otimes w$ が基底となる。各組は自由階数1で、次数2の二つは別々の直和成分である。
<!-- solution-end -->

### CATB8-01-A02 負の次数の符号

- Level: A

整数上で斉次元 $x,y$ の次数を $-3,2$ とし、斉次写像 $f,g$ の次数を $2,-1$ とする。$f(x)=u,g(y)=v$ として $(f\otimes g)(x\otimes y)$ とその次数を求めよ。

<!-- solution-start -->
[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)の指数は $(-1)(-3)=3$ なので結果は $-u\otimes v$。$u$ の所属次数は $-3+2=-1$、$v$ は $2-1=1$ なので総次数は0。入力の総次数 $-1$ に写像の次数 $2-1=1$ を足した値とも一致する。
<!-- solution-end -->

### CATB8-01-A03 二項複体の微分

- Level: A

整数上で $C^0=\mathbb Ze,C^1=\mathbb Zu,d_Ce=4u$、$D^0=\mathbb Zv,D^1=\mathbb Zw,d_Dv=5w$、他は零とする。テンソル積複体の二つの微分行列を求めよ。

<!-- solution-start -->
[テンソル積複体の微分](#thm-catb8-01-tensor-differential)から

$$
\partial(e\otimes v)=4u\otimes v+5e\otimes w,
$$

$$
\partial(u\otimes v)=-5u\otimes w,\quad
\partial(e\otimes w)=4u\otimes w.
$$

次数0と2の基底はそれぞれ $e\otimes v,u\otimes w$ とし、次数1の基底順を $(u\otimes v,e\otimes w)$ とする。各像をこの順に列に置くと列 $(4,5)^{\mathsf T}$（上付き $\mathsf T$ は転置）と行 $(-5,4)$ を得る。行列積は $-20+20=0$ である。
<!-- solution-end -->

### CATB8-01-A04 交換の往復

- Level: A

整数上で次数 $-1,3$ の自由生成元 $x,y$ を交換し、さらに元の順序に戻せ。途中の符号も示せ。

<!-- solution-start -->
[次数付き交換写像](#def-catb8-01-graded-flip)の指数は $(-1)3=-3$ で奇数だから $-y\otimes x$ になる。次の交換の指数は $3(-1)=-3$ で、初めの負符号に再び負符号を掛ける。結果は $x\otimes y$ である。所属次数は常に2である。
<!-- solution-end -->

### CATB8-01-B01 交換則の型と符号

- Level: B

整数上で $f,g,h,k$ の次数を $-1,2,3,1$ とする。合成可能な斉次写像とし、次数2の $x$、次数 $-1$ の $y$ で、$(h\otimes k)(f\otimes g)$ と $hf\otimes kg$ の符号と出力次数を比較せよ。

<!-- solution-start -->
[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)により、最初の符号は $(-1)^{2\cdot2}=1$、$f(x)$ の次数は1。次の符号は $(-1)^{1\cdot1}=-1$ なので左辺は $-hf(x)\otimes kg(y)$ となる。$kg$ の次数は3なので右のテンソル写像の符号は $(-1)^{3\cdot2}=1$ である。従って差は $-1$ であり、[符号付き交換則](#thm-catb8-01-interchange)の $(-1)^{1\cdot(-1)}=-1$ に一致する。最終的に左因子は次数 $2-1+3=4$、右因子は $-1+2+1=2$、合計6である。
<!-- solution-end -->

### CATB8-01-B02 微分の符号を導く

- Level: B

整数上で $C^p=\mathbb Ze,C^{p+1}=\mathbb Zu,d_Ce=u$、$D^0=\mathbb Zv,D^1=\mathbb Zw,d_Dv=w$ とし、他は零とする。規則

$$
\delta(x\otimes y)=d_Cx\otimes y+\epsilon_{|x|}x\otimes d_Dy
$$

で $\epsilon_j\in\{1,-1\}$ とする。任意の整数 $p$ で二乗が零になる条件を求め、$\epsilon_0=1$ の場合の全符号を決めよ。

<!-- solution-start -->
$\delta(e\otimes v)=u\otimes v+\epsilon_p e\otimes w$。次に $\delta(u\otimes v)=\epsilon_{p+1}u\otimes w$、$\delta(e\otimes w)=u\otimes w$ だから

$$
\delta^2(e\otimes v)=(\epsilon_{p+1}+\epsilon_p)u\otimes w.
$$

$u\otimes w$ は整数上の自由生成元なので零になるのは $\epsilon_{p+1}=-\epsilon_p$ の場合に限る。任意の $p$ で必要である。$\epsilon_0=1$ から正方向へ交互、負方向へも $\epsilon_p=-\epsilon_{p+1}$ を繰り返して $\epsilon_p=(-1)^p$ を得る。他の生成元は微分を二度施すと少なくとも一方の成分が既に最高次数を越えるので零になる。一般の複体に対してもこの符号で十分であることは[テンソル積複体の微分](#thm-catb8-01-tensor-differential)の二乗零の計算で確認できる。
<!-- solution-end -->

### CATB8-01-B03 符号付き交換と微分

- Level: B

整数上で $C^1=\mathbb Ze,C^2=\mathbb Zu,d_Ce=u$、$D^1=\mathbb Zv,D^2=\mathbb Zw,d_Dv=2w$、他は零とする。$e\otimes v$ について、交換してから微分する場合と微分してから交換する場合の結果を比較せよ。

<!-- solution-start -->
[次数付き交換写像](#def-catb8-01-graded-flip)により $\tau(e\otimes v)=-v\otimes e$。交換後の微分を $\partial'=\partial_{D,C}$ と書く。[テンソル積複体の微分](#thm-catb8-01-tensor-differential)において左の元 $v$ の次数は1だから

$$
\partial'(-v\otimes e)=-2w\otimes e+v\otimes u.
$$

一方、[テンソル積複体の微分](#thm-catb8-01-tensor-differential)で $\partial(e\otimes v)=u\otimes v-2e\otimes w$。交換指数はそれぞれ $2\cdot1$ と $1\cdot2$ で偶数なので

$$
\tau\partial(e\otimes v)=v\otimes u-2w\otimes e.
$$

両者は一致し、次数はともに3である。交換に常に正符号を使うと前者は $2w\otimes e-v\otimes u$ になり一致しない。
<!-- solution-end -->

### CATB8-01-B04 余鎖写像のテンソル積

- Level: B

整数上の二項複体 $C,D$ は次数0,1に自由階数1の加群を持ち、微分がそれぞれ2倍、3倍とする。$C',D'$ は同じ形で微分が4倍、6倍とする。写像 $f:C\to C',g:D\to D'$ の次数0成分を恒等、次数1成分を2倍とする。余鎖写像条件とテンソル積の次数0,1,2での写像行列を確かめよ。

<!-- solution-start -->
$4\cdot1=2\cdot2$、$6\cdot1=2\cdot3$ なので両者は[余鎖写像](../CATB7-01/index.md#def-catb7-01-cochain-map)。他の次数の条件は零である。写像の次数は0だから[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)に余分な符号はない。$C,D$ の次数0,1の基底をそれぞれ $e,u$ と $v,w$、終域の対応する基底を $e',u'$ と $v',w'$ とする。基底の像は順に

$$
\begin{aligned}
e\otimes v&\mapsto e'\otimes v',\\
u\otimes v&\mapsto 2u'\otimes v',\\
e\otimes w&\mapsto 2e'\otimes w',\\
u\otimes w&\mapsto 4u'\otimes w'.
\end{aligned}
$$

したがって次数0の行列は $(1)$、次数1は上記の順で対角行列 $\operatorname{diag}(2,2)$（非対角成分は零）、次数2は $(4)$ となる。

[テンソル積複体の微分](#thm-catb8-01-tensor-differential)から元の微分行列は $(2,3)^{\mathsf T},(-3,2)$、終域の行列は $(4,6)^{\mathsf T},(-6,4)$。上付き $\mathsf T$ は転置を表し、ここでは行ベクトルを列ベクトルにする。次数0から1では

$$
(4,6)^{\mathsf T}\cdot1
=\operatorname{diag}(2,2)(2,3)^{\mathsf T}.
$$

次数1から2では

$$
(-6,4)\operatorname{diag}(2,2)=(-12,8)=4(-3,2).
$$

したがって[余鎖写像のテンソル積](#prop-catb8-01-tensor-cochain-map)の結論を成分でも確認できた。
<!-- solution-end -->

### CATB8-01-C01 三つの複体の符号

- Level: C

任意の可換環 $R$ 上の三つの余鎖複体 $C,D,E$ を考える。斉次元 $x,y,z$ の次数を $p,q,r$ とする。二通りの括弧 $(C\otimes D)\otimes E$ と $C\otimes(D\otimes E)$ の微分を求め、結び直しが余鎖同型となることを示せ。さらに整数上で各複体を次数0,1の自由階数1、微分をそれぞれ2倍、3倍、5倍としたとき、次数0の生成元へ微分を二回施して交差項をすべて確認せよ。

<!-- solution-start -->
まず[テンソル積複体の微分](#thm-catb8-01-tensor-differential)を左の括弧に適用すると

$$
\partial((x\otimes y)\otimes z)
=\partial_{C,D}(x\otimes y)\otimes z
+(-1)^{p+q}(x\otimes y)\otimes d_Ez.
$$

内側の微分を展開し括弧を省くと

$$
d_Cx\otimes y\otimes z
+(-1)^p x\otimes d_Dy\otimes z
+(-1)^{p+q}x\otimes y\otimes d_Ez.
$$

右の括弧では

$$
\partial(x\otimes(y\otimes z))
=d_Cx\otimes(y\otimes z)
+(-1)^p x\otimes\partial_{D,E}(y\otimes z).
$$

最後の係数は $(-1)^p(-1)^q=(-1)^{p+q}$ となり、同じ三項が得られる。[次数付き交換の対称性と微分との両立](#thm-catb8-01-flip-cochain)の証明中で構成した結び直しは純テンソルを対応させる線形同型であり、この計算から微分を保つ。

次に $C,D,E$ の次数 $i,j,k\in\{0,1\}$ の基底をそれぞれ $c_i,v_j,e_k$ とし、純テンソル $b_{ijk}=c_i\otimes v_j\otimes e_k$ と書く。次数0の基底へ作用すると

$$
\partial b_{000}=2b_{100}+3b_{010}+5b_{001}.
$$

各項で左にある次数を追うと

$$
\partial b_{100}=-3b_{110}-5b_{101},
$$

$$
\partial b_{010}=2b_{110}-5b_{011},
$$

$$
\partial b_{001}=2b_{101}+3b_{011}.
$$

よって係数を掛け戻すと

$$
\partial^2b_{000}
=(-6+6)b_{110}+(-10+10)b_{101}
+(-15+15)b_{011}=0.
$$

どの二因子の組でも、先に左を微分する場合と先に右を微分する場合で符号が逆になる。同じ因子を二度微分する項は零である。これが多入力演算においても次数を記録する理由である。
<!-- solution-end -->

## 7. まとめ

次数付きテンソル積では入力次数を足し、右の写像を左の元の向こうへ動かすときは次数の積の偶奇で符号を決める。符号付き交換則から、二つの微分の交差項が逆符号を持ち、テンソル積が余鎖複体になる。次講ではこの規則を積を持つ複体に適用し、微分と積の両立、懸垂、余導分へ進む。
