from pathlib import Path
import re

ROOT = Path('textbook/volumes/00_foundations')

# This pass is intentionally idempotent. The structural split is already
# committed; here we normalize prose terminology without touching link
# destinations, code blocks, or display math.

ASCII_TOKEN = lambda token: rf'(?<![A-Za-z0-9_]){token}(?![A-Za-z0-9_])'


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

        # Python \b treats Japanese letters as word characters, while the
        # JavaScript validator treats \b as an ASCII-word boundary here. Use
        # explicit ASCII lookarounds so `MLE一致性` and `CLTを` are normalized.
        text = re.sub(ASCII_TOKEN(r'SLLN'), '強大数則', text)
        text = re.sub(r'(?<![A-Za-z0-9_])i\.i\.d\.(?![A-Za-z0-9_])', '独立同分布', text, flags=re.I)
        text = re.sub(ASCII_TOKEN(r'iid'), '独立同分布', text, flags=re.I)
        text = re.sub(ASCII_TOKEN(r'MLE'), '最尤推定量', text)
        text = re.sub(ASCII_TOKEN(r'CLT'), '中心極限定理', text)
        text = re.sub(ASCII_TOKEN(r'LLN'), '大数の法則', text)
        text = re.sub(ASCII_TOKEN(r'PMF'), '確率質量関数', text)
        text = re.sub(ASCII_TOKEN(r'PDF'), '確率密度関数', text)
        text = re.sub(ASCII_TOKEN(r'CDF'), '累積分布関数', text)
        text = re.sub(ASCII_TOKEN(r'MSE'), '平均二乗誤差', text)
        text = re.sub(r'Chebyshev\s*(?:の\s*)?不等式', 'チェビシェフの不等式', text)
        text = re.sub(r'(?<![A-Za-z0-9_])Cauchy(?![A-Za-z0-9_])(?!\s*(?:--|-|–|—)?\s*Schwarz)', 'コーシー', text)
        text = text.replace('Fisher情報量', 'フィッシャー情報量')

        for i, value in enumerate(protected):
            text = text.replace(f'@@PROTECTED{i}@@', value)
        out.append(text)

    path.write_text('\n'.join(out) + '\n')


# Probability lecture pages only. Do not accidentally include PDE1/PDE2/PDE3.
targets = []
probability_dir = re.compile(r'^F0_00P(?:_|[1-7])')
for d in ROOT.iterdir():
    if d.is_dir() and probability_dir.match(d.name) and (d / 'index.md').exists():
        targets.append(d / 'index.md')
targets += [
    ROOT / 'F0_00R_基礎論ロードマップ/index.md',
    ROOT / 'F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md',
    ROOT / 'F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md',
]
for path in targets:
    normalize_prose(path)

# P7A inherited the old chapter's internal reference. After acronym
# normalization the score limit theorem must point to P6A, not P6.
p7a = ROOT / 'F0_00P7A_MLE_一致性_漸近正規性/index.md'
s = p7a.read_text()
old_candidates = [
    'したがってP6の中心極限定理から',
    'したがって P6の中心極限定理から',
]
for old in old_candidates:
    if old in s:
        s = s.replace(old, 'したがって [P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md) から')
        break
else:
    if 'P6Aの中心極限定理' not in s:
        raise SystemExit('P7A P6A bridge target missing')
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
