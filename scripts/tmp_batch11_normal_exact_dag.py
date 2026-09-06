from pathlib import Path

path = Path("textbook/knowledge-dag.yaml")
text = path.read_text(encoding="utf-8")

sentinel = "  - id: normal-sample-mean-variance-sampling-distribution\n"
if sentinel in text:
    raise SystemExit("Batch 11 nodes already present")

block = """  - id: normal-sample-mean-variance-sampling-distribution
    name: 正規標本の平均と分散の標本分布
    aliases:
      - 正規標本の平均と分散
      - normal-sample mean and variance sampling distribution
      - sampling distribution of the mean and variance of a normal sample
    introduced_in: S1-01

  - id: t-statistic-sampling-distribution
    name: t統計量の分布
    aliases:
      - t-statistic distribution
      - distribution of the t-statistic
    introduced_in: S1-01
    requires: [normal-sample-mean-variance-sampling-distribution]

  - id: two-sample-variance-ratio-sampling-distribution
    name: 二標本分散比の分布
    aliases:
      - 二標本の分散比
      - two-sample variance-ratio distribution
      - distribution of the two-sample variance ratio
    introduced_in: S1-01
    requires: [normal-sample-mean-variance-sampling-distribution]

  - id: known-variance-normal-mean-z-null-distribution
    name: 母分散既知の正規母平均Z統計量の帰無分布
    aliases:
      - known-variance normal-mean Z null distribution
      - null distribution of the known-variance normal-mean Z statistic
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic, normal-sample-mean-variance-sampling-distribution]

  - id: unknown-variance-normal-mean-t-null-distribution
    name: 母分散未知の正規母平均t統計量の帰無分布
    aliases:
      - unknown-variance normal-mean t null distribution
      - null distribution of the unknown-variance normal-mean t statistic
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic, t-statistic-sampling-distribution]

  - id: normal-variance-chi-square-null-distribution
    name: 正規母分散カイ二乗統計量の帰無分布
    aliases:
      - normal-variance chi-square null distribution
      - null distribution of the normal-variance chi-square statistic
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic, normal-sample-mean-variance-sampling-distribution]

  - id: two-normal-variance-ratio-f-null-distribution
    name: 二正規母分散比F統計量の帰無分布
    aliases:
      - two-normal-variance ratio F null distribution
      - null distribution of the two-normal-variance ratio F statistic
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic, two-sample-variance-ratio-sampling-distribution]
"""

if not text.endswith("\n"):
    text += "\n"
text += "\n" + block
path.write_text(text, encoding="utf-8")
