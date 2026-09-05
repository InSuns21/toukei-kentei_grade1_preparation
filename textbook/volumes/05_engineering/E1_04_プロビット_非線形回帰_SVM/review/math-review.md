# E1-04 数理レビュー

## 対象

- `index.md`
- `chapter.yaml`
- `glossary.yaml`
- L2-01 一般化線形モデルとの接続
- L1-01 最小二乗法との接続

## 確認事項

### プロビット分析

- 潜在変数 $Y^*=x^{\mathsf T}\beta+\varepsilon$、$\varepsilon\sim N(0,1)$、$Y=1\Leftrightarrow Y^*>0$ から $P(Y=1\mid x)=\Phi(x^{\mathsf T}\beta)$ を正しく導出している。
- 一般の誤差標準偏差 $\sigma$ を自由にすると $\Phi(x^{\mathsf T}\beta/\sigma)$ となり、$\beta$ と $\sigma$ は比でしか識別されないため $\sigma=1$ の正規化が必要であることを確認した。
- Bernoulli対数尤度から $\partial\ell_i/\partial p_i=(y_i-p_i)/\{p_i(1-p_i)\}$ を得て、$dp_i/d\eta_i=\phi(\eta_i)$ を連鎖させたスコア式が正しい。
- 限界効果 $\partial p/\partial x_j=\phi(\eta)\beta_j$ を確認した。
- A02 の数値 $0.3989\times0.8=0.31912$ を確認した。
- C01 の尤度 $0.5\times0.8413=0.42065$、対数尤度 $\log(0.42065)\approx-0.866$ を確認した。

### 非線形回帰

- $x^2$ や $\log x$ の使用だけでは未知母数に非線形とは限らないという区別は正しい。
- 正規加法誤差モデルの対数尤度は定数項を除き $-RSS(\theta)/(2\sigma^2)$ であり、$\theta$ のMLEが非線形最小二乗に一致する。
- 残差 $r=y-f(\theta)$ とJacobian $J=\partial f/\partial\theta$ に対し、$\nabla RSS=-2J^{\mathsf T}r$ である。
- 一次近似 $f(\theta+\delta)\approx f(\theta)+J\delta$ から $r_{new}\approx r-J\delta$、正規方程式 $J^{\mathsf T}J\delta=J^{\mathsf T}r$、Gauss--Newton更新式を正しく導出している。
- 指数減衰 $f=\alpha e^{-\beta x}$ の偏微分は $\partial f/\partial\alpha=e^{-\beta x}$、$\partial f/\partial\beta=-\alpha x e^{-\beta x}$ である。
- C02 の提示行列に対して $\delta\approx(0.5015,0.1454)^{\mathsf T}$、更新後 $(2.0015,0.5454)$ を再計算した。
- $\sigma^2(J^{\mathsf T}J)^{-1}$ は局所線形化に基づく近似分散として位置付けており、有限標本の厳密式とはしていない。
- 加法誤差モデルを対数変換すると誤差構造が変わることを明記している。

### SVM

- 超平面までの距離から正規化後の支持超平面間距離が $2/\|w\|$ になる導出を確認した。
- ハードマージン主問題 $\min \|w\|^2/2$ subject to $y_i(w^{\mathsf T}x_i+b)\ge1$ は正しい。
- Lagrangianの停留条件から $w=\sum_i\alpha_i y_i x_i$、$\sum_i\alpha_i y_i=0$ を得て、双対目的関数の符号・係数が正しいことを確認した。
- KKT相補性 $\alpha_i\{y_i(w^{\mathsf T}x_i+b)-1\}=0$ とサポートベクトルの説明は整合している。
- 2点例 $(-1,-1),(1,+1)$ では双対目的関数 $2\alpha-2\alpha^2$、最適 $\alpha=1/2$、$w=1,b=0$ を確認した。
- C03 の $yf$ は $(2,0.2,0.4,2)$、hinge損失は $(0,0.8,0.6,0)$、目的関数値は $0.5+1.4=1.9$ である。
- ソフトマージンで最小スラックが $\max(0,1-yf)$ となるためhinge損失表現へ移る説明は正しい。
- 双対問題が内積だけに依存することからカーネル置換へ接続しており、確率出力との混同も避けている。

### 自動検証

- 初回 `Validate textbook` は本文生成時のバックスラッシュ2箇所が制御文字化したためKaTeXで停止したが、数理内容の誤りではなかった。
- エスケープ修正後、`Validate textbook` と `Validate terminology` はともに success。
- curriculum とシラバス監査を E1-04 reviewed に更新し、最新 main の直上へ差分を整理したコミットでも両チェックの success を確認した。

## 結論

**PASS**。数理上の重大な問題は見当たらず、自動検証とも整合した。

## 2026-09-05 公式シラバス用語 Batch 1 再査読

- 対象: トービット分析・プロビットとの区別・検閲尤度
- 結果: fatal 0 / major 0 / minor 0
- 確認: 公式用語の導入位置、定義と具体例の整合、演習での再使用、既存章との重複・境界を再確認した。
