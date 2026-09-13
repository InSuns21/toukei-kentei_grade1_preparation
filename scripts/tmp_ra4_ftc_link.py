from pathlib import Path

root = Path('.')
index = root / 'textbook/volumes/00_foundations/RA4/index.md'
chapter = root / 'textbook/volumes/00_foundations/RA4/chapter.yaml'
glossary = root / 'textbook/volumes/00_foundations/RA4/glossary.yaml'
knowledge = root / 'textbook/volumes/00_foundations/RA4/knowledge.yaml'

s = index.read_text(encoding='utf-8')
old = '## 3. 積分と微分をつなぐ二つの主張\n\n<a id="thm-ra4-ftc1"></a>'
new = '''## 3. 微積分学の基本定理（FTC）：積分と微分をつなぐ二つの主張\n\n**FTC** は **Fundamental Theorem of Calculus** の略で、日本語では **微積分学の基本定理** と呼びます。つまり、この章のタイトルにある「FTC」と、以下の「微積分学の基本定理I・II」は同じ定理群を指しています。\n\n本章では、\n\n- **FTC I（微積分学の基本定理I）**：$F(x)=\\int_a^x f(t)\\,dt$ と積分から作った関数を微分すると $F'(x)=f(x)$ になる。\n- **FTC II（微積分学の基本定理II）**：原始関数 $F$ が分かれば $\\int_a^b f=F(b)-F(a)$ で定積分を計算できる。\n\nという番号づけを採用します。文献によって I / II の番号を逆に呼ぶ場合もあるため、番号だけでなく「積分から原始関数を作る側」「原始関数から定積分を計算する側」という内容で対応を確認してください。\n\n<a id="thm-ra4-ftc1"></a>'''
if old not in s:
    raise SystemExit('FTC section marker not found')
s = s.replace(old, new, 1)
index.write_text(s, encoding='utf-8')

s = chapter.read_text(encoding='utf-8')
s = s.replace('  - 微積分学の基本定理I・IIの役割の違いを説明できる', '  - FTCがFundamental Theorem of Calculus（微積分学の基本定理）の略であることを説明し、I・IIの役割の違いを区別できる')
chapter.write_text(s, encoding='utf-8')

s = glossary.read_text(encoding='utf-8')
old = '''  - term: 微積分学の基本定理\n    english: fundamental theorem of calculus\n    meaning: 積分による原始関数の構成と原始関数による定積分計算を結ぶ定理群。\n'''
new = '''  - term: FTC\n    english: Fundamental Theorem of Calculus\n    meaning: Fundamental Theorem of Calculus の略。日本語では「微積分学の基本定理」。本章ではIを「積分から原始関数を作る主張」、IIを「原始関数から定積分を計算する主張」と呼ぶ。\n  - term: 微積分学の基本定理\n    english: Fundamental Theorem of Calculus (FTC)\n    meaning: 積分による原始関数の構成と原始関数による定積分計算を結ぶ定理群。FTCと略す。\n'''
if old not in s:
    raise SystemExit('glossary FTC marker not found')
s = s.replace(old, new, 1)
glossary.write_text(s, encoding='utf-8')

s = knowledge.read_text(encoding='utf-8')
s = s.replace('aliases: [微積分学の基本定理I, FTC I]', 'aliases: [微積分学の基本定理I, FTC I, Fundamental Theorem of Calculus I]')
s = s.replace('aliases: [微積分学の基本定理II, FTC II]', 'aliases: [微積分学の基本定理II, FTC II, Fundamental Theorem of Calculus II]')
knowledge.write_text(s, encoding='utf-8')
