# Core 17 台が母数に依存する非正則最尤推定量・不偏化

- 旧No.: 44
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X_i\overset{\mathrm{iid}}\sim U(0,\theta)$、$\theta>0$とし、$M=X_{(n)}$とする。

1. $\theta$の最尤推定量を求めよ。
2. $E[M]$と$\operatorname{Var}(M)$を求めよ。
3. 最尤推定量を不偏化し、その分散を求めよ。
4. このモデルに通常のCramér–Rao議論を機械的に適用できない理由を説明せよ。

## 詳細解答

### 1. 最尤推定量

同時密度は

$$
L(\theta;x)
=\theta^{-n}\prod_{i=1}^n\boldsymbol{1}_{\{0<x_i<\theta\}}
=\theta^{-n}\boldsymbol{1}_{\{M<\theta\}}\prod_i\boldsymbol{1}_{\{x_i>0\}}.
$$

観測標本を固定すると、尤度が正になるのは $\theta\ge M$ の範囲であり、その範囲では $\theta^{-n}$ は単調減少する。したがって境界で最大となり

$$
\boxed{\widehat\theta_{MLE}=M}.
$$

### 2. 最大値の分布からモーメントを直接導く

$0<m<\theta$ について、独立性から

$$
\begin{aligned}
P(M\le m)
&=P(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP(X_i\le m)\\
&=\left(\frac m\theta\right)^n.
\end{aligned}
$$

従って密度は

$$
f_M(m)=\frac{n m^{n-1}}{\theta^n},
\qquad0<m<\theta.
$$

ここから

$$
\begin{aligned}
E[M]
&=\int_0^\theta m\frac{n m^{n-1}}{\theta^n}\,dm\\
&=\frac n{n+1}\theta,
\end{aligned}
$$

$$
\begin{aligned}
E[M^2]
&=\int_0^\theta m^2\frac{n m^{n-1}}{\theta^n}\,dm\\
&=\frac n{n+2}\theta^2.
\end{aligned}
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(M)
&=\frac n{n+2}\theta^2-\left(\frac n{n+1}\theta\right)^2\\
&=\boxed{\frac{n\theta^2}{(n+1)^2(n+2)}}.
\end{aligned}
$$

### 3. 不偏化

$$
\widetilde\theta=\frac{n+1}{n}M
$$

なら $E[\widetilde\theta]=\theta$。また

$$
\begin{aligned}
\operatorname{Var}(\widetilde\theta)
&=\left(\frac{n+1}{n}\right)^2\operatorname{Var}(M)\\
&=\boxed{\frac{\theta^2}{n(n+2)}}.
\end{aligned}
$$

### 4. Cramér–Rao不等式を通常形で使えない理由

通常の **Cramér–Rao不等式**の導出では、少なくとも母数近傍で共通支持を持ち、密度を母数で微分して積分と微分を交換できることが重要である。これにより

$$
E_\theta\left[\frac{\partial}{\partial\theta}\log f_\theta(X)\right]=0
$$

などを用いる。

しかし本問では1標本密度

$$
f_\theta(x)=\theta^{-1}\boldsymbol{1}_{\{0<x<\theta\}}
$$

の支持 $(0,\theta)$ 自体が $\theta$ に依存する。指示関数の境界寄与を無視して内部だけを微分するとスコアは $-1/\theta$ となり、期待値は

$$
E_\theta[-1/\theta]=-1/\theta\ne0.
$$

したがって通常の正則Cramér–Rao理論の条件が破れており、その公式を機械的に適用してはならない。

## 本番答案

$$
L(\theta;x)=\theta^{-n}\boldsymbol{1}_{\{M<\theta\}}\prod_i\boldsymbol{1}_{\{x_i>0\}}
$$

で、$\theta\ge M$ では単調減少だから $\hat\theta=M$。

独立性から

$$
P(M\le m)=(m/\theta)^n,
\quad
f_M(m)=nm^{n-1}/\theta^n.
$$

よって積分して

$$
E[M]=\frac n{n+1}\theta,
\qquad
Var(M)=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

従って

$$
\tilde\theta=\frac{n+1}{n}M,
\quad
Var(\tilde\theta)=\frac{\theta^2}{n(n+2)}.
$$

通常の **Cramér–Rao不等式**は共通支持等の正則条件を使うが、本問は支持 $(0,\theta)$ が母数依存で、通常のスコア平均0の議論も壊れる。

## 採点基準

- 最尤推定量: 5点
- 最大値累積分布関数・密度・モーメント: 6点
- 不偏化・分散: 5点
- Cramér–Raoの定理名・壊れる条件の特定: 4点
