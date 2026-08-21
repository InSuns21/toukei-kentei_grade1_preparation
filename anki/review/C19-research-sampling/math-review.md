# C19-research-sampling 独立数理査読

- initial_reviewer_id: c19_math_review
- initial_reviewed_at: 2026-08-21T09:45:33+09:00
- initial_result: fatal: 0 / major: 0 / minor: 0

## 初回指摘

fatal: 0 / major: 0 / minor: 0

指摘なし。

42枚を独立に確認した。研究デザインについては、実験研究と観察研究、無作為割付と無作為抽出、交絡、コホート・症例対照・横断研究の定義と識別条件が整合している。

標本調査については、次を再計算した。

- 単純無作為非復元抽出の1次・2次包含確率、標本平均の設計不偏性、有限母集団補正、母合計・母比率の分散
- 母平均・母比率の必要標本数、比例配分、等費用Neyman配分と数値例
- 等サイズ1段集落抽出、2段抽出の最終包含確率と母合計推定量、系統抽出の標本番号
- Horvitz--Thompson推定量の不偏性と分散、比推定の1次Taylor近似、回帰推定量
- 設計効果と有効標本サイズ、回答者平均の非回答バイアス、逆回答確率重み付き推定量の期待値

数値例はすべて提示式から追跡可能であり、計算結果に誤りはなかった。成立条件も、非復元抽出、等集落サイズ、層間独立、正の包含確率、既知補助平均、正しい回答確率モデルなど、各カード内に必要な範囲で明記されている。`anki/formulae.md` の公式と `anki/syllabus/coverage.yaml` のカード対応も本文と一致する。

## 機械検証

- `npm run anki:validate`: 成功。938 cards、0 warnings、配信HTMLのbuild/check成功。
- `npm run validate`: 成功。structure、KaTeX strict（340 Markdown files）、text validationの全項目成功。

## 修正確認

初回数理査読では修正を要する指摘はなかった。試験適合性査読を受けて行われた次の修正を含め、同一担当が全42枚を再査読した。

- `research-confounding-definition`: 曝露以前の共通原因または適切な代理変数であり、中間変数・合流点ではないという典型条件へ厳密化されている。交絡調整の対象を過不足なく判別できる。
- `sampling-proportion-variance`: $s_y^2=np(1-p)/(n-1)$ を $(1-f)s_y^2/n$ に代入した設計分散推定式 $(1-n/N)p(1-p)/(n-1)$ は正しい。$N=1000,n=100,p=0.3$ の分散約0.00191、標準誤差約0.0437も再計算と一致した。
- `sampling-two-stage-inclusion`、`sampling-two-stage-total`: 公式用語「二段階抽出」への統一は数式の意味を変えず、`anki/formulae.md` と `anki/syllabus/coverage.yaml` とも一致している。

その他39枚についても初回に確認した定義、成立条件、式展開、数値例が維持され、新たな数理上の問題がないことを確認した。

- final_reviewer_id: c19_math_review
- final_reviewed_at: 2026-08-21T09:49:45+09:00
- final_result: fatal: 0 / major: 0 / minor: 0

fatal: 0 / major: 0 / minor: 0

最終機械検証：

- `npm run anki:validate`: 成功。938 cards、0 warnings、配信HTMLのbuild/check成功。
- `npm run validate`: 成功。structure、KaTeX strict（342 Markdown files）、text validationの全項目成功。
