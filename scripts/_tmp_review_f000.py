from pathlib import Path

chapter_dir = Path('textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習')
index_path = chapter_dir / 'index.md'
validation_path = chapter_dir / 'review/validation.md'

text = index_path.read_text(encoding='utf-8')
replacements = {
    '像は $r>0,0<u<1$。ヤコビアンは': '変換後の領域は $r>0,0<u<1$。ヤコビアンは',
    '逆変換は $x=ru,y=r(1-u)$、像は $r>0,0<u<1$、ヤコビアン絶対値は $r$。':
        '逆変換は $x=ru,y=r(1-u)$、変換後の領域は $r>0,0<u<1$、ヤコビアン絶対値は $r$。',
}
for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f'missing expected F0-00 text: {old}')
    text = text.replace(old, new, 1)

if '像は $r>0,0<u<1$' in text:
    raise SystemExit('residual learner-facing 像 wording remains')
index_path.write_text(text, encoding='utf-8')

validation = validation_path.read_text(encoding='utf-8')
validation = validation.replace('二次形式・正定値性・主座小行列式', '二次形式・正定値性・首座小行列式')
validation_path.write_text(validation, encoding='utf-8')
