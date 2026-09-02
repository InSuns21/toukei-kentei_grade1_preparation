# F0-02C4A 関数解析IV-A：tangent cone・polar cone・dual cone

実行可能な一次方向と、それを支える双対側の法線・錐を整理します。

## 1. tangent cone

集合 $C$ と $x\in C$ に対し、「実際に集合内から近づける一次方向」を集めたものが tangent cone です。

一つの標準的定義としてBouligand tangent coneを

$$
T_C(x)
=\left\{
h:\exists t_n\downarrow0,\ \exists x_n\in C,
\ \frac{x_n-x}{t_n}\to h
\right\}
$$

と定めます。

凸集合なら、直感的には

$$
y-x
\qquad(y\in C)
$$

の非負倍を集めて閉じた錐と一致します。

---

## 2. polar cone

錐 $K\subset X$ に対して

$$
\boxed{
K^\circ
=\{x^*\in X^*:x^*(k)\le0
\ \forall k\in K\}
}
$$

を **polar cone** といいます。

normal coneの定義と比べると、凸集合について

$$
\boxed{
N_C(x)=T_C(x)^\circ
}
$$

という関係が得られます。

つまりnormal coneは「実行可能な接方向すべてに非正に作用する汎関数」の集合です。

---

## 3. dual cone

一方、錐 $K\subset Y$ に対して

$$
\boxed{
K^*
=\{\lambda\in Y^*:\lambda(k)\ge0
\ \forall k\in K\}
}
$$

を **dual cone** といいます。

本教材では polar cone を $\le0$、dual cone を $\ge0$ で定義しているため

$$
\boxed{K^\circ=-K^*}.
$$

文献によって符号規約が異なるので、名前だけでなく不等号を確認することが重要です。

---

## 4. 非負直交錐は自己双対

有限次元で

$$
K=\mathbb R_+^m
$$

とします。

$\lambda\in K^*$ である条件は

$$
\lambda^{\mathsf T}k\ge0
\qquad(\forall k\ge0).
$$

各標準基底 $e_i\ge0$ を入れると

$$
\lambda_i\ge0.
$$

逆に $\lambda\ge0$ なら $k\ge0$ に対して内積は非負です。

したがって

$$
\boxed{(\mathbb R_+^m)^*=\mathbb R_+^m}.
$$

有限次元KKTの

$$
\lambda_i\ge0
$$

は、一般には

$$
\boxed{\lambda\in K^*}
$$

という双対錐条件です。

---

## 5. KKTへの橋

ここまでで

$$
\boxed{
\text{実行可能方向 }T_C(x)
\xrightarrow{\text{polar}}
\text{法線 }N_C(x)
}
$$

と

$$
\boxed{
\lambda_i\ge0
\xrightarrow{\text{一般化}}
\lambda\in K^*
}
$$

を用意しました。

次の [F0-02C5 一般化KKT・制約写像・制約想定](../F0_02C5_一般化KKT_制約写像_制約想定/index.md) では、制約を

$$
G(x)\in-K
$$

という一つの写像で書き、

$$
Df(x^*)+DG(x^*)^*\lambda=0
$$

を導入します。

そこで初めて「なぜ制約想定が必要なのか」を、一次近似が壊れる反例から確認します。

---

## 演習

### F0-02C4A-A01 非負直交錐の双対

- Level: A
- 目安時間: 10分

$K=\mathbb R_+^m$ について $K^*=K$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\lambda\in K^*$ なら標準基底 $e_i\in K$ により $\lambda_i\ge0$。逆に $\lambda,k\ge0$ なら $\lambda^Tk\ge0$。
#### 本番答案
$\lambda\in K^*$ なら標準基底 $e_i\in K$ により $\lambda_i\ge0$。逆に $\lambda,k\ge0$ なら $\lambda^Tk\ge0$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C4A-B01 半空間のtangentとpolar

- Level: B
- 目安時間: 15分

$C=\{x:a^Tx\le b\}$ の境界点 $x$ で $T_C(x)=\{d:a^Td\le0\}$ とそのpolarを求めよ。

<!-- solution-start -->
#### 詳細解答
一次的に実行可能なのは $a^Td\le0$。この半空間錐のpolarは $\{\lambda a:\lambda\ge0\}$ で、これは $N_C(x)$ に一致する。
#### 本番答案
一次的に実行可能なのは $a^Td\le0$。この半空間錐のpolarは $\{\lambda a:\lambda\ge0\}$ で、これは $N_C(x)$ に一致する。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C5 一般化KKT・錐制約・双対乗数](../F0_02C5_一般化KKT_制約写像_制約想定/index.md)**
