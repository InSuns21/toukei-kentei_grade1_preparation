# Core 02 Bernoulliモデルで尤度比検定・Wald・Scoreを比較する

- 旧No.: 70
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Bernoulli}(p)$ とし、$\widehat p=\bar X$ とする。$0<p_0<1$ として

$$
H_0:p=p_0,
\qquad H_1:p\ne p_0
$$

を考える。

1. 最尤推定量を求めよ。
2. 尤度比統計量 $G^2=-2\log\Lambda$ を $\widehat p,p_0$ で表せ。
3. Wald統計量

$$
W=\frac{n(\widehat p-p_0)^2}{\widehat p(1-\widehat p)}
$$

が漸近的に$\chi_1^2$に従うことを示せ。
4. Score統計量を導出せよ。
5. $G^2,W,S$ が$H_0$の下で漸近同値であることを示せ。

**注**: $G^2$ の対数は数値化しなくてよい。

## 詳細解答

### 1. 最尤推定量

$T=\sum X_i$ とすると

$$
\ell(p)=T\log p+(n-T)\log(1-p).
$$

$0<T<n$ では微分から $\hat p=T/n$。$T=0,n$ では境界最尤推定量が0,1なので、閉じた母数空間 $[0,1]$ では常に

$$
\boxed{\widehat p=T/n=\bar X}.
$$

### 2. 尤度比検定

$$
\boxed{
G^2=2n\left[
\widehat p\log\frac{\widehat p}{p_0}
+(1-\widehat p)\log\frac{1-\widehat p}{1-p_0}
\right]
}.
$$

### 3. Wald：中心極限定理・大数の法則・Slutsky

$H_0$ の下で $X_i$ は独立同分布 Bernoulli$(p_0)$ で

$$
E[X_i]=p_0,
\qquad
Var(X_i)=p_0(1-p_0)\in(0,\infty).
$$

したがって **Lindeberg–Lévy の中心極限定理**の条件を満たし、

$$
\frac{\sqrt n(\widehat p-p_0)}{\sqrt{p_0(1-p_0)}}
\Rightarrow N(0,1).
$$

また弱大数の法則から $\hat p\to_p p_0$。$0<p_0<1$ なので連続写像定理から

$$
\widehat p(1-\widehat p)\to_p p_0(1-p_0)>0.
$$

従って **Slutskyの定理**を適用でき、

$$
\frac{\sqrt n(\widehat p-p_0)}{\sqrt{\widehat p(1-\widehat p)}}
\Rightarrow N(0,1).
$$

二乗して

$$
\boxed{W\Rightarrow\chi^2_1}.
$$

有限標本で $\hat p=0$ または1ならWald式の分母が0になるが、$0<p_0<1$ ではその確率は $p_0^n+(1-p_0)^n\to0$ なので漸近結果には影響しない。

### 4. Score

スコアは

$$
U(p)=\frac{T-np}{p(1-p)},
$$

Fisher情報は

$$
I_n(p)=\frac n{p(1-p)}.
$$

帰無値で標準化して

$$
\boxed{
S=\frac{U(p_0)^2}{I_n(p_0)}
=\frac{n(\widehat p-p_0)^2}{p_0(1-p_0)}
}.
$$

上の中心極限定理から直接 $S\Rightarrow\chi^2_1$。

### 5. Wilksの定理と漸近同値

尤度比検定については **Wilksの定理**を使える。条件は、真値 $p_0$ が母数空間の内部点、モデルが識別可能かつ滑らか、情報量が有限正であること。本問では $0<p_0<1$、Bernoulli支持は母数非依存、

$$
I_1(p_0)=\frac1{p_0(1-p_0)}\in(0,\infty)
$$

なので条件を満たし、$G^2\Rightarrow\chi^2_1$。

さらに三者の差を直接見る。$\delta_n=\widehat p-p_0=O_p(n^{-1/2})$ とおき

$$
h(p)=p\log\frac p{p_0}+(1-p)\log\frac{1-p}{1-p_0}
$$

とすると

$$
h(p_0)=h'(p_0)=0,
\qquad
h''(p_0)=\frac1{p_0(1-p_0)}.
$$

Taylor展開より

$$
G^2
=\frac{n\delta_n^2}{p_0(1-p_0)}+o_p(1)
=S+o_p(1).
$$

また $\hat p(1-\hat p)=p_0(1-p_0)+o_p(1)$ なので

$$
W=S+o_p(1).
$$

## 本番答案

$\hat p=\bar X$。$H_0$ で $X_i$ は独立同分布、有限正分散 $p_0(1-p_0)$ を持つため **中心極限定理**、また大数の法則で $\hat p\to_p p_0$。$p_0$ は内部点なので **Slutsky**を適用でき、

$$
W=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)}\Rightarrow\chi^2_1.
$$

$$
S=\frac{n(\hat p-p_0)^2}{p_0(1-p_0)}\Rightarrow\chi^2_1.
$$

Bernoulliは内部点 $p_0$ で正則、情報量も有限正なので **Wilksの定理**から $G^2\Rightarrow\chi^2_1$。さらにTaylor展開で

$$
G^2=S+o_p(1),\qquad W=S+o_p(1).
$$

## 採点基準

- 最尤推定量: 2点
- 尤度比検定: 4点
- Wald（中心極限定理・Slutsky条件）: 4点
- Score: 4点
- Wilks条件と漸近同値: 6点
