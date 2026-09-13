from pathlib import Path

p = Path('textbook/volumes/00_foundations/RA4/index.md')
s = p.read_text(encoding='utf-8')
old = """**FTC** は **Fundamental Theorem of Calculus** の略で、日本語では **微積分学の基本定理** と呼びます。つまり、この章のタイトルにある「FTC」と、以下の「微積分学の基本定理I・II」は同じ定理群を指しています。"""
new = """この章で使う略称・名称の対応を先に固定します。

- **FTC** ↔ **Fundamental Theorem of Calculus**
- **FTC I** ↔ **微積分学の基本定理I**
- **FTC II** ↔ **微積分学の基本定理II**

したがって、章タイトルの「FTC」は、この節で証明するI・IIをまとめて指す略称です。"""
if old not in s:
    raise SystemExit('FTC explanatory paragraph not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
