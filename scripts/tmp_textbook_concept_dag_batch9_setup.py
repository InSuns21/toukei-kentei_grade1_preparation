from pathlib import Path

p = Path("textbook/knowledge-dag.yaml")
text = p.read_text(encoding="utf-8")

if "  - id: fisher-exact-test\n" in text:
    raise RuntimeError("Batch 9 concepts already registered")

block = r'''
  - id: pearson-goodness-of-fit-statistic
    name: ピアソンの適合度統計量
    aliases:
      - Pearson goodness-of-fit statistic
      - Pearson goodness-of-fit test statistic
    introduced_in: I3-03
    requires: [test-statistic]

  - id: contingency-pearson-statistic
    name: 分割表のピアソン統計量
    aliases:
      - contingency-table Pearson statistic
      - Pearson chi-square statistic for independence
    introduced_in: I3-03
    requires: [test-statistic]

  - id: sign-test
    name: 符号検定
    aliases:
      - sign test
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic]

  - id: wilcoxon-signed-rank-statistic
    name: ウィルコクソン符号付き順位和統計量
    aliases:
      - Wilcoxon signed-rank statistic
      - Wilcoxon signed rank statistic
    introduced_in: I3-03
    requires: [test-statistic]

  - id: wilcoxon-rank-sum-mann-whitney-u-statistic
    name: ウィルコクソン順位和統計量とマン・ホイットニーU統計量
    aliases:
      - Wilcoxon rank-sum statistic
      - Wilcoxon rank sum statistic
      - Mann--Whitney U statistic
      - Mann-Whitney U statistic
    introduced_in: I3-03
    requires: [test-statistic]

  - id: fisher-exact-test
    name: フィッシャー検定
    aliases:
      - Fisher exact test
      - Fisher's exact test
    introduced_in: I3-03
    requires: [null-hypothesis, p-value]

  - id: yates-correction
    name: イェーツの補正
    aliases:
      - Yates correction
      - Yates's correction
    introduced_in: I3-03
    requires: [contingency-pearson-statistic]

  - id: mcnemar-test
    name: マクネマー検定
    aliases:
      - McNemar test
      - McNemar's test
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic]

  - id: rank-correlation-coefficient
    name: 順位相関係数
    aliases:
      - rank correlation coefficient
    introduced_in: I3-03
'''

p.write_text(text.rstrip() + "\n\n" + block.strip() + "\n", encoding="utf-8")
