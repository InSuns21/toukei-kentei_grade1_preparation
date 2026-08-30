---
id: test-normal-z-known-formula
title: 分散既知の正規平均Z検定を方向判定からP値まで解く
category: math-testing
subcategory: math-normal-tests
topic: normal-z-test-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 正規分布
  - Z検定
  - 片側検定
  - P値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
---

## 問題
正規分布 $N(\mu,\sigma^2)$ からの独立同分布標本 $X_1,\ldots,X_n$ を考え、$\sigma^2$ は既知とする。$H_0:\mu=\mu_0$ のZ検定について、対立仮説が右片側・左片側・両側の場合の棄却方向とP値を書け。

さらに次を計算せよ。
1. $\sigma=3,n=36,\bar x=11.2$、$H_0:\mu=10$ 対 $H_1:\mu>10$ を5%で検定する。
2. 両側検定で $z_{\rm obs}=-2.30$ を得たときP値を求める。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
帰無仮説の下で
$$
Z=\frac{\bar X-\mu_0}{\sigma/\sqrt n}\sim N(0,1).
$$
$\Phi$ を標準正規分布の累積分布関数、$z_\alpha$ を上側 $\alpha$ 点とすると、
$$
\begin{array}{c|c|c}
H_1 & \text{棄却域} & \text{P値}\\ \hline
\mu>\mu_0 & Z>z_\alpha & 1-\Phi(z_{\rm obs})\\
\mu<\mu_0 & Z<-z_\alpha & \Phi(z_{\rm obs})\\
\mu\ne\mu_0 & |Z|>z_{\alpha/2} & 2\{1-\Phi(|z_{\rm obs}|)\}
\end{array}
$$

## 一手
まず対立仮説の向きから「右・左・両側」を決め、その後にZ統計量を計算する。左片側で絶対値を取ったり、両側なのに片側P値を使ったりしない。

## 答え
1. 標準誤差は $3/\sqrt{36}=0.5$ なので
$$
z=\frac{11.2-10}{0.5}=2.4.
$$
$2.4>z_{0.05}=1.645$ より5%で $H_0$ を棄却する。

2. 両側P値は
$$
2\{1-\Phi(2.30)\}\approx0.0214
$$
なので5%で棄却する。

## 計算例
左片側の符号確認として、$\sigma=2,n=25,\bar x=4.4$、$H_0:\mu=5$ 対 $H_1:\mu<5$ なら
$$
z=\frac{4.4-5}{2/5}=-1.5.
$$
左側5%臨界値は $-1.645$ であり、$-1.5>-1.645$ だから棄却しない。P値も
$$
\Phi(-1.5)\approx0.0668>0.05
$$
で同じ結論になる。

## 注意
母分散未知の正規小標本では、$\sigma$ を単に $S$ に置き換えて標準正規分布を使うのではなく、t統計量を使う。両側P値は対称な帰無分布で片側尾確率を2倍する。

<!-- CARD -->

---
id: test-normal-t-pivot
title: 1標本t検定を導出から数値判定まで解く
category: math-testing
subcategory: math-normal-tests
topic: one-sample-t-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 正規分布
  - t検定
  - 1標本
  - P値
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
---

## 問題
正規分布 $N(\mu,\sigma^2)$ からの独立同分布標本 $X_1,\ldots,X_n$ を考え、$\sigma^2$ は未知とする。$H_0:\mu=\mu_0$ の1標本t検定について、統計量と帰無分布を導き、有限標本で正確となる条件を述べよ。

さらに $n=16,\bar x=52,s=4$、$H_0:\mu=50$ 対 $H_1:\mu\ne50$ を5%で検定せよ。ただし $t_{15,0.025}=2.131$ とする。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
正規標本では
$$
Z=\frac{\bar X-\mu_0}{\sigma/\sqrt n}\sim N(0,1),
\qquad
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$
で、$Z$ と $V$ は独立である。したがって
$$
T=\frac{Z}{\sqrt{V/(n-1)}}
=\frac{\bar X-\mu_0}{S/\sqrt n}
\sim t_{n-1}.
$$

## 一手
母分散未知の正規平均なら、標準誤差を $S/\sqrt n$ とし、自由度 $n-1$ のt分布へ落とす。対立仮説の向きに応じて片側または両側の臨界値と比較する。

## 答え
数値例では
$$
T=\frac{52-50}{4/\sqrt{16}}=2,
\qquad \mathrm{df}=15.
$$
両側5%では $|2|<2.131$ なので $H_0$ を棄却しない。P値は約0.064である。

## 計算例
標準誤差は
$$
\frac{s}{\sqrt n}=\frac4{4}=1
$$
なので統計量は直ちに $T=2$。有限標本で上のt分布が正確なのは、観測が独立同分布で母集団が正規分布に従うためである。

## 注意
正確な有限標本t分布には正規性が使われる。大標本ではある程度の非正規性に頑健でも、小標本で強い歪みや外れ値があると平均と標準偏差の双方が強く影響される。「母分散未知だから常にt検定」ではなく、標本設計と分布条件も確認する。

<!-- CARD -->

---
id: test-paired-t-construction
title: 対応のあるt検定を差の1標本t検定として完遂する
category: math-testing
subcategory: math-normal-tests
topic: paired-t-canonical
type: strategy
difficulty: 2
priority: S
hashtags:
  - 対応のあるt検定
  - t検定
  - 差
  - P値
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
  - type: past_exam
    id: MATH-2014-Q4
    topic: F分布・二標本比較
---

## 問題
同じ対象の前後測定または1対1に対応付けられた標本 $(X_i,Y_i)$ について、平均差0を検定する方法を述べよ。

差を $D_i=Y_i-X_i$ と定義し、$n=12,\bar d=3,s_D=4$ を得た。$H_0:\mu_D=0$ 対 $H_1:\mu_D>0$ の検定統計量を求めよ。

## 使用公式・定理
ペアごとの差
$$
D_i=Y_i-X_i
$$
を1つの標本とみなす。差 $D_i$ が独立に $N(\mu_D,\sigma_D^2)$ に従うなら、帰無仮説 $H_0:\mu_D=0$ の下で
$$
T=\frac{\bar D}{S_D/\sqrt n}\sim t_{n-1}.
$$

## 一手
元の2群を別々に比較せず、まず各ペアを差1個へ圧縮する。その後は通常の1標本t検定として処理する。

## 答え
$$
T=\frac{3}{4/\sqrt{12}}
=\frac{3\sqrt{12}}4
\approx2.598,
\qquad \mathrm{df}=11.
$$
右片側P値は $P(t_{11}\ge2.598)$ である。

## 計算例
$t_{11,0.025}\approx2.201$ なので $2.598>2.201$。したがって少なくとも片側2.5%水準では棄却でき、片側5%でも棄却する。

## 注意
正規性の条件は各群 $X,Y$ それぞれではなく差 $D$ の分布に置く。差の向きを逆にすれば統計量の符号と対立仮説の向きも同時に逆になる。ペア内相関を無視して独立2標本検定へ変えてはいけない。

<!-- CARD -->

---
id: test-paired-versus-independent
title: 対応ありと独立2標本の検定を選択する
category: math-testing
subcategory: math-normal-tests
topic: paired-independent-choice
type: recognition
difficulty: 2
priority: A
hashtags: [対応のあるt検定, 2標本t検定, 検定選択]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 平均値と分散に関する検定 }, { type: past_exam, id: MATH-2014-Q4, topic: F分布・二標本比較 }]
---

## 問題
(a) 同一患者の治療前後、(b) 無関係な2群の患者、(c) 年齢で1対1マッチした症例対照について、対応ありか独立2標本かを選べ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

対応ありでは $D_i=X_i-Y_i$ を解析し、独立2標本では $\overline X-\overline Y$ の分散を群別に足す。

## 答え
(a) 対応あり、(b) 独立2標本、(c) 対応あり。観測値の個数ではなく、設計上のペア対応で決める。

## 計算例
ペア内相関が正なら $\operatorname{Var}(X-Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)-2\operatorname{Cov}(X,Y)$ が小さくなりうる。

## 注意
対応を無視すると標準誤差と自由度が誤る。

<!-- CARD -->

---
id: test-pooled-two-sample-t
title: 等分散2標本t検定を結合分散から数値判定まで解く
category: math-testing
subcategory: math-normal-tests
topic: pooled-two-sample-t-canonical
type: strategy
difficulty: 3
priority: A
hashtags:
  - 2標本t検定
  - 等分散
  - 結合分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 複数の平均に関する検定
---

## 問題
独立な2群がそれぞれ正規分布 $N(\mu_X,\sigma^2)$、$N(\mu_Y,\sigma^2)$ に従い、共通分散 $\sigma^2$ は未知とする。$H_0:\mu_X=\mu_Y$ の等分散2標本t検定の統計量を示し、$n_X=n_Y=10,\bar x=12,\bar y=10,s_X^2=4,s_Y^2=6$ について両側5%で検定せよ。ただし $t_{18,0.025}=2.101$ とする。

## 使用公式・定理
共通分散は2群の残差平方和を自由度で重み付けして
$$
S_p^2=\frac{(n_X-1)S_X^2+(n_Y-1)S_Y^2}{n_X+n_Y-2}
$$
と推定する。帰無仮説の下で
$$
T=\frac{\bar X-\bar Y}{S_p\sqrt{1/n_X+1/n_Y}}
\sim t_{n_X+n_Y-2}.
$$

## 一手
等分散を仮定できる独立2標本なら、まず2群の分散を結合して $S_p^2$ を作り、その後に平均差を共通標準誤差で割る。

## 答え
$$
S_p^2=\frac{9\cdot4+9\cdot6}{18}=5,
$$
$$
T=\frac{12-10}{\sqrt5\sqrt{1/10+1/10}}=2,
\qquad \mathrm{df}=18.
$$
$|2|<2.101$ なので両側5%では $H_0$ を棄却しない。

## 計算例
自由度は
$$
(n_X-1)+(n_Y-1)=9+9=18
$$
と、2群の残差自由度の和になる。

## 注意
等分散の根拠がない場合はWelch検定を標準選択とする。対応のある標本ではこの式ではなく、ペア差の1標本t検定へ帰着する。

<!-- CARD -->

---
id: test-pooled-two-sample-t-numeric
title: 等分散2標本t検定を数値で完遂する
category: math-testing
subcategory: math-normal-tests
topic: pooled-t-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [2標本t検定, 等分散, t検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 複数の平均に関する検定 }]
---

## 問題
独立な正規2群で $n_X=n_Y=10,\overline x=12,\overline y=10,s_X^2=4,s_Y^2=6$。等分散を仮定して平均差0を検定する統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両側5%では $|T|>t_{18,0.025}\approx2.101$ なら棄却。

## 一手
結合分散を先に計算してから標準誤差へ代入する。

## 答え
$$S_p^2=\frac{9\cdot4+9\cdot6}{18}=5,$$
$$T=\frac{2}{\sqrt5\sqrt{1/10+1/10}}=\frac2{1}=2,$$
自由度18。

## 計算例
$2<2.101$ なので5%では棄却しない。

<!-- CARD -->

---
id: test-welch-two-sample-formula
title: Welchの2標本t検定を自由度計算まで完遂する
category: math-testing
subcategory: math-normal-tests
topic: welch-two-sample-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - Welch検定
  - 2標本t検定
  - 不等分散
frequency:
  past_exam: 0
  textbook: 0
  independent_problems: 0
  source_confirmations: 0
sources:
  - type: official_syllabus
    topic: 複数の平均に関する検定
---

## 問題
独立2標本の平均差を、等分散を仮定せずに検定するWelch検定の統計量とWelch–Satterthwaite自由度を書け。さらに $n_X=10,n_Y=20,\bar x=15,\bar y=12,s_X^2=25,s_Y^2=20$ の統計量と近似自由度を求めよ。

## 使用公式・定理
$$
T_W=\frac{\bar X-\bar Y}{\sqrt{S_X^2/n_X+S_Y^2/n_Y}},
$$
$$
\nu=\frac{(S_X^2/n_X+S_Y^2/n_Y)^2}
{(S_X^2/n_X)^2/(n_X-1)+(S_Y^2/n_Y)^2/(n_Y-1)}.
$$
帰無分布を $t_\nu$ で近似する。$\nu$ は整数でなくてよい。

## 一手
各群の「分散÷標本数」を別々に標準誤差へ入れ、その同じ2項をSatterthwaite式にも使う。

## 答え
$$
\operatorname{SE}=\sqrt{25/10+20/20}=\sqrt{3.5},
$$
$$
T_W=\frac3{\sqrt{3.5}}\approx1.604.
$$
また
$$
\nu=\frac{3.5^2}{2.5^2/9+1^2/19}
\approx16.40.
$$

## 計算例
両側5%臨界値を約2.11とすれば $|1.604|<2.11$ なので棄却しない。分散の大きい小標本群があると、自由度は大きく下がりやすい。

## 注意
等分散を事前F検定で判定してから検定法を切り替えるより、等分散の根拠がなければWelchを用いる方が手順として素直である。対応標本には使わない。

<!-- CARD -->

---
id: test-welch-two-sample-numeric
title: Welch検定の統計量と近似自由度を計算する
category: math-testing
subcategory: math-normal-tests
topic: welch-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [Welch検定, 不等分散, 自由度]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 複数の平均に関する検定 }]
---

## 問題
$n_X=10,n_Y=20,\overline x=15,\overline y=12,s_X^2=25,s_Y^2=20$ のWelch統計量と自由度を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Welch–Satterthwaite近似を用いる。

## 答え
標準誤差は $\sqrt{25/10+20/20}=\sqrt{3.5}$。よって
$$T_W=\frac3{\sqrt{3.5}}\approx1.604.$$
自由度は
$$\nu=\frac{3.5^2}{2.5^2/9+1^2/19}
=\frac{12.25}{0.7471}\approx16.40.$$

## 計算例
両側5%点は約2.11なので棄却しない。

## 注意
分散の大きい小標本群が自由度を大きく減らす。

<!-- CARD -->

---
id: test-pooled-versus-welch
title: 等分散t検定とWelch検定を選択する
category: math-testing
subcategory: math-normal-tests
topic: pooled-welch-choice
type: recognition
difficulty: 2
priority: A
hashtags: [2標本t検定, Welch検定, 等分散]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 複数の平均に関する検定 }]
---

## 問題
独立2標本の平均差検定で、等分散の根拠がない場合にどちらを標準選択とするか。事前のF検定で選ぶ方法の問題点も答えよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Welch検定は群サイズ・分散が異なる場合にも平均差の標準誤差を群別に評価する。

## 答え
等分散の根拠がなければWelch検定を選ぶ。事前F検定の結果で手法を切り替えると、全体の第一種過誤率と手順の性質が複雑になる。

## 計算例
$n_X=10,n_Y=40,s_X^2=100,s_Y^2=4$ のような不均衡では、結合分散は小標本側の大分散を不適切に平均化しうる。

## 注意
分散比検定は分散そのものが研究対象の場合に使う。

<!-- CARD -->

---
id: test-normal-variance-chisquare
title: 正規母分散のカイ二乗検定を片側・両側とも解く
category: math-testing
subcategory: math-normal-tests
topic: variance-chisquare-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 正規分布
  - カイ二乗検定
  - 母分散
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
  - type: past_exam
    id: MATH-2018-Q1
    topic: カイ二乗分布・母標準偏差
---

## 問題
正規分布 $N(\mu,\sigma^2)$ からの独立同分布標本について、$H_0:\sigma^2=\sigma_0^2$ の検定統計量を示し、対立仮説が $\sigma^2>\sigma_0^2$、$\sigma^2<\sigma_0^2$、$\sigma^2\ne\sigma_0^2$ の場合の棄却方向を書け。

さらに $n=16,s^2=9,\sigma_0^2=4$ を両側5%で検定せよ。自由度15の中央95%区間の端点を $6.262,27.488$ とする。

## 使用公式・定理
帰無仮説の下で
$$
Q=\frac{(n-1)S^2}{\sigma_0^2}\sim\chi^2_{n-1}.
$$
$\chi^2_{\nu,\gamma}$ を上側確率 $\gamma$ の点とすると、有意水準 $\alpha$ で
$$
\begin{array}{c|c}
H_1 & \text{棄却域}\\ \hline
\sigma^2>\sigma_0^2 & Q>\chi^2_{n-1,\alpha}\\
\sigma^2<\sigma_0^2 & Q<\chi^2_{n-1,1-\alpha}\\
\sigma^2\ne\sigma_0^2 & Q<\chi^2_{n-1,1-\alpha/2}\ \text{または}\ Q>\chi^2_{n-1,\alpha/2}
\end{array}
$$

## 一手
$Q$ は $S^2$ と同じ向きに増減するので、「母分散が大きい」対立は上側、「小さい」対立は下側を見る。

## 答え
$$
Q=\frac{15\cdot9}{4}=33.75.
$$
$33.75>27.488$ なので両側5%で $H_0$ を棄却する。

## 計算例
片側検定で上側5%点が30、下側5%点が10なら、$H_1:\sigma^2>\sigma_0^2$ では $Q>30$、$H_1:\sigma^2<\sigma_0^2$ では $Q<10$ が棄却域となる。

## 注意
上側点記法では下側5%点は添字 $0.95$ になる。母平均未知でも標本平均まわりの不偏標本分散を使えば自由度は $n-1$ である。有限標本でこのカイ二乗分布が正確なのは正規標本であるため。

<!-- CARD -->

---
id: test-normal-variance-chisquare-numeric
title: 正規母分散の両側カイ二乗検定を計算する
category: math-testing
subcategory: math-normal-tests
topic: variance-chisquare-numeric
type: calc_step
difficulty: 3
priority: S
hashtags: [正規分布, カイ二乗検定, 両側検定]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 平均値と分散に関する検定 }, { type: past_exam, id: MATH-2018-Q1, topic: カイ二乗分布・母標準偏差 }]
---

## 問題
正規標本で $n=16,s^2=9$。$H_0:\sigma^2=4$ を両側5%で検定せよ。下側2.5%点を6.262、上側2.5%点を27.488とする。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度15のカイ二乗分布で中央95%区間 $[6.262,27.488]$ の外側を棄却する。

## 答え
$$Q=\frac{15\cdot9}{4}=33.75.$$
$33.75>27.488$ なので帰無仮説を棄却する。

## 計算例
観測分散が帰無値より大きく、上側で棄却された。

## 注意
正本の $\chi^2_{\nu,\gamma}$ は上側 $\gamma$ 点だが、問題文が下側点と明記した数値はそのまま使う。

<!-- CARD -->

---
id: test-normal-variance-one-sided
title: 正規母分散の片側検定で裾を選ぶ
category: math-testing
subcategory: math-normal-tests
topic: variance-one-sided
type: recognition
difficulty: 2
priority: S
hashtags: [母分散, カイ二乗検定, 片側検定]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 平均値と分散に関する検定 }, { type: past_exam, id: MATH-2018-Q1, topic: カイ二乗分布・母標準偏差 }]
---

## 問題
$Q=(n-1)S^2/\sigma_0^2$ とする。$H_1:\sigma^2>\sigma_0^2$ と $H_1:\sigma^2<\sigma_0^2$ の棄却域をそれぞれ書け。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$S^2$ が大きいほど $Q$ は大きくなるため、対立仮説の向きと裾が一致する。

## 答え
大分散対立では $Q>\chi^2_{n-1,\alpha}$。小分散対立では
$$Q<\chi^2_{n-1,1-\alpha}.$$

## 計算例
上側5%点が30、下側5%点が10なら、大分散対立は $Q>30$、小分散対立は $Q<10$。

## 注意
上側点記法では下側5%点の添字が $1-0.05=0.95$ になる。

<!-- CARD -->

---
id: test-normal-variance-ratio-f
title: 2正規母分散比のF検定を逆数関係まで使って解く
category: math-testing
subcategory: math-normal-tests
topic: variance-ratio-f-canonical
type: strategy
difficulty: 3
priority: S
hashtags:
  - 正規分布
  - F検定
  - 分散比
frequency:
  past_exam: 1
  textbook: 0
  independent_problems: 0
  source_confirmations: 1
sources:
  - type: official_syllabus
    topic: 平均値と分散に関する検定
  - type: past_exam
    id: MATH-2014-Q4
    topic: F分布・二標本比較
---

## 問題
独立な2つの正規分布からの標本について $H_0:\sigma_X^2=\sigma_Y^2$ を検定するF統計量と帰無分布を書け。またF分布の逆数関係から下側臨界値を上側点で表せ。

さらに $n_X=11,n_Y=16,s_X^2=12,s_Y^2=3$ で、$H_1:\sigma_X^2>\sigma_Y^2$ を検定する統計量を求めよ。上側5%点 $F_{10,15,0.05}=2.54$ とする。

## 使用公式・定理
帰無仮説の下で
$$
F=\frac{S_X^2}{S_Y^2}\sim F_{n_X-1,n_Y-1}.
$$
また
$$
F\sim F_{\nu_1,\nu_2}
\quad\Longrightarrow\quad
\frac1F\sim F_{\nu_2,\nu_1}.
$$
$F_{\nu_1,\nu_2,\alpha}$ を上側 $\alpha$ 点とすれば、元のF分布の下側 $\alpha$ 点は
$$
\frac1{F_{\nu_2,\nu_1,\alpha}}.
$$

## 一手
「$\sigma_X^2$ の方が大きい」という片側対立なら $S_X^2/S_Y^2$ と置いて右上側を見る。分子・分母を交換したら自由度の順序も交換する。

## 答え
$$
F=\frac{12}{3}=4,
\qquad (\nu_1,\nu_2)=(10,15).
$$
$4>2.54$ なので5%で $H_0$ を棄却する。

## 計算例
両側有意水準 $\alpha$ では、上側臨界値は
$$
F_{\nu_1,\nu_2,\alpha/2},
$$
下側臨界値は
$$
\frac1{F_{\nu_2,\nu_1,\alpha/2}}
$$
となる。

## 注意
F検定は正規性への依存が強い。平均差の検定法を選ぶためだけの事前F検定として機械的に使うのではなく、分散そのものが検定対象のときに使う。

<!-- CARD -->

---
id: test-normal-variance-ratio-numeric
title: 2正規母分散比の片側F検定を計算する
category: math-testing
subcategory: math-normal-tests
topic: variance-ratio-numeric
type: calc_step
difficulty: 3
priority: S
hashtags: [F検定, 等分散, 片側検定]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 平均値と分散に関する検定 }, { type: past_exam, id: MATH-2014-Q4, topic: F分布・二標本比較 }]
---

## 問題
独立な正規2標本で $n_X=11,n_Y=16,s_X^2=12,s_Y^2=3$。$H_0:\sigma_X^2=\sigma_Y^2$ 対 $H_1:\sigma_X^2>\sigma_Y^2$ を検定する統計量を求めよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

右片側棄却域は $F>F_{10,15,\alpha}$。ここで添字 $\alpha$ は上側確率。

## 一手
大きいと予想する分散を分子に置くと右片側で処理できる。

## 答え
$$F=\frac{12}{3}=4,\qquad (\nu_1,\nu_2)=(10,15).$$

## 計算例
上側5%点を2.54とすれば $4>2.54$ なので棄却する。

<!-- CARD -->

---
id: test-f-reciprocal-quantile
title: F分布の逆数関係で下側臨界値を求める
category: math-testing
subcategory: math-normal-tests
topic: f-reciprocal
type: formula
difficulty: 3
priority: S
hashtags: [F分布, F検定, 分位点]
frequency: { past_exam: 1, textbook: 0, independent_problems: 0, source_confirmations: 1 }
sources: [{ type: official_syllabus, topic: 平均値と分散に関する検定 }, { type: past_exam, id: MATH-2014-Q4, topic: F分布・二標本比較 }]
---

## 問題
$F\sim F_{\nu_1,\nu_2}$ の下側 $\alpha$ 点を、上側点記法 $F_{\nu_2,\nu_1,\alpha}$ で表せ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

F分布の逆数では分子・分母自由度が入れ替わる。

## 答え
$1/F\sim F_{\nu_2,\nu_1}$ なので、下側 $\alpha$ 点は
$$\frac1{F_{\nu_2,\nu_1,\alpha}}.$$

## 計算例
両側検定の下側臨界値は $1/F_{\nu_2,\nu_1,\alpha/2}$、上側臨界値は $F_{\nu_1,\nu_2,\alpha/2}$。

## 注意
単純に上側点の逆数を取り、自由度を入れ替え忘れない。

<!-- CARD -->

---
id: test-normality-test-selection
title: 正規母集団検定の選択表を再生する
category: math-testing
subcategory: math-normal-tests
topic: normal-test-selection
type: recognition
difficulty: 2
priority: A
hashtags: [正規分布, 検定選択, t検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 平均値と分散に関する検定 }]
---

## 問題
正規母集団について、1平均・2平均・1分散・2分散の代表的検定を対応させよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検定対象、標本の対応、分散既知性・等分散性から統計量を選ぶ。

## 答え
1平均は分散既知ならZ、未知なら1標本t。対応あり2平均は差のt。独立2平均は等分散なら結合t、一般にはWelch。1分散はカイ二乗、2分散比はF。

## 計算例
同一被験者の前後平均差で母分散未知なら、独立2標本Welchではなく対応のあるt検定。

## 注意
検定名の暗記より、帰無仮説下のピボット量を特定する。

<!-- CARD -->

---
id: test-binomial-exact-one-sample
title: 1標本比率の正確二項検定を計算する
category: math-testing
subcategory: math-various-tests
topic: exact-binomial-test
type: calc_step
difficulty: 2
priority: A
hashtags: [二項分布, 正確検定, 母比率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
$X\sim\operatorname{Binomial}(10,p)$ で成功数9。$H_0:p=0.5$ 対 $H_1:p>0.5$ の正確P値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無仮説下の二項分布で観測値以上の上側確率を足す。

## 答え
$$p\text{値}=P_{0.5}(X\ge9)
=\frac{\binom{10}{9}+\binom{10}{10}}{2^{10}}
=\frac{11}{1024}\approx0.01074.$$

## 計算例
5%では棄却し、1%では棄却しない。

## 注意
両側正確P値には複数の定義があり、採用した定義を明記する。

<!-- CARD -->

---
id: test-one-proportion-score
title: 1標本比率のScore型Z検定を構成する
category: math-testing
subcategory: math-various-tests
topic: one-proportion-z
type: formula
difficulty: 2
priority: A
hashtags: [母比率, 二項分布, スコア型検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
$X\sim\operatorname{Binomial}(n,p)$ の $H_0:p=p_0$ に対する大標本Z統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Score型では分母を帰無値 $p_0$ で評価する。

## 答え
$$Z=\frac{\widehat p-p_0}{\sqrt{p_0(1-p_0)/n}},\qquad \widehat p=X/n.$$
帰無仮説下で近似的に $N(0,1)$。

## 計算例
$n=100,x=60,p_0=0.5$ なら $Z=0.1/0.05=2$。

## 注意
$np_0,n(1-p_0)$ が小さい場合は正確二項検定を検討する。

<!-- CARD -->

---
id: test-one-proportion-continuity
title: 1標本比率検定に連続修正を適用する
category: math-testing
subcategory: math-various-tests
topic: proportion-continuity-correction
type: calc_step
difficulty: 3
priority: A
hashtags: [母比率, 連続修正, 二項分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
$X\sim\operatorname{Binomial}(100,0.5)$ で $P(X\ge60)$ を正規近似する標準化値を、連続修正ありで求めよ。

## 記号・用語
- $\Phi$：標準正規分布の累積分布関数

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

整数の上側事象 $X\ge x$ は境界を $x-0.5$ とする。

## 答え
$X\ge60$ を連続変数では $X>59.5$ と近似する。平均50、標準偏差5なので
$$z=\frac{59.5-50}{5}=1.9.$$

## 計算例
上側確率は $1-\Phi(1.9)\approx0.0287$。

## 注意
修正なしの $z=2$ より保守的な近似になる。

<!-- CARD -->

---
id: test-two-proportion-pooled
title: 2母比率差の帰無標準誤差を導く
category: math-testing
subcategory: math-various-tests
topic: two-proportion-z
type: formula
difficulty: 3
priority: A
hashtags: [母比率差, 二項分布, 2標本検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
独立な $X_j\sim\operatorname{Binomial}(n_j,p_j)$ に対し $H_0:p_1=p_2$ を検定するZ統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

検定では帰無仮説下に共通比率をプールする。

## 答え
各群の標本比率を $\widehat p_j=X_j/n_j$ とする。共通比率の制約付き推定量
$$\widehat p=\frac{X_1+X_2}{n_1+n_2}$$
を使い、
$$Z=\frac{\widehat p_1-\widehat p_2}
{\sqrt{\widehat p(1-\widehat p)(1/n_1+1/n_2)}}.$$

## 計算例
$n_1=n_2=100,x_1=60,x_2=40$ なら $\widehat p=0.5$。

## 注意
帰無仮説下の各群の期待成功数 $n_j\widehat p$ と期待失敗数 $n_j(1-\widehat p)$ が十分大きい大標本近似である。信頼区間の標準誤差では通常、群別比率を用いてプールしない。

<!-- CARD -->

---
id: test-two-proportion-numeric
title: 2母比率差のZ検定を数値で完遂する
category: math-testing
subcategory: math-various-tests
topic: two-proportion-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [母比率差, Z検定, P値]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
独立2群で $(x_1,n_1)=(60,100)$、$(x_2,n_2)=(40,100)$。$H_0:p_1=p_2$ を両側5%で検定せよ。

## 記号・用語
- 棄却域：帰無仮説を棄却する統計量・標本結果の集合

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

両側棄却域は $|Z|>z_{0.025}=1.96$。

## 一手
分子は標本比率差、分母だけ帰無仮説下でプールする。

## 答え
$\widehat p=100/200=0.5$。標準誤差は
$$\sqrt{0.5(0.5)(1/100+1/100)}=\sqrt{0.005}\approx0.07071.$$
$$Z=\frac{0.6-0.4}{0.07071}\approx2.828.$$

## 計算例
$2.828>1.96$ なので棄却し、P値は約0.0047。

<!-- CARD -->

---
id: test-poisson-one-rate-exact
title: 1標本ポアソン率を正確な裾確率で検定する
category: math-testing
subcategory: math-various-tests
topic: poisson-rate-exact
type: calc_step
difficulty: 3
priority: A
hashtags: [ポアソン分布, 正確検定, 率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
観測時間 $t=2$ で事象数 $X=8$、$X\sim\operatorname{Poisson}(t\lambda)$ とする。$H_0:\lambda=2$ 対 $H_1:\lambda>2$ の正確P値を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

上側対立では帰無ポアソン分布の上側裾確率を使う。

## 答え
$H_0$ 下で $X\sim\operatorname{Poisson}(4)$ なので
$$p=P_4(X\ge8)=\sum_{x=8}^{\infty}e^{-4}\frac{4^x}{x!}.$$

## 計算例
補集合を使えば $p=1-\sum_{x=0}^{7}e^{-4}4^x/x!\approx0.0511$ で、5%では棄却しない。

## 注意
率 $\lambda$ と観測期間当たり平均 $t\lambda$ を区別する。

<!-- CARD -->

---
id: test-poisson-rate-score
title: ポアソン率のScore型検定を構成する
category: math-testing
subcategory: math-various-tests
topic: poisson-rate-score
type: formula
difficulty: 3
priority: A
hashtags: [ポアソン分布, スコア型検定, 率]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
$X\sim\operatorname{Poisson}(t\lambda)$ の $H_0:\lambda=\lambda_0$ に対する大標本Z統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

ポアソン分布の平均と分散はともに $t\lambda_0$。

## 答え
$E_0[X]=t\lambda_0$、$\operatorname{Var}_0(X)=t\lambda_0$ より
$$Z=\frac{X-t\lambda_0}{\sqrt{t\lambda_0}}.$$

## 計算例
$t=100,\lambda_0=2,X=230$ なら $Z=30/\sqrt{200}\approx2.121$。

## 注意
小さい期待度数では正規近似より正確検定を優先する。

<!-- CARD -->

---
id: test-two-poisson-unequal-exposure
title: 観測時間が異なる2ポアソン率を条件付き検定する
category: math-testing
subcategory: math-various-tests
topic: two-poisson-rates
type: calc_step
difficulty: 4
priority: A
hashtags: [ポアソン分布, 条件付き検定, 2標本検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 二項分布・ポアソン分布など基本的な分布に関する検定 }]
---

## 問題
$X\sim\operatorname{Poisson}(t_1\lambda_1)$、$Y\sim\operatorname{Poisson}(t_2\lambda_2)$ は独立。$H_0:\lambda_1=\lambda_2$ の下で $X\mid X+Y=k$ の分布を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立ポアソン変数の和で条件付けると二項分布になる。

## 答え
$$X\mid X+Y=k\sim\operatorname{Binomial}\left(k,\frac{t_1}{t_1+t_2}\right).$$
共通率が条件付けにより消える。

## 計算例
$t_1=1,t_2=3,k=12$ なら帰無分布は $\operatorname{Binomial}(12,1/4)$。

## 注意
標本数ではなく観測時間・曝露量 $t_j$ を成功確率へ入れる。

<!-- CARD -->

---
id: test-goodness-fit-statistic
title: Pearson適合度検定統計量を構成する
category: math-testing
subcategory: math-various-tests
topic: goodness-of-fit
type: formula
difficulty: 2
priority: A
hashtags: [適合度の検定, Pearson統計量, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---

## 問題
$k$ 区分の観測度数 $O_j$ と帰無仮説下の期待度数 $E_j=np_j$ からPearson統計量を書け。

## 記号・用語
- $\xrightarrow{d}$：分布収束

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

度数和が $n$ に固定されるため自由度を1つ失う。

## 答え
$$X^2=\sum_{j=1}^k\frac{(O_j-E_j)^2}{E_j}.$$
母数を推定しない単純帰無仮説では、条件の下で $X^2\xrightarrow{d}\chi^2_{k-1}$。

## 計算例
$k=4$ で確率がすべて既知なら自由度3。

## 注意
統計量が大きいとき適合が悪いとして棄却する。

<!-- CARD -->

---
id: test-goodness-fit-numeric
title: Pearson適合度検定を数値で完遂する
category: math-testing
subcategory: math-various-tests
topic: goodness-fit-numeric
type: calc_step
difficulty: 2
priority: A
hashtags: [適合度の検定, Pearson統計量, 期待度数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---

## 問題
4区分の帰無確率が各 $1/4$、$n=100$、観測度数が $(35,25,20,20)$。Pearson統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度は $4-1=3$。

## 一手
期待度数を全区分で先に計算し、和が標本数になるか確認する。

## 答え
期待度数は各25。
$$X^2=\frac{(35-25)^2}{25}+0+\frac{(20-25)^2}{25}+\frac{(20-25)^2}{25}=4+1+1=6.$$

## 計算例
$\chi^2_3$ の上側5%点7.815より小さいため棄却しない。

<!-- CARD -->

---
id: test-goodness-fit-estimated-parameters
title: ポアソン適合度検定の期待度数と自由度を作る
category: math-testing
subcategory: math-various-tests
topic: goodness-fit-df
type: calc_step
difficulty: 3
priority: A
hashtags: [適合度の検定, 自由度, 母数推定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---

## 問題
$n=50$ 個の度数データの総和が40である。ポアソン分布への適合度検定で、区分を $0,1,2,3+$ の4個とする。$X=0$ の期待度数と自由度を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

$r$ 個の独立な母数を効率的に推定すると、各推定制約につき自由度を1つ失う。

## 答え
まず同じデータから
$$\widehat\lambda=\frac{40}{50}=0.8$$
と推定する。ポアソン分布の確率質量関数 $P(X=x)=e^{-\lambda}\lambda^x/x!$ より、
$$E_0=50P_{\widehat\lambda}(X=0)=50e^{-0.8}\approx22.47.$$
区分数 $k=4$、推定母数数 $r=1$ なので
$$\nu=k-1-r=4-1-1=2.$$

## 計算例
母数が事前に完全指定なら自由度は $4-1=3$ だが、$\lambda$ を推定したため2。

## 注意
外部データから母数が既知として与えられた場合は推定母数として引かない。

<!-- CARD -->

---
id: test-goodness-fit-expected-counts
title: 適合度検定の小さい期待度数を処理する
category: math-testing
subcategory: math-various-tests
topic: goodness-fit-conditions
type: condition
difficulty: 2
priority: A
hashtags: [適合度の検定, 期待度数, 適用条件]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---

## 問題
期待度数が $(40,35,20,3,2)$ のとき、カイ二乗近似のために何を検討するか。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

Pearson統計量のカイ二乗近似は各期待度数が十分増大する漸近結果。

## 答え
期待度数が小さい末尾区分を、意味を壊さない隣接区分と統合して期待度数を確保する。

## 計算例
最後の2区分を統合すれば期待度数5となり、区分数は5から4へ減るので自由度も1減る。

## 注意
観測度数ではなく期待度数を確認する。

<!-- CARD -->

---
id: test-independence-chisquare
title: 分割表の独立性検定統計量を構成する
category: math-testing
subcategory: math-various-tests
topic: independence-chisquare
type: formula
difficulty: 2
priority: S
hashtags: [独立性のカイ二乗検定, 分割表, 期待度数]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 独立性のカイ二乗検定 }]
---

## 問題
$r\times c$ 分割表で独立性を検定する期待度数とPearson統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立ならセル確率は行周辺確率と列周辺確率の積。

## 答え
$$E_{ij}=\frac{n_{i\cdot}n_{\cdot j}}n,\qquad
X^2=\sum_{i=1}^r\sum_{j=1}^c\frac{(O_{ij}-E_{ij})^2}{E_{ij}}.$$
帰無仮説下で近似的に $\chi^2_{(r-1)(c-1)}$。

## 計算例
$2\times3$ 表なら自由度 $(2-1)(3-1)=2$。

## 注意
標本が独立で、期待度数が十分大きいことを確認する。

<!-- CARD -->

---
id: test-independence-2x2-numeric
title: 2×2表の独立性カイ二乗検定を計算する
category: math-testing
subcategory: math-various-tests
topic: independence-2x2
type: calc_step
difficulty: 3
priority: S
hashtags: [独立性のカイ二乗検定, 2×2表, Pearson統計量]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 独立性のカイ二乗検定 }]
---

## 問題
観測表が $\begin{pmatrix}30&20\\10&40\end{pmatrix}$ のとき独立性検定のPearson統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

自由度は $(2-1)(2-1)=1$。

## 一手
周辺度数から期待表を作り、全セルの寄与を足す。

## 答え
行合計は50,50、列合計は40,60、総数100なので期待表は $\begin{pmatrix}20&30\\20&30\end{pmatrix}$。
$$X^2=\frac{100}{20}+\frac{100}{30}+\frac{100}{20}+\frac{100}{30}=\frac{50}{3}\approx16.67.$$

## 計算例
上側5%点3.841を超えるため独立性を棄却する。

<!-- CARD -->

---
id: test-yates-correction
title: 2×2表でYatesの連続修正を計算する
category: math-testing
subcategory: math-various-tests
topic: yates-correction
type: formula
difficulty: 3
priority: A
hashtags: [独立性のカイ二乗検定, 連続修正, 2×2表]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 適合度の検定 }]
---

## 問題
2×2表のPearson統計量に対するYates修正のセル寄与を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

離散度数を連続なカイ二乗分布で近似するずれを0.5だけ補正する。

## 答え
$$X_Y^2=\sum_{i,j}\frac{\{\max(0,|O_{ij}-E_{ij}|-0.5)\}^2}{E_{ij}}.$$

## 計算例
$O=12,E=10$ のセル寄与は未修正 $4/10=0.4$、修正後 $(2-0.5)^2/10=0.225$。

## 注意
修正により統計量は小さくなり、一般に保守的になる。

<!-- CARD -->

---
id: test-fisher-exact-2x2
title: フィッシャー検定を超幾何分布へ帰着する
category: math-testing
subcategory: math-various-tests
topic: fisher-exact
type: formula
difficulty: 4
priority: A
hashtags: [フィッシャー検定, 2×2表, 超幾何分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
2×2表 $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ で周辺度数を固定したとき、$A=a$ の帰無確率を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立性の帰無仮説下で、固定周辺度数に条件付けると左上セルは超幾何分布。

## 答え
行1合計 $n_1=a+b$、列1合計 $m_1=a+c$、総数 $n$ とすると
$$P(A=a)=\frac{\binom{m_1}{a}\binom{n-m_1}{n_1-a}}{\binom n{n_1}}.$$

## 計算例
$n=10,n_1=4,m_1=5,a=3$ なら確率は $\binom53\binom51/\binom{10}4=50/210\approx0.2381$。

## 注意
両側P値は「観測表以下の確率をもつ表を足す」など定義を明記する。

<!-- CARD -->

---
id: test-sign-test-numeric
title: 符号検定の両側P値を数値で計算する
category: math-testing
subcategory: math-various-tests
topic: sign-test-numeric
type: calc_step
difficulty: 2
priority: A
hashtags: [符号検定, 二項分布, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
中央値 $m_0$ との差について、同値を除いた有効標本数10、正符号9を得た。両側符号検定のP値を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

連続分布で帰無中央値が $m_0$ なら正負の確率は各1/2。

## 答え
$S\sim\operatorname{Binomial}(10,1/2)$ より
$$p=2P(S\ge9)=2\frac{10+1}{2^{10}}=\frac{22}{1024}\approx0.02148.$$

## 計算例
5%では棄却する。

## 注意
$X_i=m_0$ の同値は除き、有効標本数を減らす。

<!-- CARD -->

---
id: test-wilcoxon-signed-rank
title: ウィルコクソン符号付き順位和検定の統計量を作る
category: math-testing
subcategory: math-various-tests
topic: wilcoxon-signed-rank
type: strategy
difficulty: 3
priority: A
hashtags: [ウィルコクソン符号付き順位和検定, 対応あり, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
対応差 $D_i$ からウィルコクソン符号付き順位和統計量 $W_+$ を作る手順を述べよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

独立同分布な差が0を中心に連続かつ対称という帰無仮説下で符号配置を用いる。

## 答え
0差を除き、$|D_i|$ を小さい順に順位付けし、$D_i>0$ の順位和を
$$W_+=\sum_{D_i>0}R_i$$
とする。

## 計算例
差が $(-3,1,2)$ なら絶対値順位は $(3,1,2)$、正順位和は $1+2=3$。

## 注意
符号検定より大きさの順位情報を使う分、対称性の仮定が追加される。

<!-- CARD -->

---
id: test-mann-whitney-u
title: マン・ホイットニーU統計量を対比較で計算する
category: math-testing
subcategory: math-various-tests
topic: mann-whitney
type: calc_step
difficulty: 3
priority: A
hashtags: [マン・ホイットニーU検定, 独立2標本, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
独立2標本 $X=(1,4)$、$Y=(2,3,5)$ について $U_X=\sum_{i,j}\boldsymbol1_{\{X_i>Y_j\}}$ を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

連続な同一分布の帰無仮説下では、全 $n_Xn_Y$ 対の大小関係が順位和統計量に対応する。

## 答え
$X=1$ は0勝、$X=4$ は $2,3$ に勝つので2勝。したがって $U_X=2$。

## 計算例
反対向きの勝数は $U_Y=n_Xn_Y-U_X=6-2=4$。

## 注意
位置差として解釈するには分布形状が同じなどの追加条件が必要。

<!-- CARD -->

---
id: test-ks-one-sample
title: 1標本Kolmogorov–Smirnov統計量を計算する
category: math-testing
subcategory: math-various-tests
topic: kolmogorov-smirnov
type: formula
difficulty: 3
priority: A
hashtags: [Kolmogorov-Smirnov検定, 経験分布関数, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
連続な完全指定分布関数 $F_0$ に対する1標本Kolmogorov–Smirnov統計量を書け。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

帰無仮説下で $D_n$ が大きいとき棄却する。

## 答え
$$D_n=\sup_x|F_n(x)-F_0(x)|,$$
ここで $F_n(x)=n^{-1}\sum_i\boldsymbol1_{\{X_i\le x\}}$ は経験分布関数。

## 計算例
ある点で $F_n=0.7,F_0=0.5$ なら、その点の差は0.2で $D_n\ge0.2$。

## 注意
データから母数を推定した $F_0$ では通常の臨界値をそのまま使えない。

<!-- CARD -->

---
id: test-permutation-two-sample
title: 2標本置換検定の帰無分布を作る
category: math-testing
subcategory: math-various-tests
topic: permutation-test
type: strategy
difficulty: 3
priority: A
hashtags: [置換検定, 独立2標本, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
独立2群の平均差について置換検定を行う手順と正確性の条件を述べよ。

## 記号・用語
- 置換検定：帰無仮説下で交換可能なラベルを入れ替え、統計量の帰無分布を作る検定

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

P値は置換統計量が観測値以上に極端となる割当の割合。

## 答え
全観測をプールし、群サイズを固定して群ラベルを全て並べ替え、各割当で平均差を再計算する。帰無仮説下でラベルが交換可能なら置換分布は正確。

## 計算例
全割当が20通りで極端な割当が2通りなら片側P値は $2/20=0.1$。

## 注意
単に平均が等しいだけでは交換可能性が成り立たない場合がある。

<!-- CARD -->

---
id: test-mcnemar-asymptotic
title: McNemar検定の漸近統計量を計算する
category: math-testing
subcategory: math-various-tests
topic: mcnemar-asymptotic
type: calc_step
difficulty: 3
priority: A
hashtags: [McNemar検定, 対応のあるデータ, カイ二乗分布]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
対応のある2値データで不一致度数が $b=20,c=5$。McNemar統計量を求めよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

一致セルではなく2種類の不一致セルの確率が等しいかを検定する。

## 答え
$$X^2=\frac{(b-c)^2}{b+c}=\frac{15^2}{25}=9.$$
帰無仮説下で大標本では近似的に $\chi^2_1$。

## 計算例
$9>3.841$ なので5%で棄却する。

## 注意
$b+c$ が小さいときは条件付き正確二項検定を使う。

<!-- CARD -->

---
id: test-holm-stepdown
title: Holm法で多重検定を段階的に判定する
category: math-testing
subcategory: math-various-tests
topic: holm-procedure
type: calc_step
difficulty: 3
priority: A
hashtags: [多重検定, Holm法, 第一種の過誤]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: 多重検定と第一種過誤 }]
---

## 問題
$m=3,\alpha=0.05$、昇順P値が $(0.01,0.03,0.04)$。Holm法で判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

第 $i$ 順序P値を $\alpha/(m-i+1)$ と比較し、初めて不採択となった所で停止する。

## 答え
最小P値を $0.05/3\approx0.0167$ と比較し、$0.01$ は棄却。次を $0.05/2=0.025$ と比較すると $0.03>0.025$ なので停止し、残りは棄却しない。

## 計算例
結論は最小P値に対応する仮説だけ棄却。

## 注意
各P値を一律 $\alpha/m$ と比べるBonferroni法より一般に強力。

<!-- CARD -->

---
id: test-nonparametric-choice
title: 代表的ノンパラメトリック検定を設計から選ぶ
category: math-testing
subcategory: math-various-tests
topic: nonparametric-choice
type: recognition
difficulty: 2
priority: A
hashtags: [ノンパラメトリック検定, 検定選択, 順位検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
(a) 1標本中央値、(b) 対応差で対称性を仮定、(c) 独立2標本、(d) 完全指定連続分布への適合に対応する検定を選べ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

標本の対応構造、帰無仮説、対称性・交換可能性の条件から選ぶ。

## 答え
(a) 符号検定、(b) ウィルコクソン符号付き順位和検定、(c) マン・ホイットニーU検定、(d) 1標本コルモゴロフ–スミルノフ検定。

## 計算例
同一患者の前後差なら独立2標本のマン・ホイットニーU検定ではなく、符号検定またはウィルコクソン符号付き順位和検定を使う。

## 注意
「ノンパラメトリック」は無仮定という意味ではない。

<!-- CARD -->

---
id: test-rank-ties
title: 順位検定で同順位を平均順位処理する
category: math-testing
subcategory: math-various-tests
topic: rank-ties
type: calc_step
difficulty: 2
priority: A
hashtags: [順位検定, 同順位, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
値 $(1,2,2,5)$ に順位を付けよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同順位には占める順位の平均を割り当て、順位和を保存する。

## 答え
$1$ は順位1、2つの $2$ は本来の順位2と3の平均 $2.5$、$5$ は順位4。したがって順位は $(1,2.5,2.5,4)$。

## 計算例
順位和は $1+2.5+2.5+4=10=4\cdot5/2$。

## 注意
大標本近似の分散には同順位補正が必要になる。

<!-- CARD -->

---
id: test-procedure-selection-summary
title: データ型と設計から検定法を選ぶ
category: math-testing
subcategory: math-various-tests
topic: test-selection-summary
type: recognition
difficulty: 2
priority: A
hashtags: [検定選択, 正確検定, ノンパラメトリック検定]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
(a) 1群の成功数、(b) 2×2独立表で期待度数が小さい、(c) 対応2値、(d) $r\times c$ 独立表で期待度数十分、に適する検定を選べ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

データ型、独立・対応、期待度数、帰無仮説の構造で選択する。

## 答え
(a) 正確二項検定、(b) フィッシャー検定、(c) McNemar検定、(d) 独立性のカイ二乗検定。

## 計算例
同じ対象の治療前後2値反応は、独立表のフィッシャー検定ではなくMcNemar検定。

## 注意
「2×2表」という形だけで検定を決めず、標本設計を確認する。

<!-- CARD -->

---
id: test-wilcoxon-signed-rank-numeric
title: ウィルコクソン符号付き順位和検定を正確P値まで完遂する
category: math-testing
subcategory: math-various-tests
topic: wilcoxon-signed-rank-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [ウィルコクソン符号付き順位和検定, 正確検定, 対応あり]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
独立同分布な対応差が $(-1,-2,-3,-4,-5,-6)$ である。0中心の連続対称分布を帰無仮説とし、ウィルコクソン符号付き順位和検定の両側正確P値を求め、5%で判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

0差と同順位がないとき、独立な各差の符号は帰無仮説下で確率 $1/2$ となり、正確分布は全符号配置の列挙で得られる。

## 答え
絶対値順位は $1,2,3,4,5,6$ で、正の差がないから
$$W_+=0.$$
帰無仮説下では各順位の符号配置 $2^6$ 通りが等確率である。$W_+=0$ は全符号が負の1通りで、対称な上側端 $W_+=21$ も1通りだから
$$p=2\times\frac1{2^6}=\frac1{32}=0.03125<0.05.$$
したがって帰無仮説を棄却する。

## 計算例
順位総和は $1+2+3+4+5+6=21$ なので、両側の対称な端は0と21。

## 注意
両側P値の定義はソフトウェア間で差があり得るため、ここでは対称な両端確率を合計した。

<!-- CARD -->

---
id: test-mann-whitney-u-numeric
title: マン・ホイットニーU検定を正確P値まで完遂する
category: math-testing
subcategory: math-various-tests
topic: mann-whitney-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [マン・ホイットニーU検定, 正確検定, 独立2標本]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
独立2標本 $X=(1,2,3,4)$、$Y=(5,6,7,8)$ について、連続な同一分布を帰無仮説とするマン・ホイットニーU検定の両側正確P値を求め、5%で判定せよ。

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

同順位のない帰無仮説下では群ラベルは交換可能で、固定された結合順位への $\binom{n_X+n_Y}{n_X}$ 個の割当てが等確率である。

## 答え
$X_i>Y_j$ となる対はないので $U_X=0$。帰無仮説下では、結合順位8個からX群の4順位を選ぶ $\binom84=70$ 通りが等確率である。$U_X=0$ と反対側の極端 $U_X=16$ は各1通りだから
$$p=2\times\frac1{\binom84}=\frac2{70}\approx0.0286<0.05.$$
したがって帰無仮説を棄却する。

## 計算例
$U_X$ の範囲は $0$ から $n_Xn_Y=16$ で、両端を同程度以上に極端として数えた。

## 注意
分布の位置差として結論するには、2群の分布形状が同じという追加条件が必要である。

<!-- CARD -->

---
id: test-ks-one-sample-numeric
title: 1標本Kolmogorov–Smirnov検定を数値で判定する
category: math-testing
subcategory: math-various-tests
topic: kolmogorov-smirnov-numeric
type: calc_step
difficulty: 3
priority: A
hashtags: [Kolmogorov-Smirnov検定, 経験分布関数, 棄却判断]
frequency: { past_exam: 0, textbook: 0, independent_problems: 0, source_confirmations: 0 }
sources: [{ type: official_syllabus, topic: ノンパラメトリック検定 }]
---

## 問題
$H_0:F(x)=x\ (0\le x\le1)$ に対し、順序標本が $(0.05,0.10,0.15,0.20)$ である。$n=4$ の両側5%正確臨界値を0.624として1標本Kolmogorov–Smirnov検定を行え。

## 記号・用語
- KS：Kolmogorov–Smirnov

## 使用公式・定理
**この欄の役割：解答で使う定義・公式・定理と、その適用条件**

連続で完全指定された $F_0$ について、$D_n=\max(D^+,D^-)$、$D^+=\max_i\{i/n-F_0(x_{(i)})\}$、$D^-=\max_i\{F_0(x_{(i)})-(i-1)/n\}$。

## 答え
$x_{(i)}$ に対し
$$D^+=\max_i\left\{\frac in-x_{(i)}\right\}
=\max(0.20,0.40,0.60,0.80)=0.80,$$
$$D^-=\max_i\left\{x_{(i)}-\frac{i-1}{n}\right\}
=\max(0.05,-0.15,-0.35,-0.55)=0.05.$$
よって $D_n=\max(D^+,D^-)=0.80>0.624$ なので帰無仮説を棄却する。

## 計算例
標本が区間の左端へ強く偏り、経験分布関数が一様分布関数より最大0.80だけ上にある。

## 注意
臨界値は問題で与えた値を使った。母数を標本から推定した帰無分布には通常のKS臨界値を流用しない。
