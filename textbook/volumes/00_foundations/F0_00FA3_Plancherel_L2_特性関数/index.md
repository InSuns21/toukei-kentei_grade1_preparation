# F0-00FA3 Encore II：Plancherel・L2 Fourier変換・特性関数

Fourier変換を $L^1$ の積分公式としてだけ見ると、確率論や偏微分方程式で使う $L^2$ 理論との接続が見えにくくなります。

この章ではFourier変換を **Hilbert空間上の座標変換** として読み直します。

---

## 1. L1とL2では事情が違う

$f\in L^1(\mathbb R)$ なら

$$
\widehat f(\xi)
=
\int_{\mathbb R}f(x)e^{-i\xi x}\,dx
$$

を各 $\xi$ について直接定義できます。

しかし $f\in L^2$ だけでは

$$
\int|f(x)|\,dx
$$

が有限とは限りません。

したがってFourier積分を点ごとにそのまま書けない場合があります。

そこでまず

$$
L^1\cap L^2
$$

上でFourier変換を定義し、$L^2$ ノルムについて極限を取って全体へ拡張します。

完備性がここで効きます。

---

## 2. Plancherel等式

<a id="thm-f0-00fa3-plancherel"></a>

<!-- formal-statement-start -->
> **定理（Plancherel等式）**  
> $L^1(\mathbb R)\cap L^2(\mathbb R)$ 上で $\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx$ と定義したFourier変換を $L^2(\mathbb R)$ へ連続拡張します。この拡張に対して、任意の $f\in L^2(\mathbb R)$ で

$$
\boxed{
\|f\|_2^2
=
\frac1{2\pi}\|\widehat f\|_2^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

この章の規約

$$
\widehat f(\xi)
=
\int f(x)e^{-i\xi x}\,dx
$$

では、Plancherel等式は

$$
\boxed{
\int_{\mathbb R}|f(x)|^2\,dx
=
\frac1{2\pi}
\int_{\mathbb R}|\widehat f(\xi)|^2\,d\xi
}
$$

です。

つまり

$$
\boxed{
\|f\|_2^2
=
\frac1{2\pi}
\|\widehat f\|_2^2
}.
$$

正規化

$$
\mathcal F_u f
=\frac1{\sqrt{2\pi}}\widehat f
$$

を使えば

$$
\boxed{
\|\mathcal F_u f\|_2=\|f\|_2
}
$$

と完全にノルム保存になります。

---

## 3. 内積も保存する

より一般に

$$
\boxed{
\langle f,g\rangle_{L^2}
=
\frac1{2\pi}
\langle\widehat f,\widehat g\rangle_{L^2}
}
$$

です。

したがって正規化Fourier変換はHilbert空間 $L^2(\mathbb R)$ 上のunitary operatorになります。

これは有限次元で直交行列 $Q$ が

$$
\|Qx\|=\|x\|
$$

を満たしたのと同じ構造です。

Fourier変換は

$$
\boxed{
\text{無限次元版の直交座標変換}
}
$$

と読むことができます。

---

## 4. Fourier級数のParsevalとの対応

周期関数では

$$
\|f\|_2^2
=2\pi\sum_{n\in\mathbb Z}|c_n|^2
$$

でした。

非周期関数では

$$
\|f\|_2^2
=\frac1{2\pi}
\int_{\mathbb R}|\widehat f(\xi)|^2\,d\xi.
$$

したがって

$$
\boxed{
\text{Fourier係数の二乗和}
\longleftrightarrow
\text{Fourier変換の二乗積分}
}
$$

です。

離散スペクトルが連続スペクトルへ変わったと見れば、ParsevalとPlancherelは同じ思想です。

---

## 5. なぜL2拡張ができるのか

$L^1\cap L^2$ は $L^2$ に稠密です。

$f\in L^2$ に対し

$$
f_n\in L^1\cap L^2,
\qquad
\|f_n-f\|_2\to0
$$

となる列を取ります。

Plancherel等式から

$$
\|\widehat f_n-\widehat f_m\|_2^2
=2\pi\|f_n-f_m\|_2^2.
$$

したがって $(\widehat f_n)$ は $L^2$ のCauchy列です。

$L^2$ は完備なので極限が存在し、その極限を $\widehat f$ と定めます。

つまり

$$
\boxed{
\text{稠密部分空間で定義}
+\text{ノルム保存}
+\text{完備性}
\to
\text{全 }L^2\text{ へ拡張}
}
$$

です。

これは関数解析で繰り返し使う標準パターンです。

---

## 6. 微分作用素を対角化する

十分滑らかで減衰する関数について

$$
\widehat{f'}(\xi)=i\xi\widehat f(\xi)
$$

でした。

したがって微分作用素

$$
D=\frac d{dx}
$$

はFourier変換によって

$$
M_{i\xi}:h(\xi)\mapsto i\xi h(\xi)
$$

という掛け算作用素へ移ります。

二階微分なら

$$
-D^2
\longleftrightarrow
\xi^2.
$$

有限次元で対称行列を固有ベクトル基底へ移すと対角行列になったことと非常によく似ています。

Fourier変換は微分作用素を「連続スペクトルで対角化する装置」と見なせます。

---

## 7. 特性関数をFourier変換として読む

確率変数 $X$ の分布を $P_X$ とすると

$$
\varphi_X(t)
=
E[e^{itX}]
=
\int e^{itx}\,dP_X(x).
$$

これは符号の違いを除けば、測度 $P_X$ のFourier変換です。

密度 $f_X$ があれば

$$
\varphi_X(t)
=
\int e^{itx}f_X(x)\,dx.
$$

つまりF0-00P6の特性関数は最初からFourier解析の対象でした。

---

## 8. 独立和と畳み込み

独立な $X,Y$ について

$$
P_{X+Y}=P_X*P_Y.
$$

Fourier変換は畳み込みを積へ変えるので

$$
\boxed{
\varphi_{X+Y}(t)
=
\varphi_X(t)\varphi_Y(t)
}.
$$

したがって特性関数によるCLTの証明は

$$
\boxed{
\text{独立和}
\to
\text{分布の畳み込み}
\to
\text{Fourier空間で積}
}
$$

という構造です。

---

## 9. CLTをFourier解析として再読する

平均0・分散1の独立同分布 $X_i$ に対し

$$
S_n
=\frac{X_1+\cdots+X_n}{\sqrt n}
$$

とします。

特性関数は

$$
\varphi_{S_n}(t)
=
\left\{
\varphi_X\left(\frac t{\sqrt n}\right)
\right\}^n.
$$

0近傍で

$$
\varphi_X(s)
=1-\frac{s^2}{2}+o(s^2)
$$

なので

$$
\varphi_{S_n}(t)
\to
\exp\left(-\frac{t^2}{2}\right).
$$

右辺は標準正規分布の特性関数です。

したがってCLTは

> 大量の畳み込みと再尺度化を繰り返すと、Fourier空間でGaussianの形へ収束する。

という定理としても読めます。

---

## 10. Gaussianが中心にいる理由

Gaussian

$$
g_a(x)=e^{-ax^2}
$$

はFourier変換してもGaussianです。

さらにGaussian密度同士の畳み込みもGaussianになります。

そして熱方程式では

$$
\widehat u(t,\xi)
=e^{-\kappa t\xi^2}\widehat u_0(\xi)
$$

というGaussian型乗数が現れます。

したがって

$$
\boxed{
\text{Gaussian}
\begin{cases}
\text{Fourier変換で閉じる}\\
\text{畳み込みで閉じる}\\
\text{CLTの極限になる}\\
\text{熱方程式の基本解になる}
\end{cases}
}
$$

という巨大な接続ができます。

---

## 11. P6へ戻る

[F0-00P6Aの独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) では、特性関数を使ってCLTを導きました。

この章まで読んだ後では、P6の

- 特性関数の一意性
- Levy連続性定理
- 独立和で積になること

が「確率論だけの特殊技法」ではなく、Fourier解析の言葉として読めます。

Levy連続性定理の完全証明にはさらに測度論的Fourier解析とtightnessが必要なので、このEncore IIでは定理の位置づけまでを回収します。

---

## 演習

### F0-00FA3-A01 Plancherelの $2\pi$ を具体例で確認する

- Level: A
- 目安時間: 15分

FA2で得た

$$
f(x)=e^{-|x|},
\qquad
\widehat f(\xi)=\frac{2}{1+\xi^2}
$$

を使い、本章の規約のPlancherel等式

$$
\int|f|^2
=\frac1{2\pi}\int|\widehat f|^2
$$

を確認せよ。ただし

$$
\int_{-\infty}^{\infty}\frac{d\xi}{(1+\xi^2)^2}=\frac\pi2
$$

を使ってよい。

<!-- solution-start -->
#### 詳細解答

空間側は

$$
\int_{\mathbb R}e^{-2|x|}dx
=2\int_0^\infty e^{-2x}dx=1.
$$

周波数側は

$$
\frac1{2\pi}\int_{\mathbb R}\frac4{(1+\xi^2)^2}d\xi
=\frac1{2\pi}\cdot4\cdot\frac\pi2
=1.
$$

両辺が一致する。

#### 本番答案

$\|f\|_2^2=1$、$(2\pi)^{-1}\|\hat f\|_2^2=(2\pi)^{-1}4(\pi/2)=1$。

#### 採点基準（20点）
- 空間側: 7点
- 周波数側: 9点
- 規約の確認: 4点
<!-- solution-end -->

### F0-00FA3-B01 Fourier変換が距離を保存する

- Level: B
- 目安時間: 12分

正規化Fourier変換 $\mathcal F_u=(2\pi)^{-1/2}\mathcal F$ について、Plancherel等式から任意の $f,g\in L^2(\mathbb R)$ に対し

$$
\|\mathcal F_u f-\mathcal F_u g\|_2=\|f-g\|_2
$$

を示し、「Fourier変換が無限次元の直交座標変換」と呼べる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

線形性より $\mathcal F_u f-\mathcal F_u g=\mathcal F_u(f-g)$。Plancherelによるノルム保存を $f-g$ に適用すれば

$$
\|\mathcal F_u(f-g)\|_2=\|f-g\|_2.
$$

従って二点間の距離を保存する。有限次元の直交行列がEuclid距離を保存するのと同じ役割である。

#### 本番答案

$\|\mathcal F_u f-\mathcal F_u g\|_2=\|\mathcal F_u(f-g)\|_2=\|f-g\|_2$。よってHilbert空間の距離を保存するunitaryな座標変換である。

#### 採点基準（20点）
- 線形性: 5点
- Plancherel適用: 8点
- 距離保存: 4点
- 解釈: 3点
<!-- solution-end -->

---

## 章末チェック

- Plancherel等式を書ける。
- 正規化Fourier変換がL2ノルムと内積を保存することを説明できる。
- L1かつL2な稠密部分空間からL2全体へ拡張する論理を説明できる。
- Fourier変換を無限次元の直交座標変換として説明できる。
- 微分作用素が周波数側で掛け算作用素になることを説明できる。
- 特性関数と畳み込み定理の関係を説明できる。
- CLTをFourier解析として再解釈できる。
- Gaussianが確率論と熱方程式を結ぶ理由を説明できる。
