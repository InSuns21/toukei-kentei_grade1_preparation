# CATB8-01 次数付きテンソル積とKoszul符号

## 1. 二つの複体を一つにするには

[余鎖複体](../CATB7-01/index.md#def-catb7-01-cochain-complex)では微分を二回施すと零になる。二つの複体をテンソル積で組み合わせ、それぞれの微分を使って新しい複体を作りたい。しかし単純に二つの微分を足すと、異なる側を一回ずつ微分する項が二重に現れる。本講では、その相殺に必要な符号を導く。次講で多入力の演算や微分付き代数を扱うための準備でもある。

係数は単位元を持つ可換環 $R$ とする。体 $k$ もこの場合に含まれる。全て左 $R$ 加群で、可換性により右作用も $xr=rx$ として使う。テンソル積は $R$ 上で取り、添字 $R$ を省く。次数は整数、合成は右から左とする。

体の場合の[テンソル積の定義](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)を環へ拡張するには、対 $(x,y)$ を基底記号とする自由 $R$ 加群を、次の関係で生成される部分加群で割る。

$$
[x+x',y]-[x,y]-[x',y],
$$

$$
[x,y+y']-[x,y]-[x,y'],
$$

$$
[rx,y]-r[x,y],\qquad [x,ry]-r[x,y].
$$

商での像を $x\otimes y$ と書く。任意の双線形写像は基底記号の像を指定して自由加群上の線形写像を作り、上の関係を零に送るので商へ降りる。商は純テンソルの有限和で生成されるため、この延長は一意である。以下ではこの普遍性を利用して純テンソル上の式から線形写像を作る。自由加群 $R^a,R^b$ の場合は基底の組のテンソルが基底になる。実際、双線形写像から座標積を並べた $R^{ab}$ への写像が得られ、逆写像は各標準基底を対応する純テンソルに送る。両合成は生成元上で恒等写像になる。

## 2. 位置の番号を足す

複体から微分を一旦忘れ、次数ごとの加群だけを考える。二つの次数 $p,q$ の入力を組み合わせるとき、出力の次数を $p+q$ にする。負の次数があっても同じ規則を採用する。

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
**定義の確認**。$V^{-1}=Re$、$V^2=Ru$ とし他を零とする。$ae+bu$ の分解は自由加群の座標の一意性による。$e$ は次数 $-1$、$u$ は次数2であり、両係数が非零なら和は斉次ではない。零元はどの成分にも属するので、以下の符号式では零元の所属次数を入力の成分から指定する。
<!-- definition-example-end -->

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
**定義の確認**。$V^{-1}=Re,V^2=Ru,W^0=Rv,W^3=Rw$ とし他を零とする。各成分のテンソル積は自由階数1で、次数 $-1,2,5$ の基底は順に $e\otimes v$、$(e\otimes w,u\otimes v)$、$u\otimes w$ になる。同じ次数2に由来の異なる二つの直和成分がある。どの元もこれらの有限線形結合で、次数別の分解は一意である。
<!-- definition-example-end -->

一般の無限個の非零成分がある場合でも、直和を取るため各元の計算は有限回で終わる。微分も有限和を有限和へ送る。直積を用いる別の全複体と混同しない。

## 3. 写像が次数を動かすときの規則

通常の線形写像は次数を混ぜることがある。ここでは全ての成分を一定量だけ移す写像を使う。微分はその量が1の例である。

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
**定義の確認**。$V^0=Re,V^1=Ru$ とし、$f(e)=2u,f(u)=0$ と置く。他の成分を零とすれば、次数0から1、次数1から零の次数2への線形写像で、次数1の条件を全成分で満たす。恒等写像は次数0であり、零写像は指定した任意の次数で扱える。
<!-- definition-example-end -->

二つの写像を同時に施す際、右の写像 $g$ を左の元 $x$ の向こうへ移すという順序を記録する。そこで $g$ の次数と $x$ の次数の積の偶奇を符号にする。

<a id="def-catb8-01-koszul-tensor-map"></a>

<!-- formal-statement-start -->
> **定義（Koszul符号付きテンソル写像）**
>
> 可換環上の整数次数付き加群の間の斉次写像 $f:V\to U$、$g:W\to T$ の次数をそれぞれ $a,b$ とする。$x\in V^p,y\in W^q$ に対し

$$
(f\otimes g)(x\otimes y)=(-1)^{bp}f(x)\otimes g(y)
$$

> で定まる写像を符号付きテンソル写像とする。次数は $a+b$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb8-01-koszul-tensor-map -->
**定義の確認**。$R=\mathbb Z$ とし、次数1の基底 $e$ と次数0の基底 $v$ を取る。$f(e)=u$（次数2）、$g(v)=w$（次数1）とする。両写像は次数1であり、式は $e\otimes v$ を $-u\otimes w$ に移す。入力の次数1から出力の次数3へ2増える。整数倍した入力にも同じ整数倍の出力が得られ、各成分で双線形、他の成分は零である。
<!-- definition-example-end -->

固定した $p,q$ 上で符号は定数なので式は双線形である。第1節の普遍性から各成分の線形写像を得る。出力の次数は $(p+a)+(q+b)=p+q+a+b$ なので、直和上で次数 $a+b$ の線形写像になる。斉次でない入力は次数別に分けてから計算する。

<a id="thm-catb8-01-interchange"></a>

<!-- formal-statement-start -->
> **定理（符号付き交換則）**
>
> 可換環上の整数次数付き加群の斉次写像 $f,g,h,k$ を取り、$hf$ と $kg$ が合成可能とする。第1、第2の入力に作用する写像の合成について

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

特に別々の因子に作用する二つの奇数次数写像は、順序を入れ替えると符号が反転する。例えば次数1の $f,g$ について

$$
(1\otimes g)(f\otimes1)=-(f\otimes g),
$$

$$
(f\otimes1)(1\otimes g)=f\otimes g.
$$

これは同じ因子に作用する写像一般が反可換だという主張ではない。

## 4. 二乗が零になる微分

二つの[余鎖複体](../CATB7-01/index.md#def-catb7-01-cochain-complex)の微分は次数1である。左側を微分する操作と右側を微分する操作を足す。前節の交換則により、交差項を相殺する形にできる。

<a id="thm-catb8-01-tensor-differential"></a>

<!-- formal-statement-start -->
> **定理（テンソル積複体の微分）**
>
> 可換環 $R$ 上の余鎖複体 $C,D$ について、次数付きテンソル積に次数1の線形写像 $\partial$ を

$$
\partial(x\otimes y)=d_Cx\otimes y+(-1)^p x\otimes d_Dy
\qquad(x\in C^p,\ y\in D^q)
$$

> で入れると $\partial^2=0$ となり、余鎖複体をなす。
<!-- formal-statement-end -->

見取り図：同じ側を二回微分する項は元の複体の条件から零になる。異なる側を微分する二項は、左の次数が一つ進むことによって反対の符号を持つ。

<!-- proof-start -->
### 証明

[符号付きテンソル写像](#def-catb8-01-koszul-tensor-map)により $\partial=d_C\otimes1+1\otimes d_D$ は線形である。各項は次数 $p+q+1$ に属する。第1項へ再び微分を作用させると

$$
\partial(d_Cx\otimes y)=d_C^2x\otimes y
+(-1)^{p+1}d_Cx\otimes d_Dy.
$$

第2項への作用は

$$
\partial((-1)^p x\otimes d_Dy)
=(-1)^p d_Cx\otimes d_Dy
+(-1)^{2p}x\otimes d_D^2y.
$$

$d_C^2=d_D^2=0$ であり、残りの係数は $(-1)^{p+1}+(-1)^p=0$ になる。純テンソル上で二乗が零になったため全体でも零である。
<!-- proof-end -->

具体例として整数上で $C^0=\mathbb Ze,C^1=\mathbb Zu,d_Ce=2u$、$D^0=\mathbb Zv,D^1=\mathbb Zw,d_Dv=3w$ とする。その他の次数と微分は零である。次数0,1,2の基底はそれぞれ $e\otimes v$、$(u\otimes v,e\otimes w)$、$u\otimes w$ である。

$$
\partial(e\otimes v)=2u\otimes v+3e\otimes w,
$$

$$
\partial(u\otimes v)=-3u\otimes w,\qquad
\partial(e\otimes w)=2u\otimes w.
$$

したがって行列は

$$
\begin{pmatrix}2\\3\end{pmatrix},\qquad
\begin{pmatrix}-3&2\end{pmatrix}
$$

であり、合成は $-6+6=0$ となる。右側の微分を常に正符号にすると第2の行列は $(3,2)$ となり、合成は12で零ではない。標数2の環では負符号が正符号と一致するが、同じ式は成立する。

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

これは $(f\otimes g)\partial(x\otimes y)$ と一致する。生成元上での一致から全体で余鎖写像条件が成立する。
<!-- proof-end -->

この命題は通常のテンソル積が複体の射にも作用できることを意味する。テンソル積が擬同型を常に保つとまでは主張していない。

## 5. 元を交換する場合にも符号が付く

[通常のテンソル積の対称性](../../CAT/CAT4-03/index.md#thm-cat4-03-tensor)では純テンソルの二因子を交換した。複体の微分と両立させるには、二つの元の次数を掛け合わせた符号を付ける。

<a id="def-catb8-01-graded-flip"></a>

<!-- formal-statement-start -->
> **定義（次数付き交換写像）**
>
> 可換環上の整数次数付き加群 $V,W$ の交換写像は

$$
\tau_{V,W}(x\otimes y)=(-1)^{pq}y\otimes x
\qquad(x\in V^p,\ y\in W^q)
$$

> で定まる次数0の線形写像とする。
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

> $V,W$ が余鎖複体である場合、交換写像は余鎖写像である。また三つの斉次因子を順に交換して一因子を他の二因子の向こうへ移す符号は、一度に二因子のブロックを越える符号に等しい。
<!-- formal-statement-end -->

見取り図：交換の往復は指数を二倍するので符号が消える。微分との両立では微分前後で片方の次数が1だけ増えることを追う。

<!-- proof-start -->
### 証明

固定した $p,q$ の成分では交換式は双線形なので第1節の普遍性から線形写像を与える。総次数を保ち、二度交換した符号は $(-1)^{pq+qp}=1$ だから逆写像を持つ。

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

$(p+1)q=pq+q$ かつ $p+p(q+1)=pq+2p$ なので係数が一致する。

三重テンソルの括弧は純テンソルを結び直す同型で省略する。この同型は第1節の普遍性を二回適用して構成され、逆も結び直しであり純テンソル上で両合成が恒等となる。次数 $p,q,r$ の因子について、左端を右端へ運ぶ符号は $(-1)^{pq}(-1)^{pr}=(-1)^{p(q+r)}$。右端を左端へ運ぶ符号は $(-1)^{qr}(-1)^{pr}=(-1)^{(p+q)r}$。いずれもブロックとの交換の符号と等しい。各式は純テンソルを生成元として全体へ延びる。
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

次数1の基底順を $(u\otimes v,e\otimes w)$ とすると列 $(4,5)^{\mathsf T}$ と行 $(-5,4)$ を得る。行列積は $-20+20=0$ である。
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
最初の符号は $(-1)^{2\cdot2}=1$、$f(x)$ の次数は1。次の符号は $(-1)^{1\cdot1}=-1$ なので左辺は $-hf(x)\otimes kg(y)$ となる。$kg$ の次数は3なので右のテンソル写像の符号は $(-1)^{3\cdot2}=1$ である。従って差は $-1$ であり、[符号付き交換則](#thm-catb8-01-interchange)の $(-1)^{1\cdot(-1)}=-1$ に一致する。最終的に左因子は次数 $2-1+3=4$、右因子は $-1+2+1=2$、合計6である。
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

$u\otimes w$ は整数上の自由生成元なので零になるのは $\epsilon_{p+1}=-\epsilon_p$ の場合に限る。任意の $p$ で必要である。$\epsilon_0=1$ から正方向へ交互、負方向へも $\epsilon_p=-\epsilon_{p+1}$ を繰り返して $\epsilon_p=(-1)^p$ を得る。この符号で十分であることは[テンソル積複体の微分](#thm-catb8-01-tensor-differential)の二乗零の計算で確認できる。
<!-- solution-end -->

### CATB8-01-B03 符号付き交換と微分

- Level: B

整数上で $C^1=\mathbb Ze,C^2=\mathbb Zu,d_Ce=u$、$D^1=\mathbb Zv,D^2=\mathbb Zw,d_Dv=2w$、他は零とする。$e\otimes v$ について、交換してから微分する場合と微分してから交換する場合の結果を比較せよ。

<!-- solution-start -->
[次数付き交換写像](#def-catb8-01-graded-flip)により $\tau(e\otimes v)=-v\otimes e$。交換後の微分を $\partial'$ と書くと

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
$4\cdot1=2\cdot2$、$6\cdot1=2\cdot3$ なので両者は[余鎖写像](../CATB7-01/index.md#def-catb7-01-cochain-map)。他の次数の条件は零である。写像の次数は0だからテンソル写像に余分な符号はない。次数0は $1\cdot1=1$、次数1は基底順を左の次数1、右の次数1の順に取れば $\operatorname{diag}(2,2)$、次数2は $2\cdot2=4$ となる。

元の微分行列は $(2,3)^{\mathsf T},(-3,2)$、終域の行列は $(4,6)^{\mathsf T},(-6,4)$。次数0から1では

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

次に各基底を次数 $i,j,k\in\{0,1\}$ の組 $b_{ijk}$ と書く。次数0の基底へ作用すると

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
