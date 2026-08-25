# Core 03 Neyman–Pearson・単調尤度比・一様最強力検定

- 旧No.: 63
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

$X_i\overset{\mathrm{iid}}\sim\operatorname{Exp}(\lambda)$ とする。

$$
H_0:\lambda=\lambda_0,
\qquad H_1:\lambda<\lambda_0
$$

を有意水準$\alpha$で検定したい。$T=\sum_{i=1}^nX_i$ とする。

1. 単純対立 $\lambda=\lambda_1<\lambda_0$ に対するNeyman–Pearson検定の棄却域を求めよ。
2. 尤度比が$T$について単調であることを示せ。
3. $H_1:\lambda<\lambda_0$ 全体に対する一様最強力検定を構成せよ。
4. $H_0$下で$2\lambda_0T\sim\chi^2_{2n}$を用いて臨界値を表せ。

## 詳細解答

### 1. Neyman–Pearson補題の適用条件

尤度は

$$
L(\lambda;x)
=\lambda^n e^{-\lambda T}
\prod_i\boldsymbol1\{x_i>0\}.
$$

まず固定した $\lambda_1<\lambda_0$ を考える。これは

$$
H_0:\lambda=\lambda_0
\quad\text{対}\quad
H_1:\lambda=\lambda_1
$$

という**単純仮説対単純仮説**である。両分布は共通のLebesgue測度で支配され、共通支持は $(0,\infty)^n$。したがって **Neyman–Pearson補題**を適用できる。

尤度比は

$$
\frac{L(\lambda_1)}{L(\lambda_0)}
=\left(\frac{\lambda_1}{\lambda_0}\right)^n
\exp\{(\lambda_0-\lambda_1)T\}.
$$

$\lambda_0-\lambda_1>0$ なので、これは $T$ の厳密な増加関数。Neyman–Pearson補題より、最強力検定は

$$
\boxed{T\ge c_\alpha}
$$

の形になる。$T$ の帰無分布は連続なので、任意の $0<\alpha<1$ に対してランダム化せず $P_{\lambda_0}(T\ge c_\alpha)=\alpha$ とできる。

### 2・3. 一様最強力検定性

重要なのは、上の単調性の向きが**全ての** $\lambda_1<\lambda_0$ で同じことである。しかもサイズを決める分布は常に $H_0$ の $\lambda_0$ なので、臨界値 $c_\alpha$ も $\lambda_1$ に依存しない。

従って同じ検定 $T\ge c_\alpha$ が各単純対立 $\lambda_1<\lambda_0$ に対してNeyman–Pearson最強力である。よって全ての対立点に同時に最強であり、

$$
\boxed{T\ge c_\alpha\text{ は }H_1:\lambda<\lambda_0\text{ に対するUMP検定}}
$$

である。

この議論は **Karlin–Rubin の単調尤度比定理**の特殊例とも見なせる。Karlin–Rubinを引用するなら、$T$ に関する尤度比が一方向に単調であることと、片側仮説であることを確認する必要があり、本問では上の式で確認済みである。

### 4. 臨界値

指数分布の和は

$$
T\sim\operatorname{Gamma}(n,\lambda_0).
$$

Gamma–カイ二乗変換より

$$
2\lambda_0T\sim\chi^2_{2n}.
$$

従って

$$
\boxed{
2\lambda_0T\ge\chi^2_{2n,1-\alpha}
}
$$

が棄却域。

## 本番答案

固定 $\lambda_1<\lambda_0$ では単純対単純で、両分布は共通支持 $(0,\infty)^n$ 上のLebesgue密度を持つ。よって **Neyman–Pearson補題**を適用できる。

$$
\frac{L(\lambda_1)}{L(\lambda_0)}
=C\exp\{(\lambda_0-\lambda_1)T\}
$$

は $T$ の増加関数なので $T\ge c_\alpha$ が最強力。帰無分布は連続なので $P_{\lambda_0}(T\ge c_\alpha)=\alpha$ とでき、この同じ臨界域が全 $\lambda_1<\lambda_0$ に対して最強力だから一様最強力検定。これは単調尤度比を確認したKarlin–Rubin型の議論でもある。

$H_0$下で $2\lambda_0T\sim\chi^2_{2n}$ なので

$$
2\lambda_0T\ge\chi^2_{2n,1-\alpha}.
$$

## 採点基準

- 尤度とNeyman–Pearson補題の適用条件: 3点
- Neyman–Pearson比と単調性: 6点
- 一様最強力検定の説明・単調尤度比条件: 6点
- 臨界値: 5点
