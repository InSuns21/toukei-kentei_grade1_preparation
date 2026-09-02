from pathlib import Path
import json, re

ROOT = Path('textbook/volumes/00_foundations')

def read(p): return Path(p).read_text()
def write(p, s):
    p = Path(p); p.parent.mkdir(parents=True, exist_ok=True)
    while '\n---\n\n---\n' in s:
        s = s.replace('\n---\n\n---\n', '\n---\n')
    p.write_text(s.strip() + '\n')
def between(s, a, b=None):
    i=s.index(a); j=s.index(b, i) if b else len(s); return s[i:j].strip()
def renum(s):
    n=0
    def repl(m):
        nonlocal n; n+=1; return f'## {n}. '
    return re.sub(r'^## \d+\. ', repl, s, flags=re.M)

def ex(aid, atitle, abody, asol, bid, btitle, bbody, bsol):
    return f'''---

## 演習

### {aid} {atitle}

- Level: A
- 目安時間: 10分

{abody}

<!-- solution-start -->
#### 詳細解答
{asol}
#### 本番答案
{asol}
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### {bid} {btitle}

- Level: B
- 目安時間: 15分

{bbody}

<!-- solution-start -->
#### 詳細解答
{bsol}
#### 本番答案
{bsol}
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->'''

D3=ROOT/'F0_02C3_Frechet微分_線形作用素_随伴'
D3A=ROOT/'F0_02C3A_随伴作用素_Banach_Hilbert'
D4=ROOT/'F0_02C4_凸解析_劣勾配_normal_cone_双対錐'
D4A=ROOT/'F0_02C4A_tangent_polar_dual_cone'
D5=ROOT/'F0_02C5_一般化KKT_制約写像_制約想定'
D5A=ROOT/'F0_02C5A_制約想定_LICQ_MFCQ_Robinson'
D6=ROOT/'F0_02C6_Hahn_Banach_分離定理'
D6A=ROOT/'F0_02C6A_分離定理_Minkowski_Farkas'
D7=ROOT/'F0_02C7_RKHS_再生核_representer_kernel_SVM'
D7A=ROOT/'F0_02C7A_representer_kernel_SVM'

c3=read(D3/'index.md'); c4=read(D4/'index.md'); c5=read(D5/'index.md'); c6=read(D6/'index.md'); c7=read(D7/'index.md')

c3core=renum(between(c3,'## 1. 一変数微分を「一次近似」として読み直す','## 13. Banach空間での随伴作用素'))
c3adj=renum(between(c3,'## 13. Banach空間での随伴作用素','## 19. 次の講義'))
c4core=renum(between(c4,'## 1. 凸集合','## 15. tangent cone'))
c4cone=renum(between(c4,'## 15. tangent cone','## 章末チェック'))
c5core=renum(between(c5,'## 1. 不等式制約を錐でまとめる','## 8. ところがKKTは局所最適だけでは保証されない'))
c5cq=renum(between(c5,'## 8. ところがKKTは局所最適だけでは保証されない','## 21. 次の講義'))
c6core=renum(between(c6,'## 1. なぜ「線形汎関数の拡張」が分離につながるのか','## 14. 超平面を汎関数で定義する'))
c6sep=renum(between(c6,'## 14. 超平面を汎関数で定義する','## 23. 次の講義'))
c7core=renum(between(c7,'## 1. なぜ一般のHilbert関数空間では足りないのか','## 16. representer theoremが必要になる理由'))
c7app=renum(between(c7,'## 16. representer theoremが必要になる理由','## 章末チェック'))

# Undefined-term repairs.
c6core=c6core.replace('[F0-00A2 選択公理・Zornの補題・極大原理](../F0_00A2_選択公理_Zorn_極大原理/index.md)','[F0-00A3 半順序・Zornの補題・極大延長](../F0_00A3_半順序_Zorn_極大延長/index.md)')
c6sep=c6sep.replace('原点を内部に含む吸収的な凸集合 $U$ に対し','集合 $U$ が **吸収的（absorbing）** であるとは、任意の $x$ に対し十分大きい $t>0$ を取れば $x\\in tU$ となることです。\n\n原点を内部に含む吸収的な凸集合 $U$ に対し')
c7core=c7core.replace('その後、完備化します。','ここで **完備化（completion）** とは、もとの内積空間を稠密部分空間として含む完備な内積空間へ拡張する操作です。一般にはCauchy列の同値類を用いて構成でき、完備化は等長同型を除いて一意です。\n\nその後、この意味で完備化します。')
c7core=c7core.replace('ここでF0-00Dの「完備化」が実際に登場しました。','ここで、上で定義した「完備化」が実際に登場しました。')

E3=ex('F0-02C3-A01','ノルム二乗のFréchet微分',r'''Hilbert空間 $H$ 上の $f(x)=\\frac12\\|x\\|^2$ について $Df(x)[h]$ を求めよ。''',r'''展開 $f(x+h)-f(x)=\\langle x,h\\rangle+\\frac12\\|h\\|^2$ より $Df(x)[h]=\\langle x,h\\rangle$。残差は $O(\\|h\\|^2)=o(\\|h\\|)$。''','F0-02C3-B01','有界線形作用素はLipschitz',r'''有界線形作用素 $T:X\\to Y$ に対し $\\|Tx-Ty\\|\\le\\|T\\|\\|x-y\\|$ を示し、連続性を結論せよ。''',r'''線形性より $Tx-Ty=T(x-y)$。作用素ノルムの定義から $\\|T(x-y)\\|\\le\\|T\\|\\|x-y\\|$。従ってTはLipschitz連続。''')
E3A=ex('F0-02C3A-A01','行列の随伴',r'''$T(x)=Ax$ をEuclid空間間の線形写像とする。随伴が $A^{\\mathsf T}$ で表されることを示せ。''',r'''$\\langle Ax,y\\rangle=x^{\\mathsf T}A^{\\mathsf T}y=\\langle x,A^{\\mathsf T}y\\rangle$ なのでHilbert随伴は $A^{\\mathsf T}$。''','F0-02C3A-B01','積分作用素の随伴',r'''$(Tf)(s)=\\int K(s,t)f(t)dt$ のHilbert随伴を、積分順序を交換できると仮定して求めよ。''',r'''$\\langle Tf,g\\rangle=\\int f(t)[\\int K(s,t)g(s)ds]dt$ より $(T^\\dagger g)(t)=\\int K(s,t)g(s)ds$。''')
E4=ex('F0-02C4-A01','絶対値の劣微分',r'''$f(x)=|x|$ について $\\partial f(0)$ を求めよ。''',r'''劣勾配$a$は $|y|\\ge ay$ を全てのyで満たす必要がある。これは $-1\\le a\\le1$ と同値なので $\\partial f(0)=[-1,1]$。''','F0-02C4-B01','normal coneで最適性を確認',r'''$C=[0,\\infty)$、$f(x)=\\frac12(x+1)^2$ とする。$x^*=0$ で $-f'(x^*)\\in N_C(x^*)$ を確認せよ。''',r'''$f'(0)=1$、$N_C(0)=(-\\infty,0]$ なので $-f'(0)=-1\\in N_C(0)$。従って一次最適性条件を満たす。''')
E4A=ex('F0-02C4A-A01','非負直交錐の双対',r'''$K=\\mathbb R_+^m$ について $K^*=K$ を示せ。''',r'''$\\lambda\\in K^*$ なら標準基底 $e_i\\in K$ により $\\lambda_i\\ge0$。逆に $\\lambda,k\\ge0$ なら $\\lambda^Tk\\ge0$。''','F0-02C4A-B01','半空間のtangentとpolar',r'''$C=\\{x:a^Tx\\le b\\}$ の境界点 $x$ で $T_C(x)=\\{d:a^Td\\le0\\}$ とそのpolarを求めよ。''',r'''一次的に実行可能なのは $a^Td\\le0$。この半空間錐のpolarは $\\{\\lambda a:\\lambda\\ge0\\}$ で、これは $N_C(x)$ に一致する。''')
E5=ex('F0-02C5-A01','不等式を錐制約にまとめる',r'''$g_i(x)\\le0$ $(i=1,\\dots,m)$ を一つの錐制約として書け。''',r'''$G(x)=(g_1(x),\\dots,g_m(x))$、$K=\\mathbb R_+^m$ と置けば $G(x)\\in-K$。双対乗数は $\\lambda\\in K^*=\\mathbb R_+^m$。''','F0-02C5-B01','一般化KKTから通常KKTを復元',r'''$X=\\mathbb R^p,Y=\\mathbb R^m,K=\\mathbb R_+^m$ として一般化stationarityを通常のJacobian表記へ戻せ。''',r'''Riesz同一視と随伴=転置から $Df+DG^*\\lambda=0$ は $\\nabla f+J_G^T\\lambda=0$ になる。$K^*=K$ から $\\lambda_i\\ge0$、相補性から $\\lambda_i g_i=0$。''')
E5A=ex('F0-02C5A-A01','退化制約でMFCQが壊れる',r'''$g(x)=x^2\\le0$ の実行可能点0でMFCQが失敗する理由を述べよ。''',r'''active制約の微分は $g'(0)=0$。MFCQが要求する $g'(0)d<0$ を満たす方向dは存在しない。''','F0-02C5A-B01','MFCQは成立するがLICQは失敗する例',r'''$g_1(x)=x\\le0$, $g_2(x)=2x\\le0$ を0で考える。LICQとMFCQを判定せよ。''',r'''active勾配1と2は一次従属なのでLICQは失敗。一方 $d=-1$ なら両方の方向微分が負なのでMFCQは成立する。''')
E6=ex('F0-02C6-A01','一次元からのノルム保存拡張',r'''$M=\\operatorname{span}(e_1)\\subset\\mathbb R^2$、$f_0(te_1)=t$ とする。Euclidノルムに関してノルム1の延長を一つ与えよ。''',r'''$f(x_1,x_2)=x_1$ とすれば $f|_M=f_0$ で $\\|f\\|=1$。Hahn--Banachのノルム保存拡張の具体例。''','F0-02C6-B01','双対空間で非零点を検出',r'''ノルム空間の $x_0\\ne0$ に対し、$\\|f\\|=1$, $f(x_0)=\\|x_0\\|$ を満たす $f\\in X^*$ が存在する理由を説明せよ。''',r'''$M=\\operatorname{span}(x_0)$ 上で $f_0(tx_0)=t\\|x_0\\|$ と定めると $\\|f_0\\|=1$。Hahn--Banachでノルムを保って全空間へ延長する。''')
E6A=ex('F0-02C6A-A01','半空間を分離する汎関数',r'''$C=\\{x\\in\\mathbb R^2:x_1\\le0\\}$ と $z=(1,0)$ を強分離する線形汎関数を与えよ。''',r'''$f(x)=x_1$ とすれば $\\sup_{x\\in C}f(x)=0<1=f(z)$。''','F0-02C6A-B01','Farkas型certificate',r'''$K=\\mathbb R_+^2$、$b=(-1,1)$ とする。$b\\notin K$ を分離する $y$ で $y\\le0$, $b^Ty>0$ を満たすものを一つ与えよ。''',r'''$y=(-1,0)$ とすれば $y\\le0$ かつ $b^Ty=1>0$。有限次元の分離が実行不能性certificateになる例。''')
E7=ex('F0-02C7-A01','線形kernelのPSD性',r'''$K(x,z)=x^Tz$ がPSD kernelであることを示せ。''',r'''任意の係数$c_i$について $\\sum_{ij}c_ic_jx_i^Tx_j=\\|\\sum_i c_ix_i\\|^2\\ge0$。''','F0-02C7-B01','評価汎関数のノルム',r'''RKHSで $\\|\\delta_x\\|=\\sqrt{K(x,x)}$ を示せ。''',r'''Riesz表現で $\\delta_x(f)=\\langle f,K_x\\rangle$ なので $\\|\\delta_x\\|=\\|K_x\\|$。さらに $\\|K_x\\|^2=K(x,x)$。''')
E7A=ex('F0-02C7A-A01','直交成分は訓練点で見えない',r'''$S=\\operatorname{span}\\{K_{x_i}\\}$、$f_\\perp\\in S^\\perp$ とする。$f_\\perp(x_i)=0$ を示せ。''',r'''再生性より $f_\\perp(x_i)=\\langle f_\\perp,K_{x_i}\\rangle=0$。''','F0-02C7A-B01','kernel SVMの有限和',r'''Hilbert空間SVMのstationarityから $w=\\sum_i\\alpha_i y_i\\varphi(x_i)$ が出る理由を説明せよ。''',r'''$w$ 方向の微分を0とすると $\\langle w-\\sum_i\\alpha_i y_i\\varphi(x_i),h\\rangle=0$ が全hで成立。内積の非退化性より括弧内が0。''')

write(D3/'index.md',f'''# F0-02C3 関数解析III：Fréchet微分・有界線形作用素・連鎖律

この講義では「微分とはベクトルではなく一次近似作用素である」を主題にします。随伴作用素は次講C3Aへ分離します。

{c3core}

{E3}

---

## 次に進む

**次：[F0-02C3A 随伴作用素・Banach双対・Hilbert随伴](../F0_02C3A_随伴作用素_Banach_Hilbert/index.md)**''')
write(D3A/'index.md',f'''# F0-02C3A 関数解析III-A：随伴作用素・Banach双対・Hilbert随伴

有界線形作用素を出力側の汎関数から入力側へ引き戻す操作が随伴です。KKTの $DG(x)^*\\lambda$ の型をここで閉じます。

{c3adj}

{E3A}

---

## 次に進む

**次：[F0-02C4 凸解析・劣勾配・normal cone](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md)**''')
write(D4/'index.md',f'''# F0-02C4 関数解析IV：凸解析・劣勾配・normal cone

凸関数を微分不能点まで拡張し、制約をindicator関数へ埋め込むことで $0\\in\\partial f+N_C$ という最適性条件まで進みます。tangent/polar/dual coneは次講C4Aへ分離します。

{c4core}

{E4}

---

## 次に進む

**次：[F0-02C4A tangent cone・polar cone・dual cone](../F0_02C4A_tangent_polar_dual_cone/index.md)**''')
write(D4A/'index.md',f'''# F0-02C4A 関数解析IV-A：tangent cone・polar cone・dual cone

実行可能な一次方向と、それを支える双対側の法線・錐を整理します。

{c4cone}

{E4A}

---

## 次に進む

**次：[F0-02C5 一般化KKT・錐制約・双対乗数](../F0_02C5_一般化KKT_制約写像_制約想定/index.md)**''')
write(D5/'index.md',f'''# F0-02C5 関数解析V：一般化KKT・錐制約・双対乗数

成分ごとの制約を写像と錐へまとめ、一般化LagrangianとKKT条件を型付きで書けるところまでを一講義にします。制約想定は次講C5Aです。

{c5core}

{E5}

---

## 次に進む

**次：[F0-02C5A 制約想定・LICQ・MFCQ・Robinson CQ](../F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md)**''')
write(D5A/'index.md',f'''# F0-02C5A 関数解析V-A：制約想定・LICQ・MFCQ・Robinson CQ

この講義の問いは「局所最適なのに、なぜKKT乗数が存在しないことがあるのか」です。退化例から一次近似の破綻を見て、代表的な制約想定へ進みます。

{c5cq}

{E5A}

---

## 次に進む

**次：[F0-02C6 Hahn--Banach・汎関数拡張](../F0_02C6_Hahn_Banach_分離定理/index.md)**''')
write(D6/'index.md',f'''# F0-02C6 関数解析VI：Hahn--Banach・汎関数拡張

小さな部分空間上の線形汎関数を、支配条件やノルムを保って全空間へ延長するのがHahn--Banachの主題です。凸集合分離は次講C6Aへ分離します。

{c6core}

{E6}

---

## 次に進む

**次：[F0-02C6A 分離定理・Minkowski functional・Farkas](../F0_02C6A_分離定理_Minkowski_Farkas/index.md)**''')
write(D6A/'index.md',f'''# F0-02C6A 関数解析VI-A：分離定理・Minkowski functional・Farkas

Hahn--Banachを、点と閉凸集合を分ける連続線形汎関数へ変換します。有限次元のFarkas・KKTまで回収します。

{c6sep}

{E6A}

---

## 次に進む

**次：[F0-02C7 RKHS・再生核・Moore--Aronszajn](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md)**''')
write(D7/'index.md',f'''# F0-02C7 関数解析VII：RKHS・再生核・Moore--Aronszajn

評価汎関数の連続性からRiesz表現を通じて再生核を得て、逆にPSD kernelからRKHSを構成するところまでを閉じます。学習アルゴリズムは次講C7Aです。

{c7core}

{E7}

---

## 次に進む

**次：[F0-02C7A representer theorem・kernel SVM](../F0_02C7A_representer_kernel_SVM/index.md)**''')
write(D7A/'index.md',f'''# F0-02C7A 関数解析VII-A：representer theorem・kernel SVM

無限次元RKHSの最適化解が、なぜ有限標本が張る部分空間へ落ちるのかをrepresenter theoremとSVM stationarityの両方から見ます。

{c7app}

{E7A}

---

## 系列の回収

これで、Banach/Hilbert → 双対/Riesz → Fréchet微分 → 随伴 → 劣微分/normal cone → cone幾何 → 一般化KKT → 制約想定 → Hahn--Banach → 分離 → RKHS → representer/kernel SVM が一講義一サイクルで接続されます。''')

# Metadata/glossaries.
write(D3/'chapter.yaml','''id: "F0-02C3"\ntitle: "関数解析III：Fréchet微分・有界線形作用素・連鎖律"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C2\nofficial_scope: []\nlearning_objectives:\n  - 方向微分・Gateaux微分・Frechet微分を区別できる\n  - Frechet微分を有界線形作用素として説明できる\n  - 有界線形作用素と作用素ノルムを定義できる\n  - 連鎖律を作用素の合成として読める\ndefinitions:\n  - { id: F002C3-DEF-01, name: 方向微分 }\n  - { id: F002C3-DEF-02, name: Gateaux微分 }\n  - { id: F002C3-DEF-03, name: Frechet微分 }\n  - { id: F002C3-DEF-04, name: 有界線形作用素 }\n  - { id: F002C3-DEF-05, name: 作用素ノルム }\ntheorems:\n  - { id: F002C3-THM-01, name: 有界線形作用素の連続性との同値 }\n  - { id: F002C3-THM-02, name: Frechet微分の連鎖律 }\ncanonical_examples: [ノルム二乗の微分, 二乗誤差汎関数]\nproblem_patterns: [FA-DERIVATIVE-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }\n''')
write(D3/'glossary.yaml','''chapter: "F0-02C3"\nterms:\n  - { term: Fréchet微分, english: Frechet derivative, meaning: 誤差が増分ノルムより高次になる一様な線形一次近似。 }\n  - { term: 有界線形作用素, english: bounded linear operator, meaning: ノルムを一定倍率以内に抑える線形作用素。 }\n  - { term: 作用素ノルム, english: operator norm, meaning: 単位球上での作用素の最大伸長率。 }\n''')
write(D3A/'chapter.yaml','''id: "F0-02C3A"\ntitle: "関数解析III-A：随伴作用素・Banach双対・Hilbert随伴"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C3\nlearning_objectives:\n  - Banach空間で随伴作用素T*:Y*→X*を定義できる\n  - 有限次元で随伴が転置行列になることを示せる\n  - Hilbert空間でRiesz表現を介した随伴を説明できる\n  - KKTのDG(x)*lambdaの型を説明できる\ndefinitions:\n  - { id: F002C3A-DEF-01, name: 随伴作用素 }\n  - { id: F002C3A-DEF-02, name: Hilbert随伴 }\ntheorems: []\ncanonical_examples: [転置行列, 積分作用素の随伴]\nproblem_patterns: [FA-ADJOINT-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 1.5, exercises: 0.75, review: 0.5 }\n''')
write(D3A/'glossary.yaml','''chapter: "F0-02C3A"\nterms:\n  - { term: 随伴作用素, english: adjoint operator, meaning: 出力側の連続線形汎関数を入力側へ合成で引き戻す作用素。 }\n  - { term: Hilbert随伴, english: Hilbert adjoint, meaning: Riesz表現で双対を元のHilbert空間へ同一視した随伴。 }\n''')
write(D4/'chapter.yaml','''id: "F0-02C4"\ntitle: "関数解析IV：凸解析・劣勾配・normal cone"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C3\nofficial_scope: []\nlearning_objectives:\n  - 劣勾配と劣微分を定義できる\n  - indicator関数とnormal coneの関係を説明できる\n  - 制約付き凸最適化を0∈∂f+N_Cで表せる\ndefinitions:\n  - { id: F002C4-DEF-01, name: 劣勾配 }\n  - { id: F002C4-DEF-02, name: 劣微分 }\n  - { id: F002C4-DEF-03, name: indicator関数 }\n  - { id: F002C4-DEF-04, name: normal cone }\ntheorems:\n  - { id: F002C4-THM-01, name: 凸微分可能関数の一次条件 }\n  - { id: F002C4-THM-02, name: 劣勾配による最小条件 }\n  - { id: F002C4-THM-03, name: indicator関数の劣微分とnormal cone }\ncanonical_examples: [絶対値の劣微分, 区間のnormal cone]\nproblem_patterns: [FA-SUBGRADIENT-1, FA-NORMAL-CONE-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }\n''')
write(D4/'glossary.yaml','''chapter: "F0-02C4"\nterms:\n  - { term: 劣勾配, english: subgradient, meaning: 凸関数を一点で下から支える連続線形汎関数。 }\n  - { term: 劣微分, english: subdifferential, meaning: 一点における劣勾配全体の集合。 }\n  - { term: normal cone, english: normal cone, meaning: 集合内部への方向すべてに非正に作用する外向き法線汎関数の錐。 }\n''')
write(D4A/'chapter.yaml','''id: "F0-02C4A"\ntitle: "関数解析IV-A：tangent cone・polar cone・dual cone"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C4\nlearning_objectives:\n  - tangent coneを実行可能一次方向として説明できる\n  - polar coneとnormal coneの関係を説明できる\n  - dual coneとpolar coneの符号規約を区別できる\ndefinitions:\n  - { id: F002C4A-DEF-01, name: tangent cone }\n  - { id: F002C4A-DEF-02, name: polar cone }\n  - { id: F002C4A-DEF-03, name: dual cone }\ntheorems: []\ncanonical_examples: [半空間のtangent cone, 非負直交錐の自己双対性]\nproblem_patterns: [FA-CONE-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 1.5, exercises: 0.75, review: 0.5 }\n''')
write(D4A/'glossary.yaml','''chapter: "F0-02C4A"\nterms:\n  - { term: tangent cone, english: tangent cone, meaning: 集合内から一次スケールで近づける実行可能方向の錐。 }\n  - { term: polar cone, english: polar cone, meaning: 元の錐の全方向に非正に作用する双対側の錐。 }\n  - { term: dual cone, english: dual cone, meaning: 元の錐の全方向に非負に作用する双対側の錐。 }\n''')
write(D5/'chapter.yaml','''id: "F0-02C5"\ntitle: "関数解析V：一般化KKT・錐制約・双対乗数"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C3A\n  - F0-02C4A\n  - F0-02A\nlearning_objectives:\n  - 不等式制約を錐制約G(x)∈-Kへまとめられる\n  - 一般化LagrangianとKKT条件を型付きで書ける\n  - 有限次元の通常KKTを特殊例として復元できる\ndefinitions:\n  - { id: F002C5-DEF-01, name: 錐制約 }\n  - { id: F002C5-DEF-02, name: 一般化Lagrangian }\ntheorems:\n  - { id: F002C5-THM-01, name: 一般化KKT条件の形 }\ncanonical_examples: [非負直交錐による通常KKT復元]\nproblem_patterns: [FA-KKT-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2, exercises: 0.75, review: 0.5 }\n''')
write(D5/'glossary.yaml','''chapter: "F0-02C5"\nterms:\n  - { term: 錐制約, english: cone constraint, meaning: 複数の不等式をG(x)∈-Kの形へまとめた制約。 }\n  - { term: 一般化Lagrangian, english: generalized Lagrangian, meaning: 双対空間の乗数を制約写像へ作用させて作るLagrangian。 }\n''')
write(D5A/'chapter.yaml','''id: "F0-02C5A"\ntitle: "関数解析V-A：制約想定・LICQ・MFCQ・Robinson CQ"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C5\nlearning_objectives:\n  - 制約想定がないとKKT乗数が存在しない反例を説明できる\n  - 真のtangent coneと線形化coneのずれを説明できる\n  - LICQ・MFCQ・Robinson CQの役割を比較できる\ndefinitions:\n  - { id: F002C5A-DEF-01, name: 線形化cone }\n  - { id: F002C5A-DEF-02, name: LICQ }\n  - { id: F002C5A-DEF-03, name: MFCQ }\n  - { id: F002C5A-DEF-04, name: Robinson constraint qualification }\ntheorems:\n  - { id: F002C5A-THM-01, name: 制約想定下のKKT乗数存在 }\ncanonical_examples: [x二乗制約の退化例, MFCQとLICQの比較]\nproblem_patterns: [FA-CQ-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }\n''')
write(D5A/'glossary.yaml','''chapter: "F0-02C5A"\nterms:\n  - { term: LICQ, english: linear independence constraint qualification, meaning: active不等式と等式の勾配に一次独立性を要求する制約想定。 }\n  - { term: MFCQ, english: Mangasarian-Fromovitz constraint qualification, meaning: 等式を保ちつつactive不等式の内側へ入る方向の存在を要求する制約想定。 }\n  - { term: Robinson CQ, english: Robinson constraint qualification, meaning: 一般の錐制約で線形化写像と錐が制約空間を十分埋めることを要求する正則性条件。 }\n''')
write(D6/'chapter.yaml','''id: "F0-02C6"\ntitle: "関数解析VI：Hahn--Banach・汎関数拡張"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00A3\n  - F0-02C2\nlearning_objectives:\n  - Hahn--Banachの支配付き拡張定理を説明できる\n  - 一次元延長からZornで全空間へ延長する証明を説明できる\n  - ノルム保存拡張と双対空間による点分離を導ける\ndefinitions:\n  - { id: F002C6-DEF-01, name: sublinear functional }\ntheorems:\n  - { id: F002C6-THM-01, name: Hahn--Banachの定理 }\n  - { id: F002C6-THM-02, name: ノルム保存拡張 }\n  - { id: F002C6-THM-03, name: 双対空間による点分離 }\ncanonical_examples: [一次元部分空間からの汎関数拡張, Zornによる極大延長]\nproblem_patterns: [FA-HB-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 3, exercises: 0.75, review: 0.5 }\n''')
write(D6/'glossary.yaml','''chapter: "F0-02C6"\nterms:\n  - { term: sublinear functional, english: sublinear functional, meaning: 劣加法性と正の斉次性を満たす汎関数。 }\n  - { term: Hahn--Banachの定理, english: Hahn-Banach theorem, meaning: 支配条件を保ちながら線形汎関数を部分空間から全空間へ延長できる定理。 }\n''')
write(D6A/'chapter.yaml','''id: "F0-02C6A"\ntitle: "関数解析VI-A：分離定理・Minkowski functional・Farkas"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C6\nlearning_objectives:\n  - 超平面を連続線形汎関数で定義できる\n  - 点と閉凸集合の強分離定理を説明できる\n  - Minkowski functionalが凸集合とHahn--Banachをつなぐ役割を説明できる\n  - Farkasの補題を有限次元分離の帰結として説明できる\ndefinitions:\n  - { id: F002C6A-DEF-01, name: separating functional }\n  - { id: F002C6A-DEF-02, name: absorbing set }\n  - { id: F002C6A-DEF-03, name: Minkowski functional }\ntheorems:\n  - { id: F002C6A-THM-01, name: 点と閉凸集合の強分離 }\ncanonical_examples: [Hilbert空間の射影によるseparator, Farkas certificate]\nproblem_patterns: [FA-SEPARATION-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2, exercises: 0.75, review: 0.5 }\n''')
write(D6A/'glossary.yaml','''chapter: "F0-02C6A"\nterms:\n  - { term: absorbing set, english: absorbing set, meaning: 任意のベクトルが十分大きな正の倍率を掛けた集合に入る性質を持つ集合。 }\n  - { term: Minkowski functional, english: Minkowski functional, meaning: xがtUに入る最小倍率の下限で定義されるgauge。 }\n  - { term: 強分離, english: strong separation, meaning: 連続線形汎関数の値に正のgapを持たせて集合と点を分けること。 }\n''')
write(D7/'chapter.yaml','''id: "F0-02C7"\ntitle: "関数解析VII：RKHS・再生核・Moore--Aronszajn"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C2\nlearning_objectives:\n  - RKHSを評価汎関数の連続性から定義できる\n  - Riesz表現から再生核と再生性を導ける\n  - 再生核が対称PSD kernelになることを示せる\n  - PSD kernelからRKHSを構成するMoore--Aronszajnの流れを説明できる\n  - 完備化の役割を説明できる\ndefinitions:\n  - { id: F002C7-DEF-01, name: 評価汎関数 }\n  - { id: F002C7-DEF-02, name: RKHS }\n  - { id: F002C7-DEF-03, name: 再生核 }\n  - { id: F002C7-DEF-04, name: positive semidefinite kernel }\n  - { id: F002C7-DEF-05, name: canonical feature map }\n  - { id: F002C7-DEF-06, name: 完備化 }\ntheorems:\n  - { id: F002C7-THM-01, name: RKHSの再生性 }\n  - { id: F002C7-THM-02, name: Moore--Aronszajnの定理 }\ncanonical_examples: [線形kernel, 多項式kernel, Gaussian kernel]\nproblem_patterns: [RKHS-KERNEL-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 3, exercises: 0.75, review: 0.5 }\n''')
write(D7/'glossary.yaml','''chapter: "F0-02C7"\nterms:\n  - { term: RKHS, english: reproducing kernel Hilbert space, meaning: 全ての点評価汎関数が連続であるHilbert関数空間。 }\n  - { term: 再生核, english: reproducing kernel, meaning: 点評価をHilbert内積として再現するkernel。 }\n  - { term: 完備化, english: completion, meaning: 元の空間を稠密部分空間として含む完備空間へ拡張する操作。 }\n''')
write(D7A/'chapter.yaml','''id: "F0-02C7A"\ntitle: "関数解析VII-A：representer theorem・kernel SVM"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-02C7\n  - F0-02C3\n  - F0-02B\nlearning_objectives:\n  - representer theoremを直交分解から証明できる\n  - kernel SVMの最適解が有限個の特徴の線形結合になる理由を説明できる\n  - SVM双対と判別関数をkernel値だけで書ける\n  - kernel trickをRKHSと有限和解の両方から説明できる\ndefinitions: []\ntheorems:\n  - { id: F002C7A-THM-01, name: representer theorem }\ncanonical_examples: [kernel ridge型最適化, kernel SVM]\nproblem_patterns: [RKHS-REPRESENTER-1, RKHS-SVM-1]\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }\n''')
write(D7A/'glossary.yaml','''chapter: "F0-02C7A"\nterms:\n  - { term: representer theorem, english: representer theorem, meaning: 有限標本値とHilbertノルムに依存する最適化で有限個のkernel sectionの張る空間に解を取れる定理。 }\n  - { term: kernel trick, english: kernel trick, meaning: 特徴座標を明示せずkernel内積だけで学習・予測を表す方法。 }\n''')

# Replace the detailed C-roadmap with a current compact route.
road=ROOT/'F0_02C_関数解析_制約想定_RKHS/index.md'
write(road,r'''# F0-02C 関数解析補講ロードマップ：F0-00からRKHSまで

このページはDREAM THEATERのうち、有限次元最適化から関数解析・RKHSへ進む路線の入口です。

設計原則は **一講義一学習サイクル** です。標準の読み順と、各 `chapter.yaml` に記す数学的な必須前提は区別します。

## 完全通読ルート

```text
A → A1 → A2 → A3 → B
→ C → C1 → C2 → D → D1
→ D2 → D2A → D2B → D2C → D2D → D2E
→ E → E1 → E2 → F → F1 → F2 → G
→ F0-02 → 02A → 02B
→ C1  Banach / Hilbert
→ C2  双対空間 / Riesz
→ C3  Fréchet微分 / 有界作用素 / 連鎖律
→ C3A 随伴作用素
→ C4  劣勾配 / normal cone
→ C4A tangent / polar / dual cone
→ C5  一般化KKT / 錐制約
→ C5A LICQ / MFCQ / Robinson CQ
→ C6  Hahn--Banach / 汎関数拡張
→ C6A 分離定理 / Minkowski functional / Farkas
→ C7  RKHS / 再生核 / Moore--Aronszajn
→ C7A representer theorem / kernel SVM
```

※ 上段の `C1/C2` は F0-00C1/C2、下段は F0-02C1/C2 です。ID衝突を避けるため本文ではフルIDを確認してください。

## 関数解析路線の中心線

```text
完備性・内積
 ↓
連続線形汎関数とRiesz
 ↓
微分は有界線形作用素
 ↓
随伴で乗数を入力側へ戻す
 ↓
劣微分・normal cone
 ↓
tangent / polar / dual cone
 ↓
一般化KKT
 ↓
制約想定で乗数存在を保証
 ↓
Hahn--Banachで双対空間を豊かにする
 ↓
分離定理
 ↓
評価汎関数 + Riesz = 再生核
 ↓
representer theorem = 無限次元問題の有限和解
```

## どこまで読むか

- **有限次元KKT/SVMだけ**：F0-02Bまで。
- **Banach/HilbertとRiesz**：F0-02C2まで。
- **無限次元のKKTの型**：F0-02C5まで。
- **KKT乗数の存在条件**：F0-02C5Aまで。
- **Hahn--Banachと分離**：F0-02C6Aまで。
- **RKHSそのもの**：F0-02C7まで。
- **kernel SVMまで回収**：F0-02C7Aまで。

## 依存関係を細く保つ

標準通読ではC1からC7Aまで順に読めますが、数学的には例えば次の短絡路があります。

- Hahn--Banach本体は `F0-00A3 + F0-02C2` から読める。
- RKHS本体は `F0-02C2` から読める。
- kernel SVM応用は `F0-02C7 + F0-02C3 + F0-02B` を使う。

「前のページだから」という理由だけで機械可読prerequisiteを追加しません。
''')

# Facade list subsection replacement.
dream=Path('textbook/dream-theater.md')
s=read(dream)
a=s.index('#### 制約付き最適化・関数解析・RKHS・SVM')
b=s.index('\n\n---\n\n### 2.',a)
items=[
('F0-02 制約付き最適化・双対・KKT','textbook/volumes/00_foundations/F0_02_制約付き最適化_双対_KKT/index.md'),
('F0-02A KKT条件の導出・接錐・polar・Farkas','textbook/volumes/00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md'),
('F0-02B 分離超平面定理・Farkas・SVM','textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md'),
('F0-02C 関数解析・制約想定・RKHS ロードマップ','textbook/volumes/00_foundations/F0_02C_関数解析_制約想定_RKHS/index.md'),
('F0-02C1 ノルム空間・Banach・Hilbert','textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md'),
('F0-02C2 線形汎関数・双対空間・Riesz','textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md'),
('F0-02C3 Fréchet微分・有界作用素・連鎖律','textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md'),
('F0-02C3A 随伴作用素・Banach双対・Hilbert随伴','textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md'),
('F0-02C4 凸解析・劣勾配・normal cone','textbook/volumes/00_foundations/F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md'),
('F0-02C4A tangent cone・polar cone・dual cone','textbook/volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md'),
('F0-02C5 一般化KKT・錐制約・双対乗数','textbook/volumes/00_foundations/F0_02C5_一般化KKT_制約写像_制約想定/index.md'),
('F0-02C5A 制約想定・LICQ・MFCQ・Robinson CQ','textbook/volumes/00_foundations/F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md'),
('F0-02C6 Hahn–Banach・汎関数拡張','textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md'),
('F0-02C6A 分離定理・Minkowski functional・Farkas','textbook/volumes/00_foundations/F0_02C6A_分離定理_Minkowski_Farkas/index.md'),
('F0-02C7 RKHS・再生核・Moore–Aronszajn','textbook/volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md'),
('F0-02C7A representer theorem・kernel SVM','textbook/volumes/00_foundations/F0_02C7A_representer_kernel_SVM/index.md')]
block='#### 制約付き最適化・関数解析・RKHS・SVM\n\n'+'\n'.join(f'{i}. [{t}]({p})' for i,(t,p) in enumerate(items,1))
write(dream,s[:a]+block+s[b:])

# Manifest insertions.
mp=Path('textbook/dream-theater-index.json'); obj=json.loads(read(mp)); sec=next(x for x in obj['sections'] if x['name']=='DREAM THEATER 本編')
for anchor, newp in [
('textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md','textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md'),
('textbook/volumes/00_foundations/F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md','textbook/volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md'),
('textbook/volumes/00_foundations/F0_02C5_一般化KKT_制約写像_制約想定/index.md','textbook/volumes/00_foundations/F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md'),
('textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md','textbook/volumes/00_foundations/F0_02C6A_分離定理_Minkowski_Farkas/index.md'),
('textbook/volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md','textbook/volumes/00_foundations/F0_02C7A_representer_kernel_SVM/index.md')]:
    if newp not in sec['paths']:
        sec['paths'].insert(sec['paths'].index(anchor)+1,newp)
write(mp,json.dumps(obj,ensure_ascii=False,indent=2))

# Route/audit sync.
r=ROOT/'F0_00R_基礎論ロードマップ/index.md'; s=read(r)
s=s.replace('C1 → C2 → C3 → C4 → C5 → C6 → C7','C1 → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A')
write(r,s)

dep=Path('textbook/dependency-graph.md'); s=read(dep)
s=s.replace('C2 双対・Riesz -> C3 作用素・随伴 -> C4 凸解析\n  ↓\nC5 一般化KKT -> C6 Hahn--Banach -> C7 RKHS / kernel SVM','C2 双対・Riesz -> C3 Fréchet微分 -> C3A 随伴\n  ↓\nC4 劣微分・normal cone -> C4A tangent/polar/dual cone\n  ↓\nC5 一般化KKT -> C5A 制約想定\n  ↓\nC6 Hahn--Banach -> C6A 分離 -> C7 RKHS -> C7A representer / kernel SVM')
write(dep,s)

proof=Path('textbook/f0-dream-theater-proof-audit.md'); s=read(proof)
s=s.replace('C1 → C2 → C3 → C4 → C5 → C6 → C7','C1 → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A')
write(proof,s)

gran=Path('textbook/f0-dream-theater-granularity-audit.md'); s=read(gran)
if '## 10. F0-02C3〜C7 の遡及監査' not in s:
    s += '''\n\n---\n\n## 10. F0-02C3〜C7 の遡及監査\n\n| 旧講義 | 判定 | 対応 |\n|---|---|---|\n| C2 | **OK** | 線形汎関数→双対空間→Rieszが一つの表現サイクル。 |\n| C3 | **SPLIT** | Fréchet微分・有界作用素と、随伴作用素をC3/C3Aへ分割。 |\n| C4 | **SPLIT** | 劣微分・normal coneと、tangent/polar/dual coneをC4/C4Aへ分割。 |\n| C5 | **SPLIT** | 一般化KKTの記法と、KKT乗数存在を支える制約想定をC5/C5Aへ分割。 |\n| C6 | **SPLIT** | Hahn--Banach拡張と凸集合分離をC6/C6Aへ分割。 |\n| C7 | **SPLIT** | RKHS・Moore--Aronszajnとrepresenter/kernel SVMをC7/C7Aへ分割。 |\n\n再編後は `C1 → C2 → C3 → C3A → C4 → C4A → C5 → C5A → C6 → C6A → C7 → C7A`。\n'''
write(gran,s)

content=Path('textbook/f0-dream-theater-content-exercise-audit.md'); s=read(content)
if 'C3〜C7の粒度再編' not in s:
    s += '''\n\n## C3〜C7の粒度再編\n\nC3〜C7はそれぞれ独立した第二学習サイクルを枝番講義へ分離し、各講義へ初期A/B演習を配置した。C2は粒度上は維持するが演習0問のため、次の教材密度監査ではC1/C2/02A/02Bと合わせて演習補強対象とする。\n'''
write(content,s)

# Report downstream direct references for manual refinement.
hits=[]
for p in ROOT.rglob('chapter.yaml'):
    t=read(p)
    refs=[x for x in ['F0-02C3','F0-02C4','F0-02C5','F0-02C6','F0-02C7'] if f'  - {x}\n' in t]
    if refs: hits.append((str(p),refs))
print('DIRECT_C3_C7_PREREQS')
for h in hits: print(h)
