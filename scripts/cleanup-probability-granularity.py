from pathlib import Path
import re

ROOT = Path('textbook/volumes/00_foundations')

# 1) Normalize duplicate horizontal rules introduced when legacy sections already
# ended in a separator and the splitter inserted another separator.
prob_dirs = [p for p in ROOT.iterdir() if p.is_dir() and p.name.startswith('F0_00P')]
for d in prob_dirs:
    p = d / 'index.md'
    if not p.exists():
        continue
    s = p.read_text()
    while '\n---\n\n---\n' in s:
        s = s.replace('\n---\n\n---\n', '\n---\n')
    p.write_text(s)

# 2) Complete the Kolmogorov convergence proof step rather than saying only
# "choose a fast subsequence".
p5a = ROOT / 'F0_00P5A_truncation_Kronecker_一般SLLN/index.md'
s = p5a.read_text()
old = '''分散tailは0へ行くので、$m_r$ を十分速く取って右辺を可算和可能にできます。Borel--Cantelliを適用すると部分和列はa.s. Cauchyとなり、実数の完備性から収束します。'''
new = r'''ここで $\varepsilon_r=2^{-r}$ と置き、分散tailが0へ行くことから $m_r$ を

$$
\sum_{j=m_r}^{\infty}\operatorname{Var}(Z_j)\le 2^{-3r}
$$

となるように選びます。最大不等式を $\varepsilon_r$ に適用すると

$$
P\left(
\sup_{k\ge m_r}
\left|\sum_{j=m_r}^k Z_j\right|>2^{-r}
\right)
\le
2^{2r}2^{-3r}=2^{-r}.
$$

右辺は $r$ について総和可能なのでBorel--Cantelliより、a.s.ある $r_0$ 以降はtail部分和の振幅が $2^{-r}$ 以下です。従って部分和列はa.s. Cauchyとなり、実数の完備性から収束します。'''
if old not in s:
    raise SystemExit('P5A Kolmogorov proof target missing')
p5a.write_text(s.replace(old,new))

# 3) QMD/LAN uses a vector score. Bridge scalar P6A to the multivariate normal
# explicitly with Cramer--Wold instead of invoking an undefined "multivariate CLT".
p7b = ROOT / 'F0_00P7B_QMD_LAN/index.md'
s = p7b.read_text()
old = r'''## 5. central sequenceのCLT

QMDからscoreは平均0、共分散 $I(\theta_0)$ を持つので、P6Aの多変量版CLTにより

$$\boxed{\Delta_n\Rightarrow N(0,I(\theta_0))}.$$

ここでGaussianが出るのは「MLEだから」ではなく、局所log likelihoodの一次項がiid scoreの和だからです。'''
new = r'''## 5. central sequenceのCLTとCramér--Wold

scoreがベクトルなので、P6Aの1変量CLTをそのまま一言で「多変量版」と呼ばず、**Cramér--Wold device** で橋を架けます。

### Cramér--Wold device

$Y_n,Y$ が $\mathbb R^d$ 値確率ベクトルのとき

$$
Y_n\Rightarrow Y
\quad\Longleftrightarrow\quad
 a^TY_n\Rightarrow a^TY
\qquad(\forall a\in\mathbb R^d)
$$

です。直感的には、すべての1次元射影の分布が分かれば多変量分布が決まるという定理です。特性関数で見れば

$$
\varphi_{Y_n}(t)=E[e^{it^TY_n}]
$$

は $t^TY_n$ の1変量特性関数を点 $1$ で評価したものなので、P6のLévy連続性定理の多変量版と対応します。

任意の $a\in\mathbb R^d$ について

$$
a^T\Delta_n
=\frac1{\sqrt n}\sum_{i=1}^n a^Ts_{\theta_0}(X_i).
$$

これは平均0、分散 $a^TI(\theta_0)a$ のiidスカラー和なのでP6AのCLTから

$$
a^T\Delta_n\Rightarrow N(0,a^TI(\theta_0)a).
$$

Cramér--Woldにより

$$\boxed{\Delta_n\Rightarrow N(0,I(\theta_0))}.$$

ここでGaussianが出るのは「MLEだから」ではなく、局所log likelihoodの一次項がiid scoreの和だからです。'''
if old not in s:
    raise SystemExit('P7B Cramer-Wold target missing')
p7b.write_text(s.replace(old,new))

# 4) Downstream prerequisites: martingale needs conditional expectation; Wold
# prediction needs the L2 projection chapter, not generic old P3.
sp2 = ROOT / 'F0_00SP2_martingale_optional_stopping/chapter.yaml'
s = sp2.read_text()
if '  - F0-00P3\n' not in s:
    raise SystemExit('SP2 old P3 prerequisite missing')
sp2.write_text(s.replace('  - F0-00P3\n','  - F0-00P3A\n'))

ts1 = ROOT / 'F0_00TS1_定常過程_Hilbert予測_Wold/chapter.yaml'
s = ts1.read_text()
old = '''prerequisites:
  - F0-00P3
  - F0-02C1
  - F0-00SP2'''
new = '''prerequisites:
  - F0-00P3B
  - F0-02C1'''
if old not in s:
    raise SystemExit('TS1 prerequisite block missing')
ts1.write_text(s.replace(old,new))

# 5) Reader-facing Encore IV should show the branch: P3A for martingales and
# P3B for Hilbert prediction, rather than pretending the whole route has one P3.
r4 = ROOT / 'F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md'
s = r4.read_text()
s = s.replace('P3A / P4 / P6', 'P3A / P4 / P6')
if 'P3B' not in s:
    s += '''\n\n### Probabilityからの二つの入口\n\n- martingale・stopping time枝は **P3A 条件付き期待値** から入る。\n- Hilbert予測・Wold枝は **P3B L2射影・最良予測** から入る。\n\n標準通読では両方読めるが、machine-readable prerequisiteは各枝で必要な方だけにする。\n'''
r4.write_text(s)

print('PROBABILITY_CLEANUP_DONE')
for path in [p5a,p7b,sp2,ts1]:
    print(path)
