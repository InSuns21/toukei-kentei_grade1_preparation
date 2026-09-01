# F0-00R4 Encore IV：Stochastic Processes & Spectral Time Series

この系列は、確率論「それどこから来た？」とEncore IIのFourier解析を、確率過程・時系列解析へ延長する任意の発展補講です。

通常カリキュラムE2の必須前提にはしません。E2-01〜E2-03は試験向け本編として独立に読めます。

ただしEncore IVへ入った場合は、未定義の主要概念を飛ばさず次の順で進みます。

---

## 1. 推奨通読ルート

```text
既存前提
F0-00P3  条件付き期待値
F0-00P4  確率収束・一様可積分性
F0-00P6  特性関数・CLT
F0-02C1  Hilbert空間
F0-00FA2 Fourier変換
   │
   └── Encore IV START
          ↓
F0-00SP1 filtration・adapted process・stopping time
          ↓
F0-00SP2 martingale・optional stopping
          ↓
F0-00SP3 Brown運動・Gaussian過程・二次変分
          ↓
F0-00SP4 Ito積分・Ito公式・SDE
          ↓
F0-00SP5 generator・Kolmogorov・Fokker--Planck
          ↓
F0-00TS1 定常過程・Hilbert予測・innovation・Wold
          ↓
F0-00TS2 Herglotz・spectral measure・spectral density
          ↓
E2-03     AR・MA・ARIMA本編（既読なら復習不要）
          ↓
F0-00TS3 線形filter・ARMA transfer function・周波数領域
```

---

## 2. SP1：時間と情報を同時に持つ

確率過程だけでなく

$$
\mathcal F_s\subset\mathcal F_t
\qquad(s\le t)
$$

というfiltrationを導入します。

- adapted process
- natural filtration
- stopping time

を通して、「未来を見ずに時間発展を扱う」条件を固定します。

---

## 3. SP2：martingale

$$
E[M_t\mid\mathcal F_s]=M_s
$$

という条件付き期待値の時間整合性からmartingaleを定義します。

離散ランダムウォーク、$S_n^2-n\sigma^2$、条件付き期待値martingaleを扱い、optional stoppingでは一様可積分性などの条件がなぜ必要かまで戻ります。

---

## 4. SP3：Brown運動

Brown運動を

- 連続path
- 独立定常Gaussian増分
- $B_t-B_s\sim N(0,t-s)$

で定義し、

$$
\operatorname{Cov}(B_s,B_t)=\min(s,t)
$$

を導きます。

さらに

$$
[B]_t=t
$$

という二次変分を計算し、通常の微積分では二階微小量を捨てられないことを確認します。

---

## 5. SP4：Ito積分とSDE

simple predictable processから

$$
\int H_t\,dB_t
$$

を定義し、Ito isometryで $L^2$ 極限へ拡張します。

二次変分から

$$
df(X_t)
=
\left(
\partial_tf+b\partial_xf+rac12\sigma^2\partial_{xx}f
\right)dt
+
\sigma\partial_xf\,dB_t
$$

を導き、幾何Brown運動・OU過程を解きます。

---

## 6. SP5：確率過程とPDEを合流する

SDEのgenerator

$$
Lf=bf'+\frac12\sigma^2f''
$$

から

- backward Kolmogorov equation
- forward Kolmogorov equation
- Fokker--Planck equation

へ進みます。

Brown運動なら

$$
L=\frac12\Delta
$$

なので熱方程式を回収します。

この時点でEncore II・IIIのPDE側と確率過程側が合流します。

---

## 7. TS1：予測をHilbert空間の射影にする

二次定常過程を $L^2(\Omega)$ のベクトル列として扱います。

過去が張る閉部分空間

$$
\mathcal H_{t-1}
=
\overline{\operatorname{span}}
\{X_{t-1},X_{t-2},\dots\}
$$

への射影

$$
\widehat X_t
=P_{\mathcal H_{t-1}}X_t
$$

が最良線形予測です。

予測誤差innovationは過去に直交し、Wold分解

$$
X_t
=X_t^{(d)}+
\sum_{j=0}^\infty\psi_j\varepsilon_{t-j}
$$

へ進みます。

---

## 8. TS2：自己共分散をFourier変換する

Herglotz定理から

$$
\gamma(h)
=
\int_{-\pi}^{\pi}
e^{ih\lambda}\,dF(\lambda)
$$

というspectral measureを導入します。

絶対連続なら

$$
dF(\lambda)=f(\lambda)d\lambda
$$

で、

$$
\gamma(h)
=
\int e^{ih\lambda}f(\lambda)d\lambda
$$

です。

white noiseはflat spectrum、deterministic sinusoidはline spectrumを持ちます。

---

## 9. TS3：ARMAをfilterとして読む

E2-03の

$$
\phi(B)X_t=\theta(B)\varepsilon_t
$$

を周波数領域へ移すと

$$
H(\lambda)
=
\frac{\theta(e^{-i\lambda})}
{\phi(e^{-i\lambda})}
$$

で、

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac{|\theta(e^{-i\lambda})|^2}
{|\phi(e^{-i\lambda})|^2}}
$$

です。

一階差分は

$$
|1-e^{-i\lambda}|^2
=4\sin^2(\lambda/2)
$$

なので、0周波数を除くhigh-pass filterとして読めます。

---

## 10. Encore IIIとの交点

連続時間white noiseはBrown運動の通常の微分ではなく、Schwartz超関数的な微分として扱います。

またKolmogorov/Fokker--Planck PDEが低正則性しか持たない場合は、Encore IIIのSobolev空間・弱解が必要です。

```text
Brown運動 ─→ white noise ─→ Schwartz超関数
    │
    └→ SDE ─→ generator ─→ PDE ─→ Sobolev弱解
```

Encore IIIはIVの必須前提ではありませんが、交点を掘る場合の受け皿になります。

---

## 11. E2本編との関係

E2-01〜E2-03は試験対策本編として

- Markov連鎖
- Poisson過程・ランダムウォーク
- AR・MA・ARIMA

を直接扱います。

Encore IVはそれらを置き換えません。

- E2：解けるようにする
- Encore IV：なぜその構造が自然なのかを地下から理解する

という役割分担です。

---

## 12. Encore IVの停止線

本系列は次までで閉じます。

- filtration / stopping time
- martingale / optional stopping
- Brown運動・二次変分
- Ito積分・Ito公式
- 基本SDE
- generator・Kolmogorov・Fokker--Planck
- 定常過程のHilbert空間予測
- Wold decomposition
- Herglotz / spectral measure
- ARMA spectral density・linear filter

以下は必須にしません。

- semimartingale一般論
- Girsanov定理
- local time
- stochastic PDE
- mixing・ergodic theoremの一般論
- multivariate spectral analysis
- long memory / fractional Brownian motion
- Wiener--Hopf・一般Wiener filter

---

## 13. 所要時間

本編8講とロードマップを合計して、読解・小演習・復習込みで概ね

$$
\boxed{40\text{ 時間前後}}
$$

を想定します。

---

## 14. 最終的な景色

```text
条件付き期待値
      ↓
 filtration
      ↓
 martingale
      ↓
 Brown運動 → Ito → SDE → generator → PDE
                                   ↓
                              Encore III

L2 Hilbert空間
      ↓
定常過程の予測
      ↓
innovation → Wold
      ↓
spectral measure
      ↓
Fourier解析
      ↓
ARMA / ARIMA filter
      ↓
E2-03へ帰還
```

**Encore IV: Stochastic Processes & Spectral Time Series** はここまでです。
