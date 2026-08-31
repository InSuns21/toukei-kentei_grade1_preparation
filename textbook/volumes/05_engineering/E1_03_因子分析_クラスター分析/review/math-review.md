# E1-03 数理レビュー

## 対象

- `index.md`
- `chapter.yaml`
- `glossary.yaml`
- E1-01 分散共分散行列との接続
- E1-02 主成分分析との接続

## 確認事項

- 共通因子モデル $X=\Lambda F+\varepsilon$ に対して $\operatorname{Cov}(F)=I$、$\operatorname{Cov}(\varepsilon)=\Psi$、$\operatorname{Cov}(F,\varepsilon)=O$ から $\Sigma=\Lambda\Lambda^{\mathsf T}+\Psi$ を正しく導出している。
- $\Psi$ を対角とする基本モデルでは非対角共分散が $\sum_j\lambda_{ij}\lambda_{kj}$ になることを確認した。
- 直交因子モデルの共通性 $h_i^2=\sum_j\lambda_{ij}^2$、標準化変数での独自性 $\psi_i=1-h_i^2$ を確認した。
- 因子負荷量を因子との相関として読む条件を、因子分散1かつ観測変数分散1の場合に限定している。
- 直交回転 $\Lambda^*=\Lambda T$ に対し $TT^{\mathsf T}=I$ から $\Lambda^*(\Lambda^*)^{\mathsf T}=\Lambda\Lambda^{\mathsf T}$ が成り立ち、共通性も行ノルム保存により不変であることを確認した。
- B02 の45度回転で $\Lambda^*=2^{-1/2}[[0.9,-0.7],[0.9,-0.5],[1.0,0.6]]$ となることを再計算した。
- C02 の $\Lambda\Lambda^{\mathsf T}$ は `[[0.65,0.58,0.24],[0.58,0.53,0.30],[0.24,0.30,0.68]]` であることを再計算した。
- 1因子モデル C01 の再現相関は $r_{12}=0.48,r_{13}=0.24,r_{23}=0.18$、独自性は $(0.36,0.64,0.91)$ で整合する。
- 単連結・完全連結・群平均の定義は、それぞれ最小・最大・全点対距離平均で正しい。
- Ward 法の結合コスト $\Delta(A,B)=n_An_B/(n_A+n_B)\|\bar x_A-\bar x_B\|^2$ を群内平方和の分解から導出している。
- B03 の Ward コストは $\Delta(A,B)=16$、$\Delta(B,C)=12.5/3\approx4.17$、$\Delta(A,C)=84.5/3\approx28.17$ で、$B,C$ が次に結合される。
- k-means の固定クラスタに対する目的関数を $Q(m)=Q(\bar x)+n\|\bar x-m\|^2$ と分解し、最適中心が標本平均であることを導出している。
- B04 の更新後中心は $(0,1),(4,1)$、WSS は4である。
- ドリルの Ward コストは $\Delta(A,B)=16$、$\Delta(B,C)=24.5/3\approx8.17$ で $B,C$ 結合となる。
- PCAと因子分析について、PCAが全分散の最大化・圧縮、因子分析が共通因子モデルによる共分散説明であるという区別は数理的に整合している。
- PR の最終コミットで `Validate textbook` と `Validate terminology` がともに success であることを確認する。

## 結論

**PASS**。数理上の重大な問題は見当たらない。最終自動検証の成功をもって reviewed とする。
