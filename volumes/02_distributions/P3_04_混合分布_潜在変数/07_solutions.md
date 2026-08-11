# 詳細解答

## P3L-A01--A04

- **A01**: 全確率より $P(X=0)=0.4\cdot0.2+0.6\cdot0.5=0.38$。
- **A02**: $E[X]=\frac14\cdot2+\frac34\cdot6=5$。
- **A03**: 群内項は $(1+4)/2=5/2$、群間項は $(1/2)(1/2)(0-2)^2=1$。したがって $\operatorname{Var}(X)=7/2$。
- **A04**: 分母は $(1/3)(1/2)+(2/3)(1/4)=1/3$。よって $P(Z=1\mid X=x)=(1/6)/(1/3)=1/2$。

## P3L-B01

1. 条件付き質量を足して
$$P(X=k)=\frac13e^{-1}\frac{1}{k!}+\frac23e^{-4}\frac{4^k}{k!}.$$
2. 全期待値より $E[X]=(1/3)1+(2/3)4=3$。
3. 群内項は $(1/3)1+(2/3)4=3$。群間項は $(1/3)(2/3)(1-4)^2=2$。したがって $\operatorname{Var}(X)=5$。

## P3L-B02

1. 定義を代入して
$$P(X=k)=\int_0^\infty e^{-\lambda}\frac{\lambda^k}{k!}\frac{3^2}{\Gamma(2)}\lambda e^{-3\lambda}\,d\lambda.$$
2. 被積分関数をまとめると $9/[k!\Gamma(2)]\,\lambda^{k+1}e^{-4\lambda}$。Gamma積分 $\int_0^\infty\lambda^{k+1}e^{-4\lambda}d\lambda=\Gamma(k+2)/4^{k+2}$ より結論を得る。
3. P3L-THM-02から $E[X]=2/3$、$\operatorname{Var}(X)=2/3+2/9=8/9$。

## P3L-B03

1. $E[X]=3(1-\pi)$。全分散は $1+\pi(1-\pi)9$。
2. $\pi(1-\pi)>0$、すなわち $0<\pi<1$ のとき1より大きい。
3. $3(1-\pi)=1$ より $\pi=2/3$。

## P3L-B04

1. $\tau_1(x)=\phi(x)/\{\phi(x)+3\phi(x-3)\}$。
2. $\tau_1(0)=\phi(0)/\{\phi(0)+3\phi(-3)\}$。一方
$$\tau_1(3)=\frac{\phi(3)}{\phi(3)+3\phi(0)}
=\frac{e^{-9/2}}{e^{-9/2}+3}\approx0.00369.$$
したがって $\tau_1(0)>\tau_1(3)$。
3. $\phi(3/2)=\phi(-3/2)$ なので、$\tau_1(3/2)=(1/4)/(1/4+3/4)=1/4$。尤度が等しい点でも事前重みが $1/4:3/4$ であるため、$1/2$ にはならない。

## P3L-C01

1. P3L-THM-02より
$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
2. 全期待値で $E[X_i]=E[\Lambda_i]=\alpha/\beta$。全分散で $\operatorname{Var}(X_i)=\alpha/\beta+\alpha/\beta^2$。
3. 独立性と線形性から $E[\bar X]=n^{-1}\sum_iE[X_i]=\alpha/\beta$。
4. $E[X_i]=\alpha/\beta$ を $\alpha$ について解き、$\widehat\alpha=\beta\bar X$。
5. $\operatorname{Var}(\bar X)=\{\alpha/\beta+\alpha/\beta^2\}/n$。Chebyshevより
$$P(|\bar X-\alpha/\beta|\geq\varepsilon)\leq\frac{\alpha(\beta+1)}{n\beta^2\varepsilon^2}\to0.$$

## P3L-C02

1. $P(X=3)=\pi e^{-2}2^3/3!+(1-\pi)e^{-5}5^3/3!$。
2. $\tau_1=\dfrac{\pi e^{-2}2^3}{\pi e^{-2}2^3+(1-\pi)e^{-5}5^3}$。
3. 条件付き独立性より $P(Y=0\mid X=3)=\tau_1e^{-2}+(1-\tau_1)e^{-5}$。
4. $\pi=1/2$ なら $\tau_1=8e^3/(8e^3+125)$、従って $P(Y=0\mid X=3)=\dfrac{8e^3e^{-2}+125e^{-5}}{8e^3+125}=\dfrac{8e+125e^{-5}}{8e^3+125}$。
5. $X=3$ が成分の尤度を変えるため、観測後の成分確率は事前比 $\pi:(1-\pi)$ から更新される。

## P3L-C03

1. $\tau_2(x)=\phi(x-1)/\{\phi(x+1)+\phi(x-1)\}$。
2. $\phi(x-1)>\phi(x+1)\iff (x-1)^2<(x+1)^2\iff x>0$。したがって範囲は $x>0$。
3. $Z=1$ のとき誤りは $X>0$、$Z=2$ のときは $X\leq0$。対称性から $P(\mathrm{error})=\Phi(-1)$。
4. $E[X]=0$、$\operatorname{Var}(X)=1+(1/2)(1/2)(2)^2=2$。
5. $E[X]=\pi(-1)+(1-\pi)1=1-2\pi$ より、モーメント方程式から得られる形式的な推定量は $\widehat\pi_0=(1-\bar X)/2$。母数空間 $[0,1]$ に制約するなら $\widehat\pi=\min\{1,\max\{0,\widehat\pi_0\}\}$。

## P3L-C04

1. $L_c=\prod_i\{\pi f_1(x_i)\}^{\boldsymbol1_{\{z_i=1\}}}\{(1-\pi)f_2(x_i)\}^{\boldsymbol1_{\{z_i=2\}}}$。
2. $n_1=\sum_i\boldsymbol1_{\{z_i=1\}}$ とすれば $\ell(\pi)=n_1\log\pi+(n-n_1)\log(1-\pi)+\text{const}$。$0<n_1<n$ なら微分を0にして $\widehat\pi=n_1/n$。$n_1=0$ なら最大値は境界 $\widehat\pi=0$、$n_1=n$ なら $\widehat\pi=1$ である。
3. $L=\prod_i[\pi f_1(x_i)+(1-\pi)f_2(x_i)]$。
4. $\tau_{i1}=f_1(x_i)/(f_1(x_i)+f_2(x_i))$。
5. 見えない指示関数の期待値 $E[\boldsymbol1_{\{Z_i=1\}}\mid X_i=x_i]$ が責務 $\tau_{i1}$ なので、完全データの所属数をその期待値で置き換える。

## P3L-C05

1. $\pi f(x;\mu_1)+(1-\pi)f(x;\mu_2)=(1-\pi)f(x;\mu_2)+\pi f(x;\mu_1)$。成分名だけが入れ替わる。
2. $\mu_1<\mu_2$ を課すと交換後の並びが条件を満たさないため、同じ分布を二重に表さない。
3. $E[X]=\pi\mu_1+(1-\pi)\mu_2$、$\operatorname{Var}(X)=1+\pi(1-\pi)(\mu_1-\mu_2)^2$。
4. 例えば平均0・分散2を考える。$(\pi,\mu_1,\mu_2)=(1/2,-1,1)$ はこれを与える。一方、$\pi=1/4$、$d=4/\sqrt3$、$\mu_1=-3d/4$、$\mu_2=d/4$ とすると平均は $0$、分散は $1+(3/16)d^2=2$ で同じである。従って平均・分散だけでは一意に定まらない。
5. 成分数、分布形の妥当性、ラベル交換、外れ値や分散の異なる成分の有無を確認する。

## P3L-D01

1. C01の導出を一般の $\alpha,\beta$ に戻し、
$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
2. $E[X_i]=\alpha/\beta$、$\operatorname{Var}(X_i)=\alpha/\beta+\alpha/\beta^2$、独立性より $\operatorname{Var}(\bar X)=\alpha(\beta+1)/(n\beta^2)$。
3. $E[\widehat\alpha]=\beta E[\bar X]=\alpha$。さらに $\operatorname{Var}(\widehat\alpha)=\beta^2\operatorname{Var}(\bar X)=\alpha(\beta+1)/n\to0$。Chebyshevより任意の $\varepsilon>0$ で $P(|\widehat\alpha-\alpha|\geq\varepsilon)\to0$。
4. 尤度と事前密度の積は $\lambda^{\alpha+x-1}e^{-(\beta+1)\lambda}$ に比例するので、共有潜在率 $\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1)$。したがって
$$P(Y=0\mid X_1=x)=E[e^{-\Lambda_1}\mid X_1=x]=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}.$$
5. 平均は $\alpha/\beta$ だけなので比しか決めない。分散（または二次モーメント）を追加すれば $\alpha/\beta^2$ も得られ、2母数を分離できる。

## C・D問題の本番答案

### P3L-C01（25分・25点）

周辺化して
$$P(X_i=k)=\frac{\beta^\alpha\Gamma(k+\alpha)}{k!\Gamma(\alpha)(\beta+1)^{k+\alpha}}.$$
全期待値・全分散より
$$E[X_i]=\frac{\alpha}{\beta},\quad \operatorname{Var}(X_i)=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2},\quad \operatorname{Var}(\bar X)=\frac{\alpha(\beta+1)}{n\beta^2}.$$
よって $\widehat\alpha=\beta\bar X$ は不偏で、Chebyshevにより $\bar X\xrightarrow{p}\alpha/\beta$。配点は周辺化6、モーメント6、不偏4、推定4、一致性5点とする。

### P3L-C02（26分・25点）

$$\tau_1=\frac{\pi e^{-2}2^3}{\pi e^{-2}2^3+(1-\pi)e^{-5}5^3},\qquad
P(Y=0\mid X=3)=\tau_1e^{-2}+(1-\tau_1)e^{-5}.$$
$\pi=1/2$ では $\tau_1=8e^3/(8e^3+125)$ を代入する。配点は周辺化5、責務7、予測7、数値代入4、説明2点とする。

### P3L-C03（25分・25点）

$$\tau_2(x)=\frac{\phi(x-1)}{\phi(x+1)+\phi(x-1)},\quad
\tau_2(x)>1/2\iff x>0.$$
誤分類確率は $\Phi(-1)$、平均0、分散2。混合比の形式推定量は $\widehat\pi_0=(1-\bar X)/2$、制約付きなら $\widehat\pi=\min\{1,\max\{0,\widehat\pi_0\}\}$。配点は責務6、閾値5、誤分類5、モーメント4、推定5点とする。

### P3L-C04（24分・25点）

$$L_c=\prod_i\{\pi f_1(x_i)\}^{\boldsymbol1_{\{z_i=1\}}}\{(1-\pi)f_2(x_i)\}^{\boldsymbol1_{\{z_i=2\}}},\quad
\widehat\pi=\frac1n\sum_i\boldsymbol1_{\{z_i=1\}},$$
$$L=\prod_i[\pi f_1(x_i)+(1-\pi)f_2(x_i)],\quad
\tau_{i1}=\frac{f_1(x_i)}{f_1(x_i)+f_2(x_i)}.$$
責務は指示関数の条件付き期待値である。配点は完全尤度6、最尤推定5、観測尤度5、責務6、解釈3点とする。

### P3L-C05（25分・25点）

ラベル交換は同じ密度を与える。平均0・分散2の二つの表示 $(\pi,\mu_1,\mu_2)=(1/2,-1,1)$ と $(1/4,-3d/4,d/4)$、$d=4/\sqrt3$ を示せば、平均・分散だけでは識別できない。配点は交換4、制約4、モーメント5、反例8、モデル注意4点とする。

### C問題の時間判断

C01は3分で階層式、15分で周辺化・モーメント、25分で一致性まで進む。C02は3分で責務の分子分母、15分で観測後重み、25分で予測確率まで進む。C03は3分で閾値、15分で誤分類確率、25分で推定量まで進む。C04は3分で完全データ、15分で観測尤度、25分で責務の解釈まで進む。C05は3分でラベル交換、15分でモーメント、25分で具体的非識別例とモデル注意まで進む。

### P3L-D01（40分・25点）

周辺化、全期待値・全分散、$\widehat\alpha=\beta\bar X$ の不偏性・Chebyshev一致性、共有潜在率の事後分布
$$\Lambda_1\mid X_1=x\sim\operatorname{Gamma}(\alpha+x,\beta+1)$$
を順に書き、予測確率を
$$P(Y=0\mid X_1=x)=\left(\frac{\beta+1}{\beta+2}\right)^{\alpha+x}$$
とする。配点は周辺化6、モーメント5、推定6、予測6、識別注意2点とする。15分で1・2、25分で3まで到達し、4・5は式を残して部分点を確保する。

## 全問の解答構造・検算一覧

| ID | 方針 | 使用結果・仮定 | 結論・検算 | 本番答案・採点 |
|---|---|---|---|---|
| P3L-A01 | 全確率を成分ごとに足す | $\pi=0.4$ と条件付き確率 | $0.38\in[0,1]$ | A01の1行答案、7点 |
| P3L-A02 | 全期待値 | 成分比と条件付き平均 | $E[X]=5$ | A02の1行答案、7点 |
| P3L-A03 | 全分散を群内・群間に分解 | 条件付き分散・平均 | $7/2\geq0$ | A03の2行答案、8点 |
| P3L-A04 | Bayes公式 | 分母は全成分の周辺確率 | 責務 $1/2$、成分責務の和を確認 | A04の1行答案、8点 |
| P3L-B01 | 条件付き質量を足し、全分散 | Poissonの平均・分散は率 | $E=3,V=5$、$V\geq E$ を検算 | B01の3小問答案、14点 |
| P3L-B02 | Poisson質量とGamma密度を積分 | Gamma積分、$\alpha=2,\beta=3$ | 負の二項型質量、$E=2/3,V=8/9$ | B02の3小問答案、16点 |
| P3L-B03 | 全期待値・全分散 | 正規成分の分散1 | $E=3(1-\pi),V=1+9\pi(1-\pi)$ | B03の3小問答案、15点 |
| P3L-B04 | 責務をBayes公式に代入 | $\phi(3)=e^{-9/2}\phi(0)$ | $\tau_1(3)\approx0.00369$、確率範囲を確認 | B04の3小問答案、15点 |
| P3L-C01 | 周辺化からモーメント推定へ | 独立同分布、$\beta$既知、Chebyshev | $\widehat\alpha$不偏・確率収束 | C01答案・25点 |
| P3L-C02 | 観測後責務を予測へ再利用 | $Y$ は共有成分を条件に独立 | 責務の和1、予測確率は[0,1] | C02答案・25点 |
| P3L-C03 | 責務の大小を平方距離で比較 | 等分散・等混合比 | 閾値0、誤分類 $\Phi(-1)$、制約付き推定 | C03答案・25点 |
| P3L-C04 | 完全データと観測尤度を分離 | $0<n_1<n$ と境界を場合分け | $n_1/n$ または境界0,1、責務は指示関数の条件付き期待値 | C04答案・25点 |
| P3L-C05 | ラベル交換後と具体的モーメント反例 | $\mu_1<\mu_2$、$d=4/\sqrt3$ | 同じ平均・分散の異なる母数、識別不能 | C05答案・25点 |
| P3L-D01 | 周辺化→モーメント→推定→共有率の予測 | $X_1,Y$ は $\Lambda_1$ を共有 | 事後Gammaと予測確率、平均だけでは比のみ | D01答案・25点 |

各行の結論・検算は詳細解答で示した計算を短く再掲したものであり、本番答案では対応する行を残す。非自明な積分・分散展開・境界・確率収束は詳細解答側で展開し、採点基準は上表とC/D節で一対一に対応する。
