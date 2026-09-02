# F0-02 制約付き最適化・双対問題・KKT条件

この補講では、ラグランジュ未定乗数法から一歩進んで、**不等式制約を含む最適化問題をどう扱うか**を整理します。凸集合・凸関数そのものの基礎は [F0-00G](../F0_00G_凸集合_凸関数_凸最適化/index.md) で準備済みとし、ここで双対関数・Slater条件・KKTへ進みます。SVMで突然現れる双対変数やKKT条件を「覚える4条件」にせず、なぜ必要になるのかを順に見ます。

[F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) では等式制約のラグランジュ未定乗数法を扱っています。このページではそこから、

1. 不等式制約とLagrangian
2. 双対関数と弱双対性
3. KKT条件
4. 制約が効いている／効いていないという相補性
5. SVMへの接続

まで進みます。

KKTの4条件を「なぜこの形になるのか」まで導出したい場合は、発展補講 [F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md#ref-kkt-derivation) を参照してください。局所最適性から接錐・polar cone・Farkasの補題を経て、停留条件・双対実行可能性・相補性が現れるところまで示しています。

さらに **Farkasの補題自体の出所**、分離超平面定理の証明、SVMの線形分離・凸包・最大マージンとのつながりまで追う場合は、[F0-02B 分離超平面定理・Farkasの補題・SVM](../F0_02B_分離超平面定理_Farkas_SVM/index.md#ref-farkas-from-separation) を参照してください。

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

<a id="ref-duality-construction"></a>

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

<a id="ref-kkt-overview"></a>

## 5. KKT条件は何をまとめたものか

最適解 $\boldsymbol x^*$ と対応する乗数 $\boldsymbol\alpha^*,\boldsymbol\nu^*$ では、次の4種類の条件を同時に満たすことを考えます。

ここではまずKKT条件を「使える形」として整理します。この4条件そのものを局所最適性から導く流れは、[F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md#ref-kkt-derivation) で詳しく扱います。

### 5.1 主実行可能性

元の制約を満たすことです。

$$
\boxed{g_i(\boldsymbol x^*)\le0}
$$

$$
\boxed{h_j(\boldsymbol x^*)=0}
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

では $\alpha_i>0$ となり得ます。**このうち $\alpha_i>0$ となる点**が双対表現

$$
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
$$

に寄与し、サポートベクトルとして分類境界を支えます。

したがって確実に成り立つ向きは

$$
\boxed{
\alpha_i>0
\Longrightarrow
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
}
$$

です。

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

SVMでの具体的な式展開は [E1-04 プロビット・非線形回帰・SVM](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) の「SVMの最適化」で扱います。

KKT条件自体の理論的な出所を追う場合は、[F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md#ref-kkt-derivation) へ進んでください。

Farkasの補題をさらに分離超平面定理から導き、SVMの「線形分離可能 ⇔ 正負クラスの凸包が非交差」「最大マージン = 凸包間最短距離」という幾何までつなげる場合は、[F0-02B 分離超平面定理・Farkasの補題・SVM](../F0_02B_分離超平面定理_Farkas_SVM/index.md#ref-farkas-from-separation) へ進んでください。

---

## 演習

### F0-02-A01 KKTで境界解を求める

- Level: A
- 目安時間: 12分

$$
\min_x (x+1)^2
\qquad\text{subject to}\qquad x\ge0
$$

を $g(x)=-x\le0$ と書き、KKT条件から最適解と乗数を求めよ。

<!-- solution-start -->
#### 詳細解答
Lagrangianは $L=(x+1)^2-\alpha x$。KKTは $x\ge0$, $\alpha\ge0$, $2(x+1)-\alpha=0$, $\alpha x=0$。制約なし解 $x=-1$ は実行不能なので境界 $x=0$。停留条件から $\alpha=2$。
#### 本番答案
$L=(x+1)^2-\alpha x$。KKTより $x^*=0$、$2-\alpha=0$ なので $\alpha^*=2$。
#### 採点基準（20点）
- 標準形とLagrangian: 5点
- KKT 4条件: 7点
- 境界解の決定: 4点
- 乗数: 4点
<!-- solution-end -->

### F0-02-B01 弱双対性を導く

- Level: B
- 目安時間: 15分

最小化問題の実行可能点 $x$ と双対実行可能な $(\alpha,\nu)$ に対して

$$
q(\alpha,\nu)\le f(x)
$$

を示し、$d^*\le p^*$ を導け。

<!-- solution-start -->
#### 詳細解答
双対関数の定義から $q(\alpha,\nu)=\inf_z L(z,\alpha,\nu)\le L(x,\alpha,\nu)$。実行可能点では $g_i(x)\le0$, $h_j(x)=0$、かつ $\alpha_i\ge0$ なので $L(x,\alpha,\nu)\le f(x)$。従って任意の実行可能 $x$ に対し $q\le f(x)$。主問題でinf、双対問題でsupを取れば $d^*\le p^*$。
#### 本番答案
$q=\inf_zL(z,\alpha,\nu)\le L(x,\alpha,\nu)\le f(x)$。従って双対側でsup、主問題側でinfを取って $d^*\le p^*$。
#### 採点基準（20点）
- $q\le L$: 5点
- 実行可能性から $L\le f$: 7点
- 任意性の利用: 4点
- $d^*\le p^*$: 4点
<!-- solution-end -->
---

## 章末チェック

- 不等式制約を $g_i(\boldsymbol x)\le0$ の形へ直せる。
- $\alpha_i\ge0$ とする理由を弱双対性から説明できる。
- 双対関数 $q=\inf_xL$ が主問題の最適値の下界になることを説明できる。
- KKT条件の4要素を、主実行可能性・双対実行可能性・停留条件・相補性として書ける。
- $g_i<0$ なら $\alpha_i=0$ となる意味を説明できる。
- SVMで $\alpha_i>0$ の点がサポートベクトルになる理由を相補性から説明できる。
- 4条件の導出そのものを追う必要があるとき、[F0-02Aの接錐・polar cone・Farkasの補講](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md#ref-kkt-derivation)へ辿れる。
- Farkasの補題の証明や分離超平面定理・SVMの凸包幾何まで必要なとき、[F0-02B](../F0_02B_分離超平面定理_Farkas_SVM/index.md#ref-farkas-from-separation)へ辿れる。
