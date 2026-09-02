# F0-00R4 Encore IV：Stochastic Processes & Spectral Time Series

この系列は、確率論「それどこから来た？」とEncore IIのFourier解析を、確率過程・時系列解析へ延長する任意の発展補講です。

通常カリキュラムE2の必須前提にはしません。E2-01〜E2-03は試験向け本編として独立に読めます。

---

## 1. 推奨通読ルート

```text
F0-00P3  条件付き期待値
F0-00P4  確率収束・一様可積分性
F0-00P6  特性関数・中心極限定理
F0-02C1  Hilbert空間
F0-00FA2 Fourier変換
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
E2-03 AR・MA・ARIMA本編
   ↓
F0-00TS3 線形filter・ARMA transfer function・周波数領域
```

---

## 2. filtrationとmartingale

filtration

$$
\mathcal F_s\subset\mathcal F_t\qquad(s\le t)
$$

を時刻ごとの情報として導入し、adapted process・stopping timeを定義します。

martingaleは

$$
E[M_t\mid\mathcal F_s]=M_s
$$

という条件付き期待値の時間整合性として扱い、optional stoppingでは一様可積分性などの条件がなぜ必要かを確認します。

---

## 3. Brown運動からItoへ

Brown運動を連続path・独立定常Gaussian増分で定義し

$$
\operatorname{Cov}(B_s,B_t)=\min(s,t),
\qquad
[B]_t=t
$$

を導きます。

二次変分が0でないため通常のchain ruleでは足りず、Ito積分・Ito公式が必要になります。

$$
\begin{aligned}
df(t,X_t)
={}&
\left(
\partial_tf+b\partial_xf+\frac12\sigma^2\partial_{xx}f
\right)dt\\
&+\sigma\partial_xf\,dB_t.
\end{aligned}
$$

---

## 4. SDEからPDEへ

SDEのgenerator

$$
Lf=bf'+\frac12\sigma^2f''
$$

からbackward/forward Kolmogorov equation、Fokker--Planck equationへ進みます。

Brown運動では

$$
L=\frac12\Delta
$$

となり熱方程式を回収します。

低正則性PDEはEncore IIIのSobolev弱解へ接続します。

---

## 5. 時系列をHilbert空間で読む

二次定常過程を $L^2(\Omega)$ のベクトル列として扱い、過去が張る閉部分空間への射影を最良線形予測とします。

$$
\widehat X_t=P_{\mathcal H_{t-1}}X_t.
$$

innovationからWold decompositionへ進みます。

---

## 6. spectral representation

Herglotz定理から

$$
\gamma(h)
=
\int_{-\pi}^{\pi}e^{ih\lambda}\,dF(\lambda)
$$

というspectral measureを導入します。

絶対連続な場合だけ

$$
dF(\lambda)=f(\lambda)d\lambda
$$

としてspectral densityを持ちます。

white noiseのflat spectrumとdeterministic sinusoidのline spectrumを比較します。

---

## 7. ARMAをfilterとして読む

E2-03の

$$
\phi(B)X_t=\theta(B)\varepsilon_t
$$

を周波数領域へ移すと

$$
H(\lambda)
=
\frac{\theta(e^{-i\lambda})}{\phi(e^{-i\lambda})}
$$

で

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac{|\theta(e^{-i\lambda})|^2}
{|\phi(e^{-i\lambda})|^2}}
$$

となります。

一階差分のfrequency responseは

$$
|1-e^{-i\lambda}|^2=4\sin^2(\lambda/2)
$$

なので、0周波数を除くhigh-pass filterとして読めます。

---

## 8. Encore IIIとの交点

```text
Brown運動 → white noise → Schwartz超関数
    │
    └→ SDE → generator → PDE → Sobolev弱解
```

Encore IIIはIVの必須前提ではありませんが、低正則性を掘る場合の受け皿です。

---

## 9. E2本編との役割分担

E2-01〜E2-03は試験対策本編としてMarkov連鎖、Poisson過程・ランダムウォーク、AR・MA・ARIMAを直接扱います。

- E2：解けるようにする
- Encore IV：なぜその構造が自然なのかを地下から理解する

という役割分担です。

---

## 10. 停止線

Encore IVはfiltration、martingale、Brown運動、Ito積分・SDE、generator・Kolmogorov/Fokker--Planck、Hilbert空間予測、Wold、spectral measure、ARMA frequency-domain analysisまでで閉じます。

semimartingale一般論、Girsanov、local time、stochastic PDE、一般ergodic theorem、fractional Brownian motion等は必須にしません。

目安は約40時間です。

---

## 11. 次のEncore：SDEを実際に計算する

SP4でSDEまで到達した後、sample path・期待値を計算機上で近似したい場合は

[Encore V：Numerical Analysis, FEM & Monte Carlo](../F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)

へ進みます。

Encore VではBrown増分からEuler--Maruyamaを構成し、strong/weak convergenceを区別してMonte Carloへ接続します。

Encore IVのスペクトル時系列枝だけが目的なら、Encore Vは読む必要はありません。

---

## 12. 最終的な景色

```text
条件付き期待値
      ↓
 filtration → martingale → Brown運動 → Ito → SDE → generator → PDE
                                          │
                                          └→ Encore V 数値SDE / Monte Carlo

L2 Hilbert空間
      ↓
定常過程の予測 → innovation → Wold → spectral measure → ARMA filter
```

**Encore IV: Stochastic Processes & Spectral Time Series** はここまでです。


### Probabilityからの二つの入口

- martingale・stopping time枝は **P3A 条件付き期待値** から入る。
- Hilbert予測・Wold枝は **P3B L2射影・最良予測** から入る。

標準通読では両方読めるが、machine-readable prerequisiteは各枝で必要な方だけにする。
