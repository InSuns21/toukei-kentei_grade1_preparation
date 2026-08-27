from pathlib import Path

path = Path('textbook/REVIEW_PLAN.md')
text = path.read_text(encoding='utf-8')

text = text.replace(
    '- Level A〜Dの14題すべてについて、問題単体で分布の密度・母数・順序統計量記号・必要な使用可公式を読めるよう設定を再記載。',
    '- Level A〜D 15題について、問題単体で分布の密度・母数・順序統計量記号・必要な使用可公式を読めるよう設定を再記載。P4-B05として一様分布3個・4個の和を、畳み込みと対称性から手計算で導く演習を追加。'
)

marker = '\n## 優先順\n'
block = '''\n### P4-02 確率変数の収束・大数則・中心極限定理: PASS（2026-08-27）\n\n- 旧10分割Markdownを `index.md` 1枚へ統合し、旧本文ファイルを削除。Level A〜D 14題と30分ドリルを問題直後の折りたたみ解答へ移行。\n- 確率収束・概収束・分布収束を量化記号まで明記し、概収束⇒確率収束⇒分布収束を整理。確率収束列が確率Cauchyになる必要条件も三角不等式から導出。\n- 有限分散の場合の弱大数則を `Var(\\overline X_n)=\\sigma^2/n` とChebyshev不等式から逐行導出し、強大数則と区別。\n- 中心極限定理は独立同分布・有限正分散を明示し、標本平均・標本和の標準化、二項分布の正規近似と連続補正へ接続。\n- 二項分布からポアソン分布への極限を確率質量関数の因子分解から導出し、ドリルでは正確な二項確率とポアソン近似の差まで比較。\n- Slutsky型の定理と平均値の定理から一次のデルタ法を導き、D01で近似分散まで計算。\n- P4-01で追加した読者粒度規約に合わせ、「試験範囲を超えるので〜」「証明暗記を要求しない」等のメタ文を削除。C04で不要だった第二Borel--Cantelli補題も除去。\n- 既存の独立数理査読・試験適合性査読はいずれも最終 fatal 0 / major 0 / minor 0。\n'''

if '### P4-02 確率変数の収束・大数則・中心極限定理: PASS' not in text:
    if marker not in text:
        raise SystemExit('priority marker not found')
    text = text.replace(marker, block + marker, 1)

text = text.replace(
    '8. P4-02 確率変数の収束・大数則・中心極限定理',
    '8. ~~P4-02 確率変数の収束・大数則・中心極限定理~~（完了）'
)

if '8. ~~P4-02 確率変数の収束・大数則・中心極限定理~~（完了）' not in text:
    raise SystemExit('P4-02 priority line not updated')

path.write_text(text, encoding='utf-8')
