# Advanced 07 2変量正規・選択後モーメント

- 旧No.: 35
- 層: Advanced
- 演習価値: B
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

> **関連問題**  
> 本問で使う切断正規分布の平均・分散は、[Advanced 02 切断正規・平均・分散](23_truncated_normal_moments.md)で積分から導出している。ここではその結果を再利用し、2変量正規の選択後モーメントに集中する。

## 問題

$(X,Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布とする。$X>a$ の個体だけを選択する。標準正規密度・分布関数をそれぞれ $\phi,\Phi$ とし、

$$
\lambda(a)=\frac{\phi(a)}{1-\Phi(a)}
$$

とする。また、切断正規について

$$
E[X\mid X>a]=\lambda(a),
$$

$$
\operatorname{Var}(X\mid X>a)
=1+a\lambda(a)-\lambda(a)^2
$$

を用いてよい。

1. $E[Y\mid X>a]$ を求めよ。
2. $\operatorname{Var}(Y\mid X>a)$ を求めよ。
3. $\operatorname{Cov}(X,Y\mid X>a)$ を求めよ。
4. 選択が相関構造を変える理由を説明せよ。

## 詳細解答

### 準備1: 2変量正規を残差表示する

まず $|\rho|<1$ とし

$$
\varepsilon
=\frac{Y-\rho X}{\sqrt{1-\rho^2}}
$$

と置く。$(X,\varepsilon)$ は $(X,Y)$ の線形変換なので同時正規である。

共分散は

$$
\begin{aligned}
\operatorname{Cov}(X,\varepsilon)
&=\frac{\operatorname{Cov}(X,Y)-\rho\operatorname{Var}(X)}
{\sqrt{1-\rho^2}}\\
&=\frac{\rho-\rho}{\sqrt{1-\rho^2}}\\
&=0.
\end{aligned}
$$

また

$$
\begin{aligned}
\operatorname{Var}(\varepsilon)
&=\frac{\operatorname{Var}(Y-\rho X)}{1-\rho^2}\\
&=\frac{1+\rho^2-2\rho^2}{1-\rho^2}\\
&=1.
\end{aligned}
$$

同時正規分布では無相関なら独立だから

$$
\varepsilon\perp X,
\qquad
\varepsilon\sim N(0,1).
$$

従って

$$
\boxed{
Y=\rho X+\sqrt{1-\rho^2}\,\varepsilon
}
$$

と書ける。

$\rho=\pm1$ は退化ケースであり、最終式を直接代入して読むことも、$|\rho|<1$ からの極限として読むこともできる。

### 準備2: なぜ $X>a$ で条件付けても $\varepsilon$ の分布は変わらないのか

ここは「条件付けをしても独立性は常に保存される」という一般則ではない。本問で保存される理由は、**条件付ける事象 $A=\{X>a\}$ が $X$ だけで決まる**からである。

$\varepsilon\perp X$ なので、$\varepsilon$ に関する任意の事象 $B$ と、$X$ に関する任意の事象 $C$ について

$$
P(\varepsilon\in B,\,X\in C)
=P(\varepsilon\in B)P(X\in C).
$$

特に $C$ を $C\cap A$ に置き換えると

$$
P(\varepsilon\in B,\,X\in C,\,A)
=P(\varepsilon\in B)P(X\in C,\,A).
$$

$P(A)>0$ で割れば

$$
P(\varepsilon\in B,\,X\in C\mid A)
=P(\varepsilon\in B)P(X\in C\mid A).
$$

したがって、$A=\{X>a\}$ で条件付けた後でも

$$
\varepsilon\perp X\mid X>a
$$

であり、さらに

$$
\varepsilon\mid X>a\sim N(0,1).
$$

よって

$$
E[\varepsilon\mid X>a]=0,
\qquad
\operatorname{Var}(\varepsilon\mid X>a)=1.
$$

一方、関連問題の切断正規の結果から

$$
E[X\mid X>a]=\lambda(a),
$$

$$
V_a
:=\operatorname{Var}(X\mid X>a)
=1+a\lambda(a)-\lambda(a)^2.
$$

以下ではこの2つを使う。

### 1. 条件付き平均

残差表示を条件付き期待値に入れると

$$
\begin{aligned}
E[Y\mid X>a]
&=E\left[
\rho X+\sqrt{1-\rho^2}\,\varepsilon
\mid X>a
\right]\\
&=\rho E[X\mid X>a]
+\sqrt{1-\rho^2}E[\varepsilon\mid X>a]\\
&=\boxed{\rho\lambda(a)}.
\end{aligned}
$$

### 2. 条件付き分散

条件付け後も $X$ と $\varepsilon$ は独立なので条件付き共分散は0である。従って

$$
\begin{aligned}
\operatorname{Var}(Y\mid X>a)
&=\operatorname{Var}\left(
\rho X+\sqrt{1-\rho^2}\,\varepsilon
\mid X>a
\right)\\
&=\rho^2\operatorname{Var}(X\mid X>a)
+(1-\rho^2)\operatorname{Var}(\varepsilon\mid X>a)\\
&=\boxed{\rho^2V_a+1-\rho^2}.
\end{aligned}
$$

### 3. 条件付き共分散

$$
\begin{aligned}
\operatorname{Cov}(X,Y\mid X>a)
&=\operatorname{Cov}\left(
X,\rho X+\sqrt{1-\rho^2}\varepsilon
\mid X>a
\right)\\
&=\rho\operatorname{Var}(X\mid X>a)
+\sqrt{1-\rho^2}\operatorname{Cov}(X,\varepsilon\mid X>a)\\
&=\boxed{\rho V_a}.
\end{aligned}
$$

### 4. 選択が相関構造を変える理由

選択前は

$$
\operatorname{Var}(X)=1,
\qquad
\operatorname{Var}(Y)=1,
\qquad
\operatorname{Cov}(X,Y)=\rho.
$$

しかし $X>a$ という選択をすると、$X$ の分散は $V_a$ に変わる。その結果

$$
\operatorname{Cov}(X,Y\mid X>a)=\rho V_a,
$$

$$
\operatorname{Var}(Y\mid X>a)
=\rho^2V_a+1-\rho^2
$$

となる。したがって選択後の相関係数は

$$
\operatorname{Corr}(X,Y\mid X>a)
=
\frac{\rho V_a}
{\sqrt{V_a\{\rho^2V_a+1-\rho^2\}}},
$$

すなわち

$$
\boxed{
\operatorname{Corr}(X,Y\mid X>a)
=
\frac{\rho\sqrt{V_a}}
{\sqrt{\rho^2V_a+1-\rho^2}}
}
$$

で、一般には元の $\rho$ と一致しない。

ポイントは、$Y$ のうち $X$ と共有する成分 $\rho X$ は選択の影響を受ける一方、独立残差 $\varepsilon$ の分布は変わらないことである。

## 本番答案

$|\rho|<1$ とし

$$
\varepsilon=\frac{Y-\rho X}{\sqrt{1-\rho^2}}
$$

と置く。$(X,\varepsilon)$ は同時正規で、

$$
\operatorname{Cov}(X,\varepsilon)=0,
\qquad
\operatorname{Var}(\varepsilon)=1
$$

より $\varepsilon\perp X$。従って

$$
Y=\rho X+\sqrt{1-\rho^2}\varepsilon.
$$

$A=\{X>a\}$ は $X$ だけで決まるので、$\varepsilon\perp X$ の因数分解を $A$ で条件付けても

$$
\varepsilon\perp X\mid A,
\qquad
\varepsilon\mid A\sim N(0,1)
$$

が保たれる。

切断正規より

$$
E[X\mid A]=\lambda(a),
\qquad
V_a=1+a\lambda(a)-\lambda(a)^2.
$$

したがって

$$
E[Y\mid A]=\rho\lambda(a),
$$

$$
\operatorname{Var}(Y\mid A)=\rho^2V_a+1-\rho^2,
$$

$$
\operatorname{Cov}(X,Y\mid A)=\rho V_a.
$$

選択により $X$ の分散だけが $1$ から $V_a$ へ変わるため、共分散・$Y$ の分散も変わり、相関係数も一般には $\rho$ と一致しない。

## 採点基準

- 回帰・残差表示の導出: 4点
- $X>a$ で条件付けた後の独立性を根拠付きで確認: 4点
- 条件付き平均: 3点
- 条件付き分散: 4点
- 条件付き共分散・選択効果: 5点
