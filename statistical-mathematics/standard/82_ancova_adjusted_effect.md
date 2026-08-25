# Standard 25 共分散分析・調整済み処置効果

- 旧No.: 82
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

2群の共分散分析モデル

$$
Y_{ij}=\mu+\tau_i+\beta(X_{ij}-\bar X_{..})+\varepsilon_{ij}
$$

を考える。共通傾き $\beta$ を仮定する。

1. 群1と群2の調整済み平均差を標本平均で表せ。
2. $\bar Y_1-\bar Y_2=4$, $\bar X_1-\bar X_2=2$, $\hat\beta=1.5$ のとき調整済み差を求めよ。
3. 調整前差と調整後差が異なる理由を説明せよ。
4. 共通傾き仮定をどう確認するか述べよ。

## 詳細解答

### 1. 調整済み平均差をモデルから導く

群 $i$ について標本平均を取ると

$$
\bar Y_i
=\mu+\tau_i+\beta(\bar X_i-\bar X_{..})+\bar\varepsilon_i.
$$

共変量を共通の基準値 $\bar X_{..}$ にそろえた群 $i$ の調整済み平均は、標本平均から観測された共変量平均との差の寄与を引いて

$$
\bar Y_{i,\mathrm{adj}}
=\bar Y_i-\hat\beta(\bar X_i-\bar X_{..})
$$

と推定する。

従って群1と群2の差は

$$
\begin{aligned}
\widehat\Delta_{\mathrm{adj}}
&=\bar Y_{1,\mathrm{adj}}-\bar Y_{2,\mathrm{adj}}\\
&=\{\bar Y_1-\hat\beta(\bar X_1-\bar X_{..})\}
-\{\bar Y_2-\hat\beta(\bar X_2-\bar X_{..})\}\\
&=(\bar Y_1-\bar Y_2)
-\hat\beta(\bar X_1-\bar X_2).
\end{aligned}
$$

よって

$$
\boxed{
\widehat\Delta_{\mathrm{adj}}
=(\bar Y_1-\bar Y_2)-\hat\beta(\bar X_1-\bar X_2)
}.
$$

### 2. 数値計算

与えられた値を代入すると

$$
\widehat\Delta_{\mathrm{adj}}
=4-1.5\times2
=\boxed{1}.
$$

調整前には4だった群差のうち3が、共変量平均の差で説明される形になっている。

### 3. なぜ調整前差と異なるか

第1問のモデル平均から、単純な群平均差は概略

$$
\bar Y_1-\bar Y_2
\approx
(\tau_1-\tau_2)+\beta(\bar X_1-\bar X_2)
$$

と分かれる。したがって

- 群間で共変量平均が異なる。
- 共変量が応答に影響し $\beta\ne0$ である。

という2条件がそろうと、単純平均差には処置差だけでなく共変量差の寄与も含まれる。共分散分析は後者を同じ基準値へ調整して処置差を比較する。

### 4. 共通傾き仮定の確認

共通傾きとは、群によらず $X$ の傾きが同じという仮定である。確認には交互作用を含むモデル

$$
Y_{ij}
=\mu+\tau_i+\beta(X_{ij}-\bar X_{..})
+\gamma_i(X_{ij}-\bar X_{..})+\varepsilon_{ij}
$$

を考える。2群なら群×共変量交互作用の係数が0かを検定する。

交互作用が有意に0と異なるなら、群ごとに傾きが異なるので単一の $\beta$ で調整した群差は一様な処置効果として解釈しにくい。散布図や残差も併せて確認する。

## 本番答案

群平均を取ると

$$
\bar Y_i
=\mu+\tau_i+\beta(\bar X_i-\bar X_{..})+\bar\varepsilon_i.
$$

共通の共変量値 $\bar X_{..}$ へ調整した平均は

$$
\bar Y_{i,\mathrm{adj}}
=\bar Y_i-\hat\beta(\bar X_i-\bar X_{..}).
$$

従って

$$
\widehat\Delta_{\mathrm{adj}}
=(\bar Y_1-\bar Y_2)-\hat\beta(\bar X_1-\bar X_2)
=4-1.5\times2=1.
$$

単純平均差には共変量平均差の寄与が混入し得る。共通傾きは群×共変量交互作用を追加し、その係数が0とみなせるかで確認する。

## 採点基準

- 群平均モデルから調整済み差を導出: 7点
- 数値計算: 4点
- 調整前後の差の意味: 5点
- 共通傾きの確認: 4点
