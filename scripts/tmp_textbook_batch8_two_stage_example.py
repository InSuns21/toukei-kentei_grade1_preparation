from pathlib import Path

p = Path("textbook/volumes/03_inference/S1_03_標本抽出_研究設計/index.md")
text = p.read_text(encoding="utf-8")
old = '''<!-- formal-statement-start -->
> **定義（二段階抽出・一次抽出単位）**  
> 母集団を構成する大きな単位を第1段階で抽出し、選ばれた単位の内部から第2段階の標本を抽出する設計を **二段階抽出** といいます。第1段階で抽出対象となる単位を **一次抽出単位**（primary sampling unit; PSU）といいます。
<!-- formal-statement-end -->

## 14. 等確率二段階抽出の総量推定
'''
new = '''<!-- formal-statement-start -->
> **定義（二段階抽出・一次抽出単位）**  
> 母集団を構成する大きな単位を第1段階で抽出し、選ばれた単位の内部から第2段階の標本を抽出する設計を **二段階抽出** といいます。第1段階で抽出対象となる単位を **一次抽出単位**（primary sampling unit; PSU）といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-s1-03-two-stage-psu -->
**定義の確認**
全国を100個の調査区に分け、まず10調査区を抽出し、その10区それぞれから20世帯を抽出するとします。第1段階で選ぶ「調査区」が一次抽出単位（PSU）で、選ばれた調査区の内部から世帯を選ぶ操作が第2段階です。したがって、この設計は定義どおり二段階抽出です。
<!-- definition-example-end -->

## 14. 等確率二段階抽出の総量推定
'''
if text.count(old) != 1:
    raise RuntimeError(f"expected exactly one target block, got {text.count(old)}")
p.write_text(text.replace(old, new, 1), encoding="utf-8")
