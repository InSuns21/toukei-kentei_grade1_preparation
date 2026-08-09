# 問題集

## Level A：基礎部品

### P1-A04 条件付き確率
- level: A
- minutes: 6
- topics: 条件付き確率
- techniques: COND-1
- calculation_load: low

$P(A)=0.5$, $P(B)=0.4$, $P(A\cap B)=0.2$ のとき、$P(A\mid B)$ と $P(B\mid A)$ を求めよ。

### P1-A05 独立性の判定
- level: A
- minutes: 7
- topics: 独立
- techniques: INDEP-1
- calculation_load: low

$P(A)=0.3$, $P(B)=0.5$, $P(A\cup B)=0.65$ のとき、$A,B$ は独立か判定せよ。

### P1-A06 二原因のBayes計算
- level: A
- minutes: 9
- topics: Bayesの定理
- techniques: TOTAL-1, BAYES-1
- calculation_load: low

箱1を確率 $1/3$、箱2を確率 $2/3$ で選ぶ。赤玉を引く条件付き確率はそれぞれ $1/2$, $1/4$ である。赤玉を引いたとき、箱1を選んだ確率を求めよ。

## Level B：小問セット

### P1-B04 非復元抽出
- level: B
- minutes: 12
- topics: 条件付き確率、乗法公式
- techniques: COND-1, MULT-1
- calculation_load: medium

赤玉4個、白玉3個から戻さず3個引く。$R_i$ を $i$ 個目が赤である事象とする。

1. $P(R_2\mid R_1)$ を求めよ。
2. $P(R_1\cap R_2\cap R_3)$ を求めよ。
3. $R_1$ と $R_2$ が独立でないことを示せ。

### P1-B05 対独立と相互独立
- level: B
- minutes: 13
- topics: 対独立、相互独立
- techniques: INDEP-1
- calculation_load: medium

$\Omega=\{00,01,10,11\}$ を等確率とし、$A$ を第1桁が0、$B$ を第2桁が0、$C$ を二桁が異なる事象とする。

1. $A,B,C$ が対独立であることを示せ。
2. 相互独立でないことを示せ。

### P1-B06 三つの箱
- level: B
- minutes: 15
- topics: 全確率公式、Bayesの定理
- techniques: TOTAL-1, BAYES-1
- calculation_load: medium

箱 $H_1,H_2,H_3$ をそれぞれ確率 $1/2,1/3,1/6$ で選ぶ。選んだ箱から赤玉を引く条件付き確率はそれぞれ $1/5,1/2,4/5$ である。

1. 赤玉を引く確率を求めよ。
2. 赤玉を引いたとき、選んだ箱が $H_3$ である確率を求めよ。
3. 三箱の事後確率の和が1になることを確認せよ。

## Level C：本番標準

### P1-C04 診断検査と事前確率
- level: C
- minutes: 25
- topics: 条件付き確率、Bayesの定理
- techniques: TOTAL-1, BAYES-1, ANSWER-1
- calculation_load: medium

有病率が2%の集団で、検査の感度は95%、特異度は90%である。有病事象を $D$、陽性事象を $+$ とする。

1. $P(+\mid D^c)$ を求めよ。
2. $P(+)$ を求めよ。
3. $P(D\mid +)$ を既約分数で求めよ。
4. 陰性だった人が有病である確率 $P(D\mid +^c)$ を求めよ。
5. 感度と陽性的中率が一致しない理由を一文で説明せよ。

### P1-C05 二段階の箱選択
- level: C
- minutes: 25
- topics: 連鎖律、Bayesの定理、事後予測
- techniques: MULT-1, TOTAL-1, BAYES-1
- calculation_load: high

箱 $H_1$ は赤2個・白1個、箱 $H_2$ は赤1個・白2個を含む。最初に各箱を確率 $1/2$ で選び、選んだ箱から戻さず2個引く。1個目、2個目が赤である事象を $R_1,R_2$ とする。

1. $P(R_1\mid H_i)$ を $i=1,2$ について求めよ。
2. $P(R_1)$ を求めよ。
3. $P(H_1\mid R_1)$ を求めよ。
4. $P(R_2\mid R_1,H_i)$ を $i=1,2$ について求めよ。
5. $P(R_2\mid R_1)$ を求めよ。

### P1-C06 直列・並列システム
- level: C
- minutes: 22
- topics: 独立、補事象
- techniques: INDEP-1, ANSWER-1
- calculation_load: medium

部品 $i$ が作動する事象を $A_i$ とし、$A_1,A_2,A_3$ は相互独立、$P(A_i)=p_i$（$0<p_i<1$）とする。部品1と2を並列にし、その系と部品3を直列につなぐ。

1. システム作動事象 $S$ を集合式で表せ。
2. 並列部分が作動する確率を求めよ。
3. $P(S)$ を求めよ。
4. $p_1=p_2=p_3=0.9$ の値を求めよ。
5. 部品3が停止した条件下でシステムが作動する確率を求め、意味を説明せよ。

### P1-C07 三事象の独立性
- level: C
- minutes: 25
- topics: 対独立、相互独立、条件付き確率
- techniques: INDEP-1, COND-1
- calculation_load: medium

$P(A)=P(B)=P(C)=1/2$、各二事象の共通部分の確率が全て $1/4$、$P(A\cap B\cap C)=1/4$ とする。

1. $A,B,C$ が対独立であることを示せ。
2. 相互独立でないことを示せ。
3. $P(C\mid A\cap B)$ を求めよ。
4. $P(C\mid A)$ と比較し、対独立では「二事象を同時に知った影響」を除けないことを説明せよ。

### P1-C08 層別集団の条件付き確率
- level: C
- minutes: 28
- topics: 全確率公式、条件付き確率
- techniques: TOTAL-1, BAYES-1, ANSWER-1
- calculation_load: high

集団は層 $H_1,H_2$ に分かれ、$P(H_1)=0.6$, $P(H_2)=0.4$ である。事象 $A,B$ について

$$
P(A\mid H_1)=0.8,\qquad P(B\mid A,H_1)=0.1,\qquad P(B\mid A^c,H_1)=0.3,
$$

$$
P(A\mid H_2)=0.5,\qquad P(B\mid A,H_2)=0.2,\qquad P(B\mid A^c,H_2)=0.4
$$

とする。

1. $P(B\mid H_i)$ を $i=1,2$ について求めよ。
2. $P(B)$ を求めよ。
3. $P(A\cap B)$ を求めよ。
4. $P(A\mid B)$ を求めよ。
5. $A$ と $B$ が独立でないことを示せ。

## Level D：発展

### P1-D02 相互独立と補事象の一般化
- level: D
- minutes: 40
- topics: 相互独立、補事象
- techniques: INDEP-1, 二項展開
- calculation_load: high

$A_1,\ldots,A_m$ が相互独立とする。各 $i$ について $B_i$ を $A_i$ または $A_i^c$ のいずれかとする。このとき $B_1,\ldots,B_m$ も相互独立であることを、任意の部分族について証明せよ。
