# OPT6A 錐制約・一般化 KKT

<!-- definition-example-audit: strict -->

OPT6 では有限個の不等式・等式を個別に扱いました。本章では不等式を

$$
G(x)\in-K
$$

という一つの**錐制約**へまとめます。すると「乗数は非負」「相補性」「停留条件」は

$$
\lambda\in K^*,\qquad
\langle\lambda,G(x^*)\rangle=0,\qquad
\nabla f(x^*)+DG(x^*)^*\lambda+DH(x^*)^*\nu=0
$$

という同じ幾何から出てきます。

主線は

$$
\boxed{
G(x)\in-K
\to K^*
\to N_{-K}(G(x))
\to \text{Robinson CQ}
\to \text{一般化 KKT}
}
$$

です。

---

## 1. 錐制約

$X=\mathbb R^n$, $Y=\mathbb R^m$ とし、$K\subset Y$ を閉凸錐とします。

<a id="def-opt6a-cone-constraint"></a>
<!-- formal-statement-start -->
> **定義（錐制約）**  
> 写像 $G:X\to Y$ に対する
>
$$
G(x)\in-K
$$
>
> という制約を **錐制約**という。等式制約は別に $H(x)=0$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6a-cone-constraint -->
**定義の確認**：通常の不等式

$$
G(x)=(g_1(x),\ldots,g_m(x)),\qquad K=\mathbb R_+^m
$$

なら

$$
G(x)\in-K
\iff
g_i(x)\le0\quad(i=1,\ldots,m).
$$

したがって通常の不等式制約は錐制約の特殊例です。
<!-- definition-example-end -->

行列不等式も同じ形に入ります。例えば対称行列値写像 $F(x)$ に対する

$$
F(x)\preceq0
$$

は、対称半正定値行列の錐 $\mathbb S_+^q$ を用いて $F(x)\in-\mathbb S_+^q$ と書けます。ここに半正定値計画への入口があります。

---

## 2. 双対錐

<a id="def-opt6a-dual-cone"></a>
[OPT3 で定義した双対錐](../OPT3/index.md#def-opt3-polar-dual)を錐制約へ使います。すなわち、錐 $K\subset Y$ に対して

$$
K^*
=
\{\lambda\in Y:
\langle\lambda,k\rangle\ge0\quad(\forall k\in K)\}
$$

です。ここでは新しい概念を再定義するのではなく、OPT3 の canonical な双対錐を再掲しています。

**確認例**：非負直交錐は自己双対

$K=\mathbb R_+^m$ とします。$\lambda\in K^*$ なら標準基底 $e_i\in K$ との内積から $\lambda_i\ge0$。逆に $\lambda_i\ge0$ なら任意の $k_i\ge0$ に対して $\lambda^{\mathsf T}k\ge0$。従って

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$
この自己双対性が通常の KKT の $\lambda_i\ge0$ を復元します。

---

## 3. 一般化 Lagrangian

<a id="def-opt6a-generalized-lagrangian"></a>
<!-- formal-statement-start -->
> **定義（一般化 Lagrangian）**  
> 問題
>
$$
\min f(x)
\quad\text{subject to}\quad
G(x)\in-K,\ H(x)=0
$$
>
> に対し
>
$$
L(x,\lambda,\nu)
=
f(x)+\langle\lambda,G(x)\rangle
+\langle\nu,H(x)\rangle,
$$
>
> $\lambda\in K^*$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6a-generalized-lagrangian -->
**定義の確認**：二本の不等式

$K=\mathbb R_+^2$, $G=(g_1,g_2)$ なら

$$
L=f+\lambda_1g_1+\lambda_2g_2+\nu^{\mathsf T}H,
\qquad
\lambda_1,\lambda_2\ge0.
$$

OPT5 の Lagrangian がそのまま戻ります。
<!-- definition-example-end -->

微分すると

$$
\nabla_xL
=
\nabla f(x)+DG(x)^*\lambda+DH(x)^*\nu.
$$

有限次元 Euclid 空間では $DG(x)^*$ は Jacobian の転置です。

---

## 4. 相補性は normal cone の式である

<a id="thm-opt6a-cone-normal"></a>
<!-- formal-statement-start -->
> **定理（閉凸錐の normal cone）**  
> $K$ を閉凸錐、$y\in-K$ とする。このとき
>
$$
\boxed{
N_{-K}(y)
=
\{\lambda\in K^*:
\langle\lambda,y\rangle=0\}.
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\lambda\in N_{-K}(y)$ とする。normal cone の定義から

$$
\langle\lambda,z-y\rangle\le0
\qquad(\forall z\in-K).
$$

$z=0$ とすれば $\langle\lambda,y\rangle\ge0$。また任意の $k\in K$, $t>0$ に対して $z=y-tk\in-K$ だから

$$
-t\langle\lambda,k\rangle\le0,
$$

従って $\lambda\in K^*$。$y=-k_0$ と書けば $\langle\lambda,y\rangle=-\langle\lambda,k_0\rangle\le0$ なので、先ほどの逆向き不等式と合わせて0です。

逆に $\lambda\in K^*$ かつ $\langle\lambda,y\rangle=0$ とする。$z=-k\in-K$ に対し

$$
\langle\lambda,z-y\rangle
=
-\langle\lambda,k\rangle\le0.
$$

よって $\lambda\in N_{-K}(y)$。$\square$
<!-- proof-end -->

つまり一般錐でも

$$
\boxed{
\lambda\in K^*,
\qquad
\langle\lambda,G(x^*)\rangle=0
}
$$

が双対実行可能性と相補性です。

---

## 5. 錐制約を一次近似する

実行可能集合を

$$
C=\{x:G(x)\in-K,\ H(x)=0\}
$$

とします。$y^*=G(x^*)$ と置きます。

<a id="def-opt6a-linearization-cone"></a>
<!-- formal-statement-start -->
> **定義（錐制約の線形化錐）**  
> $G,H$ が $x^*$ で微分可能なとき
>
$$
L_C(x^*)
=
\{d:
DG(x^*)d\in T_{-K}(y^*),> DH(x^*)d=0\}
$$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-opt6a-linearization-cone -->
**定義の確認**：通常の一変数不等式

$G(x)=x$, $K=\mathbb R_+$, $x^*=0$ とします。$-K=\mathbb R_-$ で

$$
T_{\mathbb R_-}(0)=\mathbb R_-.
$$

$DG(0)d=d$ なので

$$
L_C(0)=\{d:d\le0\},
$$

通常の一次近似条件と一致します。
<!-- definition-example-end -->

微分可能性から OPT6 と同様に

$$
T_C(x^*)\subseteq L_C(x^*)
$$

は常に成立します。問題は逆包含です。

---

## 6. Robinson 制約想定

<a id="def-opt6a-robinson-cq"></a>
<!-- formal-statement-start -->
> **定義（Robinson 制約想定）**  
> $x^*$ が実行可能点とする。一次近似写像の像
>
$$
\mathcal R=
\left\{
\bigl(DH(x^*)d,\ DG(x^*)d-s\bigr):
d\in\mathbb R^n,> s\in T_{-K}(G(x^*))
\right\}
$$
>
> が $\mathbb R^r\times Y$ 全体に等しいとき、$x^*$ で **Robinson 制約想定**が成立するという。
<!-- formal-statement-end -->

有限次元ではこれは「一次近似された制約写像が全方向の摂動を吸収できる」という正則性です。

<!-- definition-example-start: def-opt6a-robinson-cq -->
**定義の確認**：$x\le0$

$G(x)=x$, $K=\mathbb R_+$, $x^*=0$。等式制約はありません。

$$
DG(0)d=d,\qquad
T_{-K}(0)=\mathbb R_-.
$$

任意の $y\in\mathbb R$ に対し $d=y$, $s=0$ と取れば $y=DG(0)d-s$。従って $\mathcal R=\mathbb R$ で Robinson 制約想定が成立します。
<!-- definition-example-end -->

### 6.1 退化例では失敗する

$G(x)=x^2$, $K=\mathbb R_+$, $x^*=0$ では $DG(0)=0$ です。従って

$$
\mathcal R
=
\{-s:s\in\mathbb R_-\}
=
\mathbb R_+,
$$

全実数を覆えません。OPT6 で見た「一次近似が制約を消す」退化が、ここでは Robinson 制約想定の失敗として現れます。

---

## 7. Robinson 制約想定が接錐を回収する

<a id="thm-opt6a-robinson-tangent"></a>
<!-- formal-statement-start -->
> **定理（Robinson 制約想定下の接錐公式）**  
> $G,H$ が $C^1$ 級、$K$ が閉凸錐で、$x^*$ において Robinson 制約想定が成立するとする。このとき
>
$$
\boxed{
T_C(x^*)
=
\{d:
DG(x^*)d\in T_{-K}(G(x^*)),> DH(x^*)d=0\}.
}
$$
<!-- formal-statement-end -->

### 証明の核心

包含 $T_C\subseteq L_C$ は一次展開から従います。逆向きでは $d\in L_C$ を取り、Robinson 制約想定が与える**誤差修正方向**を使って

$$
x(t)=x^*+td+o(t)
$$

を真の実行可能点へ補正します。有限次元ではこの主張は Lyusternik--Graves 型の正則性定理（metric regularity）から従います。

ここで一般錐に対する誤差修正定理を一から証明すると集合値解析そのものが新しい主題になります。本章では、Robinson 制約想定の役割をこの接錐公式として明示し、通常制約 $K=\mathbb R_+^m$ については後節で OPT6 の MFCQ 証明へ還元して核心機構を閉じます。

> **仮定が使われる場所**  
> Robinson 制約想定は KKT の代数操作に必要なのではありません。線形化錐を真の接錐へ戻すこの一箇所に必要です。

---

## 8. 一般化 KKT

<a id="thm-opt6a-generalized-kkt"></a>
<!-- formal-statement-start -->
> **定理（Robinson 制約想定下の一般化 KKT）**  
> $x^*$ が
>
$$
\min f(x)
\quad\text{subject to}\quad
G(x)\in-K,\ H(x)=0
$$
>
> の局所最小点とする。$f,G,H$ は $C^1$ 級、$K$ は閉凸錐で、$x^*$ で Robinson 制約想定が成立するとする。このとき、ある
>
$$
\lambda\in K^*,\qquad \nu\in\mathbb R^r
$$
>
> が存在して
>
$$
\boxed{
\nabla f(x^*)+DG(x^*)^*\lambda+DH(x^*)^*\nu=0,
}
$$
>
$$
\boxed{
\langle\lambda,G(x^*)\rangle=0
}
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[OPT6 の局所最適点の接方向条件](../OPT6/index.md#thm-opt6-local-tangent)から

$$
-\nabla f(x^*)\in T_C(x^*)^\circ.
$$

Robinson 制約想定による接錐公式と有限次元の polar calculus から

$$
T_C(x^*)^\circ
=
DG(x^*)^*N_{-K}(G(x^*))
+
\operatorname{range}DH(x^*)^*.
$$

従ってある $\lambda\in N_{-K}(G(x^*))$, $\nu\in\mathbb R^r$ が存在して

$$
-\nabla f(x^*)
=
DG(x^*)^*\lambda+DH(x^*)^*\nu.
$$

これが停留条件です。さらに[閉凸錐の normal cone 定理](#thm-opt6a-cone-normal)から

$$
\lambda\in K^*,\qquad
\langle\lambda,G(x^*)\rangle=0.
$$

よって一般化 KKT が成立します。$\square$
<!-- proof-end -->

---

## 9. 通常の KKT を復元する

$K=\mathbb R_+^m$ とします。自己双対性から

$$
\lambda\in K^*
\iff
\lambda_i\ge0.
$$

また $G(x^*)\in-\mathbb R_+^m$ なので $g_i(x^*)\le0$。相補性は

$$
\sum_i\lambda_i g_i(x^*)=0.
$$

各項は非正なので全て0、従って

$$
\lambda_i g_i(x^*)=0.
$$

停留条件も

$$
\nabla f(x^*)
+\sum_i\lambda_i\nabla g_i(x^*)
+\sum_j\nu_j\nabla h_j(x^*)=0
$$

となり、OPT5/OPT6 の KKT を完全に復元します。

<a id="thm-opt6a-robinson-mfcq"></a>
<!-- formal-statement-start -->
> **定理（通常制約では Robinson 制約想定と MFCQ が同値）**  
> $K=\mathbb R_+^m$ とし、$G=(g_1,\ldots,g_m)$ とする。このとき上の Robinson 制約想定は OPT6 の MFCQ と同値である。
<!-- formal-statement-end -->

### 証明の要点

非活性成分では $G_i(x^*)<0$ なので $T_{\mathbb R_-^m}(G(x^*))$ のその成分は自由です。活性成分だけを見ると、Robinson 条件は「等式線形化を任意に動かせ、同時に活性不等式を厳密に内側へ押す方向がある」ことになります。

<!-- proof-start -->
### 証明

MFCQ を仮定する。$DH(x^*)$ は全射で、$DHv=0$ かつ活性成分で $DGv<0$ となる $v$ がある。任意の小さな右辺 $(a,b)$ に対し、まず全射性で $DHd_0=a$ を解く。次に $d=d_0+tv$ とし $t$ を調整すれば、活性成分で $DGd-b$ を接錐 $T_{-K}(G(x^*))$ の内部へ押し込める。非活性成分には制限がない。従って Robinson 条件が成立する。

逆に Robinson 条件を仮定する。等式成分への射影から $DH(x^*)$ は全射、すなわち等式勾配は一次独立です。また右辺 $(0,-\mathbf1_I)$ を活性成分に指定すると、ある $v$ が $DHv=0$ かつ活性成分で $DGv<0$ を満たすように取れます。これは MFCQ です。$\square$
<!-- proof-end -->

したがって OPT6A は OPT6 の局所理論を一般錐へ拡張したものであり、通常制約へ戻れば新しい条件を勝手に追加しているわけではありません。

---

## 10. 半正定値錐の例

$X=\mathbb R$、$K=\mathbb S_+^2$ とし

$$
G(x)=
\begin{pmatrix}
x-1&0\\
0&-x
\end{pmatrix}.
$$

制約 $G(x)\preceq0$ は

$$
x-1\le0,\qquad -x\le0,
$$

すなわち $0\le x\le1$ と同値です。

$\mathbb S_+^2$ は Frobenius 内積

$$
\langle A,B\rangle=\operatorname{tr}(AB)
$$

に関して自己双対です。従って乗数 $\Lambda$ は

$$
\Lambda\succeq0
$$

で、相補性は

$$
\operatorname{tr}(\Lambda G(x^*))=0.
$$

成分不等式の「非負乗数×slack=0」が、行列では「半正定値乗数と slack 行列の内積が0」に置き換わります。これが半正定値計画の KKT の入口です。

---

## 11. 演習 Level A

### OPT6A-A01 不等式を錐制約へまとめる

- Level: A
- 目安時間: 8分

$g_i(x)\le0$ $(i=1,\ldots,m)$ を一つの錐制約に書き、双対乗数の条件を述べよ。

<!-- solution-start -->
#### 詳細解答

$$
G(x)=(g_1(x),\ldots,g_m(x)),\qquad K=\mathbb R_+^m
$$

と置けば $G(x)\in-K$。非負直交錐は自己双対なので

$$
\lambda\in K^*
\iff
\lambda_i\ge0\quad(\forall i).
$$
<!-- solution-end -->

### OPT6A-A02 normal cone から相補性を読む

- Level: A
- 目安時間: 10分

$K=\mathbb R_+^2$, $y=(-1,0)$ とする。$N_{-K}(y)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[閉凸錐の normal cone 公式](#thm-opt6a-cone-normal)から $\lambda\ge0$ かつ

$$
\lambda^{\mathsf T}y=-\lambda_1=0.
$$

従って $\lambda_1=0$, $\lambda_2\ge0$ で

$$
\boxed{N_{-K}(y)=\{(0,t):t\ge0\}}.
$$
<!-- solution-end -->

### OPT6A-A03 一般化 Lagrangian を微分する

- Level: A
- 目安時間: 10分

$G:\mathbb R^n\to\mathbb R^m$, $H:\mathbb R^n\to\mathbb R^r$ に対する一般化 Lagrangian を $x$ で微分せよ。

<!-- solution-start -->
#### 詳細解答

$$
L=f+\langle\lambda,G\rangle+\langle\nu,H\rangle
$$

なので連鎖律から

$$
\boxed{
\nabla_xL
=
\nabla f+DG^*\lambda+DH^*\nu.
}
$$

$DG^*\lambda$, $DH^*\nu$ はともに $\mathbb R^n$ のベクトルで、目的関数の勾配と型が一致します。
<!-- solution-end -->

### OPT6A-A04 Robinson 制約想定の成否

- Level: A
- 目安時間: 12分

$G(x)=x^2$, $K=\mathbb R_+$, $x^*=0$ について Robinson 制約想定が失敗することを確認せよ。

<!-- solution-start -->
#### 詳細解答

$DG(0)=0$、また

$$
T_{-K}(G(0))=T_{\mathbb R_-}(0)=\mathbb R_-.
$$

従って Robinson の線形化像は

$$
\{0\cdot d-s:s\in\mathbb R_-\}
=
\mathbb R_+.
$$

これは $\mathbb R$ 全体ではありません。従って Robinson 制約想定は失敗します。一次微分 $DG(0)$ が消え、正負両方向の摂動を吸収できないことが原因です。
<!-- solution-end -->

---

## 12. 演習 Level B

### OPT6A-B01 一般化 KKT から通常 KKT を復元する

- Level: B
- 目安時間: 15分

$K=\mathbb R_+^m$ として、[一般化 KKT](#thm-opt6a-generalized-kkt)から $\lambda_i\ge0$ と $\lambda_i g_i(x^*)=0$ を導け。

<!-- solution-start -->
#### 詳細解答

自己双対性から $\lambda\in K^*$ は $\lambda_i\ge0$ と同値です。実行可能性から $g_i(x^*)\le0$。一般化相補性は

$$
\sum_i\lambda_i g_i(x^*)=0.
$$

各項は非正です。有限個の非正数の和が0なので各項が0、従って

$$
\boxed{\lambda_i g_i(x^*)=0\quad(\forall i)}.
$$
<!-- solution-end -->

### OPT6A-B02 半正定値錐の相補性

- Level: B
- 目安時間: 18分

$K=\mathbb S_+^2$ とし、

$$
Y=
\begin{pmatrix}
-1&0\\0&0
\end{pmatrix}
\in-K.
$$

対角行列 $\Lambda=\operatorname{diag}(a,b)$ が $N_{-K}(Y)$ に入るための条件を求めよ。

<!-- solution-start -->
#### 詳細解答

$\mathbb S_+^2$ は自己双対なので $\Lambda\succeq0$、対角の場合は $a,b\ge0$。さらに相補性は

$$
\langle\Lambda,Y\rangle
=
\operatorname{tr}(\Lambda Y)
=-a=0.
$$

従って $a=0$, $b\ge0$。よって

$$
\boxed{
\Lambda=
\begin{pmatrix}
0&0\\0&b
\end{pmatrix},
\qquad b\ge0.
}
$$
<!-- solution-end -->

### OPT6A-B03 Robinson と MFCQ の対応

- Level: B
- 目安時間: 20分

通常制約

$$
g_1(x)=x_1\le0,\qquad
g_2(x)=2x_1\le0,\qquad
h(x)=x_2=0
$$

を原点で考える。LICQ、MFCQ を判定し、Robinson 制約想定との対応を説明せよ。

<!-- solution-start -->
#### 詳細解答

活性勾配は

$$
\nabla g_1=(1,0)^{\mathsf T},\quad
\nabla g_2=(2,0)^{\mathsf T},\quad
\nabla h=(0,1)^{\mathsf T}.
$$

$\nabla g_1$ と $\nabla g_2$ が一次従属なので LICQ は失敗します。

一方 $v=(-1,0)$ とすれば

$$
\nabla h^{\mathsf T}v=0,\qquad
\nabla g_1^{\mathsf T}v=-1<0,\qquad
\nabla g_2^{\mathsf T}v=-2<0.
$$

等式勾配も非零なので MFCQ は成立します。通常制約では MFCQ と Robinson 制約想定は同値なので Robinson 制約想定も成立します。この例は Robinson 制約想定が LICQ より弱い正則性であることも示します。
<!-- solution-end -->

---

## 13. 演習 Level C

### OPT6A-C01 錐 KKT を行列制約で再構成する

- Level: C
- 目安時間: 35分

$$
\min_{x\in\mathbb R} f(x)=-x
$$

subject to

$$
G(x)=
\begin{pmatrix}
x-1&0\\
0&-x
\end{pmatrix}
\preceq0
$$

を考える。

1. 実行可能集合と最適解を求めよ。
2. $K=\mathbb S_+^2$ として一般化 Lagrangian を書け。
3. 対角乗数 $\Lambda=\operatorname{diag}(a,b)\succeq0$ に対する停留条件と相補性を解け。
4. 通常の二本の不等式として書いた KKT と対応させよ。

<!-- solution-start -->
#### 詳細解答

行列不等式は対角成分から

$$
x-1\le0,\qquad -x\le0,
$$

従って実行可能集合は $[0,1]$。$f(x)=-x$ なので

$$
\boxed{x^*=1}.
$$

一般化 Lagrangian は Frobenius 内積を用いて

$$
L(x,\Lambda)
=
-x+\langle\Lambda,G(x)\rangle.
$$

$\Lambda=\operatorname{diag}(a,b)$ なら

$$
L=-x+a(x-1)-bx.
$$

従って停留条件は

$$
-1+a-b=0.
$$

$x^*=1$ では

$$
G(1)=
\begin{pmatrix}
0&0\\0&-1
\end{pmatrix}.
$$

相補性は

$$
\langle\Lambda,G(1)\rangle=-b=0,
$$

従って $b=0$。停留条件から $a=1$。よって

$$
\boxed{
\Lambda^*=
\begin{pmatrix}
1&0\\0&0
\end{pmatrix}.
}
$$

通常制約では $g_1=x-1\le0$, $g_2=-x\le0$。$x^*=1$ では第1制約が活性、第2制約は非活性なので $\lambda_2=0$、停留条件 $-1+\lambda_1-\lambda_2=0$ から $\lambda_1=1$。これは $(a,b)=(1,0)$ と完全に一致します。
<!-- solution-end -->

---

## 14. 次に進む

これで通常 KKT から一般錐制約までがつながりました。次は **OPT7「滑らかな凸最適化」** へ進み、Lipschitz 連続勾配、descent lemma、強凸性、最急降下法、Newton 法と収束速度を扱います。
