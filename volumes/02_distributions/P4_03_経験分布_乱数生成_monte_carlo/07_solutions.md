# 詳細解答

## Level A

### P4R-A01

**方針。** 経験CDFは各観測値以下の個数を標本サイズ4で割る。

昇順標本は $1,2,2,5$ なので
$$
F_4(x)=
\begin{cases}
0,&x<1,\\
1/4,&1\le x<2,\\
3/4,&2\le x<5,\\
1,&x\ge5.
\end{cases}
$$
本章の標本分位点規約では中央値は $F_4(x)\ge1/2$ となる最小の $x$、すなわち2である。$F_4(-\infty)=0$、$F_4(\infty)=1$ も満たす。

### P4R-A02

**方針。** 指数分布の逆関数法を使う。

$U\sim\operatorname{Unif}(0,1)$ に対し
$$X=-\frac12\log U$$
とおく。$x\ge0$ では
$$P(X\le x)=P(U\ge e^{-2x})=1-e^{-2x},$$
したがって $X\sim\operatorname{Exp}(2)$ である。

### P4R-A03

**方針。** $U_i\sim\operatorname{Unif}(0,1)$ を独立に生成し、被積分関数 $U_i$ を平均する。

$$\widehat I_N=\frac1N\sum_{i=1}^NU_i$$
とおくと
$$E[\widehat I_N]=E[U_1]=\frac12=\int_0^1u\,du,$$
$$\operatorname{Var}(\widehat I_N)=\frac{\operatorname{Var}(U_1)}N=\frac1{12N}.$$

### P4R-A04

棄却法で $f(x)\le Mg(x)$ とし、$f$ と $g$ がともに正規化された密度とする。$g(x)>0$ では $a(x)=f(x)/(Mg(x))$、$g(x)=0$ では $a(x)=0$ とおけば、1回の提案が受理される確率は
$$\int g(x)a(x)\,dx=\frac1M\int f(x)\,dx=\frac1M.$$
$M=4$ では受理率は $1/4$ である。

## Level B

### P4R-B01

固定した $x$ に対し $I_i=\boldsymbol{1}\{X_i\le x\}$ とおく。$X_i$ が独立同分布でCDF $F$ をもつなら、$I_i$ は成功確率 $F(x)$ のBernoulli変数であり、
$$F_n(x)=\frac1n\sum_{i=1}^n I_i.$$
よって
$$E[F_n(x)]=F(x),$$
$$\operatorname{Var}(F_n(x))=\frac1{n^2}\sum_{i=1}^nF(x)\{1-F(x)\}
=\frac{F(x)\{1-F(x)\}}n.$$

### P4R-B02

$F(x)=x^2$（$0\le x\le1$）の一般化逆関数は $F^{-1}(u)=\sqrt u$ である。したがって $X=\sqrt U$ とおく。実際、$0\le x\le1$ で
$$P(X\le x)=P(U\le x^2)=x^2=F(x).$$

### P4R-B03

$0<x<1$ で
$$\frac{f(x)}{g(x)}=2x.$$
その上限は2なので最小の包絡定数は $M=2$ である。受理率は $1/M=1/2$ となる。

### P4R-B04

$$\widehat I_N=\frac1N\sum_{i=1}^NU_i^2$$
とする。$E[U^r]=1/(r+1)$ より
$$E[U^2]=\frac13,\qquad E[U^4]=\frac15.$$
したがって
$$\operatorname{Var}(U^2)=\frac15-\frac19=\frac4{45},$$
$$\operatorname{Var}(\widehat I_N)=\frac4{45N},\qquad
\operatorname{SE}(\widehat I_N)=\frac2{\sqrt{45N}}.$$

## Level C

### P4R-C01 経験CDFから確率推定

**方針。** 固定した $x$ について経験CDFをBernoulli標本平均とみなし、不偏性、分散、中心極限定理の順に使う。

1. $I_i(x)=\boldsymbol{1}\{X_i\le x\}$ とおけば
   $$F_n(x)=\frac1n\sum_{i=1}^n I_i(x).$$
2. $E[I_i(x)]=P(X_i\le x)=F(x)$ なので
   $$E[F_n(x)]=F(x).$$
3. 独立性より
   $$\operatorname{Var}(F_n(x))=\frac{F(x)\{1-F(x)\}}n.$$
4. $0<F(x)<1$ ならBernoulli標本平均の中心極限定理から
   $$\frac{\sqrt n\{F_n(x)-F(x)\}}{\sqrt{F(x)\{1-F(x)\}}}\xrightarrow{d}N(0,1).$$
5. 未知の $F(x)$ を $F_n(x)=0.3$ で置き換えると
   $$\widehat{\operatorname{SE}}=\sqrt{\frac{0.3(1-0.3)}{400}}=0.02291.$$
   正規近似による95%区間は
   $$0.3\pm1.96(0.02291)=[0.2551,0.3449].$$
   一般に端点が0未満または1を超えた場合は、確率の範囲に合わせて $[0,1]$ で切る。この区間は未知分散中の $F(x)$ を $F_n(x)$ で置換したWald型近似区間であり、同じ標本抽出を繰り返したとき区間が真の $F(x)$ を含む割合を約95%にするもので、有限標本で正確に95%とは限らない。
6. $0\le F(x)\le1$ では
   $$F(x)\{1-F(x)\}\le\frac14.$$
   従って標準誤差は高々 $1/(2\sqrt n)$ であり、
   $$\frac1{2\sqrt n}\le0.02\quad\Longleftrightarrow\quad n\ge625.$$

**検算。** 区間は $[0,1]$ に含まれ、中心は観測値0.3である。

**完成形本番答案。**
$$F_n(x)=n^{-1}\sum_{i=1}^nI_i(x),\quad I_i(x)\sim\operatorname{Bernoulli}(F(x))$$
より $E[F_n(x)]=F(x)$、$\operatorname{Var}(F_n(x))=F(x)\{1-F(x)\}/n$。$0<F(x)<1$ なら
$$\frac{\sqrt n(F_n-F)}{\sqrt{F(1-F)}}\xrightarrow{d}N(0,1).$$
数値的に $\widehat{\mathrm{SE}}=0.02291$、Wald型95%区間は $[0.2551,0.3449]$。一般には端点を $[0,1]$ で切る。さらに $F(1-F)\le1/4$ より、標準誤差を一様に0.02以下にする十分な標本サイズは $n=625$。

**採点・時間判断。** 指示変数表示3点、不偏性3点、分散4点、CLT5点、数値区間5点、最悪時標本数5点。第3問を失っても与式から10点を回収できる。3分でBernoulli平均と同定できなければ後回し、15分で分散まで得れば継続、25分でCLT式が未完成なら前半式と標本数評価を残して撤退する。

### P4R-C02 逆関数法総合

**方針。** 不等式を $U$ に戻してCDFを求め、微分して密度を得る。

1. $0<U<1$ だから $X=-\log U/\lambda>0$ で、台は $x\ge0$ である。
2. $x\ge0$ では
   $$P(X\le x)=P(-\log U\le\lambda x)=P(U\ge e^{-\lambda x})=1-e^{-\lambda x}.$$
   $x<0$ ではCDFは0である。
3. CDFを微分して
   $$f_X(x)=\lambda e^{-\lambda x}\quad(x\ge0),$$
   台外では0である。
4. 部分積分により
   $$E[X]=\int_0^\infty x\lambda e^{-\lambda x}\,dx
   =\left[-xe^{-\lambda x}\right]_0^\infty+\int_0^\infty e^{-\lambda x}\,dx
   =\frac1\lambda.$$
5. 独立な $X_1,X_2$ の和 $T=X_1+X_2$ は、$t\ge0$ で
   $$f_T(t)=\int_0^t\lambda e^{-\lambda x}\lambda e^{-\lambda(t-x)}\,dx
   =\lambda^2te^{-\lambda t}.$$
   これは形状2、率 $\lambda$ のGamma分布である。
6. 第5問の密度を使うと
   $$E\left[\frac1T\right]
   =\int_0^\infty\frac1t\lambda^2te^{-\lambda t}dt
   =\lambda^2\int_0^\infty e^{-\lambda t}dt
   =\lambda.$$
   従って $\widehat\lambda=1/T$ は不偏である。

**検算。** $\int_0^\infty\lambda^2te^{-\lambda t}dt=1$、また $E[T]=2/\lambda$ で平均の加法性と一致する。

**完成形本番答案。** $x\ge0$ で
$$F_X(x)=P(U\ge e^{-\lambda x})=1-e^{-\lambda x},\qquad f_X(x)=\lambda e^{-\lambda x},$$
台外ではともに0。$E[X]=1/\lambda$。独立な2個の和は畳込みにより
$$f_T(t)=\int_0^t\lambda^2e^{-\lambda t}dx=\lambda^2te^{-\lambda t}\quad(t\ge0).$$
従って $E[1/T]=\lambda$ で、$1/T$ は $\lambda$ の不偏推定量である。

**採点・時間判断。** 台3点、CDF4点、密度4点、平均4点、畳込み5点、不偏推定5点。第3問を失っても与えられた密度から第4問以降へ復帰できる。3分で逆変換の向きを確認、15分で密度まで、25分で畳込みが未完なら積分式と $E[1/T]$ の式を残して撤退する。

### P4R-C03 棄却法総合

**方針。** 比 $f/g$ の上限から $M$ を定め、条件付き密度で受理後分布を確認する。

1. $f(x)/g(x)=2x$（$0<x<1$）だから最小の $M$ は2である。
2. 提案値を $Y\sim g$、独立な $V\sim\operatorname{Unif}(0,1)$ とすると
   $$V\le\frac{f(Y)}{Mg(Y)}=Y$$
   のとき受理する。
3. 受理率は $1/M=1/2$ である。
4. $0\le x\le1$ に対し
   $$P(Y\le x,\text{受理})=\int_0^xP(V\le y)g(y)dy=\int_0^x y\,dy=\frac{x^2}2.$$
   $P(\text{受理})=1/2$ で割ると
   $$P(Y\le x\mid\text{受理})=x^2.$$
5. 1000回の提案が独立なら受理数 $A$ は
   $$A\sim\operatorname{Bin}(1000,1/2),$$
   したがって $E[A]=500$、$\operatorname{Var}(A)=250$ である。
6. 包絡定数 $M$ の方法で1個を受理するまでの期待提案回数は $M$ である。従って1000個に対し、現方法は2000回、別法は4000回が期待値である。1提案当たりの時間が等しいので現方法を採用する。

**検算。** 受理後CDFの微分は $2x=f(x)$ である。

**完成形本番答案。** $M=\sup_{0<x<1}2x=2$。$Y,V$ を独立な一様乱数とし、$V\le Y$ なら受理する。受理率は $1/2$。さらに
$$P(Y\le x\mid\mathrm{acc})=\frac{\int_0^x y\,dy}{1/2}=x^2,$$
よって受理後密度は $2x$。受理数は $\operatorname{Bin}(1000,1/2)$ で平均500、分散250。1000個の受理値に必要な期待提案回数は $M=2$ の現方法で2000回、$M=4$ の別法で4000回なので現方法を選ぶ。

**採点・時間判断。** $M$ 4点、受理条件4点、受理率3点、条件付きCDF5点、受理数4点、方法選択5点。第1問を失っても与えられた $M=2$ から21点分へ復帰できる。3分で比 $f/g$ を作れなければ後回し、15分で受理率まで、25分で条件付きCDFが未完なら分子積分と方法比較を残して撤退する。

### P4R-C04 Monte Carlo積分

**方針。** 一様分布の期待値として積分を書き、被積分関数の二次モーメントから標準誤差を求める。

1. $U\sim\operatorname{Unif}(0,1)$ なら
   $$I=\int_0^1e^u du=E[e^U]=e-1.$$
2. 独立な $U_1,\ldots,U_N$ に対し
   $$\widehat I_N=\frac1N\sum_{i=1}^Ne^{U_i}$$
   とする。
3. 期待値の線形性より $E[\widehat I_N]=I$ である。
4.
   $$E[e^{2U}]=\int_0^1e^{2u}du=\frac{e^2-1}2,$$
   したがって
   $$V:=\operatorname{Var}(e^U)=\frac{e^2-1}2-(e-1)^2=0.242036,$$
   $$\operatorname{Var}(\widehat I_N)=\frac VN.$$
5. 中心極限定理による95%誤差幅を0.01以下にするには
   $$1.96\sqrt{\frac VN}\le0.01,$$
   すなわち
   $$N\ge\frac{1.96^2V}{0.01^2}=9298.04\ldots.$$
   よって必要な最小整数は $N=9299$ である。
6. Chebyshev不等式だけで
   $$P(|\widehat I_N-I|\ge0.01)\le\frac{V}{N(0.01)^2}\le0.05$$
   とするには
   $$N\ge\frac{V}{0.05(0.01)^2}
   =48407.12\ldots.$$
   従って最小整数は $N=48408$。中心極限定理による9299より大きいのは、Chebyshev不等式が分布形を使わない保守的な保証だからである。

**検算。** $e^U$ は $[1,e]$ に収まるので有限分散条件を満たす。

**完成形本番答案。** $I=E[e^U]=e-1$ とし、$\widehat I_N=N^{-1}\sum e^{U_i}$。これは不偏で、
$$\operatorname{Var}(\widehat I_N)=\frac1N\left\{\frac{e^2-1}2-(e-1)^2\right\}=\frac{0.242036}{N}.$$
$1.96\sqrt{0.242036/N}\le0.01$ より $N\ge9299$。Chebyshev不等式だけなら $0.242036/\{N(0.01)^2\}\le0.05$ より $N\ge48408$ であり、分布形を使わない分だけ保守的である。

**採点・時間判断。** 期待値表示3点、推定量3点、不偏性3点、分散5点、CLT標本数5点、Chebyshev保証と解釈6点。第4問を失っても与えられた $V$ から11点分へ復帰できる。3分で一様期待値に直せなければ後回し、15分で二次モーメントまで、25分で標本数の切上げが未完なら2本の不等式を残して撤退する。

### P4R-C05 経験分布からの再標本化

**方針。** 経験CDFを確率 $1/5$ ずつ持つ離散分布とみなし、逆関数法と標本平均の分散公式を適用する。

1.
   $$F_5(x)=
   \begin{cases}
   0,&x<1,\\
   1/5,&1\le x<2,\\
   2/5,&2\le x<3,\\
   3/5,&3\le x<4,\\
   4/5,&4\le x<20,\\
   1,&x\ge20.
   \end{cases}
   $$
2. $U\sim\operatorname{Unif}(0,1)$ に対し
   $$X^*=\begin{cases}
   1,&0<U\le1/5,\\
   2,&1/5<U\le2/5,\\
   3,&2/5<U\le3/5,\\
   4,&3/5<U\le4/5,\\
   20,&4/5<U<1
   \end{cases}$$
   とすれば $X^*$ は経験CDF $F_5$ に従う。
3. 各値の確率は $1/5$ なので
   $$E[X^*]=\frac{1+2+3+4+20}{5}=6,$$
   $$E[(X^*)^2]=\frac{1+4+9+16+400}{5}=86,$$
   $$\operatorname{Var}(X^*)=86-6^2=50.$$
4. 独立な10個の平均を $\overline X_{10}^*$ とすると
   $$\operatorname{Var}(\overline X_{10}^*)=\frac{50}{10}=5.$$
   1回に20が出ない確率は $4/5$ だから
   $$P(\text{10個中に20が少なくとも1回})=1-\left(\frac45\right)^{10}=0.8926\ldots.$$
5. 20を200へ変えても標本中央値は3である。一方、経験分布の平均と分散は
   $$E[X^*]=\frac{1+2+3+4+200}{5}=42,$$
   $$\operatorname{Var}(X^*)=\frac{1+4+9+16+40000}{5}-42^2
   =8006-1764=6242.$$
   中央値は変わらないが、平均とそのMonte Carlo誤差は外れ値で大きく変わる。

**検算。** 元の経験分散50も変更後の経験分散6242も非負であり、各再標本値の確率の和は1である。

**完成形本番答案。** EDFは $1,2,3,4,20$ で $1/5$ ずつ跳ぶ。具体的に $0<U\le1/5$ なら1、$1/5<U\le2/5$ なら2、$2/5<U\le3/5$ なら3、$3/5<U\le4/5$ なら4、$4/5<U<1$ なら20と置けば、各値を確率 $1/5$ で生成する。従って
$$E[X^*]=6,\quad E[(X^*)^2]=86,\quad\operatorname{Var}(X^*)=50.$$
10個の平均の分散は5、20が1回以上現れる確率は $1-(4/5)^{10}=0.8926\ldots$。20を200へ変えても中央値は3だが、経験平均は42、経験分散は6242となる。

**採点・時間判断。** EDF5点、逆変換5点、モーメント5点、10個再標本の計算5点、外れ値比較5点。3分で経験分布を5点の離散分布と同定できれば選択、15分で分散50まで、25分で変更後分散が未完なら平均42と中央値3を残して撤退する。

## Level D

### P4R-D01 生成と誤差の統合

**方針。** 逆関数法で指数分布を確認し、同じ計算予算 $2N$ 回で単純推定と負の相関を使う対推定を比較する。

1. $x\ge0$ で
   $$P(X_i\le x)=P(U_i\ge e^{-x})=1-e^{-x},$$
   よって $X_i\sim\operatorname{Exp}(1)$。
2. 部分積分を2回使うと
   $$E[X_i^2]=\int_0^\infty x^2e^{-x}dx
   =2\int_0^\infty xe^{-x}dx=2.$$
3. $E[X_i]=1$ の単純推定量は
   $$\widehat I_N=\frac1N\sum_{i=1}^N(-\log U_i).$$
4. $\operatorname{Var}(X_i)=E[X_i^2]-E[X_i]^2=1$ なので
   $$\operatorname{Var}(\widehat I_N)=\frac1N.$$
5. $A_i=-\log U_i$、$B_i=-\log(1-U_i)$ とおく。両方とも $\operatorname{Exp}(1)$ なので
   $$\widetilde I_N=\frac1{2N}\sum_{i=1}^N(A_i+B_i)$$
   は不偏である。また
   問題文で与えた積分公式を使うと
   $$E[A_iB_i]=2-\frac{\pi^2}{6},$$
   よって
   $$\operatorname{Cov}(A_i,B_i)=1-\frac{\pi^2}{6}<0.$$
   異なる組は独立だから
   $$\operatorname{Var}(\widetilde I_N)
   =\frac{2+2(1-\pi^2/6)}{4N}
   =\frac{1-\pi^2/12}{N}.$$
   独立な一様乱数を $2N$ 個使う単純平均の分散は $1/(2N)$ であり、
   $$1-\frac{\pi^2}{12}=0.1775\ldots<\frac12$$
   だから対推定量の方が小さい。

**検算。** 対推定量も各周辺が指数分布なので平均は1であり、分散は正である。

**完成形本番答案。** $P(-\log U_i\le x)=1-e^{-x}$ より $X_i\sim\operatorname{Exp}(1)$、$E[X_i^2]=2$。$\widehat I_N=N^{-1}\sum X_i$ は $E[X_i]=1$ の不偏推定量で分散 $1/N$。$A_i=-\log U_i,B_i=-\log(1-U_i)$ とすれば
$$\operatorname{Cov}(A_i,B_i)=\int_0^1\log u\log(1-u)du-1=1-\frac{\pi^2}{6}<0.$$
したがって $\widetilde I_N=(2N)^{-1}\sum(A_i+B_i)$ は不偏で、
$$\operatorname{Var}(\widetilde I_N)=\frac{1-\pi^2/12}{N}<\frac1{2N},$$
すなわち同じ $2N$ 個分の評価で独立単純平均より分散が小さい。

**採点・時間判断。** 分布4点、二次モーメント4点、推定量4点、単純分散4点、対推定の不偏性3点、共分散と比較6点。3分で逆関数法と負の相関の狙いを同定できれば選択、15分で単純推定まで、25分で共分散積分が残るなら $\operatorname{Cov}<0$ を条件として比較式を残し、30分で完答する。
