from pathlib import Path
import re

ROOT = Path('textbook/volumes/00_foundations')

# This second-pass cleanup is intentionally idempotent. The structural split is
# already committed; here we normalize prose terminology without touching link
# destinations, code blocks, or display math.

def normalize_prose(path):
    path = Path(path)
    if not path.exists():
        return
    lines = path.read_text().splitlines()
    out = []
    in_fence = False
    in_math = False

    for line in lines:
        stripped = line.strip()
        if stripped.startswith('```'):
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue

        # Leave display math untouched. The terminology validator strips it too.
        if stripped.startswith('$$'):
            if stripped.count('$$') == 1:
                in_math = not in_math
            out.append(line)
            continue
        if in_math:
            if '$$' in stripped:
                in_math = False
            out.append(line)
            continue

        # Protect Markdown link destinations and inline code before prose edits.
        protected = []
        def stash(m):
            protected.append(m.group(0))
            return f'@@PROTECTED{len(protected)-1}@@'

        text = re.sub(r'\]\([^\n)]*\)', stash, line)
        text = re.sub(r'`[^`\n]*`', stash, text)

        # Formal Japanese terminology required by validate-terminology.
        text = re.sub(r'\bSLLN\b', '強大数則', text)
        text = re.sub(r'(?<![A-Za-z0-9_])i\.i\.d\.(?![A-Za-z0-9_])', '独立同分布', text, flags=re.I)
        text = re.sub(r'\biid\b', '独立同分布', text, flags=re.I)
        text = re.sub(r'\bMLE\b', '最尤推定量', text)
        text = re.sub(r'\bCLT\b', '中心極限定理', text)
        text = re.sub(r'\bLLN\b', '大数の法則', text)
        text = re.sub(r'\bPMF\b', '確率質量関数', text)
        text = re.sub(r'\bPDF\b', '確率密度関数', text)
        text = re.sub(r'\bCDF\b', '累積分布関数', text)
        text = re.sub(r'\bMSE\b', '平均二乗誤差', text)
        text = re.sub(r'Chebyshev\s*(?:の\s*)?不等式', 'チェビシェフの不等式', text)
        text = re.sub(r'\bCauchy\b(?!\s*(?:--|-|–|—)?\s*Schwarz)', 'コーシー', text)
        text = text.replace('Fisher情報量', 'フィッシャー情報量')

        for i, value in enumerate(protected):
            text = text.replace(f'@@PROTECTED{i}@@', value)
        out.append(text)

    path.write_text('\n'.join(out) + '\n')


# Probability lecture pages and the route pages changed in this branch.
targets = []
for d in ROOT.iterdir():
    if d.is_dir() and d.name.startswith('F0_00P') and (d / 'index.md').exists():
        targets.append(d / 'index.md')
targets += [
    ROOT / 'F0_00R_基礎論ロードマップ/index.md',
    ROOT / 'F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md',
    ROOT / 'F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md',
]
for path in targets:
    normalize_prose(path)

# P7A inherited the old chapter's internal reference. After the split the score
# limit theorem lives in P6A, not P6.
p7a = ROOT / 'F0_00P7A_MLE_一致性_漸近正規性/index.md'
s = p7a.read_text()
s = s.replace('したがってP6の中心極限定理から', 'したがって [P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md) から')
p7a.write_text(s)

# Keep separator normalization idempotent after prose edits.
for path in targets:
    if not path.exists():
        continue
    s = path.read_text()
    while '\n---\n\n---\n' in s:
        s = s.replace('\n---\n\n---\n', '\n---\n')
    path.write_text(s)

print('PROBABILITY_TERMINOLOGY_CLEANUP_DONE')
for path in targets:
    print(path)
