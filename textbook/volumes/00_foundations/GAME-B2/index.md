# GAME-B2 平衡ゲーム・Bondareva--Shapley の定理

<!-- definition-example-audit: strict -->

[GAME-B1](../GAME-B1/index.md) では、有限 TU ゲームのコアを

$$
x(N)=v(N),
\qquad
x(S)\ge v(S)\quad(S\subseteq N)
$$

という線形条件で表しました。

そこで3人多数決型ゲーム

$$
v(S)
=
\begin{cases}
1, & |S|\ge2,\\
0, & |S|\le1
\end{cases}
$$

を見ると、三つの二人提携がそれぞれ

$$
x_1+x_2\ge1,
\qquad
x_1+x_3\ge1,
\qquad
x_2+x_3\ge1
$$

を要求する一方、大提携が配れる総額は

$$
x_1+x_2+x_3=1
$$

しかありませんでした。

三つの提携条件をそのまま足すと各プレイヤーの取り分が2回ずつ数えられます。そこで各条件を半分ずつ使えば、

$$
\frac12(x_1+x_2)
+
\frac12(x_1+x_3)
+
\frac12(x_2+x_3)
=
x_1+x_2+x_3.
$$

左辺では、各プレイヤーがちょうど1回ずつ数えられています。

ところが提携側の要求額は、

$$
\frac12\cdot1
+
\frac12\cdot1
+
\frac12\cdot1
=
\frac32.
$$

したがって、どんな配分を選んでも

$$
x(N)\ge\frac32
$$

が必要になります。しかし大提携価値は1です。

この「提携条件を非負の重みで足し合わせ、各プレイヤーをちょうど1回ずつ数える」という操作を一般化したものが、本章の **平衡性（balancedness）** です。

中心問いは、

> **コアを空にする提携要求の衝突を、どのような重み付き条件で完全に検出できるか。**

です。

結論は Bondareva--Shapley の定理です。

$$
\boxed{
\operatorname{Core}(v)\ne\varnothing
\iff
v\text{ は平衡ゲーム}
}
$$

しかも、この定理は協力ゲームだけに固有の魔法ではありません。

[OPT10 の線形計画双対](../OPT10/index.md#def-opt10-lp-dual)で見ると、

$$
\boxed{
\text{提携制約}
\longleftrightarrow
\text{双対変数}
}
$$

となり、平衡重みはコア制約に対する双対変数そのものとして現れます。

---

## 1. 提携条件を重ねるとき、各プレイヤーを何回数えたかが重要になる

3人ゲームで三つの二人提携

$$
\{1,2\},
\qquad
\{1,3\},
\qquad
\{2,3\}
$$

へ重み $1/2$ を置いたとします。

プレイヤー1は最初の二つに含まれるので、

$$
\frac12+\frac12=1.
$$

プレイヤー2も、

$$
\frac12+\frac12=1,
$$

プレイヤー3も、

$$
\frac12+\frac12=1.
$$

したがって、提携合計を重み付きで足すと、

$$
\frac12x(\{1,2\})
+
\frac12x(\{1,3\})
+
\frac12x(\{2,3\})
=
x(N).
$$

この等式は、特定の配分 $x$ の値に依存していません。

提携の重なり方と重みだけから決まっています。

一般の有限プレイヤー集合でも、この性質を定義にします。

<a id="def-game-b2-balanced-weights"></a>

<!-- formal-statement-start -->
> **定義（平衡重み・平衡集合族）**  
> 有限プレイヤー集合 $N$ を考え、空でない各提携
>
$$
S\in2^N\setminus\{\varnothing\}
$$
>
> に非負の重み $\lambda_S\ge0$ を対応させる。
>
> すべてのプレイヤー $i\in N$ について
>
$$
\sum_{\substack{S\subseteq N\\ i\in S}}\lambda_S=1
$$
>
> が成り立つとき、$\lambda=(\lambda_S)$ を **平衡重み（balanced weights）** という。
>
> また、正の重みを持つ提携の集合
>
$$
\mathcal B
=
\{S\subseteq N:\lambda_S>0\}
$$
>
> を、この重みによる **平衡集合族（balanced collection）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-b2-balanced-weights -->

**定義の確認**

$$
N=\{1,2,3\}
$$

として、

$$
\lambda_{\{1,2\}}
=
\lambda_{\{1,3\}}
=
\lambda_{\{2,3\}}
=
\frac12
$$

とし、それ以外を0とします。

プレイヤー1を含む正の重みの提携は $\{1,2\}$ と $\{1,3\}$ なので、

$$
\sum_{S\ni1}\lambda_S
=
\frac12+\frac12
=
1.
$$

プレイヤー2についても、

$$
\sum_{S\ni2}\lambda_S
=
\lambda_{\{1,2\}}
+
\lambda_{\{2,3\}}
=
1.
$$

プレイヤー3についても、

$$
\sum_{S\ni3}\lambda_S
=
\lambda_{\{1,3\}}
+
\lambda_{\{2,3\}}
=
1.
$$

よってこれは平衡重みです。

対応する平衡集合族は、

$$
\mathcal B
=
\bigl\{
\{1,2\},
\{1,3\},
\{2,3\}
\bigr\}
$$

です。
<!-- definition-example-end -->

ここで重みを確率と誤解しないことが重要です。

上の例では、

$$
\sum_S\lambda_S
=
\frac32.
$$

したがって平衡重みは、

$$
\sum_S\lambda_S=1
$$

を要求しません。

要求しているのはあくまで、

$$
\boxed{
\text{各プレイヤーに入ってくる重みの総和が1}
}
$$

です。

---

## 2. 平衡重みは「各プレイヤーの取り分をちょうど1回使う」重ね方である

任意の配分 $x\in\mathbb R^N$ と平衡重み $\lambda$ を考えます。

すると、

$$
\sum_S\lambda_Sx(S)
=
\sum_S\lambda_S\sum_{i\in S}x_i.
$$

有限和なので和の順序を入れ替えて、

$$
\sum_S\lambda_Sx(S)
=
\sum_{i\in N}
x_i
\sum_{S\ni i}\lambda_S.
$$

平衡条件から、

$$
\sum_{S\ni i}\lambda_S=1
$$

なので、

$$
\boxed{
\sum_S\lambda_Sx(S)
=
\sum_{i\in N}x_i
=
x(N)
}
$$

を得ます。

この恒等式が本章全体の核心です。

平衡重みで提携条件を足すと、各プレイヤーの受取額がちょうど1回ずつ現れます。

したがってコア条件

$$
x(S)\ge v(S)
$$

を平衡重みで足すと、左側は必ず大提携の総配分 $x(N)$ に潰れます。

---

## 3. 提携の重み付き要求が大提携価値を超えないことを平衡性と呼ぶ

<a id="def-game-b2-balanced-game"></a>

<!-- formal-statement-start -->
> **定義（平衡ゲーム）**  
> 有限 TU 特性関数形ゲーム $(N,v)$ を考える。
>
> 任意の平衡重み $\lambda=(\lambda_S)$ に対して
>
$$
\sum_{\varnothing\ne S\subseteq N}
\lambda_Sv(S)
\le
v(N)
$$
>
> が成り立つとき、ゲーム $(N,v)$ を **平衡ゲーム（balanced game）** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-game-b2-balanced-game -->

**定義の確認**

GAME-B1 で扱った3人多数決型ゲームでは、

$$
v(\{1,2\})
=
v(\{1,3\})
=
v(\{2,3\})
=
1,
\qquad
v(N)=1.
$$

三つの二人提携へ重み $1/2$ を置く平衡重みに対して、

$$
\sum_S\lambda_Sv(S)
=
\frac12+\frac12+\frac12
=
\frac32.
$$

したがって、

$$
\frac32>1=v(N).
$$

平衡ゲームの条件を破る平衡重みが一つ見つかったので、このゲームは平衡ゲームではありません。
<!-- definition-example-end -->

平衡性は、

> 「どの平衡重ね合わせを使っても、部分提携が要求する価値の重み付き総額が、大提携の総価値を超えない」

という条件です。

一つでも

$$
\sum_S\lambda_Sv(S)>v(N)
$$

となる平衡重みがあれば、それは提携要求が両立不能であることの証明書になります。

---

## 4. コア配分が一つあれば、すべての平衡不等式が自動的に成立する

まず Bondareva--Shapley の一方向は、LP を使わず直接示せます。

<a id="prop-game-b2-core-implies-balanced"></a>

<!-- formal-statement-start -->
> **命題（コアが非空ならゲームは平衡である）**  
> 有限 TU 特性関数形ゲーム $(N,v)$ を考える。
>
> もし
>
$$
\operatorname{Core}(v)\ne\varnothing
$$
>
> なら、任意の平衡重み $\lambda$ に対して
>
$$
\sum_S\lambda_Sv(S)\le v(N)
$$
>
> が成り立つ。したがって $(N,v)$ は平衡ゲームである。
<!-- formal-statement-end -->

### 証明の見取り図

コア配分 $x$ なら各提携について、

$$
x(S)\ge v(S).
$$

これを $\lambda_S\ge0$ で重み付けして足します。

平衡条件により、配分側の重み付き和がちょうど $x(N)$ に変わります。

最後にコアの効率性

$$
x(N)=v(N)
$$

を使います。

<!-- proof-start -->
### 証明

$x\in\operatorname{Core}(v)$ を一つ取ります。

[GAME-B1 のコアの定義](../GAME-B1/index.md#def-game-b1-core)から、すべての非空提携 $S$ について、

$$
x(S)\ge v(S).
$$

平衡重みは $\lambda_S\ge0$ なので、不等号の向きを保ったまま各式へ掛けて足せます。

したがって、

$$
\sum_S\lambda_Sx(S)
\ge
\sum_S\lambda_Sv(S).
$$

一方、平衡条件から、

$$
\sum_S\lambda_Sx(S)
=
\sum_{i\in N}
x_i
\sum_{S\ni i}\lambda_S
=
\sum_{i\in N}x_i
=
x(N).
$$

さらにコアの効率性から、

$$
x(N)=v(N).
$$

よって、

$$
\sum_S\lambda_Sv(S)
\le
v(N).
$$

これは任意の平衡重みについて成り立つので、$(N,v)$ は平衡ゲームです。

$\square$
<!-- proof-end -->

この方向の証明から、

$$
\boxed{
\text{平衡性違反を一つ見つければ、コアが空だと確定する}
}
$$

ことが分かります。

しかし逆方向、

$$
\text{すべての平衡不等式が成り立つ}
\Longrightarrow
\text{コア配分が存在する}
$$

は、直接配分を作るだけでは見えにくいところです。

ここで LP 双対が必要になります。

---

## 5. コアの等式をいったん外し、「全提携を満足させる最小総配分」を考える

コアは、

$$
x(S)\ge v(S)
\quad
(\varnothing\ne S\subseteq N)
$$

という全提携制約と、

$$
x(N)=v(N)
$$

という効率性からできています。

そこでまず効率性の等式を外し、

> **すべての提携要求を満たすには、総額として最低いくら配る必要があるか。**

を考えます。

次の線形計画を置きます。

$$
\tag{P}
\begin{aligned}
\text{minimize}\quad
&
\sum_{i\in N}x_i
\\
\text{subject to}\quad
&
\sum_{i\in S}x_i\ge v(S)
\qquad
(\varnothing\ne S\subseteq N).
\end{aligned}
$$

ここで各 $x_i$ は自由変数です。

この主問題は必ず実行可能です。

実際、

$$
M
=
\max\left(
0,
\max_{\varnothing\ne S\subseteq N}v(S)
\right)
$$

と置き、

$$
x_i=M
\qquad(i\in N)
$$

とすれば、非空な $S$ に対して、

$$
x(S)=|S|M\ge M\ge v(S).
$$

したがって実行可能解が存在します。

さらに制約の中には $S=N$ も含まれるので、

$$
\sum_{i\in N}x_i
=
x(N)
\ge
v(N).
$$

よって目的関数は下に有界です。

したがって、この有限次元線形計画は有限最適値を持ちます。

最適値を $p^*$ と書くと、

$$
p^*\ge v(N).
$$

もし

$$
p^*=v(N)
$$

なら、最適解 $x^*$ は全提携制約を満たし、かつ

$$
x^*(N)=v(N)
$$

なので、

$$
x^*\in\operatorname{Core}(v)
$$

です。

逆にコア配分が存在すれば、それは目的値 $v(N)$ の主実行可能解なので、

$$
p^*\le v(N).
$$

すでに $p^*\ge v(N)$ ですから、

$$
p^*=v(N).
$$

つまり、

$$
\boxed{
\operatorname{Core}(v)\ne\varnothing
\iff
p^*=v(N)
}
$$

です。

---

## 6. 主問題の双対変数を計算すると、平衡重みがそのまま現れる

各提携制約を、

$$
v(S)-x(S)\le0
$$

と書きます。

この制約に非負の双対変数

$$
\lambda_S\ge0
$$

を付けます。

Lagrangian は、

$$
L(x,\lambda)
=
\sum_{i\in N}x_i
+
\sum_S
\lambda_S
\left(
v(S)-\sum_{i\in S}x_i
\right).
$$

$x_i$ ごとにまとめると、

$$
L(x,\lambda)
=
\sum_S\lambda_Sv(S)
+
\sum_{i\in N}
x_i
\left(
1-\sum_{S\ni i}\lambda_S
\right).
$$

ここで各 $x_i$ は自由変数です。

もしある $i$ について、

$$
1-\sum_{S\ni i}\lambda_S\ne0
$$

なら、その係数と逆向きへ $x_i$ を無限に動かすことで、

$$
\inf_x L(x,\lambda)=-\infty
$$

になります。

したがって有限な双対下界を得るためには、すべての $i$ について、

$$
\sum_{S\ni i}\lambda_S=1
$$

が必要です。

このとき $x$ を含む項が消え、

$$
\inf_xL(x,\lambda)
=
\sum_S\lambda_Sv(S).
$$

よって双対問題は、

$$
\tag{D}
\begin{aligned}
\text{maximize}\quad
&
\sum_S\lambda_Sv(S)
\\
\text{subject to}\quad
&
\sum_{S\ni i}\lambda_S=1
\qquad(i\in N),
\\
&
\lambda_S\ge0
\qquad(\varnothing\ne S\subseteq N).
\end{aligned}
$$

です。

双対実行可能条件は、平衡重みの定義と完全に一致しています。

<a id="prop-game-b2-core-covering-lp"></a>

<!-- formal-statement-start -->
> **命題（コア被覆線形計画の双対は平衡重み問題である）**  
> 有限 TU ゲーム $(N,v)$ に対し、
>
$$
\begin{aligned}
p^*
=
\min_x\quad
&
\sum_{i\in N}x_i
\\
\text{subject to}\quad
&
x(S)\ge v(S)
\qquad
(\varnothing\ne S\subseteq N)
\end{aligned}
$$
>
> を考える。
>
> この主問題は実行可能で下に有界であり、その双対は
>
$$
\begin{aligned}
d^*
=
\max_{\lambda}\quad
&
\sum_S\lambda_Sv(S)
\\
\text{subject to}\quad
&
\sum_{S\ni i}\lambda_S=1
\qquad(i\in N),
\\
&
\lambda_S\ge0
\end{aligned}
$$
>
> である。
>
> したがって双対実行可能解は、ちょうど平衡重みである。
>
> また
>
$$
\operatorname{Core}(v)\ne\varnothing
\iff
p^*=v(N).
$$
<!-- formal-statement-end -->

### 証明の見取り図

主問題の実行可能性と下方有界性は前節で確認しました。

双対制約は、自由変数 $x_i$ の係数を0にする条件から出ます。

最後の同値は、主問題に $S=N$ の制約が含まれるため、

$$
p^*\ge v(N)
$$

であり、等号を達成する実行可能解がそのままコア配分になることから出ます。

<!-- proof-start -->
### 証明

主問題の実行可能性については、

$$
M
=
\max\left(
0,
\max_{\varnothing\ne S\subseteq N}v(S)
\right)
$$

として $x_i=M$ を選べば、

$$
x(S)=|S|M\ge v(S)
$$

なので確認できます。

また $S=N$ の制約から、

$$
\sum_i x_i\ge v(N)
$$

であり、目的関数は下に有界です。

次に各制約

$$
v(S)-x(S)\le0
$$

へ $\lambda_S\ge0$ を付けます。

Lagrangian は、

$$
L(x,\lambda)
=
\sum_S\lambda_Sv(S)
+
\sum_i
x_i
\left(
1-\sum_{S\ni i}\lambda_S
\right).
$$

各 $x_i$ は自由変数なので、

$$
\inf_xL(x,\lambda)>-\infty
$$

となるための必要十分条件は、

$$
1-\sum_{S\ni i}\lambda_S=0
\qquad(i\in N)
$$

です。

この条件のもとでは、

$$
\inf_xL(x,\lambda)
=
\sum_S\lambda_Sv(S).
$$

したがって双対問題は本文の (D) になります。

その実行可能条件は、

$$
\lambda_S\ge0,
\qquad
\sum_{S\ni i}\lambda_S=1
$$

なので、平衡重みの定義そのものです。

最後に、主問題の任意の実行可能解は $S=N$ の制約から、

$$
\sum_i x_i\ge v(N).
$$

したがって、

$$
p^*\ge v(N).
$$

コア配分 $x$ が存在すれば、

$$
x(S)\ge v(S)
$$

をすべて満たし、

$$
\sum_i x_i=v(N)
$$

なので、

$$
p^*\le v(N).
$$

よって $p^*=v(N)$ です。

逆に $p^*=v(N)$ とします。

有限次元 LP なので、自由変数を

$$
x_i=x_i^+-x_i^-,
\qquad
x_i^+,x_i^-\ge0
$$

と分解し、各不等式へ余剰変数を入れれば [OPT10 の標準形](../OPT10/index.md#def-opt10-standard-form)へ変換できます。

主問題は実行可能で有限最適値を持つため、[線形計画の基本定理](../OPT10/index.md#thm-opt10-fundamental)から最適解 $x^*$ が存在します。

この $x^*$ は全提携制約を満たし、

$$
x^*(N)
=
\sum_i x_i^*
=
p^*
=
v(N).
$$

したがって、

$$
x^*\in\operatorname{Core}(v).
$$

$\square$
<!-- proof-end -->

この命題で、

$$
\boxed{
\text{平衡重み}
=
\text{コア制約の双対実行可能解}
}
$$

が数式として確定しました。

---

## 7. Bondareva--Shapley の定理は LP 強双対そのものである

<a id="thm-game-b2-bondareva-shapley"></a>

<!-- formal-statement-start -->
> **定理（Bondareva--Shapley）**  
> 有限 TU 特性関数形ゲーム $(N,v)$ について、次は同値である。
>
> 1. コアが非空である。
>
$$
\operatorname{Core}(v)\ne\varnothing.
$$
>
> 2. ゲームは平衡である。すなわち、任意の平衡重み $\lambda$ に対して
>
$$
\sum_S\lambda_Sv(S)\le v(N)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 何が難しいのか

必要性はすでに直接証明しました。

難しいのは十分性です。

平衡性は「無数に見える重み付き不等式が全部成り立つ」という条件であり、そこから一つの配分 $x$ を直接構成する方法は明らかではありません。

しかし LP へ翻訳すると、

$$
\text{平衡性}
=
\text{すべての双対実行可能値が }v(N)\text{ 以下}
$$

です。

しかも、

$$
\lambda_N=1,
\qquad
\lambda_S=0\quad(S\ne N)
$$

は常に平衡重みなので、双対側は少なくとも

$$
v(N)
$$

を達成します。

したがって平衡性があれば、双対最適値はちょうど $v(N)$ です。

強双対性が主最適値も同じ値へ引き戻し、その主最適解がコア配分になります。

<!-- proof-start -->
### 証明

まず、

$$
\operatorname{Core}(v)\ne\varnothing
$$

とします。

すると [コア非空性から平衡性への命題](#prop-game-b2-core-implies-balanced)より、$(N,v)$ は平衡ゲームです。

逆に $(N,v)$ が平衡ゲームであるとします。

前節の主問題 (P) と双対問題 (D) を考えます。

主問題は実行可能で下に有界です。

したがって、自由変数分解と余剰変数による標準形変換の後で、[OPT10 の線形計画の強双対性](../OPT10/index.md#thm-opt10-strong-duality)を適用できます。

双対問題の実行可能解は平衡重みそのものです。

平衡ゲームの定義から、任意の双対実行可能解 $\lambda$ について、

$$
\sum_S\lambda_Sv(S)
\le
v(N).
$$

したがって双対最適値 $d^*$ は、

$$
d^*\le v(N).
$$

一方、

$$
\lambda_N=1,
\qquad
\lambda_S=0
\quad(S\ne N)
$$

と置けば、各プレイヤー $i$ について、

$$
\sum_{S\ni i}\lambda_S
=
\lambda_N
=
1.
$$

よってこれは双対実行可能です。

この双対目的値は、

$$
\sum_S\lambda_Sv(S)
=
v(N).
$$

したがって、

$$
d^*\ge v(N).
$$

二つを合わせて、

$$
d^*=v(N).
$$

線形計画の強双対性から、

$$
p^*=d^*=v(N).
$$

[コア被覆線形計画とコア非空性の同値](#prop-game-b2-core-covering-lp)より、

$$
p^*=v(N)
$$

なら、

$$
\operatorname{Core}(v)\ne\varnothing.
$$

よって二条件は同値です。

$\square$
<!-- proof-end -->

この証明で使った仮定を整理します。

- **プレイヤー集合が有限**なので、提携数 $2^{|N|}-1$ も有限であり、有限次元 LP になります。
- **TU** なので、提携の安定条件を一つの総額不等式 $x(S)\ge v(S)$ で表せます。
- **平衡重みが非負**なので、コア制約を重み付きで足したとき不等号を保存できます。
- **LP 強双対性**が、双対側の平衡条件から主側の配分存在へ戻す橋になります。

---

## 8. コアが空なら、どの提携要求が衝突しているかを平衡重みが証明する

Bondareva--Shapley の定理を否定形で読むと、さらに実用的です。

<a id="cor-game-b2-empty-core-certificate"></a>

<!-- formal-statement-start -->
> **系（空コアには平衡重みによる証明書がある）**  
> 有限 TU ゲーム $(N,v)$ で
>
$$
\operatorname{Core}(v)=\varnothing
$$
>
> なら、ある平衡重み $\lambda$ が存在して、
>
$$
\sum_S\lambda_Sv(S)>v(N)
$$
>
> を満たす。
>
> 逆に、この不等式を満たす平衡重みが一つでも存在すればコアは空である。
<!-- formal-statement-end -->

### 証明の見取り図

コアが空なら、コア被覆 LP の最適値は $v(N)$ より大きくなります。

強双対性により、その大きい値を双対側でも達成する平衡重みが存在します。

つまり平衡重みは、

$$
\boxed{
\text{コアが存在しない理由を有限個の係数で示す証明書}
}
$$

です。

<!-- proof-start -->
### 証明

コア被覆 LP の最適値を $p^*$ とします。

常に、

$$
p^*\ge v(N).
$$

もし

$$
p^*=v(N)
$$

なら、前節の命題からコア配分が存在します。

したがってコアが空なら、

$$
p^*>v(N).
$$

主問題は実行可能で有限最適値を持つので、[線形計画の強双対性](../OPT10/index.md#thm-opt10-strong-duality)から、

$$
d^*=p^*>v(N).
$$

双対最適解 $\lambda^*$ は平衡重みなので、

$$
\sum_S\lambda_S^*v(S)
=
d^*
>
v(N).
$$

逆に、そのような平衡重み $\lambda$ が存在したとします。

もしコア配分 $x$ が存在すれば、[コア非空性から平衡性への命題](#prop-game-b2-core-implies-balanced)により、

$$
\sum_S\lambda_Sv(S)\le v(N)
$$

でなければならず矛盾です。

したがってコアは空です。

$\square$
<!-- proof-end -->

この構造は、[OPT2 の Farkas の補題](../OPT2/index.md#thm-opt2-farkas)と同じ「二者択一」の考え方を持っています。

すなわち、

$$
\boxed{
\text{安定配分が存在する}
}
$$

か、

$$
\boxed{
\text{その存在を否定する非負の線形結合証明書が存在する}
}
$$

かのどちらかです。

Bondareva--Shapley の場合、その証明書が「各プレイヤーをちょうど1回ずつ覆う」というゲーム理論的意味を持つため、一般の Farkas 乗数より直感的に読めます。

---

## 9. 3人多数決型ゲームの空コアを一行の証明書に圧縮する

もう一度、

$$
v(\{1,2\})
=
v(\{1,3\})
=
v(\{2,3\})
=
1,
\qquad
v(N)=1
$$

を考えます。

平衡重みを、

$$
\lambda_{\{1,2\}}
=
\lambda_{\{1,3\}}
=
\lambda_{\{2,3\}}
=
\frac12
$$

と置きます。

すると、

$$
\sum_S\lambda_Sv(S)
=
\frac32
>
1
=
v(N).
$$

したがって Bondareva--Shapley の定理から、

$$
\boxed{
\operatorname{Core}(v)=\varnothing
}
$$

です。

GAME-B1 では三本の不等式を足して矛盾を作りました。

本章では、その操作を、

$$
\boxed{
\lambda_{\{1,2\}}
=
\lambda_{\{1,3\}}
=
\lambda_{\{2,3\}}
=
\frac12
}
$$

という一つの双対証明書として読み直しています。

---

## 10. 同じ二人提携価値でも、大提携価値が2なら衝突は起きない

次に、

$$
v(\{i\})=0,
$$

$$
v(\{1,2\})
=
v(\{1,3\})
=
v(\{2,3\})
=
1,
$$

$$
v(N)=2
$$

という GAME-B1 の非空コア例を考えます。

三つの二人提携へ $1/2$ ずつ置く平衡重みに対して、

$$
\sum_S\lambda_Sv(S)
=
\frac32
\le
2
=
v(N).
$$

先ほどの衝突は消えています。

ただし、一つの平衡重みだけを検査して、

$$
\text{ゲームは平衡}
$$

と結論してはいけません。

平衡ゲームの定義は **すべての平衡重み** を要求します。

この例では、

$$
x=
\left(
\frac23,
\frac23,
\frac23
\right)
$$

が実際にコアに入ることを GAME-B1 で確認済みです。

したがって [コア非空性から平衡性への命題](#prop-game-b2-core-implies-balanced)により、このゲームではすべての平衡不等式が自動的に成立します。

ここで、

$$
\boxed{
\text{一つの違反証明書}
}
$$

は空コアを示すのに十分ですが、

$$
\boxed{
\text{一つの成功例}
}
$$

は平衡性を示すのに十分ではない、という非対称性に注意してください。

---

## 11. 4人サイクルで、平衡性の閾値を直接計算する

$$
N=\{1,2,3,4\}
$$

とします。

四つの隣接二人提携だけが価値1を持つとします。

$$
v(\{1,2\})
=
v(\{2,3\})
=
v(\{3,4\})
=
v(\{4,1\})
=
1.
$$

大提携価値は、

$$
v(N)=b
$$

とします。

それ以外の真部分提携の価値は0とします。

### 11.1 $b<2$ ならコアは空

提携 $\{1,2\}$ と $\{3,4\}$ に、

$$
\lambda_{\{1,2\}}
=
\lambda_{\{3,4\}}
=
1
$$

を置き、それ以外を0とします。

各プレイヤーはちょうど一つの提携に入るので、これは平衡重みです。

重み付き提携価値は、

$$
1+1=2.
$$

したがって、

$$
b<2
$$

なら、

$$
2>v(N)=b.
$$

Bondareva--Shapley によりコアは空です。

### 11.2 $b\ge2$ ならコア配分を直接作れる

対称配分

$$
x_i=\frac b4
$$

を考えます。

各隣接二人提携には、

$$
x_i+x_j
=
\frac b2
\ge1
$$

が配られます。

価値0の提携については $x_i\ge0$ なので、

$$
x(S)\ge0=v(S).
$$

さらに、

$$
x(N)
=
4\cdot\frac b4
=
b
=
v(N).
$$

したがって、

$$
x\in\operatorname{Core}(v).
$$

よって、

$$
\boxed{
\operatorname{Core}(v)\ne\varnothing
\iff
b\ge2
}
$$

です。

この例では、平衡重みの違反証明書とコア配分の構成が閾値 $b=2$ の両側をぴったり挟んでいます。

---

## 12. 平衡重みは「提携をランダムに選ぶ確率」ではない

平衡重みには非負性があるので、確率分布に似て見えます。

しかし一般には、

$$
\sum_S\lambda_S=1
$$

ではありません。

たとえば3人の全二人提携へ $1/2$ ずつ置けば、

$$
\sum_S\lambda_S=\frac32.
$$

平衡条件が規格化しているのは提携の総重みではなく、

$$
\sum_{S\ni i}\lambda_S=1
$$

という **各プレイヤーの被覆量** です。

したがって平衡重みは、

> 「提携要求をどの比率で足せば、各プレイヤーの取り分をちょうど1回ずつ使うか」

を記述する係数です。

---

## 13. 大提携だけに重み1を置く平衡重みは常に存在する

$$
\lambda_N=1,
\qquad
\lambda_S=0\quad(S\ne N)
$$

と置きます。

各プレイヤーは必ず $N$ に含まれるので、

$$
\sum_{S\ni i}\lambda_S=1.
$$

したがってこれは常に平衡重みです。

その重み付き価値は、

$$
\sum_S\lambda_Sv(S)
=
v(N).
$$

この事実は Bondareva--Shapley の十分性証明で重要でした。

平衡ゲームなら双対目的値は $v(N)$ 以下です。

しかしこの自明な平衡重みがすでに $v(N)$ を達成します。

よって双対最適値が、

$$
\boxed{
d^*=v(N)
}
$$

と一意に確定します。

---

## 14. 「コアの線形不等式」と「平衡性」は主問題と双対問題の二つの見方である

本章の対応を一枚にまとめると、

$$
\boxed{
\begin{array}{c}
\text{主問題}\\
x(S)\ge v(S)\\
\text{全提携を満足させる最小総配分}
\end{array}
}
\qquad
\longleftrightarrow
\qquad
\boxed{
\begin{array}{c}
\text{双対問題}\\
\lambda_S\ge0,\ 
\sum_{S\ni i}\lambda_S=1\\
\text{重み付き提携要求の最大値}
\end{array}
}
$$

です。

主問題の最適値が $v(N)$ なら、その最適解がコア配分です。

双対問題の最適値が $v(N)$ なら、どの平衡重みも大提携価値を超えません。

[OPT10 の強双対性](../OPT10/index.md#thm-opt10-strong-duality)が、

$$
p^*=d^*
$$

を保証するので、

$$
\boxed{
\text{コア非空}
\iff
\text{平衡性}
}
$$

が得られます。

この視点は後続の GAME-B5 や GAME-D4 でも再登場します。

協力ゲームの安定性問題は、提携固有の用語を外すと、

$$
\boxed{
\text{線形不等式の実行可能性}
\quad\text{と}\quad
\text{その双対証明書}
}
$$

を調べる問題でもあります。

---

# 演習

## Level A

<a id="ex-game-b2-a01"></a>

### GAME-B2-A01 平衡重みを直接検査する

- Level: A
- 目安時間: 15分

$$
N=\{1,2,3,4\}
$$

とし、

$$
\mathcal B
=
\{
\{1,2\},
\{2,3\},
\{3,4\},
\{4,1\}
\}
$$

を考える。

各提携へ重み $1/2$ を置き、それ以外を0とする。

1. 各プレイヤー $i$ について $\sum_{S\ni i}\lambda_S$ を求めよ。
2. この重みが平衡重みであることを示せ。
3. $\sum_S\lambda_S$ を求め、平衡重みが確率分布とは限らないことを説明せよ。

<!-- solution-start -->
#### 詳細解答

プレイヤー1を含む正の重みの提携は、

$$
\{1,2\},
\qquad
\{4,1\}
$$

です。

したがって、

$$
\sum_{S\ni1}\lambda_S
=
\frac12+\frac12
=
1.
$$

プレイヤー2については、

$$
\{1,2\},
\qquad
\{2,3\}
$$

なので、

$$
\sum_{S\ni2}\lambda_S
=
1.
$$

プレイヤー3については、

$$
\{2,3\},
\qquad
\{3,4\}
$$

なので、

$$
\sum_{S\ni3}\lambda_S
=
1.
$$

プレイヤー4については、

$$
\{3,4\},
\qquad
\{4,1\}
$$

なので、

$$
\sum_{S\ni4}\lambda_S
=
1.
$$

よってすべてのプレイヤーが重み付きでちょうど1回ずつ覆われています。

したがって、この重みは平衡重みです。

一方、提携重みの総和は、

$$
\sum_S\lambda_S
=
4\cdot\frac12
=
2.
$$

確率分布なら総和は1でなければなりません。

したがって、

$$
\boxed{
\text{平衡重みは一般には確率分布ではない}
}
$$

と分かります。
<!-- solution-end -->

<a id="ex-game-b2-a02"></a>

### GAME-B2-A02 多数決型ゲームの空コア証明書を作る

- Level: A
- 目安時間: 15分

3人ゲームで、

$$
v(S)
=
\begin{cases}
1, & |S|\ge2,\\
0, & |S|\le1
\end{cases}
$$

とする。

三つの二人提携へ各 $1/2$ の重みを置く。

1. この重みが平衡であることを確認せよ。
2. $\sum_S\lambda_Sv(S)$ を求めよ。
3. Bondareva--Shapley の定理からコアが空であることを結論せよ。

<!-- solution-start -->
#### 詳細解答

1. 各プレイヤーは三つの二人提携のうち二つに含まれます。

したがって各 $i$ について、

$$
\sum_{S\ni i}\lambda_S
=
\frac12+\frac12
=
1.
$$

よって平衡重みです。

2. 正の重みを持つ三つの二人提携はいずれも価値1なので、

$$
\sum_S\lambda_Sv(S)
=
3\cdot\frac12\cdot1
=
\frac32.
$$

3. 大提携価値は、

$$
v(N)=1.
$$

したがって、

$$
\frac32>1=v(N).
$$

平衡ゲームの条件に違反する平衡重みが存在します。

Bondareva--Shapley の定理より、

$$
\boxed{
\operatorname{Core}(v)=\varnothing
}
$$

です。
<!-- solution-end -->

<a id="ex-game-b2-a03"></a>

### GAME-B2-A03 コア配分の重み付き和を計算する

- Level: A
- 目安時間: 20分

3人ゲームで、

$$
v(\{i\})=0,
$$

$$
v(\{1,2\})
=
v(\{1,3\})
=
v(\{2,3\})
=
1,
$$

$$
v(N)=2
$$

とする。

配分

$$
x=(0.8,0.6,0.6)
$$

と、三つの二人提携へ各 $1/2$ を置く平衡重みを考える。

1. $x$ がコアに入ることを確認せよ。
2. $\sum_S\lambda_Sx(S)$ を求めよ。
3. $\sum_S\lambda_Sv(S)$ と比較し、コア非空性から平衡不等式が出る計算を具体的に確認せよ。

<!-- solution-start -->
#### 詳細解答

1. まず効率性を確認します。

$$
x(N)
=
0.8+0.6+0.6
=
2
=
v(N).
$$

一人提携については、

$$
x_i\ge0=v(\{i\}).
$$

二人提携については、

$$
x(\{1,2\})
=
0.8+0.6
=
1.4\ge1,
$$

$$
x(\{1,3\})
=
0.8+0.6
=
1.4\ge1,
$$

$$
x(\{2,3\})
=
0.6+0.6
=
1.2\ge1.
$$

したがって、

$$
x\in\operatorname{Core}(v).
$$

2. 重み付き配分合計は、

$$
\sum_S\lambda_Sx(S)
=
\frac12(1.4)
+
\frac12(1.4)
+
\frac12(1.2).
$$

よって、

$$
\sum_S\lambda_Sx(S)
=
0.7+0.7+0.6
=
2.
$$

これは、

$$
x(N)=2
$$

と一致しています。

3. 提携価値側は、

$$
\sum_S\lambda_Sv(S)
=
\frac12+\frac12+\frac12
=
\frac32.
$$

したがって、

$$
\sum_S\lambda_Sv(S)
=
\frac32
\le
2
=
\sum_S\lambda_Sx(S)
=
x(N)
=
v(N).
$$

コア制約を平衡重みで足すと、大提携価値が上界になることを具体的に確認できました。
<!-- solution-end -->

<a id="ex-game-b2-a04"></a>

### GAME-B2-A04 3人ゲームの双対制約を書き下す

- Level: A
- 目安時間: 20分

$$
N=\{1,2,3\}
$$

とする。

コア被覆 LP

$$
\min_x x_1+x_2+x_3
$$

に対し、各非空提携へ双対変数

$$
\lambda_1,\lambda_2,\lambda_3,
\lambda_{12},\lambda_{13},\lambda_{23},
\lambda_{123}
$$

を対応させる。

1. プレイヤー1,2,3に対応する双対等式をそれぞれ書け。
2. 双対目的関数を書け。
3. 双対実行可能条件が平衡重みの条件になっていることを説明せよ。

<!-- solution-start -->
#### 詳細解答

1. プレイヤー1を含む提携は、

$$
\{1\},
\{1,2\},
\{1,3\},
\{1,2,3\}
$$

です。

したがってプレイヤー1の双対等式は、

$$
\lambda_1
+
\lambda_{12}
+
\lambda_{13}
+
\lambda_{123}
=
1.
$$

プレイヤー2については、

$$
\lambda_2
+
\lambda_{12}
+
\lambda_{23}
+
\lambda_{123}
=
1.
$$

プレイヤー3については、

$$
\lambda_3
+
\lambda_{13}
+
\lambda_{23}
+
\lambda_{123}
=
1.
$$

2. 双対目的関数は、

$$
\max_{\lambda\ge0}
\Bigl[
\lambda_1v(\{1\})
+
\lambda_2v(\{2\})
+
\lambda_3v(\{3\})
$$

$$
+
\lambda_{12}v(\{1,2\})
+
\lambda_{13}v(\{1,3\})
+
\lambda_{23}v(\{2,3\})
+
\lambda_{123}v(N)
\Bigr].
$$

3. すべての双対変数は、

$$
\lambda_S\ge0
$$

であり、各プレイヤー $i$ について、そのプレイヤーを含む提携の重み総和が1です。

これは平衡重みの定義、

$$
\sum_{S\ni i}\lambda_S=1
$$

と完全に一致しています。

したがって、

$$
\boxed{
\text{双対実行可能解}
=
\text{平衡重み}
}
$$

です。
<!-- solution-end -->

## Level B

<a id="ex-game-b2-b01"></a>

### GAME-B2-B01 コア非空性から平衡性を証明する

- Level: B
- 目安時間: 25分

有限 TU ゲーム $(N,v)$ で、

$$
x\in\operatorname{Core}(v)
$$

とする。

任意の平衡重み $\lambda$ に対して、

$$
\sum_S\lambda_Sv(S)\le v(N)
$$

を、次の順に証明せよ。

1. コア制約へ $\lambda_S$ を掛けて足す。
2. 二重和の順序を入れ替える。
3. 平衡条件を使う。
4. 効率性を使う。

<!-- solution-start -->
#### 詳細解答

コア配分なので、すべての非空提携 $S$ に対して、

$$
x(S)\ge v(S).
$$

また、

$$
\lambda_S\ge0.
$$

したがって、

$$
\lambda_Sx(S)
\ge
\lambda_Sv(S).
$$

すべての $S$ について足すと、

$$
\sum_S\lambda_Sx(S)
\ge
\sum_S\lambda_Sv(S).
$$

左辺を展開します。

$$
\sum_S\lambda_Sx(S)
=
\sum_S
\lambda_S
\sum_{i\in S}x_i.
$$

有限和なので順序を入れ替えて、

$$
\sum_S\lambda_Sx(S)
=
\sum_{i\in N}
x_i
\sum_{S\ni i}\lambda_S.
$$

$\lambda$ は平衡重みなので、

$$
\sum_{S\ni i}\lambda_S=1.
$$

よって、

$$
\sum_S\lambda_Sx(S)
=
\sum_{i\in N}x_i
=
x(N).
$$

コアの効率性から、

$$
x(N)=v(N).
$$

以上より、

$$
\sum_S\lambda_Sv(S)
\le
v(N).
$$

したがってゲームは平衡です。

この証明では、$\lambda_S\ge0$ が不等号を保存し、平衡条件が二重和を $x(N)$ へ変え、効率性が最後に $v(N)$ へ変えています。
<!-- solution-end -->

<a id="ex-game-b2-b02"></a>

### GAME-B2-B02 LP 双対から Bondareva--Shapley の十分性を再構成する

- Level: B
- 目安時間: 35分

有限 TU ゲーム $(N,v)$ が平衡ゲームであるとする。

主問題

$$
\begin{aligned}
\min_x\quad
&
\sum_i x_i
\\
\text{subject to}\quad
&
x(S)\ge v(S)
\qquad
(\varnothing\ne S\subseteq N)
\end{aligned}
$$

を考える。

1. 主問題が実行可能であることを示せ。
2. 目的関数が下に有界であることを示せ。
3. 双対問題を書け。
4. $\lambda_N=1$ が双対実行可能であることを示せ。
5. 平衡性から双対最適値が $v(N)$ に等しいことを示せ。
6. OPT10 の強双対性を使い、主最適値が $v(N)$ であることを示せ。
7. 主最適解がコア配分であることを結論せよ。

<!-- solution-start -->
#### 詳細解答

1. 実行可能性を示します。

$$
M
=
\max\left(
0,
\max_{\varnothing\ne S\subseteq N}v(S)
\right)
$$

と置き、

$$
x_i=M
$$

とします。

任意の非空提携 $S$ に対して、

$$
x(S)
=
|S|M
\ge
M
\ge
v(S).
$$

したがって主問題は実行可能です。

2. 制約の中には $S=N$ が含まれます。

よって任意の主実行可能解について、

$$
\sum_i x_i
=
x(N)
\ge
v(N).
$$

したがって目的関数は下に有界です。

3. 各制約へ $\lambda_S\ge0$ を付けると、双対問題は、

$$
\begin{aligned}
\max_{\lambda}\quad
&
\sum_S\lambda_Sv(S)
\\
\text{subject to}\quad
&
\sum_{S\ni i}\lambda_S=1
\qquad(i\in N),
\\
&
\lambda_S\ge0
\end{aligned}
$$

です。

4. 

$$
\lambda_N=1,
\qquad
\lambda_S=0
\quad(S\ne N)
$$

と置きます。

各プレイヤー $i$ は $N$ に含まれるので、

$$
\sum_{S\ni i}\lambda_S
=
1.
$$

したがって双対実行可能です。

このとき双対目的値は、

$$
v(N).
$$

5. ゲームは平衡なので、任意の双対実行可能解、すなわち任意の平衡重みに対して、

$$
\sum_S\lambda_Sv(S)
\le
v(N).
$$

したがって双対最適値 $d^*$ は、

$$
d^*\le v(N).
$$

一方4の双対実行可能解が $v(N)$ を達成するので、

$$
d^*\ge v(N).
$$

よって、

$$
d^*=v(N).
$$

6. 主問題は実行可能で下に有界です。

自由変数を正負部分へ分解し、不等式へ余剰変数を入れることで標準形へ変換できます。

[OPT10 の線形計画の強双対性](../OPT10/index.md#thm-opt10-strong-duality)より、

$$
p^*=d^*.
$$

したがって、

$$
p^*=v(N).
$$

7. 主最適解 $x^*$ はすべての提携制約を満たします。

さらに、

$$
x^*(N)
=
\sum_i x_i^*
=
p^*
=
v(N).
$$

したがって、

$$
x^*\in\operatorname{Core}(v).
$$

よって、

$$
\boxed{
\text{平衡ゲーム}
\Longrightarrow
\operatorname{Core}(v)\ne\varnothing
}
$$

が示されました。
<!-- solution-end -->

<a id="ex-game-b2-b03"></a>

### GAME-B2-B03 対称3人ゲームのコア非空条件を平衡性で導く

- Level: B
- 目安時間: 30分

$$
N=\{1,2,3\}
$$

とし、

$$
v(\{i\})=0,
$$

$$
v(\{1,2\})
=
v(\{1,3\})
=
v(\{2,3\})
=
a,
$$

$$
v(N)=b
$$

とする。

$$
a\ge0,
\qquad
b\ge0
$$

を仮定する。

1. 三つの二人提携へ各 $1/2$ を置く平衡重みから、コア非空性に必要な条件を導け。
2. $b\ge3a/2$ のとき、対称配分 $x_i=b/3$ がコアに入ることを示せ。
3. Bondareva--Shapley の定理と合わせ、
   $$
   \operatorname{Core}(v)\ne\varnothing
   \iff
   b\ge\frac{3a}{2}
   $$
   を示せ。

<!-- solution-start -->
#### 詳細解答

1. 三つの二人提携へ、

$$
\lambda_{12}
=
\lambda_{13}
=
\lambda_{23}
=
\frac12
$$

を置きます。

これは各プレイヤーをちょうど1回ずつ覆うので平衡重みです。

重み付き提携価値は、

$$
\sum_S\lambda_Sv(S)
=
\frac12a+\frac12a+\frac12a
=
\frac{3a}{2}.
$$

コアが非空ならゲームは平衡なので、

$$
\frac{3a}{2}
\le
v(N)
=
b.
$$

したがって必要条件は、

$$
\boxed{
b\ge\frac{3a}{2}
}
$$

です。

2. 今、

$$
b\ge\frac{3a}{2}
$$

とします。

対称配分

$$
x_1=x_2=x_3=\frac b3
$$

を考えます。

まず、

$$
x(N)
=
3\cdot\frac b3
=
b
=
v(N).
$$

一人提携については、

$$
x_i=\frac b3\ge0=v(\{i\}).
$$

二人提携については、

$$
x_i+x_j
=
\frac{2b}{3}.
$$

仮定

$$
b\ge\frac{3a}{2}
$$

へ $2/3$ を掛けると、

$$
\frac{2b}{3}\ge a.
$$

したがって、

$$
x_i+x_j\ge v(\{i,j\}).
$$

よって、

$$
x\in\operatorname{Core}(v).
$$

3. 1より、コア非空なら、

$$
b\ge\frac{3a}{2}.
$$

2より、

$$
b\ge\frac{3a}{2}
$$

ならコア配分を明示的に構成できます。

したがって、

$$
\boxed{
\operatorname{Core}(v)\ne\varnothing
\iff
b\ge\frac{3a}{2}
}
$$

です。

Bondareva--Shapley の言葉では、この閾値より下では二人提携三つの平衡重ね合わせが大提携価値を超え、閾値以上では実際にコア配分が存在するため全平衡不等式が満たされます。
<!-- solution-end -->

## Level C

<a id="ex-game-b2-c01"></a>

### GAME-B2-C01 4人サイクルの平衡性・LP 双対・コアを一体的に調べる

- Level: C
- 目安時間: 45分

$$
N=\{1,2,3,4\}
$$

とする。

四つの隣接二人提携について、

$$
v(\{1,2\})
=
v(\{2,3\})
=
v(\{3,4\})
=
v(\{4,1\})
=
1,
$$

大提携について、

$$
v(N)=b,
$$

それ以外の真部分提携について、

$$
v(S)=0
$$

とする。

$$
b\ge0
$$

を仮定する。

1. $\lambda_{12}=\lambda_{34}=1$ が平衡重みであることを示し、$b<2$ ならコアが空であることを示せ。
2. $b\ge2$ のとき $x_i=b/4$ がコア配分であることを示せ。
3. 以上からコア非空性の必要十分条件を求めよ。
4. 任意の平衡重み $\lambda$ を取り、四つの価値1の辺提携の重み総和を
   $$
   E
   =
   \lambda_{12}
   +
   \lambda_{23}
   +
   \lambda_{34}
   +
   \lambda_{41}
   $$
   と置く。また $\lambda_N=t$ と置く。各プレイヤーの平衡条件を足して、
   $$
   2E+4t\le4
   $$
   を示せ。
5. $b\ge2$ のとき、
   $$
   \sum_S\lambda_Sv(S)
   =
   E+bt
   \le b
   $$
   を示し、ゲームが平衡であることを平衡重みから直接確認せよ。
6. 1 と 5 を、Bondareva--Shapley の定理の「違反双対証明書」と「全双対実行可能値の上界」という二つの見方で説明せよ。

<!-- solution-start -->
#### 詳細解答

### 1. $b<2$ の空コア証明書

$$
\lambda_{12}=1,
\qquad
\lambda_{34}=1
$$

とし、それ以外を0とします。

プレイヤー1と2は $\{1,2\}$ に重み1で含まれ、プレイヤー3と4は $\{3,4\}$ に重み1で含まれます。

したがって各プレイヤー $i$ について、

$$
\sum_{S\ni i}\lambda_S=1.
$$

よって平衡重みです。

重み付き提携価値は、

$$
\sum_S\lambda_Sv(S)
=
1\cdot1+1\cdot1
=
2.
$$

したがって、

$$
b<2
$$

なら、

$$
2>b=v(N).
$$

Bondareva--Shapley の定理より、

$$
\boxed{
b<2
\Longrightarrow
\operatorname{Core}(v)=\varnothing
}
$$

です。

### 2. $b\ge2$ のコア配分

$$
x_i=\frac b4
\qquad(i=1,2,3,4)
$$

と置きます。

効率性は、

$$
x(N)
=
4\cdot\frac b4
=
b
=
v(N).
$$

価値1の隣接二人提携 $S=\{i,j\}$ では、

$$
x(S)
=
\frac b4+\frac b4
=
\frac b2.
$$

$b\ge2$ なので、

$$
\frac b2\ge1=v(S).
$$

その他の真部分提携では $v(S)=0$ です。

また $b\ge2$ なので各 $x_i=b/4$ は非負であり、任意の非空真部分提携について、

$$
x(S)\ge0=v(S)
$$

です。

したがって、

$$
\boxed{
x\in\operatorname{Core}(v)
}
$$

です。

### 3. 必要十分条件

1 と2から、

$$
\boxed{
\operatorname{Core}(v)\ne\varnothing
\iff
b\ge2
}
$$

です。

### 4. 任意の平衡重みに対する被覆量の集計

任意の平衡重み $\lambda$ を取ります。

各プレイヤー $i$ について、

$$
\sum_{S\ni i}\lambda_S=1.
$$

4人分を足すと、

$$
\sum_{i=1}^4
\sum_{S\ni i}\lambda_S
=
4.
$$

左辺では、各提携 $S$ の重み $\lambda_S$ が、その提携の人数 $|S|$ 回だけ数えられます。

したがって、

$$
\sum_{\varnothing\ne S\subseteq N}
|S|\lambda_S
=
4.
$$

価値1の四つの辺提携はいずれも人数2なので、これらからの寄与は、

$$
2E.
$$

大提携 $N$ の人数は4なので、その寄与は、

$$
4t.
$$

それ以外の提携の寄与もすべて非負です。

したがって、

$$
2E+4t
\le
4.
$$

よって、

$$
E
\le
2-2t
=
2(1-t).
$$

### 5. $b\ge2$ なら全平衡不等式が成立する

正の価値を持つのは、四つの辺提携と大提携だけです。

したがって、

$$
\sum_S\lambda_Sv(S)
=
E+bt.
$$

4で得た、

$$
E\le2(1-t)
$$

を使うと、

$$
E+bt
\le
2(1-t)+bt.
$$

右辺を整理すると、

$$
2+(b-2)t.
$$

平衡条件から $t=\lambda_N\le1$ です。実際、任意のプレイヤー $i$ について、

$$
t
=
\lambda_N
\le
\sum_{S\ni i}\lambda_S
=
1.
$$

さらに $b\ge2$ なので、

$$
b-2\ge0.
$$

したがって、

$$
2+(b-2)t
\le
2+(b-2)\cdot1
=
b.
$$

よって、

$$
\boxed{
\sum_S\lambda_Sv(S)\le b=v(N)
}
$$

です。

これは任意の平衡重みについて成り立つので、ゲームは平衡です。

### 6. 双対証明書としての解釈

$b<2$ では、

$$
\lambda_{12}=\lambda_{34}=1
$$

という一つの双対実行可能解が、

$$
\sum_S\lambda_Sv(S)=2>b
$$

を達成します。

これは「主側で総配分を $b$ に抑えながら全提携要求を満たすことはできない」という違反証明書です。

一方 $b\ge2$ では、5で任意の双対実行可能解について、

$$
\sum_S\lambda_Sv(S)\le b
$$

を示しました。

しかも $\lambda_N=1$ が目的値 $b$ を達成するので、双対最適値は、

$$
d^*=b.
$$

強双対性から主最適値も、

$$
p^*=b.
$$

したがって主最適解は総額 $b$ で全提携要求を満たすコア配分になります。

この問題は、

$$
\boxed{
\text{平衡重み}
\leftrightarrow
\text{LP 双対実行可能解}
}
$$

という本章の対応を、空コア側と非空コア側の両方から確認しています。
<!-- solution-end -->

---

## 15. まとめ

平衡重みは、

$$
\lambda_S\ge0,
\qquad
\sum_{S\ni i}\lambda_S=1
$$

によって、各プレイヤーを重み付きでちょうど1回ずつ覆います。

このため任意の配分 $x$ について、

$$
\sum_S\lambda_Sx(S)=x(N).
$$

コア配分が存在すれば、

$$
x(S)\ge v(S)
$$

を平衡重みで足して、

$$
\sum_S\lambda_Sv(S)\le v(N)
$$

が得られます。

逆向きでは、コア制約から作った線形計画

$$
\min_x\sum_i x_i
\quad
\text{subject to }
x(S)\ge v(S)
$$

の双対が、

$$
\max_{\lambda}
\sum_S\lambda_Sv(S)
\quad
\text{subject to }
\sum_{S\ni i}\lambda_S=1,\ 
\lambda_S\ge0
$$

となります。

つまり、

$$
\boxed{
\text{双対実行可能解}
=
\text{平衡重み}
}
$$

です。

[線形計画の強双対性](../OPT10/index.md#thm-opt10-strong-duality)により、

$$
\boxed{
\operatorname{Core}(v)\ne\varnothing
\iff
v\text{ は平衡ゲーム}
}
$$

が得られます。

さらにコアが空なら、

$$
\sum_S\lambda_Sv(S)>v(N)
$$

を満たす平衡重みが存在し、それが [Farkas の補題](../OPT2/index.md#thm-opt2-farkas)と同じ意味での実行不能証明書になります。

次の GAME-B3 では、安定配分の集合が存在するかという問いから離れ、効率性・対称性・null player・加法性という公理から一つの配分を選ぶ Shapley 値へ進みます。
