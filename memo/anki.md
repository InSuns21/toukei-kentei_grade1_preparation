# 統計検定1級 解法定跡カードWeb教材

## 0. 目的

統計検定1級の

* 統計数理
* 統計応用（理工学）

に必要な知識・計算・解法を、暗記・反復学習するための**静的カード型Web教材**を作成する。

Anki / AnkiDroidへの対応は不要。

成果物の中心は次の3つとする。

1. **カード内容を管理するMarkdown**
2. **Markdownから機械的に生成されるHTML**
3. **全カードをシラバス準拠で分類・検索できる親ページ**

本教材は単なる公式集・用語集・過去問解答集ではない。

統計検定1級過去問、『現代数理統計学の基礎』、同書の演習問題解答、良質な過去問解説ブログ等を分析し、

* 公式
* 定理
* 定理の条件
* 証明の一手
* 計算の一手
* 頻出する式変形
* 頻出する計算展開
* 式を見て認識すべき構造
* 問題設定を見て選択すべき解法方針
* 典型的な罠

を抽出する。

最終目標は、

> **統計検定1級で頻繁に現れる局面 → 打つべき一手 → 実際の計算**

を高速に再生できる「解法定跡集」を作ることである。

---

# 1. 最重要原則

## 1.1 1カード = 1単一論点

カードは必ず、

> **統計検定1級の大問に含まれる小問1つ程度で問われる単一論点**

に絞る。

大問全体を1カードにしない。

例えば、

```text
正規分布について
MLEを求め、
Fisher情報を求め、
CRLBを求め、
漸近分布を求めよ
```

を1カードにしてはいけない。

以下のように分割する。

```text
正規分布の平均μのMLE
```

```text
平均μに関するFisher情報
```

```text
CRLBの計算
```

```text
MLEの漸近分布
```

ただしカードを「答えの単語1個」まで細分化しすぎない。

---

## 1.2 単一論点は具体例で最後まで一度動かす

本教材の中心原則は、

> **1カード1論点。ただしその論点は具体例で最後まで一度動かす。**

である。

例えば、

```text
独立なX,Yの和
→
畳み込み積分
```

だけを覚えさせてはいけない。

最低限、

```text
畳み込みを選ぶ
↓
式を立てる
↓
supportから積分範囲を決める
↓
実際に積分する
```

まで簡単な具体例で確認させる。

---

## 1.3 「手法名を当てるカード」を作りすぎない

以下だけでは不十分。

```text
MLE → logを取る
```

```text
和の分布 → 畳み込み
```

```text
最大値 → CDF
```

```text
変数変換 → Jacobian
```

これらは**方針部分**としては重要だが、カードの答えには原則として短い計算例を付ける。

---

# 2. カードの適切な粒度

原則として、1カードは

**30秒～数分程度で解答・復習できる単一小問**

にする。

判断基準：

> 「この内容だけが統計検定1級の小問として出題されても自然か？」

YESなら適切。

---

# 3. 基本アーキテクチャ

```text
Markdownカード
      ↓
parser
      ↓
validator
      ↓
数式レンダリング
      ↓
静的HTML生成
      ↓
親ページ + カテゴリー表示
```

Markdownを**single source of truth**とする。

生成後のHTMLを人間が個別編集しない。

同じMarkdownからは常に同じHTMLを生成する。

HTML生成処理にLLMを使用しない。

---

# 4. Anki関連

不要。

実装しない：

* `.apkg`
* Anki import
* AnkiDroid
* spaced repetition
* Anki note type
* Anki専用TSV

本プロジェクトは独立した静的Web教材とする。

---

# 5. 情報源

## 5.1 統計検定1級過去問

最優先情報源。

対象：

* 統計数理
* 統計応用（理工学）

過去問から、

* 実際に問われる公式
* 定理
* 小問レベルの計算
* 証明操作
* 解法ルート
* 頻出変形

を抽出する。

---

## 5.2 良質な過去問解答ブログ

### Starpentagon

[https://starpentagon.net/analytics/stat_certificate_past_problems/](https://starpentagon.net/analytics/stat_certificate_past_problems/)

### SATOLOG

[https://satolog.org/toukeikentei-grade1-kaitouitiran/](https://satolog.org/toukeikentei-grade1-kaitouitiran/)

### Academaid

[https://academ-aid.com/statistics/jssc-toc](https://academ-aid.com/statistics/jssc-toc)

主として、

* 公式略解で省略された途中式
* なぜその解法を選ぶか
* 典型変形
* 計算途中の一手
* 別解
* 注意点

の抽出に利用する。

---

# 6. 教科書

主要教科書：

## 『現代数理統計学の基礎』

[https://www.kyoritsu-pub.co.jp/book/b10003681.html](https://www.kyoritsu-pub.co.jp/book/b10003681.html)

演習問題解説：

```text
pdfs\MathStat_Answers.pdf
```

このPDFはローカルファイルとして存在するものとする。

必ず実ファイルを確認して解析する。

存在しない場合は内容を推測しない。

欠落をログへ記録する。

---

# 7. 著作物の扱い

目的は原文転載ではない。

以下を大量保存しない。

* 過去問問題文
* ブログ本文
* 教科書本文
* PDF解答本文

抽出対象：

* 数学的事実
* 公式
* 定理
* 解法
* 一般化された問題設定
* 計算操作
* 証明操作
* 独自に再構成した短い例題

具体例は必要に応じて数字・変数・状況を変更してよい。

---

# 8. シラバス準拠

統計検定1級の**実際の公式シラバスを確認してから**分類体系を作成する。

独自分類だけで済ませない。

基本構造：

```text
category
subcategory
topic
```

程度の3階層を想定する。

統計数理と統計応用（理工学）の双方を対象とする。

シラバス構造は例えば、

```yaml
- id:
  name:
  section:
  order:
  children:
```

などとして `syllabus/syllabus.yaml` に保存する。

---

# 9. カード種別

最低限次を用意する。

```text
formula
theorem
condition
proof_step
calc_step
expansion
recognition
strategy
reverse
pitfall
```

特に重視：

```text
formula
calc_step
expansion
recognition
strategy
proof_step
```

---

# 10. formulaカード

公式を再生するカード。

ただし**公式を書いて終わりは禁止**。

formulaカードには原則、

1. 問題
2. 公式
3. 数値例
4. 短い計算
5. 必要なら注意点

を含める。

---

# 11. formulaカードの数値例は原則必須

例えば、

```text
Var(X)=E[X²]-E[X]²
```

だけでは不足。

以下まで掲載する。

```text
E[X]=2
E[X²]=6
```

なら

[
\operatorname{Var}(X)
=====================

# 6-2^2

2.

]

---

# 12. formulaカードの数値例

数値例は原則として**最大10行程度**。

目的は別の難問を解くことではなく、

> 公式が実際にどう使われるか

を確認すること。

なるべく、

* 小さな整数
* 簡単な分数
* 計算しやすい確率
* 簡単な分布パラメータ

を使う。

---

# 13. formulaカード例

```markdown
---
id: variance-basic
title: 分散の基本公式
category: probability
subcategory: moments
topic: variance
type: formula
difficulty: 1
hashtags:
  - 分散
  - 期待値
  - 公式
priority: S
---

## 問題

分散を $E[X]$ と $E[X^2]$ で表せ。

## 答え

$$
\operatorname{Var}(X)
=
E[X^2]-E[X]^2
$$

## 計算例

$E[X]=2$, $E[X^2]=6$ とする。

$$
\operatorname{Var}(X)
=
6-2^2
=
2.
$$

## 一手

二乗の期待値から平均の二乗を引く。

## 注意

$E[X^2]$ と $E[X]^2$ を混同しない。
```

---

# 14. strategyカード

問題設定から**解法方針を決定するカード**。

ただし、

```text
和の分布
→
畳み込み
```

だけでは禁止。

strategyカードには原則、

1. 問題状況
2. 解法方針
3. なぜその方針か
4. 簡単な具体例
5. 式を立てる
6. 最低1回の本質的操作
7. 答えまで

を含める。

---

# 15. strategyカードの計算例は原則必須

strategyカードを読んだ後、

> **類題で最初の数行を実際に書き始められること**

を基準とする。

単に手法名だけ思い出せても不十分。

---

# 16. strategyカード例：畳み込み

```markdown
## 問題

独立な連続確率変数 $X,Y$ の和

$$
Z=X+Y
$$

の密度を求めたい。

基本方針は？

## 答え

畳み込み積分を使う。

$$
f_Z(z)
=
\int_{-\infty}^{\infty}
f_X(x)f_Y(z-x)\,dx
$$

## なぜ？

$X=x$ なら $Y=z-x$ のときに $X+Y=z$ となる。

独立性により同時密度が積へ分解できる。

## 計算例

$$
X,Y\overset{ind}{\sim}U(0,1)
$$

とする。

$0<z<1$ なら

$$
f_Z(z)
=
\int_0^z 1\,dx
=
z.
$$

$1\le z<2$ なら

$$
f_Z(z)
=
\int_{z-1}^{1}1\,dx
=
2-z.
$$

したがって

$$
f_Z(z)
=
\begin{cases}
z &(0<z<1),\\
2-z &(1\le z<2),\\
0 &\text{otherwise}.
\end{cases}
$$

## 重要な一手

畳み込み公式の暗記以上に、

**supportから積分区間を決めること**

が重要。
```

---

# 17. strategyカード例：最大値

```markdown
## 問題

iid標本

$$
X_1,\dots,X_n
$$

の最大値

$$
M=\max_i X_i
$$

の分布を求めたい。

## 方針

まずCDFを求める。

$$
P(M\le m)
=
P(X_1\le m,\dots,X_n\le m)
$$

独立性より

$$
F_M(m)=F_X(m)^n.
$$

## 計算例

$$
X_1,X_2\overset{iid}{\sim}U(0,1)
$$

なら

$$
F_M(m)=m^2,\qquad 0<m<1.
$$

微分して

$$
f_M(m)=2m,\qquad 0<m<1.
$$
```

---

# 18. strategyカード例：MLE

```markdown
## 問題

Bernoulli標本から $p$ のMLEを求めたい。

## 方針

尤度を作り、対数を取り、微分する。

## 計算例

標本：

$$
1,0,1,1,0
$$

なら

$$
\ell(p)
=
3\log p+2\log(1-p).
$$

$$
\ell'(p)
=
\frac3p-\frac2{1-p}
=
0.
$$

したがって

$$
\hat p=\frac35.
$$
```

---

# 19. strategyカード例：CLT

```markdown
## 問題

標本平均の確率を近似したい。

## 方針

中心極限定理で標準化する。

## 計算例

$$
\mu=10,\quad
\sigma^2=4,\quad
n=100.
$$

なら

$$
\bar X
\approx
N\left(10,\frac4{100}\right).
$$

したがって

$$
P(\bar X>10.4)
\approx
P\left(
Z>
\frac{10.4-10}{0.2}
\right)
=
P(Z>2).
$$
```

このカードでは正規表の数値暗記まで必須にしなくてもよい。

標準化までが論点ならそこで完了してよい。

---

# 20. calc_stepカード

計算途中の局面から、

> 次に何をするか

を問う。

ただし「微分する」のような一語だけで終わらず、可能なら短い具体例を付ける。

例：

```text
∏ f(x_i;θ)
```

を見たら、

```text
logを取り、積を和へ変換する
```

その後、小さな実例で実際に対数尤度を書く。

---

# 21. expansionカード

頻出する式変形をそのまま覚える。

例：

[
\sum_{i=1}^n(x_i-\bar x)^2
]

↓

[
\sum_{i=1}^n x_i^2-n\bar x^2
]

展開カードにも、可能なら小さい数値例を付ける。

例えば

```text
x=(1,2,3)
x̄=2
```

として左右がともに2になることを確認してもよい。

---

# 22. recognitionカード

式・条件を見た瞬間、

> 何の構造か？

を認識するカード。

例：

[
x^{a-1}e^{-bx},\qquad x>0
]

↓

Gamma型。

ただし可能ならその後、

[
\int_0^\infty
x^{a-1}e^{-bx},dx
=================

\frac{\Gamma(a)}{b^a}
]

へ実際に接続する短い例を付ける。

---

# 23. proof_stepカード

証明全文を暗記するのではなく、

> 証明の途中で必要になる主要な1手

を覚える。

ただし「条件付き期待値を使う」だけではなく、

可能なら1～数行程度の具体的変形を付ける。

例：

[
E[(T-a)^2]
]

を分散・バイアス分解したい。

まず

[
T-a
===

(T-E[T])+(E[T]-a)
]

と分解する。

その後、交差項の期待値が0になるところまで見せる。

---

# 24. conditionカード

定理・公式の使用条件を問う。

例：

```text
E[g(X)h(Y)]
=
E[g(X)]E[h(Y)]
```

を使える主要条件は？

↓

`X,Y` が独立で、期待値が存在する。

条件を省略しない。

---

# 25. pitfallカード

典型的なミスをカード化する。

例：

* MLEの分散推定と不偏標本分散の分母
* 共分散0と独立の混同
* Jacobianの絶対値忘れ
* t分布の自由度
* F分布の分子・分母自由度の順序
* 正規性が必要な結果と不要な結果の混同
* Fisher情報の正則条件
* CDFからPDFへ戻す際のsupport忘れ

---

# 26. reverseカード

目的から必要な式・操作を思い出す。

例えば、

```text
分散を期待値だけで計算したい
```

↓

[
Var(X)=E[X^2]-E[X]^2
]

ただし通常のformulaカードとの重複が大きい場合は乱造しない。

---

# 27. 計算例を原則必須とするカード種別

原則として次は具体例を付ける。

```text
formula
strategy
calc_step
expansion
recognition
```

`theorem`, `condition`, `proof_step` についても、有用なら具体例を付ける。

---

# 28. 計算例の原則

具体例は、

> **そのカードの本質的な操作を最低1回実行する**

こと。

畳み込みなら積分区間を決める。

変数変換ならJacobianを計算する。

MLEなら微分方程式を解く。

CLTなら標準化する。

CRLBならFisher情報を代入する。

OLSなら係数を実際に計算する。

Delta methodなら $g'(\theta)$ を実際に求めて漸近分散へ入れる。

---

# 29. 計算例の長さ

原則10行程度以内。

ただし、

* 場合分け
* 畳み込み
* Jacobian
* 行列計算

などで本質を示すのに必要なら多少超えてよい。

重要なのは、

**短くするために本質的な計算を省略しないこと。**

---

# 30. 過去問解答のstep分解

各問題について、

```text
問題設定
↓
step 1
↓
step 2
↓
step 3
↓
...
```

に分解する。

各stepについて、

1. なぜこの一手を選ぶのか
2. 何を見てこの一手が発火するのか
3. 別問題でも使えるか
4. 小問1つ程度に一般化できるか
5. 簡単な計算例を作れるか

を判定する。

---

# 31. canonical move

同じ操作が複数問題に現れた場合、問題ごとにカードを増殖させない。

例えば、

[
\sum(x_i-\bar x)^2
]

の展開が10問に現れても、原則1カード。

出典・頻度をmetadataへ追加する。

---

# 32. 頻度

例えば：

```yaml
frequency:
  past_exam: 4
  textbook: 5
  independent_problems: 9
  source_confirmations: 12
```

とする。

同じ過去問を3ブログが解説している場合、

```text
past_exam = 1
```

である。

ブログ3件は

```text
source_confirmations = 3
```

として扱える。

---

# 33. priority

```text
S = 過去問で複数回登場
A = 過去問と教科書演習の双方に登場
B = 標準重要
C = 特殊だが有用
D = 低優先
```

---

# 34. 難易度

```text
1 = 即答必須
2 = 基本
3 = 標準
4 = 難
5 = 発展
```

概念の高度さだけでなく、

> **統計検定1級の小問として解く難しさ**

を基準にする。

---

# 35. 「ありがちな展開」を重点収集

特に以下。

## 分散

[
Var(X)
======

E[X^2]-E[X]^2
]

---

## 平方誤差

[
E[(X-a)^2]
==========

Var(X)+(E[X]-a)^2
]

---

## 中心化平方和

[
\sum(x_i-\bar x)^2
==================

\sum x_i^2-n\bar x^2
]

---

## 独立性

[
E[g(X)h(Y)]
===========

E[g(X)]E[h(Y)]
]

---

## 積から和

[
\prod e^{a_i}
=============

e^{\sum a_i}
]

---

## 尤度

[
\prod_i x_i^{\alpha-1}
]

↓

[
\exp\left(
(\alpha-1)\sum_i\log x_i
\right)
]

---

## Gamma積分

[
\int_0^\infty
x^{a-1}e^{-bx},dx
]

をGamma関数へ寄せる。

---

## Beta積分

Beta関数・Beta分布の形を認識する。

---

## 正規分布

指数部の平方完成。

---

## χ²・t・F

確率変数の組み合わせから分布を即認識。

---

## 順序統計量

最大値・最小値ならCDFから始める。

---

## 変数変換

```text
逆変換
↓
support
↓
Jacobian
↓
元密度へ代入
```

---

## 畳み込み

```text
Z=X+Y
↓
fX(x)fY(z-x)
↓
supportから積分区間
↓
積分
```

---

## 条件付き分布

```text
同時密度
↓
周辺密度
↓
割る
```

---

## MGF

[
M_X(t)=E[e^{tX}]
]

から微分でモーメント。

---

## CLT

```text
標本平均
↓
中心化
↓
標準化
↓
N(0,1)
```

---

## Delta method

```text
漸近正規
↓
g'(θ)
↓
漸近分散へ反映
```

---

## Fisher情報

[
I(\theta)
=========

E[(score)^2]
]

または正則条件のもとで

[
I(\theta)
=========

-E[\ell''(\theta)].
]

---

## Cramér-Rao

```text
不偏推定量
+
Fisher情報
↓
分散下限
```

---

## 検定

```text
H0/H1
↓
検定統計量
↓
H0下の分布
↓
棄却域
```

---

## 尤度比検定

```text
制約付きMLE
↓
無制約MLE
↓
尤度比
```

---

## 回帰

```text
最小二乗
↓
正規方程式
↓
係数推定
```

平方和分解も重視。

---

## ANOVA

[
SST
===

SSB+SSW
]

の展開。

---

# 36. 過去問固有カードを乱造しない

悪い例：

```text
2021年統計数理問3(2)の答えは？
```

原則禁止。

一般化して、

```text
最大値の密度を求めるとき最初に何をするか
```

等へ変換する。

---

# 37. ただし出題ルートは保持する

例えば過去問で、

```text
推定量を求める
↓
不偏性
↓
分散
↓
CRLB
↓
効率性
```

という連続パターンが頻出する場合、

小問ごとのカードとは別に、全体の流れを短く示すstrategyカードを持たせてもよい。

ただしそれを巨大な演習カードにはしない。

---

# 38. Markdown形式

原則として、

**YAML front matter + Markdown本文**

を使用する。

例：

```markdown
---
id: convolution-independent-sum
title: 独立な確率変数の和と畳み込み
category: probability-distributions
subcategory: transformation
topic: convolution
type: strategy
difficulty: 2
hashtags:
  - 畳み込み
  - 独立
  - 確率密度
  - 計算の一手
priority: S
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources: []
---

## 問題

...

## 答え

...

## なぜ？

...

## 計算例

...

## 重要な一手

...

## 注意

...
```

---

# 39. Markdown自体を人間可読にする

Markdownを内部データ形式に寄せすぎない。

VS Code / GitHub等でそのまま開いても教材として読めること。

---

# 40. provenance

各カードの出典を追跡可能にする。

例：

```yaml
sources:
  - type: past_exam
    year: 2022
    section: 統計数理
    question: 3
    subquestion: 1

  - type: textbook
    book: 現代数理統計学の基礎
    chapter: 5
    problem: 8

  - type: blog
    site: Academaid
    url: ...
```

---

# 41. タグ

canonical tagを定義する。

例：

```text
#MLE
#不偏推定
#Fisher情報
#CRLB
#CLT
#DeltaMethod
#正規分布
#Gamma分布
#Beta分布
#Jacobian
#畳み込み
#平方完成
#平方和
#期待値
#分散
#計算の一手
#証明の一手
#頻出
```

表記揺れを抑える。

例えば

```text
#最尤法
#最尤推定
#MLE
```

を無秩序に混在させない。

---

# 42. 親ページ

教材全体の入口として

```text
index.html
```

を生成する。

カードを**公式シラバス順**に整理して表示する。

---

# 43. 親ページの基本UI

概念例：

```text
統計検定1級 解法定跡集

[検索________________]

カテゴリー
[全部]
[確率]
[分布]
[推定]
[検定]
...

難易度
[1] [2] [3] [4] [5]

タグ
[#MLE] [#正規分布] [#Jacobian] ...

表示中 74 / 全923 cards
```

---

# 44. カテゴリーフィルター

最低限、

```text
category
subcategory
```

による絞り込みを可能にする。

デフォルト表示順はシラバス順。

---

# 45. 難易度フィルター

```text
1
2
3
4
5
```

の複数選択を可能にする。

---

# 46. ハッシュタグフィルター

タグをクリックすると該当カードだけ表示する。

カテゴリー横断で利用できること。

---

# 47. 複合フィルター

例えば、

```text
カテゴリー：推定
難易度：1,2,3
タグ：#MLE
```

を同時に指定可能にする。

異なる軸はAND。

同一軸の複数選択はORでよい。

---

# 48. 全文検索

可能なら以下を検索。

* title
* 問題
* 答え
* topic
* hashtag

client-sideでよい。

---

# 49. ソート

最低限検討：

```text
シラバス順
難易度順
priority順
頻度順
タイトル順
```

デフォルトはシラバス順。

---

# 50. カード表示

初期表示では問題側を中心にする。

```text
┌─────────────────────┐
│ strategy 難易度2 S   │
│                     │
│ 独立なX,Yの和の      │
│ 密度を求めたい。      │
│                     │
│ #畳み込み #独立       │
│                     │
│ [答えを見る]          │
└─────────────────────┘
```

展開すると、

* 答え・方針
* なぜ
* 計算例
* 重要な一手
* 注意

を表示する。

---

# 51. formulaカード表示

原則：

```text
問題
↓
答え
↓
数値例
↓
一手
↓
注意
```

---

# 52. strategyカード表示

原則：

```text
問題設定
↓
方針
↓
なぜ
↓
具体例
↓
式を立てる
↓
計算
↓
結論
↓
重要な一手
```

---

# 53. 数式表示：最重要要件

HTML閲覧時の外部数式ライブラリ依存を可能な限り排除する。

避ける：

```text
MathJax CDN
KaTeX CDN
外部Web API
```

ネットワークなしで完全表示できること。

---

# 54. 数式はビルド時にレンダリング

第一候補：

```text
Markdown内LaTeX
↓
build
↓
SVG
↓
Data URL
↓
HTML
```

閲覧時にはLaTeXレンダラーを必要としない。

---

# 55. Data URL SVGを第一候補とする

例えば：

```html
<img
  src="data:image/svg+xml;base64,..."
  alt="Var(X) = E[X^2] - E[X]^2"
  data-latex="\operatorname{Var}(X)=E[X^2]-E[X]^2"
/>
```

とする。

メリット：

* CDN不要
* MathJax不要
* KaTeX不要
* 個別画像ファイル不要
* オフライン完結
* SVGなので拡大可能

---

# 56. SVG生成方式

ビルド時のみ外部ツール・ライブラリ依存を許容する。

候補：

* KaTeX CLI
* MathJax Node
* LaTeX + dvisvgm
* その他SVG renderer

比較し、数式品質・互換性・速度の良い方式を選ぶ。

重要なのは、

> **dist閲覧時にはその依存が不要**

であること。

---

# 57. 数式画像のaccessibility

必ず、

```html
alt="..."
```

を設定。

可能なら元LaTeXも

```html
data-latex="..."
```

として保持する。

---

# 58. 長い数式

スマートフォン幅を超える場合に備える。

候補：

* horizontal scroll
* responsive scaling
* display math専用container

数式を無理に縮小して読めなくしない。

---

# 59. Data URL容量

全カードを1つの巨大HTMLへ埋め込む場合は容量を実測する。

必要なら、

```text
index.html
category/*.html
```

へ分割する。

閲覧性能を優先する。

---

# 60. ランタイム依存

理想：

```text
HTML
CSS
少量のvanilla JavaScript
```

だけ。

React / Vue等は原則不要。

---

# 61. JavaScriptなしでも本文を失わない

JavaScriptは主に、

* 答え開閉
* filter
* search
* sort

に使用する。

JSが壊れてもカード本文そのものはHTMLに存在することが望ましい。

---

# 62. レスポンシブ

PCとAndroidブラウザに対応。

スマートフォンでは基本1列。

PCでは必要に応じ複数列。

数式の読みやすさを最優先。

---

# 63. オフライン利用

`dist/` をそのままコピーすれば閲覧できる構成とする。

最終的にネットワークを切断してテストする。

---

# 64. 推奨ディレクトリ

```text
stat1-cards/
│
├─ README.md
│
├─ syllabus/
│   └─ syllabus.yaml
│
├─ cards/
│   ├─ probability/
│   ├─ distributions/
│   ├─ estimation/
│   ├─ testing/
│   ├─ regression/
│   ├─ multivariate/
│   ├─ asymptotics/
│   ├─ stochastic-process/
│   └─ engineering/
│
├─ pdfs/
│   └─ MathStat_Answers.pdf
│
├─ templates/
│   ├─ index.html
│   └─ card.html
│
├─ scripts/
│   ├─ parse_cards.py
│   ├─ validate_cards.py
│   ├─ render_math.py
│   ├─ normalize_tags.py
│   ├─ detect_duplicates.py
│   ├─ build_site.py
│   └─ report.py
│
├─ static/
│   ├─ style.css
│   └─ app.js
│
├─ reports/
│   ├─ coverage.md
│   ├─ frequent_moves.md
│   ├─ duplicate_candidates.md
│   ├─ validation_errors.md
│   └─ math_render_errors.md
│
└─ dist/
    ├─ index.html
    ├─ category/
    └─ assets/
```

合理的理由があれば変更可。

---

# 65. validator

最低限チェック：

* id必須
* title必須
* category必須
* categoryがsyllabusに存在
* typeがenum内
* difficultyが1～5
* 問題セクション存在
* 答えセクション存在
* formulaに計算例がある
* strategyに計算例がある
* ID重複なし
* タグ表記
* source形式
* LaTeX delimiter
* 未知のcategory
* 未知のtag

---

# 66. 数式検証

重点チェック：

* 符号
* 定数
* 自由度
* `n` / `n-1`
* support
* 積分範囲
* Jacobianの絶対値
* 条件付き確率の分母
* 分布パラメータ化
* Fisher情報
* 正則条件
* 漸近分散
* 行列次元
* 転置
* 独立と無相関
* 確率収束と分布収束
* unbiased / consistent / efficient
* MLE境界解

---

# 67. 計算例の自動検算

可能なものはPython等で検証する。

例えば、

* 数値代入
* 分散
* 確率
* 積分
* 行列積
* 微分
* 正規化定数

など。

LLM生成値をそのまま信用しない。

---

# 68. duplicate detector

比較対象：

* title
* 問題
* 答え
* 数式
* hashtags
* semantic similarity

自動削除せず、

```text
reports/duplicate_candidates.md
```

へ候補を出してもよい。

---

# 69. canonicalization

表記揺れだけで別カードにしない。

例：

```text
Σ Xi
```

```text
\sum_i X_i
```

```text
\sum_{i=1}^n X_i
```

数学的意味を確認して正規化する。

---

# 70. coverage report

`reports/coverage.md` にシラバス各項目ごとの、

* 総カード数
* formula
* theorem
* proof_step
* calc_step
* expansion
* recognition
* strategy
* 過去問由来
* S/A priority数

を出力する。

---

# 71. frequent moves report

`reports/frequent_moves.md` に、

```text
頻出move
登場問題数
過去問登場回数
教科書登場回数
関連カテゴリー
```

をまとめる。

これは教材生成の重要な成果物とする。

---

# 72. Web情報抽出

指定されたindexページから必要な個別解説ページをたどる。

無差別crawlはしない。

各ページから、

* 年度
* 問題番号
* 小問番号
* テーマ
* 解法step
* 重要な変形
* 注意点

を抽出する。

---

# 73. 同一過去問の統合

同じ過去問を複数ブログが解説していても、異なる出題として数えない。

例えば同一の2022年問3を3ブログが扱っていれば、

```text
past_exam_frequency = 1
source_confirmation = 3
```

とする。

---

# 74. 情報源の基本優先度

数学的内容に差異がある場合：

1. 統計検定公式
2. 『現代数理統計学の基礎』
3. `MathStat_Answers.pdf`
4. 複数ブログで一致
5. 単一ブログ
6. AIによる導出

ただし公式略解が途中式を省略している場合は、教科書・ブログ・独自導出で補完してよい。

---

# 75. LLM抽出時に必ず問うこと

問題・解答の重要stepごとに内部的に、

```text
なぜこの一手を思いつくのか？
```

```text
どの式・条件がtriggerなのか？
```

```text
この一手を知らない受験者はどこで止まるか？
```

```text
別の問題でも使えるか？
```

```text
小問1つ程度へ一般化できるか？
```

```text
具体的な短い計算例を作れるか？
```

を確認する。

---

# 76. カード採用基準

以下のいずれかを満たすものを優先。

* 過去問で反復
* 教科書演習で反復
* 試験中のボトルネックになる
* 知らないと計算時間が大きく増える
* 定型的だが忘れやすい
* 典型ミスが多い
* 式を見た瞬間の認識が重要
* 証明で繰り返し使う
* 小問として頻出

---

# 77. 自明すぎるカードは禁止

例えば単純な四則演算や、

```text
微分してください
→
微分する
```

のようなカードを作らない。

統計1級受験者が試験中に止まる可能性のある粒度を狙う。

---

# 78. pilot

最初から全範囲を大量生成しない。

まず50～150枚程度。

対象候補：

```text
確率分布
推定
```

または過去問1～2年分。

pilotで確認：

* 1カード1論点か
* 小問相当か
* formulaに計算例があるか
* strategyに計算例があるか
* 「○○を使う」だけになっていないか
* calc_stepが有用か
* タグが増殖していないか
* シラバス分類が妥当か
* 数式画像が綺麗か
* Data URLの容量は実用的か
* Androidで読みやすいか

---

# 79. 実装開始順

1. repository確認
2. `pdfs\MathStat_Answers.pdf` 存在確認
3. 統計検定1級公式シラバス確認
4. 指定Webソース確認
5. `syllabus.yaml` 作成
6. Markdown card schema確定
7. canonical tag確定
8. 代表カード10～20枚作成
9. formulaの計算例を確認
10. strategyの計算例を確認
11. 数式SVG生成試作
12. Data URL化
13. 親ページ実装
14. category filter
15. difficulty filter
16. hashtag filter
17. search
18. Android幅確認
19. pilotを50～150枚へ拡張
20. 品質レビュー後、全範囲へ拡張

---

# 80. HTMLビルド時チェック

```text
[ ] Markdown以外に教材内容を手書きしていない
[ ] HTMLに未変換LaTeXが残っていない
[ ] MathJax CDN依存なし
[ ] KaTeX CDN依存なし
[ ] 外部Web API依存なし
[ ] 数式画像が表示される
[ ] 数式にaltがある
[ ] category filterが動く
[ ] difficulty filterが動く
[ ] hashtag filterが動く
[ ] 複合filterが動く
[ ] searchが動く
[ ] Android幅で崩れない
[ ] オフラインで閲覧できる
```

---

# 81. カード品質チェック

各カードについて：

```text
[ ] 大問の小問1つ程度の単一論点か
[ ] 問題が大きすぎないか
[ ] 自明すぎないか
[ ] 単なる用語当てになっていないか
[ ] formulaなら具体計算例があるか
[ ] strategyなら具体計算例があるか
[ ] 本質的操作を最低1回実行しているか
[ ] 計算例が不必要に長くないか
[ ] 条件が必要な公式・定理で条件が抜けていないか
[ ] 数式が数学的に正しいか
[ ] provenanceが追跡できるか
[ ] 重複canonical cardがないか
```

---

# 82. 最重要評価基準

各カードについて最終的に3点を確認する。

## A

> **これは統計検定1級の大問の小問1つ程度として成立する単一論点か？**

## B

> **これを覚えることで、本番で「次に何をすればよいかわからない」時間が減るか？**

## C

> **このカードを読めば、類題で実際の数式を最低数行は書き始められるか？**

CがNOなら、

「○○法を使う」という名前暗記だけになっている可能性が高い。

改善する。

---

# 83. 完成像

本教材は、

```text
問題を見る
    ↓
構造を認識する
    ↓
公式・定理・解法を発火する
    ↓
具体的な式を立てる
    ↓
1つの小問を最後まで処理する
```

ための教材である。

目標は百科事典でも、公式一覧でも、過去問解答集でもない。

特に、

> **「この形が出たら、この一手」**

と、

> **「この方針を選んだら、実際にはこう計算する」**

を結び付ける。

公式についても、

```text
公式名を知っている
```

で終わらず、

```text
公式を思い出す
↓
数字を代入する
↓
計算する
```

まで確認する。

解法方針についても、

```text
畳み込みを使う
```

で終わらず、

```text
畳み込みを選ぶ
↓
積分式を書く
↓
supportを決める
↓
実際に積分する
```

まで確認する。

したがって、本プロジェクト全体を貫く原則は、

# **1カード1論点。ただし論点は具体例で最後まで一度動かす。**

とする。
