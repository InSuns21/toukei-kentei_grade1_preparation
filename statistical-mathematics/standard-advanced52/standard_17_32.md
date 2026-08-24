# Standard 17–32

---

# Standard 17 一様分布最大値・不偏推定・分散比較

- 旧No.: 54
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{iid}\sim U(0,\theta)$ とする。$\bar X$ と $M=X_{(n)}$ から

$$
T_1=2\bar X,
\qquad
T_2=\frac{n+1}{n}M
$$

を考える。

1. 両者が $\theta$ の不偏推定量であることを示せ。
2. 分散を求め比較せよ。
3. なぜ最大値を使う推定量が有利なのか説明せよ。

## 詳細解答

$E[X_i]=\theta/2$, $\operatorname{Var}(X_i)=\theta^2/12$ だから

$$
E[T_1]=\theta,
\qquad
\operatorname{Var}(T_1)=4\frac{\theta^2}{12n}=\frac{\theta^2}{3n}.
$$

一方 $M/\theta\sim Beta(n,1)$ なので

$$
E[M]=\frac n{n+1}\theta,
\qquad
\operatorname{Var}(M)=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

従って

$$
E[T_2]=\theta,
\qquad
\operatorname{Var}(T_2)=\frac{\theta^2}{n(n+2)}.
$$

$n>1$ なら $1/[n(n+2)]<1/(3n)$ なので $T_2$ の方が小分散。$\theta$ は支持集合の端点を決めるため、最大値が母数情報を強く持つ非正則モデルである。

## 本番答案

$$
E[2\bar X]=\theta,
\quad
\operatorname{Var}(2\bar X)=\frac{\theta^2}{3n}.
$$

また $M/\theta\sim Beta(n,1)$ より

$$
E\left[\frac{n+1}{n}M\right]=\theta,
\quad
\operatorname{Var}\left(\frac{n+1}{n}M\right)=\frac{\theta^2}{n(n+2)}.
$$

従って $n>1$ で最大値型が小分散。

## 採点基準

- $T_1$ の不偏性・分散: 5点
- 最大値分布: 5点
- $T_2$ の不偏性・分散: 6点
- 比較・解釈: 4点

---

# Standard 18 超幾何分布・有限母集団補正

- 旧No.: 56
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

大きさ $N$ の有限母集団に成功個体が $K$ 個ある。復元なしに $n$ 個抽出し、成功数を $X$ とする。

1. $E[X]$, $\operatorname{Var}(X)$ を求めよ。
2. 母集団成功数 $K$ の不偏推定量を作れ。
3. 復元抽出の二項分布と比べ、有限母集団補正の意味を説明せよ。

## 詳細解答

$X\sim Hypergeometric(N,K,n)$ で

$$
E[X]=n\frac KN,
$$

$$
\operatorname{Var}(X)
=n\frac KN\left(1-\frac KN\right)\frac{N-n}{N-1}.
$$

従って

$$
\widehat K=\frac NnX
$$

は $E[\widehat K]=K$ で不偏。

分散中の

$$
\frac{N-n}{N-1}
$$

が有限母集団補正で、復元なし抽出では同じ個体を再度引けないため二項分布より変動が小さい。$n/N$ が無視できるほど小さいと補正はほぼ1。

## 本番答案

$$
E[X]=nK/N,
$$

$$
\operatorname{Var}(X)=n(K/N)(1-K/N)\frac{N-n}{N-1}.
$$

従って $\widehat K=(N/n)X$ は不偏。最後の因子が復元なし抽出による有限母集団補正。

## 採点基準

- 平均: 4点
- 分散: 6点
- 不偏推定量: 5点
- 有限母集団補正の解釈: 5点

---

# Standard 19 層化抽出・Horvitz–Thompson・Neyman配分

- 旧No.: 58
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ○

## 問題

母集団を $H$ 層に分け、層 $h$ の大きさを $N_h$、標本数を $n_h$、母標準偏差を $S_h$ とする。各層で単純無作為抽出する。

1. 母平均の層化推定量と分散を書け。
2. 母総計のHorvitz–Thompson推定量を書け。
3. 総標本数 $n$ 固定、抽出単価が同じときNeyman配分を導け。
4. $N_1=100,N_2=200,S_1=1,S_2=2,n=60$ の配分を求めよ。

## 詳細解答

$W_h=N_h/N$ とすると

$$
\bar y_{st}=\sum_hW_h\bar y_h,
$$

$$
\operatorname{Var}(\bar y_{st})
=\sum_hW_h^2\left(1-\frac{n_h}{N_h}\right)\frac{S_h^2}{n_h}.
$$

各層内の包含確率は $\pi_{hi}=n_h/N_h$。従って総計のHT推定量は

$$
\widehat Y_{HT}
=\sum_h\sum_{i\in s_h}\frac{y_{hi}}{\pi_{hi}}
=\sum_h\frac{N_h}{n_h}\sum_{i\in s_h}y_{hi}.
$$

有限母集団補正を配分最適化で定数項として整理すると、主要項は $\sum_hN_h^2S_h^2/n_h$。Lagrange法より

$$
\boxed{n_h=n\frac{N_hS_h}{\sum_jN_jS_j}}.
$$

例では重みが $100:400=1:4$ なので

$$
n_1=12,
\qquad
n_2=48.
$$

## 本番答案

$$
\bar y_{st}=\sum_hW_h\bar y_h,
\quad
Var(\bar y_{st})=\sum_hW_h^2(1-f_h)S_h^2/n_h.
$$

HT総計は $\sum_{h,i\in s_h}y_{hi}/\pi_{hi}$。等単価なら Neyman配分 $n_h\propto N_hS_h$。例では $12,48$。

## 採点基準

- 層化平均・分散: 6点
- HT推定量: 5点
- Neyman配分導出: 6点
- 数値配分: 3点

---

# Standard 20 右打切り指数寿命・観測尤度

- 旧No.: 60
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

寿命 $T_i\sim Exp(\lambda)$。各個体には打切り時刻 $C_i$ があり、観測は

$$
Y_i=\min(T_i,C_i),
\qquad
\delta_i=1\{T_i\le C_i\}
$$

である。打切りは寿命と独立とする。

1. $\lambda$ に関する観測尤度を書け。
2. $D=\sum\delta_i$, $R=\sum Y_i$ を使ってMLEを求めよ。
3. $D=0$ の場合を説明せよ。

## 詳細解答

イベント観測では密度 $\lambda e^{-\lambda Y_i}$、打切りでは生存関数 $e^{-\lambda Y_i}$ が寄与する。従って

$$
L(\lambda)
=\prod_i\lambda^{\delta_i}e^{-\lambda Y_i}
=\lambda^D e^{-\lambda R}.
$$

対数尤度は

$$
\ell(\lambda)=D\log\lambda-\lambda R.
$$

$D>0$ なら

$$
\boxed{\widehat\lambda=D/R}.
$$

$D=0$ では $L(\lambda)=e^{-\lambda R}$ は $\lambda\downarrow0$ で最大となり、正の内部MLEは存在しない。

## 本番答案

各観測の寄与は $[\lambda e^{-\lambda Y_i}]^{\delta_i}[e^{-\lambda Y_i}]^{1-\delta_i}$。従って

$$
L(\lambda)=\lambda^D e^{-\lambda R},
\quad
\widehat\lambda=D/R
$$

ただし $D>0$。$D=0$ では境界 $\lambda=0$ 側へ最大化される。

## 採点基準

- 打切り尤度の構成: 8点
- 集約統計量 $D,R$: 3点
- MLE: 6点
- $D=0$ の境界: 3点

---

# Standard 21 順序統計量で棄却域を設計

- 旧No.: 67
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{iid}\sim U(0,\theta)$ とする。

$$
H_0:\theta=1,
\qquad
H_1:\theta<1
$$

を有意水準 $\alpha$ で検定したい。$M=X_{(n)}$ を用いる。

1. $H_0$ 下の $M$ のCDFを求めよ。
2. 棄却域 $M\le c$ の $c$ を決めよ。
3. 対立母数 $\theta<1$ 下の検出力を求めよ。

## 詳細解答

$H_0$ 下で

$$
P(M\le m)=m^n,
\qquad0<m<1.
$$

サイズ条件 $P_0(M\le c)=\alpha$ より

$$
\boxed{c=\alpha^{1/n}}.
$$

$H_1$ で $M/\theta\sim Beta(n,1)$。従って

$$
\pi(\theta)=P_\theta(M\le c)
=
\begin{cases}
(c/\theta)^n,&c<\theta<1,\\
1,&0<\theta\le c.
\end{cases}
$$

$\theta$ が小さいほど最大値も小さくなるため、左側棄却が自然である。

## 本番答案

$F_M(m)=m^n$ under $H_0$。従って $c^n=\alpha$ から $c=\alpha^{1/n}$。検出力は $c<\theta$ なら $(c/\theta)^n$、$\theta\le c$ なら1。

## 採点基準

- 帰無分布: 6点
- 臨界値: 5点
- 検出力: 6点
- 棄却方向の説明: 3点

---

# Standard 22 適合度LRT・Pearson・自由度

- 旧No.: 68
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

4カテゴリ多項分布で

$$
p(\theta)=\left(\frac\theta2,\frac\theta2,\frac{1-\theta}{2},\frac{1-\theta}{2}\right),
\qquad0<\theta<1
$$

とする。観測度数は $(20,10,30,40)$。

1. $\theta$ のMLEを求めよ。
2. 期待度数を求め、Pearson統計量を計算せよ。
3. LRT統計量を書け。対数は数値化しなくてよい。
4. 漸近自由度を求めよ。

## 詳細解答

最初の2カテゴリの合計確率が $\theta$ なので

$$
\widehat\theta=\frac{20+10}{100}=0.3.
$$

期待度数は

$$
(15,15,35,35).
$$

Pearson統計量は

$$
X^2
=\frac{25}{15}+\frac{25}{15}+\frac{25}{35}+\frac{25}{35}
=\frac{100}{21}.
$$

LRTは

$$
G^2=2\sum_{i=1}^4O_i\log\frac{O_i}{E_i}.
$$

カテゴリ数4から総和制約で1自由度失い、さらに $\theta$ を1個推定するので

$$
\boxed{df=4-1-1=2}.
$$

## 本番答案

$\hat\theta=0.3$、期待度数 $(15,15,35,35)$。Pearsonは $100/21$。LRTは $2\sum O_i\log(O_i/E_i)$。推定母数1個を使うので自由度は $4-1-1=2$。

## 採点基準

- MLE: 4点
- 期待度数: 4点
- Pearson統計量: 5点
- LRT: 3点
- 自由度: 4点

---

# Standard 23 母相関係数・Fisher z変換

- 旧No.: 73
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・修正済（$\operatorname{atanh}$ の数値は与値使用）

## 問題

2変量正規標本から標本相関係数 $r$ を得た。大標本で

$$
z(r)=\operatorname{atanh}(r)
=\frac12\log\frac{1+r}{1-r}
$$

を用いる。

1. $z(r)$ の近似分布を書け。
2. $H_0:\rho=\rho_0$ の検定統計量を書け。
3. $n=30,r=0.5,\rho_0=0$ とし、$\operatorname{atanh}(0.5)=0.5493$ が与えられたとき統計量を求めよ。
4. $\rho$ の近似信頼区間の作り方を述べよ。

## 詳細解答

2変量正規の下で

$$
z(r)\approx N\left(z(\rho),\frac1{n-3}\right).
$$

従って

$$
Z=\sqrt{n-3}\{z(r)-z(\rho_0)\}
\approx N(0,1).
$$

例では $z(0)=0$ なので

$$
Z=\sqrt{27}\times0.5493\approx2.85.
$$

信頼区間はまず z尺度で

$$
z(r)\pm z_{1-\alpha/2}\frac1{\sqrt{n-3}}
$$

を作り、両端を $\tanh$ で戻す。$\tanh$ の数値評価は表・与値または計算機側の処理でよく、導出の本質ではない。

## 本番答案

$$
z(r)\approx N(z(\rho),1/(n-3)).
$$

よって帰無下の統計量は $\sqrt{n-3}[z(r)-z(\rho_0)]$。例では約2.85。区間は z尺度で作って $\tanh$ で逆変換する。

## 採点基準

- Fisher zの近似分布: 6点
- 検定統計量: 5点
- 数値例: 4点
- 信頼区間: 5点

---

# Standard 24 Wilcoxon順位和・並べ替え検定

- 旧No.: 74
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

連続分布から独立に得た2群があり、群Aと群Bの標本数は各3。6個をまとめた順位について、群Aが順位 $1,2,3$ を占めた。

1. 群Aの順位和 $W$ を求めよ。
2. 帰無仮説「2群の分布が同じ」の下で、群ラベルの割当て総数を求めよ。
3. 「Aの方が小さい」という片側対立の正確P値を求めよ。
4. 両側P値を求めよ。

## 詳細解答

順位和は

$$
W=1+2+3=6.
$$

3個のA順位を6順位から選ぶので総数は

$$
\binom63=20.
$$

$W=6$ は最小可能値で、この割当ては $\{1,2,3\}$ の1通りのみ。従って片側P値は

$$
\boxed{1/20=0.05}.
$$

対称な反対側の最大順位和 $4+5+6=15$ も1通りなので、両側P値は

$$
\boxed{2/20=0.10}.
$$

連続分布なら同順位がなく、帰無下でラベルの全割当てが等確率になることが根拠。

## 本番答案

$W=6$。帰無下の割当ては $\binom63=20$ 通りで、$W=6$ は1通り。片側P値 $1/20$、対称両側なら $2/20$。

## 採点基準

- 順位和: 3点
- 並べ替え標本空間: 5点
- 片側P値: 5点
- 両側P値・根拠: 7点

---

# Standard 25 ANCOVA・調整済み処置効果

- 旧No.: 82
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

2群のANCOVAモデル

$$
Y_{ij}=\mu+\tau_i+\beta(X_{ij}-\bar X_{..})+\varepsilon_{ij}
$$

を考える。共通傾き $\beta$ を仮定する。

1. 群1と群2の調整済み平均差を標本平均で表せ。
2. $\bar Y_1-\bar Y_2=4$, $\bar X_1-\bar X_2=2$, $\hat\beta=1.5$ のとき調整済み差を求めよ。
3. 調整前差と調整後差が異なる理由を説明せよ。
4. 共通傾き仮定をどう確認するか述べよ。

## 詳細解答

共通の基準共変量値へ調整すると、群差は

$$
\widehat\Delta_{adj}
=(\bar Y_1-\bar Y_2)-\hat\beta(\bar X_1-\bar X_2).
$$

従って例では

$$
\widehat\Delta_{adj}=4-1.5\times2=1.
$$

処置群間で共変量平均が異なり、かつ共変量が応答と関連する場合、単純平均差には共変量差の効果が混入する。

共通傾きは群と共変量の交互作用項を追加し、その係数が0とみなせるかを検定・残差診断で確認する。

## 本番答案

$$
\hat\Delta_{adj}=(\bar Y_1-\bar Y_2)-\hat\beta(\bar X_1-\bar X_2)=1.
$$

共変量の群間不均衡を線形に補正している。共通傾きは group $\times X$ 交互作用で確認する。

## 採点基準

- 調整済み差の式: 7点
- 数値計算: 4点
- 調整の意味: 5点
- 共通傾きの確認: 4点

---

# Standard 26 Bonferroni・Scheffe多重比較

- 旧No.: 83
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: 表

## 問題

1. $m$ 個の仮説を家族内有意水準 $\alpha$ で検定するとき、Bonferroni法の個別有意水準を述べよ。
2. 4群一元配置ANOVAで、任意のコントラスト $L=\sum_{i=1}^4c_i\mu_i$, $\sum c_i=0$ に対するScheffe同時信頼区間を書け。
3. BonferroniとScheffeがそれぞれ向く状況を説明せよ。

## 詳細解答

Bonferroniでは各検定を

$$
\alpha/m
$$

以下で行えば、和事象の上界からFWERは $\alpha$ 以下。

Scheffe法では推定量 $\hat L=\sum c_i\bar Y_i$ に対し

$$
\hat L
\pm
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}},
$$

ここで $g=4$。F分位点は数表を使う。

Bonferroniは事前に有限個の比較が決まっているとき簡単で柔軟。Scheffeは全ての線形コントラストを同時保証するため、比較集合が非常に広い場合に適するが保守的になりやすい。

## 本番答案

Bonferroniは個別水準 $\alpha/m$。Scheffeはコントラストの通常SEに $\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}$ を掛けた同時区間。有限個の事前比較はBonferroni、任意コントラスト全体はScheffe。

## 採点基準

- Bonferroni閾値: 5点
- FWER根拠: 4点
- Scheffe区間: 7点
- 使い分け: 4点

---

# Standard 27 partial R2・追加平方和

- 旧No.: 84
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

縮小モデルの残差平方和を $SSE_R=100$、追加説明変数2個を入れた完全モデルを $SSE_F=80$ とする。完全モデルの残差自由度は20。

1. 追加平方和とpartial $R^2$ を求めよ。
2. partial F統計量を求めよ。
3. partial $R^2$ とF統計量の一般関係を導け。

## 詳細解答

追加平方和は

$$
SS_{add}=SSE_R-SSE_F=20.
$$

partial $R^2$ は、縮小モデルで残っていた変動のうち追加変数が説明した割合なので

$$
R^2_{partial}=\frac{20}{100}=0.2.
$$

$q=2$, $df_F=20$ より

$$
F=\frac{(100-80)/2}{80/20}=2.5.
$$

一般に

$$
F=\frac{(SSE_R-SSE_F)/q}{SSE_F/df_F}.
$$

これを解くと

$$
\boxed{R^2_{partial}=\frac{qF}{qF+df_F}}.
$$

例では $5/(5+20)=0.2$。

## 本番答案

$SS_{add}=20$, partial $R^2=20/100=0.2$。Fは $[(20)/2]/(80/20)=2.5$。一般に $R^2_{partial}=qF/(qF+df_F)$。

## 採点基準

- 追加平方和: 3点
- partial $R^2$: 5点
- F統計量: 5点
- 一般関係の導出: 7点

---

# Standard 28 対数回帰・残差診断

- 旧No.: 85
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（指数関数の数値評価不要）

## 問題

$$
\log Y=\alpha+\beta X+\varepsilon,
\qquad
\varepsilon\sim N(0,\sigma^2)
$$

とする。

1. $X=x$ における $Y$ の中央値と平均を求めよ。
2. $X$ が1増えたときの中央値の倍率を求めよ。
3. 元尺度の予測値を単純に $e^{\hat\alpha+\hat\beta x}$ とすると平均予測として偏る理由を説明せよ。
4. 残差対予測値プロットで扇形が見える場合の含意を述べよ。

## 詳細解答

条件付きで $\log Y$ は正規だから $Y$ は対数正規。

$$
\operatorname{Med}(Y\mid X=x)=e^{\alpha+\beta x},
$$

$$
E[Y\mid X=x]=e^{\alpha+\beta x+\sigma^2/2}.
$$

従って $X$ が1増えると中央値は $e^\beta$ 倍。平均へ戻すには対数正規補正 $e^{\sigma^2/2}$ が必要。

残差の散らばりが予測値とともに増える扇形は、等分散仮定が不適切な可能性を示す。変換や分散モデルの見直しを検討する。

## 本番答案

中央値は $e^{\alpha+\beta x}$、平均は $e^{\alpha+\beta x+\sigma^2/2}$。1単位増加の中央値倍率は $e^\beta$。単純逆変換は平均ではなく中央値を返す。扇形残差は不均一分散を示唆。

## 採点基準

- 中央値: 4点
- 平均: 6点
- 効果解釈・逆変換バイアス: 6点
- 残差診断: 4点

---

# Standard 29 2変量正規・平均への回帰

- 旧No.: 86
- 層: Standard
- 演習価値: B
- 難度: B
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$(X,Y)$ は2変量正規で平均 $(\mu_X,\mu_Y)$、標準偏差 $(\sigma_X,\sigma_Y)$、相関 $\rho$ とする。

1. $E[Y\mid X=x]$ を求めよ。
2. 標準化変数 $Z_X,Z_Y$ を用いて条件付き平均を書け。
3. $Z_X=2$, $\rho=0.6$ のとき $E[Z_Y\mid Z_X=2]$ を求め、「平均への回帰」を説明せよ。

## 詳細解答

条件付き正規公式より

$$
E[Y\mid X=x]
=\mu_Y+\rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X).
$$

標準化すれば

$$
E[Z_Y\mid Z_X=z]=\rho z.
$$

例では $0.6\times2=1.2$。$X$ が平均から2標準偏差離れていても、$|\rho|<1$ なら $Y$ の条件付き平均は1.2標準偏差にとどまる。極端な観測に対応する次の変数の期待値が平均寄りになる現象が平均への回帰。

## 本番答案

$$
E[Y\mid X=x]=\mu_Y+\rho(\sigma_Y/\sigma_X)(x-\mu_X),
$$

従って標準化後は $E[Z_Y\mid Z_X=z]=\rho z$。例では1.2で、2より平均0に近い。

## 採点基準

- 条件付き平均: 7点
- 標準化: 5点
- 数値例: 3点
- 平均への回帰の説明: 5点

---

# Standard 30 稀事象・相対Monte Carlo誤差

- 旧No.: 89
- 層: Standard
- 演習価値: A
- 難度: B
- 目安時間: 15分
- 手計算監査: ○

## 問題

稀事象 $A$ の確率を $p$ とし、独立反復で

$$
\hat p=\frac1n\sum_{i=1}^n1\{A_i\}
$$

と推定する。

1. $\hat p$ の標準誤差を求めよ。
2. 相対標準誤差を求めよ。
3. $p=10^{-4}$ のとき相対標準誤差を約10%以下にするために必要な $n$ のオーダーを求めよ。
4. 稀事象で単純Monte Carloが非効率な理由を述べよ。

## 詳細解答

Bernoulli平均なので

$$
SE(\hat p)=\sqrt{\frac{p(1-p)}n}.
$$

相対SEは

$$
\frac{SE(\hat p)}p
=\sqrt{\frac{1-p}{np}}
\approx\frac1{\sqrt{np}}
$$

for small $p$。

相対SE $\le0.1$ にはおおよそ

$$
np\ge100.
$$

$p=10^{-4}$ なら

$$
n\gtrsim10^6.
$$

絶対誤差は小さく見えても、成功観測数 $np$ が少ないと相対誤差が大きい。

## 本番答案

$$
SE=\sqrt{p(1-p)/n},
\quad
RSE=\sqrt{(1-p)/(np)}\approx1/\sqrt{np}.
$$

$p=10^{-4}$ でRSE 10%には $np\approx100$、よって $n\approx10^6$。稀事象ではほとんどの反復が0で情報効率が悪い。

## 採点基準

- SE: 5点
- 相対SE: 5点
- 必要試行数: 6点
- 非効率性の説明: 4点

---

# Standard 31 Box–Muller変換

- 旧No.: 91
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（$\log,\sin,\cos$ の数値評価不要）

## 問題

$U_1,U_2\overset{iid}\sim U(0,1)$ とする。2次元標準正規密度を極座標変換して、独立標準正規 $Z_1,Z_2$ を生成するBox–Muller式を導け。

## 詳細解答

独立標準正規の同時密度は

$$
f(z_1,z_2)=\frac1{2\pi}\exp\left(-\frac{z_1^2+z_2^2}{2}\right).
$$

極座標 $z_1=r\cos\theta$, $z_2=r\sin\theta$、Jacobian $r$ を用いると

$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}re^{-r^2/2}.
$$

従って $\Theta\sim U(0,2\pi)$、また

$$
P(R\le r)=1-e^{-r^2/2}.
$$

逆関数法より

$$
R=\sqrt{-2\log U_1},
\qquad
\Theta=2\pi U_2.
$$

したがって

$$
\boxed{Z_1=\sqrt{-2\log U_1}\cos(2\pi U_2)},
$$

$$
\boxed{Z_2=\sqrt{-2\log U_1}\sin(2\pi U_2)}.
$$

関数値の数値計算は乱数生成器側の処理であり、答案では導出まででよい。

## 本番答案

2次元正規を極座標化すると $f_{R,\Theta}=re^{-r^2/2}/(2\pi)$。よって $R^2\sim\chi_2^2$、$\Theta\sim U(0,2\pi)$ 独立。逆関数法から

$$
R=\sqrt{-2\log U_1},\quad\Theta=2\pi U_2
$$

を得て $Z_1=R\cos\Theta$, $Z_2=R\sin\Theta$。

## 採点基準

- 極座標変換: 6点
- $R,\Theta$ の分布: 6点
- 逆関数法: 4点
- Box–Muller式: 4点

---

# Standard 32 Weibull・生存関数・ハザード

- 旧No.: 96
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

Weibull分布のCDFを

$$
F(t)=1-\exp\left[-\left(\frac t\lambda\right)^k\right],
\qquad t\ge0,
$$

$k,\lambda>0$ とする。

1. 生存関数 $S(t)$ を求めよ。
2. 密度 $f(t)$、ハザード $h(t)$、累積ハザード $H(t)$ を求めよ。
3. $k<1,k=1,k>1$ でハザード形状を分類せよ。
4. $\lambda$ の解釈を述べよ。

## 詳細解答

$$
S(t)=1-F(t)=\exp[-(t/\lambda)^k].
$$

微分して

$$
f(t)=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1}
\exp[-(t/\lambda)^k].
$$

従って

$$
h(t)=\frac{f(t)}{S(t)}
=\frac{k}{\lambda}\left(\frac t\lambda\right)^{k-1},
$$

$$
H(t)=-\log S(t)=\left(\frac t\lambda\right)^k.
$$

$k<1$ なら減少ハザード、$k=1$ なら一定ハザードで指数分布、$k>1$ なら増加ハザード。

$t=\lambda$ では $S(\lambda)=e^{-1}$ なので、$\lambda$ は生存率が $e^{-1}$ になる代表時間尺度。

## 本番答案

$$
S=e^{-(t/\lambda)^k},
\quad
f=\frac{k}{\lambda}(t/\lambda)^{k-1}S,
$$

$$
h=\frac{k}{\lambda}(t/\lambda)^{k-1},
\quad
H=(t/\lambda)^k.
$$

$k<1$ 減少、$k=1$ 一定、$k>1$ 増加。$S(\lambda)=e^{-1}$。

## 採点基準

- 生存関数・密度: 6点
- ハザード: 5点
- 累積ハザード: 3点
- 形状母数・尺度母数の解釈: 6点
