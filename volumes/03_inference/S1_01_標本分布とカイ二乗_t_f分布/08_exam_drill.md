# 30分ドリル

- id: S1-DRILL-01
- level: C
- minutes: 30
- total: 100点
- calculation: high
- finishability: 25分でカイ二乗・t・Fの構成、30分で解釈まで完答可能

## 過去問傾向との対応

MATH-2023-Q2のカイ二乗分布、MATH-2018-Q1の標本分散、MATH-2014-Q3のt分布という技能を、一つの正規標本設定から第二標本へ広げる独自問題に再構成した。問題文・数値・設問順は転載しない。

## 問題

本問で使う生成表現は
$$
\chi^2_\nu=\sum_{j=1}^{\nu}Z_j^2,\qquad
t_\nu=\frac{Z}{\sqrt{Q/\nu}},\qquad
F_{\nu_1,\nu_2}=\frac{Q_1/\nu_1}{Q_2/\nu_2},
$$
ただし各右辺の標準正規変数・カイ二乗変数は互いに独立とする。台はカイ二乗・Fが正の実数、tが実数全体である。

近接して使う密度を再掲する。$N(\mu,\sigma^2)$（$\mu\in\mathbb R,\sigma^2>0$）の台は $\mathbb R$ で、
$$
f_N(x)=\frac1{\sigma\sqrt{2\pi}}\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}.
$$
$\nu,\nu_1,\nu_2\in\mathbb N$ とすると、
$$
f_{\chi^2_\nu}(q)=\frac{q^{\nu/2-1}e^{-q/2}}{2^{\nu/2}\Gamma(\nu/2)}\quad(q>0),
$$
$$
f_{t_\nu}(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2}\quad(t\in\mathbb R),
$$
$$
f_{F_{\nu_1,\nu_2}}(w)=
\frac{\Gamma((\nu_1+\nu_2)/2)}{\Gamma(\nu_1/2)\Gamma(\nu_2/2)}
\left(\frac{\nu_1}{\nu_2}\right)^{\nu_1/2}w^{\nu_1/2-1}
\left(1+\frac{\nu_1w}{\nu_2}\right)^{-(\nu_1+\nu_2)/2}\quad(w>0)
$$
であり、各台外では0である。

$X_1,\ldots,X_{10}\overset{\mathrm{i.i.d.}}{\sim}N(\mu,\sigma^2)$ とし、標本平均を $\overline X$、不偏標本分散を $S_X^2$ とする。独立に $Y_1,\ldots,Y_{16}\overset{\mathrm{i.i.d.}}{\sim}N(\mu_Y,\sigma_Y^2)$ を取り、不偏標本分散を $S_Y^2$ とする。

1. $\overline X$ の分布と、$Q_X=9S_X^2/\sigma^2$ の分布を求めよ。（20点）
2. $\overline X$ と $S_X^2$ が独立となる理由を説明せよ。（20点）
3. $T=\sqrt{10}(\overline X-\mu)/S_X$ の分布を導け。（20点）
4. $R=(S_X^2/\sigma^2)/(S_Y^2/\sigma_Y^2)$ の分布を導け。（20点）
5. $\sigma^2=\sigma_Y^2$、$s_X^2=24,s_Y^2=8$ とする。観測分散比を求め、上側5%点 $F_{9,15;0.05}=2.59$ と比較して上側5%領域に入るか判定せよ。逆比の分布も答えよ。（20点）

3で止まった場合は $Q_X\sim\chi^2_9$ と平均・分散の独立性を、4で止まった場合は
$$Q_Y=15S_Y^2/\sigma_Y^2\sim\chi^2_{15}$$
を使ってよい。

## 詳細解答

### 1. 平均と標本分散

正規変数の線形結合より
$$\overline X\sim N\left(\mu,\frac{\sigma^2}{10}\right).$$
また正規標本の残差平方和より
$$Q_X=\frac{9S_X^2}{\sigma^2}\sim\chi^2_9.$$
自由度は、10個の残差に残差和0という一つの制約があるため9である。

### 2. 独立性

標準化標本ベクトルを平均方向と残差方向へ直交射影する。$\overline X$ は平均方向だけ、$S_X^2$ は残差方向の長さだけの関数である。多変量正規分布では直交する射影成分は共分散0で独立なので、$\overline X$ と $S_X^2$ は独立である。

### 3. t分布

$$Z=\frac{\sqrt{10}(\overline X-\mu)}{\sigma}\sim N(0,1)$$
と $Q_X\sim\chi^2_9$ は独立である。従って
$$
\frac Z{\sqrt{Q_X/9}}
=\frac{\sqrt{10}(\overline X-\mu)}{S_X}
\sim t_9.
$$

### 4. F分布

第二標本について
$$Q_Y=\frac{15S_Y^2}{\sigma_Y^2}\sim\chi^2_{15}.$$
標本間の独立性から $Q_X,Q_Y$ は独立である。よって
$$R=\frac{Q_X/9}{Q_Y/15}\sim F_{9,15}.$$

### 5. 観測比と逆数

母分散が等しければ $R=S_X^2/S_Y^2$ なので、観測値は
$$r=\frac{24}{8}=3.$$
$3>2.59$ なので上側5%領域に入る。逆比は $1/3$ であり、分布は自由度も逆転して
$$\frac{S_Y^2}{S_X^2}\sim F_{15,9}.$$

## 完成形本番答案

$$
\overline X\sim N(\mu,\sigma^2/10),\qquad
Q_X=9S_X^2/\sigma^2\sim\chi^2_9.
$$
平均方向と残差方向は直交する正規成分なので $\overline X$ と $S_X^2$ は独立。従って
$$
\frac{\sqrt{10}(\overline X-\mu)}{S_X}
=\frac{N(0,1)}{\sqrt{\chi^2_9/9}}\sim t_9.
$$
また $Q_Y=15S_Y^2/\sigma_Y^2\sim\chi^2_{15}$ だから
$$
\frac{S_X^2/\sigma^2}{S_Y^2/\sigma_Y^2}
=\frac{Q_X/9}{Q_Y/15}\sim F_{9,15}.
$$
等分散で観測分散比は3で、$3>F_{9,15;0.05}=2.59$ より上側5%領域に入る。逆比は $1/3$ で $F_{15,9}$ に従う。

## 時間ゲート

- 3分: 正規標本、残差自由度9、独立な第二標本を同定する。
- 15分: $Q_X\sim\chi^2_9$ とt生成表現まで完成すれば継続する。
- 25分: $Q_Y$ を使ったF比と、観測比3と境界2.59の比較まで書く。止まった場合は救済式を用いて自由度だけでも残す。
- 30分: 等分散時の簡約、観測比、逆数で自由度が逆転することを確認する。
