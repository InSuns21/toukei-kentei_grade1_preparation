from pathlib import Path


def replace_once(path_str, old, new):
    path = Path(path_str)
    text = path.read_text(encoding='utf-8')
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{path}: expected exactly one match, got {count}: {old[:100]!r}')
    path.write_text(text.replace(old, new, 1), encoding='utf-8')

# Promote ancillary statistic from prose definition to a formal definition + example.
s102 = 'textbook/volumes/03_inference/S1_02_統計量_十分性_分解定理/index.md'
replace_once(
    s102,
    '''## 24. 付随統計量との対比

**付随統計量**は、その分布が未知母数に依存しない統計量です。

十分統計量が「母数情報を集める」側なのに対し、付随統計量は「分布自体が母数を含まない」側です。

本章では深入りしませんが、両者を同じ言葉だと思わないことが重要です。''',
    '''## 24. 付随統計量との対比

<a id="def-s1-02-ancillary-statistic"></a>

<!-- formal-statement-start -->
> **定義（付随統計量）**
> 統計量 $A(X)$ の分布が未知母数 $\\theta$ に依存しないとき、$A$ を $\\theta$ に対する**付随統計量**という。
<!-- formal-statement-end -->

十分統計量が「母数情報を集める」側なのに対し、付随統計量は「分布自体が母数を含まない」側です。

<!-- definition-example-start: def-s1-02-ancillary-statistic -->
**定義の確認**
$X_1,X_2$ が独立に $N(\\mu,\\sigma^2)$ に従い、$\\sigma^2$ は既知、$\\mu$ が未知とします。このとき

$$
A=X_1-X_2\\sim N(0,2\\sigma^2)
$$

であり、$A$ の分布に未知母数 $\\mu$ は現れません。したがって $X_1-X_2$ は $\\mu$ に対する付随統計量です。
<!-- definition-example-end -->

十分統計量と付随統計量は役割が逆向きなので、同じ概念だと思わないことが重要です。''',
)

s102_yaml = 'textbook/volumes/03_inference/S1_02_統計量_十分性_分解定理/chapter.yaml'
replace_once(
    s102_yaml,
    '  - 一様最小分散不偏推定量とLehmann--Schefféの定理を説明し、ベルヌーイ標本で標本平均が一様最小分散不偏推定量になることを示せる\ndefinitions:',
    '  - 一様最小分散不偏推定量とLehmann--Schefféの定理を説明し、ベルヌーイ標本で標本平均が一様最小分散不偏推定量になることを示せる\n  - 付随統計量を「分布が未知母数に依存しない統計量」として定義し、十分統計量との役割の違いを説明できる\ndefinitions:',
)
replace_once(
    s102_yaml,
    '  - { id: S102-DEF-06, name: 一様最小分散不偏推定量 }\ntheorems:',
    '  - { id: S102-DEF-06, name: 一様最小分散不偏推定量 }\n  - { id: S102-DEF-07, name: 付随統計量 }\ntheorems:',
)
replace_once(
    s102_yaml,
    'canonical_examples: [ベルヌーイ標本の成功回数, ポアソン標本の標本和, 指数分布の標本和, 一様分布の標本最大値, 正規分布の十分統計量, 指数型分布族, ベルヌーイ標本の完備性とRao--Blackwell化, Bernoulli標本平均のUMVU性]',
    'canonical_examples: [ベルヌーイ標本の成功回数, ポアソン標本の標本和, 指数分布の標本和, 一様分布の標本最大値, 正規分布の十分統計量, 指数型分布族, ベルヌーイ標本の完備性とRao--Blackwell化, Bernoulli標本平均のUMVU性, 正規位置母数モデルの付随統計量]',
)

# Append high-confidence estimator/interval concepts.
dag = Path('textbook/knowledge-dag.yaml')
text = dag.read_text(encoding='utf-8')
if '  - id: method-of-moments\n' in text:
    raise SystemExit('Batch 5 concepts already registered')
append = '''

  - id: method-of-moments
    name: モーメント法
    aliases:
      - method of moments
      - method-of-moments
    introduced_in: I1-02

  - id: least-squares-method
    name: 最小二乗法
    aliases:
      - least squares method
      - least-squares method
    introduced_in: I1-02

  - id: estimator-bias
    name: 推定量のバイアス
    aliases:
      - estimator bias
      - bias of an estimator
    introduced_in: I1-02

  - id: mean-squared-error
    name: 平均二乗誤差
    aliases:
      - MSE
      - mean squared error
      - mean-squared error
    introduced_in: I1-02

  - id: ancillary-statistic
    name: 付随統計量
    aliases:
      - ancillary statistic
    introduced_in: S1-02

  - id: confidence-interval
    name: 信頼区間
    aliases:
      - confidence interval
    introduced_in: I2-02

  - id: pivotal-quantity
    name: ピボット量
    aliases:
      - pivotal quantity
      - pivot quantity
    introduced_in: I2-02
'''
dag.write_text(text.rstrip() + append, encoding='utf-8')
