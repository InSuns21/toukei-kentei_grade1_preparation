from pathlib import Path

p = Path("textbook/knowledge-dag.yaml")
text = p.read_text(encoding="utf-8")
old = '''  - id: pivotal-quantity
    name: ピボット量
    aliases:
      - pivotal quantity
      - pivot quantity
    introduced_in: I2-02
'''
new = old + '''
  - id: coverage-probability
    name: 被覆確率
    aliases:
      - coverage probability
    introduced_in: I2-02
    requires: [confidence-interval]

  - id: confidence-coefficient
    name: 信頼係数
    aliases:
      - confidence coefficient
    introduced_in: I2-02
    requires: [coverage-probability]

  - id: exact-confidence-interval
    name: 厳密信頼区間
    aliases:
      - exact confidence interval
    introduced_in: I2-02
    requires: [confidence-interval, pivotal-quantity]

  - id: asymptotic-confidence-interval
    name: 漸近信頼区間
    aliases:
      - asymptotic confidence interval
    introduced_in: I2-02
    requires: [confidence-interval, root-n-asymptotic-variance]

  - id: one-sided-confidence-interval
    name: 片側信頼区間
    aliases:
      - one-sided confidence interval
    introduced_in: I2-02
    requires: [confidence-interval]
'''
if text.count(old) != 1:
    raise RuntimeError(f"expected exactly one pivotal-quantity block, got {text.count(old)}")
p.write_text(text.replace(old, new, 1), encoding="utf-8")
