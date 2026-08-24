# 問題集

各問題に `id`、`level`、`minutes`、`topics`、`techniques`、`calculation_load` を付ける。

## Level A：基礎部品

### P1-A01 集合恒等式
- level: A
- minutes: 6
- topics: 集合演算
- techniques: SET-1
- calculation_load: low

$(A\cup B)^c=A^c\cap B^c$ と $A\setminus B=A\cap B^c$ を、任意の $\omega\in\Omega$ の所属関係から示せ。

### P1-A02 二事象の加法公式
- level: A
- minutes: 6
- topics: 加法公式
- techniques: IE-1
- calculation_load: low

$P(A)=0.6$、$P(B)=0.5$、$P(A\cap B)=0.3$ のとき、$P(A\cup B)$、$P(A\triangle B)$ を求めよ。

### P1-A03 確率の連続性
- level: A
- minutes: 7
- topics: 増加事象列
- techniques: LIMIT-1
- calculation_load: low

$A_n\uparrow A$ とする。$P(A_n)\to P(A)$ を、定理名と仮定を明記して示せ。

## Level B：小問セット

### P1-B01 ちょうど一つ
- level: B
- minutes: 12
- topics: 三事象
- techniques: SET-1、IE-1
- calculation_load: medium

三事象 $A,B,C$ のうち、ちょうど一つが起こる確率を、単独・二重・三重共通部分の確率で表せ。

### P1-B02 少なくとも一度
- level: B
- minutes: 10
- topics: 数え上げ、余事象
- techniques: COUNT-1
- calculation_load: medium

公平な六面体さいころを5回投げ、$6^5$ 個の順序付き出目はすべて等確率とする。次を求めよ。

1. 1回の出目が1でも2でもない確率。
2. 5回とも1でも2でもない確率。
3. 少なくとも一度1または2が出る確率。

### P1-B03 limsupとliminf
- level: B
- minutes: 12
- topics: 事象列
- techniques: LIMIT-1
- calculation_load: medium

$A_{2k-1}=A$、$A_{2k}=B$ とする。$\limsup A_n$ と $\liminf A_n$ を求めよ。

## Level C：本番標準

### P1-C01 三分類調査
- level: C
- minutes: 22
- topics: 包除原理、排反分割
- techniques: IE-1、ANSWER-1
- calculation_load: medium

100人について、$|A|=60$、$|B|=50$、$|C|=40$、$|A\cap B|=30$、$|B\cap C|=20$、$|C\cap A|=25$、$|A\cap B\cap C|=10$ であった。この100人から1人を一様無作為抽出する。

1. 少なくとも一項目に該当する人数を求めよ。
2. ちょうど一項目に該当する人数を求めよ。
3. ちょうど二項目に該当する人数を求めよ。
4. どの項目にも該当しない確率を求めよ。

### P1-C02 箱への配置
- level: C
- minutes: 25
- topics: 包除原理、数え上げ
- techniques: COUNT-1、IE-1
- calculation_load: high

区別できる4個の球を区別できる3個の箱へ入れ、全ての写像を等確率とする。

1. 全配置数を求めよ。
2. 全ての箱が空でない配置数を求めよ。
3. 空箱がちょうど一つである確率を求めよ。
4. 少なくとも一つの箱が空である確率を求めよ。

### P1-C03 減少事象と極限
- level: C
- minutes: 20
- topics: 上からの連続性
- techniques: LIMIT-1、ANSWER-1
- calculation_load: medium

$A_1\supset A_2\supset\cdots$、$P(A_n)=1/(n+1)$ とし、$B_n=A_n\setminus A_{n+1}$ とおく。

1. $P(\bigcap_nA_n)$ を求めよ。
2. $B_n$ が互いに排反であることを示せ。
3. $P(B_n)$ を求めよ。
4. $P(A_1\setminus\bigcap_nA_n)=\sum_{n=1}^{\infty}P(B_n)$ を確認せよ。

## Level D：発展

### P1-D01 一般の包除原理
- level: D
- minutes: 35
- topics: 一般包除原理
- techniques: IE-1、二項定理
- calculation_load: high

有限個の事象 $A_1,\ldots,A_m$ について

$$
P\left(\bigcup_{i=1}^mA_i\right)
=\sum_{\varnothing\neq I\subset\{1,\ldots,m\}}
(-1)^{|I|+1}P\left(\bigcap_{i\in I}A_i\right)
$$

を、各標本点の寄与を数える方法で証明せよ。
