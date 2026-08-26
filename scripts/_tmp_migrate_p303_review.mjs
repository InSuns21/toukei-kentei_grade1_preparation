import fs from 'node:fs';

const base = 'textbook/volumes/02_distributions/P3_03_多変量分布_条件付き分布';
const read = (name) => fs.readFileSync(`${base}/${name}`, 'utf8');

function normalizeTerms(text) {
  return text
    .replace(/モーメント母関数（moment generating function; MGF）/g, 'モーメント母関数')
    .replace(/moment generating function; MGF/g, 'モーメント母関数')
    .replace(/\bMGF\b/g, 'モーメント母関数')
    .replace(/(?<!分散)共分散行列/g, '分散共分散行列');
}

function numbered(src, oldHeading, newHeading) {
  if (!src.startsWith(oldHeading)) throw new Error(`missing heading: ${oldHeading}`);
  return src.replace(oldHeading, newHeading);
}

let overview = normalizeTerms(read('00_overview.md'))
  .replace('多変量正規分布の密度は`02_definitions.md`と`06_exercises.md`冒頭に再掲します。略語と一変量分布の式の共通索引は`references/distribution-notation-guide.md`です。',
    '本章は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md) に従います。多変量正規分布の密度、特異な場合の定義、条件付き分布の公式は本文で導出し、演習では各設問に必要な出発点を問題文付近へ再掲します。')
  .replace('P2-01: 同時密度から周辺・条件付き密度を作る。', 'P2-01: 同時確率密度関数から周辺・条件付き確率密度関数を作る。');

let motivation = numbered(normalizeTerms(read('01_motivation.md')), '# 動機と試験での位置づけ', '# 1. 動機と試験での位置づけ');
let definitions = numbered(normalizeTerms(read('02_definitions.md')), '# 定義と記法', '# 2. 定義と記法');
let theorems = numbered(normalizeTerms(read('03_theorems.md')), '# 基本命題と主要定理', '# 3. 基本命題と主要定理');
let examples = numbered(normalizeTerms(read('04_examples.md')), '# 典型例と完全な導出', '# 4. 典型例と完全な導出');
let patterns = numbered(normalizeTerms(read('05_problem_solving.md')), '# 問題解決パターン', '# 5. 問題解決パターン');

// A few reading-side explanations were too compressed for the current common rules.
theorems = theorems
  .replace('実際、$\\boldsymbol Y-E[\\boldsymbol Y]=A(\\boldsymbol X-\\boldsymbol\\mu)$を外積へ代入すれば従います。', `実際、
$$
\\begin{aligned}
\\boldsymbol Y-E[\\boldsymbol Y]
&=A\\boldsymbol X+\\boldsymbol b-
\\{A E[\\boldsymbol X]+\\boldsymbol b\\}\\\\
&=A(\\boldsymbol X-\\boldsymbol\\mu).
\\end{aligned}
$$
したがって
$$
\\begin{aligned}
\\operatorname{Cov}(\\boldsymbol Y)
&=E\\left[(\\boldsymbol Y-E[\\boldsymbol Y])(\\boldsymbol Y-E[\\boldsymbol Y])^{\\mathsf T}\\right]\\\\
&=E\\left[A(\\boldsymbol X-\\boldsymbol\\mu)(\\boldsymbol X-\\boldsymbol\\mu)^{\\mathsf T}A^{\\mathsf T}\\right]\\\\
&=A\\boldsymbol\\Sigma A^{\\mathsf T}.
\\end{aligned}
$$`)
  .replace('実際、$W=\\boldsymbol t^{\\mathsf T}\\boldsymbol X\\sim N(\\boldsymbol t^{\\mathsf T}\\boldsymbol\\mu,\\boldsymbol t^{\\mathsf T}\\boldsymbol\\Sigma\\boldsymbol t)$なので、$M_{\\boldsymbol X}(\\boldsymbol t)=E[e^W]=M_W(1)$へ一変量正規のモーメント母関数を代入すれば上式を得ます。', `実際、
$$
W=\\boldsymbol t^{\\mathsf T}\\boldsymbol X
\\sim N\\left(\\boldsymbol t^{\\mathsf T}\\boldsymbol\\mu,
\\boldsymbol t^{\\mathsf T}\\boldsymbol\\Sigma\\boldsymbol t\\right).
$$
一変量正規分布 $N(m,v)$ のモーメント母関数 $E[e^{sW}]=\\exp(ms+vs^2/2)$ に $s=1$、$m=\\boldsymbol t^{\\mathsf T}\\boldsymbol\\mu$、$v=\\boldsymbol t^{\\mathsf T}\\boldsymbol\\Sigma\\boldsymbol t$ を代入すると
$$
M_{\\boldsymbol X}(\\boldsymbol t)
=E[e^W]
=\\exp\\left(\\boldsymbol t^{\\mathsf T}\\boldsymbol\\mu
+\\frac12\\boldsymbol t^{\\mathsf T}\\boldsymbol\\Sigma\\boldsymbol t\\right)
$$
を得ます。`);

let solutionSource = normalizeTerms(read('07_solutions.md'));

// Expand a matrix calculation that was previously only asserted.
solutionSource = solutionSource.replace(
`$$
\\Sigma^{-1}=\\frac13\\begin{pmatrix}2&-1\\\\-1&2\\end{pmatrix}.
$$
正定値な分散共分散で白色化できるため$Q\\sim\\chi_2^2$です。`,
`まず
$$
|\\Sigma|=2\\cdot2-1\\cdot1=3>0
$$
なので $\\Sigma$ は正定値です。$2\\times2$ 行列の逆行列公式から
$$
\\begin{aligned}
\\Sigma^{-1}
&=\\frac1{|\\Sigma|}
\\begin{pmatrix}2&-1\\\\-1&2\\end{pmatrix}\\\\
&=\\frac13\\begin{pmatrix}2&-1\\\\-1&2\\end{pmatrix}.
\\end{aligned}
$$
正定値な分散共分散行列なので、$LL^{\\mathsf T}=\\Sigma$ を満たす可逆行列 $L$ を取り
$$
\\boldsymbol Z=L^{-1}\\boldsymbol X
$$
と置けます。すると $\\boldsymbol Z\\sim N_2(\\boldsymbol0,I_2)$ で、
$$
Q=\\boldsymbol X^{\\mathsf T}\\Sigma^{-1}\\boldsymbol X
=\\boldsymbol Z^{\\mathsf T}\\boldsymbol Z
=Z_1^2+Z_2^2.
$$
従って $Q\\sim\\chi_2^2$ です。`);

solutionSource = solutionSource.replace(
'標準正規モーメント母関数 $M_Z(t)=e^{t^2/2}$ を4回微分して$t=0$を代入すると$E[Z_i^4]=M_Z^{(4)}(0)=3$です。',
`標準正規分布のモーメント母関数
$$
M_Z(t)=e^{t^2/2}
$$
を用います。1回ずつ微分すると
$$
M_Z'(t)=t e^{t^2/2},
$$
$$
M_Z''(t)=(1+t^2)e^{t^2/2},
$$
$$
M_Z'''(t)=(3t+t^3)e^{t^2/2},
$$
$$
M_Z^{(4)}(t)=(3+6t^2+t^4)e^{t^2/2}.
$$
したがって $t=0$ を代入して $E[Z_i^4]=M_Z^{(4)}(0)=3$ です。`);

const scoreReplacements = new Map([
  ['平均3点、分散の交差項4点、計算3点。', '平均6点、分散の交差項8点、計算6点。合計20点。'],
  ['半正定値条件5点、範囲2点、相関3点。', '半正定値条件8点、範囲4点、相関8点。合計20点。'],
  ['周辺各3点、和の平均1点、分散3点。', '二つの周辺分布各4点、和の平均4点、和の分散8点。合計20点。'],
  ['公式5点、分子2点、分母2点、整理1点。', '公式8点、分子4点、分母4点、整理4点。合計20点。'],
  ['平均3点、$A\\Sigma$2点、共分散3点、分布結論2点。', '平均5点、$A\\Sigma$4点、分散共分散6点、分布結論5点。合計20点。'],
  ['平均5点、分散3点、分布結論2点。', '条件付き平均8点、条件付き分散6点、分布結論6点。合計20点。'],
  ['共分散3点、反例事象4点、非独立結論1点、正規の場合2点。', '共分散5点、反例事象7点、非独立結論3点、正規の場合5点。合計20点。'],
  ['逆行列4点、分布4点、数値2点。', '逆行列8点、白色化と分布8点、数値4点。合計20点。'],
  ['相関3点、条件付き平均5点、分散5点、確率3点、逆向き平均5点、逆向き分散4点。', '相関2点、条件付き平均4点、条件付き分散4点、確率2点、逆向き平均4点、逆向き分散4点。合計20点。'],
  ['平方完成による正定値5点、平均6点、共分散7点、独立性4点、周辺3点。', '平方完成による正定値4点、条件付き平均5点、条件付き分散共分散5点、独立性3点、周辺分布3点。合計20点。'],
  ['残差5点、共分散5点、分散5点、偏相関4点、条件付き独立6点。', '残差4点、残差共分散4点、残差分散4点、偏相関3点、条件付き独立5点。合計20点。'],
  ['平均共分散6点、正規性独立性5点、二次形式5点、分布4点、平均分散5点。', '平均・分散共分散5点、正規性・独立性4点、二次形式4点、分布3点、平均・分散4点。合計20点。'],
  ['各5点。正誤1点、根拠または反例4点。', '各4点。各項について正誤1点、根拠または反例3点。合計20点。'],
  ['次元3点、交差共分散7点、残差共分散10点、正規性5点、独立性5点、条件付き分布7点。', '次元2点、交差共分散4点、残差分散共分散5点、正規性3点、独立性3点、条件付き分布3点。合計20点。'],
]);
for (const [from, to] of scoreReplacements) {
  if (!solutionSource.includes(from)) throw new Error(`score text not found: ${from}`);
  solutionSource = solutionSource.replace(from, to);
}

const solutionMatches = [...solutionSource.matchAll(/^## (P3M-[A-D]\d{2}) 解答\n([\s\S]*?)(?=^## P3M-|\s*$)/gm)];
const solutions = new Map(solutionMatches.map((m) => [m[1], m[2].trim()]));
if (solutions.size !== 14) throw new Error(`expected 14 solutions, got ${solutions.size}`);

function sol(id) {
  const body = solutions.get(id);
  if (!body) throw new Error(`missing solution: ${id}`);
  const nested = body.replace(/^### /gm, '##### ');
  return `<!-- solution-start -->\n\n#### 解答\n\n${nested}\n\n<!-- solution-end -->`;
}

const conditionalFormula = `次の二変量正規分布の条件付き公式を用いてよい。$X,Y$ の平均を $\\mu_X,\\mu_Y$、分散を $\\sigma_X^2,\\sigma_Y^2$、共分散を $\\sigma_{XY}$ とすると、
$$
Y\\mid(X=x)\\sim N\\left(
\\mu_Y+\\frac{\\sigma_{XY}}{\\sigma_X^2}(x-\\mu_X),
\\sigma_Y^2-\\frac{\\sigma_{XY}^2}{\\sigma_X^2}
\\right).
$$`;

const blockFormula = `正定値な分散共分散行列を
$$
\\begin{pmatrix}
\\Sigma_{11}&\\Sigma_{12}\\\\
\\Sigma_{21}&\\Sigma_{22}
\\end{pmatrix}
$$
と分割したとき、条件付き平均と条件付き分散共分散行列として
$$
\\boldsymbol\\mu_{1\\mid2}
=\\boldsymbol\\mu_1+\\Sigma_{12}\\Sigma_{22}^{-1}
(\\boldsymbol x_2-\\boldsymbol\\mu_2),
$$
$$
\\Sigma_{1\\mid2}
=\\Sigma_{11}-\\Sigma_{12}\\Sigma_{22}^{-1}\\Sigma_{21}
$$
を用いてよい。`;

const exercises = `# 6. 演習：問題の直後に解答

GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

共通演習規約に従い、**初見の受験者が記号や分布公式を推測せず立式できること**を最低条件とします。分布の確率密度関数や条件付き公式が計算の出発点で、それ自体を導出させない場合は問題文付近に与えます。逆に、公式の導出や分布同定そのものが採点対象なら先に答えを与えません。各大問の採点基準は20点満点です。

## Level A：基礎部品

### P3M-A01 線形結合
- level: A
- minutes: 7
- topics: 平均, 共分散
- techniques: AFFINE-1
- calculation_load: low

二乗可積分な実数値確率変数 $X,Y$ について
$$
E[X]=1,\quad E[Y]=2,
$$
$$
\\operatorname{Var}(X)=4,\quad
\\operatorname{Var}(Y)=9,\quad
\\operatorname{Cov}(X,Y)=3
$$
とする。確率変数 $W=2X-Y$ を定める。$E[W]$ と $\\operatorname{Var}(W)$ を求めよ。

${sol('P3M-A01')}

### P3M-A02 分散共分散行列の条件
- level: A
- minutes: 8
- topics: 分散共分散行列, 相関係数
- techniques: DIM-1
- calculation_load: low

$c\\in\\mathbb R$ とし、二変量確率ベクトルの候補となる対称行列
$$
\\Sigma(c)=\\begin{pmatrix}4&c\\\\c&9\\end{pmatrix}
$$
を考える。対称行列が分散共分散行列となり得るための必要十分条件が半正定値性であることを用いてよい。

1. $\\Sigma(c)$ が分散共分散行列となり得るための $c$ の範囲を求めよ。
2. そのとき相関係数 $\\rho=c/(\\sqrt4\\sqrt9)$ を $c$ で表せ。

${sol('P3M-A02')}

### P3M-A03 周辺と線形結合
- level: A
- minutes: 8
- topics: 多変量正規分布, 周辺分布
- techniques: AFFINE-1
- calculation_load: low

実数値確率変数 $X,Y$ を成分にもつ確率ベクトルが
$$
\\begin{pmatrix}X\\\\Y\\end{pmatrix}
\\sim N_2\\left(
\\begin{pmatrix}1\\\\2\\end{pmatrix},
\\begin{pmatrix}4&3\\\\3&9\\end{pmatrix}
\\right)
$$
に従うとする。本教材では $N_2$ の第2母数は分散共分散行列である。多変量正規分布の部分ベクトルとアフィン変換も正規分布に従うという定理を用いてよい。$X$, $Y$, $X+Y$ の分布を求めよ。

${sol('P3M-A03')}

### P3M-A04 偏相関
- level: A
- minutes: 8
- topics: 偏相関係数
- techniques: PARTIAL-1
- calculation_load: low

二乗可積分な標準化済み確率変数 $X_1,X_2,X_3$ の相関係数が
$$
\\rho_{12}=\\frac12,\qquad
\\rho_{13}=\\frac13,\qquad
\\rho_{23}=\\frac14
$$
であるとする。第3変数の線形効果を除いた偏相関係数は
$$
\\rho_{12\\cdot3}
=\\frac{\\rho_{12}-\\rho_{13}\\rho_{23}}
{\\sqrt{(1-\\rho_{13}^2)(1-\\rho_{23}^2)}}
$$
で与えられる。この式を用いて $\\rho_{12\\cdot3}$ を求めよ。

${sol('P3M-A04')}

## Level B：小問セット

### P3M-B01 アフィン変換
- level: B
- minutes: 15
- topics: 多変量正規分布, 線形変換
- techniques: AFFINE-1, DIM-1
- calculation_load: medium

3次元確率ベクトル $\\boldsymbol X$ が
$$
\\boldsymbol X\\sim N_3(\\boldsymbol\\mu,\\Sigma),
$$
$$
\\boldsymbol\\mu=\\begin{pmatrix}1\\\\0\\\\2\\end{pmatrix},\quad
\\Sigma=\\begin{pmatrix}2&1&0\\\\1&3&1\\\\0&1&2\\end{pmatrix}
$$
に従う。ここで $\\Sigma$ は分散共分散行列である。また
$$
A=\\begin{pmatrix}1&1&0\\\\0&1&-1\\end{pmatrix},\qquad
\\boldsymbol b=\\begin{pmatrix}0\\\\1\\end{pmatrix}
$$
とし、2次元確率ベクトル $\\boldsymbol Y=A\\boldsymbol X+\\boldsymbol b$ を定める。アフィン変換公式
$$
A\\boldsymbol X+\\boldsymbol b
\\sim N_2(A\\boldsymbol\\mu+\\boldsymbol b,\,A\\Sigma A^{\\mathsf T})
$$
を用いてよい。$\\boldsymbol Y$ の分布を求めよ。

${sol('P3M-B01')}

### P3M-B02 二変量正規の条件付け
- level: B
- minutes: 14
- topics: 条件付き分布
- techniques: COND-NORMAL-1
- calculation_load: medium

実数値確率変数 $X,Y$ の結合分布は二変量正規分布で、
$$
E[X]=0,\quad E[Y]=1,\quad
\\sigma_X=2,\quad \\sigma_Y=3,\quad \\rho=\\frac13
$$
とする。従って分散共分散行列は
$$
\\Sigma=
\\begin{pmatrix}
4&2\\\\
2&9
\\end{pmatrix}
$$
である。

${conditionalFormula}

$Y\\mid(X=x)$ の分布を求めよ。

${sol('P3M-B02')}

### P3M-B03 無相関と独立
- level: B
- minutes: 14
- topics: 独立性, 無相関
- techniques: INDEP-NORMAL-1
- calculation_load: medium

連続型確率変数 $X$ の確率密度関数を
$$
f_X(x)=\\frac12\\boldsymbol{1}_{(-1,1)}(x)
$$
とし、確率変数 $Y=X^2$ を定める。すなわち $X\\sim\\operatorname{Unif}(-1,1)$ である。

1. $\\operatorname{Cov}(X,Y)$ を求めよ。
2. $X,Y$ が独立でないことを、独立性の定義に反する事象を一組示して証明せよ。
3. 追加で $(X,Y)$ の結合分布が二変量正規分布であったなら、共分散0から何が言えるか。

${sol('P3M-B03')}

### P3M-B04 マハラノビス二次形式
- level: B
- minutes: 15
- topics: 二次形式, 多変量正規分布
- techniques: QUAD-MVN-1
- calculation_load: medium

2次元確率ベクトル $\\boldsymbol X$ が
$$
\\boldsymbol X\\sim N_2(\\boldsymbol0,\\Sigma),\qquad
\\Sigma=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}
$$
に従い、$\\Sigma$ は正定値な分散共分散行列である。マハラノビス二次形式を
$$
Q=\\boldsymbol X^{\\mathsf T}\\Sigma^{-1}\\boldsymbol X
$$
と定める。

1. $\\Sigma^{-1}$ を2次正方行列の逆行列公式から求めよ。
2. 白色化 $\\boldsymbol Z=L^{-1}\\boldsymbol X$（$LL^{\\mathsf T}=\\Sigma$）を用いて $Q$ の分布を示せ。
3. 観測値 $\\boldsymbol x=(1,-1)^{\\mathsf T}$ に対する二次形式の値を求めよ。

${sol('P3M-B04')}

## Level C：本番標準

### P3M-C01 双方向の条件付き正規
- level: C
- minutes: 25
- topics: 二変量正規分布, 条件付き分布
- techniques: COND-NORMAL-1
- calculation_load: medium

実数値確率変数 $X,Y$ の結合分布は二変量正規分布で、平均ベクトルと分散共分散行列が
$$
\\boldsymbol\\mu=\\begin{pmatrix}2\\\\-1\\end{pmatrix},\qquad
\\Sigma=\\begin{pmatrix}4&3\\\\3&9\\end{pmatrix}
$$
である。

${conditionalFormula}

1. 相関係数を求めよ。
2. $Y\\mid(X=4)$ の分布を求めよ。
3. $P(Y>1/2\\mid X=4)$ を求めよ。
4. $E[X\\mid Y=y]$ を求めよ。
5. $\\operatorname{Var}(X\\mid Y=y)$ を求めよ。

${sol('P3M-C01')}

### P3M-C02 ブロック条件付け
- level: C
- minutes: 28
- topics: 多変量正規分布, 条件付き分布, 独立性
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: high

3次元確率ベクトル $\\boldsymbol X=(X_1,X_2,X_3)^{\\mathsf T}$ が
$$
\\boldsymbol X
\\sim N_3\\left(
\\begin{pmatrix}0\\\\1\\\\2\\end{pmatrix},
\\begin{pmatrix}4&1&2\\\\1&3&1\\\\2&1&2\\end{pmatrix}
\\right)
$$
に従う。第2母数は候補となる分散共分散行列である。

${blockFormula}

1. 対応する二次形式を平方完成し、この行列が正定値であることを確認せよ。
2. $(X_1,X_2)^{\\mathsf T}\\mid(X_3=4)$ の条件付き平均を求めよ。
3. 条件付き分散共分散行列を求めよ。
4. 条件付きで $X_1,X_2$ は独立か。正規性も含めて根拠を述べよ。
5. $X_1\\mid(X_3=4)$ の分布を求めよ。

${sol('P3M-C02')}

### P3M-C03 残差と偏相関
- level: C
- minutes: 27
- topics: 偏相関係数, 条件付き独立
- techniques: PARTIAL-1
- calculation_load: high

実数値確率変数 $X_1,X_2,X_3$ は中心化・標準化されており、相関行列は
$$
R=\\begin{pmatrix}
1&0.3&0.5\\\\
0.3&1&0.6\\\\
0.5&0.6&1
\\end{pmatrix}
$$
である。標準化された $X_i$ を $X_3$ だけで最良線形予測するときの係数
$$
a_i=\\frac{\\operatorname{Cov}(X_i,X_3)}{\\operatorname{Var}(X_3)}=\\rho_{i3}
$$
を用いてよい。

1. $X_1,X_2$ をそれぞれ $X_3$ へ線形回帰した残差 $R_1,R_2$ を示せ。
2. $\\operatorname{Cov}(R_1,R_2)$ を展開して求めよ。
3. 各残差分散を求めよ。
4. $\\rho_{12\\cdot3}=\\operatorname{Corr}(R_1,R_2)$ を求めよ。
5. 追加で $(X_1,X_2,X_3)$ が三変量正規分布に従うと仮定する。このとき $X_3$ を与えた下での $X_1,X_2$ の独立性について述べよ。

${sol('P3M-C03')}

### P3M-C04 白色化と二次形式
- level: C
- minutes: 25
- topics: 線形変換, 二次形式
- techniques: AFFINE-1, QUAD-MVN-1
- calculation_load: medium

$p\\in\\mathbb N$ とする。$p$次元確率ベクトル $\\boldsymbol X$ が
$$
\\boldsymbol X\\sim N_p(\\boldsymbol\\mu,\\Sigma)
$$
に従い、$\\Sigma$ は正定値な分散共分散行列とする。$L$ を $LL^{\\mathsf T}=\\Sigma$ を満たす可逆行列とし、
$$
\\boldsymbol Z=L^{-1}(\\boldsymbol X-\\boldsymbol\\mu)
$$
と置く。多変量正規分布のアフィン変換定理と、標準正規分布のモーメント母関数 $M_Z(t)=e^{t^2/2}$ を用いてよい。

1. $\\boldsymbol Z$ の平均と分散共分散行列を求めよ。
2. $\\boldsymbol Z$ の分布と成分の独立性を示せ。
3. マハラノビス二次形式が $\\boldsymbol Z^{\\mathsf T}\\boldsymbol Z$ に等しいことを示せ。
4. 二次形式の分布を求めよ。
5. 二次形式の平均と分散を求めよ。

${sol('P3M-C04')}

### P3M-C05 正誤判定総合
- level: C
- minutes: 25
- topics: 多変量分布, 独立性, 条件付き分布
- techniques: INDEP-NORMAL-1, ANSWER-1
- calculation_load: medium

次を正誤判定し、正しければ根拠、誤りなら反例または不足仮定を示せ。

1. 任意の分散共分散行列は対称半正定値である。
2. 二乗可積分な実数値確率変数 $X,Y$ で $\\operatorname{Cov}(X,Y)=0$ なら独立である。
3. 結合分布が二変量正規分布である $X,Y$ で共分散0なら独立である。
4. 多変量正規分布の条件付き分散共分散行列は、条件付けた観測値に依存する。
5. 多変量正規分布の任意の部分ベクトルは多変量正規分布である。

${sol('P3M-C05')}

## Level D：発展

### P3M-D01 条件付き正規公式の導出
- level: D
- minutes: 40
- topics: 多変量正規分布, 条件付き分布, Schur補
- techniques: BLOCK-1, COND-NORMAL-1
- calculation_load: high

$p,q\\in\\mathbb N$ とする。確率ベクトル $\\boldsymbol X_1\\in\\mathbb R^p$, $\\boldsymbol X_2\\in\\mathbb R^q$ の結合分布が
$$
\\begin{pmatrix}\\boldsymbol X_1\\\\\\boldsymbol X_2\\end{pmatrix}
\\sim N_{p+q}\\left(
\\begin{pmatrix}\\boldsymbol\\mu_1\\\\\\boldsymbol\\mu_2\\end{pmatrix},
\\begin{pmatrix}
\\Sigma_{11}&\\Sigma_{12}\\\\
\\Sigma_{21}&\\Sigma_{22}
\\end{pmatrix}
\\right)
$$
に従い、全分散共分散行列は正定値とする。従って $\\Sigma_{22}$ は可逆である。条件付き正規公式そのものを導出する問題なので、公式は使用せず以下を示せ。

1. $B=\\Sigma_{12}\\Sigma_{22}^{-1}$、$\\boldsymbol R=\\boldsymbol X_1-\\boldsymbol\\mu_1-B(\\boldsymbol X_2-\\boldsymbol\\mu_2)$ と置き、$\\operatorname{Cov}(\\boldsymbol R,\\boldsymbol X_2)=0$ を示せ。
2. $\\operatorname{Cov}(\\boldsymbol R)$ がSchur補 $\\Sigma_{1\\mid2}$ であることを示せ。
3. $(\\boldsymbol R,\\boldsymbol X_2)$ の結合分布が多変量正規分布であることを示せ。
4. $\\boldsymbol R$ と $\\boldsymbol X_2$ の独立性を示せ。
5. 以上から $\\boldsymbol X_1\\mid(\\boldsymbol X_2=\\boldsymbol x_2)$ の分布を導け。

${sol('P3M-D01')}`;

let drill = normalizeTerms(read('08_exam_drill.md'))
  .replace(/^# 30分ドリル/m, '# 7. 30分ドリル')
  .replace('## P3M-DRILL-01 問題', '## P3M-DRILL-01 多変量正規・条件付け・二次形式');
const drillAnswerStart = drill.indexOf('## 詳細解答');
const drillReviewStart = drill.indexOf('## 復習カード');
if (drillAnswerStart < 0 || drillReviewStart < 0) throw new Error('drill sections not found');
const drillProblem = drill.slice(0, drillAnswerStart).trimEnd();
const drillAnswer = drill.slice(drillAnswerStart, drillReviewStart).trim()
  .replace(/^## 詳細解答/m, '#### 詳細解答')
  .replace(/^## 完成形の本番答案/m, '#### 本番答案')
  .replace(/^## 採点基準・時間配分・選択判断/m, '#### 採点基準・時間配分・選択判断');
const drillReview = drill.slice(drillReviewStart).trim();
drill = `${drillProblem}\n\n<!-- solution-start -->\n\n### 解答\n\n${drillAnswer}\n\n<!-- solution-end -->\n\n${drillReview}`;

let past = normalizeTerms(read('09_past_exam_practice.md'))
  .replace(/^# 実過去問演習/m, '# 8. 実過去問演習')
  .replace('\n## 実過去問演習\n', '\n');

const index = [overview, motivation, definitions, theorems, examples, patterns, exercises, drill, past,
`# 9. 復習チェック

- [ ] 分散共分散行列が対称半正定値になる理由を $\\boldsymbol a^{\\mathsf T}\\Sigma\\boldsymbol a$ から説明できる。
- [ ] 多変量正規分布の密度式を使える条件と、特異な場合に密度式を使えない理由を区別できる。
- [ ] アフィン変換後の平均と分散共分散行列を次元付きで計算できる。
- [ ] 条件付き正規分布の平均とSchur補を、どのブロックが条件付ける側か確認して使える。
- [ ] 一般の「無相関」と、多変量正規での「無相関なら独立」を区別できる。
- [ ] 偏相関を残差の相関として説明できる。
- [ ] 白色化からマハラノビス二次形式をカイ二乗分布へ結び付けられる。
- [ ] 演習で使用する非自明な公式が、問題文で許可されているか、設問で導出対象になっているかを確認できる。`
].join('\n\n---\n\n');

fs.writeFileSync(`${base}/index.md`, index);

for (const meta of ['chapter.yaml', 'glossary.yaml']) {
  const path = `${base}/${meta}`;
  fs.writeFileSync(path, normalizeTerms(fs.readFileSync(path, 'utf8')));
}
for (const review of ['review/exam-fitness.md', 'review/independent-math.md', 'review/validation.md']) {
  const path = `${base}/${review}`;
  let text = normalizeTerms(fs.readFileSync(path, 'utf8'));
  if (review.endsWith('validation.md')) {
    text += `\n\n## 共通規約再監査（2026-08-26）\n\n- 旧分割構成を廃止し、本文・演習・詳細解答・本番答案・採点基準・30分ドリルを \\`index.md\\` の1ページへ統合。\n- 問題文の最低記載水準を再監査し、確率変数・確率ベクトル・母数・分散共分散行列・使用可能な非自明公式を各問題の近傍で宣言。\n- 条件付き正規公式を適用する問題では公式を使用可として問題文に再掲し、D01では公式の導出自体が採点対象なので再掲しない。\n- B03では一様分布の確率密度関数を問題文へ移し、解答側で初めて必要入力を出す構成を解消。\n- A/B/C/Dの14題を共通演習規約の20点満点へ正規化。\n- B04の逆行列・白色化、C04の4次モーメント導出など、採点対象の途中計算を補強。\n- 用語ガイドに従い、主表記を「分散共分散行列」「モーメント母関数」へ統一。\n`;
  }
  fs.writeFileSync(path, text);
}

console.log(`P3-03 migrated to one-page reviewed chapter; solutions=${solutions.size}`);
