from pathlib import Path

path = Path('textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md')
text = path.read_text(encoding='utf-8')
broken = '$a\ne-1$'
# In this Python literal, \n above is an actual newline: repair the accidental split.
if broken not in text:
    raise SystemExit('expected broken multiline inline math not found')
text = text.replace(broken, r'$a\ne-1$', 1)
path.write_text(text, encoding='utf-8')
