# L1-04 回帰診断・一般化最小二乗・正則化

L1-02 では、線形モデル

$$
y=X\beta+\varepsilon
$$

に対して通常最小二乗法を導きました。しかし、回帰係数が計算できたことと、**そのモデルを信用してよいことは別問題**です。

たとえば、残差が説明変数とともに扇形に広がっていれば等分散性が疑われます。説明変数どうしがほとんど同じ動きをしていれば、当てはめ自体はよくても個々の係数は不安定になります。また、1個の観測を外すだけで回帰直線が大きく変わるなら、その観測が推定を強く支配している可能性があります。

本章では

$$
\boxed{
\text{当てはめる}
\longrightarrow
\text{残差と設計を診断する}
\longrightarrow
\text{問題の種類を特定する}
\longrightarrow
\text{推定法・モデルを選び直す}
}
$$

という流れで、回帰診断、一般化最小二乗法（GLS）、多重共線性、変数選択、L1正則化法をつなげます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- ハット行列からレバレッジと残差分散を求める。
- 高レバレッジ点、大残差点、影響点を区別し、Cook距離を計算する。
- 残差プロットから非線形性、不均一分散、系列相関の兆候を読み取る。
- 一般の誤差分散共分散行列の下で GLS 推定量を導出し、白色化との関係を説明する。
- 多重共線性が回帰係数の分散を増やす理由を説明し、VIF を導出する。
- 部分F検定、自由度調整済み決定係数、AIC、BICを用いて候補モデルを比較する。
- L1正則化の目的関数を説明し、直交設計で LASSO の軟閾値解を導く。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 残差分析 | 残差分散、Student化残差、残差プロット |
| 回帰診断法 | レバレッジ、Cook距離、影響点、診断から対処への流れ |
| 一般化最小二乗推定 | GLS、WLS、白色化、OLSとの違い |
| 多重共線性 | VIF、小固有値、係数分散の増大 |
| 変数選択 | 部分F検定、自由度調整済み決定係数、AIC、BIC |
| L1正則化法 | LASSO、標準化、軟閾値解 |

## 前提知識チェック

1. L1-02: $\hat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y$、ハット行列、Gauss--Markovの定理、一般線形仮説。
2. F0-00: 行列積、逆行列、固有値、正定値行列。
3. S1-01: 残差分散の推定、$t$検定と$F$検定の基本。

---

## 1. 回帰は「係数を出した後」が重要

通常最小二乗法の基本モデルを

$$
y=X\beta+\varepsilon,
\qquad E[\varepsilon\mid X]=0,
\qquad \operatorname{Var}(\varepsilon\mid X)=\sigma^2I_n
$$

とします。さらに正規誤差を仮定すれば、有限標本での $t$ 検定や $F$ 検定を正確に構成できます。

ここで仮定ごとの役割を分けておきます。

| 仮定 | 主な役割 | 破れたときの典型的な問題 |
|---|---|---|
| $E[\varepsilon\mid X]=0$ | 係数の不偏性 | 欠落変数、非線形性などで係数自体が系統的にずれる |
| $\operatorname{Var}(\varepsilon\mid X)=\sigma^2I$ | OLSがBLUE、通常の標準誤差 | 不均一分散・相関誤差で効率と標準誤差が崩れる |
| 正規性 | 小標本での厳密な$t,F$推測 | 外れ値への感度、厳密分布の崩れ |
| $X$ が列フルランク | 係数の一意な識別 | 完全共線性では$(X^{\mathsf T}X)^{-1}$が存在しない |

「残差が正規でないから OLS は必ず偏る」のように、仮定の役割を混同しないことが大切です。

## 2. ハット行列と残差の幾何

L1-02 で

$$
H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}
$$

をハット行列と定義しました。当てはめ値は

$$
\hat y=Hy
$$

なので、残差ベクトル $e=y-\hat y$ は

$$
\boxed{e=(I-H)y}
$$

です。

モデル $y=X\beta+\varepsilon$ を代入すると

$$
\begin{aligned}
e
&=(I-H)(X\beta+\varepsilon)\\
&=(I-H)X\beta+(I-H)\varepsilon.
\end{aligned}
$$

$HX=X$ だから $(I-H)X=0$ であり、

$$
\boxed{e=(I-H)\varepsilon}
$$

となります。

### 2.1 残差の分散

$H$ は対称かつ冪等、すなわち

$$
H^{\mathsf T}=H,
\qquad H^2=H
$$

です。したがって

$$
\begin{aligned}
\operatorname{Var}(e\mid X)
&=(I-H)\sigma^2I(I-H)^{\mathsf T}\\
&=\sigma^2(I-H)^2\\
&=\boxed{\sigma^2(I-H)}.
\end{aligned}
$$

対角成分を見ると

$$
\boxed{\operatorname{Var}(e_i\mid X)=\sigma^2(1-h_{ii})}.
$$

残差はすべて同じ分散ではありません。$h_{ii}$ が大きい観測ほど、その点の当てはめ値が自分自身の観測値へ強く引っ張られるため、生の残差 $e_i$ は小さくなりやすいのです。

## 3. レバレッジ、Student化残差、Cook距離

### 3.1 レバレッジ

ハット行列の対角成分

$$
\boxed{h_{ii}}
$$

を観測 $i$ の **レバレッジ** と呼びます。

$X$ の列数を $p$ とすると、$H$ は階数 $p$ の射影行列なので

$$
\sum_{i=1}^n h_{ii}=\operatorname{tr}(H)=p.
$$

したがって平均レバレッジは $p/n$ です。$2p/n$ や $3p/n$ を超える点を確認候補とする経験則がありますが、これは自動的な削除基準ではありません。

### 3.2 内部Student化残差

残差分散推定量を

$$
s^2=\frac{e^{\mathsf T}e}{n-p}
$$

とします。$e_i$ の標準偏差はおよそ $s\sqrt{1-h_{ii}}$ なので、

$$
\boxed{
r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}
}
$$

を内部Student化残差と呼びます。

生の残差をそのまま比較するより、レバレッジによる分散差を補正して比較できます。

### 3.3 高レバレッジ、大残差、影響は別概念

- **高レバレッジ点**: 説明変数空間で他の観測から離れている。
- **大残差点**: 応答方向で回帰面から大きく外れている。
- **影響点**: その観測を除くと係数や当てはめが大きく変化する。

高レバレッジでも回帰面にぴったり乗っていれば残差は小さく、強い影響を持たないことがあります。逆に、大残差でも説明変数空間の中心にあれば係数への影響は限定的なことがあります。

### 3.4 Cook距離

1観測を除いたときの当てはめ全体の変化を測る代表的指標が Cook距離です。通常の線形回帰では

$$
\boxed{
D_i
=\frac{e_i^2}{p s^2}\frac{h_{ii}}{(1-h_{ii})^2}
=\frac{r_i^2}{p}\frac{h_{ii}}{1-h_{ii}}
}
$$

と書けます。

この式から、Cook距離は **残差の大きさとレバレッジの両方**を組み合わせた量だと分かります。

## 4. 残差プロットは何を見ているのか

数値指標だけでなく、残差の並び方からモデルの破れ方を診断します。

### 4.1 残差 vs 当てはめ値

理想的には、0の周囲に特定の形を作らず散らばります。

- 曲線状: 平均構造に非線形項が不足している可能性。
- 扇形: 分散が平均レベルとともに増減する不均一分散の可能性。
- 一部だけ極端: 外れ値・影響点候補。

### 4.2 残差 vs 観測順序

時間順や製造順に残差を並べ、連続して正・負が続くなら誤差の系列相関を疑います。独立性の破れは、時系列データや工程データで特に重要です。

### 4.3 正規Q-Qプロット

誤差の正規性は、主に小標本での厳密な $t,F$ 推測や外れ値感度に関係します。Q-Qプロットで系統的な湾曲や端の大きなずれがあれば、重い裾や歪みを疑います。

診断は「図が少し曲がったから即座にモデルを捨てる」作業ではありません。**どの仮定に関わる形かを切り分け、その原因がデータ誤り、設計、平均構造、分散構造のどれにあるか考える**ことが中心です。

## 5. 数値例: 1点が回帰直線を強く動かす

5点

$$
x=(-2,-1,0,1,2),
\qquad
y=(0,2,2,4,9)
$$

に切片付き単回帰を当てはめます。

設計行列を $X=[\mathbf 1,x]$ とすると

$$
X^{\mathsf T}X=
\begin{bmatrix}
5&0\\
0&10
\end{bmatrix},
\qquad
X^{\mathsf T}y=
\begin{bmatrix}
17\\
20
\end{bmatrix}.
$$

したがって

$$
\hat\beta=
\begin{bmatrix}
3.4\\
2
\end{bmatrix},
\qquad
\hat y=(-0.6,1.4,3.4,5.4,7.4).
$$

残差は

$$
e=(0.6,0.6,-1.4,-1.4,1.6)
$$

で、

$$
\operatorname{RSS}=7.2,
\qquad
s^2=\frac{7.2}{5-2}=2.4.
$$

この設計では

$$
h_{ii}=\frac15+\frac{x_i^2}{\sum_jx_j^2}
$$

なので

$$
h=(0.6,0.3,0.2,0.3,0.6).
$$

最後の点では

$$
r_5=\frac{1.6}{\sqrt{2.4}\sqrt{0.4}}
\approx1.633
$$

であり、Cook距離は

$$
D_5
=\frac{1.633^2}{2}\frac{0.6}{0.4}
=2.00.
$$

最後の点は説明変数空間の端にあり、残差も大きいため、回帰直線への影響が強いことが数値で確認できます。

## 6. 等分散でないときの一般化最小二乗法

誤差の期待値は0だが、分散共分散行列が

$$
\operatorname{Var}(\varepsilon\mid X)=\sigma^2\Omega
$$

であるとします。$\Omega$ は既知の対称正定値行列とします。

このとき OLS

$$
\hat\beta_{\mathrm{OLS}}
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y
$$

は $E[\varepsilon\mid X]=0$ なら依然として不偏ですが、一般には最小分散の線形不偏推定量ではありません。

### 6.1 重み付き二次形式を最小化する

GLSでは

$$
Q(\beta)
=(y-X\beta)^{\mathsf T}\Omega^{-1}(y-X\beta)
$$

を最小化します。

$\Omega^{-1}$ は対称なので

$$
\begin{aligned}
Q(\beta)
&=y^{\mathsf T}\Omega^{-1}y
-2\beta^{\mathsf T}X^{\mathsf T}\Omega^{-1}y\\
&\quad+\beta^{\mathsf T}X^{\mathsf T}\Omega^{-1}X\beta.
\end{aligned}
$$

$\beta$ を $h$ だけ動かしたときの1次項は

$$
2h^{\mathsf T}
\left(
X^{\mathsf T}\Omega^{-1}X\beta
-X^{\mathsf T}\Omega^{-1}y
\right).
$$

これが任意の $h$ に対して0となるため、

$$
X^{\mathsf T}\Omega^{-1}X\hat\beta_G
=X^{\mathsf T}\Omega^{-1}y.
$$

よって

$$
\boxed{
\hat\beta_G
=(X^{\mathsf T}\Omega^{-1}X)^{-1}
X^{\mathsf T}\Omega^{-1}y
}.
$$

### 6.2 GLS推定量の分散

$y=X\beta+\varepsilon$ を代入すると

$$
\hat\beta_G-\beta
=(X^{\mathsf T}\Omega^{-1}X)^{-1}
X^{\mathsf T}\Omega^{-1}\varepsilon.
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(\hat\beta_G\mid X)
&=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}
(\sigma^2\Omega)
\Omega^{-1}X(X^{\mathsf T}\Omega^{-1}X)^{-1}\\
&=\boxed{\sigma^2(X^{\mathsf T}\Omega^{-1}X)^{-1}}.
\end{aligned}
$$

## 7. GLSは「誤差を白くしてからOLS」

$\Omega$ が正定値なので Cholesky 分解

$$
\Omega=LL^{\mathsf T}
$$

ができます。両辺へ $L^{-1}$ を掛け、

$$
y^*=L^{-1}y,
\qquad
X^*=L^{-1}X,
\qquad
\varepsilon^*=L^{-1}\varepsilon
$$

と置きます。

すると

$$
y^*=X^*\beta+\varepsilon^*
$$

であり、

$$
\begin{aligned}
\operatorname{Var}(\varepsilon^*\mid X)
&=L^{-1}(\sigma^2\Omega)L^{-\mathsf T}\\
&=\sigma^2I.
\end{aligned}
$$

したがって変換後のモデルへ OLS を適用すればよく、その推定量は GLS と一致します。

この変換を **白色化** と呼びます。

### 7.1 WLSはGLSの対角版

誤差が独立で

$$
\operatorname{Var}(y_i\mid X)=v_i
$$

が既知なら、精度 $1/v_i$ を重みとして

$$
\sum_{i=1}^n \frac{(y_i-x_i^{\mathsf T}\beta)^2}{v_i}
$$

を最小化します。これが重み付き最小二乗法（WLS）です。

たとえば同じ平均 $\mu$ を3回測定し、

$$
y=(10,12,9),
\qquad
v=(1,4,1)
$$

なら重みは $(1,1/4,1)$ です。したがって

$$
\hat\mu_W
=\frac{10+12/4+9}{1+1/4+1}
=\frac{22}{9/4}
=\boxed{\frac{88}{9}\approx9.78}.
$$

分散の大きい2番目の測定には小さい重みが与えられます。

実務では $\Omega$ 自体が未知で推定することも多く、その場合を実行可能GLSと呼びます。一方、平均構造の係数推定は OLS のままにして、標準誤差だけを不均一分散に頑健化する方法もあります。目的が「効率よく推定すること」なのか「標準誤差を正しく評価すること」なのかを分けて考えます。

## 8. 多重共線性: 当てはまるのに係数が決まらない

説明変数 $X_j$ が他の説明変数のほぼ線形結合になっていると、$X_j$ 独自の変動がほとんど残りません。

完全な線形関係なら $X$ は列フルランクでなくなり、$X^{\mathsf T}X$ は特異です。完全ではないが非常に強い線形関係がある場合、逆行列は存在しても係数分散が大きくなります。

### 8.1 VIFの導出

切片を含む重回帰で、$X_j$ を他の説明変数で回帰した決定係数を $R_j^2$ とします。また

$$
S_{jj}=\sum_{i=1}^n(x_{ij}-\bar x_j)^2
$$

とします。

他変数で説明できなかった $X_j$ の残差平方和は

$$
(1-R_j^2)S_{jj}.
$$

Frisch--Waugh--Lovell の残差化の考え方を使うと、$\hat\beta_j$ はこの「他変数と重ならない部分」を使って推定されるので

$$
\operatorname{Var}(\hat\beta_j\mid X)
=\frac{\sigma^2}{(1-R_j^2)S_{jj}}.
$$

もし $X_j$ が他変数と直交していれば $R_j^2=0$ であり、基準分散は $\sigma^2/S_{jj}$ です。したがって分散倍率は

$$
\boxed{
\operatorname{VIF}_j=\frac1{1-R_j^2}
}.
$$

$R_j^2=0.9$ なら

$$
\operatorname{VIF}_j=10.
$$

これは **分散が10倍**という意味であり、標準誤差は $\sqrt{10}$ 倍です。

### 8.2 不偏性は壊れない

$E[\varepsilon\mid X]=0$ と列フルランクが保たれている限り

$$
E[\hat\beta_{\mathrm{OLS}}\mid X]=\beta
$$

です。したがって強い共線性があっても、それ自体は OLS の不偏性を壊しません。

問題は

$$
\operatorname{Var}(\hat\beta\mid X)=\sigma^2(X^{\mathsf T}X)^{-1}
$$

です。$X^{\mathsf T}X$ に小さい固有値があると、逆行列ではその方向が大きく増幅されます。その結果、

- 係数の標準誤差が大きい。
- 標本を少し変えると係数が大きく変わる。
- 個別$t$検定は弱いのに全体$F$検定は有意、ということが起こる。
- 係数の符号が不安定でも、観測範囲内の予測は比較的安定なことがある。

という現象が起こります。

## 9. 変数選択: 「説明変数を増やせばRSSは下がる」への対処

説明変数を追加すると、OLS の RSS は増えません。したがって RSS だけで候補モデルを選ぶと、常に大きいモデルが有利になります。

### 9.1 入れ子モデルの部分F検定

縮小モデルを $R$、完全モデルを $F$ とし、係数数をそれぞれ $p_R,p_F$、残差平方和を $\operatorname{RSS}_R,\operatorname{RSS}_F$ とします。追加した $q=p_F-p_R$ 個の係数がすべて0という帰無仮説に対して

$$
\boxed{
F
=\frac{(\operatorname{RSS}_R-\operatorname{RSS}_F)/q}
{\operatorname{RSS}_F/(n-p_F)}
}
$$

を使います。

これは「変数を追加して減ったRSS」が、残差ノイズに比べて十分大きいかを見る検定です。

### 9.2 自由度調整済み決定係数

切片を含み、$p$ を切片込みの係数数とすると

$$
\boxed{
\bar R^2
=1-
\frac{\operatorname{RSS}/(n-p)}
{\operatorname{TSS}/(n-1)}
}
$$

です。追加変数による RSS の減少が小さければ、自由度を使った分だけ $\bar R^2$ は下がることがあります。

### 9.3 AICとBIC

正規線形回帰で $\sigma^2$ を最尤推定すると、モデル間比較で共通な定数を除いて

$$
-2\ell(\hat\beta,\hat\sigma^2)
=n\log\frac{\operatorname{RSS}}n+\text{定数}
$$

です。

すべての候補モデルで $\sigma^2$ を1個推定するので、その共通な1母数分の罰則も比較では省略できます。$p$ を回帰係数の個数とすると、比較用の形は

$$
\boxed{
\operatorname{AIC}^*
=n\log\frac{\operatorname{RSS}}n+2p
}
$$

$$
\boxed{
\operatorname{BIC}^*
=n\log\frac{\operatorname{RSS}}n+p\log n
}
$$

です。どちらも小さいモデルを選びます。BIC は $n$ が十分大きいと AIC より強い複雑度罰則を課します。

部分F検定は仮説検定、AIC/BIC は予測・情報量またはモデル同定の観点を含む選択基準であり、目的が同一ではありません。変数を選んだ後に通常の$t$検定を「選択をしていなかったかのように」読むと楽観的になりうる点にも注意します。

## 10. L1正則化法とLASSO

多重共線性が強いとき、あるいは候補変数が多いとき、係数を安定化させるために損失へ罰則を加える方法があります。

LASSOでは、説明変数を中心化・標準化し、切片を罰しない形で

$$
\boxed{
\frac1{2n}\|y-X\beta\|^2
+\lambda\sum_{j=1}^p|\beta_j|
}
$$

を最小化します。$\lambda\ge0$ は罰則の強さです。

- $\lambda=0$: 通常の最小二乗法。
- $\lambda$ を大きくする: 係数を0へ縮める。
- L1罰則: 一部の係数を**厳密に0**へできるため、推定と変数選択を同時に行える。

説明変数の単位が違うままでは、同じ係数値でも実質的な効果量が違うため、L1罰則が公平に働きません。そのため標準化が重要です。

### 10.1 直交設計では軟閾値になる

中心化済みの $y$ と標準化済みの説明変数について

$$
\frac1nX^{\mathsf T}X=I
$$

とします。また

$$
z_j=\frac1n x_j^{\mathsf T}y
$$

と置きます。

目的関数の $\beta_j$ に関する部分は

$$
\frac12\beta_j^2-z_j\beta_j+\lambda|\beta_j|
$$

です。

#### $\beta_j>0$ の場合

$|\beta_j|=\beta_j$ なので微分すると

$$
\beta_j-z_j+\lambda=0,
$$

したがって

$$
\beta_j=z_j-\lambda.
$$

これは $z_j>\lambda$ のときだけ正です。

#### $\beta_j<0$ の場合

$|\beta_j|=-\beta_j$ なので

$$
\beta_j-z_j-\lambda=0,
$$

したがって

$$
\beta_j=z_j+\lambda,
$$

これは $z_j<-\lambda$ のときだけ負です。

#### $\beta_j=0$ の場合

絶対値は0で微分できませんが、0での傾きは $[-1,1]$ の範囲を取ると考えます。0が最適になる条件は

$$
-z_j+\lambda u=0,
\qquad -1\le u\le1,
$$

を満たす $u$ が存在すること、すなわち

$$
|z_j|\le\lambda
$$

です。

3場合をまとめると

$$
\boxed{
\hat\beta_j
=S(z_j,\lambda)
=\operatorname{sign}(z_j)(|z_j|-\lambda)_+
}
$$

となります。これが **軟閾値関数**です。

たとえば

$$
z=(2.4,0.7,-0.3),
\qquad\lambda=0.8
$$

なら

$$
\hat\beta=(1.6,0,0).
$$

LASSO は係数を縮めるため一般には不偏推定量ではありません。代わりに分散を下げ、予測や変数選択を安定化させることを狙います。強く相関した説明変数が複数あると、どの変数を0にするかが標本によって変わりやすいこともあります。

## 11. 診断から対処へ

| 診断 | 典型的な兆候 | 主な検討事項 |
|---|---|---|
| 平均構造の不足 | 残差が曲線状 | 変換、交互作用、非線形項、欠落変数 |
| 不均一分散 | 残差が扇形 | WLS/GLS、分散モデル、頑健標準誤差 |
| 相関誤差 | 残差が時間順に連続 | GLS、時系列・状態空間モデル |
| 多重共線性 | VIF大、係数SE大、符号不安定 | 変数再設計、追加データ、正則化 |
| 影響点 | 高Cook距離 | 入力誤り確認、生成機構確認、感度分析 |
| 過剰な変数 | RSSは低いが汎化が不安 | 部分F、AIC/BIC、LASSO、後続章のCV |

影響点が見つかったときも、機械的に削除するのではなく「記録ミスなのか、正しいが珍しい観測なのか、別の生成機構なのか」を確認します。

---

## 12. 演習

### L1-04-A01 レバレッジとStudent化残差

- Level: A
- 目安時間: 7分
- 主題: 回帰診断
- 使用技術: レバレッジ、残差分散、Student化

切片を含む線形回帰で標本サイズを $n=10$、回帰係数の個数を $p=3$ とする。残差標準偏差が $s=2$、観測 $i$ のレバレッジが $h_{ii}=0.8$、残差が $e_i=2$ であった。

1. レバレッジの平均値を求めよ。
2. 観測 $i$ の内部Student化残差

$$
r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}
$$

を求めよ。
3. この観測について、レバレッジと残差を分けて説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\sum_i h_{ii}=\operatorname{tr}(H)=p$ なので平均は

$$
\frac pn=\frac3{10}=0.3.
$$

Student化残差は

$$
\begin{aligned}
r_i
&=\frac{2}{2\sqrt{1-0.8}}\\
&=\frac1{\sqrt{0.2}}\\
&=\sqrt5\approx2.24.
\end{aligned}
$$

$h_{ii}=0.8$ は平均0.3よりかなり大きく、説明変数空間で特異な位置にある。さらに尺度調整後の残差も約2.24と大きいので、影響度も確認すべき観測である。ただし、この2量だけで削除を決めることはできない。

##### 本番答案

$$
\bar h=p/n=0.3,
\qquad
r_i=\frac2{2\sqrt{0.2}}=\sqrt5\approx2.24.
$$

したがって観測$i$は高レバレッジで、Student化残差も比較的大きい。Cook距離などで影響度を追加確認する。

##### 採点基準

- $\sum h_{ii}=p$ と平均0.3: 6点
- Student化残差の代入と $\sqrt5$: 8点
- レバレッジと残差を区別した解釈: 6点

<!-- solution-end -->

### L1-04-A02 不均一分散の重み付き平均

- Level: A
- 目安時間: 7分
- 主題: WLS
- 使用技術: 逆分散重み

同じ未知平均 $\mu$ を測定した独立な観測が

$$
y=(10,12,9)
$$

で得られ、それぞれの既知分散が

$$
v=(1,4,1)
$$

である。重み $w_i=1/v_i$ を用いる WLS 推定量

$$
\hat\mu_W=\frac{\sum_iw_iy_i}{\sum_iw_i}
$$

を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

重みは

$$
w=(1,1/4,1).
$$

したがって

$$
\sum_iw_iy_i=10+3+9=22,
\qquad
\sum_iw_i=1+\frac14+1=\frac94.
$$

よって

$$
\hat\mu_W
=\frac{22}{9/4}
=\boxed{\frac{88}{9}\approx9.78}.
$$

分散4の観測12は、分散1の観測に比べて4分の1の重みしか持たない。

##### 本番答案

$$
w=(1,1/4,1),
\qquad
\hat\mu_W=\frac{10+12/4+9}{1+1/4+1}=\frac{88}{9}\approx9.78.
$$

##### 採点基準

- 逆分散重みの設定: 6点
- 分子22・分母9/4の計算: 8点
- 推定値と重みの解釈: 6点

<!-- solution-end -->

### L1-04-A03 VIF

- Level: A
- 目安時間: 6分
- 主題: 多重共線性
- 使用技術: VIF

説明変数 $X_j$ を他の説明変数で回帰した決定係数が $R_j^2=0.9$ であった。

1. $\operatorname{VIF}_j=1/(1-R_j^2)$ を求めよ。
2. 共線性がない場合と比べて、$\hat\beta_j$ の分散と標準誤差がそれぞれ何倍になるか答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\operatorname{VIF}_j
=\frac1{1-0.9}=10.
$$

VIF は分散倍率なので分散は10倍、標準誤差はその平方根で

$$
\sqrt{10}\approx3.16
$$

倍である。

##### 本番答案

$$
\operatorname{VIF}_j=10.
$$

したがって係数分散は10倍、標準誤差は $\sqrt{10}\approx3.16$ 倍。

##### 採点基準

- VIF=10: 8点
- 分散10倍: 6点
- 標準誤差$\sqrt{10}$倍: 6点

<!-- solution-end -->

### L1-04-A04 LASSOの軟閾値

- Level: A
- 目安時間: 7分
- 主題: L1正則化
- 使用技術: 軟閾値関数

直交設計の LASSO で

$$
z=(2.4,0.7,-0.3),
\qquad \lambda=0.8
$$

とする。軟閾値関数

$$
S(z,\lambda)=\operatorname{sign}(z)(|z|-\lambda)_+
$$

を用いて各係数を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

第1成分は $2.4>0.8$ なので

$$
S(2.4,0.8)=2.4-0.8=1.6.
$$

第2、第3成分は

$$
|0.7|<0.8,
\qquad |-0.3|<0.8
$$

なので0になる。したがって

$$
\boxed{\hat\beta=(1.6,0,0)}.
$$

##### 本番答案

$$
\hat\beta
=(S(2.4,0.8),S(0.7,0.8),S(-0.3,0.8))
=(1.6,0,0).
$$

##### 採点基準

- 軟閾値の適用: 8点
- 第1成分1.6: 6点
- 第2・第3成分0と判定: 6点

<!-- solution-end -->

### L1-04-B01 残差分散をハット行列から導く

- Level: B
- 目安時間: 12分
- 主題: 残差分析
- 使用技術: 射影行列、分散共分散行列

線形モデル

$$
y=X\beta+\varepsilon,
\qquad E[\varepsilon\mid X]=0,
\qquad \operatorname{Var}(\varepsilon\mid X)=\sigma^2I_n
$$

を考える。$X$ は $n\times p$ の列フルランク行列で、

$$
H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T},
\qquad e=y-Hy
$$

とする。

1. $e=(I-H)\varepsilon$ を示せ。
2. $\operatorname{Var}(e\mid X)=\sigma^2(I-H)$ を導け。
3. $\operatorname{Var}(e_i\mid X)=\sigma^2(1-h_{ii})$ を示し、生残差を単純比較しにくい理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

まず

$$
HX=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}X=X
$$

なので $(I-H)X=0$。したがって

$$
\begin{aligned}
e
&=(I-H)y\\
&=(I-H)(X\beta+\varepsilon)\\
&=(I-H)\varepsilon.
\end{aligned}
$$

次に $H^{\mathsf T}=H$、$H^2=H$ だから

$$
\begin{aligned}
\operatorname{Var}(e\mid X)
&=(I-H)(\sigma^2I)(I-H)^{\mathsf T}\\
&=\sigma^2(I-H)^2\\
&=\sigma^2(I-2H+H^2)\\
&=\boxed{\sigma^2(I-H)}.
\end{aligned}
$$

対角成分より

$$
\boxed{\operatorname{Var}(e_i\mid X)=\sigma^2(1-h_{ii})}.
$$

したがってレバレッジの異なる観測では残差分散も異なる。Student化して尺度をそろえる理由がここにある。

##### 本番答案

$HX=X$ より

$$
e=(I-H)(X\beta+\varepsilon)=(I-H)\varepsilon.
$$

$H$ は対称冪等だから

$$
\operatorname{Var}(e\mid X)
=(I-H)\sigma^2I(I-H)=\sigma^2(I-H),
$$

従って $\operatorname{Var}(e_i\mid X)=\sigma^2(1-h_{ii})$。残差はレバレッジにより分散が異なるためStudent化して比較する。

##### 採点基準

- $HX=X$ と残差表示: 6点
- 対称性・冪等性を使った分散導出: 9点
- 対角成分と解釈: 5点

<!-- solution-end -->

### L1-04-B02 GLSを目的関数から導く

- Level: B
- 目安時間: 15分
- 主題: 一般化最小二乗法
- 使用技術: 二次形式、正規方程式

$$
y=X\beta+\varepsilon,
\qquad E[\varepsilon]=0,
\qquad \operatorname{Var}(\varepsilon)=\sigma^2\Omega
$$

とし、$X$ は列フルランク、$\Omega$ は既知の対称正定値行列とする。

1. $Q(\beta)=(y-X\beta)^{\mathsf T}\Omega^{-1}(y-X\beta)$ を展開せよ。
2. 最小化の1次条件から GLS 推定量を導け。
3. その分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\Omega^{-1}$ は対称なので

$$
Q(\beta)
=y^{\mathsf T}\Omega^{-1}y
-2\beta^{\mathsf T}X^{\mathsf T}\Omega^{-1}y
+\beta^{\mathsf T}X^{\mathsf T}\Omega^{-1}X\beta.
$$

$\beta$ を $h$ だけ変えたとき、$h$ の1次項は

$$
2h^{\mathsf T}
\{X^{\mathsf T}\Omega^{-1}X\beta-X^{\mathsf T}\Omega^{-1}y\}.
$$

任意の $h$ で0だから

$$
X^{\mathsf T}\Omega^{-1}X\hat\beta_G
=X^{\mathsf T}\Omega^{-1}y.
$$

よって

$$
\boxed{
\hat\beta_G
=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}y
}.
$$

さらに

$$
\hat\beta_G-\beta
=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}\varepsilon
$$

だから

$$
\boxed{
\operatorname{Var}(\hat\beta_G)
=\sigma^2(X^{\mathsf T}\Omega^{-1}X)^{-1}
}.
$$

##### 本番答案

目的関数を展開し1次条件を取ると

$$
X^{\mathsf T}\Omega^{-1}X\hat\beta_G=X^{\mathsf T}\Omega^{-1}y,
$$

従って

$$
\hat\beta_G=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}y.
$$

モデルを代入して分散を計算すれば

$$
\operatorname{Var}(\hat\beta_G)=\sigma^2(X^{\mathsf T}\Omega^{-1}X)^{-1}.
$$

##### 採点基準

- 二次形式の展開: 6点
- 正規方程式とGLS推定量: 8点
- 分散導出: 6点

<!-- solution-end -->

### L1-04-B03 2説明変数の共線性

- Level: B
- 目安時間: 12分
- 主題: 多重共線性
- 使用技術: 2×2逆行列、VIF

2つの説明変数は中心化・標準化されており、

$$
\frac1nX^{\mathsf T}X=
\begin{bmatrix}
1&\rho\\
\rho&1
\end{bmatrix},
\qquad |\rho|<1
$$

とする。誤差分散を $\sigma^2$ とする。

1. $(X^{\mathsf T}X)^{-1}$ を求めよ。
2. 各回帰係数の分散が $\rho=0$ の場合の何倍になるか示せ。
3. $\rho=0.95$ のとき分散倍率と標準誤差倍率を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
X^{\mathsf T}X
=n
\begin{bmatrix}
1&\rho\\
\rho&1
\end{bmatrix}.
$$

2×2逆行列より

$$
(X^{\mathsf T}X)^{-1}
=\frac1{n(1-\rho^2)}
\begin{bmatrix}
1&-\rho\\
-\rho&1
\end{bmatrix}.
$$

したがって各係数の分散は

$$
\frac{\sigma^2}{n(1-\rho^2)}.
$$

$\rho=0$ のときは $\sigma^2/n$ なので倍率は

$$
\boxed{\frac1{1-\rho^2}}.
$$

$\rho=0.95$ では

$$
\frac1{1-0.95^2}
=\frac1{0.0975}
\approx10.26.
$$

標準誤差倍率は

$$
\sqrt{10.26}\approx3.20.
$$

##### 本番答案

$$
(X^{\mathsf T}X)^{-1}
=\frac1{n(1-\rho^2)}
\begin{bmatrix}1&-\rho\\-\rho&1\end{bmatrix}.
$$

よって分散倍率は $1/(1-\rho^2)$。$\rho=.95$ なら約10.26倍、標準誤差は約3.20倍。

##### 採点基準

- 逆行列: 8点
- 分散倍率の導出: 6点
- 数値計算とSE倍率: 6点

<!-- solution-end -->

### L1-04-B04 軟閾値解の導出

- Level: B
- 目安時間: 15分
- 主題: L1正則化
- 使用技術: 場合分け、劣微分

中心化済み応答 $y$ と標準化済み設計行列 $X$ が

$$
X^{\mathsf T}X/n=I
$$

を満たす。LASSO の目的関数を

$$
L(\beta)=\frac1{2n}\|y-X\beta\|^2+\lambda\sum_j|\beta_j|
$$

とし、$z_j=x_j^{\mathsf T}y/n$ と置く。

1. $\beta_j$ に依存する部分が $\beta_j^2/2-z_j\beta_j+\lambda|\beta_j|$ となることを示せ。
2. $\beta_j>0$、$\beta_j<0$、$\beta_j=0$ に分け、最適解を導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

二乗項を展開すると

$$
\frac1{2n}(y^{\mathsf T}y-2\beta^{\mathsf T}X^{\mathsf T}y+\beta^{\mathsf T}X^{\mathsf T}X\beta).
$$

$X^{\mathsf T}X/n=I$ と $z=X^{\mathsf T}y/n$ より、$\beta_j$ に関する部分は

$$
\frac12\beta_j^2-z_j\beta_j+\lambda|\beta_j|.
$$

$\beta_j>0$ では微分が

$$
\beta_j-z_j+\lambda
$$

だから $\beta_j=z_j-\lambda$。正であるには $z_j>\lambda$ が必要。

$\beta_j<0$ では

$$
\beta_j-z_j-\lambda=0
$$

より $\beta_j=z_j+\lambda$。負であるには $z_j<-\lambda$ が必要。

$\beta_j=0$ では $|\beta_j|$ の劣微分が $[-1,1]$ なので、

$$
0\in -z_j+\lambda[-1,1]
$$

すなわち $|z_j|\le\lambda$ のとき0が最適。

従って

$$
\boxed{
\hat\beta_j
=\operatorname{sign}(z_j)(|z_j|-\lambda)_+
}.
$$

##### 本番答案

直交条件から目的関数は座標ごとに

$$
\frac12\beta_j^2-z_j\beta_j+\lambda|\beta_j|
$$

へ分離する。正・負・0で場合分けすると

$$
\hat\beta_j=
\begin{cases}
z_j-\lambda,&z_j>\lambda,\\
0,&|z_j|\le\lambda,\\
z_j+\lambda,&z_j<-\lambda,
\end{cases}
$$

すなわち軟閾値解を得る。

##### 採点基準

- 二乗項展開と座標分離: 6点
- 正・負の場合: 7点
- 0の条件と軟閾値のまとめ: 7点

<!-- solution-end -->

### L1-04-C01 レバレッジとCook距離を一通り計算する

- Level: C
- 目安時間: 25分
- 主題: 回帰診断
- 使用技術: OLS、ハット値、Student化残差、Cook距離

5観測

$$
x=(-2,-1,0,1,2),
\qquad y=(0,2,2,4,9)
$$

に切片付き単回帰 $y_i=\beta_0+\beta_1x_i+\varepsilon_i$ を当てはめる。

1. $\hat\beta_0,\hat\beta_1$ を求めよ。
2. 当てはめ値、残差、RSS、$s^2=\operatorname{RSS}/3$ を求めよ。
3. $h_{ii}=1/5+x_i^2/10$ を用いて各レバレッジを求めよ。
4. 各内部Student化残差を求めよ。
5. $p=2$ として Cook距離

$$
D_i=\frac{r_i^2}{p}\frac{h_{ii}}{1-h_{ii}}
$$

を求め、最も影響の大きい観測を答えよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\bar x=0$ なので

$$
\hat\beta_1
=\frac{\sum x_iy_i}{\sum x_i^2}
=\frac{20}{10}=2,
$$

$$
\hat\beta_0=\bar y=\frac{17}{5}=3.4.
$$

したがって

$$
\hat y=(-0.6,1.4,3.4,5.4,7.4),
$$

$$
e=(0.6,0.6,-1.4,-1.4,1.6).
$$

よって

$$
\operatorname{RSS}
=0.6^2+0.6^2+1.4^2+1.4^2+1.6^2
=7.2,
$$

$$
s^2=7.2/3=2.4.
$$

レバレッジは

$$
h=(0.6,0.3,0.2,0.3,0.6).
$$

Student化残差は

$$
r_i=\frac{e_i}{\sqrt{2.4}\sqrt{1-h_{ii}}}
$$

より、順に

$$
r\approx(0.612,0.463,-1.010,-1.080,1.633).
$$

Cook距離は

$$
D\approx(0.281,0.0459,0.1276,0.250,2.000).
$$

したがって第5観測が最も大きな影響を持つ。第5観測は $h_{55}=0.6$ と高レバレッジで、かつStudent化残差も最大であり、両者が組み合わさってCook距離が大きくなっている。

##### 本番答案

$$
(\hat\beta_0,\hat\beta_1)=(3.4,2),
$$

$$
e=(0.6,0.6,-1.4,-1.4,1.6),
\quad \operatorname{RSS}=7.2,
\quad s^2=2.4.
$$

$$
h=(.6,.3,.2,.3,.6),
$$

$$
r\approx(.612,.463,-1.010,-1.080,1.633),
$$

$$
D\approx(.281,.0459,.1276,.250,2.000).
$$

最大は第5観測で、高レバレッジと大きい残差が同時にあるため影響が大きい。

##### 採点基準

- 回帰係数: 4点
- 残差・RSS・$s^2$: 4点
- レバレッジ: 4点
- Student化残差: 4点
- Cook距離と解釈: 4点

<!-- solution-end -->

### L1-04-C02 WLSを行列で計算する

- Level: C
- 目安時間: 22分
- 主題: GLS/WLS
- 使用技術: 重み付き正規方程式、2×2逆行列

3観測

$$
(x_i,y_i)=(0,1),(1,2),(2,5)
$$

に切片付き直線 $y_i=\beta_0+\beta_1x_i+\varepsilon_i$ を当てはめる。誤差は独立で

$$
\operatorname{Var}(\varepsilon)=\sigma^2\Omega,
\qquad
\Omega=\operatorname{diag}(1,2,1)
$$

とする。

1. $W=\Omega^{-1}$ を求めよ。
2. $X^{\mathsf T}WX$ と $X^{\mathsf T}Wy$ を計算せよ。
3. $\hat\beta_G=(X^{\mathsf T}WX)^{-1}X^{\mathsf T}Wy$ を求めよ。
4. $\operatorname{Var}(\hat\beta_G)/\sigma^2$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
W=\operatorname{diag}(1,1/2,1).
$$

設計行列は

$$
X=
\begin{bmatrix}
1&0\\
1&1\\
1&2
\end{bmatrix}.
$$

各行へ重みを掛けて積を作ると

$$
X^{\mathsf T}WX
=
\begin{bmatrix}
2.5&2.5\\
2.5&4.5
\end{bmatrix},
$$

$$
X^{\mathsf T}Wy
=
\begin{bmatrix}
7\\
11
\end{bmatrix}.
$$

行列式は

$$
2.5\cdot4.5-2.5^2=5
$$

なので

$$
(X^{\mathsf T}WX)^{-1}
=\frac15
\begin{bmatrix}
4.5&-2.5\\
-2.5&2.5
\end{bmatrix}
=
\begin{bmatrix}
0.9&-0.5\\
-0.5&0.5
\end{bmatrix}.
$$

従って

$$
\hat\beta_G
=
\begin{bmatrix}
0.9&-0.5\\
-0.5&0.5
\end{bmatrix}
\begin{bmatrix}7\\11\end{bmatrix}
=
\boxed{\begin{bmatrix}0.8\\2.0\end{bmatrix}}.
$$

また

$$
\boxed{
\frac{\operatorname{Var}(\hat\beta_G)}{\sigma^2}
=
\begin{bmatrix}
0.9&-0.5\\
-0.5&0.5
\end{bmatrix}
}.
$$

##### 本番答案

$$
W=\operatorname{diag}(1,1/2,1),
$$

$$
X^{\mathsf T}WX=
\begin{bmatrix}2.5&2.5\\2.5&4.5\end{bmatrix},
\quad
X^{\mathsf T}Wy=
\begin{bmatrix}7\\11\end{bmatrix}.
$$

逆行列は

$$
\begin{bmatrix}.9&-.5\\-.5&.5\end{bmatrix}
$$

なので

$$
\hat\beta_G=(0.8,2.0)^{\mathsf T},
\quad
\operatorname{Var}(\hat\beta_G)=
\sigma^2
\begin{bmatrix}.9&-.5\\-.5&.5\end{bmatrix}.
$$

##### 採点基準

- $W$ と設計行列: 3点
- $X^{\mathsf T}WX$: 5点
- $X^{\mathsf T}Wy$ と逆行列: 5点
- 推定値: 4点
- 分散共分散行列: 3点

<!-- solution-end -->

### L1-04-C03 部分F・AIC・BICでモデル選択を比較する

- Level: C
- 目安時間: 25分
- 主題: 変数選択
- 使用技術: 部分F検定、AIC、BIC

標本サイズ $n=30$ の正規線形回帰で、切片込み係数数 $p_R=2$ の縮小モデルと $p_F=4$ の完全モデルを比較する。残差平方和は

$$
\operatorname{RSS}_R=100,
\qquad
\operatorname{RSS}_F=85
$$

である。

1. 追加2係数を同時に0とする部分F統計量を求めよ。
2. 比較用指標

$$
\operatorname{AIC}^*=n\log(\operatorname{RSS}/n)+2p,
$$

$$
\operatorname{BIC}^*=n\log(\operatorname{RSS}/n)+p\log n
$$

を両モデルについて求め、どちらを選ぶか答えよ。
3. AICとBICの結論が一致しなくても矛盾ではない理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

追加係数数は

$$
q=p_F-p_R=2.
$$

したがって

$$
\begin{aligned}
F
&=\frac{(100-85)/2}{85/(30-4)}\\
&=\frac{7.5}{85/26}\\
&\approx\boxed{2.294}.
\end{aligned}
$$

AIC は

$$
\operatorname{AIC}_R^*
=30\log(100/30)+4
\approx40.119,
$$

$$
\operatorname{AIC}_F^*
=30\log(85/30)+8
\approx39.244.
$$

小さい完全モデル側を AIC は選ぶ。

BIC は

$$
\operatorname{BIC}_R^*
=30\log(100/30)+2\log30
\approx42.922,
$$

$$
\operatorname{BIC}_F^*
=30\log(85/30)+4\log30
\approx44.848.
$$

小さい縮小モデル側を BIC は選ぶ。

AIC と BIC は複雑度への罰則が異なる。特に BIC の1係数あたりの罰則 $\log n$ は本問では $\log30\approx3.40$ で、AIC の2より大きい。したがって、追加変数によるRSS減少が中程度なら結論が分かれうる。

##### 本番答案

$$
F=\frac{15/2}{85/26}\approx2.294.
$$

$$
(AIC_R^*,AIC_F^*)\approx(40.119,39.244)
$$

より AIC は完全モデル、

$$
(BIC_R^*,BIC_F^*)\approx(42.922,44.848)
$$

より BIC は縮小モデルを選ぶ。BIC は1係数あたり $\log30>2$ の罰則を課すため、AICより小さいモデルを選びやすい。

##### 採点基準

- 部分F統計量: 6点
- AIC計算と選択: 5点
- BIC計算と選択: 5点
- 結論差の説明: 4点

<!-- solution-end -->

### L1-04-C04 診断結果から対処を選ぶ

- Level: C
- 目安時間: 20分
- 主題: 回帰診断の統合
- 使用技術: 仮定の切り分け、対処法選択

ある重回帰モデルについて次の4つの状況が別々に観測された。それぞれについて、主に疑うべき問題と、最初に検討すべき対処を説明せよ。

1. 残差 vs 当てはめ値が明瞭なU字型になった。
2. 当てはめ値が大きくなるほど残差の散らばりが広がった。
3. VIFは15以上だが、全体F検定は強く有意で、個別$t$検定はほとんど有意でない。
4. 1観測だけ Cook距離が極端に大きい。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. U字型は平均構造が線形では表現し切れていない兆候である。二次項、変数変換、交互作用、欠落変数などを検討する。
2. 扇形は不均一分散の兆候である。分散構造が分かるなら WLS/GLS、未知なら分散モデルや頑健標準誤差などを検討する。
3. 強い多重共線性が疑われる。説明変数群としては応答を説明できても、個々の効果の分離が不安定な状態である。変数の意味を整理し、追加データ、変数再設計、正則化などを目的に応じて検討する。
4. 影響点候補である。まず入力ミスか、正しいが珍しい観測か、別の生成機構かを確認し、その点を含む/除く感度分析を行う。Cook距離が大きいという理由だけで自動削除しない。

##### 本番答案

1. U字型 → 平均構造の非線形性。二次項・変換等を検討。
2. 扇形 → 不均一分散。WLS/GLSまたは頑健な分散評価を検討。
3. VIF大・全体F有意・個別t弱い → 多重共線性。変数再設計・追加データ・正則化等。
4. Cook距離大 → 影響点候補。データ妥当性と生成機構を確認し感度分析。機械的削除はしない。

##### 採点基準

- U字型の診断と対処: 5点
- 扇形の診断と対処: 5点
- 共線性の診断と説明: 5点
- 影響点の適切な扱い: 5点

<!-- solution-end -->

### L1-04-D01 回帰モデルの総合監査

- Level: D
- 目安時間: 35分
- 主題: 回帰診断・GLS・多重共線性・正則化
- 使用技術: 残差分散、VIF、GLS、LASSO

切片込み $p=3$、標本サイズ $n=20$ の重回帰を考える。ある観測 $i$ について

$$
h_{ii}=0.7,
\qquad e_i=3,
\qquad s=2
$$

である。また説明変数 $X_2$ を他の説明変数で回帰したとき $R_2^2=0.96$ であった。

さらに、誤差共分散が $\sigma^2\Omega$ で既知とし、正定値行列 $\Omega$ の Cholesky 分解を $\Omega=LL^{\mathsf T}$ とする。最後に、標準化後の直交設計で $z=(1.8,0.5)$、$\lambda=0.7$ とする。

1. 観測 $i$ の内部Student化残差を求め、平均レバレッジと比較せよ。
2. $X_2$ の VIF と標準誤差倍率を求めよ。
3. GLS の白色化変換を $L$ を用いて書き、変換後誤差の分散を示せ。
4. LASSO の2係数を求めよ。
5. この結果から「観測の影響」「係数の不安定性」「誤差分散構造」「変数選択」を同じ問題として混同してはいけない理由を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

平均レバレッジは

$$
p/n=3/20=0.15.
$$

Student化残差は

$$
r_i=\frac3{2\sqrt{1-0.7}}
=\frac3{2\sqrt{0.3}}
\approx2.74.
$$

$h_{ii}=0.7$ は平均0.15を大きく上回り、残差も大きいため影響度を確認すべきである。

VIF は

$$
\operatorname{VIF}_2
=\frac1{1-0.96}=25.
$$

標準誤差倍率は

$$
\sqrt{25}=5.
$$

白色化は

$$
y^*=L^{-1}y,
\quad X^*=L^{-1}X,
\quad \varepsilon^*=L^{-1}\varepsilon.
$$

このとき

$$
\begin{aligned}
\operatorname{Var}(\varepsilon^*)
&=L^{-1}(\sigma^2LL^{\mathsf T})L^{-\mathsf T}\\
&=\sigma^2I.
\end{aligned}
$$

LASSO は軟閾値より

$$
S(1.8,0.7)=1.1,
\qquad
S(0.5,0.7)=0,
$$

よって

$$
\hat\beta=(1.1,0).
$$

各診断の対象は異なる。レバレッジとCook距離は観測単位の影響、多重共線性は設計行列における係数識別の不安定性、GLSは誤差の分散共分散構造、LASSOはバイアスを許して係数を縮める推定・選択の問題を扱う。したがって、たとえばVIFが高いからGLSを行う、Cook距離が高いからLASSOを使う、という直接対応にはならない。

##### 本番答案

$$
\bar h=0.15,
\qquad
r_i=\frac3{2\sqrt{0.3}}\approx2.74,
$$

より高レバレッジかつ大残差。

$$
VIF_2=25,
\qquad SE倍率=5.
$$

$\Omega=LL^{\mathsf T}$ として

$$
y^*=L^{-1}y,
\quad X^*=L^{-1}X,
\quad Var(L^{-1}\varepsilon)=\sigma^2I.
$$

LASSO は

$$
(S(1.8,.7),S(.5,.7))=(1.1,0).
$$

影響点、共線性、誤差共分散、正則化は診断対象が異なるため、原因と対処を一対一に混同しない。

##### 採点基準

- レバレッジ・Student化残差: 5点
- VIF・SE倍率: 4点
- GLS白色化: 5点
- LASSO: 3点
- 4論点の切り分け: 3点

<!-- solution-end -->

## 13. 本番ドリル

### L1-04-DRILL-01 回帰診断から推定法選択まで

- Level: C
- 目安時間: 30分
- 主題: 回帰診断・GLS・VIF・変数選択
- 使用技術: 公式範囲横断

ある線形回帰で $n=40$、切片込み係数数 $p=5$ とする。観測 $i$ について $h_{ii}=0.5$、$e_i=2.4$、$s=1.5$ である。説明変数 $X_3$ を他の説明変数で回帰した決定係数は $R_3^2=0.8$ である。

別途、縮小モデルと完全モデルの係数数・RSSが

$$
(p_R,RSS_R)=(3,120),
\qquad
(p_F,RSS_F)=(5,100)
$$

であった。また誤差共分散が $\sigma^2\Omega$ で既知とする。

1. 観測 $i$ の内部Student化残差を求めよ。
2. $X_3$ の VIF と標準誤差倍率を求めよ。
3. 追加2係数について部分F統計量を求めよ。
4. GLS 推定量を式で書き、OLSと異なる重みが入る場所を示せ。
5. 高レバレッジ、共線性、不均一分散はそれぞれ何を表す問題か、1文ずつ説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

Student化残差は

$$
r_i
=\frac{2.4}{1.5\sqrt{1-0.5}}
=\frac{1.6}{\sqrt{0.5}}
\approx2.263.
$$

VIF は

$$
\frac1{1-0.8}=5,
$$

標準誤差倍率は $\sqrt5\approx2.236$。

部分Fは、$q=5-3=2$、完全モデル残差自由度 $40-5=35$ だから

$$
\begin{aligned}
F
&=\frac{(120-100)/2}{100/35}\\
&=\frac{10}{20/7}\\
&=\boxed{3.5}.
\end{aligned}
$$

GLS は

$$
\boxed{
\hat\beta_G
=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}y
}.
$$

OLS の $X^{\mathsf T}X$ と $X^{\mathsf T}y$ に対し、GLS では $\Omega^{-1}$ が観測方向の重みとして両方に入る。

最後に、

- 高レバレッジ: ある観測の説明変数位置が特異である問題。
- 共線性: 説明変数どうしが似すぎて個別係数を分離しにくい問題。
- 不均一分散: 観測ごとに誤差のばらつきが異なる問題。

である。

##### 本番答案

$$
r_i=\frac{2.4}{1.5\sqrt{0.5}}\approx2.263.
$$

$$
VIF_3=5,
\qquad SE倍率=\sqrt5\approx2.236.
$$

$$
F=\frac{20/2}{100/35}=3.5.
$$

$$
\hat\beta_G=(X^{\mathsf T}\Omega^{-1}X)^{-1}X^{\mathsf T}\Omega^{-1}y.
$$

高レバレッジは観測位置、共線性は説明変数間の識別、不均一分散は誤差分散の問題であり、別々に診断する。

##### 採点基準

- Student化残差: 4点
- VIF・SE倍率: 4点
- 部分F: 5点
- GLS式と重みの説明: 4点
- 3問題の区別: 3点

<!-- solution-end -->

## 14. 過去問・理工80との対応

- [Standard 38 多重共線性・分散拡大係数・回帰診断](../../../../applied-rikou-80/standard/38_multicollinearity_diagnostics.md): VIF、高レバレッジ、大残差、影響点、個別$t$と全体$F$の違い。
- [Standard 39 一般化最小二乗法](../../../../applied-rikou-80/standard/39_gls.md): GLS推定量、分散、白色化、OLSとの比較。
- L1正則化と変数選択は本章で基礎を担当し、クロスバリデーションなど予測性能に基づくモデル選択は L2-02 へ接続する。

## 15. 章末チェック

- $e=(I-H)y$ から残差分散を導ける。
- レバレッジ、大残差、影響点を同義語として扱わず説明できる。
- Cook距離が残差とレバレッジの両方を使う理由を説明できる。
- GLS推定量を重み付き二次形式から導き、白色化で説明できる。
- VIF $=1/(1-R_j^2)$ を係数分散と結び付けて説明できる。
- 部分F、自由度調整済み$R^2$、AIC、BICの目的差を説明できる。
- 直交設計のLASSOで軟閾値解を導出できる。
- 診断結果に対して、原因の種類を確認してから対処法を選べる。
