import fs from 'node:fs';

function replaceExact(source, oldText, newText, label) {
  if (!source.includes(oldText)) {
    throw new Error(`replacement target not found: ${label}`);
  }
  return source.replace(oldText, newText);
}

const chapterPath = 'textbook/volumes/02_distributions/P3_02_主要な連続分布/index.md';
let chapter = fs.readFileSync(chapterPath, 'utf8');

chapter = replaceExact(
  chapter,
  String.raw`GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。`,
  String.raw`GitHub Pagesでは各「解答を表示」を開くと、詳細解答・本番答案・採点基準を確認できます。

共通演習規約に従い、**確率密度関数・累積分布関数・生存関数などが計算の出発点として必要で、それ自体を導出させる問題でない場合は、問題文に具体式を与えます。** 一方、その式の導出自体や分布同定が採点対象なら、答えを先に与えないため問題文には置きません。`,
  'section 7 input policy',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Unif}(2,6)$ の累積分布関数、$P(3<X\le5)$、平均、分散を求めよ。`,
  String.raw`連続型確率変数 $X$ の確率密度関数を

$$
f_X(x)=\frac14\boldsymbol{1}_{(2,6)}(x)
$$

とする。これは $X\sim\operatorname{Unif}(2,6)$ に対応する。累積分布関数、$P(3<X\le5)$、平均、分散を求めよ。`,
  'P3C-A01',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Exp}(0.5)$ の $P(X>4)$、$P(X>6\mid X>2)$、平均、分散を求めよ。`,
  String.raw`連続型確率変数 $X$ の確率密度関数を

$$
f_X(x)=0.5e^{-0.5x}\boldsymbol{1}_{(0,\infty)}(x)
$$

とする。これは率 $0.5$ の指数分布 $X\sim\operatorname{Exp}(0.5)$ に対応する。$P(X>4)$、$P(X>6\mid X>2)$、平均、分散を求めよ。`,
  'P3C-A02',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Cauchy}(0,1)$ の累積分布関数、$P(|X|\le1)$ を求め、期待値が存在しない理由を述べよ。`,
  String.raw`連続型確率変数 $X$ の確率密度関数を

$$
f_X(x)=\frac{1}{\pi(1+x^2)},
\qquad x\in\mathbb R
$$

とする。これは標準コーシー分布 $X\sim\operatorname{Cauchy}(0,1)$ に対応する。累積分布関数、$P(|X|\le1)$ を求め、期待値が存在しない理由を述べよ。`,
  'P3C-A04',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Weibull}(2,3)$ とする。生存関数、ハザード、中央値を求め、$Y=(X/3)^2$ の分布を示せ。`,
  String.raw`連続型確率変数 $X$ の確率密度関数を

$$
f_X(x)=\frac23\left(\frac x3\right)
\exp\left\{-\left(\frac x3\right)^2\right\}
\boldsymbol{1}_{(0,\infty)}(x)
$$

とする。これは形状2、尺度3のワイブル分布 $X\sim\operatorname{Weibull}(2,3)$ に対応する。生存関数、ハザード、中央値を求め、$Y=(X/3)^2$ の分布を示せ。`,
  'P3C-B03',
);

chapter = replaceExact(
  chapter,
  String.raw`1. $X\sim\operatorname{Lognormal}(0,1)$ の中央値、平均、分散を求めよ。
2. $Y\sim\operatorname{Logistic}(\mu,s)$ の中央値と第1・第3四分位点を求めよ。`,
  String.raw`1. 正値の連続型確率変数 $X$ について $Z=\log X\sim N(0,1)$ とする。したがって $X\sim\operatorname{Lognormal}(0,1)$ であり、その確率密度関数は

   $$
   f_X(x)=\frac{1}{x\sqrt{2\pi}}
   \exp\left\{-\frac{(\log x)^2}{2}\right\}
   \boldsymbol{1}_{(0,\infty)}(x)
   $$

   である。中央値、平均、分散を求めよ。
2. $\mu\in\mathbb R$, $s>0$ とし、連続型確率変数 $Y$ の累積分布関数を

   $$
   F_Y(y)=\frac{1}{1+e^{-(y-\mu)/s}},
   \qquad y\in\mathbb R
   $$

   とする。これは $Y\sim\operatorname{Logistic}(\mu,s)$ に対応する。中央値と第1・第3四分位点を求めよ。`,
  'P3C-B04',
);

chapter = replaceExact(
  chapter,
  String.raw`独立な $X_1,X_2\sim\operatorname{Exp}(\lambda)$ とし、$S=X_1+X_2$ とする。`,
  String.raw`$\lambda>0$ とする。独立な連続型確率変数 $X_1,X_2$ は共通の確率密度関数

$$
f_{X_i}(x)=\lambda e^{-\lambda x}\boldsymbol{1}_{(0,\infty)}(x),
\qquad i=1,2
$$

を持つとする。すなわち $X_1,X_2\sim\operatorname{Exp}(\lambda)$ である。$S=X_1+X_2$ とする。`,
  'P3C-C01',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Beta}(\alpha,\beta)$、$\alpha>1$, $\beta>1$ とする。`,
  String.raw`$\alpha>1$, $\beta>1$ とし、連続型確率変数 $X$ の確率密度関数を

$$
f_X(x)=
\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}
\boldsymbol{1}_{(0,1)}(x)
$$

とする。すなわち $X\sim\operatorname{Beta}(\alpha,\beta)$ である。`,
  'P3C-C02',
);

chapter = replaceExact(
  chapter,
  String.raw`$Y\sim N(\mu,\sigma^2)$、$X=e^Y$、$\sigma>0$ とする。`,
  String.raw`$\mu\in\mathbb R$, $\sigma>0$ とし、連続型確率変数 $Y$ の確率密度関数を

$$
f_Y(y)=\frac{1}{\sigma\sqrt{2\pi}}
\exp\left\{-\frac{(y-\mu)^2}{2\sigma^2}\right\},
\qquad y\in\mathbb R
$$

とする。すなわち $Y\sim N(\mu,\sigma^2)$ である。$X=e^Y$ とする。`,
  'P3C-C03',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Weibull}(c,\eta)$、$c,\eta>0$ とする。`,
  String.raw`$c,\eta>0$ とし、連続型確率変数 $X$ の確率密度関数を

$$
f_X(x)=\frac c\eta
\left(\frac x\eta\right)^{c-1}
\exp\left\{-\left(\frac x\eta\right)^c\right\}
\boldsymbol{1}_{(0,\infty)}(x)
$$

とする。すなわち $X\sim\operatorname{Weibull}(c,\eta)$ であり、$c$ は形状、$\eta$ は尺度である。`,
  'P3C-C04',
);

chapter = replaceExact(
  chapter,
  String.raw`次の生成機構に対応する分布名と母数を示し、台と、平均が存在する場合は平均も書け。本問では、本章3節・4節ですでに導出した平均の結果を引用してよい。ただし母数の対応を明記すること。`,
  String.raw`次の生成機構に対応する分布名と母数を示し、台と、平均が存在する場合は平均も書け。本問では、本章3節・4節ですでに導出した平均の結果を引用してよい。ただし母数の対応を明記すること。

**この問題では分布同定そのものが採点対象なので、候補分布の確率密度関数は問題文に与えない。**`,
  'P3C-C05 exception note',
);

chapter = replaceExact(
  chapter,
  String.raw`$X\sim\operatorname{Logistic}(\mu,s)$ とする。`,
  String.raw`$\mu\in\mathbb R$, $s>0$ とし、連続型確率変数 $X$ の累積分布関数を

$$
F(x)=\frac{1}{1+e^{-(x-\mu)/s}},
\qquad x\in\mathbb R
$$

とする。すなわち $X\sim\operatorname{Logistic}(\mu,s)$ である。`,
  'P3C-D01',
);

chapter = replaceExact(
  chapter,
  String.raw`部品寿命 $X$ は、形状2、未知尺度 $\eta>0$ のワイブル分布に従う。すなわち`,
  String.raw`部品寿命 $X$ は、形状2、未知尺度 $\eta>0$ のワイブル分布に従う。**問1で確率密度関数そのものを導出させるため、ここでは密度を与えず、生存関数を出発点として与える。** すなわち`,
  'drill density exception note',
);

fs.writeFileSync(chapterPath, chapter);

const guidelinePath = 'EXERCISE_GUIDELINES.md';
let guideline = fs.readFileSync(guidelinePath, 'utf8');
guideline = replaceExact(
  guideline,
  String.raw`- 問題を解くために確率質量関数・確率密度関数などの具体式が必要で、それ自体を導出させる問題でないなら、分布名だけから式を暗記で補わせず問題文付近に与える。`,
  String.raw`- 問題を解くために確率質量関数・確率密度関数などの具体式が必要で、それ自体を導出させる問題でないなら、分布名だけから式を暗記で補わせず問題文付近に与える。
- **問題文では分布名だけを置き、詳細解答の冒頭で初めて必要な確率質量関数・確率密度関数・累積分布関数を提示する構成は禁止する。** 計算の出発点として必要な式は問題文へ移す。ただし、その式の導出自体または分布同定自体が採点対象なら、答えを先に与えないため問題文に置かなくてよい。`,
  'explicit no-solution-first-input rule',
);
fs.writeFileSync(guidelinePath, guideline);

console.log('P3-02 problem inputs and common exercise guideline updated.');
