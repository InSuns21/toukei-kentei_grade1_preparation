# F0-02A KKT条件の導出：接錐・polar cone・Farkasの補題

この補講では、KKT条件を「4条件を覚える」形ではなく、**局所最適解では実行可能な一次方向へ目的関数を下げられない**という事実から導きます。

[F0-02 制約付き最適化・双対問題・KKT条件](../F0_02_制約付き最適化_双対_KKT/index.md) では、Lagrangian・双対問題・KKT条件の意味とSVMへの適用を扱いました。このページでは、その一段奥にある

$$
\boxed{
\text{局所最適性}
\to
\text{接錐}
\to
\text{polar cone}
\to
\text{線形化錐}
\to
\text{Farkasの補題}
\to
\text{KKT条件}
}
$$

を順に示します。

Farkasの補題そのものを **分離超平面定理から導くところまで** 戻りたい場合は、[F0-02B 分離超平面定理・Farkasの補題](../F0_02B_分離超平面定理_Farkas_SVM/index.md) を参照してください。閉凸集合への最近点射影から分離超平面を構成し、凸錐の分離を経てFarkasを導きます。SVMの凸包・最大マージンは続く [F0-02B1](../F0_02B1_SVM_凸包_最大マージン/index.md) で扱います。

この内容は統計検定1級でそのまま証明問題として要求される可能性は高くありません。SVMのKKT条件が「なぜこの形なのか」を理解したい場合の発展補講です。

---

## 1. 出発点：一般の制約付き最適化

次の問題を考えます。

$$
\min_{\boldsymbol x\in\mathbb R^p} f(\boldsymbol x)
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

実行可能集合を

$$
\boxed{
C
=
\left\{
\boldsymbol x:
 g_i(\boldsymbol x)\le0,
 h_j(\boldsymbol x)=0
\right\}
}
$$

とします。

$\boldsymbol x^*\in C$ が局所最小解であるとは、$\boldsymbol x^*$ の十分小さい近傍の実行可能点 $\boldsymbol x\in C$ に対して

$$
f(\boldsymbol x^*)\le f(\boldsymbol x)
$$

となることです。

この定義から、まず「$\boldsymbol x^*$ からどちら向きへ動けるか」を考えます。

---

## 2. 接錐：実際に実行可能な方向を集める

### 2.1 定義

$\boldsymbol x^*\in C$ における **接錐（tangent cone）** を

$$
\boxed{
T_C(\boldsymbol x^*)
=
\left\{
\boldsymbol d:
\exists\,\boldsymbol x_k\in C,
\ t_k\downarrow0,
\ \boldsymbol x_k\to\boldsymbol x^*,
\ \frac{\boldsymbol x_k-\boldsymbol x^*}{t_k}
\to\boldsymbol d
\right\}
}
$$

と定義します。

直感的には、

$$
\boldsymbol x_k
=
\boldsymbol x^*+t_k\boldsymbol d+o(t_k)
$$

という実行可能点列が存在する方向 $\boldsymbol d$ の集合です。

### 2.2 半平面の例

$$
C=\{(x,y):y\ge0\}
$$

を考え、境界点 $(0,0)$ を取ります。

この点から右・左・上には動けますが、下方向へは実行可能集合の外へ出ます。したがって

$$
\boxed{
T_C(0,0)
=
\{(d_x,d_y):d_y\ge0\}
}
$$

です。

接錐は「制約面の接線」だけではなく、**実行可能側を含む錐**である点が重要です。

---

## 3. polar cone：実行可能方向すべてに逆らうベクトル

錐 $K$ に対して、本補講では polar cone を

$$
\boxed{
K^\circ
=
\{\boldsymbol v:
\boldsymbol v^{\mathsf T}\boldsymbol d\le0
\quad\forall\boldsymbol d\in K\}
}
$$

と定義します。

文献によって符号規約が逆の場合があるので注意してください。本補講では上の $\le0$ の規約で統一します。

先ほどの

$$
K=\{(d_x,d_y):d_y\ge0\}
$$

について、すべての $\boldsymbol d\in K$ と非正の内積を持つベクトルは下向き法線だけなので

$$
\boxed{
K^\circ
=
\{(0,-a):a\ge0\}
}
$$

です。

つまり polar cone は、実行可能方向に対して「外向き」に位置する法線方向を集めたものと考えられます。

---

## 4. 局所最小性から最初の一次必要条件を導く

ここがKKT導出の出発点です。

$\boldsymbol x^*$ を局所最小解、$\boldsymbol d\in T_C(\boldsymbol x^*)$ を任意の接方向とします。

接錐の定義から

$$
\boldsymbol x_k
=
\boldsymbol x^*+t_k\boldsymbol d+o(t_k),
\qquad
\boldsymbol x_k\in C,
\qquad
t_k\downarrow0
$$

となる列があります。

局所最小性より、十分大きな $k$ について

$$
f(\boldsymbol x_k)-f(\boldsymbol x^*)\ge0.
$$

$f$ が微分可能なら

$$
f(\boldsymbol x_k)
=
f(\boldsymbol x^*)
+
\nabla f(\boldsymbol x^*)^{\mathsf T}
(\boldsymbol x_k-\boldsymbol x^*)
+
o(\|\boldsymbol x_k-\boldsymbol x^*\|).
$$

さらに

$$
\boldsymbol x_k-\boldsymbol x^*
=t_k\boldsymbol d+o(t_k)
$$

なので

$$
f(\boldsymbol x_k)-f(\boldsymbol x^*)
=
t_k\nabla f(\boldsymbol x^*)^{\mathsf T}\boldsymbol d
+o(t_k).
$$

$t_k>0$ で割って極限を取ると

$$
\boxed{
\nabla f(\boldsymbol x^*)^{\mathsf T}\boldsymbol d
\ge0
\qquad
\forall\boldsymbol d\in T_C(\boldsymbol x^*)
}
$$

を得ます。

polar cone の定義に合わせて符号を変えると

$$
(-\nabla f(\boldsymbol x^*))^{\mathsf T}\boldsymbol d
\le0
\qquad
\forall\boldsymbol d\in T_C(\boldsymbol x^*).
$$

したがって

$$
\boxed{
-\nabla f(\boldsymbol x^*)
\in
T_C(\boldsymbol x^*)^\circ
}
$$

です。

これが制約付き最適化の一次必要条件を最も幾何学的に書いた形です。

> 最適点では、目的関数が下がる方向 $-\nabla f$ は、実行可能な接方向の中には存在できず、接錐のpolar側に押し出される。

---

## 5. 接錐は定義としては正しいが計算しにくい

接錐 $T_C(\boldsymbol x^*)$ は実行可能点列で定義されています。

実際にKKT条件を計算するには、制約関数 $g_i,h_j$ の勾配で表したいところです。

そこで active set を

$$
\boxed{
I(\boldsymbol x^*)
=
\{i:g_i(\boldsymbol x^*)=0\}
}
$$

とします。

$g_i(\boldsymbol x^*)<0$ の制約は最適点で余裕があるので、一次近似では局所的な進行方向を制限しません。

---

## 6. 線形化錐を作る

activeな不等式制約と等式制約を一次近似して

$$
\boxed{
L_C(\boldsymbol x^*)
=
\left\{
\boldsymbol d:
\nabla g_i(\boldsymbol x^*)^{\mathsf T}\boldsymbol d\le0
\ (i\in I(\boldsymbol x^*)),
\quad
\nabla h_j(\boldsymbol x^*)^{\mathsf T}\boldsymbol d=0
\right\}
}
$$

と定義します。これを **線形化錐（linearized cone）** と呼びます。

### 6.1 なぜ active 制約では $\le0$ なのか

$i\in I(\boldsymbol x^*)$ なら

$$
g_i(\boldsymbol x^*)=0.
$$

$\boldsymbol x^*+t\boldsymbol d$ でTaylor展開すると

$$
g_i(\boldsymbol x^*+t\boldsymbol d)
=
t\nabla g_i(\boldsymbol x^*)^{\mathsf T}\boldsymbol d
+o(t).
$$

実行可能側 $g_i\le0$ へ進むためには一次項が

$$
\nabla g_i(\boldsymbol x^*)^{\mathsf T}\boldsymbol d\le0
$$

でなければなりません。

等式制約では正負どちら側にもずれてはいけないので

$$
\nabla h_j(\boldsymbol x^*)^{\mathsf T}\boldsymbol d=0
$$

です。

---

## 7. $T_C\subseteq L_C$ を示す

$\boldsymbol d\in T_C(\boldsymbol x^*)$ とします。

接錐の定義から

$$
\boldsymbol x_k
=
\boldsymbol x^*+t_k\boldsymbol d+o(t_k)
$$

となる実行可能点列が存在します。

activeな不等式制約 $i\in I(\boldsymbol x^*)$ について

$$
g_i(\boldsymbol x_k)\le0,
\qquad
g_i(\boldsymbol x^*)=0.
$$

Taylor展開すると

$$
g_i(\boldsymbol x_k)
=
t_k\nabla g_i(\boldsymbol x^*)^{\mathsf T}\boldsymbol d
+o(t_k)
\le0.
$$

$t_k$ で割って極限を取ると

$$
\nabla g_i(\boldsymbol x^*)^{\mathsf T}\boldsymbol d\le0.
$$

同様に等式制約では

$$
h_j(\boldsymbol x_k)=h_j(\boldsymbol x^*)=0
$$

より

$$
\nabla h_j(\boldsymbol x^*)^{\mathsf T}\boldsymbol d=0.
$$

したがって

$$
\boxed{
T_C(\boldsymbol x^*)
\subseteq
L_C(\boldsymbol x^*)
}
$$

です。

### 7.1 逆包含は自動ではない

ここは重要です。

一次近似では進めそうに見えても、高次の曲率などのため実際には実行可能点列を作れない場合があります。

したがって一般には

$$
T_C(\boldsymbol x^*)=L_C(\boldsymbol x^*)
$$

とは限りません。

このギャップを埋めるための条件が **constraint qualification（制約想定）** です。

たとえば Abadie constraint qualification は、まさに

$$
\boxed{
T_C(\boldsymbol x^*)=L_C(\boldsymbol x^*)
}
$$

を要求します。

LICQ や MFCQ など、より確認しやすい十分条件もよく使われます。

本補講では、以下では適切な制約想定により

$$
T_C(\boldsymbol x^*)=L_C(\boldsymbol x^*)
$$

が成立しているとします。

すると局所最適性から

$$
\boxed{
-\nabla f(\boldsymbol x^*)
\in
L_C(\boldsymbol x^*)^\circ
}
$$

です。

あとは、このpolar coneを計算すればKKT条件が出ます。

---

## 8. 線形化錐を行列で書く

activeな不等式制約の勾配を行に並べて

$$
A
=
\begin{pmatrix}
\nabla g_{i_1}(\boldsymbol x^*)^{\mathsf T}\\
\vdots\\
\nabla g_{i_s}(\boldsymbol x^*)^{\mathsf T}
\end{pmatrix},
$$

等式制約の勾配を

$$
B
=
\begin{pmatrix}
\nabla h_1(\boldsymbol x^*)^{\mathsf T}\\
\vdots\\
\nabla h_r(\boldsymbol x^*)^{\mathsf T}
\end{pmatrix}
$$

とします。

すると

$$
\boxed{
L_C(\boldsymbol x^*)
=
\{\boldsymbol d:A\boldsymbol d\le\boldsymbol0,
\ B\boldsymbol d=\boldsymbol0\}
}
$$

です。

このpolar coneが

$$
\boxed{
L_C(\boldsymbol x^*)^\circ
=
\left\{
A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu:
\boldsymbol\lambda\ge\boldsymbol0
\right\}
}
$$

になることを示します。

---

## 9. polar cone の一方向は直接示せる

$$
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\qquad
\boldsymbol\lambda\ge\boldsymbol0
$$

とします。

任意の $\boldsymbol d\in L_C(\boldsymbol x^*)$ について

$$
A\boldsymbol d\le\boldsymbol0,
\qquad
B\boldsymbol d=\boldsymbol0.
$$

したがって

$$
\begin{aligned}
\boldsymbol v^{\mathsf T}\boldsymbol d
&=
\boldsymbol\lambda^{\mathsf T}A\boldsymbol d
+
\boldsymbol\nu^{\mathsf T}B\boldsymbol d\\
&=
\boldsymbol\lambda^{\mathsf T}A\boldsymbol d
\le0.
\end{aligned}
$$

よって

$$
\boldsymbol v\in L_C(\boldsymbol x^*)^\circ.
$$

したがって

$$
\left\{
A^{\mathsf T}\boldsymbol\lambda+B^{\mathsf T}\boldsymbol\nu:
\boldsymbol\lambda\ge\boldsymbol0
\right\}
\subseteq
L_C(\boldsymbol x^*)^\circ.
$$

逆向きが Farkas の補題に対応します。

---

## 10. Farkasの補題：必要な形

本補講で使う形を次のように書きます。

### Farkas型の alternative

与えられた $A,B,\boldsymbol v$ に対し、次の二つのうちちょうど一方が成立します。

**(A)**

$$
\boxed{
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\qquad
\boldsymbol\lambda\ge\boldsymbol0
}
$$

となる $\boldsymbol\lambda,\boldsymbol\nu$ が存在する。

**(B)**

$$
\boxed{
A\boldsymbol d\le\boldsymbol0,
\qquad
B\boldsymbol d=\boldsymbol0,
\qquad
\boldsymbol v^{\mathsf T}\boldsymbol d>0
}
$$

となる $\boldsymbol d$ が存在する。

### 10.1 なぜ両方同時には成立しないか

(A) が成立しているとします。(B) の最初の二条件を満たす $\boldsymbol d$ に対して

$$
\begin{aligned}
\boldsymbol v^{\mathsf T}\boldsymbol d
&=
\boldsymbol\lambda^{\mathsf T}A\boldsymbol d
+
\boldsymbol\nu^{\mathsf T}B\boldsymbol d\\
&\le0.
\end{aligned}
$$

したがって $\boldsymbol v^{\mathsf T}\boldsymbol d>0$ は不可能です。

「どちらか一方は必ず成立する」という部分がFarkasの補題の内容です。

ここで保証を飛ばさず証明したい場合は、[F0-02B 分離超平面定理・Farkasの補題](../F0_02B_分離超平面定理_Farkas_SVM/index.md) の「Farkasの補題を分離超平面定理から導く」を参照してください。そこで

$$
\boxed{
\text{最近点射影}
\to
\text{分離超平面定理}
\to
\text{凸錐の分離}
\to
\text{Farkas}
}
$$

まで証明しています。

幾何学的には、$\boldsymbol v$ が法線から作られる錐に入るか、そうでなければその錐を分離する方向 $\boldsymbol d$ が存在する、という分離定理の有限次元版と見ることができます。

---

## 11. Farkasから線形化錐のpolarを求める

$\boldsymbol v\in L_C(\boldsymbol x^*)^\circ$ とします。

定義より

$$
A\boldsymbol d\le\boldsymbol0,
\qquad
B\boldsymbol d=\boldsymbol0
$$

を満たすすべての $\boldsymbol d$ に対して

$$
\boldsymbol v^{\mathsf T}\boldsymbol d\le0.
$$

したがって、Farkas型 alternative の (B) は成立できません。

よって (A) が成立し、ある $\boldsymbol\lambda\ge\boldsymbol0,\boldsymbol\nu$ が存在して

$$
\boldsymbol v
=A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu
$$

となります。

したがって

$$
\boxed{
L_C(\boldsymbol x^*)^\circ
=
\left\{
A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu:
\boldsymbol\lambda\ge\boldsymbol0
\right\}
}
$$

が得られました。

---

## 12. ここからKKTの停留条件が出る

局所最適性と制約想定から

$$
-\nabla f(\boldsymbol x^*)
\in
L_C(\boldsymbol x^*)^\circ.
$$

いまpolar coneを求めたので

$$
-\nabla f(\boldsymbol x^*)
=
A^{\mathsf T}\boldsymbol\lambda
+B^{\mathsf T}\boldsymbol\nu,
\qquad
\boldsymbol\lambda\ge\boldsymbol0
$$

となる乗数が存在します。

元の勾配の表記へ戻すと

$$
-\nabla f(\boldsymbol x^*)
=
\sum_{i\in I(\boldsymbol x^*)}
\lambda_i\nabla g_i(\boldsymbol x^*)
+
\sum_{j=1}^r
\nu_j\nabla h_j(\boldsymbol x^*).
$$

移項して

$$
\boxed{
\nabla f(\boldsymbol x^*)
+
\sum_{i\in I(\boldsymbol x^*)}
\lambda_i\nabla g_i(\boldsymbol x^*)
+
\sum_{j=1}^r
\nu_j\nabla h_j(\boldsymbol x^*)
=
\boldsymbol0
}
$$

です。

これが **KKTの停留条件** です。

Lagrangian

$$
L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu)
=
f(\boldsymbol x)
+
\sum_i\lambda_i g_i(\boldsymbol x)
+
\sum_j\nu_j h_j(\boldsymbol x)
$$

を使えば

$$
\boxed{
\nabla_{\boldsymbol x}L
(\boldsymbol x^*,\boldsymbol\lambda,\boldsymbol\nu)
=
\boldsymbol0
}
$$

と同じです。

重要なのは、**Lagrangianを置いたから停留条件が生まれたのではない**ことです。

先に

$$
\boxed{
\text{実行可能な下降方向が存在しない}
}
$$

という局所最適性があり、その幾何学的条件をFarkasの補題で制約勾配の線形結合に書き換えた結果がLagrangianの停留条件です。

---

## 13. dual feasibility はどこから出たか

Farkasの表現で

$$
\boxed{\lambda_i\ge0}
$$

が最初から現れています。

これは制約を

$$
g_i(\boldsymbol x)\le0
$$

と書いた符号規約に対応します。

active制約で許される方向は

$$
\nabla g_i(\boldsymbol x^*)^{\mathsf T}\boldsymbol d\le0
$$

です。この半空間に対するpolar側の法線は

$$
\lambda_i\nabla g_i(\boldsymbol x^*),
\qquad
\lambda_i\ge0
$$

となります。

したがって **双対実行可能性**

$$
\boxed{\lambda_i\ge0}
$$

も、接錐とpolar coneの幾何から出てきます。

---

## 14. complementary slackness はどこから出たか

ここまでの停留条件には active set

$$
I(\boldsymbol x^*)
=
\{i:g_i(\boldsymbol x^*)=0\}
$$

に入る制約しか登場していません。

そこで inactive な制約

$$
g_i(\boldsymbol x^*)<0
$$

については

$$
\boxed{\lambda_i=0}
$$

と定義します。

すると全ての $i$ について

- activeなら $g_i(\boldsymbol x^*)=0$
- inactiveなら $\lambda_i=0$

のどちらかなので

$$
\boxed{
\lambda_i g_i(\boldsymbol x^*)=0
}
$$

です。

これが **相補性条件（complementary slackness）** です。

つまり相補性条件も独立した魔法の条件ではありません。

> 一次の最適性に寄与するのはactiveな制約だけである。

という事実を、全制約をまとめた一本の式へ書き換えたものです。

---

## 15. primal feasibility は元の問題そのもの

$\boldsymbol x^*$ はそもそも実行可能解なので

$$
\boxed{
g_i(\boldsymbol x^*)\le0,
\qquad
h_j(\boldsymbol x^*)=0
}
$$

です。

これが **主実行可能性（primal feasibility）** です。

したがってKKTの4条件がすべて揃います。

$$
\boxed{
\begin{aligned}
g_i(\boldsymbol x^*)&\le0,
&h_j(\boldsymbol x^*)&=0,
&&\text{主実行可能性},\\
\lambda_i&\ge0,
&&&\text{双対実行可能性},\\
\nabla f(\boldsymbol x^*)
+\sum_i\lambda_i\nabla g_i(\boldsymbol x^*)
+\sum_j\nu_j\nabla h_j(\boldsymbol x^*)&=\boldsymbol0,
&&&\text{停留条件},\\
\lambda_i g_i(\boldsymbol x^*)&=0,
&&&\text{相補性}.
\end{aligned}
}
$$

---

## 16. KKT条件の導出を一枚で見る

$$
\boxed{
\begin{array}{c}
\boldsymbol x^*\text{ が局所最小}
\\[2mm]
\Downarrow
\\
\nabla f(\boldsymbol x^*)^{\mathsf T}\boldsymbol d\ge0
\quad
(\forall\boldsymbol d\in T_C(\boldsymbol x^*))
\\[2mm]
\Downarrow
\\
-\nabla f(\boldsymbol x^*)
\in T_C(\boldsymbol x^*)^\circ
\\[2mm]
\Downarrow\quad\text{constraint qualification}
\\
-\nabla f(\boldsymbol x^*)
\in L_C(\boldsymbol x^*)^\circ
\\[2mm]
\Downarrow\quad\text{Farkas}
\\
-\nabla f
=
\sum_{i\in I}\lambda_i\nabla g_i
+
\sum_j\nu_j\nabla h_j,
\quad\lambda_i\ge0
\\[2mm]
\Downarrow
\\
\text{stationarity + dual feasibility}
\\[2mm]
\Downarrow\quad
\lambda_i=0\text{ for inactive constraints}
\\
\lambda_i g_i(\boldsymbol x^*)=0
\end{array}
}
$$

この流れを見ると

$$
\boxed{
\text{KKT}
=
\text{局所最適性}
+
\text{接錐}
+
\text{polar cone}
+
\text{Farkasの補題}
}
$$

という位置付けになります。

さらにFarkasの一段手前まで戻せば

$$
\boxed{
\text{KKT}
\leftarrow
\text{Farkas}
\leftarrow
\text{凸錐の分離}
\leftarrow
\text{分離超平面定理}
\leftarrow
\text{閉凸集合への射影}
}
$$

です。この部分の証明は [F0-02B](../F0_02B_分離超平面定理_Farkas_SVM/index.md) に分離しています。

---

## 17. SVMではどう見えるか

ハードマージンSVMの制約は

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
$$

です。

標準形では

$$
g_i(\boldsymbol w,b)
=
1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\le0.
$$

したがって

$$
\nabla g_i
=
\begin{pmatrix}
-y_i\boldsymbol x_i\\
-y_i
\end{pmatrix}.
$$

最適点では

$$
-\nabla f
$$

がactiveなマージン制約の法線の非負結合で表されます。

この係数がSVMの $\alpha_i$ です。

したがって

$$
\alpha_i>0
$$

となる点だけがactiveな制約として境界の法線を支え、KKT相補性から

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
$$

となります。

つまりサポートベクトルは、幾何学的には

> 最適な分類境界をこれ以上動かせないようにしているactive制約

と見ることができます。

さらに [F0-02B](../F0_02B_分離超平面定理_Farkas_SVM/index.md) では、SVMを別の幾何からも見ます。正例・負例の凸包を $C_+,C_-$ とすると

$$
\boxed{
\text{線形分離可能}
\Longleftrightarrow
C_+\cap C_-=\varnothing
}
$$

であり、ハードマージンSVMの支持超平面間の距離は二つの凸包の最短距離に一致します。また双対変数 $\alpha_i$ は、正負それぞれの凸包上の点を作る凸結合の重みとして解釈できます。

---

## 18. 制約想定はなぜ必要か

KKT導出で最も飛ばされやすい点です。

局所最適性から直接分かるのは

$$
-\nabla f(\boldsymbol x^*)
\in T_C(\boldsymbol x^*)^\circ
$$

までです。

KKT条件は制約勾配 $\nabla g_i,\nabla h_j$ で書きたいので、接錐を線形化錐で置き換える必要があります。

しかし一般には

$$
T_C(\boldsymbol x^*)\subseteq L_C(\boldsymbol x^*)
$$

しか保証されません。

したがって、線形化した制約が局所的な実行可能方向を正しく表すための正則性が必要です。

代表例は次の通りです。

- **LICQ**: activeな不等式制約と等式制約の勾配が一次独立。
- **MFCQ**: 等式制約に接しつつ、すべてのactive不等式を厳密に内側へ進める方向が存在する。
- **Abadie CQ**: $T_C=L_C$ を直接要求する。
- **Slater条件**: 凸問題で厳密実行可能点が存在する。強双対性やKKTの十分性と結び付きやすい。

統計検定1級のSVMでこれらを証明する必要は通常ありませんが、

> 「局所最小なら必ずKKT」と無条件に言ってはいけない

という点は理解しておくと安全です。

---

## 19. どこまで覚えるか

本番レベルでは、まず

$$
\boxed{
\text{主実行可能性}
+
\text{双対実行可能性}
+
\text{停留条件}
+
\text{相補性}
}
$$

を使えることが優先です。

その背景としては

$$
\boxed{
\text{局所最小}
\Rightarrow
\text{実行可能な下降方向なし}
\Rightarrow
-\nabla f\in T_C^\circ
\Rightarrow
\text{Farkas}
\Rightarrow
\text{KKT}
}
$$

まで追えれば十分です。

接錐・polar cone・Farkasの補題そのものを独立に暗記するより、**KKTがどこから来るかを再構成する道具**として理解することを勧めます。

Farkasの補題の証明、分離超平面定理、SVMの凸包・最近点対・最大マージンまでさらに遡る場合は [F0-02B 分離超平面定理・Farkasの補題](../F0_02B_分離超平面定理_Farkas_SVM/index.md) へ進んでください。

---

## 演習

### F0-02A-A01 接錐とpolar cone

- Level: A
- 目安時間: 12分

$$
C=\{(x,y)\in\mathbb R^2:y\ge0\}
$$

の原点における接錐 $T_C(0)$ とpolar cone $T_C(0)^\circ$ を求めよ。

<!-- solution-start -->
#### 詳細解答
原点から一次的に進める方向は $d_y\ge0$ なので $T_C(0)=\{(d_x,d_y):d_y\ge0\}$。これら全てと非正の内積を持つベクトルは水平成分0、鉛直成分非正なので $T_C(0)^\circ=\{(0,-a):a\ge0\}$。
#### 本番答案
$T_C(0)=\{(d_x,d_y):d_y\ge0\}$、$T_C(0)^\circ=\{(0,-a):a\ge0\}$。
#### 採点基準（20点）
- 接方向の判定: 8点
- polarの定義適用: 8点
- 結論: 4点
<!-- solution-end -->

### F0-02A-B01 局所最適性からpolar条件

- Level: B
- 目安時間: 15分

微分可能な $f$ と実行可能集合 $C$ に対し、局所最小点 $x^*$ で

$$
-\nabla f(x^*)\in T_C(x^*)^\circ
$$

となる理由を、接錐を定義する実行可能点列から示せ。

<!-- solution-start -->
#### 詳細解答
$d\in T_C(x^*)$ に対し $x_k=x^*+t_kd+o(t_k)\in C$, $t_k\downarrow0$ を取る。局所最小性から $f(x_k)-f(x^*)\ge0$。Taylor展開して $t_k\nabla f(x^*)^Td+o(t_k)\ge0$。$t_k$ で割り極限を取れば $\nabla f(x^*)^Td\ge0$、すなわち $(-\nabla f(x^*))^Td\le0$。$d$ は任意なのでpolar coneの定義から従う。
#### 本番答案
接錐の点列 $x_k=x^*+t_kd+o(t_k)$ と局所最小性をTaylor展開へ入れ、$\nabla f(x^*)^Td\ge0$ を得る。従って $-\nabla f(x^*)\in T_C(x^*)^\circ$。
#### 採点基準（20点）
- 接錐の点列: 5点
- Taylor展開: 7点
- 極限: 4点
- polarへの結論: 4点
<!-- solution-end -->
