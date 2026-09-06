from pathlib import Path

p = Path("textbook/volumes/03_inference/S1_03_標本抽出_研究設計/index.md")
text = p.read_text(encoding="utf-8")
old = "**信頼係数**・被覆確率の正式な意味は [I2-02 区間推定](../I2_02_区間推定/index.md) で扱います。"
new = "**信頼係数**の正式な意味は [I2-02 区間推定](../I2_02_区間推定/index.md) で扱います。"
if text.count(old) != 1:
    raise RuntimeError(f"expected exactly one match, got {text.count(old)}")
p.write_text(text.replace(old, new, 1), encoding="utf-8")
