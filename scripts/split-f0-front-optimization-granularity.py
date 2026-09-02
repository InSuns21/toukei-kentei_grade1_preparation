from pathlib import Path
import json, re

ROOT = Path('textbook/volumes/00_foundations')
REPO = Path('textbook')

P02 = ROOT / 'F0_02_制約付き最適化_双対_KKT'
P02A = ROOT / 'F0_02A_KKT条件の導出_接錐_polar_Farkas'
P02B = ROOT / 'F0_02B_分離超平面定理_Farkas_SVM'
P02B1 = ROOT / 'F0_02B1_SVM_凸包_最大マージン'
PC1 = ROOT / 'F0_02C1_ノルム空間_Banach_Hilbert'
PC1A = ROOT / 'F0_02C1A_Hilbert射影定理_直交分解'
PC2 = ROOT / 'F0_02C2_線形汎関数_双対空間_Riesz'


def read(p): return p.read_text()
def write(p, s):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(s)

def replace_required(s, old, new, label=''):
    if old not in s:
        raise SystemExit(f'missing replacement {label or old[:100]}')
    return s.replace(old, new)

def insert_before_check(path, exercise):
    s = read(path)
    if '## 演習' in s:
        return
    marker = '\n---\n\n## 章末チェック'
    if marker not in s:
        raise SystemExit(f'missing chapter check: {path}')
    s = s.replace(marker, '\n---\n\n' + exercise.strip() + marker, 1)
    write(path, s)

def renumber_sections(s, mapping):
    for old, new in sorted(mapping.items(), reverse=True):
        s = re.sub(rf'(?m)^## {old}\\.', f'## {new}.', s)
    return s

# ------------------------------------------------------------------
# F0-02: keep, add metadata + exercises
# ------------------------------------------------------------------
insert_before_check(P02/'index.md', r'''
## 演習

### F0-02-A01 KKTで境界解を求める

- Level: A
- 目安時間: 12分

$$
\min_x (x+1)^2
\qquad\text{subject to}\qquad x\ge0
$$

を $g(x)=-x\le0$ と書き、KKT条件から最適解と乗数を求めよ。

<!-- solution-start -->
#### 詳細解答
Lagrangianは $L=(x+1)^2-\alpha x$。KKTは $x\ge0$, $\alpha\ge0$, $2(x+1)-\alpha=0$, $\alpha x=0$。制約なし解 $x=-1$ は実行不能なので境界 $x=0$。停留条件から $\alpha=2$。
#### 本番答案
$L=(x+1)^2-\alpha x$。KKTより $x^*=0$、$2-\alpha=0$ なので $\alpha^*=2$。
#### 採点基準（20点）
- 標準形とLagrangian: 5点
- KKT 4条件: 7点
- 境界解の決定: 4点
- 乗数: 4点
<!-- solution-end -->

### F0-02-B01 弱双対性を導く

- Level: B
- 目安時間: 15分

最小化問題の実行可能点 $x$ と双対実行可能な $(\alpha,\nu)$ に対して

$$
q(\alpha,\nu)\le f(x)
$$

を示し、$d^*\le p^*$ を導け。

<!-- solution-start -->
#### 詳細解答
双対関数の定義から $q(\alpha,\nu)=\inf_z L(z,\alpha,\nu)\le L(x,\alpha,\nu)$。実行可能点では $g_i(x)\le0$, $h_j(x)=0$、かつ $\alpha_i\ge0$ なので $L(x,\alpha,\nu)\le f(x)$。従って任意の実行可能 $x$ に対し $q\le f(x)$。主問題でinf、双対問題でsupを取れば $d^*\le p^*$。
#### 本番答案
$q=\inf_zL(z,\alpha,\nu)\le L(x,\alpha,\nu)\le f(x)$。従って双対側でsup、主問題側でinfを取って $d^*\le p^*$。
#### 採点基準（20点）
- $q\le L$: 5点
- 実行可能性から $L\le f$: 7点
- 任意性の利用: 4点
- $d^*\le p^*$: 4点
<!-- solution-end -->
''')

write(P02/'chapter.yaml', '''id: "F0-02"
title: "制約付き最適化・双対問題・KKT条件"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00
  - F0-00G
learning_objectives:
  - 不等式制約を含むLagrangianを構成できる
  - 双対関数と弱双対性を導ける
  - 強双対性とSlater条件の役割を説明できる
  - KKTの4条件と相補性を使える
  - SVMの制約をKKTの標準形へ直せる
definitions:
  - { id: F002-DEF-01, name: 主問題 }
  - { id: F002-DEF-02, name: 双対関数 }
  - { id: F002-DEF-03, name: 双対問題 }
  - { id: F002-DEF-04, name: active制約 }
theorems:
  - { id: F002-THM-01, name: 弱双対性 }
  - { id: F002-THM-02, name: Slater条件下の強双対性 }
  - { id: F002-THM-03, name: KKT条件 }
canonical_examples: [1変数境界最適化, hard-margin SVM]
problem_patterns: [KKT-BASIC-1, DUALITY-WEAK-1]
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 3, exercises: 0.75, review: 0.5 }
''')
write(P02/'glossary.yaml', '''terms:
  - term: dual function
    ja: 双対関数
    definition: Lagrangianを主変数についてinfimumした、主問題最適値の下界を与える関数。
  - term: weak duality
    ja: 弱双対性
    definition: 双対問題の値が主問題の最適値を超えない性質。
  - term: complementary slackness
    ja: 相補性条件
    definition: 不等式制約の乗数とslackの積が0になるKKT条件。
''')

# 02A: keep + exercises + metadata count
insert_before_check(P02A/'index.md', r'''
## 演習

### F0-02A-A01 接錐とpolar cone

- Level: A
- 目安時間: 12分

$$
C=\{(x,y)\in\mathbb R^2:y\ge0\}
$$

の原点における接錐 $T_C(0)$ とpolar cone $T_C(0)^\circ$ を求めよ。

<!-- solution-start -->
#### 詳細解答
原点から一次的に進める方向は $d_y\ge0$ なので $T_C(0)=\{(d_x,d_y):d_y\ge0\}$。これら全てと非正の内積を持つベクトルは水平成分0、鉛直成分非正なので $T_C(0)^\circ=\{(0,-a):a\ge0\}$。
#### 本番答案
$T_C(0)=\{(d_x,d_y):d_y\ge0\}$、$T_C(0)^\circ=\{(0,-a):a\ge0\}$。
#### 採点基準（20点）
- 接方向の判定: 8点
- polarの定義適用: 8点
- 結論: 4点
<!-- solution-end -->

### F0-02A-B01 局所最適性からpolar条件

- Level: B
- 目安時間: 15分

微分可能な $f$ と実行可能集合 $C$ に対し、局所最小点 $x^*$ で

$$
-\nabla f(x^*)\in T_C(x^*)^\circ
$$

となる理由を、接錐を定義する実行可能点列から示せ。

<!-- solution-start -->
#### 詳細解答
$d\in T_C(x^*)$ に対し $x_k=x^*+t_kd+o(t_k)\in C$, $t_k\downarrow0$ を取る。局所最小性から $f(x_k)-f(x^*)\ge0$。Taylor展開して $t_k\nabla f(x^*)^Td+o(t_k)\ge0$。$t_k$ で割り極限を取れば $\nabla f(x^*)^Td\ge0$、すなわち $(-\nabla f(x^*))^Td\le0$。$d$ は任意なのでpolar coneの定義から従う。
#### 本番答案
接錐の点列 $x_k=x^*+t_kd+o(t_k)$ と局所最小性をTaylor展開へ入れ、$\nabla f(x^*)^Td\ge0$ を得る。従って $-\nabla f(x^*)\in T_C(x^*)^\circ$。
#### 採点基準（20点）
- 接錐の点列: 5点
- Taylor展開: 7点
- 極限: 4点
- polarへの結論: 4点
<!-- solution-end -->
''')
y = read(P02A/'chapter.yaml')
y = re.sub(r'exercise_counts: \{[^\n]+\}', 'exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }', y)
write(P02A/'chapter.yaml', y)

# ------------------------------------------------------------------
# 02B split: separation/Farkas core and SVM geometry branch
# ------------------------------------------------------------------
s = read(P02B/'index.md')
marker = '\n---\n\n## 15. SVMの表側：線形分離と凸包'
if marker not in s:
    raise SystemExit('missing 02B SVM split marker')
core, svm_tail = s.split(marker, 1)

first_sep = '\n---\n\n## 0. この章の前提を分離した'
if first_sep not in core:
    raise SystemExit('missing 02B intro marker')
_, core_rest = core.split(first_sep, 1)
# discard legacy section 0 and start from section 1
sec1 = '\n---\n\n## 1. 凸結合・凸集合・凸包'
if sec1 not in core_rest:
    raise SystemExit('missing 02B section1 marker')
_, core_from1 = core_rest.split(sec1, 1)
core = r'''# F0-02B 分離超平面定理・Farkasの補題

この補講では、有限次元の閉凸集合への最近点射影から分離超平面を構成し、閉凸錐の分離を経てFarkasの補題を導きます。

$$
\boxed{
\text{射影}
\to\text{分離超平面}
\to\text{凸錐の分離}
\to\text{Farkas}
\to\text{polar cone}
\to\text{KKT}
}
$$

SVMの「正負クラスの凸包」「最大マージン」「双対変数の幾何」は独立した応用サイクルなので、次講 [F0-02B1](../F0_02B1_SVM_凸包_最大マージン/index.md) へ分離しました。

---

## 0. 前提

この講義で使う床は次です。

- [F0-00C2](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)：有限次元での最小値達成・最近点
- [F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)：内積・直交射影
- [F0-00G](../F0_00G_凸集合_凸関数_凸最適化/index.md)：凸集合・凸包
- [F0-02](../F0_02_制約付き最適化_双対_KKT/index.md)：KKTの意味

Farkasの保証をKKT導出の途中で参照したい場合は [F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md) と往復できますが、**02Bの数学的必須前提に02Aは置きません**。これにより参照循環と必須前提循環を区別します。

---

## 1. 凸結合・凸集合・凸包''' + core_from1

core_ex = r'''
---

## 演習

### F0-02B-A01 射影からseparatorを作る

- Level: A
- 目安時間: 12分

$$
C=\{(x_1,x_2):x_1\le0\},\qquad z=(1,0)
$$

とする。$z$ の $C$ への最近点 $p$ を求め、$a=z-p$ を使って $C$ と $z$ を厳密に分離する不等式を書け。

<!-- solution-start -->
#### 詳細解答
最近点は $p=(0,0)$、従って $a=(1,0)$。任意の $x\in C$ で $a^Tx=x_1\le0=a^Tp$、一方 $a^Tz=1$。従って $a^Tx\le0<1=a^Tz$。
#### 本番答案
$p=(0,0)$、$a=(1,0)$。よって $x\in C$ なら $a^Tx\le0<1=a^Tz$。
#### 採点基準（20点）
- 最近点: 5点
- 法線: 5点
- 集合側の評価: 5点
- 厳密分離: 5点
<!-- solution-end -->

### F0-02B-B01 Farkas certificate

- Level: B
- 目安時間: 15分

$$
A=\begin{pmatrix}1\\1\end{pmatrix},\qquad
b=\begin{pmatrix}1\\-1\end{pmatrix}
$$

について $Ax=b,\ x\ge0$ が不可能であることを、Farkas certificate $y$ を具体的に構成して示せ。

<!-- solution-start -->
#### 詳細解答
$y=(1,-1)^T$ と取ると $A^Ty=1-1=0\le0$。一方 $b^Ty=1+1=2>0$。従ってFarkasの補題により非負解は存在しない。
#### 本番答案
$y=(1,-1)^T$ なら $A^Ty=0\le0$, $b^Ty=2>0$。従って $Ax=b,x\ge0$ は不可能。
#### 採点基準（20点）
- certificate候補: 5点
- $A^Ty\le0$: 6点
- $b^Ty>0$: 5点
- Farkasによる結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02B1 SVM・凸包・最大マージン](../F0_02B1_SVM_凸包_最大マージン/index.md)**

---

## 章末チェック

- 凸結合・凸集合・凸包・凸錐を定義できる。
- 閉凸集合への最近点から分離超平面を構成できる。
- 有限生成凸錐が閉である理由を説明できる。
- Farkasの補題を凸錐の分離から導ける。
- polar coneの公式がKKTの乗数表示へつながることを説明できる。
'''
write(P02B/'index.md', core.rstrip() + '\n' + core_ex)

# SVM tail: discard old overall chapter check; renumber 15..22 -> 1..8
svm = '## 15. SVMの表側：線形分離と凸包' + svm_tail
check_marker = '\n---\n\n## 章末チェック'
if check_marker in svm:
    svm = svm.split(check_marker, 1)[0]
svm = renumber_sections(svm, {15:1,16:2,17:3,18:4,19:5,20:6,21:7,22:8})
svm = r'''# F0-02B1 SVM・凸包・最大マージン

F0-02Bで分離超平面定理とFarkasの補題を準備しました。この講義では同じ凸幾何をSVMの**データ側**へ適用します。

$$
\boxed{
\text{正負クラスの凸包}
\to\text{非交差}
\to\text{最近点対}
\to\text{最大マージン}
\to\text{双対変数の凸結合解釈}
}
$$

---

''' + svm
svm += r'''

---

## 演習

### F0-02B1-A01 1次元SVMを凸包距離で解く

- Level: A
- 目安時間: 12分

正例を $\{2,3\}$、負例を $\{-1,0\}$ とする。二つの凸包間距離 $\delta$、最大マージン境界、canonical scaling $y_i(wx_i+b)\ge1$ における $w,b$ を求めよ。

<!-- solution-start -->
#### 詳細解答
凸包は $C_+=[2,3]$, $C_-=[-1,0]$。最近点対は $2,0$ なので $\delta=2$、中間境界は $x=1$。$w=1,b=-1$ とすれば正例 $x=2$ と負例 $x=0$ で等号となり、支持超平面間距離 $2/|w|=2=\delta$。
#### 本番答案
$C_+=[2,3], C_-=[-1,0]$ より $\delta=2$。境界は $x=1$、canonical scalingでは $w=1,b=-1$。
#### 採点基準（20点）
- 凸包: 5点
- 最近点距離: 5点
- 境界: 5点
- $w,b$ と距離確認: 5点
<!-- solution-end -->

### F0-02B1-B01 双対変数を凸包上の点へ直す

- Level: B
- 目安時間: 15分

hard-margin SVMで $\alpha_i\ge0$、$\sum_i\alpha_i y_i=0$ とする。

$$
\rho=\sum_{y_i=+1}\alpha_i=\sum_{y_i=-1}\alpha_i>0
$$

と置き、$w=\sum_i\alpha_i y_i x_i$ を二つの凸包上の点 $p,q$ を用いて $w=\rho(p-q)$ と書け。

<!-- solution-start -->
#### 詳細解答
$p=\sum_{y_i=+1}(\alpha_i/\rho)x_i$, $q=\sum_{y_i=-1}(\alpha_i/\rho)x_i$ と置く。係数は非負で各側の和が1なので $p\in C_+,q\in C_-$。差を取れば $\rho(p-q)=\sum_{+}\alpha_ix_i-\sum_-\alpha_ix_i=\sum_i\alpha_i y_i x_i=w$。
#### 本番答案
$p=\sum_+(\alpha_i/\rho)x_i$, $q=\sum_-(\alpha_i/\rho)x_i$ とすれば $p\in C_+,q\in C_-$ で、$w=\rho(p-q)$。
#### 採点基準（20点）
- $\rho$ の利用: 4点
- $p,q$ の構成: 6点
- 凸包所属: 5点
- $w=\rho(p-q)$: 5点
<!-- solution-end -->

---

## 章末チェック

- 線形分離可能性と正負クラスの凸包の非交差を結び付けられる。
- ハードマージンと凸包間最短距離の関係を説明できる。
- 双対変数 $\alpha_i$ を凸包上の点を作る係数として解釈できる。
- SVMの分類側の分離と、Farkas/KKT側の分離を区別できる。
'''
write(P02B1/'index.md', svm)
write(P02B1/'chapter.yaml', '''id: "F0-02B1"
title: "SVM・凸包・最大マージン"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-02B
learning_objectives:
  - 線形分離可能性と正負クラスの凸包非交差を結び付けられる
  - 最大マージンを二つの凸包の最近点距離として説明できる
  - SVM双対変数を凸包上の凸結合として解釈できる
  - support vectorを凸包幾何と結び付けられる
definitions: []
theorems:
  - { id: F002B1-THM-01, name: 線形分離可能性と凸包非交差の同値性 }
  - { id: F002B1-THM-02, name: 最大マージンと凸包間最短距離の対応 }
canonical_examples: [1次元hard-margin, 正負クラスの凸包, SVM双対変数]
problem_patterns: [SVM-CONVEX-HULL-1]
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2, exercises: 0.75, review: 0.5 }
''')
write(P02B1/'glossary.yaml', '''terms:
  - term: class convex hull
    ja: クラス凸包
    definition: 同じクラスの訓練点の全凸結合からなる集合。
  - term: maximum margin
    ja: 最大マージン
    definition: 二クラスを分離する支持超平面間距離を最大化する幾何。
''')
write(P02B/'chapter.yaml', '''id: "F0-02B"
title: "分離超平面定理・Farkasの補題"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00C2
  - F0-00E1
  - F0-00G
  - F0-02
learning_objectives:
  - 閉凸集合への最近点射影から分離超平面定理を導出できる
  - 有限生成凸錐の閉性を説明できる
  - 分離定理からFarkasの補題を導出できる
  - Farkas型alternativeからpolar cone表現を得られる
  - FarkasとKKT乗数表示の関係を説明できる
definitions:
  - { id: F002B-DEF-01, name: 凸錐 }
  - { id: F002B-DEF-02, name: 分離超平面 }
  - { id: F002B-DEF-03, name: 有限生成凸錐 }
  - { id: F002B-DEF-04, name: 最近点射影 }
theorems:
  - { id: F002B-THM-01, name: 閉凸集合への射影定理（有限次元） }
  - { id: F002B-THM-02, name: 点と閉凸集合の厳密分離定理 }
  - { id: F002B-THM-03, name: 閉凸錐の分離 }
  - { id: F002B-THM-04, name: Farkasの補題 }
canonical_examples: [点と閉凸集合の分離, 凸錐からFarkas, Farkas certificate]
problem_patterns: [SEP-HYPERPLANE-1, FARKAS-SEPARATION-1]
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }
''')
# update 02A prose after split
s = read(P02A/'index.md')
s = s.replace('[F0-02B 分離超平面定理・Farkasの補題・SVM](../F0_02B_分離超平面定理_Farkas_SVM/index.md)', '[F0-02B 分離超平面定理・Farkasの補題](../F0_02B_分離超平面定理_Farkas_SVM/index.md)')
s = s.replace('閉凸集合への最近点射影から分離超平面を構成し、凸錐の分離を経てFarkasを導き、さらにSVMの凸包・最大マージンへ接続しています。', '閉凸集合への最近点射影から分離超平面を構成し、凸錐の分離を経てFarkasを導きます。SVMの凸包・最大マージンは続く [F0-02B1](../F0_02B1_SVM_凸包_最大マージン/index.md) で扱います。')
write(P02A/'index.md', s)

# ------------------------------------------------------------------
# C1 split: Banach/Hilbert core vs projection theorem
# ------------------------------------------------------------------
s = read(PC1/'index.md')
marker = '\n---\n\n## 11. Hilbert空間の射影定理'
if marker not in s:
    raise SystemExit('missing C1 projection split marker')
core, proj_tail = s.split(marker, 1)
core = core.replace('# F0-02C1 関数解析I：ノルム空間・Banach空間・Hilbert空間', '# F0-02C1 関数解析I：ノルム空間・Banach空間・Hilbert空間')
core += r'''

---

## 演習

### F0-02C1-A01 有限次元ノルムの比較

- Level: A
- 目安時間: 10分

$x=(x_1,x_2)\in\mathbb R^2$ に対して

$$
\|x\|_\infty\le\|x\|_2\le\sqrt2\,\|x\|_\infty
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$\max(|x_1|,|x_2|)^2\le x_1^2+x_2^2$ から左辺。各 $|x_i|\le\|x\|_\infty$ なので $x_1^2+x_2^2\le2\|x\|_\infty^2$ から右辺。
#### 本番答案
$\|x\|_\infty^2\le x_1^2+x_2^2\le2\|x\|_\infty^2$ の平方根を取る。
#### 採点基準（20点）
- 左側: 7点
- 右側: 9点
- 結論: 4点
<!-- solution-end -->

### F0-02C1-B01 l1ノルムは内積由来ではない

- Level: B
- 目安時間: 12分

$\mathbb R^2$ の $\|x\|_1=|x_1|+|x_2|$ が内積由来のノルムではないことを、平行四辺形恒等式を使って示せ。

<!-- solution-start -->
#### 詳細解答
$x=(1,0)$, $y=(0,1)$ とする。$\|x+y\|_1^2+\|x-y\|_1^2=2^2+2^2=8$。一方 $2\|x\|_1^2+2\|y\|_1^2=4$。平行四辺形恒等式に反するので内積由来ではない。
#### 本番答案
$x=e_1,y=e_2$ で左辺8、右辺4となり平行四辺形恒等式が破れる。
#### 採点基準（20点）
- 反例選択: 4点
- 左辺計算: 6点
- 右辺計算: 6点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C1A Hilbert射影定理・直交分解](../F0_02C1A_Hilbert射影定理_直交分解/index.md)**

---

## 章末チェック

- ノルム空間とBanach空間を区別できる。
- Banach空間とHilbert空間を区別できる。
- supノルムと $L^2$ ノルムの違いを説明できる。
- $L^2$ で一点評価が一般には決まらない理由を説明できる。
- 平行四辺形恒等式が内積由来ノルムを特徴付けることを説明できる。
'''
write(PC1/'index.md', core)

proj = '## 11. Hilbert空間の射影定理' + proj_tail
next_marker = '\n---\n\n## 16. 次の講義'
if next_marker not in proj:
    raise SystemExit('missing C1 next marker')
proj = proj.split(next_marker, 1)[0]
proj = renumber_sections(proj, {11:1,12:2,13:3,14:4,15:5})
proj = r'''# F0-02C1A 関数解析I-A：Hilbert射影定理・直交分解

F0-02C1でBanach/Hilbert空間の型を分けました。この講義ではHilbert空間の**閉凸集合への最近点**を、有限次元のcompactnessに頼らず完備性と平行四辺形恒等式から構成します。

$$
\boxed{
\text{最小化列}
\to\text{Cauchy列}
\to\text{完備性}
\to\text{射影}
\to\text{直交分解}
}
$$

---

''' + proj
proj += r'''

---

## 演習

### F0-02C1A-A01 l2の座標部分空間へ射影する

- Level: A
- 目安時間: 10分

$$
H=\ell^2,\qquad M=\{x\in\ell^2:x_1=0\}
$$

とする。$z=(z_1,z_2,\dots)$ の $M$ への直交射影 $P_Mz$ と残差 $z-P_Mz$ を求めよ。

<!-- solution-start -->
#### 詳細解答
第1成分だけを0にすれば距離を最小化するので $P_Mz=(0,z_2,z_3,\dots)$。残差は $(z_1,0,0,\dots)=z_1e_1$ で、任意の $m\in M$ と直交する。
#### 本番答案
$P_Mz=(0,z_2,z_3,\dots)$、$z-P_Mz=(z_1,0,0,\dots)\in M^\perp$。
#### 採点基準（20点）
- 射影: 8点
- 残差: 5点
- 直交性: 5点
- 結論: 2点
<!-- solution-end -->

### F0-02C1A-B01 線形部分空間では射影条件が等号になる

- Level: B
- 目安時間: 15分

閉線形部分空間 $M\subset H$ と $p=P_Mz$ に対し、閉凸集合の射影条件

$$
\langle z-p,x-p\rangle\le0\qquad(\forall x\in M)
$$

から $z-p\in M^\perp$ を示せ。

<!-- solution-start -->
#### 詳細解答
任意の $m\in M$ と $t\in\mathbb R$ に対し $x=p+tm\in M$。射影条件は $t\langle z-p,m\rangle\le0$。$t>0$ と $t<0$ の両方で成立するため $\langle z-p,m\rangle=0$。$m$ は任意なので $z-p\in M^\perp$。
#### 本番答案
$x=p\pm tm$ を代入すると $\pm t\langle z-p,m\rangle\le0$。従って内積は0で、$z-p\perp M$。
#### 採点基準（20点）
- 線形部分空間の利用: 5点
- $p\pm tm$ の代入: 7点
- 等号の導出: 5点
- 直交補への結論: 3点
<!-- solution-end -->

---

## 次に進む

射影定理はRiesz表現定理の標準証明で $\ker\ell$ への射影として直ちに使います。

**次：[F0-02C2 線形汎関数・双対空間・Riesz表現](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)**

---

## 章末チェック

- 閉凸集合への射影定理の存在証明で完備性が使われる箇所を説明できる。
- 平行四辺形恒等式から最小化列がCauchyになることを説明できる。
- 射影点の一意性を示せる。
- 線形部分空間では残差が直交補空間に入ることを示せる。
'''
write(PC1A/'index.md', proj)
write(PC1/'chapter.yaml', '''id: "F0-02C1"
title: "関数解析I：ノルム空間・Banach空間・Hilbert空間"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00D1
  - F0-00D2E
  - F0-00E1
  - F0-00E2
learning_objectives:
  - 関数空間をベクトル空間として扱う意味を説明できる
  - ノルム空間・Banach空間・内積空間・Hilbert空間を区別できる
  - supノルム・L2ノルム・l2ノルムの代表例を扱える
  - 内積由来ノルムと一般ノルムを平行四辺形恒等式で区別できる
definitions:
  - { id: F002C1-DEF-01, name: ノルム空間 }
  - { id: F002C1-DEF-02, name: Banach空間 }
  - { id: F002C1-DEF-03, name: 内積空間 }
  - { id: F002C1-DEF-04, name: Hilbert空間 }
  - { id: F002C1-DEF-05, name: 直交 }
theorems:
  - { id: F002C1-THM-01, name: Cauchy--Schwarz不等式 }
  - { id: F002C1-THM-02, name: 平行四辺形恒等式 }
canonical_examples: [C区間のsupノルム, L2空間, l2空間]
problem_patterns: [FA-NORM-1]
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }
''')
write(PC1A/'chapter.yaml', '''id: "F0-02C1A"
title: "関数解析I-A：Hilbert射影定理・直交分解"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-02C1
  - F0-00G
learning_objectives:
  - Hilbert空間の閉凸集合への射影定理を説明できる
  - 最小化列がCauchyになる導出を追える
  - 射影の一意性を示せる
  - 閉線形部分空間への射影を直交分解として表せる
definitions:
  - { id: F002C1A-DEF-01, name: 直交補空間 }
theorems:
  - { id: F002C1A-THM-01, name: Hilbert空間の射影定理 }
  - { id: F002C1A-THM-02, name: 閉線形部分空間の直交分解 }
canonical_examples: [l2の座標部分空間への射影, 閉凸集合への最近点]
problem_patterns: [FA-PROJECTION-1]
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2, exercises: 0.75, review: 0.5 }
''')
write(PC1A/'glossary.yaml', '''terms:
  - term: projection theorem
    ja: 射影定理
    definition: Hilbert空間の空でない閉凸集合に各点から一意な最近点が存在する定理。
  - term: orthogonal complement
    ja: 直交補空間
    definition: 部分空間の全ての元と直交する元からなる部分空間。
''')

# C2: projection is now explicit prerequisite; add exercises
insert_before_check(PC2/'index.md', r'''
## 演習

### F0-02C2-A01 積分汎関数の双対ノルム

- Level: A
- 目安時間: 10分

$X=C([0,1])$ にsupノルムを入れ、

$$
\ell(f)=\int_0^1 f(t)\,dt
$$

とする。$\|\ell\|_{X^*}$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$|\ell(f)|\le\int_0^1|f|\le\|f\|_\infty$ より $\|\ell\|\le1$。定数関数 $f\equiv1$ は $\|f\|_\infty=1$ で $\ell(f)=1$ なので等号達成。従って $\|\ell\|=1$。
#### 本番答案
$|\ell(f)|\le\|f\|_\infty$ から上界1、$f\equiv1$ で達成するので $\|\ell\|=1$。
#### 採点基準（20点）
- 上界: 8点
- 達成例: 7点
- 結論: 5点
<!-- solution-end -->

### F0-02C2-B01 Riesz表現でkernelへの射影を使う

- Level: B
- 目安時間: 15分

$0\ne\ell\in H^*$ とし $M=\ker\ell$ とする。$y\notin M$ を取り、$u=y-P_My$ と置く。任意の $x\in H$ に対し

$$
\ell(x)=\left\langle \frac{\ell(u)}{\|u\|^2}u,x\right\rangle
$$

を示せ。

<!-- solution-start -->
#### 詳細解答
$u\in M^\perp$ かつ $\ell(u)=\ell(y)\ne0$。$\alpha=\ell(x)/\ell(u)$ と置けば $x-\alpha u\in M$。従って $0=\langle u,x-\alpha u\rangle=\langle u,x\rangle-\alpha\|u\|^2$。これを整理して所望の式を得る。
#### 本番答案
$\alpha=\ell(x)/\ell(u)$ とすると $x-\alpha u\in M$。$u\perp M$ より $\langle u,x\rangle=\alpha\|u\|^2$。従って表示式が得られる。
#### 採点基準（20点）
- $u\in M^\perp$: 4点
- $x-\alpha u\in M$: 6点
- 直交性の利用: 6点
- 表示式: 4点
<!-- solution-end -->
''')
y = read(PC2/'chapter.yaml')
y = y.replace('  - F0-02C1\n', '  - F0-02C1A\n')
y = re.sub(r'exercise_counts: \{[^\n]+\}', 'exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }', y)
write(PC2/'chapter.yaml', y)
s = read(PC2/'index.md').replace('F0-02C1の射影定理', 'F0-02C1Aの射影定理')
write(PC2/'index.md', s)

# C7A uses SVM geometry branch explicitly
p = ROOT/'F0_02C7A_representer_kernel_SVM'/'chapter.yaml'
s = read(p).replace('  - F0-02B\n', '  - F0-02B1\n')
write(p, s)

# ------------------------------------------------------------------
# Roadmaps / Facade / manifest
# ------------------------------------------------------------------
fac = read(REPO/'dream-theater.md')
old = '''3. [F0-02B 分離超平面定理・Farkas・SVM](textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md)\n4. [F0-02C 関数解析・制約想定・RKHS ロードマップ](textbook/volumes/00_foundations/F0_02C_関数解析_制約想定_RKHS/index.md)\n5. [F0-02C1 ノルム空間・Banach・Hilbert](textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md)\n6. [F0-02C2 線形汎関数・双対空間・Riesz](textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md)'''
new = '''3. [F0-02B 分離超平面定理・Farkas](textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md)\n4. [F0-02B1 SVM・凸包・最大マージン](textbook/volumes/00_foundations/F0_02B1_SVM_凸包_最大マージン/index.md)\n5. [F0-02C 関数解析・制約想定・RKHS ロードマップ](textbook/volumes/00_foundations/F0_02C_関数解析_制約想定_RKHS/index.md)\n6. [F0-02C1 ノルム空間・Banach・Hilbert](textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md)\n7. [F0-02C1A Hilbert射影定理・直交分解](textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md)\n8. [F0-02C2 線形汎関数・双対空間・Riesz](textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md)'''
fac = replace_required(fac, old, new, 'facade front list')
# renumber later C3..C7A list 7..16 to 9..18
for oldn,newn in [(16,18),(15,17),(14,16),(13,15),(12,14),(11,13),(10,12),(9,11),(8,10),(7,9)]:
    fac = fac.replace(f'\n{oldn}. [F0-02C', f'\n{newn}. [F0-02C')
write(REPO/'dream-theater.md', fac)

manifest = json.loads(read(REPO/'dream-theater-index.json'))
paths = manifest['sections'][1]['paths']
old_b = 'textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md'
old_c1 = 'textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md'
if 'textbook/volumes/00_foundations/F0_02B1_SVM_凸包_最大マージン/index.md' not in paths:
    paths.insert(paths.index(old_b)+1, 'textbook/volumes/00_foundations/F0_02B1_SVM_凸包_最大マージン/index.md')
if 'textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md' not in paths:
    paths.insert(paths.index(old_c1)+1, 'textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md')
write(REPO/'dream-theater-index.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')

r = read(ROOT/'F0_00R_基礎論ロードマップ'/'index.md')
r = replace_required(r,
'''E → E1 → E2 → F → F1 → F2 → G → F0-02 → 02A → 02B\n  ↓\nF0-02C1 → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A''',
'''E → E1 → E2 → F → F1 → F2 → G → F0-02 → 02A → 02B → 02B1\n  ↓\nF0-02C1 → C1A → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A''', 'R route')
write(ROOT/'F0_00R_基礎論ロードマップ'/'index.md', r)

rc = read(ROOT/'F0_02C_関数解析_制約想定_RKHS'/'index.md')
rc = replace_required(rc,
'''→ F0-02 → 02A → 02B\n→ C1  Banach / Hilbert\n→ C2  双対空間 / Riesz''',
'''→ F0-02 → 02A → 02B → 02B1 SVM凸包幾何\n→ C1  Banach / Hilbert\n→ C1A Hilbert射影定理 / 直交分解\n→ C2  双対空間 / Riesz''', 'C roadmap route')
rc = rc.replace('- **有限次元KKT/SVMだけ**：F0-02Bまで。', '- **有限次元KKT/Farkasまで**：F0-02Bまで。\n- **SVMの凸包・最大マージン幾何**：F0-02B1まで。')
rc = rc.replace('- **Banach/HilbertとRiesz**：F0-02C2まで。', '- **Banach/Hilbertの基礎**：F0-02C1まで。\n- **Hilbert射影定理とRiesz**：F0-02C2まで（C1Aを経由）。')
rc = rc.replace('- kernel SVM応用は `F0-02C7 + F0-02C3 + F0-02B` を使う。', '- kernel SVM応用は `F0-02C7 + F0-02C3 + F0-02B1` を使う。')
write(ROOT/'F0_02C_関数解析_制約想定_RKHS'/'index.md', rc)

# dependency graph: replace whole advanced standard block
p = REPO/'dependency-graph.md'
d = read(p)
start = d.index('## 発展補講：関数解析・RKHS標準通読')
end = d.index('\n---\n\n## 完全基礎論', start)
block = '''## 発展補講：関数解析・RKHS標準通読\n\n```text\nF0-00\n  ↓\nA → A1 → A2 → A3 → B\n  ↓\nC → C1 → C2 → D → D1\n  ↓\nD2 → D2A → D2B → D2C → D2D → D2E\n  ↓\nE → E1 → E2 → F → F1 → F2 → G\n  ↓\nF0-02 → 02A → 02B → 02B1\n  ↓\nF0-02C1 → C1A → C2\n  ↓\nC3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A\n```\n\n標準通読は細かく刻む一方、局所的な必須前提は各 `chapter.yaml` を正本とする。例としてHahn--Banach本体C6はA3+C2から、RKHS本体C7はC2から読める。02AはFarkasの証明を02Bへ参照するが、02Bは02Aを必須前提としないため循環しない。C2のRiesz標準証明はC1AのHilbert射影定理を使用する。\n'''
d = d[:start] + block + d[end:]
write(p, d)

# ------------------------------------------------------------------
# Audits: append authoritative front-route result
# ------------------------------------------------------------------
gran = REPO/'f0-dream-theater-granularity-audit.md'
s = read(gran)
section = r'''

---

## 11. F0-02前半の遡及監査

| 旧講義 | 判定 | 対応 |
|---|---|---|
| F0-02 | **WATCH / KEEP** | 双対関数→弱/強双対→KKT→相補性→SVM接続が一つの有限次元制約最適化サイクル。分割せずA/B演習とmetadataを追加。 |
| F0-02A | **OK** | 局所最適性→接錐→線形化錐→Farkas→KKT導出という一本の証明サイクル。A/B演習を追加。 |
| 旧F0-02B | **SPLIT** | 分離/Farkas本体とSVM凸包幾何が独立。02Bと02B1へ分割。 |
| 旧F0-02C1 | **SPLIT** | Banach/Hilbertの型の整理とHilbert射影定理の存在証明が独立。C1とC1Aへ分割。 |
| F0-02C2 | **OK** | 連続線形汎関数→双対空間→Riesz表現が一つの表現定理サイクル。C1Aを前提化しA/B演習を追加。 |

再編後は `F0-02 → 02A → 02B → 02B1 → C1 → C1A → C2`。特に `02A → 02B参照` と `02B → 02A必須` の循環を解消した。
'''
if '## 11. F0-02前半の遡及監査' not in s:
    s += section
write(gran, s)

for name, heading, body in [
    ('f0-dream-theater-content-exercise-audit.md','## F0-02前半の演習密度更新','F0-02 / 02A / 02B / 02B1 / C1 / C1A / C2 は全て初期A/B演習を最低1題ずつ持つ。分割後の各 `chapter.yaml` の `exercise_counts` と同期した。'),
    ('f0-dream-theater-proof-audit.md','## F0-02前半の証明責務更新','02Bは射影→分離→Farkasを証明責務として保持し、SVM凸包幾何を02B1へ分離。C1AはHilbert射影定理の存在・一意性・直交分解を証明責務として独立させ、C2のRiesz証明が明示的にC1Aを前提とする。')
]:
    p = REPO/name
    t = read(p)
    if heading not in t:
        t += '\n\n---\n\n' + heading + '\n\n' + body + '\n'
    write(p,t)

# report any direct references that deserve manual inspection
print('FRONT_SPLIT_DONE')
for p in ROOT.rglob('chapter.yaml'):
    txt = read(p)
    if 'F0-02B' in txt or 'F0-02C1' in txt:
        print(p, [ln.strip() for ln in txt.splitlines() if 'F0-02B' in ln or 'F0-02C1' in ln])
