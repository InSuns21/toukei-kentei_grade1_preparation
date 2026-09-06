from pathlib import Path

p = Path("textbook/knowledge-dag.yaml")
text = p.read_text(encoding="utf-8")
old = "\n- id: pearson-goodness-of-fit-statistic\n"
new = "\n  - id: pearson-goodness-of-fit-statistic\n"
if text.count(old) != 1:
    raise RuntimeError(f"expected exactly one indentation target, got {text.count(old)}")
p.write_text(text.replace(old, new, 1), encoding="utf-8")
