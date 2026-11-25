# FML3 多変数多項式・環準同型・算術回路の形式化

前提：[FML2](../FML2/index.md)、[AG1-01](../../../代数系/AG/AG1-01/index.md)、[AG1-02](../../../代数系/AG/AG1-02/index.md)、[AG1-03](../../../代数系/AG/AG1-03/index.md)、[ACOMP1](../../ACOMP/ACOMP1/index.md)、[ACOMP2](../../ACOMP/ACOMP2/index.md)、[ACOMP3](../../ACOMP/ACOMP3/index.md)、[ACOMP4](../../ACOMP/ACOMP4/index.md)。

例えば $x^2$ と $x$ は、二元体のすべての点で同じ値を返します。しかし係数を比較すると異なる多項式です。さらに、同じ多項式を計算する二つの式の演算回数も同じとは限りません。Lean でこれらを区別するには、係数のデータ、評価を行う写像、計算の命令列を別々の型にします。

## 1. 係数と変数

[多変数多項式環](../../../代数系/AG/AG1-01/index.md#def-ag1-01-multivariate-polynomial)では各単項式の指数を変数ごとに記録します。変数集合が無限でも、個々の単項式で指数が非零の変数は有限個、多項式中で係数が非零の単項式も有限個です。この二重の有限性を Mathlib の型で表します。有限台とは、零でない値を取る添字が有限個であることです。

<a id="def-fml3-mv-polynomial"></a>

<!-- formal-statement-start -->
### 定義（Leanでの多変数多項式表示）

変数の添字型を σ、単位元を持つ可換環を R とする。Mathlib の MvPolynomial σ R は、指数の有限台関数（σ から自然数への関数）を添字とする係数の有限台関数として多変数多項式を表す。C c は定数 c、X i は添字 i の変数を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml3-mv-polynomial -->
**定義の確認**　変数を $x,y$、係数環を整数環とします。多項式

$$
p=3x^2y+2
$$

では指数 $(2,1)$ の係数が3、指数 $(0,0)$ の係数が2、他の指数の係数は0です。各指数は二つの自然数からなり、非零係数の添字も二個なので両方の有限性を満たします。定数2は C 2、変数 x は X 0、y は X 1 と表せます。
<!-- definition-example-end -->

二つの多項式が等しいとは、全添字の係数が等しいことです。整数値を返す関数が等しいという主張とは型が違います。

## 2. 評価を準同型として表す

[環準同型](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism)のうち、単位元を保存するものを Lean では R →+* S と記述します。R と S を単位元を持つ可換環とし、係数を送る写像 f と、各変数の行き先 a を別々に指定します。Mathlib の eval₂Hom f a は、その両者を合わせた写像です。a は S の元を指定するので、数値だけでなく別の多項式を変数の像に選ぶこともできます。

<a id="prop-fml3-eval-generators"></a>

<!-- formal-statement-start -->
### 命題（係数と変数の同時評価）

単位元を持つ可換環 R,S と単位元を保存する環準同型 f:R→S、変数添字型 σ、写像 a:σ→S を取る。eval₂Hom f a は多変数多項式環から S への単位元を保存する環準同型である。添字 i と係数 c に対し、

$$
\operatorname{ev}_{f,a}(X_i+C(c))=a(i)+f(c)
$$

が成立する。
<!-- formal-statement-end -->

見取り図：単項式に対して係数は f で移し、変数は a で置き換えます。足し算や掛け算が保存されるので、式の構造に沿って計算できます。

<!-- proof-start -->
### 証明

指数の有限台関数を α と書き、係数を $c_\alpha$ とする。評価の式は

$$
\operatorname{ev}_{f,a}(p)
=\sum_\alpha f(c_\alpha)\prod_i a(i)^{\alpha_i}
$$

である。和は非零係数の添字上で、積は非零指数の添字上で取る。零係数を追加しても f(0)=0 だから値は変わらない。二つの多項式 p,q の有限台の和集合を T とし、q の係数を $d_\alpha$、各単項式の評価値を $m_\alpha=\prod_i a(i)^{\alpha_i}$ と置く。[環準同型の加法保存](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism)から

$
\begin{aligned}
\operatorname{ev}_{f,a}(p+q)
&=\sum_{\alpha\in T}f(c_\alpha+d_\alpha)m_\alpha\\
&=\sum_{\alpha\in T}(f(c_\alpha)+f(d_\alpha))m_\alpha.
\end{aligned}
$

[環の分配法則](../../../代数系/RNG/RNG1/index.md#def-rng1-ring)で各項を二つに分けてから、有限和を二つに分離する。

$
\begin{aligned}
\operatorname{ev}_{f,a}(p+q)
&=\sum_{\alpha\in T}f(c_\alpha)m_\alpha
 +\sum_{\alpha\in T}f(d_\alpha)m_\alpha\\
&=\operatorname{ev}_{f,a}(p)+\operatorname{ev}_{f,a}(q).
\end{aligned}
$

積では指数 α と β を足して α+β の単項式にまとめる。各変数の累乗は

$$
a(i)^{\alpha_i+\beta_i}=a(i)^{\alpha_i}a(i)^{\beta_i}
$$

となる。積の全項は、p の各単項式と q の各単項式を組にして得られる。係数が同じ指数へ集まる場合も加法保存によってまとめる前の和で計算できる。[環準同型の乗法保存](../../../代数系/RNG/RNG1/index.md#def-rng1-ring-homomorphism)を適用すると

$
\begin{aligned}
\operatorname{ev}_{f,a}(pq)
&=\sum_{\alpha,\beta} f(c_\alpha d_\beta)m_{\alpha+\beta}\\
&=\sum_{\alpha,\beta} f(c_\alpha)f(d_\beta)m_\alpha m_\beta\\
&=\sum_{\alpha,\beta}(f(c_\alpha)m_\alpha)(f(d_\beta)m_\beta).
\end{aligned}
$

最後の行は S の乗法の可換性で因子を並べ替えたものである。有限和の分配法則で二つの和の積へ戻すと

$$
\operatorname{ev}_{f,a}(pq)
=\operatorname{ev}_{f,a}(p)\operatorname{ev}_{f,a}(q)
$$

を得る。零多項式は0へ、定数1は f(1)=1 へ写るので環準同型の条件がそろう。定数 c と変数 i の評価はそれぞれ f(c)、a(i) である。加法保存を適用すると結論を得る。
<!-- proof-end -->

例えば整数係数の $3x^2y+2$ を、有理数への標準の埋め込みと $a(x)=1/2,\ a(y)=4$ で評価すると

$$
3(1/2)^2\cdot4+2=3+2=5
$$

です。Lean の命題では数値を固定しないので、任意の可換半環（加法逆元を要求しない環型の構造）にも適用できます。

~~~lean
theorem eval_generators {σ R S : Type*}
    [CommSemiring R] [CommSemiring S]
    (f : R →+* S) (a : σ → S) (i : σ) (c : R) :
    MvPolynomial.eval₂Hom f a
        (MvPolynomial.X i + MvPolynomial.C c) = a i + f c := by
  rw [map_add, MvPolynomial.eval₂Hom_X', MvPolynomial.eval₂Hom_C]
~~~

map_add は和の保存、後ろの二つは変数と定数の像です。

## 3. 同じ値でも同じ多項式とは限らない

[多項式関数と評価写像](../../ACOMP/ACOMP1/index.md#def-acomp1-polynomial-function)では形式多項式と、それが定める関数を区別しました。この区別を Lean で二つの命題として検査します。二元体は ZMod 2、変数の添字型は一個の元だけを持つ Unit を使います。

<a id="prop-fml3-finite-field"></a>

<!-- formal-statement-start -->
### 命題（二元体での形式多項式と評価の不一致）

二元体上の一変数多項式環で、$p=X^2$、$q=X$ とする。このとき $p\ne q$ であるが、任意の二元体の元 a に対して $p(a)=q(a)$ である。
<!-- formal-statement-end -->

見取り図：形式多項式には係数を取り出す操作を、評価値には体の二つの元を調べる操作を使います。

<!-- proof-start -->
### 証明

X の指数2の係数は0、二乗の指数2の係数は1である。二元体では 0 と1が異なるので $p\ne q$ である。一方、評価点は0または1である。$0^2=0$ かつ $1^2=1$ だからすべての評価点で一致する。
<!-- proof-end -->

Lean の finite_field_distinct では等しいと仮定し、congrArg で両辺の指数2の係数を取ります。指数1と指数2が別であることは、指数の有限台関数を唯一の変数で評価すれば $1\ne2$ から分かります。finite_field_same_values では評価が積を保存することを使い、fin_cases で ZMod 2 の二つの元を調べます。

同じ理由で $X^2-X$ は非零多項式なのに零関数です。従って評価関数の等式を形式多項式の等式に置き換えることはできません。次数に制限を加えるなら [直積上の多項式の一意性](../../ACOMP/ACOMP1/index.md#thm-acomp1-grid-uniqueness)を使える場合があります。ここでは二元体で指数2なので、その定理の各変数の次数が評価点数より小さいという条件を満たしません。なお、評価点の集合上で一致する多項式を同一視したい場合は、[座標環と多項式関数](../../../代数系/AG/AG1-03/index.md#prop-ag1-03-evaluation)のように、全点で消える多項式のイデアルで割った環を使う方法があります。形式多項式環そのものの等式とは区別します。

## 4. 共有する算術計算を型で表す

[算術回路とstraight-line programの対応](../../ACOMP/ACOMP2/index.md#thm-acomp2-circuit-slp)によって、回路を先行する値から順に計算する命令列として表せます。途中結果を何度も使えるように、計算済みの値をレジスタ（値を保持する番号付きの場所）として記録します。Fin n は 0 以上 n 未満の自然数を表す型です。Lean の Fin の数値リテラルは n が正のとき剰余へ変換されるので、範囲を意図通りに検査したい場合は自然数と不等式の証明を組にして渡します。未計算の値を参照できないように、命令の引数を Fin n に制限します。

<a id="def-fml3-program"></a>

<!-- formal-statement-start -->
### 定義（型付き算術命令列）

n 個の計算済み値を持つ状態で、Program n は次のいずれかで構成する。

- halt i：Fin n の i 番目を出力して終了する。
- add i j p：Fin n の二つの値を足し、新しい先頭レジスタに格納して Program (n+1) の p を実行する。
- mul i j p：上と同じ方法で積を格納し、p を実行する。

演算サイズは add と mul の命令数の合計である。halt と初期値は数えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml3-program -->
**定義の確認**　初期レジスタを x,y の二個とします。最初の add 0 1 は両添字が Fin 2 に属し、新しい状態は u,x,y（u=x+y）です。次の mul 0 0 は Fin 3 の添字0を二度読み、状態は v,u,x,y（v=u²）です。最後の add 0 1 は Fin 4 の二添字から w=v+u を作り、Fin 5 の添字0で halt します。各参照はその時点で既に存在し、最後に一つの出力が指定されています。加法2回と乗法1回なのでサイズは3です。
<!-- definition-example-end -->

この定義は [算術回路の演算サイズ](../../ACOMP/ACOMP2/index.md#def-acomp2-arithmetic-size)と同じ数え方です。初期レジスタには変数も定数も置けます。未使用の演算があっても命令列に残る限り数えます。Fin.cases は先頭に値を加え、旧レジスタ i を i.succ に移します。

~~~lean
inductive Program : Nat → Type
  | halt {n : Nat} (i : Fin n) : Program n
  | add {n : Nat} (i j : Fin n) (tail : Program (n+1)) : Program n
  | mul {n : Nat} (i j : Fin n) (tail : Program (n+1)) : Program n
~~~

実装では Program.size と Program.eval をこの三つの場合で再帰的に定めます。halt なら値を取り出し、add/mul なら新しい値を先頭に追加して残りの命令を実行します。再帰対象は命令列の真の部分であるため、有限回で終了します。共有した u を木に展開すると $(x+y)(x+y)+(x+y)$ となり、括弧の加法3回、外側の積と和が各1回でサイズ5になります。[算術formula](../../ACOMP/ACOMP3/index.md#def-acomp3-formula)と回路のサイズは同じものではありません。

## 5. 形式計算と数値計算の交換

初期レジスタを多項式の変数や定数にすれば、Program.eval の出力は形式多項式です。その多項式を最後に評価するのと、初期レジスタを最初に評価して計算を進めるのは一致するでしょうか。必要なのは準同型が各命令の演算を保存することです。

<a id="thm-fml3-map-eval"></a>

<!-- formal-statement-start -->
### 定理（型付き算術命令列の評価と準同型の交換）

単位元を持つ環 R,S と単位元を保存する環準同型 f:R→S、n 個の初期値 v:Fin n→R、型付き算術命令列 P:Program n を取る。E を命令列の評価とすると、

$$
f(E(P,v))=E(P,f\circ v)
$$

が成立する。
<!-- formal-statement-end -->

見取り図：計算の一段目で新しいレジスタを作る場合、その値の像と、旧レジスタの像を演算して得た値は一致します。残りの命令列に同じ主張を適用します。

<!-- proof-start -->
### 証明

P の構成に関する帰納法を用いる。halt i の場合、左辺は f(v(i)) であり、右辺も f(v(i)) である。

add i j p の場合、新状態を w と置く。$w(0)=v(i)+v(j)$、旧添字 k について $w(k+1)=v(k)$ である。S 側で初期状態を $f\circ v$ として最初の命令を実行した状態を w' と置くと

$$
w'(0)=f(v(i))+f(v(j))=f(w(0)).
$$

また、任意の旧添字 k について

$$
w'(k+1)=f(v(k))=f(w(k+1)).
$$

したがって全レジスタで $w'=f\circ w$ である。残りの命令列 p について任意の初期状態で成り立つという帰納法の仮定を w に適用して

$$
f(E(p,w))=E(p,f\circ w)=E(p,w')
$$

を得る。これは add i j p の結論に等しい。

mul i j p の場合は $w(0)=v(i)v(j)$ である。乗法保存から

$$
w'(0)=f(v(i))f(v(j))=f(w(0)).
$$

旧レジスタについても $w'(k+1)=f(w(k+1))$ である。従って $w'=f\circ w$ となり、帰納法の仮定により

$$
f(E(p,w))=E(p,f\circ w)=E(p,w')
$$

を得る。三つの場合を尽くしたので主張が従う。
<!-- proof-end -->

Lean の Program.map_eval はこの三分岐を実装します。funext でレジスタ状態を点ごとに比較し、Fin.cases で先頭と旧レジスタを分けます。帰納法の仮定を任意の v について立てる理由は、残りの命令のレジスタ数が一個増えているためです。

評価先を有理数体として $x=2,y=3$ とすれば、前節の回路は $u=5,v=25,w=30$ を返します。一方、形式多項式は

$$
w=(x+y)^2+(x+y)
=x^2+2xy+y^2+x+y
$$

となり、2と3を代入すると $4+12+9+2+3=30$ です。係数を二元体へ写す場合も [係数還元](../../ACOMP/ACOMP4/index.md#thm-acomp4-reduction)の通り計算と写像の順を交換できます。ただし、出力値が偶然一致しても演算サイズが最小だとは証明されません。

## 6. Lean の実行

前講と同じ Lean 4.35.0 と固定した Mathlib コミットを使用します。

~~~bash
cd "textbook/volumes/dream_thater/計算系/FML/FML3/lab"
lean --version
lake exe cache get
lake build
lake env lean Inspect.lean
lake env lean Failure.lean
lake env lean BadIndex.lean
~~~

[FmlPolynomial.lean](lab/FmlPolynomial.lean) に上記の定理と共有回路の検算があります。[Inspect.lean](lab/Inspect.lean) は各定理の依存公理を出力します。[Failure.lean](lab/Failure.lean) は型付き命令列の明示的に範囲条件を破る添字と、二元体の形式多項式を誤って等置した主張を拒否するための実験です。最後の二つの実行は失敗することが期待されます。エラーの理由を読んで、偽の主張が拒否されたことと環境の不備を区別してください。

## 7. 演習と詳細解答

### Level A

### FML3-A01 係数

整数係数の $4xy^2-3$ の非零係数と指数を列挙せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[多変数多項式表示](#def-fml3-mv-polynomial)に従って変数順を x,y とする。指数 (1,2) の係数が4、(0,0) の係数が -3 であり、他は0である。指数の集合と非零係数の集合の双方が有限である。
<!-- solution-end -->

### FML3-A02 代入

整数係数の $2x^2+y$ を $x=3,y=-1$ で評価せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[係数と変数の同時評価](#prop-fml3-eval-generators)で f を整数環の恒等写像とする。x² の像は $3\cdot3=9$、2倍して18、y の像 -1 を足して17である。
<!-- solution-end -->

### FML3-A03 二元体

二元体で $X^2-X$ の係数とすべての評価値を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

指数2の係数は1、指数1の係数は -1=1、それ以外は0である。0での評価は $0-0=0$、1での評価は $1-1=0$。従って [二元体での形式多項式と評価の不一致](#prop-fml3-finite-field)と同様、非零多項式が零関数を定める。
<!-- solution-end -->

### FML3-A04 レジスタ添字

初期値 x,y,z の順にレジスタを並べ、mul 0 2 を実行する。新状態と、元の y の新しい添字を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[型付き算術命令列](#def-fml3-program)により 0,2 は Fin 3 の元なので参照可能である。新しい先頭は xz、元の三値は一個ずつ後ろへ移る。状態は xz,x,y,z となり、y の旧添字1は新添字2へ移る。
<!-- solution-end -->

### FML3-A05 終了命令

Program 1 の halt 0 のサイズと、初期値 $v(0)=7$ の評価値を求めよ。自然数1を値とする添字で halt できるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[型付き算術命令列](#def-fml3-program)の halt は演算を行わず、サイズ0、評価値7である。Fin 1 の唯一の添字は0なので自然数1を値とする添字は存在せず、範囲外参照を型で排除する。ただし Lean の Fin の数値リテラルは剰余へ変換されるため、`(1 : Fin 1)` は0を表す。範囲を直接検査するには `⟨1, by decide⟩ : Fin 1` と書く。
<!-- solution-end -->

### Level B

### FML3-B01 変数を多項式へ送る

整数係数の $x^2+y$ に $x\mapsto t+1$、$y\mapsto t$ を代入し、出力の係数を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[係数と変数の同時評価](#prop-fml3-eval-generators)の S を整数係数の一変数多項式環、f を整数を定数多項式へ送る写像にする。乗法と加法の保存から出力は

$$
(t+1)(t+1)+t=t^2+t+t+1+t=t^2+3t+1.
$$

指数2、1、0の係数は順に1、3、1である。a の像は数値でなく多項式でもよい。
<!-- solution-end -->

### FML3-B02 回路と木

初期値 x,y に対して add 0 1、mul 0 0、mul 0 0、halt 0 の順に計算する。多項式、回路の演算サイズ、共有しない木の演算サイズを求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[型付き算術命令列](#def-fml3-program)を一段ずつ実行する。u=x+y を先頭に置き、次に v=u²、次に w=v² を置く。出力は $(x+y)^4$、演算は加法1回と乗法2回でサイズ3である。木では u を計算する加法が4個、二個ずつの積が2個、その積が1個なので演算サイズは $4+2+1=7$ である。これは構成した木のサイズであって、任意の木についての下界は別の論証を要する。
<!-- solution-end -->

### FML3-B03 仮定を弱める

整数から整数への写像 f(n)=2n と、初期値1を二度掛ける命令列を考えよ。評価と f の交換は成立するか。

- Level: B

<!-- solution-start -->
#### 詳細解答

先に整数で計算すると $1\cdot1=1$、f を適用して2である。先に f を適用すると初期値は2、回路の評価は $2\cdot2=4$ なので一致しない。加法は保存するが乗法と単位元を保存しない。[評価と準同型の交換](#thm-fml3-map-eval)の証明で使った $f(v(i)v(j))=f(v(i))f(v(j))$ が成立しないためである。
<!-- solution-end -->

### Level C

### FML3-C01 形式出力、標数、サイズ

初期値 x,y に対して add 0 1、mul 0 0、add 0 1、halt 0 を実行する。

1. 整数上の形式出力と演算サイズを求めよ。
2. 二元体への係数還元後の出力を求めよ。
3. 二元体の全評価点での値を求め、形式多項式が零か否かも判定せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

第1問。[型付き算術命令列](#def-fml3-program)では一段目 u=x+y、二段目 v=u²、三段目 w=v+u となる。整数上で積を展開すると

$$
w=x^2+xy+yx+y^2+x+y
=x^2+2xy+y^2+x+y.
$$

加法2回、乗法1回でサイズ3である。

第2問。整数を二元体へ送る準同型 f は係数2を0、係数1を1へ送る。[評価と準同型の交換](#thm-fml3-map-eval)により、同じ回路を二元体の多項式環で実行しても

$$
w_2=x^2+y^2+x+y
$$

となる。係数を移しただけで命令数は変わらない。

第3問。二元体の各元 a は a²=a なので、x,y の全四組で $w_2=x+y+x+y=0$ である。ところが指数 (2,0) の係数は1であり、零多項式の同じ係数0とは異なる。従って形式多項式は非零である。すべての数値テストに合格しても、形式的な等式の証明にはなっていない。
<!-- solution-end -->

次講では、距離・完備性・極限を型と仮定で指定し、近似と等式の区別をさらに学びます。
