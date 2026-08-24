# 推定分野 過去問型再構成演習 11位〜17位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧をもとに、推定分野の演習価値ランキング11位〜17位を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・設問順・数値・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 数式・結論は独立に再計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | 元難度 | 再構成Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|:---:|---:|---|
| 11 | 2018 問3 | 二項分布とモーメント法 | B | C | 25分 | 1次・2次モーメント、識別、連続写像、MLEとの一致 |
| 12 | 2019 問2 | 指数分布のパラメータ推定 | C | C | 25分 | 2母数指数分布、最小順序統計量、非正則MLE、不偏化 |
| 13 | 2022 問4 | Pareto分布のMLE | C | C | 25分 | 対数変換、指数分布への帰着、MLE、有限標本バイアス、漸近効率 |
| 14 | 2023 問1 | Poisson母数推定 | C | C | 20分 | 不偏性、一致性、MSE、Chebyshev、有限標本と漸近の区別 |
| 15 | 2017 問2 | 一様分布の不偏推定 | C | C | 20分 | 絶対値変換、最大順序統計量、不偏化、分散比較 |
| 16 | 2016 問2 | 指数分布の不偏推定 | C | C | 25分 | Gamma分布、十分統計量、非線形不偏推定、完備性、UMVU |
| 17 | 2018 問2 | 超幾何分布の推定量 | B | C | 20分 | 有限母集団、不偏推定、有限母集団補正、非復元抽出 |

---

## 11位: 2018 問3型 二項分布の1次・2次モーメントから2母数を推定する

- 安定ID: `RECON-EST-R11-2018-Q3`
- 参照: 2018年 問3
- 確度: `third_party_topic_index`
- 元主題: 二項分布、モーメント法
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: モーメント法、二項分布、標本平均、標本2次中心モーメント、連続写像定理、MLE
- 変更点: 既知試行回数の場合だけでなく、試行回数と成功確率を同時にモーメント法で復元する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim\operatorname{Bin}(m,p),
\qquad m\in\mathbb N,\quad 0<p<1
$$

に従うとする。標本平均と標本2次中心モーメントを

$$
\overline X=\frac1n\sum_{i=1}^nX_i,
\qquad
V_n=\frac1n\sum_{i=1}^n(X_i-\overline X)^2
$$

とする。

1. $E[X_i]$ と $\operatorname{Var}(X_i)$ を求めよ。
2. 母平均を $\mu$、母分散を $v$ と書き、$m,p$ を $\mu,v$ で表せ。
3. 前問を用いて、$m,p$ のモーメント推定量を構成せよ。
4. 真の母数が $m\ge1,0<p<1$ を満たすとき、モーメント推定量が一致推定量になることを説明せよ。
5. $m$ が既知の場合、$p$ のモーメント推定量を求め、MLEと一致することを示せ。またその推定量が不偏かつCramér–Rao下限を達成することを示せ。

### 解答

#### 1. 平均と分散

二項分布の基本公式より

$$
\boxed{E[X_i]=mp},
\qquad
\boxed{\operatorname{Var}(X_i)=mp(1-p)}.
$$

#### 2. $m,p$ をモーメントから解く

$$
\mu=mp,
\qquad
v=mp(1-p)=\mu(1-p).
$$

したがって

$$
p=1-\frac v\mu.
$$

さらに

$$
\mu-v
=mp-mp(1-p)
=mp^2.
$$

よって

$$
\frac{\mu^2}{\mu-v}
=\frac{m^2p^2}{mp^2}
=m.
$$

したがって

$$
\boxed{
p=1-\frac v\mu
},
\qquad
\boxed{
m=\frac{\mu^2}{\mu-v}
}.
$$

この式から、二項分布では平均だけでは $m,p$ を分離できないが、分散まで使えば2母数を識別できることが分かる。

#### 3. モーメント推定量

母平均 $\mu$ を $\overline X$、母分散 $v$ を $V_n$ で置き換える。

したがって形式的なモーメント推定量は

$$
\boxed{
\widehat p_{\mathrm{MM}}
=1-\frac{V_n}{\overline X}
}
$$

および

$$
\boxed{
\widehat m_{\mathrm{MM}}
=\frac{\overline X^2}{\overline X-V_n}
}.
$$

ただし有限標本では $\overline X=0$ や $V_n\ge\overline X$ が起こり得て、その場合には上式が母数空間から外れる。

また $m$ は整数なので、実際には $\widehat m_{\mathrm{MM}}$ に最も近い正整数を候補とするなどの処理が必要である。

これはモーメント法の重要な注意点である。

$$
\boxed{
\text{モーメント推定量は有限標本で母数空間を外れることがある}
}
$$

#### 4. 一致性

大数の法則より

$$
\overline X\xrightarrow{p}\mu=mp.
$$

また

$$
V_n\xrightarrow{p}v=mp(1-p).
$$

真の母数では

$$
\mu>0,
\qquad
\mu-v=mp^2>0.
$$

したがって、分母が0にならない点で連続写像定理を使えば

$$
\widehat p_{\mathrm{MM}}
=1-\frac{V_n}{\overline X}
\xrightarrow{p}
1-\frac v\mu
=p,
$$

$$
\widehat m_{\mathrm{MM}}
=\frac{\overline X^2}{\overline X-V_n}
\xrightarrow{p}
\frac{\mu^2}{\mu-v}
=m.
$$

よって

$$
\boxed{
\widehat p_{\mathrm{MM}}\xrightarrow{p}p,
\qquad
\widehat m_{\mathrm{MM}}\xrightarrow{p}m
}.
$$

#### 5. $m$ 既知の場合

1次モーメント

$$
E[X_i]=mp
$$

だけを用いれば

$$
\boxed{
\widehat p_{\mathrm{MM}}=\frac{\overline X}{m}
}.
$$

一方、尤度は

$$
L(p)
\propto
p^{\sum X_i}(1-p)^{nm-\sum X_i}.
$$

対数尤度を微分して0とおけば

$$
\widehat p_{\mathrm{ML}}
=\frac{\sum X_i}{nm}
=\frac{\overline X}{m}.
$$

したがって

$$
\boxed{
\widehat p_{\mathrm{MM}}
=\widehat p_{\mathrm{ML}}
}.
$$

期待値は

$$
E\left[\frac{\overline X}{m}\right]
=\frac{mp}{m}=p
$$

なので不偏。

分散は

$$
\operatorname{Var}\left(\frac{\overline X}{m}\right)
=\frac1{m^2}\frac{mp(1-p)}n
=\frac{p(1-p)}{nm}.
$$

1標本のFisher情報量は

$$
I_1(p)=\frac{m}{p(1-p)}
$$

だから

$$
I_n(p)=\frac{nm}{p(1-p)}.
$$

Cramér–Rao下限は

$$
\frac1{I_n(p)}
=\frac{p(1-p)}{nm}.
$$

推定量の分散と一致するため

$$
\boxed{
\frac{\overline X}{m}
\text{ は不偏かつ効率的}
}.
$$

### 本番答案

$$
\mu=mp,
\qquad
v=mp(1-p)=\mu(1-p)
$$

より

$$
p=1-\frac v\mu,
\qquad
m=\frac{\mu^2}{\mu-v}.
$$

したがって

$$
\widehat p_{\mathrm{MM}}
=1-\frac{V_n}{\overline X},
\qquad
\widehat m_{\mathrm{MM}}
=\frac{\overline X^2}{\overline X-V_n}.
$$

大数の法則と連続写像定理より両者は一致推定量。$m$ が既知なら

$$
\widehat p=\frac{\overline X}{m}
$$

で、これはMLEとも一致し、分散 $p(1-p)/(nm)$ はCramér–Rao下限に等しい。

### 25分経過時の打ち切り判断

最重要は $\mu=mp,v=mp(1-p)$ から $p,m$ を代数的に解く部分。有限標本で母数空間を外れる注意まで書ければ十分。

### 採点基準（20点目安）

- 母平均・母分散: 3点
- $m,p$ の逆算: 5点
- モーメント推定量: 4点
- 一致性: 4点
- $m$ 既知でMLE・CR下限との比較: 4点

### 持ち帰るパターン

- モーメント法は「母モーメントを標本モーメントで置換して連立方程式を解く」。
- 2母数なら通常2本のモーメント条件が必要。
- 一致性は大数の法則と連続写像定理で処理しやすい。
- モーメント推定量は有限標本で母数空間外へ飛び出すことがある。

---

## 12位: 2019 問2型 位置母数付き指数分布の2母数MLEを求める

- 安定ID: `RECON-EST-R12-2019-Q2`
- 参照: 2019年 問2
- 確度: `third_party_topic_index`
- 元主題: 指数分布、パラメータ推定
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 位置母数付き指数分布、最小順序統計量、台依存尤度、MLE、指数分布の最小値、memoryless性、不偏化
- 変更点: 率母数だけの定型MLEではなく、位置母数と率母数を同時推定する非正則モデルに拡張した。

### 問題

$n\ge3$ とし、$X_1,\ldots,X_n$ は独立に

$$
f(x\mid\mu,\lambda)
=\lambda e^{-\lambda(x-\mu)}
\mathbf1(x\ge\mu),
\qquad \mu\in\mathbb R,\ \lambda>0
$$

に従うとする。$X_{(1)}=\min_iX_i$ とする。

1. 尤度関数を書き、$\mu$ のMLEを求めよ。
2. $\mu$ のMLEを代入して $\lambda$ のMLEを求めよ。
3. $X_{(1)}$ の分布と期待値を求めよ。
4. $\mu$ の不偏推定量を $X_{(1)}$ と $\overline X$ の線形結合として構成せよ。
5. 

$$
T=\sum_{i=1}^n(X_i-X_{(1)})
$$

について

$$
T\sim\operatorname{Gamma}(n-1,\lambda)
$$

（shape $n-1$、rate $\lambda$）を用いてよい。$\widehat\lambda_{\mathrm{ML}}$ のバイアスを求め、$\lambda$ の不偏推定量を構成せよ。
6. このモデルが通常の正則モデルと異なる点を述べよ。

### 解答

#### 1. $\mu$ のMLE

観測値を $x_1,\ldots,x_n$ とする。尤度は

$$
\begin{aligned}
L(\mu,\lambda)
&=\prod_{i=1}^n
\lambda e^{-\lambda(x_i-\mu)}
\mathbf1(x_i\ge\mu)\\
&=\lambda^n
\exp\left[-\lambda\sum_{i=1}^n(x_i-\mu)\right]
\mathbf1(\mu\le x_{(1)}).
\end{aligned}
$$

固定した $\lambda$ に対し、許される範囲 $\mu\le x_{(1)}$ では

$$
L(\mu,\lambda)
\propto e^{n\lambda\mu}
$$

なので $\mu$ が大きいほど尤度が大きい。

したがって境界

$$
\boxed{
\widehat\mu_{\mathrm{ML}}=X_{(1)}
}
$$

で最大になる。

ここでは「対数尤度を微分して0」が本質ではない。台の条件がMLEを決める。

#### 2. $\lambda$ のMLE

$\widehat\mu=X_{(1)}$ を代入すると

$$
L(\lambda)
\propto
\lambda^n e^{-\lambda T},
\qquad
T=\sum_{i=1}^n(X_i-X_{(1)}).
$$

対数尤度は

$$
\ell(\lambda)=n\log\lambda-\lambda T+\text{const.}
$$

したがって

$$
\ell'(\lambda)=\frac n\lambda-T.
$$

よって

$$
\boxed{
\widehat\lambda_{\mathrm{ML}}
=\frac nT
=\frac{n}{\sum_{i=1}^n(X_i-X_{(1)})}
}.
$$

#### 3. 最小値の分布

$Y_i=X_i-\mu$ とすれば

$$
Y_i\sim\operatorname{Exp}(\lambda).
$$

独立な指数変数の最小値は率の和を持つ指数分布だから

$$
X_{(1)}-\mu
\sim\operatorname{Exp}(n\lambda).
$$

したがって

$$
\boxed{
P(X_{(1)}>x)
=e^{-n\lambda(x-\mu)},
\qquad x\ge\mu
}
$$

であり

$$
\boxed{
E[X_{(1)}]
=\mu+\frac1{n\lambda}
}.
$$

#### 4. $\mu$ の不偏推定量

一方

$$
E[\overline X]
=\mu+\frac1\lambda.
$$

$X_{(1)}$ と $\overline X$ の線形結合

$$
aX_{(1)}+b\overline X
$$

で $\mu$ の係数を1、$1/\lambda$ の係数を0にしたい。

$$
a+b=1,
\qquad
\frac an+b=0.
$$

これを解くと

$$
a=\frac n{n-1},
\qquad
b=-\frac1{n-1}.
$$

したがって

$$
\boxed{
\widetilde\mu
=\frac{nX_{(1)}-\overline X}{n-1}
}
$$

は不偏である。

実際

$$
\begin{aligned}
E[\widetilde\mu]
&=\frac{n(\mu+1/(n\lambda))-(\mu+1/\lambda)}{n-1}\\
&=\mu.
\end{aligned}
$$

#### 5. $\lambda$ のMLEのバイアスと不偏化

$T\sim\operatorname{Gamma}(n-1,\lambda)$ である。

shape $k$、rate $\lambda$ のGamma分布では $k>1$ のとき

$$
E[T^{-1}]=\frac\lambda{k-1}.
$$

ここで $k=n-1$ なので

$$
E[T^{-1}]=\frac\lambda{n-2}.
$$

したがって

$$
\begin{aligned}
E[\widehat\lambda_{\mathrm{ML}}]
&=nE[T^{-1}]\\
&=\frac n{n-2}\lambda.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Bias}(\widehat\lambda_{\mathrm{ML}})
=\frac{2\lambda}{n-2}
}.
$$

一方

$$
\widetilde\lambda
=\frac{n-2}{T}
$$

とおけば

$$
E[\widetilde\lambda]
=(n-2)\frac\lambda{n-2}
=\lambda.
$$

したがって

$$
\boxed{
\widetilde\lambda
=\frac{n-2}{\sum_{i=1}^n(X_i-X_{(1)})}
}
$$

は不偏推定量。

#### 6. 非正則性

密度の台は

$$
x\ge\mu
$$

であり、位置母数 $\mu$ に依存する。

そのため通常の正則モデルで使う「台が母数によらない」という条件が破れている。

$$
\boxed{
\text{台が }\mu\text{ に依存する非正則モデルである}
}
$$

これが $\widehat\mu=X_{(1)}$ という境界型MLEを生む理由である。

### 本番答案

$$
L(\mu,\lambda)
=\lambda^n
\exp\left[-\lambda\sum(x_i-\mu)\right]
\mathbf1(\mu\le x_{(1)}).
$$

固定した $\lambda$ では $\mu$ に単調増加なので

$$
\widehat\mu=X_{(1)}.
$$

これを代入すると

$$
\widehat\lambda
=\frac n{\sum(X_i-X_{(1)})}.
$$

また

$$
X_{(1)}-\mu\sim\operatorname{Exp}(n\lambda)
$$

より $E[X_{(1)}]=\mu+1/(n\lambda)$。$E[\overline X]=\mu+1/\lambda$ と合わせて

$$
\widetilde\mu
=\frac{nX_{(1)}-\overline X}{n-1}
$$

が不偏。さらに $T=\sum(X_i-X_{(1)})\sim\operatorname{Gamma}(n-1,\lambda)$ より

$$
\widetilde\lambda=\frac{n-2}{T}
$$

が不偏。

### 25分経過時の打ち切り判断

最優先は $\widehat\mu=X_{(1)}$ の理由を「台の制約＋単調性」で説明すること。$\lambda$ の不偏化はGamma逆モーメントの代入だけなので後半の部分点を取りやすい。

### 採点基準（20点目安）

- 尤度と $\mu$ の境界MLE: 5点
- $\lambda$ のMLE: 4点
- 最小値の分布: 3点
- $\mu$ の不偏化: 4点
- $\lambda$ のバイアス・不偏化: 3点
- 非正則性: 1点

### 持ち帰るパターン

- 位置母数付き指数分布では最小値が位置母数を支配する。
- 台が母数に依存する場合、MLEは境界で決まりやすい。
- 指数分布の最小値は再び指数分布。
- 不偏化は複数推定量の期待値を連立して線形結合を作る方法も有効。

---

## 13位: 2022 問4型 Pareto分布を対数変換してMLEを解析する

- 安定ID: `RECON-EST-R13-2022-Q4`
- 参照: 2022年 問4
- 確度: `third_party_topic_index`
- 元主題: Pareto分布、MLE
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: Pareto分布、対数変換、指数分布、MLE、Gamma分布、有限標本バイアス、Fisher情報量、漸近効率
- 変更点: MLE導出だけでなく、対数変換による指数分布への帰着と不偏化・漸近効率まで接続した。

### 問題

既知の $x_m>0$ に対し、$X_1,\ldots,X_n$ は独立にPareto分布

$$
f(x\mid\alpha)
=\alpha x_m^\alpha x^{-(\alpha+1)},
\qquad x\ge x_m,\quad \alpha>0
$$

に従うとする。$n\ge3$ とする。

1. 

$$
Y_i=\log\frac{X_i}{x_m}
$$

の分布を求めよ。
2. $\alpha$ のMLEを求めよ。
3. $S=\sum_{i=1}^nY_i$ の分布を用いて、MLEの期待値とバイアスを求めよ。
4. $\alpha$ の不偏推定量を構成し、その分散を求めよ。
5. 1標本当たりのFisher情報量を求め、MLEの漸近分布を求めよ。
6. 不偏推定量の分散とCramér–Rao下限の比が1に収束することを示せ。

### 解答

#### 1. 対数変換

$y\ge0$ に対し

$$
\begin{aligned}
P(Y_i>y)
&=P\left(X_i>x_me^y\right).
\end{aligned}
$$

Pareto分布の上側確率は

$$
P(X_i>x)=\left(\frac{x_m}{x}\right)^\alpha
$$

だから

$$
P(Y_i>y)
=e^{-\alpha y}.
$$

したがって

$$
\boxed{
Y_i\sim\operatorname{Exp}(\alpha)
}
$$

である。ここで $\alpha$ は率母数。

この変換がPareto推定の核心である。

#### 2. MLE

対数尤度は

$$
\begin{aligned}
\ell(\alpha)
&=n\log\alpha+n\alpha\log x_m
-(\alpha+1)\sum_{i=1}^n\log X_i\\
&=n\log\alpha
-\alpha\sum_{i=1}^n\log\frac{X_i}{x_m}
-\sum_{i=1}^n\log X_i.
\end{aligned}
$$

$S=\sum Y_i$ とおけば

$$
\ell'(\alpha)=\frac n\alpha-S.
$$

したがって

$$
\boxed{
\widehat\alpha_{\mathrm{ML}}
=\frac n{\sum_{i=1}^n\log(X_i/x_m)}
=\frac nS
}.
$$

#### 3. 有限標本バイアス

$Y_i\sim\operatorname{Exp}(\alpha)$ なので

$$
S\sim\operatorname{Gamma}(n,\alpha)
$$

（shape $n$、rate $\alpha$）。

Gamma逆モーメントより

$$
E[S^{-1}]=\frac\alpha{n-1}.
$$

したがって

$$
E[\widehat\alpha_{\mathrm{ML}}]
=n\frac\alpha{n-1}
=\frac n{n-1}\alpha.
$$

よって

$$
\boxed{
\operatorname{Bias}(\widehat\alpha_{\mathrm{ML}})
=\frac\alpha{n-1}
}.
$$

MLEは上方バイアスを持つ。

#### 4. 不偏推定量と分散

$$
\widetilde\alpha
=\frac{n-1}{S}
$$

とおけば

$$
E[\widetilde\alpha]
=(n-1)\frac\alpha{n-1}
=\alpha.
$$

したがって

$$
\boxed{
\widetilde\alpha
=\frac{n-1}{\sum\log(X_i/x_m)}
}
$$

は不偏。

$n>2$ では

$$
E[S^{-2}]
=\frac{\alpha^2}{(n-1)(n-2)}.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\widetilde\alpha)
&=(n-1)^2E[S^{-2}]-\alpha^2\\
&=(n-1)^2
\frac{\alpha^2}{(n-1)(n-2)}-\alpha^2\\
&=\frac{\alpha^2}{n-2}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widetilde\alpha)
=\frac{\alpha^2}{n-2}
}.
$$

#### 5. Fisher情報量とMLEの漸近分布

1標本の対数密度で $\alpha$ に依存する部分は

$$
\ell_1(\alpha)
=\log\alpha+\alpha\log x_m-(\alpha+1)\log X.
$$

2階微分は

$$
\ell_1''(\alpha)
=-\frac1{\alpha^2}.
$$

したがって

$$
\boxed{
I_1(\alpha)=\frac1{\alpha^2}
},
\qquad
I_n(\alpha)=\frac n{\alpha^2}.
$$

正則MLEの漸近正規性より

$$
\boxed{
\sqrt n
(\widehat\alpha_{\mathrm{ML}}-\alpha)
\xrightarrow{d}
N(0,\alpha^2)
}.
$$

つまり

$$
\widehat\alpha_{\mathrm{ML}}
\approx N\left(\alpha,\frac{\alpha^2}{n}\right).
$$

#### 6. 漸近効率

Cramér–Rao下限は

$$
I_n(\alpha)^{-1}
=\frac{\alpha^2}{n}.
$$

不偏推定量の分散との比は

$$
\frac{\alpha^2/(n-2)}{\alpha^2/n}
=\frac n{n-2}	o1.
$$

したがって

$$
\boxed{
\widetilde\alpha
\text{ も漸近効率的}
}.
$$

### 本番答案

$$
Y_i=\log(X_i/x_m)
$$

とおくと

$$
P(Y_i>y)=e^{-\alpha y}
$$

より $Y_i\sim\operatorname{Exp}(\alpha)$。したがって

$$
\widehat\alpha_{\mathrm{ML}}
=\frac n{\sum Y_i}.
$$

$S=\sum Y_i\sim\operatorname{Gamma}(n,\alpha)$ より

$$
E[\widehat\alpha_{\mathrm{ML}}]
=\frac n{n-1}\alpha,
$$

したがって

$$
\widetilde\alpha=\frac{n-1}{S}
$$

は不偏で

$$
V(\widetilde\alpha)=\frac{\alpha^2}{n-2}.
$$

また $I_n(\alpha)=n/\alpha^2$ なので、分散比 $n/(n-2)\to1$ より漸近効率的。

### 25分経過時の打ち切り判断

対数変換で指数分布に落とせた時点で勝ち筋が見える。Gamma逆モーメントが重ければ、MLE導出とFisher情報量を優先する。

### 採点基準（20点目安）

- 対数変換: 4点
- MLE: 4点
- バイアス: 3点
- 不偏化と分散: 4点
- Fisher情報量・漸近分布: 3点
- 漸近効率: 2点

### 持ち帰るパターン

- Paretoの対数超過量は指数分布。
- 重尾分布でも変換により既知の分布へ帰着できることがある。
- $n/S$ 型MLEは有限標本で上方バイアスを持ちやすい。
- 「変換→Gamma和→逆モーメント」は推定問題の強力な定石。

---

## 14位: 2023 問1型 Poisson母数推定で不偏性と一致性を区別する

- 安定ID: `RECON-EST-R14-2023-Q1`
- 参照: 2023年 問1
- 確度: `third_party_topic_index`
- 元主題: Poisson母数推定、不偏性・一致性
- Level: C
- 目安時間: 20分
- 計算量: 小〜中
- 主な使用技術: Poisson分布、不偏性、分散、MSE、Chebyshevの不等式、一致性、MLE
- 変更点: 「不偏なら一致」という誤解を壊すため、複数推定量を並べて有限標本性質と漸近性質を比較する構成にした。

### 問題

$X_1,X_2,\ldots$ は独立に

$$
X_i\sim\operatorname{Poisson}(\lambda),
\qquad \lambda>0
$$

に従うとする。$S_n=\sum_{i=1}^nX_i$ とする。

次の3つの推定量を考える。

$$
T_{1,n}=X_1,
\qquad
T_{2,n}=\frac{S_n}{n},
\qquad
T_{3,n}=\frac{S_n+1}{n+1}.
$$

1. それぞれの期待値とバイアスを求めよ。
2. それぞれの分散とMSEを求めよ。
3. $T_{1,n}$ が不偏であるにもかかわらず一致推定量ではないことを示せ。
4. $T_{2,n}$ が一致推定量であることをChebyshevの不等式から示せ。
5. $T_{3,n}$ は不偏ではないが一致推定量であることを示せ。
6. $\lambda$ のMLEを求め、上記のどれに一致するか答えよ。

### 解答

#### 1. 期待値とバイアス

Poisson分布では

$$
E[X_i]=\lambda,
\qquad
\operatorname{Var}(X_i)=\lambda.
$$

まず

$$
E[T_{1,n}]=E[X_1]=\lambda.
$$

したがって

$$
\boxed{\operatorname{Bias}(T_{1,n})=0}.
$$

次に

$$
E[T_{2,n}]
=\frac1nE[S_n]
=\frac{n\lambda}{n}
=\lambda.
$$

よって

$$
\boxed{\operatorname{Bias}(T_{2,n})=0}.
$$

最後に

$$
E[T_{3,n}]
=\frac{n\lambda+1}{n+1}.
$$

したがって

$$
\begin{aligned}
\operatorname{Bias}(T_{3,n})
&=\frac{n\lambda+1}{n+1}-\lambda\\
&=\frac{1-\lambda}{n+1}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Bias}(T_{3,n})
=\frac{1-\lambda}{n+1}
}.
$$

#### 2. 分散とMSE

$T_{1,n}=X_1$ なので

$$
\boxed{
\operatorname{Var}(T_{1,n})=\lambda
},
$$

不偏だから

$$
\boxed{
\operatorname{MSE}(T_{1,n})=\lambda
}.
$$

$S_n\sim\operatorname{Poisson}(n\lambda)$ だから

$$
\operatorname{Var}(T_{2,n})
=\frac{n\lambda}{n^2}
=\frac\lambda n.
$$

よって

$$
\boxed{
\operatorname{MSE}(T_{2,n})=\frac\lambda n
}.
$$

$T_{3,n}$ について

$$
\operatorname{Var}(T_{3,n})
=\frac{n\lambda}{(n+1)^2}.
$$

MSEは

$$
\begin{aligned}
\operatorname{MSE}(T_{3,n})
&=\operatorname{Var}(T_{3,n})
+\operatorname{Bias}(T_{3,n})^2\\
&=\frac{n\lambda}{(n+1)^2}
+\frac{(1-\lambda)^2}{(n+1)^2}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{MSE}(T_{3,n})
=\frac{n\lambda+(1-\lambda)^2}{(n+1)^2}
}.
$$

#### 3. 不偏だが一致しない推定量

$T_{1,n}=X_1$ は $n$ が増えても同じ1個の観測値しか使わない。

分散は常に

$$
\operatorname{Var}(T_{1,n})=\lambda
$$

で0へ行かない。

より直接には、例えば $0<\varepsilon<1/2$ を取ると $X_1$ は整数値だから、一般の $\lambda$ に対して

$$
P(|X_1-\lambda|>\varepsilon)
$$

は $n$ に依存せず、通常0ではない。

したがって

$$
\boxed{
T_{1,n}\not\xrightarrow{p}\lambda
}.
$$

つまり

$$
\boxed{
\text{不偏性だけでは一致性は保証されない}
}.
$$

#### 4. $T_{2,n}$ の一致性

Chebyshevの不等式より、任意の $\varepsilon>0$ に対して

$$
\begin{aligned}
P(|T_{2,n}-\lambda|\ge\varepsilon)
&\le
\frac{\operatorname{Var}(T_{2,n})}{\varepsilon^2}\\
&=\frac{\lambda}{n\varepsilon^2}\\
&\to0.
\end{aligned}
$$

したがって

$$
\boxed{
T_{2,n}\xrightarrow{p}\lambda
}.
$$

#### 5. バイアスありだが一致する推定量

$$
T_{3,n}
=\frac{n}{n+1}\frac{S_n}{n}
+\frac1{n+1}.
$$

$T_{2,n}=S_n/n\xrightarrow{p}\lambda$ であり

$$
\frac n{n+1}\to1,
\qquad
\frac1{n+1}\to0.
$$

したがってSlutskyの定理より

$$
\boxed{
T_{3,n}\xrightarrow{p}\lambda
}.
$$

またバイアス自体も

$$
\frac{1-\lambda}{n+1}\to0.
$$

したがって

$$
\boxed{
\text{有限標本で不偏でなくても一致推定量にはなり得る}
}.
$$

#### 6. MLE

尤度は

$$
L(\lambda)
\propto e^{-n\lambda}\lambda^{S_n}.
$$

対数尤度は

$$
\ell(\lambda)
=-n\lambda+S_n\log\lambda+\text{const.}
$$

微分して

$$
-n+\frac{S_n}{\lambda}=0
$$

より

$$
\boxed{
\widehat\lambda_{\mathrm{ML}}
=\frac{S_n}{n}=T_{2,n}
}.
$$

### 本番答案

$T_{1,n}=X_1$ は $E[T_{1,n}]=\lambda$ で不偏だが、分散が常に $\lambda$ で標本サイズを増やしても情報量が増えないため一致しない。

一方

$$
T_{2,n}=\overline X,
\qquad
V(T_{2,n})=\frac\lambda n
$$

なのでChebyshevより一致。

また

$$
T_{3,n}=\frac n{n+1}T_{2,n}+\frac1{n+1}
$$

より $T_{3,n}\xrightarrow{p}\lambda$ だが、有限標本バイアスは $(1-\lambda)/(n+1)$。

MLEは $T_{2,n}$。

### 25分経過時の打ち切り判断

この題は計算より概念。`不偏性＝各nでの期待値の性質`、`一致性＝n→∞での確率収束` と言葉で明確に分けることを優先する。

### 採点基準（20点目安）

- 期待値・バイアス: 4点
- 分散・MSE: 4点
- 不偏だが非一致の説明: 4点
- Chebyshevによる一致性: 4点
- バイアスあり一致性: 2点
- MLE: 2点

### 持ち帰るパターン

- 不偏性は有限標本の期待値の性質。
- 一致性は推定量列の漸近的性質。
- 不偏でも一致しない推定量はある。
- バイアスがあっても、それが消え分散も消えれば一致し得る。

---

## 15位: 2017 問2型 対称一様分布の最大絶対値から不偏推定量を作る

- 安定ID: `RECON-EST-R15-2017-Q2`
- 参照: 2017年 問2
- 確度: `third_party_topic_index`
- 元主題: 一様分布、不偏推定
- Level: C
- 目安時間: 20分
- 計算量: 中
- 主な使用技術: 一様分布、絶対値変換、最大順序統計量、不偏化、分散比較
- 変更点: $U(0,\theta)$ の定番をそのまま繰り返さず、$U(-\theta,\theta)$ から絶対値変換で帰着する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim U(-\theta,\theta),
\qquad \theta>0
$$

に従うとする。$Y_i=|X_i|$、

$$
M=\max_{1\le i\le n}|X_i|
$$

とする。

1. $Y_i$ の分布を求めよ。
2. $M$ の累積分布関数と密度を求めよ。
3. $E[M]$ を求め、$M$ の定数倍として $\theta$ の不偏推定量を構成せよ。
4. その不偏推定量の分散を求めよ。
5. 

$$
T=2\overline{|X|}
=\frac2n\sum_{i=1}^n|X_i|
$$

も $\theta$ の不偏推定量であることを示し、$M$ から作った不偏推定量と分散を比較せよ。

### 解答

#### 1. 絶対値の分布

$0\le y\le\theta$ に対し

$$
\begin{aligned}
P(Y_i\le y)
&=P(|X_i|\le y)\\
&=P(-y\le X_i\le y)\\
&=\frac{2y}{2\theta}\\
&=\frac y\theta.
\end{aligned}
$$

したがって

$$
\boxed{
Y_i=|X_i|\sim U(0,\theta)
}.
$$

対称一様分布は絶対値を取ると標準的な $U(0,\theta)$ 型へ帰着する。

#### 2. 最大絶対値の分布

$0\le m\le\theta$ では

$$
\begin{aligned}
P(M\le m)
&=P(Y_1\le m,\ldots,Y_n\le m)\\
&=\left(\frac m\theta\right)^n.
\end{aligned}
$$

したがって

$$
\boxed{
F_M(m)=\left(\frac m\theta\right)^n,
\qquad 0\le m\le\theta
}.
$$

微分して

$$
\boxed{
f_M(m)=\frac{n m^{n-1}}{\theta^n},
\qquad 0<m<\theta
}.
$$

#### 3. 不偏化

$$
\begin{aligned}
E[M]
&=\int_0^\theta
m\frac{n m^{n-1}}{\theta^n}\,dm\\
&=\frac n{n+1}\theta.
\end{aligned}
$$

したがって

$$
\boxed{
\widehat\theta_M
=\frac{n+1}{n}M
}
$$

とおけば

$$
E[\widehat\theta_M]=\theta.
$$

#### 4. 分散

$$
E[M^2]
=\int_0^\theta
m^2\frac{n m^{n-1}}{\theta^n}\,dm
=\frac n{n+2}\theta^2.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(M)
&=\frac n{n+2}\theta^2
-\left(\frac n{n+1}\theta\right)^2\\
&=\frac{n\theta^2}{(n+2)(n+1)^2}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(\widehat\theta_M)
&=\left(\frac{n+1}{n}\right)^2\operatorname{Var}(M)\\
&=\frac{\theta^2}{n(n+2)}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat\theta_M)
=\frac{\theta^2}{n(n+2)}
}.
$$

#### 5. 平均絶対値型との比較

$Y_i=|X_i|\sim U(0,\theta)$ なので

$$
E[Y_i]=\frac\theta2,
\qquad
\operatorname{Var}(Y_i)=\frac{\theta^2}{12}.
$$

したがって

$$
E[T]
=2E[\overline Y]
=\theta.
$$

よって $T$ は不偏。

分散は

$$
\begin{aligned}
\operatorname{Var}(T)
&=4\operatorname{Var}(\overline Y)\\
&=4\frac{\theta^2}{12n}\\
&=\frac{\theta^2}{3n}.
\end{aligned}
$$

一方

$$
\operatorname{Var}(\widehat\theta_M)
=\frac{\theta^2}{n(n+2)}.
$$

$n>1$ なら $n+2>3$ なので

$$
\boxed{
\operatorname{Var}(\widehat\theta_M)
<\operatorname{Var}(T)
}.
$$

最大絶対値は分布の境界 $\theta$ に直接近づくため、平均絶対値より高精度になる。

### 本番答案

$Y_i=|X_i|$ とおくと

$$
P(Y_i\le y)=y/\theta
$$

より $Y_i\sim U(0,\theta)$。したがって

$$
F_M(m)=\left(\frac m\theta\right)^n,
\qquad
f_M(m)=\frac{nm^{n-1}}{\theta^n}.
$$

$$
E[M]=\frac n{n+1}\theta
$$

より

$$
\widehat\theta_M=\frac{n+1}{n}M
$$

は不偏で

$$
V(\widehat\theta_M)=\frac{\theta^2}{n(n+2)}.
$$

一方 $2\overline{|X|}$ の分散は $\theta^2/(3n)$ なので $n>1$ では最大値型の方が小さい。

### 25分経過時の打ち切り判断

最初に $|X|\sim U(0,\theta)$ と見抜ければ、以降は最大順序統計量の定番。分散比較は最後に回してよい。

### 採点基準（20点目安）

- 絶対値変換: 4点
- 最大値の分布: 4点
- 不偏化: 4点
- 分散: 4点
- 平均絶対値型との比較: 4点

### 持ち帰るパターン

- 対称分布では絶対値変換で問題が単純化することがある。
- $U(0,\theta)$ の最大値は境界母数推定の定番。
- 境界を直接見る最大値型は、平均型より $O(n^{-2})$ の分散を持つことがある。

---

## 16位: 2016 問2型 指数分布で $\theta^2$ の不偏推定量を作る

- 安定ID: `RECON-EST-R16-2016-Q2`
- 参照: 2016年 問2
- 確度: `third_party_topic_index`
- 元主題: 指数分布、不偏推定
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 指数分布、Gamma分布、十分統計量、非線形関数の不偏推定、完備性、Lehmann–Scheffe、UMVU
- 変更点: 母数そのものではなく $\theta^2$ を推定対象とし、単純な不偏化からUMVUまで接続した。

### 問題

$X_1,\ldots,X_n$ は独立に平均母数 $\theta>0$ の指数分布

$$
f(x\mid\theta)
=\frac1\theta e^{-x/\theta},
\qquad x\ge0
$$

に従うとする。$S=\sum_{i=1}^nX_i$ とする。

1. $S$ の分布を答え、$E[S]$、$E[S^2]$ を求めよ。
2. $\theta^2$ の不偏推定量を $S^2$ の定数倍として構成せよ。
3. 単純なプラグイン推定量 $\overline X^2$ の期待値を求め、そのバイアスを求めよ。
4. 前問2の不偏推定量の分散を求めよ。必要なら

$$
E[S^4]
=\theta^4n(n+1)(n+2)(n+3)
$$

を用いてよい。
5. $S$ が $\theta$ の十分統計量であることを示せ。
6. Laplace変換の一意性を用いてよいとして、$S$ が完備であることを示し、前問2の推定量が $\theta^2$ のUMVU推定量であることを述べよ。

### 解答

#### 1. $S$ の分布とモーメント

平均母数 $\theta$ の指数分布はGamma分布の shape $1$、scale $\theta$ とみなせる。

独立和より

$$
\boxed{
S\sim\operatorname{Gamma}(n,\text{scale }\theta)
}.
$$

Gamma分布のモーメントより

$$
\boxed{E[S]=n\theta}.
$$

また

$$
\operatorname{Var}(S)=n\theta^2
$$

だから

$$
\begin{aligned}
E[S^2]
&=\operatorname{Var}(S)+E[S]^2\\
&=n\theta^2+n^2\theta^2\\
&=n(n+1)\theta^2.
\end{aligned}
$$

したがって

$$
\boxed{
E[S^2]=n(n+1)\theta^2
}.
$$

#### 2. $\theta^2$ の不偏推定量

前問より

$$
E[S^2]=n(n+1)\theta^2.
$$

したがって

$$
\boxed{
U=\frac{S^2}{n(n+1)}
}
$$

とおけば

$$
E[U]=\theta^2.
$$

#### 3. $\overline X^2$ のバイアス

$$
\overline X=\frac Sn
$$

なので

$$
E[\overline X^2]
=\frac1{n^2}E[S^2]
=\frac{n(n+1)}{n^2}\theta^2
=\left(1+\frac1n\right)\theta^2.
$$

よって

$$
\boxed{
\operatorname{Bias}(\overline X^2)
=\frac{\theta^2}{n}
}.
$$

つまり「不偏推定量を非線形変換すれば不偏のまま」というわけではない。

$$
E[\overline X]=\theta
$$

でも

$$
E[\overline X^2]\ne\theta^2.
$$

#### 4. 不偏推定量の分散

$$
U=\frac{S^2}{n(n+1)}.
$$

したがって

$$
E[U^2]
=\frac{E[S^4]}{n^2(n+1)^2}.
$$

与えられた4次モーメントを用いると

$$
\begin{aligned}
E[U^2]
&=\frac{\theta^4n(n+1)(n+2)(n+3)}{n^2(n+1)^2}\\
&=\theta^4\frac{(n+2)(n+3)}{n(n+1)}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(U)
&=E[U^2]-\theta^4\\
&=\theta^4
\left[
\frac{(n+2)(n+3)}{n(n+1)}-1
\right]\\
&=\theta^4
\frac{4n+6}{n(n+1)}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(U)
=\frac{2(2n+3)}{n(n+1)}\theta^4
}.
$$

#### 5. 十分性

同時密度は

$$
\begin{aligned}
f_\theta(x_1,\ldots,x_n)
&=\theta^{-n}
\exp\left(-\frac1\theta\sum_{i=1}^nx_i\right)
\prod_{i=1}^n\mathbf1(x_i\ge0)\\
&=g_\theta(S)h(x_1,\ldots,x_n).
\end{aligned}
$$

したがってFisher–Neymanの因子分解定理より

$$
\boxed{S\text{ は }\theta\text{ の十分統計量}}
$$

である。

#### 6. 完備性とUMVU

$S$ の密度は

$$
f_S(s)
=\frac{s^{n-1}}{\Gamma(n)\theta^n}e^{-s/\theta},
\qquad s>0.
$$

可測関数 $a$ が

$$
E_\theta[a(S)]=0
\qquad\text{for all }\theta>0
$$

を満たすとする。

すると

$$
\int_0^\infty
a(s)s^{n-1}e^{-s/\theta}\,ds=0
\qquad\text{for all }\theta>0.
$$

$t=1/\theta>0$ とおけば

$$
\int_0^\infty
a(s)s^{n-1}e^{-ts}\,ds=0
\qquad\text{for all }t>0.
$$

これは関数 $a(s)s^{n-1}$ のLaplace変換が恒等的に0ということ。

Laplace変換の一意性より

$$
a(s)s^{n-1}=0
$$

がほとんど至る所で成り立ち、$s>0$ では

$$
a(s)=0.
$$

したがって

$$
\boxed{S\text{ は完備十分統計量}}
$$

である。

$U=S^2/[n(n+1)]$ は $S$ の関数で、$\theta^2$ の不偏推定量だからLehmann–Scheffe定理より

$$
\boxed{
U=\frac{S^2}{n(n+1)}
\text{ は }\theta^2\text{ のUMVU推定量}
}.
$$

### 本番答案

$S=\sum X_i\sim\operatorname{Gamma}(n,\text{scale }\theta)$ なので

$$
E[S^2]=n(n+1)\theta^2.
$$

よって

$$
U=\frac{S^2}{n(n+1)}
$$

は $\theta^2$ の不偏推定量。一方

$$
E[\overline X^2]
=\left(1+\frac1n\right)\theta^2
$$

なのでプラグイン推定量は上方バイアスを持つ。

また同時密度は $S$ のみを通じて $\theta$ に依存するので $S$ は十分。Laplace変換の一意性から完備でもあるため、Lehmann–Scheffe定理より $U$ はUMVU。

### 25分経過時の打ち切り判断

不偏推定量の構成までが最優先。完備性の証明が重い場合は「期待値0→Laplace変換0→一意性」の3段だけ明示して進む。

### 採点基準（20点目安）

- Gamma和とモーメント: 4点
- $\theta^2$ の不偏化: 4点
- プラグイン推定量のバイアス: 3点
- 分散: 3点
- 十分性: 3点
- 完備性・UMVU: 3点

### 持ち帰るパターン

- 不偏推定量の非線形変換は一般に不偏ではない。
- Gammaモーメントを使えば $\theta^k$ の不偏推定量を構成できる。
- 指数分布標本の和は完備十分統計量。
- 完備十分統計量の関数として不偏推定量を作れたらLehmann–Scheffe。

---

## 17位: 2018 問2型 超幾何分布から有限母集団の成功個数を推定する

- 安定ID: `RECON-EST-R17-2018-Q2`
- 参照: 2018年 問2
- 確度: `third_party_topic_index`
- 元主題: 超幾何分布、推定量
- Level: C
- 目安時間: 20分
- 計算量: 中
- 主な使用技術: 超幾何分布、有限母集団、不偏推定、分散、有限母集団補正、復元抽出との比較
- 変更点: 成功割合だけでなく成功総数を推定し、二項分布との分散差を有限母集団補正として解釈する構成にした。

### 問題

大きさ $N$ の有限母集団に、成功個体が未知個数 $K$ 含まれている。$0\le K\le N$ とする。この母集団から重複なしに一様に $n$ 個抽出し、その中の成功個数を $X$ とする。$1\le n\le N$ とする。

1. $X$ の確率質量関数を答えよ。
2. 

$$
p=\frac KN
$$

とおく。$E[X]$ と $\operatorname{Var}(X)$ を求めよ。
3. 母集団成功割合 $p$ の不偏推定量と、成功総数 $K$ の不偏推定量を構成せよ。
4. $K$ の不偏推定量の分散を求めよ。
5. 同じ母集団から復元抽出を $n$ 回行った場合、成功数 $Y$ は $\operatorname{Bin}(n,p)$ に従う。$NY/n$ で $K$ を推定した場合の分散と比較し、非復元抽出による分散減少率を求めよ。
6. $N=1000,n=100,K=200$ とする。非復元抽出と復元抽出で $K$ の推定量の標準偏差をそれぞれ求めよ。

### 解答

#### 1. 超幾何分布

成功個体 $K$ 個、失敗個体 $N-K$ 個から合計 $n$ 個を重複なしに選ぶ。

したがって

$$
\boxed{
P(X=x)
=\frac{\binom Kx\binom{N-K}{n-x}}{\binom Nn}
}
$$

である。

取り得る $x$ は

$$
\max(0,n-(N-K))
\le x\le
\min(n,K).
$$

#### 2. 平均と分散

超幾何分布の平均は

$$
\boxed{
E[X]=n\frac KN=np
}.
$$

分散は

$$
\boxed{
\operatorname{Var}(X)
=np(1-p)\frac{N-n}{N-1}
}.
$$

最後の因子

$$
\boxed{
\frac{N-n}{N-1}
}
$$

を有限母集団補正と呼ぶ。

復元抽出の二項分布ではこの因子がなく、分散は $np(1-p)$。

#### 3. 不偏推定量

$$
E\left[\frac Xn\right]
=\frac1nE[X]
=p.
$$

したがって

$$
\boxed{
\widehat p=\frac Xn
}
$$

は $p$ の不偏推定量。

$K=Np$ だから

$$
\boxed{
\widehat K
=N\widehat p
=\frac NnX
}
$$

とおけば

$$
E[\widehat K]
=K.
$$

#### 4. $\widehat K$ の分散

$$
\widehat K=\frac NnX
$$

なので

$$
\begin{aligned}
\operatorname{Var}(\widehat K)
&=\frac{N^2}{n^2}\operatorname{Var}(X)\\
&=\frac{N^2}{n^2}
np(1-p)\frac{N-n}{N-1}\\
&=\frac{N^2}{n}p(1-p)
\frac{N-n}{N-1}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\widehat K)
=\frac{N^2}{n}p(1-p)
\frac{N-n}{N-1}
}.
$$

$K$ で書けば

$$
p(1-p)
=\frac KN\left(1-\frac KN\right).
$$

#### 5. 復元抽出との比較

復元抽出では

$$
Y\sim\operatorname{Bin}(n,p).
$$

推定量

$$
\widehat K_{\mathrm{rep}}=\frac NnY
$$

の分散は

$$
\begin{aligned}
\operatorname{Var}(\widehat K_{\mathrm{rep}})
&=\frac{N^2}{n^2}np(1-p)\\
&=\frac{N^2}{n}p(1-p).
\end{aligned}
$$

したがって分散比は

$$
\frac{\operatorname{Var}(\widehat K)}{
\operatorname{Var}(\widehat K_{\mathrm{rep}})}
=\frac{N-n}{N-1}.
$$

よって

$$
\boxed{
\text{非復元抽出では分散が }
\frac{N-n}{N-1}
\text{ 倍になる}
}.
$$

抽出率 $n/N$ が無視できないとき、この分散減少は大きい。

$n\ll N$ なら

$$
\frac{N-n}{N-1}\approx1
$$

なので二項近似が自然になる。

#### 6. 数値例

$N=1000,n=100,K=200$ なので

$$
p=0.2,
\qquad
p(1-p)=0.16.
$$

復元抽出では

$$
\operatorname{Var}(\widehat K_{\mathrm{rep}})
=\frac{1000^2}{100}\times0.16
=1600.
$$

したがって

$$
\boxed{
\operatorname{SD}(\widehat K_{\mathrm{rep}})=40
}.
$$

非復元抽出では有限母集団補正

$$
\frac{1000-100}{999}
=\frac{900}{999}
\approx0.9009.
$$

したがって

$$
\operatorname{Var}(\widehat K)
=1600\times\frac{900}{999}
\approx1441.44.
$$

よって

$$
\boxed{
\operatorname{SD}(\widehat K)
\approx37.97
}.
$$

非復元抽出の方が標準偏差も小さい。

### 本番答案

$$
X\sim\operatorname{Hypergeom}(N,K,n),
$$

$$
E[X]=n\frac KN=np,
$$

$$
V[X]=np(1-p)\frac{N-n}{N-1}.
$$

したがって

$$
\widehat p=\frac Xn,
\qquad
\widehat K=\frac NnX
$$

はそれぞれ不偏。

$$
V(\widehat K)
=\frac{N^2}{n}p(1-p)
\frac{N-n}{N-1}.
$$

復元抽出なら有限母集団補正が消えるため、非復元抽出の分散は復元抽出の

$$
\frac{N-n}{N-1}
$$

倍。

### 25分経過時の打ち切り判断

平均と分散公式を書ければ後半はスカラー倍だけ。有限母集団補正 $(N-n)/(N-1)$ を落とさないことが最重要。

### 採点基準（20点目安）

- PMF: 3点
- 平均・分散: 5点
- 不偏推定量: 4点
- 分散: 3点
- 復元抽出との比較: 3点
- 数値例: 2点

### 持ち帰るパターン

- 超幾何分布は非復元抽出、二項分布は復元抽出のモデル。
- 標本成功割合 $X/n$ は有限母集団割合 $K/N$ の不偏推定量。
- 非復元抽出では有限母集団補正により分散が小さくなる。
- $n/N$ が小さいと超幾何分布を二項分布で近似しやすい。

---

## 11位〜17位を通した復習ポイント

この7題では、推定論の中でも「標準公式を出す」より一段深い次の論点をまとめて反復できる。

1. **モーメント法**: 母モーメントから母数を逆算し、標本モーメントへ置換する。
2. **非正則MLE**: 台が母数に依存する場合、微分ではなく順序統計量と境界を見る。
3. **変数変換**: Paretoを対数変換して指数分布へ帰着する。
4. **不偏性と一致性の区別**: 不偏でも非一致、バイアスありでも一致は起こり得る。
5. **不偏化**: 期待値の係数補正、線形結合、Gamma逆モーメントを使い分ける。
6. **完備十分統計量とUMVU**: 不偏推定量を十分統計量の関数へ落とす。
7. **有限母集団補正**: 復元抽出と非復元抽出の分散差を理解する。

## 参照方針

実際の受験演習では、公式問題集で原問題を確認することを優先する。本ファイルは公開されたテーマ一覧をもとに技法を反復するための独自演習であり、公式過去問の問題文を再現したものではない。
