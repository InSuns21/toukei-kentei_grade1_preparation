from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def write(rel, text):
    (ROOT / rel).write_text(text, encoding="utf-8")


def replace_once(rel, old, new):
    text = read(rel)
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{rel}: expected one exact match, got {count}")
    write(rel, text.replace(old, new, 1))


def replace_block(rel, start_pattern, end_pattern, replacement):
    text = read(rel)
    pat = re.compile(start_pattern + r".*?" + end_pattern, re.S)
    new_text, count = pat.subn(replacement, text, count=1)
    if count != 1:
        raise RuntimeError(f"{rel}: expected one block match, got {count}")
    write(rel, new_text)


# 1) Concept registry: P4-02 is the actual first self-contained Delta-method introduction.
replace_once(
    "textbook/knowledge-dag.yaml",
    "      - delta method\n      - Delta method\n    introduced_in: I2-01",
    "      - delta method\n    introduced_in: P4-02",
)

# 2) Explicit, intentional previews.
replace_once(
    "textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/chapter.yaml",
    "prerequisites: []\nofficial_scope:",
    "prerequisites: []\nforward_references:\n  - delta-method\nofficial_scope:",
)
replace_once(
    "textbook/volumes/03_inference/I1_01_尤度_最尤推定/chapter.yaml",
    "  - P3-05\nofficial_scope:",
    "  - P3-05\nforward_references:\n  - fisher-information\n  - cramer-rao-inequality\n  - likelihood-ratio-test\n  - score-test\nofficial_scope:",
)
replace_once(
    "textbook/volumes/02_distributions/P4_01_変数変換_順序統計量/chapter.yaml",
    "prerequisites: [P3-03]\nofficial_scope:",
    "prerequisites: [P3-03]\nforward_references:\n  - maximum-likelihood-estimator\nofficial_scope:",
)

# 3) Real prerequisite omissions: these chapters actually build on I3-02.
replace_once(
    "textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定/chapter.yaml",
    "  - I3-01\nofficial_scope:",
    "  - I3-01\n  - I3-02\nofficial_scope:",
)
replace_once(
    "textbook/volumes/04_linear_models/L2_01_一般化線形モデル/chapter.yaml",
    "  - F0-00\nofficial_scope:",
    "  - F0-00\n  - I3-02\nofficial_scope:",
)
replace_once(
    "textbook/curriculum.yaml",
    "{ id: L2-01, title: 一般化線形モデル, volume: linear_models, prerequisites: [ P3-01, L1-02, P2-02, F0-00 ]",
    "{ id: L2-01, title: 一般化線形モデル, volume: linear_models, prerequisites: [ P3-01, L1-02, P2-02, F0-00, I3-02 ]",
)
replace_once(
    "textbook/curriculum.yaml",
    "{ id: I3-03, title: 正規母集団・適合度・ノンパラメトリック検定, volume: inference, prerequisites: [ S1-01, I3-01 ]",
    "{ id: I3-03, title: 正規母集団・適合度・ノンパラメトリック検定, volume: inference, prerequisites: [ S1-01, I3-01, I3-02 ]",
)

# 4) Remove genuine MLE pre-teaching from distribution/convergence exercises.
p3_02 = r'''## P3C-DRILL-01 ワイブル寿命・変換・モーメント・確率収束

- 制限時間: 30分
- level: C

部品寿命 $X$ は、形状2、未知尺度 $\eta>0$ のワイブル分布に従う。**問1で確率密度関数そのものを導出させるため、ここでは密度を与えず、生存関数を出発点として与える。** すなわち

$$
P(X>x)=\exp\{-(x/\eta)^2\},
\qquad x\ge0,
$$

であり、$x<0$ では $P(X>x)=1$ である。独立同分布標本を $X_1,\ldots,X_n$ とし、

$$
T_n=\frac1n\sum_{i=1}^nX_i^2
$$

とおく。任意の有限分散な確率変数 $T$ と $\varepsilon>0$ に対するチェビシェフの不等式

$$
P(|T-E[T]|\ge\varepsilon)
\le\frac{\operatorname{Var}(T)}{\varepsilon^2}
$$

を用いてよい。

1. $X$ の確率密度関数、生存関数、ハザードを求めよ。（20点）
2. $P(X>\eta)$ と $P(X>\eta\mid X>\eta/2)$ を求めよ。（15点）
3. $Y=(X/\eta)^2$ の分布を求め、$E[X^2]$ と $\operatorname{Var}(X^2)$ を求めよ。（25点）
4. $T_n$ の期待値と分散を求め、$\eta^2$ の不偏推定量であることを示せ。（20点）
5. チェビシェフの不等式を用いて $T_n\xrightarrow{p}\eta^2$ を示せ。（20点）

<!-- solution-start -->

### 解答

#### 詳細解答

**(1) 確率密度関数・生存関数・ハザード**

$x>0$ では

$$
S_\eta(x)=e^{-(x/\eta)^2},
$$

したがって

$$
f_\eta(x)=-S_\eta'(x)
=\frac{2x}{\eta^2}e^{-(x/\eta)^2}.
$$

$x\le0$ では密度は0で、生存関数は

$$
S_\eta(x)=
\begin{cases}
1,&x\le0,\\
e^{-(x/\eta)^2},&x>0.
\end{cases}
$$

よって $x>0$ で

$$
h_\eta(x)=\frac{f_\eta(x)}{S_\eta(x)}=\frac{2x}{\eta^2}.
$$

**(2) 尾確率**

$$
P(X>\eta)=e^{-1},
$$

また

$$
P(X>\eta\mid X>\eta/2)
=\frac{e^{-1}}{e^{-1/4}}
=e^{-3/4}.
$$

**(3) 変換とモーメント**

$y\ge0$ で

$$
P(Y\le y)
=P(X\le\eta\sqrt y)
=1-e^{-y},
$$

したがって $Y\sim\operatorname{Exp}(1)$。ゆえに $E[Y]=1$, $\operatorname{Var}(Y)=1$ であり、$X^2=\eta^2Y$ から

$$
E[X^2]=\eta^2,
\qquad
\operatorname{Var}(X^2)=\eta^4.
$$

**(4) 標本平均型統計量**

独立性より

$$
E[T_n]=\frac1n\sum_{i=1}^nE[X_i^2]=\eta^2,
$$

$$
\operatorname{Var}(T_n)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i^2)
=\frac{\eta^4}{n}.
$$

従って $T_n$ は $\eta^2$ の不偏推定量である。

**(5) 確率収束**

任意の $\varepsilon>0$ について

$$
P(|T_n-\eta^2|\ge\varepsilon)
\le\frac{\eta^4}{n\varepsilon^2}
\to0.
$$

したがって

$$
T_n\xrightarrow{p}\eta^2.
$$

#### 本番答案

$Y=(X/\eta)^2\sim\operatorname{Exp}(1)$ より $E[X^2]=\eta^2$, $\operatorname{Var}(X^2)=\eta^4$。したがって $E[T_n]=\eta^2$, $\operatorname{Var}(T_n)=\eta^4/n$ であり、チェビシェフの不等式から $T_n\xrightarrow{p}\eta^2$。

#### 採点基準と選択判断

密度・生存・ハザード20点、尾確率15点、変換とモーメント25点、不偏性・分散20点、確率収束20点。合計100点。

<!-- solution-end -->'''
replace_block(
    "textbook/volumes/02_distributions/P3_02_主要な連続分布/index.md",
    r"## P3C-DRILL-01 ワイブル寿命・変換・最尤推定\n",
    r"<!-- solution-end -->",
    p3_02,
)

p3_04 = r'''#### P3L-C04 潜在指標が観測される場合とされない場合

$(X_i,Z_i)$、$i=1,\ldots,n$ は互いに独立で同じ分布に従うとする。$Z_i\in\{1,2\}$、$P(Z_i=1)=\pi$、$P(Z_i=2)=1-\pi$ とする。条件付き分布は

$$
X_i\mid Z_i=j\sim N(\mu_j,1),
\qquad \mu_1=0,\ \mu_2=2
$$

で、成分 $j$ の密度を $f_j(x)$ とする。また

$$
I_i:=\boldsymbol{1}_{\{Z_i=1\}}
$$

と定義する。

1. 1組 $(X_i,Z_i)$ の同時分布を、$Z_i=1,2$ の場合に分けて書け。
2. $Z_i$ を観測しないときの $X_i$ の周辺密度を求めよ。
3. $\pi=1/2$ とする。$X_i=x_i$ を観測したとき、$\tau_{i1}=P(Z_i=1\mid X_i=x_i)$ を求めよ。
4. $E[I_i\mid X_i=x_i]=\tau_{i1}$ を示し、その意味を説明せよ。
5. $X_1,\ldots,X_n$ を観測したとき、潜在的な成分1の個数 $N_1=\sum_iI_i$ について $E[N_1\mid X_1,\ldots,X_n]$ を求めよ。

<!-- solution-start -->

**詳細解答**

$Z_i=1$ なら

$$
p(x,1)=\pi f_1(x),
$$

$Z_i=2$ なら

$$
p(x,2)=(1-\pi)f_2(x).
$$

従って $Z_i$ を消去すると

$$
f_X(x)=\pi f_1(x)+(1-\pi)f_2(x).
$$

$\pi=1/2$ ではベイズの公式から

$$
\tau_{i1}
=P(Z_i=1\mid X_i=x_i)
=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.
$$

また $I_i$ は0-1指示変数なので

$$
E[I_i\mid X_i=x_i]
=P(I_i=1\mid X_i=x_i)
=\tau_{i1}.
$$

つまり、観測できない所属を0か1に即断する代わりに、その条件付き確率を「成分1への柔らかい所属度」として使える。

条件付き期待値の線形性より

$$
E[N_1\mid X_1,\ldots,X_n]
=\sum_{i=1}^nE[I_i\mid X_i]
=\sum_{i=1}^n\tau_{i1}.
$$

**本番答案**

$$
f_X(x)=\pi f_1(x)+(1-\pi)f_2(x),
\qquad
\tau_{i1}=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}\quad(\pi=1/2),
$$

$$
E[I_i\mid X_i]=\tau_{i1},
\qquad
E[N_1\mid X_1,\ldots,X_n]=\sum_i\tau_{i1}.
$$

**採点基準（20点）**

同時分布4点、周辺化4点、ベイズ更新4点、指示変数の条件付き期待値4点、潜在個数の条件付き期待値4点。

<!-- solution-end -->'''
replace_block(
    "textbook/volumes/02_distributions/P3_04_混合分布_潜在変数/index.md",
    r"#### P3L-C04 潜在指標が観測される場合とされない場合\n",
    r"<!-- solution-end -->",
    p3_04,
)

p4_02 = r'''#### P4T-C03 ポアソン和・正規近似・一致性
- level: C
- minutes: 25
- topics: ポアソン分布, 中心極限定理, 確率収束

$\lambda>0$とする。独立な確率変数$X_1,\ldots,X_n$が
$$
P(X_i=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
で与えられるポアソン分布に従うとし、
$$
T_n=\sum_{i=1}^nX_i
$$
と定義する。標準正規分布の累積分布関数を$\Phi$とする。

1. $T_n$の分布を求めよ。
2. $T_n/n$の平均と分散を求めよ。
3. $T_n$の正規近似を書け。
4. チェビシェフの不等式を用いて $T_n/n\xrightarrow{p}\lambda$ を示せ。
5. $n=50,\lambda=2$で$P(T_n\geq120)$を連続補正付き正規近似で求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

ポアソン分布の再生性より
$$
T_n\sim\operatorname{Poisson}(n\lambda).
$$
従って
$$
E[T_n/n]=\lambda,
\qquad
\operatorname{Var}(T_n/n)=\frac\lambda n.
$$

また大標本では
$$
T_n\approx N(n\lambda,n\lambda).
$$

任意の $\varepsilon>0$ に対してチェビシェフの不等式より

$$
P\left(\left|\frac{T_n}{n}-\lambda\right|\ge\varepsilon\right)
\le\frac{\lambda}{n\varepsilon^2}
\to0,
$$

したがって

$$
\frac{T_n}{n}\xrightarrow{p}\lambda.
$$

$n=50,\lambda=2$なら$T_n$の平均・分散はともに100です。連続補正から
$$
\begin{aligned}
P(T_n\geq120)
&\approx1-\Phi\left(\frac{119.5-100}{10}\right)\\
&=1-\Phi(1.95)\approx0.0256.
\end{aligned}
$$

###### 本番答案

$T_n\sim\operatorname{Poisson}(n\lambda)$、$E[T_n/n]=\lambda$, $\operatorname{Var}(T_n/n)=\lambda/n$、$T_n\approx N(n\lambda,n\lambda)$。チェビシェフより $P(|T_n/n-\lambda|\ge\varepsilon)\le\lambda/(n\varepsilon^2)\to0$。$n=50,\lambda=2$では$P(T_n\ge120)\approx1-\Phi(1.95)\approx0.0256$。

###### 採点基準と選択判断

和の分布4点、平均分散4点、正規近似4点、確率収束4点、近似確率4点。合計20点。

<!-- solution-end -->'''
replace_block(
    "textbook/volumes/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md",
    r"#### P4T-C03 ポアソン和・最尤推定・正規近似\n",
    r"<!-- solution-end -->",
    p4_02,
)

print("Applied textbook concept DAG batch1 content fixes.")
