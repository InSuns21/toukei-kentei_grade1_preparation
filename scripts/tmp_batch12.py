from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(rel_path: str, old: str, new: str) -> None:
    path = ROOT / rel_path
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{rel_path}: expected 1 match, found {count}")
    path.write_text(text.replace(old, new), encoding="utf-8")


I303 = "textbook/volumes/03_inference/I3_03_正規母集団_適合度_ノンパラメトリック検定"

replace_once(
    f"{I303}/chapter.yaml",
    "  - {id: I303-DEF-09, name: 順位相関係数}\ntheorems:\n",
    "  - {id: I303-DEF-09, name: 順位相関係数}\n"
    "  - {id: I303-DEF-10, name: プールt検定}\n"
    "  - {id: I303-DEF-11, name: ウェルチ型検定}\n"
    "  - {id: I303-DEF-12, name: 対応のあるt検定}\n"
    "theorems:\n",
)

replace_once(
    f"{I303}/chapter.yaml",
    "canonical_examples: [正規母平均のt検定, 正規母分散のカイ二乗検定, 二標本分散比のF検定, ピアソン適合度検定, 2行3列分割表の独立性検定, 対応差の符号検定, ウィルコクソン符号付き順位和検定, ウィルコクソン順位和検定]",
    "canonical_examples: [正規母平均のt検定, 正規母分散のカイ二乗検定, 二標本分散比のF検定, プールt検定, ウェルチ型検定, 対応のあるt検定, ピアソン適合度検定, 2行3列分割表の独立性検定, 対応差の符号検定, ウィルコクソン符号付き順位和検定, ウィルコクソン順位和検定]",
)

old_pooled = r'''### 2.1 独立・正規・等分散

$$
X_1,\ldots,X_{n_1}\sim N(\mu_1,\sigma^2),
\qquad
Y_1,\ldots,Y_{n_2}\sim N(\mu_2,\sigma^2)
$$

が互いに独立とします。プール分散は

$$
S_p^2
=\frac{(n_1-1)S_X^2+(n_2-1)S_Y^2}{n_1+n_2-2}.
$$

$H_0:\mu_1-\mu_2=\delta_0$ の下で

$$
T
=\frac{\bar X-\bar Y-\delta_0}
{S_p\sqrt{1/n_1+1/n_2}}
\sim t_{n_1+n_2-2}.
$$
'''
new_pooled = r'''### 2.1 独立・正規・等分散

<a id="def-i3-03-pooled-t-test"></a>

<!-- formal-statement-start -->
> **定義（プールt検定）**
> 独立な二つの正規標本が共通分散 $\sigma^2$ を持つとする。プール分散を

$$
S_p^2
=\frac{(n_1-1)S_X^2+(n_2-1)S_Y^2}{n_1+n_2-2}
$$

> とし、$H_0:\mu_1-\mu_2=\delta_0$ に対する統計量を

$$
T
=\frac{\bar X-\bar Y-\delta_0}
{S_p\sqrt{1/n_1+1/n_2}}
$$

> とする。帰無仮説の下で $T\sim t_{n_1+n_2-2}$ となるこの検定をプールt検定という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-03-pooled-t-test -->

**定義の確認**
$n_1=10,n_2=12,S_X^2=1.8,S_Y^2=2.0$ なら $S_p^2=1.91$、自由度は $10+12-2=20$ である。

<!-- definition-example-end -->
'''
replace_once(f"{I303}/index.md", old_pooled, new_pooled)

old_welch = r'''### 2.2 等分散を仮定しないウェルチ型検定

$$
T_W
=\frac{\bar X-\bar Y-\delta_0}
{\sqrt{S_X^2/n_1+S_Y^2/n_2}}
$$

を使い、自由度を

$$
\nu
\approx
\frac{(S_X^2/n_1+S_Y^2/n_2)^2}
{\dfrac{(S_X^2/n_1)^2}{n_1-1}
+\dfrac{(S_Y^2/n_2)^2}{n_2-1}}
$$

で近似します。一般には有限標本で正確なt分布ではありません。
'''
new_welch = r'''### 2.2 等分散を仮定しないウェルチ型検定

<a id="def-i3-03-welch-t-test"></a>

<!-- formal-statement-start -->
> **定義（ウェルチ型検定）**
> 独立な二標本で等分散を仮定せず、$H_0:\mu_1-\mu_2=\delta_0$ に対して

$$
T_W
=\frac{\bar X-\bar Y-\delta_0}
{\sqrt{S_X^2/n_1+S_Y^2/n_2}}
$$

> を用い、ウェルチ・サタースウェイトの自由度

$$
\nu
\approx
\frac{(S_X^2/n_1+S_Y^2/n_2)^2}
{\dfrac{(S_X^2/n_1)^2}{n_1-1}
+\dfrac{(S_Y^2/n_2)^2}{n_2-1}}
$$

> でt分布を参照する検定をウェルチ型検定という。一般には有限標本で正確なt分布ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-03-welch-t-test -->

**定義の確認**
$n_1=8,n_2=10,S_X^2=9,S_Y^2=1$ なら標準誤差は $\sqrt{9/8+1/10}$、近似自由度は約 $8.25$ となる。

<!-- definition-example-end -->
'''
replace_once(f"{I303}/index.md", old_welch, new_welch)

old_paired = r'''### 2.3 対応のある二標本

同じ個体の処置前後などでは

$$
D_i=X_i-Y_i
$$

を作り、1標本問題

$$
H_0:E[D_i]=0
$$

へ帰着します。差が正規なら

$$
T_D=\frac{\sqrt n\bar D}{S_D}\sim t_{n-1}.
$$
'''
new_paired = r'''### 2.3 対応のある二標本

<a id="def-i3-03-paired-t-test"></a>

<!-- formal-statement-start -->
> **定義（対応のあるt検定）**
> 同じ個体の処置前後などの対応データでは差 $D_i=X_i-Y_i$ を作る。$H_0:E[D_i]=\delta_0$ に対して

$$
T_D=\frac{\sqrt n(\bar D-\delta_0)}{S_D}
$$

> を用い、差 $D_i$ が正規分布に従うなら帰無仮説の下で $T_D\sim t_{n-1}$ として行う検定を対応のあるt検定という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i3-03-paired-t-test -->

**定義の確認**
$n=8,\bar D=0.775,S_D=0.871,\delta_0=0$ なら $T_D\approx2.516$、自由度は7である。

<!-- definition-example-end -->
'''
replace_once(f"{I303}/index.md", old_paired, new_paired)

DAG = ROOT / "textbook/knowledge-dag.yaml"
dag = DAG.read_text(encoding="utf-8")
old_bridge = '''  - id: normal-sample-mean-variance-sampling-distribution
    name: 正規標本の平均と分散の標本分布
    aliases:
      - 正規標本の平均と分散
      - normal-sample mean and variance sampling distribution
      - sampling distribution of the mean and variance of a normal sample
    introduced_in: S1-01
'''
new_bridge = '''  - id: normal-sample-orthogonal-decomposition-degrees-of-freedom
    name: 正規標本の直交分解と自由度
    aliases:
      - 正規標本の平方和分解と自由度
      - normal-sample orthogonal decomposition and degrees of freedom
      - orthogonal decomposition of a normal sample
    introduced_in: S1-01

  - id: normal-sample-mean-variance-sampling-distribution
    name: 正規標本の平均と分散の標本分布
    aliases:
      - 正規標本の平均と分散
      - normal-sample mean and variance sampling distribution
      - sampling distribution of the mean and variance of a normal sample
    introduced_in: S1-01
    requires: [normal-sample-orthogonal-decomposition-degrees-of-freedom]
'''
if dag.count(old_bridge) != 1:
    raise RuntimeError(f"knowledge-dag bridge: expected 1 match, found {dag.count(old_bridge)}")
dag = dag.replace(old_bridge, new_bridge)

new_nodes = '''  - id: pooled-two-sample-t-test
    name: プールt検定
    aliases:
      - 等分散二標本t検定
      - pooled two-sample t-test
      - pooled t-test
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic, t-statistic-sampling-distribution]

  - id: welch-two-sample-t-test
    name: ウェルチ型検定
    aliases:
      - ウェルチのt検定
      - Welch t-test
      - Welch's t-test
      - Welch two-sample t-test
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic]

  - id: paired-t-test
    name: 対応のあるt検定
    aliases:
      - 対応ありt検定
      - paired t-test
      - paired-sample t-test
    introduced_in: I3-03
    requires: [null-hypothesis, test-statistic, t-statistic-sampling-distribution]
'''
for concept_id in [
    "normal-sample-orthogonal-decomposition-degrees-of-freedom",
    "pooled-two-sample-t-test",
    "welch-two-sample-t-test",
    "paired-t-test",
]:
    if f"  - id: {concept_id}\n" in dag and concept_id != "normal-sample-orthogonal-decomposition-degrees-of-freedom":
        raise RuntimeError(f"knowledge-dag: {concept_id} already exists")

# The orthogonal-decomposition node was inserted above; append only the three I3-03 procedure nodes.
dag = dag.rstrip("\n") + "\n\n" + new_nodes.rstrip("\n") + "\n"
DAG.write_text(dag, encoding="utf-8")

print("Batch 12 edits applied")
