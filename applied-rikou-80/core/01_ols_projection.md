# Core 01 工程校正の重回帰・残差・leverage・予測

- 安定ID: `RIKOU-CORE-01`
- 80大問 No.: 31
- 演習価値: S
- 難度: B
- 目安時間: 25分
- 位置付け: 行列による通常最小二乗法を、理工学午後問題で使う「推定・診断・予測」の道具として扱う

## 問題

ある加工装置について、製品寸法の基準値からのずれ $y_i$ を、中心化した送り速度 $x_{i1}$ と中心化した温度 $x_{i2}$ で説明する校正実験を行った。6回の実験について

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_6(0,\sigma^2I_6),
$$

$$
\beta=
\begin{pmatrix}
\beta_0\\
\beta_1\\
\beta_2
\end{pmatrix}
$$

とする。$X$ の第1列はすべて1で、第2・第3列はそれぞれ $x_{i1},x_{i2}$ である。

この実験では

$$
(X^\top X)^{-1}
=
\begin{pmatrix}
1/6&0&0\\
0&1/4&0\\
0&0&1/4
\end{pmatrix},
\qquad
X^\top y=
\begin{pmatrix}
6\\8\\-4
\end{pmatrix},
$$

$$
y^\top y=30
$$

が得られた。

1. 残差平方和

$$
Q(\beta)=(y-X\beta)^\top(y-X\beta)
$$

を最小化して正規方程式を導き、最小二乗推定量 $\widehat\beta$ を求めよ。各係数を加工条件との関係として解釈せよ。
2. fitted value を $\widehat y=Hy$、残差を $e=y-\widehat y$ と書く。$H$ を求める一般式を示し、正規方程式から

$$
X^\top e=0
$$

を導け。この式を「残差と説明変数の直交」という言葉で説明せよ。
3. 誤差平方和を

$$
S_e=e^\top e
$$

とする。

$$
S_e=y^\top y-\widehat\beta^\top X^\top y
$$

を用いて $S_e$ と不偏分散推定量

$$
s^2=\frac{S_e}{n-p}
$$

を求めよ。ただし $n=6,p=3$ とする。

さらに各観測の leverage $h_{ii}$ が

$$
(0.45,\ 0.42,\ 0.38,\ 0.85,\ 0.48,\ 0.42)
$$

で、第4観測の残差が $e_4=1.0$ であった。標準化残差

$$
r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}
$$

を用いて $r_4$ を求め、第4観測を診断せよ。
4. 新しい加工条件

$$
x_0=
\begin{pmatrix}
1\\0.5\\-0.5
\end{pmatrix}
$$

での平均応答の推定値 $\widehat y_0=x_0^\top\widehat\beta$ を求めよ。また

$$
h_0=x_0^\top(X^\top X)^{-1}x_0
$$

を計算し、平均応答の推定誤差分散 $s^2h_0$ と、新しい1個の製品を予測するときの予測誤差分散 $s^2(1+h_0)$ を求めよ。両者が異なる理由を説明せよ。
5. 正規誤差の仮定の下で $\widehat\beta$ の分布を求めよ。この分布が係数の区間推定や線形対比へどうつながるかを簡潔に述べよ。

## 詳細解答

### 1. 正規方程式・係数推定・解釈

残差平方和を展開する。

$$
\begin{aligned}
Q(\beta)
&=(y-X\beta)^\top(y-X\beta)\\
&=y^\top y-y^\top X\beta-\beta^\top X^\top y
+\beta^\top X^\top X\beta.
\end{aligned}
$$

$y^\top X\beta$ はスカラーなので

$$
y^\top X\beta=\beta^\top X^\top y.
$$

したがって

$$
Q(\beta)
=y^\top y-2\beta^\top X^\top y
+\beta^\top X^\top X\beta.
$$

$\beta$ を微小ベクトル $h$ だけ動かすと

$$
\begin{aligned}
Q(\beta+h)-Q(\beta)
&=-2h^\top X^\top(y-X\beta)
+h^\top X^\top Xh.
\end{aligned}
$$

最小点では任意の方向 $h$ に対する1次の変化が0なので

$$
X^\top(y-X\widehat\beta)=0.
$$

よって正規方程式は

$$
\boxed{
X^\top X\widehat\beta=X^\top y
}.
$$

$X$ は列フルランクだから

$$
\boxed{
\widehat\beta=(X^\top X)^{-1}X^\top y
}.
$$

与えられた数値を代入すると

$$
\begin{aligned}
\widehat\beta
&=
\begin{pmatrix}
1/6&0&0\\
0&1/4&0\\
0&0&1/4
\end{pmatrix}
\begin{pmatrix}
6\\8\\-4
\end{pmatrix}\\
&=
\boxed{
\begin{pmatrix}
1\\2\\-1
\end{pmatrix}
}.
\end{aligned}
$$

説明変数は中心化されているので

- $\widehat\beta_0=1$: 送り速度・温度が基準条件のとき、寸法ずれの平均は1。
- $\widehat\beta_1=2$: 温度を固定すると、送り速度を中心化単位で1増やすと寸法ずれは平均2増える。
- $\widehat\beta_2=-1$: 送り速度を固定すると、温度を中心化単位で1増やすと寸法ずれは平均1減る。

という解釈になる。

### 2. fitted value・残差・直交性

最小二乗推定量を $X$ へ戻すと

$$
\begin{aligned}
\widehat y
&=X\widehat\beta\\
&=X(X^\top X)^{-1}X^\top y.
\end{aligned}
$$

したがって

$$
\boxed{
H=X(X^\top X)^{-1}X^\top
}
$$

と置けば $\widehat y=Hy$ である。

残差は

$$
e=y-X\widehat\beta.
$$

正規方程式

$$
X^\top(y-X\widehat\beta)=0
$$

から直接

$$
\boxed{X^\top e=0}
$$

を得る。

これは、残差ベクトル $e$ が $X$ の各列と内積0、すなわち説明変数が張る空間に直交していることを意味する。

午後問題で重要なのは、$H$ の冪等性を証明すること自体より、**通常最小二乗法が説明変数で説明できる成分 $Hy$ と、説明できず直交方向へ残る成分 $e$ にデータを分けている**と理解することである。

### 3. 誤差平方和・誤差分散・第4観測の診断

最小二乗解では

$$
S_e=y^\top y-\widehat\beta^\top X^\top y.
$$

まず

$$
\begin{aligned}
\widehat\beta^\top X^\top y
&=(1,2,-1)
\begin{pmatrix}
6\\8\\-4
\end{pmatrix}\\
&=6+16+4\\
&=26.
\end{aligned}
$$

したがって

$$
\boxed{S_e=30-26=4}.
$$

$n-p=6-3=3$ なので

$$
\boxed{
s^2=\frac43
}.
$$

よって

$$
s=\sqrt{\frac43}.
$$

第4観測では $h_{44}=0.85$、$e_4=1$ だから

$$
\begin{aligned}
r_4
&=\frac{1}{\sqrt{4/3}\sqrt{1-0.85}}\\
&=\frac{1}{\sqrt{(4/3)(0.15)}}\\
&=\frac{1}{\sqrt{0.2}}\\
&=\boxed{\sqrt5\approx2.24}.
\end{aligned}
$$

また平均 leverage は

$$
\frac{p}{n}=\frac36=0.5.
$$

第4観測の $h_{44}=0.85$ は平均よりかなり大きく、説明変数空間で他の観測から離れた条件にある。

さらに標準化残差の絶対値も約2.24と大きい。したがって第4観測は

- 高 leverage
- 残差も比較的大きい

ため、**回帰係数へ強い影響を与える可能性がある観測として要確認**である。

ただし leverage と標準化残差だけで機械的に除外してはいけない。測定ミス、特殊工程条件、モデル不足など原因を工学的に確認する。

### 4. 新しい加工条件での予測

まず平均応答の推定値は

$$
\begin{aligned}
\widehat y_0
&=x_0^\top\widehat\beta\\
&=(1,0.5,-0.5)
\begin{pmatrix}
1\\2\\-1
\end{pmatrix}\\
&=1+1+0.5\\
&=\boxed{2.5}.
\end{aligned}
$$

次に

$$
\begin{aligned}
h_0
&=x_0^\top(X^\top X)^{-1}x_0\\
&=\frac16(1)^2
+\frac14(0.5)^2
+\frac14(-0.5)^2\\
&=\frac16+\frac1{16}+\frac1{16}\\
&=\boxed{\frac7{24}}.
\end{aligned}
$$

平均応答 $E[Y_0\mid x_0]$ の推定誤差分散は

$$
\begin{aligned}
s^2h_0
&=\frac43\cdot\frac7{24}\\
&=\boxed{\frac7{18}}.
\end{aligned}
$$

一方、新しく製造する1個の製品

$$
Y_0=x_0^\top\beta+\varepsilon_0
$$

を予測すると、係数推定の不確実性に加えて新しい個体の誤差 $\varepsilon_0$ も加わる。

したがって予測誤差分散は

$$
\begin{aligned}
s^2(1+h_0)
&=\frac43\left(1+\frac7{24}\right)\\
&=\frac43\cdot\frac{31}{24}\\
&=\boxed{\frac{31}{18}}.
\end{aligned}
$$

したがって1個の製品の予測区間は、平均工程応答の信頼区間より広くなる。

### 5. $\widehat\beta$ の分布

モデルから

$$
y=X\beta+\varepsilon.
$$

これを最小二乗推定量へ代入すると

$$
\begin{aligned}
\widehat\beta
&=(X^\top X)^{-1}X^\top(X\beta+\varepsilon)\\
&=\beta+(X^\top X)^{-1}X^\top\varepsilon.
\end{aligned}
$$

$\varepsilon\sim N_6(0,\sigma^2I)$ で、正規ベクトルの線形変換は正規分布なので

$$
\widehat\beta
\sim
N_3\left(
\beta,
\sigma^2(X^\top X)^{-1}
\right).
$$

すなわち

$$
\boxed{
\widehat\beta
\sim
N_3\left(
\beta,
\sigma^2(X^\top X)^{-1}
\right)
}.
$$

したがって任意の線形対比 $c^\top\beta$ について

$$
c^\top\widehat\beta
\sim
N\left(
c^\top\beta,
\sigma^2c^\top(X^\top X)^{-1}c
\right),
$$

となる。$\sigma^2$ を $s^2$ で置き換えることで $t$ 分布を用いた区間推定・検定へつながる。

## 本番答案

残差平方和を最小化すると

$$
X^\top X\widehat\beta=X^\top y,
$$

従って

$$
\widehat\beta=(X^\top X)^{-1}X^\top y
=(1,2,-1)^\top.
$$

よって基準条件の平均寸法ずれは1、送り速度の偏回帰係数は2、温度は $-1$。

$$
H=X(X^\top X)^{-1}X^\top,
\qquad
\widehat y=Hy,
$$

正規方程式から

$$
X^\top e=0.
$$

また

$$
S_e=30-(1,2,-1)(6,8,-4)^\top=4,
$$

$$
s^2=4/3.
$$

第4観測は

$$
r_4=\frac{1}{\sqrt{4/3}\sqrt{0.15}}
=\sqrt5\approx2.24
$$

で、$h_{44}=0.85$ も高いため影響点候補として工程条件・測定を確認する。

新条件 $x_0=(1,0.5,-0.5)^\top$ では

$$
\widehat y_0=2.5,
\qquad
h_0=7/24.
$$

平均応答の推定誤差分散は $7/18$、新しい1個の予測誤差分散は $31/18$。後者は新規個体の誤差も含むため大きい。

さらに

$$
\widehat\beta
\sim
N_3\left(
\beta,
\sigma^2(X^\top X)^{-1}
\right).
$$

## 採点基準

- 正規方程式・係数推定・工学的解釈: 5点
- fitted value・残差直交性: 3点
- 誤差平方和・分散推定・診断: 5点
- 新条件の予測と2種類の分散: 4点
- $\widehat\beta$ の分布と線形対比への接続: 3点

25分経過時は $H$ の対称性・冪等性の証明には入らない。係数計算、残差診断、新条件での予測と解釈を優先する。