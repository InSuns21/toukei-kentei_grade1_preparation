from pathlib import Path
import json
import re

ROOT = Path('textbook/volumes/00_foundations')
TEXTBOOK = Path('textbook')

P = {
    'P1': ROOT / 'F0_00P1_確率空間_確率変数_分布',
    'P2': ROOT / 'F0_00P2_密度_期待値_Radon_Nikodym',
    'P2A': ROOT / 'F0_00P2A_期待値_LOTUS',
    'P3': ROOT / 'F0_00P3_独立_積測度_条件付き期待値',
    'P3A': ROOT / 'F0_00P3A_条件付き期待値_Radon_Nikodym',
    'P3B': ROOT / 'F0_00P3B_L2射影_最良予測',
    'P4': ROOT / 'F0_00P4_収束_Borel_Cantelli_一様可積分性',
    'P4A': ROOT / 'F0_00P4A_一様可積分性_Vitali',
    'P5': ROOT / 'F0_00P5_大数の強法則',
    'P5A': ROOT / 'F0_00P5A_truncation_Kronecker_一般SLLN',
    'P6': ROOT / 'F0_00P6_特性関数_中心極限定理',
    'P6A': ROOT / 'F0_00P6A_iid_中心極限定理',
    'P7': ROOT / 'F0_00P7_統計モデル_尤度_正則性',
    'P7A': ROOT / 'F0_00P7A_MLE_一致性_漸近正規性',
    'P7B': ROOT / 'F0_00P7B_QMD_LAN',
}


def read(path):
    return Path(path).read_text()


def write(path, text):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.rstrip() + '\n')


def sections(text):
    matches = list(re.finditer(r'(?m)^## (\d+)\.\s+.*$', text))
    out = {}
    for i, m in enumerate(matches):
        n = int(m.group(1))
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        out[n] = text[m.start():end].rstrip()
    return out


def renumber(text, mapping):
    def repl(m):
        hashes, first, rest, tail = m.groups()
        n = int(first)
        return f'{hashes} {mapping.get(n, n)}{rest or ""}{tail}'
    return re.sub(r'(?m)^(#{2,6}) (\d+)(\.\d+)?(\.?\s+.*)$', repl, text)


def build_from(old_text, title, intro, nums, next_text, exercises):
    sec = sections(old_text)
    missing = [n for n in nums if n not in sec]
    if missing:
        raise SystemExit(f'missing sections {missing} for {title}')
    mapping = {old: new for new, old in enumerate(nums, start=1)}
    body = '\n\n---\n\n'.join(renumber(sec[n], mapping) for n in nums)
    return f'''# {title}\n\n{intro.strip()}\n\n---\n\n{body}\n\n---\n\n{exercises.strip()}\n\n---\n\n## 次に進む\n\n{next_text.strip()}\n'''


def exercise_block(items):
    chunks = ['## 演習']
    for item in items:
        chunks.append(f'''### {item['id']} {item['title']}\n\n- Level: {item['level']}\n- 目安時間: {item['minutes']}分\n\n{item['question'].strip()}\n\n<!-- solution-start -->\n#### 詳細解答\n{item['solution'].strip()}\n\n#### 本番答案\n{item['exam'].strip()}\n\n#### 採点基準（20点）\n{item['rubric'].strip()}\n<!-- solution-end -->''')
    return '\n\n'.join(chunks)


def yaml_list(items, indent='  '):
    return '\n'.join(f'{indent}- {x}' for x in items)


def chapter_yaml(id_, title, prereqs, objectives, definitions, theorems, examples, patterns, reading, ex=0.75, review=0.5):
    defs = '\n'.join(f'  - {{ id: {id_.replace("-", "").replace("00", "")}-DEF-{i:02d}, name: {x} }}' for i, x in enumerate(definitions, 1)) or '  []'
    thms = '\n'.join(f'  - {{ id: {id_.replace("-", "").replace("00", "")}-THM-{i:02d}, name: {x} }}' for i, x in enumerate(theorems, 1)) or '  []'
    return f'''id: "{id_}"\ntitle: "{title}"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n{yaml_list(prereqs)}\nofficial_scope: []\nlearning_objectives:\n{yaml_list(objectives)}\ndefinitions:\n{defs}\ntheorems:\n{thms}\ncanonical_examples: [{', '.join(examples)}]\nproblem_patterns: [{', '.join(patterns)}]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: {{ level_a: 1, level_b: 1, level_c: 0, level_d: 0 }}\nestimated_hours: {{ reading: {reading}, exercises: {ex}, review: {review} }}\n'''


def glossary(id_, terms):
    lines = [f'chapter: "{id_}"', 'terms:']
    for term, eng, meaning in terms:
        lines += [f'  - term: {term}', f'    english: {eng}', f'    meaning: {meaning}']
    return '\n'.join(lines) + '\n'


def set_meta(key, title, prereqs, objectives, definitions, theorems, examples, patterns, reading, terms):
    write(P[key] / 'chapter.yaml', chapter_yaml('F0-00' + key, title, prereqs, objectives, definitions, theorems, examples, patterns, reading))
    write(P[key] / 'glossary.yaml', glossary('F0-00' + key, terms))


# -----------------------------------------------------------------------------
# Capture legacy pages before rewriting.
# -----------------------------------------------------------------------------
old = {key: read(P[key] / 'index.md') for key in ['P1','P2','P3','P4','P5','P6','P7']}

# -----------------------------------------------------------------------------
# P1: keep as one cycle, only add exercises and route bridge.
# -----------------------------------------------------------------------------
p1_ex = exercise_block([
    dict(id='F0-00P1-A01', title='分布を押し出し測度として書く', level='A', minutes=10,
         question=r'''公平なサイコロ1回の標本空間を $\Omega=\{1,\dots,6\}$、$X(\omega)=\mathbf 1\{\omega\ge5\}$ とする。$X$ の分布 $P_X$ を求めよ。''',
         solution=r'''$P_X(\{1\})=P(X=1)=P(\{5,6\})=2/6=1/3$、$P_X(\{0\})=4/6=2/3$。これは $P_X(B)=P(X^{-1}(B))$ という押し出しの定義そのもの。''',
         exam=r'''$P_X(\{0\})=2/3,\;P_X(\{1\})=1/3$。''',
         rubric='- 逆像の利用: 8点\n- 2確率の計算: 8点\n- 分布としての結論: 4点'),
    dict(id='F0-00P1-B01', title='可測性が必要な理由', level='B', minutes=15,
         question=r'''確率変数 $X:(\Omega,\mathcal F)\to(\mathbb R,\mathcal B)$ に可測性を要求する理由を、$P(X\in B)$ の式から説明せよ。''',
         solution=r'''$P(X\in B)$ は $P(X^{-1}(B))$ の略記である。$P$ は $\mathcal F$ 上にしか定義されないので、任意のBorel集合 $B$ について $X^{-1}(B)\in\mathcal F$ が必要である。これが可測性。''',
         exam=r'''$P(X\in B)=P(X^{-1}(B))$ を定義するには $X^{-1}(B)\in\mathcal F$ が必要であり、これを全Borel集合に要求したものが可測性である。''',
         rubric='- 逆像表現: 6点\n- 確率測度の定義域: 6点\n- 可測性への接続: 6点\n- 記述: 2点')
])
if '## 演習' not in old['P1']:
    write(P['P1'] / 'index.md', old['P1'].rstrip() + '\n\n---\n\n' + p1_ex + '\n\n---\n\n## 次に進む\n\n分布を測度として定義できたので、次は [F0-00P2](../F0_00P2_密度_期待値_Radon_Nikodym/index.md) で密度をRadon--Nikodym微分として統一します。')

# -----------------------------------------------------------------------------
# P2 -> P2 + P2A
# -----------------------------------------------------------------------------
p2_ex = exercise_block([
    dict(id='F0-00P2-A01', title='Bernoulli分布をcounting measureで書く', level='A', minutes=10,
         question=r'''$P(X=1)=p$, $P(X=0)=1-p$ とする。$\{0,1\}$ 上のcounting measure $\nu$ に対する $P_X$ のRadon--Nikodym密度を求めよ。''',
         solution=r'''counting measureでは一点の測度が1なので、密度はそのままpmfである。$dP_X/d\nu(0)=1-p$, $dP_X/d\nu(1)=p$。''',
         exam=r'''$dP_X/d\nu(x)=p^x(1-p)^{1-x}\;(x=0,1)$。''',
         rubric='- counting measureの理解: 6点\n- 2点の密度: 10点\n- RN表示: 4点'),
    dict(id='F0-00P2-B01', title='支配測度を変えても同じ分布', level='B', minutes=15,
         question=r'''有限集合 $S$ 上で $\nu(\{x\})=w_x>0$ とする。確率質量 $p_x=P(X=x)$ を持つ分布の $\nu$ に対する密度 $f$ を求め、$\int_A f\,d\nu=P(X\in A)$ を確認せよ。''',
         solution=r'''一点 $\{x\}$ で $p_x=f(x)w_x$ だから $f(x)=p_x/w_x$。従って $\int_Af\,d\nu=\sum_{x\in A}(p_x/w_x)w_x=\sum_{x\in A}p_x=P(X\in A)$。''',
         exam=r'''$f(x)=p_x/w_x$。ゆえに $\int_Af\,d\nu=\sum_{x\in A}p_x$。''',
         rubric='- RN密度: 8点\n- 積分計算: 8点\n- 分布との一致: 4点')
])
p2a_ex = exercise_block([
    dict(id='F0-00P2A-A01', title='LOTUSで期待値を計算する', level='A', minutes=10,
         question=r'''$X\sim\mathrm{Unif}(0,1)$ とする。LOTUSを用いて $E[X^2]$ を求めよ。''',
         solution=r'''$P_X$ のLebesgue密度は1なので $E[X^2]=\int_0^1x^2dx=1/3$。''',
         exam=r'''$E[X^2]=\int_0^1x^2dx=1/3$。''',
         rubric='- LOTUSの式: 8点\n- 積分: 8点\n- 結論: 4点'),
    dict(id='F0-00P2A-B01', title='押し出し積分公式を説明する', level='B', minutes=15,
         question=r'''$P_X=P\circ X^{-1}$ のとき、可積分な $g$ に対して $E[g(X)]=\int g\,dP_X$ となる理由を、指示関数→単関数→一般の可測関数の順に説明せよ。''',
         solution=r'''$g=\mathbf1_B$ では両辺は $P(X\in B)=P_X(B)$。有限線形結合である単関数へ線形性で拡張し、非負可測関数は単関数の単調近似とMCT、符号付き可積分関数は正負部分へ分解して従う。''',
         exam=r'''指示関数で押し出しの定義そのもの。単関数へ線形拡張し、MCTで非負可測関数、正負部分分解で可積分関数へ拡張する。''',
         rubric='- 指示関数: 5点\n- 単関数: 4点\n- MCT: 6点\n- 符号付き関数: 5点')
])
write(P['P2']/'index.md', build_from(old['P2'], 'F0-00P2 密度・Radon–Nikodym：pmfとpdfを同じ式で読む', r'''
P1で分布を確率測度として定義しました。この講義では「密度」をLebesgue密度だけに限定せず、**基準測度に対するRadon--Nikodym微分**として統一します。

$$\boxed{P_X\ll\nu\quad\Longrightarrow\quad P_X(A)=\int_A\frac{dP_X}{d\nu}\,d\nu}$$

離散分布のpmfも連続分布のpdfもこの一式の特殊例です。期待値そのものは次講P2Aへ分離します。''', [1,2,3,4,5], '密度を統一したら [F0-00P2A 期待値・LOTUS](../F0_00P2A_期待値_LOTUS/index.md) で、確率変数の期待値を分布上の積分へ移します。', p2_ex))
write(P['P2A']/'index.md', build_from(old['P2'], 'F0-00P2A 期待値・LOTUS：確率空間から分布上の積分へ', r'''
P2で分布の密度をRadon--Nikodym微分として統一しました。次に期待値を

$$E[g(X)]=\int_\Omega g(X(\omega))\,dP(\omega)=\int g(x)\,dP_X(x)$$

という**押し出し積分公式（LOTUS）**として整理します。離散和と連続積分を別公式として暗記する必要はありません。''', [6,7,8,9,10,11,12], '期待値を積分として使えるようになったら [F0-00P3](../F0_00P3_独立_積測度_条件付き期待値/index.md) で独立性と積測度へ進みます。', p2a_ex))

# -----------------------------------------------------------------------------
# P3 -> P3 + P3A + P3B
# -----------------------------------------------------------------------------
p3_ex = exercise_block([
    dict(id='F0-00P3-A01', title='独立なら積の期待値が分解する', level='A', minutes=10,
         question=r'''独立な可積分確率変数 $X,Y$ について、積分可能性が保証されるとき $E[XY]=E[X]E[Y]$ を積測度から示せ。''',
         solution=r'''独立性より $(X,Y)$ の同時分布は $P_X\otimes P_Y$。従ってTonelli/Fubiniにより $E[XY]=\iint xy\,dP_X(x)dP_Y(y)=(\int x\,dP_X)(\int y\,dP_Y)$。''',
         exam=r'''$P_{(X,Y)}=P_X\otimes P_Y$ より、Fubiniを用いて $E[XY]=\iint xy\,dP_XdP_Y=E[X]E[Y]$。''',
         rubric='- 同時分布の積表示: 7点\n- Fubini: 7点\n- 因数分解: 6点'),
    dict(id='F0-00P3-B01', title='pairwise independentとmutual independent', level='B', minutes=15,
         question=r'''$U,V$ を独立なBernoulli$(1/2)$、$W=U\oplus V$（排他的論理和）とする。$U,V,W$ がpairwise independentだがmutually independentでないことを示せ。''',
         solution=r'''各変数はBernoulli$(1/2)$。例えば $P(U=1,W=1)=P(U=1,V=0)=1/4=P(U=1)P(W=1)$ で他の組も同様。一方 $W=U\oplus V$ なので三つの値には決定関係があり、例えば $P(U=0,V=0,W=0)=1/4\ne1/8$。''',
         exam=r'''任意の2変数の同時確率は積に分解するが、$P(U=V=W=0)=1/4\ne(1/2)^3$。従ってpairwise independentだがmutualではない。''',
         rubric='- 各周辺分布: 4点\n- pairwise確認: 8点\n- 3変数での反例: 6点\n- 結論: 2点')
])
p3a_ex = exercise_block([
    dict(id='F0-00P3A-A01', title='有限分割への条件付き期待値', level='A', minutes=12,
         question=r'''$\mathcal G=\sigma(A)$、$0<P(A)<1$ とする。$X\in L^1$ に対する $E[X\mid\mathcal G]$ を $A,A^c$ 上の定数として書け。''',
         solution=r'''$\mathcal G$-可測なので $c_1\mathbf1_A+c_0\mathbf1_{A^c}$ の形。積分一致から $c_1P(A)=E[X\mathbf1_A]$, $c_0P(A^c)=E[X\mathbf1_{A^c}]$。''',
         exam=r'''$E[X\mid\mathcal G]=\frac{E[X\mathbf1_A]}{P(A)}\mathbf1_A+\frac{E[X\mathbf1_{A^c}]}{P(A^c)}\mathbf1_{A^c}$。''',
         rubric='- G可測形: 6点\n- 積分一致: 8点\n- 結論: 6点'),
    dict(id='F0-00P3A-B01', title='tower propertyを定義から示す', level='B', minutes=15,
         question=r'''$\mathcal H\subseteq\mathcal G$ とする。$E[E[X\mid\mathcal G]\mid\mathcal H]=E[X\mid\mathcal H]$ を条件付き期待値の定義から説明せよ。''',
         solution=r'''左辺はH可測。任意の $H\in\mathcal H\subseteq\mathcal G$ について、条件付き期待値の積分一致を二回使えば $\int_H E[E[X|G]|H]dP=\int_H E[X|G]dP=\int_HXdP$。一意性から結論。''',
         exam=r'''H可測性と、全 $H\in\mathcal H$ で積分が $\int_HX\,dP$ に一致することを示し、一意性を用いる。''',
         rubric='- 可測性: 4点\n- 1回目の積分一致: 5点\n- 2回目: 5点\n- 一意性: 6点')
])
p3b_ex = exercise_block([
    dict(id='F0-00P3B-A01', title='条件付き期待値は二乗誤差を最小化する', level='A', minutes=12,
         question=r'''$X\in L^2$、$M=E[X\mid\mathcal G]$ とする。任意の $Z\in L^2(\mathcal G)$ について $E[(X-Z)^2]=E[(X-M)^2]+E[(M-Z)^2]$ を示せ。''',
         solution=r'''$X-Z=(X-M)+(M-Z)$。交差項は $M-Z$ がG可測なので $E[(X-M)(M-Z)]=0$。従って平方展開がPythagoras型に分解する。''',
         exam=r'''平方展開し、$E[(X-M)(M-Z)]=0$ を条件付き期待値の直交性から用いる。''',
         rubric='- 分解: 4点\n- 交差項: 8点\n- 直交性の理由: 5点\n- 結論: 3点'),
    dict(id='F0-00P3B-B01', title='最良予測の一意性', level='B', minutes=15,
         question=r'''上の分解から、$M=E[X\mid\mathcal G]$ が $L^2(\mathcal G)$ の中で平均二乗誤差を最小化する一意な予測であることを示せ。''',
         solution=r'''右辺第2項は非負なので $E[(X-Z)^2]\ge E[(X-M)^2]$。等号なら $E[(M-Z)^2]=0$、従って $Z=M$ a.s.。''',
         exam=r'''Pythagoras分解の第2項が非負。等号条件は $\|M-Z\|_2=0$ なので $Z=M$ a.s.。''',
         rubric='- 非負性: 6点\n- 最小性: 6点\n- 等号条件: 5点\n- a.s.一意性: 3点')
])
write(P['P3']/'index.md', build_from(old['P3'], 'F0-00P3 独立・積測度：同時分布が積になるとは何か', r'''
独立性を「相関が0」ではなく、sigma代数と同時分布の積構造として定義します。

$$\boxed{X\perp Y\quad\Longleftrightarrow\quad P_{(X,Y)}=P_X\otimes P_Y}$$

この式から積の期待値の因数分解までを一つの学習サイクルとして閉じます。条件付き期待値はP3Aへ分離します。''', [1,2,3,4,5], '独立性を積測度として理解したら [F0-00P3A 条件付き期待値](../F0_00P3A_条件付き期待値_Radon_Nikodym/index.md) へ進みます。', p3_ex))
write(P['P3A']/'index.md', build_from(old['P3'], 'F0-00P3A 条件付き期待値：部分sigma代数上のRadon–Nikodym構成', r'''
条件付き期待値は「条件を固定した平均」という公式ではなく、得られた情報 $\mathcal G$ に対して

$$\boxed{\int_G E[X\mid\mathcal G]\,dP=\int_GX\,dP\qquad(\forall G\in\mathcal G)}$$

を満たす $\mathcal G$-可測確率変数です。存在はRadon--Nikodym定理、一意性はa.e.一意性から出ます。''', [6,7,8,9,10,11,12,13], '二乗可積分な場合の幾何を見るなら [F0-00P3B L2射影・最良予測](../F0_00P3B_L2射影_最良予測/index.md) へ進みます。', p3a_ex))
p3b_text = r'''# F0-00P3B 条件付き期待値のL2射影・最良予測

P3Aでは条件付き期待値をRadon--Nikodym構成として定義しました。$X\in L^2$ なら、同じ対象をHilbert空間の**直交射影**として読むことができます。

$$\boxed{E[X\mid\mathcal G]=P_{L^2(\mathcal G)}X}$$

この見方がmartingale、時系列予測、control variateへそのまま伸びます。

---

## 1. $L^2(\mathcal G)$ は閉部分空間

$L^2(\mathcal F)$ のうち $\mathcal G$-可測な同値類だけを集めた部分空間を

$$L^2(\mathcal G)=\{Z\in L^2(\mathcal F):Z\text{ is }\mathcal G\text{-measurable}\}$$

とします。$L^2$ 極限からa.s.収束する部分列を取り、可測関数のa.s.極限が可測であることを使えば、この部分空間は閉です。従ってD2Eの$L^2$完備性によりHilbert空間の閉部分空間になります。

---

## 2. 残差は既知情報と直交する

$M=E[X\mid\mathcal G]$ とします。まず有界な $\mathcal G$-可測 $Z$ について単関数近似を使うと

$$E[(X-M)Z]=0.$$

一般の $Z\in L^2(\mathcal G)$ へは切断 $Z_K=(-K)\vee Z\wedge K$ とCauchy--Schwarzで極限を取ればよいので、

$$\boxed{X-M\perp L^2(\mathcal G)}$$

です。

---

## 3. Pythagoras分解

任意の $Z\in L^2(\mathcal G)$ に対し

$$X-Z=(X-M)+(M-Z).$$

二項は直交するので

$$\boxed{\|X-Z\|_2^2=\|X-M\|_2^2+\|M-Z\|_2^2}.$$

したがって

$$\boxed{E[X\mid\mathcal G]=\arg\min_{Z\in L^2(\mathcal G)}E[(X-Z)^2]}$$

であり、a.s.の意味で一意です。

---

## 4. 「情報が増える」と予測空間が広がる

$\mathcal H\subseteq\mathcal G$ なら

$$L^2(\mathcal H)\subseteq L^2(\mathcal G).$$

より多くの情報を許せば候補となる予測関数が増えるため、最小二乗誤差は悪化しません。tower propertyは射影の入れ子

$$P_{L^2(\mathcal H)}P_{L^2(\mathcal G)}=P_{L^2(\mathcal H)}$$

としても読めます。

---

## 5. 線形回帰との違い

線形回帰は「説明変数の線形span」への射影です。一方 $E[X\mid Y]$ は、$Y$ の**任意の可測関数**からなる $L^2(\sigma(Y))$ への射影です。したがって一般には非線形です。

Gaussianの場合には条件付き期待値が線形になるため、線形回帰と条件付き期待値が一致する特別な状況が現れます。

---

''' + p3b_ex + r'''

---

## 次に進む

条件付き期待値の測度論とHilbert幾何が揃いました。収束事象を扱う [F0-00P4](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md) へ進めます。Encore IVのmartingale・時系列予測へ行く場合、このP3BがHilbert予測の直接の橋になります。
'''
write(P['P3B']/'index.md', p3b_text)

# -----------------------------------------------------------------------------
# P4 -> P4 + P4A
# -----------------------------------------------------------------------------
p4_ex = exercise_block([
    dict(id='F0-00P4-A01', title='第一Borel–Cantelliを使う', level='A', minutes=10,
         question=r'''$P(A_n)\le 2^{-n}$ とする。$A_n$ が無限回起こる確率を求めよ。''',
         solution=r'''$\sum_nP(A_n)\le\sum_n2^{-n}<\infty$。第一Borel--Cantelliより $P(A_n\ i.o.)=0$。独立性は不要。''',
         exam=r'''$\sum P(A_n)<\infty$ なので第一Borel--Cantelliより $P(\limsup A_n)=0$。''',
         rubric='- 級数収束: 6点\n- BC適用: 8点\n- limsup/i.o.解釈: 6点'),
    dict(id='F0-00P4-B01', title='確率収束からa.s.収束部分列を取る', level='B', minutes=15,
         question=r'''$X_n\to X$ in probability とする。$P(|X_{n_k}-X|>2^{-k})\le2^{-k}$ を満たす部分列を選び、$X_{n_k}\to X$ a.s.を示せ。''',
         solution=r'''確率収束により各kでそのような $n_k$ を帰納的に選べる。確率の和が有限なので第一Borel--Cantelliより $|X_{n_k}-X|>2^{-k}$ は有限回しか起こらない。従って差はa.s.0へ行く。''',
         exam=r'''部分列を $P(|X_{n_k}-X|>2^{-k})\le2^{-k}$ と取る。確率和が有限なのでBCより超過は有限回、よってa.s.収束。''',
         rubric='- 部分列選択: 6点\n- BC: 7点\n- a.s.収束結論: 7点')
])
p4a_ex = exercise_block([
    dict(id='F0-00P4A-A01', title='Lp有界性からUIを示す', level='A', minutes=12,
         question=r'''ある $p>1$ について $\sup_nE|X_n|^p\le C$ とする。$\{X_n\}$ が一様可積分であることを示せ。''',
         solution=r'''$|X_n|\mathbf1_{|X_n|>K}\le |X_n|^p/K^{p-1}$ なので期待値は $C/K^{p-1}$ 以下。K→∞で一様に0。''',
         exam=r'''$E[|X_n|;|X_n|>K]\le K^{1-p}E|X_n|^p\le CK^{1-p}\to0$。''',
         rubric='- 点wise不等式: 8点\n- 一様上界: 6点\n- 極限: 6点'),
    dict(id='F0-00P4A-B01', title='VitaliがDCTの代役になる場面', level='B', minutes=15,
         question=r'''$X_n\to X$ in probability かつ $\{X_n\}$ がUIなら $E|X_n-X|\to0$ となる理由を、切断とtail controlの2部分に分けて説明せよ。''',
         solution=r'''大きいKでUIによりtail寄与を一様に小さくする。切断した $X_n^{(K)},X^{(K)}$ は有界で、確率収束から $L^1$ 収束する（$E|Y_n|\le\varepsilon+2K P(|Y_n|>\varepsilon)$ 型評価）。最後にtailを戻す。''',
         exam=r'''UIでtailを一様制御し、有界切断部分では確率収束⇒L1収束を使う。両誤差を足してK→∞。''',
         rubric='- tail制御: 7点\n- 有界部分: 7点\n- 誤差分解: 4点\n- 結論: 2点')
])
write(P['P4']/'index.md', build_from(old['P4'], 'F0-00P4 limsup・Borel–Cantelli・確率収束：無限回起こる事象を制御する', r'''
確率論では点列の極限だけでなく「悪い事象が無限回起こるか」を集合のlimsupで追います。

$$\boxed{\limsup_nA_n=\{A_n\text{ が無限回起こる}\}}$$

Borel--Cantelliを軸に、a.s.収束・確率収束・$L^p$収束の関係までを一講義にまとめます。期待値まで極限交換するための条件はP4Aへ分離します。''', [1,2,3,4,5,6,7,8], '確率収束だけでは期待値収束は保証されません。その不足を埋める [F0-00P4A 一様可積分性・Vitali](../F0_00P4A_一様可積分性_Vitali/index.md) へ進みます。', p4_ex))
write(P['P4A']/'index.md', build_from(old['P4'], 'F0-00P4A 一様可積分性・Vitali：確率収束からL1収束へ', r'''
確率収束は「大部分の標本で近い」ことしか保証せず、まれな巨大値が期待値を壊せます。そこでtailを一様に抑える条件

$$\boxed{\lim_{K\to\infty}\sup_nE[|X_n|\mathbf1_{\{|X_n|>K\}}]=0}$$

を導入します。これが一様可積分性（UI）で、Vitali収束定理により確率収束を$L^1$収束へ引き上げます。''', [9,10,11,12,13], '収束事象の制御を使って [F0-00P5 強大数則](../F0_00P5_大数の強法則/index.md) へ進みます。一般の有限平均版まで証明したい場合はP5Aまで進みます。', p4a_ex))

# -----------------------------------------------------------------------------
# P5 -> P5 + substantive P5A
# -----------------------------------------------------------------------------
p5_ex = exercise_block([
    dict(id='F0-00P5-A01', title='dyadic subsequenceでBCを使う', level='A', minutes=12,
         question=r'''iid、$E[X_i]=0$, $\operatorname{Var}(X_i)=\sigma^2<\infty$ とする。Chebyshevで $P(|S_{2^k}|>\varepsilon2^k)$ を評価し、その和が有限であることを示せ。''',
         solution=r'''$\operatorname{Var}(S_{2^k})=2^k\sigma^2$ なので確率は $\sigma^2/(\varepsilon^22^k)$ 以下。kについて幾何級数となり有限。BCより $S_{2^k}/2^k\to0$ a.s.。''',
         exam=r'''$P(|S_{2^k}|>\varepsilon2^k)\le\sigma^2/(\varepsilon^22^k)$。総和有限ゆえBCでdyadic上a.s.収束。''',
         rubric='- 分散: 5点\n- Chebyshev: 7点\n- 和の収束: 4点\n- BC: 4点'),
    dict(id='F0-00P5-B01', title='最大不等式で隙間を埋める', level='B', minutes=18,
         question=r'''Kolmogorov最大不等式を用いて、$2^k<n\le2^{k+1}$ の区間内変動を $2^k$ で割った量がa.s.0へ行くことを示す方針を書け。''',
         solution=r'''区間内の増分 $S_n-S_{2^k}$ に最大不等式を適用すると、最大値が $\varepsilon2^k$ を超える確率は区間の分散和 $2^k\sigma^2$ を $\varepsilon^22^{2k}$ で割った $O(2^{-k})$。総和可能なのでBCで区間最大増分/2^k→0 a.s.。''',
         exam=r'''最大不等式で $P(\max_{2^k<n\le2^{k+1}}|S_n-S_{2^k}|>\varepsilon2^k)\le C2^{-k}$。総和有限→BC。''',
         rubric='- 増分列の設定: 5点\n- 最大不等式: 7点\n- $O(2^{-k})$: 4点\n- BC: 4点')
])
write(P['P5']/'index.md', build_from(old['P5'], 'F0-00P5 Kolmogorov最大不等式・有限分散版強大数則', r'''
強大数則の有限分散版を、Chebyshevだけで無理に全nへ適用せず

$$\boxed{\text{最大不等式}\to\text{dyadic subsequence}\to\text{Borel--Cantelli}\to\text{gap filling}}$$

という標準的な証明で閉じます。$E|X|<\infty$ だけを仮定する一般iid版はP5Aへ分離します。''', [1,2,3,4,5,6,7,8], '有限分散を外し、iidかつ $E|X|<\infty$ だけでSLLNを証明するなら [F0-00P5A](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md) へ進みます。CLTへ先に進むだけならP5Aは必須ではありません。', p5_ex))
p5a_ex = exercise_block([
    dict(id='F0-00P5A-A01', title='truncated second momentの級数を抑える', level='A', minutes=15,
         question=r'''$E|X|<\infty$ とする。$Y_n=X\mathbf1_{\{|X|\le n\}}$ に対し $\sum_{n\ge1}E[Y_n^2]/n^2<\infty$ を示せ。''',
         solution=r'''Tonelliで和と期待値を交換すると $E[X^2\sum_{n\ge |X|}n^{-2}]$ 型になる。$x\ge1$ で $\sum_{n\ge x}n^{-2}\le C/x$ なので integrand は $C|X|$ で抑えられ、期待値有限。$|X|<1$ 部分も有界。''',
         exam=r'''Tonelli後、$\sum_{n\ge |X|}n^{-2}\le C/(1\vee|X|)$ を用い、全体を $C(1+|X|)$ で抑える。''',
         rubric='- Tonelli: 6点\n- tail sum評価: 7点\n- E|X|への帰着: 7点'),
    dict(id='F0-00P5A-B01', title='Kronecker補題をsummation by partsで示す', level='B', minutes=20,
         question=r'''$\sum_{n\ge1}a_n/n$ が収束するとき、$n^{-1}\sum_{k=1}^na_k\to0$ を示せ。''',
         solution=r'''$b_k=a_k/k$, $B_n=\sum_{k=1}^nb_k\to B$ と置く。$a_k=kb_k$ にsummation by partsを使うと $\sum_{k=1}^na_k=nB_n-\sum_{k=1}^{n-1}B_k$。nで割れば $B_n-(1/n)\sum_{k<n}B_k\to B-B=0$（Cesaro）。''',
         exam=r'''$B_n=\sum_{k\le n}a_k/k$ と置く。部分和変換で $n^{-1}\sum_{k\le n}a_k=B_n-n^{-1}\sum_{k<n}B_k\to0$。''',
         rubric='- $B_n$ の導入: 4点\n- summation by parts: 8点\n- Cesaro極限: 6点\n- 結論: 2点')
])
p5a_text = r'''# F0-00P5A truncation・Kolmogorov収束定理・Kronecker補題：一般iid強大数則

P5では有限分散版を証明しました。しかしiid強大数則の標準形は

$$E|X_1|<\infty$$

だけで

$$\boxed{\frac1n\sum_{k=1}^nX_k\to E[X_1]\quad\text{a.s.}}$$

を主張します。ここでは旧P5で名前だけ出ていた **Kolmogorov収束定理とKronecker補題を実際に埋めて** 証明を閉じます。

---

## 1. まず大きすぎる観測を切る

$$X_n'=X_n\mathbf1_{\{|X_n|\le n\}}$$

とします。tail-sum公式から

$$\sum_{n=1}^\infty P(|X_1|>n)\le E|X_1|<\infty.$$

iid性より $P(X_n\ne X_n')=P(|X_1|>n)$ なので第一Borel--Cantelliから

$$\boxed{X_n=X_n'\text{ eventually a.s.}}$$

です。従って元の平均と切断平均の差は有限個の項しか持たず、nで割れば0へ行きます。

---

## 2. 切断後の分散級数が有限になる

$Y_n=X_n'-E[X_n']$ と中心化します。独立性は保たれます。

$$\operatorname{Var}(Y_n)\le E[(X_n')^2].$$

Tonelliを使うと

$$
\sum_{n=1}^\infty\frac{E[(X_n')^2]}{n^2}
=E\left[X_1^2\sum_{n\ge |X_1|}\frac1{n^2}\right]
$$

という形になります。$x\ge1$ で

$$\sum_{n\ge x}\frac1{n^2}\le\frac{C}{x}$$

なので右辺は定数倍の $E|X_1|$ で抑えられます。従って

$$\boxed{\sum_n\frac{\operatorname{Var}(Y_n)}{n^2}<\infty}.$$

---

## 3. Kolmogorov収束定理

独立・中心化された $Z_n$ が

$$\sum_n\operatorname{Var}(Z_n)<\infty$$

を満たすとき

$$\boxed{\sum_nZ_n\text{ はa.s.収束する}}$$

というのがここで使うKolmogorov収束定理です。

証明の核はP5の最大不等式です。tail部分和に対して

$$
P\left(\max_{m\le k\le n}\left|\sum_{j=m}^kZ_j\right|>\varepsilon\right)
\le\frac1{\varepsilon^2}\sum_{j=m}^n\operatorname{Var}(Z_j).
$$

分散tailは0へ行くので、$m_r$ を十分速く取って右辺を可算和可能にできます。Borel--Cantelliを適用すると部分和列はa.s. Cauchyとなり、実数の完備性から収束します。

ここで

$$Z_n=\frac{Y_n}{n}$$

と置けば、前節から

$$\boxed{\sum_n\frac{Y_n}{n}\text{ converges a.s.}}$$

です。

---

## 4. Kronecker補題

数列 $a_n$ について

$$\sum_{n=1}^\infty\frac{a_n}{n}\text{ converges}$$

なら

$$\boxed{\frac1n\sum_{k=1}^na_k\to0}$$

です。

$B_n=\sum_{k=1}^na_k/k$ と置くとsummation by partsから

$$
\sum_{k=1}^na_k=nB_n-\sum_{k=1}^{n-1}B_k.
$$

nで割り、$B_n\to B$ とCesaro平均 $n^{-1}\sum_{k<n}B_k\to B$ を使えば差は0へ行きます。

$ a_n=Y_n $ に適用して

$$\boxed{\frac1n\sum_{k=1}^nY_k\to0\quad\text{a.s.}}$$

を得ます。

---

## 5. 中心を元へ戻す

DCTにより

$$E[X_n']=E[X_1\mathbf1_{\{|X_1|\le n\}}]\to E[X_1].$$

従ってCesaro平均も

$$\frac1n\sum_{k=1}^nE[X_k']\to E[X_1].$$

中心化部分と合わせて

$$\frac1n\sum_{k=1}^nX_k'\to E[X_1]\quad\text{a.s.}$$

さらに $X_k=X_k'$ eventually a.s. なので

$$\boxed{\frac1n\sum_{k=1}^nX_k\to E[X_1]\quad\text{a.s.}}$$

です。

---

## 6. 証明の地下鉄図

```text
E|X|<∞
 ↓ tail sum
ΣP(|X|>n)<∞
 ↓ Borel--Cantelli
X_n = truncated X_n eventually
 ↓
Σ Var(centered truncated X_n)/n² <∞
 ↓ Kolmogorov収束定理
Σ centered/n converges a.s.
 ↓ Kronecker補題
sample average of centered terms → 0
 ↓ DCT + Cesaro
sample average → EX
```

''' + p5a_ex + r'''

---

## 次に進む

一般iid強大数則まで証明が閉じました。分布収束へ進む [F0-00P6 特性関数・Lévy](../F0_00P6_特性関数_中心極限定理/index.md) へ進めます。
'''
write(P['P5A']/'index.md', p5a_text)

# -----------------------------------------------------------------------------
# P6 -> P6 + P6A
# -----------------------------------------------------------------------------
p6_ex = exercise_block([
    dict(id='F0-00P6-A01', title='独立和の特性関数', level='A', minutes=10,
         question=r'''独立な $X,Y$ の特性関数を $\varphi_X,\varphi_Y$ とする。$X+Y$ の特性関数を求めよ。''',
         solution=r'''独立性から $E[e^{it(X+Y)}]=E[e^{itX}e^{itY}]=E[e^{itX}]E[e^{itY}]$。''',
         exam=r'''$\varphi_{X+Y}(t)=\varphi_X(t)\varphi_Y(t)$。''',
         rubric='- 定義: 5点\n- 独立性による因数分解: 10点\n- 結論: 5点'),
    dict(id='F0-00P6-B01', title='正規分布の和を特性関数で示す', level='B', minutes=15,
         question=r'''独立な $X\sim N(\mu_1,\sigma_1^2)$, $Y\sim N(\mu_2,\sigma_2^2)$ に対し、$X+Y$ の分布を特性関数から求めよ。''',
         solution=r'''正規の特性関数は $\exp(i\mu t-\sigma^2t^2/2)$。積を取ると $\exp(i(\mu_1+\mu_2)t-(\sigma_1^2+\sigma_2^2)t^2/2)$ で、Lévyの一意性から対応する正規分布。''',
         exam=r'''特性関数の積は $\exp(i(\mu_1+\mu_2)t-(\sigma_1^2+\sigma_2^2)t^2/2)$。従って $N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$。''',
         rubric='- 正規特性関数: 6点\n- 積: 6点\n- 分布同定: 6点\n- 一意性: 2点')
])
p6a_ex = exercise_block([
    dict(id='F0-00P6A-A01', title='標準化和の特性関数を書く', level='A', minutes=12,
         question=r'''iid $E[X_i]=\mu$, $\operatorname{Var}(X_i)=\sigma^2$ とし $Z_n=(S_n-n\mu)/(\sigma\sqrt n)$。$Y=(X_1-\mu)/\sigma$ の特性関数を $\psi$ とするとき $\varphi_{Z_n}$ を書け。''',
         solution=r'''$Z_n=n^{-1/2}\sum_iY_i$。独立性より各項の特性関数を掛けて $\varphi_{Z_n}(t)=[\psi(t/\sqrt n)]^n$。''',
         exam=r'''$\varphi_{Z_n}(t)=[\psi(t/\sqrt n)]^n$。''',
         rubric='- 標準化: 6点\n- 独立性: 6点\n- 式: 8点'),
    dict(id='F0-00P6A-B01', title='Taylor展開からGaussian極限を出す', level='B', minutes=18,
         question=r'''$E[Y]=0,E[Y^2]=1$ なら $\psi(u)=1-u^2/2+o(u^2)$。これを用いて $[\psi(t/\sqrt n)]^n\to e^{-t^2/2}$ を示せ。''',
         solution=r'''$\psi(t/\sqrt n)=1-t^2/(2n)+o(1/n)$。$n\log(1-t^2/(2n)+o(1/n))\to-t^2/2$ なので指数を戻せば極限は $e^{-t^2/2}$。Lévy連続性定理で標準正規への分布収束。''',
         exam=r'''$[1-t^2/(2n)+o(n^{-1})]^n\to e^{-t^2/2}$。これは $N(0,1)$ の特性関数なのでLévyよりCLT。''',
         rubric='- 代入: 5点\n- 指数極限: 7点\n- 正規特性関数の同定: 4点\n- Lévy適用: 4点')
])
write(P['P6']/'index.md', build_from(old['P6'], 'F0-00P6 特性関数・Lévy連続性定理：分布収束をFourier変換で見る', r'''
特性関数

$$\varphi_X(t)=E[e^{itX}]$$

は常に存在し、独立和を積へ変え、分布を一意に決めます。ここではLévy連続性定理までを一講義として閉じ、中心極限定理の証明はP6Aへ分離します。''', [1,2,3,4,5,6,7,8], '独立同分布の中心極限定理を実際に導く [F0-00P6A](../F0_00P6A_iid_中心極限定理/index.md) へ進みます。Fourier解析側から見直す場合はEncore II FA3へ接続します。', p6_ex))
# everything from 9 onward becomes CLT chapter
p6_nums = sorted(n for n in sections(old['P6']) if n >= 9)
write(P['P6A']/'index.md', build_from(old['P6'], 'F0-00P6A iid中心極限定理：特性関数の局所Taylor展開', r'''
P6で準備した特性関数とLévy連続性定理を使い、iid・有限分散版CLTを

$$\boxed{\frac{S_n-n\mu}{\sigma\sqrt n}\Rightarrow N(0,1)}$$

まで導きます。核心は「独立和→積」と「0近傍の二次Taylor展開」です。''', p6_nums, 'CLTまで揃ったので [F0-00P7 正則統計モデル](../F0_00P7_統計モデル_尤度_正則性/index.md) でscoreとFisher情報へ進みます。', p6a_ex))

# -----------------------------------------------------------------------------
# P7 -> P7 + P7A + substantive P7B
# -----------------------------------------------------------------------------
p7_ex = exercise_block([
    dict(id='F0-00P7-A01', title='BernoulliモデルのscoreとFisher情報', level='A', minutes=12,
         question=r'''$X\sim\mathrm{Bernoulli}(p)$, $0<p<1$。1観測のscoreとFisher情報を求めよ。''',
         solution=r'''$\ell=p$ の対数尤度は $x\log p+(1-x)\log(1-p)$。scoreは $x/p-(1-x)/(1-p)=(x-p)/(p(1-p))$。分散を取れば $I(p)=1/[p(1-p)]$。''',
         exam=r'''$s_p(X)=(X-p)/(p(1-p))$, $I(p)=1/(p(1-p))$。''',
         rubric='- log likelihood: 5点\n- score: 8点\n- Fisher情報: 7点'),
    dict(id='F0-00P7-B01', title='Uniformモデルが正則でない理由', level='B', minutes=15,
         question=r'''$X\sim\mathrm{Unif}(0,\theta)$ が通常のscore恒等式 $E_\theta[s_\theta(X)]=0$ の議論から外れる理由を説明せよ。''',
         solution=r'''密度のsupport $(0,\theta)$ 自体がθで変わるため、$\partial_\theta\int p_\theta d\mu$ を単純に積分内微分できない。境界移動の寄与を無視すると誤る。従って共通supportやdomination/微分交換を含む正則性条件が破れる。''',
         exam=r'''supportがθ依存なので微分と積分の交換に境界項が生じ、通常のscore平均0の正則導出が使えない。''',
         rubric='- support依存: 8点\n- 微分積分交換: 7点\n- 正則性への結論: 5点')
])
p7a_ex = exercise_block([
    dict(id='F0-00P7A-A01', title='MLE Taylor展開の骨格', level='A', minutes=15,
         question=r'''1次元正則モデルで $0=\ell_n'(\hat\theta_n)$ を $\theta_0$ 周りにTaylor展開し、$\sqrt n(\hat\theta_n-\theta_0)$ の形へ整理せよ。''',
         solution=r'''$0=\ell_n'(\theta_0)+\ell_n''(\tilde\theta_n)(\hat\theta_n-\theta_0)$。従って $\sqrt n(\hat\theta_n-\theta_0)=-[n^{-1}\ell_n''(\tilde\theta_n)]^{-1}[n^{-1/2}\ell_n'(\theta_0)]$。''',
         exam=r'''$\sqrt n(\hat\theta_n-\theta_0)=-\{n^{-1}\ell_n''(\tilde\theta_n)\}^{-1}n^{-1/2}\ell_n'(\theta_0)$。''',
         rubric='- score方程式: 4点\n- Taylor: 7点\n- √n整理: 7点\n- 中間点: 2点'),
    dict(id='F0-00P7A-B01', title='KLとMLE一致性の向き', level='B', minutes=18,
         question=r'''真値 $\theta_0$ の下で $M(\theta)=E_{\theta_0}\log p_\theta(X)$ とする。KL divergenceを用いて $M(\theta)\le M(\theta_0)$ を示し、identifiabilityの役割を説明せよ。''',
         solution=r'''$M(\theta_0)-M(\theta)=E_{\theta_0}\log[p_{\theta_0}/p_\theta]=D_{KL}(P_{\theta_0}\|P_\theta)\ge0$。identifiabilityがあれば等号は分布、ひいてはparameterが同じ時だけなのでθ0が一意最大。標本対数尤度の一様収束が加わればargmax consistencyへ繋がる。''',
         exam=r'''$M(\theta_0)-M(\theta)=D_{KL}(P_{\theta_0}\|P_\theta)\ge0$。identifiabilityで等号点をθ0に一意化する。''',
         rubric='- KL表示: 8点\n- 非負性: 4点\n- identifiability: 5点\n- 一致性への橋: 3点')
])
write(P['P7']/'index.md', build_from(old['P7'], 'F0-00P7 正則統計モデル・score・Fisher情報', r'''
統計モデルを確率測度族 $\{P_\theta\}$ として定義し、共通の支配測度 $\mu$ に対する密度

$$p_\theta=\frac{dP_\theta}{d\mu}$$

から尤度・score・Fisher情報を構成します。ここでは**微分と積分の交換がいつ正当化されるか**までを正則性の中心として扱います。MLEの漸近論はP7A、QMD/LANはP7Bへ分離します。''', [1,2,3,4,5,6,7,8,9,10], '正則性を仮定してMLEの一致性・漸近正規性を組み立てる [F0-00P7A](../F0_00P7A_MLE_一致性_漸近正規性/index.md) へ進みます。局所実験の幾何へ直接進むならP7Bへ分岐できます。', p7_ex))
p7a_nums = [n for n in [11,12,13,14,15] if n in sections(old['P7'])]
p7a_body = build_from(old['P7'], 'F0-00P7A MLE一致性・漸近正規性：KL・LLN・CLT・Taylor', r'''
MLEの漸近正規性は一発の公式ではなく、

$$\boxed{\text{consistency}+\text{score CLT}+\text{Hessian LLN}+\text{Taylor}+\text{Slutsky}}$$

の合成です。特にHessianを真値近傍で評価するため、**一致性を先に確保する必要がある**ことを明示します。

### Slutskyの定理

$Y_n\Rightarrow Y$、$Z_n\to c$ in probability なら、連続な四則演算が定義される範囲で

$$Y_n+Z_n\Rightarrow Y+c,\qquad Y_nZ_n\Rightarrow cY.$$

MLEではscoreのCLTとobserved informationの確率収束を最後に合成するために使います。

### 一致性で必要なもの

各固定θでのLLNだけではargmaxの交換には足りません。典型的には、compactなparameter空間・identifiability・対数密度の連続性・可積分envelopeなどから

$$\sup_\theta\left|\frac1n\ell_n(\theta)-M(\theta)\right|\to0$$

という**一様LLN**を確保し、$M(\theta)$ の一意最大点θ0へargmaxを押し込みます。この講義ではこの十分条件を漸近論の入口として使い、一般empirical-process版までは必須にしません。''', p7a_nums, 'より座標に依存しにくい正則性である [F0-00P7B QMD・LAN](../F0_00P7B_QMD_LAN/index.md) へ進みます。', p7a_ex)
write(P['P7A']/'index.md', p7a_body)
p7b_ex = exercise_block([
    dict(id='F0-00P7B-A01', title='QMDからscore平均0を読む', level='A', minutes=15,
         question=r'''QMD展開 $\sqrt{p_{\theta+h}}=\sqrt{p_\theta}+\frac12h^Ts_\theta\sqrt{p_\theta}+r_h$ と $\int p_{\theta+h}d\mu=1$ を使い、一次項から $E_\theta[s_\theta]=0$ が現れる理由を説明せよ。''',
         solution=r'''両辺を二乗して積分し、$\|r_h\|_2=o(\|h\|)$ を使う。確率密度の積分は常に1なのでhの一次項 $h^T\int s_\theta p_\theta d\mu$ は0でなければならない。従ってscore平均0。''',
         exam=r'''正規化 $\int p_{\theta+h}=1$ の一次変分が $h^TE_\theta s_\theta$。QMD remainderは高次なので $E_\theta s_\theta=0$。''',
         rubric='- QMD展開: 5点\n- 正規化: 6点\n- 一次項抽出: 6点\n- 結論: 3点'),
    dict(id='F0-00P7B-B01', title='LANの中心列を同定する', level='B', minutes=18,
         question=r'''iid QMDモデルで $\theta_n=\theta_0+h/\sqrt n$ とする。LAN展開に現れるcentral sequence $\Delta_n$ とその極限分布を書き、二次項の意味を説明せよ。''',
         solution=r'''$\Delta_n=n^{-1/2}\sum_i s_{\theta_0}(X_i)$。score平均0・共分散$I(\theta_0)$なので多変量CLTから $\Delta_n\Rightarrow N(0,I)$。log likelihood ratioは $h^T\Delta_n-\frac12h^TIh+o_P(1)$。二次項は局所的なlog likelihood curvature/情報量を表す。''',
         exam=r'''$\Delta_n=n^{-1/2}\sum s_{\theta_0}(X_i)\Rightarrow N(0,I)$、$\log(dP_{\theta_0+h/\sqrt n}^n/dP_{\theta_0}^n)=h^T\Delta_n-\frac12h^TIh+o_P(1)$。''',
         rubric='- central sequence: 6点\n- CLT極限: 5点\n- LAN式: 6点\n- 二次項解釈: 3点')
])
p7b_text = r'''# F0-00P7B QMD・LAN：統計モデルの局所Hilbert幾何

古典的な「密度を二回微分できる」という正則性は座標依存で、supportが動く問題にも弱いことがあります。そこで密度そのものではなく **平方根密度を $L^2(\mu)$ の点として微分**します。

---

## 1. 平方根密度は単位球面上にある

$p_\theta=dP_\theta/d\mu$ とすると

$$\|\sqrt{p_\theta}\|_{L^2(\mu)}^2=\int p_\theta d\mu=1.$$

従ってparameterized modelは $L^2(\mu)$ の単位球面上の曲面として見られます。Hellinger距離も平方根密度の $L^2$ 距離から定まります。

---

## 2. Quadratic Mean Differentiability

$\theta\in\mathbb R^d$ で、あるscoreベクトル $s_\theta\in L^2(P_\theta)^d$ が存在し

$$
\int\left(\sqrt{p_{\theta+h}}-\sqrt{p_\theta}-\frac12h^Ts_\theta\sqrt{p_\theta}\right)^2d\mu
=o(\|h\|^2)
$$

なら、モデルはθで **QMD** といいます。

これは

$$\sqrt{p_{\theta+h}}=\sqrt{p_\theta}+\text{linear tangent}+o(\|h\|)_{L^2}$$

というFréchet微分型の条件です。

---

## 3. scoreとFisher情報が幾何から戻る

確率密度の正規化を一次展開すると

$$E_\theta[s_\theta]=0.$$

また接ベクトルのGram行列が

$$\boxed{I(\theta)=E_\theta[s_\theta s_\theta^T]}$$

です。つまりFisher情報は、局所parameter方向が平方根密度空間でどれだけ離れるかを測る計量として現れます。

---

## 4. なぜ $1/\sqrt n$ スケールなのか

n個のiid観測では情報がn倍になります。parameter差を固定すると2モデルは急速に識別可能になるため、非自明な局所比較には

$$\theta_n=\theta_0+\frac{h}{\sqrt n}$$

と縮めます。このスケールではscore和

$$\Delta_n=\frac1{\sqrt n}\sum_{i=1}^ns_{\theta_0}(X_i)$$

が有限な揺らぎを持ちます。

---

## 5. central sequenceのCLT

QMDからscoreは平均0、共分散 $I(\theta_0)$ を持つので、P6Aの多変量版CLTにより

$$\boxed{\Delta_n\Rightarrow N(0,I(\theta_0))}.$$

ここでGaussianが出るのは「MLEだから」ではなく、局所log likelihoodの一次項がiid scoreの和だからです。

---

## 6. LAN展開

iid QMDモデルでは標準条件の下で

$$
\boxed{
\log\frac{dP_{\theta_0+h/\sqrt n}^{\otimes n}}{dP_{\theta_0}^{\otimes n}}
=h^T\Delta_n-\frac12h^TI(\theta_0)h+o_{P_{\theta_0}}(1)
}
$$

が成り立ちます。これが **local asymptotic normality (LAN)** です。

重要なのは、元の観測分布が正規分布である必要はないことです。局所的な統計実験そのものがGaussian shift experimentへ近づきます。

---

## 7. 古典Taylor展開との対応

古典的な滑らかなモデルなら

$$\ell_{\theta+h}(x)-\ell_\theta(x)\approx h^Ts_\theta(x)-\frac12h^TI(\theta)h$$

を観測ごとに足すイメージです。しかしQMDは平方根密度の $L^2$ 微分で remainder を制御するため、単なる点wise Taylorより統計的に安定した定式化です。

---

## 8. LANで何が嬉しいか

LANは

- MLEや効率推定量の漸近正規性
- Cramér--Rao型下限の漸近版
- Wald / score / likelihood-ratio検定の局所比較
- Le Cam理論の局所実験

を同じGaussian limitへまとめる入口です。

ここではLAN展開の意味と導出構造までを扱い、Le Camの第三補題・convolution theorem・local asymptotic minimax theoremは次の発展層とします。

''' + p7b_ex + r'''

---

## 次に進む

これで「測度としての分布」から「局所Gaussian実験」まで一本で接続しました。統計理論本編へ戻るか、Fourier・確率過程・数値計算のEncoreへ分岐できます。
'''
write(P['P7B']/'index.md', p7b_text)

# -----------------------------------------------------------------------------
# Metadata / glossary for all Probability lectures.
# -----------------------------------------------------------------------------
set_meta('P1','確率空間・確率変数・分布',['F0-00D2'],
 ['確率空間を三つ組として定義できる','確率変数を可測写像として説明できる','分布を押し出し測度として構成できる','CDFと分布測度を対応付けられる'],
 ['確率空間','確率変数','押し出し測度','分布'],['押し出しによる分布の構成'],['サイコロ','Bernoulli変換','連続変数'],['PROB-SPACE-1','PUSHFORWARD-1'],3,
 [('確率空間','probability space','標本空間・sigma代数・確率測度の三つ組。'),('確率変数','random variable','確率空間から可測空間への可測写像。'),('押し出し測度','pushforward measure','写像の逆像を通じて元の測度を値域へ移した測度。'),('分布','law / distribution','確率変数が誘導する値域上の確率測度。')])
set_meta('P2','密度・Radon–Nikodym',['F0-00P1','F0-00D2A'],
 ['絶対連続性を説明できる','Radon--Nikodym密度としてpdfを定義できる','counting measureによりpmfも同じ枠組みで書ける','支配測度の役割を説明できる'],
 ['絶対連続','Radon--Nikodym密度','支配測度'],['Radon--Nikodym定理'],['Bernoulli pmf','Lebesgue pdf','重み付きcounting measure'],['RN-DENSITY-1','DOMINATING-MEASURE-1'],2.5,
 [('絶対連続','absolute continuity','nu(A)=0ならmu(A)=0となる測度間の関係。'),('Radon--Nikodym微分','Radon--Nikodym derivative','mu(A)=int_A f dnuを満たす密度f。'),('支配測度','dominating measure','モデル内の測度がすべて絶対連続になる共通基準測度。')])
set_meta('P2A','期待値・LOTUS',['F0-00P2','F0-00D2B'],
 ['期待値をLebesgue積分として定義できる','LOTUSを押し出し積分公式として説明できる','離散和と連続積分を統一できる','積分と極限交換に収束定理を使える'],
 ['期待値','LOTUS','モーメント'],['押し出し積分公式'],['離散期待値','連続期待値','変換後の期待値'],['EXPECTATION-1','LOTUS-1'],2.5,
 [('期待値','expectation','確率変数を確率測度で積分した値。'),('LOTUS','law of the unconscious statistician','g(X)の期待値をXの分布上の積分へ移す公式。'),('モーメント','moment','E[X^k]など分布の積分で定まる量。')])
set_meta('P3','独立・積測度',['F0-00P2A','F0-00D2C'],
 ['事象と確率変数の独立性をsigma代数で定義できる','独立性と同時分布の積測度表示を対応付けられる','独立性から期待値の因数分解を導ける','pairwiseとmutual independenceを区別できる'],
 ['独立なsigma代数','独立な確率変数','pairwise independence'],['独立性と積測度の同値'],['独立な二変量','XOR反例'],['INDEPENDENCE-1','PRODUCT-LAW-1'],2.5,
 [('独立','independence','関係するsigma代数の有限積確率が積へ分解する性質。'),('積測度','product measure','長方形集合の測度を各成分の測度の積として拡張した測度。'),('pairwise independence','pairwise independence','任意の2つは独立だが全体独立とは限らない性質。')])
set_meta('P3A','条件付き期待値・Radon–Nikodym',['F0-00P3','F0-00P2'],
 ['条件付き期待値を部分sigma代数上の積分一致で定義できる','Radon--Nikodym定理から存在を説明できる','a.e.一意性を説明できる','tower propertyを導ける','E[X|Y]をsigma(Y)で説明できる'],
 ['条件付き期待値','条件付き確率','sigma(Y)'],['条件付き期待値の存在','tower property'],['有限分割','独立な場合','E[X|Y]'],['COND-EXP-1','TOWER-1'],3,
 [('条件付き期待値','conditional expectation','部分sigma代数に可測で、その全事象上の積分が元の変数と一致する確率変数。'),('tower property','tower property','情報sigma代数を段階的に粗くしても直接条件付けした結果と一致する性質。'),('sigma(Y)','sigma-field generated by Y','Yから判定できる全事象を集めたsigma代数。')])
set_meta('P3B','条件付き期待値のL2射影・最良予測',['F0-00P3A','F0-00D2E'],
 ['L2(G)が閉部分空間であることを説明できる','条件付き期待値残差の直交性を示せる','Pythagoras分解から最良二乗予測を導ける','tower propertyを射影の入れ子として読める'],
 ['L2(G)','最良平均二乗予測'],['条件付き期待値の射影性','Pythagoras型誤差分解'],['最良予測','線形回帰との比較'],['COND-PROJECTION-1','BEST-PREDICTOR-1'],2.5,
 [('最良予測','best predictor','指定した情報で可測な予測の中で平均二乗誤差を最小化するもの。'),('直交射影','orthogonal projection','Hilbert空間の閉部分空間へ残差が直交するよう写す操作。')])
set_meta('P4','limsup・Borel–Cantelli・確率収束',['F0-00P3','F0-00D2B'],
 ['limsup eventを無限回発生として説明できる','Borel--Cantelliの2補題を使える','a.s.収束をlimsupで表せる','a.s./probability/Lp収束の含意を説明できる','確率収束列からa.s.収束部分列を取れる'],
 ['limsup event','almost sure convergence','convergence in probability'],['第一Borel--Cantelli','第二Borel--Cantelli','確率収束からa.s.部分列'],['rare events','dyadic subsequence'],['BOREL-CANTELLI-1','PROB-CONV-1'],3,
 [('limsup event','limsup event','無限個のnで発生する標本点の集合。'),('Borel--Cantelli','Borel--Cantelli lemma','事象確率の級数と無限回発生を結ぶ補題。'),('確率収束','convergence in probability','任意のepsilonで差がepsilonを超える確率が0へ行く収束。')])
set_meta('P4A','一様可積分性・Vitali',['F0-00P4','F0-00D2B'],
 ['確率収束だけでは期待値収束しない反例を説明できる','一様可積分性をtail controlとして定義できる','Lp有界性からUIを示せる','Vitali収束定理で確率収束をL1収束へ引き上げられる'],
 ['一様可積分性','uniform absolute continuity of integrals'],['Vitali収束定理'],['rare large values','Lp bounded family'],['UI-1','VITALI-1'],2.5,
 [('一様可積分性','uniform integrability','大きな値の期待値寄与を族全体で一様に小さくできる性質。'),('Vitali収束定理','Vitali convergence theorem','確率収束とUIからL1収束を得る定理。')])
set_meta('P5','Kolmogorov最大不等式・有限分散版強大数則',['F0-00P4'],
 ['Kolmogorov最大不等式を使える','dyadic subsequenceにBorel--Cantelliを適用できる','区間最大増分でgapを埋められる','有限分散iid強大数則を証明できる'],
 ['部分和','dyadic subsequence'],['Kolmogorov最大不等式','有限分散版強大数則'],['iid finite variance'],['KOLMOGOROV-MAX-1','SLLN-FINITE-VAR-1'],3,
 [('Kolmogorov最大不等式','Kolmogorov maximal inequality','独立中心化変数の部分和最大値を分散和で抑える不等式。'),('強大数則','strong law of large numbers','標本平均が母平均へalmost surely収束する定理。')])
set_meta('P5A','truncation・Kolmogorov収束定理・Kronecker補題・一般iid強大数則',['F0-00P5','F0-00D2C'],
 ['有限平均からtail確率和の有限性を示せる','切断変数の分散級数を評価できる','Kolmogorov収束定理を最大不等式から説明できる','Kronecker補題をsummation by partsで証明できる','一般iid強大数則を閉じた証明として再構成できる'],
 ['truncation','Kronecker補題'],['Kolmogorov収束定理','Kronecker補題','iid有限平均強大数則'],['heavy-tail finite mean'],['SLLN-TRUNCATION-1','KRONECKER-1'],4,
 [('truncation','truncation','大きすぎる観測を閾値で切って二次モーメントを制御する操作。'),('Kolmogorov収束定理','Kolmogorov convergence theorem','独立中心化項の分散和が有限なら級数がa.s.収束するという定理。'),('Kronecker補題','Kronecker lemma','重み付き級数の収束からCesaro型平均の0収束を導く補題。')])
set_meta('P6','特性関数・Lévy連続性定理',['F0-00P3','F0-00D2B'],
 ['特性関数を定義し常に存在する理由を説明できる','独立和を特性関数の積へ変換できる','特性関数が分布を一意に定めることを使える','Lévy連続性定理で分布収束を判定できる'],
 ['特性関数'],['特性関数の一意性','Lévy連続性定理'],['Gaussian characteristic function','independent sum'],['CHARFUNC-1','LEVY-1'],3,
 [('特性関数','characteristic function','E[e^{itX}]で定義される確率分布のFourier変換。'),('Lévy連続性定理','Levy continuity theorem','特性関数の点wise収束と分布収束を結ぶ定理。')])
set_meta('P6A','iid中心極限定理',['F0-00P6'],
 ['iid標準化和の特性関数を積として書ける','0近傍Taylor展開からGaussian特性関数を導ける','Lévy連続性定理でCLTを証明できる','有限分散仮定が二次項を決めることを説明できる'],
 ['標準化和'],['iid中心極限定理'],['standardized sample mean'],['CLT-CHARFUNC-1'],3,
 [('中心極限定理','central limit theorem','iid有限分散変数の標準化和が正規分布へ分布収束する定理。'),('標準化','standardization','中心化して標準偏差スケールへ直す操作。')])
set_meta('P7','正則統計モデル・score・Fisher情報',['F0-00P2','F0-00P2A','F0-00P3'],
 ['統計モデルを確率測度族として定義できる','dominated modelの尤度をRN密度で書ける','score平均0の導出に微分積分交換が必要と説明できる','Fisher情報の二表現を導ける','support依存モデルが非正則になる理由を説明できる'],
 ['統計モデル','尤度','score','Fisher情報','正則モデル'],['score identity','information identity'],['Bernoulli model','Uniform irregular model'],['SCORE-1','FISHER-1','REGULARITY-1'],3.5,
 [('統計モデル','statistical model','parameterで添字付けされた確率測度の族。'),('score','score function','log densityをparameterで微分した確率変数。'),('Fisher情報','Fisher information','scoreの共分散、または正則条件下で負の期待Hessian。'),('正則性','regularity','微分と積分の交換や共通supportなど漸近展開を正当化する条件群。')])
set_meta('P7A','MLE一致性・漸近正規性',['F0-00P7','F0-00P5','F0-00P6A'],
 ['KL divergenceからpopulation criterionの最大点を説明できる','pointwise LLNとuniform LLNを区別できる','MLE consistencyがTaylor展開に必要な理由を説明できる','score CLTとHessian LLNをSlutskyで合成できる','MLEの漸近正規性を導出できる'],
 ['MLE','一様LLN','Slutskyの定理'],['MLE consistency sufficient theorem','MLE asymptotic normality'],['regular one-dimensional MLE'],['MLE-CONSISTENCY-1','MLE-AN-1'],4,
 [('最尤推定量','maximum likelihood estimator','尤度または対数尤度を最大化するparameter推定量。'),('一様大数則','uniform law of large numbers','parameter全体で経験平均と期待値の差が一様に0へ行く性質。'),('Slutskyの定理','Slutsky theorem','分布収束と確率収束を連続演算で合成する定理。')])
set_meta('P7B','QMD・LAN',['F0-00P7','F0-00P6A','F0-00D2E'],
 ['平方根密度をL2幾何として解釈できる','QMDをL2微分として定義できる','Fisher情報を接ベクトルのGram行列として説明できる','1/sqrt(n)局所parameter化の理由を説明できる','LAN展開とcentral sequenceを記述できる'],
 ['QMD','central sequence','LAN','Hellinger距離'],['QMDからLAN','central sequence CLT'],['iid local alternatives'],['QMD-1','LAN-1'],4,
 [('QMD','quadratic mean differentiability','平方根密度がL2ノルムで一次微分可能であるという正則性。'),('central sequence','central sequence','局所尤度比の一次項となるn^{-1/2} score和。'),('LAN','local asymptotic normality','局所log likelihood ratioがGaussian shift型二次式へ近づく性質。'),('Hellinger距離','Hellinger distance','平方根密度のL2距離から定まる確率測度間距離。')])

# -----------------------------------------------------------------------------
# Reader-facing Probability roadmap.
# -----------------------------------------------------------------------------
prob_roadmap = r'''# F0-00P 確率論補講ロードマップ：測度論から統計理論へ

確率論を「公式集」ではなく、測度論から統計理論へ一本の構造として読み直す路線です。設計原則は他のDREAM THEATERと同じく **一講義一学習サイクル** です。

## 標準通読

```text
D2 測度・可測関数
 ↓
P1 確率空間・確率変数・分布
 ↓
P2 RN密度・pmf/pdf
 ↓
P2A 期待値・LOTUS
 ↓
P3 独立・積測度
 ↓
P3A 条件付き期待値
 ↓
P3B L2射影・最良予測
 ↓
P4 limsup・Borel--Cantelli・収束関係
 ↓
P4A 一様可積分性・Vitali
 ↓
P5 Kolmogorov最大不等式・有限分散SLLN
 ↓
P5A truncation・Kolmogorov収束・Kronecker・一般iid SLLN
 ↓
P6 特性関数・Lévy
 ↓
P6A iid CLT
 ↓
P7 dominated model・score・Fisher・正則性
 ↓
P7A MLE一致性・漸近正規性
 ↓
P7B QMD・LAN
```

## 標準読み順と必須前提は違う

上は通読しやすい順番です。machine-readable prerequisiteは必要な数学だけに絞ります。

- P6「特性関数・Lévy」はSLLNを必要としない。標準通読ではP5の後だが、必須前提にはしない。
- P6Aのiid CLTもSLLNを証明に使わない。
- P5Aの一般SLLNはheavy-tailまで追う読者向けで、CLTへ進むための必須駅ではない。
- P7B QMD/LANはP7AのMLE論を必須にせず、P7 + P6A + L2基礎から読める。
- P3BはEncore IVの時系列予測に重要だが、確率過程のfiltrationへ進むだけならP3Aまででよい。

## どこで降りるか

- **確率変数・期待値を測度論で読みたい**：P2Aまで。
- **条件付き期待値・martingaleへ行きたい**：P3Aまで。Hilbert予測も見るならP3B。
- **a.s.収束とBorel--Cantelli**：P4まで。
- **期待値まで極限交換したい**：P4Aまで。
- **有限分散SLLN**：P5まで。
- **一般iid有限平均SLLNの証明**：P5Aまで。
- **CLT**：P6→P6A。
- **正則統計モデル**：P7。
- **MLE漸近論**：P7A。
- **Le Cam方向の入口**：P7B。

## 今回あえて先へ送るもの

この路線でも、次は別Encore/発展層へ送ります。

- Kolmogorov extension theoremの完全証明
- martingale convergence theorem（Encore IV）
- Lévy--Khintchine formula
- stable law一般論
- empirical processによる一般M-estimator理論
- Le Cam第三補題・convolution theorem・local asymptotic minimax theorem

一方、旧P5で名前だけ登場していた **Kolmogorov収束定理とKronecker補題はP5Aで証明を閉じました**。
'''
write(ROOT/'F0_00P_確率論_測度論から統計理論へ/index.md', prob_roadmap)

# -----------------------------------------------------------------------------
# Facade / manifest / global roadmaps.
# -----------------------------------------------------------------------------
prob_paths = [
 'textbook/volumes/00_foundations/F0_00P_確率論_測度論から統計理論へ/index.md',
 'textbook/volumes/00_foundations/F0_00P1_確率空間_確率変数_分布/index.md',
 'textbook/volumes/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/index.md',
 'textbook/volumes/00_foundations/F0_00P2A_期待値_LOTUS/index.md',
 'textbook/volumes/00_foundations/F0_00P3_独立_積測度_条件付き期待値/index.md',
 'textbook/volumes/00_foundations/F0_00P3A_条件付き期待値_Radon_Nikodym/index.md',
 'textbook/volumes/00_foundations/F0_00P3B_L2射影_最良予測/index.md',
 'textbook/volumes/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md',
 'textbook/volumes/00_foundations/F0_00P4A_一様可積分性_Vitali/index.md',
 'textbook/volumes/00_foundations/F0_00P5_大数の強法則/index.md',
 'textbook/volumes/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md',
 'textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md',
 'textbook/volumes/00_foundations/F0_00P6A_iid_中心極限定理/index.md',
 'textbook/volumes/00_foundations/F0_00P7_統計モデル_尤度_正則性/index.md',
 'textbook/volumes/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md',
 'textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md',
]
manifest_path = TEXTBOOK/'dream-theater-index.json'
data = json.loads(read(manifest_path))
for sec in data['sections']:
    if sec['name'] == '確率論':
        sec['paths'] = prob_paths
        break
else:
    raise SystemExit('probability manifest section missing')
write(manifest_path, json.dumps(data, ensure_ascii=False, indent=2))

facade = TEXTBOOK/'dream-theater.md'
s = read(facade)
start = s.index('### 2. 確率論「それどこから来た？」')
end = s.index('\n\n---', start)
block = '''### 2. 確率論「それどこから来た？」\n\n1. [確率論補講ロードマップ](textbook/volumes/00_foundations/F0_00P_確率論_測度論から統計理論へ/index.md)\n2. [P1 確率空間・確率変数・分布](textbook/volumes/00_foundations/F0_00P1_確率空間_確率変数_分布/index.md)\n3. [P2 RN密度・pmf/pdf](textbook/volumes/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/index.md)\n4. [P2A 期待値・LOTUS](textbook/volumes/00_foundations/F0_00P2A_期待値_LOTUS/index.md)\n5. [P3 独立・積測度](textbook/volumes/00_foundations/F0_00P3_独立_積測度_条件付き期待値/index.md)\n6. [P3A 条件付き期待値](textbook/volumes/00_foundations/F0_00P3A_条件付き期待値_Radon_Nikodym/index.md)\n7. [P3B L2射影・最良予測](textbook/volumes/00_foundations/F0_00P3B_L2射影_最良予測/index.md)\n8. [P4 limsup・Borel–Cantelli・収束関係](textbook/volumes/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md)\n9. [P4A 一様可積分性・Vitali](textbook/volumes/00_foundations/F0_00P4A_一様可積分性_Vitali/index.md)\n10. [P5 Kolmogorov最大不等式・有限分散SLLN](textbook/volumes/00_foundations/F0_00P5_大数の強法則/index.md)\n11. [P5A truncation・Kronecker・一般iid SLLN](textbook/volumes/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md)\n12. [P6 特性関数・Lévy](textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md)\n13. [P6A iid中心極限定理](textbook/volumes/00_foundations/F0_00P6A_iid_中心極限定理/index.md)\n14. [P7 正則統計モデル・score・Fisher](textbook/volumes/00_foundations/F0_00P7_統計モデル_尤度_正則性/index.md)\n15. [P7A MLE一致性・漸近正規性](textbook/volumes/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md)\n16. [P7B QMD・LAN](textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md)'''
write(facade, s[:start] + block + s[end:])

road = ROOT/'F0_00R_基礎論ロードマップ/index.md'
s = read(road)
oldblock = '''## 3. 確率論「それどこから来た？」\n\n```text\nD2 → P1 確率空間・確率変数・分布\nD2A ─→ P2 Radon--Nikodym・密度・期待値\nD2C / D2E ─→ P3 独立・積測度・条件付き期待値\nD2B ─────────→ P4 収束・Borel--Cantelli・一様可積分性\n                 ↓\n                P5 強大数則 → P6 特性関数・CLT → P7 統計モデル・尤度・正則性\n```\n\n確率変数を可測写像、分布を押し出し測度、pdfをRadon--Nikodym密度、期待値をLebesgue積分として読み直します。'''
newblock = '''## 3. 確率論「それどこから来た？」\n\n```text\nD2 → P1 → P2 → P2A → P3 → P3A → P3B\n                           ↓\nP4 → P4A → P5 → P5A\n              │\n              └────→ P6 → P6A → P7 → P7A\n                                      └────→ P7B QMD/LAN\n```\n\n密度/期待値、独立/条件付き期待値、収束/UI、有限分散/一般SLLN、特性関数/CLT、正則モデル/MLE/LANを独立講義へ分けました。標準通読では上の順に読めますが、P5AはCLTの必須前提ではなく、P7BもP7Aを必須前提にしません。'''
if oldblock not in s:
    raise SystemExit('global roadmap probability block missing')
s = s.replace(oldblock,newblock)
s = s.replace('P5/P6 ─→ MC1 Monte Carlo', 'P5/P6A ─→ MC1 Monte Carlo')
s = s.replace('D2からP1〜P7。', 'D2からP1〜P7B。')
s = s.replace('└→ Probability P1 → ... → P7', '└→ Probability P1 → ... → P7B')
write(road,s)

# dependency graph exact block
path = TEXTBOOK/'dependency-graph.md'
s = read(path)
start = s.index('## 確率論「それどこから来た？」')
end = s.index('\n\n---', start)
block = '''## 確率論「それどこから来た？」\n\n```text\nF0-00D2\n  ↓\nP1 確率空間・確率変数・分布\n  ↓\nP2 RN密度・pmf/pdf → P2A 期待値・LOTUS\n  ↓\nP3 独立・積測度 → P3A 条件付き期待値 → P3B L2射影・最良予測\n  ↓\nP4 limsup・Borel--Cantelli → P4A UI・Vitali\n  ↓\nP5 有限分散SLLN → P5A 一般iid SLLN\n  │\n  └────────────→ P6 特性関数・Lévy → P6A iid CLT\n                                      ↓\nP7 正則model・score・Fisher → P7A MLE漸近論\n                         └──→ P7B QMD・LAN\n```\n\n標準通読と必須前提は分離する。P6/P6AはSLLNを証明に使わず、P5Aはheavy-tailまでSLLNを証明したい読者向け。P3BはHilbert予測への橋、P7BはP7Aを経由せずQMD/LANへ入れる。'''
s = s[:start] + block + s[end:]
s = s.replace('F0-00P3 / P4 / P6 / F0-02C1 / F0-00FA2', 'F0-00P3A / P4 / P6 / F0-02C1 / F0-00FA2')
s = s.replace('F0-00P5 / P6\n  ↓\nF0-00MC1', 'F0-00P5 / P6A\n  ↓\nF0-00MC1')
write(path,s)

# -----------------------------------------------------------------------------
# Downstream minimal prerequisites and reader-facing route references.
# -----------------------------------------------------------------------------
def replace_yaml(path, oldtext, newtext):
    p = Path(path)
    s = read(p)
    if oldtext not in s:
        raise SystemExit(f'missing dependency replacement in {p}: {oldtext!r}')
    write(p, s.replace(oldtext,newtext))

replace_yaml(ROOT/'F0_00SP1_確率過程_filtration_stopping/chapter.yaml', '  - F0-00P3\n  - F0-00P4', '  - F0-00P3A')
replace_yaml(ROOT/'F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/chapter.yaml', '  - F0-00P3\n  - F0-00P4', '  - F0-00P3A\n  - F0-00P4')
replace_yaml(ROOT/'F0_00MC1_Monte_Carlo積分_LLN_CLT_誤差/chapter.yaml', '  - F0-00P5\n  - F0-00P6', '  - F0-00P5\n  - F0-00P6A')

# reader-facing Encore roadmaps: only exact old route labels, no machine dependency overreach
for path in [ROOT/'F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md', ROOT/'F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md']:
    s = read(path)
    s = s.replace('F0-00P3 / F0-00P4 / F0-00P6', 'F0-00P3A / F0-00P4 / F0-00P6')
    s = s.replace('P3 / P4 / P6', 'P3A / P4 / P6')
    s = s.replace('P5 / P6', 'P5 / P6A')
    s = s.replace('P5/P6', 'P5/P6A')
    write(path,s)

# -----------------------------------------------------------------------------
# Granularity audit: append authoritative Probability result.
# -----------------------------------------------------------------------------
audit = TEXTBOOK/'f0-dream-theater-granularity-audit.md'
s = read(audit)
marker = '\n---\n\n## Probability P1〜P7 遡及監査（2026-09-02）'
if marker not in s:
    s += r'''

---

## Probability P1〜P7 遡及監査（2026-09-02）

Probability補講も同じ「一講義一学習サイクル」で再監査した。

| 旧講義 | 判定 | 再編後 |
|---|---|---|
| P1 | **OK** | 確率空間→確率変数→押し出し分布で一サイクル。 |
| P2 | **SPLIT済み** | P2 RN密度 / P2A 期待値・LOTUS。 |
| P3 | **SPLIT済み** | P3 独立・積測度 / P3A 条件付き期待値 / P3B L2射影・最良予測。 |
| P4 | **SPLIT済み** | P4 limsup・Borel--Cantelli・収束関係 / P4A UI・Vitali。 |
| P5 | **SPLIT済み** | P5 有限分散SLLN / P5A truncation・Kolmogorov収束・Kronecker・一般iid SLLN。 |
| P6 | **SPLIT済み** | P6 特性関数・Lévy / P6A iid CLT。 |
| P7 | **SPLIT済み** | P7 正則model / P7A MLE漸近論 / P7B QMD・LAN。 |

特にP5Aでは旧ページが名称だけ使っていたKolmogorov収束定理・Kronecker補題を講義内で定義・証明し、「未定義語に殴られる」箇所を解消した。P7BはQMDを平方根密度のL2微分として導入し、central sequenceとLANまで独立した学習サイクルにした。

標準読み順とmachine-readable prerequisiteは分離し、P6/P6AへP5Aを強制せず、P7BへP7Aを強制しない。
'''
write(audit,s)

# -----------------------------------------------------------------------------
# Diagnostics: list remaining direct references so they can be classified.
# -----------------------------------------------------------------------------
print('PROBABILITY_SPLIT_DONE')
for yml in sorted(ROOT.rglob('chapter.yaml')):
    txt = read(yml)
    hits = [ln.strip() for ln in txt.splitlines() if re.search(r'F0-00P(?:2|3|4|5|6|7)(?:\b|A|B)', ln)]
    if hits:
        print(yml, hits)

for md in [TEXTBOOK/'dependency-graph.md', TEXTBOOK/'dream-theater.md', ROOT/'F0_00R_基礎論ロードマップ/index.md', ROOT/'F0_00P_確率論_測度論から統計理論へ/index.md']:
    if not md.exists():
        raise SystemExit(f'missing synchronized route: {md}')
