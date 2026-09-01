# F0-00MLMC Encore V：Multilevel Monte Carlo

fine mesh・小さいtime stepほど正確ですが、一sampleが高価です。

Multilevel Monte Carloは、複数のresolutionを同時に使って計算量を減らします。

---

## 1. level hierarchy

近似quantityを

$$
Q_0,Q_1,\dots,Q_L
$$

とし、levelが上がるほど精密とします。

例えば

$$
h_\ell=2^{-\ell}h_0
$$

というFEM meshやSDE time stepです。

---

## 2. telescoping identity

恒等的に

$$
\boxed{
E[Q_L]
=E[Q_0]
+
\sum_{\ell=1}^L
E[Q_\ell-Q_{\ell-1}]
}
$$

です。

MLMCの数学的出発点はこのtelescoping sumだけです。

---

## 3. level estimator

$$
Y_0=Q_0,
\qquad
Y_\ell=Q_\ell-Q_{\ell-1}
$$

と置きます。

各levelで

$$
\widehat Y_\ell
=\frac1{N_\ell}
\sum_{i=1}^{N_\ell}Y_\ell^{(i)}
$$

を計算し

$$
\boxed{
\widehat Q_{ML}
=\sum_{\ell=0}^L\widehat Y_\ell
}
$$

とします。

---

## 4. couplingが核心

$Q_\ell$ と $Q_{\ell-1}$ を独立に生成してはいけません。

**同じ基礎乱数・同じrandom field realizationを使ってcouple**します。

するとfineとcoarseが強く相関し

$$
\operatorname{Var}(Q_\ell-Q_{\ell-1})
$$

が小さくなります。

MC2のcommon random numbersが主役へ昇格しました。

---

## 5. なぜfine levelでsampleが少なくてよいか

levelが細かくなると

$$
Q_\ell-Q_{\ell-1}\to0
$$

なので、適切なcouplingの下で

$$
V_\ell
=\operatorname{Var}(Y_\ell)
$$

も減少します。

一方、一sampleのcost $C_\ell$ は増加します。

そこで

- coarse：安いがvariance大 → sampleを多く
- fine：高いが差のvariance小 → sampleを少なく

と配分します。

---

## 6. estimator variance

level間を独立にsamplingすれば

$$
\boxed{
\operatorname{Var}(\widehat Q_{ML})
=
\sum_{\ell=0}^L
\frac{V_\ell}{N_\ell}
}
$$

です。

総costは

$$
\boxed{
C_{tot}
=
\sum_{\ell=0}^LN_\ell C_\ell
}
$$

です。

---

## 7. optimal sample allocation

目標varianceを固定してcostを最小化すると、Lagrange multiplierから概ね

$$
\boxed{
N_\ell
\propto
\sqrt{\frac{V_\ell}{C_\ell}}
}
$$

となります。

より正確には全体のvariance制約に合わせて共通比例係数を決めます。

varianceが大きくcostが安いlevelへ多くsampleを置く、という直感が式になっています。

---

## 8. biasは最fine levelで決まる

MLMCは

$$
E[Q_L]
$$

を効率よく推定しますが、真値 $E[Q]$ との差

$$
E[Q-Q_L]
$$

は残ります。

したがって $L$ はbiasが許容誤差以下になるよう選びます。

$$
\boxed{
\operatorname{MSE}
=
\text{bias}^2
+
\sum_\ell\frac{V_\ell}{N_\ell}
}
$$

です。

---

## 9. 典型的complexity model

level幅 $h_\ell$ に対し

$$
|E[Q-Q_\ell]|=O(h_\ell^\alpha),
$$

$$
V_\ell=O(h_\ell^\beta),
$$

$$
C_\ell=O(h_\ell^{-\gamma})
$$

とします。

- $\alpha$：biasの収束
- $\beta$：level差varianceの減少
- $\gamma$：sample costの増加

です。

この三指数でMLMCの効率が決まります。

---

## 10. MLMC complexity theoremの景色

標準的な条件の下でRMSE $\varepsilon$ を達成するcostは概ね

$$
\boxed{
C_{MLMC}=\begin{cases}
O(\varepsilon^{-2}),&\beta>\gamma,\\
O(\varepsilon^{-2}(\log\varepsilon)^2),&\beta=\gamma,\\
O\left(\varepsilon^{-2-(\gamma-\beta)/\alpha}\right),&\beta<\gamma.
\end{cases}}
$$

となります。

plain Monte Carloを全sample fine levelで行うより大幅に安くなる場合があります。

---

## 11. SDEでのcoupling

Euler--Maruyamaならfine stepのBrown incrementsを二つ足してcoarse incrementを作ります。

$$
\Delta B_{coarse}
=\Delta B_{fine,1}+\Delta B_{fine,2}.
$$

これでfine/coarse pathが同じBrown運動を共有し、差のvarianceを小さくできます。

strong convergenceがMLMCで重要だった理由です。

---

## 12. FEMでのcoupling

random PDEなら同じ係数realization $a(x,\omega)$ を粗meshと細meshの両方で解き

$$
Y_\ell
=Q(u_{h_\ell}(\omega))
-Q(u_{h_{\ell-1}}(\omega))
$$

を取ります。

mesh refinementとMonte Carloが完全に一体化します。

---

## 13. adaptive MLMC

実務では $V_\ell,C_\ell$ を事前に正確には知りません。

pilot samplesから推定し

- level追加が必要か
- 各 $N_\ell$ を何本にするか

をadaptiveに決めます。

数値解析は定理だけでなく計算予算配分の理論でもあります。

---

## 14. Encore Vの全体回収

ここまでで

$$
\boxed{
\begin{array}{c}
\text{conditioning/stability}\\
\downarrow\\
\text{sparse linear algebra}\\
\downarrow\\
\text{FEM discretization}
\end{array}
\qquad
\begin{array}{c}
\text{LLN/CLT}\\
\downarrow\\
\text{Monte Carlo}\\
\downarrow\\
\text{variance reduction}
\end{array}
}
$$

が

$$
\boxed{
\text{random PDE / SDE}
\to
\text{coupled multilevel approximation}
\to
\text{MLMC}
}
$$

で合流しました。

---

## 章末チェック

- telescoping identityを導ける。
- MLMC estimatorを定義できる。
- couplingがvariance reductionの核心であることを説明できる。
- level estimatorのvarianceとcostを書ける。
- $N_\ell\propto\sqrt{V_\ell/C_\ell}$ の意味を説明できる。
- biasとsampling varianceを分離できる。
- $\alpha,\beta,\gamma$ によるcomplexityの違いを説明できる。
- SDEとFEMの両方でfine/coarse couplingを説明できる。
