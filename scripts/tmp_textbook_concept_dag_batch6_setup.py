from pathlib import Path


def replace_once(path_str, old, new):
    path = Path(path_str)
    text = path.read_text(encoding='utf-8')
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{path}: expected exactly one match, got {count}: {old[:100]!r}')
    path.write_text(text.replace(old, new, 1), encoding='utf-8')

# I3-01 already has a formal test-statistic definition in the prose; sync chapter metadata.
i301 = 'textbook/volumes/03_inference/I3_01_検定の基礎とネイマン_ピアソン理論/chapter.yaml'
replace_once(
    i301,
    '  - { id: I301-DEF-02, name: 棄却域 }\n  - { id: I301-DEF-03, name: 第一種の過誤 }',
    '  - { id: I301-DEF-02, name: 棄却域 }\n  - { id: I301-DEF-02A, name: 検定統計量 }\n  - { id: I301-DEF-03, name: 第一種の過誤 }',
)

# Register high-confidence testing concepts. Avoid naked "検出力" because it can be used loosely;
# the formal concept here is the power function.
dag = Path('textbook/knowledge-dag.yaml')
text = dag.read_text(encoding='utf-8')
if '  - id: null-hypothesis\n' in text:
    raise SystemExit('Batch 6 concepts already registered')
append = '''

  - id: null-hypothesis
    name: 帰無仮説
    aliases:
      - null hypothesis
    introduced_in: I3-01

  - id: alternative-hypothesis
    name: 対立仮説
    aliases:
      - alternative hypothesis
    introduced_in: I3-01

  - id: test-function
    name: 検定関数
    aliases:
      - test function
    introduced_in: I3-01
    requires: [null-hypothesis, alternative-hypothesis]

  - id: rejection-region
    name: 棄却域
    aliases:
      - rejection region
      - critical region
    introduced_in: I3-01
    requires: [test-function]

  - id: test-statistic
    name: 検定統計量
    aliases:
      - test statistic
    introduced_in: I3-01
    requires: [rejection-region]

  - id: type-one-error
    name: 第一種の過誤
    aliases:
      - 第一種過誤
      - type I error
      - Type I error
    introduced_in: I3-01
    requires: [null-hypothesis, rejection-region]

  - id: significance-level
    name: 有意水準
    aliases:
      - significance level
    introduced_in: I3-01
    requires: [type-one-error]

  - id: type-two-error
    name: 第二種の過誤
    aliases:
      - 第二種過誤
      - type II error
      - Type II error
    introduced_in: I3-01
    requires: [alternative-hypothesis, rejection-region]

  - id: power-function
    name: 検出力関数
    aliases:
      - power function
    introduced_in: I3-01
    requires: [type-two-error]

  - id: p-value
    name: P値
    aliases:
      - p-value
      - P-value
    introduced_in: I3-01
    requires: [significance-level, rejection-region]
'''
dag.write_text(text.rstrip() + append, encoding='utf-8')
