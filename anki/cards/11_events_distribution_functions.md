---
id: prob-total-probability
title: 場合分けして全確率を求める
category: math-probability
subcategory: math-events
topic: total-probability
type: calc_step
difficulty: 1
priority: S
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
priority: S
hashtags: [統計的独立, 共通部分, 条件]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 統計的独立 }, { type: past_exam, id: MATH-2022-Q1, topic: 確率空間・独立性 }]
---
## 問題
硬貨を2回投げる。$A=$「1回目が表」、$B=$「2回目が表」とする。$A$ と $B$ が独立であることを確かめよ。

## 答え
2回の硬貨投げで「1回目が表」と「2回目が表」は独立である。独立性は共通部分と周辺確率の積を比較して判定する。

## 使用公式・定理
2事象 $A,B$ の独立条件は
$$
P(A\cap B)=P(A)P(B).
$$
一方、排反は
$$
P(A\cap B)=0
$$
をいう。したがって $P(A)>0$, $P(B)>0$ の排反事象では
$$
P(A)P(B)>0=P(A\cap B)
$$
となり、独立ではない。

## 計算例
4結果
$$
(H,H),(H,T),(T,H),(T,T)
$$
が各 $1/4$ なので
$$
P(A)=\frac12,
\qquad
P(B)=\frac12,
\qquad
P(A\cap B)=\frac14.
$$
一方
$$
P(A)P(B)=\frac12\cdot\frac12=\frac14
$$
だから
$$
P(A\cap B)=P(A)P(B),
$$
よって独立である。

対照的に、$P(C)=0.4$, $P(D)=0.5$, $P(C\cap D)=0$ なら $C,D$ は排反だが
$$
P(C)P(D)=0.4\cdot0.5=0.2\ne0=P(C\cap D),
$$
なので独立ではない。

## 一手
「同時に起きない」は排反、「一方の発生が他方の確率を変えない」は独立。言葉の印象でなく $P(A\cap B)$ と $P(A)P(B)$ を比較する。

## 注意
排反と独立を混同しない。3事象以上の相互独立では、ペアごとの積条件だけでなく3重以上の共通部分についても積条件が必要である。

<!-- CARD -->

---
id: prob-pairwise-not-mutual
title: ペアごとの独立と相互独立を区別する
category: math-probability
subcategory: math-events
topic: mutual-independence
type: pitfall
difficulty: 2
priority: A
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
priority: S
hashtags: [累積分布関数, 確率密度関数, 積分]
frequency: { past_exam: 2, textbook: 0, independent_problems: 0, source_confirmations: 2 }
sources: [{ type: official_syllabus, topic: 累積分布関数 }, { type: past_exam, id: MATH-2024-Q2, topic: 半径の分布 }, { type: past_exam, id: MATH-2018-Q5, topic: 順序統計量の確率密度 }]
---
## 問題
$X$ の確率密度関数が $f_X(x)=2x$（$0<x<1$）、それ以外で $0$ である。累積分布関数 $F_X(x)$ を求めよ。

## 答え
$f_X(x)=2x$（$0<x<1$）なら
$$
F_X(x)=\begin{cases}
0,&x<0,\\
x^2,&0\le x<1,\\
1,&x\ge1.
\end{cases}
$$

## 使用公式・定理
累積分布関数は常に
$$
F_X(x)=P(X\le x)
$$
である。

離散型では確率質量を足して
$$
F_X(x)=\sum_{u\le x}p_X(u),
$$
絶対連続型では確率密度関数を積分して
$$
F_X(x)=\int_{-\infty}^x f_X(u)\,du
$$
と得る。

逆向きには、絶対連続な部分で累積分布関数が微分可能なら
$$
f_X(x)=F_X'(x).
$$
一方、点 $a$ の確率質量は微分ではなく跳び幅
$$
P(X=a)=F_X(a)-F_X(a-)
$$
で回収する。

## 計算例
連続型では $0\le x<1$ で
$$
F_X(x)=\int_0^x2u\,du=x^2.
$$
台の外も補って上の区分表示を得る。

離散型の例として
$$P(X=0)=\frac14,\qquad P(X=1)=\frac34$$
なら
$$
F_X(x)=\begin{cases}
0,&x<0,\\
1/4,&0\le x<1,\\
1,&x\ge1.
\end{cases}
$$

逆向きに
$$
F_X(x)=\begin{cases}
0,&x\le0,\\
x^2,&0<x<1,\\
1,&x\ge1
\end{cases}
$$
なら、$0<x<1$ で
$$f_X(x)=F_X'(x)=2x.$$

また
$$F_X(1-)=0.2,\qquad F_X(1)=0.5$$
なら
$$
P(X=1)=0.5-0.2=0.3.
$$

## 一手
累積分布関数を中心に考える。確率質量・確率密度関数からは左側の確率を集め、逆向きでは連続部分は微分、点質量は跳び幅を見る。

## 注意
混合分布では微分だけでは点質量を回収できない。累積分布関数は台の外も含めて0から1まで書き、右連続性を忘れない。

<!-- CARD -->

---
id: prob-marginal-density
title: 同時確率密度関数を積分して周辺密度を求める
category: math-probability
subcategory: math-distribution-functions
topic: marginal-density
type: calc_step
difficulty: 2
priority: S
hashtags: [同時分布, 周辺分布, 積分範囲]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 同時分布と周辺分布 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }]
---
## 問題
$(X,Y)$ の同時確率密度関数が $f_{X,Y}(x,y)=2$（$0<y<x<1$）、それ以外で $0$ である。$X$ の周辺密度 $f_X(x)$ を求めよ。

## 答え
$f_{X,Y}(x,y)=2$（$0<y<x<1$）では
$$
f_X(x)=2x,\qquad0<x<1.
$$

## 使用公式・定理
同時分布から一方の変数を消す操作が周辺化である。離散型では
$$
p_X(x)=\sum_y p_{X,Y}(x,y),
$$
連続型では
$$
f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy.
$$
実際の総和範囲・積分範囲は同時分布の台から決める。

## 計算例
連続型では $0<x<1$ を固定すると $0<y<x$ なので
$$
\begin{aligned}
f_X(x)
&=\int_0^x2\,dy\\
&=2x.
\end{aligned}
$$
検算すると
$$\int_0^12x\,dx=1.$$

離散型で
$$
p(0,0)=0.1,\quad p(0,1)=0.2,\quad
p(1,0)=0.3,\quad p(1,1)=0.4
$$
なら、$Y$ を足し消して
$$
p_X(0)=0.1+0.2=0.3,
$$
$$
p_X(1)=0.3+0.4=0.7.
$$

## 一手
残したい変数を固定し、消したい変数について全て足すか積分する。範囲は式ではなく台から読む。

## 注意
三角形など変数依存の台を長方形として積分しない。離散表では行と列のどちらがどの変数かを先に確認する。

<!-- CARD -->

---
id: prob-conditional-density
title: 同時密度を周辺密度で割って条件付き密度を求める
category: math-probability
subcategory: math-distribution-functions
topic: conditional-density
type: calc_step
difficulty: 2
priority: S
hashtags: [条件付き分布, 同時分布, 周辺分布]
frequency: { past_exam: 3, textbook: 0, independent_problems: 0, source_confirmations: 3 }
sources: [{ type: official_syllabus, topic: 条件付き分布 }, { type: past_exam, id: MATH-2022-Q2, topic: 一様分布・条件付き分布 }, { type: past_exam, id: MATH-2018-Q4, topic: 条件付き2変量正規分布 }, { type: past_exam, id: MATH-2017-Q4, topic: 正規分布の条件付き分布 }]
---
## 問題
$(X,Y)$ の同時確率密度関数が $f_{X,Y}(x,y)=2$（$0<y<x<1$）、それ以外で $0$ である。$0<x<1$ を固定したとき、$Y\mid X=x$ の条件付き密度を求めよ。

## 答え
$f_{X,Y}(x,y)=2$（$0<y<x<1$）では
$$
f_{Y\mid X}(y\mid x)=\frac1x,
\qquad0<y<x.
$$

## 使用公式・定理
条件側の周辺分布が正なら、離散型では
$$
p_{Y\mid X}(y\mid x)
=\frac{p_{X,Y}(x,y)}{p_X(x)},
$$
連続型では
$$
f_{Y\mid X}(y\mid x)
=\frac{f_{X,Y}(x,y)}{f_X(x)}.
$$
どちらも「条件 $X=x$ に対応する行・断面だけを取り出し、その中で総確率1になるよう正規化する」操作である。

## 計算例
連続型では、まず
$$f_X(x)=\int_0^x2\,dy=2x.$$
したがって
$$
f_{Y\mid X}(y\mid x)
=\frac{2}{2x}
=\frac1x,
\qquad0<y<x.
$$
確認すると
$$
\int_0^x\frac1x\,dy=1.
$$

離散型で
$$
p(0,0)=0.1,\quad p(0,1)=0.2,\quad
p(1,0)=0.3,\quad p(1,1)=0.4
$$
とする。周辺確率は
$$p_X(1)=0.3+0.4=0.7.$$
よって
$$
P(Y=0\mid X=1)=\frac{0.3}{0.7}=\frac37,
$$
$$
P(Y=1\mid X=1)=\frac{0.4}{0.7}=\frac47.
$$
2値の条件付き分布の和は1になる。

## 一手
条件付き分布では、まず条件側の周辺分布を求め、その値で同時分布の対応部分を割る。割った後も条件付きの台を保つ。

## 注意
分母は全確率1ではなく条件側の周辺確率・周辺密度である。連続型の $X=x$ は点確率でなく密度の比として扱う。

<!-- CARD -->

---
id: prob-complement-at-least-one
title: 少なくとも1回を補集合で求める
category: math-probability
subcategory: math-events
topic: complement-rule
type: strategy
difficulty: 1
priority: A
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
priority: A
hashtags: [包除原理, 3事象, 和事象]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 包除原理 }]
---
## 問題
$P(A)=0.5$、$P(B)=0.4$、$P(C)=0.3$、各2事象の共通部分が全て $0.1$、$P(A\cap B\cap C)=0.05$ である。$P(A\cup B\cup C)$ を求めよ。

## 答え
包除原理は「足す・ペアを引く・3重を戻す」の順で使う。2事象版は3事象版の $C=\varnothing$ とみなした特殊形である。

## 使用公式・定理
2事象では
$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$
3事象では
$$
\begin{aligned}
P(A\cup B\cup C)
&=P(A)+P(B)+P(C)\\
&\quad-P(A\cap B)-P(A\cap C)-P(B\cap C)\\
&\quad+P(A\cap B\cap C).
\end{aligned}
$$
単独事象を足し、2重に数えたペア共通部分を引き、そこで引き過ぎた3重共通部分を再び足す。

## 計算例
例えば
$$
P(A)=0.50,\quad P(B)=0.40,\quad P(C)=0.30,
$$
$$
P(A\cap B)=0.20,\quad
P(A\cap C)=0.10,\quad
P(B\cap C)=0.08,
$$
$$
P(A\cap B\cap C)=0.05
$$
とする。公式へ順に代入すると
$$
\begin{aligned}
P(A\cup B\cup C)
&=0.50+0.40+0.30\\
&\quad-0.20-0.10-0.08+0.05\\
&=1.20-0.38+0.05\\
&=0.87.
\end{aligned}
$$
2事象だけなら、例えば $P(A)=0.6$, $P(B)=0.5$, $P(A\cap B)=0.2$ から
$$
P(A\cup B)=0.6+0.5-0.2=0.9.
$$

## 一手
まず単独確率を足す。次に二重計上されたペアの共通部分を引く。3事象なら最後に3重共通部分を1回戻す。

## 注意
単純に $P(A)+P(B)+P(C)$ とすると重複を多重計上する。3重共通部分の符号はプラスである。

<!-- CARD -->

---
id: prob-chain-rule-three
title: 条件付き確率の連鎖則で3事象の共通部分を求める
category: math-probability
subcategory: math-events
topic: probability-chain-rule
type: formula
difficulty: 2
priority: S
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
priority: A
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
priority: S
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
