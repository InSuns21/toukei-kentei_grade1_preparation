from pathlib import Path

path = Path('textbook/volumes/03_inference/S1_02_統計量_十分性_分解定理/index.md')
text = path.read_text(encoding='utf-8')

old = '''後続章では、十分統計量を利用して推定量を改善する考え方へ進みます。\n\n## 20. 付随統計量との対比'''
new = r'''ここからは、この十分性を実際に**推定量の改善**へ使います。鍵になるのが完備統計量、Rao--Blackwellの定理、一様最小分散不偏推定量、Lehmann--Schefféの定理です。

## 20. 完備統計量：平均が常に0なら関数そのものが0

十分統計量は「母数情報を落とさない」性質でした。完備統計量は別の性質で、統計量の関数に隠れた「平均0の余計な揺らぎ」が存在しないことを表します。

<a id="def-s1-02-complete-statistic"></a>

<!-- formal-statement-start -->
> **定義（完備統計量）**
> 統計量 $T$ について、任意の可測関数 $g$ が全ての母数 $\theta$ で $E_\theta[|g(T)|]<\infty$ を満たすとする。このとき
>
> $$
> E_\theta[g(T)]=0\qquad\text{for all }\theta
> $$
>
> ならば
>
> $$
> P_\theta(g(T)=0)=1\qquad\text{for all }\theta
> $$
>
> が成り立つとき、$T$ を**完備統計量**という。
<!-- formal-statement-end -->

十分性と完備統計量であることは別の性質です。十分性は標本から母数情報をどれだけ保持しているか、完備統計量は $T$ の関数として平均0の「見えない余分」が残っていないかを見ています。

<!-- definition-example-start: def-s1-02-complete-statistic -->
**定義の確認：ベルヌーイ標本の成功回数は完備統計量**

$X_1,\ldots,X_n$ を独立同分布な $\operatorname{Bernoulli}(p)$ 標本とし、

$$
T=\sum_{i=1}^nX_i\sim\operatorname{Bin}(n,p)
$$

とします。ある関数 $g$ が全ての $0<p<1$ について

$$
E_p[g(T)]=0
$$

を満たすとします。すると

$$
\sum_{t=0}^n g(t)\binom nt p^t(1-p)^{n-t}=0.
$$

$(1-p)^n$ で割り、

$$
q=\frac{p}{1-p}>0
$$

と置けば

$$
\sum_{t=0}^n g(t)\binom nt q^t=0
$$

が全ての $q>0$ で成り立ちます。左辺は $q$ の多項式なので、区間上で恒等的に0なら全係数が0です。従って

$$
g(t)\binom nt=0\qquad(t=0,1,\ldots,n),
$$

すなわち $g(t)=0$ です。よって $T$ は完備統計量です。
<!-- definition-example-end -->

## 21. Rao--Blackwellの定理：十分統計量で条件づけると分散は悪化しない

「不偏推定量は作れたが、もっとばらつきを小さくできないか」という問いに、十分統計量が直接効きます。

<a id="thm-s1-02-rao-blackwell"></a>

<!-- formal-statement-start -->
> **定理（Rao--Blackwellの定理）**
> $U$ を $\tau(\theta)$ の不偏推定量で $E_\theta[U^2]<\infty$ とし、$T$ を $\theta$ の十分統計量とする。
>
> $$
> U^*=E_\theta[U\mid T]
> $$
>
> と置く。十分性により $U^*$ は未知母数に依存しない $T$ の関数として選べる。このとき $U^*$ も $\tau(\theta)$ の不偏推定量であり、全ての $\theta$ で
>
> $$
> \operatorname{Var}_\theta(U^*)\le \operatorname{Var}_\theta(U)
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 21.1 証明：タワープロパティと全分散公式だけ

まずタワープロパティより

$$
E_\theta[U^*]
=E_\theta\left[E_\theta[U\mid T]\right]
=E_\theta[U]
=\tau(\theta),
$$

なので不偏性は保存されます。

次に全分散公式から

$$
\operatorname{Var}_\theta(U)
=\operatorname{Var}_\theta\left(E_\theta[U\mid T]\right)
+E_\theta\left[\operatorname{Var}_\theta(U\mid T)\right].
$$

第2項は0以上なので

$$
\operatorname{Var}_\theta(U)
\ge
\operatorname{Var}_\theta(U^*).
$$

これで示されました。
<!-- proof-end -->

### 21.2 ベルヌーイ標本：$X_1$ を標本平均へ改善する

$X_i\sim\operatorname{Bernoulli}(p)$ を独立同分布とし、$T=\sum_iX_i$ とします。$X_1$ は

$$
E_p[X_1]=p
$$

なので $p$ の不偏推定量ですが、標本のうち1個しか使っていません。

$T=t$ が分かった条件では、対称性から各 $X_i$ の条件付き期待値は同じです。また

$$
\sum_{i=1}^nE[X_i\mid T=t]=t
$$

なので

$$
E[X_1\mid T=t]=\frac tn.
$$

従ってRao--Blackwell化すると

$$
U^*=E[X_1\mid T]
=\frac Tn
=\overline X.
$$

実際、

$$
\operatorname{Var}(X_1)=p(1-p),
$$

$$
\operatorname{Var}(\overline X)=\frac{p(1-p)}n.
$$

$n>1$ なら分散は厳密に小さくなります。「十分統計量へ情報を集約してから平均する」と、余計な標本内の揺らぎが落ちるわけです。

## 22. 一様最小分散不偏推定量：全ての不偏推定量に勝つ

Rao--Blackwellの定理は「この推定量よりは悪くならない」と言います。では、全ての不偏推定量の中で最小分散だと保証できるでしょうか。

<a id="def-s1-02-umvu"></a>

<!-- formal-statement-start -->
> **定義（一様最小分散不偏推定量）**
> $U$ が $\tau(\theta)$ の不偏推定量であり、同じ $\tau(\theta)$ の任意の不偏推定量 $V$ に対して、全ての $\theta$ で
>
> $$
> \operatorname{Var}_\theta(U)\le\operatorname{Var}_\theta(V)
> $$
>
> を満たすとき、$U$ を $\tau(\theta)$ の**一様最小分散不偏推定量（UMVU推定量）**という。
<!-- formal-statement-end -->

「一様」は、ある特定の $\theta$ だけでなく、母数空間の全ての点で同時に最小分散という意味です。

## 23. Lehmann--Schefféの定理：完備十分統計量でUMVUが決まる

<a id="thm-s1-02-lehmann-scheffe"></a>

<!-- formal-statement-start -->
> **定理（Lehmann--Schefféの定理）**
> $T$ が $\theta$ の完備十分統計量であり、$h(T)$ が $\tau(\theta)$ の不偏推定量であるとする。このとき $h(T)$ は $\tau(\theta)$ の一様最小分散不偏推定量であり、ほとんど確実な一致を除いて一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 23.1 証明：Rao--Blackwell化して、完備性で一意にする

$V$ を $\tau(\theta)$ の任意の不偏推定量とします。Rao--Blackwellの定理により

$$
g(T)=E[V\mid T]
$$

も不偏で、

$$
\operatorname{Var}_\theta(g(T))
\le
\operatorname{Var}_\theta(V)
$$

です。

一方、$h(T)$ と $g(T)$ はどちらも $\tau(\theta)$ の不偏推定量なので

$$
E_\theta[h(T)-g(T)]=0
$$

が全ての $\theta$ で成り立ちます。$T$ は完備統計量だから

$$
h(T)=g(T)
$$

がほとんど確実に成り立ちます。従って

$$
\operatorname{Var}_\theta(h(T))
=
\operatorname{Var}_\theta(g(T))
\le
\operatorname{Var}_\theta(V).
$$

$V$ は任意だったので、$h(T)$ は一様最小分散不偏推定量です。同じ議論で、$T$ の関数としての不偏推定量は完備性により一意です。
<!-- proof-end -->

### 23.2 ベルヌーイ標本では標本平均がUMVU

ベルヌーイ標本では

$$
T=\sum_{i=1}^nX_i
$$

が十分統計量であり、20節で完備統計量であることも示しました。また

$$
\overline X=\frac Tn,
\qquad
E_p[\overline X]=p.
$$

従ってLehmann--Schefféの定理から

$$
\boxed{\overline X\text{ は }p\text{ の一様最小分散不偏推定量}}
$$

です。

Rao--Blackwellの定理だけなら「$X_1$ より $\overline X$ がよい」としか言えません。**完備統計量であることを加えることで「他のどんな不偏推定量を持ってきても、$\overline X$ より分散を小さくできない」まで言える**のがLehmann--Schefféの定理です。

<!-- definition-example-start: def-s1-02-umvu -->
**定義の確認**
ここでの結論は単に $\operatorname{Var}(\overline X)<\operatorname{Var}(X_1)$ ではありません。任意の $p$ の不偏推定量 $V$ に対し、全ての $0<p<1$ で

$$
\operatorname{Var}_p(\overline X)
\le
\operatorname{Var}_p(V)
$$

が成り立つ、という一様最小分散性です。
<!-- definition-example-end -->

## 24. 付随統計量との対比'''

if text.count(old) != 1:
    raise SystemExit(f'expected one theory insertion point, got {text.count(old)}')
text = text.replace(old, new, 1)

exercise_marker = '\n## Level D\n'
exercise = r'''
### S1-02-C05 完備統計量・Rao--Blackwell・Lehmann--Scheffé

- Level: C
- 目安時間: 22分
- 主題: 完備十分統計量と一様最小分散不偏推定量
- 使用技術: 二項分布・条件付き期待値・多項式・全分散公式

$X_1,\ldots,X_n$ を独立同分布な $\operatorname{Bernoulli}(p)$ 標本とし、

$$
T=\sum_{i=1}^nX_i
$$

とする。

1. $T$ が $p$ の完備統計量であることを示せ。
2. $X_1$ は $p$ の不偏推定量である。$E[X_1\mid T]$ を求め、Rao--Blackwell化した推定量を答えよ。
3. Rao--Blackwell化の前後で分散を比較せよ。
4. $T$ の十分性も用いて、$\overline X$ が $p$ の一様最小分散不偏推定量であることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. $T\sim\operatorname{Bin}(n,p)$ である。全ての $0<p<1$ に対して $E_p[g(T)]=0$ とすると

$$
\sum_{t=0}^n g(t)\binom nt p^t(1-p)^{n-t}=0.
$$

$(1-p)^n$ で割り、$q=p/(1-p)$ とおけば

$$
\sum_{t=0}^n g(t)\binom nt q^t=0
$$

が全ての $q>0$ で成り立つ。従って多項式の全係数が0であり、$g(t)=0$。よって $T$ は完備統計量である。

2. $E[X_1]=p$ なので $X_1$ は不偏。$T=t$ のもとでは対称性から

$$
E[X_1\mid T=t]
=\cdots=
E[X_n\mid T=t].
$$

これらの和は $t$ なので

$$
E[X_1\mid T=t]=\frac tn.
$$

従って

$$
E[X_1\mid T]=\frac Tn=\overline X.
$$

3. 分散は

$$
\operatorname{Var}(X_1)=p(1-p),
$$

$$
\operatorname{Var}(\overline X)=\frac{p(1-p)}n.
$$

よって $n>1$ ではRao--Blackwell化により厳密に分散が減少する。

4. A02より $T$ は十分統計量であり、1より完備統計量でもある。従って $T$ は完備十分統計量。さらに $\overline X=T/n$ は $p$ の不偏推定量なので、Lehmann--Schefféの定理より

$$
\boxed{\overline X\text{ は }p\text{ の一様最小分散不偏推定量}}
$$

である。

##### 本番答案

$T\sim\operatorname{Bin}(n,p)$。$E_p[g(T)]=0$ を全 $p$ で仮定し $q=p/(1-p)$ とおくと

$$
\sum_{t=0}^n g(t)\binom nt q^t=0
$$

が全 $q>0$ で成り立つので $g(t)=0$。従って $T$ は完備統計量。分解定理から十分でもある。

また

$$
E[X_1\mid T]=\frac Tn=\overline X,
$$

$$
\operatorname{Var}(X_1)=p(1-p),\qquad
\operatorname{Var}(\overline X)=\frac{p(1-p)}n.
$$

従ってRao--Blackwell化で分散が改善する。さらに $T$ は完備十分統計量で $\overline X$ は不偏だから、Lehmann--Schefféの定理より

$$
\boxed{\overline X\text{ は }p\text{ の一様最小分散不偏推定量}}
$$

である。

##### 採点基準

- 二項分布を用いた完備性の証明: 7点
- 条件付き期待値 $E[X_1\mid T]=T/n$: 5点
- 分散比較: 3点
- 完備十分性とLehmann--Schefféの適用: 5点

<!-- solution-end -->
'''

if text.count(exercise_marker) != 1:
    raise SystemExit(f'expected one Level D marker, got {text.count(exercise_marker)}')
text = text.replace(exercise_marker, '\n' + exercise + exercise_marker, 1)

path.write_text(text, encoding='utf-8')
