# Standard 46 変量効果・期待平均平方

- 安定ID: `RIKOU-STANDARD-46`
- 80大問 No.: 46
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分

## 問題

一元変量効果モデル

$$
Y_{ij}=\mu+A_i+\varepsilon_{ij},
$$

$i=1,\ldots,a$, $j=1,\ldots,n$、$E[A_i]=0$, $\operatorname{Var}(A_i)=\sigma_A^2$、$E[\varepsilon_{ij}]=0$, $\operatorname{Var}(\varepsilon_{ij})=\sigma^2$、互いに独立とする。

1. 同一群内2観測の共分散を求めよ。
2. 級内相関係数を求めよ。
3. $E[MSE]$ を求めよ。
4. $E[MS_A]=\sigma^2+n\sigma_A^2$ を示し、分散成分推定量を作れ。
5. 固定効果分散分析との解釈の違いを説明せよ。

## 詳細解答

### 1. 同一群内2観測の共分散

$j\ne k$ とする。同じ群 $i$ の2観測は

$$
Y_{ij}=\mu+A_i+\varepsilon_{ij},
$$

$$
Y_{ik}=\mu+A_i+\varepsilon_{ik}
$$

で、共通の変量効果 $A_i$ を共有する。

定数 $\mu$ は共分散に寄与しないので

$$
\begin{aligned}
\operatorname{Cov}(Y_{ij},Y_{ik})
&=\operatorname{Cov}(A_i+\varepsilon_{ij},A_i+\varepsilon_{ik})\\
&=\operatorname{Var}(A_i)
+\operatorname{Cov}(A_i,\varepsilon_{ik})\\
&\quad+
\operatorname{Cov}(\varepsilon_{ij},A_i)
+\operatorname{Cov}(\varepsilon_{ij},\varepsilon_{ik}).
\end{aligned}
$$

独立性から最後の3項は0なので

$$
\boxed{
\operatorname{Cov}(Y_{ij},Y_{ik})=\sigma_A^2
}.
$$

異なる群 $i\ne r$ なら共有する $A_i$ がないので、共分散は0になる。

### 2. 級内相関係数

1観測の分散は

$$
\begin{aligned}
\operatorname{Var}(Y_{ij})
&=\operatorname{Var}(A_i)+\operatorname{Var}(\varepsilon_{ij})\\
&=\sigma_A^2+\sigma^2.
\end{aligned}
$$

同一群の2観測は同じ分散を持つから、相関係数は

$$
\begin{aligned}
\operatorname{Corr}(Y_{ij},Y_{ik})
&=\frac{\operatorname{Cov}(Y_{ij},Y_{ik})}
{\sqrt{\operatorname{Var}(Y_{ij})\operatorname{Var}(Y_{ik})}}\\
&=\frac{\sigma_A^2}{\sigma_A^2+\sigma^2}.
\end{aligned}
$$

従って級内相関係数は

$$
\boxed{
\rho_{\mathrm{within}}
=\frac{\sigma_A^2}{\sigma_A^2+\sigma^2}
}.
$$

群間ばらつきが全ばらつきに占める割合として解釈できる。

### 3. $E[MSE]$

群平均を

$$
\bar Y_{i\cdot}
=\frac1n\sum_{j=1}^nY_{ij}
=\mu+A_i+\bar\varepsilon_{i\cdot}
$$

とする。

群内偏差は

$$
Y_{ij}-\bar Y_{i\cdot}
=\varepsilon_{ij}-\bar\varepsilon_{i\cdot}.
$$

ここで $\mu$ と $A_i$ は完全に消える。したがって群内平方和

$$
SS_E
=\sum_{i=1}^a\sum_{j=1}^n
(Y_{ij}-\bar Y_{i\cdot})^2
$$

は、各群内の誤差 $\varepsilon_{ij}$ の標本平方和だけから成る。

各群について

$$
E\left[
\sum_{j=1}^n
(\varepsilon_{ij}-\bar\varepsilon_{i\cdot})^2
\right]
=(n-1)\sigma^2.
$$

群が $a$ 個あるので

$$
E[SS_E]=a(n-1)\sigma^2.
$$

誤差平均平方は

$$
MSE=\frac{SS_E}{a(n-1)}
$$

だから

$$
\boxed{E[MSE]=\sigma^2}.
$$

### 4. 群間平均平方の期待値と分散成分推定

群平均について

$$
\bar Y_{i\cdot}
=\mu+A_i+\bar\varepsilon_{i\cdot}.
$$

独立性より

$$
\operatorname{Var}(\bar Y_{i\cdot})
=\sigma_A^2+\frac{\sigma^2}{n}.
$$

群間平方和は

$$
SS_A
=n\sum_{i=1}^a
(\bar Y_{i\cdot}-\bar Y_{\cdot\cdot})^2.
$$

$\bar Y_{i\cdot}$ は独立同分布で共通分散

$$
\tau^2=\sigma_A^2+\frac{\sigma^2}{n}
$$

を持つので、通常の標本分散の不偏性から

$$
E\left[
\frac1{a-1}
\sum_{i=1}^a
(\bar Y_{i\cdot}-\bar Y_{\cdot\cdot})^2
\right]
=\tau^2.
$$

両辺を $n$ 倍すると

$$
E[MS_A]
=n\tau^2
=n\sigma_A^2+\sigma^2.
$$

従って

$$
\boxed{E[MS_A]=\sigma^2+n\sigma_A^2}.
$$

ここで

$$
E[MSE]=\sigma^2
$$

との差を取ると

$$
E[MS_A-MSE]=n\sigma_A^2.
$$

よってモーメント法による分散成分推定量は

$$
\boxed{
\hat\sigma_A^2=\frac{MS_A-MSE}{n},
\qquad
\hat\sigma^2=MSE
}.
$$

有限標本では $MS_A<MSE$ となり $\hat\sigma_A^2<0$ になることもあり、その場合に0へ切り上げる運用もあるが、これは上の不偏なモーメント式とは別の制約付き処理である。

### 5. 固定効果分散分析との違い

固定効果モデルでは $A_i$ は未知だが固定された水準効果であり、関心は

$$
A_1=\cdots=A_a=0
$$

のように**観測した特定水準の平均差**にある。

変量効果モデルでは $A_i$ 自体が母集団からのランダムな抽出と考えられ、関心は個々の $A_i$ より

$$
\sigma_A^2
$$

という**群間ばらつきの大きさ**にある。

従って、同じ一元配置の見た目でも推定・解釈の対象が異なる。

## 本番答案

$j\ne k$ では

$$
\operatorname{Cov}(Y_{ij},Y_{ik})
=\operatorname{Var}(A_i)=\sigma_A^2.
$$

また

$$
\operatorname{Var}(Y_{ij})
=\sigma_A^2+\sigma^2
$$

なので級内相関係数は

$$
\frac{\sigma_A^2}{\sigma_A^2+\sigma^2}.
$$

群内偏差では $A_i$ が消え、

$$
Y_{ij}-\bar Y_{i\cdot}
=\varepsilon_{ij}-\bar\varepsilon_{i\cdot}
$$

より

$$
E[MSE]=\sigma^2.
$$

一方

$$
\operatorname{Var}(\bar Y_{i\cdot})
=\sigma_A^2+\frac{\sigma^2}{n}
$$

なので

$$
E[MS_A]
=n\left(\sigma_A^2+\frac{\sigma^2}{n}\right)
=\sigma^2+n\sigma_A^2.
$$

従って

$$
\hat\sigma_A^2=\frac{MS_A-MSE}{n},
\qquad
\hat\sigma^2=MSE.
$$

固定効果では特定水準の平均差、変量効果では群母集団の分散成分が主対象である。

## 採点基準

- 共通の $A_i$ から群内共分散を展開: 4点
- 全分散から級内相関係数を計算: 3点
- 群内偏差で $A_i$ が消えることから $E[MSE]$ を導出: 5点
- 群平均の分散から $E[MS_A]$ と分散成分推定量を導出: 6点
- 固定効果と変量効果の推定対象を区別: 2点

25分経過時は $Y_{ij}-\bar Y_{i\cdot}$ と $\operatorname{Var}(\bar Y_{i\cdot})$ の2本を必ず書く。
