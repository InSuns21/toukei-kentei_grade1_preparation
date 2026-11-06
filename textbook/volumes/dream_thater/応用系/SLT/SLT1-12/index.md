# SLT1-12 速い収束率と局所複雑度

<!-- definition-example-audit: strict -->

## 1. なぜ平方根より速くなる余地があるのか

[前章のmargin汎化界](../SLT1-11/index.md#thm-slt1-11-margin-bound)や[Rademacher複雑度の汎化界](../SLT1-10/index.md#thm-slt1-10-generalization)には、標本数に対する典型的な $n^{-1/2}$ の項が現れた。しかし、これは一般の有界損失を一様に比較するための評価であり、経験リスク最小化（ERM）によって**最良の仮説に近いものを選ぶ**という事情を十分に使っていない。

例えば、正解ラベルが常に $+1$ の分類を考える。ある候補 $h$ の誤り確率が $p$ なら、その誤分類損失は0か1であり、分散は $p(1-p)\le p$ である。最適な候補の誤りが0なら、リスク $p$ が小さい候補ほど損失の揺らぎも小さくなる。一方、正解ラベルが公平なコインである場合には、二つの反対の分類器のリスクが共に $1/2$ であっても、両者の**損失差**は毎回 $+1$ か $-1$ に揺れる。

この違いを捉えるには、[有限二値分類で導入したクラス内超過リスク](../SLT1-01/index.md#def-slt1-01-within-class-excess)の考え方を一般の有界損失へ拡張し、その平均の小ささと損失差の**二乗平均**の関係を調べる必要がある。本章では有限クラスの模型で速い率を完全に証明し、その仕組みを局所的な複雑度へ読み替える。

以下、$\mathcal Z$ は可測空間、$P$ はその上の確率分布、$S=(Z_1,\ldots,Z_n)\sim P^n$ は独立同分布標本とする。$\mathcal H$ は標本抽選前に固定した空でない**有限**仮説クラスで、$M=|\mathcal H|\ge1$ とする。各損失 $\ell(h,\cdot)$ は可測で $[0,1]$ に値を取る。母集団平均を $Pf=\mathbb E f(Z)$、経験平均を $P_nf=n^{-1}\sum_i f(Z_i)$ と書く。

## 2. 比較すべきものは超過損失の分散

クラスが有限なので、母集団リスクを最小にする $h^\star\in\mathcal H$ が存在する。$\widehat h$ は経験平均を最小にするERMとし、同点の場合は事前に決めた順序で一つを選ぶ。両者は違う対象である。$h^\star$ は分布 $P$ により固定され、$\widehat h$ は標本に依存する。

ここでは各 $h$ の損失から $h^\star$ の損失を引いた**標本ごとの損失差** $g_h$ を使う。この差は負でもよいが、その期待値は最小性により非負である。「平均が小さければ二乗も小さい」という追加条件を設けよう。

<a id="def-slt1-12-excess-bernstein"></a>

<!-- formal-statement-start -->
> **定義（超過損失関数とBernstein条件）**
> 空でない有限クラス $\mathcal H$、可測な $[0,1]$ 値損失 $\ell$、確率分布 $P$ を取り、$h^\star\in\arg\min_{h\in\mathcal H}P\ell(h,\cdot)$ を一つ固定する。$h\in\mathcal H$ について

$$
g_h(z)=\ell(h,z)-\ell(h^\star,z),\qquad
\mu_h=Pg_h=R_P(h)-R_P(h^\star)
$$

> を超過損失関数とクラス内超過リスクとする。定数 $B\ge1$ が存在して全ての $h\in\mathcal H$ に対して

$$
Pg_h^2\le B\,Pg_h=B\mu_h
$$

> が成立するとき、この損失クラスは $h^\star$ を基準としたBernstein条件（指数1）を定数 $B$ で満たすという。これは別途必要な仮定であり、$|g_h|\le1$ からは導けない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-12-excess-bernstein -->
**定義の確認**。入力は $a,b$ の二点、$P(X=b)=1/4$、正解ラベルは常に $+1$ とする。$h^\star$ は常に $+1$、$h_b$ は $b$ だけで $-1$ と予測し、$\mathcal H=\{h^\star,h_b\}$ とする。0–1損失の下では $g_{h^\star}=0$、$g_{h_b}=\boldsymbol1_{\{X=b\}}$ である。従って

$$
Pg_{h_b}=\frac14,\qquad
Pg_{h_b}^2=\frac14\le1\cdot\frac14.
$$

基準 $h^\star$ についても $Pg_{h^\star}=Pg_{h^\star}^2=0$ なので、**クラスの全候補**で $B=1$ が成り立つ。また $g_{h_b}$ の分散は $1/4-(1/4)^2=3/16$ であり、分散も平均に支配される。
<!-- definition-example-end -->

一般に $0\le\mu_h\le1$、$-1\le g_h\le1$、$\operatorname{Var}(g_h)=Pg_h^2-\mu_h^2\le B\mu_h$ である。とりわけ $\mu_h=0$ の候補は $Pg_h^2=0$、従って $g_h=0$ が $P$-ほとんど確実に成立する。**最適な二仮説の損失が個々の標本で食い違う場合、Bernstein条件は破れる。** この性質が追加条件の強さを示している。

## 3. 分散を用いた片側集中を出発点から導く

ERMの候補 $h$ が真の最適 $h^\star$ に勝つには、平均が正の $g_h$ の経験平均が偶然0以下になる必要がある。固定 $h$ について $P_ng_h-\mu_h$ を調べると、$[0,1]$ 値の元の損失に直接Hoeffdingを使う場合と違って、分散 $\operatorname{Var}(g_h)$ が $\mu_h$ に従って小さくなることを利用できる。

このための有界変数の片側集中を、指数の級数から確認する。以下の補題は独立性・中心化・絶対値の上限を全て必要とする。

<a id="lem-slt1-12-bernstein-tail"></a>

<!-- formal-statement-start -->
> **補題（有界中心化和の片側Bernstein不等式）**
> $X_1,\ldots,X_n$ を独立な実数値確率変数とする。各 $i$ で $\mathbb E X_i=0$、$|X_i|\le c$ がほとんど確実に成立し、$c>0$ とする。$v=\sum_{i=1}^n\mathbb E X_i^2$ と置く。このとき全ての $t>0$ に対し

$$
\Pr\left\{\sum_{i=1}^nX_i\ge t\right\}
\le\exp\left(-\frac{t^2}{2(v+ct/3)}\right).
$$

> $v=0$ の場合は各 $X_i=0$ がほとんど確実であり、左辺は0である。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数の3次以降を、$\lambda c/3<1$ のときの等比級数で抑える。独立性で指数モーメントを掛け合わせ、Markov不等式で片側事象へ移して $\lambda$ を選ぶ。係数 $c/3$ はこの級数評価に由来する。

<!-- proof-start -->
### 証明

$|u|<3$ と $k!\ge2\cdot3^{k-2}$（$k\ge2$）を使えば

$$
\begin{aligned}
e^u&=1+u+\sum_{k=2}^\infty\frac{u^k}{k!}\\
&\le1+u+\sum_{k=2}^\infty\frac{|u|^k}{2\cdot3^{k-2}}
=1+u+\frac{u^2}{2(1-|u|/3)}.
\end{aligned}
$$

$0<\lambda<3/c$ として $u=\lambda X_i$ を代入し、中心化と $|X_i|\le c$ を使うと

$$
\mathbb E e^{\lambda X_i}
\le1+\frac{\lambda^2\mathbb E X_i^2}{2(1-\lambda c/3)}
\le\exp\left(\frac{\lambda^2\mathbb E X_i^2}{2(1-\lambda c/3)}\right).
$$

最後は $1+x\le e^x$ から従う。独立性により $\mathbb E e^{\lambda\sum_iX_i}=\prod_i\mathbb E e^{\lambda X_i}$。非負変数 $e^{\lambda\sum_iX_i}$ に[Markov不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を、閾値 $e^{\lambda t}$ で適用して

$$
\Pr\left\{\sum_iX_i\ge t\right\}
\le\exp\left(-\lambda t+
\frac{\lambda^2v}{2(1-\lambda c/3)}\right).
$$

$v>0$ のとき $\lambda=t/(v+ct/3)$ を選べば $\lambda c/3<1$ であり、

$$
1-\frac{\lambda c}{3}=\frac{v}{v+ct/3},\qquad
-\lambda t+\frac{\lambda^2v}{2(1-\lambda c/3)}
=-\frac{t^2}{2(v+ct/3)}.
$$

これが補題の上界である。$v=0$ なら各 $\mathbb E X_i^2=0$ だから $X_i=0$ がほとんど確実で、左辺は0になる。
<!-- proof-end -->

この補題は片側の上界である。下側を扱うときには $X_i$ を $-X_i$ に置き換える。以下のERM証明で実際に入力する量は $X_i=\mu_h-g_h(Z_i)$ である。

## 4. 有限クラスのERMで $1/n$ 型を証明する

ERMは $P_n\ell(\widehat h)\le P_n\ell(h^\star)$ を満たすため、$P_ng_{\widehat h}\le0$ となる。一方、母集団で十分悪い候補 $h$ は $\mu_h>0$ である。その候補が経験標本で勝つ確率を、前節の補題で抑える。

<a id="thm-slt1-12-finite-fast-rate"></a>

<!-- formal-statement-start -->
> **定理（有限クラスERMの速い超過リスク界）**
> $n\ge1$、$0<\delta<1$、空でない有限クラス $\mathcal H$（$M=|\mathcal H|$）を取り、$S\sim P^n$、可測な $[0,1]$ 値損失 $\ell$ を考える。$h^\star$ は母集団リスクのクラス内最小化子、$\widehat h$ は経験リスクの最小化子とする。全ての $h$ に対し、[超過損失のBernstein条件](#def-slt1-12-excess-bernstein)が同じ $B\ge1$ で成立すると仮定する。このとき確率 $1-\delta$ 以上で

$$
R_P(\widehat h)-R_P(h^\star)
\le\frac{2(B+2/3)}{n}\log\frac{M}{\delta}.
$$

> $P,\mathcal H,B$ は標本抽選前に固定される。これは0–1損失や実現可能な場合に限らず、上記条件を満たす有界損失に対する**クラス内**超過リスク界である。
<!-- formal-statement-end -->

### 証明の見取り図

固定した悪い候補ごとに、その超過損失の標本平均が0以下になる確率を指数的に抑える。Bernstein条件があるので、指数は $n\mu_h^2$ ではなく $n\mu_h$ に比例する。最後に有限 $M$ 個を合併評価し、標本から選んだ $\widehat h$ を取り込む。

<!-- proof-start -->
### 証明

固定 $h$ について $\mu=\mu_h>0$ と置く。独立な中心化変数 $X_i=\mu-g_h(Z_i)$ は $|X_i|\le2$ を満たす。というのも $g_h\in[-1,1]$、$\mu\in[0,1]$ だからである。分散については

$$
\sum_{i=1}^n\mathbb E X_i^2
=n(Pg_h^2-\mu^2)\le nB\mu.
$$

$P_ng_h\le0$ は $\sum_iX_i\ge n\mu$ と同じ事象である。[片側Bernstein補題](#lem-slt1-12-bernstein-tail)へ $c=2$、$t=n\mu$、$v\le nB\mu$ を代入して

$$
\begin{aligned}
\Pr\{P_ng_h\le0\}
&\le\exp\left(-\frac{n^2\mu^2}{2(nB\mu+2n\mu/3)}\right)\\
&=\exp\left(-\frac{n\mu}{2(B+2/3)}\right).
\end{aligned}
$$

$r=2(B+2/3)\log(M/\delta)/n$ と置く。$\mu_h>r$ の各候補が $P_ng_h\le0$ を満たす確率は $\delta/M$ より小さい。候補は高々 $M$ 個なので、合併上界により確率 $1-\delta$ 以上で、「$\mu_h>r$ の全候補は $P_ng_h>0$」が同時に成立する。

一方、経験リスクを最小化する $\widehat h$ では $P_n\ell(\widehat h)\le P_n\ell(h^\star)$、すなわち $P_ng_{\widehat h}\le0$ である。同時事象上では $\widehat h$ は $\mu_h>r$ の候補ではあり得ない。よって $\mu_{\widehat h}\le r$。$\mu_h=0$ の候補は最初から結論を満たし、$M=1$ でもERMは $h^\star$ なので主張は成立する。
<!-- proof-end -->

比較しておこう。[通常の有限クラス一様偏差界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)では、固定 $h$ の逸脱が $\exp(-c n\varepsilon^2)$ なので、超過リスクへ移すと通常は $\sqrt{\log(M/\delta)/n}$ 型になる。ここでは**相対的な損失差**の分散が $B\mu_h$ 以下であるため、失敗確率が $\exp(-c n\mu_h)$ まで改善された。単に数学的に強い集中不等式へ置き換えただけではなく、分布・損失について追加の仮定を使っている。

先の二点分類の例で $M=2$、$B=1$、$n=200$、$\delta=0.1$ なら、右辺は

$$
\frac{2(1+2/3)\log20}{200}\approx0.0499.
$$

この評価は $P(X=b)=1/4$ の候補 $h_b$ を必ず排除できるほど小さい。実際、$h_b$ が経験リスクで最適候補と同点になるには200個の訓練点に $b$ が1度も出ない必要があり、その確率は $(3/4)^{200}$ である。速い率はこの「悪い候補は標本上で隠れにくい」性質を一般化している。

## 5. 局所複雑度で半径ごとの難しさを見る

前節は有限クラスの候補を一括して数えた。しかし最良候補から遠いものと近いものでは、分散の上限が違う。そこで超過リスクが半径 $r$ 以下の候補だけを残す。これは未知の分布 $P$ を使う**理論上の局所化**であり、学習算法が標本からその集合を直接知っているという意味ではない。

既習の[期待Rademacher複雑度](../SLT1-10/index.md#def-slt1-10-rademacher-complexities)は $[0,1]$ 値関数について定義したが、ここで扱う損失差 $g_h$ の値域は $[-1,1]$ である。符号付き標本平均の式そのものは実数値関数にも使えるので、以下では同じ式をこの有限個の損失差へ拡張して定義する。有限クラスの上限は最大値であり、各 $g_h$ が可測なので、標本と符号についての期待値も定義できる。

<a id="def-slt1-12-local-complexity"></a>

<!-- formal-statement-start -->
> **定義（局所超過損失クラスと局所Rademacher複雑度）**
> [超過損失](#def-slt1-12-excess-bernstein) $g_h$ と $\mu_h=Pg_h$ を持つ空でない有限仮説クラス $\mathcal H$ に対し、半径 $r\ge0$ の局所超過損失クラスを

$$
\mathcal G(r)=\{g_h:h\in\mathcal H,\ 0\le Pg_h\le r\}
$$

> とする。$S=(Z_1,\ldots,Z_n)\sim P^n$ と、互いに独立で $S$ からも独立な公平符号 $\sigma_1,\ldots,\sigma_n$ を取り、局所Rademacher複雑度を

$$
\mathfrak R_n^{\mathrm{loc}}(r)
=\mathbb E_{S,\sigma}\left[
\sup_{g\in\mathcal G(r)}
\frac1n\sum_{i=1}^n\sigma_i g(Z_i)
\right]
$$

> と定める。$g_{h^\star}=0$ なので $\mathcal G(r)$ は空でない。[既習の符号付き標本平均](../SLT1-10/index.md#def-slt1-10-rademacher-signs)を、$[-1,1]$ 値の超過損失クラスへ拡張し、超過リスクで局所化した量である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-12-local-complexity -->
**定義の確認**。第2節の二点分類では $\mu_{h^\star}=0$、$\mu_{h_b}=1/4$ だった。従って $0\le r<1/4$ では $\mathcal G(r)=\{0\}$、$r\ge1/4$ では $\mathcal G(r)=\{0,\boldsymbol1_{\{X=b\}}\}$ となる。$n=1$ では $r<1/4$ の複雑度は0。一方 $r\ge1/4$ のとき $X=b$ かつ $\sigma=+1$ の場合だけ上限が1となるので

$$
\mathfrak R_1^{\mathrm{loc}}(r)
=\Pr(X=b)\Pr(\sigma=+1)=\frac14\cdot\frac12=\frac18.
$$

標本も符号も平均しており、半径に応じて残る関数が変わることを実際に確かめた。
<!-- definition-example-end -->

<a id="prop-slt1-12-local-bound"></a>

<!-- formal-statement-start -->
> **命題（局所Rademacher複雑度の有限クラス評価）**
> $n\ge1$、$M=|\mathcal H|\ge1$、$0\le\ell\le1$、$S\sim P^n$ とする。$\mathcal H$ は標本から独立な有限クラスであり、[Bernstein条件](#def-slt1-12-excess-bernstein)が定数 $B\ge1$ で成立するとする。このとき全ての $r\ge0$ で

$$
0\le\mathfrak R_n^{\mathrm{loc}}(r)
\le\sqrt{\frac{2Br\log M}{n}}+\frac{\log M}{3n}.
$$

> $M=1$ なら両辺の複雑度は0である。この評価は経験半径ではなく、母集団の超過リスク $Pg_h$ による局所化についての主張である。
<!-- formal-statement-end -->

### 証明の見取り図

局所クラス内の各 $g$ は二乗平均 $Pg^2\le Br$ を持つ。符号を掛けた独立変数の分散も $Pg^2$ なので、同じ指数モーメントの仕組みを各候補に適用する。最大値の指数を有限個の指数の和で抑えてから符号・標本を平均する。

<!-- proof-start -->
### 証明

$M=1$ では $\mathcal G(r)=\{0\}$ であり、結論は明白である。以下 $M\ge2$ とする。固定した $g\in\mathcal G(r)$ と標本・符号の同時乱数について、$U_i=\sigma_i g(Z_i)$ と置く。$U_i$ は独立、平均0、$|U_i|\le1$ であり

$$
\sum_{i=1}^n\mathbb E U_i^2=nPg^2\le nBr.
$$

[Bernstein補題の証明にある指数モーメント評価](#lem-slt1-12-bernstein-tail)へ $c=1$ を代入すると、$0<\lambda<3$ で

$$
\mathbb E_{S,\sigma}\exp\left(\lambda\sum_iU_i\right)
\le\exp\left(\frac{\lambda^2nBr}{2(1-\lambda/3)}\right).
$$

$\mathcal G(r)$ は高々 $M$ 個なので、指数と対数の単調性、Jensen不等式を順に用いて

$$
\begin{aligned}
\lambda n\mathfrak R_n^{\mathrm{loc}}(r)
&=\lambda\mathbb E\max_{g\in\mathcal G(r)}\sum_i\sigma_i g(Z_i)\\
&\le\log\mathbb E\exp\left(\lambda\max_g\sum_i\sigma_i g(Z_i)\right)\\
&\le\log\sum_{g\in\mathcal G(r)}
\mathbb E\exp\left(\lambda\sum_i\sigma_i g(Z_i)\right)\\
&\le\log M+\frac{\lambda^2 nBr}{2(1-\lambda/3)}.
\end{aligned}
$$

$v=nBr>0$、$L=\log M>0$ とし、$a=\sqrt{2L/v}$、$\lambda=a/(1+a/3)$ と選ぶと $\lambda<3$ で

$$
\frac{L}{\lambda}=\sqrt{\frac{vL}{2}}+\frac L3,
\qquad
\frac{\lambda v}{2(1-\lambda/3)}
=\sqrt{\frac{vL}{2}}.
$$

従って両者の和を $n$ で割って、主張の上界を得る。$v=0$ なら各局所 $g$ は $Pg^2=0$、有限個の全てがほとんど確実に0であるので、左辺は0。非負性は零関数 $g_{h^\star}$ を含むためである。
<!-- proof-end -->

**固定点の読み方。** $a=\log M/n$、$\psi(r)=\sqrt{2Bra}+a/3$ と置くと、$r\ge32Ba$ なら平方根項は $r/4$ 以下、$r\ge4a/3$ なら残りも $r/4$ 以下である。従って

$$
r\ge r_0:=\max\{32B,4/3\}\,\frac{\log M}{n}
\quad\Longrightarrow\quad \psi(r)\le\frac r2.
$$

局所的な符号の揺らぎが、その半径 $r$ より小さくなる境目が $O(B\log M/n)$ に現れる。ただし**期待局所複雑度の上界だけから直ちにERMの高確率保証を得たわけではない**。確率保証は第4節で別に証明済みであり、より一般の局所複雑度法では局所的な偏差の一様制御と半径をまたぐ議論が必要になる。

## 6. 分類のmargin条件が分散を制御する

ここまでのBernstein条件は損失差の抽象条件だった。二値分類では、正解ラベルが入力 $X$ を見ても五分五分に近いかどうかで具体化できる。

入力 $X$ の下での条件付き正例確率を $\eta(x)=\Pr(Y=+1\mid X=x)$ とし、$P_X$ は入力 $X$ の周辺分布とする。ここでは $\eta$ の可測な版が存在する二値分類模型を考える。0–1損失で予測 $a\in\{-1,+1\}$ を返したとき、$X=x$ での条件付き誤り確率を $r_{01}(a\mid x)$ と書くと、

$$
r_{01}(+1\mid x)=1-\eta(x),\qquad r_{01}(-1\mid x)=\eta(x).
$$

従って $+1$ が有利なのは $1-\eta(x)\le\eta(x)$、すなわち $\eta(x)\ge1/2$ のときである。この規則で $h^\star(x)$ を定め、等号なら $+1$ とする。$\eta$ の可測性から $h^\star$ も可測である。

どの可測分類器 $h$ についても、条件付き誤り確率の点ごとの比較を $P_X$ で平均すれば

$$
R_P(h^\star)=E_X[r_{01}(h^\star(X)\mid X)]
\le E_X[r_{01}(h(X)\mid X)]=R_P(h)
$$

となる。これは[有限入力でのBayes分類則](../SLT1-01/index.md#thm-slt1-01-weighted-regret)と同じ比較を、一般の可測入力と $\{-1,+1\}$ ラベルで直接確かめたものである。$|2\eta(x)-1|$ は、どちらのラベルが優勢かを測る量である。

<a id="def-slt1-12-massart-margin"></a>

<!-- formal-statement-start -->
> **定義（二値分類のMassart型margin条件）**
> $Y\in\{-1,+1\}$、$\eta(x)=\Pr(Y=+1\mid X=x)$ を持つ確率分布 $P$ を考える。標本抽選前に固定された定数 $\kappa\in(0,1]$ が存在し、

$$
|2\eta(X)-1|\ge\kappa
\qquad P_X\text{-ほとんど確実}
$$

> が成立するとき、二値分類分布はmargin幅 $\kappa$ のMassart型条件を満たすという。これは第11章の予測スコア $Y\langle w,X\rangle$ の幾何学的marginとは異なり、**ラベルの条件付き確率の偏り**を制約する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-12-massart-margin -->
**定義の確認**。入力 $X$ が一点 $a$ だけで、$\Pr(Y=+1\mid a)=0.8$ とする。このとき $\eta(a)=0.8$、$|2\eta(a)-1|=0.6$ なので $\kappa=0.6$ で条件を満たす。一方 $\eta(a)=1/2$ なら $|2\eta(a)-1|=0$ で、どの正の $\kappa$ も使えない。前者には優勢ラベルがあり、後者ではラベルが公平なコインである。
<!-- definition-example-end -->

<a id="prop-slt1-12-massart-bernstein"></a>

<!-- formal-statement-start -->
> **命題（Massart型marginからBernstein条件）**
> $Y\in\{-1,+1\}$ とし、0–1損失 $\ell(h,(x,y))=\boldsymbol1_{\{h(x)\ne y\}}$ を用いる。二値可測分類器からなる有限クラス $\mathcal H$ はBayes分類器 $h^\star$ を含み、$P$ は[Massart型条件](#def-slt1-12-massart-margin)を $\kappa>0$ で満たすとする。このとき各 $h\in\mathcal H$ の超過損失は

$$
Pg_h^2\le\frac1\kappa Pg_h
$$

> を満たす。従って[有限クラスERMの速い率](#thm-slt1-12-finite-fast-rate)を $B=1/\kappa$ で適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

二分類器が同じ予測をする入力では損失差は0、異なる予測をする入力では損失差は $+1$ または $-1$ になる。二乗は不一致指示関数であり、条件付き平均には $|2\eta-1|$ が掛かる。

<!-- proof-start -->
### 証明

$D=\{x:h(x)\ne h^\star(x)\}$ と置く。$x\notin D$ では両者の予測が同じなので $g_h(x,Y)=0$。$x\in D$ では二値予測が反対で、$Y=h^\star(x)$ のとき $g_h=1$、$Y=h(x)$ のとき $g_h=-1$ である。従って全ての $(x,y)$ で

$$
g_h(x,y)^2=\boldsymbol1_D(x),\qquad
Pg_h^2=P_X(D).
$$

第6節冒頭の条件付き誤り確率の比較から、$x\in D$ で優勢ラベルは $h^\star(x)$ である。Massart条件により $\eta(x)=1/2$ となる入力は $P_X$-零集合なので、Bayes分類器の同点処理にも依存しない。不一致入力での損失差の条件付き平均を場合分けすると

$$
\mathbb E[g_h\mid X=x]=
\begin{cases}
\eta(x)-(1-\eta(x))=2\eta(x)-1,&h^\star(x)=+1,\\
(1-\eta(x))-\eta(x)=1-2\eta(x),&h^\star(x)=-1.
\end{cases}
$$

いずれも優勢ラベルの確率と劣勢ラベルの確率の差だから、$x\notin D$ では損失差が0になることと合わせて

$$
\mathbb E[g_h(X,Y)\mid X=x]
=|2\eta(x)-1|\,\boldsymbol1_D(x).
$$

条件付き期待値を $X$ について平均し、margin仮定を使うと

$$
Pg_h=\mathbb E_X[|2\eta(X)-1|\boldsymbol1_D(X)]
\ge\kappa P_X(D)=\kappa Pg_h^2.
$$

$\kappa>0$ で割ると結論になる。Bayes分類器が $\mathcal H$ に入る仮定を失うと、この条件付き平均の符号・大きさを同じ形で書けるとは限らない。
<!-- proof-end -->

**条件が弱いと何が起こるか。** $X$ は一点、$\eta=1/2+\varepsilon$（$0<\varepsilon<1/2$）とし、$\mathcal H$ は常に $+1$ と常に $-1$ を予測する二分類器からなる。前者 $h^\star$ がBayes最適で、後者の超過損失は $Y=+1$ で $+1$、$Y=-1$ で $-1$。従って

$$
\mu_h=2\varepsilon,\qquad
Pg_h^2=1,\qquad B\ge\frac1{2\varepsilon}.
$$

$\varepsilon\downarrow0$ では一定の $B$ を一様に選べない。$\varepsilon=0$ では二つの分類器のリスクが等しいにもかかわらず損失差は毎回 $\pm1$ で、Bernstein条件そのものが破綻する。これは単なる定数の悪化ではなく、第4節の指数 $\exp[-n\mu/(2(B+2/3))]$ を一様な線形指数として使えないことを意味する。

## 7. 何が速い率を保証し、何が保証しないか

- **実現可能な有限分類**では、$h^\star$ の0–1損失が常に0なら $g_h=\ell(h,\cdot)\in\{0,1\}$ で $Pg_h^2=Pg_h$。よって $B=1$ である。
- **Massart型のラベル雑音**では、Bayes分類器をクラスに含み $\kappa>0$ が固定されれば $B=1/\kappa$ を使える。一方、$\kappa$ が標本数とともに0へ近づくなら、係数 $B$ も増え得る。
- **一般のagnostic分類**では、超過損失は負の標本値を持ち、二乗平均が超過リスクに比例するとは限らない。$[0,1]$ 値だけから速い率を結論できない。
- **クラスの大きさ**も重要である。$M=M_n$ が $2^n$ のように増えるなら $\log M_n/n=\log2$ は小さくならない。有限クラスというだけで一様な $1/n$ 収束が保証されるのではない。
- **標本依存の候補集合や非独立標本**では、各候補についての固定分布下の集中や $M$ 個の合併評価をそのまま使用できない。前提を別途立て直す必要がある。

次章では、ここで得た「良い候補の比較」を罰則付きERMへ拡張し、候補と最適化子の経験目的関数の大小を出発点にして、近似誤差・推定誤差・最適化誤差を分けて評価する。

## 演習

**問題 SLT1-12-A01（二点分類でのBernstein条件）**
- Level: A

$P(X=b)=1/4$、$P(X=a)=3/4$、$Y=+1$ とする。$h^\star$ は常に $+1$、$h_b$ は $b$ だけ $-1$ と予測する。0–1損失での $g_{h_b}$、その平均・二乗平均・分散を計算し、$B=1$ が成立するか調べよ。

<!-- solution-start -->
**詳細解答**。$h^\star$ の損失は常に0で、$h_b$ の損失は $X=b$ のときだけ1。従って $g_{h_b}=\boldsymbol1_{\{X=b\}}$、$g_{h_b}^2=g_{h_b}$。ゆえに

$$
Pg_{h_b}=Pg_{h_b}^2=\frac14,\quad
\operatorname{Var}(g_{h_b})=Pg_{h_b}^2-(Pg_{h_b})^2
=\frac14-\frac1{16}=\frac3{16}.
$$

[Bernstein条件](#def-slt1-12-excess-bernstein)の右辺は $1\cdot Pg_{h_b}=1/4$ で等号となる。基準仮説は $g_{h^\star}=0$ なので、二仮説クラス全体で $B=1$ を満たす。
<!-- solution-end -->

**問題 SLT1-12-A02（ラベル雑音と定数）**
- Level: A

$X=a$ が確率1で、$\Pr(Y=+1\mid X=a)=0.8$ とする。$h^\star$ は常に $+1$、$h_-$ は常に $-1$。超過損失の値と確率、$\mu_{h_-}$、$Pg_{h_-}^2$ を計算し、必要なBernstein定数の最小値とMassart型margin幅を求めよ。

<!-- solution-start -->
**詳細解答**。$Y=+1$（確率0.8）では $h_-$ だけ誤るので $g_{h_-}=1$、$Y=-1$（確率0.2）では $h^\star$ だけ誤るので $g_{h_-}=-1$。従って

$$
\mu_{h_-}=0.8-0.2=0.6,\qquad Pg_{h_-}^2=0.8+0.2=1.
$$

$1\le B\cdot0.6$ より最小 $B=5/3$。$\eta(a)=0.8$ だから $|2\eta(a)-1|=0.6=3/5$。[$\kappa=3/5$ のmargin条件](#def-slt1-12-massart-margin)が成立し、$1/\kappa=5/3$ が上の最小定数と一致する。
<!-- solution-end -->

**問題 SLT1-12-A03（速い率の数値）**
- Level: A

定理の仮定を満たす $M=5$、$B=1$、$n=200$、$\delta=0.1$ の有限クラスERMについて、超過リスクの高確率上界を数値で求めよ。どの確率についての保証かも述べよ。

<!-- solution-start -->
**詳細解答**。[有限クラスERMの定理](#thm-slt1-12-finite-fast-rate)へ代入すると

$$
\frac{2(1+2/3)}{200}\log\frac5{0.1}
=\frac{\log50}{60}
\approx\frac{3.9120}{60}\approx0.0652.
$$

独立同分布の訓練標本 $S$ の抽選について、少なくとも $1-\delta=0.9$ の確率で $R_P(\widehat h)-R_P(h^\star)\le0.0652$ が成立する。新しいテスト点ごとの正解確率0.9を述べたものではない。
<!-- solution-end -->

**問題 SLT1-12-A04（局所クラスの切り替わり）**
- Level: A

問題A01の二仮説クラスで $\mathcal G(r)$ を $0\le r<1/4$ と $r\ge1/4$ に分けて書き、$n=1$ での $\mathfrak R_1^{\mathrm{loc}}(r)$ を双方求めよ。

<!-- solution-start -->
**詳細解答**。$\mu_{h^\star}=0$、$\mu_{h_b}=1/4$ より、半径が $1/4$ 未満のときは $\mathcal G(r)=\{0\}$。この場合、符号付き和は常に0で複雑度も0である。$r\ge1/4$ では $\mathcal G(r)=\{0,\boldsymbol1_{\{X=b\}}\}$。一標本なら上限は $\max(0,\sigma\boldsymbol1_{\{X=b\}})$。$X=b,\sigma=+1$ の場合だけ1、その他は0だから

$$
\mathfrak R_1^{\mathrm{loc}}(r)=\frac14\cdot\frac12=\frac18.
$$

ここでは $\mathbb E_\sigma$ だけでなく $\mathbb E_X$ も取っている。[局所複雑度の定義](#def-slt1-12-local-complexity)の量化順序と一致する。
<!-- solution-end -->

**問題 SLT1-12-A05（Bernstein集中の代入）**
- Level: A

独立な二値誤分類差 $g(Z_i)\in\{0,1\}$ に $Pg=1/4$ が成立するとする。$n=100$ のとき $\Pr\{P_ng\le0\}$ を、第3節の片側Bernstein補題と $c=2$ を使って上から抑えよ。また真の確率も計算し、評価が上界であることを確認せよ。

<!-- solution-start -->
**詳細解答**。$\mu=1/4$、$Pg^2=1/4$ なので $B=1$ を使える。$X_i=\mu-g(Z_i)$ は中心化され $|X_i|\le2$、$\sum_i\mathbb E X_i^2\le100\cdot1/4=25$。[片側Bernstein補題](#lem-slt1-12-bernstein-tail)で $t=n\mu=25$ とすると

$$
\Pr\{P_ng\le0\}
\le\exp\left(-\frac{25^2}{2(25+2\cdot25/3)}\right)
=e^{-7.5}\approx0.000553.
$$

実際の事象は100回とも $g=0$ となることで、その確率は $(3/4)^{100}\approx3.21\cdot10^{-13}$。上界は厳密な確率と一致する必要はなく、これを上回っていればよい。
<!-- solution-end -->

**問題 SLT1-12-B01（平均0でも揺らぐ反例）**
- Level: B

$X=a$ が確率1、$\Pr(Y=+1)=\Pr(Y=-1)=1/2$ とする。常に $+1$ と常に $-1$ を予測する二分類器の一方を $h^\star$ として、Bernstein条件がどの $B<\infty$ でも成立しないことを証明せよ。どの追加条件が失われたかも説明せよ。

<!-- solution-start -->
**詳細解答**。両予測器のリスクは $1/2$ なのでどちらも母集団最小化子である。$h^\star$ を常に $+1$ とし、もう一方を $h$ とする。$Y=+1$ なら $g_h=1$、$Y=-1$ なら $g_h=-1$ だから

$$
Pg_h=\frac12-\frac12=0,\qquad
Pg_h^2=\frac12+\frac12=1.
$$

[Bernstein条件](#def-slt1-12-excess-bernstein)なら $1\le B\cdot0=0$ が必要になり、有限 $B$ では不可能である。$[0,1]$ 値損失・独立同分布標本・有限クラスという他の仮定は満たしているが、最適候補との差の二乗平均がその平均に比例するという**分散制御の追加仮定**を失った。[Massart型margin](#def-slt1-12-massart-margin)でも $\eta=1/2$ なので正の $\kappa$ を取れない。従って第4節の線形指数を使えない。
<!-- solution-end -->

**問題 SLT1-12-B02（条件付きの不一致分解）**
- Level: B

$Y\in\{-1,+1\}$、$\eta(x)=P(Y=+1\mid X=x)$ は可測とし、$\mathcal H$ はBayes分類器 $h^\star$ を含む可測な二値分類器の有限クラスとする。$P_X$-ほとんど確実に $|2\eta(X)-1|\ge\kappa$ が成立する $\kappa\in(0,1]$ を仮定する。任意の $h$ に対し、入力の不一致集合 $D_h=\{x:h(x)\ne h^\star(x)\}$ と置く。$Pg_h$ と $Pg_h^2$ を $D_h$ と $\eta$ だけで表し、$B=1/\kappa$ のBernstein条件を導け。

<!-- solution-start -->
**詳細解答**。$X\notin D_h$ では同じ予測で二つの損失が等しいから $g_h=0$。$X\in D_h$ ではラベルが二値なので予測は逆であり、損失差は $+1$ または $-1$ である。従って

$$
g_h^2(X,Y)=\boldsymbol1_{D_h}(X).
$$

次に不一致入力で条件付き平均を二通りに分ける。$h^\star(x)=+1$ なら $E(g_h\mid X=x)=2\eta(x)-1$、$h^\star(x)=-1$ なら $E(g_h\mid X=x)=1-2\eta(x)$ である。Bayes最適性から前者では $\eta(x)\ge1/2$、後者では $\eta(x)\le1/2$ だから、両者とも $|2\eta(x)-1|$ に等しい。よって

$$
Pg_h^2=P_X(D_h),\qquad
Pg_h=E_X[|2\eta(X)-1|\boldsymbol1_{D_h}(X)].
$$

[$\kappa$-margin条件](#def-slt1-12-massart-margin)を指示関数の内側に使えば $Pg_h\ge\kappa P_X(D_h)=\kappa Pg_h^2$。$\kappa>0$ で割って $Pg_h^2\le(1/\kappa)Pg_h$ を得る。Bayes分類器を含むことが条件付き平均の符号に必要だった。
<!-- solution-end -->

**問題 SLT1-12-B03（局所複雑度の固定点）**
- Level: B

有限クラスの全ての超過損失 $g$ が $|g|\le1$、$Pg^2\le B Pg$ を満たすとする。$\mathcal G(r)$ 内の符号付き和の指数モーメントから

$$
\mathfrak R_n^{\mathrm{loc}}(r)
\le\sqrt{\frac{2Br\log M}{n}}+\frac{\log M}{3n}
$$

を導き、右辺が $r/2$ 以下となる十分条件を具体的に与えよ。$M\ge2$、$r>0$ としてよい。

<!-- solution-start -->
**詳細解答**。固定 $g\in\mathcal G(r)$ では $U_i=\sigma_i g(Z_i)$ は独立・中心化・$|U_i|\le1$ であり、$E U_i^2=Pg^2\le Br$。[指数モーメント評価](#lem-slt1-12-bernstein-tail)を $\lambda<3$ に使うと

$$
\log E\exp\left(\lambda\sum_iU_i\right)
\le\frac{\lambda^2nBr}{2(1-\lambda/3)}.
$$

最大値の指数を高々 $M$ 個の指数の和で抑え、指数関数の凸性から $e^{\lambda E V}\le E e^{\lambda V}$ を使うと、$L=\log M$ として

$$
\mathfrak R_n^{\mathrm{loc}}(r)
\le\frac1n\left\{\frac L\lambda+
\frac{\lambda nBr}{2(1-\lambda/3)}\right\}.
$$

$v=nBr$、$a=\sqrt{2L/v}$、$\lambda=a/(1+a/3)$ と置く。この値は0と3の間に入り、

$$
\frac L\lambda=\sqrt{\frac{vL}{2}}+\frac L3,\qquad
\frac{\lambda v}{2(1-\lambda/3)}
=\sqrt{\frac{vL}{2}}.
$$

これらを足して $n$ で割ると求める式になる。次に $q=L/n$ とすれば、$r\ge32Bq$ から $\sqrt{2Brq}\le r/4$、$r\ge4q/3$ から $q/3\le r/4$。従って

$$
r\ge\max\{32B,4/3\}\frac{\log M}{n}
$$

は右辺が $r/2$ 以下となる十分条件である。これは局所期待値の評価であり、それ単独を高確率ERM定理と取り違えない。
<!-- solution-end -->

**問題 SLT1-12-B04（近似ERMの最適化誤差）**
- Level: B

第4節の有限クラスとBernstein条件を仮定する。標本依存の $\widetilde h\in\mathcal H$ が、事前に固定された $\varepsilon_{\mathrm{opt}}\ge0$ に対し $P_n\ell(\widetilde h)\le P_n\ell(h^\star)+\varepsilon_{\mathrm{opt}}$ を満たすとする。確率 $1-\delta$ 以上で

$$
R_P(\widetilde h)-R_P(h^\star)
\le 2\varepsilon_{\mathrm{opt}}
+\frac{8(B+2/3)}{n}\log\frac M\delta
$$

となることを証明せよ（最適な定数までは要求しない）。

<!-- solution-start -->
**詳細解答**。固定 $h$ で $\mu=Pg_h>2\varepsilon_{\mathrm{opt}}$ とする。$P_ng_h\le\varepsilon_{\mathrm{opt}}$ なら $\sum_i(\mu-g_h(Z_i))\ge n(\mu-\varepsilon_{\mathrm{opt}})$。[片側Bernstein補題](#lem-slt1-12-bernstein-tail)で $c=2$ と分散上界 $nB\mu$ を使うと

$$
\Pr\{P_ng_h\le\varepsilon_{\mathrm{opt}}\}
\le\exp\left(
-\frac{n(\mu-\varepsilon_{\mathrm{opt}})^2}
{2(B\mu+(2/3)(\mu-\varepsilon_{\mathrm{opt}}))}
\right).
$$

$\mu>2\varepsilon_{\mathrm{opt}}$ なら $\mu-\varepsilon_{\mathrm{opt}}>\mu/2$、分母の括弧は $(B+2/3)\mu$ 以下。従って上の確率は $\exp[-n\mu/(8(B+2/3))]$ 以下である。$L=\log(M/\delta)$ と置き、$\mu>8(B+2/3)L/n$ の候補全てへ合併評価すると、確率 $1-\delta$ 以上でそれらの候補は $P_ng_h>\varepsilon_{\mathrm{opt}}$ になる。ところが仮定から $P_ng_{\widetilde h}\le\varepsilon_{\mathrm{opt}}$。よって $\mu_{\widetilde h}\le\max\{2\varepsilon_{\mathrm{opt}},8(B+2/3)L/n\}$、これは要求された和以下である。最適化誤差を0とすれば真のERMだが、この導出の定数は第4節より緩い。
<!-- solution-end -->

**問題 SLT1-12-C01（marginから局所化・速い率まで）**
- Level: C

$\mathcal H$ は $M\ge2$ 個の可測な二値分類器からなる標本前固定クラス、$h^\star\in\mathcal H$ はBayes分類器とする。$(X_i,Y_i)$ は独立同分布、$Y_i\in\{-1,+1\}$、$\eta(x)=P(Y=+1\mid X=x)$ は可測とする。$|2\eta(X)-1|\ge\kappa>0$ がほとんど確実に成立すると仮定する。0–1損失を用い、以下を一つの論証として導け。

1. 超過損失 $g_h$ の条件付き期待値と二乗平均を求め、$Pg_h^2\le Pg_h/\kappa$ を示す。
2. $n$ 標本のERMの超過リスクについて、確率 $1-\delta$ の明示的な $O(\log(M/\delta)/n)$ 上界を証明する。集中不等式への変数・分散・幅の代入を記す。
3. $\mathcal G(r)$ の局所Rademacher複雑度の上界を書き、半径に対する固定点スケールを求める。
4. $X$ が一点、$\eta=1/2+\varepsilon$ の二分類器模型で $\varepsilon\downarrow0$ としたとき、なぜ $\kappa$ と $B$ を固定した一様な結論が出ないか説明する。

<!-- solution-start -->
**詳細解答**。

1. $D_h=\{x:h(x)\ne h^\star(x)\}$ と置く。$D_h^c$ では損失差が0、$D_h$ では反対の予測だから差は $\pm1$ である。Bayes則により正しい優勢ラベルを選ぶのは $h^\star$ なので

   $$
   \begin{aligned}
   g_h^2(X,Y)&=\boldsymbol1_{D_h}(X),\\
   E[g_h\mid X]&=|2\eta(X)-1|\boldsymbol1_{D_h}(X),\\
   Pg_h&=E_X[|2\eta(X)-1|\boldsymbol1_{D_h}(X)]
   \ge\kappa P_X(D_h)=\kappa Pg_h^2.
   \end{aligned}
   $$

   $\kappa>0$ なので $B=1/\kappa\ge1$ の[Bernstein条件](#def-slt1-12-excess-bernstein)を得る。

2. 固定 $h$ の $\mu_h=Pg_h>0$ について $X_i'=\mu_h-g_h(X_i,Y_i)$ を取る。独立、平均0、$|X_i'|\le2$ であり、

   $$
   \sum_iE(X_i')^2
   =n(Pg_h^2-\mu_h^2)\le\frac{n\mu_h}{\kappa}.
   $$

   $P_ng_h\le0$ の事象は $\sum_iX_i'\ge n\mu_h$。[片側Bernstein補題](#lem-slt1-12-bernstein-tail)へ $t=n\mu_h$、$c=2$、$v\le n\mu_h/\kappa$ を代入すると

   $$
   \Pr(P_ng_h\le0)
   \le\exp\left(-\frac{n\mu_h}{2(1/\kappa+2/3)}\right).
   $$

   $r=2(1/\kappa+2/3)\log(M/\delta)/n$ とすると、$\mu_h>r$ の各候補にこの事象が起こる確率は $\delta/M$ 未満。高々 $M$ 個について合併評価すれば確率 $1-\delta$ 以上で、$\mu_h>r$ の全候補は $P_ng_h>0$。ERMは $P_ng_{\widehat h}\le0$ なので、その事象で

   $$
   R_P(\widehat h)-R_P(h^\star)=\mu_{\widehat h}
   \le\frac{2(1/\kappa+2/3)}n\log\frac M\delta.
   $$

3. 局所半径 $r$ 内では $Pg_h^2\le r/\kappa$。独立符号を掛けた和の各項は絶対値1以下、全分散は $nr/\kappa$ 以下なので、[局所有限クラス評価](#prop-slt1-12-local-bound)から

   $$
   \mathfrak R_n^{\mathrm{loc}}(r)
   \le\sqrt{\frac{2r\log M}{\kappa n}}+\frac{\log M}{3n}.
   $$

   $a=\log M/n$ と置くと、$r\ge32a/\kappa$ なら平方根項が $r/4$ 以下、$r\ge4a/3$ なら第二項も $r/4$ 以下になる。従って $r_0=\max\{32/\kappa,4/3\}a$ は局所上界が半径の半分以下となる一つの十分な固定点スケールである。第2問の高確率界をこの期待複雑度の評価だけから推論したわけではない。

4. $X$ が一点で $\eta=1/2+\varepsilon$、$\mathcal H$ が二つの定数分類器なら、最適 $h^\star$ は $+1$ を返し、もう一方は $-1$ を返す。超過損失はラベルに従って $+1$ または $-1$ を取るので

   $$
   Pg_h=2\varepsilon,\qquad
   Pg_h^2=1,\qquad
   \kappa=2\varepsilon,\qquad
   B\ge\frac1{2\varepsilon}.
   $$

   $\varepsilon\downarrow0$ ではmargin幅の正の下限・Bernstein定数の有限上限を一様に固定できず、第2問の係数も発散する。$\varepsilon=0$ では $Pg_h=0$、$Pg_h^2=1$ で条件自体が偽になる。**一般のagnostic問題へ速い率を無条件に拡張できない**理由はここにある。
<!-- solution-end -->

## まとめ

有限クラスERMが通常の平方根型を超えて速く収束できるのは、損失差の二乗平均が超過リスクとともに小さくなるときである。Bernstein条件 $Pg_h^2\le B Pg_h$ の下で固定した悪い候補が経験標本で最適に見える確率は $\exp[-c nPg_h]$ となり、合併評価によって $O(B\log(M/\delta)/n)$ を得た。

局所Rademacher複雑度は、超過リスクの小さい候補に限定すると揺らぎ自体が小さくなることを可視化する。Massart型marginはこの分散制御を保証する一つの具体条件だが、五分五分のラベルや増大する仮説クラスでは定数・率の保証を持ち越せない。
