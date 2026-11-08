# SQC7 円積不可能性の決着

円の面積は $\pi r^2$ なので、半径 $r>0$ の円と等積の正方形を作るには、一辺を $s=r\sqrt{\pi}$ にしなければなりません。[SQC6 の円積問題の帰着](../SQC6/index.md#prop-sqc6-squaring-reduction)で、幾何の問いは「$\sqrt{\pi}$ という長さを有限回で正確に作れるか」という代数の問いに変わりました。

前章では $\pi$ が**無理数**であることまで証明しました。しかし $\sqrt2$ は無理数でも作図できます。ここで必要なのは、もっと強い障害です。今回は[作図可能数の実二次拡大列による特徴付け](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)と、[Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)を結び、古典三大作図問題の最後を決着させます。

ここでいう「作図」は、与えられた円の半径を単位長とし、[SQC1 の有限作図規則](../SQC1/index.md#def-sqc1-finite-procedure)に従う**有限回の定規とコンパスの操作**です。極限の操作、刻みを無限に細かくする操作、任意の長さを答えとして初めから与える操作は含みません。

<!-- definition-example-audit: strict -->

---

## 1. どこまでが作図可能か

長さを単位長に対する比で表します。すると、有理数は作図でき、[四則演算と平方根の作図](../SQC2/index.md#prop-sqc2-field-operations)を有限回だけ組み合わせた数が作図可能です。これを正確に記述したのが、[FLD5 の実二次拡大列の定理](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)です。

たとえば単位正方形の対角線は $\sqrt2$ で、$X^2-2$ の根として代数的ですが、有理数ではありません。この例は「無理数だから作図できない」という論法を反証します。

ここで、[代数的数と超越数の定義](../../../代数系/FLD/FLD1/index.md#def-fld1-algebraic-element)を確認します。複素数 $z$ が**代数的**であるとは、有理係数の零でない多項式 $P(X)$ が存在して $P(z)=0$ となることです。そうした多項式が一つも存在しない数を**超越数**といいます。作図できる実数は、実二次拡大列の中に入るという制約を持ちます。

<a id="lem-sqc7-transcendental-obstruction"></a>

<!-- formal-statement-start -->
> **補題（超越数の作図不能性）**  
> 単位長 $1$ と通常の座標軸から出発する有限回の定規とコンパスの作図で得られる実数 $\alpha$ は、$\mathbb Q$ 上代数的である。従って、$\mathbb Q$ 上超越的な実数は、この作図では得られない。
<!-- formal-statement-end -->

### 証明の見取り図

作図可能性から実二次拡大列の存在を得て、有限拡大に属する元は代数的である、という順に使います。逆向きの「代数的なら作図可能」は一般には成り立ちません。

<!-- proof-start -->
### 証明

$\alpha$ を作図可能な実数とします。[実二次拡大列による特徴付け](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)を $\alpha$ に適用すると、ある有限列

$$
\mathbb Q=K_0\subset K_1\subset\cdots\subset K_m\subset\mathbb R,
\qquad [K_j:K_{j-1}]\le2
$$

が存在し、$\alpha\in K_m$ となります。[拡大次数の塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)により

$$
[K_m:\mathbb Q]
=\prod_{j=1}^m[K_j:K_{j-1}]
\le 2^m<\infty.
$$

ここで $m=0$ なら $K_m=\mathbb Q$ なので同じ結論です。[有限拡大の元は代数的](../../../代数系/FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)を $K_m/\mathbb Q$ の元 $\alpha$ に適用すると、$\alpha$ は $\mathbb Q$ 上代数的です。

超越的な実数 $\alpha$ が作図可能だとすれば、今示した必要条件に反します。ゆえに作図不能です。
<!-- proof-end -->

この補題が示したのは「作図できる $\Rightarrow$ 代数的」という一方向です。$\sqrt2$ は代数的かつ作図可能ですが、代数的でありながら作図できない実数も[SQC3 の反例](../SQC3/index.md#prop-sqc3-quartic-counterexample)にあります。逆向きの含意を使ってはいけません。

---

## 2. なぜ $\pi$ が超越数だと分かるのか

代数的な数かどうかは、有理係数多項式の根かどうかという性質です。$\pi$ が超越数であることは、$\pi$ の小数をいくら計算しても直接は証明できません。ここでは既習の強い定理を、必要な仮定を一つずつ確認して適用します。

[Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)は、**零でない代数的複素数 $\alpha$** について $e^\alpha$ が超越数になるという主張です。指数関数の入力は実数に限定されません。定理そのものの算術・積分による完全証明は TRN11 にあります。

一方、[複素指数関数のEuler表示](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から

$$
e^{i\pi}=\cos\pi+i\sin\pi=-1
$$

です。右辺 $-1$ は $Y+1=0$ の根なので代数的です。そこで仮に $\pi$ が代数的だとしたら、定理の仮定は満たされるでしょうか。

1. $i$ は $X^2+1=0$ を満たすので代数的です。
2. 仮定により $\pi$ も代数的です。$\mathbb Q(i,\pi)/\mathbb Q$ は有限拡大だから、[有限拡大の元は代数的](../../../代数系/FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)より、その元 $i\pi$ も代数的です。
3. $i\ne0$ かつ $\pi>0$ なので $i\pi\ne0$ です。

従って $\alpha=i\pi$ に [Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)を適用すると、$e^{i\pi}$ は超越数でなければなりません。しかし既に $e^{i\pi}=-1$ は代数的と計算しました。矛盾です。

こうして $\pi$ は超越数です。これは[TRN11 の「$\pi$ の超越性」](../../../代数系/TRN/TRN11/index.md#cor-trn11-pi-transcendental)の推論を、円積問題で使うために再確認したものです。独立の新定理を仮定したわけではありません。

### 非零という条件は飾りではない

もし $\alpha=0$ を代入してしまうと $e^0=1$ は代数的です。定理は適用できません。$i\pi\ne0$ という一行は、背理法に欠かせない仮定の確認なのです。

---

## 3. 円積問題の不可能性を一つの証明にする

半径 $1$ の円に等しい面積の正方形を仮に作れたとしましょう。[円積の長さへの帰着](../SQC6/index.md#prop-sqc6-squaring-reduction)を $r=1$ に適用すると、その正方形の一辺 $s>0$ は

$$
s^2=\pi,\qquad s=\sqrt{\pi}
$$

を満たします。この正方形の一辺を作図できると、[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)により、$s\cdot s=\pi$ という長さも作図できてしまいます。ところが $\pi$ は先ほど超越数だと確認しました。

<a id="thm-sqc7-circle-squaring-impossible"></a>

<!-- formal-statement-start -->
> **定理（円積不可能性）**  
> 単位長 $1$ と半径 $1$ の円が与えられ、使用できる操作が有限回の定規とコンパスによる直線・円の作図とその交点の選択に限られるとする。このとき、与えられた円と厳密に等しい面積を持つ正方形は作図できない。
<!-- formal-statement-end -->

### 証明の見取り図

等積正方形の存在を仮定すると $\sqrt\pi$ が作図可能になり、その二乗 $\pi$ も作図可能です。しかし作図可能数は代数的である一方、$\pi$ は超越数です。円の面積の式と代数的な制約をここで接続します。

<!-- proof-start -->
### 証明

背理法で、条件を満たす正方形が有限作図で得られたとします。その一辺の長さを $s>0$ とします。半径 $1$ の円の面積は、[SQC6 の面積と等積正方形の関係](../SQC6/index.md#prop-sqc6-squaring-reduction)から $\pi$ であり、正方形の面積は $s^2$ です。等積条件と $s>0$ より

$$
s^2=\pi,\qquad s=\sqrt{\pi}.
$$

作図された正方形の頂点から辺長 $s$ を移す操作は有限作図なので $s$ は作図可能です。[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)を二つの入力 $s,s$ に適用すると、$\pi=s\cdot s$ も作図可能です。

ところが[超越数の作図不能性](#lem-sqc7-transcendental-obstruction)から、作図可能な $\pi$ は代数的であるはずです。他方、[TRN11 の $\pi$ の超越性](../../../代数系/TRN/TRN11/index.md#cor-trn11-pi-transcendental)から $\pi$ は代数的ではありません。この矛盾により仮定が否定されます。
<!-- proof-end -->

同じ証明を別の見方で追うと、仮に $\sqrt\pi$ が作図可能なら[実二次拡大列の特徴付け](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)により有限拡大 $K/\mathbb Q$ に入り、$\pi=(\sqrt\pi)^2\in K$ となるため $\pi$ は代数的です。ここで「$\sqrt\pi$ が超越的」という事実も導けますが、それだけを先に仮定して循環論法にする必要はありません。

### 3.1 半径 $2$ ならどうなるか

半径 $2$ の円の面積は $4\pi$。等積正方形の辺は $s=2\sqrt\pi$ です。もし $s$ を作図できれば、有理数 $2$ で割って $\sqrt\pi$ を作れ、さらに二乗して $\pi$ を作れます。単位円を半径 $2$ に変えても不可能性は消えません。

---

## 4. 円の半径を変えることと、道具を増やすこと

半径が $1$ と限らない円でも、**その円の半径 $r>0$ だけを長さの基準として使う**なら話は同じです。与えられた半径を新しい単位 $1$ と呼び直せば、どの作図操作も相似拡大・縮小の下で同じ交点関係を保ちます。作図可能な辺長の比 $s/r$ に注目するのが重要です。

<a id="cor-sqc7-any-radius"></a>

<!-- formal-statement-start -->
> **系（半径によらない円積不可能性）**  
> 半径 $r>0$ の円が与えられ、初期データはその円の中心・半径と定規とコンパスの通常の有限作図で得られる補助点に限るとする。追加の独立な長さや特別な曲線を与えず、有限回の定規とコンパスの操作だけで、その円と厳密に等積の正方形を作ることはできない。
<!-- formal-statement-end -->

### 証明の見取り図

長さを $r$ で割って無次元化すれば、単位円の問題へ戻ります。等積正方形があれば $s/r=\sqrt\pi$ が有限作図可能になるはずです。

<!-- proof-start -->
### 証明

与えられた円の半径を長さの単位 $r$ とします。どの有限作図も、すべての長さを $1/r$ 倍する相似変換で、直線・円の交点を取る同じ有限作図に移ります。仮に半径 $r$ の円から等積正方形の辺 $s>0$ が作図できれば、相似変換後には単位円から辺 $s/r$ の等積正方形が作図できることになります。

面積等式 $s^2=\pi r^2$ に $r>0$ を用いると

$$
\left(\frac{s}{r}\right)^2=\pi,\qquad
\frac{s}{r}=\sqrt{\pi}.
$$

これは[単位円の円積不可能性](#thm-sqc7-circle-squaring-impossible)に反します。従って、元の円についても不可能です。
<!-- proof-end -->

ただし、**追加の初期データ**が与えられた別の問題まで否定しているわけではありません。例えば、最初から長さ $\sqrt\pi$ の線分が「特別な入力」として与えられれば、その長さを辺とする正方形を描けます。それは $\sqrt\pi$ を作図したのではなく、入力として受け取っただけです。定規とコンパス以外の道具を許す問題も古典的円積問題とは別です。

### 正確な不可能と、いくらでも良い近似

有理数 $q>0$ からは平方根 $\sqrt q$ が[非負平方根の有限作図](../SQC2/index.md#prop-sqc2-positive-square-root)で作れます。例えば $q=22/7$ を使えば、半径 $1$ の円に近い面積を持つ一辺 $\sqrt{22/7}$ の正方形を作れます。しかし $\pi$ は[SQC6 の無理性](../SQC6/index.md#thm-sqc6-pi-irrational)から有理数 $22/7$ とは等しくないため、面積は**厳密には**一致しません。

有理数の近似を細かくすれば面積誤差を小さくできますが、どんなに小さい有限の誤差も「等積」ではありません。ここで否定されたのは無限に近い精度の実用作図ではなく、**有限手順による厳密な等積作図**です。

---

## 5. 演習：論理の鎖を自分でつなぐ

### Level A：仮定と結論の区別

**SQC7-A1（非零代数的指数の確認）**  
$\pi$ が代数的だと仮定する。$i\pi$ が零でない代数的複素数になる理由を、$i$ の満たす多項式と有限拡大を使って述べよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$i^2+1=0$ なので $i$ は $X^2+1\in\mathbb Q[X]$ の根で、代数的です。仮定した $\pi$ も代数的なので $\mathbb Q(i,\pi)$ は $\mathbb Q$ 上有限拡大です。

この体の元 $i\pi$ は[有限拡大の元は代数的](../../../代数系/FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)から代数的です。また $i\ne0$ と $\pi>0$ より $i\pi\ne0$ です。これで[Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)の二つの仮定を確認できました。
<!-- solution-end -->

**SQC7-A2（平方根を二乗したら）**  
$s>0$ が作図可能で $s^2=\pi$ と仮定したとき、$\pi$ が作図可能かつ代数的になる理由を二段階で説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答**

まず[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)に二つの作図可能な入力 $s,s$ を入れると、積 $s\cdot s=s^2=\pi$ を作図できます。次に[超越数の作図不能性](#lem-sqc7-transcendental-obstruction)の前半、すなわち「作図可能なら代数的」を作図された実数 $\pi$ に適用します。従って $\pi$ は代数的となり、[TRN11 の超越性](../../../代数系/TRN/TRN11/index.md#cor-trn11-pi-transcendental)と矛盾します。
<!-- solution-end -->

**SQC7-A3（半径の変更）**  
半径 $3$ の円と等積の正方形の一辺 $s>0$ を求めよ。また $s$ が作図できるなら $\sqrt\pi$ も作図できる理由を示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

円の面積は $9\pi$ なので、等積条件は $s^2=9\pi$ です。$s>0$ より $s=3\sqrt\pi$。有理数 $3$ は作図可能で非零なので、[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)で $s/3=\sqrt\pi$ を作図できます。これは[円積不可能性](#thm-sqc7-circle-squaring-impossible)に反します。
<!-- solution-end -->

**SQC7-A4（無理数なのに作図できる）**  
$\sqrt2$ は無理数だが作図可能であることを説明し、「無理数なら作図できない」という主張のどこが破綻するか述べよ。

- Level: A

<!-- solution-start -->
**詳細解答**

$\sqrt2=p/q$ と既約分数で書けるなら $p^2=2q^2$ より $p$ は偶数です。$p=2k$ とすると $q^2=2k^2$ となり $q$ も偶数で、既約性に反します。従って $\sqrt2$ は無理数です。

一方、辺長 $1$ の正方形の対角線は Pythagoras の定理から

$$
\sqrt{1^2+1^2}=\sqrt2
$$

であり、定規とコンパスで得られます。作図可能性を特徴付けるのは有理性ではなく[実二次拡大列の存在](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)です。
<!-- solution-end -->

**SQC7-A5（作図できる近似）**  
半径 $1$ の円に対し、一辺 $\sqrt{22/7}$ の正方形を作れることと、この正方形が厳密には等積でないことをそれぞれ示せ。

- Level: A

<!-- solution-start -->
**詳細解答**

$22/7$ は正の有理数なので[非負平方根の有限作図](../SQC2/index.md#prop-sqc2-positive-square-root)により $\sqrt{22/7}$ を作れます。正方形の面積は $(\sqrt{22/7})^2=22/7$、円の面積は $\pi$ です。[SQC6 の $\pi$ の無理性](../SQC6/index.md#thm-sqc6-pi-irrational)により $\pi\ne22/7$ なので面積は一致しません。近似可能性は厳密作図可能性を含意しません。
<!-- solution-end -->

### Level B：命題の向きと問題の範囲

**SQC7-B1（定理の例外を外せない）**  
「任意の代数的数 $\alpha$ について $e^\alpha$ は超越数」と書いた場合の反例を示し、正しい仮定を述べよ。$\alpha=i\pi$ へ適用するときは何を背理法で仮定しているか明確にせよ。

- Level: B

<!-- solution-start -->
**詳細解答**

$\alpha=0$ は $X$ の根なので代数的ですが、$e^0=1$ は $Y-1$ の根で代数的です。正しい[Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)は $\alpha\ne0$ を要求します。

$\alpha=i\pi$ に適用するためには、まず $\pi$ が代数的だと**仮定**し、$i$ の代数性と積の閉性から $i\pi$ の代数性を導きます。また $\pi>0$ により指数は非零です。

それにもかかわらず $e^{i\pi}=-1$ は代数的なので定理と矛盾し、背理法の仮定が偽になります。最初から $i\pi$ が代数的だと断言してはいけません。
<!-- solution-end -->

**SQC7-B2（$\sqrt\pi$ の代数性と $\pi$ の代数性）**  
$\pi$ が代数的なら $\sqrt\pi$ も代数的であり、逆も成り立つことを示せ。ただし、これだけでは $\sqrt\pi$ の**作図可能性**を判定できない理由も述べよ。

- Level: B

<!-- solution-start -->
**詳細解答**

まず $u=\sqrt\pi$ が代数的なら、$\mathbb Q(u)/\mathbb Q$ は有限拡大です。その元 $\pi=u^2$ は[有限拡大の元は代数的](../../../代数系/FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)から代数的です。

逆に $\pi$ が代数的なら $\mathbb Q(\pi)/\mathbb Q$ は有限です。$u$ は $X^2-\pi\in\mathbb Q(\pi)[X]$ の根だから

$$
[\mathbb Q(\pi,u):\mathbb Q(\pi)]\le2.
$$

[塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)で $\mathbb Q(\pi,u)/\mathbb Q$ も有限となり、その元 $u$ は代数的です。

しかし[実二次拡大列の必要十分条件](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)は「代数的」というだけより強く、一般の代数的数がすべて作図可能とは限りません。今回は $\pi$ が超越的なので、その必要条件の段階で否定できます。
<!-- solution-end -->

**SQC7-B3（特別な長さを最初から渡す）**  
与えられた半径 $1$ の円に加え、初期データとして長さ $\sqrt\pi$ の線分を特別に渡したとする。等積正方形は作れるか。また、このことは[円積不可能性](#thm-sqc7-circle-squaring-impossible)と矛盾するか。

- Level: B

<!-- solution-start -->
**詳細解答**

渡された線分の長さを辺とする正方形は、垂線を立てて長さを写す有限操作で作れます。その面積は $(\sqrt\pi)^2=\pi$ なので円と等積です。しかしこの場合、問題の初期データに通常の作図では得られない $\sqrt\pi$ が**含まれています**。定理の仮定は単位長と円を出発点とし、その後の長さを通常の有限作図で得ることです。入力の条件を変えた新しい問題が解けても、定理との矛盾ではありません。
<!-- solution-end -->

**SQC7-B4（相似による正規化）**  
半径 $r>0$ だけが入力の円に対し、等積正方形の一辺が $s$ とする。$s/r=\sqrt\pi$ を示し、なぜ「$r$ が未知の実数である」というだけで作図不能性の主張が崩れないか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**

面積等式は $s^2=\pi r^2$ です。$r,s>0$ なので両辺を $r^2$ で割って正の平方根を取り、

$$
\frac{s^2}{r^2}=\pi,\qquad \frac{s}{r}=\sqrt\pi
$$

となります。全作図を $1/r$ 倍しても、直線・円と交点の関係はそのまま保たれるため、半径 $r$ を単位 $1$ と見た有限作図へ移せます。従って等積正方形が作れたなら、単位円について $s/r$ が作図できたことになります。これは[円積不可能性](#thm-sqc7-circle-squaring-impossible)に反します。議論で重要なのは $r$ の十進表示や $\mathbb Q$ 上の代数性ではなく、**追加の独立な初期長さを与えていない**という条件です。
<!-- solution-end -->

### Level C：全体を組み立て、逆を吟味する

**SQC7-C1（古典的円積不可能性の完全な論理鎖）**  
単位円と有限回の定規とコンパスだけを許すとする。次を順に示せ。

1. $\pi$ が代数的だと仮定すると $i\pi$ は零でない代数的数となる。
2. Hermite–Lindemann の定理から矛盾が出る。
3. 等積正方形の作図を仮定すると $\pi$ が代数的となる。
4. 以上が証明する不可能性と、証明しない不可能性を区別する。

- Level: C

<!-- solution-start -->
**詳細解答**

**(1)** $i$ は $X^2+1\in\mathbb Q[X]$ の根なので代数的です。$\pi$ も代数的と仮定すると、$\mathbb Q(i,\pi)$ は有限拡大であり、[有限拡大の元は代数的](../../../代数系/FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)から $i\pi$ は代数的です。$\pi>0$ かつ $i\ne0$ だから $i\pi\ne0$ です。

**(2)** 非零代数的な指数 $\alpha=i\pi$ に[Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)を適用すると $e^{i\pi}$ は超越数です。しかし[複素指数のEuler表示](../../../解析系/CA/CA1/index.md#thm-ca1-complex-exponential)から

$$
e^{i\pi}=\cos\pi+i\sin\pi=-1
$$

であり、$-1$ は $Y+1=0$ の根だから代数的です。矛盾により $\pi$ は超越数です。

**(3)** 等積正方形の辺を $s>0$ とすれば、[円積への帰着](../SQC6/index.md#prop-sqc6-squaring-reduction)により $s^2=\pi$。仮定した有限作図で $s$ が得られるので、[四則演算の有限作図](../SQC2/index.md#prop-sqc2-field-operations)で $s\cdot s=\pi$ が得られます。[作図可能数の代数性](#lem-sqc7-transcendental-obstruction)から $\pi$ は代数的となり、(2)に反します。

**(4)** 以上は、指定の初期データと通常の有限作図による**厳密等積**を否定しました。誤差の小さい近似、追加の長さや道具を入力する別問題、無限回の極限操作の可能性を一括して否定する証明ではありません。
<!-- solution-end -->

**SQC7-C2（誤った逆と量化の監査）**  
次の三つの主張を判定し、真なら証明、偽なら具体的反例または不足する仮定を述べよ。

1. 作図可能な実数は必ず代数的である。
2. 代数的な実数は必ず作図可能である。
3. 任意の円に対し、どのような追加の初期データを与えても、等積正方形を有限回の定規とコンパスで得ることはできない。

- Level: C

<!-- solution-start -->
**詳細解答**

**1 は真。** [実二次拡大列の定理](../../../代数系/FLD/FLD5/index.md#thm-fld5-constructible-quadratic-tower)で作図可能数 $\alpha$ はある有限実二次拡大列の最上段に入り、[塔の公式](../../../代数系/FLD/FLD1/index.md#thm-fld1-tower-law)でその体は $\mathbb Q$ 上有限です。従って[有限拡大の元は代数的](../../../代数系/FLD/FLD1/index.md#prop-fld1-finite-extension-algebraic)から $\alpha$ は代数的です。

**2 は偽。** 例えば $\alpha=\sqrt[3]2$ は $X^3-2=0$ を満たす代数的数です。この多項式は[素数2に関するEisensteinの既約判定](../../../代数系/RNG/RNG4/index.md#thm-rng4-eisenstein)により既約なので $[\mathbb Q(\alpha):\mathbb Q]=3$。作図可能なら[FLD5 の次数必要条件](../../../代数系/FLD/FLD5/index.md#cor-fld5-constructible-degree)で次数が2の冪になるはずですが、3は2の冪ではありません。

**3 は偽。** 半径1の円に加えて、長さ $\sqrt\pi$ の線分を初めから与えれば、その線分を辺とする正方形を有限作図でき、面積は $\pi$ です。[円積不可能性](#thm-sqc7-circle-squaring-impossible)は与えられた円と通常の初期データからの有限作図を否定するのであって、任意の特別な情報を別途与える問題を否定しません。
<!-- solution-end -->

---

## 6. まとめ

1. 有限回の定規とコンパスで得られる実数は、実二次拡大列に入るため代数的です。無理数であることだけでは作図不能を意味しません。
2. [Hermite–Lindemannの定理](../../../代数系/TRN/TRN11/index.md#thm-trn11-hermite-lindemann)と $e^{i\pi}=-1$ から、$\pi$ は超越数です。定理の非零代数的指数という仮定が核心です。
3. 等積正方形の辺 $s$ は $s^2=\pi r^2$ を満たします。半径を単位にすれば $s/r=\sqrt\pi$ となり、その有限作図は $\pi$ の作図をもたらします。超越性と矛盾するため古典的円積は不可能です。
4. 否定されるのは厳密な有限作図です。任意精度の近似や、最初から特別な長さを与える問題とは区別します。
