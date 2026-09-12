from pathlib import Path

p = Path('textbook/volumes/00_foundations/RA7/index.md')
text = p.read_text(encoding='utf-8')

assert text.count('**詳細解答**') == 8
assert text.count('**本番答案**') == 8
assert text.count('**採点基準') == 8
assert text.count('- 目安時間:') == 8

text = '\n'.join(line for line in text.split('\n') if not line.startswith('- 目安時間:'))

start = '<!-- solution-start -->'
end = '<!-- solution-end -->'
pos = 0
parts = []
while True:
    i = text.find(start, pos)
    if i < 0:
        parts.append(text[pos:])
        break
    j = text.find(end, i)
    assert j >= 0
    parts.append(text[pos:i])
    block = text[i:j]
    assert '**詳細解答**' in block
    if '**本番答案**' in block:
        block = block.split('**本番答案**', 1)[0].rstrip() + '\n'
    parts.append(block + end)
    pos = j + len(end)
text = ''.join(parts)

assert text.count('**詳細解答**') == 8
assert '**本番答案**' not in text
assert '**採点基準' not in text
assert '- 目安時間:' not in text

p.write_text(text, encoding='utf-8')
