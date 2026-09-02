from pathlib import Path

# ---------------------------------------------------------------------------
# 1. Harden validate-proof-folding: numbered proof headings + hidden proof ends
# ---------------------------------------------------------------------------
p = Path('scripts/validate-proof-folding.mjs')
s = p.read_text()
old = r'''function isProofHeading(line) {
  const m = /^(#{2,6})\s+(.+?)\s*$/.exec(line);
  if (!m) return false;
  const title = normalizeTitle(m[2]);
  return /^(?:完全)?証明(?:\s*(?:[（(].*[）)]|[:：].*))?$/u.test(title)
    || /^proof(?:\s*(?:[（(].*[）)]|[:：].*))?$/iu.test(title);
}
'''
new = r'''function isProofHeading(line) {
  const m = /^(#{2,6})\s+(.+?)\s*$/.exec(line);
  if (!m) return false;
  const title = normalizeTitle(m[2]);
  const unnumbered = title.replace(/^\d+(?:\.\d+)*(?:[.)．])?\s*/u, '');
  return /^(?:完全)?証明(?:\s*(?:[（(].*[）)]|[:：].*))?$/u.test(unnumbered)
    || /^proof(?:\s*(?:[（(].*[）)]|[:：].*))?$/iu.test(unnumbered)
    || /(?:^|.+)(?:完全)?証明(?:\s*[:：].*)?$/u.test(unnumbered);
}

function isProofCompletionLine(line) {
  const plain = line.replace(/^\s*>\s?/, '').trim();
  return /(?:これで|以上で|よって).{0,40}(?:証明されました|証明が完成|証明できました|証明した|示されました)/u.test(plain)
    || /(?:\\square|□)\s*$/u.test(plain);
}
'''
if old not in s:
    if 'function isProofCompletionLine(line)' not in s:
        raise SystemExit('validate-proof-folding: isProofHeading marker not found')
else:
    s = s.replace(old, new, 1)

needle = r'''    if (proofLike && proofDepth === 0 && solutionDepth === 0) {
      errors.push(`${rel}:${lineNo}: visible proof section found outside a collapsible proof block`);
    }
'''
replacement = r'''    if (proofLike && proofDepth === 0 && solutionDepth === 0) {
      errors.push(`${rel}:${lineNo}: visible proof section found outside a collapsible proof block`);
    }

    if (isProofCompletionLine(line) && proofDepth === 0 && solutionDepth === 0) {
      errors.push(`${rel}:${lineNo}: proof-completion prose found outside a collapsible proof block`);
    }
'''
if needle in s:
    s = s.replace(needle, replacement, 1)
elif 'proof-completion prose found outside a collapsible proof block' not in s:
    raise SystemExit('validate-proof-folding: insertion marker not found')
p.write_text(s)
print('hardened validate-proof-folding')

# ---------------------------------------------------------------------------
# 2. Add the expanded audit command to package.json
# ---------------------------------------------------------------------------
p = Path('package.json')
s = p.read_text()
needle = '    "audit:proof-pedagogy": "node scripts/audit-proof-pedagogy.mjs",\n'
add = needle + '    "audit:formalism-pedagogy": "node scripts/audit-formalism-pedagogy.mjs",\n'
if '"audit:formalism-pedagogy"' not in s:
    if needle not in s:
        raise SystemExit('package.json audit marker not found')
    s = s.replace(needle, add, 1)
p.write_text(s)
print('added audit:formalism-pedagogy')

# ---------------------------------------------------------------------------
# 3. Persist human round-3 classifications in the expanded audit generator
# ---------------------------------------------------------------------------
p = Path('scripts/audit-formalism-pedagogy.mjs')
s = p.read_text()
marker = "report.push('この監査自体は文章品質のヒューリスティックなので非ブロッキングとする。ただし、人手確認で FIX-FOLD と確定したパターンは `validate:proof-folding` 側へ一般化し、将来の再発をブロックする。');\nreport.push('');\n"
manual = marker + r'''
report.push('## 2026-09-02 人手監査 round 3');
report.push('');
report.push('機械上位候補を本文まで読み、スコアだけでは区別できない「本当に折りたたむべき完全証明」と「導出が多いだけの教材」を分離した。');
report.push('');
report.push('| 講義 | 人手判定 | 対応 |');
report.push('|---|---|---|');
report.push('| F0-02C6 Hahn--Banach | **FIX-FOLD** | 一次元延長 → extension poset → chain上界 → Zorn → 全空間、の完全証明を折りたたむ。見取り図は本文に残す。 |');
report.push('| F0-02C1A Hilbert射影定理 | **FIX-FOLD** | 最小化列 → Cauchy → 完備性 → 閉性 → 一意性、の完全証明を折りたたむ。 |');
report.push('| F0-00WK2 Lax--Milgram | **FIX-FOLD** | Rieszで作用素化 → coercivity → 単射/閉range → 稠密 → 全射 → 安定性、を一つの完全証明として折りたたむ。 |');
report.push('| F0-02C7A representer theorem | **FIX-FOLD** | `3. 証明：...` が従来CIをすり抜けていた。representer theoremの証明だけ折りたたみ、kernel SVMの導出は本文に残す。 |');
report.push('| F0-00P5 強大数則 | **FIX-FOLD** | 最大不等式 → dyadic化 → Borel--Cantelli → gap filling の完全証明を折りたたむ。冒頭/章末の証明地図は残す。 |');
report.push('| F0-00E2 Cauchy--Schwarz | **FIX-FOLD** | Cauchy--Schwarzと等号条件の完全証明を折りたたむ。三角不等式・Bessel・Parsevalの意味付けは本文に残す。 |');
report.push('| F0-02C2 Riesz表現 | **FIX-FOLD** | kernelへの射影を使うRiesz表現の完全証明を折りたたむ。有限次元・積分・評価汎関数の具体例は本文に残す。 |');
report.push('| F0-02B 分離/Farkas | **FIX-FOLD + FIX-EXAMPLE** | 最近点 → 分離 → 錐分離 → Farkas が長い証明鎖。次ラウンドで低次元例を先に置き、技術証明を分割して折りたたむ。 |');
report.push('| F0-00D5 Vitali | **FIX-FOLD** | 問いと構成は良いが、章全体が非可測性の完全証明。構成の地図を残し詳細な排反・被覆・2ケース矛盾を折りたたむ。 |');
report.push('| F0-00SP3 Brown運動 | **OK / FIX-EXERCISE** | 共分散・martingale・二次変分の計算は説明的導出。存在定理は意図的に黒箱化済み。証明偏重ではない。 |');
report.push('| F0-00D4 Lebesgue測度 | **OK-PROOF-TODO / FIX-EXERCISE** | 構成の導線は良い。未完の完全証明は別のproof audit TODOとして管理されており、現状を「完全証明」と誤認して折りたたまない。 |');
report.push('| F0-00TS2 Herglotz | **OK-BLACKBOX / FIX-EXERCISE** | Herglotzの完全証明を意図的に黒箱化し、white noise・line spectrum・periodogramへ応用している。 |');
report.push('| F0-00FA2 Fourier変換 | **OK / FIX-EXERCISE** | 畳み込み・微分・PDEへの導出は教材本体。Riemann--Lebesgueは黒箱であることを明示済み。 |');
report.push('| F0-00P7A MLE漸近論 | **FIX-EXAMPLE** | consistency + score CLT + Hessian LLN + Taylor + Slutsky の導線は良い。Bernoulli/正規など具体モデルを追加する余地がある。 |');
report.push('');
report.push('### CIへ昇格する事項');
report.push('');
report.push('今回、人手で `FIX-FOLD` と確認したページから二つの再発パターンが確定した。');
report.push('');
report.push('1. `## 3. 証明：...`、`## 4. 最大不等式の証明` のような **節番号付き証明見出し**。');
report.push('2. 見出しを証明と呼ばず本文を続け、最後だけ `これで...証明されました` とする **隠れ完全証明**。');
report.push('');
report.push('これらは文章品質の曖昧なスコアではなく、完全証明の折りたたみ規約そのものなので `validate:proof-folding` のブロッキング対象へ昇格する。');
report.push('');
'''
if '## 2026-09-02 人手監査 round 3' not in s:
    if marker not in s:
        raise SystemExit('formalism audit human-review marker not found')
    s = s.replace(marker, manual, 1)
p.write_text(s)
print('persisted human round3 classifications')
