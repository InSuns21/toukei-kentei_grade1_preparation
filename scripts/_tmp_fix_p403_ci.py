from pathlib import Path

path = Path('statistical-mathematics/core/87_monte_carlo_variance_comparison.md')
text = path.read_text(encoding='utf-8')
replacements = {
    '互いに独立で同一分布（i.i.d.）': '互いに独立で同一分布',
    '#### i.i.d. 標本平均の分散': '#### 独立同分布標本の平均の分散',
    '。i.i.d. 標本平均の分散は': '。独立同分布標本の平均の分散は',
}
for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f'missing expected text: {old}')
    text = text.replace(old, new)
path.write_text(text, encoding='utf-8')
