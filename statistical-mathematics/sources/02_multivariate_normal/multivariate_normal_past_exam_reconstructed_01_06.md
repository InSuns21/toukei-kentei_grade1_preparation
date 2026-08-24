# 多変量正規・条件付き分布分野 過去問型再構成演習 1位〜6位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、多変量正規分布・条件付き分布・相関係数分野の演習価値ランキング1位〜6位を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・数値・設問順・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 公開解説は出題構造の確認にのみ用い、数式・結論は独立に再計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 演習価値の評価基準

順位は元難度そのものではなく、次の観点を重視した。

1. 多変量正規分布の中核公式を何度も再利用できるか。
2. 線形変換、共分散行列、独立性、条件付き分布を横断できるか。
3. 回帰、時系列、線形モデル、偏相関など他分野へ接続できるか。
4. 単なる公式代入ではなく「なぜ独立になるか」「なぜ条件付き平均が線形か」まで確認できるか。
5. 統計検定1級で再出題されても形を変えて対応しやすいか。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | 元難度 | 再構成Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|:---:|---:|---|
| 1 | 2021 問5 | 多変量正規・線形変換・独立 | A | A | 35分 | 共分散行列、線形変換、独立性、射影、条件付き分布 |
| 2 | 2012 問5 | 多変量正規・条件付き分布 | A | A | 30分 | ブロック行列、条件付き平均・分散、偏相関、条件付き独立 |
| 3 | 2018 問4 | 2変量正規・条件付き分布・Markov性 | B | B | 25分 | 条件付き正規、全期待値・全分散、Markov性、定常性 |
| 4 | 2013 問2 | 正規分布・条件付き/周辺分布 | B | B | 25分 | 和の正規分布、無相関と独立、条件付き分布、Gaussian bridge |
| 5 | 2015 問5 | 相関係数 | B | B | 25分 | 群間分解、二値化、切断正規、相関の減衰 |
| 6 | 2017 問4 | 正規分布・線形変換・条件付き分布 | C | C | 20分 | 正規分布の再生性、相関係数、Bayes、条件付き正規 |

### 順位の考え方

1位の2021問5型は、標準多変量正規ベクトルに行列を掛け、共分散を計算し、無相関と独立の同値性から独立条件を導く。さらに「他の線形結合を差し引いて独立な残差を作る」という、線形回帰・射影・条件付き期待値へ直結する骨格まで含むため最優先とした。

2位の2012問5型は、3変量正規分布の条件付き平均・条件付き分散をブロック行列で処理する代表問題である。偏相関、条件付き独立、重回帰係数との関係まで一題で復習できる。

3位の2018問4型は、2変量正規の条件付き分布をMarkov構造の中で2段合成する。単発の公式適用ではなく、全期待値・全分散や正規ノイズ表示を使って遷移を合成する点に演習価値がある。

4位の2013問2型は、独立正規標本の部分和を使い、「共分散0なら独立」を実際に証明してから条件付き分布へつなぐ。Brownian bridge型の条件付き共分散へ自然に拡張できる。

5位の2015問5型は、連続変数を符号で二値化したとき相関がどの程度失われるかを解析できる。切断正規分布と標本相関の群間分解が結びつく良問型だが、上位4題より用途はやや限定的である。

6位の2017問4型は、多変量正規の基本事項を短時間で一巡できる良い確認問題である。ただし2012問5型に比べて行列計算や条件付き独立まで踏み込まないため6位とした。

---

## 1位: 2021 問5型 線形変換した多変量正規ベクトルの独立性と残差化

- 安定ID: `RECON-MVN-R01-2021-Q5`
- 参照: 2021年 問5
- 確度: `third_party_topic_index`
- 確認元: Academaid「2021年統計検定1級＜数理統計問5＞」
- 元主題: 多変量正規分布の線形変換と独立性
- Level: A
- 目安時間: 35分
- 主な使用技術: 行列共分散、線形変換、正規ベクトルの無相関と独立、直交射影、条件付き正規

### 問題

$X\in\mathbb R^n$ は

$$
X\sim\mathcal N_n(0,I_n)
$$

に従うとする。$L\in\mathbb R^{p\times n}$、$M\in\mathbb R^{q\times n}$ は定数行列とし、

$$
Y=LX,\qquad Z=MX
$$

とおく。

1. $Y$ と $Z$ の分布、分散共分散行列、相互共分散行列を求めよ。
2. $Y$ と $Z$ が独立であるための必要十分条件を求めよ。
3. $MM^T$ が正則とする。$R=LX-AZ$ が $Z$ と独立となるような $p\times q$ 行列 $A$ を求めよ。
4. 3の $A$ を用いて $Y$ を $AZ+R$ と分解し、$Y\mid Z=z$ の条件付き分布を求めよ。
5. 

$$
P=M^T(MM^T)^{-1}M
$$

とおく。$P$ が $M$ の行空間への直交射影行列であり、$R=L(I_n-P)X$ と書けることを示せ。

### 解答

#### 1. 線形変換後の分布と共分散

多変量正規分布は線形変換で閉じているため、

$$
Y\sim\mathcal N_p(0,LL^T),
\qquad
Z\sim\mathcal N_q(0,MM^T).
$$

また

$$
\begin{aligned}
\mathrm{Cov}(Y,Z)
&=E[YZ^T]\\
&=E[LXX^TM^T]\\
&=LE[XX^T]M^T\\
&=LM^T.
\end{aligned}
$$

よって

$$
\boxed{
\mathrm{Var}(Y)=LL^T,\quad
\mathrm{Var}(Z)=MM^T,\quad
\mathrm{Cov}(Y,Z)=LM^T
}.
$$

#### 2. 独立条件

$(Y,Z)$ も同時多変量正規である。多変量正規では無相関と独立が同値なので、

$$
Y\perp Z
\iff
\mathrm{Cov}(Y,Z)=O
\iff
\boxed{LM^T=O}.
$$

ここで「共分散0なら独立」は一般の分布では成立せず、同時正規であることが決定的である。

#### 3. 独立な残差を作る

$$
R=LX-AMX
$$

とおく。$R$ と $Z=MX$ の共分散は

$$
\begin{aligned}
\mathrm{Cov}(R,Z)
&=(L-AM)M^T\\
&=LM^T-AMM^T.
\end{aligned}
$$

独立の必要十分条件はこれが0であることなので、

$$
AMM^T=LM^T.
$$

$MM^T$ は正則だから

$$
\boxed{
A=LM^T(MM^T)^{-1}
}.
$$

#### 4. 条件付き分布

3より

$$
Y=AZ+R,
\qquad R\perp Z.
$$

したがって $Z=z$ のもとでは $AZ$ は定数 $Az$ となり、ランダム性は $R$ だけに残る。

$R$ の分散は

$$
\begin{aligned}
\mathrm{Var}(R)
&=\mathrm{Var}(Y-AZ)\\
&=LL^T-LM^TA^T-AL^TM^T+AMM^TA^T.
\end{aligned}
$$

$A=LM^T(MM^T)^{-1}$ を代入して整理すると

$$
\mathrm{Var}(R)
=LL^T-LM^T(MM^T)^{-1}ML^T.
$$

よって

$$
\boxed{
Y\mid Z=z
\sim
\mathcal N_p\left(
LM^T(MM^T)^{-1}z,
LL^T-LM^T(MM^T)^{-1}ML^T
\right)
}.
$$

多変量正規の条件付き分布公式が、実は「回帰部分 $AZ$ + 独立残差 $R$」という分解そのものであることが見える。

#### 5. 射影としての意味

まず

$$
P^T=P
$$

であり、

$$
\begin{aligned}
P^2
&=M^T(MM^T)^{-1}MM^T(MM^T)^{-1}M\\
&=M^T(MM^T)^{-1}M=P.
\end{aligned}
$$

したがって $P$ は対称かつ冪等であり、直交射影行列である。さらに $PX$ は $M$ の行空間方向の成分である。

3の $A$ を使うと

$$
\begin{aligned}
R
&=LX-LM^T(MM^T)^{-1}MX\\
&=L(I_n-P)X.
\end{aligned}
$$

したがって

$$
\boxed{R=L(I_n-P)X}.
$$

つまり、$MX$ によって説明できる成分を引いた残りが独立残差である。

### 一手

$AX$ と $BX$ の独立性を聞かれたら、まず

$$
\mathrm{Cov}(AX,BX)=A\Sigma B^T
$$

を計算する。元が多変量正規なら、これが0であることがそのまま独立条件になる。

---

## 2位: 2012 問5型 3変量正規の条件付き分布と偏相関

- 安定ID: `RECON-MVN-R02-2012-Q5`
- 参照: 2012年 問5
- 確度: `third_party_topic_index`
- 確認元: Academaid「2012年統計検定1級＜統計数理5＞」
- 元主題: 多変量正規分布の条件付き分布
- Level: A
- 目安時間: 30分
- 主な使用技術: ブロック行列、条件付き平均・分散、偏相関、条件付き独立

### 問題

$(X,Y,Z)$ が平均0、各分散1の3変量正規分布に従い、相関係数を

$$
\rho_{XY}=a,\qquad
\rho_{YZ}=b,\qquad
\rho_{XZ}=c
$$

とする。相関行列は正定値とする。

1. $Y\mid X=x$ の分布を求めよ。
2. $Y\mid X=x,Z=z$ の条件付き平均と条件付き分散を求めよ。
3. $Z$ を条件に追加しても $X$ の回帰係数が変化しない、すなわち

$$
E[Y\mid X=x,Z=z]
$$

における $x$ の係数が $E[Y\mid X=x]$ における係数と等しいための条件を求めよ。
4. 

$$
\mathrm{Var}(Y\mid X)=\mathrm{Var}(Y\mid X,Z)
$$

となるための必要十分条件を求めよ。
5. $X$ を条件づけたときの $Y$ と $Z$ の偏相関係数を求め、4との関係を説明せよ。

### 解答

#### 1. $Y\mid X=x$

2変量正規分布の条件付き分布より

$$
\boxed{
Y\mid X=x
\sim
\mathcal N(ax,1-a^2)
}.
$$

#### 2. $Y\mid X=x,Z=z$

$W=(X,Z)^T$ とおくと

$$
\mathrm{Cov}(Y,W)=(a,b),
$$

$$
\mathrm{Var}(W)
=
\begin{pmatrix}
1&c\\
c&1
\end{pmatrix},
$$

その逆行列は

$$
\mathrm{Var}(W)^{-1}
=
\frac{1}{1-c^2}
\begin{pmatrix}
1&-c\\
-c&1
\end{pmatrix}.
$$

したがって条件付き平均は

$$
\begin{aligned}
E[Y\mid X=x,Z=z]
&=(a,b)\mathrm{Var}(W)^{-1}
\begin{pmatrix}x\\z\end{pmatrix}\\
&=\frac{a-bc}{1-c^2}x
+\frac{b-ac}{1-c^2}z.
\end{aligned}
$$

よって

$$
\boxed{
E[Y\mid X=x,Z=z]
=\frac{a-bc}{1-c^2}x
+\frac{b-ac}{1-c^2}z
}.
$$

条件付き分散は

$$
\begin{aligned}
\mathrm{Var}(Y\mid X,Z)
&=1-(a,b)\mathrm{Var}(W)^{-1}
\begin{pmatrix}a\\b\end{pmatrix}\\
&=1-\frac{a^2-2abc+b^2}{1-c^2}.
\end{aligned}
$$

したがって

$$
\boxed{
\mathrm{Var}(Y\mid X,Z)
=
1-\frac{a^2-2abc+b^2}{1-c^2}
}.
$$

#### 3. $X$ の係数が変わらない条件

$Y\mid X=x$ における $x$ の係数は $a$ である。一方、$Y\mid X=x,Z=z$ では

$$
\frac{a-bc}{1-c^2}.
$$

両者が等しい条件は

$$
\frac{a-bc}{1-c^2}=a.
$$

整理すると

$$
c(b-ac)=0.
$$

したがって

$$
\boxed{c=0\quad\text{または}\quad b=ac}.
$$

$b=ac$ は $X$ を条件づけたときに $Y$ と $Z$ が無相関、すなわち正規分布では条件付き独立になる条件である。

#### 4. 条件付き分散が変わらない条件

差を取ると

$$
\begin{aligned}
\mathrm{Var}(Y\mid X)
-\mathrm{Var}(Y\mid X,Z)
&=(1-a^2)-\left(1-\frac{a^2-2abc+b^2}{1-c^2}\right)\\
&=\frac{(b-ac)^2}{1-c^2}.
\end{aligned}
$$

正定値性より $1-c^2>0$ だから、差が0となる必要十分条件は

$$
\boxed{b=ac}.
$$

#### 5. 偏相関

$X$ を調整した $Y$ と $Z$ の偏相関係数は

$$
\boxed{
\rho_{YZ\cdot X}
=
\frac{b-ac}{\sqrt{(1-a^2)(1-c^2)}}
}.
$$

よって

$$
\rho_{YZ\cdot X}=0
\iff b=ac.
$$

3変量正規分布では偏相関0は条件付き独立と同値であるため、4の「$Z$ を追加しても条件付き分散が減らない」は

$$
Y\perp Z\mid X
$$

と同値である。

### 一手

3変量正規で1変量を条件づける問題は、係数を暗記するより

$$
\Sigma_{12}\Sigma_{22}^{-1}
$$

をその場で作る方が安全である。

---

## 3位: 2018 問4型 条件付き正規分布を2段合成するMarkovモデル

- 安定ID: `RECON-MVN-R03-2018-Q4`
- 参照: 2018年 問4
- 確度: `third_party_topic_index`
- 確認元: Academaid「2018年統計検定1級＜数理統計問4＞」
- 元主題: 条件付き2変量正規分布とMarkov性
- Level: B
- 目安時間: 25分
- 主な使用技術: 条件付き正規、全期待値、全分散、Markov性、定常分布

### 問題

$|\rho|<1$ とする。確率過程 $(X_t,Y_t)$ が、独立な標準正規変数 $\varepsilon_t,\eta_t$ を用いて

$$
Y_t=\rho X_t+\sqrt{1-\rho^2}\,\varepsilon_t,
$$

$$
X_{t+1}=\rho Y_t+\sqrt{1-\rho^2}\,\eta_t
$$

と表されるとする。$X_t$ と過去のノイズ、各時点の新しいノイズは独立とする。

1. $X_t\sim\mathcal N(0,1)$ なら $Y_t\sim\mathcal N(0,1)$ であることを示せ。
2. $X_{t+1}\mid X_t=x$ の分布を求めよ。
3. $X_{t+k}\mid X_t=x$ の分布を求めよ。
4. $X_0\sim\mathcal N(0,1)$ とするとき、$(X_t)$ が定常であることを示し、$\mathrm{Corr}(X_t,X_{t+k})$ を求めよ。
5. 2の結果を全期待値・全分散公式でも確認せよ。

### 解答

#### 1. 周辺分布

$X_t$ と $\varepsilon_t$ は独立な正規変数なので $Y_t$ も正規であり、

$$
E[Y_t]=0,
$$

$$
\mathrm{Var}(Y_t)
=\rho^2+(1-\rho^2)=1.
$$

したがって

$$
\boxed{Y_t\sim\mathcal N(0,1)}.
$$

#### 2. 2段遷移の合成

1式目を2式目へ代入すると

$$
\begin{aligned}
X_{t+1}
&=\rho\left(\rho X_t+\sqrt{1-\rho^2}\,\varepsilon_t\right)
+\sqrt{1-\rho^2}\,\eta_t\\
&=\rho^2X_t
+\sqrt{1-\rho^2}\left(\rho\varepsilon_t+\eta_t\right).
\end{aligned}
$$

ノイズ部分は平均0で、分散は

$$
(1-\rho^2)(\rho^2+1)=1-\rho^4.
$$

よって

$$
\boxed{
X_{t+1}\mid X_t=x
\sim\mathcal N(\rho^2x,1-\rho^4)
}.
$$

#### 3. $k$ ステップ遷移

2より $(X_t)$ はAR(1)型に

$$
X_{t+1}=\rho^2X_t+\sqrt{1-\rho^4}\,\xi_t,
\qquad \xi_t\sim\mathcal N(0,1)
$$

と書ける。

反復すると

$$
E[X_{t+k}\mid X_t=x]=\rho^{2k}x.
$$

条件付き分散は幾何級数より

$$
\begin{aligned}
\mathrm{Var}(X_{t+k}\mid X_t)
&=(1-\rho^4)\sum_{j=0}^{k-1}\rho^{4j}\\
&=1-\rho^{4k}.
\end{aligned}
$$

したがって

$$
\boxed{
X_{t+k}\mid X_t=x
\sim
\mathcal N(\rho^{2k}x,1-\rho^{4k})
}.
$$

#### 4. 定常性と自己相関

$X_t\sim\mathcal N(0,1)$ とすると、2より

$$
E[X_{t+1}]=0,
$$

$$
\mathrm{Var}(X_{t+1})
=\rho^4+(1-\rho^4)=1.
$$

よって全時点で周辺分布は標準正規であり定常である。

また

$$
X_{t+k}=\rho^{2k}X_t+\text{$X_t$ と独立なノイズ}
$$

だから

$$
\mathrm{Cov}(X_t,X_{t+k})=\rho^{2k}.
$$

各分散は1なので

$$
\boxed{
\mathrm{Corr}(X_t,X_{t+k})=\rho^{2k}
}.
$$

#### 5. 全期待値・全分散で確認

Markov構造より

$$
E[X_{t+1}\mid Y_t]=\rho Y_t.
$$

したがって

$$
\begin{aligned}
E[X_{t+1}\mid X_t]
&=E[E[X_{t+1}\mid Y_t]\mid X_t]\\
&=\rho E[Y_t\mid X_t]\\
&=\rho^2X_t.
\end{aligned}
$$

また全分散公式より

$$
\begin{aligned}
\mathrm{Var}(X_{t+1}\mid X_t)
&=E[\mathrm{Var}(X_{t+1}\mid Y_t)\mid X_t]\\
&\quad+\mathrm{Var}(E[X_{t+1}\mid Y_t]\mid X_t)\\
&=(1-\rho^2)+\rho^2(1-\rho^2)\\
&=1-\rho^4.
\end{aligned}
$$

2と一致する。

### 一手

正規Markovモデルの遷移を合成するときは、条件付き密度を積分するより「線形表示 + 独立正規ノイズ」に直すと圧倒的に速い。

---

## 4位: 2013 問2型 正規標本の部分和を条件づける

- 安定ID: `RECON-MVN-R04-2013-Q2`
- 参照: 2013年 問2
- 確度: `third_party_topic_index`
- 確認元: Academaid「2013年統計検定1級＜数理統計問2＞」
- 元主題: 正規分布の条件付き分布と周辺分布
- Level: B
- 目安時間: 25分
- 主な使用技術: 正規分布の和、共分散0と独立、条件付き正規、部分和

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim\mathcal N(\mu,\sigma^2)
$$

に従うとする。部分和を

$$
S_k=\sum_{i=1}^kX_i
$$

とする。

1. $S_n$ と $X_1-S_n/n$ が独立であることを示せ。
2. $X_1\mid S_n=s$ の分布を求めよ。
3. 一般に $S_k\mid S_n=s$ の分布を求めよ。
4. $1\le j\le k\le n$ とするとき、

$$
\mathrm{Cov}(S_j,S_k\mid S_n)
$$

を求めよ。
5. 4の結果を「最終和を固定した正規ランダムウォーク」という観点から説明せよ。

### 解答

#### 1. 独立性

$(S_n,X_1-S_n/n)$ は $X_1,\ldots,X_n$ の線形変換なので同時正規である。よって共分散0を示せば独立である。

$$
\begin{aligned}
\mathrm{Cov}\left(S_n,X_1-\frac{S_n}{n}\right)
&=\mathrm{Cov}(S_n,X_1)-\frac1n\mathrm{Var}(S_n)\\
&=\sigma^2-\frac1n(n\sigma^2)\\
&=0.
\end{aligned}
$$

したがって

$$
\boxed{S_n\perp\left(X_1-\frac{S_n}{n}\right)}.
$$

#### 2. $X_1\mid S_n=s$

1の分解

$$
X_1=\frac{S_n}{n}+\left(X_1-\frac{S_n}{n}\right)
$$

を使う。

条件付き平均は

$$
\boxed{E[X_1\mid S_n=s]=\frac{s}{n}}.
$$

また

$$
\begin{aligned}
\mathrm{Var}\left(X_1-\frac{S_n}{n}\right)
&=\sigma^2+\frac{n\sigma^2}{n^2}-2\frac{\sigma^2}{n}\\
&=\sigma^2\left(1-\frac1n\right).
\end{aligned}
$$

よって

$$
\boxed{
X_1\mid S_n=s
\sim
\mathcal N\left(
\frac{s}{n},
\frac{n-1}{n}\sigma^2
\right)
}.
$$

平均に $\mu$ が残らない点が重要である。総和 $s$ を知った時点で、1個あたりの条件付き平均は対称性から $s/n$ になる。

#### 3. $S_k\mid S_n=s$

$$
E[S_k]=k\mu,
\quad
E[S_n]=n\mu,
$$

$$
\mathrm{Var}(S_k)=k\sigma^2,
\quad
\mathrm{Var}(S_n)=n\sigma^2,
$$

$$
\mathrm{Cov}(S_k,S_n)=k\sigma^2.
$$

2変量正規の条件付き分布公式より

$$
\begin{aligned}
E[S_k\mid S_n=s]
&=k\mu+\frac{k\sigma^2}{n\sigma^2}(s-n\mu)\\
&=\frac{k}{n}s,
\end{aligned}
$$

$$
\begin{aligned}
\mathrm{Var}(S_k\mid S_n)
&=k\sigma^2-\frac{k^2\sigma^4}{n\sigma^2}\\
&=\frac{k(n-k)}{n}\sigma^2.
\end{aligned}
$$

したがって

$$
\boxed{
S_k\mid S_n=s
\sim
\mathcal N\left(
\frac{k}{n}s,
\frac{k(n-k)}{n}\sigma^2
\right)
}.
$$

#### 4. 条件付き共分散

$j\le k$ なら

$$
\mathrm{Cov}(S_j,S_k)=j\sigma^2,
$$

$$
\mathrm{Cov}(S_j,S_n)=j\sigma^2,
\qquad
\mathrm{Cov}(S_k,S_n)=k\sigma^2.
$$

正規ベクトルの条件付き共分散公式より

$$
\begin{aligned}
\mathrm{Cov}(S_j,S_k\mid S_n)
&=j\sigma^2
-\frac{(j\sigma^2)(k\sigma^2)}{n\sigma^2}\\
&=\sigma^2\left(j-\frac{jk}{n}\right).
\end{aligned}
$$

一般形では

$$
\boxed{
\mathrm{Cov}(S_j,S_k\mid S_n)
=\sigma^2\left(
\min(j,k)-\frac{jk}{n}
\right)
}.
$$

#### 5. Gaussian bridgeとしての意味

無条件では $S_k$ は正規ランダムウォークだが、$S_n=s$ を固定すると軌道は最終点 $s$ に「橋渡し」される。

条件付き平均

$$
E[S_k\mid S_n=s]=\frac{k}{n}s
$$

は始点0と終点$s$を結ぶ直線になり、条件付き分散

$$
\frac{k(n-k)}{n}\sigma^2
$$

は両端 $k=0,n$ で0、中間で大きくなる。

### 一手

「正規標本の和を固定する」問題では、部分和と総和の共分散だけ計算すれば、条件付き分布はほぼ自動的に出る。

---

## 5位: 2015 問5型 二値化による相関係数の減衰

- 安定ID: `RECON-MVN-R05-2015-Q5`
- 参照: 2015年 問5
- 確度: `third_party_topic_index`
- 確認元: Academaid「2015年統計検定1級＜統計数理5＞」
- 元主題: 対称性のある相関係数の性質
- Level: B
- 目安時間: 25分
- 主な使用技術: 標本相関、群間平均差、切断正規、二値化、相関の減衰

### 問題

まず標本 $Y_1,\ldots,Y_n$ を2群に分け、第1群の大きさを $n_1$、第2群の大きさを $n_2$、$n=n_1+n_2$ とする。各群平均を $\bar Y_1,\bar Y_2$、全体の不偏標準偏差を $s_Y$ とする。

説明変数 $T_i$ を

$$
T_i=
\begin{cases}
a,&i\le n_1,\\
-a,&i>n_1,
\end{cases}
\qquad a>0
$$

と定める。

1. $(T_i,Y_i)$ の標本相関係数 $r$ を $n_1,n_2,\bar Y_1,\bar Y_2,s_Y$ で表せ。
2. 次に理論モデルとして $(X,Y)$ が標準2変量正規分布に従い、相関係数を $\rho$ とする。

$$
T=
\begin{cases}
a,&X\ge0,\\
-a,&X<0
\end{cases}
$$

とおく。$E[T]$ と $\mathrm{Var}(T)$ を求めよ。
3. $E[Y\mid X\ge0]$ を求めよ。
4. $\mathrm{Corr}(T,Y)$ を求めよ。
5. 二値化後の相関係数を $\xi$ とするとき、元の $\rho$ を $\xi$ から復元する式を求め、この二値化が相関を弱めることを確認せよ。

### 解答

#### 1. 2群データの標本相関

$T$ の標本平均は

$$
\bar T=\frac{a(n_1-n_2)}{n}.
$$

標本分散は

$$
\begin{aligned}
s_T^2
&=\frac{1}{n-1}\sum_{i=1}^n(T_i-\bar T)^2\\
&=\frac{4a^2n_1n_2}{n(n-1)}.
\end{aligned}
$$

標本共分散は

$$
\begin{aligned}
s_{TY}
&=\frac{1}{n-1}\sum_{i=1}^n(T_i-\bar T)(Y_i-\bar Y)\\
&=\frac{2an_1n_2}{n(n-1)}(\bar Y_1-\bar Y_2).
\end{aligned}
$$

したがって

$$
\begin{aligned}
r
&=\frac{s_{TY}}{s_Ts_Y}\\
&=\frac{\sqrt{n_1n_2}(\bar Y_1-\bar Y_2)}{\sqrt{n(n-1)}\,s_Y}.
\end{aligned}
$$

よって

$$
\boxed{
r
=\frac{\sqrt{n_1n_2}(\bar Y_1-\bar Y_2)}{\sqrt{n(n-1)}\,s_Y}
}.
$$

$a$ が消えることがポイントである。二値説明変数のスケールを何倍しても相関係数は変わらない。

#### 2. $T$ の平均と分散

標準正規分布は0対称なので

$$
P(X\ge0)=P(X<0)=\frac12.
$$

したがって

$$
E[T]=a\frac12-a\frac12=0,
$$

$$
E[T^2]=a^2.
$$

よって

$$
\boxed{E[T]=0,\qquad \mathrm{Var}(T)=a^2}.
$$

#### 3. $E[Y\mid X\ge0]$

標準2変量正規では

$$
E[Y\mid X=x]=\rho x.
$$

したがって

$$
E[Y\mid X\ge0]
=\rho E[X\mid X\ge0].
$$

半正規分布の平均

$$
E[X\mid X\ge0]=\sqrt{\frac{2}{\pi}}
$$

を用いて

$$
\boxed{
E[Y\mid X\ge0]
=\rho\sqrt{\frac{2}{\pi}}
}.
$$

対称性より

$$
E[Y\mid X<0]
=-\rho\sqrt{\frac{2}{\pi}}.
$$

#### 4. 二値化後の相関

$E[T]=E[Y]=0$ より

$$
\mathrm{Cov}(T,Y)=E[TY].
$$

条件付き期待値を使うと

$$
\begin{aligned}
E[TY]
&=\frac{a}{2}E[Y\mid X\ge0]
-\frac{a}{2}E[Y\mid X<0]\\
&=a\rho\sqrt{\frac{2}{\pi}}.
\end{aligned}
$$

また

$$
\sqrt{\mathrm{Var}(T)\mathrm{Var}(Y)}=a.
$$

したがって

$$
\boxed{
\mathrm{Corr}(T,Y)
=\sqrt{\frac{2}{\pi}}\,\rho
}.
$$

#### 5. 元の相関の復元と情報損失

二値化後の相関を $\xi$ とすると

$$
\xi=\sqrt{\frac{2}{\pi}}\rho.
$$

よって

$$
\boxed{
\rho=\sqrt{\frac{\pi}{2}}\,\xi
}.
$$

数値的には

$$
\sqrt{\frac{2}{\pi}}\approx0.798.
$$

したがって符号だけに二値化すると、理論上の相関の絶対値は約20%縮む。

### 一手

二値変数と連続変数の相関は、二値変数の標本値を直接総和するより「2群の平均差」に変換すると一気に簡単になる。

---

## 6位: 2017 問4型 線形変換された正規変数の条件付き分布

- 安定ID: `RECON-MVN-R06-2017-Q4`
- 参照: 2017年 問4
- 確度: `third_party_topic_index`
- 確認元: Academaid「2017年統計検定1級＜統計数理4＞」
- 元主題: 正規分布の線形変換と条件付き分布
- Level: C
- 目安時間: 20分
- 主な使用技術: 正規分布の再生性、共分散、相関係数、条件付き正規

### 問題

$X,Y$ は独立に標準正規分布に従うとする。定数 $a,k\in\mathbb R$ に対して

$$
Z=a+kX+Y
$$

とおく。

1. $Z$ の分布を求めよ。
2. $X$ と $Z$ の共分散および相関係数を求めよ。
3. $Z\mid X=x$ の分布を求めよ。
4. $X\mid Z=z$ の分布を求めよ。
5. 

$$
R=X-E[X\mid Z]
$$

とおく。$R$ と $Z$ が独立であることを示し、$\mathrm{Var}(R)$ を求めよ。

### 解答

#### 1. $Z$ の分布

独立正規変数の線形結合なので $Z$ は正規分布に従う。

$$
E[Z]=a,
$$

$$
\mathrm{Var}(Z)=k^2+1.
$$

したがって

$$
\boxed{Z\sim\mathcal N(a,k^2+1)}.
$$

#### 2. 共分散と相関

$$
\begin{aligned}
\mathrm{Cov}(X,Z)
&=\mathrm{Cov}(X,a+kX+Y)\\
&=k\mathrm{Var}(X)+\mathrm{Cov}(X,Y)\\
&=k.
\end{aligned}
$$

よって

$$
\boxed{
\mathrm{Corr}(X,Z)
=\frac{k}{\sqrt{k^2+1}}
}.
$$

#### 3. $Z\mid X=x$

$X=x$ を固定すると

$$
Z=a+kx+Y.
$$

したがって

$$
\boxed{
Z\mid X=x
\sim\mathcal N(a+kx,1)
}.
$$

#### 4. $X\mid Z=z$

$(X,Z)$ は2変量正規で、

$$
E[X]=0,
\quad
E[Z]=a,
$$

$$
\mathrm{Var}(X)=1,
\quad
\mathrm{Var}(Z)=k^2+1,
\quad
\mathrm{Cov}(X,Z)=k.
$$

したがって

$$
E[X\mid Z=z]
=\frac{k}{k^2+1}(z-a),
$$

$$
\mathrm{Var}(X\mid Z)
=1-\frac{k^2}{k^2+1}
=\frac{1}{k^2+1}.
$$

よって

$$
\boxed{
X\mid Z=z
\sim
\mathcal N\left(
\frac{k}{k^2+1}(z-a),
\frac{1}{k^2+1}
\right)
}.
$$

#### 5. 条件付き期待値を引いた残差

$$
R
=X-\frac{k}{k^2+1}(Z-a).
$$

$R$ と $Z$ は $(X,Y)$ の線形変換なので同時正規である。

共分散は

$$
\begin{aligned}
\mathrm{Cov}(R,Z)
&=\mathrm{Cov}(X,Z)
-\frac{k}{k^2+1}\mathrm{Var}(Z)\\
&=k-k=0.
\end{aligned}
$$

よって同時正規性から

$$
\boxed{R\perp Z}.
$$

さらに

$$
\boxed{
\mathrm{Var}(R)
=\mathrm{Var}(X\mid Z)
=\frac{1}{k^2+1}
}.
$$

これは1位の行列版の最小例であり、「条件付き期待値を引くと独立残差が残る」という多変量正規の基本構造を確認できる。

### 一手

2変量正規で $X\mid Z$ を聞かれたら、密度を平方完成するより

$$
E[X\mid Z]
=E[X]+\frac{\mathrm{Cov}(X,Z)}{\mathrm{Var}(Z)}(Z-E[Z])
$$

と

$$
\mathrm{Var}(X\mid Z)
=\mathrm{Var}(X)-\frac{\mathrm{Cov}(X,Z)^2}{\mathrm{Var}(Z)}
$$

を使う方が速い。

---

## 最終チェック用まとめ

| 順位 | まず思い出す公式・発想 |
|---:|---|
| 1 | $\mathrm{Cov}(AX,BX)=A\Sigma B^T$、正規なら無相関$\Leftrightarrow$独立 |
| 2 | 条件付き平均 $\mu_1+\Sigma_{12}\Sigma_{22}^{-1}(x_2-\mu_2)$ |
| 3 | 正規Markov遷移は線形表示にしてノイズを合成 |
| 4 | 正規部分和は共分散だけで条件付き分布が決まる |
| 5 | 二値化した相関は群平均差と切断正規で処理 |
| 6 | 2変量正規は共分散・分散から条件付き平均と分散を即計算 |

## 出典に関する注意

年度・問番号と主題の確認には、Academaidの統計検定1級過去問解説ページを参照した。公式問題文は転載していない。実際の受験演習では、問題文の確認は統計検定公式問題集を優先すること。本ファイルは公開されたテーマ・解説をもとに技法を反復するための独自再構成演習であり、公式過去問の代替ではない。
