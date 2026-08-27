from pathlib import Path

p = Path('textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md')
s = p.read_text(encoding='utf-8')
controls = [(i, ord(ch)) for i, ch in enumerate(s) if ord(ch) < 32 and ch not in '\n\r']
if not controls:
    raise SystemExit('no control characters found')
if any(code != 9 for _, code in controls):
    raise SystemExit(f'unexpected control characters: {controls}')
s = s.replace('\t', '')
if any(ord(ch) < 32 and ch not in '\n\r' for ch in s):
    raise SystemExit('control character remains')
p.write_text(s, encoding='utf-8')
print(f'removed {len(controls)} tab characters')
