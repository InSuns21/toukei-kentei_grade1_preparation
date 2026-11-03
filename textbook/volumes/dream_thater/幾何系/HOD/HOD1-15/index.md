# HOD1-15 Hodgeフィルトレーションと純Hodge構造

<!-- definition-example-audit: strict -->

## 1. 複素型の分解に、どの数を係数としていたか

[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)によって、コンパクトKähler多様体の複素係数de Rhamコホモロジーは $(p,q)$ 型へ分かれた。[共役対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)はその成分を入れ替える。しかし、分解された複素ベクトル空間だけを見ても、どの類が有理数係数で作られたかは分からない。

例えば $E_i=\mathbb C/(\mathbb Z+i\mathbb Z)$ で $z=x+iy$ とすると、$dx,dy$ は実である一方、$dz=dx+i\,dy$ は $(1,0)$ 型である。実係数の一次類と $(1,0)$ 型の一次類は、一般には同じ部分空間ではない。この違いを保存したままHodge分解を抽象化したい。

本章では三つを順に行う。

1. 有理ベクトル空間を複素化し、複素共役をどこから得るかを定める。
2. 型の直和を、降下する部分空間の列へ読み替え、そこから元の型を復元する。
3. 前章の[Hodge–Riemann正値性](../HOD1-13/index.md#thm-hod1-13-hodge-riemann)が、いつ有理係数上のpolarizationになるかを確かめる。

特に断らなければ $X$ は滑らか・コンパクト・境界なし、複素次元 $n$ のKähler多様体である。

## 2. 有理構造と複素共役を分ける

整数係数の特異コホモロジー $H^k(X;\mathbb Z)$ は、位相空間の特異単体に整数を割り当てるコチェインから得る群であり、一般にねじれ元（有限の非零整数倍で零になる元）を持ち得る。有理係数 $H^k(X;\mathbb Q)$ は有限次元の $\mathbb Q$ ベクトル空間である。両者を、微分形式で定義したde Rhamコホモロジーと区別しておこう。

**ここで使う位相幾何学的入力。** 滑らかな多様体上のde Rham比較定理は、閉形式を特異サイクルに積分する写像が、複素係数で自然な同型

$$
H^k(X;\mathbb Q)\otimes_{\mathbb Q}\mathbb C
\xrightarrow{\ \simeq\ }H^k_{\mathrm{dR}}(X;\mathbb C)
$$

を与えるというものである。係数変更によって $H^k(X;\mathbb Z)$ のねじれは $\mathbb Q$ への写像で消え、自由部分が有理格子を与える。この比較定理と係数変更の一般論は特異コチェイン・鎖ホモトピーを必要とするため、ここでは**位相幾何学からの入力**として用い、証明済みのde Rham型分解から導いたと主張しない。[de Rham積の説明](../HOD1-10/index.md#def-hod1-10-de-rham-product)とも整合し、比較同型は積・複素共役を保つ。

この同型で有理係数を複素係数の中に置くことを、次のように記号化する。

<a id="def-hod1-15-rational-complexification"></a>

<!-- formal-statement-start -->
> **定義（有理コホモロジーの複素化）**
> $X$ を滑らか・コンパクト・境界なしの多様体、$k\ge0$ とする。$V_{\mathbb Q}=H^k(X;\mathbb Q)$ とし、複素化を

$$
V_{\mathbb C}=V_{\mathbb Q}\otimes_{\mathbb Q}\mathbb C
$$

> と定める。$v\in V_{\mathbb Q}$、$c\in\mathbb C$ に対し $\overline{v\otimes c}=v\otimes\bar c$ と定めた反線形写像を**有理構造に関する複素共役**という。de Rham比較同型を通して $V_{\mathbb C}$ を $H^k_{\mathrm{dR}}(X;\mathbb C)$ と同定する。
<!-- formal-statement-end -->

ここで有理基底 $e_j$ を選び、$v=\sum_jq_je_j$（$q_j\in\mathbb Q$）と書くと、$v\otimes c$ は $\sum_j(q_jc)e_j$ に対応する。一般の複素化の元については

$$
\overline{\sum_jc_je_j}=\sum_j\bar c_je_j
$$

となる。有理基底の変更行列の成分は実数なので、係数の共役と基底変更が可換であり、この操作は基底の選び方に依存しない。微分形式の係数の複素共役と一致するのは比較写像が実係数の積分を保つためである。

<!-- definition-example-start: def-hod1-15-rational-complexification -->
**定義の確認**

平坦トーラス $E_i$ の基本閉路を $\gamma_x(t)=[t]$、$\gamma_y(t)=[it]$（$0\le t\le1$）とする。[楕円曲線の周期計算](../HOD1-09/index.md#prop-hod1-09-elliptic-periods)と同じ持ち上げで $\int_{\gamma_x}dx=1$、$\int_{\gamma_y}dy=1$、交差する積分は0となる。これらは二本の格子生成方向の閉路であり、一次コホモロジーの次元も2なので、$[dx],[dy]$ は一次有理コホモロジーの基底を与える。二つの基底は実形式で表され、

$$
\overline{[dx]+i[dy]}=[dx]-i[dy],\qquad
\overline{[dz]}=[d\bar z].
$$

基底を実だと仮定しただけでなく、有理性を基本閉路への整数の積分で確かめた。$[dz]$ は複素化には属するが、$H^1(E_i;\mathbb Q)$ の元ではない。
<!-- definition-example-end -->

実係数 $H^k(X;\mathbb R)$ は $V_{\mathbb Q}\otimes\mathbb R$ に対応する。整数係数については、$H^k(X;\mathbb Z)$ 全体を実ベクトル空間の部分集合と呼ぶのは正確でない。ねじれを除いた像が格子になる一方、微分形式への写像ではねじれを検出できないからである。

## 3. 純Hodge構造：型だけでなく有理構造を保持する

複素化した空間に、重さ $k$ の二つの添字 $p,q$（和は $k$）で直和分解を付けたい。重要なのは、単に複素部分空間へ分けるだけではなく、前節で指定した共役が $(p,q)$ と $(q,p)$ を交換することだ。

<a id="def-hod1-15-pure-hodge"></a>

<!-- formal-statement-start -->
> **定義（重さkの純Hodge構造）**
> $k\in\mathbb Z$ とし、有限次元 $\mathbb Q$ ベクトル空間 $V_{\mathbb Q}$ と、その複素化 $V_{\mathbb C}$ の有限個の複素部分空間 $V^{p,q}$（$p,q\in\mathbb Z$）が

$$
V_{\mathbb C}=\bigoplus_{p+q=k}V^{p,q},
\qquad\overline{V^{p,q}}=V^{q,p}
$$

> を満たすとき、これを**重さ $k$ の有理純Hodge構造**という。共役は $V_{\mathbb Q}$ を固定するものとする。$V^{p,q}=0$ を含めて添字の和は常に $k$ とする。
<!-- formal-statement-end -->

この定義では $p,q$ が負の純Hodge構造も許す。一方、本章で構成するKähler多様体の $H^k$ では $0\le p,q\le n$ 以外は零である。**重さ**は実次元でも複素次元でもなく、各成分の添字の和で決まる。

<!-- definition-example-start: def-hod1-15-pure-hodge -->
**定義の確認**

重さ1の例として $V_{\mathbb Q}=H^1(E_i;\mathbb Q)$ を使い、

$$
V^{1,0}=\mathbb C[dz],\qquad V^{0,1}=\mathbb C[d\bar z].
$$

二つの生成元は $[dz]=[dx]+i[dy]$、$[d\bar z]=[dx]-i[dy]$ だから、有理基底 $([dx],[dy])$ に関する係数列は $(1,i)^{\mathsf T},(1,-i)^{\mathsf T}$ となる。この列を並べた行列が、二つの生成元の係数から元の複素二次元空間への線形写像を表す。行列式 $-2i\ne0$ よりこの写像は可逆なので、二つの一次元部分空間の交差は零で、和は全体となる。共役は実基底の係数だけを共役にするから $V^{1,0}$ と $V^{0,1}$ を交換する。両者の添字の和は $1$ であり、定義の非自明な条件をすべて満たす。
<!-- definition-example-end -->

<a id="thm-hod1-15-kahler-pure-hodge"></a>

<!-- formal-statement-start -->
> **定理（Kähler多様体の純Hodge構造）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体とする。各 $0\le k\le2n$ に対し、有理コホモロジーの複素化をde Rham比較で同定し、[Hodge型部分空間](../HOD1-06/index.md#def-hod1-06-hodge-summand)を次のように取る。

$$
V_{\mathbb Q}=H^k(X;\mathbb Q),\qquad
V^{p,q}=H^{p,q}(X)\quad(p+q=k).
$$

> このとき、重さ $k$ の有理純Hodge構造が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

有限次元の有理部分は比較同型で与える。直和性はKähler上の[Hodge分解定理](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)、共役条件は[調和型の共役対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)で確認する。この二種類の入力を混同しない。

<!-- proof-start -->
### 証明

$V_{\mathbb Q}$ はコンパクト滑らかな多様体の有限次元有理コホモロジーであり、前節の比較同型で $V_{\mathbb C}=H^k_{\mathrm{dR}}(X;\mathbb C)$ とみなせる。$X$ はKählerでコンパクトなので、[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)の仮定が満たされ、

$$
V_{\mathbb C}=\bigoplus_{p+q=k}H^{p,q}(X)
$$

が成立する。各 $H^{p,q}(X)$ は調和 $(p,q)$ 代表の類なので、[複素共役の調和性](../HOD1-07/index.md#lem-hod1-07-conjugation-harmonic)を代表 $\alpha$ に適用すれば $\bar\alpha$ は調和 $(q,p)$ 形式となる。代表の複素共役は係数に関する共役と一致し、逆向きにも二度共役を取れば戻るから

$$
\overline{H^{p,q}(X)}=H^{q,p}(X).
$$

各 $H^{p,q}$ は $0\le p,q\le n$ の有限個であり、添字は $p+q=k$。よって[純Hodge構造の定義](#def-hod1-15-pure-hodge)を満たす。$\square$
<!-- proof-end -->

この定理に必要なのは有理Kähler類の存在ではない。Kähler形式 $\omega$ の類が実係数であれば、Hodge分解は成立する。次のpolarizationの議論で、**有理な交叉形式**を要求する場面とは条件が違う。

## 4. 分解を「上側の型の列」へ組み替える

直和分解は各 $p,q$ をすべて書き並べるが、複素解析の場面では第一添字が $p$ 以上の成分をまとめた方が便利になる。これをフィルトレーション、すなわち包含関係で降下する部分空間の列として記録する。

<a id="def-hod1-15-filtration"></a>

<!-- formal-statement-start -->
> **定義（Hodgeフィルトレーション）**
> $V_{\mathbb Q}$ を重さ $k$ の有理純Hodge構造とし、$V_{\mathbb C}=\bigoplus_{r+s=k}V^{r,s}$ とする。整数 $p$ に対して、複素部分空間

$$
F^pV_{\mathbb C}=\bigoplus_{r\ge p}V^{r,k-r}
$$

> を**Hodgeフィルトレーション**と呼ぶ。添字集合が空なら零空間とし、必ず $F^{p+1}\subseteq F^p$ を満たす。
<!-- formal-statement-end -->

例えば重さ1で $(1,0),(0,1)$ の二型だけがある場合は、

$$
F^0=V_{\mathbb C},\qquad F^1=V^{1,0},\qquad F^2=0.
$$

$(1,0)$ 成分だけが最も狭い非零の部分空間に残る。フィルトレーションは複素部分空間の列であり、$F^1$ が有理数係数で定義されるとは限らない。

<!-- definition-example-start: def-hod1-15-filtration -->
**定義の確認**

[射影直線のHodge数](../HOD1-09/index.md#prop-hod1-09-projective-line)では、$H^2(\mathbb{CP}^1;\mathbb C)=H^{1,1}$ のみが非零である。よって重さ2の $F^1=H^2$、$F^2=0$、$F^0=H^2$。一方 $E_i$ の重さ1では $F^1=\mathbb C[dx+i\,dy]$ で、基底 $dx,dy$ のどちらとも一致しない。いずれも $r\ge p$ を直接判定して列を構成し、隣接包含を確認できる。
<!-- definition-example-end -->

<a id="thm-hod1-15-opposite-filtration"></a>

<!-- formal-statement-start -->
> **定理（Hodgeフィルトレーションの反対条件と型の復元）**
> $V_{\mathbb Q}$ を重さ $k$ の有理純Hodge構造、その複素化を $V_{\mathbb C}$、Hodgeフィルトレーションを $F^p$ とする。すべての整数 $p$ で

$$
V_{\mathbb C}=F^p\oplus\overline{F^{k-p+1}}
$$

> が成り立ち、$p+q=k$ なら型別成分は

$$
V^{p,q}=F^p\cap\overline{F^q}
$$

> と復元できる。逆に、有限次元有理ベクトル空間の複素化上で有限長の降下フィルトレーションがすべての $p$ について上の反対直和条件を満たせば、交差で作った成分は重さ $k$ の純Hodge構造を与える。
<!-- formal-statement-end -->

### 証明の見取り図

共役は $V^{r,k-r}$ を $V^{k-r,r}$ に送る。従って $\overline{F^q}$ に現れるのは第一添字が $k-q$ 以下の成分である。直和の左右は添字が $p$ を境に分かれ、交差ではちょうど $p$ だけが残る。逆向きは一段ずつフィルトレーションを分割する。

<!-- proof-start -->
### 証明

[純Hodge構造の定義](#def-hod1-15-pure-hodge)で型の共役を確認する。これを[フィルトレーションの定義](#def-hod1-15-filtration)で各項に適用し、共役を取ると

$$
\begin{aligned}
\overline{F^q}
&=\bigoplus_{r\ge q}\overline{V^{r,k-r}}
=\bigoplus_{r\ge q}V^{k-r,r}\\
&=\bigoplus_{s\le k-q}V^{s,k-s},\qquad(s=k-r).
\end{aligned}
$$

$q=k-p+1$ と置くと $k-q=p-1$ なので、$F^p$ は第一添字 $s\ge p$、$\overline{F^{k-p+1}}$ は $s\le p-1$ を集める。元の分解が直和だから、両者の交差は零で、和は全体となる。

次に $q=k-p$ と置けば、$F^p$ の条件は $s\ge p$、$\overline{F^q}$ の条件は $s\le p$ である。両者の共通部分は $s=p$ の成分 $V^{p,k-p}$ だけである。

逆に降下フィルトレーション $F^p$ が反対直和条件を満たすとする。$q=k-p$ と置き、$W^{p,q}=F^p\cap\overline{F^q}$ と定める。$p+1$ での条件は

$$
V_{\mathbb C}=F^{p+1}\oplus\overline{F^{k-p}}
$$

である。任意の $x\in F^p$ を一意に $x=u+v$（$u\in F^{p+1}$、$v\in\overline{F^{k-p}}$）と書く。$F^{p+1}\subseteq F^p$ なので $v=x-u\in F^p$、したがって $v\in W^{p,k-p}$。また二つの空間の共通部分は零である。ゆえに

$$
F^p=F^{p+1}\oplus W^{p,k-p}.
$$

有限長なのでこれを両端まで反復すると $V_{\mathbb C}=\bigoplus_pW^{p,k-p}$ が得られ、$\overline{W^{p,q}}=\overline{F^p}\cap F^q=W^{q,p}$ も成り立つ。したがって[純Hodge構造](#def-hod1-15-pure-hodge)の二条件が成立する。$\square$
<!-- proof-end -->

**手計算の見取り図（$E_i$）。** $F^1=\mathbb C[dz]$ に対して $\overline{F^1}=\mathbb C[d\bar z]$。上で計算した行列式 $-2i$ が零でないため、$H^1_{\mathbb C}=F^1\oplus\overline{F^1}$。また $F^1\cap\overline{F^0}=F^1$ なので $(1,0)$ 型を再現する。これは単なる「式の読み替え」ではなく、有理構造が定める共役を使って型情報を回復する操作である。

## 5. 有理類であっても $(r,r)$ 型とは限らない

重さ $2r$ の類は、実係数であるだけでは $(r,r)$ 型とは限らない。複素型と有理性の二条件を同時に課す必要がある。

<a id="def-hod1-15-hodge-class"></a>

<!-- formal-statement-start -->
> **定義（有理Hodge類）**
> $X$ を滑らか・コンパクト・境界なしのKähler多様体、$r\ge0$ とする。de Rham比較で $H^{2r}(X;\mathbb Q)$ を $H^{2r}(X;\mathbb C)$ に埋め込む。その元 $a$ が

$$
a\in H^{r,r}(X)\cap H^{2r}(X;\mathbb Q)
$$

> を満たすとき、$a$ を次数 $2r$ の**有理Hodge類**という。
<!-- formal-statement-end -->

この定義では $H^{r,r}(X)$ は[Hodge分解による型別成分](../HOD1-06/index.md#def-hod1-06-hodge-summand)であって、任意の微分形式の点ごとの型を意味しない。また合理的な判定法は[反対フィルトレーション定理](#thm-hod1-15-opposite-filtration)から出る。有理類 $a$ は共役で不変なので、

$$
a\in F^r\quad\Longleftrightarrow\quad
a\in F^r\cap\overline{F^r}=H^{r,r}.
$$

「有理だから $(r,r)$」でも「$(r,r)$ だから有理」でもない。

<!-- definition-example-start: def-hod1-15-hodge-class -->
**定義の確認**

複素二次元トーラス $T=E_i\times E_i$ で $z_j=x_j+iy_j$ とする。基本閉路の積分から $[dx_j],[dy_j]$ は整係数一次類に対応し、これらの外積は有理二次類である。$a=[dx_1\wedge dy_1]$ について

$$
dx_1\wedge dy_1=\frac{i}{2}dz_1\wedge d\bar z_1
$$

が成り立つ。この係数は次の外積展開から決まる。

$$
dz_1\wedge d\bar z_1
=(dx_1+i\,dy_1)\wedge(dx_1-i\,dy_1)
=-2i\,dx_1\wedge dy_1.
$$

従って $a\in H^{1,1}$ で、有理Hodge類である。一方 $b=[dx_1\wedge dx_2]$ は有理でも

$$
dx_1\wedge dx_2=\frac14\bigl(
dz_1\wedge dz_2+dz_1\wedge d\bar z_2
+d\bar z_1\wedge dz_2+d\bar z_1\wedge d\bar z_2\bigr)
$$

となり、$(2,0)$ と $(0,2)$ の非零成分を持つ。これらの定数係数形式は[トーラスの調和性](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)を満たすので、成分を完全形式で消すこともできない。従って $b$ は有理Hodge類ではない。
<!-- definition-example-end -->

**Hodge予想の位置。** $X$ が滑らかな**複素射影**多様体のとき、余次元 $r$ の代数的部分多様体から得られるコホモロジー類は $(r,r)$ 型の有理類である（このサイクル類の性質も本章では証明しない）。**Hodge予想**は逆向きに、すべての有理Hodge類が余次元 $r$ の代数的サイクルの類の $\mathbb Q$ 線形結合で表される、と主張する。これは一般には未解決であり、本章で証明する主張ではない。射影性を外した一般Kähler多様体へ、同じ代数的サイクルの結論をそのまま拡張しない。

## 6. 原始部分はいつ有理polarizationを持つか

[原始コホモロジー](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)は、Kähler類 $[\omega]$ を繰り返し掛けたときの核で定義した。これはまず複素・実ベクトル空間の定義である。$[\omega]$ が有理コホモロジーから来る場合に限って、その同じ写像を有理係数上で定義できる。以下の $a\smile b$ は[de Rham類の積](../HOD1-10/index.md#def-hod1-10-de-rham-product)であり、閉代表 $\alpha,\beta$ を用いると $[\alpha\wedge\beta]$ に対応する。$w^j$ はこの積を $j$ 回行う記法である。交叉積分の符号を調べる前に、係数体を区別しよう。

有理純Hodge構造の上の**polarization（偏極）**は、共役と組み合わせると各Hodge型で正になる有理双線形形式である。[双線形形式](../../../基礎科目/LA/LA3E/index.md#def-la3e-bilinear-form)の二変数それぞれについて線形という条件を、ここでは係数体 $\mathbb Q$ で用い、複素化後も両変数について**複素線形**に延長する。これは[前章のHermite形式](../HOD1-13/index.md#def-hod1-13-primitive-pairing)の第1変数にある共役線形性とは異なる。単なる正定値内積とは異なり、重さが奇数なら交代形式になる。

<a id="def-hod1-15-polarization"></a>

<!-- formal-statement-start -->
> **定義（純Hodge構造のpolarization）**
> 重さ $k$ の有理純Hodge構造 $V_{\mathbb Q}$ に対するpolarizationとは、$\mathbb Q$ 値の双線形形式 $Q:V_{\mathbb Q}\times V_{\mathbb Q}\to\mathbb Q$ で、複素双線形に延長したとき次を満たすものをいう。
>
> **（P1）** $Q(b,a)=(-1)^kQ(a,b)$。
>
> **（P2）** $Q(V^{p,q},V^{r,s})=0$、ただし $(r,s)=(q,p)$ の場合を除く。
>
> **（P3）** $0\ne v\in V^{p,q}$ なら、次の量は実数で正である。

$$
i^{q-p}Q(\overline v,v)>0.
$$
<!-- formal-statement-end -->

第1変数を共役するこの規約は、[前章のHermite形式](../HOD1-13/index.md#def-hod1-13-primitive-pairing)に合わせた。P3と型間の直交性により、全体のHermite形式は正定値となり、$Q$ は非退化である。

<!-- definition-example-start: def-hod1-15-polarization -->
**定義の確認**

楕円曲線 $E_i$ に $\int_{E_i}dx\wedge dy=1$ の向きを取り、$V_{\mathbb Q}=H^1(E_i;\mathbb Q)$ とする。ここで $a=[\alpha],b=[\beta]$ に対し $Q(a,b)=\int_{E_i}\alpha\wedge\beta$ であり、積分には閉形式の代表を用いる。二つの一次形式の積は二次形式で、$dx\wedge dx=dy\wedge dy=0$、$dy\wedge dx=-dx\wedge dy$ である。よって

$$
Q([dx],[dx])=Q([dy],[dy])=0,\qquad
Q([dx],[dy])=1,\quad Q([dy],[dx])=-1.
$$

これらは[双線形形式の行列表示](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix)と同じ基底展開（ここでは $\mathbb Q$ 係数）で任意の $Q(a,b)$ を決める。有理基底 $([dx],[dy])$ における行列は

$$
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
$$

で有理、交代、行列式は $1\ne0$ なので非退化である。同じ型 $(1,0)$ と $(1,0)$ の組では二つの $(1,0)$ 形式を楔積すると零であり、同じことが $(0,1)$ 型でも成り立つからP2を満たす。$v=c[dz]$ に対して

$$
Q(\bar v,v)=|c|^2\int(d\bar z)\wedge dz
=2i|c|^2,
\qquad i^{-1}Q(\bar v,v)=2|c|^2>0.
$$

$(0,1)$ 型の $v=c[d\bar z]$ では

$$
Q(\bar v,v)=-2i|c|^2,\qquad i^{1-0}Q(\bar v,v)=2|c|^2>0
$$

となり、こちらでもP3を確認できる。重さ1の交代形式を、誤って実対称な正定値形式と考えないことが肝心である。
<!-- definition-example-end -->

<a id="thm-hod1-15-primitive-polarization"></a>

<!-- formal-statement-start -->
> **定理（有理Kähler類から得る原始polarization）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n$ のKähler多様体、$0\le k\le n$ とし、Kähler形式 $\omega$ の類が $H^2(X;\mathbb Q)$ の像にあると仮定する。その有理類を $w$ と書く。有理原始部分

$$
P^k_{\mathbb Q}=\ker\{w^{n-k+1}:H^k(X;\mathbb Q)
\longrightarrow H^{2n-k+2}(X;\mathbb Q)\}
$$

> は重さ $k$ の純Hodge部分構造を持つ。また、$a,b\in P^k_{\mathbb Q}$ に対する

$$
Q_k(a,b)=(-1)^{k(k-1)/2}
\int_X a\smile b\smile w^{n-k}
$$

> は $\mathbb Q$ 値を取り、[polarization](#def-hod1-15-polarization)のP1–P3を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

有理性は $w$ を有理係数で掛けられることから来る。[原始型分解](../HOD1-12/index.md#prop-hod1-12-type-decomposition)が共役に保たれるため、有理核も純Hodge構造になる。直交性は積分される型の次数、正値性は[Hodge–Riemann関係](../HOD1-13/index.md#thm-hod1-13-hodge-riemann)を、その符号のまま適用して導く。

<!-- proof-start -->
### 証明

有理係数の写像 $w^{n-k+1}$ は線形である。有理基底を選ぶとこの写像は有理数成分の行列 $A$ で表され、$A$ を有理数上で行基本変形すれば核の基底が取れる。同じ変形は複素数上でも可逆だから、複素係数の核は有理係数の核の基底を複素係数で張ったものに等しい。従って

$$
P^k_{\mathbb Q}\otimes\mathbb C
=\ker\{[\omega]^{n-k+1}:H^k(X;\mathbb C)\to H^{2n-k+2}(X;\mathbb C)\}.
$$

右辺は[原始類の型別分解](../HOD1-12/index.md#prop-hod1-12-type-decomposition)で $\bigoplus_{p+q=k}P_H^{p,q}$ に等しく、$[\omega]$ は実 $(1,1)$ 型であるため、その核は共役で保存される。従って $P^k_{\mathbb Q}$ は[純Hodge構造の定義](#def-hod1-15-pure-hodge)を満たす。

有理類のcup積は有理係数のままであり、向き付けられたコンパクト多様体の基本類との評価 $\int_X$ は有理数を与える。よって $Q_k$ は有理値である。次数 $k$ の二つの類の交換に $(-1)^{k^2}=(-1)^k$ が掛かるのでP1を満たす。

P2について $a\in P_H^{p,q}$、$b\in P_H^{r,s}$、$p+q=r+s=k$ とする。$\omega^{n-k}$ は $(n-k,n-k)$ 型なので、積分が非零となるには

$$
p+r+n-k=n,\qquad q+s+n-k=n
$$

がともに必要で、これは $r=q,s=p$ を意味する。

最後に非零 $v\in P_H^{p,q}$ を唯一の調和 $(p,q)$ 形式 $\alpha$ で表す。[Hodge–Riemannの積分恒等式](../HOD1-13/index.md#thm-hod1-13-hodge-riemann)へ $a=b=v$ を入力すると、$m=n-k$ に対して

$$
\begin{aligned}
i^{q-p}Q_k(\bar v,v)
&=(-1)^{k(k-1)/2}i^{q-p}
\int_X\bar\alpha\wedge\alpha\wedge\omega^m\\
&=m!\,\|\alpha\|_2^2>0.
\end{aligned}
$$

$\alpha\ne0$ は調和代表の一意性による。これでP3も確かめた。$\square$
<!-- proof-end -->

**仮定を落とすと何が壊れるか。** $T=E_i\times E_i$ で $\omega_1=dx_1\wedge dy_1$、$\omega_2=dx_2\wedge dy_2$ とし、$\omega=\sqrt2\,\omega_1+\omega_2$ を取る。これは正のKähler形式だが有理Kähler類ではない。$n=2,k=0$ として $1\in H^0(T;\mathbb Q)$ を使えば

$$
Q_0(1,1)=\int_T\omega^2
=2\sqrt2\int_T\omega_1\wedge\omega_2=2\sqrt2\notin\mathbb Q.
$$

ここでは正値性は失われないが、**この $\omega$ から作る $Q_0$ が有理値であるという部分が破れる**。他の有理Kähler類を選べる可能性まで否定する例ではない。一般のコンパクトKähler多様体に有理Kähler類があると無条件に仮定してはいけない。

## 7. 演習：分解、共役、有理性、正値性を往復する

### Level A：係数と添字を手で確認する

<a id="ex-hod1-15-a01"></a>
#### HOD1-15-A01 有理基底の複素化と共役
- Level: A

$V_{\mathbb Q}=\mathbb Qe_1\oplus\mathbb Qe_2$ とする。$v=(2+i)e_1+(1-3i)e_2$ と $u=e_1+2e_2$ について、共役、実係数性、有理係数性をそれぞれ判定せよ。

<!-- solution-start -->
### 詳細解答

[複素化の共役](#def-hod1-15-rational-complexification)は有理基底を固定し係数だけを共役にするので、

$$
\bar v=(2-i)e_1+(1+3i)e_2,\qquad \bar u=u.
$$

有理元は特に実元であり、$u$ の係数は整数なので $u\in V_{\mathbb Q}\subset V_{\mathbb R}$。$v\ne\bar v$ なので $v\notin V_{\mathbb R}$、従って $v\notin V_{\mathbb Q}$。判定したのは「係数が複素か」だけでなく、有理部分空間を指定した共役で変わらないかどうかである。
<!-- solution-end -->

<a id="ex-hod1-15-a02"></a>
#### HOD1-15-A02 射影直線の二つの重さ
- Level: A

$X=\mathbb{CP}^1$ とする。$H^0(X;\mathbb C)$ と $H^2(X;\mathbb C)$ に対する $F^p$ を、$p=-1,0,1,2,3$ の全てについて列挙せよ。

<!-- solution-start -->
### 詳細解答

[射影直線のHodge型](../HOD1-09/index.md#prop-hod1-09-projective-line)より $H^0=H^{0,0}\simeq\mathbb C$、$H^2=H^{1,1}\simeq\mathbb C$、他型は零である。[フィルトレーションの定義](#def-hod1-15-filtration)で $r\ge p$ を調べると、

$$
\begin{array}{c|ccccc}
p&-1&0&1&2&3\\\hline
F^pH^0&H^0&H^0&0&0&0\\
F^pH^2&H^2&H^2&H^2&0&0
\end{array}
$$

となる。$H^2$ は重さ2だが第一添字は $r=1$ なので $F^2=0$。重さとフィルトレーション添字を取り違えてはいけない。
<!-- solution-end -->

<a id="ex-hod1-15-a03"></a>
#### HOD1-15-A03 楕円曲線で反対直和を検算
- Level: A

$E_i$ の $H^1$ で $F^1=\mathbb C[dx+i\,dy]$ と $\overline{F^1}$ を求め、$F^1\oplus\overline{F^1}=H^1(E_i;\mathbb C)$ を基底行列で確認せよ。

<!-- solution-start -->
### 詳細解答

$dx,dy$ は有理したがって実基底であるから、[共役の定義](#def-hod1-15-rational-complexification)より $\overline{F^1}=\mathbb C[dx-i\,dy]$ となる。基底 $(dx,dy)$ における二つの生成元を列に並べると

$$
A=\begin{pmatrix}1&1\\ i&-i\end{pmatrix},
\qquad\det A=-2i\ne0.
$$

従って二列は複素一次独立で、二次元の $H^1$ 全体を直和で張る。これは[反対直和定理](#thm-hod1-15-opposite-filtration)で $k=1,p=1$ とした場合である。
<!-- solution-end -->

<a id="ex-hod1-15-a04"></a>
#### HOD1-15-A04 有理Hodge類でない例
- Level: A

$T=E_i\times E_i$ で $b=[dx_1\wedge dx_2]$ とする。$b$ が有理二次類である理由と、$(1,1)$ 型でない理由を型別に示せ。

<!-- solution-start -->
### 詳細解答

$dx_1,dx_2$ は整数周期を持つ一次類で、cup積の比較によって $b$ も整数係数から来る。$dx_j=(dz_j+d\bar z_j)/2$ を二つ代入すると

$$
b=\frac14[dz_1\wedge dz_2]
+\frac14[dz_1\wedge d\bar z_2]
+\frac14[d\bar z_1\wedge dz_2]
+\frac14[d\bar z_1\wedge d\bar z_2].
$$

第1項は $(2,0)$、中央二項は $(1,1)$、最後は $(0,2)$ 型である。[定数係数調和形式](../HOD1-09/index.md#lem-hod1-09-flat-harmonic)の直和分解で第1項と最後は非零なので $b\notin H^{1,1}$。[Hodge類の定義](#def-hod1-15-hodge-class)の型条件を満たさない。
<!-- solution-end -->

### Level B：直和の再構成と符号判定

<a id="ex-hod1-15-b01"></a>
#### HOD1-15-B01 フィルトレーションから重さ2を復元
- Level: B

$V_{\mathbb Q}=\mathbb Qe_1\oplus\mathbb Qe_2\oplus\mathbb Qe_3$、$u=e_1+i e_2$、$\bar u=e_1-i e_2$ とする。$F^0=V_{\mathbb C}$、$F^1=\mathbb Cu\oplus\mathbb Ce_3$、$F^2=\mathbb Cu$、$F^3=0$（さらに両端は一定）とする。重さ2の反対条件を検証し、$V^{2,0},V^{1,1},V^{0,2}$ を復元せよ。

<!-- solution-start -->
### 詳細解答

$u,\bar u,e_3$ は有理基底 $(e_1,e_2,e_3)$ において行列

$$
\begin{pmatrix}1&1&0\\i&-i&0\\0&0&1\end{pmatrix}
$$

を作り、行列式は $-2i\ne0$。従って $V_{\mathbb C}=\mathbb Cu\oplus\mathbb C\bar u\oplus\mathbb Ce_3$。重さ $k=2$ だから[反対条件](#thm-hod1-15-opposite-filtration)は $F^p\oplus\overline{F^{3-p}}=V_{\mathbb C}$ である。$p=1$ では $F^1=\mathbb Cu\oplus\mathbb Ce_3$ と $\overline{F^2}=\mathbb C\bar u$、$p=2$ では $F^2=\mathbb Cu$ と $\overline{F^1}=\mathbb C\bar u\oplus\mathbb Ce_3$ で、どちらも直和となる。$p\le0$ と $p\ge3$ では一方が全体、他方が零である。

交差を計算すると

$$
\begin{aligned}
V^{2,0}&=F^2\cap\overline{F^0}=\mathbb Cu,\\
V^{1,1}&=F^1\cap\overline{F^1}=\mathbb Ce_3,\\
V^{0,2}&=F^0\cap\overline{F^2}=\mathbb C\bar u.
\end{aligned}
$$

三つの和は重さ2で、共役が両端を交換し中央を固定することまで確認した。
<!-- solution-end -->

<a id="ex-hod1-15-b02"></a>
#### HOD1-15-B02 奇数重さの有理な純型類
- Level: B

重さ $k$ の有理純Hodge構造で $p\ne q$、$p+q=k$ とする。$V^{p,q}\cap V_{\mathbb Q}=\{0\}$ を示し、$E_i$ の $F^1\cap H^1(E_i;\mathbb Q)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$v\in V^{p,q}\cap V_{\mathbb Q}$ とする。有理元は共役で固定されるので、[純Hodge構造の共役条件](#def-hod1-15-pure-hodge)より

$$
v=\bar v\in\overline{V^{p,q}}=V^{q,p}.
$$

$p\ne q$ なら $V^{p,q}$ と $V^{q,p}$ は直和の異なる成分で、交差は零。よって $v=0$。$E_i$ では $F^1=V^{1,0}$、$1\ne0$ なので交差は零になる。有理基底で直接見ても $a[dx]+b[dy]=c([dx]+i[dy])$ は $a=c,b=ic$ を強制し、$a,b\in\mathbb Q$ から $a=b=c=0$ と分かる。
<!-- solution-end -->

<a id="ex-hod1-15-b03"></a>
#### HOD1-15-B03 複素曲面の有理原始類
- Level: B

$T=E_i\times E_i$、$w=[dx_1\wedge dy_1]+[dx_2\wedge dy_2]$、$a=[dx_1\wedge dy_1]-[dx_2\wedge dy_2]$ とする。$a$ が $P^2_{\mathbb Q}$ に属すること、Hodge型、$Q_2(a,a)$ を計算せよ。$\int_Tdx_1\wedge dy_1\wedge dx_2\wedge dy_2=1$ とする。

<!-- solution-start -->
### 詳細解答

$\omega_j=dx_j\wedge dy_j$ と略記する。$\omega_j\wedge\omega_j=0$ は二つの同じ一次形式が外積に現れるためで、二次形式同士は符号なしで交換する。従って

$$
(\omega_1-\omega_2)\wedge(\omega_1+\omega_2)
=\omega_1^2-\omega_2^2=0.
$$

$n=k=2$ だから[原始核の定義](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)で $w^{n-k+1}=w$ の核に入る。各 $\omega_j=(i/2)dz_j\wedge d\bar z_j$ は $(1,1)$ 型で、定数係数調和代表なので $a\in P_H^{1,1}$。さらに

$$
a\smile a=(\omega_1-\omega_2)^2=-2\omega_1\wedge\omega_2,
$$

ゆえに[有理原始polarization](#thm-hod1-15-primitive-polarization)の規約 $(-1)^{2(2-1)/2}=-1$ を代入して $Q_2(a,a)=-(-2)=2>0$。交叉積の値 $-2$ と偏極後の値 $+2$ を区別した。
<!-- solution-end -->

<a id="ex-hod1-15-b04"></a>
#### HOD1-15-B04 有理性の仮定と反例の射程
- Level: B

同じ $T$ に $\omega'=\sqrt2\,\omega_1+\omega_2$ を入れる。$Q_0(1,1)$ を再計算し、「純Hodge構造が失われる」「$Q_0$ が有理値ではない」「$T$ にpolarizationが存在しない」のどの結論が正しいか説明せよ。

<!-- solution-start -->
### 詳細解答

$k=0,n=2$ だから $(-1)^{k(k-1)/2}=1$、べきは $\omega'^2$ である。$\omega_1^2=\omega_2^2=0$、二次形式の交換符号は正なので

$$
\int_T(\sqrt2\,\omega_1+\omega_2)^2
=2\sqrt2\int_T\omega_1\wedge\omega_2=2\sqrt2.
$$

値は正だが有理数ではない。よってこの $\omega'$ から作る $Q_0$ が $\mathbb Q$ 値という条件に違反する。一方、[Kähler純Hodge構造の定理](#thm-hod1-15-kahler-pure-hodge)はKähler類の有理性を仮定せず、分解は存在する。また $w=\omega_1+\omega_2$ は別の有理Kähler類を与えるので、$T$ 自体にpolarizationが存在しないとは結論できない。
<!-- solution-end -->

### Level C：異なる条件を一つの例で組み立てる

<a id="ex-hod1-15-c01"></a>
#### HOD1-15-C01 二次トーラスのフィルトレーションと有理Hodge類
- Level: C

$T=E_i\times E_i$ の二次コホモロジーについて、Hodge数から $\dim F^2,\dim F^1,\dim F^0$ を計算せよ。さらに

$$
a=[dx_1\wedge dx_2+dy_1\wedge dy_2],\qquad
b=[dx_1\wedge dx_2-dy_1\wedge dy_2]
$$

について、有理Hodge類かどうかを判定し、$a$ は $F^1$ に属し $b$ は属さないことを示せ。

<!-- solution-start -->
### 詳細解答

[複素トーラスのHodge数](../HOD1-09/index.md#thm-hod1-09-torus-numbers)に $n=2,k=2$ を代入すると

$$
h^{2,0}=\binom22\binom20=1,\quad
h^{1,1}=\binom21^2=4,\quad
h^{0,2}=1.
$$

よって[フィルトレーション](#def-hod1-15-filtration)の第一添字の範囲を直接数えて

$$
\dim F^2=1,\qquad\dim F^1=1+4=5,\qquad
\dim F^0=1+4+1=6.
$$

$dx_j=(dz_j+d\bar z_j)/2$ と $dy_j=(dz_j-d\bar z_j)/(2i)$ を用い、各外積へ分配する。$1/(2i)^2=-1/4$ に注意すると、括弧を外した段階では

$$
\begin{aligned}
dx_1\wedge dx_2
&=\tfrac14(dz_1\wedge dz_2+dz_1\wedge d\bar z_2
+d\bar z_1\wedge dz_2+d\bar z_1\wedge d\bar z_2),\\
dy_1\wedge dy_2
&=-\tfrac14(dz_1\wedge dz_2-dz_1\wedge d\bar z_2
-d\bar z_1\wedge dz_2+d\bar z_1\wedge d\bar z_2).
\end{aligned}
$$

従って和では同型の両端成分が消え、差では中央二成分が消える。

$$
\begin{aligned}
a&=\frac12[dz_1\wedge d\bar z_2+d\bar z_1\wedge dz_2],\\
b&=\frac12[dz_1\wedge dz_2+d\bar z_1\wedge d\bar z_2].
\end{aligned}
$$

どちらも整数係数一次類の積・差なので有理である。$a$ は $(1,1)$ 成分だけを持ち $F^1$ に含まれるため、[Hodge類の定義](#def-hod1-15-hodge-class)を満たす。一方 $b$ の $(0,2)$ 成分は非零である。$F^1=H^{2,0}\oplus H^{1,1}$ に $(0,2)$ 成分は含まれないので $b\notin F^1$、従ってHodge類ではない。型別の非零性は定数係数調和代表の一意性から従う。
<!-- solution-end -->

<a id="ex-hod1-15-c02"></a>
#### HOD1-15-C02 原始部分の二つの型と偏極の位相因子
- Level: C

$T=E_i\times E_i$、$w=[\omega_1+\omega_2]$、$\omega_j=dx_j\wedge dy_j$ を用いる。$\alpha=\omega_1-\omega_2$ と $\sigma=dz_1\wedge dz_2$ について、原始性、型、$Q_2(\alpha,\alpha)$、$i^{0-2}Q_2(\bar\sigma,\sigma)$ を順に検算せよ。積分は基本領域で行い、$\int_T\omega_1\wedge\omega_2=1$ とする。

<!-- solution-start -->
### 詳細解答

$\alpha$ はB03と同様 $w\wedge\alpha=0$ で $(1,1)$ 型である。$\sigma$ は $(2,0)$ 型で、$w\wedge\sigma$ は $(3,1)$ 型になるが $T$ の複素次元は2だから零である。両者とも定数係数調和形式なので、[原始核と調和代表の対応](../HOD1-12/index.md#thm-hod1-12-harmonic-primitive)から原始類を表す。

$\alpha^2=-2\omega_1\wedge\omega_2$ より、重さ2の符号 $(-1)^{1}=-1$ を掛けて

$$
Q_2([\alpha],[\alpha])=-\int_T\alpha^2=2.
$$

次に $dz_j\wedge d\bar z_j=-2i\omega_j$、次数1の形式の交換は負であるから

$$
\begin{aligned}
\bar\sigma\wedge\sigma
&=d\bar z_1\wedge d\bar z_2\wedge dz_1\wedge dz_2\\
&=-d\bar z_1\wedge dz_1\wedge d\bar z_2\wedge dz_2\\
&=-\bigl(2i\omega_1\bigr)\wedge\bigl(2i\omega_2\bigr)
=4\omega_1\wedge\omega_2.
\end{aligned}
$$

従って $Q_2([\bar\sigma],[\sigma])=-4$。型 $(p,q)=(2,0)$ なので $i^{q-p}=i^{-2}=-1$ を掛けると

$$
i^{-2}Q_2([\bar\sigma],[\sigma])=(-1)(-4)=4>0.
$$

$(1,1)$ と $(2,0)$ では、同じ交叉形式でも正値に変換する位相因子が異なる。[Hodge–Riemann関係](../HOD1-13/index.md#thm-hod1-13-hodge-riemann)の正値を、二つの型で係数と符号まで再現した。
<!-- solution-end -->

## 8. 次へ：周期は有理格子に対して何を測るのか

純Hodge構造は、有理格子と複素部分空間の相対位置を記録する。Hodgeフィルトレーションは、その複素部分空間を入れ子で記述する方法だった。次の講義では楕円曲線 $E_\tau$ の正則一次形式を基本閉路に積分し、得られる周期 $1,\tau$ がこの相対位置をどのように表すかを手計算する。

