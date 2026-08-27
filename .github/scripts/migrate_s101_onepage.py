from pathlib import Path
import re

base = Path('textbook/volumes/03_inference/S1_01_標本分布とカイ二乗_t_f分布')

def read(name):
    return (base / name).read_text(encoding='utf-8')

def drop_h1(text):
    lines = text.splitlines()
    if lines and lines[0].startswith('# '):
        lines = lines[1:]
    return '\n'.join(lines).strip()

# Core chapter sections
overview = read('00_overview.md').strip()
overview = overview.replace(
    '\n\n分位点表の数値暗記は目的ではない。問題で必要な分位点は与えられるものとして、どの分布・自由度・上側または下側を選ぶかを重視する。',
    ''
)
motivation = drop_h1(read('01_motivation.md'))
definitions = drop_h1(read('02_definitions.md'))
definitions = definitions.replace('本教材では上側確率で添字を付ける。', '以後、上側確率で添字を付ける。')
theorems = drop_h1(read('03_theorems.md'))
theorems = re.sub(r'^## この節で使う分布\n.*?(?=^## S1-THM-01)', '', theorems, flags=re.M | re.S).strip()
examples = drop_h1(read('04_examples.md'))
examples = examples.replace('ここでは検定判断はまだ行わず、自由度と標準化を確認する。', '')
problem_solving = drop_h1(read('05_problem_solving.md'))

# Remove split-file-only wording from problems.
exercises = read('06_exercises.md')
exercises = exercises.replace('（検定の正式な定義はI3-01で扱う）', '')
exercises = exercises.replace('（検定の正式な定義はI3-03で扱う）', '')

# Parse exercise blocks.
exercise_matches = list(re.finditer(r'^### (S1-[ABCD]\d{2}) ([^\n]+)\n', exercises, flags=re.M))
exercise_blocks = {}
exercise_titles = {}
for i, m in enumerate(exercise_matches):
    end = exercise_matches[i + 1].start() if i + 1 < len(exercise_matches) else len(exercises)
    block = exercises[m.start():end].strip()
    exercise_blocks[m.group(1)] = block
    exercise_titles[m.group(1)] = m.group(2).strip()

expected = [f'S1-{level}{num:02d}' for level, n in [('A',4),('B',4),('C',5),('D',1)] for num in range(1, n+1)]
if set(exercise_blocks) != set(expected):
    raise SystemExit(f'exercise IDs mismatch: {sorted(exercise_blocks)}')

# Parse detailed solutions.
solutions = read('07_solutions.md')
solution_part = solutions.split('## 完成形本番答案', 1)[0]
sol_matches = list(re.finditer(r'^## (S1-[ABCD]\d{2})\n', solution_part, flags=re.M))
detailed = {}
for i, m in enumerate(sol_matches):
    end = sol_matches[i + 1].start() if i + 1 < len(sol_matches) else len(solution_part)
    detailed[m.group(1)] = solution_part[m.end():end].strip()

# Replace the two most important derivations with fully reproducible versions.
detailed['S1-C01'] = r'''**方針。** 標準化した正規標本ベクトルを、標本平均を表す1方向と、それに直交する残差の $n-1$ 方向へ分けます。

1. 正規変数の線形結合なので
$$
\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

2. 各 $i$ について
$$
X_i-\mu=(X_i-\overline X)+(\overline X-\mu)
$$
です。二乗して足すと
$$
\begin{aligned}
\sum_{i=1}^n(X_i-\mu)^2
&=\sum_{i=1}^n(X_i-\overline X)^2\\
&\quad+2(\overline X-\mu)\sum_{i=1}^n(X_i-\overline X)
+n(\overline X-\mu)^2.
\end{aligned}
$$
ここで
$$
\sum_{i=1}^n(X_i-\overline X)=\sum_{i=1}^nX_i-n\overline X=0
$$
なので
$$
\sum_{i=1}^n(X_i-\mu)^2
=\sum_{i=1}^n(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$

3. 標準化ベクトルと平均方向を
$$
\boldsymbol Z=\frac1\sigma
\begin{pmatrix}X_1-\mu\\ \vdots\\ X_n-\mu\end{pmatrix},
\qquad
\boldsymbol e=\frac1{\sqrt n}(1,\ldots,1)^{\mathsf T}
$$
と置きます。$\boldsymbol Z\sim N_n(\boldsymbol0,\boldsymbol I_n)$ で、
$$
\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}\sigma.
$$
残差は $\sum_i(X_i-\overline X)=0$ を満たすので、$n$ 方向のうち1方向が制約され、残差方向の次元は $n-1$ です。

4. 第一行を $\boldsymbol e^{\mathsf T}$ とする直交行列 $\boldsymbol A$ を取り、
$$
\boldsymbol W=\boldsymbol A\boldsymbol Z
$$
と置きます。すると
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol A\boldsymbol A^{\mathsf T})
=N_n(\boldsymbol0,\boldsymbol I_n),
$$
したがって $W_1,\ldots,W_n$ は独立な標準正規変数です。また直交変換は長さを保つので
$$
\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2
=\sum_{j=2}^nW_j^2.
$$
よって
$$
\frac{(n-1)S^2}{\sigma^2}
=\sum_{j=2}^nW_j^2
\sim\chi^2_{n-1}.
$$

5. $W_1$ は標本平均だけを表し、$S^2$ は $W_2,\ldots,W_n$ の平方和だけで決まります。$W_1$ と $(W_2,\ldots,W_n)$ は独立なので
$$
\overline X\perp S^2.
$$'''

detailed['S1-D01'] = r'''1. 
$$
\boldsymbol Z=\frac1\sigma
\begin{pmatrix}X_1-\mu\\ \vdots\\ X_n-\mu\end{pmatrix},
\qquad
\boldsymbol e=\frac1{\sqrt n}(1,\ldots,1)^{\mathsf T}
$$
と置きます。平均方向への射影行列を
$$
\boldsymbol P=\boldsymbol e\boldsymbol e^{\mathsf T},
$$
残差方向への射影行列を
$$
\boldsymbol M=\boldsymbol I_n-\boldsymbol P
$$
とすると、平均成分は $\boldsymbol P\boldsymbol Z$、残差成分は $\boldsymbol M\boldsymbol Z$ です。

2. $\boldsymbol M^{\mathsf T}=\boldsymbol M$ であり、$\boldsymbol P^2=\boldsymbol P$ から
$$
\boldsymbol M^2=(\boldsymbol I_n-\boldsymbol P)^2
=\boldsymbol I_n-\boldsymbol P=\boldsymbol M.
$$
また $\boldsymbol M\boldsymbol e=\boldsymbol0$ で、$\boldsymbol e$ に直交する $n-1$ 次元部分空間では恒等写像として働くため
$$
\operatorname{rank}(\boldsymbol M)=n-1.
$$
第一行を $\boldsymbol e^{\mathsf T}$ とする直交行列 $\boldsymbol A$ を取り、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置くと
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n).
$$
さらに
$$
\frac{(n-1)S^2}{\sigma^2}
=\|\boldsymbol M\boldsymbol Z\|^2
=\sum_{j=2}^nW_j^2
\sim\chi^2_{n-1}.
$$

3. 
$$
W_1=\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}\sigma
$$
で、$W_1$ と $W_2,\ldots,W_n$ は独立です。したがって
$$
\overline X\perp S^2.
$$

4. 
$$
Z_0=\frac{\sqrt n(\overline X-\mu)}\sigma\sim N(0,1),
\qquad
Q=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $Z_0\perp Q$ なので
$$
\frac{\sqrt n(\overline X-\mu)}S
=\frac{Z_0}{\sqrt{Q/(n-1)}}
\sim t_{n-1}.
$$

5. 独立な第二標本について
$$
Q_j=\frac{(n_j-1)S_j^2}{\sigma_j^2}\sim\chi^2_{n_j-1}
\qquad(j=1,2)
$$
を作ると $Q_1\perp Q_2$ です。したがって
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.
$$'''

# Parse existing C/D exam answers.
exam_part = solutions.split('## 完成形本番答案', 1)[1].split('## 小問別採点', 1)[0]
exam_matches = list(re.finditer(r'^### (S1-[CD]\d{2})\n', exam_part, flags=re.M))
exam_answers = {}
for i, m in enumerate(exam_matches):
    end = exam_matches[i + 1].start() if i + 1 < len(exam_matches) else len(exam_part)
    exam_answers[m.group(1)] = exam_part[m.end():end].strip()

# Concise exam answers for A/B.
exam_answers.update({
'S1-A01': r'''$Q\sim\chi^2_6$ より
$$
E[Q]=6,\qquad \operatorname{Var}(Q)=12.
$$''',
'S1-A02': r'''独立な正規変数の平均なので
$$
\overline X\sim N\left(3,\frac4{16}\right)=N\left(3,\frac14\right).
$$''',
'S1-A03': r'''正規標本のt統計量より
$$
\frac{\sqrt9(\overline X-\mu)}S\sim t_8.
$$''',
'S1-A04': r'''F分布の逆数関係より
$$
W^{-1}\sim F_{12,5}.
$$''',
'S1-B01': r'''$X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ より
$$
\sum_i(X_i-\mu)^2
=\sum_i(X_i-\overline X)^2
+2(\overline X-\mu)\sum_i(X_i-\overline X)
+n(\overline X-\mu)^2.
$$
$\sum_i(X_i-\overline X)=0$ だから
$$
\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$''',
'S1-B02': r'''$$
Q=\frac{11S^2}{9}\sim\chi^2_{11}.
$$
したがって
$$
P(6\leq S^2\leq12)
=P\left(\frac{22}{3}\leq Q\leq\frac{44}{3}\right).
$$''',
'S1-B03': r'''$$
t=\frac{\sqrt{25}(52-50)}{10}=1,
\qquad \text{自由度}=24.
$$''',
'S1-B04': r'''等分散の下で
$$
\frac{S_1^2}{S_2^2}\sim F_{9,15},
\qquad
\frac{s_1^2}{s_2^2}=\frac85=1.6.
$$''',
})

rubrics = {
'S1-A01': '平均10点、分散10点。合計20点。',
'S1-A02': '標本平均の平均・分散8点、正規分布としての結論12点。合計20点。',
'S1-A03': 't統計量の形10点、自由度8の特定10点。合計20点。',
'S1-A04': '逆数関係10点、自由度の順を逆にした結論10点。合計20点。',
'S1-B01': '二乗展開8点、交差項が0になる説明8点、最終恒等式4点。合計20点。',
'S1-B02': 'カイ二乗化8点、両端の標準化8点、確率表示4点。合計20点。',
'S1-B03': '統計量の式8点、数値計算6点、自由度6点。合計20点。',
'S1-B04': 'F分布と自由度12点、観測比8点。合計20点。',
'S1-C01': '各小問4点。標本平均、平方和分解、自由度、カイ二乗分布、独立性をそれぞれ採点する。合計20点。',
'S1-C02': '各小問4点。カイ二乗化、確率変形、平均、分散、上側確率の意味をそれぞれ採点する。合計20点。',
'S1-C03': '各小問4点。標準正規化、カイ二乗化、独立性、t分布の構成、数値比較をそれぞれ採点する。合計20点。',
'S1-C04': '各小問4点。二つのカイ二乗変数、独立性、標準化分散比、等分散時の簡約、上側点との比較をそれぞれ採点する。合計20点。',
'S1-C05': '各小問4点。補集合、逆数による事象変換、自由度逆転、標本分散への適用、答案確認をそれぞれ採点する。合計20点。',
'S1-D01': '各小問4点。射影表示、残差平方和と階数、独立性、t分布、二標本F分布をそれぞれ採点する。合計20点。',
}

for key in expected:
    if key not in detailed or key not in exam_answers or key not in rubrics:
        raise SystemExit(f'missing material for {key}')

exercise_parts = ['# 演習']
for level in 'ABCD':
    exercise_parts.append(f'## Level {level}')
    for key in [k for k in expected if k[3] == level]:
        block = exercise_blocks[key]
        exercise_parts.append(block)
        exercise_parts.append('<!-- solution-start -->')
        exercise_parts.append('#### 詳細解答\n\n' + detailed[key])
        exercise_parts.append('#### 本番答案\n\n' + exam_answers[key])
        exercise_parts.append('#### 採点基準\n\n' + rubrics[key])
        exercise_parts.append('<!-- solution-end -->')
exercise_section = '\n\n'.join(exercise_parts)

# Drill: keep the problem, fold detailed solution + exam answer, remove time-gate/meta rescue prose.
drill = read('08_exam_drill.md').strip()
drill = drill.replace('問題文・数値・設問順は転載しない。', '')
drill = re.sub(r'\n3で止まった場合は.*?を使ってよい。\n', '\n', drill, flags=re.S)
drill = drill.split('## 時間ゲート', 1)[0].rstrip()
pre, post = drill.split('## 詳細解答', 1)
if '## 完成形本番答案' not in post:
    raise SystemExit('drill exam answer not found')
detail_drill, exam_drill = post.split('## 完成形本番答案', 1)
drill_section = (
    pre.rstrip()
    + '\n\n<!-- solution-start -->\n\n## 詳細解答\n\n'
    + detail_drill.strip()
    + '\n\n## 本番答案\n\n'
    + exam_drill.strip()
    + '\n\n## 採点基準\n\n各小問20点。分布・自由度、独立性の根拠、t・Fの生成表現、観測比と上側点の比較を小問ごとに採点する。合計100点。\n\n<!-- solution-end -->'
)

past = drop_h1(read('09_past_exam_practice.md'))
past = past.replace('## 実過去問演習\n\n問題文・図表は転載しない。問題は公式問題集で確認し、第三者索引はテーマ照合にだけ用いる。\n\n', '')

index = '\n\n---\n\n'.join([
    overview,
    '# なぜ三つの分布が必要か\n\n' + motivation,
    '# 定義\n\n' + definitions,
    '# 定理と導出\n\n' + theorems,
    '# 典型例\n\n' + examples,
    '# 問題解決の型\n\n' + problem_solving,
    exercise_section,
    drill_section,
    '# 過去問との対応\n\n' + past,
]) + '\n'

# Final reader-granularity and text checks.
for banned in ['覚える必要', '試験では', '本章の目的', '本教材では', 'ここでは検定判断']:
    if banned in index:
        raise SystemExit(f'banned meta phrase remains: {banned}')
controls = [(i, ord(ch)) for i, ch in enumerate(index) if ord(ch) < 32 and ch not in '\n\r']
if controls:
    raise SystemExit(f'control characters found: {controls[:10]}')
if index.count('<!-- solution-start -->') != 15 or index.count('<!-- solution-end -->') != 15:
    raise SystemExit('solution marker count mismatch')

(base / 'index.md').write_text(index, encoding='utf-8')

# Delete legacy split files only after index generation succeeds.
for name in [
    '00_overview.md','01_motivation.md','02_definitions.md','03_theorems.md','04_examples.md',
    '05_problem_solving.md','06_exercises.md','07_solutions.md','08_exam_drill.md','09_past_exam_practice.md'
]:
    (base / name).unlink()
