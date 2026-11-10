# CAT2-01 図式・錐・極限

## 1. 複数の射を同時に満たすには

これまでの[関手](../CAT1-06/index.md#def-cat1-06-functor)は一つの圏の対象と射を別の圏へ写し、[自然変換](../CAT1-07/index.md#def-cat1-07-natural-transformation)は二つの関手を矛盾なく結んだ。ここでは、いくつもの対象と射を一まとまりとして指定し、それらへ**同時に**射を送る方法を考える。

例えば集合 $A,B,C$ と写像 $p:A\to C$、$q:B\to C$ があるとする。集合 $N$ から $A,B$ への写像 $a:N\to A$、$b:N\to B$ を別々に選んだだけでは、$C$ での値が一致するとは限らない。両者が一組のデータであるためには

$$
p\circ a=q\circ b:N\longrightarrow C
$$

が必要である。この「指定された射のすべてと両立する」という条件を、図の形に依存しない言葉へ直したい。そこでまず、図の形そのものを小さい圏で記述する。

## 2. 添字圏と図式

**添字圏**とは、どの位置に対象があり、どの位置どうしを射で結ぶかを記録する小さい圏である。例えば対象 $0,1$ と非恒等射 $u:0\to1$ を持つ圏 $\mathcal J$ は、一本の矢印の形を記録する。この $\mathcal J$ を値域の圏 $\mathcal C$ へ送る関手を指定すれば、二対象 $D(0),D(1)$ と一本の射 $D(u)$ が選ばれる。これを**図式**と呼ぶ。

<a id="def-cat2-01-diagram"></a>

<!-- formal-statement-start -->
> **定義（小さい添字圏と図式）**
> $\mathcal J$ を小さい圏、$\mathcal C$ を圏とする。$\mathcal J$ を**添字圏**と呼び、共変関手 $D:\mathcal J\to\mathcal C$ を $\mathcal J$ 型の **図式** と呼ぶ。各 $j\in\operatorname{Ob}(\mathcal J)$ に対象 $D(j)$、各射 $u:i\to j$ に射 $D(u):D(i)\to D(j)$ を対応させ、恒等射と合成を保存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-01-diagram -->
**定義の確認**

**例：一本の矢印。** $\mathcal J$ を上の矢印圏、$\mathcal C=\mathbf{Set}$ とする。対象と非恒等射の値を次で定める。

$$
D(0)=\{0,1\},\quad D(1)=\{a,b\},\quad
D(u)(0)=D(u)(1)=a.
$$

恒等射には各集合の恒等写像を割り当てる。$\mathcal J$ で非恒等射を二本連続して合成することはない。残る合成は恒等射との合成だけであり、

$$
D(u)\circ1_{D(0)}=D(u)=1_{D(1)}\circ D(u)
$$

を満たす。したがって実際に図式となる。一般に、図式は「可換であることを願う射の寄せ集め」ではなく、**添字圏内で等しい合成は値域の圏でも等しくなる**関手である。
<!-- definition-example-end -->

射 $0\to2$、$1\to2$ を持ち、それ以外の非恒等射を持たない三対象の圏を選べば、先ほどの二本の写像 $p:A\to C$、$q:B\to C$ も一つの図式になる。以下、添字圏は小さいものに限定する。[小さい圏と局所小圏の区別](../CAT1-02/index.md#def-cat1-02-size)が重要で、$\mathcal C$ 自体が小さい必要はない。

## 3. 図式に整合する脚の族

一つの対象 $N$ から各 $D(j)$ へ射を送るとき、その射たちが $D(u)$ と両立することを要求する。$N$ から各対象への射を全部並べた族を**脚**と呼び、整合条件を満たす脚の集まりを錐と呼ぶ。

まず $N\in\mathcal C$ に対する**定値図式** $\Delta N:\mathcal J\to\mathcal C$ を、すべての対象 $j$ を $N$ に、すべての射 $u$ を $1_N$ に送る関手とする。$1_N\circ1_N=1_N$ なので関手の合成保存が成り立つ。ここで、各 $j$ で成分 $\lambda_j:N\to D(j)$ を持つ[自然変換の自然性](../CAT1-07/index.md#def-cat1-07-natural-transformation)は、まさしく $D(u)\lambda_i=\lambda_j$ になる。

<a id="def-cat2-01-cone"></a>

<!-- formal-statement-start -->
> **定義（定値図式と錐）**
> 小さい圏 $\mathcal J$、圏 $\mathcal C$、図式 $D:\mathcal J\to\mathcal C$、対象 $N\in\mathcal C$ に対して、**定値図式** $\Delta N$ は $j\mapsto N$、$u\mapsto1_N$ で定まる。**頂点 $N$ の $D$ への錐** は自然変換 $\lambda:\Delta N\Rightarrow D$ である。すなわち、脚 $\lambda_j:N\to D(j)$ が全ての射 $u:i\to j$ について

$$
D(u)\circ\lambda_i=\lambda_j
$$

> を満たす。$\mathcal J$ の対象が空なら脚の族も条件も空であり、任意の $N$ から空図式への錐がただ一つある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-01-cone -->
**定義の確認**

**定義の確認：一本の矢印への錐。** $D(0)=A$、$D(1)=B$、$D(u)=f:A\to B$ とする。頂点 $N$ の錐とは $a:N\to A$、$b:N\to B$ で $b=f\circ a$ を満たすもの。例えば $N=A$ なら $(1_A,f)$ は錐になる。実際、非恒等射 $u$ について $D(u)1_A=f=b$ であり、恒等射についても $1_Aa=a$、$1_Bb=b$ と確認できる。逆にどの $a:N\to A$ からも $b=f\circ a$ が一意に決まり、錐となる。

**例：二本の矢印への錐。** $A\overset p\to C\overset q\leftarrow B$ の形を持つ図式の錐は三つの脚 $a:N\to A$、$b:N\to B$、$c:N\to C$ で

$$
c=p\circ a=q\circ b
$$

を満たす。$c$ は $a,b$ から決まるが、任意の $a,b$ が使えるわけではない。これが冒頭の「二本の経路の値の一致」である。恒等射の条件はそれぞれの脚について自動的に成立する。
<!-- definition-example-end -->

異なる頂点から同じ図式へ錐を張ったとき、その間の射も考えられる。錐 $(N,\mu)$ から $(M,\nu)$ への射は、脚を保つ射 $h:N\to M$、つまり全ての $j$ で $\nu_j\circ h=\mu_j$ となるものとする。

<a id="def-cat2-01-cone-category"></a>

<!-- formal-statement-start -->
> **定義（錐の射と錐の圏）**
> 小さい $\mathcal J$ 上の図式 $D:\mathcal J\to\mathcal C$ について、**錐の圏** $\operatorname{Cone}(D)$ の対象は錐 $(N,\mu)$、射 $h:(N,\mu)\to(M,\nu)$ は $\mathcal C$ の射 $h:N\to M$ で、全ての $j\in\mathcal J$ に対し $\nu_jh=\mu_j$ を満たすものとする。恒等射と合成は $\mathcal C$ から受け継ぐ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-01-cone-category -->
**定義の確認**

**定義の確認。** $h:(N,\mu)\to(M,\nu)$ と $k:(M,\nu)\to(P,\rho)$ について、各 $j$ で $\rho_j(kh)=(\rho_jk)h=\nu_jh=\mu_j$。よって合成はまた錐の射である。恒等射も $\mu_j1_N=\mu_j$ だから錐の射となり、結合律と単位律は $\mathcal C$ のものを継承する。これで圏のすべての公理が確認できる。$\mathcal C$ が局所小なら、錐の射集合は $\operatorname{Hom}_{\mathcal C}(N,M)$ の部分集合なので局所小である。
<!-- definition-example-end -->

## 4. 極限：あらゆる錐を一意に受け止める

錐を作るだけなら頂点も脚も多数ありうる。そのうち一つの錐 $(L,\lambda)$ が**すべての錐を一意に経由させる**なら、そこに図式の必要な情報がまとまっている。その頂点を極限対象と呼ぶ。存在は一般には保証されず、「存在するときにどう特徴づけるか」という定義である。

<a id="def-cat2-01-limit"></a>

<!-- formal-statement-start -->
> **定義（図式の極限）**
> $\mathcal J$ を小さい圏、$\mathcal C$ を圏、$D:\mathcal J\to\mathcal C$ を図式とする。錐 $\lambda:\Delta L\Rightarrow D$ が **極限錐** であるとは、任意の錐 $\mu:\Delta N\Rightarrow D$ に対してただ一つの射 $h:N\to L$ が存在し、全ての $j\in\mathcal J$ で

$$
\lambda_j\circ h=\mu_j
$$

> となることである。このとき $L$ を $D$ の **極限対象** と呼び、存在する場合の一つを $\varprojlim_{j\in\mathcal J}D(j)$ または $\lim D$ と記す。これは[終対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)としての $\operatorname{Cone}(D)$ の終対象という条件と同じである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat2-01-limit -->
**定義の確認**

**定義の確認：一本の矢印の極限。** $D(0)=A$、$D(1)=B$、$D(u)=f:A\to B$ とする。頂点 $A$、脚 $\lambda_0=1_A$、$\lambda_1=f$ の錐は第3節で確認した。任意の錐 $(N,a,b)$ は $b=f a$ を満たすので $h=a:N\to A$ と置けば $1_Ah=a$、$fh=b$。逆にこの二等式を満たす $h'$ は第1式により $h'=a$ である。**存在と一意性の双方を検証**したので、この図式の極限は $A$ である。値域 $B$ でも射 $f$ の単射性も要求していない。
<!-- definition-example-end -->

### 空の図式と離散図式

空の添字圏ではどの $N$ からも錐がただ一つある。極限錐の条件は、どの $N$ にもただ一つの射 $N\to L$ があることと等しい。従って空図式の極限が存在することと、$\mathcal C$ に[終対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)が存在することは同値である。

また $\mathcal J$ を対象 $0,1$ と恒等射だけを持つ離散圏とすると、図式は対象 $A=D(0)$、$B=D(1)$ を選ぶことと同じである。頂点 $N$ の錐は、整合条件を課されない任意の二射 $N\to A$、$N\to B$。例えば $\mathcal C=\mathbf{Set}$ なら $L=A\times B$ を選び、射影 $\pi_A,\pi_B$ を脚にする。任意の $a:N\to A$、$b:N\to B$ に対して

$$
\langle a,b\rangle:N\to A\times B,
\qquad x\longmapsto(a(x),b(x))
$$

は $\pi_A\langle a,b\rangle=a$、$\pi_B\langle a,b\rangle=b$ を満たす。これを満たす別の写像 $h$ は各 $x\in N$ で第1成分 $a(x)$、第2成分 $b(x)$ と定まるので $h=\langle a,b\rangle$。したがって二対象離散図式の集合での極限は直積集合である。抽象的な積の構成は CAT2-02 で扱う。

### 存在しない図式もある

対象が偶数個の元を持つ非空有限集合 $E_{2n}=\{1,\ldots,2n\}$（$n\ge1$）、射がそれらの間のすべての写像である小さい圏 $\mathcal E$ を考える。空図式への錐は各対象から一つずつあるが、空図式の極限が存在するなら終対象 $T=E_{2m}$ が必要になる。しかし $E_2$ から $T$ への定値写像は $T$ の各元を選んで少なくとも二つあるから、終対象の射の一意性が壊れる。この圏では空図式に極限が**存在しない**。圏が小さいことは極限の存在を保証しない。

## 5. 極限錐は同型まで一意である

極限対象は記号 $\lim D$ で書いても、選んだ対象が文字どおり同一であることまでは要求しない。普遍性から導けるのは**一意な同型**である。

<a id="thm-cat2-01-limit-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（極限錐の一意性）**
> 小さい圏 $\mathcal J$、圏 $\mathcal C$ と図式 $D:\mathcal J\to\mathcal C$ に対し、$(L,\lambda)$ と $(L',\lambda')$ がともに極限錐なら、ただ一つの同型射 $u:L\to L'$ が存在し、次を満たす。

$$
\lambda'_j\circ u=\lambda_j\qquad(j\in\operatorname{Ob}(\mathcal J)).
$$

> その逆 $v:L'\to L$ も全ての脚を保つ。従って極限は錐として一意な同型を除いて一意である。
<!-- formal-statement-end -->

### 証明の見取り図

極限の普遍性を**互いの錐に一回ずつ**適用して $u,v$ を作る。合成 $vu$ は $(L,\lambda)$ から自分自身への脚を保つ射であり、恒等射も同じ条件を満たす。唯一性で合成が恒等射になる。

<!-- proof-start -->
### 証明

$(L',\lambda')$ が極限錐なので、錐 $(L,\lambda)$ に対してただ一つの射 $u:L\to L'$ があり、各 $j$ で $\lambda'_ju=\lambda_j$。同じく $(L,\lambda)$ が極限錐なのでただ一つの射 $v:L'\to L$ があり、$\lambda_jv=\lambda'_j$。

任意の $j$ で

$$
\lambda_j(vu)=(\lambda_jv)u=\lambda'_ju=\lambda_j.
$$

従って $vu:L\to L$ は錐 $(L,\lambda)$ から極限錐 $(L,\lambda)$ への脚を保つ射。一方 $\lambda_j1_L=\lambda_j$ でもある。[極限の定義](#def-cat2-01-limit)の一意性を同じ頂点 $N=L$ に適用すると $vu=1_L$。逆向きも

$$
\lambda'_j(uv)=(\lambda'_ju)v=\lambda_jv=\lambda'_j
$$

なので $uv=1_{L'}$。ゆえに $u$ は逆 $v$ を持つ[同型射](../CAT1-03/index.md#def-cat1-03-isomorphism)である。さらに全ての脚を保つ $L\to L'$ の射は最初の極限条件によってただ一つなので、同型 $u$ の一意性も従う。$\square$
<!-- proof-end -->

普遍性をHom集合で言い換えると、次の命題が得られる。各 $N$ から図式へ送る錐の集まりを $\operatorname{Cone}_D(N)$ と書く。$\mathcal J$ が小さく $\mathcal C$ が局所小であれば

$$
\operatorname{Cone}_D(N)=\operatorname{Nat}(\Delta N,D)
$$

は集合となる。実際、各脚は集合 $\operatorname{Hom}_{\mathcal C}(N,D(j))$ の元であり、錐はそれらの小さい添字の直積のうち整合条件を満たす部分集合だからである。射 $t:M\to N$ は錐 $\mu$ を $\mu_jt$ へ送るので、$N\mapsto\operatorname{Cone}_D(N)$ は反変集合値関手となる。これは第10講で学んだ[反変表現可能関手](../CAT1-10/index.md#def-cat1-10-contra-representable)と比較できる。

<a id="prop-cat2-01-limit-representable"></a>

<!-- formal-statement-start -->
> **命題（錐関手の表現可能性と極限）**
> $\mathcal J$ を小さい圏、$\mathcal C$ を局所小圏、$D:\mathcal J\to\mathcal C$ を図式とする。錐 $\lambda:\Delta L\Rightarrow D$ が極限錐であることと、各 $N\in\mathcal C$ に対して

$$
\Phi_N:\operatorname{Hom}_{\mathcal C}(N,L)
\longrightarrow\operatorname{Nat}(\Delta N,D),
\qquad h\longmapsto(\lambda_jh)_{j\in\mathcal J}
$$

> が全単射であることは同値である。さらに $\Phi_N$ は $N$ に関して自然であり、$\operatorname{Cone}_D:\mathcal C^{\mathrm{op}}\to\mathbf{Set}$ が $L$ によって表現されることと同値である。
<!-- formal-statement-end -->

### 証明の見取り図

極限の存在一意条件を、$N\to L$ と頂点 $N$ の錐との一対一対応に書き換える。自然性は射 $t:M\to N$ を前合成して検査する。表現可能性の逆向きでは、$1_L$ が対応する錐を選ぶ。

<!-- proof-start -->
### 証明

まず $h:N\to L$ に対して $\lambda_jh$ が錐となることを確認する。$u:i\to j$ なら

$$
D(u)(\lambda_i h)=(D(u)\lambda_i)h=\lambda_jh,
$$

なので $\Phi_N$ はwell-definedである。$\lambda$ が極限錐なら、任意の錐 $\mu$ に対し唯一の $h$ が $\lambda_jh=\mu_j$ を満たす。これは $\Phi_N$ の全射性と単射性を同時に意味する。逆にすべての $\Phi_N$ が全単射なら、任意の錐 $\mu$ は唯一の逆像 $h=\Phi_N^{-1}(\mu)$ を持ち、極限の普遍性になる。

射 $t:M\to N$ に対して、Hom関手側では $h\mapsto h t$、錐側では $\mu\mapsto(\mu_j t)_j$ である。実際、

$$
\Phi_M(h t)=(\lambda_j(h t))_j=((\lambda_j h)t)_j
=\operatorname{Cone}_D(t)(\Phi_N(h)),
$$

となり、自然性が成立する。最後に、反変関手 $\operatorname{Cone}_D$ が何らかの $L$ で自然同型 $\operatorname{Hom}(-,L)\cong\operatorname{Cone}_D$ を持つなら、その同型で $1_L$ に対応する錐を $\lambda$ と置く。自然性を $h:N\to L$ に適用すると $h$ の像は $\operatorname{Cone}_D(h)(\lambda)=(\lambda_jh)_j$。したがって上の $\Phi_N$ と一致し、全単射性により $\lambda$ は極限錐である。逆向きは既に示した $\Phi$ がその自然同型を与える。$\square$
<!-- proof-end -->

この見方では、極限対象は「その対象へ入る射」が「図式への整合する脚の族」と同じデータになる対象である。CAT1-12の[表現対象と自然同型の対応](../CAT1-12/index.md#cor-cat1-12-representable-iso)と同じ発想だが、ここでは錐関手を作ることで新しい普遍性を得た。

## 6. 演習：図式を読み、普遍性を検証する

### CAT2-01-A01 一本の矢印の錐を列挙する

- Level: A

$D(0)=\{0,1\}$、$D(1)=\{a,b\}$、$D(u)(0)=D(u)(1)=a$ とする。頂点 $N=\{*\}$ の錐を全て列挙せよ。脚の整合条件と恒等射での条件を確認せよ。

<!-- solution-start -->
**詳細解答**。脚 $\mu_0:N\to D(0)$ は $\mu_0(*)=0$ または $1$ の二通り。射 $u$ の整合条件は $D(u)\mu_0=\mu_1$ なので、いずれでも $\mu_1(*)=a$ に限られる。したがって錐は $(0,a)$ と $(1,a)$ の二つである。$\mu_1(*)=b$ は条件に反する。恒等射では $D(1_0)\mu_0=1_{D(0)}\mu_0=\mu_0$、$D(1_1)\mu_1=\mu_1$ が成立するから、全ての添字圏の射について条件を確認した。
<!-- solution-end -->

### CAT2-01-A02 離散図式の脚

- Level: A

二対象離散圏 $\mathcal J$、集合 $A=\{0,1\}$、$B=\{x,y,z\}$、頂点 $N=\{*\}$ を取る。錐の個数と具体的な脚を記し、二つの脚の間に整合等式を追加しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$N\to A$ は $*$ の行き先により二通り、$N\to B$ は三通り。従って錐は $(0,x),(0,y),(0,z),(1,x),(1,y),(1,z)$ の六つ。添字圏の射は恒等射だけなので、自然性は $1_Aa=a$、$1_Bb=b$ の二条件だけで、二つの脚を結ぶ非恒等射がない。ゆえに六通りの全てが錐である。
<!-- solution-end -->

### CAT2-01-A03 二本の矢印の整合条件

- Level: A

$A=B=\{0,1\}$、$C=\{0,1\}$ とし、$p:A\to C$ を恒等写像、$q:B\to C$ を $q(0)=q(1)=0$ とする。頂点 $N=\{*\}$ からの錐を全て求めよ。

<!-- solution-start -->
**詳細解答**。脚を $a(* )=s\in A$、$b(*)=t\in B$、$c(*)=r\in C$ と置く。二本の矢印に関する自然性は $r=p(s)=s$ と $r=q(t)=0$。従って $s=r=0$、$t\in\{0,1\}$ は任意であり、$(a(*),b(*),c(*))=(0,0,0),(0,1,0)$ の二つ。恒等射での条件は自明に成立し、これ以外の射はないので列挙は尽くされている。
<!-- solution-end -->

### CAT2-01-A04 錐の射を合成する

- Level: A

同一図式 $D$ への錐 $(N,\mu),(M,\nu),(P,\rho)$ と錐の射 $h:N\to M$、$k:M\to P$ を取る。$kh$ が錐の射であることを脚の式で確かめ、逆向き $hk$ を無条件に書けない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。錐の射という仮定は各 $j$ で $\nu_jh=\mu_j$、$\rho_jk=\nu_j$。従って $\rho_j(kh)=(\rho_jk)h=\nu_jh=\mu_j$ であり、$kh:N\to P$ は錐の射である。一方 $h:N\to M$ の定義域は $N$、$k:M\to P$ の値域は $P$ で、一般に $hk$ の合成には必要な型 $P=N$ がない。合成順序は頂点間の射の型から決める。
<!-- solution-end -->

### CAT2-01-A05 空図式の極限

- Level: A

空の添字圏 $\varnothing$ から $\mathbf{Set}$ への図式の極限を一つ挙げ、全ての集合 $N$ に対する極限の存在一意条件を検証せよ。

<!-- solution-start -->
**詳細解答**。一元集合 $L=\{*\}$ を選ぶ。空図式への脚は空族で、どの $N$ からもただ一つの錐がある。任意の $N$ から $L$ へは $h(n)=*$ という写像がただ一つある。脚との可換条件は空なので自動的に成立する。空集合 $N=\varnothing$ からも空写像がただ一つ存在する。従って全ての頂点の錐がただ一つ $L$ を経由する。
<!-- solution-end -->

### CAT2-01-B01 一本の矢印の極限を普遍性から再構成する

- Level: B

圏 $\mathcal C$ の任意の射 $f:A\to B$ を一本の矢印図式とみなす。$A$ がその極限対象となることを、存在・一意性を分けて証明せよ。$f$ が同型射であるという仮定を使わないことも説明せよ。

<!-- solution-start -->
**詳細解答**。$(A,1_A,f)$ は $f1_A=f$ により錐。任意の錐 $(N,a,b)$ には $fa=b$ が必要である。存在は $h=a:N\to A$ と取ることで、$1_Ah=a$、$fh=fa=b$ を同時に満たす。一意性は、別の $h'$ が脚を保存すれば $1_Ah'=a$、よって $h'=a=h$ となることから従う。この論証では $f$ に逆射を作っておらず、使用したのは合成と恒等射のみなので任意の $f$ に成り立つ。
<!-- solution-end -->

### CAT2-01-B02 二つの極限の間の唯一の同型

- Level: B

図式 $D$ の二つの極限錐 $(L,\lambda)$、$(M,\nu)$ を取る。$u:L\to M$、$v:M\to L$ を普遍性から構成し、$uv$ と $vu$ を計算して互いに逆射であることを示せ。なぜ $L=M$ と主張できないのかも述べよ。

<!-- solution-start -->
**詳細解答**。$(M,\nu)$ の普遍性を $(L,\lambda)$ に適用し、唯一の $u$ を $\nu_ju=\lambda_j$ で定義する。同様に $(L,\lambda)$ の普遍性から $\lambda_jv=\nu_j$ となる $v$ を得る。$\lambda_jvu=\nu_ju=\lambda_j$ と $\lambda_j1_L=\lambda_j$ は共に $(L,\lambda)$ への脚保存条件なので一意性より $vu=1_L$。$\nu_juv=\lambda_jv=\nu_j$ から $uv=1_M$。従って $u,v$ は逆同型射。定義は対象を同じ元として同定するのではなく、二つの対象の間の射の存在一意を述べるものなので等号 $L=M$ は結論できない。
<!-- solution-end -->

### CAT2-01-B03 錐関手の自然性を型付きで調べる

- Level: B

$\mathcal C$ を局所小、$\mathcal J$ を小さい圏とし、図式 $D$ の極限錐 $(L,\lambda)$ を取る。射 $t:M\to N$、$h:N\to L$ に対し、$\Phi_M(ht)=\operatorname{Cone}_D(t)(\Phi_N(h))$ を証明し、双方の型を記せ。

<!-- solution-start -->
**詳細解答**。$\Phi_N(h)$ は頂点 $N$ の錐 $(\lambda_jh)_j$ であり、$\operatorname{Cone}_D(t)$ は各脚を $t$ で前合成して頂点 $M$ の錐を作る。よって右辺は $((\lambda_jh)t)_j$。左辺は $ht:M\to L$ を入れた $\Phi_M$ の値だから $(\lambda_j(ht))_j$。$\mathcal C$ の合成の結合律で両者は成分ごとに一致し、いずれも $\operatorname{Nat}(\Delta M,D)$ の元である。$\mathcal C$ の局所小性と $\mathcal J$ の小ささにより両辺は集合間の写像として扱える。
<!-- solution-end -->

### CAT2-01-B04 極限が存在しない理由を突き止める

- Level: B

対象 $E_{2n}$（$n\ge1$）、射が集合間の全ての写像である第4節の圏 $\mathcal E$ で、空図式に極限が存在しないことを示せ。単に候補の個数を比較せず、普遍性のどの量化・一意性が失敗するかを明記せよ。

<!-- solution-start -->
**詳細解答**。空の図式では全対象 $N$ に錐がただ一つあり、仮に極限 $L=E_{2m}$ があれば、各 $N$ から $L$ へは**ただ一つ**の射が必要である。

そこで $N=E_2$ とする。$|L|=2m\ge2$ だから異なる二元 $s,t\in L$ を選べる。このとき二つの定値写像

$$
c_s:E_2\to L,\quad x\mapsto s,
\qquad c_t:E_2\to L,\quad x\mapsto t
$$

は $c_s\ne c_t$ である。どちらも空の脚との整合条件を満たすため、$N=E_2$ における一意性が破れる。いかなる候補 $L$ も極限になれない。図式や錐そのものが作れないのではない。
<!-- solution-end -->

### CAT2-01-C01 半順序圏での図式・錐・極限を一度に判定する

- Level: C

有限半順序集合 $P=\{0,a,b,1\}$ を $0<a<1$、$0<b<1$、$a,b$ は比較不能として圏とみなす。添字圏 $\mathcal J$ は二対象離散圏とし、$D(0)=a$、$D(1)=b$ とする。

1. 頂点 $x\in P$ が錐を持つための必要十分条件を求め、全頂点の錐を列挙せよ。
2. 極限の候補を決め、任意の錐がその候補を一意に経由することを証明せよ。
3. $P'=\{a,b,1\}$（誘導された順序）へ値域を変えたとき、同じ図式に極限が存在するか判定し、失敗する条件を説明せよ。
4. $\operatorname{Hom}_P(x,L)\cong\operatorname{Nat}(\Delta x,D)$ を各 $x$ について個数で照合せよ。

<!-- solution-start -->
**詳細解答**。

**1. 錐の列挙。** [半順序集合の圏](../CAT1-02/index.md#prop-cat1-02-order-category)では射 $x\to y$ が存在するのは $x\le y$ の場合で、その射は高々一つ。$\mathcal J$ は離散なので、頂点 $x$ の錐の存在条件は

$$
x\le a\quad\text{かつ}\quad x\le b
$$

である。$P$ の各元を調べると $x=0$ だけが両条件を満たす。一方、

$$
a\nleq b,\qquad b\nleq a,\qquad1\nleq a
$$

なので $x=a,b,1$ には錐がない。$0$ の錐は二つの順序射からなるただ一つである。

**2. 普遍性。** $L=0$ とし、脚を唯一の $0\to a$、$0\to b$ とする。錐を持つ任意の頂点 $x$ は1の結果から $x=0$ であり、$x\to L=0$ は恒等射ただ一つ。その射を脚と合成すると元の二脚になる。従って極限は $0$。これは二対象 $a,b$ の下界のうち最大のもの（この場合唯一のもの）が極限になるという事実を具体化している。

**3. 存在失敗。** $P'$ では $a,b$ の共通下界がないので、どの $x\in P'$ からも二つの脚を同時には作れない。極限はそれ自体が錐でなければならないので、候補 $L$ が存在しない。2の論証で使った「まず錐 $(0,\lambda)$ を作る」段階が成立しなくなる。

**4. Homとの照合。** $L=0$ に対して $\operatorname{Hom}_P(0,0)$ は恒等射だけの一元集合で、$\operatorname{Nat}(\Delta0,D)$ も1の唯一の錐からなる一元集合。$x=a,b,1$ では $\operatorname{Hom}_P(x,0)=\varnothing$ であり、錐も存在しないから右辺も空集合である。すべての $x$ で全単射があり、[錐関手の表現可能性による判定](#prop-cat2-01-limit-representable)と一致する。$\square$
<!-- solution-end -->

## 7. 終対象と積へ

図式を選べば、錐はその形に沿った整合条件で定まる。極限はその整合条件を、任意の頂点からの射の一意な対応として実現する対象であり、存在するとき錐として一意な同型を除いて決まる。次の CAT2-02 では、空図式と離散図式から現れた**終対象と積**を一般の圏で構成し、有限積の仕組みを詳しく調べる。
