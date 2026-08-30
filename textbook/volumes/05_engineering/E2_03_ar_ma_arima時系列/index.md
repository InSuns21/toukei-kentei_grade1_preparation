# E2-03 AR・MA・ARIMA時系列

時系列では観測の順序そのものが情報を持ちます。昨日と今日の値が似る、ショックの影響が数期残る、トレンドがある、といった時間依存を無視して独立標本として扱うことはできません。本章では、まず定常性・自己共分散・自己相関を具体的な系列から確認し、その後に自己回帰過程（AR）、移動平均過程（MA）、ARMA、ARIMAを組み立てます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 弱定常性を平均・自己共分散で判定する。
- 観測値から標本自己共分散・標本自己相関を計算する。
- AR(1)の平均、分散、自己相関を導く。
- AR(2)のYule--Walker方程式を立てて係数を求める。
- MA(1)の自己共分散を導き、反転可能性の意味を説明する。
- 自己相関関数と偏自己相関関数からAR・MAの候補を区別する。
- 差分を用いてARIMAモデルを定義する。
- AR過程の多段階予測と予測誤差分散を求める。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 時系列解析 | 定常性、自己共分散、自己相関、標本自己相関 |
| 自己回帰過程 | AR(1)、AR(p)、Yule--Walker方程式、予測 |
| 移動平均過程 | MA(1)、MA(q)、反転可能性 |
| ARIMA過程 | 差分、ARMAとの関係 |

## 前提知識チェック

1. P2-02: 期待値、分散、共分散。
2. P3-03: 多変量分布と分散共分散行列。
3. E2-01: 時間依存を条件付き分布で捉える考え方。
4. F0-00: 多項式の根、漸化式。

---

## 1. まず「時間が違っても同じ仕組みか」を見る

独立標本では異なる観測どうしの共分散を0と置くことが多いですが、時系列では
$$
\operatorname{Cov}(X_t,X_{t-h})
$$
そのものが重要な情報です。

例えば
$$
X_t=0.8X_{t-1}+\varepsilon_t
$$
なら、前期の値の影響が次期以降へ徐々に残ります。一方
$$
X_t=\varepsilon_t+0.8\varepsilon_{t-1}
$$
なら、1期前のショックだけが直接残ります。前者が自己回帰過程、後者が移動平均過程です。

ただし、平均が時間とともに上昇している系列へそのまま自己相関の理論を当てはめるのは適切ではありません。まず「平均・分散・共分散の仕組みが時間で変わらないか」を確認します。

## 2. 定義と記号

### 2.1 弱定常性

時系列 $\{X_t\}$ が弱定常であるとは、有限な二次モーメントをもち、
$$
E[X_t]=\mu
$$
が $t$ に依存せず、さらに
$$
\operatorname{Cov}(X_t,X_{t-h})=\gamma(h)
$$
が時点 $t$ ではなくラグ $h$ のみで決まることをいいます。

自己共分散関数を $\gamma(h)$、自己相関関数を
$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}
$$
とします。

### 2.2 白色雑音

白色雑音 $\{\varepsilon_t\}$ は
$$
E[\varepsilon_t]=0,\qquad
\operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2,
$$
$$
\operatorname{Cov}(\varepsilon_t,\varepsilon_s)=0\quad(t\ne s)
$$
を満たす時系列です。本章のAR・MAの導出では、必要に応じて白色雑音を独立と仮定します。

### 2.3 標本自己共分散と標本自己相関

観測値 $x_1,\ldots,x_n$ に対し
$$
\bar x=\frac1n\sum_{t=1}^n x_t
$$
とします。本章ではラグ $h\ge0$ の標本自己共分散を
$$
\hat\gamma(h)=\frac1n\sum_{t=h+1}^n(x_t-\bar x)(x_{t-h}-\bar x)
$$
と定義し、標本自己相関を
$$
\hat\rho(h)=\frac{\hat\gamma(h)}{\hat\gamma(0)}
$$
とします。分母を $n-h$ とする流儀もあるため、試験では問題文の定義に従います。

## 3. 自己回帰過程

### 3.1 AR(1)の平均と分散

$$
X_t=c+\phi X_{t-1}+\varepsilon_t
$$
を考えます。弱定常であれば $E[X_t]=E[X_{t-1}]=\mu$ なので
$$
\mu=c+\phi\mu.
$$
したがって $|\phi|<1$ の定常解では
$$
\mu=\frac{c}{1-\phi}.
$$

$Y_t=X_t-\mu$ と中心化すると
$$
Y_t=\phi Y_{t-1}+\varepsilon_t.
$$
$arepsilon_t$ は過去の $Y_{t-1}$ と無相関なので
$$
\gamma(0)
=\operatorname{Var}(Y_t)
=\phi^2\gamma(0)+\sigma_\varepsilon^2.
$$
よって
$$
\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2}.
$$

さらに $h\ge1$ では
$$
\begin{aligned}
\gamma(h)
&=\operatorname{Cov}(Y_t,Y_{t-h})\\
&=\operatorname{Cov}(\phi Y_{t-1}+\varepsilon_t,Y_{t-h})\\
&=\phi\gamma(h-1),
\end{aligned}
$$
したがって
$$
\gamma(h)=\phi^{|h|}\gamma(0),\qquad
\rho(h)=\phi^{|h|}.
$$

### 3.2 AR(p)とYule--Walker方程式

中心化したAR(p)
$$
X_t=\phi_1X_{t-1}+\cdots+\phi_pX_{t-p}+\varepsilon_t
$$
について、両辺と $X_{t-k}$ の共分散を取ります。$k\ge1$ では $arepsilon_t$ と過去が無相関なので
$$
\gamma(k)
=\phi_1\gamma(k-1)+\cdots+\phi_p\gamma(k-p).
$$
これがYule--Walker方程式です。

AR多項式
$$
1-\phi_1z-\cdots-\phi_pz^p
$$
の零点がすべて単位円の外側にあるとき、因果的な弱定常解を持ちます。

## 4. 移動平均過程

### 4.1 MA(1)の自己共分散

$$
X_t=\mu+\varepsilon_t+\theta\varepsilon_{t-1}
$$
とします。中心化後の分散は
$$
\begin{aligned}
\gamma(0)
&=\operatorname{Var}(\varepsilon_t+\theta\varepsilon_{t-1})\\
&=\sigma_\varepsilon^2+\theta^2\sigma_\varepsilon^2\\
&=(1+\theta^2)\sigma_\varepsilon^2.
\end{aligned}
$$
ラグ1では共通して含まれるショックが $arepsilon_{t-1}$ だけなので
$$
\gamma(1)=\theta\sigma_\varepsilon^2.
$$
ラグ2以上では共通する白色雑音がないため
$$
\gamma(h)=0\qquad(|h|\ge2).
$$
したがってMA(1)の自己相関関数はラグ1で打ち切られます。

### 4.2 反転可能性

MA(1)では、自己共分散だけを見ると異なる係数が同じ系列の二次モーメント構造を表せることがあります。表現を一意に選ぶため、
$$
1+\theta z=0
$$
の根を単位円の外側に置く条件、すなわち本章の符号規約では $|\theta|<1$ を課します。これを反転可能性といいます。

## 5. 自己相関と偏自己相関による見分け

偏自己相関は、ラグ1から $h-1$ の線形な影響を調整した後の $X_t$ と $X_{t-h}$ の相関です。

典型的には次の形を使います。

- AR(p): 自己相関は徐々に減衰し、偏自己相関はラグpで打ち切られる。
- MA(q): 自己相関はラグqで打ち切られ、偏自己相関は徐々に減衰する。
- ARMA: 両方とも徐々に減衰することが多い。

これは絶対的な機械判定ではなく、候補次数を考えるための基本的な手掛かりです。

## 6. 差分とARIMA

後退作用素 $B$ を
$$
BX_t=X_{t-1}
$$
と定義します。1階差分は
$$
\Delta X_t=X_t-X_{t-1}=(1-B)X_t.
$$
$d$ 回差分した系列 $(1-B)^dX_t$ がARMA(p,q)に従うとき、元系列をARIMA(p,d,q)と呼びます。

例えばランダムウォーク
$$
X_t=X_{t-1}+\varepsilon_t
$$
は非定常ですが
$$
\Delta X_t=\varepsilon_t
$$
なのでARIMA(0,1,0)です。

## 7. AR(1)の予測

定常AR(1)
$$
X_t-\mu=\phi(X_{t-1}-\mu)+\varepsilon_t
$$
で、時点 $t$ まで観測済みとします。1期先予測は
$$
\hat X_{t+1\mid t}=\mu+\phi(X_t-\mu).
$$
反復すると
$$
\hat X_{t+h\mid t}=\mu+\phi^h(X_t-\mu).
$$

予測誤差は
$$
X_{t+h}-\hat X_{t+h\mid t}
=\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}
$$
なので、白色雑音が独立なら
$$
\operatorname{Var}(X_{t+h}-\hat X_{t+h\mid t})
=\sigma_\varepsilon^2\sum_{j=0}^{h-1}\phi^{2j}.
$$

---

## 8. 演習：問題の直後に解答

### Level A：基礎部品

#### E2-03-A01 標本自己相関
- Level: A
- 目安時間: 8分
- 主題: 標本自己相関
- 使用技術: 平均、積和
- calculation_load: low

観測値が $(1,2,3,4)$ である。本章の定義
$$
\hat\gamma(h)=\frac14\sum_{t=h+1}^4(x_t-\bar x)(x_{t-h}-\bar x)
$$
を用いて、$\hat\gamma(0)$、$\hat\gamma(1)$、$\hat\rho(1)$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

平均は $\bar x=2.5$。したがって
$$
\hat\gamma(0)=\frac{(-1.5)^2+(-0.5)^2+0.5^2+1.5^2}{4}=\frac54.
$$
ラグ1では
$$
\begin{aligned}
\hat\gamma(1)
&=\frac{(-0.5)(-1.5)+(0.5)(-0.5)+(1.5)(0.5)}4\\
&=\frac{5}{16}.
\end{aligned}
$$
よって
$$
\hat\rho(1)=\frac{5/16}{5/4}=\frac14.
$$

###### 本番答案

$\bar x=2.5$、$\hat\gamma(0)=5/4$、$\hat\gamma(1)=5/16$ より $\hat\rho(1)=1/4$。

###### 採点基準

平均4点、$\hat\gamma(0)$6点、$\hat\gamma(1)$6点、自己相関4点。合計20点。

<!-- solution-end -->

#### E2-03-A02 AR(1)の平均・分散
- Level: A
- 目安時間: 8分
- 主題: AR(1)
- 使用技術: 期待値、分散
- calculation_load: low

白色雑音 $\{\varepsilon_t\}$ は平均0、分散3とする。弱定常な過程
$$
X_t=2+0.5X_{t-1}+\varepsilon_t
$$
の平均と分散を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

平均を $\mu$ とすると
$$
\mu=2+0.5\mu
$$
なので $\mu=4$。中心化した $Y_t=X_t-4$ は
$$Y_t=0.5Y_{t-1}+\varepsilon_t.$$
よって分散 $\gamma(0)$ は
$$
\gamma(0)=0.5^2\gamma(0)+3
$$
を満たし、
$$
\gamma(0)=\frac3{1-0.25}=4.
$$

###### 本番答案

$\mu=2+0.5\mu$ より $\mu=4$。中心化して $\gamma(0)=0.25\gamma(0)+3$ より $\gamma(0)=4$。

###### 採点基準

平均8点、中心化4点、分散方程式4点、分散4点。合計20点。

<!-- solution-end -->

#### E2-03-A03 MA(1)の自己共分散
- Level: A
- 目安時間: 8分
- 主題: MA(1)
- 使用技術: 共分散
- calculation_load: low

独立な白色雑音の分散を4とし、
$$
X_t=\varepsilon_t+0.5\varepsilon_{t-1}
$$
とする。$\gamma(0),\gamma(1),\gamma(2),\rho(1)$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

独立性から交差共分散は0なので
$$
\gamma(0)=4+0.5^2\cdot4=5.
$$
$X_t$ と $X_{t-1}$ に共通するのは $\varepsilon_{t-1}$ で、係数はそれぞれ $0.5,1$ だから
$$
\gamma(1)=0.5\cdot4=2.
$$
ラグ2では共通する白色雑音がないため $\gamma(2)=0$。したがって
$$
\rho(1)=\frac25.
$$

###### 本番答案

$\gamma(0)=5$、$\gamma(1)=2$、$\gamma(2)=0$、$\rho(1)=2/5$。

###### 採点基準

分散6点、ラグ1共分散6点、ラグ2共分散4点、相関4点。合計20点。

<!-- solution-end -->

#### E2-03-A04 差分とARIMA
- Level: A
- 目安時間: 7分
- 主題: 差分
- 使用技術: 後退作用素
- calculation_load: low

$X_t=X_{t-1}+\varepsilon_t$ とする。ただし $\{\varepsilon_t\}$ は白色雑音である。$\Delta X_t$ を求め、この過程のARIMA次数を答えよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$$
\Delta X_t=X_t-X_{t-1}=\varepsilon_t.
$$
1階差分するとARMA(0,0)、すなわち白色雑音になるので、元系列はARIMA(0,1,0)である。

###### 本番答案

$\Delta X_t=\varepsilon_t$。したがってARIMA(0,1,0)。

###### 採点基準

差分10点、次数10点。合計20点。

<!-- solution-end -->

### Level B：標準技能

#### E2-03-B01 AR(1)の自己相関を導く
- Level: B
- 目安時間: 12分
- 主題: AR(1)
- 使用技術: 共分散漸化式
- calculation_load: medium

平均0の弱定常過程
$$
X_t=\phi X_{t-1}+\varepsilon_t,\qquad |\phi|<1
$$
を考える。白色雑音 $\varepsilon_t$ は過去の $X_{t-h}$ と無相関とする。$ho(h)=\phi^{|h|}$ を導け。

<!-- solution-start -->

##### 解答

###### 詳細解答

$h\ge1$ について
$$
\begin{aligned}
\gamma(h)
&=\operatorname{Cov}(X_t,X_{t-h})\\
&=\operatorname{Cov}(\phi X_{t-1}+\varepsilon_t,X_{t-h})\\
&=\phi\operatorname{Cov}(X_{t-1},X_{t-h})\\
&=\phi\gamma(h-1).
\end{aligned}
$$
最後から2行目では $\operatorname{Cov}(\varepsilon_t,X_{t-h})=0$ を使った。反復すると
$$
\gamma(h)=\phi^h\gamma(0).
$$
したがって
$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}=\phi^h
$$
であり、対称性 $\rho(-h)=\rho(h)$ から $\rho(h)=\phi^{|h|}$。

###### 本番答案

$\gamma(h)=\operatorname{Cov}(\phi X_{t-1}+\varepsilon_t,X_{t-h})=\phi\gamma(h-1)$。反復して $\gamma(h)=\phi^h\gamma(0)$、よって $\rho(h)=\phi^{|h|}$。

###### 採点基準

共分散の出発式5点、白色雑音項が消える理由5点、漸化式5点、結論5点。合計20点。

<!-- solution-end -->

#### E2-03-B02 AR(2)の自己相関
- Level: B
- 目安時間: 12分
- 主題: AR(2)
- 使用技術: Yule--Walker方程式
- calculation_load: medium

平均0の弱定常AR(2)
$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$
について、Yule--Walker方程式を用いて $\rho(1),\rho(2)$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

ラグ1では $\gamma(-1)=\gamma(1)$ なので
$$
\gamma(1)=0.5\gamma(0)+0.2\gamma(1).
$$
$\gamma(0)$ で割ると
$$
0.8\rho(1)=0.5,
$$
したがって
$$
\rho(1)=\frac58=0.625.
$$
ラグ2では
$$
\rho(2)=0.5\rho(1)+0.2
=0.5\cdot0.625+0.2=0.5125.
$$

###### 本番答案

$ho(1)=0.5+0.2ho(1)$ より $\rho(1)=0.625$。さらに $\rho(2)=0.5\rho(1)+0.2=0.5125$。

###### 採点基準

ラグ1方程式8点、$\rho(1)$4点、ラグ2方程式4点、$\rho(2)$4点。合計20点。

<!-- solution-end -->

#### E2-03-B03 MA(1)の反転可能性
- Level: B
- 目安時間: 12分
- 主題: MA(1)
- 使用技術: 自己共分散比較
- calculation_load: medium

白色雑音の分散を $\sigma^2$ とし、
$$X_t=\varepsilon_t+2\varepsilon_{t-1}$$
とする。

1. $ho(1)$ を求めよ。
2. $\tilde X_t=\tilde\varepsilon_t+0.5\tilde\varepsilon_{t-1}$ とし、$\operatorname{Var}(\tilde\varepsilon_t)=4\sigma^2$ とすると、$X_t$ と $\tilde X_t$ の自己共分散が一致することを示せ。
3. 反転可能な表現としてどちらを選ぶか答えよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$X_t$ では
$$
\gamma(0)=5\sigma^2,\qquad \gamma(1)=2\sigma^2,
$$
したがって $ho(1)=2/5$。

一方、$\tilde X_t$ では
$$
\tilde\gamma(0)=4\sigma^2(1+0.5^2)=5\sigma^2,
$$
$$
\tilde\gamma(1)=0.5\cdot4\sigma^2=2\sigma^2,
$$
ラグ2以上はいずれも0なので自己共分散関数は一致する。

本章の符号規約ではMA(1)の反転可能性は $|\theta|<1$ なので、係数0.5の表現を選ぶ。

###### 本番答案

$ho(1)=2/5$。係数0.5、雑音分散 $4\sigma^2$ の表現でも $(\gamma(0),\gamma(1))=(5\sigma^2,2\sigma^2)$。反転可能なのは $|0.5|<1$ の後者。

###### 採点基準

元表現6点、代替表現8点、反転可能性6点。合計20点。

<!-- solution-end -->

#### E2-03-B04 AR(1)の予測誤差分散
- Level: B
- 目安時間: 12分
- 主題: 予測
- 使用技術: 独立和の分散
- calculation_load: medium

平均0のAR(1)
$$
X_t=0.5X_{t-1}+\varepsilon_t,\qquad \operatorname{Var}(\varepsilon_t)=4
$$
について、2期先予測 $\hat X_{t+2\mid t}$ と予測誤差分散を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

1期先は $\hat X_{t+1\mid t}=0.5X_t$、2期先は
$$
\hat X_{t+2\mid t}=0.5^2X_t=0.25X_t.
$$
実際には
$$
X_{t+2}=0.25X_t+0.5\varepsilon_{t+1}+\varepsilon_{t+2}.
$$
よって予測誤差は
$$
0.5\varepsilon_{t+1}+\varepsilon_{t+2}.
$$
独立性から
$$
\operatorname{Var}=0.5^2\cdot4+4=5.
$$

###### 本番答案

$\hat X_{t+2\mid t}=0.25X_t$。誤差は $0.5\varepsilon_{t+1}+\varepsilon_{t+2}$ なので分散は5。

###### 採点基準

予測8点、誤差表示6点、分散6点。合計20点。

<!-- solution-end -->

### Level C：本番標準

#### E2-03-C01 AR(2)係数を自己相関から求める
- Level: C
- 目安時間: 20分
- 主題: AR(2)
- 使用技術: Yule--Walker連立方程式
- calculation_load: medium

平均0の弱定常AR(2)
$$
X_t=\phi_1X_{t-1}+\phi_2X_{t-2}+\varepsilon_t
$$
について、$ho(1)=0.6,ho(2)=0.4$ が与えられた。$\phi_1,\phi_2$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

Yule--Walker方程式から
$$
\rho(1)=\phi_1+\phi_2\rho(1),
$$
$$
\rho(2)=\phi_1\rho(1)+\phi_2.
$$
数値を代入すると
$$
0.6=\phi_1+0.6\phi_2,
$$
$$
0.4=0.6\phi_1+\phi_2.
$$
第一式から $\phi_1=0.6-0.6\phi_2$。第二式へ代入して
$$
0.4=0.36-0.36\phi_2+\phi_2
=0.36+0.64\phi_2.
$$
よって
$$
\phi_2=0.0625,\qquad \phi_1=0.5625.
$$

###### 本番答案

$0.6=\phi_1+0.6\phi_2$、$0.4=0.6\phi_1+\phi_2$ を解き、$(\phi_1,\phi_2)=(0.5625,0.0625)$。

###### 採点基準

方程式2本10点、代入計算6点、係数4点。合計20点。

<!-- solution-end -->

#### E2-03-C02 自己相関の形から候補を選ぶ
- Level: C
- 目安時間: 20分
- 主題: モデル識別
- 使用技術: 自己相関・偏自己相関
- calculation_load: low

弱定常とみなせる3系列A,B,Cについて次が観察された。

- A: 自己相関は徐々に減衰し、偏自己相関はラグ2以降ほぼ0。
- B: 自己相関はラグ2以降ほぼ0で、偏自己相関は徐々に減衰。
- C: 自己相関・偏自己相関とも徐々に減衰。

それぞれの第一候補を AR(1)、MA(1)、ARMA(1,1) から選び、理由を述べよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

AR(p)では偏自己相関がラグpで打ち切られるためAはAR(1)が第一候補。MA(q)では自己相関がラグqで打ち切られるためBはMA(1)。ARMAでは一般に両方が尾を引くためCはARMA(1,1)が第一候補である。

これは候補選択であり、実データでは残差診断や情報量規準なども合わせて確認する。

###### 本番答案

A: AR(1)、B: MA(1)、C: ARMA(1,1)。打ち切り位置がそれぞれARの偏自己相関、MAの自己相関に対応する。

###### 採点基準

A6点、B6点、C6点、候補選択であるとの説明2点。合計20点。

<!-- solution-end -->

#### E2-03-C03 ARIMAの次数と予測
- Level: C
- 目安時間: 22分
- 主題: ARIMA
- 使用技術: 差分、AR予測
- calculation_load: medium

$$
X_t=X_{t-1}+Y_t,\qquad
Y_t=0.6Y_{t-1}+\varepsilon_t
$$
とする。$\{\varepsilon_t\}$ は平均0の白色雑音である。

1. $X_t$ のARIMA次数を答えよ。
2. $Y_t$ の自己相関関数を求めよ。
3. 現在 $Y_t=5$ のとき、$Y_{t+1},Y_{t+2}$ の条件付き平均を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$\Delta X_t=X_t-X_{t-1}=Y_t$ であり、$Y_t$ はAR(1)だから
$$X_t\text{ は ARIMA}(1,1,0).$$
AR(1)より
$$
\rho_Y(h)=0.6^{|h|}.
$$
予測では将来の白色雑音の条件付き平均は0なので
$$
E[Y_{t+1}\mid\mathcal F_t]=0.6\cdot5=3,
$$
$$
E[Y_{t+2}\mid\mathcal F_t]=0.6^2\cdot5=1.8.
$$

###### 本番答案

$\Delta X_t=Y_t$ がAR(1)なのでARIMA(1,1,0)。$ho_Y(h)=0.6^{|h|}$。1期先3、2期先1.8。

###### 採点基準

次数7点、自己相関6点、予測7点。合計20点。

<!-- solution-end -->

#### E2-03-C04 AR(1)の予測区間の幅
- Level: C
- 目安時間: 22分
- 主題: 予測誤差
- 使用技術: 幾何級数
- calculation_load: medium

正規白色雑音をもつ平均0のAR(1)
$$
X_t=\phi X_{t-1}+\varepsilon_t,\qquad |\phi|<1,\qquad
\varepsilon_t\sim N(0,\sigma^2)
$$
を考える。

1. $h$期先の予測誤差分散を導け。
2. $h\to\infty$ でその分散が定常分散へ近づくことを示せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

反復すると
$$
X_{t+h}=\phi^hX_t+\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}.
$$
予測値は $\phi^hX_t$ なので誤差は和の部分。独立性から
$$
V_h=\sigma^2\sum_{j=0}^{h-1}\phi^{2j}
=\sigma^2\frac{1-\phi^{2h}}{1-\phi^2}.
$$
$|\phi|<1$ だから $\phi^{2h}\to0$。したがって
$$
V_h\to\frac{\sigma^2}{1-\phi^2},
$$
これはAR(1)の定常分散である。

###### 本番答案

$X_{t+h}-\hat X_{t+h\mid t}=\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}$ より $V_h=\sigma^2(1-\phi^{2h})/(1-\phi^2)$。極限は $\sigma^2/(1-\phi^2)$。

###### 採点基準

反復表示6点、分散6点、幾何級数4点、極限4点。合計20点。

<!-- solution-end -->

#### E2-03-C05 AR(2)の定常性判定
- Level: C
- 目安時間: 20分
- 主題: AR(2)
- 使用技術: 特性方程式
- calculation_load: medium

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$
のAR多項式 $1-0.5z-0.2z^2$ の零点を求め、因果的弱定常解を持つための条件を満たすか判定せよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$$
1-0.5z-0.2z^2=0
$$
は
$$
0.2z^2+0.5z-1=0
$$
と同値。二次方程式より
$$
z=\frac{-0.5\pm\sqrt{0.25+0.8}}{0.4}
=\frac{-0.5\pm\sqrt{1.05}}{0.4}.
$$
数値的には約
$$
1.31,\qquad -3.81.
$$
両方とも絶対値が1より大きいので、零点は単位円の外側にあり、因果的弱定常解を持つ条件を満たす。

###### 本番答案

零点は $(-0.5\pm\sqrt{1.05})/0.4\approx1.31,-3.81$。ともに絶対値1超なので定常条件を満たす。

###### 採点基準

方程式変形4点、零点8点、絶対値判定4点、結論4点。合計20点。

<!-- solution-end -->

### Level D：発展

#### E2-03-D01 ARMA(1,1)の自己共分散
- Level: D
- 目安時間: 35分
- 主題: ARMA
- 使用技術: 無限MA表示、共分散
- calculation_load: high

平均0の過程
$$
X_t=\phi X_{t-1}+\varepsilon_t+\theta\varepsilon_{t-1},
\qquad |\phi|<1
$$
を考える。$\{\varepsilon_t\}$ は独立で平均0、分散 $\sigma^2$ とする。

1. $X_t$ を現在と過去の白色雑音の和として表せ。
2. $\gamma(0)$ を求めよ。
3. $\gamma(1)=\phi\gamma(0)+\theta\sigma^2$ を示せ。
4. $h\ge2$ で $\gamma(h)=\phi\gamma(h-1)$ を示せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

反復代入すると
$$
X_t=\varepsilon_t+(\phi+\theta)\varepsilon_{t-1}
+\phi(\phi+\theta)\varepsilon_{t-2}+\cdots.
$$
したがって係数は、ラグ0で1、ラグ $j\ge1$ で $\phi^{j-1}(\phi+\theta)$。

独立性から分散は係数二乗和なので
$$
\begin{aligned}
\gamma(0)
&=\sigma^2\left[1+(\phi+\theta)^2\sum_{j=0}^{\infty}\phi^{2j}\right]\\
&=\sigma^2\left[1+\frac{(\phi+\theta)^2}{1-\phi^2}\right]\\
&=\sigma^2\frac{1+\theta^2+2\phi\theta}{1-\phi^2}.
\end{aligned}
$$

元のモデルと $X_{t-1}$ の共分散を取ると
$$
\gamma(1)
=\phi\gamma(0)
+\operatorname{Cov}(\varepsilon_t,X_{t-1})
+\theta\operatorname{Cov}(\varepsilon_{t-1},X_{t-1}).
$$
第一の共分散は0。$X_{t-1}$ には $\varepsilon_{t-1}$ が係数1で含まれるので第二は $\sigma^2$。よって
$$
\gamma(1)=\phi\gamma(0)+\theta\sigma^2.
$$
$h\ge2$ では $X_{t-h}$ は $\varepsilon_t,\varepsilon_{t-1}$ のどちらとも無相関なので
$$
\gamma(h)=\phi\gamma(h-1).
$$

###### 本番答案

$X_t=\varepsilon_t+(\phi+\theta)\sum_{j\ge1}\phi^{j-1}\varepsilon_{t-j}$。係数二乗和より $\gamma(0)=\sigma^2(1+\theta^2+2\phi\theta)/(1-\phi^2)$。共分散を取れば $\gamma(1)=\phi\gamma(0)+\theta\sigma^2$、$h\ge2$ では $\gamma(h)=\phi\gamma(h-1)$。

###### 採点基準

無限表示5点、$\gamma(0)$7点、$\gamma(1)$5点、高ラグ漸化式3点。合計20点。

<!-- solution-end -->

## 9. 30分ドリル

### E2-03-DRILL-01 差分・自己相関・予測をつなぐ

平均0の白色雑音 $\varepsilon_t$ の分散を4とし、
$$
(1-0.5B)(1-B)X_t=\varepsilon_t
$$
とする。

1. $Y_t=\Delta X_t$ とおき、$Y_t$ のモデルを書け。
2. $X_t$ のARIMA次数を答えよ。
3. $Y_t$ の定常分散と $ho_Y(1),\rho_Y(2)$ を求めよ。
4. 現在 $Y_t=6$ のとき、1期先・2期先の条件付き平均を求めよ。
5. 2期先予測誤差分散を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$(1-B)X_t=Y_t$ なので
$$
(1-0.5B)Y_t=\varepsilon_t,
$$
すなわち
$$
Y_t=0.5Y_{t-1}+\varepsilon_t.
$$
したがって $X_t$ はARIMA(1,1,0)。

AR(1)の定常分散は
$$
\operatorname{Var}(Y_t)=\frac4{1-0.5^2}=\frac{16}{3}.
$$
自己相関は
$$
\rho_Y(1)=0.5,\qquad \rho_Y(2)=0.25.
$$
予測は
$$
\hat Y_{t+1\mid t}=0.5\cdot6=3,
$$
$$
\hat Y_{t+2\mid t}=0.5^2\cdot6=1.5.
$$
2期先誤差は $0.5\varepsilon_{t+1}+\varepsilon_{t+2}$ なので
$$
\operatorname{Var}=0.25\cdot4+4=5.
$$

###### 本番答案

$Y_t=0.5Y_{t-1}+\varepsilon_t$、したがってARIMA(1,1,0)。$\operatorname{Var}(Y_t)=16/3$、$(\rho(1),\rho(2))=(0.5,0.25)$。予測は3、1.5、2期先誤差分散は5。

###### 採点基準

全100点。モデル化20点、次数15点、定常分散・自己相関25点、予測20点、予測誤差分散20点。

<!-- solution-end -->

## 10. 過去問との対応

統計応用（理工学）の「時系列解析・自己回帰過程・移動平均過程・ARIMA過程」を担当する。単なるモデル名の識別ではなく、自己共分散を定義から計算し、差分・Yule--Walker方程式・予測へ接続できることを重視する。

## 11. 章末チェック

- 弱定常性の2条件を説明できる。
- 標本自己相関と理論自己相関を区別できる。
- AR(1)の平均・分散・自己相関を導ける。
- AR(2)のYule--Walker方程式を立てられる。
- MA(1)で自己相関がラグ1で打ち切られる理由を説明できる。
- 反転可能性がMA表現を一意に選ぶための条件だと説明できる。
- 差分からARIMA次数を判断できる。
- 多段階予測と予測誤差分散を計算できる。
