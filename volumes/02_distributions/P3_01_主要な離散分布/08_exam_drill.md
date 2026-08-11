# 30分ドリル

- 制限時間: 30分
- level: C

## 過去問傾向との対応

MATH-2023-Q1とMATH-2022-Q3の「Poissonモデル、条件付き分布、モーメント、推定、一致性」の連鎖を校正対象とする。到着率、分類確率、時間幅は独自である。一致性の判定に使う不等式は問題文で与える。

## P3-DRILL-01 問題

到着は1時間当たり未知の率$\lambda>0$の斉時Poisson過程に従い、各到着は独立に確率$q=1/4$で緊急、$3/4$で通常へ分類される。2時間の総件数を$N$、緊急件数を$U$、通常件数を$V$とする。

任意の有限分散な確率変数$T$と$\varepsilon>0$に対するChebyshev不等式
$$
P(|T-E[T]|\geq\varepsilon)\leq\frac{\operatorname{Var}(T)}{\varepsilon^2}
$$
を用いてよい。

1. $N$の分布、平均、分散と$P(N=3)$を求めよ。（20点）
2. $N=3$の下での$U$の分布と$P(U=1\mid N=3)$を求めよ。（20点）
3. $U,V$の周辺分布を求め、独立性と共分散を示せ。（25点）
4. $\widehat\lambda=N/2$が$\lambda$の不偏推定量であることを示し、分散を求めよ。（20点）
5. 独立な$m$個の2時間区間で得た件数を$N_1,\ldots,N_m$とし、$\widetilde\lambda=(2m)^{-1}\sum_jN_j$とする。Chebyshev不等式を用いて$\widetilde\lambda$が$\lambda$へ確率収束することを示せ。（15点）

## 詳細解答

2時間の平均件数は$2\lambda$なので
$$
N\sim\operatorname{Poisson}(2\lambda),\qquad
E[N]=\operatorname{Var}(N)=2\lambda,\qquad
P(N=3)=e^{-2\lambda}\frac{(2\lambda)^3}{3!}.
$$
$N=3$の下では3件を独立に緊急分類するから
$$
U\mid(N=3)\sim\operatorname{Bin}(3,1/4),\qquad
P(U=1\mid N=3)=\binom31\frac14\left(\frac34\right)^2=\frac{27}{64}.
$$

Poisson thinningにより
$$
U\sim\operatorname{Poisson}(\lambda/2),\qquad
V\sim\operatorname{Poisson}(3\lambda/2).
$$
同時PMFを計算すると
$$
P(U=u,V=v)
=e^{-2\lambda}\frac{(2\lambda)^{u+v}}{(u+v)!}
\binom{u+v}{u}\left(\frac14\right)^u\left(\frac34\right)^v
$$
$$
=e^{-\lambda/2}\frac{(\lambda/2)^u}{u!}
e^{-3\lambda/2}\frac{(3\lambda/2)^v}{v!},
$$
よって独立で$\operatorname{Cov}(U,V)=0$である。

$$
E[\widehat\lambda]=\frac{E[N]}2=\lambda,\qquad
\operatorname{Var}(\widehat\lambda)=\frac{\operatorname{Var}(N)}4=\frac\lambda2.
$$
独立区間について
$$
E[\widetilde\lambda]=\lambda,\qquad
\operatorname{Var}(\widetilde\lambda)
=\frac{1}{4m^2}\sum_{j=1}^m2\lambda=\frac{\lambda}{2m}.
$$
従って任意の$\varepsilon>0$で
$$
P(|\widetilde\lambda-\lambda|\geq\varepsilon)
\leq\frac{\lambda}{2m\varepsilon^2}\longrightarrow0.
$$

## 完成形の本番答案

$N\sim$Poisson$(2\lambda)$、平均分散$2\lambda$、$P(N=3)=e^{-2\lambda}(2\lambda)^3/3!$。条件付きで$U\mid N=3\sim$Bin$(3,1/4)$より$P(U=1\mid N=3)=27/64$。

thinningと同時PMFの因数分解から$U\sim$Poisson$(\lambda/2)$、$V\sim$Poisson$(3\lambda/2)$で独立、共分散0。さらに
$$
E[N/2]=\lambda,\qquad\operatorname{Var}(N/2)=\lambda/2.
$$
$m$区間の推定量は平均$\lambda$、分散$\lambda/(2m)$なので、Chebyshev不等式から$\widetilde\lambda\xrightarrow{p}\lambda$。

## 採点基準・時間配分・選択判断

総件数20点、条件付き二項20点、thinningと独立性25点、不偏推定20点、一致性15点。初動3分、(1)4分、(2)5分、(3)7分、(4)4分、(5)4分、見直し3分。15分で条件付き二項までなら継続し、25分では$E[N/2]$と$m$区間での$1/m$型分散を優先する。(3)の因数分解を完了できなくても周辺分布を書いて後半へ進める。

## 復習カード

1. 時間幅をPoisson平均へ掛ける。
2. 総数条件付き分類は二項分布。
3. thinning後の件数は独立Poisson。
4. 独立性は同時PMFの因数分解で示す。
5. 推定対象の時間単位を合わせる。
6. 不偏性は期待値で確認する。
7. 独立反復の平均は分散を$1/m$へ縮める。
8. Chebyshev不等式で確率収束を示せる。
9. 分布同定を推定量評価へ再利用する。
10. 台とパラメータを答案に残す。
