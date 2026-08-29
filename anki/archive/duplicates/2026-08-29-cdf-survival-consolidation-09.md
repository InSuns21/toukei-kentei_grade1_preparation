---
id: prob-interval-from-cdf
title: 累積分布関数の差で区間確率を求める
category: math-probability
subcategory: math-distribution-functions
topic: interval-probability-cdf
type: formula
difficulty: 1
priority: A
hashtags:
  - 累積分布関数
  - 区間確率
  - 差
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 累積分布関数
archive_reason: duplicate
canonical_card: prob-cdf-endpoint-choice
archive_note: 端点処理canonicalへ一般式P(a<X<=b)=F(b)-F(a)、P(a<=X<=b)=F(b)-F(a-)と連続分布の数値例を吸収したため、連続分布専用の区間確率カードは重複。
---
## 問題
連続分布の累積分布関数が $F(x)=x^2$（$0\le x\le1$）である。$P(1/4<X\le3/4)$ を求めよ。

## 答え
上端までの累積確率から下端までの累積確率を引く。

## 使用公式・定理
$$P(a<X\le b)=F(b)-F(a).$$

## 計算例
$$\begin{aligned}P(1/4<X\le3/4)&=F(3/4)-F(1/4)\\&=\left(\frac34\right)^2-\left(\frac14\right)^2\\&=\frac9{16}-\frac1{16}\\&=\frac12.\end{aligned}$$

## 一手
区間確率は右端の累積から左端の累積を引く。

## 注意
一般の分布では左端を含むかどうかで $F(a-)$ と $F(a)$ を使い分ける。

<!-- CARD -->

---
id: prob-survival-from-cdf
title: 累積分布関数から生存関数を求める
category: math-probability
subcategory: math-distribution-functions
topic: survival-function
type: formula
difficulty: 1
priority: S
hashtags:
  - 生存関数
  - 累積分布関数
  - 補集合
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 生存関数
  - type: past_exam
    id: SCI-2019-Q1
    topic: 生存関数・平均残存寿命
archive_reason: duplicate
canonical_card: prob-cumulative-hazard
archive_note: 補強済みcanonicalでF→S=1-F→H=-log S→h=H'を一続きに計算するため、生存関数だけを求めるカードは同一変換鎖の一部分。
---
## 問題
$X$ の累積分布関数が $F_X(t)=1-e^{-t^2}$（$t\ge0$）、$F_X(t)=0$（$t<0$）である。生存関数を求めよ。

## 答え
生存関数は累積分布関数の補集合である。

## 使用公式・定理
$$S_X(t)=P(X>t)=1-F_X(t).$$

## 計算例
$t\ge0$ では
$$S_X(t)=1-(1-e^{-t^2})=e^{-t^2}.$$
$t<0$ では $F_X(t)=0$ なので $S_X(t)=1$ である。

## 一手
生存関数そのものを求めるときは、台の外も含めて書く。

## 注意
非負変数では $t<0$ の生存関数は0ではなく1である。

<!-- CARD -->

---
id: prob-survival-from-hazard
title: 危険率を積分して生存関数を復元する
category: math-probability
subcategory: math-distribution-functions
topic: hazard-to-survival
type: calc_step
difficulty: 2
priority: S
hashtags:
  - 危険率
  - 生存関数
  - 累積危険率
frequency:
  past_exam: 2
  textbook: 0
  independent_problems: 0
  source_confirmations: 2
sources:
  - type: official_syllabus
    topic: 危険率
  - type: past_exam
    id: SCI-2019-Q1
    topic: 生存関数
  - type: past_exam
    id: SCI-2017-Q2
    topic: 故障率
archive_reason: duplicate
canonical_card: prob-cumulative-hazard
archive_note: 補強済みcanonicalでh→H=∫h→S=e^{-H}→F=1-Sの逆変換まで数値で扱うため、危険率から生存関数への片方向カードは重複。
---
## 問題
$t\ge0$ で危険率が $h_X(t)=3t^2$ である。$S_X(0)=1$ として生存関数を求めよ。

## 答え
危険率を0から $t$ まで積分し、その負の指数を取る。

## 使用公式・定理
非負で絶対連続な寿命分布で $S_X(0)=1$ のとき
$$H_X(t)=\int_0^t h_X(u)\,du,\qquad S_X(t)=e^{-H_X(t)}.$$

## 計算例
$$H_X(t)=\int_0^t3u^2\,du=[u^3]_0^t=t^3.$$
したがって
$$S_X(t)=e^{-t^3}.$$

## 一手
危険率から生存関数へ戻る順序は「積分してから負の指数」である。

## 注意
$S_X(t)=e^{-h_X(t)}$ と直接置かない。

<!-- CARD -->

---
id: prob-survival-hazard
title: 生存関数から危険率を求める
category: math-probability
subcategory: math-distribution-functions
topic: survival-hazard
type: formula
difficulty: 2
priority: S
hashtags:
  - 生存関数
  - 危険率
  - 指数分布
frequency:
  past_exam: 2
  textbook: 0
  independent_problems: 0
  source_confirmations: 2
sources:
  - type: official_syllabus
    topic: 生存関数と危険率
  - type: past_exam
    id: SCI-2019-Q1
    topic: 生存関数・平均残存寿命
  - type: past_exam
    id: SCI-2017-Q2
    topic: 指数待時間・故障率
archive_reason: duplicate
canonical_card: prob-cumulative-hazard
archive_note: 生存関数と危険率の関係h=f/Sもcanonicalへ明記し、順方向・逆方向の両方を計算するため、指数分布の生存関数と危険率だけのカードを独立保持しない。
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
id: prob-rectangle-from-joint-cdf
title: 同時累積分布関数から長方形確率を包除で求める
category: math-probability
subcategory: math-distribution-functions
topic: joint-cdf-rectangle
type: formula
difficulty: 2
priority: A
hashtags:
  - 同時分布
  - 長方形確率
  - 包除原理
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 同時分布
archive_reason: duplicate
canonical_card: prob-joint-cdf-from-density
archive_note: 同時密度→同時累積分布関数→4隅の包除で長方形確率、という一連の計算をcanonicalへ統合済み。CDFから長方形確率だけを切り出したカードは重複。
---
## 問題
$F_{X,Y}(x,y)=xy$（$0\le x,y\le1$）である。$P(0.2<X\le0.8,0.3<Y\le0.7)$ を求めよ。

## 答え
右上までの累積確率から不要な2本の帯を引き、二重に引いた左下を戻す。

## 使用公式・定理
$$\begin{aligned}P(a<X\le b,c<Y\le d)={}&F(b,d)-F(a,d)\\&-F(b,c)+F(a,c).\end{aligned}$$

## 計算例
$$\begin{aligned}P&=0.8\cdot0.7-0.2\cdot0.7-0.8\cdot0.3+0.2\cdot0.3\\&=0.56-0.14-0.24+0.06\\&=0.24.\end{aligned}$$

## 一手
二次元の区間確率は4隅の累積分布関数を符号 $+,-,-,+$ で組み合わせる。

## 注意
最後の左下項を足し戻すのを忘れない。
