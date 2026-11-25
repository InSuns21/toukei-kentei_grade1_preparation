# FML2 抽象代数学の形式化

前提：[FML1](../FML1/index.md)、[RNG1 環・体・環準同型](../../../代数系/RNG/RNG1/index.md)、[FLD0 体上の線形代数](../../../代数系/FLD/FLD0/index.md)、[FLD1 体拡大](../../../代数系/FLD/FLD1/index.md)。

前講では自然数値の有限和を形式化しました。しかし、整数で成り立つ計算を有限体でもそのまま使えるとは限りません。例えば整数では $1+1=2$ ですが、2を法とする剰余類では $1+1=0$ です。Lean では、どの集合の上で何の演算を使い、どの法則を仮定したかを型に記録します。本講では同じ式を異なる代数構造で読み、必要な仮定を特定する練習をします。

## 1. 型クラスと演算の仮定

[環・可換環の条件](../../../代数系/RNG/RNG1/index.md#def-rng1-ring)を思い出しましょう。加法は可換群を作り、乗法は結合的で加法に分配します。Mathlib の Ring はさらに乗法の単位元を含みます。単なる型 R だけでは、足し算さえ指定されません。型と、その型に備わる演算と法則を分離するのが型クラスです。

<a id="def-fml2-structure"></a>

<!-- formal-statement-start -->
### 定義（Leanの代数構造インスタンス）

型 R に対する Ring R は、加法、零元、加法逆元、乗法、単位元と、それらの環の法則を備える Mathlib の型クラスである。CommRing R はさらに乗法の可換性を備える。Field R は可換環に加えて零元と単位元が異なること、非零元が乗法逆元を持つことなどを備える。Lean の引数 [Ring R] はそのインスタンスを受け取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-structure -->
整数全体では通常の加法・乗法、0、1、符号反転を採用します。整数の和と積は整数、加法の逆元は整数、各演算は結合的で、加法と乗法は可換、分配法則も成立します。0と1がそれぞれの単位元なので CommRing の例です。しかし2の乗法逆元は整数ではありません。対して有理数では非零の分数 $m/n$ に対し $n/m$ が有理数であり、積は1です。整数から有理数へ移ると Field の条件も満たせます。
<!-- definition-example-end -->

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

数値リテラルの 2 は、どの型の値かによって意味が変わります。環の単位元を n 回足した元を、自然数 n の環への像とします。Mathlib では (n : R) と明示できます。これは型変換（coercion）の一例です。

<a id="def-fml2-cast"></a>

<!-- formal-statement-start -->
### 定義（Leanの自然数の環への型変換）

単位元を持つ環 $R$ への自然数の型変換 (n : R) は、0を零元へ送り、後続の自然数を単位元の加算によって送る写像である。すなわち $c(0)=0_R$、$c(n+1)=c(n)+1_R$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-cast -->
$R$ を2を法とする剰余類の環 ZMod 2 とすると、零元は0、単位元は1です。$c(0)=0$、$c(1)=0+1=1$、$c(2)=1+1=0$、$c(3)=0+1=1$ と、再帰条件を順に確認できます。一方、有理数では $c(2)=1+1=2$ です。自然数の2自体が0になったわけではなく、像が異なります。
<!-- definition-example-end -->

この違いを測る数が標数です。正の自然数 p が初めて零元へ写るなら標数 p、正の自然数が一つも零元へ写らないなら標数0です。Mathlib の CharP R p は、自然数 n の像が0であることと p が n を割り切ることの同値を記録します。p=0 の場合、0が n を割り切るのは n=0 の場合だけです。2を法とする環では偶数だけが0へ写るので標数2、有理数では正の整数の像は非零なので標数0です。

~~~lean
example : CharP (ZMod 2) 2 := inferInstance
example : (2 : ZMod 2) = 0 := by decide
example : (1 : ZMod 2) ≠ 0 := by decide
example : (2 : ℚ) ≠ 0 := by norm_num
~~~

環の標数によって、多項式の等式の真偽も変わります。

<a id="thm-fml2-square"></a>

<!-- formal-statement-start -->
### 定理（標数2での二乗の形式化）

可換環 $R$ で自然数2の像が0なら、任意の $x,y\in R$ に対し

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

可換性から $yx=xy$ であり、加法の結合・交換法則を使って

$$
xx+xy+yx+yy=x^2+y^2+(xy+xy).
$$

単位元と分配法則により $xy+xy=(1+1)xy=2xy$ である。仮定で2の像は0なので

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

有理数で x=y=1 とすると左辺4、右辺2で一致しません。展開自体は成立し、最後の $2xy=0$ だけが成立しないことが失敗の理由です。

## 3. 環準同型と universe

異なる環の間で式を移すには、単なる関数ではなく [環準同型](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism) が必要です。Mathlib の R →+* S は零元、単位元、加法、乗法を保存する写像を表します。f x と書くと、関数としての型変換が働きます。値を暗黙に同一視するのではなく、写像 f によって値を送ります。

<a id="prop-fml2-map"></a>

<!-- formal-statement-start -->
### 命題（環準同型による和の二乗の移送）

単位元を持つ環 $R,S$ と環準同型 $f:R\to S$、任意の $x,y\in R$ に対して

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

整数から有理数への標準的な写像では $f(2)=2/1$、$f(3)=3/1$ なので両辺は25です。加法保存だけでは足りません。例えば整数を整数へ送る $g(n)=2n$ は加法を保存しますが $g(1\cdot1)=2$、$g(1)g(1)=4$ と乗法を保存しません。

~~~lean
universe u v
theorem map_square_add (R : Type u) (S : Type v)
    [Ring R] [Ring S] (f : R →+* S) (x y : R) :
    f ((x + y) * (x + y)) = (f x + f y) * (f x + f y) := by
  rw [map_mul, map_add]
~~~

型が属する階層を universe と呼びます。Type u と Type v は階層を指定する型であり、u と v は独立したレベル変数です。Type u 自体は Type (u+1) に属します。Type* はレベルを推論させる記法です。同じ階層にあることは同じ型であることを意味しません。例えば Nat と Int はともに Type に属しますが、別の型です。上の定理では R と S のレベルを別々にし、どちらが大きいかという数学に不要な条件を付けません。

## 4. 基礎体の変更

[体拡大](../../../代数系/FLD/FLD1/index.md#def-fld1-field-extension) では小さい体を大きい体の部分体として考えます。Lean では体 K と L が別の型でも、K の元を L へ送る写像を指定できます。例えば有理数を実数へ送る写像を使えば、実数を有理数係数の [ベクトル空間](../../../代数系/FLD/FLD0/index.md#def-fld0-vector-space-over-field) として扱えます。

<a id="def-fml2-scalar"></a>

<!-- formal-statement-start -->
### 定義（Leanでの体のスカラー構造）

体 $K,L$ に対する Algebra K L は、単位元を保存する環準同型 algebraMap K L と、それに整合する K の L へのスカラー作用を備える。任意の $a\in K,x\in L$ について、写像を $i$ と書くと

$$
a\cdot x=i(a)x
$$

である。右辺の積は L 内で計算する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml2-scalar -->
$K=L=\mathbb Q$ とし $i(a)=a$ とすると、零元と単位元、和と積はそのまま保存されます。スカラー作用は通常の積です。$a=2/3$、$x=9/2$ では $i(a)x=(2/3)(9/2)=3$ です。$b=3$ とすれば $(ab)x=2(9/2)=9$、$a(bx)=(2/3)(27/2)=9$ です。像が乗法を保存するため、括弧を移しても同じ値になります。
<!-- definition-example-end -->

一般の $K,L$ でも、環準同型 i の核に非零元 a があれば、$1=i(a^{-1}a)=i(a^{-1})i(a)=0$ となって L が体であることに矛盾します。従って i は単射です（$i(a)=i(b)$ なら $i(a-b)=0$ から a=b）。これにより K を L の中に埋め込めます。

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

見取り図：最初の等式は K の積を i で L の積へ移し、次の等式は L の分配法則を使います。

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

さらに $i(a+b)=i(a)+i(b)$ より $(a+b)\cdot x=a\cdot x+b\cdot x$、$i(1)=1$ より $1\cdot x=x$ である。従って体上のベクトル空間のスカラー作用の条件を満たす。
<!-- proof-end -->

~~~lean
theorem scalar_assoc (K : Type*) (L : Type*)
    [Field K] [Field L] [Algebra K L] (a b : K) (x : L) :
    (a * b) • x = a • (b • x) := by
  rw [Algebra.smul_def, map_mul, Algebra.smul_def, Algebra.smul_def, mul_assoc]
~~~

L の元をそのままにして K の作用だけを見ることをスカラーの制限と呼びます。例えば複素数は複素数係数なら1個の基底元1で表せますが、実数係数なら基底1と虚数単位を用い、$a+bi$ と表します。二つの係数が実数なら表現は一意であり、次元は2になります。基礎体を変えると係数の自由度が変わります。一方、K 上の一般のベクトル空間から L 上の空間を作るスカラー拡大には新たな構成が必要で、単に型を置換する操作ではありません。

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

整数で $(2+3)4$ を分配法則を使って計算し、必要な型クラスを述べよ。

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

2は4で割り切れないため非零です。積は $2\cdot2=4=0$ です。仮に $u2=1$ なら、結合法則で $u(2\cdot2)=(u2)2=2$ ですが、左辺は $u0=0$ で矛盾します。従って2は逆元を持たず、この環は体ではありません。
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

[環準同型](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism) の加法保存を x² と1に適用し、$f(x^2+1)=f(x^2)+f(1)$ とします。乗法保存より $f(x^2)=f(x)f(x)$、単位元保存より $f(1)=1$ なので、結果は $f(x)^2+1$ です。Lean では map_add、map_mul、map_one を順に使用します。
<!-- solution-end -->

### FML2-B03 スカラー作用と括弧

有理数のスカラー作用で $a=2/3,b=3/5,x=10$ のとき、$(ab)\cdot x$ と $a\cdot(b\cdot x)$ を計算せよ。一般の体 K,L で等しい理由も述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$ab=(2/3)(3/5)=2/5$ なので左辺は $(2/5)10=4$ です。右辺は $b\cdot x=(3/5)10=6$、$(2/3)6=4$ です。一般には [写像に沿うスカラー作用の整合性](#prop-fml2-scalar) を用い、$i(ab)x=(i(a)i(b))x=i(a)(i(b)x)$ とします。必要なのは写像の乗法保存と L の結合法則です。
<!-- solution-end -->

### Level C

### FML2-C01 仮定の異なる定理を比較する

可換環 R で2の像が0であるとき、任意の x について $(x+1)^2=x^2+1$ を示せ。有理数で反例を与え、どの段階が成立しなくなるか説明せよ。Lean で両方を検査せよ。

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
