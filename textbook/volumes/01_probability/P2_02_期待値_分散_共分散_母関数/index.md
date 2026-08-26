# P2-02 期待値・分散・共分散・母関数

この章では、期待値・分散・共分散を**定義から計算する力**と、条件付きモーメントを使って周辺の平均・分散・共分散を**分解して計算する力**、さらに確率母関数・モーメント母関数を**分布から自分で作って使う力**を身につけます。母関数の公式を暗記して代入するのではなく、定義式から和・積分を立て、有限となる範囲を確認してから微分します。

共通表記は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md) と [分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 確率質量関数・確率密度関数から一次・二次モーメントを計算する。
- 分散を $E[X^2]-(E[X])^2$ へ変形して計算する。
- 同時分布から共分散・相関係数を求める。
- 「無相関」と「独立」を区別する。
- 条件付き期待値 $E[X\mid Z]$ が「$Z$ が与えられたときの平均を表す確率変数」であることを理解する。
- タワープロパティから全期待値公式を導き、混合集団や階層モデルの周辺平均を求める。
- 条件付き分散から全分散公式を導き、群内変動と群間変動へ分解する。
- 条件付き共分散から全共分散公式を導き、群内共分散と群間共分散へ分解する。
- 確率母関数を確率質量関数から導き、階乗モーメントを求める。
- モーメント母関数を確率質量関数・確率密度関数から導き、モーメントや独立和を扱う。
- モーメントが存在する範囲を広義積分から判定する。

## 前提知識

1. P2-01: 確率質量関数・確率密度関数の台と正規化。
2. P2-01: 同時分布から周辺分布を求める方法。
3. P1-02: 条件付き確率と有限分割に対する全確率公式。
4. F0-01: 級数、積分、微分、広義積分の基本計算。

---

## 1. なぜ期待値・分散・母関数を学ぶのか

期待値は分布の中心を、分散は中心からの二乗距離の平均を、共分散は2変量が線形に同じ向き・逆向きへ動く傾向を表します。ただし、式を書けることと値が存在することは別です。例えば裾の重い分布では、確率密度関数が正しく正規化されていても $E[X]$ や $E[X^2]$ が発散することがあります。

また、実際の統計モデルでは「群・状態・潜在変数などを知ったときには簡単な分布になるが、それを平均して周辺分布を見ると複雑になる」という状況が頻繁に現れます。例えば理工80の Poisson 混合では、工程率 $\Lambda$ を固定すれば $Y\mid\Lambda$ は単純な Poisson 分布ですが、$\Lambda$ 自身が変動するため周辺分散には工程間変動が上乗せされます。このような計算の共通言語が、条件付き期待値・条件付き分散・条件付き共分散です。

そのため本章では、

1. 必要なモーメントが存在するか確認する。
2. 定義式を書く。
3. 条件付きで簡単になるなら、まず条件付きモーメントを求める。
4. タワープロパティ・全分散・全共分散で条件を外す。
5. 必要なら和・積分・微分を実行する。
6. 最後に公式へ代入する。

という順序を基本にします。

母関数は、分布を関数 $G_X(s)$ や $M_X(t)$ にまとめる道具です。独立な確率変数の和が母関数では積になるため、和の分布やモーメントの計算を短くできます。ただし、**母関数そのものを求める問題では、既知公式を置くのではなく定義から導出する**のが基本です。

---

## 2. 定義と記法

この節と次節では、式に使う記号を先に宣言します。

- 離散型確率変数 $X$ の確率質量関数を
  $$
  p_X(x)=P(X=x)
  $$
  と書きます。
- 連続型確率変数 $X$ の確率密度関数を $f_X(x)$ と書きます。すなわち、$a<b$ に対し
  $$
  P(a<X\leq b)=\int_a^b f_X(x)\,dx
  $$
  です。
- 2変量連続分布では、$(X,Y)$ の同時確率密度関数を $f_{X,Y}(x,y)$ と書きます。
- $E[\cdot]$ は期待値、$\operatorname{Var}(\cdot)$ は分散、$\operatorname{Cov}(\cdot,\cdot)$ は共分散を表します。
- 条件付きの量では、$Z$ を「条件として観測・固定する確率変数」とします。

### 2.1 期待値と存在条件

離散型確率変数 $X$ の確率質量関数を $p_X(x)=P(X=x)$ とします。

$$
\sum_x |x|p_X(x)<\infty
$$

なら

$$
E[X]=\sum_x x p_X(x)
$$

と定義します。

連続型確率変数 $X$ の確率密度関数を $f_X(x)$ とします。

$$
\int_{-\infty}^{\infty}|x|f_X(x)\,dx<\infty
$$

なら

$$
E[X]=\int_{-\infty}^{\infty}x f_X(x)\,dx
$$

と定義します。正の部分と負の部分がともに無限大となる場合に、形式的な相殺で有限値を作ってはいけません。

一般の実数値関数 $g$ についても、$E[|g(X)|]<\infty$ なら $E[g(X)]$ を同様に定義します。

### 2.2 分散・標準偏差

$X$ を実数値確率変数とし、$E[X^2]<\infty$ とします。このとき

$$
\operatorname{Var}(X)=E[(X-E[X])^2],
\qquad
\operatorname{sd}(X)=\sqrt{\operatorname{Var}(X)}
$$

と定義します。

### 2.3 共分散・相関係数

$X,Y$ を実数値確率変数とし、$E[X^2],E[Y^2]<\infty$ とします。このとき

$$
\operatorname{Cov}(X,Y)
=E[(X-E[X])(Y-E[Y])]
$$

と定義します。

さらに $\operatorname{Var}(X),\operatorname{Var}(Y)>0$ なら

$$
\rho(X,Y)
=\frac{\operatorname{Cov}(X,Y)}
{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}
$$

を相関係数とします。

### 2.4 条件付き期待値

まず離散型の条件付けで意味をつかみます。$X,Z$ を確率変数とし、$P(Z=z)>0$ とします。$Z=z$ が分かったときの $X$ の条件付き期待値を

$$
E[X\mid Z=z]
$$

と書きます。$X$ も離散型なら、条件付き確率質量関数

$$
p_{X\mid Z}(x\mid z)=P(X=x\mid Z=z)
$$

を用いて

$$
E[X\mid Z=z]
=\sum_x x\,p_{X\mid Z}(x\mid z)
$$

です。

ここで $z$ を動かすと $E[X\mid Z=z]$ も変わります。そこで

$$
m(z)=E[X\mid Z=z]
$$

とおき、$z$ に実際の確率変数 $Z$ を代入した

$$
\boxed{E[X\mid Z]=m(Z)}
$$

を**条件付き期待値**と呼びます。したがって、$E[X\mid Z=z]$ は $z$ を固定した数値ですが、$E[X\mid Z]$ は一般には $Z$ の値によって変わる確率変数です。

連続型で条件付き確率密度関数 $f_{X\mid Z}(x\mid z)$ が存在する場合は

$$
E[X\mid Z=z]
=\int_{-\infty}^{\infty}x f_{X\mid Z}(x\mid z)\,dx
$$

と考えます。

事象 $H$ に条件付ける $E[X\mid H]$ はこの特別な場合です。例えば指示変数 $I=\boldsymbol{1}_H$ を使えば、$E[X\mid H]$ は $E[X\mid I=1]$ に対応します。

### 2.5 条件付き分散

$X,Z$ を実数値確率変数とし、$E[X^2]<\infty$ とします。$Z=z$ を固定したときの条件付き分散を

$$
\operatorname{Var}(X\mid Z=z)
=E\left[\{X-E[X\mid Z=z]\}^2\mid Z=z\right]
$$

と定義します。

これを $z$ の関数

$$
v(z)=\operatorname{Var}(X\mid Z=z)
$$

とみなし、$z$ に $Z$ を代入した

$$
\boxed{\operatorname{Var}(X\mid Z)=v(Z)}
$$

を条件付き分散と呼びます。これも一般には確率変数です。

### 2.6 条件付き共分散

$X,Y,Z$ を実数値確率変数とし、$E[X^2],E[Y^2]<\infty$ とします。$Z=z$ を固定したとき

$$
\operatorname{Cov}(X,Y\mid Z=z)
=E\left[
\{X-E[X\mid Z=z]\}
\{Y-E[Y\mid Z=z]\}
\mid Z=z
\right]
$$

と定義します。

これを $z$ の関数とみなして $z$ に $Z$ を代入した

$$
\boxed{\operatorname{Cov}(X,Y\mid Z)}
$$

を条件付き共分散と呼びます。条件付き分散は $Y=X$ とした特殊例で

$$
\operatorname{Var}(X\mid Z)
=\operatorname{Cov}(X,X\mid Z)
$$

です。

### 2.7 確率母関数

$X$ を $\mathbb N_0=\{0,1,2,\ldots\}$ 上の確率変数とし、その確率質量関数を

$$
p_X(k)=P(X=k)
$$

とします。このとき

$$
G_X(s)=E[s^X]
=\sum_{k=0}^{\infty}p_X(k)s^k
$$

を $X$ の確率母関数と呼びます。$|s|\leq1$ では $|s|^X\leq1$ なので必ず有限で、特に

$$
G_X(1)=\sum_{k=0}^{\infty}p_X(k)=1
$$

です。

### 2.8 モーメント母関数

$X$ を実数値確率変数とし、$t\in\mathbb R$ とします。期待値が有限な $t$ に対して

$$
M_X(t)=E[e^{tX}]
$$

を $X$ のモーメント母関数と呼びます。$M_X(0)=1$ は常に成り立ちますが、$t\neq0$ で有限とは限りません。0を含む開区間で有限なら、その区間内でのモーメント母関数は分布を一意に定め、微分からモーメントを取り出せます。

---

## 3. 基本公式と、その根拠

### 3.1 元の分布から $E[g(X)]$ を直接求める

離散型確率変数 $X$ の確率質量関数を $p_X(x)=P(X=x)$ とし、$g$ を実数値関数とします。$E[|g(X)|]<\infty$ なら、$g(X)$ の分布を先に求めなくても

$$
E[g(X)]=\sum_x g(x)p_X(x)
$$

と計算できます。

連続型確率変数 $X$ の確率密度関数を $f_X(x)$ とする場合は

$$
E[g(X)]
=\int_{-\infty}^{\infty}g(x)f_X(x)\,dx
$$

です。

また、可積分な実数値確率変数 $X,Y$ と定数 $a,b\in\mathbb R$ に対し

$$
E[aX+bY]=aE[X]+bE[Y]
$$

であり、ここに独立性は不要です。

### 3.2 分散の計算公式

$X$ を実数値確率変数とし、$E[X^2]<\infty$ とします。$\mu=E[X]$ とおくと

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[(X-\mu)^2]\\
&=E[X^2-2\mu X+\mu^2]\\
&=E[X^2]-2\mu E[X]+\mu^2\\
&=E[X^2]-\mu^2.
\end{aligned}
$$

したがって

$$
\boxed{\operatorname{Var}(X)=E[X^2]-(E[X])^2}.
$$

### 3.3 共分散の計算公式

$X,Y$ を実数値確率変数とし、$E[X^2],E[Y^2]<\infty$ とします。$\mu=E[X]$, $\nu=E[Y]$ とおきます。$2|XY|\leq X^2+Y^2$ から $E[|XY|]<\infty$ なので

$$
\begin{aligned}
\operatorname{Cov}(X,Y)
&=E[(X-\mu)(Y-\nu)]\\
&=E[XY-\nu X-\mu Y+\mu\nu]\\
&=E[XY]-\mu\nu.
\end{aligned}
$$

すなわち

$$
\boxed{\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]}.
$$

独立なら $E[XY]=E[X]E[Y]$ なので共分散は0です。しかし、共分散0から独立は一般には導けません。

### 3.4 線形結合の分散

$X,Y$ を二次モーメントが有限な実数値確率変数、$a,b\in\mathbb R$ を定数とします。

$$
U=X-E[X],\qquad V=Y-E[Y]
$$

とおくと

$$
\begin{aligned}
\operatorname{Var}(aX+bY)
&=E[(aU+bV)^2]\\
&=a^2E[U^2]+b^2E[V^2]+2abE[UV]\\
&=a^2\operatorname{Var}(X)
+b^2\operatorname{Var}(Y)
+2ab\operatorname{Cov}(X,Y).
\end{aligned}
$$

特に $X,Y$ が独立なら共分散項が消えます。独立な確率変数 $X_1,\ldots,X_n$ について、各分散が有限なら

$$
\operatorname{Var}\left(\sum_{i=1}^nX_i\right)
=\sum_{i=1}^n\operatorname{Var}(X_i)
$$

です。

### 3.5 条件付き期待値とタワープロパティ

$X$ を可積分な実数値確率変数、$Z$ を条件付けに使う確率変数とします。このとき

$$
\boxed{
E\{E[X\mid Z]\}=E[X]
}
$$

が成り立ちます。これを**タワープロパティ**、または反復期待値の法則と呼びます。

離散型の $Z$ なら、定義から

$$
\begin{aligned}
E\{E[X\mid Z]\}
&=\sum_z E[X\mid Z=z]P(Z=z)\\
&=\sum_z\sum_x xP(X=x\mid Z=z)P(Z=z)\\
&=\sum_z\sum_x xP(X=x,Z=z)\\
&=\sum_x xP(X=x)\\
&=E[X].
\end{aligned}
$$

2行目から3行目では

$$
P(X=x\mid Z=z)P(Z=z)=P(X=x,Z=z)
$$

を使っています。つまり、条件付きで平均してから $Z$ の分布でもう一度平均すると、元の周辺平均に戻ります。

さらに $W=h(Z)$ のように $W$ が $Z$ から決まる、すなわち $Z$ の方が少なくとも同じだけ情報を持つ場合には

$$
\boxed{
E\{E[X\mid Z]\mid W\}=E[X\mid W]
}
$$

です。内側で細かい情報 $Z$ を使って平均し、その後より粗い情報 $W$ だけに戻すと、最初から $W$ だけで条件付けた期待値になります。これが「塔」の名前の由来になる入れ子構造です。

#### 有限分割はタワープロパティの特殊形

$H_1,\ldots,H_m$ を互いに排反で全事象を分割し、各 $P(H_i)>0$ とします。$H_i$ 上で $Z=i$ となる群ラベル $Z$ を作れば

$$
E[X\mid Z=i]=E[X\mid H_i].
$$

したがってタワープロパティは

$$
\boxed{
E[X]
=\sum_{i=1}^m E[X\mid H_i]P(H_i)
}
$$

となります。従来「全期待値公式」と呼んでいた有限分割の式は、タワープロパティを具体的に書き下したものです。

### 3.6 条件付き分散の計算公式と全分散公式

$X,Z$ を実数値確率変数とし、$E[X^2]<\infty$ とします。条件付き分散の定義を展開すると

$$
\begin{aligned}
\operatorname{Var}(X\mid Z)
&=E\left[\{X-E[X\mid Z]\}^2\mid Z\right]\\
&=E[X^2\mid Z]
-2E[X\mid Z]E[X\mid Z]
+\{E[X\mid Z]\}^2\\
&=E[X^2\mid Z]-\{E[X\mid Z]\}^2.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(X\mid Z)
=E[X^2\mid Z]-\{E[X\mid Z]\}^2
}.
$$

この式を変形して

$$
E[X^2\mid Z]
=\operatorname{Var}(X\mid Z)+\{E[X\mid Z]\}^2
$$

とし、両辺の期待値を取ります。タワープロパティより

$$
E\{E[X^2\mid Z]\}=E[X^2]
$$

なので

$$
E[X^2]
=E\{\operatorname{Var}(X\mid Z)\}
+E\left[\{E[X\mid Z]\}^2\right].
$$

ここから $(E[X])^2$ を引き、さらに

$$
E[X]=E\{E[X\mid Z]\}
$$

を使うと

$$
\boxed{
\operatorname{Var}(X)
=E\{\operatorname{Var}(X\mid Z)\}
+\operatorname{Var}\{E[X\mid Z]\}
}.
$$

これが**全分散公式**です。

- 第1項 $E\{\operatorname{Var}(X\mid Z)\}$：条件を固定しても残る「群内」の変動。
- 第2項 $\operatorname{Var}\{E[X\mid Z]\}$：条件付き平均そのものが動く「群間」の変動。

#### 有限分割での全分散

$H_1,\ldots,H_m$ を有限分割とし、

$$
\mu_i=E[X\mid H_i],\qquad \mu=E[X]
$$

とおけば

$$
\boxed{
\operatorname{Var}(X)
=\sum_{i=1}^m\operatorname{Var}(X\mid H_i)P(H_i)
+\sum_{i=1}^m(\mu_i-\mu)^2P(H_i)
}.
$$

つまり有限分割の公式は一般形

$$
E\{\operatorname{Var}(X\mid Z)\}
+\operatorname{Var}\{E[X\mid Z]\}
$$

を和で書き下したものです。

### 3.7 条件付き共分散の計算公式と全共分散公式

$X,Y,Z$ を実数値確率変数とし、$E[X^2],E[Y^2]<\infty$ とします。条件付き共分散の定義を展開すると

$$
\begin{aligned}
\operatorname{Cov}(X,Y\mid Z)
&=E\left[
\{X-E[X\mid Z]\}
\{Y-E[Y\mid Z]\}
\mid Z
\right]\\
&=E[XY\mid Z]
-E[X\mid Z]E[Y\mid Z].
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Cov}(X,Y\mid Z)
=E[XY\mid Z]-E[X\mid Z]E[Y\mid Z]
}.
$$

これを

$$
E[XY\mid Z]
=\operatorname{Cov}(X,Y\mid Z)
+E[X\mid Z]E[Y\mid Z]
$$

と変形し、期待値を取ります。タワープロパティにより

$$
E[XY]
=E\{\operatorname{Cov}(X,Y\mid Z)\}
+E\{E[X\mid Z]E[Y\mid Z]\}.
$$

一方、

$$
E[X]=E\{E[X\mid Z]\},
\qquad
E[Y]=E\{E[Y\mid Z]\}
$$

なので、両辺から $E[X]E[Y]$ を引けば

$$
\boxed{
\operatorname{Cov}(X,Y)
=E\{\operatorname{Cov}(X,Y\mid Z)\}
+\operatorname{Cov}\{E[X\mid Z],E[Y\mid Z]\}
}.
$$

これが**全共分散公式**です。

- 第1項：条件を固定したときに残る「群内共分散」の平均。
- 第2項：条件付き平均どうしが $Z$ に応じて一緒に動く「群間共分散」。

$Y=X$ とすれば

$$
\operatorname{Cov}(X,X\mid Z)=\operatorname{Var}(X\mid Z)
$$

なので、全共分散公式はそのまま全分散公式になります。したがって全分散は全共分散の特殊例と見ることもできます。

#### 有限分割での全共分散

$H_1,\ldots,H_m$ を有限分割とし、

$$
\mu_{Xi}=E[X\mid H_i],\qquad
\mu_{Yi}=E[Y\mid H_i],
$$

$$
\mu_X=E[X],\qquad \mu_Y=E[Y]
$$

とおけば

$$
\boxed{
\begin{aligned}
\operatorname{Cov}(X,Y)
&=\sum_{i=1}^m\operatorname{Cov}(X,Y\mid H_i)P(H_i)\\
&\quad+\sum_{i=1}^m
(\mu_{Xi}-\mu_X)(\mu_{Yi}-\mu_Y)P(H_i).
\end{aligned}
}
$$

これで、有限分割についても平均・分散・共分散が同じ構造で並びます。

### 3.8 確率母関数の微分

$X$ を $\mathbb N_0$ 上の確率変数とし、確率質量関数を $p_X(k)=P(X=k)$、確率母関数を

$$
G_X(s)=\sum_{k=0}^{\infty}p_X(k)s^k
$$

とします。$0\leq s<1$ では、べき級数を項別微分して

$$
G_X'(s)=\sum_{k=1}^{\infty}k p_X(k)s^{k-1},
$$

$$
G_X''(s)=\sum_{k=2}^{\infty}k(k-1)p_X(k)s^{k-2}.
$$

対応するモーメントが有限なら $s\uparrow1$ として

$$
G_X'(1-)=E[X],
\qquad
G_X''(1-)=E[X(X-1)].
$$

したがって

$$
E[X^2]
=E[X(X-1)]+E[X]
=G_X''(1-)+G_X'(1-).
$$

よって

$$
\operatorname{Var}(X)
=G_X''(1-)+G_X'(1-)-\{G_X'(1-)\}^2.
$$

### 3.9 モーメント母関数の微分

$X$ を実数値確率変数とし、モーメント母関数を

$$
M_X(t)=E[e^{tX}]
$$

とします。$M_X(t)$ が0を含む開区間で有限なら、その区間で微分でき

$$
M_X^{(r)}(t)=E[X^r e^{tX}],
$$

特に

$$
\boxed{M_X^{(r)}(0)=E[X^r]}.
$$

なぜ微分と期待値を交換できるかも確認しておきます。0の近傍で $M_X(\delta)$ と $M_X(-\delta)$ が有限となる $\delta>0$ を取れます。$|t|\leq\delta/2$ なら、各固定次数 $r$ に対してある定数 $C_r$ が存在し

$$
|X|^r e^{tX}
\leq C_r\{e^{\delta X}+e^{-\delta X}\}
$$

と押さえられます。右辺の期待値は有限で $t$ に依存しないため、微分と期待値を交換できます。本章ではこの条件確認までを使い、一般的な積分交換定理そのものは前提にしません。

### 3.10 独立和の母関数

確率母関数については、$X,Y$ を独立な非負整数値確率変数とし、それぞれの確率母関数を $G_X,G_Y$ とします。考えている $s$ で両方が有限なら

$$
\begin{aligned}
G_{X+Y}(s)
&=E[s^{X+Y}]\\
&=E[s^Xs^Y]\\
&=E[s^X]E[s^Y]\\
&=G_X(s)G_Y(s).
\end{aligned}
$$

モーメント母関数については、$X,Y$ を独立な実数値確率変数とし、それぞれのモーメント母関数を $M_X,M_Y$ とします。考えている $t$ で両方が有限なら

$$
\begin{aligned}
M_{X+Y}(t)
&=E[e^{t(X+Y)}]\\
&=E[e^{tX}e^{tY}]\\
&=M_X(t)M_Y(t).
\end{aligned}
$$

積へ分かれる3行目で独立性を使っています。

---

## 4. 典型例

### 例1：離散分布の平均と分散

$$
P(X=0)=\frac14,\qquad
P(X=1)=\frac12,\qquad
P(X=2)=\frac14
$$

とします。有限個の値しか取らないので二次モーメントは存在します。

$$
\begin{aligned}
E[X]
&=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14=1,\\
E[X^2]
&=0^2\cdot\frac14+1^2\cdot\frac12+2^2\cdot\frac14
=\frac32.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)=\frac32-1^2=\frac12.
$$

### 例2：タワープロパティと全分散

群ラベル $Z\in\{1,2\}$ が

$$
P(Z=1)=P(Z=2)=\frac12
$$

を満たし、条件付き平均が

$$
E[X\mid Z=1]=0,
\qquad
E[X\mid Z=2]=2,
$$

条件付き分散が

$$
\operatorname{Var}(X\mid Z=1)
=\operatorname{Var}(X\mid Z=2)=1
$$

とします。

まずタワープロパティから

$$
E[X]
=E\{E[X\mid Z]\}
=\frac12\cdot0+\frac12\cdot2
=1.
$$

次に全分散公式の第1項は

$$
E\{\operatorname{Var}(X\mid Z)\}
=\frac12\cdot1+\frac12\cdot1
=1,
$$

第2項は

$$
\operatorname{Var}\{E[X\mid Z]\}
=\frac12(0-1)^2+\frac12(2-1)^2
=1.
$$

よって

$$
\operatorname{Var}(X)=1+1=2.
$$

### 例3：全共分散

$Z\in\{0,1\}$ がそれぞれ確率 $1/2$ で生じ、

$$
E[X\mid Z=0]=0,
\qquad E[X\mid Z=1]=2,
$$

$$
E[Y\mid Z=0]=1,
\qquad E[Y\mid Z=1]=5,
$$

$$
\operatorname{Cov}(X,Y\mid Z=0)=1,
\qquad
\operatorname{Cov}(X,Y\mid Z=1)=-1
$$

とします。

群内共分散の平均は

$$
E\{\operatorname{Cov}(X,Y\mid Z)\}
=\frac12(1)+\frac12(-1)=0.
$$

一方、条件付き平均は $(0,1)$ と $(2,5)$ を取り、

$$
E[X]=1,
\qquad E[Y]=3
$$

なので

$$
\begin{aligned}
\operatorname{Cov}\{E[X\mid Z],E[Y\mid Z]\}
&=\frac12(0-1)(1-3)
+\frac12(2-1)(5-3)\\
&=1+1\\
&=2.
\end{aligned}
$$

したがって全共分散公式より

$$
\operatorname{Cov}(X,Y)=0+2=2.
$$

この例では群内共分散の平均は0でも、群平均どうしが同じ方向へ動くため周辺共分散は正になります。

### 例4：無相関だが独立でない

$X$ が $-1,0,1$ をそれぞれ確率 $1/3$ で取り、$Y=X^2$ とします。対称性から

$$
E[X]=0,
\qquad
E[XY]=E[X^3]=0.
$$

したがって

$$
\operatorname{Cov}(X,Y)
=E[XY]-E[X]E[Y]=0.
$$

一方、$Y=X^2$ と $X$ から完全に決まります。例えば $X=0$ なら必ず $Y=0$ ですから、$X,Y$ は独立ではありません。

### 例5：確率質量関数から確率母関数を作る

$$
P(X=k)=(1-p)p^k,\qquad k\in\mathbb N_0,\quad 0<p<1
$$

とします。定義から

$$
\begin{aligned}
G_X(s)
&=E[s^X]\\
&=\sum_{k=0}^{\infty}s^k(1-p)p^k\\
&=(1-p)\sum_{k=0}^{\infty}(ps)^k.
\end{aligned}
$$

幾何級数が収束する条件 $|ps|<1$ の下で

$$
\boxed{G_X(s)=\frac{1-p}{1-ps}}.
$$

ここで重要なのは、最終式を暗記することではなく、**確率質量関数を定義へ代入して幾何級数にすること**です。

### 例6：ベルヌーイ分布からモーメント母関数を作る

$P(X=1)=p$, $P(X=0)=1-p$ とします。定義から

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=e^{t\cdot0}P(X=0)+e^{t\cdot1}P(X=1)\\
&=(1-p)+pe^t.
\end{aligned}
$$

したがって

$$
M_X'(t)=pe^t,
\qquad
M_X''(t)=pe^t,
$$

より

$$
E[X]=M_X'(0)=p,
\qquad
E[X^2]=M_X''(0)=p,
$$

$$
\operatorname{Var}(X)=p-p^2=p(1-p).
$$

さらに独立な $X_1,\ldots,X_n$ が同じベルヌーイ分布に従い $S_n=\sum_iX_i$ とすると

$$
M_{S_n}(t)
=\prod_{i=1}^nM_{X_i}(t)
=\{1-p+pe^t\}^n.
$$

この式も「二項分布の公式」として置いたのではなく、**1変数の定義計算と独立性から導いた**ものです。

---

## 5. 問題解決の型

### 型1：存在を先に確認する

有限台なら必要なモーメントは存在します。無限台では、期待値なら $E[|X|]$、分散なら $E[X^2]$ を非負級数・広義積分として確認します。発散する積分を対称性などで形式的に相殺しません。

### 型2：一次・二次モーメントを分ける

$$
E[X],\qquad E[X^2]
$$

を別々に計算してから

$$
\operatorname{Var}(X)=E[X^2]-(E[X])^2
$$

へ代入します。最後に分散が非負か検算します。

### 型3：共分散は3つの期待値へ分解する

同時分布から

$$
E[XY],\qquad E[X],\qquad E[Y]
$$

を計算して

$$
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]
$$

へ代入します。

### 型4：条件付きで簡単になるなら、条件を外す順序を固定する

条件付き分布 $X\mid Z$ や $(X,Y)\mid Z$ が簡単なら、まず条件付きモーメントを求めます。

1. 平均なら $E[X\mid Z]$ を求め、タワープロパティで
   $$
   E[X]=E\{E[X\mid Z]\}
   $$
   とする。
2. 分散なら $E[X\mid Z]$ と $\operatorname{Var}(X\mid Z)$ を求め、
   $$
   \operatorname{Var}(X)
   =E\{\operatorname{Var}(X\mid Z)\}
   +\operatorname{Var}\{E[X\mid Z]\}
   $$
   とする。
3. 共分散なら条件付き平均2つと $\operatorname{Cov}(X,Y\mid Z)$ を求め、
   $$
   \operatorname{Cov}(X,Y)
   =E\{\operatorname{Cov}(X,Y\mid Z)\}
   +\operatorname{Cov}\{E[X\mid Z],E[Y\mid Z]\}
   $$
   とする。

有限分割では外側の期待値・分散・共分散を群確率による加重和へ書き換えます。

### 型5：母関数は「定義 → 収束範囲 → 微分 → 代入」

母関数そのものを求める問題では、最初に

$$
G_X(s)=E[s^X]
\quad\text{または}\quad
M_X(t)=E[e^{tX}]
$$

へ分布を代入します。既知の分布名から完成式だけを書くのは避けます。その後、有限となる範囲を確認し、必要回数だけ微分して最後に $s=1-$ または $t=0$ を代入します。

### 型6：共分散不等式は非負な分散二次式にする

任意の実数 $t$ に対して

$$
\operatorname{Var}(U+tV)\geq0
$$

を作り、$t$ の二次式が全実数で非負であることから判別式を使います。等号条件では、最小値0と「分散0ならほとんど確実に定数」をつなぎます。

---

# 6. 演習：問題の直後に解答

GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

## Level A：基礎部品

### P2-A04 離散平均・分散

- level: A
- minutes: 8
- topics: 期待値、分散
- calculation_load: low

離散型確率変数 $X$ の台を $\{0,1,2\}$ とし、確率質量関数 $p_X(x)=P(X=x)$ が

$$
p_X(0)=\frac14,\qquad
p_X(1)=\frac12,\qquad
p_X(2)=\frac14
$$

で与えられるとする。$E[X]$ と $\operatorname{Var}(X)$ を定義から求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$X$ は有限個の値しか取らないので二次モーメントは存在します。定義から

$$
\begin{aligned}
E[X]
&=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14=1,\\
E[X^2]
&=0^2\cdot\frac14+1^2\cdot\frac12+2^2\cdot\frac14
=\frac32.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(X)
=E[X^2]-(E[X])^2
=\frac32-1
=\boxed{\frac12}.
$$

##### 本番答案

$$
E[X]=1,\qquad E[X^2]=\frac32,\qquad
\operatorname{Var}(X)=\frac32-1=\frac12.
$$

##### 採点基準

- 平均: 4点
- 二次モーメント: 3点
- 分散公式への代入: 3点

<!-- solution-end -->

### P2-A05 線形変換

- level: A
- minutes: 6
- topics: 期待値、分散
- calculation_load: low

実数値確率変数 $X$ が $E[X]=2$, $\operatorname{Var}(X)=3$ を満たすとする。新たな確率変数を $Y=4-2X$ と定義する。$E[Y]$ と $\operatorname{Var}(Y)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

期待値の線形性から

$$
E[Y]=E[4-2X]=4-2E[X]=4-4=0.
$$

分散では定数の加算は影響せず、係数は二乗されるので

$$
\operatorname{Var}(Y)
=\operatorname{Var}(4-2X)
=(-2)^2\operatorname{Var}(X)
=4\cdot3
=12.
$$

##### 本番答案

$$
E[Y]=4-2\cdot2=0,\qquad
\operatorname{Var}(Y)=(-2)^2\cdot3=12.
$$

##### 採点基準

- 平均の線形性: 5点
- 分散の係数二乗: 5点

<!-- solution-end -->

### P2-A06 共分散公式

- level: A
- minutes: 7
- topics: 共分散
- calculation_load: low

実数値確率変数 $X,Y$ は二次モーメントが有限で、$E[X]=1$, $E[Y]=2$, $E[XY]=5$ を満たすとする。$\operatorname{Cov}(X,Y)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

二次モーメントが存在する状況では

$$
\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y].
$$

与えられた値を代入して

$$
\operatorname{Cov}(X,Y)
=5-1\cdot2
=\boxed{3}.
$$

##### 本番答案

$$
\operatorname{Cov}(X,Y)=5-1\cdot2=3.
$$

##### 採点基準

- 共分散公式: 5点
- 代入と結論: 5点

<!-- solution-end -->

## Level B：小問セット

### P2-B04 連続分布のモーメント

- level: B
- minutes: 13
- topics: 期待値、分散
- calculation_load: medium

連続型確率変数 $X$ の確率密度関数を $f_X(x)$ とし、

$$
f_X(x)=
\begin{cases}
2x,&0<x<1,\\
0,&\text{その他}
\end{cases}
$$

で与えられるとする。

1. $E[X]$ を求めよ。
2. $E[X^2]$ を求めよ。
3. $\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

台が $(0,1)$ に含まれるので必要なモーメントは有限です。

(1) 定義から

$$
\begin{aligned}
E[X]
&=\int_0^1 x f_X(x)\,dx\\
&=\int_0^1 2x^2\,dx\\
&=2\left[\frac{x^3}{3}\right]_0^1
=\frac23.
\end{aligned}
$$

(2) 同様に

$$
\begin{aligned}
E[X^2]
&=\int_0^1 x^2 f_X(x)\,dx\\
&=\int_0^1 2x^3\,dx\\
&=2\left[\frac{x^4}{4}\right]_0^1
=\frac12.
\end{aligned}
$$

(3) よって

$$
\operatorname{Var}(X)
=\frac12-\left(\frac23\right)^2
=\frac{9-8}{18}
=\boxed{\frac1{18}}.
$$

##### 本番答案

$$
E[X]=2\int_0^1x^2dx=\frac23,\qquad
E[X^2]=2\int_0^1x^3dx=\frac12,
$$

$$
\operatorname{Var}(X)=\frac12-\frac49=\frac1{18}.
$$

##### 採点基準

- (1) 積分設定・計算: 3点
- (2) 積分設定・計算: 3点
- (3) 分散: 4点

<!-- solution-end -->

### P2-B05 二値変数の相関

- level: B
- minutes: 14
- topics: 共分散、相関係数
- calculation_load: medium

2変量離散型確率変数 $(X,Y)$ は $\{(1,1),(1,-1),(-1,1),(-1,-1)\}$ のみを取り、その同時確率質量関数が

$$
\begin{aligned}
P(X=1,Y=1)&=\frac38,&
P(X=1,Y=-1)&=\frac18,\\
P(X=-1,Y=1)&=\frac18,&
P(X=-1,Y=-1)&=\frac38
\end{aligned}
$$

で与えられるとする。

1. $E[X],E[Y]$ を求めよ。
2. 各分散と共分散を求めよ。
3. 相関係数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) $X=1$ となる確率は $3/8+1/8=1/2$、$X=-1$ となる確率も $1/2$ です。したがって

$$
E[X]=1\cdot\frac12+(-1)\cdot\frac12=0.
$$

$Y$ も同じ周辺分布なので $E[Y]=0$ です。

(2) $X^2=Y^2=1$ なので

$$
\operatorname{Var}(X)=E[X^2]-E[X]^2=1,
\qquad
\operatorname{Var}(Y)=1.
$$

また $XY=1$ は符号が同じ2点、$XY=-1$ は符号が異なる2点で生じるため

$$
\begin{aligned}
E[XY]
&=1\left(\frac38+\frac38\right)
-1\left(\frac18+\frac18\right)\\
&=\frac12.
\end{aligned}
$$

平均がともに0なので

$$
\operatorname{Cov}(X,Y)=\frac12.
$$

(3) よって

$$
\rho(X,Y)
=\frac{1/2}{\sqrt{1\cdot1}}
=\boxed{\frac12}.
$$

##### 本番答案

対称性より $E[X]=E[Y]=0$、また $X^2=Y^2=1$ より各分散は1。

$$
E[XY]=\frac38+\frac38-\frac18-\frac18=\frac12
$$

なので $\operatorname{Cov}(X,Y)=1/2$、$\rho=1/2$。

##### 採点基準

- 平均: 2点
- 分散: 2点
- $E[XY]$: 3点
- 共分散・相関: 3点

<!-- solution-end -->

### P2-B06 確率母関数からモーメント

- level: B
- minutes: 15
- topics: 確率母関数
- calculation_load: medium

非負整数値確率変数 $X$ の確率母関数を $G_X(s)=E[s^X]$ とする。$G_X(s)=(1+s)^3/8$ が与えられている。

1. $P(X=k)$ を全て求めよ。
2. $E[X]$ を求めよ。
3. $\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) 二項展開すると

$$
G_X(s)
=\frac18(1+3s+3s^2+s^3).
$$

確率母関数の $s^k$ の係数が $P(X=k)$ なので

$$
P(X=0)=\frac18,\quad
P(X=1)=\frac38,\quad
P(X=2)=\frac38,\quad
P(X=3)=\frac18.
$$

(2) 微分すると

$$
G_X'(s)=\frac38(1+s)^2,
$$

したがって

$$
E[X]=G_X'(1)=\frac38\cdot4=\frac32.
$$

(3) さらに

$$
G_X''(s)=\frac34(1+s),
$$

なので

$$
E[X(X-1)]=G_X''(1)=\frac32.
$$

よって

$$
E[X^2]
=E[X(X-1)]+E[X]
=3,
$$

$$
\operatorname{Var}(X)
=3-\left(\frac32\right)^2
=\boxed{\frac34}.
$$

##### 本番答案

$$
G_X(s)=\frac18(1+3s+3s^2+s^3)
$$

より確率は $(1,3,3,1)/8$。また

$$
G_X'(1)=\frac32,\qquad G_X''(1)=\frac32,
$$

$$
\operatorname{Var}(X)=G_X''(1)+G_X'(1)-G_X'(1)^2=\frac34.
$$

##### 採点基準

- 係数と確率: 3点
- 一階微分と平均: 3点
- 二階微分、階乗モーメント、分散: 4点

<!-- solution-end -->

### P2-B07 ベルヌーイ分布からモーメント母関数を導く

- level: B
- minutes: 16
- topics: モーメント母関数、独立和
- calculation_load: medium

離散型確率変数 $X$ の台を $\{0,1\}$ とし、$0<p<1$ の下で $P(X=1)=p$, $P(X=0)=1-p$ とする。モーメント母関数は $M_X(t)=E[e^{tX}]$ と定義する。

1. 定義から $M_X(t)$ を求めよ。
2. $M_X'(0)$ と $M_X''(0)$ から平均・分散を求めよ。
3. 独立な $X_1,\ldots,X_n$ が同じ分布に従うとき、$S_n=\sum_{i=1}^nX_i$ のモーメント母関数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) 母関数の式を暗記して使うのではなく、定義へ確率質量関数を代入します。

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\sum_{x\in\{0,1\}}e^{tx}P(X=x)\\
&=e^0(1-p)+e^tp\\
&=\boxed{1-p+pe^t}.
\end{aligned}
$$

有限和なので全ての $t\in\mathbb R$ で有限です。

(2)

$$
M_X'(t)=pe^t,
\qquad
M_X''(t)=pe^t.
$$

したがって

$$
E[X]=M_X'(0)=p,
\qquad
E[X^2]=M_X''(0)=p,
$$

$$
\operatorname{Var}(X)=p-p^2=\boxed{p(1-p)}.
$$

(3) 独立性から指数関数の積の期待値が積へ分かれるため

$$
\begin{aligned}
M_{S_n}(t)
&=E\left[e^{t\sum_iX_i}\right]\\
&=E\left[\prod_{i=1}^ne^{tX_i}\right]\\
&=\prod_{i=1}^nE[e^{tX_i}]\\
&=\boxed{(1-p+pe^t)^n}.
\end{aligned}
$$

##### 本番答案

$$
M_X(t)=E[e^{tX}]=(1-p)+pe^t.
$$

よって $M_X'(0)=M_X''(0)=p$ から

$$
E[X]=p,\qquad \operatorname{Var}(X)=p(1-p).
$$

独立性より

$$
M_{S_n}(t)=\prod_{i=1}^nM_{X_i}(t)=(1-p+pe^t)^n.
$$

##### 採点基準

- 定義から母関数を導出: 4点
- 微分と平均・分散: 3点
- 独立性を明記して積へ分解: 3点

<!-- solution-end -->

### P2-B08 全共分散

- level: B
- minutes: 16
- topics: 条件付き期待値、条件付き共分散、全共分散
- calculation_load: medium

群ラベルを表す確率変数 $H\in\{0,1\}$ が $P(H=0)=P(H=1)=1/2$ を満たすとする。実数値確率変数 $X,Y$ は二次モーメントが有限で、条件付きモーメントが

$$
E[X\mid H=0]=0,
\qquad E[X\mid H=1]=2,
$$

$$
E[Y\mid H=0]=1,
\qquad E[Y\mid H=1]=5,
$$

$$
\operatorname{Cov}(X,Y\mid H=0)=1,
\qquad
\operatorname{Cov}(X,Y\mid H=1)=-1
$$

である。

1. $E[X]$ と $E[Y]$ を求めよ。
2. 全共分散公式から $\operatorname{Cov}(X,Y)$ を求めよ。
3. 条件付き共分散の計算公式から $E[XY\mid H=0],E[XY\mid H=1]$ を求め、$E[XY]-E[X]E[Y]$ でも同じ答えになることを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

(1) 全期待値公式より

$$
E[X]=\frac12\cdot0+\frac12\cdot2=1,
$$

$$
E[Y]=\frac12\cdot1+\frac12\cdot5=3.
$$

(2) 全共分散の群内成分は

$$
E\{\operatorname{Cov}(X,Y\mid H)\}
=\frac12(1)+\frac12(-1)=0.
$$

群間成分は

$$
\begin{aligned}
&\operatorname{Cov}\{E[X\mid H],E[Y\mid H]\}\\
&=\frac12(0-1)(1-3)
+\frac12(2-1)(5-3)\\
&=1+1=2.
\end{aligned}
$$

したがって

$$
\boxed{\operatorname{Cov}(X,Y)=0+2=2}.
$$

(3) 条件付き共分散の計算公式

$$
\operatorname{Cov}(X,Y\mid H_i)
=E[XY\mid H_i]-E[X\mid H_i]E[Y\mid H_i]
$$

を $E[XY\mid H_i]$ について解くと

$$
E[XY\mid H_i]
=\operatorname{Cov}(X,Y\mid H_i)
+E[X\mid H_i]E[Y\mid H_i].
$$

よって

$$
E[XY\mid H=0]=1+0\cdot1=1,
$$

$$
E[XY\mid H=1]=-1+2\cdot5=9.
$$

タワープロパティから

$$
E[XY]=\frac12\cdot1+\frac12\cdot9=5.
$$

したがって

$$
E[XY]-E[X]E[Y]
=5-1\cdot3
=2,
$$

となり全共分散公式と一致します。

##### 本番答案

$$
E[X]=1,\qquad E[Y]=3.
$$

$$
E\{\operatorname{Cov}(X,Y\mid H)\}=0,
$$

$$
\operatorname{Cov}\{E[X\mid H],E[Y\mid H]\}=2,
$$

ゆえに $\operatorname{Cov}(X,Y)=2$。また

$$
E[XY\mid H=0]=1,
\qquad E[XY\mid H=1]=9,
$$

より $E[XY]=5$ で、$5-1\cdot3=2$ と一致する。

##### 採点基準

- 全期待値で周辺平均: 2点
- 全共分散の2成分: 4点
- 条件付き共分散から条件付き積モーメント: 2点
- タワープロパティで検算: 2点

<!-- solution-end -->

## Level C：本番標準

### P2-C06 混合集団の全分散

- level: C
- minutes: 24
- topics: 全期待値、全分散
- calculation_load: medium

群ラベルを表す確率変数 $H\in\{1,2\}$ が $P(H=1)=0.4$, $P(H=2)=0.6$ を満たすとする。実数値確率変数 $X$ の条件付き平均・条件付き分散が $E[X\mid H=1]=1$, $E[X\mid H=2]=3$, $\operatorname{Var}(X\mid H=1)=2$, $\operatorname{Var}(X\mid H=2)=1$ で与えられている。

1. $E[X]$ を求めよ。
2. 群内分散成分を求めよ。
3. 群間分散成分を求めよ。
4. $\operatorname{Var}(X)$ を求めよ。
5. 各成分が非負である意味を説明せよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動2分、(1)4分、(2)4分、(3)6分、(4)3分、(5)2分、見直し3分。

##### 詳細解答

(1) タワープロパティの有限分割形、すなわち全期待値公式より

$$
E[X]
=0.4\cdot1+0.6\cdot3
=0.4+1.8
=2.2.
$$

(2) 群内分散成分は条件付き分散の加重平均なので

$$
0.4\cdot2+0.6\cdot1=1.4.
$$

(3) 群間分散成分は条件付き平均の全平均まわりの分散です。

$$
\begin{aligned}
&0.4(1-2.2)^2+0.6(3-2.2)^2\\
&=0.4\cdot1.44+0.6\cdot0.64\\
&=0.576+0.384\\
&=0.96.
\end{aligned}
$$

(4) 全分散公式より

$$
\operatorname{Var}(X)=1.4+0.96=\boxed{2.36}.
$$

(5) 群内成分は分散の加重平均、群間成分は二乗偏差の加重平均なので、ともに非負です。全変動を「各群の中に残る変動」と「群平均どうしの違い」に分解しています。

##### 本番答案

$$
E[X]=0.4(1)+0.6(3)=2.2.
$$

群内成分は $0.4(2)+0.6(1)=1.4$、群間成分は

$$
0.4(1-2.2)^2+0.6(3-2.2)^2=0.96.
$$

したがって $\operatorname{Var}(X)=2.36$。両成分は分散または二乗偏差の加重平均なので非負。

##### 採点基準と選択判断

(1) 4点、(2) 4点、(3) 7点、(4) 4点、(5) 6点。3分で二成分を書ければ選択、15分で群間成分までなら継続します。

<!-- solution-end -->

### P2-C07 同時密度から相関係数

- level: C
- minutes: 28
- topics: 共分散、相関係数
- calculation_load: high

2変量連続型確率変数 $(X,Y)$ の同時確率密度関数を $f_{X,Y}(x,y)$ とし、$f_{X,Y}(x,y)=x+y$（$0<x<1$, $0<y<1$）、それ以外では0とする。

1. $E[X],E[Y]$ を求めよ。
2. $E[X^2],E[Y^2]$ を求めよ。
3. $E[XY]$ を求めよ。
4. 共分散と各分散を求めよ。
5. 相関係数を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)6分、(2)6分、(3)5分、(4)5分、(5)2分、見直し1分。

##### 詳細解答

まず正規化を確認すると

$$
\int_0^1\int_0^1(x+y)\,dy\,dx
=\frac12+\frac12=1.
$$

固定した $0<x<1$ に対し周辺密度は

$$
\begin{aligned}
f_X(x)
&=\int_0^1(x+y)\,dy\\
&=\left[xy+\frac{y^2}{2}\right]_0^1\\
&=x+\frac12.
\end{aligned}
$$

対称性から $f_Y(y)=y+1/2$（$0<y<1$）です。

(1)

$$
\begin{aligned}
E[X]
&=\int_0^1x\left(x+\frac12\right)dx\\
&=\left[\frac{x^3}{3}+\frac{x^2}{4}\right]_0^1\\
&=\frac7{12}.
\end{aligned}
$$

対称性より $E[Y]=7/12$。

(2)

$$
\begin{aligned}
E[X^2]
&=\int_0^1x^2\left(x+\frac12\right)dx\\
&=\left[\frac{x^4}{4}+\frac{x^3}{6}\right]_0^1\\
&=\frac5{12}.
\end{aligned}
$$

対称性より $E[Y^2]=5/12$。

(3)

$$
\begin{aligned}
E[XY]
&=\int_0^1\int_0^1xy(x+y)\,dy\,dx\\
&=\int_0^1\int_0^1(x^2y+xy^2)\,dy\,dx\\
&=\left(\int_0^1x^2dx\right)\left(\int_0^1y\,dy\right)
+\left(\int_0^1x\,dx\right)\left(\int_0^1y^2dy\right)\\
&=\frac13\cdot\frac12+\frac12\cdot\frac13\\
&=\frac13.
\end{aligned}
$$

(4)

$$
\operatorname{Cov}(X,Y)
=\frac13-\left(\frac7{12}\right)^2
=-\frac1{144},
$$

$$
\operatorname{Var}(X)
=\operatorname{Var}(Y)
=\frac5{12}-\frac{49}{144}
=\frac{11}{144}.
$$

(5)

$$
\rho(X,Y)
=\frac{-1/144}{\sqrt{(11/144)(11/144)}}
=\boxed{-\frac1{11}}.
$$

##### 本番答案

周辺密度 $f_X(x)=x+1/2$、対称性より $f_Y(y)=y+1/2$。

$$
E[X]=E[Y]=\frac7{12},\qquad
E[X^2]=E[Y^2]=\frac5{12},\qquad
E[XY]=\frac13.
$$

したがって

$$
\operatorname{Cov}(X,Y)=-\frac1{144},\quad
\operatorname{Var}(X)=\operatorname{Var}(Y)=\frac{11}{144},\quad
\rho=-\frac1{11}.
$$

##### 採点基準と選択判断

(1) 6点、(2) 5点、(3) 5点、(4) 6点、(5) 3点。3分で対称性と周辺密度を使えれば選択します。

<!-- solution-end -->

### P2-C08 べき型裾とモーメントの存在

- level: C
- minutes: 27
- topics: 期待値の存在、分散
- calculation_load: high

連続型確率変数 $X$ の確率密度関数を $f_X(x)$ とする。未知の正規化定数 $c>0$ と母数 $\alpha>1$ に対して $f_X(x)=cx^{-\alpha}$（$x\geq1$）、それ以外では0とする。

1. $c$ を求めよ。
2. $E[X]$ が有限となる $\alpha$ の範囲を求め、その値を計算せよ。
3. $E[X^2]$ が有限となる範囲を求め、その値を計算せよ。
4. 分散が有限となる範囲と分散を求めよ。
5. $1<\alpha\leq2$ で形式的な平均値を書いてはいけない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)4分、(2)6分、(3)6分、(4)5分、(5)2分、見直し1分。

##### 詳細解答

(1) 無限大をいきなり代入せず、上端を $R>1$ として計算します。

$$
\int_1^R x^{-\alpha}dx
=\frac{R^{1-\alpha}-1}{1-\alpha}.
$$

$\alpha>1$ なら $1-\alpha<0$ なので $R^{1-\alpha}\to0$。したがって

$$
\int_1^\infty x^{-\alpha}dx
=\frac1{\alpha-1}.
$$

正規化条件

$$
1=c\int_1^\infty x^{-\alpha}dx
$$

から

$$
\boxed{c=\alpha-1}.
$$

(2)(3) 一般に $r$ 次モーメントを調べると

$$
E[X^r]
=c\int_1^\infty x^{r-\alpha}dx.
$$

$\alpha\neq r+1$ のとき有限上限 $R$ では

$$
c\int_1^R x^{r-\alpha}dx
=c\frac{R^{r+1-\alpha}-1}{r+1-\alpha}.
$$

$R\to\infty$ で収束する条件は

$$
r+1-\alpha<0
\quad\Longleftrightarrow\quad
\alpha>r+1.
$$

境界 $\alpha=r+1$ では

$$
c\int_1^R\frac{dx}{x}=c\log R\to\infty
$$

なので収束しません。

$r=1$ とすると $\alpha>2$ のときに限り

$$
E[X]
=(\alpha-1)\int_1^\infty x^{1-\alpha}dx
=\boxed{\frac{\alpha-1}{\alpha-2}}.
$$

$r=2$ とすると $\alpha>3$ のときに限り

$$
E[X^2]
=(\alpha-1)\int_1^\infty x^{2-\alpha}dx
=\boxed{\frac{\alpha-1}{\alpha-3}}.
$$

(4) 分散が有限であるためには二次モーメントが有限である必要があるので $\alpha>3$。このとき

$$
\begin{aligned}
\operatorname{Var}(X)
&=\frac{\alpha-1}{\alpha-3}
-\left(\frac{\alpha-1}{\alpha-2}\right)^2\\
&=\boxed{\frac{\alpha-1}{(\alpha-3)(\alpha-2)^2}}.
\end{aligned}
$$

(5) $1<\alpha\leq2$ では $E[X]$ を定義する非負の広義積分そのものが発散します。不定積分の式へ形式的に端点を入れて有限らしい式を作っても、それは期待値ではありません。

##### 本番答案

正規化より $c=\alpha-1$。一般に

$$
E[X^r]<\infty
\quad\Longleftrightarrow\quad
\alpha>r+1.
$$

よって

$$
E[X]=\frac{\alpha-1}{\alpha-2}\quad(\alpha>2),
$$

$$
E[X^2]=\frac{\alpha-1}{\alpha-3}\quad(\alpha>3).
$$

したがって $\alpha>3$ で

$$
\operatorname{Var}(X)
=\frac{\alpha-1}{(\alpha-3)(\alpha-2)^2}.
$$

$1<\alpha\leq2$ では期待値を定義する広義積分が発散する。

##### 採点基準と選択判断

(1) 4点、(2) 6点、(3) 6点、(4) 5点、(5) 4点。3分でべき積分の収束判定が見えれば選択します。

<!-- solution-end -->

### P2-C09 幾何級数型の確率母関数

- level: C
- minutes: 25
- topics: 確率母関数
- calculation_load: medium

非負整数値確率変数 $X$ の確率質量関数を $p_X(k)=P(X=k)$ とする。$0<p<1$ の下で $p_X(k)=(1-p)p^k$（$k\in\mathbb N_0$）と与えられている。

1. 正規化を確認せよ。
2. 確率母関数とその有限な範囲を求めよ。
3. $E[X]$ を求めよ。
4. $E[X(X-1)]$ を求めよ。
5. $\operatorname{Var}(X)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動2分、(1)3分、(2)5分、(3)4分、(4)5分、(5)4分、見直し2分。

##### 詳細解答

(1) $0<p<1$ なので幾何級数が収束し

$$
\sum_{k=0}^{\infty}(1-p)p^k
=(1-p)\frac1{1-p}=1.
$$

(2) 定義から

$$
\begin{aligned}
G_X(s)
&=\sum_{k=0}^{\infty}s^k(1-p)p^k\\
&=(1-p)\sum_{k=0}^{\infty}(ps)^k.
\end{aligned}
$$

絶対収束条件は $|ps|<1$ なので

$$
\boxed{G_X(s)=\frac{1-p}{1-ps}},
\qquad |ps|<1.
$$

特に $|s|\leq1$ では有限です。

(3) 微分すると

$$
G_X'(s)
=(1-p)\frac{p}{(1-ps)^2}
=\frac{p(1-p)}{(1-ps)^2}.
$$

したがって

$$
E[X]=G_X'(1)=\boxed{\frac{p}{1-p}}.
$$

(4) さらに

$$
G_X''(s)
=\frac{2p^2(1-p)}{(1-ps)^3},
$$

よって

$$
E[X(X-1)]
=G_X''(1)
=\boxed{\frac{2p^2}{(1-p)^2}}.
$$

(5)

$$
\begin{aligned}
\operatorname{Var}(X)
&=G_X''(1)+G_X'(1)-\{G_X'(1)\}^2\\
&=\frac{2p^2}{(1-p)^2}
+\frac{p}{1-p}
-\frac{p^2}{(1-p)^2}\\
&=\boxed{\frac{p}{(1-p)^2}}.
\end{aligned}
$$

##### 本番答案

$$
G_X(s)
=(1-p)\sum_{k\geq0}(ps)^k
=\frac{1-p}{1-ps},\qquad |ps|<1.
$$

$$
G_X'(1)=\frac{p}{1-p},\qquad
G_X''(1)=\frac{2p^2}{(1-p)^2}.
$$

したがって

$$
\operatorname{Var}(X)
=G_X''(1)+G_X'(1)-G_X'(1)^2
=\frac{p}{(1-p)^2}.
$$

##### 採点基準と選択判断

(1) 3点、(2) 6点、(3) 4点、(4) 5点、(5) 7点。完成式だけでなく定義から幾何級数を作る部分を採点対象とします。

<!-- solution-end -->

### P2-C10 モーメント母関数と独立和

- level: C
- minutes: 25
- topics: モーメント母関数、独立和
- calculation_load: medium

実数値確率変数 $X$ のモーメント母関数を $M_X(t)=E[e^{tX}]$ とする。$M_X(t)=(1-2t)^{-1/2}$（$t<1/2$）が与えられている。$X_1,\ldots,X_n$ は独立で、各々 $X$ と同じ分布に従うとする。

1. $M_X(0)=1$ を確認せよ。
2. $E[X]$ を求めよ。
3. $E[X^2]$ と分散を求めよ。
4. $S_n=\sum_{i=1}^nX_i$ のモーメント母関数を求めよ。
5. $E[S_n]$, $\operatorname{Var}(S_n)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動2分、(1)2分、(2)4分、(3)7分、(4)5分、(5)3分、見直し2分。

##### 詳細解答

この問題ではモーメント母関数そのものが問題文で与えられているため、ここでは「母関数を導く」のではなく「微分して使う」ことが採点対象です。$t<1/2$ は0を含む開区間を含むので、0での微分からモーメントを取り出せます。

(1)

$$
M_X(0)=(1-0)^{-1/2}=1.
$$

(2) 合成関数の微分より

$$
\begin{aligned}
M_X'(t)
&=-\frac12(1-2t)^{-3/2}\cdot(-2)\\
&=(1-2t)^{-3/2}.
\end{aligned}
$$

よって

$$
E[X]=M_X'(0)=1.
$$

(3) もう一度微分すると

$$
\begin{aligned}
M_X''(t)
&=-\frac32(1-2t)^{-5/2}\cdot(-2)\\
&=3(1-2t)^{-5/2}.
\end{aligned}
$$

したがって

$$
E[X^2]=M_X''(0)=3,
$$

$$
\operatorname{Var}(X)=3-1^2=\boxed{2}.
$$

(4) 独立性から

$$
\begin{aligned}
M_{S_n}(t)
&=\prod_{i=1}^nM_{X_i}(t)\\
&=\{(1-2t)^{-1/2}\}^n\\
&=\boxed{(1-2t)^{-n/2}},
\qquad t<\frac12.
\end{aligned}
$$

(5) 期待値の線形性から

$$
E[S_n]=\sum_{i=1}^nE[X_i]=n.
$$

独立性から分散が加法的なので

$$
\operatorname{Var}(S_n)
=\sum_{i=1}^n\operatorname{Var}(X_i)
=2n.
$$

##### 本番答案

$$
M_X'(t)=(1-2t)^{-3/2},\qquad
M_X''(t)=3(1-2t)^{-5/2}.
$$

よって $E[X]=1$, $E[X^2]=3$, $\operatorname{Var}(X)=2$。独立性より

$$
M_{S_n}(t)=(1-2t)^{-n/2},\qquad t<\frac12,
$$

$$
E[S_n]=n,\qquad \operatorname{Var}(S_n)=2n.
$$

##### 採点基準と選択判断

(1) 2点、(2) 4点、(3) 7点、(4) 7点、(5) 5点。合成関数の微分と、積へ分ける箇所で独立性を明記することを採点します。

<!-- solution-end -->

## Level D：発展

### P2-D02 共分散不等式

- level: D
- minutes: 40
- topics: 共分散、相関係数
- calculation_load: high

実数値確率変数 $X,Y$ は $E[X^2],E[Y^2]<\infty$ かつ $\operatorname{Var}(X)>0$, $\operatorname{Var}(Y)>0$ を満たすとする。相関係数を

$$
\rho(X,Y)
=\frac{\operatorname{Cov}(X,Y)}
{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}}
$$

と定義する。分散の非負性から

$$
\operatorname{Cov}(X,Y)^2
\leq\operatorname{Var}(X)\operatorname{Var}(Y)
$$

を証明せよ。さらに $|\rho(X,Y)|\leq1$ と、等号成立条件を示せ。

<!-- solution-start -->

#### 解答

##### 時間配分

中心化5分、二次式10分、判別式8分、相関係数5分、等号条件8分、見直し4分。

##### 詳細解答

$U=X-E[X]$, $V=Y-E[Y]$ とします。任意の $t\in\mathbb R$ について分散は非負なので

$$
0\leq\operatorname{Var}(U+tV).
$$

中心化済みなので $E[U]=E[V]=0$ であり

$$
\begin{aligned}
\operatorname{Var}(U+tV)
&=E[(U+tV)^2]\\
&=E[U^2]+2tE[UV]+t^2E[V^2]\\
&=\operatorname{Var}(X)
+2t\operatorname{Cov}(X,Y)
+t^2\operatorname{Var}(Y).
\end{aligned}
$$

$\operatorname{Var}(Y)>0$ なので右辺は $t$ について上に開く二次式です。全ての実数 $t$ で非負であるため判別式は0以下です。

$$
\{2\operatorname{Cov}(X,Y)\}^2
-4\operatorname{Var}(Y)\operatorname{Var}(X)
\leq0.
$$

4で割れば

$$
\boxed{
\operatorname{Cov}(X,Y)^2
\leq\operatorname{Var}(X)\operatorname{Var}(Y)
}.
$$

両分散は正なので両辺を $\operatorname{Var}(X)\operatorname{Var}(Y)$ で割って

$$
\rho(X,Y)^2\leq1,
$$

したがって

$$
\boxed{|\rho(X,Y)|\leq1}.
$$

等号が成り立つとき、二次式の判別式は0で、

$$
t_0=-\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)}
$$

において最小値0を取ります。よって

$$
\operatorname{Var}(U+t_0V)=0.
$$

分散0の確率変数はほとんど確実に定数であり、しかも $E[U+t_0V]=0$ なので

$$
U+t_0V=0
$$

がほとんど確実に成り立ちます。すなわち、ある非零定数 $a=-t_0$ に対して

$$
\boxed{X-E[X]=a\{Y-E[Y]\}}
$$

がほとんど確実に成り立ちます。$a=0$ なら $\operatorname{Var}(X)=0$ となり仮定に反するため $a\neq0$ です。

逆にこの関係があるなら

$$
\operatorname{Cov}(X,Y)=a\operatorname{Var}(Y),
$$

$$
\operatorname{Var}(X)=a^2\operatorname{Var}(Y),
$$

なので共分散不等式は等号になります。

##### 本番答案

$U=X-E[X]$, $V=Y-E[Y]$ とする。任意の $t$ で

$$
0\leq\operatorname{Var}(U+tV)
=\operatorname{Var}(X)+2t\operatorname{Cov}(X,Y)+t^2\operatorname{Var}(Y).
$$

この二次式の判別式が非正だから

$$
\operatorname{Cov}(X,Y)^2
\leq\operatorname{Var}(X)\operatorname{Var}(Y),
$$

従って $|\rho|\leq1$。等号は、ある非零定数 $a$ に対し

$$
X-E[X]=a\{Y-E[Y]\}
$$

がほとんど確実に成り立つことと同値。

##### 採点基準と選択判断

- 中心化: 4点
- 分散二次式: 8点
- 判別式: 8点
- 相関係数: 5点
- 等号条件の必要性: 7点
- 十分性: 3点

<!-- solution-end -->

---

# 7. 30分ドリル

- 制限時間: 30分
- 目標: 混合モデルのモーメントから推定量の不偏性・分散・一致性へ進む
- level: C

## P2-DRILL-02 問題

$H\in\{0,1\}$ で $P(H=1)=p$、$0<p<1$ とし、$I=\boldsymbol{1}_{\{H=1\}}$ とおく。実数値確率変数 $X$ の条件付きモーメントは

$$
E[X\mid H=0]=1,
\quad \operatorname{Var}(X\mid H=0)=2,
$$

$$
E[X\mid H=1]=4,
\quad \operatorname{Var}(X\mid H=1)=1
$$

である。この混合分布から $X_1,\ldots,X_n$ を独立同分布に得て、$\overline X=n^{-1}\sum_iX_i$ とする。

1. $E[X]$ を $p$ で表せ。（15点）
2. 全分散公式で $\operatorname{Var}(X)$ を $p$ で表せ。（25点）
3. $\operatorname{Cov}(X,I)$ を求め、符号を説明せよ。（15点）
4. $\widehat p=(\overline X-1)/3$ が $p$ の不偏推定量であることを示し、分散を求めよ。（25点）
5. $P(|\widehat p-p|\geq\varepsilon)\leq\operatorname{Var}(\widehat p)/\varepsilon^2$ を用い、任意の $\varepsilon>0$ でこの確率が0へ収束することを示せ。（20点）

<!-- solution-start -->

### 解答

#### 詳細解答

(1) タワープロパティの有限分割形から

$$
\begin{aligned}
E[X]
&=(1-p)E[X\mid H=0]+pE[X\mid H=1]\\
&=(1-p)\cdot1+p\cdot4\\
&=\boxed{1+3p}.
\end{aligned}
$$

(2) 群内成分は

$$
E\{\operatorname{Var}(X\mid H)\}
=2(1-p)+p
=2-p.
$$

群間成分は、全平均 $1+3p$ を使って

$$
\begin{aligned}
&\operatorname{Var}\{E[X\mid H]\}\\
&=(1-p)\{1-(1+3p)\}^2
+p\{4-(1+3p)\}^2\\
&=9p^2(1-p)+9p(1-p)^2\\
&=9p(1-p)\{p+(1-p)\}\\
&=9p(1-p).
\end{aligned}
$$

よって

$$
\operatorname{Var}(X)
=(2-p)+9p(1-p)
=\boxed{2+8p-9p^2}.
$$

(3) まず直接計算します。$H=0$ なら $I=0$ なので $XI=0$、$H=1$ なら $I=1$ なので $XI=X$ です。したがって

$$
E[XI]
=P(H=1)E[X\mid H=1]
=4p.
$$

また $E[I]=p$ なので

$$
\begin{aligned}
\operatorname{Cov}(X,I)
&=E[XI]-E[X]E[I]\\
&=4p-(1+3p)p\\
&=\boxed{3p(1-p)}>0.
\end{aligned}
$$

全共分散公式でも同じことを確認できます。$H$ を固定すると $I$ は定数なので

$$
\operatorname{Cov}(X,I\mid H)=0.
$$

また

$$
E[X\mid H]=1+3I,
\qquad
E[I\mid H]=I.
$$

したがって

$$
\begin{aligned}
\operatorname{Cov}(X,I)
&=E\{\operatorname{Cov}(X,I\mid H)\}
+\operatorname{Cov}\{E[X\mid H],E[I\mid H]\}\\
&=0+\operatorname{Cov}(1+3I,I)\\
&=3\operatorname{Var}(I)\\
&=3p(1-p).
\end{aligned}
$$

群1の条件付き平均4が群0の条件付き平均1より大きいため、群1を示す指示変数と $X$ は正に連動します。

(4) 独立同分布性と期待値の線形性から $E[\overline X]=E[X]=1+3p$。よって

$$
E[\widehat p]
=\frac{E[\overline X]-1}{3}
=p.
$$

したがって不偏です。また独立性から

$$
\operatorname{Var}(\overline X)
=\frac{\operatorname{Var}(X)}{n},
$$

よって

$$
\operatorname{Var}(\widehat p)
=\frac19\operatorname{Var}(\overline X)
=\boxed{\frac{2+8p-9p^2}{9n}}.
$$

(5) 問題文で与えられたチェビシェフの不等式へ代入すると

$$
P(|\widehat p-p|\geq\varepsilon)
\leq
\frac{2+8p-9p^2}{9n\varepsilon^2}.
$$

固定した $0<p<1$ と $\varepsilon>0$ に対し分子は有限で、分母は $n$ に比例して増えるので

$$
\frac{2+8p-9p^2}{9n\varepsilon^2}\longrightarrow0.
$$

したがって $\widehat p$ は $p$ に確率収束します。

#### 完成形の本番答案

$$
E[X]=1+3p,
$$

$$
\operatorname{Var}(X)
=(2-p)+9p(1-p)
=2+8p-9p^2.
$$

$E[XI]=4p$ より

$$
\operatorname{Cov}(X,I)
=4p-(1+3p)p
=3p(1-p)>0.
$$

また

$$
E[\widehat p]=p,\qquad
\operatorname{Var}(\widehat p)
=\frac{2+8p-9p^2}{9n}.
$$

チェビシェフの不等式から

$$
P(|\widehat p-p|\geq\varepsilon)
\leq\frac{2+8p-9p^2}{9n\varepsilon^2}
\to0.
$$

#### 採点基準・時間配分

全期待値15点、全分散25点、共分散15点、不偏性・分散25点、確率収束20点。初動3分、(1)3分、(2)7分、(3)4分、(4)7分、(5)3分、見直し3分。

<!-- solution-end -->

---

# 8. 実過去問演習

問題文は転載せず、公式問題集の年度・科目・大問番号で参照します。

### PAST-P2M-01: MATH-2023-Q1

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 現在20分、P4-02・I1-02修了後30分
- 現在解く範囲: ポアソン分布のモーメント、線形性による統計量の平均・分散
- 後続章で再挑戦: 不偏推定量と一致性
- 答案確認: 各確率変数の独立性を確認してから分散を足し、推定対象を明記する。

### PAST-P2M-02: MATH-2023-Q3

- 入手先: 統計検定公式問題集［2022〜2024年］
- 制限時間: 30分
- 現在解く範囲: 指数分布のモーメント母関数、定義からの導出、微分によるモーメント、重み付け後の正規化
- 後続章で再挑戦: 母数推定
- 答案確認: モーメント母関数の存在範囲と、微分して期待値を取り出せる条件を落とさない。

## 過去問型独自ドリルとの接続

P2-DRILL-02では、タワープロパティ・全分散で得た量を群指標との共分散へ再利用し、さらに全共分散でも同じ共分散を導けることを確認します。復習時には混合比を未知数 $p$ として、$E[X]$ から $p$ を解くモーメント推定までつなげます。

---

## 9. 章末チェック

次を式から説明できれば、この章の核は押さえられています。

1. なぜ $E[X^2]-(E[X])^2$ が分散になるか。
2. 独立なら共分散0だが、逆が成り立たない例。
3. $E[X\mid Z=z]$ と $E[X\mid Z]$ の違い。
4. タワープロパティ $E\{E[X\mid Z]\}=E[X]$ を離散型で展開して示せること。
5. 全分散の群内項と群間項がどこから出るか。
6. 条件付き共分散を $E[XY\mid Z]-E[X\mid Z]E[Y\mid Z]$ へ変形できること。
7. 全共分散の群内項と群間項を説明でき、$Y=X$ で全分散へ戻せること。
8. $G_X'(1-)$ が平均、$G_X''(1-)$ が階乗モーメントになる理由。
9. モーメント母関数を、分布の定義から自力で作れること。
10. 独立和の母関数が積になる箇所で、どこに独立性を使うか。
11. 広義積分からモーメントの存在範囲を判定できること。
12. 相関係数の絶対値が1以下となることを分散の非負性から示せること。
