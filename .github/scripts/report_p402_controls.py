from pathlib import Path
p = Path('textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md')
s = p.read_text(encoding='utf-8')
for i, ch in enumerate(s):
    if ord(ch) < 32 and ch not in '\n\r':
        line = s.count('\n', 0, i) + 1
        left = max(0, i-30)
        right = min(len(s), i+40)
        print('CONTROL', ord(ch), 'line', line, 'context', repr(s[left:right]))
