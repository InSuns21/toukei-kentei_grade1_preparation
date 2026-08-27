from pathlib import Path

path = Path('textbook/REVIEW_PLAN.md')
text = path.read_text(encoding='utf-8')
heading = '### P4-03 経験分布・乱数生成・Monte Carlo: PASS（読者粒度再レビュー 2026-08-28）'
section = '''### P4-03 経験分布・乱数生成・Monte Carlo: PASS（読者粒度再レビュー 2026-08-28）

- 旧10分割Markdownを `index.md` 1枚へ統合し、`textbook/templates/chapter/index.md` の正本構成へ移行。旧本文ファイルを削除。
- 経験分布関数・標本分位点・一般化逆関数・逆関数法・棄却法・モンテカルロ積分を、具体例から定義・導出へ進む順序で整理。
- 既存数理査読で補強済みの一般化逆関数の正当化、棄却法の台条件と受理後分布、モンテカルロ推定量の不偏性・分散・中心極限定理、反対変数による分散低減を維持。
- Level A〜D 14題と30分ドリルを全件自己完結化し、必要な分布式・独立性・使用可公式を各問題へ記載。問題直後に折りたたみ解答を配置。
- 演習冒頭の一括定義依存、`CDF` / `EDF`、内部管理用 `techniques` / `calculation` / `finishability`、時間戦略のメタ記述を可視本文から除去。
- A/Bにも本番答案・採点基準を補完し、通常演習は全題20点満点へ統一。30分ドリルは100点形式を維持。
- 既存の独立数理査読・試験適合性査読は最終 fatal 0 / major 0 / minor 0。P4-03本体の構造・KaTeX検証を確認し、共通CIで発見した別ファイルの `i.i.d.` 表記揺れも併せて修正。

'''
marker = '### レビュー済み通常章の導入構成統一（2026-08-28）'
if heading not in text:
    if marker not in text:
        raise SystemExit('review insertion marker not found')
    text = text.replace(marker, section + marker, 1)
old_phase = '5. P4-03\n'
new_phase = '5. ~~P4-03 経験分布・乱数生成・Monte Carlo~~（完了）\n\nPhase 2の既存レビュー済み章はすべて完了。\n'
if old_phase in text:
    text = text.replace(old_phase, new_phase, 1)
elif new_phase not in text:
    raise SystemExit('Phase 2 P4-03 line not found')
path.write_text(text, encoding='utf-8')
