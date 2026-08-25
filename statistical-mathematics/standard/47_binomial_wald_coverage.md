# Standard 14 二項比率Wald区間・被覆確率

- 旧No.: 47
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（巨大な二項和の数値評価不要）

## 問題

$X\sim\operatorname{Binomial}(n,p)$、$0<p<1$、$\hat p=X/n$ とする。

1. Wald型95%信頼区間を、その近似根拠とともに書け。
2. 真の $p$ に対する有限標本被覆確率を二項和で表せ。
3. $X=0$ のとき何が起こるか述べ、境界付近でWald区間が不安定な理由を説明せよ。

## 詳細解答

### 1. CLTとSlutskyからWald区間を作る

$X$ はBernoulli$(p)$ 標本 $B_1,\ldots,B_n$ の和と書け、

$$
\hat p=\frac1n\sum_{i=1}^nB_i.
$$

$B_i$ はi.i.d.で

$$
E[B_i]=p,
\qquad
Var(B_i)=p(1-p)\in(0,\infty)
$$

だから **Lindeberg–Lévyの中心極限定理**を適用でき、固定した内部点 $0<p<1$ に対して

$$
\frac{\sqrt n(\hat p-p)}{\sqrt{p(1-p)}}
\Rightarrow N(0,1).
$$

また弱大数の法則から $\hat p\to_p p$。関数 $x(1-x)$ は連続で $p(1-p)>0$ なので、連続写像定理と **Slutskyの定理**から

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

$p$について解いて

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

Wald区間は観測値 $x$ ごとに決まる。真の $p$ がその区間に入る事象を全ての $x$ について足せば

$$
\boxed{
C_n(p)=\sum_{x=0}^n
\boldsymbol1\{p\in I_W(x)\}
\binom nxp^x(1-p)^{n-x}
}.
$$

この式は二項分布に基づく有限標本での厳密な被覆確率であり、数値和の評価自体は要求しない。

### 3. 境界での破綻

$X=0$ なら

$$
\hat p=0,
\qquad
\sqrt{\frac{\hat p(1-\hat p)}n}=0
$$

なのでWald区間は $[0,0]$ に退化する。真の $p>0$ は被覆しない。

ここで1のSlutskyの漸近論自体は固定された内部点 $p\in(0,1)$ では正しい。しかし有限標本で $p$ が0に近いと $X=0$ の確率 $(1-p)^n$ が無視できず、plug-in標準誤差まで0に潰れる。つまり「正規近似」と「標準誤差のplug-in」が同時に不安定になる。

## 本番答案

$X$ をBernoulli標本和とみる。$0<p<1$ ならi.i.d.かつ有限正分散なので **CLT**から

$$
\frac{\sqrt n(\hat p-p)}{\sqrt{p(1-p)}}\Rightarrow N(0,1).
$$

LLNで $\hat p\to_p p$、$p(1-p)>0$ なので **Slutsky**により分母をplug-inできる。従ってWald区間は

$$
\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}.
$$

有限標本被覆率は

$$
\sum_x\boldsymbol1\{p\in I_W(x)\}\binom nxp^x(1-p)^{n-x}.
$$

$X=0$ では区間が $[0,0]$ に退化するため、境界近傍では名目95%から大きく外れうる。

## 採点基準

- Wald区間（CLT・Slutsky条件）: 5点
- 被覆確率の有限和: 6点
- $X=0$ の分析: 5点
- 漸近条件と境界不安定性の説明: 4点
