# Advanced 59 過分散工程・Poisson–Gamma混合

- 安定ID: `RIKOU-ADVANCED-59`
- 80大問 No.: 59
- 演習価値: B
- 難度: S
- 目安時間: 20〜25分
- 共通前提: [P2-02 期待値・分散・共分散・母関数](../../textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md) の条件付き期待値・タワープロパティ・全分散公式

## 問題

欠点数 $Y$ は条件付きで

$$
Y\mid\Lambda\sim\operatorname{Poisson}(\Lambda)
$$

に従い、工程間で

$$
E[\Lambda]=\mu,
\qquad
\operatorname{Var}(\Lambda)=\tau^2
$$

とする。

1. $E[Y]$ を求めよ。
2. 全分散の公式から $\operatorname{Var}(Y)$ を求めよ。
3. 標本平均 $\bar y$ と標本分散 $s_y^2$ から $\tau^2$ のモーメント推定量を作れ。
4. なぜ通常のPoisson管理図の管理限界が狭すぎるか説明せよ。
5. $\mu=4,\tau^2=5$ なら平均と分散を求め、3シグマ型上側管理限界を求めよ。
6. 過分散の原因を工程変動とモデル誤特定の両面から述べよ。

## 詳細解答

この問題では条件付き分布 $Y\mid\Lambda$ が簡単なので、まず条件付き平均・条件付き分散を求め、その後に条件 $\Lambda$ をタワープロパティと全分散公式で外す。公式の導出と一般形は上記 P2-02 を共通前提とする。

### 1. 周辺平均

$\Lambda$ を固定すると Poisson 分布なので

$$
E[Y\mid\Lambda]=\Lambda.
$$

タワープロパティを用いると

$$
\begin{aligned}
E[Y]
&=E\{E[Y\mid\Lambda]\}\\
&=E[\Lambda]\\
&=\boxed{\mu}.
\end{aligned}
$$

ランダムな率 $\Lambda$ を混合しても、周辺平均は率の平均に等しい。

### 2. 全分散

$E[\Lambda]=\mu<\infty$、$\operatorname{Var}(\Lambda)=\tau^2<\infty$ なので $E[\Lambda^2]<\infty$ であり、本問で必要な二次モーメントは有限である。全分散の公式は

$$
\operatorname{Var}(Y)
=E\{\operatorname{Var}(Y\mid\Lambda)\}
+\operatorname{Var}\{E[Y\mid\Lambda]\}.
$$

Poisson分布では条件付き平均と条件付き分散がともに $\Lambda$ だから

$$
\operatorname{Var}(Y\mid\Lambda)=\Lambda,
$$

$$
E[Y\mid\Lambda]=\Lambda.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(Y)
&=E[\Lambda]+\operatorname{Var}(\Lambda)\\
&=\boxed{\mu+\tau^2}.
\end{aligned}
$$

通常のPoisson分布なら

$$
\operatorname{Var}(Y)=E[Y]=\mu
$$

だが、ランダムな工程率の変動 $\tau^2$ が追加されるため

$$
\operatorname{Var}(Y)>E[Y]
$$

となる。これが過分散である。

### 3. $\tau^2$ のモーメント推定

母集団モーメントは

$$
E[Y]=\mu,
\qquad
\operatorname{Var}(Y)=\mu+\tau^2.
$$

標本モーメントを対応させると

$$
\bar y\approx\mu,
$$

$$
s_y^2\approx\mu+\tau^2.
$$

第1式を第2式へ代入すれば

$$
\tau^2\approx s_y^2-\bar y.
$$

したがって素朴なモーメント推定量は

$$
\widetilde\tau^2=s_y^2-\bar y.
$$

ただし $\tau^2$ は分散なので負にはなれない。有限標本では偶然

$$
s_y^2<\bar y
$$

となることがあるため、実用上は非負制約を反映して

$$
\boxed{
\widehat\tau^2
=\max\{0,s_y^2-\bar y\}
}
$$

とするのが自然である。

### 4. 通常のPoisson管理図が狭すぎる理由

通常のPoisson管理図は、平均欠点数が $\mu$ なら分散も

$$
\mu
$$

と仮定する。そのため標準偏差は

$$
\sqrt\mu
$$

と見積もられる。

しかし本問の実際の周辺分散は

$$
\mu+\tau^2
$$

なので、真の標準偏差は

$$
\sqrt{\mu+\tau^2}.
$$

$\tau^2>0$ なら

$$
\sqrt{\mu+\tau^2}>\sqrt\mu.
$$

従って通常の3シグマ型Poisson管理図が使う

$$
\mu\pm3\sqrt\mu
$$

は、本来使うべき

$$
\mu\pm3\sqrt{\mu+\tau^2}
$$

より狭い。

その結果、工程が通常のランダム変動の範囲にあっても点が管理限界を越えやすくなり、偽警報が増える。

### 5. 数値例

$$
\mu=4,
\qquad
\tau^2=5
$$

なので

$$
E[Y]=\boxed{4}.
$$

周辺分散は

$$
\operatorname{Var}(Y)
=4+5
=\boxed{9}.
$$

標準偏差は

$$
\sqrt9=3.
$$

したがって3シグマ型上側管理限界は

$$
\boxed{
UCL=4+3\cdot3=13
}.
$$

参考までに下側は

$$
4-3\cdot3=-5
$$

となるが、欠点数は負にならないので実際の下側管理限界は0に切り上げる。

通常のPoisson仮定なら標準偏差は2なので上側は

$$
4+3\cdot2=10
$$

となり、本来の13よりかなり狭いことも確認できる。

### 6. 過分散の原因

過分散の原因は少なくとも2種類に分けて考える。

#### 実際の工程率が変動している場合

本問の $\Lambda$ がランダムという設定そのものである。

例えば

- ロットごとに原材料品質が違う。
- 日・設備・作業者ごとに欠点率が違う。
- 温度・湿度・負荷など未観測条件が変動する。

といった工程間異質性があると、条件付きではPoissonでも周辺では過分散になる。

#### Poissonモデル自体が不適切な場合

例えば

- 欠点が互いに独立でなくクラスタリングする。
- ゼロが異常に多い。
- exposureの違いを無視している。
- 時系列相関や設備ごとの固定差を無視している。

場合にも、観測分散はPoisson仮定より大きくなり得る。

したがって「過分散が見えたから必ずGamma混合」とは限らず、工程異質性なのか依存構造・ゼロ過剰・exposure誤指定など別のモデル誤特定なのかを確認する必要がある。

## 本番答案

条件付きPoisson分布より

$$
E[Y\mid\Lambda]=\Lambda,
\qquad
\operatorname{Var}(Y\mid\Lambda)=\Lambda.
$$

従ってタワープロパティから

$$
E[Y]
=E\{E[Y\mid\Lambda]\}
=E[\Lambda]
=\mu.
$$

全分散より

$$
\begin{aligned}
\operatorname{Var}(Y)
&=E\{\operatorname{Var}(Y\mid\Lambda)\}
+\operatorname{Var}\{E[Y\mid\Lambda]\}\\
&=E[\Lambda]+\operatorname{Var}(\Lambda)\\
&=\mu+\tau^2.
\end{aligned}
$$

したがってモーメント法では

$$
\widehat\tau^2
=\max\{0,s_y^2-\bar y\}.
$$

通常のPoisson管理図は標準偏差を $\sqrt\mu$ とするが、実際は $\sqrt{\mu+\tau^2}$ なので管理限界を狭く設定し、偽警報を増やす。

$\mu=4,\tau^2=5$ なら

$$
E[Y]=4,
\qquad
\operatorname{Var}(Y)=9,
$$

$$
UCL=4+3\sqrt9=13.
$$

原因には工程率のロット間変動のほか、クラスタリング、ゼロ過剰、exposure誤指定、時系列依存などがある。

## 採点基準

- タワープロパティによる平均: 3点
- 全分散の2項を明示した導出: 5点
- モーメント推定と非負制約: 4点
- 通常Poisson管理図が狭くなる理由: 3点
- 数値計算・管理限界: 3点
- 工程変動とモデル誤特定の区別: 2点

20分経過時は、$\operatorname{Var}(Y)=\mu+\tau^2$ と $\widehat\tau^2=(s_y^2-\bar y)_+$ を確保する。
