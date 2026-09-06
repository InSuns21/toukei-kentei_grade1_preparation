from pathlib import Path

p = Path("textbook/knowledge-dag.yaml")
text = p.read_text(encoding="utf-8")
old = """  - id: rank-correlation-coefficient
    name: 順位相関係数
    aliases:
      - rank correlation coefficient
    introduced_in: I3-03
"""
new = old + """
  - id: pearson-goodness-of-fit-chi-square-limit
    name: ピアソン適合度統計量のカイ二乗極限
    aliases:
      - ピアソンの適合度統計量のカイ二乗極限
      - Pearson goodness-of-fit chi-square limit
      - chi-square limit of the Pearson goodness-of-fit statistic
    introduced_in: I3-03
    requires: [pearson-goodness-of-fit-statistic]

  - id: contingency-independence-chi-square-limit
    name: 分割表独立性統計量のカイ二乗極限
    aliases:
      - contingency-table independence chi-square limit
      - chi-square limit of the Pearson contingency-table statistic
    introduced_in: I3-03
    requires: [contingency-pearson-statistic]

  - id: sign-test-null-distribution
    name: 符号検定の帰無分布
    aliases:
      - sign test null distribution
      - null distribution of the sign test
    introduced_in: I3-03
    requires: [sign-test]

  - id: wilcoxon-rank-sum-moments
    name: ウィルコクソン順位和統計量の平均と分散
    aliases:
      - Wilcoxon rank-sum moments
      - mean and variance of the Wilcoxon rank-sum statistic
    introduced_in: I3-03
    requires: [wilcoxon-rank-sum-mann-whitney-u-statistic]
"""
if text.count(old) != 1:
    raise RuntimeError(f"expected exactly one Batch 10 insertion target, got {text.count(old)}")
p.write_text(text.replace(old, new, 1), encoding="utf-8")
