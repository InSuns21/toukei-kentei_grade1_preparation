from pathlib import Path

p = Path('textbook/REVIEW_PLAN.md')
s = p.read_text(encoding='utf-8')

block = '''### S1-01 標本分布とカイ二乗・t・F分布: PASS（2026-08-27）

- 旧10分割Markdownを `index.md` 1枚へ統合し、旧本文ファイルを削除。Level A〜D 14題と30分ドリルを問題直後の折りたたみ解答へ移行。
- 正規標本を平均方向と残差方向へ直交分解し、残差方向の次元が $n-1$ であることから $(n-1)S^2/\\sigma^2\\sim\\chi^2_{n-1}$ を導出。
- 直交変換後の成分独立性から $\\overline X\\perp S^2$ を示し、標準正規変数と独立なカイ二乗変数の比としてt分布を構成。
- 独立二標本の標準化標本分散比からF分布を導出し、逆数で自由度が入れ替わる関係と上側分位点の扱いを演習で確認。
- A/B問題にも本番答案・20点採点基準を補完し、C01/D01の直交分解・射影行列計算は途中式を省かず再現可能な粒度へ統一。
- 通常教材本文から内部管理用の `techniques`・`finishability` 等を除去し、`i.i.d.` や `shape-rate` を日本語主表記へ整理。
- 既存の独立数理査読・試験適合性査読はいずれも最終 fatal 0 / major 0 / minor 0。`Validate textbook` と `Validate terminology` も成功。

'''

marker = '## 優先順\n'
if '### S1-01 標本分布とカイ二乗・t・F分布: PASS' not in s:
    if marker not in s:
        raise SystemExit('priority marker not found')
    s = s.replace(marker, block + marker, 1)

old = '9. S1-01 標本分布とカイ二乗・t・F分布'
new = '9. ~~S1-01 標本分布とカイ二乗・t・F分布~~（完了）'
if old in s:
    s = s.replace(old, new, 1)
if new not in s:
    raise SystemExit('S1-01 priority line not updated')

p.write_text(s, encoding='utf-8')
