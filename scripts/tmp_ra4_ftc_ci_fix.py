from pathlib import Path

p = Path('textbook/volumes/00_foundations/RA4/index.md')
s = p.read_text(encoding='utf-8')
s = s.replace('## 3. 微積分学の基本定理（FTC）：積分と微分をつなぐ二つの主張', '## 3. FTCとは何か：積分と微分をつなぐ二つの主張')
s = s.replace('**FTC II（微積分学の基本定理II）**：原始関数 $F$ が分かれば', "**FTC II（微積分学の基本定理II）**：$F'=f$ を満たす $F$ が分かれば")
p.write_text(s, encoding='utf-8')
