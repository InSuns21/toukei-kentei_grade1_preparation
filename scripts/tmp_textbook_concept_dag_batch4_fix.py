from pathlib import Path


def replace_once(path_str, old, new):
    path = Path(path_str)
    text = path.read_text(encoding='utf-8')
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{path}: expected exactly one match, got {count}: {old[:100]!r}')
    path.write_text(text.replace(old, new, 1), encoding='utf-8')


# 1) P2-01: promote the existing local definition of unbiased estimator to a formal bridge definition.
p201 = 'textbook/volumes/01_probability/P2_01_確率変数_pmf_pdf_cdf/index.md'
replace_once(
    p201,
    '''推定量 $T$ が推定対象 $\\alpha$ に対して

$$
E_\\alpha[T]=\\alpha
$$

を満たすとき、$T$ を $\\alpha$ の不偏推定量という。''',
    '''<a id="def-p2-01-unbiased-estimator"></a>

<!-- formal-statement-start -->
> **定義（不偏推定量）**  
> 推定量 $T$ が推定対象 $\\alpha$ に対して

$$
E_\\alpha[T]=\\alpha
$$

> を満たすとき、$T$ を $\\alpha$ の不偏推定量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-p2-01-unbiased-estimator -->
**定義の確認**  
問5では $E_\\alpha[\\widehat\\alpha]=\\alpha$ を示せれば、この定義から $\\widehat\\alpha$ は $\\alpha$ の不偏推定量だと判定できます。
<!-- definition-example-end -->''',
)

p201_yaml = 'textbook/volumes/01_probability/P2_01_確率変数_pmf_pdf_cdf/chapter.yaml'
replace_once(
    p201_yaml,
    '  - 離散・連続・混合分布を見分けLevel Cを20〜30分で記述できる\ndefinitions:',
    '  - 離散・連続・混合分布を見分けLevel Cを20〜30分で記述できる\n  - 期待値の応用として、$E_\\theta[T]=\\theta$ から不偏推定量を判定できる\ndefinitions:',
)
replace_once(
    p201_yaml,
    '  - { id: P2-DEF-05, name: 同時分布と周辺分布 }\ntheorems:',
    '  - { id: P2-DEF-05, name: 同時分布と周辺分布 }\n  - { id: P2-DEF-06, name: 不偏推定量 }\ntheorems:',
)

# 2) DAG: P2-01 is a real early bridge introduction; I1-02 remains the estimator-evaluation reintroduction.
dag = 'textbook/knowledge-dag.yaml'
replace_once(
    dag,
    '''  - id: unbiased-estimator
    name: 不偏推定量
    aliases:
      - unbiased estimator
    introduced_in: I1-02''',
    '''  - id: unbiased-estimator
    name: 不偏推定量
    aliases:
      - unbiased estimator
    # P2-01 で期待値の応用として最小限を正式導入し、I1-02 で推定量評価として再導入する。
    introduced_in: [P2-01, I1-02]''',
)

# 3) S1-02: the closing mention of log-likelihood is explicitly a next-chapter preview.
s102_yaml = 'textbook/volumes/03_inference/S1_02_統計量_十分性_分解定理/chapter.yaml'
replace_once(
    s102_yaml,
    '''forward_references:
  - consistency''',
    '''forward_references:
  - consistency
  - log-likelihood-function''',
)

# 4) E2-05: innovation likelihood is a real learning objective, so likelihood construction is a genuine prerequisite.
e205_yaml = 'textbook/volumes/05_engineering/E2_05_状態空間モデル/chapter.yaml'
replace_once(
    e205_yaml,
    '''prerequisites:
  - E2-03
  - E1-01
  - F0-00''',
    '''prerequisites:
  - E2-03
  - E1-01
  - F0-00
  - I1-01''',
)

curriculum = 'textbook/curriculum.yaml'
replace_once(
    curriculum,
    '  - { id: E2-05, title: 状態空間モデル, volume: engineering, prerequisites: [ E2-03, E1-01, F0-00 ], official_scope:',
    '  - { id: E2-05, title: 状態空間モデル, volume: engineering, prerequisites: [ E2-03, E1-01, F0-00, I1-01 ], official_scope:',
)
