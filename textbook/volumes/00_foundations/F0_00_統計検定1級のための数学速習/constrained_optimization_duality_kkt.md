# 制約付き最適化・双対問題・KKT条件 補講

この補講では、ラグランジュ未定乗数法から一歩進んで、**不等式制約を含む最適化問題をどう扱うか**を整理します。SVMで突然現れる双対変数やKKT条件を「覚える4条件」にせず、なぜ必要になるのかを順に見ます。

本編の [F0-00 数学速習](index.md) では等式制約のラグランジュ未定乗数法を扱っています。このページではそこから、

1. 不等式制約とLagrangian
2. 双対関数と弱双対性
3. KKT条件
4. 制約が効いている／効いていないという相補性
5. SVMへの接続

まで進みます。

---

## 1. まず何が新しいのか

等式制約

$$
h(\boldsymbol x)=0
$$

だけなら、ラグランジュ未定乗数法で

$$
L(\boldsymbol x,\nu)
=f(\boldsymbol x)+\nu h(\boldsymbol x)
$$

を作り、停留条件を調べます。

しかしSVMの制約は

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
$$

という **不等式制約** です。

一般に、次の最小化問題を考えます。

$$
\boxed{
\min_{\boldsymbol x} f(\boldsymbol x)
}
$$

subject to

$$
g_i(\boldsymbol x)\le0
\qquad(i=1,\dots,m),
$$

$$
h_j(\boldsymbol x)=0
\qquad(j=1,\dots,r).
$$

ここでは不等式を $g_i\le0$ の向きへ統一します。

---

## 2. 不等式制約のLagrangian

不等式制約には非負の乗数 $\alpha_i\ge0$、等式制約には符号制限のない乗数 $\nu_j$ を付けて

$$
\boxed{
L(\boldsymbol x,\boldsymbol\alpha,\boldsymbol\nu)
=
f(\boldsymbol x)
+\sum_{i=1}^m\alpha_i g_i(\boldsymbol x)
+\sum_{j=1}^r\nu_j h_j(\boldsymbol x)
}
$$

とします。

なぜ不等式制約では $\alpha_i\ge0$ とするのでしょうか。

制約を満たす点では

$$
g_i(\boldsymbol x)\le0
$$

なので、$\alpha_i\ge0$ なら

$$
\alpha_i g_i(\boldsymbol x)\le0.
$$

また等式制約を満たす点では

$$
\nu_jh_j(\boldsymbol x)=0.
$$

したがって、任意の実行可能点について

$$
L(\boldsymbol x,\boldsymbol\alpha,\boldsymbol\nu)
\le
f(\boldsymbol x)
$$

となります。

この「Lagrangianが元の目的関数の下側に来る」ことが双対問題へつながります。

---

## 3. 双対関数：元の最小値に対する下からの評価

$\boldsymbol\alpha,\boldsymbol\nu$ を固定し、$\boldsymbol x$ についてLagrangianを最小化して

$$
\boxed{
q(\boldsymbol\alpha,\boldsymbol\nu)
=
\inf_{\boldsymbol x}
L(\boldsymbol x,\boldsymbol\alpha,\boldsymbol\nu)
}
$$

と定義します。これを **双対関数** といいます。

元の問題の最適値を $p^*$ とします。任意の実行可能な $\boldsymbol x$ に対して

$$
q(\boldsymbol\alpha,\boldsymbol\nu)
\le
L(\boldsymbol x,\boldsymbol\alpha,\boldsymbol\nu)
\le
f(\boldsymbol x)
$$

なので、特に

$$
\boxed{
q(\boldsymbol\alpha,\boldsymbol\nu)\le p^*
}
$$

です。

つまり双対関数は、元の最小値を **下から評価する量** です。

それなら、できるだけ鋭い下界を得るために

$$
\boxed{
\max_{\boldsymbol\alpha,\boldsymbol\nu}
q(\boldsymbol\alpha,\boldsymbol\nu)
}
$$

としたくなります。これが双対問題です。ただし

$$
\alpha_i\ge0
$$

という制約を保ちます。

元の問題を **主問題（primal problem）**、この下界を最大化する問題を **双対問題（dual problem）** と呼びます。

---

## 4. 弱双対性と強双対性

常に成り立つ

$$
q(\boldsymbol\alpha,\boldsymbol\nu)\le p^*
$$

を **弱双対性** といいます。

一方、主問題の最適値 $p^*$ と双対問題の最適値 $d^*$ が

$$
\boxed{p^*=d^*}
$$

となることを **強双対性** といいます。

強双対性はどんな問題でも自動的に成立するわけではありません。ただし、目的関数が凸、制約も凸という **凸最適化問題** で、さらに実行可能領域の内部に制約を厳密に満たす点があるなどの条件（Slater条件）があれば、強双対性が成立します。

ハードマージンSVMは、線形分離可能で厳密な実行可能点がある場合、この枠組みに入ります。

---

## 5. KKT条件は何をまとめたものか

最適解 $\boldsymbol x^*$ と対応する乗数 $\boldsymbol\alpha^*,\boldsymbol\nu^*$ では、次の4種類の条件を同時に満たすことを考えます。

### 5.1 主実行可能性

元の制約を満たすことです。

$$
\boxed{
g_i(\boldsymbol x^*)\le0}
$$

$$
\boxed{
h_j(\boldsymbol x^*)=0}
$$

### 5.2 双対実行可能性

不等式制約に対応する乗数は

$$
\boxed{\alpha_i^*\ge0}
$$

です。

### 5.3 停留条件

Lagrangianを $\boldsymbol x$ で微分して

$$
\boxed{
\nabla_{\boldsymbol x}
L(\boldsymbol x^*,\boldsymbol\alpha^*,\boldsymbol\nu^*)
=\boldsymbol0
}
$$

となります。

これは等式制約だけのラグランジュ未定乗数法でも見た条件です。

### 5.4 相補性条件

不等式制約ごとに

$$
\boxed{
\alpha_i^*g_i(\boldsymbol x^*)=0
}
$$

が成り立ちます。

これがKKT条件で最も特徴的な部分です。

---

## 6. 相補性は「制約が効くか、乗数が0か」

積が0なので、各制約について次のどちらかです。

### 制約が余っている場合

$$
g_i(\boldsymbol x^*)<0
$$

なら

$$
\boxed{\alpha_i^*=0}.
$$

つまり、その制約を少し動かしても最適解に影響しないため、対応する乗数は0です。

### 制約がぴったり効いている場合

$$
g_i(\boldsymbol x^*)=0
$$

なら $\alpha_i^*$ は0とは限りません。

このような制約を **activeな制約** といいます。

KKT条件の相補性は、

> 制約に余裕があるなら、その制約の影響を表す乗数は0になる。

という関係を式にしたものです。

---

## 7. 1変数の例でKKT条件を解く

次を考えます。

$$
\min_x (x-2)^2
$$

subject to

$$
x\le1.
$$

制約を

$$
g(x)=x-1\le0
$$

と書きます。Lagrangianは

$$
L(x,\alpha)
=(x-2)^2+\alpha(x-1),
\qquad
\alpha\ge0.
$$

KKT条件は

1. $x-1\le0$
2. $\alpha\ge0$
3. $2(x-2)+\alpha=0$
4. $\alpha(x-1)=0$

です。

制約なしの最小点は $x=2$ ですが、これは $x\le1$ を満たしません。したがって最適点では制約がactiveになり

$$
x=1.
$$

停留条件へ代入すると

$$
2(1-2)+\alpha=0
$$

より

$$
\boxed{\alpha=2}.
$$

したがって

$$
\boxed{x^*=1,\quad\alpha^*=2}.
$$

ここでは境界 $x=1$ が最適解を押し止めているので、対応する乗数が正になっています。

---

## 8. SVMの制約をKKTの形へ直す

ハードマージンSVMの制約は

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1.
$$

KKTの標準形 $g_i\le0$ に合わせると

$$
\boxed{
g_i(\boldsymbol w,b)
=
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\le0
}
$$

です。

したがってLagrangianは

$$
L
=
\frac12\|\boldsymbol w\|^2
+
\sum_i\alpha_i
\left\{
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\right\},
\qquad
\alpha_i\ge0.
$$

相補性条件は

$$
\alpha_i
\left\{
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\right\}=0.
$$

符号を変えて

$$
\boxed{
\alpha_i
\left\{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)-1
\right\}=0
}
$$

と書いても同じです。

### マージンより外側の点

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)>1
$$

なら制約には余裕があります。したがって

$$
\boxed{\alpha_i=0}.
$$

### マージン上の点

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
$$

なら $\alpha_i>0$ となり得ます。

この点が **サポートベクトル** です。

SVMで「サポートベクトルだけが境界を決める」という性質は、KKT相補性の直接の帰結です。

---

## 9. KKT条件はいつ最適性を保証するのか

一般の非凸問題では、KKT条件を満たすだけで大域最適とは限りません。

一方、凸最適化問題で適切な正則条件が満たされると、KKT条件は最適性を特徴付けます。

ハードマージンSVMでは

- 目的関数 $\frac12\|\boldsymbol w\|^2$ は凸
- 制約 $1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\le0$ はアフィン

なので凸最適化問題です。線形分離可能で適切な実行可能性条件が満たされれば、KKT条件を使って最適解を特徴付けられます。

---

## 10. SVMで最低限追えるようにしたい流れ

SVMでは次の順で読むと迷いにくくなります。

$$
\text{主問題}
\longrightarrow
\text{不等式を }g_i\le0\text{ に直す}
\longrightarrow
\text{Lagrangian}
$$

$$
\longrightarrow
\inf_{\boldsymbol w,b}L
\longrightarrow
\text{双対関数}
\longrightarrow
\text{双対問題}
$$

$$
\longrightarrow
\text{KKT条件}
\longrightarrow
\text{サポートベクトルの判定}.
$$

SVMでの具体的な式展開は [E1-04 SVM双対問題・KKT条件の詳細導出](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/svm_dual_kkt_derivation.md) を参照してください。

---

## 章末チェック

- 不等式制約を $g_i(\boldsymbol x)\le0$ の形へ直せる。
- $\alpha_i\ge0$ とする理由を弱双対性から説明できる。
- 双対関数 $q=\inf_xL$ が主問題の最適値の下界になることを説明できる。
- KKT条件の4要素を、主実行可能性・双対実行可能性・停留条件・相補性として書ける。
- $g_i<0$ なら $\alpha_i=0$ となる意味を説明できる。
- SVMで $\alpha_i>0$ の点がサポートベクトルになる理由を相補性から説明できる。
