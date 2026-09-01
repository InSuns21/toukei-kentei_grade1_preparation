# F0-02C 関数解析から見る制約想定・KKT・kernel SVM

この補講では、[F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) と [F0-02B](../F0_02B_分離超平面定理_Farkas_SVM/index.md) で見た有限次元の議論を、**関数を点とみなす無限次元空間**まで拡張して眺めます。

目的は関数解析を一から網羅することではありません。KKTで現れた

$$
\nabla f+J^{\mathsf T}\lambda=0
$$

という式の裏に、

$$
\boxed{
\text{Fr\'echet微分}
+\text{双対空間}
+\text{随伴作用素}
+\text{normal cone}
}
$$

が隠れていること、そしてkernel SVMがHilbert空間上の凸最適化として自然に現れることを理解するのが目標です。

このページでは新しい数学用語を断りなく使わないため、**使う前に定義する**方針を取ります。既知として仮定するのは、ベクトル空間・行列・内積・ノルム・極限・微分といった大学初年級の線形代数・微積分だけです。SVMそのものの主問題・双対問題・kernel trickは [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) を参照してください。

---

## 1. なぜ関数解析が必要になるのか

有限次元では未知量を

$$
\boldsymbol x\in\mathbb R^p
$$

と置きます。

しかし、例えば未知量そのものが関数

$$
u:[0,1]\to\mathbb R
$$

である最適化問題では、未知量は有限個の座標では表せません。

そこで「関数全体の集合」をベクトル空間として扱います。

例えば

$$
C([0,1])
=
\{u:[0,1]\to\mathbb R\mid u\text{ は連続}\}
$$

は、関数の和と実数倍について閉じているのでベクトル空間です。

関数解析とは大まかにいえば、

> ベクトル・行列で行っていた線形代数を、関数を含む無限次元空間へ拡張する理論

です。

---

## 2. ノルム空間・Banach空間・Hilbert空間

### 2.1 ノルム空間

ベクトル空間 $X$ に長さ

$$
\|x\|
$$

が定義され、

1. $\|x\|\ge0$ で、$\|x\|=0\iff x=0$
2. $\|ax\|=|a|\|x\|$
3. $\|x+y\|\le\|x\|+\|y\|$

を満たすとき、$X$ を **ノルム空間** といいます。

例えば $C([0,1])$ には

$$
\|u\|_\infty
=
\max_{0\le t\le1}|u(t)|
$$

というノルムを入れられます。

### 2.2 Cauchy列と完備性

点列 $x_n$ が **Cauchy列** であるとは、任意の $\varepsilon>0$ に対して十分大きな $m,n$ で

$$
\|x_m-x_n\|<\varepsilon
$$

となることです。

「互いにどんどん近付いていく列」と考えればよいです。

ノルム空間 $X$ のすべてのCauchy列が $X$ 内の点へ収束するとき、$X$ を **Banach空間** といいます。

完備性は、極限操作をしても空間の外へ落ちないための条件です。

### 2.3 Hilbert空間

内積

$$
\langle x,y\rangle
$$

から

$$
\|x\|=\sqrt{\langle x,x\rangle}
$$

というノルムを作り、そのノルムについて完備な空間を **Hilbert空間** といいます。

有限次元の $\mathbb R^p$ はHilbert空間です。

代表的な無限次元例は

$$
L^2([0,1])
$$

で、内積は

$$
\langle u,v\rangle
=
\int_0^1u(t)v(t)\,dt
$$

です。

したがって

$$
\boxed{
\mathbb R^p
\subset
\text{Hilbert空間の世界}
\subset
\text{Banach空間の世界}
}
$$

と見ることができます。

---

## 3. 線形汎関数と双対空間

### 3.1 線形汎関数

ベクトルを実数へ写す線形写像

$$
\ell:X\to\mathbb R
$$

を **線形汎関数** といいます。

線形とは

$$
\ell(ax+by)
=a\ell(x)+b\ell(y)
$$

という意味です。

有限次元では、任意の線形汎関数はある $a\in\mathbb R^p$ を使って

$$
\ell(x)=a^{\mathsf T}x
$$

と書けます。

したがって、F0-02Bの分離超平面

$$
a^{\mathsf T}x=b
$$

も「線形汎関数の等位集合」と見られます。

### 3.2 連続線形汎関数

無限次元では、すべての線形写像が自動的に連続とは限りません。

そこで、ある $M<\infty$ が存在して

$$
|\ell(x)|\le M\|x\|
$$

を満たす線形汎関数を考えます。この条件は線形汎関数の連続性と同値です。

### 3.3 双対空間

$X$ 上の連続線形汎関数全体を

$$
\boxed{X^*}
$$

と書き、**双対空間** といいます。

有限次元では内積によって $X$ と $X^*$ をほぼ同一視できますが、一般のBanach空間では

$$
X\neq X^*
$$

として区別する必要があります。

この区別がKKTを無限次元へ拡張するとき重要になります。

---

## 4. Fréchet微分：勾配を無限次元へ拡張する

$X$ をノルム空間、$f:X\to\mathbb R$ とします。

$f$ が $x$ で **Fréchet微分可能** であるとは、ある連続線形汎関数

$$
Df(x)\in X^*
$$

が存在して

$$
\boxed{
f(x+h)
=
f(x)+Df(x)[h]+o(\|h\|)
}
$$

となることです。

$Df(x)[h]$ は「方向 $h$ へ少し動いたときの一次変化」です。

有限次元 $X=\mathbb R^p$ なら

$$
Df(x)[h]
=
\nabla f(x)^{\mathsf T}h.
$$

つまり

$$
\boxed{
\nabla f
\text{ は }Df\text{ を内積でベクトル表示したもの}
}
$$

です。

無限次元Banach空間では、まず $Df(x)$ はベクトルではなく $X^*$ の元だと考えるのが基本です。

---

## 5. Riesz表現定理：Hilbert空間では再び「勾配」が使える

Hilbert空間 $H$ では、任意の連続線形汎関数 $\ell\in H^*$ に対し、一意な $g\in H$ が存在して

$$
\boxed{
\ell(h)=\langle g,h\rangle_H
}
$$

と表せます。

これが **Riesz表現定理** です。

したがって $Df(x)\in H^*$ も

$$
Df(x)[h]
=
\langle \nabla_H f(x),h\rangle_H
$$

と書けます。

ここで $\nabla_Hf$ をHilbert空間での勾配とみなせます。

有限次元で「微分」と「勾配」をほとんど区別しなくてよかったのは、実はこの構造が背景にあります。

---

## 6. 線形作用素と随伴：なぜKKTに転置が出るのか

### 6.1 線形作用素

$X,Y$ をノルム空間とし、線形写像

$$
T:X\to Y
$$

を考えます。

ある $M$ が存在して

$$
\|Tx\|_Y\le M\|x\|_X
$$

なら $T$ を **有界線形作用素** といいます。有界性は連続性と同値です。

### 6.2 Banach空間での随伴

$y^*\in Y^*$ に対して

$$
(T^*y^*)[x]
=
y^*[Tx]
$$

と定めます。

すると

$$
\boxed{T^*:Y^*\to X^*}
$$

は線形作用素になります。これを **随伴作用素** といいます。

有限次元で

$$
T(x)=Ax
$$

なら

$$
T^*\lambda
=A^{\mathsf T}\lambda.
$$

したがってKKTに現れる

$$
J^{\mathsf T}\lambda
$$

は、本質的には

$$
\boxed{DG(x)^*\lambda}
$$

という随伴作用素です。

---

## 7. 凸集合・凸関数・normal cone

### 7.1 凸集合

集合 $C\subset X$ が **凸集合** であるとは、任意の $x,y\in C$ と $0\le t\le1$ に対して

$$
(1-t)x+ty\in C
$$

となることです。

### 7.2 凸関数

凸集合 $C$ 上の関数 $f:C\to\mathbb R$ が **凸関数** であるとは

$$
\boxed{
f((1-t)x+ty)
\le
(1-t)f(x)+tf(y)
}
$$

が任意の $x,y\in C$ と $0\le t\le1$ で成り立つことです。

グラフが2点を結ぶ弦より下側にある関数と考えられます。

### 7.3 normal cone

凸集合 $C$ と $x\in C$ に対し、凸解析でよく使う **normal cone** を

$$
\boxed{
N_C(x)
=
\{x^*\in X^*:x^*(y-x)\le0\ \forall y\in C\}
}
$$

と定義します。

ここで左辺の $x^*$ は点 $x$ の上付き星ではなく、双対空間 $X^*$ の元です。

$f$ が凸かつFréchet微分可能なら、$x$ が $C$ 上で $f$ を最小にする条件は

$$
\boxed{
-Df(x)\in N_C(x)
}
$$

と書けます。

有限次元で見た

$$
-\nabla f(x)\in T_C(x)^\circ
$$

と同じ幾何を、双対空間の言葉で書いたものです。

---

## 8. 錐と双対錐：$\lambda_i\ge0$ の一般形

集合 $K\subset Y$ が **錐** であるとは

$$
y\in K,\ a\ge0
\Longrightarrow
ay\in K
$$

となることです。

さらに凸集合でもあれば **凸錐** といいます。

凸錐 $K$ に対して **双対錐** を

$$
\boxed{
K^*
=
\{\lambda\in Y^*:\lambda(k)\ge0\ \forall k\in K\}
}
$$

と定義します。

例えば

$$
Y=\mathbb R^m,
\qquad
K=\mathbb R_+^m
$$

なら

$$
K^*=\mathbb R_+^m.
$$

したがって有限次元KKTの

$$
\lambda_i\ge0
$$

は

$$
\boxed{\lambda\in K^*}
$$

の特殊例です。

---

## 9. 制約を「関数の列」ではなく「写像」で書く

有限次元では

$$
g_i(x)\le0,
\qquad
h_j(x)=0
$$

と成分ごとに書きました。

関数解析では、これをまとめて

$$
G:X\to Y
$$

という制約写像で表すと見通しがよくなります。

### 9.1 等式制約

$$
G(x)=0
$$

を考えます。

微分は

$$
DG(x):X\to Y
$$

という線形作用素です。

有限次元ならこれはJacobian行列に対応します。

### 9.2 錐制約

不等式制約は

$$
\boxed{G(x)\in-K}
$$

と書けます。

例えば $K=\mathbb R_+^m$ なら

$$
G(x)\in-\mathbb R_+^m
$$

は成分ごとに

$$
G_i(x)\le0
$$

という意味です。

---

## 10. 一般化KKT条件

問題

$$
\min_{x\in X}f(x)
$$

subject to

$$
G(x)\in-K
$$

を考えます。

適切な制約想定の下で、最適解 $x^*$ にはある

$$
\lambda\in K^*
$$

が存在して

$$
\boxed{
Df(x^*)+DG(x^*)^*\lambda=0
}
$$

となります。

さらに

$$
\boxed{
\lambda(G(x^*))=0
}
$$

が相補性です。

有限次元で $Y=\mathbb R^m$、$K=\mathbb R_+^m$ とすれば

$$
Df+DG^*\lambda=0
$$

は

$$
\nabla f
+
J_G^{\mathsf T}\lambda
=0
$$

となり、

$$
\lambda\in K^*
$$

は

$$
\lambda_i\ge0
$$

になります。

したがって

$$
\boxed{
\text{有限次元KKTは、双対空間と随伴を使う一般化KKTの特殊例}
}
$$

です。

---

## 11. 制約想定は何を保証しているのか

KKTで最も重要な注意点は、局所最適だからといって自動的に乗数が存在するわけではないことです。

本質的な問題は

> 真の実行可能集合の局所幾何を、制約写像の一次微分 $DG(x^*)$ が正しく表しているか

です。

### 11.1 等式制約での基本例：全射性

$$
G:X\to Y,
\qquad
G(x)=0
$$

を考えます。

線形化すると

$$
DG(x^*)h=0.
$$

このとき

$$
\boxed{DG(x^*):X\to Y\text{ が全射}}
$$

という条件が重要です。

全射とは、任意の $y\in Y$ に対して

$$
DG(x^*)h=y
$$

となる $h\in X$ が存在することです。

有限次元では「Jacobianが行フルランク」に対応します。

### 11.2 なぜ全射性が意味を持つのか

$DG(x^*)$ が全射なら、制約値を一次近似の範囲で任意の方向へ修正できます。

逆に像が小さすぎると、一次近似では見えない制約方向が残り、

$$
\text{真の接方向}
\quad\text{と}\quad
\text{線形化された方向}
$$

が食い違う可能性があります。

これがF0-02Aで見た

$$
T_C(x^*)\subseteq L_C(x^*)
$$

しか一般には保証されない問題の、作用素版です。

---

## 12. LICQ・MFCQ・Robinson CQを一つの地図で見る

### 12.1 LICQ

有限次元でactiveな制約勾配が一次独立である条件です。

これはかなり強い正則性条件です。

### 12.2 MFCQ

等式制約の勾配について十分なランクがあり、かつactiveな不等式制約をすべて厳密に内側へ動かす方向が存在することを要求します。

LICQより弱いが、KKT乗数の存在には十分な場合が多い条件です。

### 12.3 interior

集合 $S\subset Y$ の **内部（interior）** とは、点 $y\in S$ の周りに十分小さい開球を置いても、その開球全体が $S$ に含まれるような点を集めた集合です。

$$
\boxed{
\operatorname{int}(S)
}
$$

と書きます。

したがって

$$
0\in\operatorname{int}(S)
$$

は「$S$ が原点の周囲を少し余裕をもって覆っている」という意味です。

### 12.4 Robinson constraint qualification

錐制約

$$
G(x)\in-K
$$

に対する代表的な一般化として

$$
\boxed{
0\in\operatorname{int}
\bigl(G(x^*)+DG(x^*)X+K\bigr)
}
$$

という条件があります。

ここで

$$
DG(x^*)X
=
\{DG(x^*)h:h\in X\}
$$

は線形化で動かせる制約値の集合です。

この条件は、線形化した制約写像と錐 $K$ を合わせれば $0$ の周囲を埋められる、つまり

> 一次近似が制約空間の必要な方向を十分に生成している

ことを表します。

有限次元の滑らかな不等式制約では、MFCQと非常に近い役割を果たします。

したがって制約想定をまとめると

$$
\boxed{
\text{制約想定}
\approx
\text{一次近似が本物の実行可能集合を十分よく表すための正則性}
}
$$

と理解できます。

---

## 13. Hahn--Banachと分離定理

F0-02Bでは有限次元の閉凸集合について、最近点への射影を使って分離超平面定理を証明しました。

一般のBanach空間では内積

$$
a^{\mathsf T}x
$$

を使えません。

代わりに双対空間の汎関数

$$
\ell\in X^*
$$

を使って

$$
\ell(x)\le\alpha<\ell(z)
$$

のように分離します。

このような分離定理の基礎にあるのが **Hahn--Banachの定理** です。

Hahn--Banachには複数の同値・派生形がありますが、ここでは次の役割だけ押さえます。

> 部分空間上で定義された連続線形汎関数を、ノルム評価を壊さず空間全体へ延長できる。

この延長能力から、点と凸集合を区別する連続線形汎関数を構成でき、分離定理へつながります。

Hahn--Banach自体の完全な証明はこの補講の目的から外れるため、ここでは証明しません。重要なのは、**ここから先は新しい定理を導入している**と明示しておくことです。

関係は

$$
\boxed{
\text{Hahn--Banach}
\to
\text{無限次元の分離定理}
\to
\text{双対錐・normal cone}
\to
\text{一般化KKT}
}
$$

です。

---

## 14. kernel SVMではHilbert空間が実際に現れる

kernel SVMでは特徴写像

$$
\varphi(x)\in\mathcal H
$$

をあるHilbert空間 $\mathcal H$ に取ります。

ハードマージン主問題は

$$
\min_{w\in\mathcal H,b\in\mathbb R}
\frac12\|w\|_{\mathcal H}^2
$$

subject to

$$
y_i\bigl(\langle w,\varphi(x_i)\rangle_{\mathcal H}+b\bigr)\ge1.
$$

つまりkernel SVMは最初から

$$
\boxed{\text{Hilbert空間上の凸最適化}}
$$

です。

KKTの停留条件を $w$ について書けば

$$
\boxed{
w
=
\sum_i\alpha_i y_i\varphi(x_i)
}
$$

となります。

無限次元かもしれない $\mathcal H$ の中で、最適解が有限個の訓練点の特徴ベクトルの張る部分空間に入ることが分かります。

---

## 15. RKHSとは何か

### 15.1 評価汎関数

関数空間 $\mathcal H$ の要素 $f$ に対し、点 $x$ での値を取り出す写像

$$
\delta_x(f)=f(x)
$$

を **評価汎関数** といいます。

### 15.2 再生核Hilbert空間

$\mathcal H$ が関数からなるHilbert空間で、各 $x$ について評価汎関数 $\delta_x$ が連続であるとき、$\mathcal H$ を **再生核Hilbert空間（RKHS）** といいます。

$\delta_x$ は連続線形汎関数なので、Riesz表現定理により、各 $x$ に対しある

$$
K_x\in\mathcal H
$$

が存在して

$$
\boxed{
f(x)
=
\langle f,K_x\rangle_{\mathcal H}
}
$$

となります。

これを **再生性** といいます。

さらに

$$
\boxed{
K(x,z)
=
\langle K_z,K_x\rangle_{\mathcal H}
}
$$

と置くと、これが再生核です。

したがってkernelというものは、単なる計算上の置換ではなく、

$$
\boxed{
\text{Hilbert空間の内積を、入力 }x,z\text{ だけで評価する関数}
}
$$

として現れます。

---

## 16. kernel trickを関数解析の言葉で読み直す

SVMの停留条件から

$$
w
=
\sum_i\alpha_i y_iK_{x_i}
$$

と書けます。

新しい点 $x$ での判別関数は

$$
\begin{aligned}
f(x)
&=
\langle w,K_x\rangle_{\mathcal H}+b\\
&=
\sum_i\alpha_i y_i
\langle K_{x_i},K_x\rangle_{\mathcal H}+b\\
&=
\boxed{
\sum_i\alpha_i y_iK(x_i,x)+b
}.
\end{aligned}
$$

したがって

$$
\boxed{
\text{Riesz表現}
\to
\text{再生核}
\to
\text{有限個の係数 }\alpha_i
\to
\text{kernel SVM}
}
$$

という流れになります。

---

## 17. F0-02Bの「有限次元」と何が変わるのか

F0-02Bでは閉凸集合への射影を使いました。

有限次元では閉有界集合がコンパクトなので、最近点の存在を比較的容易に示せました。

無限次元では

$$
\boxed{
\text{閉有界}
\not\Rightarrow
\text{コンパクト}
}
$$

です。

したがって有限次元の証明をそのまま移植できません。

一方、Hilbert空間では **射影定理** として、空でない閉凸集合への最近点が一意に存在することを示せます。

Banach空間一般では、最近点の存在・一意性にはさらに追加の仮定が必要になる場合があり、Hilbert空間ほど単純ではありません。

この違いは重要です。

> 有限次元で当たり前に使えた「コンパクト性」「内積」「ベクトルとしての勾配」が、無限次元ではそれぞれ独立した仮定・定理になる。

これが関数解析を導入する大きな理由です。

---

## 18. 全体像

有限次元では

$$
\boxed{
\nabla f
+
J_G^{\mathsf T}\lambda
=0
}
$$

と書いていたものが、Banach空間では

$$
\boxed{
Df
+
DG^*\lambda
=0
}
$$

になります。

また

$$
\lambda_i\ge0
$$

は

$$
\lambda\in K^*
$$

になり、

$$
\lambda_i g_i(x)=0
$$

は

$$
\lambda(G(x))=0
$$

になります。

理論全体を並べると

$$
\boxed{
\begin{array}{c}
\text{ノルム空間・Banach/Hilbert空間}\\
\Downarrow\\
\text{双対空間・Fr\'echet微分・随伴}\\
\Downarrow\\
\text{Hahn--Banach・分離定理・normal cone}\\
\Downarrow\\
\text{制約想定・一般化KKT}\\
\Downarrow\\
\text{RKHS・kernel SVM}
\end{array}
}
$$

です。

F0-02Aは「接錐からKKT」、F0-02Bは「分離定理からFarkas」、このF0-02Cは **それらを支える有限次元の構造を無限次元へ一般化したとき、何が本質だったかを見抜く補講** と位置付けてください。

SVMの具体的な主問題・双対問題・soft margin・kernel trickへ戻る場合は [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) を参照してください。

---

## 章末チェック

- ノルム空間、Banach空間、Hilbert空間の違いを説明できる。
- 線形汎関数と双対空間 $X^*$ の意味を説明できる。
- Fréchet微分 $Df(x)$ が一般には双対空間の元であることを説明できる。
- 随伴 $DG(x)^*$ が有限次元のJacobian転置に対応することを説明できる。
- 凸集合・凸関数・normal coneを定義できる。
- $\lambda_i\ge0$ を双対錐 $K^*$ の特殊例として説明できる。
- 制約想定を「一次近似が制約空間の必要な方向を生成するための正則性」と説明できる。
- Robinson CQの内部条件が何を意味するか説明できる。
- Hahn--Banachが無限次元の分離定理の背景にあることを説明できる。
- RKHSの評価汎関数・Riesz表現・再生核の関係を説明できる。
- kernel SVMの有限和表示がHilbert空間上のKKTから出ることを説明できる。
