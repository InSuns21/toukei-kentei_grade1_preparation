# F0-00SDE1 Encore V：Euler--Maruyama・strong/weak convergence

SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

をMonte Carloで使うには、連続時間pathを計算機上で離散化する必要があります。

---

## 1. Brown increment

時間格子

$$
0=t_0<t_1<\cdots<t_N=T,
\qquad
h=t_{n+1}-t_n
$$

を取り

$$
\Delta B_n=B_{t_{n+1}}-B_{t_n}
$$

とします。

Brown運動の独立増分から

$$
\boxed{
\Delta B_n\sim N(0,h)
}
$$

で独立です。

したがって標準正規乱数 $Z_n$ から

$$
\Delta B_n=\sqrt h Z_n
$$

を生成できます。

---

## 2. Euler--Maruyama

SDEの積分形

$$
X_{t_{n+1}}
=X_{t_n}
+\int_{t_n}^{t_{n+1}}b(X_s)ds
+\int_{t_n}^{t_{n+1}}\sigma(X_s)dB_s
$$

で係数を左端に固定すると

$$
\boxed{
X_{n+1}
=X_n+b(X_n)h+\sigma(X_n)\Delta B_n
}
$$

です。

これがEuler--Maruyama法です。

---

## 3. ODE Eulerとの違い

ODEでは増分は $O(h)$ です。

Brown増分は典型的に

$$
\Delta B=O(\sqrt h)
$$

です。

したがって確率項のスケールが異なり、通常のTaylor解析をそのまま使えません。

Itô--Taylor展開が必要になります。

---

## 4. strong convergence

同じBrown pathを使った真の解 $X_T$ と数値解 $X_T^h$ の距離を見るのがstrong errorです。

例えば

$$
\boxed{
E|X_T-X_T^h|
\le C h^p
}
$$

ならstrong order $p$ と呼びます。

標準的なLipschitz条件下でEuler--Maruyamaは典型的にstrong order $1/2$ です。

---

## 5. weak convergence

Monte Carloで欲しいものが

$$
E[g(X_T)]
$$

ならpathそのものより期待値の誤差が重要です。

$$
\boxed{
|E[g(X_T)]-E[g(X_T^h)]|
\le C h^p
}
$$

をweak order $p$ と呼びます。

十分滑らかな条件ではEuler--Maruyamaは典型的にweak order 1です。

---

## 6. なぜstrongとweakを分けるのか

- path simulationやcoupling：strong errorが重要
- option priceや期待損失：weak errorが重要

です。

MLMCではfine levelとcoarse levelの差を強くcoupleするためstrong convergenceが重要になります。

---

## 7. Ornstein--Uhlenbeckの離散化

$$
dX_t=-\theta X_tdt+\sigma dB_t
$$

なら

$$
\boxed{
X_{n+1}
=(1-\theta h)X_n
+\sigma\sqrt h Z_n
}
$$

です。

これは離散時間AR(1)に非常によく似ています。

連続時間SDEと時系列モデルの接続が数値離散化でも見えます。

---

## 8. geometric Brownian motion

$$
dX_t=\mu X_tdt+\sigma X_tdB_t
$$

へEuler--Maruyamaを適用すると

$$
X_{n+1}
=X_n(1+\mu h+\sigma\sqrt h Z_n).
$$

真の解は正ですが、この離散化はstepによって負値を出す可能性があります。

数値法がモデル固有の構造を保存するとは限りません。

---

## 9. Milstein法への入口

Itô--Taylor展開の次の項を含めると一次元では

$$
X_{n+1}
=X_n+b_nh+\sigma_n\Delta B_n
+\frac12\sigma_n\sigma_n'
\{(\Delta B_n)^2-h\}
$$

というMilstein法が得られます。

適切な条件でstrong order 1まで改善します。

二次変分 $(\Delta B)^2-h$ が数値法にも直接現れています。

---

## 10. Monte Carlo estimatorとの誤差分解

離散SDEを $M$ 本simulationして

$$
\widehat Q_{M,h}
=\frac1M\sum_{i=1}^M g(X_T^{h,(i)})
$$

とします。

すると誤差は概念的に

$$
\boxed{
\widehat Q_{M,h}-E[g(X_T)]
=
\text{sampling error}
+
\text{time discretization bias}
}
$$

です。

標本数 $M$ だけ増やしてもbiasは消えません。

---

## 11. 計算量のbalance

weak biasが $O(h)$、sampling RMSEが $O(M^{-1/2})$ なら、両方を精度 $\varepsilon$ 程度にするため

$$
h=O(\varepsilon),
\qquad
M=O(\varepsilon^{-2})
$$

が基本設計になります。

さらに1 pathあたり $O(h^{-1})$ step必要なので計算量が増えます。

これを改善する一つの方法がMLMCです。

---

## 章末チェック

- Brown増分を正規乱数から生成できる。
- Euler--MaruyamaをSDE積分形から導ける。
- strong convergenceとweak convergenceを区別できる。
- Euler--Maruyamaの典型的strong/weak orderを説明できる。
- OU離散化とAR(1)の類似を説明できる。
- Milstein補正に二次変分が現れる理由を説明できる。
- sampling errorとtime-discretization biasを分離できる。
