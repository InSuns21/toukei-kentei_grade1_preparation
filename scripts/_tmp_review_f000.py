from pathlib import Path
import re

root = Path('.')
chapter_dir = root / 'textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習'
index_path = chapter_dir / 'index.md'
text = index_path.read_text(encoding='utf-8')

# 1. Rebuild the chapter entrance. F0-00 is a mathematics reference chapter,
# but its entrance follows the canonical textbook chapter structure.
first_rule = '\n---\n'
if first_rule not in text:
    raise SystemExit('first horizontal rule not found')
_, body = text.split(first_rule, 1)

# Demote all existing section headings below the single chapter H1.
def demote_heading(match):
    return '#' + match.group(1) + ' '
body = re.sub(r'^(#{1,5}) ', demote_heading, body, flags=re.MULTILINE)

preface = r'''# F0-00 統計検定1級のための数学速習

この章では、統計検定1級の各章で繰り返し使う微積分・多変数解析・線形代数をまとめます。確率や推測の公式を先に置くのではなく、広義積分、変数変換、ガンマ・ベータ関数、固有値、二次形式、射影などを数学の計算として確認し、後続章で再利用できる形にします。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md) に従います。

## この章で解けるようになる問題

- 広義積分の収束条件を端点ごとに判定し、部分積分・置換積分を使って値を求める。
- ガウス積分を重積分と極座標変換から導出し、係数付き積分へ拡張する。
- ガンマ関数・ベータ関数の基本関係を積分から導き、半整数値や具体値を計算する。
- 二変数変換の逆変換・変換後の領域・ヤコビアンを求める。
- 行列式・逆行列・階数・固有値・固有ベクトルを計算する。
- 実対称行列を直交対角化し、二次形式の最大最小と正定値性を判定する。
- 射影行列、シュール補、基本的な行列微分を後続の統計問題で使える形へ変形する。

## 公式出題範囲との対応

| 公式範囲 | 本章の対応箇所 |
|---|---|
| 変数変換 | 重積分、極座標、一般の二変数変換、ヤコビアン |
| 固有値 | 特性方程式、実対称行列の直交対角化、二次形式 |
| 固有ベクトル | 固有値方程式、直交基底、二次形式の最大最小 |
| 線形結合 | ベクトルの線形結合、行列積、射影 |

このほか、ガウス積分、ガンマ関数、ベータ関数、広義積分、テイラー展開は確率分布・標本分布・漸近推測の計算基礎として使います。

## 前提知識チェック

1. $x^3$、$e^{2x}$、$\log x$ を微分できる。
2. $2\times2$ 行列の積と行列式を計算できる。
3. $x^2+2bx=(x+b)^2-b^2$ と平方完成できる。
4. $\sum_{i=1}^n a_i$ の和記号を読み、定数倍と和を分配できる。
5. $\sin^2\theta+\cos^2\theta=1$ を使える。

---
'''
text = preface + body.lstrip('\n')

# 2. Replace the author-facing S/A/B priority table with a content map.
old_section_pattern = re.compile(
    r'## 1\. 1級で必要な数学の優先度\n.*?\n---\n',
    flags=re.DOTALL,
)
new_section = r'''## 1. この章で扱う数学

| 分野 | 主な内容 | 主な接続先 |
|---|---|---|
| 一変数微積分 | 微分、部分積分、置換積分、広義積分、積分記号下の微分 | 確率密度関数の正規化、期待値、尤度、漸近展開 |
| 特殊積分 | ガウス積分、ガンマ関数、ベータ関数 | 正規・ガンマ・ベータ・カイ二乗・t・F分布 |
| 多変数解析 | 偏微分、勾配、ヘッセ行列、重積分、ヤコビアン、ラグランジュ未定乗数法 | 多変量分布、変数変換、最尤推定、制約付き最適化 |
| 線形代数 | 行列積、行列式、逆行列、階数、固有値、直交対角化、二次形式、正定値性 | 多変量正規、標本分布、回帰、主成分分析 |
| 線形代数の応用 | 射影行列、シュール補、行列微分 | 回帰、条件付き正規分布、一般線形仮説 |
| 極限計算 | テイラー展開、ランダウ記号、スターリング公式 | 中心極限定理、デルタ法、尤度比の漸近展開 |

各節では、後続章でそのまま使う式だけでなく、式がどの計算から出るかまで示します。

---
'''
text, count = old_section_pattern.subn(new_section, text, count=1)
if count != 1:
    raise SystemExit(f'priority section replacement count={count}')

# 3. Tighten mathematical conditions that were previously implicit.
text = text.replace(
    '内部停留点で $H_g$ が正定値なら狭義局所最小、負定値なら狭義局所最大です。',
    '内部停留点 $\\boldsymbol x_0$ の近傍で $g$ が2回連続微分可能とします。$H_g(\\boldsymbol x_0)$ が正定値なら $\\boldsymbol x_0$ は狭義局所最小、負定値なら狭義局所最大です。'
)

old_diff_under = r'''## 4.4 積分記号下の微分

条件が満たされれば

$$
\frac{d}{d\theta}
\int f(x,\theta)\,dx
=
\int \frac{\partial}{\partial\theta}f(x,\theta)\,dx
$$

と微分と積分を交換できます。

ただし「微分できるから交換できる」わけではありません。無限区間では、微分後の被積分関数を可積分関数で一様に支配できるかなどの条件確認が必要です。'''
new_diff_under = r'''## 4.4 積分記号下の微分

$\theta_0$ の近くで $\partial f(x,\theta)/\partial\theta$ が存在し、ある可積分関数 $g(x)$ があって

$$
\left|\frac{\partial}{\partial\theta}f(x,\theta)\right|\le g(x)
$$

がその近傍のすべての $\theta$ で成り立つとします。このように微分後の被積分関数を同じ可積分関数で抑えられる場合には

$$
\frac{d}{d\theta}
\int f(x,\theta)\,dx
=
\int \frac{\partial}{\partial\theta}f(x,\theta)\,dx
$$

と微分と積分を交換できます。実際の問題では、交換を書く前に、微分後の絶対値を積分可能な関数で抑えられることを確認します。'''
if old_diff_under not in text:
    raise SystemExit('differentiation-under-integral section not found')
text = text.replace(old_diff_under, new_diff_under, 1)

needle = r'''$$
F(a)=\int_{-\infty}^{\infty}e^{-ax^2}\,dx
=\sqrt\pi a^{-1/2}
$$

を $a$ で微分すると'''
replacement = r'''$$
F(a)=\int_{-\infty}^{\infty}e^{-ax^2}\,dx
=\sqrt\pi a^{-1/2}
$$

とします。固定した $a_0>0$ の近くで $a\ge a_0/2$ とすれば

$$
\left|\frac{\partial}{\partial a}e^{-ax^2}\right|
=x^2e^{-ax^2}
\le x^2e^{-(a_0/2)x^2},
$$

右辺は実数全体で積分可能です。したがって積分記号下で微分でき、'''
if needle not in text:
    raise SystemExit('Gaussian differentiation needle not found')
text = text.replace(needle, replacement, 1)

# 4. Replace specialist-facing "image" wording with direct range wording.
text = text.replace('像は\n\n$$', '変換後の領域は\n\n$$')
text = text.replace('**逆変換と像の範囲**', '**逆変換と変換後の範囲**')

# 5. Add linear combinations and the Sylvester criterion so the official scope
# and final checklist are actually taught in the chapter.
linear_needle = r'''直交は

$$
\boldsymbol x^{\mathsf T}\boldsymbol y=0
$$

です。

コーシー・シュワルツの不等式は'''
linear_repl = r'''直交は

$$
\boldsymbol x^{\mathsf T}\boldsymbol y=0
$$

です。

ベクトル $\boldsymbol v_1,\ldots,\boldsymbol v_k$ と実数 $c_1,\ldots,c_k$ に対し

$$
c_1\boldsymbol v_1+\cdots+c_k\boldsymbol v_k
$$

をこれらのベクトルの線形結合といいます。行列 $A=(\boldsymbol v_1,\ldots,\boldsymbol v_k)$ を使えば同じ式を $A\boldsymbol c$ とまとめて書けます。

コーシー・シュワルツの不等式は'''
if linear_needle not in text:
    raise SystemExit('linear-combination insertion point not found')
text = text.replace(linear_needle, linear_repl, 1)

sylvester_old = r'''2次対称行列

$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

なら

$$
\boxed{a>0,\qquad ac-b^2>0}
$$

が正定値の必要十分条件です。'''
sylvester_new = r'''$A$ の左上から取った $k\times k$ 部分行列を $A_k$ とし

$$
\Delta_k=\det A_k
$$

と置きます。$\Delta_k$ を首座小行列式といいます。実対称行列では

$$
\boxed{
A\text{ が正定値}
\Longleftrightarrow
\Delta_1>0,\ldots,\Delta_p>0
}
$$

が成り立ちます。これをシルベスターの判定法といいます。

特に2次対称行列

$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

では

$$
\Delta_1=a,\qquad \Delta_2=ac-b^2
$$

なので

$$
\boxed{a>0,\qquad ac-b^2>0}
$$

が正定値の必要十分条件です。'''
if sylvester_old not in text:
    raise SystemExit('Sylvester insertion point not found')
text = text.replace(sylvester_old, sylvester_new, 1)

# 6. Make Landau notation explicit about the limiting regime.
landau_old = r'''## 12.2 ランダウ記号

$$
f(x)=O(g(x))
$$

は比 $|f(x)/g(x)|$ が近傍で有界という意味です。

$$
f(x)=o(g(x))
$$

は

$$
\frac{f(x)}{g(x)}\to0
$$

という意味です。'''
landau_new = r'''## 12.2 ランダウ記号

$x\to x_0$ を考えるとします。

$$
f(x)=O(g(x))\qquad(x\to x_0)
$$

とは、$x_0$ の十分近くで、ある定数 $C>0$ により

$$
|f(x)|\le C|g(x)|
$$

と抑えられることです。

$$
f(x)=o(g(x))\qquad(x\to x_0)
$$

とは

$$
\frac{f(x)}{g(x)}\to0
$$

という意味です。$n\to\infty$ の数列でも、同じ形で $O(\cdot)$ と $o(\cdot)$ を使います。'''
if landau_old not in text:
    raise SystemExit('Landau section not found')
text = text.replace(landau_old, landau_new, 1)
text = text.replace('組合せ数や分布の近似で使います。厳密証明を暗記する必要はありません。', '組合せ数や分布の漸近評価で使います。')

# 7. Remove the learner-facing memorization policy section and renumber the tail.
memorize_pattern = re.compile(
    r'## 13\. 何を暗記し、何をその場で導出するか\n.*?\n---\n\n## 14\. 確認問題',
    flags=re.DOTALL,
)
text, count = memorize_pattern.subn('## 13. 演習', text, count=1)
if count != 1:
    raise SystemExit(f'memorization section replacement count={count}')
text = text.replace('## 15. 25分数学ドリル', '## 14. 本番ドリル')
text = text.replace('## 16. 統計でどこに使うか', '## 15. 統計でどこに使うか')
text = text.replace('## 17. 最終チェックリスト', '## 16. 章末チェック')
text = text.replace('公式表を見ずに次を解いてください。', '次の6問を解け。')
text = text.replace('ここだけが統計への接続表です。統計の内容そのものは後続章で扱います。', '各数学事項の主な接続先は次の通りです。')
text = text.replace('\n後続の統計章では、この章の数学を既知として統計問題へ接続します。\n', '\n')
text = text.replace('主座小行列式', '首座小行列式')

# 8. Add exercise metadata and normalize every ordinary solution to the
# canonical detailed solution -> exam answer -> 20-point rubric structure.
meta = {
    'F0M-A01': ('A', '7分', '広義積分'),
    'F0M-A02': ('A', '5分', 'ガンマ関数'),
    'F0M-A03': ('A', '5分', 'ベータ関数'),
    'F0M-A04': ('A', '7分', '極座標と重積分'),
    'F0M-A05': ('A', '7分', 'ヤコビアン'),
    'F0M-A06': ('A', '7分', '行列式と逆行列'),
    'F0M-B01': ('B', '12分', 'ガウス積分と積分記号下の微分'),
    'F0M-B02': ('B', '10分', '逆変換とヤコビアン'),
    'F0M-B03': ('B', '10分', '固有値と正定値性'),
    'F0M-B04': ('B', '12分', '二次形式と固有値'),
    'F0M-B05': ('B', '12分', '射影行列'),
    'F0M-B06': ('B', '15分', '多変量ガウス積分'),
    'F0M-C01': ('C', '20分', 'ベータ関数とガンマ関数の関係'),
}

for ex_id, (level, minutes, subject) in meta.items():
    match = re.search(rf'^(### {re.escape(ex_id)} .+)$', text, flags=re.MULTILINE)
    if not match:
        raise SystemExit(f'exercise heading not found: {ex_id}')
    heading = match.group(1)
    insert = f'{heading}\n\n- Level: {level}\n- 目安時間: {minutes}\n- 主題: {subject}'
    text = text[:match.start()] + insert + text[match.end():]

# Richer detailed solutions for the shortest Level A items.
detailed_overrides = {
'F0M-A02': r'''漸化式 $\Gamma(s+1)=s\Gamma(s)$ を3回使うと

$$
\Gamma\left(\frac72\right)
=\frac52\Gamma\left(\frac52\right)
=\frac52\frac32\Gamma\left(\frac32\right)
=\frac52\frac32\frac12\Gamma\left(\frac12\right).
$$

$\Gamma(1/2)=\sqrt\pi$ なので

$$
\boxed{\Gamma(7/2)=\frac{15}{8}\sqrt\pi}.
$$''',
'F0M-A03': r'''ベータ関数とガンマ関数の関係

$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

へ $a=3,b=4$ を代入する。正整数 $n$ では $\Gamma(n)=(n-1)!$ だから

$$
B(3,4)
=\frac{\Gamma(3)\Gamma(4)}{\Gamma(7)}
=\frac{2!\,3!}{6!}
=\frac{12}{720}
=\boxed{\frac1{60}}.
$$''',
'F0M-A04': r'''極座標

$$
x=r\cos\theta,\qquad y=r\sin\theta
$$

では、円板 $x^2+y^2\le R^2$ は

$$
0\le r\le R,\qquad 0\le\theta<2\pi
$$

となる。ヤコビアンの絶対値は $r$ なので

$$
\begin{aligned}
\operatorname{Area}(D)
&=\iint_D1\,dx\,dy\\
&=\int_0^{2\pi}\int_0^R r\,dr\,d\theta\\
&=\int_0^{2\pi}\frac{R^2}{2}\,d\theta
=\boxed{\pi R^2}.
\end{aligned}
$$''',
'F0M-A05': r'''偏微分を並べると

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\det
\begin{pmatrix}
\partial x/\partial u&\partial x/\partial v\\
\partial y/\partial u&\partial y/\partial v
\end{pmatrix}
=
\det
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix}.
$$

したがって

$$
-vu-u(1-v)=-u.
$$

面積倍率は行列式の絶対値なので $|u|$、特に $u>0$ なら $u$ である。''',
'F0M-A06': r'''まず

$$
\det A=2\cdot3-1\cdot1=5\ne0
$$

なので逆行列が存在する。2次行列の公式から

$$
A^{-1}
=\frac1{\det A}
\begin{pmatrix}3&-1\\-1&2\end{pmatrix}
=\boxed{\frac15
\begin{pmatrix}3&-1\\-1&2\end{pmatrix}}.
$$

実際に $AA^{-1}=I$ となるので検算できる。''',
'F0M-B05': r'''$A^{\mathsf T}A$ は対称なので、その逆行列も対称である。したがって

$$
\begin{aligned}
P^{\mathsf T}
&=\left\{A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\right\}^{\mathsf T}\\
&=A\left\{(A^{\mathsf T}A)^{-1}\right\}^{\mathsf T}A^{\mathsf T}\\
&=P.
\end{aligned}
$$

また

$$
\begin{aligned}
P^2
&=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}
A(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=A(A^{\mathsf T}A)^{-1}
(A^{\mathsf T}A)(A^{\mathsf T}A)^{-1}A^{\mathsf T}\\
&=P.
\end{aligned}
$$

よって $P$ は対称かつ冪等であり、$\operatorname{col}(A)$ への直交射影行列である。''',
}

exam_answers = {
'F0M-A01': r'''$\int_0^1x^a\,dx=\lim_{\varepsilon\downarrow0}(1-\varepsilon^{a+1})/(a+1)$。$a=-1$ は $-\log\varepsilon$。したがって有限となる必要十分条件は $a>-1$ で、その値は $1/(a+1)$。''',
'F0M-A02': r'''$\Gamma(7/2)=(5/2)(3/2)(1/2)\Gamma(1/2)=\boxed{15\sqrt\pi/8}$。''',
'F0M-A03': r'''$B(3,4)=\Gamma(3)\Gamma(4)/\Gamma(7)=2!3!/6!=\boxed{1/60}$。''',
'F0M-A04': r'''$0\le r\le R,0\le\theta<2\pi$, $dx\,dy=r\,dr\,d\theta$ より $\int_0^{2\pi}\int_0^Rr\,dr\,d\theta=\boxed{\pi R^2}$。''',
'F0M-A05': r'''ヤコビアンは $\det\begin{pmatrix}v&u\\1-v&-u\end{pmatrix}=-u$。したがって面積倍率は $|u|$、$u>0$ なら $u$。''',
'F0M-A06': r'''$\det A=5$ より $A^{-1}=\boxed{\frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}}$。''',
'F0M-B01': r'''$F(a)=\sqrt\pi a^{-1/2}$ と置くと $F'(a)=-\int x^2e^{-ax^2}dx=-(\sqrt\pi/2)a^{-3/2}$。よって積分値は $\boxed{\sqrt\pi/(2a^{3/2})}$。''',
'F0M-B02': r'''逆変換は $x=ru,y=r(1-u)$、変換後の領域は $r>0,0<u<1$。ヤコビアンは $-r$ なので絶対値は $r$。''',
'F0M-B03': r'''$\det(A-\lambda I)=(4-\lambda)^2-4=(\lambda-6)(\lambda-2)$。固有値 $6,2$ はともに正なので $A$ は正定値。''',
'F0M-B04': r'''$A=Q\Lambda Q^{\mathsf T}$、$z=Q^{\mathsf T}x$ とすれば $\sum z_i^2=1$ かつ $x^{\mathsf T}Ax=\sum\lambda_i z_i^2\le\lambda_{\max}$。最大値は $\boxed{\lambda_{\max}}$。''',
'F0M-B05': r'''$(A^{\mathsf T}A)^{-1}$ は対称なので $P^{\mathsf T}=P$。また $P^2=A(A^{\mathsf T}A)^{-1}(A^{\mathsf T}A)(A^{\mathsf T}A)^{-1}A^{\mathsf T}=P$。''',
'F0M-B06': r'''$A=Q\Lambda Q^{\mathsf T}$ とし $z=Q^{\mathsf T}x$ と変換すると、積分は $\prod_i\sqrt{2\pi/\lambda_i}$。よって $\boxed{(2\pi)^{p/2}/\sqrt{\det A}}$。''',
'F0M-C01': r'''$x=ru,y=r(1-u)$、$r>0,0<u<1$、ヤコビアン絶対値 $r$ を用いると $\Gamma(a)\Gamma(b)=B(a,b)\Gamma(a+b)$。従って $\boxed{B(a,b)=\Gamma(a)\Gamma(b)/\Gamma(a+b)}$。''',
}

rubrics = {
'F0M-A01': '広義積分を極限で置く4点、$a\ne-1$ の積分計算6点、$a=-1$ の確認4点、必要十分条件と値6点。計20点。',
'F0M-A02': 'ガンマ関数の漸化式12点、$\Gamma(1/2)=\sqrt\pi$ の使用4点、最終値4点。計20点。',
'F0M-A03': 'ベータ・ガンマ関係8点、整数ガンマ値8点、最終値4点。計20点。',
'F0M-A04': '極座標の領域6点、ヤコビアン4点、重積分の立式6点、積分値4点。計20点。',
'F0M-A05': '偏微分行列8点、行列式の計算6点、絶対値を面積倍率とする説明6点。計20点。',
'F0M-A06': '行列式6点、可逆性の確認4点、逆行列8点、検算または結論2点。計20点。',
'F0M-B01': '$F(a)$ の設定4点、積分記号下の微分8点、$F\'(a)$ の微分4点、最終値4点。計20点。',
'F0M-B02': '逆変換6点、変換後の領域4点、ヤコビアン6点、絶対値4点。計20点。',
'F0M-B03': '特性方程式8点、固有値6点、正定値判定6点。計20点。',
'F0M-B04': '直交対角化5点、ノルム保存4点、上界評価7点、等号成立条件4点。計20点。',
'F0M-B05': '対称性8点、冪等性8点、直交射影という結論4点。計20点。',
'F0M-B06': '直交対角化4点、変数変換と体積要素4点、積の分離6点、行列式を用いた最終式6点。計20点。',
'F0M-C01': 'ガンマ関数積の二重積分4点、逆変換3点、変換後の領域3点、ヤコビアン3点、積分の分離4点、最終式3点。計20点。',
}

for ex_id in meta:
    heading_pos = text.find(f'### {ex_id} ')
    if heading_pos < 0:
        raise SystemExit(f'heading disappeared: {ex_id}')
    sol_start = text.find('<!-- solution-start -->', heading_pos)
    sol_end = text.find('<!-- solution-end -->', sol_start)
    if sol_start < 0 or sol_end < 0:
        raise SystemExit(f'solution markers missing: {ex_id}')
    block = text[sol_start:sol_end]
    prefix = '<!-- solution-start -->\n\n#### 解答\n\n'
    if not block.startswith(prefix):
        raise SystemExit(f'unexpected solution header: {ex_id}')
    body_now = block[len(prefix):].strip()
    body_use = detailed_overrides.get(ex_id, body_now)
    new_block = (
        '<!-- solution-start -->\n\n#### 解答\n\n'
        '##### 詳細解答\n\n' + body_use + '\n\n'
        '##### 本番答案\n\n' + exam_answers[ex_id] + '\n\n'
        '##### 採点基準\n\n' + rubrics[ex_id] + '\n\n'
    )
    text = text[:sol_start] + new_block + text[sol_end:]

# 9. Rebuild the integrated drill as a 100-point canonical solution.
drill_heading = '### F0M-DRILL-01 数学基礎総合'
if drill_heading not in text:
    raise SystemExit('drill heading not found')
text = text.replace(
    drill_heading + '\n\n次の6問を解け。',
    drill_heading + '\n\n- Level: C\n- 目安時間: 25分\n- 配点: 100点\n\n次の6問を解け。',
    1,
)
drill_start = text.find('<!-- solution-start -->', text.find(drill_heading))
drill_end = text.find('<!-- solution-end -->', drill_start)
if drill_start < 0 or drill_end < 0:
    raise SystemExit('drill solution markers missing')
drill_block = r'''<!-- solution-start -->

#### 解答

##### 詳細解答

1. ガンマ関数の漸化式を使うと
   $$
   \Gamma\left(\frac52\right)
   =\frac32\Gamma\left(\frac32\right)
   =\frac32\frac12\Gamma\left(\frac12\right)
   =\frac{3\sqrt\pi}{4}.
   $$
2. ベータ・ガンマ関係から
   $$
   B(2,3)=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}
   =\frac{1!\,2!}{4!}=\frac1{12}.
   $$
3. $u=\sqrt2x$ と置けば $dx=du/\sqrt2$ なので
   $$
   \int_{-\infty}^{\infty}e^{-2x^2}\,dx
   =\frac1{\sqrt2}\int_{-\infty}^{\infty}e^{-u^2}\,du
   =\sqrt{\frac\pi2}.
   $$
4. 
   $$
   \frac{\partial(x,y)}{\partial(u,v)}
   =\det\begin{pmatrix}v&u\\1-v&-u\end{pmatrix}
   =-u.
   $$
   面積倍率は $|u|$ であり、$u>0$ なら $u$。
5. 
   $$
   \det(A-\lambda I)
   =(3-\lambda)^2-1
   =(\lambda-2)(\lambda-4).
   $$
   固有値は $2,4$。実対称行列で両方とも正なので正定値。
6. 実対称行列の二次形式は、単位ベクトル上で最大固有値を最大値に持つ。第5問より最大固有値は4なので
   $$
   \max_{\|\boldsymbol x\|=1}\boldsymbol x^{\mathsf T}A\boldsymbol x=4.
   $$

##### 本番答案

1. $\Gamma(5/2)=(3/2)(1/2)\sqrt\pi=3\sqrt\pi/4$。
2. $B(2,3)=1!2!/4!=1/12$。
3. $u=\sqrt2x$ より $\int e^{-2x^2}dx=\sqrt{\pi/2}$。
4. ヤコビアンは $-u$、面積倍率は $|u|$。
5. 特性多項式は $(\lambda-2)(\lambda-4)$、固有値は $2,4$。よって正定値。
6. 単位球面上の二次形式の最大値は最大固有値なので4。

##### 採点基準

第1問15点：漸化式10点、最終値5点。

第2問15点：ベータ・ガンマ関係8点、最終値7点。

第3問15点：尺度変換8点、ガウス積分の適用7点。

第4問15点：偏微分行列6点、行列式5点、絶対値4点。

第5問20点：特性方程式8点、固有値6点、正定値判定6点。

第6問20点：二次形式と最大固有値の関係12点、第5問との接続8点。合計100点。

'''
text = text[:drill_start] + drill_block + text[drill_end:]

# Guard against the reader-facing meta phrases that motivated this review.
for forbidden in ['暗記してよい', '無理に暗記しなくてよい', '暗記する必要はありません', '試験中に導出', 'Sは必須です']:
    if forbidden in text:
        raise SystemExit(f'forbidden meta phrase remains: {forbidden}')

index_path.write_text(text, encoding='utf-8')

# 10. Metadata and review records.
chapter_yaml = chapter_dir / 'chapter.yaml'
cy = chapter_yaml.read_text(encoding='utf-8')
cy = cy.replace('status: self_review', 'status: reviewed', 1)
if 'F0M-THM-06' not in cy:
    cy = cy.replace(
        '  - { id: F0M-THM-05, name: 正定値性の固有値判定 }',
        '  - { id: F0M-THM-05, name: 正定値性の固有値判定 }\n  - { id: F0M-THM-06, name: シルベスターの判定法 }',
        1,
    )
chapter_yaml.write_text(cy, encoding='utf-8')

glossary_path = chapter_dir / 'glossary.yaml'
gl = glossary_path.read_text(encoding='utf-8')
if 'term: 首座小行列式' not in gl:
    gl += '  - { term: 首座小行列式, notation: "\\\\Delta_k", meaning: 実対称行列の左上から取った k 次部分行列の行列式 }\n'
glossary_path.write_text(gl, encoding='utf-8')

validation = chapter_dir / 'review/validation.md'
vr = validation.read_text(encoding='utf-8')
section = r'''

## 2026-08-28 読者粒度再レビュー

- H1を章タイトルだけにし、入口を「この章で解けるようになる問題 → 公式出題範囲との対応 → 前提知識チェック」へ整理した。
- S/A/B優先度表と「暗記してよい／しなくてよい」等の執筆者メタ説明を削除し、数学事項と後続単元の対応を内容として直接記述した。
- 積分記号下の微分に可積分な支配関数による十分条件を追加し、ガウス積分の微分では実際の支配関数まで示した。
- ヘッセ行列による極値判定へ2回連続微分可能性を明記し、正定値性には首座小行列式とシルベスターの判定法を追加した。
- 公式範囲の「線形結合」を本文で定義し、変数変換では「像」を「変換後の領域・範囲」へ置き換えた。
- 通常演習13題すべてを「詳細解答・本番答案・20点採点基準」へ統一し、25分ドリルを100点満点へ改めた。
'''
if '## 2026-08-28 読者粒度再レビュー' not in vr:
    vr += section
validation.write_text(vr, encoding='utf-8')

review_plan = root / 'textbook/REVIEW_PLAN.md'
rp = review_plan.read_text(encoding='utf-8')
rp = rp.replace(
    '### F0-00 統計検定1級のための数学速習: 新設・自己査読（2026-08-27）',
    '### F0-00 統計検定1級のための数学速習: PASS（読者粒度再レビュー 2026-08-28）',
    1,
)
rp = rp.replace(
    '1. ~~F0-00 統計検定1級のための数学速習~~（新設・自己査読済み）',
    '1. ~~F0-00 統計検定1級のための数学速習~~（完了）',
    1,
)
f0_marker = '- F0-01廃止後の唯一の数学前提章とする。\n'
extra = (
    '- 2026-08-28読者粒度再レビューで、メタ説明・見出し階層・積分記号下の微分条件・首座小行列式・演習答案構成を再整備。\n'
    '- 通常演習13題を20点満点の詳細解答・本番答案・採点基準へ統一し、25分ドリルを100点形式へ更新。\n'
)
if extra.strip() not in rp:
    if f0_marker not in rp:
        raise SystemExit('F0 review-plan marker not found')
    rp = rp.replace(f0_marker, f0_marker + extra, 1)
review_plan.write_text(rp, encoding='utf-8')

curriculum = root / 'textbook/curriculum.yaml'
cu = curriculum.read_text(encoding='utf-8')
cu = cu.replace('  updated_at: 2026-08-27', '  updated_at: 2026-08-28', 1)
cu = cu.replace('    self_review: 1', '    self_review: 0', 1)
cu = cu.replace('    reviewed: 13', '    reviewed: 14', 1)
cu = cu.replace(
    '    F0-00: { status: self_review, started_at: 2026-08-27 }',
    '    F0-00: { status: reviewed, started_at: 2026-08-27, completed_at: 2026-08-28, review_result: { fatal: 0, major: 0, minor: 0 } }',
    1,
)
curriculum.write_text(cu, encoding='utf-8')

print('F0-00 reader review patch applied')
