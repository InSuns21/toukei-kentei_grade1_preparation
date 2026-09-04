# Standard 14 二項比率ワルド区間・被覆確率

- 旧No.: 47
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（巨大な二項和の数値評価不要）

## 問題

$0<p<1$ とし、$X$ は二項分布 $\operatorname{Binomial}(n,p)$ に従う。すなわち

$$
P_p(X=x)=\binom nxp^x(1-p)^{n-x},
\qquad x=0,1,\ldots,n.
$$

$\hat p=X/n$ とする。

1. ワルド型95%信頼区間を、その近似根拠とともに書け。
2. 真の $p$ に対する有限標本被覆確率を二項和で表せ。
3. $X=0$ のとき何が起こるか述べ、境界付近でワルド区間が不安定な理由を説明せよ。

## 詳細解答

### 1. 中心極限定理とSlutskyからワルド区間を作る

$X$ は独立なベルヌーイ$(p)$ 変数 $B_1,\ldots,B_n$ の和

$$
X=\sum_{i=1}^nB_i
$$

と書けるので

$$
\hat p=\frac1n\sum_{i=1}^nB_i.
$$

ベルヌーイ変数では

$$
E[B_i]=p,
\qquad
\operatorname{Var}(B_i)=p(1-p)\in(0,\infty).
$$

従って固定した内部点 $0<p<1$ に対して **Lindeberg–Lévy の中心極限定理**を適用でき、

$$
\frac{\sqrt n(\hat p-p)}{\sqrt{p(1-p)}}
\Rightarrow N(0,1).
$$

また弱大数の法則から $\hat p\to_p p$。関数 $x(1-x)$ は $p$ で連続かつ $p(1-p)>0$ なので、連続写像定理と **Slutsky の定理**から

$$
\frac{\sqrt n(\hat p-p)}{\sqrt{\hat p(1-\hat p)}}
\Rightarrow N(0,1).
$$

従って大標本で約95%の確率で

$$
-1.96
\le
\frac{\hat p-p}{\sqrt{\hat p(1-\hat p)/n}}
\le1.96.
$$

$p$ について解けば

$$
\boxed{
I_W(X)=\left[
\hat p-1.96\sqrt{\frac{\hat p(1-\hat p)}n},
\hat p+1.96\sqrt{\frac{\hat p(1-\hat p)}n}
\right]
}.
$$

これは有限標本で95%を正確に保証する区間ではない。固定した $p\in(0,1)$ で $n\to\infty$ とする漸近近似であり、実用上は $np$ と $n(1-p)$ が十分大きいほど正規近似が良い。

### 2. 有限標本被覆確率

ワルド区間は観測値 $x$ ごとに

$$
I_W(x)
$$

という区間を返す。真の $p$ が区間に入る確率は

$$
C_n(p)=P_p\{p\in I_W(X)\}.
$$

離散変数 $X$ の全ての値について分解すると

$$
\begin{aligned}
C_n(p)
&=\sum_{x=0}^n
P_p\{p\in I_W(X),X=x\}\\
&=\sum_{x=0}^n
\boldsymbol1_{\{p\in I_W(x)\}}P_p(X=x).
\end{aligned}
$$

問題文の二項確率質量関数を代入して

$$
\boxed{
C_n(p)=\sum_{x=0}^n
\boldsymbol1_{\{p\in I_W(x)\}}
\binom nxp^x(1-p)^{n-x}
}.
$$

この式は有限標本での厳密な被覆確率であり、数値和そのものの評価は不要である。

### 3. 境界での破綻

$X=0$ なら

$$
\hat p=0,
\qquad
\sqrt{\frac{\hat p(1-\hat p)}n}=0
$$

なので ワルド 区間は

$$
[0,0]
$$

に退化する。真の $p>0$ は被覆しない。

しかも $p$ が0に近い有限標本では

$$
P_p(X=0)=(1-p)^n
$$

が無視できない。したがって

- 二項分布を正規分布で近似すること自体が不安定になり、
- plug-in 標準誤差 $\sqrt{\hat p(1-\hat p)/n}$ も0へ潰れうる

という2つの問題が同時に起こる。

1の Slutsky の漸近論は固定された内部点 $p\in(0,1)$ では正しいが、有限標本で境界に近い $p$ に対して一様に良い近似を保証するものではない。

## 本番答案

$X=\sum_iB_i$、$B_i\overset{iid}\sim\operatorname{Bernoulli}(p)$ と書けば、中心極限定理より

$$
\frac{\sqrt n(\hat p-p)}{\sqrt{p(1-p)}}\Rightarrow N(0,1).
$$

大数の法則で $\hat p\to_p p$、$p(1-p)>0$ なので Slutsky により

$$
\frac{\sqrt n(\hat p-p)}{\sqrt{\hat p(1-\hat p)}}\Rightarrow N(0,1).
$$

従って ワルド 区間は

$$
\hat p\pm1.96\sqrt{\frac{\hat p(1-\hat p)}n}.
$$

有限標本被覆率は

$$
\sum_{x=0}^n
\boldsymbol1_{\{p\in I_W(x)\}}
\binom nxp^x(1-p)^{n-x}.
$$

$X=0$ では区間が $[0,0]$ に退化するため、境界近傍では名目95%から大きく外れうる。

## 採点基準

- ワルド区間（中心極限定理・Slutsky条件）: 5点
- 被覆確率を離散和から導出: 6点
- $X=0$ の分析: 5点
- 漸近条件と境界不安定性の説明: 4点
