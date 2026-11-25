# FML2 抽象代数学の形式化

前提：[FML1](../FML1/index.md)、[RNG1 環・体・環準同型](../../../代数系/RNG/RNG1/index.md)、[FLD0 体上の線形代数](../../../代数系/FLD/FLD0/index.md)、[FLD1 体拡大](../../../代数系/FLD/FLD1/index.md)、[FLD3 有限体](../../../代数系/FLD/FLD3/index.md)。

前講では自然数値の有限和を形式化しました。しかし、整数で成り立つ計算を[有限体](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field)でもそのまま使えるとは限りません。例えば整数では $1+1=2$ ですが、[商環](../../../代数系/RNG/RNG1/index.md#def-rng1-quotient-ring) $\mathbb Z/2\mathbb Z$ では $1+1=0$ です。Lean の `ZMod m` は正整数 $m$ を法とする剰余類の環を表し、整数の代表元で加法・乗法を行ってから余りを取ります。Lean では、どの集合の上で何の演算を使い、どの法則を仮定したかを型に記録します。本講では同じ式を異なる代数構造で読み、必要な仮定を特定する練習をします。

## 1. 型クラスと演算の仮定

[環・可換環の条件](../../../代数系/RNG/RNG1/index.md#def-rng1-ring)を思い出しましょう。加法は可換群を作り、乗法は結合的で加法に分配します。Mathlib の `Ring` はさらに乗法の単位元を含みます。単なる型 `R` だけでは、足し算さえ指定されません。型と、その型に備わる演算と法則を分離するのが型クラスです。具体的な型について演算と法則の証明をまとめたものをインスタンスと呼びます。例えば整数の通常の演算をまとめたものが整数の環インスタンスです。乗法まで可換なら可換環、さらに $0\ne1$ で非零元の乗法逆元があれば [体](../../../代数系/RNG/RNG1/index.md#def-rng1-zero-divisor-domain-field) です。Lean の `R : Type*` は R が型であることを指定し、型の階層を推論させる記法です。角括弧 `[Ring R]` は型 R の環インスタンスを探索して引数に補うことを指示します。

<a id="def-fml2-structure"></a>

<!-- formal-statement-start -->
### 定義（Leanの代数構造インスタンス）

型 `R` に対する `Ring R` は、加法、零元、加法逆元、乗法、単位元と、それらの環の法則を備える Mathlib の型クラスである。`CommRing R` はさらに乗法の可換性を備える。`Field R` は可換環に加えて零元と単位元が異なること、非零元が乗法逆元を持つことなどを備える。Lean の引数 `[Ring R]` はそのインスタンスを受け取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-structure -->
**定義の確認**　整数全体では通常の加法・乗法、0、1、符号反転を採用します。整数の和と積は整数、加法の逆元は整数、各演算は結合的で、加法と乗法は可換、分配法則も成立します。0と1がそれぞれの単位元なので CommRing の例です。しかし2の乗法逆元は整数ではありません。対して有理数では分母が非零の整数である分数を使います。任意の有理数 $m/n,p/q$（$n,q\ne0$）について和と積は

$$
\frac{m}{n}+\frac{p}{q}=\frac{mq+pn}{nq},
\qquad
\frac{m}{n}\frac{p}{q}=\frac{mp}{nq}
$$

となり、$nq\ne0$ なので有理数に閉じています。これらの演算は整数の結合法則・可換法則・分配法則を受け継ぎ、零元は $0/1$、単位元は $1/1$、加法逆元は $-m/n$ です。零元と単位元は異なります。非零の分数では $m\ne0$ なので $n/m$ も有理数で、積は $mn/(nm)=1$ です。従って有理数は Field の条件を満たします。
<!-- definition-example-end -->

型の階層については第3節で詳しく扱います。以下のコードでは `a b c : R` が型 R の3つの元、コロンの後の等式が証明する命題です。

~~~lean
example (R : Type*) [Ring R] (a b c : R) :
    (a + b) * c = a * c + b * c := by
  exact add_mul a b c
~~~

この式では可換性も除法も使いません。逆に、体の条件を使う場面を次に確認します。

<a id="prop-fml2-cancel"></a>

<!-- formal-statement-start -->
### 命題（Leanでの非零係数の消去）

体 $K$ と元 $a,b,c\in K$ に対し、$a\ne0$ かつ $ab=ac$ なら $b=c$ である。
<!-- formal-statement-end -->

見取り図：係数の逆元を左から掛け、結合法則で括弧を移し、逆元の法則を使います。

<!-- proof-start -->
### 証明

$a\ne0$ より [体の条件](../../../代数系/RNG/RNG1/index.md#def-rng1-zero-divisor-domain-field) から $a^{-1}a=1$ である。仮定の等式に左から $a^{-1}$ を掛けると

$$
a^{-1}(ab)=a^{-1}(ac).
$$

結合法則により

$$
(a^{-1}a)b=(a^{-1}a)c.
$$

逆元の条件を代入すれば $1b=1c$ となり、単位元の法則により $b=c$ である。
<!-- proof-end -->

~~~lean
theorem cancel_nonzero (K : Type*) [Field K] (a b c : K)
    (ha : a ≠ 0) (h : a * b = a * c) : b = c := by
  have h' := congrArg (fun x : K => a⁻¹ * x) h
  simpa [← mul_assoc, inv_mul_cancel₀ ha] using h'
~~~

congrArg は等式の両辺へ同じ関数を適用します。simp は括弧の移動、逆元と単位元の計算を行います。$a=0$ なら $0\cdot1=0\cdot2$ でも有理数の1と2は異なります。また4を法とする剰余類では $2\cdot1=2\cdot3=2$ ですが1と3は異なり、非零の2に逆元がありません。単に Ring と仮定するだけでは、この証明はできません。

## 2. 標数と型変換

数値リテラルの 2 は、どの型の値かによって意味が変わります。ここで Lean の `Nat`（`ℕ`）は0を含む非負整数の型です（紙上では $\mathbb N_0$ と書きます）。環 $R$ の単位元 $1_R$ を $n$ 回足した元を $c(n)$ と書きます。$n=0$ のときは零元 $0_R$ です。Mathlib では `n : ℕ` に対し `(n : R)` と明示できます。これは型変換（coercion）の一例です。数値リテラル `(2 : R)` もこの環の元 $c(2)=1_R+1_R$ を表します。

<a id="def-fml2-cast"></a>

<!-- formal-statement-start -->
### 定義（Leanの自然数の環への型変換）

単位元を持つ環 $R$ への非負整数 $n$（Lean の自然数）の型変換 `(n : R)` は、0を零元へ送り、後続の自然数を単位元の加算によって送る写像である。すなわち $c(0)=0_R$、$c(n+1)=c(n)+1_R$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-cast -->
**定義の確認**　$R$ を2を法とする剰余類の環 ZMod 2 とすると、零元は0、単位元は1です。$c(0)=0$、$c(1)=0+1=1$、$c(2)=1+1=0$、$c(3)=0+1=1$ と、再帰条件を順に確認できます。一方、有理数では $c(2)=1+1=2$ です。自然数の2自体が0になったわけではなく、像が異なります。
<!-- definition-example-end -->

この違いを測る数が[標数](../../../代数系/FLD/FLD3/index.md#def-fld3-characteristic-prime-field-finite-field)です。FLD3 では体の標数を定義しましたが、単位元を持つ環にも同じ定義を適用できます。正の自然数 p が初めて零元へ写るなら標数 p、正の自然数が一つも零元へ写らないなら標数0です。Lean では非負整数の像が消える条件を型クラスに記録します。以下の $p\mid n$ は非負整数 $k$ が存在して $n=pk$ となること（整除）を表します。特に $0\mid n$ と $n=0$ は同値です。

<a id="def-fml2-charp"></a>

<!-- formal-statement-start -->
### 定義（Leanの標数の型クラス）

単位元を持つ環 $R$ と非負整数 $p$ に対する `CharP R p` は、すべての非負整数 $n$ について

$$
c(n)=0_R\quad\Longleftrightarrow\quad p\mid n
$$

が成立することを記録する型クラスである。ここで c(n) は自然数 n の R への型変換である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-charp -->
**定義の確認**　ZMod 2 では任意の自然数 n を2で割った余りがその像です。任意の $n\in\mathbb N_0$ を $n=2q+r$（$q\in\mathbb N_0$、$r=0$ または $1$）と書けば、$c(n)=q(1+1)+r\cdot1=r$ です。従って $c(n)=0$ であることは $r=0$、すなわち $2\mid n$ と同値なので `CharP (ZMod 2) 2` の条件を満たします。有理数では自然数 n の像 n/1 が0であるのは n=0 の場合に限られます。0が n を割り切る条件も n=0 なので CharP ℚ 0 に対応します。
<!-- definition-example-end -->

$p>0$ の場合、正の倍数で最小のものは $p$ 自身です。逆に通常の標数が $p>0$ なら、$n=pq+r$（$0\le r<p$）と割り算して

$$
c(n)=q\,c(p)+c(r)=c(r)
$$

を得ます。ここで $q\,c(p)$ は $c(p)$ を $q$ 回加える意味で、型変換の再帰条件からこの式が従います。標数の最小性により $0<r<p$ では $c(r)\ne0$ なので、$c(n)=0$ と $r=0$ は同値です。標数0の場合も、正の $n$ の像は零にならず $0\mid n$ と $n=0$ は同値です。従って [自然数の環への型変換](#def-fml2-cast) の再帰条件によって、通常の標数の定義とこの型クラスの条件が対応します。

~~~lean
example : CharP (ZMod 2) 2 := inferInstance
example : (2 : ZMod 2) = 0 := by decide
example : (1 : ZMod 2) ≠ 0 := by decide
example : (2 : ℚ) ≠ 0 := by norm_num
~~~

環の標数によって、多項式の等式の真偽も変わります。以下では $x^2=xx$ と書きます。

<a id="thm-fml2-square"></a>

<!-- formal-statement-start -->
### 定理（標数2での二乗の形式化）

単位元を持つ可換環 $R$ で自然数2の像が0なら、任意の $x,y\in R$ に対し

$$
(x+y)^2=x^2+y^2
$$

が成り立つ。
<!-- formal-statement-end -->

見取り図：分配法則で4項に展開し、乗法の可換性により中央の2項をまとめます。

<!-- proof-start -->
### 証明

分配法則を2回使うと

$$
(x+y)(x+y)=xx+xy+yx+yy.
$$

ここで $yx=xy$ と置き換える。[環の加法と乗法の条件](../../../代数系/RNG/RNG1/index.md#def-rng1-ring) では加法は可換群であるから、項の順序を変えて括弧を移すと

$$
xx+xy+yx+yy=x^2+y^2+(xy+xy).
$$

まず $xy+xy=1(xy)+1(xy)$ である。[環の分配法則](../../../代数系/RNG/RNG1/index.md#def-rng1-ring) の右辺を左辺へ戻すと $(1+1)(xy)=2xy$ を得る。仮定で2の像は0なので

$$
x^2+y^2+2xy=x^2+y^2+0=x^2+y^2.
$$
<!-- proof-end -->

~~~lean
theorem char_two_square (R : Type*) [CommRing R] (h : (2 : R) = 0)
    (x y : R) : (x + y)^2 = x^2 + y^2 := by
  calc
    (x + y)^2 = x^2 + y^2 + (2 : R) * (x * y) := by ring
    _ = x^2 + y^2 := by rw [h, zero_mul, add_zero]
~~~

定理の仮定は CharP R 2 よりも弱く、2の像が0という等式だけです。例えば零環（0と1が等しい環）でも式は成立します。非自明な環で2の像が0なら、1の像は非零なので標数は2です。

有理数で x=y=1 とすると左辺4、右辺2で一致しません。展開自体は成立し、最後の $2xy=0$ だけが成立しないことが失敗の理由です。

## 3. 環準同型と universe

異なる環の間で式を移すには、単なる関数ではなく [環準同型](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism) が必要です。RNG1 の環準同型は単位元を保存することを必須としませんが、Mathlib の `R →+* S` は零元、単位元、加法、乗法を保存する写像を表します。具体的には任意の $a,b\in R$ に対し

$$
f(0_R)=0_S,\qquad f(1_R)=1_S,
$$

$$
f(a+b)=f(a)+f(b),\qquad f(ab)=f(a)f(b)
$$

が成立します。Lean の `f x` は紙上の $f(x)$ に当たり、準同型を関数として扱う型変換が働きます。値を暗黙に同一視するのではなく、写像 f によって値を送ります。

<a id="prop-fml2-map"></a>

<!-- formal-statement-start -->
### 命題（環準同型による和の二乗の移送）

単位元を持つ環 $R,S$ と単位元を保存する環準同型 $f:R\to S$、任意の $x,y\in R$ に対して

$$
f((x+y)^2)=(f(x)+f(y))^2
$$

が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

乗法の保存条件を $x+y$ と $x+y$ に適用して

$$
f((x+y)(x+y))=f(x+y)f(x+y)
$$

を得る。加法の保存条件は $f(x+y)=f(x)+f(y)$ であるから、右辺の二つの因子に代入する。積を二乗で書けば結論となる。
<!-- proof-end -->

整数から有理数への標準的な写像 $f(n)=n/1$ では、$f(0)=0/1$、$f(1)=1/1$ で、任意の整数 $a,b$ について $f(a+b)=(a+b)/1=a/1+b/1$、$f(ab)=ab/1=(a/1)(b/1)$ となり4条件を満たします。$x=2,y=3$ のとき、左辺は $f((2+3)^2)=25/1$、右辺は $(2/1+3/1)^2=25/1$ です。加法保存だけでは足りません。例えば整数を整数へ送る $g(n)=2n$ は加法を保存しますが $g(1\cdot1)=2$、$g(1)g(1)=4$ と乗法を保存しません。

型が属する階層を universe と呼びます。Type u と Type v は階層を指定する型であり、u と v は独立したレベル変数です。Type u 自体は Type (u+1) に属します。Type* はレベルを推論させる記法です。同じ階層にあることは同じ型であることを意味しません。例えば Nat と Int はともに Type に属しますが、別の型です。次の Lean の宣言では R と S のレベルを別々にし、どちらが大きいかという数学に不要な条件を付けません。

~~~lean
universe u v
theorem map_square_add (R : Type u) (S : Type v)
    [Ring R] [Ring S] (f : R →+* S) (x y : R) :
    f ((x + y) * (x + y)) = (f x + f y) * (f x + f y) := by
  rw [map_mul, map_add]
~~~

## 4. 基礎体の変更

[体拡大](../../../代数系/FLD/FLD1/index.md#def-fld1-field-extension) では小さい体を大きい体の部分体として考えます。Lean では体 K と L が別の型でも、K の元を L へ送る写像を指定できます。例えば有理数を実数へ送る写像を使えば、実数を有理数係数の [ベクトル空間](../../../代数系/FLD/FLD0/index.md#def-fld0-vector-space-over-field) として扱えます。スカラー作用とは、係数 $a\in K$ と元 $x\in L$ から $L$ の元を作る演算です。紙上では $a\cdot x$、Lean では `a • x` と書き、$L$ 内の乗法 `*` と区別します。写像 $i:K\to L$ で係数を $L$ に移せば、そこで積を計算できます。

<a id="def-fml2-scalar"></a>

<!-- formal-statement-start -->
### 定義（Leanでの体のスカラー構造）

体 $K,L$ に対する `Algebra K L` は、単位元を保存する環準同型 `algebraMap K L` と、それに整合する K の L へのスカラー作用を備える。任意の $a\in K,x\in L$ について、写像を $i$ と書くと

$$
a\cdot x=i(a)x
$$

である。右辺の積は L 内で計算する。一般の Algebra には像が対象環の元と可換である条件もあるが、ここでは L が体なので乗法の可換性から自動的に成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-scalar -->
**定義の確認**　$K=L=\mathbb Q$ とし $i(a)=a$ とすると、零元と単位元、和と積はそのまま保存されます。スカラー作用は通常の積です。$a=2/3$、$x=9/2$ では $i(a)x=(2/3)(9/2)=3$ です。$b=3$ とすれば $(ab)x=2(9/2)=9$、$a(bx)=(2/3)(27/2)=9$ です。像が乗法を保存するため、括弧を移しても同じ値になります。残りの条件も任意の有理数 $a,b,x,y$ に対して

$$
a(x+y)=ax+ay,\qquad (a+b)x=ax+bx,
$$

$$
(ab)x=a(bx),\qquad 1x=x,\qquad i(a)x=xi(a)
$$

と、有理数の分配法則・結合法則・単位元・可換性から確認できます。恒等写像なので作用と写像の整合性 $a\cdot x=i(a)x=ax$ もすべての元で成立します。
<!-- definition-example-end -->

一般の $K,L$ でも、[単位元を保存する環準同型の条件](#prop-fml2-map) と [環準同型の核](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-kernel-image) に非零元 a があれば、$1=i(a^{-1}a)=i(a^{-1})i(a)=0$ となって L が体であることに矛盾します。従って核は零元だけです。$i(a)=i(b)$ なら加法保存から $i(-b)=-i(b)$ なので $i(a-b)=i(a)-i(b)=0$ となり、$a-b=0$、すなわち $a=b$ です。このように $i$ は単射（異なる元を異なる元へ送る写像）です。これにより K を L の中に埋め込めます。

<a id="prop-fml2-scalar"></a>

<!-- formal-statement-start -->
### 命題（写像に沿うスカラー作用の整合性）

体 $K,L$ と単位元を保存する環準同型 $i:K\to L$ に対し、作用を $a\cdot x=i(a)x$ と定める。このとき任意の $a,b\in K$、$x,y\in L$ で

$$
(ab)\cdot x=a\cdot(b\cdot x),\qquad
a\cdot(x+y)=a\cdot x+a\cdot y
$$

が成立する。
<!-- formal-statement-end -->

見取り図：最初の等式では K の積を i で L の積へ移します。次の等式では L 内の積 $i(a)(x+y)$ を $i(a)x+i(a)y$ に展開します。これは[環の分配法則](../../../代数系/RNG/RNG1/index.md#def-rng1-ring)です。

<!-- proof-start -->
### 証明

作用の式と環準同型の乗法保存から

$$
(ab)\cdot x=i(ab)x=(i(a)i(b))x.
$$

L の結合法則で括弧を移すと $i(a)(i(b)x)=a\cdot(b\cdot x)$ となる。次に

$$
a\cdot(x+y)=i(a)(x+y)
=i(a)x+i(a)y
=a\cdot x+a\cdot y.
$$

さらに加法保存と右分配法則、および単位元保存により

$$
(a+b)\cdot x=i(a+b)x
=(i(a)+i(b))x=i(a)x+i(b)x
=a\cdot x+b\cdot x,
$$

$$
1_K\cdot x=i(1_K)x=1_Lx=x
$$

である。L の加法は可換群をなすので、以上の4条件と合わせて [体上のベクトル空間](../../../代数系/FLD/FLD0/index.md#def-fld0-vector-space-over-field) の8条件を満たす。
<!-- proof-end -->

~~~lean
theorem scalar_assoc (K : Type*) (L : Type*)
    [Field K] [Field L] [Algebra K L] (a b : K) (x : L) :
    (a * b) • x = a • (b • x) := by
  simp only [Algebra.smul_def, map_mul, mul_assoc]
~~~

L の元をそのままにして K の作用だけを見ることをスカラーの制限と呼びます。例えば複素数は複素数係数なら1個の基底元1で表せますが、実数係数なら基底1と虚数単位を用い、$a+bi$ と表します。任意の複素数は実部と虚部を係数としてこの形に書けます。さらに $a+bi=0$ なら、実部を比較して a=0、虚部を比較して b=0 です。従って1と虚数単位は実数上で全体を生成し、一次独立でもあるので [体上の基底](../../../代数系/FLD/FLD0/index.md#def-fld0-basis-over-field) であり、[体上の次元](../../../代数系/FLD/FLD0/index.md#def-fld0-dimension-over-field) は2になります。基礎体を変えると係数の自由度が変わります。一方、K 上の一般のベクトル空間から L 上の空間を作るスカラー拡大には新たな構成が必要で、単に型を置換する操作ではありません。

## 5. 固定環境での実行

前講と同じ Lean 4.35.0、Mathlib v4.35.0 のコミット 56a005855ea17e0b0958f73ec801ae140b0a1679 を使用します。推移依存も lake-manifest.json で固定しています。

~~~bash
cd "textbook/volumes/dream_thater/計算系/FML/FML2/lab"
lean --version
lake exe cache get
lake build
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
lake env lean Failure.lean
~~~

- [FmlAlgebra.lean](lab/FmlAlgebra.lean)：一般の環・体に関する証明。
- [Inspect.lean](lab/Inspect.lean)：整数の計算20、剰余類0と1、公理依存を出力。
- [ExerciseSolutions.lean](lab/ExerciseSolutions.lean)：各演習の式を検査。
- [Failure.lean](lab/Failure.lean)：有理数で標数2の式を主張して拒否されることを確かめる。

最後のコマンドだけは失敗するはずです。型やモジュールが見つからないという失敗と、偽の等式が証明できないという失敗を区別してください。

## 6. 演習と詳細解答

### Level A

### FML2-A01 分配法則

整数で $(2+3)4$ を計算せよ。積を二つの項の積の和に展開し、必要な型クラスを述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの代数構造インスタンス](#def-fml2-structure) の Ring は右分配法則を備えています。$(2+3)4=2\cdot4+3\cdot4=8+12=20$ です。乗法の可換性や逆元は使いません。Lean では一般の式は add_mul、数値式は norm_num で検査できます。
<!-- solution-end -->

### FML2-A02 標数と像

ZMod 2 における自然数3の像を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[自然数の環への型変換](#def-fml2-cast) では1を3回足します。$1+1=0$ なので $1+1+1=0+1=1$ です。標数が2でも3の像が0とは限りません。
<!-- solution-end -->

### FML2-A03 型変換

((3 : ℕ) : ℚ) の値を求め、内側と外側の型を区別せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

内側は自然数3です。外側は [自然数の環への型変換](#def-fml2-cast) に従って有理数の単位元を3回足したものです。$1+1+1=3/1$ なので値は有理数3です。数学的な対応があっても、Nat と有理数の型は別です。
<!-- solution-end -->

### FML2-A04 零因子

ZMod 4 の2は非零である。2の二乗を計算し、2に乗法逆元が存在するか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[商環](../../../代数系/RNG/RNG1/index.md#def-rng1-quotient-ring) の計算では2は4で割り切れないため非零です。積は $2\cdot2=4=0$ です。仮に $u2=1$ なら、結合法則で $u(2\cdot2)=(u2)2=2$ ですが、左辺は $u0=0$ で矛盾します。従って2は逆元を持たず、[体の条件](../../../代数系/RNG/RNG1/index.md#def-rng1-zero-divisor-domain-field) を満たしません。
<!-- solution-end -->

### FML2-A05 型の階層と写像

Type u と Type v を使って異なる型 R,S の環準同型を宣言するとき、u=v を仮定する必要があるか。自然数の型と整数の型が同じ階層なら同じ型か。Lean で加法保存を宣言せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

u と v は型の属する階層を表す変数であり、写像の定義は同じ階層に限定されません。Nat と Int はともに Type に属しますが、Nat の元は非負整数、Int の元は負整数も含むので異なる型です。環準同型の引数は型 R の元、返り値は型 S の元であり、両方の環の法則を個別に仮定します。第3節の [環準同型による移送](#prop-fml2-map) で使った加法保存は次のように宣言できます。

~~~lean
universe u v
example (R : Type u) (S : Type v)
    [Ring R] [Ring S] (f : R →+* S) (a b : R) :
    f (a + b) = f a + f b := map_add f a b
~~~
<!-- solution-end -->

### Level B

### FML2-B01 非零条件の使用

体 K で2の像が非零とする。$2x=2\cdot1$ から x を求めよ。2の像が0ならどうなるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

[非零係数の消去](#prop-fml2-cancel) に $a=2,b=x,c=1$ を代入します。2は非零なので逆元があり、$2^{-1}(2x)=2^{-1}(2\cdot1)$、従って $1x=1\cdot1$ となり $x=1$ です。2の像が0なら等式は $0=0$ となり、体のすべての元が解です。
<!-- solution-end -->

### FML2-B02 準同型の法則

単位元を保存する環準同型 f と元 x に対し、$f(x^2+1)$ を f(x) で表せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[環準同型](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism) の加法保存を $x^2$ と1に適用し、$f(x^2+1)=f(x^2)+f(1)$ とします。乗法保存より $f(x^2)=f(x)f(x)$、単位元保存より $f(1)=1$ なので、結果は $f(x)^2+1$ です。Lean では map_add、map_mul、map_one を順に使用します。
<!-- solution-end -->

### FML2-B03 スカラー作用と括弧

有理数のスカラー作用で $a=2/3,b=3/5,x=10$ のとき、$(ab)\cdot x$ と $a\cdot(b\cdot x)$ を計算せよ。一般の体 K,L で等しい理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$ab=(2/3)(3/5)=2/5$ なので左辺は $(2/5)10=4$ です。右辺は $b\cdot x=(3/5)10=6$、$(2/3)6=4$ です。一般には [写像に沿うスカラー作用の整合性](#prop-fml2-scalar) を用い、$i(ab)x=(i(a)i(b))x=i(a)(i(b)x)$ とします。必要なのは写像の乗法保存と L の結合法則です。
<!-- solution-end -->

### FML2-B04 異なる基礎体

複素数 z=3+4i を実数係数2でスカラー倍した結果を求めよ。複素数全体を実数上のベクトル空間と見たとき、1と i が基底になる理由を示せ。また任意の複素数 x,y について実数係数2による加法の分配を Lean で検査せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

実数から複素数への写像は a を a+0i へ送ります。[体のスカラー構造](#def-fml2-scalar) により、スカラー倍は $(2+0i)(3+4i)=6+8i$ です。任意の複素数は実部 a と虚部 b により a+bi と表せます。a+bi=0 なら実部と虚部の比較で a=b=0 です。従って1と i は実数上で全体を生成し、一次独立なので [体上の基底](../../../代数系/FLD/FLD0/index.md#def-fld0-basis-over-field) です。複素数上では1だけで $z=z\cdot1$ と書け、$c\cdot1=0$ なら $c=0$ なので一次独立です。従ってこちらも基底となります。

~~~lean
example (x y : ℂ) :
    (2 : ℝ) • (x + y) = (2 : ℝ) • x + (2 : ℝ) • y :=
  FmlAlgebra.restrict_add ℝ ℂ 2 x y
~~~

これは [写像に沿うスカラー作用の整合性](#prop-fml2-scalar) を K=ℝ、L=ℂ、a=2 に適用した結果です。複素数の値を実数へ変換しているのではなく、実数を複素数へ埋め込んで積を取っています。
<!-- solution-end -->

### Level C

### FML2-C01 仮定の異なる定理を比較する

単位元を持つ可換環 R で2の像が0であるとき、任意の x について $(x+1)^2=x^2+1$ を示せ。有理数で反例を与え、どの段階が成立しなくなるか説明せよ。Lean で両方を検査せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

[標数2での二乗の形式化](#thm-fml2-square) の y に1を代入します。$1^2=1$ なので $(x+1)^2=x^2+1$ となります。展開すると $x^2+x+x+1=x^2+1+2x$ であり、2の像が0という仮定で最後の項が消えます。有理数では x=1 に対し左辺 $(1+1)^2=4$、右辺 $1^2+1=2$ となり等しくありません。2の像が0でないので、同じ最後の消去はできません。

~~~lean
example (R : Type*) [CommRing R] (h : (2 : R) = 0) (x : R) :
    (x + 1)^2 = x^2 + 1 := by
  simpa using FmlAlgebra.char_two_square R h x 1

example : ((1 : ℚ) + 1)^2 ≠ (1 : ℚ)^2 + 1 := by norm_num
~~~
<!-- solution-end -->

## 7. 次講へ

式の型と法則を指定し、標数によって計算結果が変わる理由を確認しました。次は多変数多項式を形式的な式として表現し、評価によって得られる関数と区別します。

参考：[Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/)、[Mathlib](https://github.com/leanprover-community/mathlib4)。
