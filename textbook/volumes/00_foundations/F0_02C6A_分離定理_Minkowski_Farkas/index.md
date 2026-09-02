# F0-02C6A 関数解析VI-A：分離定理・Minkowski functional・Farkas

Hahn--Banachを、点と閉凸集合を分ける連続線形汎関数へ変換します。有限次元のFarkas・KKTまで回収します。

## 1. 超平面を汎関数で定義する

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

## 2. 点と閉凸集合の強分離

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

## 3. なぜ閉性が重要か

$z\notin C$ で $C$ が閉なら、補集合は開なので、ある $r>0$ が存在して

$$
B(z,r)\cap C=\varnothing.
$$

したがって点 $z$ と $C$ には正の距離の余裕があります。

この余裕を使って、$C-z$ の周囲に0を含まない凸集合を作り、そのMinkowski functionalをsublinearな支配関数としてHahn--Banachを適用するのが標準的な証明の流れです。

---

## 4. Minkowski functionalという橋

集合 $U$ が **吸収的（absorbing）** であるとは、任意の $x$ に対し十分大きい $t>0$ を取れば $x\in tU$ となることです。

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

## 5. Hilbert空間ではもっと具体的に分離できる

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

## 6. Banach空間とHilbert空間の違い

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

## 7. 二つの凸集合の分離では条件を確認する

「互いに交わらない凸集合なら必ず正の隙間で分離できる」と無条件に言うことはできません。

例えば二つの集合の距離が0へ近づく場合、厳密な正のgapを持つ強分離が得られないことがあります。

標準的には

- 一方が開である場合の分離
- 点と閉凸集合の強分離
- 一方がコンパクト、他方が閉で互いに素な場合の強分離

など、仮定に応じて分離の強さを使い分けます。

F0-02BのSVMでは、有限個の訓練点の凸包がコンパクトなので、交わらなければ正の距離を持ちます。

---

## 8. Farkasの補題へ戻る

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

## 9. KKTとの関係

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

## 演習

### F0-02C6A-A01 半空間を分離する汎関数

- Level: A
- 目安時間: 10分

$C=\{x\in\mathbb R^2:x_1\le0\}$ と $z=(1,0)$ を強分離する線形汎関数を与えよ。

<!-- solution-start -->
#### 詳細解答
$f(x)=x_1$ とすれば $\sup_{x\in C}f(x)=0<1=f(z)$。
#### 本番答案
$f(x)=x_1$ とすれば $\sup_{x\in C}f(x)=0<1=f(z)$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C6A-B01 Farkas型certificate

- Level: B
- 目安時間: 15分

$K=\mathbb R_+^2$、$b=(-1,1)$ とする。$b\notin K$ を分離する $y$ で $y\le0$, $b^Ty>0$ を満たすものを一つ与えよ。

<!-- solution-start -->
#### 詳細解答
$y=(-1,0)$ とすれば $y\le0$ かつ $b^Ty=1>0$。有限次元の分離が実行不能性certificateになる例。
#### 本番答案
$y=(-1,0)$ とすれば $y\le0$ かつ $b^Ty=1>0$。有限次元の分離が実行不能性certificateになる例。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C7 RKHS・再生核・Moore--Aronszajn](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md)**
