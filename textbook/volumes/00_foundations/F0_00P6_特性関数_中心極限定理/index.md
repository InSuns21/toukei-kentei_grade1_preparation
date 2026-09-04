# F0-00P6 特性関数・Lévy連続性定理：分布収束をFourier変換で見る

特性関数

$$\varphi_X(t)=E[e^{itX}]$$

は常に存在し、独立和を積へ変え、分布を一意に決めます。ここではLévy連続性定理までを一講義として閉じ、中心極限定理の証明は[P6Aの独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)へ分離します。

---

## 1. 特性関数

確率変数 $X$ の特性関数を

$$
\boxed{
\varphi_X(t)=E[e^{itX}]
}
$$

と定義します。

Eulerの公式から

$$
e^{itX}=\cos(tX)+i\sin(tX)
$$

なので

$$
\varphi_X(t)
=E[\cos(tX)]
+iE[\sin(tX)].
$$

特性関数は複素数値ですが、分布の情報を非常に扱いやすい形で持っています。

---

## 2. 特性関数は必ず存在する

母関数

$$
M_X(t)=E[e^{tX}]
$$

は重い裾を持つ分布では発散することがあります。

しかし

$$
|e^{itX}|=1
$$

なので

$$
|\varphi_X(t)|\le1.
$$

したがって特性関数は任意の確率分布について常に存在します。

これが極限定理で特性関数が好まれる大きな理由です。

---

## 3. 基本性質

$$
\varphi_X(0)=1,
$$

$$
|\varphi_X(t)|\le1,
$$

$$
\varphi_{aX+b}(t)
=e^{itb}\varphi_X(at)
$$

です。

また $X,Y$ が独立なら

$$
\boxed{
\varphi_{X+Y}(t)
=\varphi_X(t)\varphi_Y(t)
}
$$

です。

和を積へ変換できることが中心極限定理で決定的に効きます。

---

## 4. 特性関数は分布を一意に決める

二つの確率変数 $X,Y$ について

$$
\varphi_X(t)=\varphi_Y(t)
\qquad(\forall t\in\mathbb R)
$$

なら

$$
X\stackrel d=Y
$$

です。

したがって特性関数は分布の完全な符号化です。

この一意性定理はFourier解析に基づきます。

---

## 5. モーメントと0近傍の微分

十分なモーメントが存在すれば

$$
\varphi_X'(0)=iE[X],
$$

$$
\varphi_X''(0)=-E[X^2].
$$

特に

$$
E[X]=0,
\qquad
\operatorname{Var}(X)=1
$$

なら0近傍で

$$
\boxed{
\varphi_X(t)
=1-\frac{t^2}{2}+o(t^2)
}
$$

です。

これが中心極限定理の核心となる局所展開です。

---

## 6. なぜこのTaylor展開が正当化できるか

$E[X^2]<\infty$ なら

$$
e^{iu}
=1+iu-\frac{u^2}{2}+r(u)
$$

で

$$
\frac{r(u)}{u^2}\to0
\qquad(u\to0)
$$

です。

$u=tX$ として期待値を取る際には、有限二次モーメントを使って残差項を制御できます。

つまりここでも

> Taylor展開した後で期待値の中へ極限を入れてよいか

という積分交換の問題があります。

F0-00D2やP4で導入した支配・一様可積分性の発想が背景にあります。

---

## 7. 標準正規分布の特性関数

$Z\sim N(0,1)$ とすると

$$
\boxed{
\varphi_Z(t)=e^{-t^2/2}
}
$$

です。

これはGaussian積分から直接計算できます。

あるいは

$$
\varphi_Z'(t)=-t\varphi_Z(t),
\qquad
\varphi_Z(0)=1
$$

という微分方程式を導いて解いても同じ式になります。

したがって中心極限定理では、極限特性関数が $e^{-t^2/2}$ になれば標準正規分布へ収束することが期待できます。

---

<a id="thm-levy-continuity"></a>

## 8. Levy連続性定理

<!-- formal-statement-start -->
> **定理（Levy連続性定理）**  
> 確率変数列 $X_n$ の特性関数を $\varphi_n$、確率変数 $X$ の特性関数を $\varphi$ とします。すべての $t\in\mathbb R$ で $\varphi_n(t)\to\varphi(t)$ なら $X_n\xrightarrow{d}X$ です。逆に $X_n\xrightarrow{d}X$ なら、すべての $t\in\mathbb R$ で $\varphi_n(t)\to\varphi(t)$ が成り立ちます。
<!-- formal-statement-end -->

確率変数列 $X_n$ の特性関数を $\varphi_n$ とします。

もし

$$
\varphi_n(t)\to\varphi(t)
\qquad(\forall t)
$$

で、極限 $\varphi$ が0で連続なある確率分布の特性関数なら

$$
\boxed{
X_n\xrightarrow{d}X
}
$$

です。

逆に分布収束すれば特性関数も各点で収束します。

したがって

$$
\boxed{
\text{特性関数の収束}
\Longleftrightarrow
\text{分布収束}
}
$$

を扱えるようになります。

完全証明にはFourier解析とtightnessの議論が必要なので、この補講では定理として使います。

---

## 演習

### F0-00P6-A01 独立和の特性関数

- Level: A
- 目安時間: 10分

独立な $X,Y$ の特性関数を $\varphi_X,\varphi_Y$ とする。$X+Y$ の特性関数を求めよ。

<!-- solution-start -->
#### 詳細解答
独立性から $E[e^{it(X+Y)}]=E[e^{itX}e^{itY}]=E[e^{itX}]E[e^{itY}]$。

#### 本番答案
$\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)$。

#### 採点基準（20点）
- 定義: 5点
- 独立性による因数分解: 10点
- 結論: 5点
<!-- solution-end -->

### F0-00P6-B01 正規分布の和を特性関数で示す

- Level: B
- 目安時間: 15分

独立な $X\sim N(\mu_1,\sigma_1^2)$, $Y\sim N(\mu_2,\sigma_2^2)$ に対し、$X+Y$ の分布を特性関数から求めよ。

<!-- solution-start -->
#### 詳細解答
正規の特性関数は $\exp(i\mu t-\sigma^2t^2/2)$。積を取ると $\exp(i(\mu_1+\mu_2)t-(\sigma_1^2+\sigma_2^2)t^2/2)$ で、Lévyの一意性から対応する正規分布。

#### 本番答案
特性関数の積は $\exp(i(\mu_1+\mu_2)t-(\sigma_1^2+\sigma_2^2)t^2/2)$。従って $N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$。

#### 採点基準（20点）
- 正規特性関数: 6点
- 積: 6点
- 分布同定: 6点
- 一意性: 2点
<!-- solution-end -->

---

## 次に進む

独立同分布の中心極限定理を実際に導く [F0-00P6A](../F0_00P6A_iid_中心極限定理/index.md) へ進みます。Fourier解析側から見直す場合はEncore II FA3へ接続します。
