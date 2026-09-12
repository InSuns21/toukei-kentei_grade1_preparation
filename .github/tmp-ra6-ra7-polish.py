from pathlib import Path

ra6 = Path('textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md')
text = ra6.read_text(encoding='utf-8')
old = '- Fréchet連鎖律を二つの残差項の評価から証明できる。\n- 高階微分・Hessian・二階Taylor展開を一次近似の反復として説明できる。'
new = '- Fréchet連鎖律を二つの残差項の評価から証明できる。\n- 二階偏微分の連続性から、矩形増分を二通りに評価して混合偏微分の交換とHessianの対称性を示せる。\n- 高階微分・Hessian・二階Taylor展開を一次近似の反復として説明できる。'
if old in text:
    text = text.replace(old, new, 1)
ra6.write_text(text, encoding='utf-8')

ra7 = Path('textbook/volumes/00_foundations/RA7/index.md')
text = ra7.read_text(encoding='utf-8')
old = r'''S(Q)\subset\bigcup_{r=1}^N R_r,
\qquad
\sum_r|R_r|<|S(Q)|+\varepsilon
$$

と外側から覆えます。$S^{-1}$ も係数 $-c$ の shear なので、各 $R_r$ について今の薄片評価を適用し、その像 $S^{-1}(R_r)$ を体積 $|R_r|$ に任意に近い直方体和で外側から覆えます。従って

$$
|Q|\le |S(Q)|+\varepsilon.
$$'''
new = r'''S(Q)\subset\bigcup_{r=1}^N R_r,
\qquad
\sum_r|R_r|<|S(Q)|+\frac{\varepsilon}{2}
$$

と外側から覆えます。$S^{-1}$ も係数 $-c$ の shear なので、各 $R_r$ について今の薄片評価を適用できます。各像 $S^{-1}(R_r)$ の外側直方体近似を、$N$ 個を合わせた追加誤差が $\varepsilon/2$ 未満になるように選べば

$$
|Q|
\le \sum_r |R_r|+\frac{\varepsilon}{2}
<|S(Q)|+\varepsilon.
$$'''
assert old in text
text = text.replace(old, new, 1)
ra7.write_text(text, encoding='utf-8')
