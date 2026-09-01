# F0-02C6 関数解析VI：Hahn--Banach・分離定理

F0-02Bでは、有限次元の閉凸集合と点を **最近点への射影** から分離しました。

しかし一般のBanach空間では、閉凸集合に最近点が存在するとは限りません。また、内積もありません。

それでも凸集合を分離する連続線形汎関数は存在します。

その背景にあるのが **Hahn--Banachの定理** です。

この定理の中心思想は

$$
\boxed{
\text{小さな部分空間で作った線形汎関数を、
制御を失わず空間全体へ拡張する}
}
$$

ことです。

完全な証明では [F0-00A2 選択公理・Zornの補題・極大原理](../F0_00A2_選択公理_Zorn_極大原理/index.md) を使います。

---

## 1. なぜ「線形汎関数の拡張」が分離につながるのか

あるベクトル $x_0\ne0$ だけを考えるなら、その張る一次元部分空間

$$
M=\operatorname{span}\{x_0\}
$$

上で

$$
f_0(tx_0)=t\|x_0\|
$$

という線形汎関数を簡単に作れます。

この汎関数は

$$
f_0(x_0)=\|x_0\|
$$

なので $x_0$ を確実に検出します。

問題は、これを $M$ の外側へどう延長するかです。

Hahn--Banachは、その延長を可能にします。

---

## 2. sublinear functional

実ベクトル空間 $X$ 上の関数

$$
p:X\to\mathbb R
$$

が

$$
p(x+y)\le p(x)+p(y)
$$

かつ $a\ge0$ に対して

$$
p(ax)=ap(x)
$$

を満たすとき、$p$ を **sublinear functional** といいます。

ノルム

$$
p(x)=\|x\|
$$

は代表例です。

三角不等式が劣加法性、正の斉次性がそのまま二つ目の条件です。

---

## 3. Hahn--Banachの定理：実線形版

$X$ を実ベクトル空間、$M\subset X$ を線形部分空間、$p:X\to\mathbb R$ をsublinear functionalとします。

$M$ 上の線形汎関数

$$
f_0:M\to\mathbb R
$$

が

$$
f_0(x)\le p(x)
\qquad(\forall x\in M)
$$

を満たすとします。

このとき、$X$ 全体の線形汎関数

$$
f:X\to\mathbb R
$$

で

$$
f|_M=f_0
$$

かつ

$$
\boxed{
f(x)\le p(x)
\qquad(\forall x\in X)
}
$$

を満たすものが存在します。

つまり **支配条件を壊さず延長できる** という定理です。

---

## 4. 証明の核心：一次元だけ延長する

まず「部分空間を一次元だけ広げられる」ことを示します。

$z\notin M$ とし

$$
M_1=M+\operatorname{span}\{z\}
$$

へ延長したいとします。

$z\notin M$ なので、$M_1$ の各元は一意に

$$
x+tz
\qquad(x\in M,\ t\in\mathbb R)
$$

と書けます。

延長 $f_1$ は線形性から

$$
f_1(x+tz)=f_0(x)+tc
$$

という形でなければなりません。

未知なのは

$$
c=f_1(z)
$$

だけです。

支配条件

$$
f_1(x+tz)\le p(x+tz)
$$

が全ての $x,t$ で成り立つように、$c$ を選ぶ必要があります。

---

## 5. $c$ に必要な上下限

$t>0$ の場合、$t$ で割って変数を取り直すと

$$
c
\le
p(y+z)-f_0(y)
\qquad(\forall y\in M)
$$

が必要です。

従って

$$
c
\le
\inf_{y\in M}\{p(y+z)-f_0(y)\}.
$$

一方 $t<0$ の場合には

$$
f_0(x)-p(x-z)
\le c
\qquad(\forall x\in M)
$$

が必要なので

$$
\sup_{x\in M}\{f_0(x)-p(x-z)\}
\le c.
$$

したがって必要なのは

$$
\boxed{
\sup_{x\in M}\{f_0(x)-p(x-z)\}
\le c
\le
\inf_{y\in M}\{p(y+z)-f_0(y)\}
}
$$

です。

では、この区間が空でないことを示します。

任意の $x,y\in M$ に対して、$f_0$ の線形性と $f_0\le p$ から

$$
f_0(x)-f_0(y)
=f_0(x-y)
\le p(x-y).
$$

sublinear性より

$$
p(x-y)
=p\{(x-z)+(z+y)\}
\le p(x-z)+p(y+z).
$$

よって

$$
f_0(x)-p(x-z)
\le
p(y+z)-f_0(y).
$$

これは全ての $x,y\in M$ で成り立つので

$$
\sup_x\{f_0(x)-p(x-z)\}
\le
\inf_y\{p(y+z)-f_0(y)\}.
$$

従ってその間から実数 $c$ を一つ取れます。

この $c$ を使えば、$f_1$ は $M_1$ 上で $f_0$ を延長し、かつ

$$
f_1\le p
$$

を保ちます。

これで **一次元延長** が完成しました。

---

# Part II：一次元延長を全空間へ持ち上げる

ここが、以前なら「極大まで繰り返す」で終わっていた箇所です。

実際にはZornの補題を使います。

---

## 6. 延長候補全体を集める

$\mathscr E$ を、対 $(N,g)$ で

1. $M\subseteq N\subseteq X$
2. $N$ は線形部分空間
3. $g:N\to\mathbb R$ は線形
4. $g|_M=f_0$
5. $g(x)\le p(x)$ for all $x\in N$

を満たすもの全体とします。

元の $(M,f_0)$ が入るので

$$
\mathscr E\ne\varnothing.
$$

---

## 7. 延長関係で半順序を入れる

$\mathscr E$ 上で

$$
(N_1,g_1)\preceq(N_2,g_2)
$$

を

$$
N_1\subseteq N_2,
\qquad
g_2|_{N_1}=g_1
$$

で定めます。

これは反射律・反対称律・推移律を満たすので半順序です。

意味は単純で、

> $(N_2,g_2)$ の方が $(N_1,g_1)$ より広いところまで延長されている

という順序です。

---

## 8. chainの上界を作る

$\mathscr C\subset\mathscr E$ をchainとします。

$$
N_{\mathscr C}
=
\bigcup_{(N,g)\in\mathscr C}N
$$

と置きます。

chainなので、任意の二つの部分空間は包含関係で比較可能です。

従って $x,y\in N_{\mathscr C}$ を取れば、両方を含むchain内の大きい方の部分空間が存在するため

$$
x+y\in N_{\mathscr C},
\qquad
ax\in N_{\mathscr C}.
$$

よって $N_{\mathscr C}$ は線形部分空間です。

次に $x\in N_{\mathscr C}$ に対して、$x\in N$ となる $(N,g)\in\mathscr C$ を一つ取り

$$
g_{\mathscr C}(x)=g(x)
$$

と定めます。

これはwell-definedです。

実際、$x\in N_1\cap N_2$ ならchain性から例えば

$$
(N_1,g_1)\preceq(N_2,g_2)
$$

であり

$$
g_2|_{N_1}=g_1
$$

なので

$$
g_1(x)=g_2(x).
$$

従って値の選び方に依存しません。

さらに $g_{\mathscr C}$ は線形で、$f_0$ を延長し、

$$
g_{\mathscr C}(x)\le p(x)
$$

も保ちます。

従って

$$
(N_{\mathscr C},g_{\mathscr C})\in\mathscr E
$$

であり、これはchain $\mathscr C$ の上界です。

---

## 9. Zornの補題で極大延長を取る

これで

> $\mathscr E$ の任意のchainは上界を持つ

ことが示せました。

F0-00A2のZornの補題により、$\mathscr E$ には極大元

$$
(N_*,g_*)
$$

が存在します。

---

## 10. 極大延長の定義域は全空間でなければならない

もし

$$
N_*\ne X
$$

なら

$$
z\in X\setminus N_*
$$

を一つ取れます。

Part Iの一次元延長を $(N_*,g_*)$ に適用すると

$$
N_*+\operatorname{span}\{z\}
$$

上まで支配条件を保ったまま延長できます。

これは $(N_*,g_*)$ より真に大きい $\mathscr E$ の元を作るので、極大性に反します。

従って

$$
\boxed{
N_*=X
}.
$$

よって

$$
f=g_*:X\to\mathbb R
$$

が求める全空間への延長です。

これでHahn--Banachの実線形版が証明されました。

---

## 11. 選択公理はどこに入ったのか

一次元延長そのものでは、上下限の間から一つの実数 $c$ を取っただけです。

一般の無限次元空間で問題になるのは、その延長を全空間へ完成させる段階です。

標準証明では

$$
\boxed{
\text{選択公理}
\Longleftrightarrow
\text{Zornの補題}
\Longrightarrow
\text{極大延長の存在}
}
$$

という形で選択原理が入ります。

つまり「延長できる」という局所的事実と「全空間まで延長できる」という大域的存在の間をZornがつないでいます。

---

## 12. ノルム空間での重要な系：ノルム保存拡張

$X$ をノルム空間、$M\subset X$ を線形部分空間、$f_0\in M^*$ とします。

すると、ある $f\in X^*$ が存在して

$$
f|_M=f_0
$$

かつ

$$
\boxed{
\|f\|_{X^*}
=\|f_0\|_{M^*}
}
$$

となります。

### 12.1 Hahn--Banachへ落とす

$$
p(x)=\|f_0\|\,\|x\|
$$

と置きます。

$M$ 上では

$$
f_0(x)
\le|f_0(x)|
\le\|f_0\|\|x\|
=p(x).
$$

Hahn--Banachで $f$ を延長すると

$$
f(x)\le\|f_0\|\|x\|.
$$

$-x$ にも適用すれば

$$
|f(x)|\le\|f_0\|\|x\|.
$$

よって

$$
\|f\|\le\|f_0\|.
$$

一方、$f$ は $f_0$ の延長なので

$$
\|f\|\ge\|f_0\|.
$$

したがって等号です。

---

## 13. 双対空間は点を分離できる

$x_0\in X$、$x_0\ne0$ とします。

一次元部分空間

$$
M=\operatorname{span}\{x_0\}
$$

上で

$$
f_0(tx_0)=t\|x_0\|
$$

と定めます。

すると

$$
|f_0(tx_0)|
=|t|\|x_0\|
=\|tx_0\|
$$

なので

$$
\|f_0\|=1.
$$

ノルム保存拡張により、$f\in X^*$ で

$$
\boxed{
\|f\|=1,
\qquad
f(x_0)=\|x_0\|
}
$$

となるものが存在します。

したがって非零点は必ず何らかの連続線形汎関数で検出できます。

特に $x\ne y$ なら $x-y\ne0$ なので、ある $f\in X^*$ が

$$
f(x)\ne f(y)
$$

を満たします。

$$
\boxed{
X^*\text{ は }X\text{ の異なる点を分離する}
}
$$

という重要な性質です。

---

## 14. 超平面を汎関数で定義する

有限次元では

$$
a^{\mathsf T}x=b
$$

を超平面と呼びました。

一般のノルム空間では、非零の連続線形汎関数

$$
f\in X^*
$$

と実数 $b$ を使って

$$
\boxed{
H=\{x\in X:f(x)=b\}
}
$$

と書きます。

有限次元で $f(x)=a^{\mathsf T}x$ とすれば元の式に戻ります。

---

## 15. 点と閉凸集合の強分離

$X$ をノルム空間、$C\subset X$ を空でない閉凸集合、$z\notin C$ とします。

このとき、ある非零の $f\in X^*$ と実数 $\alpha$ が存在して

$$
\boxed{
\sup_{x\in C}f(x)
<\alpha
<f(z)
}
$$

となるようにできます。

同値な形として、適切に平行移動・スケールすれば

$$
\boxed{
f(x)\le c<f(z)
\qquad(\forall x\in C)
}
$$

と書けます。

これが点と閉凸集合の **強分離** です。

---

## 16. なぜ閉性が重要か

$z\notin C$ で $C$ が閉なら、補集合は開なので、ある $r>0$ が存在して

$$
B(z,r)\cap C=\varnothing.
$$

したがって点 $z$ と $C$ には正の距離の余裕があります。

この余裕を使って、$C-z$ の周囲に0を含まない凸集合を作り、そのMinkowski functionalをsublinearな支配関数としてHahn--Banachを適用するのが標準的な証明の流れです。

---

## 17. Minkowski functionalという橋

原点を内部に含む吸収的な凸集合 $U$ に対し

$$
p_U(x)
=\inf\{t>0:x\in tU\}
$$

を **Minkowski functional** または gauge といいます。

適切な条件の下で $p_U$ はsublinearです。

幾何学的な凸集合をsublinearな関数へ変換できるため、Hahn--Banachの「汎関数拡張」と「凸集合分離」が接続します。

完全な分離定理の証明では、このgaugeを使って一次元の線形汎関数を構成し、Hahn--Banachで全空間へ延長します。

---

## 18. Hilbert空間ではもっと具体的に分離できる

$H$ をHilbert空間、$C\subset H$ を空でない閉凸集合、$z\notin C$ とします。

F0-02C1の射影定理から最近点

$$
p=P_C(z)
$$

が一意に存在します。

射影の特徴付けから

$$
\langle z-p,x-p\rangle\le0
\qquad(\forall x\in C).
$$

そこで

$$
g=z-p\ne0
$$

と置けば

$$
\langle g,x\rangle
\le\langle g,p\rangle
$$

です。

一方

$$
\langle g,z\rangle
=\langle g,p\rangle+\|g\|^2
>\langle g,p\rangle.
$$

したがって

$$
\boxed{
\langle g,x\rangle
\le\langle g,p\rangle
<\langle g,z\rangle
}
$$

で分離できます。

これはF0-02Bの有限次元証明と全く同じ構造です。

---

## 19. Banach空間とHilbert空間の違い

Hilbert空間では分離汎関数を

$$
f(x)=\langle g,x\rangle
$$

とベクトル $g$ で表せます。

一般のBanach空間では、分離するものはまず

$$
f\in X^*
$$

という汎関数です。

したがって

$$
\boxed{
\begin{array}{c}
\text{Hilbert空間}
:\text{ 法線ベクトルで分離}
\\[1mm]
\text{Banach空間}
:\text{ 連続線形汎関数で分離}
\end{array}
}
$$

という違いがあります。

Riesz表現定理は、この二つをHilbert空間で結び付けます。

---

## 20. 二つの凸集合の分離では条件を確認する

「互いに交わらない凸集合なら必ず正の隙間で分離できる」と無条件に言うことはできません。

例えば二つの集合の距離が0へ近づく場合、厳密な正のgapを持つ強分離が得られないことがあります。

標準的には

- 一方が開である場合の分離
- 点と閉凸集合の強分離
- 一方がコンパクト、他方が閉で互いに素な場合の強分離

など、仮定に応じて分離の強さを使い分けます。

F0-02BのSVMでは、有限個の訓練点の凸包がコンパクトなので、交わらなければ正の距離を持ちます。

---

## 21. Farkasの補題へ戻る

有限次元で

$$
K=\{Ax:x\ge0\}
$$

という有限生成凸錐を考えました。

$K$ は閉凸錐です。

$b\notin K$ なら分離定理により、ある $y$ が存在して

$$
y^{\mathsf T}k\le0
\qquad(\forall k\in K),
$$

$$
y^{\mathsf T}b>0.
$$

各列ベクトル $a_j\in K$ なので

$$
A^{\mathsf T}y\le0.
$$

したがって

$$
\boxed{
Ax=b,\ x\ge0
\quad\text{が不可能}
\Longrightarrow
\exists y:
A^{\mathsf T}y\le0,
\ b^{\mathsf T}y>0
}
$$

が得られます。

つまりFarkasの補題は

$$
\boxed{
\text{有限次元の凸錐分離}
\text{を代数の形へ書き直したもの}
}
$$

です。

---

## 22. KKTとの関係

F0-02C5では、KKT乗数を

$$
\lambda\in K^*
$$

として導入しました。

なぜ双対空間の汎関数が最適性条件に現れるのでしょうか。

それは、凸集合の局所幾何を支える・分離する対象が

$$
\boxed{X^*\text{ の連続線形汎関数}}
$$

だからです。

有限次元ではそれを内積によってベクトルと同一視し、さらに制約勾配の線形結合へFarkas型定理で展開した結果が通常のKKTです。

---

## 23. 次の講義

最後の [F0-02C7 RKHS・再生核・representer theorem・kernel SVM](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md) では、ここまで準備した

$$
\text{Hilbert空間}
+\text{連続線形汎関数}
+\text{Riesz表現}
$$

を関数空間へ適用します。

点評価

$$
f\mapsto f(x)
$$

が連続であると、Riesz表現からkernelが自然に出現します。

---

## 章末チェック

- Hahn--Banachの支配付き拡張の主張を説明できる。
- 一次元延長で許される $c$ の上下限を導ける。
- 延長候補を半順序集合にしてchainの上界を構成できる。
- Zornの補題から極大延長を取り、その定義域が全空間であることを示せる。
- 選択公理がHahn--Banachの標準証明のどこに入るか説明できる。
- ノルム保存拡張を導ける。
- 任意の非零ベクトルを検出するノルム1の汎関数の存在を説明できる。
- 一般ノルム空間の超平面を連続線形汎関数で定義できる。
- 点と閉凸集合の強分離定理を説明できる。
- Hilbert空間では射影からseparatorを具体的に構成できる。
- Farkasの補題と分離定理の関係を説明できる。
