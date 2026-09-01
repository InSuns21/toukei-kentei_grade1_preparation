# SVM双対問題・KKT条件の詳細導出

この補講では、ハードマージンSVMの主問題から双対問題が出てくるまでを **途中式を省略せず** 導きます。その後、KKT条件をSVMへ適用し、なぜサポートベクトルだけが分類境界を決めるのかを確認します。

一般の制約付き最適化としての意味は [制約付き最適化・双対問題・KKT条件 補講](../../00_foundations/F0_00_統計検定1級のための数学速習/constrained_optimization_duality_kkt.md) を参照してください。

---

## 1. 出発点：ハードマージンSVMの主問題

2値ラベルを

$$
y_i\in\{-1,+1\}
$$

とし、分類関数を

$$
f(\boldsymbol x)=\boldsymbol w^{\mathsf T}\boldsymbol x+b
$$

とします。

ハードマージンSVMは

$$
\boxed{
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
}
$$

subject to

$$
\boxed{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
\qquad(i=1,\dots,n)
}
$$

です。

目的関数を小さくすることは、マージン幅

$$
\frac{2}{\|\boldsymbol w\|}
$$

を大きくすることに対応します。

---

## 2. 不等式制約を標準形へ直す

KKTやLagrangianでは、不等式制約を

$$
g_i(\boldsymbol w,b)\le0
$$

と書くと扱いやすいです。

SVMの制約を移項すると

$$
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0.
$$

したがって

$$
\boxed{
g_i(\boldsymbol w,b)
=1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)}
$$

です。

各制約に双対変数

$$
\alpha_i\ge0
$$

を割り当てます。

---

## 3. Lagrangianを作る

主目的関数に制約を足して

$$
\boxed{
L(\boldsymbol w,b,\boldsymbol\alpha)
=
\frac12\|\boldsymbol w\|^2
+
\sum_{i=1}^n
\alpha_i
\left\{
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\right\}
}
$$

とします。

ここから双対関数

$$
q(\boldsymbol\alpha)
=
\inf_{\boldsymbol w,b}
L(\boldsymbol w,b,\boldsymbol\alpha)
$$

を求めます。

重要なのは、**$\boldsymbol w,b$ を固定したまま代入するのではなく、$\boldsymbol\alpha$ を固定して $\boldsymbol w,b$ について最小化する**ことです。

---

## 4. まずLagrangianを展開する

和をばらすと

$$
\begin{aligned}
L
&=
\frac12\boldsymbol w^{\mathsf T}\boldsymbol w
+
\sum_i\alpha_i
-
\sum_i\alpha_i y_i
\boldsymbol w^{\mathsf T}\boldsymbol x_i
-
b\sum_i\alpha_i y_i.
\end{aligned}
$$

$\boldsymbol w$ を含む項は

$$
-\sum_i\alpha_i y_i
\boldsymbol w^{\mathsf T}\boldsymbol x_i
=
-\boldsymbol w^{\mathsf T}
\sum_i\alpha_i y_i\boldsymbol x_i.
$$

そこで

$$
\boldsymbol s
=
\sum_i\alpha_i y_i\boldsymbol x_i,
\qquad
c=\sum_i\alpha_i y_i
$$

と置けば

$$
\boxed{
L
=
\frac12\|\boldsymbol w\|^2
-\boldsymbol w^{\mathsf T}\boldsymbol s
+
\sum_i\alpha_i
-bc
}
$$

となります。

---

## 5. $b$ について最小化すると等式制約が出る

$b$ に関する項は

$$
-bc
$$

だけです。

もし

$$
c=\sum_i\alpha_i y_i\ne0
$$

なら、$b$ を正または負の無限大へ動かすことで

$$
-bc\to-\infty
$$

にできます。

すると

$$
q(\boldsymbol\alpha)
=
\inf_{\boldsymbol w,b}L
=-\infty
$$

となり、双対問題で意味のある候補になりません。

したがって、双対関数が有限値を持つためには

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

が必要です。

これは単なる「停留条件を覚える」話ではなく、**この条件がないと $b$ 方向にLagrangianが底なしになる**という意味です。

微分で書けば

$$
\frac{\partial L}{\partial b}
=-\sum_i\alpha_i y_i=0
$$

と同じ条件が得られます。

---

## 6. $\boldsymbol w$ について最小化する

条件

$$
\sum_i\alpha_i y_i=0
$$

の下では

$$
L
=
\frac12\|\boldsymbol w\|^2
-\boldsymbol w^{\mathsf T}\boldsymbol s
+
\sum_i\alpha_i.
$$

ここで

$$
\boldsymbol s
=
\sum_i\alpha_i y_i\boldsymbol x_i.
$$

$\boldsymbol w$ に関する部分を平方完成すると

$$
\begin{aligned}
\frac12\|\boldsymbol w\|^2
-\boldsymbol w^{\mathsf T}\boldsymbol s
&=
\frac12
\left(
\|\boldsymbol w\|^2
-2\boldsymbol w^{\mathsf T}\boldsymbol s
\right)\\
&=
\frac12
\left(
\|\boldsymbol w-\boldsymbol s\|^2
-\|\boldsymbol s\|^2
\right).
\end{aligned}
$$

したがって最小値は

$$
\boldsymbol w=\boldsymbol s
$$

で達成され、

$$
\boxed{
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
}
$$

です。

このとき

$$
\inf_{\boldsymbol w}
\left\{
\frac12\|\boldsymbol w\|^2
-\boldsymbol w^{\mathsf T}\boldsymbol s
\right\}
=
-\frac12\|\boldsymbol s\|^2.
$$

したがって双対関数は

$$
q(\boldsymbol\alpha)
=
\sum_i\alpha_i
-
\frac12
\left\|
\sum_i\alpha_i y_i\boldsymbol x_i
\right\|^2.
$$

---

## 7. ノルム平方を二重和へ展開する

ここが最終式へ飛びやすい箇所です。

$$
\left\|
\sum_i\alpha_i y_i\boldsymbol x_i
\right\|^2
$$

は内積で

$$
\left(
\sum_i\alpha_i y_i\boldsymbol x_i
\right)^{\mathsf T}
\left(
\sum_j\alpha_j y_j\boldsymbol x_j
\right)
$$

です。

分配すると

$$
\begin{aligned}
\left\|
\sum_i\alpha_i y_i\boldsymbol x_i
\right\|^2
&=
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j.
\end{aligned}
$$

よって

$$
\boxed{
q(\boldsymbol\alpha)
=
\sum_i\alpha_i
-
\frac12
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
}
$$

です。

---

## 8. なぜこれを最大化するのか

主問題は最小化問題です。

双対関数は、任意の

$$
\alpha_i\ge0
$$

について主問題の最適値 $p^*$ の下界になります。

$$
q(\boldsymbol\alpha)\le p^*.
$$

したがって、より鋭い下界を得るため

$$
q(\boldsymbol\alpha)
$$

を最大化します。

これにより双対問題は

$$
\boxed{
\max_{\boldsymbol\alpha}
\left[
\sum_i\alpha_i
-
\frac12
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
\right]
}
$$

subject to

$$
\boxed{
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0
}
$$

となります。

これがハードマージンSVMの双対問題です。

---

## 9. 双対問題を解いた後、$\boldsymbol w,b$ はどう戻すか

最適な $\alpha_i^*$ が得られれば

$$
\boxed{
\boldsymbol w^*
=
\sum_i\alpha_i^*y_i\boldsymbol x_i
}
$$

で $\boldsymbol w^*$ を復元できます。

$b$ は、後で見るKKT相補性から、$\alpha_i^*>0$ のサポートベクトルについて

$$
y_i(\boldsymbol w^{*\mathsf T}\boldsymbol x_i+b^*)=1
$$

を使い

$$
\boxed{
b^*=y_i-\boldsymbol w^{*\mathsf T}\boldsymbol x_i
}
$$

と求められます。

複数のサポートベクトルがあれば、数値計算ではそれぞれから得る値を平均することもあります。

---

## 10. SVMにおけるKKT条件を全部書く

ハードマージンSVMではKKT条件は次の4群です。

### 10.1 主実行可能性

$$
\boxed{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1}
$$

すべての訓練点を正しく、少なくともマージン上または外側に置きます。

### 10.2 双対実行可能性

$$
\boxed{\alpha_i\ge0}
$$

です。

### 10.3 停留条件

$$
\boxed{
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
}
$$

および

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

です。

### 10.4 相補性条件

標準形

$$
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0
$$

に対して

$$
\alpha_i
\left\{
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\right\}=0.
$$

符号を変えれば

$$
\boxed{
\alpha_i
\left\{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)-1
\right\}=0
}
$$

です。

---

## 11. なぜサポートベクトルだけが効くのか

相補性条件から、各点について二つの場合があります。

### 11.1 マージンより十分外側の点

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)>1
$$

なら

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)-1>0.
$$

積が0なので

$$
\boxed{\alpha_i=0}.
$$

この点は

$$
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
$$

に寄与しません。

### 11.2 マージン上の点

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
$$

なら相補性条件は自動的に満たされ、

$$
\alpha_i>0
$$

となり得ます。

この点がサポートベクトルです。

したがって

> 境界から十分離れた点は $\alpha_i=0$ になり、境界を決める式から消える。マージン上の点だけが $\boldsymbol w$ を支える。

というSVMの特徴がKKT条件から出てきます。

---

## 12. 1次元2点例を最初から最後まで解く

データを

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,+1)
$$

とします。

双対制約

$$
\alpha_1y_1+\alpha_2y_2=0
$$

より

$$
-\alpha_1+\alpha_2=0
$$

なので

$$
\alpha_1=\alpha_2=\alpha.
$$

双対目的関数は

$$
W(\alpha)
=
\alpha_1+\alpha_2
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_iy_jx_ix_j.
$$

ここでは

$$
y_1x_1=1,
\qquad
y_2x_2=1
$$

なので

$$
\sum_{i,j}
\alpha_i\alpha_jy_iy_jx_ix_j
=
(\alpha_1+\alpha_2)^2
=
4\alpha^2.
$$

したがって

$$
W(\alpha)
=2\alpha-2\alpha^2.
$$

微分すると

$$
W'(\alpha)=2-4\alpha.
$$

よって

$$
\boxed{\alpha=\frac12}.
$$

次に

$$
w
=
\sum_i\alpha_i y_ix_i
$$

なので

$$
w
=
\frac12\cdot(-1)\cdot(-1)
+
\frac12\cdot(+1)\cdot(+1)
=1.
$$

対称性またはKKT等号条件から

$$
b=0.
$$

したがって分類境界は

$$
\boxed{x=0}
$$

です。

両点で

$$
y_i(wx_i+b)=1
$$

かつ

$$
\alpha_i=\frac12>0
$$

なので、両点ともサポートベクトルです。

マージン幅は

$$
\boxed{\frac2{|w|}=2}.
$$

---

## 13. 双対化すると何がうれしいのか

双対問題ではデータ $\boldsymbol x_i$ は

$$
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
$$

という **内積** の形だけで現れます。

これがカーネル法につながります。

特徴写像 $\varphi$ を明示的に計算せず

$$
K(\boldsymbol x_i,\boldsymbol x_j)
=
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
$$

を計算できれば、双対問題の内積をそのまま $K$ で置き換えられます。

つまり

$$
\text{主問題}
\to
\text{双対問題}
\to
\text{データが内積だけで現れる}
\to
\text{カーネルトリック}
$$

という流れです。

---

## 14. ソフトマージンでは何が変わるか

ソフトマージンでは

$$
\min_{\boldsymbol w,b,\boldsymbol\xi}
\frac12\|\boldsymbol w\|^2
+C\sum_i\xi_i
$$

subject to

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\ge1-\xi_i,
\qquad
\xi_i\ge0
$$

とします。

この問題を双対化すると、ハードマージンの

$$
\alpha_i\ge0
$$

に加えて

$$
\boxed{\alpha_i\le C}
$$

が現れ、

$$
\boxed{0\le\alpha_i\le C}
$$

となります。

これは $\xi_i\ge0$ に対する双対変数を $\mu_i\ge0$ とすると、$\xi_i$ に関する停留条件

$$
C-\alpha_i-\mu_i=0
$$

から

$$
\alpha_i=C-\mu_i\le C
$$

と出ます。

その結果、概ね

- $\alpha_i=0$: マージンの十分外側
- $0<\alpha_i<C$: マージン上
- $\alpha_i=C$: マージン内側または誤分類側になり得る

という解釈へ拡張されます。

---

## 15. 試験で双対問題を導くときの答案の骨格

ハードマージンSVMの双対を問われたら、最低限次を順に書けば流れが切れません。

1. 制約を
   $$
   1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0
   $$
   と書く。
2. Lagrangian
   $$
   L=\frac12\|\boldsymbol w\|^2
   +\sum_i\alpha_i\{1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\}
   $$
   を置く。
3. $\boldsymbol w,b$ で最小化して
   $$
   \boldsymbol w=\sum_i\alpha_i y_i\boldsymbol x_i,
   \qquad
   \sum_i\alpha_i y_i=0
   $$
   を得る。
4. $\boldsymbol w$ の部分を平方完成するか代入して
   $$
   q(\boldsymbol\alpha)
   =\sum_i\alpha_i
   -\frac12
   \left\|\sum_i\alpha_i y_i\boldsymbol x_i\right\|^2
   $$
   とする。
5. ノルム平方を二重和へ展開する。
6. $\alpha_i\ge0$、$\sum_i\alpha_i y_i=0$ の下で $q$ を最大化する。

「停留条件を代入して双対問題を得る」の一言だけで済ませず、**$b$ の係数が0でないと $-\infty$ になることと、$\boldsymbol w$ の平方完成**を押さえると導出の意味が見えます。

---

## 章末チェック

- 主問題の不等式を $g_i\le0$ の形へ直せる。
- 双対関数が $\inf_{\boldsymbol w,b}L$ であることを説明できる。
- $\sum_i\alpha_i y_i=0$ が、$b$ 方向のLagrangianを有限に保つ条件であることを説明できる。
- $\boldsymbol w$ の部分を平方完成して $\boldsymbol w=\sum_i\alpha_i y_i\boldsymbol x_i$ を導ける。
- ノルム平方から二重和の双対目的関数を導ける。
- KKT条件4群をSVMの式で書ける。
- $\alpha_i>0$ とサポートベクトルの関係を相補性から説明できる。
- 双対問題に内積だけが現れることからカーネル法への接続を説明できる。
