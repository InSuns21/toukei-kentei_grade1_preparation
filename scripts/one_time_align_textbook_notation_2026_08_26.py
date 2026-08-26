from pathlib import Path

path = Path('textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md')
text = path.read_text(encoding='utf-8')


def transform_section(text: str, start_heading: str, end_heading: str, fn) -> str:
    start = text.index(start_heading)
    end = text.index(end_heading, start)
    segment = text[start:end]
    return text[:start] + fn(segment) + text[end:]


def finite_partition(segment: str) -> str:
    segment = segment.replace('$H_1,\\ldots,H_m$', '$A_1,\\ldots,A_m$')
    segment = segment.replace('H_i', 'A_i')
    return segment


# 有限分割の「事象」は A_i に統一し、Z/H は確率変数用に残す。
text = transform_section(
    text,
    '#### 有限分割はタワープロパティの特殊形',
    '### 3.6 条件付き分散の計算公式と全分散公式',
    finite_partition,
)
text = transform_section(
    text,
    '#### 有限分割での全分散',
    '### 3.7 条件付き共分散の計算公式と全共分散公式',
    finite_partition,
)
text = transform_section(
    text,
    '#### 有限分割での全共分散',
    '### 3.8 確率母関数の微分',
    finite_partition,
)
text = text.replace(
    '$A_i$ 上で $Z=i$ となる群ラベル $Z$ を作れば',
    '$A_i$ 上で $Z=i$ となる群ラベルを表す確率変数 $Z$ を作れば',
    1,
)


# 典型例も演習と同じ記号導入水準にそろえる。
def example1(segment: str) -> str:
    old = '''### 例1：離散分布の平均と分散

$$
P(X=0)=\\frac14,\\qquad
P(X=1)=\\frac12,\\qquad
P(X=2)=\\frac14
$$

とします。'''
    new = '''### 例1：離散分布の平均と分散

離散型確率変数 $X$ の台を $\\{0,1,2\\}$ とし、確率質量関数を $p_X(x)=P(X=x)$ とします。ここで

$$
p_X(0)=\\frac14,\\qquad
p_X(1)=\\frac12,\\qquad
p_X(2)=\\frac14
$$

とします。'''
    if old not in segment:
        raise RuntimeError('Example 1 opening not found')
    return segment.replace(old, new, 1)


text = transform_section(
    text,
    '### 例1：離散分布の平均と分散',
    '### 例2：タワープロパティと全分散',
    example1,
)
text = text.replace(
    '群ラベル $Z\\in\\{1,2\\}$ が',
    '群ラベルを表す確率変数 $Z\\in\\{1,2\\}$ が',
    1,
)
text = text.replace(
    '$Z\\in\\{0,1\\}$ がそれぞれ確率 $1/2$ で生じ、',
    '群ラベルを表す確率変数 $Z\\in\\{0,1\\}$ がそれぞれ確率 $1/2$ で生じ、',
    1,
)


# P2-B08 では H は群ラベル確率変数。旧来の事象 H_i 記法へ戻さない。
def b08(segment: str) -> str:
    segment = segment.replace(
        '(3) 条件付き共分散の計算公式',
        '(3) 任意の $h\\in\\{0,1\\}$ について、条件付き共分散の計算公式',
        1,
    )
    segment = segment.replace('H_i', 'H=h')
    return segment


text = transform_section(text, '### P2-B08 全共分散', '## Level C：本番標準', b08)

path.write_text(text, encoding='utf-8')
print('Aligned finite-partition events A_i and group-label random variables H/Z.')
