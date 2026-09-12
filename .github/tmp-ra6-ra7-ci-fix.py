from pathlib import Path

ra6 = Path('textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md')
text = ra6.read_text(encoding='utf-8')
text = text.replace('なので、一変数平均値定理から、ある $\\theta\\in(0,1)$ が存在して', 'なので、[一変数平均値定理](../RA3/index.md#thm-ra3-mvt)から、ある $\\theta\\in(0,1)$ が存在して', 1)
text = text.replace('中括弧へ $j$ 方向の一変数平均値定理を使うと', '中括弧へ $j$ 方向の[一変数平均値定理](../RA3/index.md#thm-ra3-mvt)を使うと', 1)
ra6.write_text(text, encoding='utf-8')

ra7 = Path('textbook/volumes/00_foundations/RA7/index.md')
text = ra7.read_text(encoding='utf-8')
text = text.replace('線形写像の体積倍率から\n\n$$\n|A(Q)|', '[線形写像の体積倍率](#thm-ra7-linear-volume)から\n\n$$\n|A(Q)|', 1)
ra7.write_text(text, encoding='utf-8')
