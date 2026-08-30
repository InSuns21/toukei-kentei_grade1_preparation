# E2-05 数理レビュー

## 対象

- `index.md`
- `chapter.yaml`
- `glossary.yaml`
- `applied-rikou-80/advanced/30_state_space.md` との接続

## 確認事項

- スカラー予測式 $m_t^-=am_{t-1}^+$、$P_t^-=a^2P_{t-1}^++q$ を独立性から導出している。
- 観測予測分散 $S_t=c^2P_t^-+r$ を確認した。
- $\operatorname{Cov}(x_t,y_t)=cP_t^-$ から Kalman gain $K_t=cP_t^-/S_t$ を条件付き正規公式で導出している。
- 更新分散 $P_t^+=(1-K_tc)P_t^-$ はスカラー条件付き分散と一致する。
- 行列形 $P_t^-=FP_{t-1}^+F^{\mathsf T}+Q$、$S_t=HP_t^-H^{\mathsf T}+R$、$K_t=P_t^-H^{\mathsf T}S_t^{-1}$、$P_t^+=(I-K_tH)P_t^-$ の次元整合を確認した。
- AR(2) の companion form は状態 $[y_t,y_{t-1}]^{\mathsf T}$ に対して正しい。
- イノベーション尤度の符号、行列式、二次形式を確認した。
- 数値演習 B01、B03、C01、DRILL-01 を再計算し一致した。
- Validate textbook と Validate terminology の初回CIがともに success であることを確認した。

## 結論

**PASS**。数理上の重大な問題は見当たらず、自動検証とも整合した。
