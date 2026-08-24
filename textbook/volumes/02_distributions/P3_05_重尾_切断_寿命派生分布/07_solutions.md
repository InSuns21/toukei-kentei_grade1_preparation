# 詳細解答

## P3T-A01 Paretoの尾

**方針。** Pareto$(x_m,\alpha)$ の生存関数 $S(x)=(x_m/x)^\alpha$ を使う。

$$
P(X>4)=S(4)=\left(\frac24\right)^3=\frac18.
$$

**検算。** $4$ は下端2の2倍であり、尾確率は $2^{-3}$ まで低下する。

## P3T-A02 モーメント条件

Paretoの $r$ 次モーメントは $r<\alpha$ のときに限り有限である。平均は $r=1$ なので $\alpha>1$、分散には二次モーメントが必要なので $\alpha>2$ が必要十分である。$1<\alpha\leq2$ では平均は有限だが分散は発散する点に注意する。

## P3T-A03 ハザード

$$
f(x)=-S'(x)=-\frac{d}{dx}e^{-x/5}=\frac15e^{-x/5}.
$$
したがって
$$
h(x)=\frac{f(x)}{S(x)}=\frac15,\qquad
H(x)=-\log S(x)=\frac{x}{5}.
$$
検算として $S(x)=e^{-H(x)}$ が元の式に戻る。

## P3T-A04 平均残存寿命

$X\sim\operatorname{Exp}(1/4)$ の生存関数は $S(u)=e^{-u/4}$ である。よって
$$
\begin{aligned}
m(x)
&=\frac{\int_x^\infty S(u)\,du}{S(x)}\\
&=\frac{[-4e^{-u/4}]_x^\infty}{e^{-x/4}}
=\frac{4e^{-x/4}}{e^{-x/4}}=4.
\end{aligned}
$$
$x$ に依存しないことが指数分布の無記憶性に対応する。

## P3T-B01

1. $S(x)=\int_x^\infty\alpha x_m^\alpha u^{-(\alpha+1)}du=(x_m/x)^\alpha$。
2. $r>0$ とする。無限遠での収束条件は $r-\alpha<0$ であり、$r<\alpha$ なら
$$
\begin{aligned}
E[X^r]
&=\alpha x_m^\alpha\int_{x_m}^\infty x^{r-\alpha-1}\,dx\\
&=\alpha x_m^\alpha
\left[\frac{x^{r-\alpha}}{r-\alpha}\right]_{x_m}^\infty
=\frac{\alpha x_m^r}{\alpha-r}.
\end{aligned}
$$
$r=\alpha$ では $1/x$ の積分、$r>\alpha$ では非負べきの積分となるので発散する。
3. $\alpha=3$ では $E[X]=3x_m/2$、$E[X^2]=3x_m^2$、$\operatorname{Var}(X)=3x_m^2/4$。

## P3T-B02

1. $x\leq\mu$ では
$$F(x)=\int_{-\infty}^x\frac1{2b}e^{(u-\mu)/b}\,du=\frac12e^{(x-\mu)/b}.$$
$x>\mu$ では右尾を引いて
$$F(x)=1-\int_x^\infty\frac1{2b}e^{-(u-\mu)/b}\,du
=1-\frac12e^{-(x-\mu)/b}.$$
$F(-\infty)=0$、$F(\infty)=1$、左右の式は $x=\mu$ で $1/2$ に一致する。
密度の正規化も左右に分けると
$$
\int_{-\infty}^{\mu}\frac1{2b}e^{(x-\mu)/b}\,dx=\frac12,
\qquad
\int_{\mu}^{\infty}\frac1{2b}e^{-(x-\mu)/b}\,dx=\frac12,
$$
したがって全積分は1である。
2. $Y=X-\mu$ の密度は偶関数なので $E[Y]=0$。さらに $z=y/b$ と置くと
$$
E[Y^2]=2\int_0^\infty y^2\frac1{2b}e^{-y/b}\,dy
=b^2\int_0^\infty z^2e^{-z}\,dz=2b^2.
$$
従って $E[X]=\mu$、$\operatorname{Var}(X)=2b^2$。
3. $P(|X-\mu|>t)=2\int_t^\infty(2b)^{-1}e^{-u/b}du=e^{-t/b}$。

## P3T-B03

1. $u\geq0$ で $P(U\leq u)=P(X\leq\sigma\sqrt{2u})=1-e^{-u}$、$u<0$ では0。
2. $u\ge0$ では $P(U\le u)=1-e^{-u}$、$u<0$ では0。これは指数分布Exp$(1)$ のCDFなので $U\sim\operatorname{Exp}(1)$。
3. $X=\sigma\sqrt{2U}$ だから
$$
\begin{aligned}
E[X]
&=\sigma\sqrt2\int_0^\infty u^{1/2}e^{-u}\,du\\
&=\sigma\sqrt2\,\Gamma(3/2)
=\sigma\sqrt2\cdot\frac{\sqrt\pi}{2}
=\sigma\sqrt{\frac\pi2}.
\end{aligned}
$$

## P3T-B04

1. $0\leq x\leq c$ で $f_{tr}(x)=\lambda e^{-\lambda x}/(1-e^{-\lambda c})$。
2. $0\leq t\leq c$ では
$$
F_{tr}(t)=P(X\leq t\mid X\leq c)
=\frac{P(X\leq t)}{P(X\leq c)}
=\frac{1-e^{-\lambda t}}{1-e^{-\lambda c}}.
$$
$F_{tr}(0)=0$、$F_{tr}(c)=1$ なので切断後のCDFとして端点も整合する。
3. $c\to\infty$ で分母は1となり、$f_{tr}(x)\to\lambda e^{-\lambda x}$。

## P3T-C01

**方針。** 最小値が $t$ を超える事象を、全標本が $t$ を超える事象へ分解する。その結果を微分して密度を得てから、Pareto分布の形を読み取る。

1. $t<x_m$ なら $P(M>t)=1$。$t\ge x_m$ なら $P(M>t)=P(X_1>t,\ldots,X_n>t)=S(t)^n=(x_m/t)^{n\alpha}$。
2. $t<x_m$ では $f_M(t)=0$、$t\ge x_m$ では微分して $f_M(t)=n\alpha x_m^{n\alpha}t^{-(n\alpha+1)}$。
3. $n\alpha>1$ のとき、$M$ はPareto$(x_m,n\alpha)$ なので $E[M]=n\alpha x_m/(n\alpha-1)$（この条件がないと平均は発散する）。
4. 尤度は
$$
L(x_m)=\alpha^n x_m^{n\alpha}\prod_{i=1}^n x_i^{-(\alpha+1)}
\boldsymbol1_{\{0<x_m\leq M\}}.
$$
許される範囲 $0<x_m\leq M$ で $x_m^{n\alpha}$ は単調増加するため、最大は右端で取り、$\widehat x_m=M$。
5. $n\alpha>1$ のとき、$E[M]=x_m n\alpha/(n\alpha-1)$ より $((n\alpha-1)/(n\alpha))M$ は $x_m$ の不偏推定量。

## P3T-C02

**方針。** $S$ を起点として、$f=-S'$、$h=f/S$、$H=-\log S$ を順に求める。平均残存寿命は尾積分公式から求める。

1. $x>0$ について
$$
\begin{aligned}
S(x)&=e^{-(x/\eta)^c},\\
f(x)&=-S'(x)=\frac{cx^{c-1}}{\eta^c}e^{-(x/\eta)^c},\\
h(x)&=\frac{f(x)}{S(x)}=\frac{cx^{c-1}}{\eta^c},\\
H(x)&=-\log S(x)=\left(\frac{x}{\eta}\right)^c.
\end{aligned}
$$
2. $h'(x)=c(c-1)x^{c-2}/\eta^c$ なので、$c>1$ では増加、$c=1$ では一定、$0<c<1$ では減少する。
3. $c=1$ では $S(u)=e^{-u/\eta}$ だから
$$
m(x)=\frac{\int_x^\infty e^{-u/\eta}\,du}{e^{-x/\eta}}
=\frac{\eta e^{-x/\eta}}{e^{-x/\eta}}=\eta.
$$
4. $c=2,\eta=5,x=5$ を代入すると
$$
S(5)=e^{-(5/5)^2}=e^{-1},\qquad
H(5)=1,\qquad
h(5)=\frac{2\cdot5}{25}=\frac25.
$$
5. 増加ハザードとは、長く生き残った個体ほど次の短い区間で故障しやすいこと。

## P3T-C03

**方針。** 故障時刻には密度、打切り時刻には生存確率を割り当てる。対数尤度を微分した後、二階微分で最大であることを確認する。

1. 故障2件は密度、打切り2件は生存確率を寄与するので
$$
\begin{aligned}
L(\lambda)
&=f_\lambda(t_1)f_\lambda(t_2)S_\lambda(c_1)S_\lambda(c_2)\\
&=(\lambda e^{-\lambda t_1})(\lambda e^{-\lambda t_2})
e^{-\lambda c_1}e^{-\lambda c_2}\\
&=\lambda^2e^{-\lambda(t_1+t_2+c_1+c_2)}.
\end{aligned}
$$
2. $T=t_1+t_2+c_1+c_2$ と置くと
$$
\ell(\lambda)=2\log\lambda-\lambda T,\quad
\ell'(\lambda)=\frac2\lambda-T,\quad
\ell''(\lambda)=-\frac2{\lambda^2}<0.
$$
従って唯一の極大点は $\widehat\lambda=2/T$。
3. 打切りを故障とすれば、生存確率 $S(c)$ を密度 $f(c)$ に置き換えるため、尤度中の $\lambda$ の次数が増え、故障件数を過大に数える。その結果、率を過大推定しやすい。
4. 新しい故障 $t_3$ を加えると $L=\lambda^3e^{-\lambda(T+t_3)}$。
5. 全て打切りなら尤度は $e^{-\lambda\sum c_i}$。母数空間を $\lambda>0$ とすると $\lambda\downarrow0$ で上限に近づくが最大値は取らず、内部の最尤推定量は存在しない（$\lambda=0$ を許す拡張なら境界解）。

## P3T-C04

**方針。** 対数尤度を取り、$\mu$ と $b$ を一方ずつ固定する。$\mu$ については絶対偏差和、$b$ については一変数微分の問題になる。

1. $L(\mu,b)=(2b)^{-n}\exp[-\sum_i|x_i-\mu|/b]$。
2. $b$ 固定なら対数尤度最大化は $\sum_i|x_i-\mu|$ 最小化なので標本中央値。
これを確認する。標本を $x_{(1)}\leq\cdots\leq x_{(n)}$ と並べ、$x_{(k)}<\mu<x_{(k+1)}$ とする。この区間では
$$
\frac{d}{d\mu}\sum_{i=1}^n|x_i-\mu|=k-(n-k)=2k-n.
$$
$k<n/2$ では負、$k>n/2$ では正なので、絶対偏差和は中央値へ向かって減少し、中央値を過ぎると増加する。従って奇数標本では中央の順序統計量、偶数標本では中央2点の間の任意の値が最小化する。
3. $A(\mu)=\sum_i|x_i-\mu|$ と置く。$A(\mu)>0$ なら
$$
\ell(b)=-n\log(2b)-\frac{A(\mu)}b,\qquad
\ell'(b)=-\frac nb+\frac{A(\mu)}{b^2}.
$$
$\ell'(b)=0$ から $\widehat b=A(\mu)/n$。この点より左で $\ell'>0$、右で $\ell'<0$ だから最大である。全ての $x_i=\mu$ なら $A(\mu)=0$ で、尤度は $b\downarrow0$ で発散し、$b>0$ 内のMLEは存在しない。
4. 平均は二乗偏差、中央値は絶対偏差を最小化する。
5. 絶対偏差は極端な一値の影響が二乗偏差より小さい。

## P3T-C05

**方針。** 切断は条件付き標本、打切りは不完全観測である。まず1観測の寄与を分け、その後、同じ数値例で正しい尤度と誤った尤度を比較する。

1. (A)は条件付き標本なので、$F(c)>0$ の下で
$$
f_A(x)=f(x\mid X\leq c)
=\frac{f(x)}{F(c)}\boldsymbol1_{\{x\leq c\}}.
$$
積分すると $\int_{-\infty}^c f(x)\,dx/F(c)=1$ となる。
本問の指数分布へ代入すれば
$$
f_A(x)=\frac{\lambda e^{-\lambda x}}{1-e^{-\lambda c}}
\boldsymbol1_{\{0\leq x\leq c\}}.
$$
2. (B)は、故障時刻 $t\leq c$ を観測した個体なら
$$f_\lambda(t)=\lambda e^{-\lambda t},$$
時刻 $c$ で打切られた個体なら
$$P_\lambda(X>c)=S_\lambda(c)=e^{-\lambda c}$$
が尤度へ寄与する。
3. (A)は採用条件 $X\leq c$ で条件付けて再正規化する。(B)は全員を追跡し、故障しなかった情報 $X>c$ も生存確率として使う。
4. 小さい $c$ では長寿の個体を区別できず、尾の情報が失われる。
5. 追跡費用、調査期間、故障しない個体の情報、推定したい尾確率を比較する。具体的な未知率モデルでは、打切りを故障と誤認すると $S(c)$ を $f(c)$ に置換し、下記のように故障率を過大推定する。

右切断密度は一般に
$$f(x\mid X\le4)=\frac{\lambda e^{-\lambda x}}{1-e^{-4\lambda}},\qquad f(2\mid X\le4)=\frac{\lambda e^{-2\lambda}}{1-e^{-4\lambda}}.$$
右打切りの寄与は $f_\lambda(2)$ と $S_\lambda(4)$ である。従って正しい尤度と対数尤度は
$$
L(\lambda)=(\lambda e^{-2\lambda})e^{-4\lambda}
=\lambda e^{-6\lambda},
\qquad
\ell'(\lambda)=\frac1\lambda-6.
$$
よって $\widehat\lambda=1/6$、$\widehat S(4)=e^{-4/6}=e^{-2/3}$。一方、打切りを故障と誤認すると
$$
\widetilde L(\lambda)=(\lambda e^{-2\lambda})(\lambda e^{-4\lambda})
=\lambda^2e^{-6\lambda},
\qquad
\widetilde\ell'(\lambda)=\frac2\lambda-6,
$$
なので $\widetilde\lambda=1/3$、$\widetilde S(4)=e^{-4/3}<e^{-2/3}$。率を2倍に推定し、生存確率を過小評価する方向が数式でも確認できる。

## P3T-D01

**方針。** 個体ごとの故障・打切り寄与を統一記号で書き、$\eta$ に依存する部分だけを対数尤度へ集める。平均残存寿命は尾積分式から導く。

1. $y_i=\min(X_i,c_i)$ とおけば $S_\eta(y_i)=e^{-(y_i/\eta)^c}$、$f_\eta(y_i)=cy_i^{c-1}\eta^{-c}e^{-(y_i/\eta)^c}$（$\delta_i=1$ のとき）。
2. $\delta_i=1$ なら $y_i=X_i\leq c_i$ なので $f_\eta(y_i)$、$\delta_i=0$ なら $y_i=c_i$ かつ $X_i>c_i$ なので $S_\eta(c_i)$ が寄与する。独立性より
$$L(\eta)=\prod_i f_\eta(y_i)^{\delta_i}S_\eta(c_i)^{1-\delta_i}.$$
3. 故障数を $d=\sum_i\delta_i>0$、全指数寄与を
$$A=\sum_i\{\delta_i y_i^c+(1-\delta_i)c_i^c\}$$
とおく。$\eta$ に依存しない因子を定数へまとめると
$$
\ell(\eta)=\mathrm{const}-dc\log\eta-\frac{A}{\eta^c}.
$$
微分すると
$$
\ell'(\eta)=-\frac{dc}{\eta}+\frac{cA}{\eta^{c+1}}
=\frac{c}{\eta^{c+1}}(A-d\eta^c).
$$
従って $\eta^c<A/d$ で正、$\eta^c>A/d$ で負となるため、唯一の最大点は
$$\widehat\eta^c=\frac Ad,\qquad \widehat\eta=\left(\frac Ad\right)^{1/c}.$$
4. $h(t)=ct^{c-1}/\eta^c$ なので $c>1$ 増加、$c=1$ 一定、$c<1$ 減少。
5. $c=1$ では $m(x)=\eta$。$c=2$ では
$$m(x)=e^{(x/\eta)^2}\int_x^\infty e^{-(u/\eta)^2}\,du,$$
である。$a=x/\eta>0$ と置く。$v>a$ では $1<v/a$ だから
$$
\int_a^\infty e^{-v^2}\,dv
<\frac1a\int_a^\infty ve^{-v^2}\,dv
=\frac{e^{-a^2}}{2a}.
$$
を使うと
$$
m(x)=\eta e^{a^2}\int_a^\infty e^{-v^2}\,dv
<\frac{\eta}{2a}=\frac{\eta^2}{2x}.
$$
$h(x)=2x/\eta^2$ だから $h(x)m(x)<1$。一方、$m(x)=\int_x^\infty S(u)\,du/S(x)$ を微分すると
$$m'(x)=h(x)m(x)-1<0.$$
従って $c=2$ では、長く生存した個体ほど平均残存寿命は短くなる。なお $d=0$（全件打切り）なら $\eta$ の内部MLEは存在せず、$\eta\to\infty$ 方向の境界極限だけがある。

## 本番答案・採点基準

Level Cは各25点、Dも25点とする。小問別配点は次のとおりであり、最終値を誤っても、その前の正しい尤度・微分・場合分けには独立に配点する。

| ID | 小問別配点 | 3分の選択条件 | 15分の継続条件 | 25分の撤退・提出条件 |
|---|---|---|---|---|
| P3T-C01 | 1:4点、2:5点、3:5点、4:6点、5:5点 | $P(M>t)=P(X_1>t,\ldots,X_n>t)$ と書ければ選択 | $f_M,E[M]$ と $n\alpha>1$ まで出れば継続 | 尤度の台を書けなければ既得式を清書して撤退 |
| P3T-C02 | 各小問5点 | $S\to f\to h,H$ の順序が見えれば選択 | $h'(x)$ の符号と $c=1$ の積分まで出れば継続 | 数値代入と解釈を一文ずつ残して提出 |
| P3T-C03 | 1:6点、2:6点、3:5点、4:4点、5:4点 | 故障には $f$、打切りには $S$ と書ければ選択 | $L=\lambda^2e^{-\lambda T}$ まで出れば継続 | 微分が止まっても尤度と誤処理の方向を清書 |
| P3T-C04 | 各小問5点 | 絶対偏差和の最小化と見抜ければ選択 | 中央値の符号変化と $b$ の対数尤度まで出れば継続 | 境界例が残っても通常の場合のMLEと比較を提出 |
| P3T-C05 | 1:5点、2:5点、3:4点、4:3点、5:8点 | 切断は条件付き、打切りは不完全観測と区別できれば選択 | $f/F(c)$ と $f,S$ の寄与まで出れば継続 | 数値例では少なくとも2本の尤度を残して提出 |
| P3T-D01 | 各小問5点 | $\prod f^{\delta}S^{1-\delta}$ を立てられれば選択 | $d,A$ を定義し対数尤度まで出れば継続 | 25分では $\widehat\eta^c=A/d$ とハザード分類まで提出し、平均残存寿命は余力時のみ |

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

- **P3T-C01**: $P(M>t)=1$（$t<x_m$）、$P(M>t)=(x_m/t)^{n\alpha}$（$t\geq x_m$）。従って $f_M(t)=0$（$t<x_m$）、$f_M(t)=n\alpha x_m^{n\alpha}t^{-n\alpha-1}$（$t\geq x_m$）。$E[M]=n\alpha x_m/(n\alpha-1)$（$n\alpha>1$）。尤度は $0<x_m\leq M$ の範囲で単調増加し、MLEは $M$。従って $((n\alpha-1)/(n\alpha))M$ は $x_m$ の不偏推定量。
- **P3T-C02**: $S=e^{-(x/\eta)^c}$、$f=cx^{c-1}\eta^{-c}S$、$h=cx^{c-1}/\eta^c$、$H=(x/\eta)^c$、$m(x)=\int_x^\infty S(u)du/S(x)$。$c>1$ 増加、$c=1$ 一定、$c<1$ 減少。$c=2,\eta=5$ では $S(5)=e^{-1},H(5)=1,h(5)=2/5$。ハザード増加は長寿個体ほど直後の故障率が高いことを意味する。
- **P3T-C03**: $L=\lambda^2e^{-\lambda(t_1+t_2+c_1+c_2)}$、$T=t_1+t_2+c_1+c_2$ とおけば $\widehat\lambda=2/T$。追加故障 $t_3$ なら $L$ の次数は3。打切りを故障と誤認すると故障件数を過大に数え率を過大推定する。全打切りなら $\lambda>0$ 内でMLEなし。
- **P3T-C04**: 尤度 $L=(2b)^{-n}e^{-\sum|x_i-\mu|/b}$。$\widehat\mu$ は標本中央値、$\widehat b=n^{-1}\sum|x_i-\mu|$（通常の場合）。平均は二乗偏差、中央値は絶対偏差を最小化し外れ値に頑健。全 $x_i=\mu$ なら $b\downarrow0$ でMLEなし。
- **P3T-C05**: 切断は $f(x)/F(c)$、打切りは故障時 $f(t)$・生存時 $S(c)$。未知 $\lambda$ で故障2・打切り4なら $\widehat\lambda=1/6$、誤処理では $1/3$、従って $S(4)$ は $e^{-2/3}$ から $e^{-4/3}$ へ過小推定される。実務上は追跡費用と尾確率の推定目的を比較して方式を選ぶ。
- **P3T-D01**: $y_i=\min(X_i,c_i)$、$S_\eta(y_i)=e^{-(y_i/\eta)^c}$、$f_\eta(y_i)=cy_i^{c-1}\eta^{-c}S_\eta(y_i)$、$L=\prod f_\eta(y_i)^{\delta_i}S_\eta(c_i)^{1-\delta_i}$。$d=\sum\delta_i>0$、$A=\sum[\delta_i y_i^c+(1-\delta_i)c_i^c]$ とおけば $\widehat\eta^c=A/d$。$m(x)=\int_x^\infty S(u)du/S(x)$。$c=2$ では $m'(x)=h(x)m(x)-1<0$（$\int_a^\infty e^{-v^2}dv<e^{-a^2}/(2a)$）。ハザードは $c>1$ 増加、$c=1$ 一定、$c<1$ 減少。
