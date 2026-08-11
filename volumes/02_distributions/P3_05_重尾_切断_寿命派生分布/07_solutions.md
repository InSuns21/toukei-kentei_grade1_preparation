# 詳細解答

## P3T-A01--A04

- **A01**: $P(X>4)=(2/4)^3=1/8$。
- **A02**: 平均は $\alpha>1$、分散は $\alpha>2$。
- **A03**: $f(x)=S'(x)(-1)=e^{-x/5}/5$、$h=f/S=1/5$、$H=x/5$。
- **A04**: $m(x)=\int_x^\infty e^{-u/4}du/e^{-x/4}=4$。

## P3T-B01

1. $S(x)=\int_x^\infty\alpha x_m^\alpha u^{-(\alpha+1)}du=(x_m/x)^\alpha$。
2. $E[X^r]=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}dx=\alpha x_m^r/(\alpha-r)$（$r<\alpha$）。$r\geq\alpha$では発散。
3. $\alpha=3$ では $E[X]=3x_m/2$、$E[X^2]=3x_m^2$、$\operatorname{Var}(X)=3x_m^2/4$。

## P3T-B02

1. $x\le\mu$ では $F(x)=\tfrac12e^{(x-\mu)/b}$、$x>\mu$ では $F(x)=1-\tfrac12e^{-(x-\mu)/b}$。各半分の積分は $1/2$ なので合計1。
2. 対称性で $E[X]=\mu$。$Y=X-\mu$ と置くと $E[Y^2]=2b^2$、従って分散は $2b^2$。
3. $P(|X-\mu|>t)=2\int_t^\infty(2b)^{-1}e^{-u/b}du=e^{-t/b}$。

## P3T-B03

1. $u\geq0$ で $P(U\leq u)=P(X\leq\sigma\sqrt{2u})=1-e^{-u}$、$u<0$ では0。
2. $u\ge0$ では $P(U\le u)=1-e^{-u}$、$u<0$ では0。これは指数分布Exp$(1)$ のCDFなので $U\sim\operatorname{Exp}(1)$。
3. $E[X]=\sigma\sqrt{2}E[\sqrt U]=\sigma\sqrt{\pi/2}$。

## P3T-B04

1. $0\leq x\leq c$ で $f_{tr}(x)=\lambda e^{-\lambda x}/(1-e^{-\lambda c})$。
2. $F_{tr}(t)=(1-e^{-\lambda t})/(1-e^{-\lambda c})$。
3. $c\to\infty$ で分母は1となり、$f_{tr}(x)\to\lambda e^{-\lambda x}$。

## P3T-C01

1. $t<x_m$ なら $P(M>t)=1$。$t\ge x_m$ なら $P(M>t)=P(X_1>t,\ldots,X_n>t)=S(t)^n=(x_m/t)^{n\alpha}$。
2. $t<x_m$ では $f_M(t)=0$、$t\ge x_m$ では微分して $f_M(t)=n\alpha x_m^{n\alpha}t^{-(n\alpha+1)}$。
3. $n\alpha>1$ のとき、$M$ はPareto$(x_m,n\alpha)$ なので $E[M]=n\alpha x_m/(n\alpha-1)$（この条件がないと平均は発散する）。
4. 尤度は $L(x_m)=\prod_i\alpha x_m^\alpha x_i^{-(\alpha+1)}\boldsymbol1_{\{x_m\leq M\}}$。従って $\widehat x_m=M$。
5. $n\alpha>1$ のとき、$E[M]=x_m n\alpha/(n\alpha-1)$ より $((n\alpha-1)/(n\alpha))M$ は $x_m$ の不偏推定量。

## P3T-C02

1. $S=e^{-(x/\eta)^c}$、$f=cx^{c-1}\eta^{-c}e^{-(x/\eta)^c}$、$h=cx^{c-1}/\eta^c$、$H=(x/\eta)^c$。
2. $c>1$ は増加、$c=1$ は一定、$c<1$ は減少。
3. $c=1$ は指数分布なので $m(x)=\eta$。
4. $S(5)=e^{-1}$、$H(5)=1$、$h(5)=2/5$。
5. 増加ハザードとは、長く生き残った個体ほど次の短い区間で故障しやすいこと。

## P3T-C03
Laplaceの正規化は $\int_0^\infty(2b)^{-1}e^{-u/b}du=1/2$ を左右で足す。$Y=X-\mu$ と置けば
$$E[Y^2]=2\int_0^\infty y^2(2b)^{-1}e^{-y/b}dy=2b^2.$$
Rayleighでは $U\sim\operatorname{Exp}(1)$ より
$$E[X]=\sigma\sqrt2\int_0^\infty u^{1/2}e^{-u}du=\sigma\sqrt2\,\Gamma(3/2)=\sigma\sqrt{\pi/2}.$$

1. $L(\lambda)=\lambda^2e^{-\lambda(t_1+t_2+c_1+c_2)}$。
2. $T=t_1+t_2+c_1+c_2$ と置くと $\ell=2\log\lambda-\lambda T$、よって $\widehat\lambda=2/T$。
3. 打切りを故障とすれば、生存確率 $S(c)$ を密度 $f(c)$ に置き換えるため、尤度中の $\lambda$ の次数が増え、故障件数を過大に数える。その結果、率を過大推定しやすい。
4. 新しい故障 $t_3$ を加えると $L=\lambda^3e^{-\lambda(T+t_3)}$。
5. 全て打切りなら尤度は $e^{-\lambda\sum c_i}$。母数空間を $\lambda>0$ とすると $\lambda\downarrow0$ で上限に近づくが最大値は取らず、内部の最尤推定量は存在しない（$\lambda=0$ を許す拡張なら境界解）。

## P3T-C04

1. $L(\mu,b)=(2b)^{-n}\exp[-\sum_i|x_i-\mu|/b]$。
2. $b$ 固定なら対数尤度最大化は $\sum_i|x_i-\mu|$ 最小化なので標本中央値。
3. $\mu$ 固定なら、$\sum_i|x_i-\mu|>0$ の通常の場合に微分して $\widehat b=n^{-1}\sum_i|x_i-\mu|$。全ての $x_i=\mu$ なら尤度は $b\downarrow0$ で発散し、$b>0$ 内のMLEは存在しない。
4. 平均は二乗偏差、中央値は絶対偏差を最小化する。
5. 絶対偏差は極端な一値の影響が二乗偏差より小さい。

## P3T-C05

1. (A)は $x\leq c$ で $f(x)/F(c)$。
2. (B)は故障なら $f(t)$、打切りなら $S(c)$。
3. (A)は採用条件 $X\leq c$ で条件付けて再正規化する。(B)は全員を追跡し、故障しなかった情報 $X>c$ も生存確率として使う。
4. 小さい $c$ では長寿の個体を区別できず、尾の情報が失われる。
5. 追跡費用、調査期間、故障しない個体の情報、推定したい尾確率を比較する。具体的な未知率モデルでは、打切りを故障と誤認すると $S(c)$ を $f(c)$ に置換し、下記のように故障率を過大推定する。

右切断密度は一般に
$$f(x\mid X\le4)=\frac{\lambda e^{-\lambda x}}{1-e^{-4\lambda}},\qquad f(2\mid X\le4)=\frac{\lambda e^{-2\lambda}}{1-e^{-4\lambda}}.$$
右打切りの寄与は $f_\lambda(2)$ と $S_\lambda(4)$。未知 $\lambda$ で故障2・打切り4なら正しい尤度は $L(\lambda)=\lambda e^{-6\lambda}$、$\widehat\lambda=1/6$、従って $\widehat S(4)=e^{-2/3}$。打切りを故障と誤認した尤度は $\widetilde L(\lambda)=\lambda^2e^{-6\lambda}$、$\widetilde\lambda=1/3$、従って $\widetilde S(4)=e^{-4/3}<e^{-2/3}$ となる。

## P3T-D01

1. $y_i=\min(X_i,c_i)$ とおけば $S_\eta(y_i)=e^{-(y_i/\eta)^c}$、$f_\eta(y_i)=cy_i^{c-1}\eta^{-c}e^{-(y_i/\eta)^c}$（$\delta_i=1$ のとき）。
2. $L(\eta)=\prod_i f_\eta(y_i)^{\delta_i}S_\eta(c_i)^{1-\delta_i}$。
3. 故障数を $d=\sum_i\delta_i>0$、$y_i=\min(X_i,c_i)$、全寄与を $A=\sum_i\{\delta_i y_i^c+(1-\delta_i)c_i^c\}$ とおく。すると $\ell(\eta)=\text{const}-dc\log\eta-A/\eta^c$。微分を0にして $\widehat\eta^c=A/d$、すなわち $\widehat\eta=(A/d)^{1/c}$。
4. $h(t)=ct^{c-1}/\eta^c$ なので $c>1$ 増加、$c=1$ 一定、$c<1$ 減少。
5. $c=1$ では $m(x)=\eta$。$c=2$ では
$$m(x)=e^{(x/\eta)^2}\int_x^\infty e^{-(u/\eta)^2}\,du,$$
であり、$m'(x)=h(x)m(x)-1<0$（この Weibull のハザード増加）なので残存時刻が長いほど平均残存寿命は短くなる。なお $d=0$（全件打切り）なら $\eta$ の内部MLEは存在せず、$\eta\to\infty$ 方向の境界極限だけがある。

## 本番答案・採点基準

Level Cは各25点、Dは25点。C01は3分で最小値の生存関数、15分で密度・期待値、25分でMLEと不偏補正。C02は3分で$S$、15分で$h,H$、25分で故障率解釈。C03は3分で故障/打切りの区別、15分で尤度、25分でMLE。C04は3分で絶対偏差、15分で尤度、25分で尺度推定。C05は3分で切断/打切りの定義、15分で各尤度寄与、25分で情報比較。D01は15分で尤度、25分で尺度推定、40分で平均残存寿命の解釈まで進める。

採点は、分布式・台5点、主要導出8点、推定またはハザード6点、解釈・検算4点、結論2点を基本とし、式を残した部分答案にも配点する。

### C/Dの答案チェック表

| ID | 方針・仮定 | 必須の計算 | 結論・検算 | 25分時点 |
|---|---|---|---|---|
| P3T-C01 | 独立Pareto、$n\alpha>1$ | $P(M>t)$、$f_M$、$E[M]$ | 不偏補正を代入して期待値を1行確認 | MLEまで |
| P3T-C02 | Weibull $c,\eta>0$ | $S,f,h,H,m$ | $c=1,2$ の値を代入検算 | 解釈まで |
| P3T-C03 | 故障と右打切りを区別 | $L=\prod f^{\delta}S^{1-\delta}$、微分 | 全打切りは $\lambda>0$ 内でMLEなし（拡張空間なら境界0） | MLEまで |
| P3T-C04 | Laplaceの中央値と尺度 | 絶対偏差尤度、$b$ 微分 | 中央値・平均の頑健性を確認 | 尺度まで |
| P3T-C05 | 未知 $\lambda$、故障2・打切り4 | $\lambda e^{-6\lambda}$ と $\lambda^2e^{-6\lambda}$、右切断密度 | $\widehat\lambda=1/6,1/3$ と $S(4)$ 比較 | 数値比較まで |
| P3T-D01 | $y_i=\min(X_i,c_i)$、$d=\sum\delta_i>0$、$A=\sum[\delta_i y_i^c+(1-\delta_i)c_i^c]$ | 右打切り尤度、対数微分 | $\widehat\eta^c=A/d$ とハザード解釈 | 25分で推定量 |

## 完成形本番答案（詳細解答とは分離）

- **P3T-C01**: $P(M>t)=S(t)^n$（$t<x_m$ では1）、$f_M(t)=n\alpha x_m^{n\alpha}t^{-n\alpha-1}$、$E[M]=n\alpha x_m/(n\alpha-1)$（$n\alpha>1$）。尤度は $x_m\le M$ の範囲で比例しMLEは $M$。従って $((n\alpha-1)/(n\alpha))M$ は $x_m$ の不偏推定量。
- **P3T-C02**: $S=e^{-(x/\eta)^c}$、$f=cx^{c-1}\eta^{-c}S$、$h=cx^{c-1}/\eta^c$、$H=(x/\eta)^c$、$m(x)=\int_x^\infty S(u)du/S(x)$。$c>1$ 増加、$c=1$ 一定、$c<1$ 減少。$c=2,\eta=5$ では $S(5)=e^{-1},H(5)=1,h(5)=2/5$。ハザード増加は長寿個体ほど直後の故障率が高いことを意味する。
- **P3T-C03**: $L=\lambda^2e^{-\lambda(t_1+t_2+c_1+c_2)}$、$T=t_1+t_2+c_1+c_2$ とおけば $\widehat\lambda=2/T$。追加故障 $t_3$ なら $L$ の次数は3。打切りを故障と誤認すると故障件数を過大に数え率を過大推定する。全打切りなら $\lambda>0$ 内でMLEなし。
- **P3T-C04**: 尤度 $L=(2b)^{-n}e^{-\sum|x_i-\mu|/b}$。$\widehat\mu$ は標本中央値、$\widehat b=n^{-1}\sum|x_i-\mu|$（通常の場合）。平均は二乗偏差、中央値は絶対偏差を最小化し外れ値に頑健。全 $x_i=\mu$ なら $b\downarrow0$ でMLEなし。
- **P3T-C05**: 切断は $f(x)/F(c)$、打切りは故障時 $f(t)$・生存時 $S(c)$。未知 $\lambda$ で故障2・打切り4なら $\widehat\lambda=1/6$、誤処理では $1/3$、従って $S(4)$ は $e^{-2/3}$ から $e^{-4/3}$ へ過小推定される。実務上は追跡費用と尾確率の推定目的を比較して方式を選ぶ。
- **P3T-D01**: $y_i=\min(X_i,c_i)$、$S_\eta(y_i)=e^{-(y_i/\eta)^c}$、$f_\eta(y_i)=cy_i^{c-1}\eta^{-c}S_\eta(y_i)$、$L=\prod f_\eta(y_i)^{\delta_i}S_\eta(c_i)^{1-\delta_i}$。$d=\sum\delta_i>0$、$A=\sum[\delta_i y_i^c+(1-\delta_i)c_i^c]$ とおけば $\widehat\eta^c=A/d$。$m(x)=\int_x^\infty S(u)du/S(x)$。$c=2$ では $m'(x)=h(x)m(x)-1<0$（$\int_a^\infty e^{-v^2}dv<e^{-a^2}/(2a)$）。ハザードは $c>1$ 増加、$c=1$ 一定、$c<1$ 減少。
