---
id: prob-conditional-multiplication
title: 条件付き確率から共通部分の確率を求める
category: math-probability
subcategory: math-events
topic: conditional-probability
type: formula
difficulty: 1
priority: B
hashtags: [条件付き確率, 乗法公式, 確率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き確率 }]
---
## 問題
$P(B)=0.4$、$P(A\mid B)=0.75$ のとき、$P(A\cap B)$ を求めよ。

## 答え
条件付き確率の定義を $P(A\cap B)$ について解く。

## 使用公式・定理
$P(B)>0$ のとき、乗法公式は
$$P(A\cap B)=P(A\mid B)P(B)$$
である。

## 計算例
公式へ値を代入すると
$$\begin{aligned}P(A\cap B)&=P(A\mid B)P(B)\\&=0.75\cdot0.4\\&=0.30.\end{aligned}$$

## 一手
「$B$ が起きた条件下で $A$」と「$B$」が与えられたら、両者を掛けて共通部分へ戻す。

## 注意
$P(A\mid B)$ と $P(B\mid A)$ を入れ替えない。

<!-- CARD -->
---
id: prob-total-probability
title: 場合分けして全確率を求める
category: math-probability
subcategory: math-events
topic: total-probability
type: calc_step
difficulty: 1
priority: B
hashtags: [全確率, 条件付き確率, 場合分け]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率の計算 }]
---
## 問題
製品の $60\%$ を工場 $A$、$40\%$ を工場 $B$ が作る。不良率はそれぞれ $1\%$、$3\%$ である。無作為に選んだ製品が不良である確率を求めよ。

## 答え
製造工場で場合分けし、それぞれの「工場を選ぶ確率×条件付き不良率」を足す。

## 使用公式・定理
$A_1,\ldots,A_k$ が標本空間の分割なら、全確率の公式は
$$P(D)=\sum_{j=1}^kP(D\mid A_j)P(A_j)$$
である。

## 計算例
工場 $A,B$ は排反で全製品を尽くすから
$$\begin{aligned}P(D)&=P(D\mid A)P(A)+P(D\mid B)P(B)\\&=0.01\cdot0.60+0.03\cdot0.40\\&=0.006+0.012\\&=0.018.\end{aligned}$$

## 一手
原因が複数ある確率は、原因ごとの経路確率に分解する。

## 注意
不良率だけを $0.01+0.03$ と足さず、生産割合を掛ける。

<!-- CARD -->
---
id: prob-independent-events
title: 積の確率で2事象の独立性を確かめる
category: math-probability
subcategory: math-events
topic: independence
type: condition
difficulty: 1
priority: A
hashtags: [統計的独立, 共通部分, 条件]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 統計的独立 }, { type: past_exam, id: MATH-2022-Q1, topic: 確率空間・独立性 }]
---
## 問題
硬貨を2回投げる。$A=$「1回目が表」、$B=$「2回目が表」とする。$A$ と $B$ が独立であることを確かめよ。

## 答え
$P(A\cap B)$ と $P(A)P(B)$ が等しいことを確認する。

## 使用公式・定理
2事象 $A,B$ が独立であるための条件は
$$P(A\cap B)=P(A)P(B)$$
である。

## 計算例
4通りの結果 $(\text{表},\text{表}),(\text{表},\text{裏}),(\text{裏},\text{表}),(\text{裏},\text{裏})$ は等確率なので
$$P(A)=\frac12,\qquad P(B)=\frac12,\qquad P(A\cap B)=\frac14.$$
一方、
$$P(A)P(B)=\frac12\cdot\frac12=\frac14=P(A\cap B).$$
したがって $A$ と $B$ は独立である。

## 一手
独立性は印象で判断せず、共通部分と周辺確率の積を比較する。

## 注意
排反な事象は、両方の確率が正なら独立ではない。

<!-- CARD -->
---
id: prob-pairwise-not-mutual
title: ペアごとの独立と相互独立を区別する
category: math-probability
subcategory: math-events
topic: mutual-independence
type: pitfall
difficulty: 2
priority: B
hashtags: [統計的独立, 相互独立, 典型的な罠]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 統計的独立 }]
---
## 問題
$(U,V)$ は $(0,0),(0,1),(1,0),(1,1)$ を各確率 $1/4$ で取る。$A=\{U=0\}$、$B=\{V=0\}$、$C=\{U=V\}$ とする。3事象は相互独立か。

## 答え
どの2事象も独立だが、3事象は相互独立ではない。

## 使用公式・定理
$A,B,C$ の相互独立には、ペアごとの積の条件に加えて
$$P(A\cap B\cap C)=P(A)P(B)P(C)$$
が必要である。

## 計算例
$P(A)=P(B)=P(C)=1/2$ であり、各ペアの共通部分は1結果だけなので確率 $1/4=(1/2)^2$ である。しかし
$$A\cap B\cap C=\{(0,0)\}$$
だから
$$P(A\cap B\cap C)=\frac14\ne\frac18=P(A)P(B)P(C).$$
よってペアごとには独立だが、相互独立ではない。

## 一手
3事象以上では、ペアだけでなく全ての組合せの積条件を確認する。

## 注意
「任意の2事象が独立」から「全事象が相互独立」と結論しない。

<!-- CARD -->
---
id: prob-cdf-from-density
title: 確率密度関数を積分して累積分布関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: cdf-density
type: calc_step
difficulty: 1
priority: A
hashtags: [累積分布関数, 確率密度関数, 積分]
frequency: { past_exam: 2, textbook: 0, independent_problems: 0, source_confirmations: 2 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }, { type: past_exam, id: MATH-2024-Q2, topic: 半径の分布 }, { type: past_exam, id: MATH-2018-Q5, topic: 順序統計量の確率密度 }]
---
## 問題
$X$ の確率密度関数が $f_X(x)=2x$（$0<x<1$）、それ以外で $0$ である。累積分布関数 $F_X(x)$ を求めよ。

## 答え
台の左端から $x$ まで確率密度関数を積分し、台の外側も場合分けする。

## 使用公式・定理
連続分布では
$$F_X(x)=P(X\le x)=\int_{-\infty}^x f_X(u)\,du$$
である。

## 計算例
$0\le x<1$ では
$$F_X(x)=\int_0^x2u\,du=[u^2]_0^x=x^2.$$
端点の外側も含めると
$$F_X(x)=\begin{cases}0&(x<0),\\x^2&(0\le x<1),\\1&(x\ge1).\end{cases}$$

## 一手
積分だけで終えず、累積分布関数が $0$ から $1$ へ移る全範囲を書く。

## 注意
$0<x<1$ の式だけを書いて、$x<0$ と $x\ge1$ を落とさない。

<!-- CARD -->
---
id: prob-survival-hazard
title: 生存関数から危険率を求める
category: math-probability
subcategory: math-distribution-functions
topic: survival-hazard
type: formula
difficulty: 2
priority: A
hashtags: [生存関数, 危険率, 指数分布]
frequency: { past_exam: 2, textbook: 0, independent_problems: 0, source_confirmations: 2 }
sources: [{ type: official_syllabus, topic: 生存関数と危険率 }, { type: past_exam, id: SCI-2019-Q1, topic: 生存関数・平均残存寿命 }, { type: past_exam, id: SCI-2017-Q2, topic: 指数待時間・故障率 }]
---
## 問題
$X$ はrate $2$ の指数分布に従い、台は $x>0$、確率密度関数は $f_X(x)=2e^{-2x}$ である。$t>0$ で生存関数 $S_X(t)$ と危険率 $h_X(t)$ を求めよ。

## 答え
生存関数は $t$ より長く生存する確率、危険率は確率密度関数を生存関数で割った値である。

## 使用公式・定理
$$S_X(t)=P(X>t)=\int_t^\infty f_X(x)\,dx,\qquad h_X(t)=\frac{f_X(t)}{S_X(t)}.$$

## 計算例
まず
$$\begin{aligned}S_X(t)&=\int_t^\infty2e^{-2x}\,dx\\&=[-e^{-2x}]_t^\infty\\&=e^{-2t}.\end{aligned}$$
したがって
$$h_X(t)=\frac{2e^{-2t}}{e^{-2t}}=2.$$

## 一手
危険率では分母に、その時点まで生存している確率を置く。

## 注意
指数分布の危険率は $t$ に依存しない。

<!-- CARD -->
---
id: prob-marginal-density
title: 同時確率密度関数を積分して周辺密度を求める
category: math-probability
subcategory: math-distribution-functions
topic: marginal-density
type: calc_step
difficulty: 2
priority: A
hashtags: [同時分布, 周辺分布, 積分範囲]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 同時分布と周辺分布 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }]
---
## 問題
$(X,Y)$ の同時確率密度関数が $f_{X,Y}(x,y)=2$（$0<y<x<1$）、それ以外で $0$ である。$X$ の周辺密度 $f_X(x)$ を求めよ。

## 答え
$x$ を固定し、台 $0<y<x$ の範囲で $y$ を積分する。

## 使用公式・定理
$$f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy.$$

## 計算例
$0<x<1$ では $y$ の範囲が $0<y<x$ なので
$$\begin{aligned}f_X(x)&=\int_0^x2\,dy\\&=[2y]_0^x\\&=2x.\end{aligned}$$
したがって
$$f_X(x)=\begin{cases}2x&(0<x<1),\\0&\text{それ以外}.\end{cases}$$
検算すると $\int_0^1 2x\,dx=1$ である。

## 一手
周辺化では、同時分布の台を図形として読み、消す変数の積分範囲を先に決める。

## 注意
三角形の台なのに、機械的に $0<y<1$ と積分しない。

<!-- CARD -->
---
id: prob-conditional-density
title: 同時密度を周辺密度で割って条件付き密度を求める
category: math-probability
subcategory: math-distribution-functions
topic: conditional-density
type: calc_step
difficulty: 2
priority: A
hashtags: [条件付き分布, 同時分布, 周辺分布]
frequency: { past_exam: 3, textbook: 0, independent_problems: 0, source_confirmations: 3 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }, { type: past_exam, id: MATH-2018-Q4, topic: 条件付き2変量正規分布 }, { type: past_exam, id: MATH-2017-Q4, topic: 正規分布の条件付き分布 }]
---
## 問題
$(X,Y)$ の同時確率密度関数が $f_{X,Y}(x,y)=2$（$0<y<x<1$）、それ以外で $0$ である。$0<x<1$ を固定したとき、$Y\mid X=x$ の条件付き密度を求めよ。

## 答え
同時密度を $X$ の周辺密度で割り、条件を固定した後の台 $0<y<x$ を残す。

## 使用公式・定理
$f_X(x)>0$ のとき
$$f_{Y\mid X}(y\mid x)=\frac{f_{X,Y}(x,y)}{f_X(x)}.$$

## 計算例
まず $0<x<1$ で
$$f_X(x)=\int_0^x2\,dy=2x.$$
よって
$$f_{Y\mid X}(y\mid x)=\frac{2}{2x}=\frac1x\qquad(0<y<x).$$
それ以外の $y$ では $0$ であり、
$$\int_0^x\frac1x\,dy=1$$
となる。

## 一手
条件付き分布は「同時分布÷条件側の周辺分布」で作る。

## 注意
割った後も台は $0<y<x$ であり、$0<y<1$ には広がらない。

<!-- CARD -->
---
id: prob-pgf-moments
title: 確率母関数を微分して平均と分散を求める
category: math-probability
subcategory: math-distribution-functions
topic: probability-generating-function
type: formula
difficulty: 2
priority: B
hashtags: [確率母関数, モーメント, ベルヌーイ分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率母関数 }]
---
## 問題
$X$ は成功確率 $1/3$ のベルヌーイ分布に従う。すなわち $P(X=0)=2/3$、$P(X=1)=1/3$ である。確率母関数から $E[X]$ と $\operatorname{Var}(X)$ を求めよ。

## 答え
確率母関数を微分し、$s=1$ を代入して階乗モーメントを得る。

## 使用公式・定理
非負整数値の $X$ について
$$G_X(s)=E[s^X],\quad E[X]=G_X'(1),\quad E[X(X-1)]=G_X''(1),$$
$$\operatorname{Var}(X)=G_X''(1)+G_X'(1)-G_X'(1)^2.$$

## 計算例
$$G_X(s)=\frac23s^0+\frac13s^1=\frac23+\frac13s.$$
したがって
$$G_X'(s)=\frac13,\qquad G_X''(s)=0.$$
公式へ代入すると
$$E[X]=\frac13,$$
$$\operatorname{Var}(X)=0+\frac13-\left(\frac13\right)^2=\frac29.$$

## 一手
2階微分から直接得るのは $E[X^2]$ ではなく $E[X(X-1)]$ である。

## 注意
$G_X''(1)$ だけを二次モーメントと誤認しない。

<!-- CARD -->
---
id: prob-mgf-independent-sum
title: 独立な和のモーメント母関数を積で求める
category: math-probability
subcategory: math-distribution-functions
topic: mgf-independent-sum
type: formula
difficulty: 2
priority: B
hashtags: [モーメント母関数（積率母関数）, 統計的独立, 確率変数の和]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: モーメント母関数 }]
---
## 問題
$X,Y$ は独立で、それぞれ成功確率 $1/2$ のベルヌーイ分布に従う。すなわち $P(X=0)=P(X=1)=1/2$ で、$Y$ も同様である。$S=X+Y$ のモーメント母関数を求め、$S$ の確率質量を読み取れ。

## 答え
独立性により和のモーメント母関数を積へ分解し、$e^{kt}$ の係数を $P(S=k)$ として読む。

## 使用公式・定理
モーメント母関数は $M_X(t)=E[e^{tX}]$ であり、独立な $X,Y$ では
$$M_{X+Y}(t)=M_X(t)M_Y(t)$$
である。

## 計算例
まず
$$M_X(t)=M_Y(t)=\frac12+\frac12e^t.$$
したがって
$$\begin{aligned}M_S(t)&=\left(\frac12+\frac12e^t\right)^2\\&=\frac14+\frac12e^t+\frac14e^{2t}.\end{aligned}$$
一方、$M_S(t)=\sum_{k=0}^2P(S=k)e^{kt}$ だから
$$P(S=0)=\frac14,\qquad P(S=1)=\frac12,\qquad P(S=2)=\frac14.$$

## 一手
和と独立性を見たら、母関数では積へ変換する。

## 注意
独立でなければ $E[e^{tX}e^{tY}]$ を期待値の積へ分解できない。

<!-- CARD -->
---
id: prob-complement-at-least-one
title: 少なくとも1回を補集合で求める
category: math-probability
subcategory: math-events
topic: complement-rule
type: strategy
difficulty: 1
priority: B
hashtags: [補集合, 少なくとも, 独立試行]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率の計算 }]
---
## 問題
成功確率 $0.2$ の独立な試行を3回行う。少なくとも1回成功する確率を求めよ。

## 答え
「少なくとも1回」の補集合は「1回も成功しない」なので、後者を1から引く。

## 使用公式・定理
任意の事象 $A$ について
$$P(A)=1-P(A^c).$$
独立な3試行が全て失敗する確率は、各失敗確率の積である。

## 計算例
1回の失敗確率は
$$1-0.2=0.8.$$
したがって
$$\begin{aligned}P(\text{少なくとも1回成功})&=1-P(\text{3回とも失敗})\\&=1-0.8^3\\&=1-0.512\\&=0.488.\end{aligned}$$

## 一手
「少なくとも」を見たら、反対側の「一度もない」が積で簡単にならないか確認する。

## 注意
$3\cdot0.2$ は複数回成功する場合を正しく処理していない。

<!-- CARD -->
---
id: prob-inclusion-exclusion-three
title: 3事象の和事象を包除原理で求める
category: math-probability
subcategory: math-events
topic: inclusion-exclusion-three
type: formula
difficulty: 2
priority: B
hashtags: [包除原理, 3事象, 和事象]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 包除原理 }]
---
## 問題
$P(A)=0.5$、$P(B)=0.4$、$P(C)=0.3$、各2事象の共通部分が全て $0.1$、$P(A\cap B\cap C)=0.05$ である。$P(A\cup B\cup C)$ を求めよ。

## 答え
単独確率を足し、2事象の重複を引き、引きすぎた3事象の共通部分を戻す。

## 使用公式・定理
$$\begin{aligned}P(A\cup B\cup C)={}&P(A)+P(B)+P(C)\\&-P(A\cap B)-P(A\cap C)-P(B\cap C)\\&+P(A\cap B\cap C).\end{aligned}$$

## 計算例
$$\begin{aligned}P(A\cup B\cup C)&=0.5+0.4+0.3\\&\quad-0.1-0.1-0.1+0.05\\&=0.95.\end{aligned}$$

## 一手
3重共通部分は単独和で3回足され、ペアの項で3回引かれるため、最後に1回足す。

## 注意
2事象用の公式をそのまま使って3重共通部分を落とさない。

<!-- CARD -->
---
id: prob-chain-rule-three
title: 条件付き確率の連鎖則で3事象の共通部分を求める
category: math-probability
subcategory: math-events
topic: probability-chain-rule
type: formula
difficulty: 2
priority: B
hashtags: [条件付き確率, 連鎖則, 共通部分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き確率 }]
---
## 問題
$P(A)=0.8$、$P(B\mid A)=0.5$、$P(C\mid A\cap B)=0.25$ のとき、$P(A\cap B\cap C)$ を求めよ。

## 答え
事象を順に条件へ取り込み、3つの確率を掛ける。

## 使用公式・定理
$P(A\cap B)>0$ のとき
$$P(A\cap B\cap C)=P(A)P(B\mid A)P(C\mid A\cap B).$$

## 計算例
$$\begin{aligned}P(A\cap B\cap C)&=0.8\cdot0.5\cdot0.25\\&=0.4\cdot0.25\\&=0.10.\end{aligned}$$

## 一手
木の枝を1段ずつ進むように、それまでの事象を次の条件へ入れる。

## 注意
$P(C\mid A\cap B)$ を $P(C\mid B)$ に置き換えない。

<!-- CARD -->
---
id: prob-independent-complements
title: 独立な事象の補事象も独立と示す
category: math-probability
subcategory: math-events
topic: independence-complements
type: proof_step
difficulty: 2
priority: B
hashtags: [統計的独立, 補事象, 証明の一手]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 統計的独立 }]
---
## 問題
$A,B$ が独立で、$P(A)=0.4$、$P(B)=0.5$ である。$A^c$ と $B$ が独立であることを式で示し、$P(A^c\cap B)$ を求めよ。

## 答え
$B$ を $(A\cap B)$ と $(A^c\cap B)$ に分割する。

## 使用公式・定理
$A,B$ の独立性から $P(A\cap B)=P(A)P(B)$ である。また
$$P(A^c\cap B)=P(B)-P(A\cap B).$$

## 計算例
$$\begin{aligned}P(A^c\cap B)&=P(B)-P(A)P(B)\\&=P(B)\{1-P(A)\}\\&=P(B)P(A^c).\end{aligned}$$
数値を入れると
$$P(A^c\cap B)=0.5(1-0.4)=0.3=0.6\cdot0.5.$$
よって $A^c$ と $B$ も独立である。

## 一手
補事象との共通部分は、元の事象から共通部分を引いて作る。

## 注意
独立性を使った箇所は $P(A\cap B)=P(A)P(B)$ の1か所である。

<!-- CARD -->
---
id: prob-conditioning-breaks-independence
title: 条件付けで独立性が失われる例を判定する
category: math-probability
subcategory: math-events
topic: conditional-independence-pitfall
type: pitfall
difficulty: 2
priority: B
hashtags: [条件付き確率, 統計的独立, 典型的な罠]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き確率と統計的独立 }]
---
## 問題
硬貨を2回投げ、$A=$「1回目が表」、$B=$「2回目が表」、$C=$「表がちょうど1回」とする。$A,B$ は独立だが、$C$ の下でも条件付き独立か。

## 答え
$C$ の下では $A$ と $B$ は同時に起こらないので、条件付き独立ではない。

## 使用公式・定理
$P(C)>0$ の下での条件付き独立には
$$P(A\cap B\mid C)=P(A\mid C)P(B\mid C)$$
が必要である。

## 計算例
$C$ の下では $(\text{表},\text{裏})$ と $(\text{裏},\text{表})$ が各条件付き確率 $1/2$ なので
$$P(A\mid C)=\frac12,\qquad P(B\mid C)=\frac12.$$
しかし $A\cap B\cap C=\varnothing$ だから
$$P(A\cap B\mid C)=0\ne\frac14=P(A\mid C)P(B\mid C).$$

## 一手
無条件の独立性と、ある情報を与えた後の条件付き独立性は別々に検査する。

## 注意
条件付けは独立性を常に保存するわけではない。

<!-- CARD -->
---
id: prob-density-normalization
title: 確率密度関数の定数を正規化で決める
category: math-probability
subcategory: math-distribution-functions
topic: density-normalization
type: calc_step
difficulty: 1
priority: B
hashtags: [確率密度関数, 正規化, 積分]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 確率密度関数 }]
---
## 問題
$f_X(x)=cx^2$（$0<x<1$）、それ以外で $0$ が確率密度関数となるように、定数 $c$ を求めよ。

## 答え
確率密度関数の全積分が1になる条件を使う。

## 使用公式・定理
確率密度関数は非負であり
$$\int_{-\infty}^{\infty}f_X(x)\,dx=1$$
を満たす。

## 計算例
$$\begin{aligned}1&=\int_0^1cx^2\,dx\\&=c\left[\frac{x^3}{3}\right]_0^1\\&=\frac{c}{3}.\end{aligned}$$
したがって
$$c=3.$$

## 一手
未知定数を含む密度では、まず台全体で積分して1へ等置する。

## 注意
$f_X(x)\le1$ は密度の必要条件ではない。

<!-- CARD -->
---
id: prob-cdf-jump-mass
title: 累積分布関数の跳びから点確率を求める
category: math-probability
subcategory: math-distribution-functions
topic: cdf-jump
type: formula
difficulty: 2
priority: B
hashtags: [累積分布関数, 点確率, 左極限]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }]
---
## 問題
累積分布関数 $F_X$ が $F_X(2)=0.7$、左極限 $F_X(2-)=0.4$ を満たす。$P(X=2)$ を求めよ。

## 答え
点 $2$ にある確率質量は、累積分布関数の跳びの大きさである。

## 使用公式・定理
$$P(X=a)=F_X(a)-F_X(a-),$$
ここで $F_X(a-)=\lim_{x\uparrow a}F_X(x)$ である。

## 計算例
$$\begin{aligned}P(X=2)&=F_X(2)-F_X(2-)\\&=0.7-0.4\\&=0.3.\end{aligned}$$

## 一手
累積分布関数の不連続点を見たら、右側の値から左極限を引く。

## 注意
$F_X(2)=P(X\le2)$ そのものを $P(X=2)$ としない。

<!-- CARD -->
---
id: prob-discrete-marginal
title: 同時確率表を行方向に足して周辺分布を求める
category: math-probability
subcategory: math-distribution-functions
topic: discrete-marginal
type: calc_step
difficulty: 1
priority: B
hashtags: [同時分布, 周辺分布, 離散分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布と周辺分布 }]
---
## 問題
同時確率質量関数が $p_{X,Y}(0,0)=0.1$、$p_{X,Y}(0,1)=0.2$、$p_{X,Y}(1,0)=0.3$、$p_{X,Y}(1,1)=0.4$ である。$X$ の周辺確率質量関数を求めよ。

## 答え
$x$ を固定し、取り得る全ての $y$ について同時確率を足す。

## 使用公式・定理
離散分布の周辺確率質量関数は
$$p_X(x)=\sum_y p_{X,Y}(x,y)$$
である。

## 計算例
$$\begin{aligned}p_X(0)&=p_{X,Y}(0,0)+p_{X,Y}(0,1)\\&=0.1+0.2=0.3,\\p_X(1)&=p_{X,Y}(1,0)+p_{X,Y}(1,1)\\&=0.3+0.4=0.7.\end{aligned}$$
検算すると $p_X(0)+p_X(1)=1$ である。

## 一手
周辺化では、残す変数を固定して、消す変数の方向へ合計する。

## 注意
表の行と列のどちらが $X$ かを先に確認する。

<!-- CARD -->
---
id: prob-discrete-conditional
title: 同時確率表から条件付き確率質量関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: discrete-conditional
type: calc_step
difficulty: 1
priority: B
hashtags: [条件付き分布, 同時分布, 離散分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }]
---
## 問題
$p_{X,Y}(0,0)=0.1$、$p_{X,Y}(0,1)=0.2$、$p_{X,Y}(1,0)=0.3$、$p_{X,Y}(1,1)=0.4$ である。$Y\mid X=1$ の条件付き確率質量関数を求めよ。

## 答え
$X=1$ の行を、その行の合計 $p_X(1)$ で割る。

## 使用公式・定理
$p_X(x)>0$ のとき
$$p_{Y\mid X}(y\mid x)=\frac{p_{X,Y}(x,y)}{p_X(x)}.$$

## 計算例
まず
$$p_X(1)=0.3+0.4=0.7.$$
したがって
$$p_{Y\mid X}(0\mid1)=\frac{0.3}{0.7}=\frac37,$$
$$p_{Y\mid X}(1\mid1)=\frac{0.4}{0.7}=\frac47.$$
検算すると $3/7+4/7=1$ である。

## 一手
条件として固定した部分だけを取り出し、その部分内で確率が1になるように割り直す。

## 注意
分母は全確率1ではなく、条件側の周辺確率 $p_X(1)$ である。

<!-- CARD -->
---
id: prob-joint-factorization-independence
title: 同時密度の積分解で独立性を判定する
category: math-probability
subcategory: math-distribution-functions
topic: joint-independence
type: recognition
difficulty: 2
priority: B
hashtags: [同時分布, 統計的独立, 周辺密度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 同時分布と統計的独立 }]
---
## 問題
$(X,Y)$ の同時確率密度関数が $f_{X,Y}(x,y)=4xy$（$0<x<1$, $0<y<1$）、それ以外で $0$ である。$X$ と $Y$ は独立か。

## 答え
両方の周辺密度を求め、その積が長方形の台全体で同時密度に一致するか確かめる。

## 使用公式・定理
$X,Y$ が独立であるための密度による条件は、ほとんどすべての $(x,y)$ について
$$f_{X,Y}(x,y)=f_X(x)f_Y(y)$$
が成り立つことである。

## 計算例
$0<x<1$ では
$$f_X(x)=\int_0^1 4xy\,dy=4x\left[\frac{y^2}{2}\right]_0^1=2x.$$
同様に $f_Y(y)=2y$ なので
$$f_X(x)f_Y(y)=(2x)(2y)=4xy=f_{X,Y}(x,y).$$
台も $(0,1)\times(0,1)$ と積に分かれるため、$X,Y$ は独立である。

## 一手
式の積分解だけでなく、同時分布の台も直積に分かれているか確認する。

## 注意
三角形など変数同士を結び付ける台では、式だけが積の形でも独立とは限らない。
