# E1-02 数理レビュー

- 最大分散原理: 単位長制約の下で $\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a$ を最大化し、Lagrange未定乗数法から $\Sigma\boldsymbol a=\lambda\boldsymbol a$ が出ることを確認。
- 主成分分散: 単位固有ベクトル方向では $\operatorname{Var}(Z_j)=\lambda_j$ を確認。
- 無相関性: $\operatorname{Cov}(Z_i,Z_j)=\lambda_j\boldsymbol a_i^{\mathsf T}\boldsymbol a_j=0$ を確認。
- 全分散: $\operatorname{tr}(\Sigma)=\sum_j\lambda_j$ を確認。
- 再構成: $A_mA_m^{\mathsf T}$ が直交射影であり、平均二乗再構成誤差が $\sum_{j>m}\lambda_j$ になることを確認。
- 尺度: 正の尺度変更で相関行列は不変だが分散共分散行列は変化することを確認。
- 数値例: $\begin{pmatrix}4&2\\2&4\end{pmatrix}$、$\begin{pmatrix}5&2\\2&2\end{pmatrix}$、$\begin{pmatrix}1&0.8\\0.8&1\end{pmatrix}$ の固有値・固有ベクトルを再計算済み。
- 判定: PASS候補。自動検証後に確定。
