# E1-01 数理レビュー

- 線形変換: $E[A\boldsymbol X+\boldsymbol b]=A\boldsymbol\mu+\boldsymbol b$、$\operatorname{Cov}(A\boldsymbol X)=A\Sigma A^{\mathsf T}$ を定義から確認。
- 標本平均: 独立同分布標本で $E[\bar{\boldsymbol X}]=\boldsymbol\mu$、$\operatorname{Cov}(\bar{\boldsymbol X})=\Sigma/n$ を確認。
- Mahalanobis距離: 正定値 $\Sigma$ の下で白色化し、正規モデルなら距離二乗が $\chi_p^2$ になる導出を確認。
- 条件付き正規: 残差化で共分散0を作り、同時正規性から独立へ進む条件を確認。
- 線形判別: 共通 $\Sigma$ の正規密度比で $\boldsymbol x^{\mathsf T}\Sigma^{-1}\boldsymbol x$ が相殺され、線形境界になることを確認。
- 数値例: 各2次元行列の逆行列、二次形式、判別境界を再計算済み。
- 判定: PASS候補。自動検証後に確定。
