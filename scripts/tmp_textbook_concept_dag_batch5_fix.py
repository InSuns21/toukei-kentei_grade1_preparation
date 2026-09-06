from pathlib import Path


def replace_once(path_str, old, new):
    path = Path(path_str)
    text = path.read_text(encoding='utf-8')
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{path}: expected exactly one match, got {count}: {old[:120]!r}')
    path.write_text(text.replace(old, new, 1), encoding='utf-8')

# 1) Narrow MSE to estimator-specific semantics; naked MSE also means PCA/prediction error.
replace_once(
    'textbook/knowledge-dag.yaml',
    '''  - id: mean-squared-error
    name: 平均二乗誤差
    aliases:
      - MSE
      - mean squared error
      - mean-squared error
    introduced_in: I1-02''',
    '''  - id: estimator-mean-squared-error
    name: 推定量の平均二乗誤差
    aliases:
      - estimator MSE
      - mean squared error of an estimator
      - mean-squared error of an estimator
    introduced_in: I1-02''',
)

# 2) S1-01 explicitly previews later confidence intervals.
s101 = 'textbook/volumes/03_inference/S1_01_標本分布とカイ二乗_t_f分布/chapter.yaml'
replace_once(
    s101,
    '''prerequisites:
  - P3-02
  - P3-03
  - P4-02
official_scope:''',
    '''prerequisites:
  - P3-02
  - P3-03
  - P4-02
forward_references:
  - confidence-interval
official_scope:''',
)

# 3) Regression chapter uses interval estimation as real machinery; make I2-02 a prerequisite.
l101 = 'textbook/volumes/04_linear_models/L1_01_単回帰と最小二乗法/chapter.yaml'
replace_once(
    l101,
    '''  - S1-01
  - F0-00
official_scope:''',
    '''  - S1-01
  - F0-00
  - I2-02
official_scope:''',
)

# 4) Bayesian chapter already links I2-02 as prerequisite knowledge and compares credible/confidence intervals.
i401 = 'textbook/volumes/03_inference/I4_01_ベイズ推定_事後分布_予測分布/chapter.yaml'
replace_once(
    i401,
    '''  - I1-01
  - P1-02
  - P3-04
official_scope:''',
    '''  - I1-01
  - P1-02
  - P3-04
  - I2-02
official_scope:''',
)

# 5) Keep curriculum prerequisite source of truth synchronized.
curriculum = 'textbook/curriculum.yaml'
replace_once(
    curriculum,
    '  - { id: L1-01, title: 単回帰と最小二乗法, volume: linear_models, prerequisites: [ P2-02, P3-02, S1-01, F0-00 ], official_scope:',
    '  - { id: L1-01, title: 単回帰と最小二乗法, volume: linear_models, prerequisites: [ P2-02, P3-02, S1-01, F0-00, I2-02 ], official_scope:',
)
replace_once(
    curriculum,
    '  - { id: I4-01, title: ベイズ推定・事後分布・予測分布, volume: inference, prerequisites: [ I1-01, P1-02, P3-04 ], official_scope:',
    '  - { id: I4-01, title: ベイズ推定・事後分布・予測分布, volume: inference, prerequisites: [ I1-01, P1-02, P3-04, I2-02 ], official_scope:',
)
