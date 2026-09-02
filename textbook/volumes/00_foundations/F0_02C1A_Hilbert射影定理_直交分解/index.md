# F0-02C1A 関数解析I-A：Hilbert射影定理・直交分解

F0-02C1でBanach/Hilbert空間の型を分けました。この講義ではHilbert空間の**閉凸集合への最近点**を、有限次元のcompactnessに頼らず完備性と平行四辺形恒等式から構成します。

$$
\boxed{
\text{最小化列}
\to\text{Cauchy列}
\to\text{完備性}
\to\text{射影}
\to\text{直交分解}
}
$$

---

<a id="thm-hilbert-projection"></a>

## 1. Hilbert空間の射影定理

$H$ をHilbert空間、$C\subset H$ を空でない閉凸集合とします。

任意の $z\in H$ に対し、距離

$$
\delta=\inf_{x\in C}\|z-x\|
$$

を実際に達成する一意な点 $p\in C$ が存在します。

$$
\boxed{
\|z-p\|=\delta
}
$$

です。

有限次元のF0-02BではHeine--Borelを使いました。しかし無限次元では閉有界集合がコンパクトとは限りません。

Hilbert空間では、**内積構造と完備性**を使って別の証明をします。

---

<!-- round3-hidden-proof-fixed -->
## 2. 証明の見取り図：最近点を「最小化列の極限」として作る

有限次元のように閉有界集合のコンパクト性へ逃げず、Hilbert空間では

```text
距離のinfimumへ近づく列を取る
  ↓
凸性 + 平行四辺形恒等式でCauchy列にする
  ↓
完備性で極限 p を作る
  ↓
閉性で p を C に戻す
  ↓
同じ恒等式で一意性を出す
```

という順です。証明を閉じても、「凸性がCauchy性を作り、完備性が極限を作り、閉性が極限を集合内へ戻す」という役割分担は本文として残します。

<!-- proof-start -->
## 2. 射影定理の存在証明

$\delta=\inf_{x\in C}\|z-x\|$ とし、$x_n\in C$ を

$$
\|z-x_n\|\to\delta
$$

となるように取ります。

凸性より

$$
\frac{x_n+x_m}{2}\in C
$$

なので

$$
\left\|z-\frac{x_n+x_m}{2}\right\|\ge\delta.
$$

一方、平行四辺形恒等式を $z-x_n$ と $z-x_m$ に使うと

$$
\|x_n-x_m\|^2
=2\|z-x_n\|^2+2\|z-x_m\|^2
-4\left\|z-\frac{x_n+x_m}{2}\right\|^2.
$$

したがって

$$
\|x_n-x_m\|^2
\le
2\|z-x_n\|^2+2\|z-x_m\|^2-4\delta^2.
$$

$n,m\to\infty$ で右辺は0へ行くので、$x_n$ はCauchy列です。

$H$ は完備なので

$$
x_n\to p\in H.
$$

$C$ は閉なので $p\in C$ です。

ノルムの連続性から

$$
\|z-p\|=\delta.
$$

これで存在が示されました。

重要なのは、コンパクト性ではなく

$$
\boxed{
\text{凸性}
+\text{平行四辺形恒等式}
+\text{完備性}
+\text{閉性}
}
$$

を使ったことです。

---

## 3. 射影の一意性

$p,q\in C$ が両方最近点だとします。

同じ平行四辺形恒等式から

$$
\left\|z-\frac{p+q}{2}\right\|^2
=\frac12\|z-p\|^2
+\frac12\|z-q\|^2
-\frac14\|p-q\|^2.
$$

$p\ne q$ なら右辺は $\delta^2$ より小さくなり、$\delta$ の定義に反します。

したがって $p=q$ です。
<!-- proof-end -->

---

## 4. 射影の特徴付け

$p=P_C(z)$ とします。

任意の $x\in C$ に対して

$$
\boxed{
\langle z-p,x-p\rangle\le0
}
$$

が成り立ちます。

$C$ が線形部分空間 $M$ なら $p\pm tm\in M$ を使えるので不等号は等号になり

$$
\boxed{
z-p\in M^\perp}
$$

です。

つまり

$$
z=P_Mz+(z-P_Mz)
$$

は

$$
M\oplus M^\perp
$$

への直交分解です。

この射影定理が、次章のRiesz表現定理の証明にも使われます。

---

## 5. 有限次元で無意識に使っていたもの

$\mathbb R^p$ では

- 完備性が自動
- 閉有界ならコンパクト
- 標準内積がある
- 線形汎関数をベクトルと同一視できる

ため、いくつもの構造が重なって見えます。

無限次元ではそれぞれを分離して確認しなければなりません。

この章で分けたのは

$$
\boxed{
\text{ノルム}
\ne
\text{内積}
\ne
\text{完備性}
\ne
\text{コンパクト性}
}
$$

という点です。


---

## 演習

### F0-02C1A-A01 l2の座標部分空間へ射影する

- Level: A
- 目安時間: 10分

$$
H=\ell^2,\qquad M=\{x\in\ell^2:x_1=0\}
$$

とする。$z=(z_1,z_2,\dots)$ の $M$ への直交射影 $P_Mz$ と残差 $z-P_Mz$ を求めよ。

<!-- solution-start -->
#### 詳細解答
第1成分だけを0にすれば距離を最小化するので $P_Mz=(0,z_2,z_3,\dots)$。残差は $(z_1,0,0,\dots)=z_1e_1$ で、任意の $m\in M$ と直交する。
#### 本番答案
$P_Mz=(0,z_2,z_3,\dots)$、$z-P_Mz=(z_1,0,0,\dots)\in M^\perp$。
#### 採点基準（20点）
- 射影: 8点
- 残差: 5点
- 直交性: 5点
- 結論: 2点
<!-- solution-end -->

### F0-02C1A-B01 線形部分空間では射影条件が等号になる

- Level: B
- 目安時間: 15分

閉線形部分空間 $M\subset H$ と $p=P_Mz$ に対し、閉凸集合の射影条件

$$
\langle z-p,x-p\rangle\le0\qquad(\forall x\in M)
$$

から $z-p\in M^\perp$ を示せ。

<!-- solution-start -->
#### 詳細解答
任意の $m\in M$ と $t\in\mathbb R$ に対し $x=p+tm\in M$。射影条件は $t\langle z-p,m\rangle\le0$。$t>0$ と $t<0$ の両方で成立するため $\langle z-p,m\rangle=0$。$m$ は任意なので $z-p\in M^\perp$。
#### 本番答案
$x=p\pm tm$ を代入すると $\pm t\langle z-p,m\rangle\le0$。従って内積は0で、$z-p\perp M$。
#### 採点基準（20点）
- 線形部分空間の利用: 5点
- $p\pm tm$ の代入: 7点
- 等号の導出: 5点
- 直交補への結論: 3点
<!-- solution-end -->

---

## 次に進む

射影定理はRiesz表現定理の標準証明で $\ker\ell$ への射影として直ちに使います。

**次：[F0-02C2 線形汎関数・双対空間・Riesz表現](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)**

---

## 章末チェック

- 閉凸集合への射影定理の存在証明で完備性が使われる箇所を説明できる。
- 平行四辺形恒等式から最小化列がCauchyになることを説明できる。
- 射影点の一意性を示せる。
- 線形部分空間では残差が直交補空間に入ることを示せる。
