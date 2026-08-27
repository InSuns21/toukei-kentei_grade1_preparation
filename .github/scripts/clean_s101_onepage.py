from pathlib import Path
import re

p = Path('textbook/volumes/03_inference/S1_01_標本分布とカイ二乗_t_f分布/index.md')
s = p.read_text(encoding='utf-8')

# Remove level headings accidentally captured at the end of the preceding problem block.
for level in ('B', 'C', 'D'):
    bad = f'\n\n## Level {level}\n\n<!-- solution-start -->'
    s = s.replace(bad, '\n\n<!-- solution-start -->')

# Internal authoring metadata does not belong in learner-facing prose.
s = re.sub(r'^- (?:techniques|calculation|finishability|subproblem_minutes):.*\n', '', s, flags=re.M)

# Use Japanese full terms rather than opaque abbreviations/English parameterization labels.
s = s.replace(r'\overset{\mathrm{i.i.d.}}{\sim}', r'\overset{\text{独立同分布}}{\sim}')
s = s.replace('これは shape-rate 表示の $\\operatorname{Gamma}(\\nu/2,1/2)$ であるから',
              'これは形状母数 $\\nu/2$、率母数 $1/2$ のガンマ分布 $\\operatorname{Gamma}(\\nu/2,1/2)$ であるから')
s = s.replace('Beta積分', 'ベータ積分')
s = s.replace('分布の台・母数・密度と略語は [分布・略語の共通索引]',
              '分布記法の共通規約は [分布・略語の共通索引]')

# There must be exactly one visible level heading for each level.
for level in 'ABCD':
    count = len(re.findall(rf'^## Level {level}$', s, flags=re.M))
    if count != 1:
        raise SystemExit(f'Level {level} heading count = {count}')

for banned in ['i.i.d.', 'shape-rate', 'finishability:', 'techniques:', 'calculation:', 'subproblem_minutes:']:
    if banned in s:
        raise SystemExit(f'banned/internal text remains: {banned}')

if s.count('<!-- solution-start -->') != 15 or s.count('<!-- solution-end -->') != 15:
    raise SystemExit('solution marker count mismatch')
controls = [(i, ord(ch)) for i, ch in enumerate(s) if ord(ch) < 32 and ch not in '\n\r']
if controls:
    raise SystemExit(f'control characters found: {controls[:10]}')

p.write_text(s, encoding='utf-8')
