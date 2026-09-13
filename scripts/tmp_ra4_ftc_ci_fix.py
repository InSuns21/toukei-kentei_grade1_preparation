from pathlib import Path

p = Path('textbook/volumes/00_foundations/RA4/index.md')
s = p.read_text(encoding='utf-8')
s = s.replace('## 3. 微積分学の基本定理（FTC）：積分と微分をつなぐ二つの主張', '## 3. FTCとは何か：積分と微分をつなぐ二つの主張')
s = s.replace('- **FTC I（微積分学の基本定理I）**：$F(x)=\\int_a^x f(t)\\,dt$ と積分から作った関数を微分すると $F\'(x)=f(x)$ になる。\n- **FTC II（微積分学の基本定理II）**：原始関数 $F$ が分かれば $\\int_a^b f=F(b)-F(a)$ で定積分を計算できる。', '- **FTC I（微積分学の基本定理I）**：$F(x)=\\int_a^x f(t)\\,dt$ と積分から作った関数を微分すると $F\'(x)=f(x)$ になる。\n- **FTC II（微積分学の基本定理II）**：$F\'=f$ を満たす $F$ が分かれば $\\int_a^b f=F(b)-F(a)$ で定積分を計算できる。')
p.write_text(s, encoding='utf-8')
