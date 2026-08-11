# 30分ドリル

- 制限時間: 30分
- 目標: 混合モデルのモーメントから推定量の不偏性・分散・一致性へ進む
- level: C

## 過去問傾向との対応

MATH-2023-Q1とMATH-2023-Q3の「モーメント導出を統計量の評価へ再利用する」連鎖を校正対象とする。混合集団と数値は独自である。一致性に必要なChebyshev不等式は問題文で与える。

## P2-DRILL-02 問題

$H\in\{0,1\}$で$P(H=1)=p$、$0<p<1$とし、$I=\boldsymbol{1}_{\{H=1\}}$とおく。条件付きモーメントは
$$
E[X\mid H=0]=1,\quad \operatorname{Var}(X\mid H=0)=2,\qquad
E[X\mid H=1]=4,\quad \operatorname{Var}(X\mid H=1)=1
$$
である。この混合分布から$X_1,\ldots,X_n$を独立同分布に得て、$\overline X=n^{-1}\sum_iX_i$とする。

1. $E[X]$を$p$で表せ。（15点）
2. 全分散公式で$\operatorname{Var}(X)$を$p$で表せ。（25点）
3. $\operatorname{Cov}(X,I)$を求め、符号を説明せよ。（15点）
4. $\widehat p=(\overline X-1)/3$が$p$の不偏推定量であることを示し、分散を求めよ。（25点）
5. $P(|\widehat p-p|\geq\varepsilon)\leq\operatorname{Var}(\widehat p)/\varepsilon^2$を用い、任意の$\varepsilon>0$でこの確率が0へ収束することを示せ。（20点）

## 詳細解答

全期待値公式より
$$
E[X]=(1-p)1+p4=1+3p.
$$
全分散の群内成分は
$$
E\{\operatorname{Var}(X\mid H)\}=2(1-p)+p=2-p.
$$
群間成分は
$$
\begin{aligned}
\operatorname{Var}\{E(X\mid H)\}
&=(1-p)\{1-(1+3p)\}^2+p\{4-(1+3p)\}^2\\
&=9p^2(1-p)+9p(1-p)^2=9p(1-p).
\end{aligned}
$$
従って
$$
\operatorname{Var}(X)=2-p+9p(1-p)=2+8p-9p^2.
$$

$XI=0$ on $H=0$、$XI=X$ on $H=1$なので$E[XI]=4p$。よって
$$
\operatorname{Cov}(X,I)=4p-(1+3p)p=3p(1-p)>0.
$$
群1の条件付き平均が群0より大きいことと符号が一致する。

独立同分布性と期待値の線形性から
$$
E[\widehat p]=\frac{E[\overline X]-1}{3}=\frac{1+3p-1}{3}=p.
$$
また
$$
\operatorname{Var}(\widehat p)
=\frac19\operatorname{Var}(\overline X)
=\frac{2+8p-9p^2}{9n}.
$$
$0<p<1$では分子は有限なので、任意の$\varepsilon>0$について
$$
P(|\widehat p-p|\geq\varepsilon)
\leq\frac{2+8p-9p^2}{9n\varepsilon^2}\longrightarrow0.
$$

## 完成形の本番答案

$$
E[X]=1+3p,\qquad
\operatorname{Var}(X)=(2-p)+9p(1-p)=2+8p-9p^2.
$$
$E[XI]=4p$より$\operatorname{Cov}(X,I)=4p-(1+3p)p=3p(1-p)>0$。

$\widehat p=(\overline X-1)/3$について
$$
E[\widehat p]=p,\qquad
\operatorname{Var}(\widehat p)=\frac{2+8p-9p^2}{9n}.
$$
従ってChebyshev不等式から
$$
P(|\widehat p-p|\geq\varepsilon)
\leq\frac{2+8p-9p^2}{9n\varepsilon^2}\to0.
$$

## 採点基準・時間配分・選択判断

全期待値15点、全分散25点、共分散15点、不偏性・分散25点、確率収束20点。初動3分、(1)3分、(2)7分、(3)4分、(4)7分、(5)3分、見直し3分。15分で全分散まで進めば継続し、25分では不偏性と$1/n$型分散を優先して残す。前半で分散整理を落としても、(4)(5)では$\operatorname{Var}(X)$を記号のまま使って部分点を取れる。

## 復習カード

1. 全期待値は群平均の加重平均。
2. 全分散は群内分散と群間分散の和。
3. 指示変数との積は条件付き期待値で処理する。
4. 推定対象を先に明記する。
5. 不偏性は期待値を直接計算する。
6. 独立標本平均の分散は$1/n$倍。
7. Chebyshev不等式は分散から確率収束を示す。
8. 分散が$O(1/n)$なら固定誤差を超える確率は0へ向かう。
9. 前半のモーメントを後半の推定量評価へ再利用する。
10. 条件付き量と周辺量を区別する。
